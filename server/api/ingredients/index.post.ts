import { spreadInsert, sql } from 'squid/pg.js'

const bodySchema = ingredientSchema.partial().default({})

export default defineEventHandler(async (event) => {
  const ingredient = await readValidatedBody(event, bodySchema.parse)

  const result = await pool.query(sql`
        INSERT INTO ingredients
        ${spreadInsert(ingredient)}
        RETURNING "id"
    `)

  if (result.rowCount == 0) {
    setResponseStatus(event, 500)
    return {
      ingredient: null,
    }
  }

  return {
    ingredient: {
      id: result.rows[0].id,
    },
  }
})
