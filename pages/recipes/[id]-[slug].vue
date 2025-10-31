<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Collapse } from 'vue-collapsed'

const route = useRoute()

const { data } = await useFetch<RecipeResult>(`recipes/${route.params.id}`, {
  $fetch: useNuxtApp().$api,
  default: () => ({ recipe: null }),
})
const { recipe } = toRefs(data.value)

const deleteId: Ref<any> = ref(null)

async function onDelete() {
  deleteId.value = null
  await navigateTo('/')
}

const showIngredientsList = ref(true)

useHead({
  title: `${recipe?.value?.name || 'Edit recipe'} | Nugget`,
})
</script>

<template>
  <div v-if="recipe == null">
    null
  </div>
  <div v-if="recipe != null" class="pt-6 sm:flex sm:items-center sm:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
        {{ recipe.name }}
      </h2>
    </div>
    <div class="mt-5 flex gap-4 sm:ml-4 sm:mt-0">
      <button
        type="button" class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-400 shadow-xs ring-1 ring-inset ring-red-400 hover:bg-red-50"
        @click="deleteId = route.params.id"
      >
        <Icon icon="teenyicons:bin-outline" class="size-5 text-red-400" />
        Delete
      </button>
      <a
        :href="`/edit/${route.params.id}-${route.params.slug}`"
        class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <Icon icon="circum:edit" class="size-6 text-gray-700" />
        Edit
      </a>
    </div>
  </div>
  <div v-if="recipe != null" class="mt-6">
    <div class="relative h-40 w-full overflow-hidden rounded-t-xl md:h-80">
      <div class="absolute right-2 top-2 z-10 rounded-md bg-orange-400 px-4 py-1.5 text-white shadow-md sm:right-6 sm:top-6">
        {{ recipe.portions }} portions
      </div>
      <img
        class="absolute inset-0 size-full object-cover"
        :src="recipe.image || 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
        alt="fooood"
      >
      <div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 justify-center gap-8 rounded-t-md bg-orange-50 px-4 py-2 text-center @[300px]/grid:px-12">
        <div>
          <p class="font-medium text-orange-400">
            {{ Math.round(recipe.energy) || 0 }}
          </p>
          <p class="text-xs text-orange-950/50">
            kcal
          </p>
        </div>
        <div>
          <p class="font-medium text-orange-400">
            {{ Math.round(recipe.protein) || 0 }}
          </p>
          <p class="text-xs text-orange-950/50">
            protein
          </p>
        </div>
        <div>
          <p class="font-medium text-orange-400">
            {{ Math.round(recipe.fat) || 0 }}
          </p>
          <p class="text-xs text-orange-950/50">
            fat
          </p>
        </div>
        <div>
          <p class="font-medium text-orange-400">
            {{ Math.round(recipe.carbs) || 0 }}
          </p>
          <p class="text-xs text-orange-950/50">
            carbs
          </p>
        </div>
        <div>
          <p class="font-medium text-orange-400">
            {{ Math.round(recipe.fibres) || 0 }}
          </p>
          <p class="text-xs text-orange-950/50">
            fibres
          </p>
        </div>
      </div>
    </div>
    <article class="bg-orange-50">
      <div class="grid w-full grid-cols-1 gap-10 px-6 py-8 leading-loose text-orange-950/70 md:grid-cols-3 md:px-12 md:py-16">
        <div class="md:col-span-1">
          <div class="top-20 bg-orange-50 md:sticky lg:top-8">
            <div class="mb-3 flex items-center justify-between">
              <button class="text-2xl font-semibold" @click="showIngredientsList = !showIngredientsList;">
                Ingredients
              </button>
            </div>
            <Collapse :when="showIngredientsList" :base-height="50" class="v-collapse">
              <div class="grid gap-4">
                <div v-for="section in recipe.ingredients" :key="section.id">
                  <h4 v-if="section.name" class="font-bold">
                    {{ section.name }}
                  </h4>
                  <ul class="grid gap-1 lg:gap-3">
                    <li v-for="ingredient in section.items" :key="ingredient.id" class="leading-normal">
                      {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.ingredient?.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="!showIngredientsList" class="absolute bottom-0 h-20 w-full bg-gradient-to-t from-orange-50 to-transparent" />
            </Collapse>
          </div>
        </div>
        <div class="md:col-span-2">
          <h3 class="mb-3 text-2xl  font-semibold">
            Steps
          </h3>
          <div class="grid gap-6">
            <div v-for="section in recipe.steps" :key="section.id">
              <h4 v-if="section.name" class="font-bold">
                {{ section.name }}
              </h4>
              <ol class="grid list-inside list-decimal gap-3 leading-normal marker:font-semibold marker:text-orange-950/80 lg:gap-4">
                <li v-for="step in section.items" :key="step.id">
                  {{ step.text }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
  <ModalsDeleteModal
    :id="deleteId"
    title="Delete recipe?"
    paragraph="Are you sure you want to delete the recipe? The actions can't be undone."
    resource="recipes"
    @on-delete="onDelete"
    @on-cancel="deleteId = null"
  />
</template>

<style>
.v-collapse {
  transition: height 500ms cubic-bezier(0.33, 1, 0.68, 1);
  position: relative;
}
</style>
