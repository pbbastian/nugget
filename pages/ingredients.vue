<template>
    <div class="lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-orange-950 sm:truncate sm:text-3xl sm:tracking-tight ">Ingredients
            </h2>
        </div>
        <button class="py-2 px-3 text-white bg-orange-400 rounded-md hover:bg-orange-300 transition-color duration-500" @click="open = true">Add
            new Ingredient</button>
    </div>
    <div class="mt-6">
        <ul role="list" class="divide-y divide-gray-100">
            <li class="grid grid-cols-5 gap-x-6 py-5">
                <div class="col-span-2 flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Hakket Oksekød <span>(15g pr. tbsp)</span>
                        </p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">Rema 1000</p>
                    </div>
                </div>
                <div class="col-span-2 flex gap-x-8 justify-start text-center">
                    <div>
                        <p class="font-medium text-orange-400">600</p>
                        <p class="text-xs text-orange-950/40">kcal</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">60</p>
                        <p class="text-xs text-orange-950/40">protein</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">10</p>
                        <p class="text-xs text-orange-950/40">fat</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">4</p>
                        <p class="text-xs text-orange-950/40">fibers</p>
                    </div>
                </div>
                <div class="col-span-1 flex items-center justify-end gap-2">
                    <button class="p-1.5 hover:opacity-60 transition-color">
                        <Icon icon="circum:edit" class="text-orange-950 h-6 w-6" />
                    </button>
                    <button class="p-1.5 hover:opacity-60 transition-color">
                        <Icon icon="teenyicons:bin-outline" class="text-red-400 h-6 w-6" />
                    </button>
                </div>
            </li>
            <li class="grid grid-cols-5 gap-x-6 py-5">
                <div class="col-span-2 flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Hakket Oksekød <span>(15g pr. tbsp)</span>
                        </p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">Rema 1000</p>
                    </div>
                </div>
                <div class="col-span-2 flex gap-x-8 justify-start text-center">
                    <div>
                        <p class="font-medium text-orange-400">600</p>
                        <p class="text-xs text-orange-950/40">kcal</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">60</p>
                        <p class="text-xs text-orange-950/40">protein</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">10</p>
                        <p class="text-xs text-orange-950/40">fat</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">4</p>
                        <p class="text-xs text-orange-950/40">fibers</p>
                    </div>
                </div>
                <div class="col-span-1 flex items-center justify-end gap-2">
                    <button class="p-1.5 hover:opacity-60 transition-color">
                        <Icon icon="circum:edit" class="text-orange-950 h-6 w-6" />
                    </button>
                    <button class="p-1.5 hover:opacity-60 transition-color">
                        <Icon icon="teenyicons:bin-outline" class="text-red-400 h-6 w-6" />
                    </button>
                </div>
            </li>
            <li class="grid grid-cols-5 gap-x-6 py-5">
                <div class="col-span-2 flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Hakket Oksekød <span>(15g pr. tbsp)</span>
                        </p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">Rema 1000</p>
                    </div>
                </div>
                <div class="col-span-2 flex gap-x-8 justify-start text-center">
                    <div>
                        <p class="font-medium text-orange-400">600</p>
                        <p class="text-xs text-orange-950/40">kcal</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">60</p>
                        <p class="text-xs text-orange-950/40">protein</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">10</p>
                        <p class="text-xs text-orange-950/40">fat</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">4</p>
                        <p class="text-xs text-orange-950/40">fibers</p>
                    </div>
                </div>
                <div class="col-span-1 flex items-center justify-end gap-2">
                    <button class="p-1.5 hover:opacity-60 transition-color">
                    <Icon icon="circum:edit" class="text-orange-950 h-6 w-6" />
                </button>
                <button class="p-1.5 hover:opacity-60 transition-color">
                    <Icon icon="teenyicons:bin-outline" class="text-red-400 h-6 w-6" />
                </button>
            </div>
        </li>
    </ul>
</div>
<IngredientModal /></template>
  
<script setup>
import { Icon } from '@iconify/vue';
import IngredientModal from "../components/IngredientModal.vue";
</script>