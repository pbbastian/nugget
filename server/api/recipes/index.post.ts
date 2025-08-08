import slugify from 'slugify'
import { spreadInsert, sql } from 'squid/pg.js'
import { updateRecipeItems } from '~/server/utils/db'
import { resolveRefs } from '~/shared/utils/api'
import { Recipe } from '~/shared/utils/schema'

const bodySchema = Recipe

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event)
  const recipe = bodySchema.parse(resolveRefs(body))

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const slug = slugify(recipe.name, { lower: true, strict: true })

    const recipeFields = {
      name: recipe.name,
      slug,
      image: recipe.image,
      portions: recipe.portions,
    }
    const result = await pool.query(sql`
            INSERT INTO recipes
            ${spreadInsert(recipeFields)}
            RETURNING "id"
        `)

    if (result.rowCount == 0) {
      setResponseStatus(event, 500)
      await client.query('ROLLBACK')
      return {
        recipe: null,
      }
    }

    const id = result.rows[0].id
    const promises: Promise<any>[] = []
    updateRecipeItems(client, id, recipe, promises)

    await Promise.all(promises)
    await client.query('COMMIT')

    return { id, slug }
  }
  catch (e) {
    await client.query('ROLLBACK')
    throw e
  }
  finally {
    client.release()
  }
})
