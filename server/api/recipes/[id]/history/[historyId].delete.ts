import { sql } from 'squid/pg.js'
import { z } from 'zod'

const routeSchema = z.object({
  id: z.coerce.number().int().gte(0),
  historyId: z.coerce.number().int().gte(0),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Delete the history entry
    await client.query(sql`
      DELETE FROM recipe_history
      WHERE id = ${params.historyId} AND recipe = ${params.id}
    `)

    // Update lastMadeAt to the most recent remaining history entry, or null if none exist
    await client.query(sql`
      UPDATE recipes
      SET "lastMadeAt" = (
        SELECT MAX("madeAt")
        FROM recipe_history
        WHERE recipe = ${params.id}
      )
      WHERE id = ${params.id}
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
