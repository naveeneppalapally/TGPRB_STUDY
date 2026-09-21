<template>
  <div class="py-16 text-center">
    <UIcon name="i-heroicons-document-text" class="mx-auto mb-4 h-12 w-12 t-lo" />
    <h2 class="mb-2 text-lg font-semibold t-hi">This note has moved</h2>
    <p class="mb-6 text-sm t-lo">Geography topics live in the subject hub with the full study experience.</p>
    <UButton label="Open Geography Hub" to="/notes/geography" color="primary" variant="soft" />
  </div>
</template>

<script setup lang="ts">
// Legacy dynamic-note fallback. Dedicated note pages own every live slug, so
// anything landing here is an unknown or retired topic - send it to the hub.
await navigateTo('/notes/geography', { replace: true, redirectCode: 301 })
</script>