import slugify from 'slugify'
import { spreadUpdate, sql } from 'squid/pg.js'
import { z } from 'zod'
import { updateRecipeItems } from '~/server/utils/db'
import { resolveRefs } from '~/shared/utils/api'
import { Recipe } from '~/shared/utils/schema'

const routeSchema = z.object({
  id: z.coerce.number().int().gte(0),
})

const bodySchema = Recipe

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
  const body = await readRawBody(event)
  const recipe = bodySchema.parse(resolveRefs(body))

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const promises: Promise<any>[] = []

    const slug = slugify(recipe.name, { lower: true, strict: true })

    const recipeFields = {
      name: recipe.name,
      slug,
      image: recipe.image,
      portions: recipe.portions,
      updatedAt: sql.raw('DEFAULT'),
    }
    promises.push(client.query(sql`
            UPDATE recipes
            SET ${spreadUpdate(recipeFields)}
            WHERE "id" = ${params.id}
        `))

    updateRecipeItems(client, params.id, recipe, promises)

    await Promise.all(promises)
    await client.query('COMMIT')

    return { id: params.id, slug }
  }
  catch (e) {
    await client.query('ROLLBACK')
    throw e
  }
  finally {
    client.release()
  }
})
