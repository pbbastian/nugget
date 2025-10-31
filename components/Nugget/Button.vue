<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  variant?: 'filled' | 'outlined' | 'ghost' | 'icon'
  color?: 'primary' | 'secondary' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: string
  iconRight?: string
  iconOnly?: boolean
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  type: 'button',
  iconOnly: false,
  fullWidth: false,
  disabled: false,
  loading: false,
})

const buttonClasses = computed(() => {
  const classes: string[] = [
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  ]

  // Size classes
  const sizeMap = {
    xs: props.iconOnly ? 'p-1' : 'px-2 py-1 text-xs',
    sm: props.iconOnly ? 'p-1.5' : 'px-2.5 py-1.5 text-sm',
    md: props.iconOnly ? 'p-2' : 'px-3 py-2 text-sm',
    lg: props.iconOnly ? 'p-2.5' : 'px-4 py-2.5 text-base',
  }
  classes.push(sizeMap[props.size])

  // Variant and color combinations
  if (props.variant === 'filled') {
    if (props.color === 'primary') {
      classes.push(
        'bg-orange-500 text-white shadow-xs hover:bg-orange-400',
        'focus-visible:outline-orange-500',
      )
    }
    else if (props.color === 'secondary') {
      classes.push(
        'bg-white text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
        'focus-visible:outline-gray-500',
      )
    }
    else if (props.color === 'danger') {
      classes.push(
        'bg-red-600 text-white shadow-xs hover:bg-red-500',
        'focus-visible:outline-red-600',
      )
    }
  }
  else if (props.variant === 'outlined') {
    if (props.color === 'primary') {
      classes.push(
        'bg-white text-orange-500 shadow-xs ring-1 ring-inset ring-orange-400 hover:bg-orange-50',
        'focus-visible:outline-orange-500',
      )
    }
    else if (props.color === 'secondary') {
      classes.push(
        'bg-white text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
        'focus-visible:outline-gray-500',
      )
    }
    else if (props.color === 'danger') {
      classes.push(
        'bg-white text-red-400 shadow-xs ring-1 ring-inset ring-red-400 hover:bg-red-50',
        'focus-visible:outline-red-400',
      )
    }
  }
  else if (props.variant === 'ghost') {
    if (props.color === 'primary') {
      classes.push(
        'transparent text-gray-900 hover:bg-orange-100 hover:text-orange-400',
        'focus-visible:outline-orange-500',
      )
    }
    else if (props.color === 'secondary') {
      classes.push(
        'transparent text-gray-900 hover:bg-gray-100',
        'focus-visible:outline-gray-500',
      )
    }
    else if (props.color === 'danger') {
      classes.push(
        'transparent text-red-400 hover:text-red-600',
        'focus-visible:outline-red-400',
      )
    }
  }
  else if (props.variant === 'icon') {
    if (props.color === 'primary') {
      classes.push(
        'text-orange-500 hover:bg-orange-200',
        'focus-visible:outline-orange-500',
      )
    }
    else if (props.color === 'secondary') {
      classes.push(
        'hover:opacity-60',
        'focus-visible:outline-gray-500',
      )
    }
    else if (props.color === 'danger') {
      classes.push(
        'text-red-400 hover:text-red-600',
        'focus-visible:outline-red-400',
      )
    }
  }

  // Full width
  if (props.fullWidth) {
    classes.push('w-full')
  }

  // Disabled state
  if (props.disabled || props.loading) {
    classes.push('disabled:cursor-not-allowed disabled:opacity-50')
  }

  return classes.join(' ')
})

const iconSizeMap = {
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-5',
  lg: 'size-6',
}

const iconSize = computed(() => iconSizeMap[props.size])
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
  >
    <Icon v-if="loading" icon="svg-spinners:ring-resize" :class="iconSize" />
    <Icon v-else-if="icon" :icon="icon" :class="iconSize" />
    <slot v-if="!iconOnly && !loading" />
    <Icon v-if="iconRight && !loading" :icon="iconRight" :class="iconSize" />
  </button>
</template>
