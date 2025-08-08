/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn('recipe_steps', 'section', {
    notNull: true,
  })

  pgm.dropColumn('recipe_steps', 'recipe')
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('recipe_steps', {
    recipe: {
      type: 'int',
      references: 'recipes',
      notNull: true,
    },
  })

  pgm.alterColumn('recipe_steps', 'section', {
    notNull: false,
  })
}
