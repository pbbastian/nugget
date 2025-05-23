interface RecipeIngredient {
    id?: number
    amount: number
    unit: string
    ingredient: Ingredient
}

export interface IngredientSection {
    id?: number
    name: string
    items: RecipeIngredient[]
}

export interface RecipeStep {
    id?: number
    text: string
}

export interface StepSection {
    id?: number,
    name: string,
    items: RecipeStep[]
}

export interface Recipe {
    id?: number,
    name: string,
    slug: string,
    image: string,
    portions: number,
    energy: number,
    fat: number,
    carbs: number,
    fibres: number,
    protein: number,
    ingredients: IngredientSection[],
    steps: StepSection[]
}

export interface RecipesResult {
    recipes: Recipe[],
}

