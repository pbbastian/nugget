import { z } from "zod";
import { spreadInsert, spreadUpdate, sql } from "squid/pg";
import { Recipe } from "~/shared/utils/schema";
import { resolveRefs } from "~/shared/utils/api";

const routeSchema = z.object({
    id: z.coerce.number().int().gte(0)
});

const bodySchema = Recipe;

export default defineEventHandler(async (event) => {
    const params = await getValidatedRouterParams(event, routeSchema.parse);
    let body = await readRawBody(event);
    const recipe = bodySchema.parse(resolveRefs(body));

    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        let promises: Promise<any>[] = [];

        let recipeFields = {
            name: recipe.name,
            image: recipe.image,
            portions: recipe.portions,
        };
        promises.push(client.query(sql`
            UPDATE recipes
            SET ${spreadUpdate(recipeFields)}
            WHERE "id" = ${params.id}
        `));

        promises.push(client.query(sql`
            DELETE FROM recipe_steps
            WHERE "recipe" = ${params.id}
        `));
        promises.push(client.query(sql`
            DELETE FROM recipe_step_sections
            WHERE "recipe" = ${params.id}
        `));
        promises.push(client.query(sql`
            DELETE FROM recipe_ingredients
            WHERE "recipe" = ${params.id}
        `));
        promises.push(client.query(sql`
            DELETE FROM recipe_ingredient_sections
            WHERE "recipe" = ${params.id}
        `));

        let stepOrder = 0;
        let stepSectionOrder = 0;
        for (const section of recipe.steps)
        {
            let stepCount = 0;
            for (const step of section.items)
            {
                const stepFields = {
                    order: stepOrder,
                    text: step.text,
                    recipe: params.id,
                };
                promises.push(client.query(sql`
                    INSERT INTO recipe_steps
                    ${spreadInsert(stepFields)}
                `));

                stepOrder += 1;
                stepCount += 1;
            }

            const sectionFields = {
                recipe: params.id,
                order: stepSectionOrder,
                name: section.name,
                count: stepCount,
            };
            promises.push(client.query(sql`
                INSERT INTO recipe_step_sections
                ${spreadInsert(sectionFields)}
            `))

            stepSectionOrder += 1;
        }

        let ingredientOrder = 0;
        let ingredientSectionOrder = 0;
        for (const section of recipe.ingredients)
        {
            let ingredientCount = 0;
            for (const ingredient of section.items)
            {
                const ingredientFields = {
                    order: ingredientOrder,
                    ingredient: ingredient.ingredient.id,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    recipe: params.id,
                };
                promises.push(client.query(sql`
                    INSERT INTO recipe_ingredients
                    ${spreadInsert(ingredientFields)}
                `));

                ingredientOrder += 1;
                ingredientCount += 1;
            }

            const sectionFields = {
                recipe: params.id,
                order: ingredientSectionOrder,
                name: section.name,
                count: ingredientCount,
            };
            promises.push(client.query(sql`
                INSERT INTO recipe_ingredient_sections
                ${spreadInsert(sectionFields)}
            `));

            ingredientSectionOrder += 1;
        }

        promises.push(client.query(sql`
            WITH ingredients AS (
            	SELECT
            	  r.id AS recipe,
            	  CASE
            	  	WHEN ri.unit = 'pk' OR ri.unit = 'stk' THEN ri.amount * i.weight / 100.0
            	  	WHEN ri.unit = 'g' THEN ri.amount / 100.0
            	  	WHEN ri.unit = 'kg' THEN ri.amount * 10.0
            	  	WHEN ri.unit = 'ml' THEN i.density * ri.amount / 100.0
            	  	WHEN ri.unit = 'cl' THEN i.density * ri.amount / 10.0
            	  	WHEN ri.unit = 'dl' THEN i.density * ri.amount
            	  	WHEN ri.unit = 'l' THEN i.density * ri.amount * 10.0
            	  	WHEN ri.unit = 'knsp' THEN i.density * ri.amount * 0.25 / 100.0
            	  	WHEN ri.unit = 'tsk' THEN i.density * ri.amount * 5.0 / 100.0
            	  	WHEN ri.unit = 'spsk' THEN i.density * ri.amount * 15.0 / 100.0
            	  END AS weight, i.energy, i.fat, i.carbs, i.fibres, i.protein
            	FROM recipes r
            	JOIN recipe_ingredients ri on ri.recipe = r.id
            	JOIN ingredients i ON ri.ingredient = i.id
              WHERE r.id = ${params.id}
            )
            UPDATE recipes as r
            SET (energy, fat, carbs, fibres, protein) = (
            	SELECT
            		sum(weight * energy) / r.portions as energy,
            		sum(weight * fat) / r.portions as fat,
            		sum(weight * carbs) / r.portions as carbs,
            		sum(weight * fibres) / r.portions as fibres,
            		sum(weight * protein) / r.portions as protein
            	FROM ingredients i
            	WHERE i.recipe = r.id
            )
            WHERE r.id = ${params.id}
        `));

        await Promise.all(promises);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }

    return {};
});
