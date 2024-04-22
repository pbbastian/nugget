import { z } from "zod";
import { sql, spreadUpdate } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

const bodySchema = z.object({
    action: z.enum(['update']),
    ingredient: z.object({
        name: z.string(),
        vendor: z.string().nullable(),
        density: z.number().nullable(),
        weight: z.number().nullable(),
        energy: z.number().nullable(),
        protein: z.number().nullable(),
        fat: z.number().nullable(),
        fibres: z.number().nullable(),
    }).partial().default({}),
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
