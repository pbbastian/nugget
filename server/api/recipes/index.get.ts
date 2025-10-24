import { sql } from 'squid/pg.js'

export default defineEventHandler(async () => {
  const res = await pool.query(sql`
    SELECT 
      r.*,
      COALESCE(
        json_agg(DISTINCT ri.ingredient) FILTER (WHERE ri.ingredient IS NOT NULL),
        '[]'
      ) as ingredient_ids
    FROM recipes r
    LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe
    GROUP BY r.id
    ORDER BY r."createdAt"
  `)
  return {
    recipes: res.rows,
  }
})
