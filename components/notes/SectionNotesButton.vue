<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import type { SectionContext } from '@/types/annotations'

const props = defineProps<{
  noteId: string
  sectionId: string
  sectionLabel: string
  noteTitle: string
}>()

const emit = defineEmits<{
  (e: 'open', context: SectionContext): void
}>()

const route = useRoute()
// Use standard composable interface
const { notes } = usePersonalNotes()

const sectionNotes = computed(() => {
  if (!notes || !notes.value) return []
  return notes.value.filter(n => n.note_id === props.noteId && n.section_id === props.sectionId && !n.deleted)
})

const noteCount = computed(() => sectionNotes.value.length)
const hasImportant = computed(() => sectionNotes.value.some(n => n.is_important || n.is_doubt))

function onClick() {
  emit('open', {
    noteId: props.noteId,
    noteTitle: props.noteTitle,
    route: route?.path || (typeof window !== 'undefined' ? window.location.pathname : ''),
    sectionId: props.sectionId,
    sectionLabel: props.sectionLabel,
  })
}
</script>

<template>
  <UButton
    icon="i-heroicons-pencil-square"
    variant="ghost"
    color="gray"
    size="xs"
    class="relative inline-flex items-center justify-center opacity-70 hover:opacity-100 hover:text-amber-500 transition-all"
    :aria-label="`Add or view your notes for ${sectionLabel}`"
    @click="onClick"
  >
    <span
      v-if="noteCount > 0"
      class="absolute -top-1 -right-1 h-4 min-w-[1rem] rounded-full px-1 text-[9px] font-bold text-white flex items-center justify-center shadow-sm"
      :class="hasImportant ? 'bg-amber-500' : 'bg-gray-600 dark:bg-gray-400'"
    >
      {{ noteCount > 99 ? '99+' : noteCount }}
    </span>
  </UButton>
</template>
