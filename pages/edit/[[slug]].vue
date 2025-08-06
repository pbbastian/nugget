<template>
    <div class="lg:flex lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">Edit recipe
            </h2>
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
        </div>
    </div>
    <div class="mt-6" v-if="recipe != null">
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">General information</h2>

                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="recipename" class="block text-sm font-medium leading-6 text-gray-900">Recipe
                                name</label>
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500">
                                    <input type="text" name="recipename" id="recipename" v-model="recipe.name"
                                        class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Nuggets med fritter" />
                                </div>
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="portions"
                                class="block text-sm font-medium leading-6 text-gray-900">Portions</label>
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                                    <input type="number" name="portions" id="portions" v-model="recipe.portions"
                                        class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="4" />
                                </div>
                            </div>
                        </div>

                        <div class="sm:col-span-full">
                            <label for="portions"
                                   class="block text-sm font-medium leading-6 text-gray-900">Recipe photo</label>
                            <div class="mt-2">
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500">
                                    <input type="url" name="image" id="image" v-model="recipe.image"
                                           class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <Icon v-if="!recipe.image" icon="f7:photo-fill"
                                  class="h-40 w-full text-gray-300" aria-hidden="true" />
                            <div v-else class="mt-3 h-32 sm:h-52 w-full relative rounded-md overflow-hidden">
                                <img class="absolute inset-0 w-full h-full object-cover"
                                     :src="recipe.image"
                                     alt="fooood">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Ingredients</h2>
                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div v-for="(section, sectionIndex) in recipe.ingredients" class="col-span-full">
                            <div>
                                <label for="section-name" class="block text-sm font-medium leading-6 text-gray-900">
                                    Section name <span>{{ sectionIndex + 1 }}</span>
                                </label>
                                <div class="mt-2">
                                    <div
                                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                                        <input type="text" name="section-name" id="section-name" v-model="section.name"
                                            class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <button @click="recipe.ingredients.splice(sectionIndex, 1)" type="button">
                                    <Icon icon="teenyicons:bin-outline"
                                        class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" />
                                </button>
                            </div>
                            <div v-for="(ingredient, index) in section.items" class="grid grid-cols-4 gap-2 sm:gap-6">
                                <div class="col-span-full sm:col-span-2 w-full">
                                    <Combobox as="div" v-model="section.items[index].ingredient" @update:modelValue="query = ''">
                                        <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Ingredient</ComboboxLabel>
                                        <div class="relative mt-2">
                                            <ComboboxInput class="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-transparent sm:text-sm/6" @change="query = $event.target.value" @blur="query = ''" :display-value="(ingredient) => (ingredient as Ingredient)?.name" />
                                            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
                                            </ComboboxButton>
    
                                            <ComboboxOptions v-if="filteredIngredients.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ComboboxOption v-for="ingredient in filteredIngredients" :key="ingredient.id" :value="ingredient" as="template" v-slot="{ active, selected }">
                                                    <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-orange-500 text-white outline-none' : 'text-gray-900']">
                                                        <div class="flex">
                                                            <span :class="['truncate', selected && 'font-semibold']">{{ ingredient.name }}</span>
                                                            <span :class="['ml-2 truncate text-gray-500', active ? 'text-orange-200' : 'text-gray-500']">{{ ingredient.vendor }}</span>
                                                        </div>
    
                                                        <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-orange-500']">
                                                              <CheckIcon class="size-5" aria-hidden="true" />
                                                            </span>
                                                    </li>
                                                </ComboboxOption>
                                            </ComboboxOptions>
                                        </div>
                                    </Combobox>
                                </div>
                                <div class="col-span-2 sm:col-span-1 w-full">
                                    <label for="amount"
                                        class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                                    <div class="mt-2">
                                        <div
                                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                                            <input type="number" name="amount" id="amount" v-model="ingredient.amount"
                                                class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-2 sm:col-span-1 w-full">
                                    <label for="unit" class="block text-sm font-medium leading-6 text-gray-900">Unit</label>
                                    <div class="mt-2 flex items-center gap-2 sm:gap-4">
                                        <select id="unit" name="unit" v-model="ingredient.unit"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option v-for="unit in units">{{ unit }}</option>
                                        </select>
    
                                        <button @click="section.items.splice(index, 1)" type="button">
                                            <Icon icon="teenyicons:bin-outline"
                                                class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-full flex justify-end">
                                <button type="button" @click="section.items.push({ amount: 0, unit: units[0], ingredient: null })"
                                    class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                    <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                    Add ingredient
                                </button>
                            </div>
                        </div>
                        <div class="col-span-full flex justify-end">
                            <button type="button" @click="recipe.ingredients.push({ name: '', items: [] })"
                                class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                Add section
                            </button>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Steps</h2>
                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-6">
                        <div v-for="(section, sectionIndex) in recipe.steps" class="col-span-full">
                            <div>
                                <label for="section-name" class="block text-sm font-medium leading-6 text-gray-900">
                                    Section name <span>{{ sectionIndex + 1 }}</span>
                                </label>
                                <div class="mt-2">
                                    <div
                                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                                        <input type="text" name="section-name" id="section-name" v-model="section.name"
                                            class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <button @click="recipe.steps.splice(sectionIndex, 1)" type="button">
                                    <Icon icon="teenyicons:bin-outline"
                                        class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" />
                                </button>
                            </div>
                            <div v-for="(step, stepIndex) in section.items">
                                <div class="flex justify-between items-end">
                                    <label :for="'step' + stepIndex" class="block text-sm font-medium leading-6 text-gray-900">
                                        Step <span>{{ stepIndex + 1 }}</span>
                                    </label>
                                    <button @click="section.items.splice(stepIndex, 1)" type="button">
                                        <Icon icon="teenyicons:bin-outline"
                                            class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" />
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <textarea :id="'step' + stepIndex" :name="'step' + stepIndex" rows="3" v-model="step.text"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"></textarea>
                                </div>
                            </div>
                            <div class="col-span-full flex justify-end">
                                <button type="button" @click="section.items.push({ text: '' })"
                                    class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                    <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                    Add step
                                </button>
                            </div>
                        </div>
                        <div class="col-span-full flex justify-end">
                            <button type="button" @click="recipe.steps.push({ name: '', items: [] })"
                                class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                Add section
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button @click="$router.go(-1)" type="button"
                    class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button v-if="!saving" @click="save()" type="button"
                    class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">Save</button>
            </div>
        </form>
    </div>
    <!-- <DeleteModal :open="deleteModalOpen" @close-delete-modal="deleteModalOpen = false" /> -->
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
// import DeleteModal from "../components/modals/DeleteModal.vue";

const route = useRoute()
const divider = route.params.slug.indexOf("-");
const id = divider != -1 ? route.params.slug.slice(0, divider) : null;
const recipe: Ref<Recipe | null> = ref(null);
const ingredients: Ref<Ingredient[]> = ref([]);
if (id) {
    const { data } = await useFetch<EditRecipeResult>(`recipes/${id}?ingredients=all`, {
        $fetch: useNuxtApp().$api,
        default: () => ({ recipe: null, ingredients: [] }),
    });
    recipe.value = data.value.recipe;
    ingredients.value = data.value.ingredients;
} else {
    const { data } = await useFetch<IngredientsResult>(`ingredients`, {
        $fetch: useNuxtApp().$api,
        default: () => ({ ingredients: [] }),
    });
    recipe.value = {
        id: 'add',
        name: "",
        image: null,
        portions: 4,
        energy: 0,
        fat: 0,
        carbs: 0,
        fibres: 0,
        protein: 0,
        ingredients: [],
        steps: []
    };
    ingredients.value = data.value.ingredients;
}
const { saving, save } = useEdit("recipes", recipe, async (id, slug) => {
    await navigateTo(`edit/${id}-${slug}`);
});
const deleteModalOpen = ref(false);

const query = ref('');
const filteredIngredients = computed(() =>
    query.value === ''
        ? ingredients.value
        : ingredients.value.filter((ingredient) => {
            return ingredient.name.toLowerCase().includes(query.value.toLowerCase())
        }),
);

const units = ['stk', 'pk', 'knsp', 'tsk', 'spsk', 'ml', 'cl', 'dl', 'l', 'g', 'kg']

</script>
