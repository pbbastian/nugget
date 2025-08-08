/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('recipe_step_sections', {
    count: {
      type: 'int',
      default: 0,
      notNull: true,
    },
  })
  pgm.sql(`
      update recipe_step_sections rss
      set count = rsc.count
      from (
          select rs.section, count(rs.id)
          from recipe_steps rs
          group by rs.section
      ) as rsc
      where rsc.section = rss.id
  `)
  pgm.dropColumn('recipe_steps', 'section')
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`not implemented`)
}
