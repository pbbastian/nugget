/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('recipe_ingredients', {
    id: 'id',
    recipe: {
      type: 'int',
      references: 'recipes',
      notNull: true,
    },
    order: {
      type: 'int',
      notNull: true,
    },
    ingredient: {
      type: 'int',
      references: 'ingredients',
      notNull: true,
    },
    amount: {
      type: 'real',
      notNull: true,
    },
    unit: {
      type: 'ingredient_unit',
      notNull: true,
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('recipe_ingredients')
}
