/* eslint-disable @typescript-eslint/naming-convention */
import { type MigrationBuilder, type ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.alterColumn('recipes', 'slug', {
        notNull: true,
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.alterColumn('recipes', 'slug', {
        notNull: false,
    });
}
