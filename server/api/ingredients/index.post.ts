import { z } from "zod";
import { sql, spreadInsert } from "squid/pg";

const bodySchema = z.object({
    ingredient: ingredientSchema,
});

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse);

    let result = await pool.query(sql`
        INSERT INTO ingredients
        ${spreadInsert(body.ingredient)}
        RETURNING "id"
    `);

    if (result.rowCount == 0) {
        setResponseStatus(event, 500);
        return {
            recipe: null
        };
    }

    return {
        ingredient: {
            id: result.rows[0].id
        }
    };
});
