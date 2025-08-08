/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('recipe_steps', {
    recipe: {
      type: 'int',
      references: 'recipes',
    },
  })
  pgm.sql(`
    update recipe_steps
    set recipe = s.recipe
    from recipe_step_sections s
    where section = s.id
  `)
  pgm.alterColumn('recipe_steps', 'recipe', {
    notNull: true,
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('recipe_steps', 'recipe')
}
