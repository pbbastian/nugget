import { sql } from 'squid/pg.js'
import { z } from 'zod'

const routeSchema = z.object({
  id: z.coerce.number().int().gte(0),
})

const bodySchema = z.object({
  madeAt: z.coerce.date(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
  const body = await readValidatedBody(event, bodySchema.parse)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Update lastMadeAt on the recipe
    await client.query(sql`
      UPDATE recipes
      SET "lastMadeAt" = ${body.madeAt}
      WHERE id = ${params.id}
    `)

    // Insert into recipe_history
    await client.query(sql`
      INSERT INTO recipe_history (recipe, "madeAt")
      VALUES (${params.id}, ${body.madeAt})
    `)

    await client.query('COMMIT')

    return { success: true }
  }
  catch (e) {
    await client.query('ROLLBACK')
    throw e
  }
  finally {
    client.release()
  }
})
