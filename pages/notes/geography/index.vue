<template>
  <div>
    <!-- ── Header ─────────────────────────────────────────────────────── -->
    <header class="mb-8">
      <nav class="mb-5 flex items-center gap-1.5 text-[12px] t-lo" aria-label="Breadcrumb">
        <NuxtLink to="/" class="transition-colors hover:t-hi">Dashboard</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
        <span class="t-mid">Geography</span>
      </nav>

      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow mb-2">Subject · GS paper</p>
          <h1 class="font-display text-[28px] font-bold tracking-tight t-hi sm:text-[32px]">
            Geography
          </h1>
          <p class="mt-1.5 text-[13px] t-lo">
            {{ subjectSummary.pyqCount }} verified PYQs across Constable and SI papers, 2015–2023.
          </p>
        </div>
        <span class="chip chip-saffron chip-mono">Tier 1 subject</span>
      </div>
    </header>

    <SubjectTopicCards subject="geography" mode="note" />

    <!-- ── Queued topics ──────────────────────────────────────────────── -->
    <section>
      <div class="mb-3 flex items-baseline justify-between">
        <p class="eyebrow">In the topic bank</p>
        <p class="eyebrow">Builds in PYQ order</p>
      </div>
      <div class="panel divide-y divide-[var(--line)]">
        <div
          v-for="t in pending"
          :key="t.id"
          class="flex items-center gap-4 px-5 py-3.5 opacity-70"
        >
          <UIcon name="i-heroicons-queue-list" class="h-4 w-4 shrink-0 t-lo" />
          <p class="flex-1 text-[13px] font-medium t-mid">{{ t.name }}</p>
          <span class="chip chip-mono">T{{ t.tier }}</span>
          <span class="num font-mono text-[11px] t-lo">{{ t.count }} PYQs</span>
        </div>
      </div>
      <p class="mt-3 text-[11.5px] t-lo">
        Verified question groups awaiting authored notes. Counts come from the canonical dataset.
      </p>
    </section>

    <SubjectTopicCards subject="geography" />
</div>
</template>

<script setup lang="ts">
import subjectStats from '~/data/subject_stats.json'
import topicStats from '~/data/topic_stats.json'
import topics from '~/data/topics_master.json'
useHead({ title: 'Geography - BeatBook' })

const subjectSummary = subjectStats.find(row => row.slug === 'geography')!
const deliveredIds = new Set(topicStats.delivered.filter(row => topics.some(topic => topic.id === row.id && topic.subjectSlug === 'geography')).flatMap(row => row.canonicalTopicIds))
const pending = topicStats.canonical.filter(row => row.subjectId === 'GEO' && !deliveredIds.has(row.id)).sort((a, b) => b.count - a.count)
</script>
