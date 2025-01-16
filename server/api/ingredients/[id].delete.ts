import { z } from "zod";
import { sql, spreadInsert } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);
    let result = await pool.query(sql`
        DELETE FROM ingredients
        WHERE "id" = ${params.id}
    `);

    if (result.rowCount == 0) {
        setResponseStatus(event, 404);
    }

    return;
});
