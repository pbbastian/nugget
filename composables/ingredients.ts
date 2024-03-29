export interface Ingredient {
    id: number,
    name: string,
    energy: number,
    fat: number,
    carbs: number,
    fibres: number,
    protein: number,
    density: number,
    weight: number,
    createdAt: string,
    updatedAt: string,
}

export interface IngredientsResult {
    ingredients: Ingredient[]
}

export async function useIngredients() {
    return await useFetch<IngredientsResult>('/api/ingredients');
}

export interface IngredientResult {
    ingredient: Ingredient
}

export async function useIngredient(id: number) {
    return await useFetch<IngredientResult>(`/api/ingredients/${id}`);
}
