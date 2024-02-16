<template>
    <div class="lg:flex lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">Recipe name
            </h2>
            <div class="mt-3 flex sm:flex-wrap sm:space-x-2">
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
            <button type="button"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-400 shadow-sm ring-1 ring-inset ring-red-400 hover:bg-red-50">
                <Icon icon="teenyicons:bin-outline" class="text-red-400 h-5 w-5" />
                Delete
            </button>
            <button type="button"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Icon icon="lets-icons:folder-dublicate-light" class="text-gray-700 h-6 w-6" />
                Duplicate
            </button>
            <button type="button"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Icon icon="circum:edit" class="text-gray-700 h-6 w-6" />
                Edit
            </button>
        </div>
    </div>
    <div class="mt-6">
        <div class="relative h-80 w-full overflow-hidden rounded-t-xl">
            <img class="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="fooood">
        </div>
        <article class="bg-orange-50 min-h-36 relative">
            <div class="absolute -top-14 left-1/2 -translate-x-1/2 bg-orange-50 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center px-12 py-2 rounded-t-md">
                <div>
                    <p class="font-medium text-orange-400">600</p>
                    <p class="text-xs text-orange-950/50">kcal</p>
                </div>
                <div>
                    <p class="font-medium text-orange-400">60</p>
                    <p class="text-xs text-orange-950/50">protein</p>
                </div>
                <div>
                    <p class="font-medium text-orange-400">10</p>
                    <p class="text-xs text-orange-950/50">fat</p>
                </div>
                <div>
                    <p class="font-medium text-orange-400">4</p>
                    <p class="text-xs text-orange-950/50">fibers</p>
                </div>
            </div>

        </article>
    </div>
</template>
  
<script setup>
import { Icon } from '@iconify/vue';
</script>