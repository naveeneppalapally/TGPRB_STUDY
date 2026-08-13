<template>
  <section v-if="items.length" class="rounded-xl border b-line bg-sub overflow-hidden">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-5 py-3.5 border-b b-line">
      <p class="eyebrow flex items-center gap-1.5 m-0">
        <UIcon name="i-heroicons-newspaper" class="h-3.5 w-3.5" />
        Current Affairs
        <span class="font-mono text-[10px] t-lo">({{ currentIndex + 1 }}/{{ items.length }})</span>
      </p>

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
          class="rounded-full transition-all duration-200"
          :class="dotIndex(i) === currentIndex
            ? 'w-4 h-1.5 bg-saffron-500'
            : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'"
          @click="goTo(dotIndex(i))"
          :aria-label="`Card ${dotIndex(i) + 1}`"
        />
        <span v-if="items.length > 10" class="font-mono text-[10px] t-lo ml-1">
          +{{ items.length - 10 }}
        </span>
      </div>

      <!-- Arrow buttons -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="h-8 w-8 rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30"
          :disabled="currentIndex === 0"
          @click="prev"
          aria-label="Previous card"
        >
          <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
        </button>
        <button
          type="button"
          class="h-8 w-8 rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30"
          :disabled="currentIndex === items.length - 1"
          @click="next"
          aria-label="Next card"
        >
          <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
        </button>

        <!-- Mark caught up (only if new items exist) -->
        <button
          v-if="newCount > 0"
          type="button"
          class="h-8 px-3 rounded-lg border b-line text-[11px] font-medium t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-1.5"
          @click="handleMarkCaughtUp"
        >
          <UIcon name="i-heroicons-check" class="h-3.5 w-3.5" />
          Mark read
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { queryCollection } from '#imports'
import { useTopicVisits } from '@/composables/useTopicVisits'

const props = defineProps<{
  noteId: string
}>()

const { getSplitEntries, markCaughtUp } = useTopicVisits()

const { data: allEntries } = await useAsyncData(
  `ca-strip-${props.noteId}`,
  () => queryCollection('current_affair').all(),
)

// All entries for this note, sorted newest first
const items = computed(() => {
  if (!allEntries.value) return []
  return allEntries.value
    .filter((e: any) => {
      const ids: string[] = e.meta?.related_topic_ids ?? []
      return ids.includes(props.noteId)
    })
    .sort((a: any, b: any) => {
      const dateA = a.meta?.published_at || a.meta?.event_date || a.meta?.date
      const dateB = b.meta?.published_at || b.meta?.event_date || b.meta?.date
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
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
