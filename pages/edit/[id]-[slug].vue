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
    <div class="mt-6" v-if="data != null">
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Generel information</h2>

                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="recipename" class="block text-sm font-medium leading-6 text-gray-900">Recipe
                                name</label>
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500">
                                    <input type="text" name="recipename" id="recipename" :value="data.name"
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
                                    <input type="number" name="portions" id="portions" :value="data.portions"
                                        class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="4" />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <p class="block text-sm font-medium leading-6 text-gray-900">Recipe
                                photo</p>
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <Icon v-if="!data.image" icon="f7:photo-fill"
                                        class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div v-else class="mx-auto h-24 w-40 relative rounded-md overflow-hidden">
                                        <img class="absolute inset-0 w-full h-full object-cover"
                                            :src="data.image"
                                            alt="fooood">
                                    </div>
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label for="cover-photo"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-600">
                                            <span>Upload a file</span>
                                            <input id="cover-photo" name="cover-photo" type="file" class="sr-only" />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Ingredients</h2>
                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div v-for="(ingredient, index) in ingredients"
                            class="col-span-full grid grid-cols-4 gap-2 sm:gap-6">
                            <div class="col-span-full sm:col-span-2 w-full">
                                <p class="block text-sm font-medium leading-6 text-gray-900">Ingredient</p>
                                <div class="mt-2">
                                    <Combobox v-model="selected">
                                        <div class="relative mt-1">
                                            <div block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                                ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                                                focus:ring-orange-500 sm:max-w-xs sm:text-sm sm:leading-6
                                                class="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6">
                                                <ComboboxInput
                                                    class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                    :displayValue="(person) => person.name"
                                                    @change="query = $event.target.value" />
                                                <ComboboxButton
                                                    class="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400"
                                                        aria-hidden="true" />
                                                </ComboboxButton>
                                            </div>
                                            <TransitionRoot leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''">
                                                <ComboboxOptions
                                                    class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                    <div v-if="filteredPeople.length === 0 && query !== ''"
                                                        class="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                        Nothing found.
                                                    </div>

                                                    <ComboboxOption v-for="person in filteredPeople" as="template"
                                                        :key="person.id" :value="person" v-slot="{ selected, active }">
                                                        <li class="relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors duration-300"
                                                            :class="{
                                                                'bg-orange-500 text-white': active,
                                                                'text-gray-900': !active,
                                                            }">
                                                            <span class="block truncate"
                                                                :class="{ 'font-medium': selected, 'font-normal': !selected }">
                                                                {{ person.name }}
                                                            </span>
                                                            <span v-if="selected"
                                                                class="absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300"
                                                                :class="{ 'text-white': active, 'text-orange-500': !active }">
                                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        </li>
                                                    </ComboboxOption>
                                                </ComboboxOptions>
                                            </TransitionRoot>
                                        </div>
                                    </Combobox>
                                </div>
                            </div>
                            <div class="col-span-2 sm:col-span-1 w-full">
                                <label for="amount"
                                    class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                                <div class="mt-2">
                                    <div
                                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                                        <input type="number" name="amount" id="amount"
                                            class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="100" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-2 sm:col-span-1 w-full">
                                <label for="unit" class="block text-sm font-medium leading-6 text-gray-900">Unit</label>
                                <div class="mt-2 flex items-center gap-2 sm:gap-4">
                                    <select id="unit" name="unit"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option v-for="unit in units">{{ unit }}</option>
                                    </select>

                                    <button @click="ingredients.splice(index, 1)" type="button">
                                        <Icon icon="teenyicons:bin-outline"
                                            class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full flex justify-end">
                            <button type="button" @click="addIngredient"
                                class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                Add ingredient
                            </button>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Steps</h2>
                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-6">
                        <div v-for="(step, index) in steps" class="col-span-full">
                            <div class="flex justify-between items-end">
                                <label :for="'step' + index"
                                    class="block text-sm font-medium leading-6 text-gray-900">Step <span>{{ index + 1
                                        }}</span></label>
                                <button @click="steps.splice(index, 1)" type="button">
                                    <Icon icon="teenyicons:bin-outline"
                                        class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" />
                                </button>
                            </div>
                            <div class="mt-2">
                                <textarea :id="'step' + index" :name="'step' + index" rows="3" :value="step.text"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        <div class="col-span-full flex justify-end">
                            <button type="button" @click="addStep"
                                class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                Add step
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button @click="$router.go(-1)" type="button"
                    class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit"
                    class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">Save</button>
            </div>
        </form>
    </div>
    <DeleteModal :open="deleteModalOpen" @close-delete-modal="deleteModalOpen = false" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import DeleteModal from "../components/modals/DeleteModal.vue";

const route = useRoute()
const { data, saving, save } = await useRecipe(toRef(route.params, 'id'));

const deleteModalOpen = ref(false);

let steps = ref(data.value?.steps);

let ingredients = ref(['']);

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

let selected = ref(people[0])
let query = ref('')

let filteredPeople = computed(() =>
    query.value === ''
        ? people
        : people.filter((person) =>
            person.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const units = ['stk', 'pk', 'knsp', 'tsk', 'spsk', 'ml', 'cl', 'dl', 'l', 'g', 'kg']

const addStep = () => {
    steps.value?.push({text: ''});
};

const addIngredient = () => {
    ingredients.value.push('');
}; 
</script>
