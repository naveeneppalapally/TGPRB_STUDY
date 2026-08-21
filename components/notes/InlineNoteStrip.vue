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
const { notes } = usePersonalNotes()

// Filter notes active for this specific section, excluding deleted tombstones
const sectionNotes = computed(() => {
  if (!notes || !notes.value) return []
  return notes.value
    .filter(n => n.note_id === props.noteId && n.section_id === props.sectionId && !n.deleted)
    .sort((a, b) => {
      const timeA = new Date(a.client_updated_at || a.created_at).getTime()
      const timeB = new Date(b.client_updated_at || b.created_at).getTime()
      return timeB - timeA
    })
})

const noteCount = computed(() => sectionNotes.value.length)
const latestNote = computed(() => sectionNotes.value[0] || null)
const hasImportant = computed(() => sectionNotes.value.some(n => n.is_important))
const hasDoubt = computed(() => sectionNotes.value.some(n => n.is_doubt))

// Plain text snippet with markdown syntax stripped
const snippet = computed(() => {
  if (!latestNote.value) return ''
  const raw = latestNote.value.body || latestNote.value.anchor_text || ''
  return raw
    .replace(/<[^>]*>?/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^- /gm, '')
    .replace(/\n+/g, ' ')
    .trim()
})

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
  <div
    v-if="sectionNotes.length > 0"
    role="button"
    tabindex="0"
    :aria-label="`View ${noteCount} note${noteCount !== 1 ? 's' : ''} for ${sectionLabel}`"
    class="group mb-4 flex items-center justify-between gap-2.5 rounded-lg border b-line bg-elev px-3 py-2 text-xs transition-all hover:border-saffron-500/40 hover:bg-saffron-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 cursor-pointer select-none"
    @click="onClick"
    @keydown.enter="onClick"
    @keydown.space.prevent="onClick"
  >
    <!-- Left: Icon + Tag Chips + Snippet -->
    <div class="flex min-w-0 flex-1 items-center gap-2">
      <!-- Pencil Icon -->
      <UIcon
        name="i-heroicons-pencil-square"
        class="h-3.5 w-3.5 shrink-0 text-saffron-600 dark:text-saffron-400 group-hover:scale-110 transition-transform"
      />

      <!-- Status Tag Chips -->
      <div v-if="hasImportant || hasDoubt" class="flex shrink-0 items-center gap-1.5">
        <span
          v-if="hasImportant"
          class="chip chip-saffron text-[10px] py-0 px-1.5 leading-4 gap-1"
          title="Important note"
        >
          <UIcon name="i-heroicons-star-solid" class="h-2.5 w-2.5 text-saffron-500" />
          <span>Imp</span>
        </span>
        <span
          v-if="hasDoubt"
          class="chip chip-red text-[10px] py-0 px-1.5 leading-4 gap-1"
          title="Marked doubt"
        >
          <UIcon name="i-heroicons-question-mark-circle-solid" class="h-2.5 w-2.5 text-red-500" />
          <span>Doubt</span>
        </span>
      </div>

      <!-- Anchor Quote Preview (Optional inline cue if present) -->
      <span
        v-if="latestNote?.anchor_text && latestNote?.body"
        class="hidden sm:inline-block shrink-0 max-w-[140px] truncate text-[11px] font-normal italic text-saffron-600/80 dark:text-saffron-400/80 pl-1 border-l-2 border-saffron-500/40"
      >
        "{{ latestNote.anchor_text }}"
      </span>

      <!-- Note Body Snippet -->
      <span class="min-w-0 flex-1 truncate font-normal t-hi group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
        {{ snippet }}
      </span>
    </div>

    <!-- Right: Count Badge & Expand Chevron -->
    <div class="flex shrink-0 items-center gap-1.5 pl-1">
      <span
        v-if="noteCount > 1"
        class="chip text-[10px] py-0 px-1.5 leading-4 font-mono font-medium t-mid"
      >
        {{ noteCount }} notes
      </span>
      <UIcon
        name="i-heroicons-chevron-right"
        class="h-3.5 w-3.5 t-lo transition-transform group-hover:translate-x-0.5 group-hover:text-saffron-500"
      />
    </div>
  </div>
</template>
