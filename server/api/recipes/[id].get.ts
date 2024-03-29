import { z } from "zod";
import { sql } from "squid/pg";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

export default defineEventHandler(async (event) => {
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

    const steps = await pool.query(sql`
        SELECT "id", "text"
        FROM "recipe_steps"
        WHERE "recipe" = ${params.id}
        ORDER BY "order"
    `);
    recipe.steps = steps.rows;

    const sections = await pool.query(sql`
        SELECT s.id, s.name
        FROM recipe_ingredient_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `);

    recipe.ingredients = sections.rows;

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
