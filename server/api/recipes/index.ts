export default defineEventHandler(async (event) => {
  const res = await pool.query('SELECT * FROM recipes');
  return {
    recipes: res.rows,
  };
});
