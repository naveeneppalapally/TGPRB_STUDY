<template>
  <div class="w-full max-w-xl mx-auto">
    <!-- Card container with 3D Flip and CSS Grid dual-face stacking -->
    <button
      type="button"
      class="flip-card w-full cursor-pointer select-none"
      :aria-label="flipped ? 'Show question' : 'Show answer'"
      @click="toggleFlip"
    >
      <div class="flip-card-inner" :class="{ 'is-flipped': flipped }">
        <!-- Question face (Front) -->
        <div class="flip-card-face flip-card-front panel p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="chip chip-saffron chip-mono text-xs">
                {{ card.exam_section || 'General' }}
              </span>
              <span class="text-xs t-lo">{{ card.subtopic || 'Atomic fact' }}</span>
            </div>

            <div class="py-4 text-center">
              <p class="eyebrow mb-3">Question</p>
              <p class="text-lg font-medium leading-relaxed t-hi">{{ card.front }}</p>
            </div>
          </div>

          <div class="text-center pt-3">
            <p class="font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
              Tap to reveal answer
            </p>
          </div>
        </div>

        <!-- Answer face (Back) -->
        <div class="flip-card-face flip-card-back panel b-strong p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="chip chip-saffron chip-mono text-xs">
                {{ card.exam_section || 'General' }}
              </span>
              <span class="text-xs t-lo">{{ card.subtopic || 'Atomic fact' }}</span>
            </div>

            <div class="py-4 text-center">
              <p class="eyebrow mb-3 accent">Answer</p>
              <p class="text-base leading-relaxed t-hi">{{ card.back }}</p>
            </div>
          </div>

          <div class="text-center pt-3">
            <p class="font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
              Rate your recall below
            </p>
          </div>
        </div>
      </div>
    </button>

    <!-- Rating buttons (only show when flipped) -->
    <div v-if="flipped" class="mt-4 animate-slide-up">
      <!-- Schedule previews -->
      <div class="grid grid-cols-4 gap-2 mb-2">
        <div v-for="(label, key) in ratingLabels" :key="key" class="text-center">
          <p class="font-mono text-[9.5px] uppercase tracking-[0.08em] t-lo">{{ schedulePreview[key] || '-' }}</p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-4 gap-2">
        <button type="button" class="btn-again" @click="submitRating(1)">
          Again
        </button>
        <button type="button" class="btn-hard" @click="submitRating(2)">
          Hard
        </button>
        <button type="button" class="btn-good" @click="submitRating(3)">
          Good
        </button>
        <button type="button" class="btn-easy" @click="submitRating(4)">
          Easy
        </button>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="mt-6 flex items-center justify-between text-xs t-lo">
      <span>Card {{ currentIndex + 1 }} of {{ totalCards }}</span>
      <span class="font-mono">{{ reviewedCount }} reviewed</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FlashcardData {
  id: string
  front: string
  back: string
  exam_section: string
  topic: string
  subtopic: string
}

const props = defineProps<{
  card: FlashcardData
  currentIndex: number
  totalCards: number
  reviewedCount: number
  schedulePreview: Record<string, string>
}>()

const emit = defineEmits<{
  rated: [rating: number]
}>()

const flipped = ref(false)

function toggleFlip() {
  flipped.value = !flipped.value
}

function submitRating(rating: number) {
  flipped.value = false
  emit('rated', rating)
}

const ratingLabels = {
  again: 'Again',
  hard: 'Hard',
  good: 'Good',
  easy: 'Easy',
}

// Reset flip state when card changes
watch(() => props.card.id, () => {
  flipped.value = false
})
</script>
