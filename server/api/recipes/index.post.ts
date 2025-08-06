import { z } from "zod";
import { sql, spreadInsert } from "squid/pg";
import { Recipe } from "~/shared/utils/schema";
import { resolveRefs } from "~/shared/utils/api";
import { updateRecipeItems } from "~/server/utils/db";
import slugify from 'slugify';

const bodySchema = Recipe;

export default defineEventHandler(async (event) => {
    let body = await readRawBody(event);
    const recipe = bodySchema.parse(resolveRefs(body));

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        let slug = slugify(recipe.name, { lower: true, strict: true });

        let recipeFields = {
            name: recipe.name,
            slug,
            image: recipe.image,
            portions: recipe.portions,
        };
        let result = await pool.query(sql`
            INSERT INTO recipes
            ${spreadInsert(recipeFields)}
            RETURNING "id"
        `);

        if (result.rowCount == 0) {
            setResponseStatus(event, 500);
            await client.query("ROLLBACK");
            return {
                recipe: null
            };
        }

        let id = result.rows[0].id;
        let promises: Promise<any>[] = [];
        updateRecipeItems(client, id, recipe, promises);

        await Promise.all(promises);
        await client.query("COMMIT");

        return { id, slug };
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
});
