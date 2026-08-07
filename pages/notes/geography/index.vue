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
            38 verified PYQs across Constable and SI papers, 2015–2023.
          </p>
        </div>
        <span class="chip chip-saffron chip-mono">Tier 1 subject</span>
      </div>
    </header>

    <!-- ── Live topics ────────────────────────────────────────────────── -->
    <section class="mb-8">
      <p class="eyebrow mb-3">Live notes</p>
      <div class="panel">
        <NuxtLink
          to="/notes/geography/drainage-system-of-india"
          class="panel-hover group flex items-center gap-4 px-5 py-4"
        >
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft">
            <UIcon name="i-heroicons-map" class="h-4 w-4 accent" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold t-hi">Drainage System of India</p>
            <p class="mt-0.5 text-[11.5px] t-lo">Rivers, tributaries, dams, doabs, waterfalls</p>
          </div>
          <span class="chip chip-saffron chip-mono hidden sm:inline-flex">T1</span>
          <span class="num font-mono text-[11px] t-lo">28 PYQs</span>
          <UIcon
            name="i-heroicons-arrow-right"
            class="h-4 w-4 shrink-0 t-lo transition-transform duration-150 group-hover:translate-x-1 group-hover:accent"
          />
        </NuxtLink>
      </div>
    </section>

    <!-- ── Queued topics ──────────────────────────────────────────────── -->
    <section>
      <div class="mb-3 flex items-baseline justify-between">
        <p class="eyebrow">In the topic bank</p>
        <p class="eyebrow">Builds in PYQ order</p>
      </div>
      <div class="panel divide-y divide-[var(--line)]">
        <div
          v-for="t in pending"
          :key="t.name"
          class="flex items-center gap-4 px-5 py-3.5 opacity-70"
        >
          <UIcon name="i-heroicons-queue-list" class="h-4 w-4 shrink-0 t-lo" />
          <p class="flex-1 text-[13px] font-medium t-mid">{{ t.name }}</p>
          <span class="chip chip-mono">{{ t.tier }}</span>
          <span class="num font-mono text-[11px] t-lo">{{ t.pyqs }} PYQs</span>
        </div>
      </div>
      <p class="mt-3 text-[11.5px] t-lo">
        Topics unlock as their PYQs are verified against the source papers.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Geography - TGPRB StudyOS' })

const pending = [
  { name: 'Telangana Geography',        tier: 'T2', pyqs: '4' },
  { name: 'Physical Features of India', tier: 'T2', pyqs: '4' },
  { name: 'Climate of India',           tier: 'T2', pyqs: '3' },
  { name: 'Indian Ports and Transport', tier: 'T2', pyqs: '3' },
  { name: 'Soils of India',             tier: 'T3', pyqs: '2' },
  { name: 'Natural Vegetation',         tier: 'T3', pyqs: '1' },
]
</script>
