<template>
  <div class="max-w-4xl mx-auto">
    <!-- Current Affairs Banner (linked, newest first) -->
    <div v-if="currentAffairs.length > 0" class="mb-6">
      <div
        v-for="ca in currentAffairs"
        :key="ca.id"
        class="card mb-3"
        style="border-color: rgba(96, 165, 250, 0.3); background: rgba(96, 165, 250, 0.05)"
      >
        <div class="flex items-start gap-3">
          <span class="text-lg mt-0.5">📰</span>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge" style="background: rgba(96, 165, 250, 0.15); color: #93bbfd">
                Current Affair
              </span>
              <span class="text-xs" style="color: var(--text-muted)">{{ ca.date }}</span>
            </div>
            <h4 class="font-semibold text-sm mb-1">{{ ca.headline }}</h4>
            <NuxtLink
              :to="`/current-affairs/${ca._path?.split('/').pop()}`"
              class="text-xs"
              style="color: var(--accent)"
            >
              Read more →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Note Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <span :class="tierBadgeClass">Tier {{ note.tier }}</span>
        <span class="badge" style="background: rgba(103, 111, 143, 0.15); color: #8d93ab">
          {{ note.exam_section }}
        </span>
        <span class="text-xs" style="color: var(--text-muted)">
          {{ note.verified_pyq_count }} verified PYQs
        </span>
      </div>
      <h1 class="text-2xl font-bold mb-1">{{ note.topic }}</h1>
      <p class="text-sm" style="color: var(--text-muted)">{{ note.subtopic }}</p>
    </div>

    <!-- Note Content (Markdown rendered) -->
    <div class="note-content mb-8">
      <ContentRenderer :value="note" />
    </div>

    <!-- Comprehension Gate -->
    <div v-if="!gateCompleted" class="mt-8">
      <GateQuiz
        :quiz="gateQuiz"
        @completed="handleGateCompleted"
      />
    </div>

    <!-- Flashcard unlock message -->
    <div
      v-else
      class="card mt-8"
      style="border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.05)"
    >
      <div class="flex items-center gap-3">
        <span class="text-xl">✅</span>
        <div>
          <h3 class="font-semibold text-sm" style="color: #34d399">
            Gate Passed - {{ flashcardCount }} Flashcards Unlocked
          </h3>
          <p class="text-xs mt-1" style="color: var(--text-muted)">
            These cards are now in your FSRS review queue.
            <NuxtLink to="/review" style="color: var(--accent)">Start reviewing →</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NoteData {
  id: string
  tier: number
  exam_section: string
  topic: string
  subtopic: string
  verified_pyq_count: number
  gate_quiz: string
  related_topic_ids: string[]
  body: any
}

const props = defineProps<{
  note: NoteData
}>()

// Fetch current affairs linked to this note
const { data: currentAffairs } = await useAsyncData(
  `current-affairs-${props.note.id}`,
  () => queryCollection('content')
    .where('type', '=', 'current_affair')
    .order('date', 'DESC')
    .all()
    .then(items => items.filter(item =>
      item.related_topic_ids?.includes(props.note.id)
    )),
  { default: () => [] }
)

// Load gate quiz data
const gateQuiz = ref<any>(null)
const gateCompleted = ref(false)
const flashcardCount = ref(0)

onMounted(async () => {
  try {
    const response = await $fetch(props.note.gate_quiz)
    gateQuiz.value = response
  } catch {
    // Gate quiz not found - might be Tier 2/3 or not yet created
  }

  // Check if gate is already completed (from Supabase)
  // TODO: Wire up Supabase auth check
})

// Load flashcard count
const flashcards = await $fetch('/data/flashcards/geography/drainage-system.json').catch(() => [])
flashcardCount.value = Array.isArray(flashcards) ? flashcards.length : 0

const tierBadgeClass = computed(() => {
  switch (props.note.tier) {
    case 1: return 'badge-tier1'
    case 2: return 'badge-tier2'
    default: return 'badge-tier3'
  }
})

function handleGateCompleted(result: { score: number; total: number; passed: boolean }) {
  gateCompleted.value = result.passed
  // TODO: POST to /api/gate/submit
}
</script>
