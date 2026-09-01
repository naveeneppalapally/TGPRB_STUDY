<template>
  <svg
    :class="[sizeClass, 'shrink-0 transition-transform duration-200 group-hover:scale-105']"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="StudyOS Logo"
  >
    <defs>
      <linearGradient id="studyos-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--accent-strong, #f59e0b)" />
        <stop offset="50%" stop-color="var(--accent, #e5ad31)" />
        <stop offset="100%" stop-color="var(--accent-soft, #d97706)" />
      </linearGradient>
      <linearGradient id="studyos-grad-glow" x1="10%" y1="10%" x2="90%" y2="90%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#b45309" stop-opacity="0.4" />
      </linearGradient>
      <filter id="studyos-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="rgba(0,0,0,0.3)" />
      </filter>
    </defs>

    <!-- Outer geometric knot structure (6-fold symmetric interconnected neural loops) -->
    <g filter="url(#studyos-shadow)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Subtle Outer Hexagon Guide -->
      <path
        d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z"
        class="stroke-[var(--accent,currentColor)] opacity-20"
        fill="none"
        stroke-width="1.5"
      />

      <!-- Loop 1: Top to Bottom-Right -->
      <path
        d="M 50 16 C 66 16, 80 28, 80 44 C 80 56, 70 66, 56 66 L 36 66 C 26 66, 18 58, 18 48 C 18 34, 32 20, 50 20 Z"
        stroke="url(#studyos-grad-primary)"
        class="opacity-95"
        stroke-width="5"
      />

      <!-- Loop 2: Right to Bottom-Left -->
      <path
        d="M 78 62 C 72 74, 56 82, 40 82 C 30 82, 22 74, 22 62 L 32 46 C 38 38, 48 34, 58 34 C 70 34, 84 46, 78 62 Z"
        stroke="url(#studyos-grad-glow)"
        class="opacity-95"
        stroke-width="5"
      />

      <!-- Loop 3: Left to Top-Right -->
      <path
        d="M 22 62 C 16 50, 20 34, 34 24 C 44 16, 54 20, 62 28 L 72 46 C 78 56, 74 68, 64 74 C 52 82, 30 76, 22 62 Z"
        stroke="url(#studyos-grad-primary)"
        class="opacity-95"
        stroke-width="5"
      />

      <!-- Central Core Focus Node / Star Seed -->
      <circle cx="50" cy="50" r="5" class="fill-[var(--accent-strong,#f59e0b)]" stroke="white" stroke-width="1.5" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  }>(),
  {
    size: 'md',
  }
)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'w-4 h-4'
    case 'sm':
      return 'w-5 h-5'
    case 'md':
      return 'w-7 h-7'
    case 'lg':
      return 'w-9 h-9'
    case 'xl':
      return 'w-11 h-11'
    case 'custom':
      return ''
    default:
      return 'w-7 h-7'
  }
})
</script>
