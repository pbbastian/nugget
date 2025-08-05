<template>
    <div v-if="recipe == null">null</div>
    <div class="lg:flex lg:items-start lg:justify-between" v-if="recipe != null">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight"> {{ recipe.name }} </h2>
            <div class="hidden mt-3 sm:flex-wrap sm:space-x-2">
                <button
                    class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-500 ring-1 ring-inset ring-orange-500/10 hover:opacity-50">Kylling</button>
                <button
                    class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-500 ring-1 ring-inset ring-orange-500/10 hover:opacity-50">Aftensmad</button>
                <button
                    class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-500 ring-1 ring-inset ring-orange-500/10 hover:opacity-50">Skinny</button>
                <button
                    class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-500 ring-1 ring-inset ring-orange-500/10 hover:opacity-50">Ris</button>
            </div>
        </div>
        <div class="mt-5 flex gap-4 lg:ml-4 lg:mt-0">
            <button type="button" @click="deleteModalOpen = true"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-400 shadow-sm ring-1 ring-inset ring-red-400 hover:bg-red-50">
                <Icon icon="teenyicons:bin-outline" class="text-red-400 h-5 w-5" />
                Delete
            </button>
            <button type="button"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Icon icon="lets-icons:folder-dublicate-light" class="text-gray-700 h-6 w-6" />
                Duplicate
            </button>
            <a :href="'/edit/' + route.params.id + '-' + route.params.slug"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Icon icon="circum:edit" class="text-gray-700 h-6 w-6" />
                Edit
        </a>
        </div>
    </div>
    <div class="mt-6" v-if="recipe != null">
        <div class="relative h-40 md:h-80 w-full overflow-hidden rounded-t-xl">
            <div class="z-10 absolute top-2 sm:top-6 right-2 sm:right-6 py-1.5 px-4 bg-orange-400 rounded-md shadow-md text-white">
                {{ recipe.portions }} portions
            </div>
            <img class="absolute inset-0 w-full h-full object-cover"
                :src="recipe.image || 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                alt="fooood">
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-orange-50 flex gap-8 justify-center text-center px-4 @[300px]/grid:px-12 py-2 rounded-t-md">
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(recipe.energy) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">kcal</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(recipe.protein) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">protein</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(recipe.fat) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">fat</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(recipe.carbs) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">carbs</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(recipe.fibres) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">fibres</p>
                    </div>
                </div>
        </div>
        <article class="bg-orange-50">
            <div class="w-full px-6 md:px-12 py-8 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-orange-950/70 leading-loose">
                <div class="md:col-span-1">
                    <div class="md:sticky top-20 lg:top-8 bg-orange-50">
                        <div class="flex items-center justify-between mb-3">
                            <button @click="showIngredientsList = !showIngredientsList;" class="text-2xl font-semibold">Ingredients</button>
                            <!-- Ingredients copy button
                                <button class="p-1.5 text-orange-400 hover:text-orange-200 transition-color duration-500">
                                    <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="h-6 w-6" />
                                </button>
                            -->
                        </div>
                        <Collapse :when="showIngredientsList" :baseHeight="50" class="v-collapse">
                            <div class="grid gap-4">
                                <div v-for="section in recipe.ingredients">
                                    <h4 v-if="section.name" class="font-bold">{{ section.name }}</h4>
                                    <ul class="grid gap-1 lg:gap-3">
                                        <li class="leading-normal" v-for="ingredient in section.items">{{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.ingredient.name }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="!showIngredientsList" class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-orange-50 to-transparent"></div>
                        </Collapse>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <h3 class="text-2xl font-semibold  mb-3">Steps</h3>
                    <div class="grid gap-6">
                        <div v-for="section in recipe.steps">
                            <h4 class="font-bold" v-if="section.name">{{ section.name }}</h4>
                            <ol class="grid gap-3 lg:gap-4 leading-normal list-decimal list-inside marker:font-semibold marker:text-orange-950/80">
                                <li v-for="step in section.items">{{ step.text }}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <!-- <DeleteModal :open="deleteModalOpen" @close-delete-modal="deleteModalOpen = false"/> -->
</template>

<style>
.v-collapse {
  transition: height 500ms cubic-bezier(0.33, 1, 0.68, 1);
  position: relative;
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Collapse } from 'vue-collapsed';
import DeleteModal from "../components/modals/DeleteModal.vue";

const route = useRoute()

const { data, refresh, clear } = await useFetch<RecipeResult>(computed(() => `recipes/${route.params.id}`), {
    $fetch: useNuxtApp().$api,
    default: () => ({ recipe: null }),
});
const { recipe } = toRefs(data.value);

const deleteModalOpen = ref(false);
const showIngredientsList = ref(true);
</script>
