<script setup lang="ts">
import type { Toast } from '~/composables/useToast'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  toast: Toast
}>()

const emit = defineEmits<{
  remove: [id: number]
}>()

const toastClasses = computed(() => {
  const baseClasses = 'flex items-start gap-3 rounded-lg border p-4 shadow-lg'

  switch (props.toast.type) {
    case 'success':
      return `${baseClasses} bg-green-50 border-green-200 text-green-900`
    case 'error':
      return `${baseClasses} bg-red-50 border-red-200 text-red-900`
    case 'warning':
      return `${baseClasses} bg-yellow-50 border-yellow-200 text-yellow-900`
    case 'info':
      return `${baseClasses} bg-blue-50 border-blue-200 text-blue-900`
    default:
      return `${baseClasses} bg-gray-50 border-gray-200 text-gray-900`
  }
})

const iconName = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'ph:check-circle'
    case 'error':
      return 'ph:x-circle'
    case 'warning':
      return 'ph:warning-circle'
    case 'info':
      return 'ph:info'
    default:
      return 'ph:info'
  }
})

const iconColor = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    case 'warning':
      return 'text-yellow-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
})
</script>

<template>
  <div
    :class="toastClasses"
    class="min-w-[320px] max-w-md transition-all duration-300"
  >
    <Icon
      :icon="iconName"
      :class="iconColor"
      class="size-6 shrink-0"
    />
    <div class="flex-1">
      <h3 class="font-semibold">
        {{ toast.title }}
      </h3>
      <p v-if="toast.message" class="mt-1 text-sm opacity-90">
        {{ toast.message }}
      </p>
    </div>
    <button
      type="button"
      class="shrink-0 rounded-md p-1 transition-colors hover:bg-black/5"
      @click="emit('remove', toast.id)"
    >
      <Icon icon="ph:x" class="size-5" />
      <span class="sr-only">Close</span>
    </button>
  </div>
</template>
