<script setup lang="ts">
import { Icon } from '@iconify/vue'
import DeleteModal from '../components/modals/DeleteModal.vue'
import IngredientModal from '../components/modals/IngredientModal.vue'

const { data, pending, error, refresh } = await useAPI<IngredientsResult>('ingredients')

const editId: Ref<any> = ref(null)
const deleteId: Ref<any> = ref(null)

async function onDelete() {
  deleteId.value = null
  refresh()
}
</script>

<template>
  <div class="flex max-md:flex-col max-md:items-start lg:items-center lg:justify-between gap-4">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">
        Ingredients
      </h2>
    </div>
    <button
      class="py-2 px-3 text-white bg-orange-400 rounded-md hover:bg-orange-300 transition-color duration-500"
      @click="editId = 'add'"
    >
      Add
      new Ingredient
    </button>
  </div>
  <div v-if="data" class="mt-6">
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="ingredient in data.ingredients" class="grid grid-cols-5 gap-2 md:gap-6 py-5">
        <div class="max-md:order-1 col-span-3 md:col-span-2 flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              {{ ingredient.name }}
              <span v-if="ingredient.weight" class="opacity-70">({{ ingredient.weight }} gram)</span>
              <span v-if="ingredient.density" class="opacity-70"> ({{ ingredient.density }} gram/ml)</span>
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {{ ingredient.vendor }}
            </p>
          </div>
        </div>
        <div class="max-md:order-3 col-span-full md:col-span-2 flex gap-x-6 md:gap-x-8 justify-center md:justify-start text-center">
          <div>
            <p class="font-medium text-orange-400">
              {{ ingredient.energy ? Math.round(ingredient.energy) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              kcal
            </p>
          </div>
          <div>
            <p class="font-medium text-orange-400">
              {{ ingredient.protein ? Math.round(ingredient.protein) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              protein
            </p>
          </div>
          <div>
            <p class="font-medium text-orange-400">
              {{ ingredient.fibres ? Math.round(ingredient.fibres) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              fibres
            </p>
          </div>
          <div>
            <p class="font-medium text-orange-400">
              {{ ingredient.carbs ? Math.round(ingredient.carbs) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              carbs
            </p>
          </div>
          <div>
            <p class="font-medium text-orange-400">
              {{ ingredient.fat ? Math.round(ingredient.fat) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              fat
            </p>
          </div>
        </div>
        <div class="max-md:order-2 col-span-2 md:col-span-1 flex items-center justify-end gap-2">
          <button class="p-1.5 hover:opacity-60 transition-color" @click="editId = ingredient.id">
            <Icon icon="circum:edit" class="text-orange-950 h-6 w-6" />
          </button>
          <button class="p-1.5 hover:opacity-60 transition-color" @click="deleteId = ingredient.id">
            <Icon icon="teenyicons:bin-outline" class="text-red-400 h-6 w-6" />
          </button>
        </div>
      </li>
    </ul>
  </div>
  <IngredientModal :id="editId" @close-modal="editId = null; refresh()" />
  <DeleteModal :id="deleteId" resource="ingredients" @on-delete="onDelete" @on-cancel="deleteId = null" />
</template>
