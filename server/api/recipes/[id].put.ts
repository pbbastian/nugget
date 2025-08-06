import { z } from "zod";
import { spreadInsert, spreadUpdate, sql } from "squid/pg";
import { Recipe } from "~/shared/utils/schema";
import { resolveRefs } from "~/shared/utils/api";
import { updateRecipeItems } from "~/server/utils/db";

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
            updatedAt: sql.raw("DEFAULT"),
        };
        promises.push(client.query(sql`
            UPDATE recipes
            SET ${spreadUpdate(recipeFields)}
            WHERE "id" = ${params.id}
        `));

        updateRecipeItems(client, params.id, recipe, promises);

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
