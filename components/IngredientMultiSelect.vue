<script setup lang="ts">
import type { Ingredient } from '~/composables/ingredients'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
  modelValue: number | number[] | null
  ingredients: Ingredient[]
  multiple?: boolean
  placeholder?: string
  label?: string
}>(), {
  multiple: true,
  placeholder: 'Select ingredients...',
  label: 'Select ingredients',
})

const emit = defineEmits<{
  'update:modelValue': [value: number | number[] | null]
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
  if (props.multiple) {
    const ids = Array.isArray(props.modelValue) ? props.modelValue : []
    return props.ingredients.filter(ing => ing.id != null && ids.includes(Number(ing.id)))
  }
  else {
    const id = typeof props.modelValue === 'number' ? props.modelValue : null
    return id ? props.ingredients.filter(ing => Number(ing.id) === id) : []
  }
})

const selectedIngredient = computed({
  get: () => {
    if (props.multiple) {
      return selectedIngredients.value
    }
    else {
      return selectedIngredients.value[0] || null
    }
  },
  set: (value) => {
    if (props.multiple) {
      const ids = Array.isArray(value) ? value.map((v: Ingredient) => v.id != null ? Number(v.id) : 0).filter(id => id !== 0) : []
      emit('update:modelValue', ids)
    }
    else {
      const id = value && (value as Ingredient).id != null ? Number((value as Ingredient).id) : null
      emit('update:modelValue', id)
    }
  },
})

const displayValue = computed(() => {
  if (selectedIngredients.value.length === 0)
    return ''
  if (selectedIngredients.value.length === 1)
    return selectedIngredients.value[0]?.name || ''
  if (props.multiple)
    return `${selectedIngredients.value.length} ingredients selected`
  return selectedIngredients.value[0]?.name || ''
})

function isSelected(ingredientId: number | string | undefined): boolean {
  if (ingredientId == null)
    return false
  const numId = Number(ingredientId)
  if (props.multiple) {
    const ids = Array.isArray(props.modelValue) ? props.modelValue : []
    return ids.includes(numId)
  }
  else {
    return props.modelValue === numId
  }
}
</script>

<template>
  <Combobox v-model="selectedIngredient" :multiple="multiple" as="div">
    <ComboboxLabel class="sr-only">
      {{ label }}
    </ComboboxLabel>
    <div class="relative">
      <ComboboxInput
        class="block w-full rounded-md bg-white px-3 py-[7px] text-base text-gray-900 outline-1 -outline-offset-1 outline-orange-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6"
        :display-value="() => displayValue"
        :placeholder="placeholder"
        autocomplete="off"
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
          v-slot="{ active }"
          :value="ingredient"
          as="template"
        >
          <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-orange-500 text-white outline-none' : 'text-gray-900']">
            <div class="flex">
              <span class="truncate" :class="[isSelected(ingredient.id) && 'font-semibold']">{{ ingredient.name }}</span>
              <span v-if="ingredient.vendor" class="ml-2 truncate text-gray-500" :class="[active ? 'text-orange-200' : 'text-gray-500']">{{ ingredient.vendor }}</span>
            </div>

            <span v-if="isSelected(ingredient.id)" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-orange-500']">
              <Icon icon="heroicons:check-20-solid" class="size-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
