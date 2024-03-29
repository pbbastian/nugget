/* eslint-disable @typescript-eslint/naming-convention */
import { type MigrationBuilder, type ColumnDefinitions } from 'node-pg-migrate';
import slugify from 'slugify';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    let res = await pgm.db.query('SELECT id, name FROM recipes');
    if (res.rowCount == 0) { return; }
    for (let row of res.rows)
    {
        let slug = slugify(row.name, { lower: true, strict: true });
        await pgm.db.query('UPDATE recipes SET slug = $1 WHERE id = $2', [slug, row.id]);
    }
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    await pgm.db.query('UPDATE recipes SET slug = NULL');
}
