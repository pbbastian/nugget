<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref, watch } from 'vue'
import DeleteModal from '../components/modals/DeleteModal.vue'
import IngredientModal from '../components/modals/IngredientModal.vue'

const { data, refresh } = await useAPI<IngredientsResult>('ingredients')

const searchQuery = ref('')
const sortBy = ref<'default' | 'name'>('default')

onMounted(() => {
  const savedSortBy = localStorage.getItem('ingredients-sortBy')
  if (savedSortBy && (savedSortBy === 'default' || savedSortBy === 'name')) {
    sortBy.value = savedSortBy as 'default' | 'name'
  }
})

watch(sortBy, (newValue) => {
  localStorage.setItem('ingredients-sortBy', newValue)
})

const filteredIngredients = computed(() => {
  if (!data.value)
    return []

  let filtered = data.value.ingredients.filter((ingredient) => {
    return !searchQuery.value
      || ingredient.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })

  if (sortBy.value === 'name') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }

  return filtered
})

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
  <div class="sticky inset-x-0 top-10 z-30 -mx-1 mb-8 bg-white px-1 pt-4 lg:top-0">
    <form class="relative flex-1 border-b" action="#" method="GET">
      <label for="search-field" class="sr-only">Search</label>
      <svg
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd"
        />
      </svg>
      <input
        id="search-field"
        v-model="searchQuery"
        class="block size-full rounded-md border-none py-4 pl-8 pr-0 text-sm text-gray-900 outline-0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500"
        placeholder="Search..."
        type="search"
        name="search"
      >
    </form>
  </div>
  <div class="flex gap-4 pt-6 max-sm:flex-col max-sm:items-start lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">
        Ingredients
      </h2>
    </div>
    <button
      class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-400 transition-colors duration-300 hover:bg-orange-50"
      @click="editId = 'add'"
    >
      <Icon icon="lets-icons:add-round" class="size-6 text-orange-500" />
      Add Ingredient
    </button>
  </div>
  <div class="pt-6">
    <select
      id="sortBy"
      v-model="sortBy"
      name="sortBy"
      class="block w-40 rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
    >
      <option value="default">
        Default
      </option>
      <option value="name">
        Name
      </option>
    </select>
  </div>
  <div v-if="data" class="mt-6">
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="ingredient in filteredIngredients" :key="ingredient.id" class="grid grid-cols-5 gap-2 py-5 md:gap-6">
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
        <div class="col-span-full grid grid-cols-5 gap-x-4 text-center max-md:order-3 md:col-span-2">
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
              {{ ingredient.fat ? Math.round(ingredient.fat) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              fat
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
              {{ ingredient.fibres ? Math.round(ingredient.fibres) : '-' }}
            </p>
            <p class="text-xs text-orange-950/40">
              fibres
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
  <DeleteModal
    :id="deleteId"
    title="Delete ingredient?"
    paragraph="Are you sure you want to delete the ingredient? It will be removed from all recipes."
    resource="ingredients"
    @on-delete="onDelete"
    @on-cancel="deleteId = null"
  />
</template>
