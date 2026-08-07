<template>
  <!-- Intercept mermaid code blocks - render as diagram, not literal code -->
  <template v-if="language === 'mermaid'">
    <MermaidChart :code="decodedCode" />
  </template>

  <!-- All other code blocks -->
  <pre v-else class="overflow-x-auto rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
    <code :class="`language-${language}`">{{ decodedCode }}</code>
  </pre>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  language?: string
}>()

const decodedCode = computed(() =>
  (props.code ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
)
</script>
