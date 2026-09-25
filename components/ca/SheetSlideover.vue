<template>
  <USlideover v-model="open" :side="side" :ui="uiOverrides">
    <slot />
  </USlideover>
</template>

<script setup lang="ts">
/**
 * Shared slideover shell for the current-affairs page.
 * Right-side panel on desktop, bottom sheet on mobile (< 640px),
 * themed to the project surface tokens.
 */
const open = defineModel<boolean>({ default: false })

const isMobile = ref(false)
let mq: MediaQueryList | null = null

function onMqChange(e: MediaQueryListEvent) {
  isMobile.value = e.matches
}

onMounted(() => {
  mq = window.matchMedia('(max-width: 639px)')
  isMobile.value = mq.matches
  mq.addEventListener('change', onMqChange)
})

onBeforeUnmount(() => {
  mq?.removeEventListener('change', onMqChange)
  mq = null
})

const side = computed<'right' | 'bottom'>(() => (isMobile.value ? 'bottom' : 'right'))

const uiOverrides = computed(() => ({
  background: 'bg-[var(--bg-elevated)]',
  ring: 'ring-1 ring-[var(--line-strong)]',
  width: 'w-screen max-w-md',
  height: 'h-auto max-h-[85dvh]',
  rounded: isMobile.value ? 'rounded-t-2xl' : '',
}))
</script>
