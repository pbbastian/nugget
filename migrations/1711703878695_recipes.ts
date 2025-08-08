/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('recipes', {
    id: 'id',
    name: {
      type: 'text',
      notNull: true,
    },
    image: {
      type: 'text',
    },
    portions: {
      type: 'smallint',
    },
    energy: {
      type: 'real',
    },
    fat: {
      type: 'real',
    },
    carbs: {
      type: 'real',
    },
    fibres: {
      type: 'real',
    },
    protein: {
      type: 'real',
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('recipes')
}
