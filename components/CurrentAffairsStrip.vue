<template>
  <section
    v-if="items.length"
    class="rounded-lg border-l-2 border-l-saffron-500 bg-sub pl-4 pr-4 py-4"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <p class="eyebrow flex items-center gap-1.5 m-0">
        <UIcon name="i-heroicons-newspaper" class="h-3.5 w-3.5" />
        Current Affairs
      </p>

      <span
        v-if="newEntries.length > 0"
        class="inline-flex items-center gap-1 rounded bg-saffron-500/10 px-2 py-0.5 text-xs font-semibold text-saffron-600 dark:text-saffron-400"
      >
        <UIcon name="i-heroicons-sparkles" class="h-3.5 w-3.5" />
        {{ newEntries.length }} new since last visit
      </span>
    </div>

    <!-- NEW SINCE LAST VISIT section -->
    <template v-if="newEntries.length > 0">
      <p class="text-[11px] font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400 mb-2">
        New since your last visit
      </p>
      <ul class="flex flex-col gap-3 mb-5">
        <li
          v-for="item in newEntries"
          :key="item.id"
          class="flex flex-col gap-3 rounded-md border border-saffron-200 dark:border-saffron-900/40 bg-saffron-50/60 dark:bg-saffron-950/20 p-4 relative"
        >
          <!-- NEW badge -->
          <span class="absolute top-3 right-3 inline-flex items-center gap-0.5 rounded-full bg-saffron-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">
            NEW
          </span>
          <CACard :item="item" />
        </li>
      </ul>

      <!-- Mark caught up -->
      <div class="flex justify-end mb-5">
        <UButton
          color="saffron"
          variant="soft"
          size="sm"
          icon="i-heroicons-check-circle"
          @click="handleMarkCaughtUp"
        >
          Mark caught up
        </UButton>
      </div>
    </template>

    <!-- EARLIER section -->
    <template v-if="earlierEntries.length > 0">
      <p
        v-if="newEntries.length > 0"
        class="text-[11px] font-bold uppercase tracking-widest t-lo mb-2"
      >
        Earlier
      </p>
      <ul class="flex flex-col gap-3">
        <li
          v-for="item in visibleEarlier"
          :key="item.id"
          class="flex flex-col gap-3 rounded-md border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 p-4"
        >
          <CACard :item="item" />
        </li>
      </ul>

      <div class="mt-3 flex justify-start">
        <UButton
          v-if="earlierEntries.length > EARLIER_PREVIEW && !showAllEarlier"
          variant="ghost"
          color="gray"
          size="sm"
          @click="showAllEarlier = true"
        >
          Show {{ earlierEntries.length - EARLIER_PREVIEW }} more
        </UButton>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { queryCollection } from '#imports'
import { useTopicVisits } from '@/composables/useTopicVisits'

const props = defineProps<{
  noteId: string
}>()

const { getSplitEntries, markCaughtUp } = useTopicVisits()

const { data: allEntries } = await useAsyncData(
  `ca-strip-${props.noteId}`,
  () => queryCollection('current_affair').all(),
)

// All entries for this note, sorted newest first
const items = computed(() => {
  if (!allEntries.value) return []
  return allEntries.value
    .filter((e: any) => {
      const ids: string[] = e.meta?.related_topic_ids ?? []
      return ids.includes(props.noteId)
    })
    .sort((a: any, b: any) => {
      const dateA = a.meta?.published_at || a.meta?.event_date || a.meta?.date
      const dateB = b.meta?.published_at || b.meta?.event_date || b.meta?.date
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
})

// New / Earlier split (populated on mount so localStorage is available)
const newEntries = ref<any[]>([])
const earlierEntries = ref<any[]>([])
const EARLIER_PREVIEW = 5
const showAllEarlier = ref(false)

const visibleEarlier = computed(() => {
  if (showAllEarlier.value) return earlierEntries.value
  return earlierEntries.value.slice(0, EARLIER_PREVIEW)
})

onMounted(async () => {
  const split = await getSplitEntries(props.noteId, items.value)
  newEntries.value = split.newEntries
  earlierEntries.value = split.earlierEntries
})

async function handleMarkCaughtUp() {
  await markCaughtUp(props.noteId)
  // Move all new entries to earlier
  earlierEntries.value = [...newEntries.value, ...earlierEntries.value]
  newEntries.value = []
}
</script>
