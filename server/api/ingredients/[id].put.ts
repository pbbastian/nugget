import { z } from "zod";
import { sql, spreadUpdate } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

const bodySchema = ingredientSchema.partial().default({});

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);
    const body = await readValidatedBody(event, bodySchema.parse);

    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        let promises: Promise<any>[] = [];

        let fields = { updatedAt: sql.raw('DEFAULT'), ...body };
        let resultPromise = client.query(sql`
            UPDATE ingredients
            SET ${spreadUpdate(fields)}
            WHERE "id" = ${params.id}
        `);

        promises.push(client.query(sql`
            UPDATE recipe_ingredients ri
            SET weight =
                CASE
                    WHEN ri.unit = 'pk' OR ri.unit = 'stk' THEN ri.amount * i.weight
                    WHEN ri.unit = 'g' THEN ri.amount
                    WHEN ri.unit = 'kg' THEN ri.amount * 1000.0
                    WHEN ri.unit = 'ml' THEN i.density * ri.amount
                    WHEN ri.unit = 'cl' THEN i.density * ri.amount * 10.0
                    WHEN ri.unit = 'dl' THEN i.density * ri.amount
                    WHEN ri.unit = 'l' THEN i.density * ri.amount * 1000.0
                    WHEN ri.unit = 'knsp' THEN i.density * ri.amount * 0.25
                    WHEN ri.unit = 'tsk' THEN i.density * ri.amount * 5.0
                    WHEN ri.unit = 'spsk' THEN i.density * ri.amount * 15.0
                END
            FROM ingredients i WHERE i.id = ${params.id}
        `));

        promises.push(client.query(sql`
            UPDATE recipes as r
            SET (energy, fat, carbs, fibres, protein) = (
            	SELECT
            		sum(ri.weight * i.energy) / (r.portions * 100.0),
            		sum(ri.weight * i.fat) / (r.portions * 100.0),
            		sum(ri.weight * i.carbs) / (r.portions * 100.0),
            		sum(ri.weight * i.fibres) / (r.portions * 100.0),
            		sum(ri.weight * i.protein) / (r.portions * 100.0)
            	FROM recipe_ingredients ri
            	JOIN ingredients i ON i.id = ri.ingredient
            	WHERE ri.recipe = r.id
            )
            WHERE r.id = (SELECT DISTINCT ri.recipe FROM recipe_ingredients ri WHERE ri.ingredient = ${params.id})
        `));

        let result = await resultPromise;
        await Promise.all(promises);

        if (result.rowCount == 0) {
            setResponseStatus(event, 404);
            await client.query("ROLLBACK");
        }
        else {
            await client.query("COMMIT");
        }
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }


    
    return;
})
