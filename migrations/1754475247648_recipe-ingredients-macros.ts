import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn("recipe_ingredients", {
        weight: {
            type: "real",
        },
    });
    pgm.sql(`
        UPDATE recipe_ingredients ri
        SET weight =
            CASE
                WHEN ri.unit = 'pk' OR ri.unit = 'stk' THEN ri.amount * i.weight
                WHEN ri.unit = 'g' THEN ri.amount
                WHEN ri.unit = 'kg' THEN ri.amount * 1000.0
                WHEN ri.unit = 'ml' THEN i.density * ri.amount
                WHEN ri.unit = 'cl' THEN i.density * ri.amount * 10.0
                WHEN ri.unit = 'dl' THEN i.density * ri.amount
                WHEN ri.unit = 'l' THEN i.density * ri.amount * 1000.0
                WHEN ri.unit = 'knsp' THEN i.density * ri.amount * 0.25
                WHEN ri.unit = 'tsk' THEN i.density * ri.amount * 5.0
                WHEN ri.unit = 'spsk' THEN i.density * ri.amount * 15.0
            END
        FROM ingredients i WHERE i.id = ri.ingredient
    `);
    pgm.alterColumn("recipe_ingredients", "weight", {
        notNull: true,
        default: 0.0
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn("recipe_ingredients", "weight");
}
