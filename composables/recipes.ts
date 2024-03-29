export interface Recipe {
    name: string,
    slug: string,
    image: string,
    portions: number,
    energy: number,
    fat: number,
    carbs: number,
    fibres: number,
    protein: number,
}

export interface RecipesResult {
    recipes: Recipe[],
}

export async function useRecipes() {
    return await useFetch<RecipesResult>('/api/recipes');
};

export interface RecipeResult {
    recipe: Recipe,
}

interface IDictionary {
    [index: string]: any;
}

export async function useRecipe(id: number) {
    let result = await useFetch<RecipeResult>(`/api/recipes/${id}`);

    let delta: IDictionary = {};

    watch(result.data, (newData, oldData) => {
        let newRecipe = newData?.recipe!;
        let oldRecipe = oldData?.recipe!;
        for (const key in newRecipe) {
            let k = key as keyof Recipe;
            if (newRecipe[k] !== oldRecipe[k]) {
                delta[k] = newRecipe[k];
            }
            // if (value !== oldRecipe)
        }
    });

    return {
        save() {
            
        },
        ...result
    };
}