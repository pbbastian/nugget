import type { PoolClient } from 'pg'
import type { Recipe } from '~/shared/utils/schema'
import pg from 'pg'
import { spreadInsert, sql } from 'squid/pg.js'
import { z } from 'zod'

export const pool: pg.Pool = new pg.Pool()

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const nullString = z.literal("").transform(() => null)

export const ingredientSchema = z.object({
  name: z.string(),
  vendor: z.string().nullable(),
  density: z.number().nullable().or(nullString),
  weight: z.number().nullable().or(nullString),
  energy: z.number().nullable(),
  protein: z.number().nullable(),
  fat: z.number().nullable(),
  carbs: z.number().nullable(),
  fibres: z.number().nullable(),
})

export function updateRecipeItems(client: PoolClient, id: number, recipe: z.infer<typeof Recipe>, promises: Promise<any>[]) {
  promises.push(client.query(sql`
        DELETE FROM recipe_steps
        WHERE "recipe" = ${id}
    `))
  promises.push(client.query(sql`
        DELETE FROM recipe_step_sections
        WHERE "recipe" = ${id}
    `))
  promises.push(client.query(sql`
        DELETE FROM recipe_ingredients
        WHERE "recipe" = ${id}
    `))
  promises.push(client.query(sql`
        DELETE FROM recipe_ingredient_sections
        WHERE "recipe" = ${id}
    `))

  let stepOrder = 0
  let stepSectionOrder = 0
  for (const section of recipe.steps) {
    let stepCount = 0
    for (const step of section.items) {
      const stepFields = {
        order: stepOrder,
        text: step.text,
        recipe: id,
      }
      promises.push(client.query(sql`
                INSERT INTO recipe_steps
                ${spreadInsert(stepFields)}
            `))

      stepOrder += 1
      stepCount += 1
    }

    const sectionFields = {
      recipe: id,
      order: stepSectionOrder,
      name: section.name,
      count: stepCount,
    }
    promises.push(client.query(sql`
            INSERT INTO recipe_step_sections
            ${spreadInsert(sectionFields)}
        `))

    stepSectionOrder += 1
  }

  let ingredientOrder = 0
  let ingredientSectionOrder = 0
  for (const section of recipe.ingredients) {
    let ingredientCount = 0
    for (const ingredient of section.items) {
      const ingredientFields = {
        order: ingredientOrder,
        ingredient: ingredient.ingredient.id,
        amount: ingredient.amount,
        unit: ingredient.unit,
        recipe: id,
      }
      promises.push(client.query(sql`
                INSERT INTO recipe_ingredients
                ${spreadInsert(ingredientFields)}
            `))

      ingredientOrder += 1
      ingredientCount += 1
    }

    const sectionFields = {
      recipe: id,
      order: ingredientSectionOrder,
      name: section.name,
      count: ingredientCount,
    }
    promises.push(client.query(sql`
            INSERT INTO recipe_ingredient_sections
            ${spreadInsert(sectionFields)}
        `))

    ingredientSectionOrder += 1
  }

  promises.push(client.query(sql`
        UPDATE recipe_ingredients ri
        SET weight =
            CASE
                WHEN ri.unit = 'pk' OR ri.unit = 'stk' THEN ri.amount * i.weight
                WHEN ri.unit = 'g' THEN ri.amount
                WHEN ri.unit = 'kg' THEN ri.amount * 1000.0
                WHEN ri.unit = 'ml' THEN i.density * ri.amount
                WHEN ri.unit = 'cl' THEN i.density * ri.amount * 10.0
                WHEN ri.unit = 'dl' THEN i.density * ri.amount * 100.0
                WHEN ri.unit = 'l' THEN i.density * ri.amount * 1000.0
                WHEN ri.unit = 'knsp' THEN i.density * ri.amount * 0.25
                WHEN ri.unit = 'tsk' THEN i.density * ri.amount * 5.0
                WHEN ri.unit = 'spsk' THEN i.density * ri.amount * 15.0
            END
        FROM ingredients i WHERE i.id = ri.ingredient
        AND ri.recipe = ${id}
    `))

  promises.push(client.query(sql`
        UPDATE recipes as r
        SET (energy, fat, carbs, fibres, protein) = (
            SELECT
                sum(ri.weight * i.energy) / (r.portions * 100.0),
                sum(ri.weight * i.fat) / (r.portions * 100.0),
                sum(ri.weight * i.carbs) / (r.portions * 100.0),
                sum(ri.weight * i.fibres) / (r.portions * 100.0),
                sum(ri.weight * i.protein) / (r.portions * 100.0)
            FROM recipe_ingredients ri
            JOIN ingredients i ON i.id = ri.ingredient
            WHERE ri.recipe = r.id
        )
        WHERE r.id = ${id}
    `))
}
