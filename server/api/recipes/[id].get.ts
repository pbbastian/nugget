import { z } from "zod";

const routeSchema = z.object({
  id: z.coerce.number().int().gte(0)
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse);
  const res = await pool.query('SELECT * FROM recipes WHERE id = $1', [params.id]);
  if (res.rowCount == 0) {
    setResponseStatus(event, 404);
    return {
      recipe: null
    };
  }
  return {
    recipe: res.rows[0],
  };
});
