<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { data } = await useAPI<RecipesResult>('recipes')
const { data: ingredientsData } = await useAPI<{ ingredients: any[] }>('ingredients')

const portions = ref<number | null>(null)
const searchQuery = ref('')
const sortBy = ref<'default' | 'name' | 'energy'>('default')
const selectedIngredients = ref<number[]>([])

onMounted(() => {
  const savedSortBy = localStorage.getItem('recipes-sortBy')
  if (savedSortBy && (savedSortBy === 'default' || savedSortBy === 'name' || savedSortBy === 'energy')) {
    sortBy.value = savedSortBy as 'default' | 'name' | 'energy'
  }
})

watch(sortBy, (newValue) => {
  localStorage.setItem('recipes-sortBy', newValue)
})

const filteredRecipes = computed(() => {
  if (!data.value)
    return []

  let filtered = data.value.recipes.filter((recipe) => {
    const matchesPortions = !portions.value || recipe.portions === portions.value
    const matchesSearch
      = !searchQuery.value
        || recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesIngredients = selectedIngredients.value.length === 0
      || selectedIngredients.value.every(ingredientId =>
        recipe.ingredient_ids?.includes(ingredientId),
      )

    return matchesPortions && matchesSearch && matchesIngredients
  })

  if (sortBy.value === 'name') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }
  else if (sortBy.value === 'energy') {
    filtered = [...filtered].sort((a, b) => a.energy - b.energy)
  }

  return filtered
})

useHead({
  title: 'Recipes | Nugget',
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
  <div class="sm:flex sm:items-center sm:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">
        Recipes
      </h2>
    </div>
    <div class="mt-5 flex gap-4 sm:ml-4 sm:mt-0">
      <a
        href="/edit"
        class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-400 transition-colors duration-300 hover:bg-orange-50"
      >
        <Icon icon="lets-icons:add-round" class="size-6 text-orange-500" />
        Add recipe
      </a>
    </div>
  </div>
  <div class="flex justify-between pt-6">
    <div class="flex gap-4">
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
        <option value="energy">
          Energy
        </option>
      </select>
      <div class="border-l border-l-gray-400" />
      <input
        id="portions"
        v-model.number="portions"
        type="number"
        name="portions"
        placeholder="portions"
        class="block w-32 rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
      >
      <IngredientMultiSelect
        v-if="ingredientsData"
        v-model="selectedIngredients"
        :ingredients="ingredientsData.ingredients"
        class="w-80"
      />
    </div>
    <button
      type="button"
      class="transparent rounded-md px-3 py-2 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:bg-orange-100 hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      @click="portions = null; searchQuery = ''; sortBy = 'default'; selectedIngredients = []"
    >
      Clear filters
    </button>
  </div>
  <div v-if="data" class="mt-3 grid grid-cols-1 gap-6 @md:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-10 @6xl:grid-cols-4 sm:mt-6">
    <article
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
      class="relative overflow-hidden rounded-md border bg-white transition-all duration-500 hover:shadow-md"
    >
      <div class="absolute right-2 top-2 z-10 rounded-md bg-orange-400 px-4 py-1.5 text-white shadow-md">
        {{ recipe.portions }} portions
      </div>
      <a :href="`/recipes/${recipe.id}-${recipe.slug}`">
        <div class="relative h-52 w-full overflow-hidden">
          <img
            class="absolute inset-0 size-full object-cover"
            :src="recipe.image || 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
            alt="fooood"
          >
        </div>
        <div class="px-6 py-5 @container/grid">
          <h3 class="text-center text-lg font-semibold text-orange-950">{{ recipe.name }}</h3>
          <div class="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-4 text-center @[300px]/grid:flex-nowrap">
            <div>
              <p class="font-medium text-orange-400">{{ Math.round(recipe.energy) || 0 }}</p>
              <p class="text-xs text-orange-950/40">kcal</p>
            </div>
            <div>
              <p class="font-medium text-orange-400">{{ Math.round(recipe.protein) || 0 }}</p>
              <p class="text-xs text-orange-950/40">protein</p>
            </div>
            <div>
              <p class="font-medium text-orange-400">{{ Math.round(recipe.fibres) || 0 }}</p>
              <p class="text-xs text-orange-950/40">fibres</p>
            </div>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>
