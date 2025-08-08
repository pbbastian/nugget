<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { data, pending, error, refresh } = await useAPI<RecipesResult>('recipes')
</script>

<template>
  <div class="lg:flex lg:items-start lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">
        Recipes
      </h2>
    </div>
    <div class="mt-5 flex gap-4 lg:ml-4 lg:mt-0">
      <a
        href="/edit"
        class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-400 transition-colors duration-300 hover:bg-orange-50"
      >
        <Icon icon="lets-icons:add-round" class="size-6 text-orange-500" />
        Add recipe
      </a>
    </div>
  </div>
  <div v-if="data" class="mt-3 grid grid-cols-1 gap-6 @md:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-10 @6xl:grid-cols-4 sm:mt-6">
    <article v-for="recipe in data.recipes" class="relative rounded-md border bg-white transition-all duration-500 hover:shadow-md">
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
