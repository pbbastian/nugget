<template>
    <div class="lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight ">Recipes</h2>
        </div>
    </div>
    <div class="grid mt-6 grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 gap-6 @3xl:gap-10">
        <article class="relative rounded-md bg-white border hover:shadow-md transition-all duration-500">
            <button
                class="z-10 absolute top-2 right-2 p-1.5 bg-orange-400 rounded-md shadow-md hover:bg-orange-300 transition-color duration-500">
                <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="text-white h-6 w-6" />
            </button>
            <a href="/recipe">
                <div class="relative h-52 w-full overflow-hidden">
                    <img class="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="fooood">
                </div>
                <div class="py-5 px-6 @container/grid">
                    <h3 class="text-lg font-semibold text-orange-950 text-center">New food</h3>
                    <div class="mt-3 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center">
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
                </div>
            </a>
        </article>
        <article class="relative rounded-md bg-white border hover:shadow-md transition-all duration-500">
            <button
                class="z-10 absolute top-2 right-2 p-1.5 bg-orange-400 rounded-md shadow-md hover:bg-orange-300 transition-color duration-500">
                <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="text-white h-6 w-6" />
            </button>
            <a href="/recipe">
                <div class="relative h-52 w-full overflow-hidden">
                    <img class="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="fooood">
                </div>
                <div class="py-5 px-6 @container/grid">
                    <h3 class="text-lg font-semibold text-orange-950 text-center">New food</h3>
                    <div class="mt-3 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center">
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
                </div>
            </a>
        </article>
        <article class="relative rounded-md bg-white border hover:shadow-md transition-all duration-500">
            <button
                class="z-10 absolute top-2 right-2 p-1.5 bg-orange-400 rounded-md shadow-md hover:bg-orange-300 transition-color duration-500">
                <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="text-white h-6 w-6" />
            </button>
            <a href="/recipe">
                <div class="relative h-52 w-full overflow-hidden">
                    <img class="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="fooood">
                </div>
                <div class="py-5 px-6 @container/grid">
                    <h3 class="text-lg font-semibold text-orange-950 text-center">New food</h3>
                    <div class="mt-3 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center">
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
                </div>
            </a>
        </article>
        <article class="relative rounded-md bg-white border hover:shadow-md transition-all duration-500">
            <button
                class="z-10 absolute top-2 right-2 p-1.5 bg-orange-400 rounded-md shadow-md hover:bg-orange-300 transition-color duration-500">
                <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="text-white h-6 w-6" />
            </button>
            <a href="/recipe">
                <div class="relative h-52 w-full overflow-hidden">
                    <img class="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="fooood">
                </div>
                <div class="py-5 px-6 @container/grid">
                    <h3 class="text-lg font-semibold text-orange-950 text-center">New food</h3>
                    <div class="mt-3 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center">
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
                </div>
            </a>
        </article>
        <article class="relative rounded-md bg-white border hover:shadow-md transition-all duration-500">
            <button
                class="z-10 absolute top-2 right-2 p-1.5 bg-orange-400 rounded-md shadow-md hover:bg-orange-300 transition-color duration-500">
                <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="text-white h-6 w-6" />
            </button>
            <a href="/recipe">
                <div class="relative h-52 w-full overflow-hidden">
                    <img class="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="fooood">
                </div>
                <div class="py-5 px-6 @container/grid">
                    <h3 class="text-lg font-semibold text-orange-950 text-center">New food</h3>
                    <div class="mt-3 flex gap-x-8 gap-y-4 flex-wrap @[300px]/grid:flex-nowrap justify-center text-center">
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
                </div>
            </a>
        </article>
    </div>
</template>
  
<script setup>
import { Icon } from '@iconify/vue';
</script>