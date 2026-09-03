<template>
  <div class="w-full max-w-xl mx-auto">
    <!-- Directional Card Glide Transition (Decoupled Card Advance & Answer Leak Elimination) -->
    <Transition name="card-glide" mode="out-in">
      <div :key="card.id" class="w-full">
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
                  Tap or press Space to reveal answer
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
                  Rate your recall below (1-4)
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </Transition>

    <!-- Zero-Layout-Shift Pre-Reserved Rating Dock (CLS = 0.000) -->
    <div
      class="mt-4 grid transition-[grid-template-rows,opacity] duration-160 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="flipped ? 'grid-rows-[1fr] opacity-100 pointer-events-auto' : 'grid-rows-[0fr] opacity-0 pointer-events-none'"
    >
      <div class="min-h-0 overflow-hidden">
        <div class="min-h-[84px] pt-1">
          <!-- Schedule previews -->
          <div class="grid grid-cols-4 gap-2 mb-2">
            <div v-for="(label, key) in ratingLabels" :key="key" class="text-center">
              <p class="font-mono text-[9.5px] uppercase tracking-[0.08em] t-lo">{{ schedulePreview[key] || '-' }}</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="grid grid-cols-4 gap-2">
            <button
              type="button"
              class="btn-again focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red)]"
              :tabindex="flipped ? 0 : -1"
              @click.stop="submitRating(1)"
            >
              Again <span class="ms-1 font-mono text-[10px] opacity-70">(1)</span>
            </button>
            <button
              type="button"
              class="btn-hard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              :tabindex="flipped ? 0 : -1"
              @click.stop="submitRating(2)"
            >
              Hard <span class="ms-1 font-mono text-[10px] opacity-70">(2)</span>
            </button>
            <button
              type="button"
              class="btn-good focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jade)]"
              :tabindex="flipped ? 0 : -1"
              @click.stop="submitRating(3)"
            >
              Good <span class="ms-1 font-mono text-[10px] opacity-70">(3)</span>
            </button>
            <button
              type="button"
              class="btn-easy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sky)]"
              :tabindex="flipped ? 0 : -1"
              @click.stop="submitRating(4)"
            >
              Easy <span class="ms-1 font-mono text-[10px] opacity-70">(4)</span>
            </button>
          </div>
        </div>
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
import { ref, watch, onMounted, onUnmounted } from 'vue'

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

function handleKeyDown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    toggleFlip()
  } else if (flipped.value) {
    if (e.key === '1') submitRating(1)
    else if (e.key === '2') submitRating(2)
    else if (e.key === '3') submitRating(3)
    else if (e.key === '4') submitRating(4)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Reset flip state when card changes
watch(() => props.card.id, () => {
  flipped.value = false
})
</script>

<style scoped>
/* -- Directional Card Glide Transitions ------------------------------ */
.card-glide-enter-active,
.card-glide-leave-active {
  transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms ease;
  will-change: transform, opacity;
}

.card-glide-enter-from {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
.card-glide-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}

.flip-card {
  perspective: 1200px;
}
.flip-card-face {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transform-style: flat;
}
.flip-card-inner {
  transform-style: preserve-3d;
}
</style>

