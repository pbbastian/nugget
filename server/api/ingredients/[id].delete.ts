import { z } from "zod";
import { sql, spreadInsert } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        let promises: Promise<any>[] = [];

        promises.push(client.query(sql`
            UPDATE recipe_ingredients ri
            SET weight = 0.0
            WHERE ri.ingredient = ${params.id}
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

        promises.push(client.query(sql`
            DELETE FROM recipe_ingredients ri
            WHERE ri.ingredient = ${params.id}
        `));

        promises.push(client.query(sql`
            DELETE FROM ingredients
            WHERE "id" = ${params.id}
        `));

        await Promise.all(promises);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
});
