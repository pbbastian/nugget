<script setup>
import { Icon } from '@iconify/vue'

const route = useRoute()
const isRecipesActive = computed(() => route.path === '/' || route.path.startsWith('/recipes') || route.path.startsWith('/edit'))
const isIngredientsActive = computed(() => route.path.startsWith('/ingredients'))
</script>

<template>
  <div>
    <aside class="fixed z-50 flex gap-12 overflow-hidden bg-white px-6 pt-2 max-lg:inset-x-0 max-lg:items-center max-lg:justify-between max-lg:border-b max-lg:border-b-gray-300 max-lg:pb-2 max-lg:shadow-xs lg:inset-y-0 lg:h-screen lg:w-72 lg:flex-col lg:border-r lg:border-r-gray-300 lg:pt-8">
      <a href="/" class="h-auto w-[140px] lg:w-3/4">
        <img src="/svg/logo.svg" alt="Nugget logo">
      </a>
      <div class="flex h-full justify-between lg:flex-col">
        <nav>
          <ul class="-mx-3 flex gap-2 font-semibold text-gray-700 lg:flex-col">
            <li>
              <a
                href="/"
                class="transition-color group flex items-center gap-2 rounded-md p-2 duration-300 lg:gap-3"
                :class="[
                  isRecipesActive && 'bg-gray-50 text-orange-400',
                ]"
              >
                <Icon
                  icon="ph:bowl-food-light"
                  class="transition-color size-6 duration-300 group-hover:text-orange-400 max-sm:hidden"
                  :class="[
                    isRecipesActive ? 'text-orange-400' : 'text-gray-400',
                  ]"
                />
                Recipes
              </a>
            </li>
            <li>
              <a
                href="/ingredients"
                class="transition-color group flex items-center gap-2 rounded-md p-2 duration-300 lg:gap-3 hover:bg-orange-50 hover:text-orange-400"
                :class="[
                  isIngredientsActive && 'bg-gray-50 text-orange-400',
                ]"
              >
                <Icon
                  icon="fluent:food-carrot-20-regular"
                  class="transition-color size-6 duration-300 group-hover:text-orange-400 max-sm:hidden"
                  :class="[
                    isIngredientsActive ? 'text-orange-400' : 'text-gray-400',
                  ]"
                />
                Ingredients
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <main class="relative max-lg:pt-16 lg:min-h-screen lg:pl-72">
      <div class="mx-auto max-w-screen-xl px-8 pb-10 @container">
        <NuxtPage />
      </div>
    </main>
    <ToastContainer />
  </div>
</template>
