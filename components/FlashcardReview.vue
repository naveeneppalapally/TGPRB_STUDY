<template>
  <div class="w-full max-w-xl mx-auto">
    <!-- Card container -->
    <div
      class="card relative overflow-hidden cursor-pointer select-none min-h-[280px] flex flex-col"
      @click="toggleFlip"
    >
      <!-- Topic badge -->
      <div class="flex items-center gap-2 mb-4">
        <span class="badge bg-saffron-500/15 text-saffron-600 dark:text-saffron-400 font-mono text-xs font-semibold">
          {{ card.exam_section }}
        </span>
        <span class="text-xs" style="color: var(--text-muted)">{{ card.subtopic }}</span>
      </div>

      <!-- Card face -->
      <div class="flex-1 flex items-center justify-center p-4">
        <div v-if="!flipped" class="text-center animate-fade-in">
          <p class="text-xs uppercase tracking-wider mb-3" style="color: var(--text-muted)">Question</p>
          <p class="text-lg font-medium leading-relaxed">{{ card.front }}</p>
        </div>
        <div v-else class="text-center animate-fade-in">
          <p class="text-xs uppercase tracking-wider mb-3" style="color: var(--accent)">Answer</p>
          <p class="text-base leading-relaxed" style="color: var(--text-secondary)">{{ card.back }}</p>
        </div>
      </div>

      <!-- Flip hint -->
      <div class="text-center py-2">
        <p class="text-xs" style="color: var(--text-muted)">
          {{ flipped ? 'Rate your recall below' : 'Tap to reveal answer' }}
        </p>
      </div>
    </div>

    <!-- Rating buttons (only show when flipped) -->
    <div v-if="flipped" class="mt-4 animate-slide-up">
      <!-- Schedule previews -->
      <div class="grid grid-cols-4 gap-2 mb-2">
        <div v-for="(label, key) in ratingLabels" :key="key" class="text-center">
          <p class="text-xs" style="color: var(--text-muted)">{{ schedulePreview[key] || '-' }}</p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-4 gap-2">
        <button class="btn-again" @click="submitRating(1)">
          Again
        </button>
        <button class="btn-hard" @click="submitRating(2)">
          Hard
        </button>
        <button class="btn-good" @click="submitRating(3)">
          Good
        </button>
        <button class="btn-easy" @click="submitRating(4)">
          Easy
        </button>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="mt-6 flex items-center justify-between text-xs" style="color: var(--text-muted)">
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
