<template>
  <section v-if="cards.length" class="panel mt-8 overflow-hidden" aria-labelledby="flashcard-deck-title">
    <header class="flex flex-wrap items-center justify-between gap-3 border-b b-line px-5 py-4 sm:px-6">
      <div>
        <p class="eyebrow mb-1 flex items-center gap-1.5">
          <UIcon name="i-heroicons-rectangle-stack" class="h-3.5 w-3.5 accent" />
          Atomic flashcards
        </p>
        <h2 id="flashcard-deck-title" class="font-display text-lg font-semibold tracking-tight t-hi">
          {{ cards.length }} cards ready for review
        </h2>
      </div>
      <div class="flex items-center gap-2">
        <span class="chip chip-saffron chip-mono">
          {{ unlockMode === 'direct' ? 'Direct unlock' : 'Gate passed' }}
        </span>
        <UButton
          to="/review"
          label="Open review queue"
          color="primary"
          variant="soft"
          size="sm"
          icon="i-heroicons-arrow-right"
        />
        <UButton
          class="ms-1"
          :icon="isCollapsed ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'"
          color="gray"
          variant="ghost"
          size="sm"
          :aria-label="isCollapsed ? 'Show flashcards' : 'Collapse flashcards'"
          :title="isCollapsed ? 'Show flashcards' : 'Collapse flashcards'"
          @click="toggleCollapse"
        />
      </div>
    </header>

    <!-- Pure CSS Grid Fractional Collapse (Zero Layout Thrashing) -->
    <div
      class="grid transition-[grid-template-rows,opacity] duration-180 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="isCollapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'"
    >
      <div class="min-h-0 overflow-hidden">
        <div class="p-5 sm:p-6">
          <!-- Directional Card Glide Container -->
          <Transition :name="glideDirection" mode="out-in">
            <div :key="currentIndex" class="w-full">
              <button
                type="button"
                class="flip-card w-full text-left cursor-pointer select-none"
                :aria-label="flipped ? 'Show question' : 'Show answer'"
                @click="flipped = !flipped"
              >
                <div class="flip-card-inner" :class="{ 'is-flipped': flipped }">
                  <div class="flip-card-face flip-card-front panel p-4 sm:p-8 flex flex-col justify-between">
                    <div>
                      <p class="eyebrow mb-4">Question</p>
                      <p class="text-[15px] font-medium leading-[1.75] t-hi">
                        {{ currentCard.front }}
                      </p>
                    </div>
                    <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
                      Click to reveal the answer
                    </p>
                  </div>
                  <div class="flip-card-face flip-card-back panel b-strong p-4 sm:p-8 flex flex-col justify-between">
                    <div>
                      <p class="eyebrow mb-4 accent">Answer</p>
                      <p class="text-[15px] leading-[1.75] t-hi">
                        {{ currentCard.back }}
                      </p>
                    </div>
                    <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
                      Click to return to the question
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </Transition>

          <div class="mt-4 flex items-center justify-between gap-3">
            <UButton
              icon="i-heroicons-chevron-left"
              color="gray"
              variant="ghost"
              size="sm"
              aria-label="Previous flashcard"
              :disabled="currentIndex === 0"
              @click="navigateCard(currentIndex - 1, 'prev')"
            />
            <span class="font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo">
              Card {{ currentIndex + 1 }} / {{ cards.length }}
            </span>
            <UButton
              trailing-icon="i-heroicons-chevron-right"
              color="gray"
              variant="ghost"
              size="sm"
              aria-label="Next flashcard"
              :disabled="currentIndex === cards.length - 1"
              @click="navigateCard(currentIndex + 1, 'next')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-else-if="!pending" class="panel mt-8 p-5 text-sm t-mid">
    No atomic flashcards have been attached to this note yet.
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Flashcard {
  id: string
  front: string
  back: string
  exam_section: string
  topic: string
  subtopic: string
  source_note_id: string
}

const props = withDefaults(defineProps<{
  noteId: string
  unlockMode?: 'gate' | 'direct'
}>(), {
  unlockMode: 'gate',
})

const { data, pending } = await useAsyncData<{ note_id: string; cards: Flashcard[] }>(
  `flashcards-${props.noteId}`,
  () => $fetch(`/api/flashcards/${props.noteId}`).catch(() => ({ note_id: props.noteId, cards: [] })),
)

const cards = computed(() => data.value?.cards ?? [])
const currentIndex = ref(0)
const flipped = ref(false)
const isCollapsed = ref(false)
const glideDirection = ref<'glide-next' | 'glide-prev'>('glide-next')

const currentCard = computed(() => cards.value[currentIndex.value] ?? { front: '', back: '' })

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function navigateCard(newIndex: number, direction: 'next' | 'prev') {
  if (newIndex < 0 || newIndex >= cards.value.length) return
  glideDirection.value = direction === 'next' ? 'glide-next' : 'glide-prev'
  flipped.value = false
  currentIndex.value = newIndex
}

function goTo(index: number) {
  const direction = index < currentIndex.value ? 'prev' : 'next'
  navigateCard(index, direction)
}

watch(() => props.noteId, () => {
  currentIndex.value = 0
  flipped.value = false
})
</script>

<style scoped>
/* -- Directional Horizontal Card Glide Transitions -------------------- */
.glide-next-enter-active,
.glide-next-leave-active,
.glide-prev-enter-active,
.glide-prev-leave-active {
  transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms ease;
  will-change: transform, opacity;
}

.glide-next-enter-from {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}
.glide-next-leave-to {
  opacity: 0;
  transform: translate3d(-24px, 0, 0);
}

.glide-prev-enter-from {
  opacity: 0;
  transform: translate3d(-24px, 0, 0);
}
.glide-prev-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
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
