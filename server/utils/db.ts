import { z } from "zod";
import pg from 'pg'

// export default defineNuxtPlugin(() => {});

export const pool: pg.Pool = new pg.Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const ingredientSchema = z.object({
    name: z.string(),
    vendor: z.string().nullable(),
    density: z.number().nullable(),
    weight: z.number().nullable(),
    energy: z.number().nullable(),
    protein: z.number().nullable(),
    fat: z.number().nullable(),
    carbs: z.number().nullable(),
    fibres: z.number().nullable(),
});
