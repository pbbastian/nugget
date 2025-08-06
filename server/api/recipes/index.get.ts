import { sql } from "squid/pg";

export default defineEventHandler(async (event) => {
  const res = await pool.query(sql`SELECT * FROM recipes r ORDER BY r."createdAt"`);
  return {
    recipes: res.rows,
  };
});
