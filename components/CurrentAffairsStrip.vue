<template>
  <section
    v-if="items.length"
    class="rounded-lg border-l-2 border-l-saffron-500 bg-sub pl-4 pr-4 py-4"
  >
    <p class="eyebrow mb-3 flex items-center gap-1.5">
      <UIcon name="i-heroicons-newspaper" class="h-3.5 w-3.5" />
      Current Affairs
    </p>

    <ul class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar">
      <li
        v-for="item in items"
        :key="item.id"
        class="shrink-0 w-72 sm:w-80 snap-start flex flex-col gap-2 rounded-md border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 p-3"
      >
        <!-- Date -->
        <time
          :datetime="item.meta.date"
          class="font-mono text-[10px] uppercase tracking-[0.1em] t-lo"
        >
          {{ formatDate(item.meta.date) }}
        </time>

        <!-- Headline + source -->
        <div class="flex-1 flex flex-col justify-between gap-3">
          <p class="text-body-sm font-semibold leading-snug t-hi">
            {{ item.meta.headline }}
          </p>
          <a
            v-if="item.meta.source_url"
            :href="item.meta.source_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-fit items-center gap-1 rounded bg-black/5 dark:bg-white/5 px-1.5 py-0.5 text-body-xs t-lo transition-colors hover:accent"
          >
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="h-3 w-3 shrink-0" />
            {{ sourceDomain(item.meta.source_url) }}
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { queryCollection } from '#imports'

const props = defineProps<{
  noteId: string
}>()

const { data: allEntries } = await useAsyncData(
  `ca-strip-${props.noteId}`,
  () => queryCollection('current_affair').all(),
)

const items = computed(() => {
  if (!allEntries.value) return []
  return allEntries.value
    .filter((e: any) => {
      const ids: string[] = e.meta?.related_topic_ids ?? []
      return ids.includes(props.noteId)
    })
    .sort((a: any, b: any) => {
      return new Date(b.meta?.date).getTime() - new Date(a.meta?.date).getTime()
    })
})

/** Format '2026-07-15' → '15 Jul 2026' */
function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** Extract hostname from a URL for a cleaner label */
function sourceDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  }
  catch {
    return url
  }
}
</script>
