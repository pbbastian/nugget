/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('recipe_ingredients', {
    recipe: {
      type: 'int',
      references: 'recipes',
    },
  })
  pgm.sql(`
    update recipe_ingredients
    set recipe = s.recipe
    from recipe_ingredient_sections s
    where section = s.id
  `)
  pgm.alterColumn('recipe_ingredients', 'recipe', {
    notNull: true,
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('recipe_ingredients', 'recipe')
}
