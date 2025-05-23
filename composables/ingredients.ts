export interface Ingredient {
    id?: number,
    name: string,
    energy: number | null,
    fat: number | null,
    carbs: number | null,
    fibres: number | null,
    protein: number | null,
    density: number | null,
    weight: number | null,
    createdAt?: string,
    updatedAt?: string,
    vendor: string | null,
}

export interface IngredientsResult {
    ingredients: Ingredient[]
}

export const useIngredient = useApi<Ingredient>("ingredients", "ingredient", {
    name: "",
    energy: null,
    fat: null,
    carbs: null,
    fibres: null,
    protein: null,
    density: null,
    weight: null,
    vendor: "",
});

export async function deleteIngredient(id: number | null) {
    const url = `/api/ingredients/${id}`;
    await $fetch(url, {
        method: 'DELETE'
    });
}
