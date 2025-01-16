import { z } from "zod";
import { sql, spreadUpdate } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

const bodySchema = z.object({
    ingredient: ingredientSchema.partial().default({}),
});

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);
    const body = await readValidatedBody(event, bodySchema.parse);

    (body.ingredient as any).updatedAt = sql.raw('current_timestamp');

    let result = await pool.query(sql`
        UPDATE ingredients
        SET ${spreadUpdate(body.ingredient)}
        WHERE "id" = ${params.id}
    `);

    if (result.rowCount == 0) {
        setResponseStatus(event, 404);
    }
    
    return;
})
