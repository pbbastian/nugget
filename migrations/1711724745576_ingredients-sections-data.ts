/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'
import { sql } from 'squid/pg.js'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  // Create a default section with null name for all recipes
  const recipes = await pgm.db.query(sql`
        SELECT r.id
        FROM recipes r`,
  )
  for (const r of recipes.rows) {
    const section = await pgm.db.query(sql`
            INSERT INTO recipe_ingredient_sections ("id", "recipe", "order")
            VALUES (DEFAULT, ${r.id}, 0)
            RETURNING "id"
        `)
    const id = section.rows[0].id
    await pgm.db.query(sql`
            UPDATE recipe_ingredients
            SET "section" = ${id}
            WHERE "recipe" = ${r.id}
        `)
  }
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  await pgm.db.query(sql`
        DELETE FROM recipe_ingredient_sections
    `)
}
