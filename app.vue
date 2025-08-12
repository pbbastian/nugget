<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div>
    <aside class="fixed z-50 flex gap-12 overflow-hidden bg-white px-6 pt-2 max-lg:inset-x-0 max-lg:items-center max-lg:justify-between max-lg:border-b max-lg:pb-2 max-lg:shadow-sm lg:inset-y-0 lg:h-screen lg:w-72 lg:flex-col lg:border-r lg:pt-8">
      <a href="/" class="h-auto w-[140px] lg:w-3/4">
        <img src="/svg/logo.svg" alt="Nugget logo">
      </a>
      <div class="flex h-full justify-between lg:flex-col">
        <nav>
          <ul class="-mx-3 flex gap-2 font-semibold text-gray-700 lg:flex-col">
            <li>
              <a
                href="/"
                class="transition-color group flex items-center gap-2 rounded-md p-2 duration-300 hover:bg-orange-50 hover:text-orange-400 lg:gap-3"
              >
                <Icon
                  icon="ph:bowl-food-light"
                  class="transition-color size-6 text-gray-400 duration-300 group-hover:text-orange-400 max-sm:hidden"
                />
                Recipes
              </a>
            </li>
            <li>
              <a
                href="/ingredients"
                class="transition-color group flex items-center gap-2 rounded-md p-2 duration-300 hover:bg-orange-50 hover:text-orange-400 lg:gap-3"
              >
                <Icon
                  icon="fluent:food-carrot-20-regular"
                  class="transition-color size-6 text-gray-400 duration-300 group-hover:text-orange-400 max-sm:hidden"
                />
                Ingredients
              </a>
            </li>
          </ul>
        </nav>
        <!-- <a href="#"
          class="text-gray-900 font-semibold text-sm flex items-center gap-4 -mx-6 px-6 py-4 hover:bg-orange-50">
          <img class="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
          alt="">
        <span class="sr-only">Your profile</span>
        <span aria-hidden="true">Peter Bay Bastian</span>
      </a> -->
      </div>
    </aside>
    <main class="relative max-lg:pt-16 lg:min-h-screen lg:pl-72">
      <div class="mx-auto max-w-screen-xl px-8 pb-10 @container">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
