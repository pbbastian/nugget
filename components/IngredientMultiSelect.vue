<script setup lang="ts">
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { Icon } from '@iconify/vue'

interface Ingredient {
  id: number
  name: string
  vendor?: string
}

const props = defineProps<{
  modelValue: number[]
  ingredients: Ingredient[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
}>()

const query = ref('')

const filteredIngredients = computed(() => {
  if (!query.value) {
    return props.ingredients
  }
  return props.ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(query.value.toLowerCase()),
  )
})

const selectedIngredients = computed(() => {
  return props.ingredients.filter(ing => props.modelValue.includes(ing.id))
})

const displayValue = computed(() => {
  if (selectedIngredients.value.length === 0)
    return ''
  if (selectedIngredients.value.length === 1)
    return selectedIngredients.value[0].name
  return `${selectedIngredients.value.length} ingredients selected`
})

function handleSelect(ingredient: Ingredient) {
  const newValue = props.modelValue.includes(ingredient.id)
    ? props.modelValue.filter(i => i !== ingredient.id)
    : [...props.modelValue, ingredient.id]
  emit('update:modelValue', newValue)
}
</script>

<template>
  <Combobox v-model="selectedIngredients" multiple as="div">
    <ComboboxLabel class="sr-only">
      Select ingredients
    </ComboboxLabel>
    <div class="relative">
      <ComboboxInput
        class="block w-full rounded-md border-orange-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
        :display-value="() => displayValue"
        placeholder="Select ingredients..."
        @change="query = $event.target.value"
        @blur="query = ''"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <Icon icon="heroicons:chevron-up-down-20-solid" class="size-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filteredIngredients.length > 0" class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
        <ComboboxOption
          v-for="ingredient in filteredIngredients"
          :key="ingredient.id"
          v-slot="{ active, selected }"
          :value="ingredient"
          as="template"
          @click="handleSelect(ingredient)"
        >
          <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-orange-500 text-white outline-none' : 'text-gray-900']">
            <div class="flex">
              <span class="truncate" :class="[selected && 'font-semibold']">{{ ingredient.name }}</span>
              <span v-if="ingredient.vendor" class="ml-2 truncate text-gray-500" :class="[active ? 'text-orange-200' : 'text-gray-500']">{{ ingredient.vendor }}</span>
            </div>

            <span v-if="modelValue.includes(ingredient.id)" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-orange-500']">
              <Icon icon="heroicons:check-20-solid" class="size-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
