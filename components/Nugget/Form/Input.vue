<script setup lang="ts">
interface Props {
  modelValue?: string | number | null
  type?: 'text' | 'number' | 'email' | 'search' | 'url' | 'password'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  label?: string
  hint?: string
  required?: boolean
  id?: string
  name?: string
  variant?: 'default' | 'borderless' | 'shadow'
  fullWidth?: boolean
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  variant: 'default',
  fullWidth: true,
  required: false,
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 11)}`)

const variantClasses = {
  default: 'border border-orange-300 bg-white px-3 py-1.5 outline-1 -outline-offset-1 sm:text-sm/6',
  shadow: 'border-0 py-1.5 px-3 shadow-xs ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6',
  borderless: 'border-none py-4 pl-8 pr-0 outline-0',
}

const inputClasses = computed(() => {
  return [
    'block rounded-md text-base text-gray-900 placeholder:text-gray-400 outline-transparent transition-colors',
    'focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-500',
    props.fullWidth && 'w-full',
    variantClasses[props.variant],
    props.error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    props.disabled && 'cursor-not-allowed opacity-50 bg-gray-50',
    props.readonly && 'cursor-default bg-gray-50',
  ].filter(Boolean).join(' ')
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (props.type === 'number') {
    emit('update:modelValue', target.value === '' ? null : Number(target.value))
  }
  else {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <div class="grid gap-1">
    <NuggetFormLabel v-if="label" :for="inputId" :required="required">
      {{ label }}
    </NuggetFormLabel>

    <input
      :id="inputId"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      :class="inputClasses"
      @input="handleInput"
    >

    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <p v-if="error" class="text-xs text-red-600">
      {{ error }}
    </p>
  </div>
</template>
