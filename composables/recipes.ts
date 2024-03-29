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

export async function useRecipes() {
    return await useFetch<Recipe>('/api/recipes');
};