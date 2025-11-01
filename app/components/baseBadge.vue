<script setup lang="ts">
/**
 * Shared Badge component
 *
 * This demonstrates shared components in feature-based architecture:
 * - Reusable UI component used across multiple features
 * - Cart feature uses this to display item count
 */

import { computed } from 'vue'

interface Props {
  /** Badge content (usually a number or short text) */
  value: string | number
  /** Badge variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const badgeClass = computed(() => {
  const variants = {
    danger: 'bg-red-500 text-white',
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
  }

  return variants[props.variant]
})
</script>

<template>
  <span
    :class="badgeClass"
    class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full"
  >
    {{ value }}
  </span>
</template>
