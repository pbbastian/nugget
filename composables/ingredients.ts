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
    vendor: string,
}

export interface IngredientsResult {
    ingredients: Ingredient[]
}

export async function useIngredients() {
    return await useFetch<IngredientsResult>('/api/ingredients', {
        default: () => ({} as IngredientsResult),
    });
}

export interface IngredientResult {
    ingredient: Ingredient
}

interface IDictionary {
    [index: string]: any;
}

export async function useIngredient(id: Ref<number | null>) {
    let change: IDictionary = {};
    let ingredient: Ref<Ingredient | null> = ref(null);
    let saving = ref(false);

    let save = async () => {
        if (ingredient.value == null) { throw new Error("Cannot save before data is loaded"); }
        if (saving.value) { throw new Error("A save request is already in progress"); }

        try {
            saving.value = true;
            await $fetch(`/api/ingredients/${id.value}`, {
                method: 'POST',
                body: {
                    ingredient: change,
                }
            });
            change = {};
        } finally {
            saving.value = false;
        }
    };

    watch(id, async (newId) => {
        if (saving.value) { throw new Error("Ingredient id changed while saving was in progress"); }
        change = {};

        if (newId != null && newId != undefined) {
            ingredient.value = null;

            let result = await useFetch<IngredientResult>(`/api/ingredients/${id.value}`);
            if (result.data.value == null) { return; }
            let data = result.data.value.ingredient;

            for (const key in data) {
                let k = key as keyof Ingredient;
                watch(() => data[k], (newValue) => {
                    change[k] = newValue;
                });
            }

            ingredient.value = data;
        }
    });

    return { ingredient, saving, save };
}
