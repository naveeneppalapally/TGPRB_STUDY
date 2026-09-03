<template>
  <div>
    <!-- ── Header ─────────────────────────────────────────────────────── -->
    <header class="mb-8">
      <nav class="mb-5 flex items-center gap-1.5 text-[12px] t-lo" aria-label="Breadcrumb">
        <NuxtLink to="/" class="transition-colors hover:t-hi">Dashboard</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
        <span class="t-mid">Indian Polity</span>
      </nav>

      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow mb-2">Subject : GS paper</p>
          <h1 class="font-display text-[28px] font-bold tracking-tight t-hi sm:text-[32px]">
            Indian Polity &amp; Constitution
          </h1>
          <p class="mt-1.5 text-[13px] t-lo">
            203 verified PYQs across Constable and SI papers, 2015-2023.
          </p>
        </div>
        <span class="chip chip-saffron chip-mono">Tier 1 subject</span>
      </div>
    </header>

    <!-- ── Live topics ────────────────────────────────────────────────── -->
    <section class="mb-8">
      <p class="eyebrow mb-3">Live notes</p>
      <div class="panel divide-y divide-[var(--line)]">
        <NuxtLink
          to="/notes/polity/constitutional-framework-and-preamble"
          class="panel-hover group flex items-center gap-4 px-5 py-4"
        >
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft">
            <UIcon name="i-heroicons-scale" class="h-4 w-4 accent" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold t-hi">Constitutional Framework &amp; Preamble</p>
            <p class="mt-0.5 text-[11.5px] t-lo">Historical Acts (1773-1947), Constituent Assembly, Borrowed Features, Preamble &amp; 12 Schedules</p>
          </div>
          <span class="chip chip-saffron chip-mono hidden sm:inline-flex">T1</span>
          <span class="num font-mono text-[11px] t-lo">31 PYQs</span>
          <UIcon
            name="i-heroicons-arrow-right"
            class="h-4 w-4 shrink-0 t-lo transition-transform duration-150 group-hover:translate-x-1 group-hover:accent"
          />
        </NuxtLink>
        <NuxtLink
          to="/notes/polity/making-of-the-constitution"
          class="panel-hover group flex items-center gap-4 px-5 py-4"
        >
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft">
            <UIcon name="i-heroicons-document-text" class="h-4 w-4 accent" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold t-hi">Making of the Indian Constitution</p>
            <p class="mt-0.5 text-[11.5px] t-lo">Demand Timeline (1934-1946), Assembly Composition, 8 Major Committees, Drafting &amp; Enactment Constants</p>
          </div>
          <span class="chip chip-saffron chip-mono hidden sm:inline-flex">T1</span>
          <span class="num font-mono text-[11px] t-lo">Verified PYQs</span>
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
useHead({ title: 'Indian Polity - TGPRB StudyOS' })

const pending = [
  { name: 'Judiciary & Constitutional/Statutory Bodies (Supreme Court, CAG, ECI, UPSC)', tier: 'T1', pyqs: '58' },
  { name: 'Union Executive & Parliament (President, PM, Council of Ministers, Lok Sabha, Rajya Sabha)', tier: 'T1', pyqs: '57' },
  { name: 'Fundamental Rights, DPSP & Fundamental Duties (Articles 12-51A)', tier: 'T1', pyqs: '35' },
  { name: 'State Government & Local Governance (Governor, CM, 73rd & 74th CAA)', tier: 'T1', pyqs: '21' },
]
</script>
