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
    ingredients: {
        id?: number,
        name: string,
        items: {
            id?: number,
            name: string,
            amount: number,
            unit: string,
        }[]
    }[],
    steps: {
        id?: number,
        name: string,
        items: {
            id?: number,
            text: string,
        }[]
    }[]
}

export interface RecipesResult {
    recipes: Recipe[],
}

export async function useRecipes() {
    return await useFetch<RecipesResult>('/api/recipes', {
        default: () => ({} as RecipesResult),
    });
};

export interface RecipeResult {
    recipe: Recipe,
}

export const useRecipe = useApi<Recipe>("recipes", "recipe", {
    name: "",
    slug: "",
    image: "",
    portions: 0,
    energy: 0,
    fat: 0,
    carbs: 0,
    fibres: 0,
    protein: 0,
    ingredients: [],
    steps: [],
});
