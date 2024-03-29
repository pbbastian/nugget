<template>
    <div class="lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">
                Ingredients
            </h2>
        </div>
        <button class="py-2 px-3 text-white bg-orange-400 rounded-md hover:bg-orange-300 transition-color duration-500"
            @click="modalOpen = true">Add
            new Ingredient</button>
    </div>
    <div class="mt-6">
        <ul role="list" class="divide-y divide-gray-100">
            <li v-for="ingredient in data.ingredients" class="grid grid-cols-5 gap-2 md:gap-6 py-5">
                <div class="max-md:order-1 col-span-3 md:col-span-2 flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">{{ ingredient.name }} 
                            <span class="opacity-70" v-if="ingredient.weight">({{ ingredient.weight }} gram)</span>
                            <span class="opacity-70" v-if="ingredient.density"> ({{ ingredient.density }} gram/ml)</span>
                        </p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ ingredient.vendor }}</p>
                    </div>
                </div>
                <div class="max-md:order-3 col-span-full md:col-span-2 flex gap-x-6 md:gap-x-8 justify-center md:justify-start text-center">
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(ingredient.energy) || 0 }}</p>
                        <p class="text-xs text-orange-950/40">kcal</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(ingredient.protein) || 0 }}</p>
                        <p class="text-xs text-orange-950/40">protein</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(ingredient.fibres) || 0 }}</p>
                        <p class="text-xs text-orange-950/40">fibres</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(ingredient.carbs) || 0 }}</p>
                        <p class="text-xs text-orange-950/40">carbs</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(ingredient.fat) || 0 }}</p>
                        <p class="text-xs text-orange-950/40">fat</p>
                    </div>
                </div>
                <div class="max-md:order-2 col-span-2 md:col-span-1 flex items-center justify-end gap-2">
                    <button class="p-1.5 hover:opacity-60 transition-color" @click="modalOpen = true">
                        <Icon icon="circum:edit" class="text-orange-950 h-6 w-6" />
                    </button>
                    <button class="p-1.5 hover:opacity-60 transition-color" @click="deleteModalOpen = true">
                        <Icon icon="teenyicons:bin-outline" class="text-red-400 h-6 w-6" />
                    </button>
                </div>
            </li>
        </ul>
    </div>
    <IngredientModal :open="modalOpen" @close-modal="modalOpen = false" />
    <DeleteModal :open="deleteModalOpen" @close-delete-modal="deleteModalOpen = false" />
</template>


<script setup>
import { Icon } from '@iconify/vue';
import IngredientModal from "../components/modals/IngredientModal.vue";
import DeleteModal from "../components/modals/DeleteModal.vue";

const { data, pending, error, refresh } = await useIngredients();

const modalOpen = ref(false);
const deleteModalOpen = ref(false);
</script>