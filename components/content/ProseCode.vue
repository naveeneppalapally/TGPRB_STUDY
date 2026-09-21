<template>
  <!-- Runtime diagram renderers are intentionally not wired here. Exam diagrams ship as static audited images/SVG. -->
  <pre class="overflow-x-auto rounded-lg border border-[var(--ink-card-line)] bg-[var(--ink-card)] p-4 text-sm text-[var(--ink-card-text)]">
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
