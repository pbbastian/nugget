/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn('recipe_ingredients', 'section', {
    notNull: true,
  })

  pgm.dropColumn('recipe_ingredients', 'recipe')
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('recipe_ingredients', {
    recipe: {
      type: 'int',
      references: 'recipes',
      notNull: true,
    },
  })

  pgm.alterColumn('recipe_ingredients', 'section', {
    notNull: false,
  })
}
