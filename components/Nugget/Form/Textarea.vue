<script setup lang="ts">
interface Props {
  modelValue?: string | null
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  hint?: string
  required?: boolean
  id?: string
  name?: string
  rows?: number
  fullWidth?: boolean
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  fullWidth: true,
  required: false,
  disabled: false,
  autoResize: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaId = computed(() => props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`)

const textareaClasses = computed(() => {
  const classes: string[] = [
    'block rounded-md border-orange-300 bg-white px-3 py-1.5',
    'text-base text-gray-900 outline-1 -outline-offset-1 outline-orange-300',
    'placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2',
    'focus:outline-orange-500 focus:ring-orange-500 sm:text-sm/6 transition-colors',
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

  if (props.autoResize) {
    classes.push('resize-none')
  }

  return classes.join(' ')
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)

  if (props.autoResize && textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

onMounted(() => {
  if (props.autoResize && textareaRef.value && props.modelValue) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
})
</script>

<template>
  <div class="grid gap-1">
    <NuggetFormLabel v-if="label" :for="textareaId" :required="required">
      {{ label }}
    </NuggetFormLabel>

    <textarea
      :id="textareaId"
      ref="textareaRef"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :class="textareaClasses"
      @input="handleInput"
    />

    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <p v-if="error" class="text-xs text-red-600">
      {{ error }}
    </p>
  </div>
</template>
