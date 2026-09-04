<template>
  <section v-if="items.length" class="rounded-xl border b-line bg-sub overflow-hidden">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-5 py-3.5 border-b b-line">
      <div class="flex flex-wrap items-center gap-2">
        <p class="eyebrow flex items-center gap-1.5 m-0">
          <UIcon name="i-heroicons-newspaper" class="h-3.5 w-3.5" />
          Current Affairs
          <span class="font-mono text-[10px] t-lo">({{ currentIndex + 1 }}/{{ items.length }})</span>
        </p>

        <!-- Subject Digest Fallback Badge -->
        <span
          v-if="isSubjectDigest"
          class="inline-flex items-center gap-1 rounded-full bg-primary-500/10 border border-primary-500/30 px-2 py-0.5 text-[10px] font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider"
          :title="`Showing high-yield ${topicSubject} updates (< 3 direct cards tagged)`"
        >
          <UIcon name="i-heroicons-sparkles" class="h-3 w-3" />
          {{ digestBadgeLabel }}
        </span>
      </div>

      <span
        v-if="newCount > 0"
        class="inline-flex items-center gap-1 rounded-full bg-saffron-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-saffron-600 dark:text-saffron-400"
      >
        <UIcon name="i-heroicons-sparkles" class="h-3 w-3" />
        {{ newCount }} new
      </span>
    </div>

    <!-- Single card display -->
    <div class="px-5 py-5 min-h-[220px] relative" @keydown="handleKey" tabindex="0">
      <!-- NEW badge -->
      <span
        v-if="isCurrentNew"
        class="absolute top-4 right-4 inline-flex items-center gap-0.5 rounded-full bg-saffron-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5"
      >
        NEW
      </span>

      <!-- Card content with transition -->
      <Transition :name="slideDir" mode="out-in">
        <div :key="currentIndex" class="pr-12">
          <CACard :item="currentItem" />
        </div>
      </Transition>
    </div>

    <!-- Navigation footer -->
    <div class="flex items-center justify-between px-5 py-3 border-t b-line bg-white/30 dark:bg-black/20">
      <!-- Dot indicators (max 10 shown) -->
      <div class="flex items-center gap-1.5">
        <button
          v-for="(_, i) in dotsToShow"
          :key="i"
          type="button"
          class="flex items-center justify-center min-h-[44px] min-w-[28px] py-2"
          :aria-label="`Card ${dotIndex(i) + 1}`"
          @click="goTo(dotIndex(i))"
        >
          <span
            class="rounded-full transition-all duration-200 block"
            :class="dotIndex(i) === currentIndex
              ? 'w-4 h-1.5 bg-saffron-500'
              : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'"
          />
        </button>
        <span v-if="items.length > 10" class="font-mono text-[10px] t-lo ml-1">
          +{{ items.length - 10 }}
        </span>
      </div>

      <!-- Arrow buttons -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="h-11 w-11 min-h-[44px] min-w-[44px] rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30"
          :disabled="currentIndex === 0"
          aria-label="Previous card"
          @click="prev"
        >
          <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
        </button>
        <button
          type="button"
          class="h-11 w-11 min-h-[44px] min-w-[44px] rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30"
          :disabled="currentIndex === items.length - 1"
          aria-label="Next card"
          @click="next"
        >
          <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
        </button>

        <!-- Mark caught up (only if new items exist) -->
        <button
          v-if="newCount > 0"
          type="button"
          class="h-11 min-h-[44px] px-3.5 rounded-lg border b-line text-[11px] font-medium t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-1.5"
          @click="handleMarkCaughtUp"
        >
          <UIcon name="i-heroicons-check" class="h-3.5 w-3.5" />
          Mark read
        </button>
      </div>
    </div>
  </section>
  <div v-else class="rounded-xl border b-line bg-elev p-6 text-center text-body-sm t-lo">
    <UIcon name="i-heroicons-newspaper" class="h-6 w-6 mx-auto mb-2 opacity-50" />
    <p>No current affairs currently tagged for this topic.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { queryCollection } from '#imports'
import { useTopicVisits } from '@/composables/useTopicVisits'
import topicsMaster from '~/data/topics_master.json'

interface TopicEntry {
  id: string
  subject: string
  title: string
  keywords: string[]
  aliases: string[]
}

const props = defineProps<{
  noteId: string
}>()

const { getSplitEntries, markCaughtUp } = useTopicVisits()

const { data: allEntries } = await useAsyncData(
  `ca-strip-${props.noteId}`,
  () => queryCollection('current_affair').all(),
)

const typedTopics = (topicsMaster || []) as TopicEntry[]

const SECTION_TO_SUBJECT: Record<string, string> = {
  POL: 'Polity',
  GEO: 'Geography',
  TEL: 'Telangana',
  ECO: 'Economy',
  SCI: 'Science & Technology',
  HIS: 'History',
}

const topicEntry = computed(() => {
  return typedTopics.find(
    t => t.id === props.noteId || (Array.isArray(t.aliases) && t.aliases.includes(props.noteId)),
  )
})

const topicSubject = computed(() => {
  if (topicEntry.value?.subject) return topicEntry.value.subject
  const parts = props.noteId.split('-')
  if (parts.length >= 2 && SECTION_TO_SUBJECT[parts[1]]) {
    return SECTION_TO_SUBJECT[parts[1]]
  }
  return ''
})

const validIds = computed<string[]>(() => {
  if (!topicEntry.value) return [props.noteId]
  const list = [topicEntry.value.id, ...(topicEntry.value.aliases || [])]
  return Array.from(new Set(list))
})

function getCardTime(item: any): number {
  const dateStr = item.meta?.published_at || item.published_at || item.meta?.event_date || item.event_date || item.meta?.date || item.date || ''
  const t = dateStr ? new Date(dateStr).getTime() : 0
  return Number.isNaN(t) ? 0 : t
}

function matchesSubject(item: any, subjectName: string): boolean {
  if (!subjectName) return false
  const sec = (item.meta?.exam_section || item.exam_section || '').toLowerCase()
  const cat = (item.meta?.category || item.category || '').toLowerCase()
  const subLower = subjectName.toLowerCase()

  if (subLower === 'polity') {
    return sec.includes('polity') || cat === 'judiciary' || cat === 'appointments'
  }
  if (subLower === 'geography') {
    return sec.includes('geography') || cat === 'environment' || cat === 'geography'
  }
  if (subLower === 'telangana') {
    return sec.includes('telangana') || cat.includes('telangana') || item.meta?.is_telangana_focus === true || item.is_telangana_focus === true
  }
  if (subLower === 'economy') {
    return sec.includes('economy') || cat === 'economy' || cat === 'schemes'
  }
  if (subLower.includes('science')) {
    return sec.includes('science') || cat === 'science' || cat === 'defence'
  }
  if (subLower === 'history') {
    return sec.includes('history') || cat === 'books' || cat === 'awards' || cat === 'culture'
  }
  return sec.includes(subLower)
}

// Direct items specifically tagged with this note ID or its aliases
const directItems = computed(() => {
  if (!allEntries.value) return []
  const allowed = validIds.value
  return allEntries.value.filter((e: any) => {
    const ids: string[] = e.meta?.related_topic_ids ?? e.related_topic_ids ?? []
    return Array.isArray(ids) && ids.some((id: string) => allowed.includes(id))
  })
})

// Activate Subject Digest fallback if fewer than 3 direct cards are tagged
const isSubjectDigest = computed(() => {
  return directItems.value.length < 3 && !!topicSubject.value
})

const digestBadgeLabel = computed(() => {
  const s = topicSubject.value ? topicSubject.value.toUpperCase() : 'SUBJECT'
  return `${s} DIGEST`
})

// All entries for this note, sorted newest first
const items = computed(() => {
  if (!allEntries.value) return []
  const direct = [...directItems.value]

  let combined = direct
  if (direct.length < 3 && topicSubject.value) {
    const directIds = new Set(direct.map((e: any) => e.id))
    const subjectItems = allEntries.value
      .filter((e: any) => !directIds.has(e.id) && matchesSubject(e, topicSubject.value))
      .sort((a: any, b: any) => getCardTime(b) - getCardTime(a))

    const needed = Math.max(5, 10 - direct.length)
    combined = [...direct, ...subjectItems.slice(0, needed)]
  }

  return combined.sort((a: any, b: any) => getCardTime(b) - getCardTime(a))
})

// New / Earlier split
const newIds = ref<Set<string>>(new Set())
const newCount = computed(() => items.value.filter((e: any) => newIds.value.has(e.id)).length)

onMounted(async () => {
  const split = await getSplitEntries(props.noteId, items.value)
  newIds.value = new Set(split.newEntries.map((e: any) => e.id))
})

// Navigation state
const currentIndex = ref(0)
const slideDir = ref<'slide-left' | 'slide-right'>('slide-left')

const currentItem = computed(() => items.value[currentIndex.value])
const isCurrentNew = computed(() => currentItem.value && newIds.value.has(currentItem.value.id))

// Dots: show max 10
const dotsToShow = computed(() => Array.from({ length: Math.min(items.value.length, 10) }))
function dotIndex(i: number): number {
  // When past the first 10, shift window to keep current dot visible
  if (items.value.length <= 10) return i
  const start = Math.max(0, Math.min(currentIndex.value - 4, items.value.length - 10))
  return start + i
}

function prev() {
  if (currentIndex.value > 0) {
    slideDir.value = 'slide-right'
    currentIndex.value--
  }
}
function next() {
  if (currentIndex.value < items.value.length - 1) {
    slideDir.value = 'slide-left'
    currentIndex.value++
  }
}
function goTo(i: number) {
  slideDir.value = i > currentIndex.value ? 'slide-left' : 'slide-right'
  currentIndex.value = i
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next() }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
}

async function handleMarkCaughtUp() {
  await markCaughtUp(props.noteId)
  newIds.value = new Set()
}
</script>

<style scoped>
/* Slide left (next) */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from { opacity: 0; transform: translateX(32px); }
.slide-left-leave-to   { opacity: 0; transform: translateX(-32px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-32px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(32px); }
</style>
