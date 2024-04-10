import { sql } from "squid/pg";

export default defineEventHandler(async (event) => {
    const ingredients = await pool.query(sql`
        SELECT * FROM "ingredients"
        ORDER BY "id" DESC
    `);

    return { ingredients: ingredients.rows };
})
