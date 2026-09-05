<template>
  <div class="flex h-full flex-col">
    <div v-if="!section.cards.length" class="grid flex-1 place-items-center p-6 text-center">
      <p class="text-[13px] t-mid">No flashcards for this section.</p>
    </div>

    <template v-else>
      <div class="flex items-center justify-between border-b b-line px-4 py-2.5">
        <span class="font-mono text-[10.5px] uppercase tracking-wider t-lo">Card {{ cardIndex + 1 }} / {{ section.cards.length }}</span>
        <span class="font-mono text-[11px] num">
          <span class="text-jade-600 dark:text-jade-400">{{ knew }} knew</span>
          <span class="mx-1 t-lo">·</span>
          <span class="text-red-500">{{ missed }} missed</span>
        </span>
      </div>

      <div class="flex flex-1 flex-col items-stretch justify-center overflow-y-auto p-4">
        <!-- Flip card -->
        <button
          type="button"
          class="flip-card group relative min-h-[180px] w-full text-left"
          :class="{ 'is-flipped': flipped }"
          :aria-pressed="flipped"
          @click="flipped = !flipped"
        >
          <span class="flip-inner">
            <span class="flip-face flip-front">
              <span class="eyebrow">Question</span>
              <span class="mt-2 block text-[15px] font-medium leading-snug t-hi">{{ card.front }}</span>
              <span class="mt-auto block font-mono text-[10px] t-lo">tap to flip</span>
            </span>
            <span class="flip-face flip-back">
              <span class="eyebrow accent">Answer</span>
              <span class="mt-2 block text-[15px] leading-snug t-hi">{{ card.back }}</span>
            </span>
          </span>
        </button>

        <!-- Grade -->
        <div class="mt-4 grid grid-cols-2 gap-2">
          <UButton color="red" variant="soft" size="md" icon="i-heroicons-arrow-uturn-left" block @click="grade(false)">
            Didn't know
          </UButton>
          <UButton color="green" variant="soft" size="md" trailing-icon="i-heroicons-check" block @click="grade(true)">
            Knew it
          </UButton>
        </div>
        <p class="mt-2 text-center font-mono text-[10px] t-lo">Missed cards resurface at chapter end</p>
      </div>

      <div class="flex items-center justify-between border-t b-line px-3 py-2">
        <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-chevron-left" :disabled="cardIndex === 0" @click="move(-1)">Prev</UButton>
        <div class="flex items-center gap-1">
          <span
            v-for="(c, i) in section.cards"
            :key="c.id"
            class="h-2 w-2 rounded-full"
            :class="i === cardIndex ? 'bg-saffron-500' : sectionProgress.cards[c.id] === undefined ? 'bg-stone-300 dark:bg-stone-700' : sectionProgress.cards[c.id] ? 'bg-jade-500' : 'bg-red-500'"
          />
        </div>
        <UButton size="xs" color="gray" variant="ghost" trailing-icon="i-heroicons-chevron-right" :disabled="cardIndex >= section.cards.length - 1" @click="move(1)">Next</UButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStudySession } from '~/composables/useStudySession'

const { section, cardIndex, sectionProgress, gradeCard } = useStudySession()
const flipped = ref(false)
const card = computed(() => section.value.cards[Math.min(cardIndex.value, section.value.cards.length - 1)])
const knew = computed(() => Object.values(sectionProgress.value.cards).filter(Boolean).length)
const missed = computed(() => Object.values(sectionProgress.value.cards).filter(v => v === false).length)

watch(() => [section.value.id, cardIndex.value], () => { flipped.value = false })

function move(d: number) {
  cardIndex.value = Math.max(0, Math.min(section.value.cards.length - 1, cardIndex.value + d))
}
function grade(k: boolean) {
  gradeCard(card.value.id, k)
  if (cardIndex.value < section.value.cards.length - 1) move(1)
  else flipped.value = false
}
</script>

<style scoped>
.flip-card { perspective: 1200px; }
.flip-inner {
  position: relative;
  display: block;
  min-height: 180px;
  transform-style: preserve-3d;
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.flip-card.is-flipped .flip-inner { transform: rotateY(180deg); }
.flip-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  background: var(--bg-elevated);
  backface-visibility: hidden;
}
.flip-back {
  transform: rotateY(180deg);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}
@media (prefers-reduced-motion: reduce) {
  .flip-inner { transition: none; }
}
</style>
