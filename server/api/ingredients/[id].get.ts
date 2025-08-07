import { z } from "zod";
import { sql } from "squid/pg.js";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);

    const ingredients = await pool.query(sql`
        SELECT * FROM "ingredients"
        WHERE "id" = ${params.id}
    `);

    if (ingredients.rowCount == 0) {
        setResponseStatus(event, 404);
        return {
            recipe: null
        };
    }

    return ingredients.rows[0];
})
