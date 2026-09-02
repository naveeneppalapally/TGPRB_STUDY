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
      <div class="flex items-center gap-2">
        <span v-if="dueCards.length > 0" class="chip chip-saffron chip-mono">
          <span class="dot" />{{ dueCards.length }} due
        </span>
        <span v-else class="chip chip-jade chip-mono">
          <UIcon name="i-heroicons-check" class="h-3 w-3" /> All caught up
        </span>
      </div>
    </header>

    <!-- ── Stats strip ────────────────────────────────────────────────── -->
    <section class="panel mb-8 grid grid-cols-1 divide-y divide-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div class="px-6 py-4">
        <p class="eyebrow">Reviewed today</p>
        <p class="num mt-1.5 font-display text-[22px] font-bold tracking-tight t-hi">{{ reviewedToday }}</p>
      </div>
      <div class="px-6 py-4">
        <p class="eyebrow">Estimated Retention</p>
        <p
          class="num mt-1.5 font-display text-[22px] font-bold tracking-tight"
          :style="avgRetention > 0 ? 'color: var(--jade);' : ''"
          :class="avgRetention > 0 ? '' : 't-lo'"
        >
          {{ avgRetention > 0 ? avgRetention + '%' : '90%' }}
        </p>
      </div>
      <div class="px-6 py-4">
        <p class="eyebrow mb-2.5">Subject mix</p>
        <div v-if="dueCards.length > 0" class="flex h-1 w-full max-w-[220px] gap-px overflow-hidden rounded-full bg-inset">
          <div
            v-for="(count, section) in sectionCounts"
            :key="section"
            class="h-full transition-all duration-300"
            :style="{ width: (count / dueCards.length * 100) + '%', background: getSectionColor(section as string) }"
            :title="`${section}: ${count}`"
          />
        </div>
        <p v-else class="text-[11.5px] t-lo">Queue clear</p>
      </div>
    </section>

    <!-- ── Card area ──────────────────────────────────────────────────── -->
    <div v-if="currentCard && dueCards.length > 0" class="mx-auto max-w-xl">
      <div class="mb-3 flex items-center justify-between">
        <span class="num font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo">
          Card {{ currentIndex + 1 }} / {{ dueCards.length }}
        </span>
        <span class="font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo">
          {{ currentCard.exam_section || 'General' }} · {{ currentCard.subtopic || 'Atomic fact' }}
        </span>
      </div>

      <!-- Flashcard with 3D flip & CSS Grid dual-face stacking -->
      <button
        type="button"
        class="flip-card block w-full cursor-pointer text-left"
        :aria-label="flipped ? 'Show question' : 'Show answer'"
        @click="toggleFlip"
      >
        <div class="flip-card-inner" :class="{ 'is-flipped': flipped }">
          <!-- Question Face (Front) -->
          <div class="flip-card-face flip-card-front panel panel-hover p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <p class="eyebrow">Question</p>
                <span v-if="currentFSRSCard" class="font-mono text-[10px] t-lo">
                  Reps: {{ currentFSRSCard.fsrs.reps }}
                </span>
              </div>
              <p class="text-[15.5px] leading-[1.75] font-medium t-hi">
                {{ currentCard.front }}
              </p>
            </div>
            <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
              Click - or press ↵ - to reveal
            </p>
          </div>

          <!-- Answer Face (Back) -->
          <div class="flip-card-face flip-card-back panel panel-hover b-strong p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <p class="eyebrow accent">Answer</p>
                <span v-if="currentFSRSCard" class="font-mono text-[10px] t-lo">
                  Reps: {{ currentFSRSCard.fsrs.reps }}
                </span>
              </div>
              <p class="text-[15.5px] leading-[1.75] font-normal t-hi">
                {{ currentCard.back }}
              </p>
            </div>
            <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
              Rate your recall below to schedule with FSRS
            </p>
          </div>
        </div>
      </button>

      <!-- Rating row -->
      <div v-if="flipped" class="mt-4 animate-slide-up">
        <div class="mb-1.5 grid grid-cols-4 gap-2">
          <p v-for="hint in activeScheduleHints" :key="hint.label" class="text-center font-mono text-[9.5px] uppercase tracking-[0.08em] t-lo">
            {{ hint.when }}
          </p>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="(hint, i) in activeScheduleHints"
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
          Keys <UKbd>1</UKbd>-<UKbd>4</UKbd> rate · <UKbd>↵</UKbd> flips
        </p>
      </div>
    </div>

    <!-- ── Empty state ────────────────────────────────────────────────── -->
    <div v-else class="panel relative mx-auto max-w-xl overflow-hidden">
      <div class="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div class="relative px-8 py-14 text-center">
        <span class="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl" style="background: var(--jade-soft); color: var(--jade);">
          <UIcon name="i-heroicons-check-badge" class="h-6 w-6" style="color: var(--jade);" />
        </span>
        <h3 class="font-display text-[18px] font-semibold tracking-tight t-hi mb-2">
          {{ totalActiveCards > 0 ? 'All Due Reviews Completed!' : 'Queue is Empty' }}
        </h3>
        <p class="mx-auto max-w-xs text-[13px] leading-relaxed t-mid mb-6">
          <template v-if="totalActiveCards > 0">
            You reviewed {{ reviewedToday }} cards today. FSRS has scheduled future repetitions based on your memory stability.
          </template>
          <template v-else-if="mode === 'gate'">
            Pass a note's comprehension gate to unlock atomic flashcards into your FSRS review queue.
          </template>
          <template v-else>
            No flashcards unlocked yet. Read a note page to begin reviewing.
          </template>
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton label="Explore Notes" to="/notes/geography/drainage-system-of-india" color="primary" size="md" />
          <UButton label="Back to Dashboard" to="/" color="gray" variant="ghost" size="md" />
        </div>
      </div>
    </div>

    <!-- ── Negative marking notice ────────────────────────────────────── -->
    <div class="callout callout-red mx-auto mt-10 max-w-xl">
      <p class="callout-title">
        <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4" />
        2026 exam: 20% negative marking penalty
      </p>
      <p class="callout-body">
        If you find yourself hesitating, rate honestly as "Again" or "Hard". FSRS calibrates intervals to guarantee 90%+ retention, ensuring you never make unsure guesses in the real exam.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { Rating, type Card as FSRSCard } from 'ts-fsrs'
import { useFSRSEngine, type StudyCard, type FSRSGrade } from '@/composables/useFSRSEngine'
import { useFlashcardUnlock } from '@/composables/useFlashcardUnlock'

useHead({ title: 'Review Queue - TGPRB StudyOS' })

interface RawCard {
  id: string
  front: string
  back: string
  exam_section?: string
  topic?: string
  subtopic?: string
  source_note_id?: string
}

const STORAGE_FSRS_KEY = 'studyos:fsrs:card-states'

const engine = useFSRSEngine({ targets: { static: 0.9 } })
const { mode, isGatePassed } = useFlashcardUnlock()

const allRawCards = ref<RawCard[]>([])
const studyCardsMap = ref<Record<string, StudyCard>>({})
const dueCards = ref<RawCard[]>([])
const currentIndex = ref(0)
const flipped = ref(false)
const reviewedToday = ref(0)
const avgRetention = ref(0)

const currentCard = computed(() => dueCards.value[currentIndex.value] || null)
const currentFSRSCard = computed(() => currentCard.value ? studyCardsMap.value[currentCard.value.id] : null)

const totalActiveCards = computed(() => Object.keys(studyCardsMap.value).length)

const sectionCounts = computed(() => {
  const counts: Record<string, number> = {}
  dueCards.value.forEach(c => {
    const section = c.exam_section || 'General'
    counts[section] = (counts[section] || 0) + 1
  })
  return counts
})

const sectionColors: Record<string, string> = {
  Geography: '#e5ad31',
  Polity: '#60a5fa',
  Telangana: '#f43f5e',
  Arithmetic: '#4ab488',
  General: '#8d867a',
}

function getSectionColor(section: string) {
  return sectionColors[section] || '#b1ab9e'
}

function formatInterval(days: number): string {
  if (days <= 0) return '< 10m'
  if (days === 1) return '1d'
  if (days < 30) return `${Math.round(days)}d`
  if (days < 365) return `${Math.round(days / 30)}mo`
  return `${(days / 365).toFixed(1)}y`
}

const activeScheduleHints = computed(() => {
  if (!currentFSRSCard.value) {
    return [
      { label: 'Again', when: '< 10m', cls: 'rate-again' },
      { label: 'Hard',  when: '1d',    cls: 'rate-hard'  },
      { label: 'Good',  when: '3d',    cls: 'rate-good'  },
      { label: 'Easy',  when: '7d',    cls: 'rate-easy'  },
    ]
  }

  const previews = engine.previewRatings(currentFSRSCard.value)
  return [
    { label: 'Again', when: formatInterval(previews[0]?.scheduledDays ?? 0), cls: 'rate-again' },
    { label: 'Hard',  when: formatInterval(previews[1]?.scheduledDays ?? 1), cls: 'rate-hard'  },
    { label: 'Good',  when: formatInterval(previews[2]?.scheduledDays ?? 3), cls: 'rate-good'  },
    { label: 'Easy',  when: formatInterval(previews[3]?.scheduledDays ?? 7), cls: 'rate-easy'  },
  ]
})

const user = useSupabaseUser()

function getLocalDateKey(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())
  } catch {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}

function getStorageFsrsKey(): string {
  const uid = user.value?.id || 'guest'
  return `studyos:fsrs:card-states:${uid}`
}

function getTodayKey(): string {
  const uid = user.value?.id || 'guest'
  return `studyos:fsrs:reviewed-today:${uid}:${getLocalDateKey()}`
}

function loadSavedFSRSStates(): Record<string, any> {
  if (!import.meta.client) return {}
  try {
    const key = getStorageFsrsKey()
    let raw = localStorage.getItem(key)
    // Fallback to legacy key for guest/migration
    if (!raw && !user.value) {
      raw = localStorage.getItem('studyos:fsrs:card-states')
    }
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveFSRSState(cardId: string, card: StudyCard) {
  if (!import.meta.client) return
  try {
    const key = getStorageFsrsKey()
    const existing = loadSavedFSRSStates()
    existing[cardId] = {
      id: card.id,
      contentId: card.contentId,
      contentType: card.contentType,
      studyType: card.studyType,
      targetRetention: card.targetRetention,
      verifiedPyqCount: card.verifiedPyqCount,
      fsrs: {
        ...card.fsrs,
        due: card.fsrs.due.toISOString(),
        last_review: card.fsrs.last_review ? card.fsrs.last_review.toISOString() : undefined,
      },
    }
    localStorage.setItem(key, JSON.stringify(existing))
  } catch (e) {
    console.error('Failed to save FSRS state:', e)
  }
}

function hydrateCards() {
  const saved = loadSavedFSRSStates()
  const map: Record<string, StudyCard> = {}
  const now = new Date()

  const eligible = allRawCards.value.filter(c => {
    if (mode.value === 'direct') return true
    return c.source_note_id ? isGatePassed(c.source_note_id) : false
  })

  eligible.forEach(c => {
    if (saved[c.id]) {
      const s = saved[c.id]
      map[c.id] = {
        id: s.id,
        contentId: s.contentId,
        contentType: s.contentType,
        studyType: s.studyType,
        unlocked: true,
        verifiedPyqCount: s.verifiedPyqCount ?? 10,
        targetRetention: s.targetRetention ?? 0.9,
        fsrs: {
          ...s.fsrs,
          due: new Date(s.fsrs.due),
          last_review: s.fsrs.last_review ? new Date(s.fsrs.last_review) : undefined,
        },
      }
    } else {
      map[c.id] = engine.createNewCard('static', {
        id: c.id,
        contentId: c.id,
        contentType: 'atomic_flashcard',
        unlocked: true,
        verifiedPyqCount: 10,
        targetRetention: 0.9,
        now,
      })
    }
  })

  studyCardsMap.value = map

  // Build due queue
  const dueStudyCards = engine.buildDueQueue(Object.values(map), now)
  const dueCardIds = new Set(dueStudyCards.map(sc => sc.id))

  // Map back to RawCard objects
  let queue = eligible.filter(c => dueCardIds.has(c.id))

  // If no cards are overdue, show unreviewed / new cards first
  if (queue.length === 0) {
    queue = eligible.filter(c => {
      const sc = map[c.id]
      return sc && sc.fsrs.reps === 0
    })
  }

  dueCards.value = queue
  currentIndex.value = 0
  flipped.value = false

  // Compute average estimated retention across learned cards
  const learned = Object.values(map).filter(sc => sc.fsrs.reps > 0)
  if (learned.length > 0) {
    const totalR = learned.reduce((acc, sc) => acc + engine.retrievability(sc, now), 0)
    avgRetention.value = Math.round((totalR / learned.length) * 100)
  } else {
    avgRetention.value = 90
  }
}

function toggleFlip() {
  flipped.value = !flipped.value
}

async function rate(ratingNumber: number) {
  if (!currentCard.value || !currentFSRSCard.value) return

  const gradeMap: Record<number, FSRSGrade> = {
    1: Rating.Again,
    2: Rating.Hard,
    3: Rating.Good,
    4: Rating.Easy,
  }

  const grade = gradeMap[ratingNumber] ?? Rating.Good
  const now = new Date()

  // 1. Schedule next review via FSRS
  const result = engine.scheduleReview(currentFSRSCard.value, grade, now)
  studyCardsMap.value[currentCard.value.id] = result.card
  saveFSRSState(currentCard.value.id, result.card)

  // 2. Increment stats
  reviewedToday.value++
  if (import.meta.client) {
    localStorage.setItem(getTodayKey(), String(reviewedToday.value))
  }

  // 3. Sync rating with cloud if authenticated
  if (user.value) {
    try {
      await $fetch('/api/review/grade', {
        method: 'POST',
        body: {
          card_id: currentCard.value.id,
          rating: ratingNumber,
        },
      })
    } catch {
      // Offline/local fallback
    }
  }

  // 4. Update retention metric
  const learned = Object.values(studyCardsMap.value).filter(sc => sc.fsrs.reps > 0)
  if (learned.length > 0) {
    const totalR = learned.reduce((acc, sc) => acc + engine.retrievability(sc, now), 0)
    avgRetention.value = Math.round((totalR / learned.length) * 100)
  }

  // 5. Handle 'Again' re-insertion or queue progression
  const finishedCard = currentCard.value
  flipped.value = false

  if (grade === Rating.Again) {
    if (dueCards.value.length > 1) {
      // Push missed card to the back of current session
      dueCards.value.splice(currentIndex.value, 1)
      dueCards.value.push(finishedCard)
    } else {
      // Single card remaining: keep in place and flip back to front for immediate re-test
      flipped.value = false
      return
    }
  } else {
    dueCards.value.splice(currentIndex.value, 1)
  }

  if (currentIndex.value >= dueCards.value.length) {
    currentIndex.value = 0
  }
}

onMounted(async () => {
  if (import.meta.client) {
    const savedCount = localStorage.getItem(getTodayKey())
    if (savedCount) reviewedToday.value = parseInt(savedCount, 10) || 0
  }

  try {
    const data = await $fetch<{ cards: RawCard[] }>('/api/flashcards')
    if (Array.isArray(data.cards)) {
      allRawCards.value = data.cards
      hydrateCards()
    }
  } catch {
    allRawCards.value = []
  }
})

watch(user, () => {
  // Re-hydrate on user login/logout/switch
  if (import.meta.client) {
    const savedCount = localStorage.getItem(getTodayKey())
    reviewedToday.value = savedCount ? (parseInt(savedCount, 10) || 0) : 0
  }
  hydrateCards()
})

watch(() => mode.value, () => {
  hydrateCards()
})

watch(() => currentCard.value?.id, () => {
  flipped.value = false
})

/* Keyboard shortcuts: ↵ flips, 1-4 rate once revealed */
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
  min-height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0 6px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: filter 0.12s ease, transform 50ms ease-out, box-shadow 0.12s ease, border-color 0.12s ease;
  user-select: none;
}
.rate-btn:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
.rate-btn:active:not(:disabled) {
  transform: scale(0.97) translateY(1px);
}
.rate-again {
  background: var(--red-soft);
  border-color: var(--red-line);
  color: var(--red);
}
.rate-again:hover:not(:disabled) {
  border-color: var(--red);
  box-shadow: 0 0 0 1.5px var(--red-line), 0 2px 8px var(--red-soft);
}
.rate-hard {
  background: var(--accent-soft);
  border-color: var(--accent-line);
  color: var(--accent-strong);
}
.rate-hard:hover:not(:disabled) {
  border-color: var(--accent);
  box-shadow: 0 0 0 1.5px var(--accent-line), 0 2px 8px var(--accent-soft);
}
.rate-good {
  background: var(--jade-soft);
  border-color: var(--jade-line);
  color: var(--jade);
}
.rate-good:hover:not(:disabled) {
  border-color: var(--jade);
  box-shadow: 0 0 0 1.5px var(--jade-line), 0 2px 8px var(--jade-soft);
}
.rate-easy {
  background: var(--sky-soft);
  border-color: rgba(96, 165, 250, 0.35);
  color: var(--sky);
}
.rate-easy:hover:not(:disabled) {
  border-color: var(--sky);
  box-shadow: 0 0 0 1.5px rgba(96, 165, 250, 0.45), 0 2px 8px var(--sky-soft);
}
</style>
