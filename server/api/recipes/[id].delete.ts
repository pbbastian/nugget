import { z } from "zod";
import { sql } from "squid/pg.js";

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
            DELETE FROM recipe_steps rs
            WHERE rs.recipe = ${params.id}
        `));
        promises.push(client.query(sql`
            DELETE FROM recipe_step_sections rss
            WHERE rss.recipe = ${params.id}
        `));

        promises.push(client.query(sql`
            DELETE FROM recipe_ingredients ri
            WHERE ri.recipe = ${params.id}
        `));
        promises.push(client.query(sql`
            DELETE FROM recipe_ingredient_sections ris
            WHERE ris.recipe = ${params.id}
        `));

        promises.push(client.query(sql`
            DELETE FROM recipes r
            WHERE r.id = ${params.id}
        `));

        await Promise.all(promises);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }

    return {};
});
