<template>
  <NuxtLink
    to="/"
    class="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95"
    :aria-label="ariaLabel"
  >
    <!-- Emblem -->
    <div
      class="relative grid place-items-center rounded-lg p-1.5 transition-all duration-300"
      :class="[
        contained ? 'border b-line bg-elev shadow-sm group-hover:border-saffron-400' : ''
      ]"
    >
      <StudyOsIcon :size="iconSize" />
    </div>

    <!-- Wordmark -->
    <div v-if="!iconOnly" class="flex flex-col">
      <div class="flex items-center gap-1.5">
        <span class="font-display font-bold tracking-tight t-hi leading-none" :class="textClass">
          Study<span class="accent">OS</span>
        </span>
        <span v-if="badge" class="chip chip-mono text-[9px] px-1.5 py-0.5 font-semibold">
          {{ badge }}
        </span>
      </div>
      <span v-if="subtitle" class="font-mono text-[9.5px] uppercase tracking-[0.14em] t-lo mt-0.5">
        {{ subtitle }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import StudyOsIcon from '@/components/icons/StudyOsIcon.vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    iconOnly?: boolean
    contained?: boolean
    badge?: string
    subtitle?: string
    ariaLabel?: string
  }>(),
  {
    size: 'md',
    iconOnly: false,
    contained: false,
    badge: '',
    subtitle: '',
    ariaLabel: 'StudyOS Home',
  }
)

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'sm'
    case 'lg': return 'lg'
    default: return 'md'
  }
})

const textClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-[14px]'
    case 'lg': return 'text-[18px]'
    default: return 'text-[16px]'
  }
})
</script>
