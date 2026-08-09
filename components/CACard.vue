<template>
  <div class="flex flex-col gap-3">
    <!-- Header: Category pill + TG Focus + Date -->
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <span :class="['chip text-[10px] uppercase font-bold tracking-wider', categoryColorClass]">
          {{ item.meta.category || 'general' }}
        </span>
        <span
          v-if="item.meta.difficulty"
          :class="difficultyClass"
          class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
        >
          {{ difficultyLabel }}
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

    <!-- Headline -->
    <h3 class="text-sm font-semibold leading-snug t-hi">
      {{ item.meta.headline }}
    </h3>

    <!-- Exam fact highlight -->
    <p class="text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-md border border-emerald-100 dark:border-emerald-900/50">
      <UIcon name="i-heroicons-light-bulb" class="inline-block h-4 w-4 mr-1 align-text-bottom" />
      {{ item.meta.exam_fact }}
    </p>

    <!-- Summary -->
    <p v-if="item.meta.summary" class="text-xs leading-relaxed t-mid">
      {{ item.meta.summary }}
    </p>

    <!-- Footer: Source link + Test yourself -->
    <div class="mt-auto pt-2 flex items-center justify-between border-t b-line flex-wrap gap-2">
      <a
        v-if="item.meta.source_url || item.meta.canonical_source_url"
        :href="item.meta.canonical_source_url || item.meta.source_url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-[11px] font-medium t-lo transition-colors hover:accent"
      >
        <UIcon
          :name="item.meta.source_type === 'official' ? 'i-heroicons-building-library' : 'i-heroicons-newspaper'"
          class="h-3.5 w-3.5 shrink-0"
        />
        {{ item.meta.source_name || sourceDomain(item.meta.canonical_source_url || item.meta.source_url) }}
      </a>

      <UButton
        v-if="item.meta.mcq"
        size="xs"
        color="white"
        variant="solid"
        icon="i-heroicons-academic-cap"
        @click="toggleMCQ"
      >
        Test yourself
      </UButton>
    </div>

    <!-- MCQ panel -->
    <div
      v-if="item.meta.mcq && showMCQ"
      class="p-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm"
    >
      <p class="font-medium t-hi mb-3">{{ item.meta.mcq.question }}</p>
      <div class="flex flex-col gap-2">
        <UButton
          v-for="(option, idx) in item.meta.mcq.options"
          :key="idx"
          size="sm"
          :color="mcqButtonColor(idx)"
          :variant="selectedOption !== undefined ? 'solid' : 'soft'"
          class="justify-start text-left whitespace-normal h-auto py-2"
          :disabled="selectedOption !== undefined"
          @click="selectOption(idx)"
        >
          {{ String.fromCharCode(65 + idx) }}. {{ option }}
        </UButton>
      </div>
      <div v-if="selectedOption !== undefined" class="mt-3 p-2 rounded bg-black/5 dark:bg-white/5 text-xs t-mid">
        <p
          class="font-semibold mb-1"
          :class="isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
        >
          {{ isCorrect ? 'Correct!' : 'Incorrect.' }}
        </p>
        <p>{{ item.meta.mcq.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  item: any
}>()

// MCQ state
const showMCQ = ref(false)
const selectedOption = ref<number | undefined>(undefined)

function toggleMCQ() {
  showMCQ.value = !showMCQ.value
}

function selectOption(idx: number) {
  if (selectedOption.value !== undefined) return
  selectedOption.value = idx
}

const isCorrect = computed(() =>
  selectedOption.value === props.item.meta.mcq?.answer,
)

function mcqButtonColor(idx: number) {
  if (selectedOption.value === undefined) return 'gray'
  if (idx === props.item.meta.mcq?.answer) return 'green'
  if (idx === selectedOption.value) return 'red'
  return 'gray'
}

// Difficulty badge
const difficultyLabel = computed(() => {
  const d = props.item.meta.difficulty
  if (d === 'F') return 'Easy'
  if (d === 'O') return 'Hard'
  return 'Medium'
})

const difficultyClass = computed(() => {
  const d = props.item.meta.difficulty
  if (d === 'F') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (d === 'O') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
})

const categoryColorClass = computed(() => {
  const cat = (props.item.meta.category || '').toLowerCase()
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
})

function formatDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function sourceDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url || '' }
}
</script>
