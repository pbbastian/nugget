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
    recipe: Recipe | null,
}

export async function useRecipe(id: number) {
    return await useFetch<RecipeResult>(`/api/recipes/${id}`);
}