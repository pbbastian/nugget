/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('ingredients', {
    id: 'id',
    name: {
      type: 'text',
      notNull: true,
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
    density: {
      type: 'real',
    },
    weight: {
      type: 'real',
    },
    createdAt: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ingredients')
}
