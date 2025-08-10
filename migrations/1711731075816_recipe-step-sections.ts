/* eslint-disable @typescript-eslint/naming-convention */
import { type MigrationBuilder, type ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('recipe_step_sections', {
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
        name: {
            type: 'text',
        }
    });

    pgm.addColumn('recipe_steps', {
        section: {
            type: 'int',
            references: 'recipe_step_sections',
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('recipe_ingredient_sections');
}
