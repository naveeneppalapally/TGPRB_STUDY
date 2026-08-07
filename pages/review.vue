<template>
  <div>
    <!-- ── Header ─────────────────────────────────────────────────────── -->
    <header class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow mb-2">FSRS · Spaced repetition</p>
        <h1 class="font-display text-[28px] font-bold tracking-tight t-hi sm:text-[32px]">
          Review Queue
        </h1>
      </div>
      <span v-if="dueCards.length > 0" class="chip chip-saffron chip-mono">
        <span class="dot" />{{ dueCards.length }} due
      </span>
    </header>

    <!-- ── Stats strip ────────────────────────────────────────────────── -->
    <section class="panel mb-8 grid grid-cols-1 divide-y divide-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div class="px-6 py-4">
        <p class="eyebrow">Reviewed today</p>
        <p class="num mt-1.5 font-display text-[22px] font-bold tracking-tight t-hi">{{ reviewedToday }}</p>
      </div>
      <div class="px-6 py-4">
        <p class="eyebrow">Avg retention · 30d</p>
        <p class="num mt-1.5 font-display text-[22px] font-bold tracking-tight" :class="avgRetention > 0 ? 't-hi' : 't-lo'">
          {{ avgRetention > 0 ? avgRetention + '%' : '-' }}
        </p>
      </div>
      <div class="px-6 py-4">
        <p class="eyebrow mb-2.5">Subject mix</p>
        <div v-if="dueCards.length > 0" class="flex h-1 w-full max-w-[220px] gap-px overflow-hidden rounded-full bg-inset">
          <div
            v-for="(count, section) in sectionCounts"
            :key="section"
            class="h-full"
            :style="{ width: (count / dueCards.length * 100) + '%', background: getSectionColor(section as string) }"
            :title="`${section}: ${count}`"
          />
        </div>
        <p v-else class="text-[11.5px] t-lo">No cards in queue</p>
      </div>
    </section>

    <!-- ── Card area ──────────────────────────────────────────────────── -->
    <div v-if="currentCard && dueCards.length > 0" class="mx-auto max-w-xl">
      <div class="mb-3 flex items-center justify-between">
        <span class="num font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo">
          Card {{ currentIndex + 1 }} / {{ dueCards.length }}
        </span>
        <span class="font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo">
          {{ currentCard.exam_section || 'General' }}
        </span>
      </div>

      <!-- Flashcard -->
      <button
        type="button"
        class="panel panel-hover block min-h-[240px] w-full cursor-pointer p-7 text-left sm:p-9"
        :class="flipped ? 'b-strong' : ''"
        @click="toggleFlip"
      >
        <p class="eyebrow mb-4" :class="flipped ? 'accent' : ''">
          {{ flipped ? 'Answer' : 'Question' }}
        </p>
        <p
          class="text-[15.5px] leading-[1.75] t-hi"
          :class="flipped ? 'font-normal' : 'font-medium'"
        >
          {{ flipped ? currentCard.back : currentCard.front }}
        </p>
        <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
          {{ flipped ? 'Rate your recall below' : 'Click - or press ↵ - to reveal' }}
        </p>
      </button>

      <!-- Rating row -->
      <div v-if="flipped" class="mt-4 animate-slide-up">
        <div class="mb-1.5 grid grid-cols-4 gap-2">
          <p v-for="hint in scheduleHints" :key="hint.label" class="text-center font-mono text-[9.5px] uppercase tracking-[0.08em] t-lo">
            {{ hint.when }}
          </p>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="(hint, i) in scheduleHints"
            :key="hint.label"
            type="button"
            class="rate-btn"
            :class="hint.cls"
            @click.stop="rate(i + 1)"
          >
            <span class="block text-[13px] font-semibold">{{ hint.label }}</span>
            <span class="mt-0.5 block font-mono text-[9.5px] opacity-70">{{ i + 1 }}</span>
          </button>
        </div>
        <p class="mt-3 text-center text-[11px] t-lo">
          Keys <UKbd>1</UKbd>–<UKbd>4</UKbd> rate · <UKbd>↵</UKbd> flips
        </p>
      </div>
    </div>

    <!-- ── Empty state ────────────────────────────────────────────────── -->
    <div v-else class="panel relative mx-auto max-w-xl overflow-hidden">
      <div class="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div class="relative px-8 py-14 text-center">
        <span class="mx-auto mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft">
          <UIcon name="i-heroicons-check-badge" class="h-5 w-5 accent" />
        </span>
        <p class="eyebrow mb-2">Queue clear</p>
        <p class="mx-auto max-w-xs text-[13px] leading-relaxed t-mid">
          Nothing due right now. Study a note to generate cards - the
          <NuxtLink to="/notes/geography/drainage-system-of-india" class="accent-strong underline decoration-[var(--accent-line)] underline-offset-4">
            Drainage System note
          </NuxtLink>
          is live with 5 embedded PYQs.
        </p>
        <div class="mt-6 flex items-center justify-center gap-3">
          <UButton label="Read the note" to="/notes/geography/drainage-system-of-india" color="primary" size="md" />
          <UButton label="Back to dashboard" to="/" color="gray" variant="ghost" size="md" />
        </div>
      </div>
    </div>

    <!-- ── Negative marking notice ────────────────────────────────────── -->
    <div class="callout callout-red mx-auto mt-10 max-w-xl">
      <p class="callout-title">
        <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4" />
        2026 exam - 20% negative marking
      </p>
      <p class="callout-body">
        If you're hitting "Again" repeatedly on a card, read the source note before
        guessing in practice. Negative marking punishes confident guesses.
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
useHead({ title: 'Review Queue - TGPRB StudyOS' })

interface Card {
  id: string
  front: string
  back: string
  exam_section?: string
  topic?: string
}

const dueCards = ref<Card[]>([])
const currentIndex = ref(0)
const flipped = ref(false)
const reviewedToday = ref(0)
const avgRetention = ref(0)

const currentCard = computed(() => dueCards.value[currentIndex.value] || null)

const sectionCounts = computed(() => {
  const counts: Record<string, number> = {}
  dueCards.value.forEach(c => {
    const section = c.exam_section || 'General'
    counts[section] = (counts[section] || 0) + 1
  })
  return counts
})

const scheduleHints = [
  { label: 'Again', when: '< 10 min', cls: 'rate-again' },
  { label: 'Hard',  when: '1 day',    cls: 'rate-hard'  },
  { label: 'Good',  when: '3 days',   cls: 'rate-good'  },
  { label: 'Easy',  when: '7 days',   cls: 'rate-easy'  },
]

const sectionColors: Record<string, string> = {
  Geography: '#e5ad31',
  Polity: '#60a5fa',
  Arithmetic: '#4ab488',
  General: '#8d867a',
}

function getSectionColor(section: string) {
  return sectionColors[section] || '#b1ab9e'
}

function toggleFlip() {
  flipped.value = !flipped.value
}

function rate(rating: number) {
  // TODO: POST /api/review/grade - { cardId: currentCard.value?.id, rating }
  reviewedToday.value++
  flipped.value = false
  if (currentIndex.value < dueCards.value.length - 1) {
    currentIndex.value++
  } else {
    dueCards.value = []
    currentIndex.value = 0
  }
}

onMounted(async () => {
  try {
    const data = await $fetch<Card[]>('/data/flashcards/geography/drainage-system.json')
    if (Array.isArray(data)) dueCards.value = data
  } catch {
    /* No local flashcard pack yet - empty state renders */
  }
})

watch(() => currentCard.value?.id, () => { flipped.value = false })

/* Keyboard: ↵ flips, 1–4 rate once revealed */
defineShortcuts({
  enter: () => { if (currentCard.value) toggleFlip() },
  '1': () => { if (flipped.value) rate(1) },
  '2': () => { if (flipped.value) rate(2) },
  '3': () => { if (flipped.value) rate(3) },
  '4': () => { if (flipped.value) rate(4) },
})
</script>

<style scoped>
.rate-btn {
  padding: 10px 0 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: filter 0.12s ease, transform 0.12s ease;
}
.rate-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.rate-again { background: var(--red-soft); border-color: var(--red-line); color: var(--red); }
.rate-hard  { background: var(--accent-soft); border-color: var(--accent-line); color: var(--accent-strong); }
.rate-good  { background: var(--jade-soft); border-color: var(--jade-line); color: var(--jade); }
.rate-easy  { background: var(--sky-soft); border-color: rgba(96, 165, 250, 0.35); color: var(--sky); }
</style>
