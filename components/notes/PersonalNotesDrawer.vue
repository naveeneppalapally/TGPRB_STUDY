<template>
  <div>
    <USlideover v-model="isOpen" side="right" :ui="{ width: 'w-screen sm:w-[28rem]' }">
      <div class="flex h-full flex-col bg-base">
        <!-- Persistent Drawer Header with Cloud Sync Pill -->
        <header class="flex items-start justify-between gap-4 border-b b-line px-4 py-4">
          <div>
            <div class="flex items-center gap-2">
              <p class="eyebrow flex items-center gap-1.5">
                <UIcon name="i-heroicons-pencil-square" class="h-3.5 w-3.5 accent" />
                Notes &amp; Feedback
              </p>

              <!-- Persistent 3-State Cloud Sync Indicator Pill -->
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] transition-colors duration-140"
                :class="syncStateClass"
              >
                <UIcon
                  :name="syncStateIcon"
                  class="h-3 w-3"
                  :class="syncStatus === 'Saving...' ? 'animate-spin' : ''"
                />
                {{ syncStatus }}
              </span>
            </div>

            <h2 class="mt-1 text-[15px] font-semibold t-hi" v-if="activeContext">
              {{ activeContext.noteTitle }} <span class="t-lo font-normal mx-1">/</span> <span class="accent">{{ activeContext.sectionLabel }}</span>
            </h2>
          </div>

          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            aria-label="Close"
            class="min-h-[44px] min-w-[44px] flex items-center justify-center"
            @click="isOpen = false"
          />
        </header>

        <!-- Tabs -->
        <div class="border-b b-line px-4 pt-2">
          <UTabs
            v-model="selectedTabIndex"
            :items="tabs"
            class="w-full"
            :ui="{ list: { rounded: 'rounded-none border-b b-line bg-transparent', marker: { background: 'bg-saffron-500' }, tab: { active: 'accent font-semibold' } } }"
          />
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          <!-- My Notes Tab -->
          <div v-if="activeTab === 'note'">
            <!-- ZLS TransitionGroup Note Card List -->
            <TransitionGroup
              name="note-list"
              tag="div"
              class="space-y-3 mb-5 relative"
            >
              <NoteCard
                v-for="note in sectionNotes"
                :key="note.id"
                :note="note"
                class="will-change-transform"
              />
            </TransitionGroup>

            <!-- Composer Form -->
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
              <div class="mt-2 flex justify-end items-center gap-2">
                <UButton label="Cancel" color="gray" variant="ghost" size="xs" class="min-h-[36px] px-3" @click="cancelAdding" />
                <UButton label="Save Note" color="gray" variant="soft" size="xs" class="bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 hover:bg-saffron-500/20 font-semibold min-h-[36px] px-3" @click="saveNewNote" />
              </div>
            </div>

            <UButton
              v-else
              icon="i-heroicons-plus"
              label="Add note"
              color="gray"
              variant="soft"
              class="w-full justify-center border border-dashed b-line hover:border-saffron-500 transition-colors min-h-[44px]"
              @click="isAdding = true"
            />
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SectionContext } from '@/types/annotations'
import NoteCard from './NoteCard.vue'
import ImprovementForm from './ImprovementForm.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import { useOfflineSync } from '@/composables/useOfflineSync'

const props = defineProps<{
  noteId?: string
  noteTitle?: string
}>()

const isOpen = ref(false)
const activeContext = ref<SectionContext | null>(null)
const activeTab = ref<'note' | 'improvement'>('note')

const user = useSupabaseUser()
const { notes, createNote } = usePersonalNotes()
const { isSyncing, pendingCount } = useOfflineSync()
const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

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

const syncStatus = computed<'Saved locally' | 'Saving...' | 'Synced' | 'Offline (saved locally)' | 'Local on device'>(() => {
  if (!user.value) return 'Local on device'
  if (!isOnline.value) return 'Offline (saved locally)'
  if (isSyncing.value || pendingCount.value > 0) return 'Saving...'
  return 'Synced'
})

const syncStateClass = computed(() => {
  if (!user.value) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  if (syncStatus.value === 'Saving...') return 'bg-saffron-500/15 text-saffron-600 dark:text-saffron-400'
  return 'bg-jade-soft text-jade'
})

const syncStateIcon = computed(() => {
  if (!user.value) return 'i-heroicons-device-phone-mobile'
  if (syncStatus.value === 'Saving...') return 'i-heroicons-arrow-path'
  return 'i-heroicons-cloud-arrow-up'
})

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
  
  try {
    await createNote(activeContext.value, draftBody.value, draftAnchor.value || undefined)
    isAdding.value = false
    draftBody.value = ''
    draftAnchor.value = ''
  } catch (err) {
    // Note saved locally and enqueued in offline sync engine
  }
}

function cancelAdding() {
  isAdding.value = false
  draftBody.value = ''
  draftAnchor.value = ''
}
</script>

<style scoped>
/* -- Zero-Layout-Shift Note List FLIP TransitionGroup ----------------- */
.note-list-enter-active {
  transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
}
.note-list-leave-active {
  transition: all 140ms ease;
  position: absolute;
  width: 100%;
}
.note-list-enter-from {
  opacity: 0;
  transform: translate3d(0, -8px, 0) scale(0.98);
}
.note-list-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.note-list-move {
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>

