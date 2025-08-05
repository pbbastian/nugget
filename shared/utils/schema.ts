import { z } from "zod";

export const RecipeStep = z.object({
    id: z.number().optional(),
    text: z.string().default(""),
});

export const RecipeStepSection = z.object({
    id: z.number().optional(),
    name: z.string().nullable(),
    items: z.array(RecipeStep),
});

export const IngredientUnit = z.enum(['stk', 'pk', 'g', 'kg', 'ml', 'cl', 'dl', 'l', 'knsp', 'tsk', 'spsk']);

export const RecipeIngredient = z.object({
    id: z.number().optional(),
    amount: z.number().default(0),
    unit: IngredientUnit,
    ingredient: z.object({
        id: z.number()
    }),
});

export const RecipeIngredientSection = z.object({
    id: z.number().optional(),
    name: z.string().nullable(),
    items: z.array(RecipeIngredient),
});

export const Recipe = z.object({
    id: z.number().optional(),
    name: z.string(),
    image: z.string().nullable(),
    portions: z.number().nullable(),
    energy: z.number().nullable(),
    fat: z.number().nullable(),
    carbs: z.number().nullable(),
    fibres: z.number().nullable(),
    protein: z.number().nullable(),
    steps: z.array(RecipeStepSection),
    ingredients: z.array(RecipeIngredientSection),
});
