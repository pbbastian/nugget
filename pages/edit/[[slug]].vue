<script setup lang="ts">
import { Icon } from '@iconify/vue'

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
const { saving, save } = useEdit('recipes', recipe, async (newId, newSlug) => {
  if (newSlug !== slug) {
    await router.replace(`/edit/${newId}-${newSlug}`)
  }
})

const deleteId: Ref<any> = ref(null)

async function onDelete() {
  deleteId.value = null
  await navigateTo('/')
}

const units = ['stk', 'pk', 'knsp', 'tsk', 'spsk', 'ml', 'cl', 'dl', 'l', 'g', 'kg']

function moveSection(sections: any[], index: number, direction: 'up' | 'down') {
  if (direction === 'up' && index > 0) {
    const temp = sections[index]
    sections[index] = sections[index - 1]
    sections[index - 1] = temp
  }
  else if (direction === 'down' && index < sections.length - 1) {
    const temp = sections[index]
    sections[index] = sections[index + 1]
    sections[index + 1] = temp
  }
}

function moveItem(items: any[], index: number, direction: 'up' | 'down') {
  if (direction === 'up' && index > 0) {
    const temp = items[index]
    items[index] = items[index - 1]
    items[index - 1] = temp
  }
  else if (direction === 'down' && index < items.length - 1) {
    const temp = items[index]
    items[index] = items[index + 1]
    items[index + 1] = temp
  }
}

function moveIngredientSectionUp(index: number) {
  if (recipe.value)
    moveSection(recipe.value.ingredients, index, 'up')
}

function moveIngredientSectionDown(index: number) {
  if (recipe.value)
    moveSection(recipe.value.ingredients, index, 'down')
}

function moveIngredientUp(sectionIndex: number, itemIndex: number) {
  if (recipe.value) {
    moveItem(recipe.value.ingredients[sectionIndex].items, itemIndex, 'up')
  }
}

function moveIngredientDown(sectionIndex: number, itemIndex: number) {
  if (recipe.value) {
    moveItem(recipe.value.ingredients[sectionIndex].items, itemIndex, 'down')
  }
}

function moveStepSectionUp(index: number) {
  if (recipe.value)
    moveSection(recipe.value.steps, index, 'up')
}

function moveStepSectionDown(index: number) {
  if (recipe.value)
    moveSection(recipe.value.steps, index, 'down')
}

function moveStepUp(sectionIndex: number, itemIndex: number) {
  if (recipe.value) {
    moveItem(recipe.value.steps[sectionIndex].items, itemIndex, 'up')
  }
}

function moveStepDown(sectionIndex: number, itemIndex: number) {
  if (recipe.value) {
    moveItem(recipe.value.steps[sectionIndex].items, itemIndex, 'down')
  }
}

useHead({
  title: `${recipe?.value?.name || 'Edit recipe'} | Nugget`,
})

function calculateCalories(ingredient: any): number | null {
  if (!ingredient?.ingredient?.energy || !ingredient.amount)
    return null

  const { energy, density = 1, weight } = ingredient.ingredient
  const { amount, unit } = ingredient

  const unitToGrams: Record<string, number | null> = {
    g: amount,
    kg: amount * 1000,
    ml: amount * density,
    cl: amount * 10 * density,
    dl: amount * 100 * density,
    l: amount * 1000 * density,
    tsk: amount * 5,
    spsk: amount * 15,
    knsp: amount * 1,
    stk: weight ? amount * weight : null,
    pk: weight ? amount * weight : null,
  }

  const amountInGrams = unitToGrams[unit]
  if (amountInGrams == null)
    return null

  const portions = recipe.value?.portions || 1
  return Math.round((energy * amountInGrams) / 100 / portions)
}
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
        <NuggetButton
          v-if="id != null"
          variant="outlined"
          color="danger"
          icon="teenyicons:bin-outline"
          @click="deleteId = id"
        >
          Delete
        </NuggetButton>
        <NuggetButton
          v-if="id != null"
          variant="ghost"
          color="primary"
          @click="$router.push(`/recipes/${route.params.slug}`)"
        >
          View
        </NuggetButton>
        <NuggetButton
          variant="filled"
          color="primary"
          :disabled="saving"
          :loading="saving"
          @click="save()"
        >
          Save
        </NuggetButton>
      </div>
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
              <NuggetFormInput
                id="recipename"
                v-model="recipe.name"
                type="text"
                name="recipename"
                label="Recipe name"
                placeholder="Nuggets med fritter"
              />
            </div>

            <div class="sm:col-span-2">
              <NuggetFormInput
                id="portions"
                v-model="recipe.portions"
                type="number"
                name="portions"
                label="Portions"
                placeholder="4"
              />
            </div>

            <div class="sm:col-span-full">
              <NuggetFormInput
                id="image"
                v-model="recipe.image"
                type="url"
                name="image"
                label="Recipe photo"
              />
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
            <div v-for="(section, sectionIndex) in recipe.ingredients" :key="sectionIndex" class="relative col-span-full grid gap-8 rounded-md rounded-tr-none bg-orange-50 p-6 pl-12">
              <div class="absolute left-2 top-8 flex flex-col gap-1">
                <NuggetButton
                  v-if="sectionIndex > 0"
                  variant="icon"
                  color="primary"
                  size="xs"
                  icon="heroicons:chevron-up-20-solid"
                  icon-only
                  @click="moveIngredientSectionUp(sectionIndex)"
                />
                <NuggetButton
                  v-if="sectionIndex < recipe.ingredients.length - 1"
                  variant="icon"
                  color="primary"
                  size="xs"
                  icon="heroicons:chevron-down-20-solid"
                  icon-only
                  @click="moveIngredientSectionDown(sectionIndex)"
                />
              </div>

              <NuggetButton
                variant="filled"
                color="danger"
                size="sm"
                icon="teenyicons:bin-outline"
                icon-only
                class="absolute bottom-full right-0 rounded-t-md"
                @click="recipe.ingredients.splice(sectionIndex, 1)"
              />
              <div>
                <NuggetFormInput
                  :id="`section-name-${sectionIndex}`"
                  v-model="section.name"
                  type="text"
                  name="section-name"
                  label="Section name"
                />
              </div>
              <div>
                <div class="grid gap-6">
                  <div v-for="(ingredient, index) in section.items" :key="index" class="relative grid grid-cols-4 gap-2 sm:gap-6">
                    <div class="absolute -left-10 top-8 flex flex-col gap-1">
                      <NuggetButton
                        v-if="index > 0"
                        variant="icon"
                        color="primary"
                        size="xs"
                        icon="heroicons:chevron-up-20-solid"
                        icon-only
                        @click="moveIngredientUp(sectionIndex, index)"
                      />
                      <NuggetButton
                        v-if="index < section.items.length - 1"
                        variant="icon"
                        color="primary"
                        size="xs"
                        icon="heroicons:chevron-down-20-solid"
                        icon-only
                        @click="moveIngredientDown(sectionIndex, index)"
                      />
                    </div>

                    <div class="col-span-full w-full sm:col-span-2">
                      <NuggetFormLabel :for="`ingredient-${sectionIndex}-${index}`">
                        Ingredient
                        <span v-if="calculateCalories(ingredient) !== null" class="text-gray-600"> ({{ calculateCalories(ingredient) }} kcal) </span>
                      </NuggetFormLabel>
                      <div class="mt-1">
                        <IngredientMultiSelect
                          :id="`ingredient-${sectionIndex}-${index}`"
                          v-model="section.items[index].ingredient.id"
                          :ingredients="ingredients"
                          :multiple="false"
                          placeholder="Select ingredient..."
                          label="Ingredient"
                          @update:model-value="(id) => {
                            const ingredient = ingredients.find(i => i.id === id)
                            if (ingredient) section.items[index].ingredient = ingredient
                          }"
                        />
                      </div>
                    </div>
                    <div class="col-span-2 w-full sm:col-span-1">
                      <NuggetFormInput
                        id="amount"
                        v-model="ingredient.amount"
                        type="number"
                        name="amount"
                        label="Amount"
                      />
                    </div>
                    <div class="col-span-2 w-full sm:col-span-1">
                      <NuggetFormLabel for="unit">
                        Unit
                      </NuggetFormLabel>
                      <div class="mt-1 flex items-center gap-2 sm:gap-4">
                        <NuggetFormSelect
                          id="unit"
                          v-model="ingredient.unit"
                          name="unit"
                          :options="units"
                        />

                        <NuggetButton
                          variant="icon"
                          color="danger"
                          size="sm"
                          icon="teenyicons:bin-outline"
                          icon-only
                          @click="section.items.splice(index, 1)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-span-full mt-2">
                    <NuggetButton
                      variant="outlined"
                      color="primary"
                      size="sm"
                      full-width
                      icon="lets-icons:add-round"
                      class="border-orange-300 text-orange-300 hover:border-orange-500 hover:text-orange-500"
                      @click="section.items.push({ amount: 0, unit: units[0], ingredient: null })"
                    >
                      Add ingredient
                    </NuggetButton>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <NuggetButton
                variant="filled"
                color="primary"
                full-width
                icon="lets-icons:add-round"
                @click="recipe.ingredients.push({ name: '', items: [] })"
              >
                Add section
              </NuggetButton>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold leading-7 text-gray-900">
            Step sections
          </h2>
          <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-6">
            <div v-for="(section, sectionIndex) in recipe.steps" :key="sectionIndex" class="relative col-span-full grid gap-8 rounded-md rounded-tr-none bg-orange-50 p-6 pl-12">
              <div class="absolute left-2 top-8 flex flex-col gap-1">
                <NuggetButton
                  v-if="sectionIndex > 0"
                  variant="icon"
                  color="primary"
                  size="xs"
                  icon="heroicons:chevron-up-20-solid"
                  icon-only
                  @click="moveStepSectionUp(sectionIndex)"
                />
                <NuggetButton
                  v-if="sectionIndex < recipe.steps.length - 1"
                  variant="icon"
                  color="primary"
                  size="xs"
                  icon="heroicons:chevron-down-20-solid"
                  icon-only
                  @click="moveStepSectionDown(sectionIndex)"
                />
              </div>

              <NuggetButton
                variant="filled"
                color="danger"
                size="sm"
                icon="teenyicons:bin-outline"
                icon-only
                class="absolute bottom-full right-0 rounded-t-md"
                @click="recipe.steps.splice(sectionIndex, 1)"
              />
              <div>
                <NuggetFormInput
                  :id="`section-name-${sectionIndex}`"
                  v-model="section.name"
                  type="text"
                  name="section-name"
                  label="Section name"
                />
              </div>
              <div>
                <div class="grid gap-5">
                  <div v-for="(step, stepIndex) in section.items" :key="stepIndex" class="group/item relative">
                    <div class="absolute -left-10 top-8 flex flex-col gap-1">
                      <NuggetButton
                        v-if="stepIndex > 0"
                        variant="icon"
                        color="primary"
                        size="xs"
                        icon="heroicons:chevron-up-20-solid"
                        icon-only
                        @click="moveStepUp(sectionIndex, stepIndex)"
                      />
                      <NuggetButton
                        v-if="stepIndex < section.items.length - 1"
                        variant="icon"
                        color="primary"
                        size="xs"
                        icon="heroicons:chevron-down-20-solid"
                        icon-only
                        @click="moveStepDown(sectionIndex, stepIndex)"
                      />
                    </div>

                    <div class="flex items-end justify-between">
                      <NuggetFormLabel :for="`step${stepIndex}`">
                        Step <span>{{ stepIndex + 1 }}</span>
                      </NuggetFormLabel>
                      <NuggetButton
                        variant="icon"
                        color="danger"
                        size="sm"
                        icon="teenyicons:bin-outline"
                        icon-only
                        @click="section.items.splice(stepIndex, 1)"
                      />
                    </div>
                    <div class="mt-1">
                      <NuggetFormTextarea
                        :id="`step${stepIndex}`"
                        v-model="step.text"
                        :name="`step${stepIndex}`"
                        :rows="3"
                      />
                    </div>
                  </div>
                  <div class="col-span-full">
                    <NuggetButton
                      variant="outlined"
                      color="primary"
                      size="sm"
                      full-width
                      icon="lets-icons:add-round"
                      class="border-orange-300 text-orange-300 hover:border-orange-500 hover:text-orange-500"
                      @click="section.items.push({ text: '' })"
                    >
                      Add step
                    </NuggetButton>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <NuggetButton
                variant="filled"
                color="primary"
                full-width
                icon="lets-icons:add-round"
                @click="recipe.steps.push({ name: '', items: [] })"
              >
                Add section
              </NuggetButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <ModalsDeleteModal
    :id="deleteId"
    title="Delete recipe?"
    paragraph="Are you sure you want to delete the recipe? The actions can't be undone."
    resource="recipes"
    @on-delete="onDelete"
    @on-cancel="deleteId = null"
  />
</template>
