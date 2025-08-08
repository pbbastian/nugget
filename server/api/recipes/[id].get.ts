import { sql } from 'squid/pg.js'
import { z } from 'zod'
import { dedupe } from '~/shared/utils/api'

const routeSchema = z.object({
  id: z.coerce.number().int().gte(0),
})

const querySchema = z.object({
  ingredients: z.enum(['necessary', 'all']).default('necessary'),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
  const query = await getValidatedQuery(event, querySchema.parse)

  const recipesResult = await pool.query(sql`
        SELECT * FROM "recipes"
        WHERE "id" = ${params.id}
    `)

  if (recipesResult.rowCount == 0) {
    setResponseStatus(event, 404)
    return {}
  }

  const recipe = {
    ...recipesResult.rows[0],
    steps: [],
    ingredients: [],
  }

  const stepSections = await pool.query(sql`
        SELECT s.id, s.name, s.count
        FROM recipe_step_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `)
  const steps = await pool.query(sql`
            SELECT rs.id, rs.text
            FROM recipe_steps rs
            WHERE rs.recipe = ${params.id}
            ORDER BY rs.order
    `)
  let start = 0
  for (const section of stepSections.rows) {
    recipe.steps.push({
      id: section.id,
      name: section.name,
      items: steps.rows.slice(start, start + section.count),
    })
    start += section.count
  }

  const ingredientSections = await pool.query(sql`
        SELECT s.id, s.name, s.count
        FROM recipe_ingredient_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `)

  const ingredientsResult = query.ingredients == 'necessary'
    ? await pool.query(sql`
            SELECT ri.id, ri.amount, ri.unit,
                   to_jsonb(i) as ingredient
            FROM recipe_ingredients ri
            JOIN ingredients i ON ri.ingredient = i.id
            WHERE ri.recipe = ${params.id}
            ORDER BY ri.order`)
    : await pool.query(sql`
            SELECT ri.id, ri.amount, ri.unit, ri.ingredient
            FROM recipe_ingredients ri
            WHERE ri.recipe = ${params.id}
            ORDER BY ri.order`)

  let ingredients: any[] = []
  const recipeIngredients = ingredientsResult.rows
  if (query.ingredients == 'all') {
    const all = await pool.query(sql`
            SELECT * FROM "ingredients"
            ORDER BY "name" DESC
        `)
    ingredients = all.rows
    const map = new Map()
    for (const ingredient of ingredients) {
      map.set(ingredient.id, ingredient)
    }
    for (const recipeIngredient of recipeIngredients) {
      recipeIngredient.ingredient = map.get(recipeIngredient.ingredient)
    }
  }

  start = 0
  for (const section of ingredientSections.rows) {
    const items = recipeIngredients!.slice(start, start + section.count)
    start += section.count
    recipe.ingredients.push({
      id: section.id,
      name: section.name,
      items,
    })
  }

  return dedupe(query.ingredients == 'necessary' ? { recipe } : { recipe, ingredients })
})
