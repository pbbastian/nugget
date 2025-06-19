import { z } from "zod";
import { sql } from "squid/pg";
import { Recipe } from "~/shared/utils/schema";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

const bodySchema = Recipe.partial().default({});

export default defineEventHandler(async (event) => {
    // TODO: Implement properly

    const params = await getValidatedRouterParams(event, routeSchema.parse);
    
    const recipes = await pool.query(sql`
        SELECT * FROM "recipes"
        WHERE "id" = ${params.id}
    `);
    
    if (recipes.rowCount == 0) {
        setResponseStatus(event, 404);
        return {
            recipe: null
        };
    }
    
    const recipe = recipes.rows[0];

    const stepSections = await pool.query(sql`
        SELECT s.id, s.name
        FROM recipe_step_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `);
    recipe.steps = stepSections.rows;

    for (let section of recipe.steps) {
        const steps = await pool.query(sql`
            SELECT rs.id, rs.text
            FROM recipe_steps rs
            WHERE rs.section = ${section.id}
            ORDER BY rs.order
        `);
        section.items = steps.rows;
    }

    const ingredientSections = await pool.query(sql`
        SELECT s.id, s.name
        FROM recipe_ingredient_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `);

    recipe.ingredients = ingredientSections.rows;

    for (let section of recipe.ingredients) {
        const ingredients = await pool.query(sql`
            SELECT ri.id, ri.ingredient, i.name, ri.amount, ri.unit, i.weight
            FROM recipe_ingredients ri
            JOIN ingredients i ON ri.ingredient = i.id
            WHERE ri.section = ${section.id}
            ORDER BY ri.order
        `);
        section.items = ingredients.rows;
    }

    return { recipe };
});
