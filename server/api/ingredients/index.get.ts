import { sql } from "squid/pg";

export default defineEventHandler(async (event) => {
    const ingredients = await pool.query(sql`
        SELECT * FROM "ingredients"
        ORDER BY "createdAt"
    `);

    return { ingredients: ingredients.rows };
})
