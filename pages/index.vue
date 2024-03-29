<template>
    <div class="lg:flex lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">Recipes</h2>
        </div>
        <div class="mt-5 flex gap-4 lg:ml-4 lg:mt-0">
            <a href="/edit"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-400 hover:bg-orange-50 transition-colors duration-300">
                <Icon icon="lets-icons:add-round" class="text-orange-500 h-6 w-6" />
                Add recipe
        </a>
        </div>
    </div>
    <div class="grid mt-3 sm:mt-6 grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 gap-6 @3xl:gap-10">
        <article v-for="recipe in data.recipes" class="relative rounded-md bg-white border hover:shadow-md transition-all duration-500">
            <div
                class="z-10 absolute top-2 right-2 py-1.5 px-4 bg-orange-400 rounded-md shadow-md text-white">
                {{ recipe.portions }} portions
        </div>
            <a :href="'/recipes/' + recipe.id">
                <div class="relative h-52 w-full overflow-hidden">
                    <img class="absolute inset-0 w-full h-full object-cover"
                        :src="recipe.image || 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                        alt="fooood">
                </div>
                <div class="py-5 px-6 @container/grid">
                    <h3 class="text-lg font-semibold text-orange-950 text-center">{{ recipe.name }}</h3>
                    <div class="mt-3 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center">
                        <div>
                            <p class="font-medium text-orange-400">{{ Math.round(recipe.energy) || 0 }}</p>
                            <p class="text-xs text-orange-950/40">kcal</p>
                        </div>
                        <div>
                            <p class="font-medium text-orange-400">{{ Math.round(recipe.protein) || 0 }}</p>
                            <p class="text-xs text-orange-950/40">protein</p>
                        </div>
                        <div>
                            <p class="font-medium text-orange-400">{{ Math.round(recipe.fat) || 0 }}</p>
                            <p class="text-xs text-orange-950/40">fat</p>
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
  
<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { data, pending, error, refresh } = await useRecipes();
</script>