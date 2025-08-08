/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('recipe_ingredient_sections', {
    count: {
      type: 'int',
      default: 0,
      notNull: true,
    },
  })
  pgm.sql(`
      update recipe_ingredient_sections ris
      set count = ric.count
      from (
          select ri.section, count(ri.id)
          from recipe_ingredients ri
          group by ri.section
      ) as ric
      where ric.section = ris.id
  `)
  pgm.dropColumn('recipe_ingredients', 'section')
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`not implemented`)
}
