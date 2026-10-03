<template>
  <UAlert class="my-6" icon="i-heroicons-academic-cap" title="Study this topic" description="Use section-bound PYQs, active recall cards, and trap duels." :actions="[{ label: 'Open Study Mode', to: `/study/${slug}` }]" />
</template>
<script setup lang="ts">
defineProps<{ slug: string }>()
</script>
