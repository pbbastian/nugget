/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('recipe_steps', {
    id: 'id',
    recipe: {
      type: 'int',
      references: 'recipes',
    },
    order: {
      type: 'int',
      notNull: true,
    },
    text: {
      type: 'text',
      notNull: true,
      default: '',
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('recipe_steps')
}
