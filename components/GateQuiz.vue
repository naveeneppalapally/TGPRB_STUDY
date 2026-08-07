<template>
  <div class="card" style="border-color: var(--border-active)">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xl">🎯</span>
      <h3 class="font-semibold">Comprehension Gate</h3>
      <span class="text-xs" style="color: var(--text-muted)">
        Pass {{ quiz.pass_threshold }}/{{ quiz.questions.length }} to unlock flashcards
      </span>
    </div>

    <!-- Question display -->
    <div v-if="!submitted" class="space-y-6">
      <div
        v-for="(q, qi) in quiz.questions"
        :key="q.id"
        class="p-4 rounded-lg"
        style="background: var(--bg-secondary)"
      >
        <p class="font-medium mb-3 text-sm">
          <span style="color: var(--accent)" class="font-mono">Q{{ qi + 1 }}.</span>
          {{ q.question }}
        </p>
        <div class="space-y-2">
          <label
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-100"
            :class="[
              answers[qi] === oi
                ? 'border border-solid'
                : 'hover:bg-surface-700/30'
            ]"
            :style="answers[qi] === oi
              ? 'background: var(--accent-glow); border-color: var(--border-active)'
              : ''
            "
          >
            <input
              type="radio"
              :name="`gate-q-${qi}`"
              :value="oi"
              v-model="answers[qi]"
              class="sr-only"
            />
            <span
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              :style="answers[qi] === oi
                ? 'border-color: var(--accent); background: var(--accent)'
                : 'border-color: var(--border-subtle)'
              "
            >
              <span
                v-if="answers[qi] === oi"
                class="w-2 h-2 rounded-full"
                style="background: var(--bg-primary)"
              />
            </span>
            <span class="text-sm" :style="answers[qi] === oi ? 'color: var(--text-primary)' : 'color: var(--text-secondary)'">
              {{ opt }}
            </span>
          </label>
        </div>
      </div>

      <!-- Submit button -->
      <button
        class="btn-primary w-full"
        :disabled="!allAnswered"
        @click="submitGate"
      >
        Submit Answers ({{ answeredCount }}/{{ quiz.questions.length }})
      </button>
    </div>

    <!-- Results display -->
    <div v-else class="space-y-4">
      <div
        class="p-4 rounded-lg text-center"
        :style="passed
          ? 'background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3)'
          : 'background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3)'
        "
      >
        <p class="text-3xl font-bold font-mono mb-1" :style="passed ? 'color: #34d399' : 'color: #f87171'">
          {{ score }}/{{ quiz.questions.length }}
        </p>
        <p class="text-sm" :style="passed ? 'color: #34d399' : 'color: #f87171'">
          {{ passed ? '✅ Gate Passed - Flashcards Unlocked!' : '❌ Gate Failed - Review the note and try again' }}
        </p>
      </div>

      <!-- Answer review -->
      <div
        v-for="(q, qi) in quiz.questions"
        :key="q.id"
        class="p-4 rounded-lg"
        style="background: var(--bg-secondary)"
      >
        <div class="flex items-start gap-2 mb-2">
          <span :class="answers[qi] === q.correct_answer ? 'text-green-400' : 'text-red-400'">
            {{ answers[qi] === q.correct_answer ? '✓' : '✗' }}
          </span>
          <p class="font-medium text-sm">{{ q.question }}</p>
        </div>
        <p class="text-xs ml-6 mb-1">
          <span style="color: var(--text-muted)">Your answer:</span>
          <span :class="answers[qi] === q.correct_answer ? 'text-green-400' : 'text-red-400'">
            {{ q.options[answers[qi]] }}
          </span>
        </p>
        <p v-if="answers[qi] !== q.correct_answer" class="text-xs ml-6 mb-1">
          <span style="color: var(--text-muted)">Correct:</span>
          <span class="text-green-400">{{ q.options[q.correct_answer] }}</span>
        </p>
        <p v-if="q.explanation" class="text-xs ml-6 mt-2 italic" style="color: var(--text-muted)">
          {{ q.explanation }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  quiz: GateQuizData
}>()

const emit = defineEmits<{
  completed: [result: { score: number; total: number; passed: boolean }]
}>()

const answers = reactive<Record<number, number>>({})
const submitted = ref(false)
const score = ref(0)
const passed = ref(false)

const answeredCount = computed(() => Object.keys(answers).length)
const allAnswered = computed(() => answeredCount.value === props.quiz.questions.length)

function submitGate() {
  let correct = 0
  props.quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correct_answer) correct++
  })

  score.value = correct
  passed.value = correct >= props.quiz.pass_threshold
  submitted.value = true

  emit('completed', {
    score: correct,
    total: props.quiz.questions.length,
    passed: passed.value,
  })
}
</script>
