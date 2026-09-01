<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PersonalNote } from '@/types/annotations'
import { usePersonalNotes } from '@/composables/usePersonalNotes'

const props = defineProps<{
  note: PersonalNote
  showSectionLabel?: boolean
}>()

const { updateNote, deleteNote } = usePersonalNotes()

const isEditing = ref(false)
const editBody = ref(props.note.body)

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
function onInput() {
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout)
  autoSaveTimeout = setTimeout(() => {
    saveEdit()
  }, 800)
}

async function saveEdit() {
  if (!editBody.value.trim()) return
  await updateNote(props.note.id, { body: editBody.value })
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
      <div class="flex items-center justify-between">
        <span class="text-[10px] t-lo">Auto-saving locally...</span>
        <UButton label="Done" size="xs" color="gray" variant="soft" @click="isEditing = false; saveEdit()" />
      </div>
    </div>
    <div v-else class="text-[13px] t-hi leading-[1.6]" v-html="parseMarkdownLite(note.body)"></div>

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
          @click="isEditing = true"
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
