<script setup lang="ts">
import { ref, computed, onScopeDispose } from 'vue'
import { characterCount, NOTE_BODY_LIMIT } from '@/utils/annotation-validation'
import type { PersonalNote } from '@/types/annotations'
import { usePersonalNotes } from '@/composables/usePersonalNotes'

const props = defineProps<{
  note: PersonalNote
  showSectionLabel?: boolean
}>()

const { notes, updateNote, deleteNote } = usePersonalNotes()
const user = useSupabaseUser()

const isEditing = ref(false)
const editBody = ref(props.note.body)
const editError = ref('')

const formattedTime = computed(() => {
  const d = new Date(props.note.client_updated_at || props.note.created_at)
  // simple relative time fallback, or explicit string
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
})

function parseMarkdownLite(text: string) {
  if (!text) return ''
  const sanitized = text.replace(/<[^>]*>?/gm, '')
  const lines = sanitized.split('\n')
  const result: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>')
    line = line.replace(/`([^`]+)`/g, '<code class="font-mono text-xs bg-sub px-1 py-0.5 rounded">$1</code>')

    const listMatch = line.match(/^[-*]\s+(.*)$/)
    if (listMatch) {
      if (!inList) {
        result.push('<ul class="list-disc pl-4 space-y-1 my-1">')
        inList = true
      }
      result.push(`<li>${listMatch[1]}</li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      if (line.trim()) {
        result.push(line)
        if (i < lines.length - 1 && !lines[i + 1].match(/^[-*]\s+/)) {
          result.push('<br/>')
        }
      }
    }
  }
  if (inList) {
    result.push('</ul>')
  }
  return result.join('')
}

let autoSaveTimeout: ReturnType<typeof setTimeout> | null = null
let dirty = false
let editOwner = user.value?.id || 'guest'

function startEditing() {
  if (isEditing.value) return
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout)
  autoSaveTimeout = null
  dirty = false
  editBody.value = props.note.body
  editError.value = ''
  editOwner = user.value?.id || 'guest'
  isEditing.value = true
}

function onInput() {
  dirty = true
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout)
  autoSaveTimeout = setTimeout(() => {
    saveEdit()
  }, 800)
}

function saveEdit(): boolean {
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout)
  autoSaveTimeout = null
  editError.value = ''
  if (!dirty) return true
  // Disposing a card can also mean account change or deletion. Never replay
  // its draft into a different account or revive a note the user deleted.
  if ((user.value?.id || 'guest') !== editOwner || !notes.value.some(note => note.id === props.note.id && !note.deleted)) return false
  try {
    updateNote(props.note.id, { body: editBody.value })
    dirty = false
    return true
  } catch (error) {
    editError.value = error instanceof Error ? error.message : 'Note could not be saved.'
    return false
  }
}
onScopeDispose(() => { saveEdit() })

function finishEditing() {
  if (saveEdit()) isEditing.value = false
}

async function toggleImportant() {
  await updateNote(props.note.id, { is_important: !props.note.is_important })
}

async function toggleDoubt() {
  await updateNote(props.note.id, { is_doubt: !props.note.is_doubt })
}

async function remove() {
  if (confirm('Are you sure you want to delete this note?')) {
    await deleteNote(props.note.id)
  }
}
</script>

<template>
  <div class="relative bg-elev border b-line rounded-xl p-3 flex flex-col gap-2 group transition-colors hover:border-gray-300 dark:hover:border-gray-600">
    <div v-if="showSectionLabel" class="eyebrow text-saffron-600 dark:text-saffron-400">
      {{ note.section_label }}
    </div>

    <div v-if="note.anchor_text" class="pl-2 border-l-2 border-saffron-500 text-[12px] t-mid italic bg-saffron-50/50 dark:bg-saffron-950/20 py-1 rounded-r-md">
      "{{ note.anchor_text }}"
    </div>

    <div v-if="isEditing">
      <UTextarea v-model="editBody" @input="onInput" :rows="3" autofocus class="w-full mb-2" />
      <p v-if="editError || characterCount(editBody) > NOTE_BODY_LIMIT" role="alert" class="mb-2 text-xs text-red-500">{{ editError || 'Notes can contain up to 10,000 characters.' }}</p>
      <div class="flex items-center justify-between">
        <span class="text-[10px] t-lo">Auto-saving locally...</span>
        <UButton label="Done" :disabled="characterCount(editBody) > NOTE_BODY_LIMIT" size="xs" color="gray" variant="soft" @click="finishEditing" />
      </div>
    </div>
    <div v-else class="[overflow-wrap:anywhere] text-[13px] t-hi leading-[1.6]" v-html="parseMarkdownLite(note.body)"></div>

    <div class="mt-1 flex items-center justify-between text-[11px] t-lo border-t b-line pt-2">
      <div class="flex items-center gap-2">
        <span class="font-mono text-[10px]">{{ formattedTime }}</span>
        <div class="flex gap-1.5 ml-2">
          <button @click="toggleImportant" class="chip hover:bg-saffron-500/10 transition-colors" :class="note.is_important ? 'border-saffron-500 text-saffron-600 dark:text-saffron-400 bg-saffron-500/10' : ''">
            <UIcon name="i-heroicons-star" class="h-3 w-3" :class="note.is_important ? 'text-saffron-500' : ''" />
            Imp
          </button>
          <button @click="toggleDoubt" class="chip hover:bg-red-500/10 transition-colors" :class="note.is_doubt ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-500/10' : ''">
            <UIcon name="i-heroicons-question-mark-circle" class="h-3 w-3" :class="note.is_doubt ? 'text-red-500' : ''" />
            Doubt
          </button>
        </div>
      </div>
      
      <div class="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <UButton
          icon="i-heroicons-pencil"
          size="xs"
          color="gray"
          variant="ghost"
          class="min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] p-2 flex items-center justify-center"
          aria-label="Edit note"
          @click="startEditing"
        />
        <UButton
          icon="i-heroicons-trash"
          size="xs"
          color="gray"
          variant="ghost"
          class="min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] p-2 flex items-center justify-center"
          aria-label="Delete note"
          @click="remove"
        />
      </div>
    </div>
  </div>
</template>
