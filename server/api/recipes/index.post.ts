import { z } from "zod";
import { sql, spreadInsert } from "squid/pg";
import { Recipe } from "~/shared/utils/schema";

const bodySchema = z.object({
    recipe: Recipe,
});

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse);

    let result = await pool.query(sql`
        INSERT INTO ingredients
        ${spreadInsert(body.recipe)}
        RETURNING "id"
    `);

    if (result.rowCount == 0) {
        setResponseStatus(event, 500);
        return {
            recipe: null
        };
    }

    return {
        id: result.rows[0].id
    };
});
