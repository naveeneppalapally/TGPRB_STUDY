<template>
  <svg
    :class="[sizeClass, 'shrink-0 transition-colors']"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Outer Rounded Rectangle Frame -->
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
    <!-- Left Sidebar Divider -->
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  }
)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'md':
      return 'w-5 h-5'
    case 'lg':
      return 'w-6 h-6'
    default:
      return 'w-5 h-5'
  }
})
</script>
