<script setup lang="ts">
interface Props {
  for?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
})
</script>

<template>
  <label
    :for="props.for"
    class="block text-sm font-medium text-gray-900"
  >
    <slot />
    <span v-if="required" class="text-red-500">*</span>
  </label>
</template>
