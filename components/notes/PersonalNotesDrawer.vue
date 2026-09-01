<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SectionContext } from '@/types/annotations'
import NoteCard from './NoteCard.vue'
import ImprovementForm from './ImprovementForm.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'

const props = defineProps<{
  noteId?: string
  noteTitle?: string
}>()

const isOpen = ref(false)
const activeContext = ref<SectionContext | null>(null)
const activeTab = ref<'note' | 'improvement'>('note')

const { notes, createNote } = usePersonalNotes()

const sectionNotes = computed(() => {
  if (!notes || !notes.value || !activeContext.value) return []
  return notes.value.filter(n => 
    n.note_id === activeContext.value!.noteId && 
    n.section_id === activeContext.value!.sectionId &&
    !n.deleted
  ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
})

const tabs = [
  { label: 'My Notes', slot: 'note' },
  { label: 'Suggest Improvement', slot: 'improvement' }
]
const selectedTabIndex = computed({
  get: () => activeTab.value === 'improvement' ? 1 : 0,
  set: (val) => activeTab.value = val === 1 ? 'improvement' : 'note'
})

const isAdding = ref(false)
const draftBody = ref('')
const draftAnchor = ref('')
const syncStatus = ref('Saved locally')

function openForSection(context: SectionContext, tab: 'note' | 'improvement' = 'note') {
  activeContext.value = context
  activeTab.value = tab
  isOpen.value = true
  
  if (tab === 'note' && typeof window !== 'undefined') {
    const selection = window.getSelection()?.toString().trim()
    if (selection) {
      draftAnchor.value = selection.slice(0, 300)
      isAdding.value = true
      draftBody.value = ''
    }
  }
}

defineExpose({ openForSection })

async function saveNewNote() {
  if (!draftBody.value.trim() || !activeContext.value) return
  
  syncStatus.value = 'Saving...'
  try {
    createNote(activeContext.value, draftBody.value, draftAnchor.value || undefined)
    syncStatus.value = 'Saved locally'
    setTimeout(() => { syncStatus.value = 'Synced' }, 1000)
    
    isAdding.value = false
    draftBody.value = ''
    draftAnchor.value = ''
  } catch (err) {
    syncStatus.value = 'Save failed'
  }
}

function cancelAdding() {
  isAdding.value = false
  draftBody.value = ''
  draftAnchor.value = ''
}
</script>
<template>
  <div>
    <USlideover v-model="isOpen" side="right" :ui="{ width: 'w-screen sm:w-[28rem]' }">
      <div class="flex h-full flex-col bg-base">
        <!-- Header -->
        <header class="flex items-start justify-between gap-4 border-b b-line px-4 py-4">
          <div>
            <p class="eyebrow flex items-center gap-1.5">
              <UIcon name="i-heroicons-pencil-square" class="h-3.5 w-3.5 accent" />
              Notes & Feedback
            </p>
            <h2 class="mt-1 text-[15px] font-semibold t-hi" v-if="activeContext">
              {{ activeContext.noteTitle }} <span class="t-lo font-normal mx-1">/</span> <span class="text-saffron-600 dark:text-saffron-400">{{ activeContext.sectionLabel }}</span>
            </h2>
          </div>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" aria-label="Close" class="min-h-[44px] min-w-[44px] flex items-center justify-center" @click="isOpen = false" />
        </header>

        <!-- Tabs -->
        <div class="border-b b-line px-4 pt-2">
          <UTabs v-model="selectedTabIndex" :items="tabs" class="w-full" :ui="{ list: { rounded: 'rounded-none border-b b-line bg-transparent', marker: { background: 'bg-saffron-500' }, tab: { active: 'text-saffron-600 dark:text-saffron-400 font-semibold' } } }" />
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          <!-- My Notes Tab -->
          <div v-if="activeTab === 'note'">
            <div class="space-y-3 mb-5">
              <NoteCard v-for="note in sectionNotes" :key="note.id" :note="note" />
            </div>
            
            <div v-if="isAdding" class="bg-sub border border-saffron-500/30 rounded-xl p-3 shadow-sm">
              <div v-if="draftAnchor" class="mb-2 pl-2 border-l-2 border-saffron-500 text-[12px] t-mid italic bg-saffron-500/5 py-1 rounded-r-md">
                "{{ draftAnchor }}"
              </div>
              <UTextarea 
                v-model="draftBody"
                placeholder="Type your note here (Ctrl+Enter to save)..."
                autofocus
                :rows="3"
                class="w-full focus:ring-saffron-500"
                @keydown.ctrl.enter="saveNewNote"
                @keydown.meta.enter="saveNewNote"
              />
              <div class="mt-2 flex justify-between items-center">
                <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <UIcon name="i-heroicons-cloud-arrow-up" class="w-3 h-3" />
                  {{ syncStatus }}
                </span>
                <div class="flex gap-2">
                  <UButton label="Cancel" color="gray" variant="ghost" size="xs" class="min-h-[36px] px-3" @click="cancelAdding" />
                  <UButton label="Save Note" color="gray" variant="soft" size="xs" class="bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 hover:bg-saffron-500/20 font-semibold min-h-[36px] px-3" @click="saveNewNote" />
                </div>
              </div>
            </div>
            
            <UButton v-else icon="i-heroicons-plus" label="Add note" color="gray" variant="soft" class="w-full justify-center border border-dashed border-gray-300 dark:border-gray-700 hover:border-saffron-500 transition-colors min-h-[44px]" @click="isAdding = true" />
          </div>
          
          <!-- Suggest Improvement Tab -->
          <div v-else-if="activeTab === 'improvement' && activeContext">
            <ImprovementForm :context="activeContext" />
          </div>
        </div>
      </div>
    </USlideover>
  </div>
</template>
