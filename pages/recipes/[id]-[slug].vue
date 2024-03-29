<template>
    <div class="lg:flex lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight"> {{ data.recipe.name }} </h2>
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
            <a :href="'/edit/' + route.params.id"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Icon icon="circum:edit" class="text-gray-700 h-6 w-6" />
                Edit
        </a>
        </div>
    </div>
    <div class="mt-6">
        <div class="relative h-40 md:h-80 w-full overflow-hidden rounded-t-xl">
            <img class="absolute inset-0 w-full h-full object-cover"
                :src="data.recipe.image || 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                alt="fooood">
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-orange-50 flex gap-8 justify-center text-center px-4 @[300px]/grid:px-12 py-2 rounded-t-md">
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(data.recipe.energy) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">kcal</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(data.recipe.protein) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">protein</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(data.recipe.fat) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">fat</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(data.recipe.carbs) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">carbs</p>
                    </div>
                    <div>
                        <p class="font-medium text-orange-400">{{ Math.round(data.recipe.fibres) || 0 }}</p>
                        <p class="text-xs text-orange-950/50">fibres</p>
                    </div>
                </div>
        </div>
        <article class="bg-orange-50">
            <div class="w-full px-6 md:px-12 py-8 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-orange-950/70 leading-loose">
                <div class="md:col-span-1">
                    <div class="md:sticky top-20 lg:top-8 bg-orange-50">
                        <div class="flex items-center justify-between mb-3 md:mb-6">
                            <button @click="showIngredientsList = !showIngredientsList;" class="text-2xl font-semibold">Ingredients</button>
                            <button class="p-1.5 text-orange-400 hover:text-orange-200 transition-color duration-500">
                                <Icon icon="fluent:clipboard-bullet-list-rtl-20-regular" class="h-6 w-6" />
                            </button>
                        </div>
                        <Collapse :when="showIngredientsList" :baseHeight="50" class="v-collapse">
                            <div class="grid gap-4 lg:gap-8">
                                <div>
                                    <h4 class="font-bold">Tærtebund</h4>
                                    <ul class="grid gap-0.5 lg:gap-1">
                                        <li>100 g. smør</li>
                                        <li>100 g. hvedemel</li>
                                        <li>80 g. grahamsmel</li>
                                        <li>1 stk. æg</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold">Fyld</h4>
                                    <ul class="grid gap-1">
                                        <li>300 g. hakket oksekød</li>
                                        <li>0,5 brev tacokrydderi</li>
                                        <li>0,5 stk. rød peberfrugt</li>
                                        <li>0,25 bundt forårsløg</li>
                                        <li>100 g. majs på dåse</li>
                                        <li>4 stk. æg</li>
                                        <li>100 g. creme fraiche</li>
                                        <li>salt/peber</li>
                                        <li>50 g. cheddar</li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="!showIngredientsList" class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-orange-50 to-transparent"></div>
                        </Collapse>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <h3 class="text-2xl font-semibold  mb-3 md:mb-6">Steps</h3>
                    <ol class="grid gap-3 lg:gap-6 list-decimal list-inside marker:font-semibold marker:text-orange-950/80">
                        <li>Først laves tærtedejen. Skær smør i små tern.</li>
                        <li>Bland alle ingredienserne i en skål. Start med at samle dejen sammen med hænderne.</li>
                        <li>Smuldr alle ingredienserne sammen og bliv ved med at arbejde med dejen til den samler sig.</li>
                        <li>Du kan evt. tilsætte lidt vand, hvis du har svært ved at samle dejen.</li>
                        <li>Når du har en ensartet dej, så formes den til en kugle, som trykkes flad (så er den nem at rulle ud). Pak den ind i husholdningsfilm.</li>
                        <li>Sæt dejen på køl i 30 min.</li>
                        <li>Imens den er på køl, så kan du forberede fyldet.</li>
                        <li>Varm en gryde op med fedtstof.</li>
                        <li>Kom hakket oksekød i og lad det stege til det har fået farve over det hele. Tilsæt så tacokrydderi og vendt det godt rundt. Tag kødet fra og lad det køle en smule af.</li>
                        <li>Hak peberfrugt og forårsløg fint. Dræn majs.</li>
                        <li>Pisk æg sammen med creme fraiche og salt/peber. Riv cheddar og vend i æggemassen.</li>
                        <li>Tænd ovnen på 190 grader varmluft.</li>
                        <li>Rul tærtedejen ud i lidt hvedemel til en cirkel, så den passer med et tærtefad på ca. 24-26 cm. i diameter. Kom bunden over i fadet og pres den godt ud mod kanterne. Skær evt. overskydende dej af. Prik bunden med en gaffel.</li>
                        <li>Forbag bunden i den forvarmet ovn i 10 minutter.</li>
                        <li>Tag herefter bunden ud.</li>
                        <li>Fordel fyld og æggeblandingen på bunden.</li>
                        <li>Bag tærten ved 180 grader varmluft i 25-30 minutter. Hold øje med den efter 20 minutter, da der kan være forskel på ovne.</li>
                        <li>Tag tærten ud og lad den køle af 5-10 minutter inden den spises. Pynt evt. med lidt forårsløg på toppen.</li>
                    </ol>
                </div>
            </div>
        </article>
    </div>
    <DeleteModal :open="deleteModalOpen" @close-delete-modal="deleteModalOpen = false"/>
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

    const { data, pending, error, refresh } = await useRecipe(route.params.id);

    const deleteModalOpen = ref(false);
    const showIngredientsList = ref(true);
</script>