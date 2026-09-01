<template>
  <div>
    <!-- Title -->
    <header class="mb-8 border-b b-line pb-7">
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <span class="chip chip-saffron"><span class="dot" />Personal</span>
        <span class="chip">{{ totalNoteCount }} note{{ totalNoteCount !== 1 ? 's' : '' }}</span>
        <span v-if="importantNoteCount > 0" class="chip border-saffron-500/30 text-saffron-600 dark:text-saffron-400 bg-saffron-500/10">
          ⭐ {{ importantNoteCount }} important
        </span>
        <span v-if="doubtNoteCount > 0" class="chip border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10">
          ❓ {{ doubtNoteCount }} doubt{{ doubtNoteCount !== 1 ? 's' : '' }}
        </span>
      </div>
      <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
        My Notes
      </h1>
      <p class="mt-3 max-w-xl text-body leading-[1.8] t-mid">
        All your personal notes, doubts, and highlights across every study topic - searchable and filterable.
      </p>
    </header>

    <!-- Search + Filter Tabs -->
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search notes, quotes, topics, or sections..."
        class="flex-1"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template v-if="searchQuery" #trailing>
          <UButton
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark"
            :padded="false"
            class="cursor-pointer"
            @click="clearSearch"
          />
        </template>
      </UInput>

      <!-- Filter Tabs -->
      <div class="flex items-center gap-1 bg-sub border b-line rounded-lg p-1 w-full overflow-x-auto sm:w-auto shrink-0 scrollbar-none">
        <UButton
          size="xs"
          :color="filterMode === 'all' ? 'gray' : 'gray'"
          :variant="filterMode === 'all' ? 'solid' : 'ghost'"
          class="text-xs"
          @click="setFilter('all')"
        >
          All ({{ totalNoteCount }})
        </UButton>
        <UButton
          size="xs"
          :color="filterMode === 'important' ? 'primary' : 'gray'"
          :variant="filterMode === 'important' ? 'soft' : 'ghost'"
          class="text-xs"
          @click="setFilter('important')"
        >
          ⭐ Important ({{ importantNoteCount }})
        </UButton>
        <UButton
          size="xs"
          :color="filterMode === 'doubt' ? 'red' : 'gray'"
          :variant="filterMode === 'doubt' ? 'soft' : 'ghost'"
          class="text-xs"
          @click="setFilter('doubt')"
        >
          ❓ Doubts ({{ doubtNoteCount }})
        </UButton>
      </div>
    </div>

    <!-- Notes by topic -->
    <div v-if="isLoading" class="text-center py-12 t-lo text-body-sm">Loading your notes...</div>

    <!-- Empty States -->
    <div v-else-if="filteredGroups.length === 0" class="text-center py-12 bg-elev border b-line rounded-2xl p-8">
      <!-- Case 1: Search active with 0 results -->
      <template v-if="searchQuery">
        <UIcon name="i-heroicons-magnifying-glass" class="h-10 w-10 t-lo mx-auto mb-3" />
        <p class="t-mid text-body font-medium">
          No notes match "{{ searchQuery }}".
        </p>
        <p class="mt-1 text-body-xs t-lo mb-4">
          Try searching for different keywords or clear your query.
        </p>
        <UButton
          size="sm"
          color="gray"
          variant="soft"
          label="Clear search"
          @click="clearSearch"
        />
      </template>

      <!-- Case 2: Filter active with 0 results -->
      <template v-else-if="filterMode !== 'all'">
        <UIcon
          :name="filterMode === 'important' ? 'i-heroicons-star' : 'i-heroicons-question-mark-circle'"
          class="h-10 w-10 mx-auto mb-3"
          :class="filterMode === 'important' ? 'text-saffron-500' : 'text-red-500'"
        />
        <p class="t-mid text-body font-medium">
          No {{ filterMode === 'important' ? 'important notes' : 'doubts' }} found.
        </p>
        <p class="mt-1 text-body-xs t-lo mb-4">
          Flag notes as {{ filterMode === 'important' ? 'important (⭐)' : 'doubts (❓)' }} from any study page to view them here.
        </p>
        <UButton
          size="sm"
          color="gray"
          variant="soft"
          label="Show all notes"
          @click="setFilter('all')"
        />
      </template>

      <!-- Case 3: No notes exist globally -->
      <template v-else>
        <UIcon name="i-heroicons-pencil-square" class="h-10 w-10 t-lo mx-auto mb-3" />
        <p class="t-mid text-body font-medium">
          No personal notes yet.
        </p>
        <p class="mt-1 text-body-xs t-lo">
          Open any study note and use the <UIcon name="i-heroicons-pencil-square" class="inline h-3.5 w-3.5" /> button in section headers to add your first note.
        </p>
      </template>
    </div>

    <!-- Grouped Topic Note Cards -->
    <div v-else class="space-y-8">
      <div v-for="group in filteredGroups" :key="group.noteId" class="bg-elev border b-line rounded-2xl p-5">
        <header class="mb-4 flex items-center justify-between">
          <div>
            <p class="eyebrow accent">{{ group.examSection || 'General' }}</p>
            <NuxtLink :to="group.route" class="text-[17px] font-semibold t-hi hover:underline">
              {{ group.noteTitle }}
            </NuxtLink>
          </div>
          <span class="chip">{{ group.notes.length }} note{{ group.notes.length !== 1 ? 's' : '' }}</span>
        </header>

        <div class="space-y-3">
          <NoteCard
            v-for="note in group.notes"
            :key="note.id"
            :note="note"
            :show-section-label="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import NoteCard from '@/components/notes/NoteCard.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import type { PersonalNote, NoteFilterMode } from '@/types/annotations'

useHead({
  title: 'My Notes - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'View and search all your personal study notes across topics.' }],
})

const { notes, isLoading, loadNotes } = usePersonalNotes()

const searchQuery = ref('')
const filterMode = ref<NoteFilterMode>('all')

function setFilter(mode: NoteFilterMode) {
  filterMode.value = mode
}

function clearSearch() {
  searchQuery.value = ''
}

onMounted(() => {
  loadNotes()
})

// NOTE-ID to metadata mapping for all 7 active topics
const noteMetadata: Record<string, { title: string, section: string, route: string }> = {
  'NOTE-GEO-DRAINAGE': {
    title: 'Drainage System of India',
    section: 'Geography',
    route: '/notes/geography/drainage-system-of-india',
  },
  'NOTE-GEO-IRRIGATION': {
    title: 'Irrigation in India & Telangana',
    section: 'Geography',
    route: '/notes/geography/irrigation-in-india',
  },
  'NOTE-GEO-MOUNTAINS': {
    title: 'Mountains, Ranges & Passes of India',
    section: 'Geography',
    route: '/notes/geography/mountains-in-india',
  },
  'NOTE-GEO-DAMS': {
    title: 'Dams, Reservoirs & Multipurpose Projects of India',
    section: 'Geography',
    route: '/notes/geography/dams-in-india',
  },
  'NOTE-GEO-FORESTS': {
    title: 'Forests, Natural Vegetation & Protected Areas of India',
    section: 'Geography',
    route: '/notes/geography/forests-in-india',
  },
  'NOTE-POL-UNION-EXEC': {
    title: 'Union Executive & Parliament',
    section: 'Polity',
    route: '/notes/polity/union-executive-and-legislature',
  },
  'NOTE-TEL-MOVEMENT': {
    title: 'Telangana Armed Struggle & Statehood Movement',
    section: 'Telangana',
    route: '/notes/telangana/telangana-statehood-movement',
  },
}

interface NoteGroup {
  noteId: string
  noteTitle: string
  examSection: string
  route: string
  notes: PersonalNote[]
}

const totalNoteCount = computed(() => notes.value.filter(n => !n.deleted).length)
const importantNoteCount = computed(() => notes.value.filter(n => !n.deleted && n.is_important).length)
const doubtNoteCount = computed(() => notes.value.filter(n => !n.deleted && n.is_doubt).length)

const filteredGroups = computed<NoteGroup[]>(() => {
  let filtered: PersonalNote[]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    filtered = notes.value.filter(n => {
      if (n.deleted) return false
      const meta = noteMetadata[n.note_id]
      const bodyMatch = Boolean(n.body && n.body.toLowerCase().includes(q))
      const anchorMatch = Boolean(n.anchor_text && n.anchor_text.toLowerCase().includes(q))
      const sectionMatch = Boolean(n.section_label && n.section_label.toLowerCase().includes(q))
      const titleMatch = Boolean(meta && meta.title.toLowerCase().includes(q))
      const examSectionMatch = Boolean(meta && meta.section.toLowerCase().includes(q))
      return bodyMatch || anchorMatch || sectionMatch || titleMatch || examSectionMatch
    })
  } else {
    filtered = notes.value.filter(n => !n.deleted)
  }

  // Apply filter mode
  if (filterMode.value === 'important') {
    filtered = filtered.filter(n => n.is_important)
  } else if (filterMode.value === 'doubt') {
    filtered = filtered.filter(n => n.is_doubt)
  }

  // Group by note_id
  const groups = new Map<string, NoteGroup>()
  for (const note of filtered) {
    let group = groups.get(note.note_id)
    if (!group) {
      const meta = noteMetadata[note.note_id] || { title: note.note_id, section: 'General', route: '#' }
      group = {
        noteId: note.note_id,
        noteTitle: meta.title,
        examSection: meta.section,
        route: meta.route,
        notes: [],
      }
      groups.set(note.note_id, group)
    }
    group.notes.push(note)
  }

  // Sort groups by most recent note update
  return Array.from(groups.values()).sort((a, b) => {
    const aLatest = Math.max(...a.notes.map(n => new Date(n.client_updated_at || n.created_at || 0).getTime()))
    const bLatest = Math.max(...b.notes.map(n => new Date(n.client_updated_at || n.created_at || 0).getTime()))
    return bLatest - aLatest
  })
})
</script>
