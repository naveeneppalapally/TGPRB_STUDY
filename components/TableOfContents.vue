<template>
  <TableOfContentsImpl
    :sections="sections"
    :weight-text="weightText"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import TableOfContentsImpl, { type TocSection } from '@/components/notes/TableOfContents.vue'

defineProps<{
  sections: TocSection[]
  weightText?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()
</script>
