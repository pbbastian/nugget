<script setup lang="ts">
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { Icon } from '@iconify/vue'
import DeleteModal from '../components/modals/DeleteModal.vue'

const route = useRoute()
const router = useRouter()
const divider = route.params.slug.indexOf('-')
const id = divider !== -1 ? route.params.slug.slice(0, divider) : null
const slug = divider !== -1 ? route.params.slug.slice(divider + 1) : null
const recipe: Ref<Recipe | null> = ref(null)
const ingredients: Ref<Ingredient[]> = ref([])
if (id) {
  const { data } = await useFetch<EditRecipeResult>(`recipes/${id}?ingredients=all`, {
    $fetch: useNuxtApp().$api,
    default: () => ({ recipe: null, ingredients: [] }),
  })
  recipe.value = data.value.recipe
  ingredients.value = data.value.ingredients
}
else {
  const { data } = await useFetch<IngredientsResult>(`ingredients`, {
    $fetch: useNuxtApp().$api,
    default: () => ({ ingredients: [] }),
  })
  recipe.value = {
    id: 'add',
    name: '',
    image: null,
    portions: 4,
    energy: 0,
    fat: 0,
    carbs: 0,
    fibres: 0,
    protein: 0,
    ingredients: [],
    steps: [],
  }
  ingredients.value = data.value.ingredients
}
const { saving, save, success } = useEdit('recipes', recipe, async (newId, newSlug) => {
  if (newSlug != slug) {
    await router.replace(`/edit/${newId}-${newSlug}`)
  }
})

const deleteId: Ref<any> = ref(null)

async function onDelete() {
  deleteId.value = null
  await navigateTo('/')
}

const query = ref('')
const filteredIngredients = computed(() =>
  query.value === ''
    ? ingredients.value
    : ingredients.value.filter((ingredient) => {
        return ingredient.name.toLowerCase().includes(query.value.toLowerCase())
      }),
)

const units = ['stk', 'pk', 'knsp', 'tsk', 'spsk', 'ml', 'cl', 'dl', 'l', 'g', 'kg']

useHead({
  title: `${recipe?.value?.name || 'Edit recipe'} | Nugget`,
})
</script>

<template>
  <div class="sticky inset-x-0 top-12 z-10 w-full border-b border-gray-900/10 bg-white py-6 lg:top-0">
    <div class="w-full sm:flex sm:items-center sm:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
          {{ recipe?.name || 'Create new recipe' }}
        </h2>
      </div>
      <div class="mt-5 flex gap-4 sm:ml-4 sm:mt-0">
        <button
          v-if="id != null"
          type="button"
          class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-400 shadow-sm ring-1 ring-inset ring-red-400 transition-colors duration-300 hover:bg-red-400 hover:text-white"
          tabindex="0"
          @click="deleteId = id"
        >
          <Icon icon="teenyicons:bin-outline" class="size-5 text-inherit" />
          Delete
        </button>
        <button
          v-if="id != null"
          type="button"
          tabindex="0"
          class="transparent rounded-md px-3 py-2 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:bg-orange-100 hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          @click="$router.push(`/recipes/${route.params.slug}`)"
        >
          View
        </button>
        <button
          :disabled="saving"
          type="button"
          tabindex="0"
          class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          @click="save()"
        >
          Save
        </button>
        <!--
        Duplicate not possible yet
        <button
          v-if="id != null" type="button"
          class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <Icon icon="lets-icons:folder-dublicate-light" class="size-6 text-gray-700" />
          Duplicate
        </button> -->
      </div>
    </div>
    <div v-if="!success">
      <p class="mt-2 text-sm text-red-400">
        There was an error when saving the recipe. Please try again
      </p>
    </div>
  </div>
  <div v-if="recipe != null" class="mt-6">
    <form>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-lg font-semibold leading-7 text-gray-900">
            General information
          </h2>

          <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="recipename" class="block text-sm font-medium leading-6 text-gray-900">Recipe
                name</label>
              <div class="mt-1">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500"
                >
                  <input
                    id="recipename" v-model="recipe.name" type="text" name="recipename"
                    class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                    placeholder="Nuggets med fritter"
                  >
                </div>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="portions"
                class="block text-sm font-medium leading-6 text-gray-900"
              >Portions</label>
              <div class="mt-1">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md"
                >
                  <input
                    id="portions" v-model="recipe.portions" type="number" name="portions"
                    class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                    placeholder="4"
                  >
                </div>
              </div>
            </div>

            <div class="sm:col-span-full">
              <label
                for="portions"
                class="block text-sm font-medium leading-6 text-gray-900"
              >Recipe photo</label>
              <div class="mt-1">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500">
                  <input
                    id="image" v-model="recipe.image" type="url" name="image"
                    class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                  >
                </div>
              </div>
              <Icon
                v-if="!recipe.image" icon="f7:photo-fill"
                class="h-40 w-full text-gray-300" aria-hidden="true"
              />
              <div v-else class="relative mt-3 h-32 w-full overflow-hidden rounded-md sm:h-52">
                <img
                  class="absolute inset-0 size-full object-cover"
                  :src="recipe.image"
                  alt="fooood"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-lg font-semibold leading-7 text-gray-900">
            Ingredient sections
          </h2>
          <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-6">
            <div v-for="(section, sectionIndex) in recipe.ingredients" :key="sectionIndex" class="relative col-span-full grid gap-8 rounded-md rounded-tr-none bg-orange-50 p-6">
              <button
                tabindex="0"
                class="absolute bottom-full right-0 rounded-t-md bg-red-400 p-2 transition-colors duration-300 hover:bg-red-500" type="button" @click="recipe.ingredients.splice(sectionIndex, 1)"
              >
                <Icon
                  icon="teenyicons:bin-outline"
                  class="size-4 text-white"
                />
              </button>
              <div>
                <div class="grid gap-1">
                  <label
                    :for="`section-name-${sectionIndex}`"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Section name
                  </label>
                  <input
                    :id="`section-name-${sectionIndex}`"
                    v-model="section.name"
                    type="text"
                    name="section-name"
                    class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                  >
                </div>
              </div>
              <div>
                <div class="grid gap-6">
                  <div v-for="(ingredient, index) in section.items" :key="index" class="grid grid-cols-4 gap-2 sm:gap-6">
                    <div class="col-span-full w-full sm:col-span-2">
                      <Combobox v-model="section.items[index].ingredient" as="div" @update:model-value="query = ''">
                        <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                          Ingredient
                        </ComboboxLabel>
                        <div class="relative mt-1">
                          <ComboboxInput
                            class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                            :display-value="(ingredient) => (ingredient as Ingredient)?.name"
                            @change="query = $event.target.value"
                            @blur="query = ''"
                          />
                          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
                          </ComboboxButton>

                          <ComboboxOptions v-if="filteredIngredients.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            <ComboboxOption v-for="filteredIngredient in filteredIngredients" :key="filteredIngredient.id" v-slot="{ active, selected }" :value="filteredIngredient" as="template">
                              <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-orange-500 text-white outline-none' : 'text-gray-900']">
                                <div class="flex">
                                  <span class="truncate" :class="[selected && 'font-semibold']">{{ filteredIngredient.name }}</span>
                                  <span class="ml-2 truncate text-gray-500" :class="[active ? 'text-orange-200' : 'text-gray-500']">{{ filteredIngredient.vendor }}</span>
                                </div>

                                <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-orange-500']">
                                  <CheckIcon class="size-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ComboboxOption>
                          </ComboboxOptions>
                        </div>
                      </Combobox>
                    </div>
                    <div class="col-span-2 w-full sm:col-span-1">
                      <label
                        for="amount"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >Amount</label>
                      <div class="mt-1">
                        <div
                          class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md"
                        >
                          <input
                            id="amount" v-model="ingredient.amount" type="number" name="amount"
                            class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-span-2 w-full sm:col-span-1">
                      <label for="unit" class="block text-sm font-medium leading-6 text-gray-900">Unit</label>
                      <div class="mt-1 flex items-center gap-2 sm:gap-4">
                        <select
                          id="unit" v-model="ingredient.unit" name="unit"
                          class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                        >
                          <option v-for="unit in units" :key="unit">
                            {{ unit }}
                          </option>
                        </select>

                        <button
                          type="button"
                          tabindex="0"
                          @click="section.items.splice(index, 1)"
                        >
                          <Icon
                            icon="teenyicons:bin-outline"
                            class="size-5 text-red-400 transition-colors duration-300 hover:text-red-600"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-full mt-2">
                    <button
                      type="button"
                      tabindex="0"
                      class="flex w-full items-center justify-center rounded-md border border-orange-300 px-2.5 py-1.5 text-sm text-orange-300 transition-colors hover:border-orange-500 hover:text-orange-500"
                      @click="section.items.push({ amount: 0, unit: units[0], ingredient: null })"
                    >
                      <Icon icon="lets-icons:add-round" class="size-6 text-inherit" />
                      Add ingredient
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <button
                tabindex="0"
                type="button"
                class="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                @click="recipe.ingredients.push({ name: '', items: [] })"
              >
                <Icon icon="lets-icons:add-round" class="size-6 text-white" />
                Add section
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold leading-7 text-gray-900">
            Step sections
          </h2>
          <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-6">
            <div v-for="(section, sectionIndex) in recipe.steps" :key="sectionIndex" class="relative col-span-full grid gap-8 rounded-md rounded-tr-none bg-orange-50 p-6">
              <button
                tabindex="0"
                class="absolute bottom-full right-0 rounded-t-md bg-red-400 p-2 transition-colors duration-300 hover:bg-red-500"
                type="button"
                @click="recipe.steps.splice(sectionIndex, 1)"
              >
                <Icon
                  icon="teenyicons:bin-outline"
                  class="size-4 text-white"
                />
              </button>
              <div class="grid gap-1">
                <label
                  :for="`section-name-${sectionIndex}`"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Section name
                </label>
                <input
                  :id="`section-name-${sectionIndex}`"
                  v-model="section.name"
                  type="text"
                  name="section-name"
                  class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                >
              </div>
              <div>
                <div class="grid gap-5">
                  <div v-for="(step, stepIndex) in section.items" :key="stepIndex">
                    <div class="flex items-end justify-between">
                      <label :for="`step${stepIndex}`" class="block text-sm font-medium leading-6 text-gray-900">
                        Step <span>{{ stepIndex + 1 }}</span>
                      </label>
                      <button
                        tabindex="0"
                        type="button"
                        @click="section.items.splice(stepIndex, 1)"
                      >
                        <Icon
                          icon="teenyicons:bin-outline"
                          class="size-5 text-red-400 transition-colors duration-300 hover:text-red-600"
                        />
                      </button>
                    </div>
                    <div class="mt-1">
                      <textarea
                        :id="`step${stepIndex}`" v-model="step.text" :name="`step${stepIndex}`" rows="3"
                        class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div class="col-span-full">
                    <button
                      type="button"
                      tabindex="0"
                      class="flex w-full items-center justify-center rounded-md border border-orange-300 px-2.5 py-1.5 text-sm text-orange-300 transition-colors hover:border-orange-500 hover:text-orange-500"
                      @click="section.items.push({ text: '' })"
                    >
                      <Icon icon="lets-icons:add-round" class="size-6 text-inherit" />
                      Add step
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <button
                tabindex="0"
                type="button"
                class="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                @click="recipe.steps.push({ name: '', items: [] })"
              >
                <Icon icon="lets-icons:add-round" class="size-6 text-white" />
                Add section
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <DeleteModal
    :id="deleteId"
    title="Delete recipe?"
    paragraph="Are you sure you want to delete the recipe? The actions can't be undone."
    resource="recipes"
    @on-delete="onDelete"
    @on-cancel="deleteId = null"
  />
</template>
