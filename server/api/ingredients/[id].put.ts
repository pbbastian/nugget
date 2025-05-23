import { z } from "zod";
import { sql, spreadUpdate } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

const bodySchema = ingredientSchema.partial().default({});

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);
    const body = await readValidatedBody(event, bodySchema.parse);

    let fields = { updatedAt: sql.raw('current_timestamp'), ...body };
    let result = await pool.query(sql`
        UPDATE ingredients
        SET ${spreadUpdate(fields)}
        WHERE "id" = ${params.id}
    `);

    if (result.rowCount == 0) {
        setResponseStatus(event, 404);
    }
    
    return;
})
