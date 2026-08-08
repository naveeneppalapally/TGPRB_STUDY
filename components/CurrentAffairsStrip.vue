<template>
  <section
    v-if="items.length"
    class="rounded-lg border-l-2 border-l-saffron-500 bg-sub pl-4 pr-4 py-4"
  >
    <div class="flex items-center justify-between mb-3">
      <p class="eyebrow flex items-center gap-1.5 m-0">
        <UIcon name="i-heroicons-newspaper" class="h-3.5 w-3.5" />
        Current Affairs
      </p>
      
      <span v-if="newCount > 0" class="inline-flex items-center gap-1 rounded bg-saffron-500/10 px-2 py-0.5 text-xs font-semibold text-saffron-600 dark:text-saffron-400">
        <UIcon name="i-heroicons-sparkles" class="h-3.5 w-3.5" />
        {{ newCount }} new since last visit
      </span>
    </div>

    <ul class="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-2 md:pb-0 hide-scrollbar">
      <li
        v-for="item in visibleItems"
        :key="item.id"
        class="shrink-0 w-80 md:w-full snap-start flex flex-col gap-3 rounded-md border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 p-4"
      >
        <!-- Header: Category, Date, TG Focus -->
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2">
            <span :class="['chip text-[10px] uppercase font-bold tracking-wider', getCategoryColorClass(item.meta.category)]">
              {{ item.meta.category || 'general' }}
            </span>
            <span
              v-if="item.meta.is_telangana_focus"
              class="inline-flex items-center gap-1 rounded-full bg-saffron-500/10 dark:bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 px-2 py-0.5 text-[10px] font-semibold tracking-wide border border-saffron-500/20"
            >
              <UIcon name="i-heroicons-map-pin" class="h-3 w-3 shrink-0" />
              TG Focus
            </span>
          </div>
          <time
            :datetime="item.meta.event_date || item.meta.date"
            class="font-mono text-[11px] uppercase tracking-[0.1em] t-lo"
          >
            {{ formatDate(item.meta.event_date || item.meta.date) }}
          </time>
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-2">
          <h3 class="text-sm font-semibold leading-snug t-hi">
            {{ item.meta.headline }}
          </h3>
          <p class="text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-md border border-emerald-100 dark:border-emerald-900/50">
            <UIcon name="i-heroicons-light-bulb" class="inline-block h-4 w-4 mr-1 align-text-bottom" />
            {{ item.meta.exam_fact }}
          </p>
          <p v-if="item.meta.summary" class="text-xs leading-relaxed t-mid mt-1">
            {{ item.meta.summary }}
          </p>
        </div>

        <!-- Source & MCQ -->
        <div class="mt-auto pt-2 flex items-center justify-between border-t b-line flex-wrap gap-2">
          <a
            v-if="item.meta.source_url || item.meta.canonical_source_url"
            :href="item.meta.canonical_source_url || item.meta.source_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-[11px] font-medium t-lo transition-colors hover:accent"
          >
            <UIcon :name="item.meta.source_type === 'official' ? 'i-heroicons-building-library' : 'i-heroicons-newspaper'" class="h-3.5 w-3.5 shrink-0" />
            {{ item.meta.source_name || sourceDomain(item.meta.canonical_source_url || item.meta.source_url) }}
          </a>

          <UButton
            v-if="item.meta.mcq"
            size="xs"
            color="white"
            variant="solid"
            icon="i-heroicons-academic-cap"
            @click="toggleMCQ(item.id)"
          >
            Test yourself
          </UButton>
        </div>

        <!-- MCQ Section -->
        <div v-if="item.meta.mcq && activeMcqId === item.id" class="mt-3 p-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm">
          <p class="font-medium t-hi mb-3">{{ item.meta.mcq.question }}</p>
          <div class="flex flex-col gap-2">
            <UButton
              v-for="(option, idx) in item.meta.mcq.options"
              :key="idx"
              size="sm"
              :color="getMcqButtonColor(item.id, idx, item.meta.mcq.answer)"
              :variant="selectedMcqOptions[item.id] !== undefined ? 'solid' : 'soft'"
              class="justify-start text-left whitespace-normal h-auto py-2"
              @click="selectMcqOption(item.id, idx)"
              :disabled="selectedMcqOptions[item.id] !== undefined"
            >
              {{ String.fromCharCode(65 + idx) }}. {{ option }}
            </UButton>
          </div>
          <div v-if="selectedMcqOptions[item.id] !== undefined" class="mt-3 p-2 rounded bg-black/5 dark:bg-white/5 text-xs t-mid">
            <p class="font-semibold mb-1" :class="selectedMcqOptions[item.id] === item.meta.mcq.answer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              {{ selectedMcqOptions[item.id] === item.meta.mcq.answer ? 'Correct!' : 'Incorrect.' }}
            </p>
            <p>{{ item.meta.mcq.explanation }}</p>
          </div>
        </div>
      </li>
    </ul>

    <!-- Footer Actions -->
    <div class="mt-4 flex items-center justify-between gap-4 flex-wrap">
      <UButton
        v-if="items.length > 8 && !showAll"
        variant="ghost"
        color="gray"
        size="sm"
        @click="showAll = true"
      >
        Show all {{ items.length }} entries
      </UButton>
      <div v-else class="flex-1"></div>

      <UButton
        v-if="newCount > 0"
        color="saffron"
        variant="soft"
        size="sm"
        icon="i-heroicons-check"
        @click="handleMarkCaughtUp"
      >
        Mark caught up
      </UButton>
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

const { getNewCount, markCaughtUp } = useTopicVisits()

const { data: allEntries } = await useAsyncData(
  `ca-strip-${props.noteId}`,
  () => queryCollection('current_affair').all(),
)

const items = computed(() => {
  if (!allEntries.value) return []
  return allEntries.value
    .filter((e: any) => {
      const ids: string[] = e.meta?.related_topic_ids ?? []
      return ids.includes(props.noteId)
    })
    .sort((a: any, b: any) => {
      const dateA = a.meta?.event_date || a.meta?.published_at || a.meta?.date
      const dateB = b.meta?.event_date || b.meta?.published_at || b.meta?.date
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
})

const showAll = ref(false)
const visibleItems = computed(() => {
  if (showAll.value) return items.value
  return items.value.slice(0, 8)
})

const newCount = ref(0)
onMounted(() => {
  newCount.value = getNewCount(props.noteId, items.value)
})

function handleMarkCaughtUp() {
  markCaughtUp(props.noteId)
  newCount.value = 0
}

// MCQ State
const activeMcqId = ref<string | null>(null)
const selectedMcqOptions = ref<Record<string, number>>({})

function toggleMCQ(id: string) {
  if (activeMcqId.value === id) {
    activeMcqId.value = null
  } else {
    activeMcqId.value = id
  }
}

function selectMcqOption(itemId: string, optionIdx: number) {
  if (selectedMcqOptions.value[itemId] !== undefined) return
  selectedMcqOptions.value[itemId] = optionIdx
}

function getMcqButtonColor(itemId: string, optionIdx: number, correctIdx: number) {
  const selectedIdx = selectedMcqOptions.value[itemId]
  if (selectedIdx === undefined) return 'gray'
  
  if (optionIdx === correctIdx) return 'green'
  if (optionIdx === selectedIdx && selectedIdx !== correctIdx) return 'red'
  return 'gray'
}

/** Format '2026-07-15' → '15 Jul 2026' */
function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** Extract hostname from a URL for a cleaner label */
function sourceDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  }
  catch {
    return url || ''
  }
}

function getCategoryColorClass(category: string): string {
  const cat = (category || '').toLowerCase()
  const map: Record<string, string> = {
    appointments: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30',
    awards: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30',
    sports: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
    economy: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30',
    international: 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
    defence: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
    telangana: 'text-saffron-700 bg-saffron-100 dark:text-saffron-300 dark:bg-saffron-900/30',
    science: 'text-cyan-700 bg-cyan-100 dark:text-cyan-300 dark:bg-cyan-900/30',
    judiciary: 'text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30',
    environment: 'text-lime-700 bg-lime-100 dark:text-lime-300 dark:bg-lime-900/30',
    books: 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/30',
    schemes: 'text-teal-700 bg-teal-100 dark:text-teal-300 dark:bg-teal-900/30',
  }
  return map[cat] || 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800'
}
</script>
