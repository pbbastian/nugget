import { sql } from "squid/pg";

export default defineEventHandler(async (event) => {
    const ingredients = await pool.query(sql`
        SELECT * FROM "ingredients"
    `);

    return { ingredients: ingredients.rows };
})
