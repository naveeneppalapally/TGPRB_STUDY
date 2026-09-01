<template>
  <section v-if="cards.length" class="panel mt-8 overflow-hidden" aria-labelledby="flashcard-deck-title">
    <header class="flex flex-wrap items-center justify-between gap-3 border-b b-line px-5 py-4 sm:px-6">
      <div>
        <p class="eyebrow mb-1 flex items-center gap-1.5">
          <UIcon name="i-heroicons-rectangle-stack" class="h-3.5 w-3.5" />
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
          :icon="collapsed ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'"
          color="gray"
          variant="ghost"
          size="sm"
          :aria-label="collapsed ? 'Show flashcards' : 'Collapse flashcards'"
          :title="collapsed ? 'Show flashcards' : 'Collapse flashcards'"
          @click="toggle()"
        />
      </div>
    </header>

    <Transition
      name="collapse"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div v-if="!collapsed" class="p-5 sm:p-6">
        <button
          type="button"
          class="flip-card min-h-[190px] sm:min-h-[210px]"
          :aria-label="flipped ? 'Show question' : 'Show answer'"
          @click="flipped = !flipped"
        >
          <div class="flip-card-inner" :class="{ 'is-flipped': flipped }">
            <div class="flip-card-face flip-card-front panel p-4 sm:p-8">
              <p class="eyebrow mb-4">Question</p>
              <p class="flex-1 text-[15px] font-medium leading-[1.75] t-hi">
                {{ currentCard.front }}
              </p>
              <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
                Click to reveal the answer
              </p>
            </div>
            <div class="flip-card-face flip-card-back panel b-strong p-4 sm:p-8">
              <p class="eyebrow mb-4 accent">Answer</p>
              <p class="flex-1 text-[15px] leading-[1.75] t-hi">
                {{ currentCard.back }}
              </p>
              <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] t-lo">
                Click to return to the question
              </p>
            </div>
          </div>
        </button>

        <div class="mt-4 flex items-center justify-between gap-3">
          <UButton
            icon="i-heroicons-chevron-left"
            color="gray"
            variant="ghost"
            size="sm"
            aria-label="Previous flashcard"
            :disabled="currentIndex === 0"
            @click="goTo(currentIndex - 1)"
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
            @click="goTo(currentIndex + 1)"
          />
        </div>
      </div>
    </Transition>
  </section>

  <div v-else-if="!pending" class="panel mt-8 p-5 text-sm t-mid">
    No atomic flashcards have been attached to this note yet.
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCollapse } from '@/composables/useCollapse'

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
const currentCard = computed(() => cards.value[currentIndex.value] ?? { front: '', back: '' })

const { collapsed, toggle, onBeforeEnter, onEnter, onBeforeLeave, onLeave } = useCollapse()

function goTo(index: number) {
  if (index < 0 || index >= cards.value.length) return
  currentIndex.value = index
  flipped.value = false
}

watch(() => props.noteId, () => {
  currentIndex.value = 0
  flipped.value = false
})
</script>
