<template>
  <div class="flex h-full flex-col">
    <!-- Composer -->
    <div class="border-b b-line p-3.5">
      <div v-if="pendingAnchor" class="mb-2 flex items-start gap-2 rounded-lg border border-saffron-500/30 bg-accent-soft px-3 py-2 text-[12.5px] leading-snug t-mid">
        <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="mt-0.5 h-3.5 w-3.5 shrink-0 accent" />
        <span class="line-clamp-3 flex-1 italic">{{ pendingAnchor }}</span>
        <button type="button" class="t-lo hover:t-hi" aria-label="Remove quote" @click="pendingAnchor = null">
          <UIcon name="i-heroicons-x-mark" class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Stamps: one tap = a complete note, no typing -->
      <div class="mb-2 flex flex-wrap gap-1.5">
        <button
          v-for="s in stamps"
          :key="s.label"
          type="button"
          class="chip transition-colors hover:b-strong hover:t-hi"
          :class="s.cls"
          @click="applyStamp(s)"
        >
          <UIcon :name="s.icon" class="h-3 w-3" />{{ s.label }}
        </button>
      </div>

      <UTextarea
        ref="ta"
        v-model="draft"
        :rows="2"
        autoresize
        :placeholder="pendingAnchor ? 'Why is this confusing?' : `Margin note on: ${section.short}`"
        size="sm"
        @keydown.meta.enter.prevent="save"
        @keydown.ctrl.enter.prevent="save"
      />
      <div class="mt-2 flex items-center justify-between">
        <span class="font-mono text-[10px] t-lo">⌘/Ctrl + Enter</span>
        <UButton size="xs" color="primary" :disabled="!canSave" @click="save">Save note</UButton>
      </div>
    </div>

    <!-- List for this section only -->
    <div class="flex-1 overflow-y-auto p-3.5">
      <p class="eyebrow mb-2">Your notes on this section ({{ list.length }})</p>
      <p v-if="!list.length" class="text-[12.5px] t-lo">Select text on the page or use a stamp above.</p>
      <ul v-else class="space-y-2">
        <li v-for="n in list" :key="n.id" class="panel px-3 py-2.5">
          <p v-if="n.anchor_text" class="mb-1 line-clamp-2 border-l-2 border-saffron-500/60 pl-2 text-[12px] italic t-lo">{{ n.anchor_text }}</p>
          <p class="whitespace-pre-line text-[13px] leading-snug t-hi">{{ n.body }}</p>
          <div class="mt-1.5 flex items-center gap-2">
            <button
              type="button"
              class="font-mono text-[10px] uppercase tracking-wider"
              :class="n.is_doubt ? 'text-red-500' : 't-lo hover:t-mid'"
              @click="updateNote(n.id, { is_doubt: !n.is_doubt })"
            >doubt</button>
            <button
              type="button"
              class="font-mono text-[10px] uppercase tracking-wider"
              :class="n.is_important ? 'accent-strong' : 't-lo hover:t-mid'"
              @click="updateNote(n.id, { is_important: !n.is_important })"
            >important</button>
            <button type="button" class="ml-auto font-mono text-[10px] uppercase tracking-wider t-lo hover:text-red-500" @click="deleteNote(n.id)">delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { useStudySession } from '~/composables/useStudySession'
import { usePersonalNotes } from '~/composables/usePersonalNotes'

const { chapter, section, pendingAnchor } = useStudySession()
const { getNotesForSection, createNote, updateNote, deleteNote, loadNotes } = usePersonalNotes()
const route = useRoute()

const draft = ref('')
const ta = ref<any>(null)
const canSave = computed(() => draft.value.trim().length > 0 || !!pendingAnchor.value)

/** Bound to the active section: changing section changes the list. */
const list = computed(() => getNotesForSection(chapter.value.noteId, section.value.id))

interface Stamp { label: string; icon: string; cls: string; body: string; flag?: 'doubt' | 'important' }
const stamps: Stamp[] = [
  { label: 'Confusing', icon: 'i-heroicons-question-mark-circle', cls: 'chip-red', body: 'Confusing - re-read before exam', flag: 'doubt' },
  { label: 'Trap', icon: 'i-heroicons-exclamation-triangle', cls: 'chip-saffron', body: 'Exam trap - options swap these', flag: 'important' },
  { label: 'Memorize #', icon: 'i-heroicons-hashtag', cls: 'chip-sky', body: 'Memorize the number / article' },
  { label: 'Telugu', icon: 'i-heroicons-language', cls: '', body: 'Check Telugu term for this' },
]

function context() {
  return {
    noteId: chapter.value.noteId,
    noteTitle: chapter.value.title,
    route: route.path,
    sectionId: section.value.id,
    sectionLabel: section.value.title,
  }
}

function applyStamp(s: Stamp) {
  const n = createNote(context(), s.body, pendingAnchor.value ?? undefined)
  if (s.flag === 'doubt') updateNote(n.id, { is_doubt: true })
  if (s.flag === 'important') updateNote(n.id, { is_important: true })
  pendingAnchor.value = null
}

function save() {
  if (!canSave.value) return
  const body = draft.value.trim() || 'Highlighted'
  createNote(context(), body, pendingAnchor.value ?? undefined)
  draft.value = ''
  pendingAnchor.value = null
}

watch(pendingAnchor, async (v) => {
  if (v) {
    await nextTick()
    const el: HTMLTextAreaElement | undefined = ta.value?.textarea ?? ta.value?.$el?.querySelector?.('textarea')
    el?.focus()
  }
})

onMounted(() => { loadNotes() })
</script>
