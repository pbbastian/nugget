import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('recipe_history', {
        id: 'id',
        recipe: {
            type: 'integer',
            notNull: true,
            references: 'recipes',
            onDelete: 'CASCADE',
        },
        madeAt: {
            type: 'timestamptz',
            notNull: true,
        },
        createdAt: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.createIndex('recipe_history', 'recipe');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('recipe_history');
}
