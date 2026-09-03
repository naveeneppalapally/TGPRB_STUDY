<template>
  <ClientOnly>
    <div class="space-y-6">
      <!-- Direct Unlock Active Banner -->
      <div
        v-if="mode === 'direct'"
        class="rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-lock-open" class="h-5 w-5 text-saffron-500 shrink-0 mt-0.5" />
          <div>
            <p class="text-[13px] font-semibold t-hi flex items-center gap-2">
              Direct Unlock Active
              <span class="chip chip-mono text-[10px] bg-saffron-500/20 text-saffron-600 dark:text-saffron-400">Settings</span>
            </p>
            <p class="mt-0.5 text-[12px] t-mid">
              Atomic flashcards are unlocked immediately on this device without requiring the comprehension gate.
            </p>
          </div>
        </div>
        <button
          v-if="quiz"
          type="button"
          class="shrink-0 text-[11.5px] font-mono font-medium accent hover:underline flex items-center gap-1 self-start sm:self-center"
          @click="showOptionalQuiz = !showOptionalQuiz"
        >
          <UIcon :name="showOptionalQuiz ? 'i-heroicons-chevron-up' : 'i-heroicons-beaker'" class="h-3.5 w-3.5" />
          {{ showOptionalQuiz ? 'Hide Quiz' : 'Practice Gate Quiz (Optional)' }}
        </button>
      </div>

      <!-- Gate Quiz Box (Shown if gate mode, or if user toggled optional quiz in direct mode) -->
      <div
        v-if="quiz && (mode === 'gate' || showOptionalQuiz)"
        class="rounded-xl border b-line overflow-hidden"
        @keydown="handleKey"
        tabindex="0"
      >
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-3.5 border-b b-line">
          <div class="flex items-center gap-2">
            <UIcon
              :name="isUnlocked ? 'i-heroicons-lock-open' : 'i-heroicons-lock-closed'"
              class="h-4 w-4"
              :style="isUnlocked ? 'color: var(--jade);' : 'color: var(--accent);'"
            />
            <h3 class="font-semibold text-[13px] t-hi">Comprehension Gate</h3>
            <span class="font-mono text-[10px] t-lo">
              {{ submitted ? 'Done' : (previouslyPassed && !retrying ? 'Passed' : `Q${currentQ + 1} of ${quiz.questions.length}`) }}
            </span>
          </div>
          <span class="text-[11px] t-lo">
            Pass {{ quiz.pass_threshold }}/{{ quiz.questions.length }} to unlock flashcards
          </span>
        </div>

        <!-- Previously Passed State (Gate mode) -->
        <div v-if="previouslyPassed && !retrying && !submitted" class="p-6 text-center space-y-3">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-full mb-1" style="background: var(--jade-soft); color: var(--jade);">
            <UIcon name="i-heroicons-check-badge" class="h-7 w-7" style="color: var(--jade);" />
          </div>
          <h4 class="text-[15px] font-semibold t-hi">Comprehension Gate Passed</h4>
          <p class="text-[12.5px] t-mid max-w-md mx-auto leading-relaxed">
            You have already verified your understanding of this note. The atomic flashcards are fully unlocked and synced with your review queue.
          </p>
          <div class="pt-2">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border b-line text-[11.5px] font-mono font-medium t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              @click="startRetake"
            >
              <UIcon name="i-heroicons-arrow-path" class="h-3.5 w-3.5" />
              Retake Gate Quiz
            </button>
          </div>
        </div>

        <!-- Question view (one at a time) -->
        <div v-else-if="!submitted">
          <Transition :name="slideDir">
            <div :key="currentQ" class="px-5 py-5">
              <!-- Question text -->
              <p class="font-medium text-[14px] leading-[1.7] t-hi mb-4">
                <span class="font-mono mr-1.5" style="color: var(--accent);">Q{{ currentQ + 1 }}.</span>
                {{ quiz.questions[currentQ].question }}
              </p>

              <!-- Options -->
              <div class="flex flex-col gap-2">
                <label
                  v-for="(opt, oi) in quiz.questions[currentQ].options"
                  :key="oi"
                  class="opt cursor-pointer select-none transition-transform duration-45 active:scale-[0.985]"
                  :class="answers[currentQ] === oi ? 'opt-selected' : ''"
                >
                  <input
                    type="radio"
                    :name="`gate-q-${currentQ}`"
                    :value="oi"
                    v-model="answers[currentQ]"
                    class="sr-only"
                  />
                  <!-- Radio Circle Indicator -->
                  <span class="radio-indicator-circle">
                    <span v-if="answers[currentQ] === oi" class="radio-indicator-dot" />
                  </span>
                  <span class="text-[13px] flex-1" :class="answers[currentQ] === oi ? 't-hi font-medium' : 't-mid'">
                    {{ opt }}
                  </span>
                </label>
              </div>
            </div>
          </Transition>

          <!-- Progress dots + navigation -->
          <div class="flex items-center justify-between px-5 py-3 border-t b-line bg-white/30 dark:bg-black/20">
            <!-- Dot progress -->
            <div class="flex items-center gap-1.5">
              <span
                v-for="(q, i) in quiz.questions"
                :key="i"
                class="rounded-full transition-all duration-200"
                :class="[
                  i === currentQ ? 'w-4 h-1.5 bg-saffron-500' : 'w-1.5 h-1.5',
                  answers[i] !== undefined
                    ? 'bg-saffron-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                ]"
              />
            </div>

            <!-- Arrows + Submit -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="h-11 w-11 rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30 min-h-[44px] min-w-[44px]"
                :disabled="currentQ === 0"
                aria-label="Previous question"
                @click="prevQ"
              >
                <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
              </button>
              <button
                v-if="currentQ < quiz.questions.length - 1"
                type="button"
                class="h-11 w-11 rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all min-h-[44px] min-w-[44px]"
                aria-label="Next question"
                @click="nextQ"
              >
                <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
              </button>
              <button
                v-else
                type="button"
                class="h-11 px-5 rounded-lg text-[13px] font-semibold transition-all min-h-[44px] flex items-center justify-center"
                :class="allAnswered
                  ? 'bg-saffron-500 text-white hover:bg-saffron-600 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 t-lo cursor-not-allowed'"
                :disabled="!allAnswered"
                @click="submitGate"
              >
                Submit ({{ answeredCount }}/{{ quiz.questions.length }})
              </button>
            </div>
          </div>
        </div>

        <!-- Results view -->
        <div v-else class="px-5 py-5 space-y-4">
          <!-- Score banner with Celebratory Pass State & Shockwave Ring -->
          <div
            class="relative overflow-hidden rounded-xl p-6 text-center transition-all"
            :style="passed
              ? 'background: var(--jade-soft); border: 1px solid var(--jade-line);'
              : 'background: var(--red-soft); border: 1px solid var(--red-line);'"
          >
            <!-- Celebratory Pass Graphic -->
            <div v-if="passed" class="relative inline-flex items-center justify-center mb-3">
              <!-- Expanding Jade Shockwave Ring -->
              <span class="pass-ring pass-shockwave pointer-events-none absolute inset-0 rounded-full" aria-hidden="true" />
              <!-- Celebratory Badge Pop Icon -->
              <div class="celebrate-badge relative z-10 grid h-14 w-14 place-items-center rounded-full" style="background: var(--jade); color: #ffffff;">
                <UIcon name="i-heroicons-check-badge" class="h-8 w-8 text-white" />
              </div>
            </div>

            <p
              class="text-4xl font-bold font-mono mb-1"
              :style="passed ? 'color: var(--jade);' : 'color: var(--red);'"
            >
              {{ score }}/{{ quiz.questions.length }}
            </p>
            <p
              class="text-[13.5px] font-semibold"
              :style="passed ? 'color: var(--jade);' : 'color: var(--red);'"
            >
              {{ passed ? 'Gate Passed - Flashcards Unlocked!' : 'Not quite - review and try again' }}
            </p>
          </div>

          <!-- Per-question review -->
          <div
            v-for="(q, qi) in quiz.questions"
            :key="q.id"
            class="rounded-lg border p-4"
            :style="answers[qi] === q.correct_answer
              ? 'border-color: var(--jade-line); background: var(--bg-elevated);'
              : 'border-color: var(--red-line); background: var(--bg-elevated);'"
          >
            <div class="flex items-start gap-2 mb-2">
              <UIcon
                :name="answers[qi] === q.correct_answer ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid'"
                class="h-4 w-4 mt-0.5 flex-shrink-0"
                :style="answers[qi] === q.correct_answer ? 'color: var(--jade);' : 'color: var(--red);'"
              />
              <p class="font-medium text-[13px] t-hi">{{ q.question }}</p>
            </div>
            <p class="text-[12px] ml-6 t-lo">
              Your answer:
              <span :style="answers[qi] === q.correct_answer ? 'color: var(--jade); font-weight: 500;' : 'color: var(--red);'">
                {{ q.options[answers[qi]] }}
              </span>
            </p>
            <p v-if="answers[qi] !== q.correct_answer" class="text-[12px] ml-6 font-medium" style="color: var(--jade);">
              Correct: {{ q.options[q.correct_answer] }}
            </p>
            <p v-if="q.explanation" class="text-[12px] ml-6 mt-2 t-lo italic">{{ q.explanation }}</p>
          </div>

          <!-- Retry -->
          <button
            v-if="!passed"
            type="button"
            class="w-full py-2.5 rounded-lg border b-line text-[12px] font-medium t-mid hover:t-hi hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
            @click="retry"
          >
            Try again
          </button>
        </div>
      </div>

      <!-- Gate not available yet -->
      <div v-else-if="!quiz && mode === 'gate'" class="rounded-xl border b-line px-5 py-4">
        <p class="text-[12px] t-lo">Comprehension gate not available for this note yet.</p>
      </div>

      <!-- Flashcard Deck (ZLS Fractional Row Expansion Wrapper) -->
      <div
        class="grid transition-[grid-template-rows,opacity] duration-220 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="isUnlocked && assistantNoteId ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'"
      >
        <div class="min-h-0 overflow-hidden">
          <FlashcardDeck
            v-if="isUnlocked && assistantNoteId"
            :note-id="assistantNoteId"
            :unlock-mode="mode"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, watch } from 'vue'
import { useFlashcardUnlock } from '@/composables/useFlashcardUnlock'

interface GateQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
}

interface GateQuizData {
  note_id: string
  pass_threshold: number
  questions: GateQuestion[]
}

const props = defineProps<{
  quiz?: GateQuizData
  noteId?: string
}>()

const emit = defineEmits<{
  completed: [result: { score: number; total: number; passed: boolean }]
}>()

const { mode, hasPassedQuizLocally, checkCloudGatePassed, markGatePassed } = useFlashcardUnlock()

const fetchedQuiz = ref<GateQuizData | null>(null)
const showOptionalQuiz = ref(false)
const previouslyPassed = ref(false)
const retrying = ref(false)

const assistantNoteId = computed(() => props.noteId ?? quiz.value?.note_id ?? '')

onMounted(async () => {
  if (props.noteId && !props.quiz) {
    try {
      fetchedQuiz.value = await $fetch<GateQuizData>(`/api/gate/${props.noteId}`)
    } catch {
      fetchedQuiz.value = null
    }
  }

  if (assistantNoteId.value) {
    previouslyPassed.value = await checkCloudGatePassed(assistantNoteId.value)
  }
})

watch(() => assistantNoteId.value, async (newId) => {
  if (newId) {
    previouslyPassed.value = await checkCloudGatePassed(newId)
  }
})

const quiz = computed<GateQuizData | undefined>(() => props.quiz ?? fetchedQuiz.value ?? undefined)

// Navigation
const currentQ = ref(0)
const slideDir = ref<'slide-left' | 'slide-right'>('slide-left')

const answers = reactive<Record<number, number>>({})
const submitted = ref(false)
const score = ref(0)
const passed = ref(false)

const isUnlocked = computed(() => {
  if (mode.value === 'direct') return true
  if (passed.value) return true
  if (previouslyPassed.value) return true
  return false
})

const answeredCount = computed(() => Object.keys(answers).length)
const allAnswered = computed(() => !!quiz.value && answeredCount.value === quiz.value.questions.length)

function prevQ() {
  if (currentQ.value > 0) {
    slideDir.value = 'slide-right'
    currentQ.value--
  }
}
function nextQ() {
  if (quiz.value && currentQ.value < quiz.value.questions.length - 1) {
    slideDir.value = 'slide-left'
    currentQ.value++
  }
}

function handleKey(e: KeyboardEvent) {
  if (submitted.value) return
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextQ() }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevQ() }
}

async function submitGate() {
  if (!quiz.value) return
  let correct = 0
  quiz.value.questions.forEach((q, i) => {
    if (answers[i] === q.correct_answer) correct++
  })
  score.value = correct
  const didPass = correct >= quiz.value.pass_threshold
  passed.value = didPass
  submitted.value = true

  if (didPass && assistantNoteId.value) {
    markGatePassed(assistantNoteId.value)
    previouslyPassed.value = true
  }

  // Record submission in Supabase for authenticated user
  try {
    let flashcardIds: string[] = []
    try {
      const fcData = await $fetch<{ cards: Array<{ id: string }> }>(`/api/flashcards/${assistantNoteId.value}`)
      if (fcData?.cards) {
        flashcardIds = fcData.cards.map(c => c.id)
      }
    } catch {}

    await $fetch('/api/gate/submit', {
      method: 'POST',
      body: {
        note_id: assistantNoteId.value,
        score: correct,
        total: quiz.value.questions.length,
        pass_threshold: quiz.value.pass_threshold,
        flashcard_ids: flashcardIds,
      },
    })
  } catch {
    // Offline or guest mode fallback
  }

  emit('completed', { score: correct, total: quiz.value.questions.length, passed: didPass })
}

function startRetake() {
  retrying.value = true
  retry()
}

function retry() {
  Object.keys(answers).forEach(k => delete (answers as any)[k])
  currentQ.value = 0
  submitted.value = false
  score.value = 0
  passed.value = false
}
</script>

<style scoped>
.opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease, transform 45ms cubic-bezier(0, 0, 0.2, 1);
  user-select: none;
}
.opt:hover { border-color: var(--border-active); }
.opt:active {
  transform: scale(0.985);
}
.opt-selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

/* Radio indicator circle and 12% spring overshoot dot */
.radio-indicator-circle {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: 2px solid var(--line-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 120ms ease, background-color 120ms ease;
}

.opt-selected .radio-indicator-circle {
  border-color: var(--accent);
  background-color: var(--accent);
}

.radio-indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #ffffff;
  animation: radioDotSpring 200ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes radioDotSpring {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Celebratory Pass Badge Pop (220ms) and Expanding Jade Shockwave Ring */
.celebrate-badge {
  animation: badgePop 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.pass-ring,
.pass-shockwave {
  border: 2px solid var(--jade);
  animation: passRingExpand 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes badgePop {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  70% {
    transform: scale(1.12);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes passRingExpand {
  0% {
    transform: scale(0.8);
    opacity: 0.85;
    box-shadow: 0 0 0 0 var(--jade-soft);
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
    box-shadow: 0 0 24px 12px transparent;
  }
}

/* Hardware-Accelerated Snappy Question Slide */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms ease;
  will-change: transform, opacity;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-24px, 0, 0);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate3d(-24px, 0, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}
</style>
