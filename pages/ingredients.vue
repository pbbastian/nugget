<script setup lang="ts">
import { Icon } from '@iconify/vue'
import DeleteModal from '../components/modals/DeleteModal.vue'
import IngredientModal from '../components/modals/IngredientModal.vue'

const { data, refresh } = await useAPI<IngredientsResult>('ingredients')

const editId: Ref<any> = ref(null)
const deleteId: Ref<any> = ref(null)

async function onDelete() {
  deleteId.value = null
  refresh()
}

useHead({
  title: 'Ingredients | Nugget',
})
</script>

<template>
  <div class="flex gap-4 pt-6 max-md:flex-col max-md:items-start lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">
        Ingredients
      </h2>
    </div>
    <button
      class="transition-color rounded-md bg-orange-400 px-3 py-2 text-white duration-500 hover:bg-orange-300"
      @click="editId = 'add'"
    >
      Add
      new Ingredient
    </button>
  </div>
  <div v-if="data" class="mt-6">
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="ingredient in data.ingredients" :key="ingredient.id" class="grid grid-cols-5 gap-2 py-5 md:gap-6">
        <div class="col-span-3 flex min-w-0 gap-x-4 max-md:order-1 md:col-span-2">
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
        <div class="col-span-full flex justify-center gap-x-6 text-center max-md:order-3 md:col-span-2 md:justify-start md:gap-x-8">
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
        <div class="col-span-2 flex items-center justify-end gap-2 max-md:order-2 md:col-span-1">
          <button class="transition-color p-1.5 hover:opacity-60" @click="editId = ingredient.id">
            <Icon icon="circum:edit" class="size-6 text-orange-950" />
          </button>
          <button class="transition-color p-1.5 hover:opacity-60" @click="deleteId = ingredient.id">
            <Icon icon="teenyicons:bin-outline" class="size-6 text-red-400" />
          </button>
        </div>
      </li>
    </ul>
  </div>
  <IngredientModal :id="editId" @close-modal="editId = null; refresh()" />
  <DeleteModal :id="deleteId" resource="ingredients" @on-delete="onDelete" @on-cancel="deleteId = null" />
</template>
