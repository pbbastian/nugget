/* eslint-disable @typescript-eslint/naming-convention */
import { type MigrationBuilder, type ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addType('ingredient_unit', ['stk', 'pk', 'g', 'kg', 'ml', 'cl', 'dl', 'l', 'knsp', 'tsk', 'spsk']);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropType('ingredient_unit');
}
