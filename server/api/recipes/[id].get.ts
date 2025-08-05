import { z } from "zod";
import { sql } from "squid/pg";
import { QueryResult } from "pg";
import { dedupe } from "~/shared/utils/api";

let routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

let querySchema = z.object({
    ingredients: z.enum(["necessary", "all"]).default("necessary")
});

export default defineEventHandler(async (event) => {
    let params = await getValidatedRouterParams(event, routeSchema.parse);
    let query = await getValidatedQuery(event, querySchema.parse);
    
    let recipesResult = await pool.query(sql`
        SELECT * FROM "recipes"
        WHERE "id" = ${params.id}
    `);
    
    if (recipesResult.rowCount == 0) {
        setResponseStatus(event, 404);
        return {};
    }
    
    let recipe = {
        ...recipesResult.rows[0],
        steps: [],
        ingredients: [],
    };

    let stepSections = await pool.query(sql`
        SELECT s.id, s.name, s.count
        FROM recipe_step_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `);
    let steps = await pool.query(sql`
            SELECT rs.id, rs.text
            FROM recipe_steps rs
            WHERE rs.recipe = ${params.id}
            ORDER BY rs.order
    `);
    let start = 0;
    for (let section of stepSections.rows) {
        recipe.steps.push({
            id: section.id,
            name: section.name,
            items: steps.rows.slice(start, start + section.count),
        });
        start += section.count;
    }

    let ingredientSections = await pool.query(sql`
        SELECT s.id, s.name, s.count
        FROM recipe_ingredient_sections s
        WHERE s.recipe = ${params.id}
        ORDER BY s.order
    `);

    let ingredientsResult = query.ingredients == "necessary"
        ? await pool.query(sql`
            SELECT ri.id, ri.amount, ri.unit,
                   to_jsonb(i) as ingredient
            FROM recipe_ingredients ri
            JOIN ingredients i ON ri.ingredient = i.id
            WHERE ri.recipe = ${params.id}
            ORDER BY ri.order`)
        : await pool.query(sql`
            SELECT ri.id, ri.amount, ri.unit, ri.ingredient
            FROM recipe_ingredients ri
            WHERE ri.recipe = ${params.id}
            ORDER BY ri.order`);

    let ingredients: any[] = [];
    let recipeIngredients = ingredientsResult.rows;
    if (query.ingredients == "all") {
        let all = await pool.query(sql`
            SELECT * FROM "ingredients"
            ORDER BY "name" DESC
        `);
        ingredients = all.rows;
        let map = new Map();
        for (let ingredient of ingredients) {
            map.set(ingredient.id, ingredient);
        }
        for (let recipeIngredient of recipeIngredients) {
            recipeIngredient.ingredient = map.get(recipeIngredient.ingredient);
        }
    }

    start = 0;
    for (let section of ingredientSections.rows) {
        let items = recipeIngredients!.slice(start, start + section.count);
        start += section.count;
        recipe.ingredients.push({
            id: section.id,
            name: section.name,
            items: items,
        });
    }

    return dedupe(query.ingredients == "necessary" ? { recipe } : { recipe, ingredients });
});
