<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface SelectOption {
  value: string | number
  label: string
}

interface Props {
  modelValue?: string | number | null
  options?: SelectOption[] | string[]
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  hint?: string
  required?: boolean
  id?: string
  name?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: true,
  required: false,
  disabled: false,
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectId = computed(() => props.id || `select-${Math.random().toString(36).slice(2, 11)}`)

const normalizedOptions = computed(() => {
  if (!props.options || props.options.length === 0)
    return []

  // If it's already an array of objects, return as is
  if (typeof props.options[0] === 'object' && 'value' in props.options[0]) {
    return props.options as SelectOption[]
  }

  // If it's an array of strings, convert to objects
  return (props.options as string[]).map(opt => ({
    value: opt,
    label: opt,
  }))
})

const selectClasses = computed(() => {
  const classes: string[] = [
    'col-start-1 row-start-1 appearance-none rounded-md bg-white ',
    'py-1.5 pr-8 pl-3 ',
    'text-base text-gray-900 outline-1 -outline-offset-1 outline-orange-300 ',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-500 ',
    'sm:text-sm/6',
  ]

  if (props.fullWidth) {
    classes.push('w-full')
  }

  if (props.error) {
    classes.push('border-red-500 focus:border-red-500 focus:ring-red-500')
  }

  if (props.disabled) {
    classes.push('cursor-not-allowed opacity-50 bg-gray-50')
  }

  return classes.join(' ')
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="grid gap-1">
    <NuggetFormLabel v-if="label" :for="selectId" :required="required">
      {{ label }}
    </NuggetFormLabel>

    <div class="grid grid-cols-1">
      <select
        :id="selectId"
        :name="name"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in normalizedOptions"
          :key="typeof option === 'string' ? option : option.value"
          :value="typeof option === 'string' ? option : option.value"
        >
          {{ typeof option === 'string' ? option : option.label }}
        </option>
      </select>
      <Icon
        icon="heroicons:chevron-down-20-solid"
        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
        aria-hidden="true"
      />
    </div>

    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <p v-if="error" class="text-xs text-red-600">
      {{ error }}
    </p>
  </div>
</template>
