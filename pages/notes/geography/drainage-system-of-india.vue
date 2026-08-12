<template>
  <div>
    <!-- Reading progress -->
    <div
      class="fixed left-0 top-0 z-50 h-[2px] bg-gradient-to-r from-saffron-500 to-saffron-400 transition-[width] duration-100"
      :style="{ width: readProgress + '%' }"
      aria-hidden="true"
    />

    <div class="flex gap-10">
      <!-- ══ Article ═════════════════════════════════════════════════════ -->
      <article class="min-w-0 flex-1">
        <!-- Breadcrumb -->
        <nav class="mb-6 flex items-center gap-1.5 text-body-xs t-lo" aria-label="Breadcrumb">
          <NuxtLink to="/" class="transition-colors hover:t-hi">Dashboard</NuxtLink>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <NuxtLink to="/notes/geography" class="transition-colors hover:t-hi">Geography</NuxtLink>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <span class="t-mid">Drainage System</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 - High priority</span>
            <span class="chip">28 verified PYQs</span>
            <span class="chip">Geography</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Drainage System of India
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            TGPRB Constable / SI · 2–3 direct questions per paper. Learn the rivers on the map,
            then attach the facts - that is exactly how the exam asks them.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />6 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />10 practice PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~16 min read
            </span>
          </div>
        </header>

        <!-- Current Affairs for this note -->
        <CurrentAffairsStrip note-id="NOTE-GEO-DRAINAGE" class="mb-8" />

        <!-- ══ Coverage strip - the 6 ways TGPRB tests this topic ══ -->
        <section class="mb-10">
          <p class="eyebrow mb-3">How TGPRB tests this topic</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(c, i) in coverage"
              :key="c.label"
              class="chip"
              :class="i === 0 ? 'chip-saffron' : ''"
            >
              <span class="num font-mono">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ c.label }}
            </span>
          </div>
          <p class="mt-2.5 text-body-xs t-lo">
            Cover all six and you have everything TGPRB has ever asked about drainage here.
            Anything outside these six is context, not exam material.
          </p>
        </section>

        <!-- ── 01 · The physical map ───────────────────────────────────── -->
        <section id="map" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">The Map</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">dual-code · spatial</span>
          </header>

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            This is your anchor. Rivers are spatial - that is how the exam tests them
            (tributary order, dam placement, which river ends where). Learn the shape first,
            then click a river to attach its <span class="t-hi">PYQ-marked facts</span>.
          </p>

          <!-- High-Quality Labeled Physical River Map of India -->
          <div class="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-4 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786136897/geography/india_rivers_labeled2.webp"
              alt="Physical Map of India with labeled rivers - Indus, Ganges, Brahmaputra, Narmada, Godavari, Krishna, Kaveri"
              class="mx-auto block w-full max-w-4xl h-auto object-contain rounded-lg"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-body-xs text-gray-500 font-mono">
              <span>Physical relief map with labeled river systems (Wikimedia Commons / CC BY-SA 3.0)</span>
              <a href="https://res.cloudinary.com/gbxjgmck/image/upload/v1786136897/geography/india_rivers_labeled2.webp" target="_blank" class="text-amber-600 hover:underline flex items-center gap-1 font-sans font-medium">
                Open Full Res (1431×1491) ↗
              </a>
            </div>
          </div>

          <!-- Secondary Overview Flow Diagram -->
          <div class="mb-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-3 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786136896/geography/india_rivers_wiki.webp"
              alt="Plan of River Systems of India - System Overview Diagram"
              class="mx-auto block w-full max-w-3xl h-auto object-contain rounded-lg"
            />
            <p class="mt-2 text-center text-body-xs text-gray-500 font-mono">
              System Layout: Tributaries & Major River Basins (Wikimedia Commons / Public Domain)
            </p>
          </div>

          <!-- Instant text summary of the same structure (dark artifact) -->
          <div class="artifact overflow-hidden">
            <div class="flex items-center justify-between border-b border-[var(--ink-card-line)] px-5 py-3">
              <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a89f8d]">
                Hierarchy at a glance
              </p>
              <UIcon name="i-heroicons-command-line" class="h-3.5 w-3.5 text-[#a89f8d]" />
            </div>
            <pre class="overflow-x-auto px-5 py-4 font-mono text-body-xs leading-[1.75] text-[#e9e2d2]">{{ textHierarchy }}</pre>
          </div>
        </section>

        <!-- ── 02 · Introduction ────────────────────────────────────────── -->
        <section id="introduction" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Introduction</h2>
            <span class="sec-rule" />
          </header>

          <p class="mb-5 max-w-2xl text-body leading-[1.8] t-mid">
            A <strong class="font-semibold t-hi">drainage system</strong> is the network of rivers,
            streams, and lakes draining a particular area. India's drainage pattern is shaped by its
            geological structure, rock type, slope, and climate - making it one of the most diverse
            on Earth.
          </p>

          <div class="callout callout-saffron mb-6">
            <p class="callout-title">
              <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
              Why this topic matters for TGPRB
            </p>
            <p class="callout-body">
              28 verified PYQs across Constable + SI papers (2015–2023). Expect 2–3 per paper.
              Top question types follow the coverage strip above: tributaries, dam–river–state,
              waterfalls, doabs and drainage termination.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div v-for="stat in topStats" :key="stat.label" class="panel px-4 py-5 text-center">
              <p class="num font-display text-[26px] font-bold tracking-tight accent">{{ stat.count }}</p>
              <p class="mt-1.5 text-[11px] leading-snug t-lo">{{ stat.label }}</p>
            </div>
          </div>
        </section>

        <!-- ── 03 · Deep Dive ───────────────────────────────────────────── -->
        <section id="deep-dive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Deep Dive</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">A–E</span>
          </header>
          <p class="mb-6 max-w-2xl text-body-sm leading-relaxed t-lo">
            Read each system, then hit <span class="locate-inline">map</span> to jump to it on the
            physical map - see the fact where it happens.
          </p>

          <!-- A. Himalayan Rivers -->
          <div class="mb-10">
            <h3 class="mb-4 flex flex-wrap items-baseline gap-2 text-h3 font-semibold t-hi">
              A. Himalayan Rivers
              <span class="text-body-xs font-normal t-lo">perennial · glacier-fed</span>
            </h3>

            <!-- 1. Indus -->
            <div class="panel panel-pad mb-4">
              <div class="mb-4 flex items-baseline justify-between gap-3">
                <h4 class="font-display text-h4 font-semibold tracking-tight t-hi">1 · Indus System</h4>
                <button type="button" class="locate-btn" @click="goMap('indus')">
                  <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
                </button>
              </div>
              <dl class="mb-5 grid gap-2 text-body-sm">
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Origin</dt>
                  <dd class="t-mid">Near Lake Mansarovar, Tibet → Ladakh → Pakistan</dd>
                </div>
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Length</dt>
                  <dd class="t-mid"><span class="cell-num">2,880 km</span> total · <span class="cell-num">709 km</span> in India</dd>
                </div>
              </dl>
              <p class="mb-2 text-[11px] t-lo">
                5 tributaries, east → west - mnemonic <span class="hot font-mono">S R B C J</span> (see them on the map)
              </p>
              <div class="overflow-x-auto">
                <table class="table-note">
                  <thead>
                    <tr><th>River</th><th>Ancient name</th><th>Doab</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="t in indusTributaries" :key="t.name">
                      <td class="cell-key">{{ t.name }}</td>
                      <td>
                        <span class="font-mono text-body-xs" :class="t.hot ? 'hot' : 't-mid'">{{ t.ancient }}</span>
                        <span v-if="t.hot" class="hot-tag">PYQ</span>
                      </td>
                      <td>{{ t.doab }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="callout callout-saffron mt-4">
                <p class="callout-title">
                  <UIcon name="i-heroicons-bolt" class="h-3.5 w-3.5" />
                  PYQ alert
                </p>
                <p class="callout-body">
                  "Which river is known as Iravati?" → <strong class="t-hi">Ravi</strong> [Constable 2015]
                </p>
              </div>
            </div>

            <!-- Indus River Basin Map -->
            <div class="mt-4 mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786556254/geography/indus-river-basin-map.webp"
                alt="Indus River Basin Map showing Jhelum, Chenab, Ravi, Beas, Satluj tributaries and Pakistan India region"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] text-gray-400 font-mono">Indus River Basin - Wikimedia Commons / CC BY-SA</p>
            </div>

            <!-- 2. Ganga -->
            <div class="panel panel-pad mb-4">
              <div class="mb-4 flex items-baseline justify-between gap-3">
                <h4 class="font-display text-h4 font-semibold tracking-tight t-hi">2 · Ganga System</h4>
                <button type="button" class="locate-btn" @click="goMap('ganga')">
                  <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
                </button>
              </div>
              <dl class="mb-4 grid gap-2 text-body-sm">
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Origin</dt>
                  <dd class="t-mid">Gangotri Glacier (Bhagirathi) → meets Alaknanda at <strong class="t-hi">Devprayag</strong></dd>
                </div>
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Length</dt>
                  <dd class="t-mid"><span class="cell-num">2,525 km</span> · largest basin in India</dd>
                </div>
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Delta</dt>
                  <dd class="t-mid"><strong class="t-hi">Sundarban Delta</strong> - largest river delta in the world</dd>
                </div>
              </dl>
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-lg bg-sub p-3.5">
                  <p class="eyebrow mb-1.5">Left bank</p>
                  <p class="text-body-sm leading-relaxed t-mid">
                    Ramganga · Gomti · Ghaghara · Gandak · <span class="hot">Kosi</span> · Mahananda
                  </p>
                </div>
                <div class="rounded-lg bg-sub p-3.5">
                  <p class="eyebrow mb-1.5">Right bank</p>
                  <p class="text-body-sm leading-relaxed t-mid">Yamuna · Son · Damodar</p>
                </div>
              </div>
            </div>

            <!-- Ganga-Yamuna River Basin Map -->
            <div class="mt-4 mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786556256/geography/ganga-river-basin-map.webp"
                alt="Ganga Yamuna River Basin Map showing left and right bank tributaries - Kosi, Ghaghara, Yamuna, Son, Damodar"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] text-gray-400 font-mono">Ganga-Yamuna River Basin - Wikimedia Commons / CC BY-SA</p>
            </div>

            <!-- 3. Brahmaputra -->
            <div class="panel panel-pad">
              <div class="mb-4 flex items-baseline justify-between gap-3">
                <h4 class="font-display text-h4 font-semibold tracking-tight t-hi">3 · Brahmaputra System</h4>
                <button type="button" class="locate-btn" @click="goMap('brahmaputra')">
                  <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
                </button>
              </div>
              <dl class="mb-4 grid gap-2 text-body-sm">
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Origin</dt>
                  <dd class="t-mid">Near Lake Mansarovar, Tibet</dd>
                </div>
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Names</dt>
                  <dd class="t-mid">
                    <span class="hot">Tsangpo</span> (Tibet) → <span class="hot">Dihang</span> (Arunachal) → <span class="hot">Brahmaputra</span> (Assam)
                  </dd>
                </div>
                <div class="flex gap-3">
                  <dt class="w-16 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] t-lo">Key fact</dt>
                  <dd class="t-mid"><strong class="t-hi">Antecedent river</strong> - older than the Himalayas, cuts through them</dd>
                </div>
              </dl>
              <div class="callout callout-saffron">
                <p class="callout-title">
                  <UIcon name="i-heroicons-bolt" class="h-3.5 w-3.5" />
                  PYQ alert
                </p>
                <p class="callout-body">
                  "Brahmaputra is antecedent / called Tsangpo in Tibet" - direct assertion PYQ.
                </p>
              </div>
            </div>

            <!-- Brahmaputra River Basin Map -->
            <div class="mt-4 mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786556257/geography/brahmaputra-river-basin-map.webp"
                alt="Brahmaputra River Basin Map showing Yarlung Tsangpo in Tibet, Dihang in Arunachal, tributaries Subhansiri Lohit Manas Teesta"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] text-gray-400 font-mono">Brahmaputra River Basin - Wikimedia Commons / CC BY-SA</p>
            </div>
          </div>

          <!-- B. Peninsular - East-flowing -->
          <div class="mb-10">
            <div class="mb-4 flex items-center justify-between gap-3">
              <h3 class="flex flex-wrap items-baseline gap-2 text-h3 font-semibold t-hi">
                B. Peninsular East-Flowing Rivers
                <span class="text-body-xs font-normal t-lo">deltas → Bay of Bengal</span>
              </h3>
              <button type="button" class="locate-btn" @click="goMap('krishna')">
                <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
              </button>
            </div>

            <div class="callout callout-jade mb-4">
              <p class="callout-title">
                <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
                Mnemonic - by length
              </p>
              <p class="callout-body">
                <span class="font-mono font-semibold">God KriMa Cau</span> -
                Godavari (1,465) → Krishna (1,400) → Mahanadi (858) → Cauvery (800)
              </p>
            </div>

            <div class="panel panel-pad">
              <div class="overflow-x-auto">
                <table class="table-note">
                  <thead>
                    <tr><th>River</th><th>Origin</th><th>Length</th><th>Key tributaries</th><th>States</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in eastRivers" :key="r.name">
                      <td class="cell-key">{{ r.name }}</td>
                      <td>{{ r.origin }}</td>
                      <td class="cell-num">{{ r.length }}</td>
                      <td>
                        <template v-for="(t, ti) in r.tribs" :key="t.n">
                          <span :class="t.hot ? 'hot' : ''">{{ t.n }}</span><span v-if="t.hot" class="hot-tag">PYQ</span><span v-if="ti < r.tribs.length - 1">, </span>
                        </template>
                      </td>
                      <td>
                        <span :class="r.statesHot ? 'hot font-mono text-body-xs' : ''">{{ r.states }}</span>
                        <span v-if="r.statesHot" class="hot-tag">PYQ</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="callout callout-saffron mt-4">
                <p class="callout-title">
                  <UIcon name="i-heroicons-bolt" class="h-3.5 w-3.5" />
                  PYQ traps on Godavari
                </p>
                <p class="callout-body">
                  Easternmost tributary → <strong class="t-hi">Sabari</strong> (NOT Indravati) -
                  spot it on the map. States in catchment → <strong class="t-hi">7</strong>
                  (MH, TS, AP, CG, MP, KA, OR).
                </p>
              </div>
            </div>
          </div>

          <!-- Godavari River Basin Map -->
          <div class="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-3 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786556255/geography/godavari-river-basin-map.webp"
              alt="Godavari River Basin Map showing Wardha Pranhita Indravati Sabari tributaries across Maharashtra Telangana Andhra Pradesh"
              class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
            />
            <p class="mt-2 text-[11px] text-gray-400 font-mono">Godavari River Basin - Wikimedia Commons / CC BY-SA</p>
          </div>

          <!-- Krishna River Basin Map -->
          <div class="mb-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-3 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786556253/geography/krishna-river-basin-map.webp"
              alt="Krishna River Basin Map showing Bhima Musi Tungabhadra Malprabha tributaries across Maharashtra Karnataka Andhra Pradesh Telangana"
              class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
            />
            <p class="mt-2 text-[11px] text-gray-400 font-mono">Krishna River Basin - Wikimedia Commons / CC BY-SA</p>
          </div>

          <!-- C. Peninsular - West-flowing -->
          <div class="mb-10">
            <div class="mb-4 flex items-center justify-between gap-3">
              <h3 class="flex flex-wrap items-baseline gap-2 text-h3 font-semibold t-hi">
                C. West-Flowing Rivers
                <span class="text-body-xs font-normal t-lo">Arabian Sea · rift valleys</span>
              </h3>
              <button type="button" class="locate-btn" @click="goMap('narmada')">
                <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
              </button>
            </div>

            <div class="callout callout-jade mb-4">
              <p class="callout-title">
                <UIcon name="i-heroicons-key" class="h-3.5 w-3.5" />
                Key rule
              </p>
              <p class="callout-body">
                Narmada &amp; Tapi flow through rift valleys - no deltas, they form estuaries instead.
                The map shows them squeezed between the Vindhya (N) and Satpura (S) ranges.
              </p>
            </div>

            <div class="panel panel-pad">
              <div class="overflow-x-auto">
                <table class="table-note">
                  <thead>
                    <tr><th>River</th><th>Origin</th><th>Length</th><th>Key feature</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in westRivers" :key="r.name">
                      <td class="cell-key">{{ r.name }}</td>
                      <td>{{ r.origin }}</td>
                      <td class="cell-num">{{ r.length }}</td>
                      <td>
                        <span :class="r.hot ? 't-hi' : ''">{{ r.feature }}</span>
                        <span v-if="r.hot" class="hot-tag">PYQ</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- D. Dams & Projects -->
          <div class="mb-10">
            <div class="mb-4 flex items-center justify-between gap-3">
              <h3 class="flex flex-wrap items-baseline gap-2 text-h3 font-semibold t-hi">
                D. Dams &amp; River Projects
                <span class="text-body-xs font-normal t-lo">dam–river–state matching</span>
              </h3>
              <button type="button" class="locate-btn" @click="goMap('tapi')">
                <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
              </button>
            </div>

            <div class="panel panel-pad">
              <div class="overflow-x-auto">
                <table class="table-note">
                  <thead>
                    <tr><th>Dam / Project</th><th>River</th><th>State</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="d in dams" :key="d.name">
                      <td class="cell-key">
                        {{ d.name }}
                        <span v-if="d.hot" class="hot-tag">PYQ</span>
                        <span v-if="d.ts" class="chip chip-jade chip-mono ms-1.5">TS</span>
                      </td>
                      <td class="t-hi">{{ d.river }}</td>
                      <td>{{ d.state }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="callout callout-red mt-4">
                <p class="callout-title">
                  <UIcon name="i-heroicons-exclamation-triangle" class="h-3.5 w-3.5" />
                  PYQ trap - Salal Project
                </p>
                <p class="callout-body">
                  Salal → <strong class="t-hi">Chenab</strong>. The 2018 Prelims tested the Salal–Tapi
                  pair as the WRONG option - see Salal in the far north on the map, nowhere near Tapi.
                </p>
              </div>
            </div>
          </div>

          <!-- E. Waterfalls -->
          <div>
            <div class="mb-4 flex items-center justify-between gap-3">
              <h3 class="text-h3 font-semibold t-hi">E. Waterfalls &amp; Rivers</h3>
              <button type="button" class="locate-btn" @click="goMap('narmada')">
                <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />map
              </button>
            </div>
            <div class="panel panel-pad">
              <div class="overflow-x-auto">
                <table class="table-note">
                  <thead>
                    <tr><th>Waterfall</th><th>River</th><th>Note</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="f in falls" :key="f.name">
                      <td class="cell-key">
                        {{ f.name }}
                        <span v-if="f.hot" class="hot-tag">PYQ</span>
                      </td>
                      <td class="t-hi">{{ f.river }}</td>
                      <td>{{ f.note }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · Data & Comparisons ──────────────────────────────────── -->
        <section id="data" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Data &amp; Comparisons</h2>
            <span class="sec-rule" />
          </header>

          <div class="panel panel-pad mb-5">
            <p class="eyebrow mb-3">Major rivers - quick reference</p>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr><th>River</th><th>Origin</th><th>Length</th><th>Drains into</th><th>Key fact</th></tr>
                </thead>
                <tbody>
                  <tr v-for="r in masterTable" :key="r.river">
                    <td class="cell-key">{{ r.river }}</td>
                    <td>{{ r.origin }}</td>
                    <td class="cell-num">{{ r.length }}</td>
                    <td>{{ r.drains }}</td>
                    <td>{{ r.fact }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="panel panel-pad">
            <div class="mb-3 flex flex-wrap items-center gap-2.5">
              <p class="eyebrow">Doab reference</p>
              <span class="chip chip-saffron chip-mono">SI Prelims favourite</span>
            </div>
            <table class="table-note">
              <thead>
                <tr><th>Doab</th><th>Between rivers</th></tr>
              </thead>
              <tbody>
                <tr v-for="d in doabs" :key="d.name">
                  <td class="cell-key">{{ d.name }}</td>
                  <td>{{ d.between }}</td>
                </tr>
              </tbody>
            </table>
            <p class="mt-3 text-body-xs t-lo">
              Mnemonic <span class="hot font-mono">BiBarReChaJ</span> → Bist, Bari, Rechna, Chaj, Jech - east to west
            </p>
          </div>
        </section>

        <!-- ── 05 · Memory Hacks ────────────────────────────────────────── -->
        <section id="memory-hacks" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Memory Hacks</h2>
            <span class="sec-rule" />
          </header>
          <p class="mb-5 max-w-2xl text-body-sm leading-relaxed t-lo">
            Mnemonics exist only for the parts the map can't carry - mostly east-to-west ordering.
            Spatial facts live on the map; these are the residual sequences.
          </p>

          <div class="space-y-3">
            <div v-for="(hack, i) in memoryHacks" :key="hack.title" class="panel panel-pad flex gap-5">
              <span class="num shrink-0 font-mono text-[11px] font-semibold leading-6 accent">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0 flex-1">
                <h3 class="mb-2 text-[13.5px] font-semibold t-hi">{{ hack.title }}</h3>
                <div class="mb-2 inline-block rounded-md border b-line bg-inset px-3.5 py-1.5">
                  <p class="num font-mono text-h3 font-bold tracking-wide accent">{{ hack.mnemonic }}</p>
                </div>
                <p class="text-body-sm leading-relaxed t-mid">{{ hack.expansion }}</p>
              </div>
            </div>

            <button type="button" class="locate-btn ms-1" @click="goMap('luni')">Luni on the map →</button>

            <!-- ELI5 - dark artifact card -->
            <div class="artifact panel-pad">
              <div class="mb-3 flex items-center gap-2.5">
                <span class="chip chip-mono border-[var(--accent-line)] bg-[rgba(229,173,49,0.12)] text-[#ecc555]">ELI5</span>
                <h3 class="font-display text-body font-semibold tracking-tight text-[#f3efe4]">The Tilted Table</h3>
              </div>
              <p class="border-s-2 border-[#e5ad31] ps-4 text-body-sm leading-[1.8] text-[#c9c1ae]">
                Think of India like a <strong class="text-[#f3efe4]">tilted table</strong>: the Western
                Ghats are the high edge on the west. Pour water - most flows
                <strong class="text-[#f3efe4]">east</strong> to the Bay of Bengal. Narmada and Tapi found
                <strong class="text-[#f3efe4]">cracks in the table</strong> (rift valleys) and escaped
                westward. Rebel Luni just <strong class="text-[#f3efe4]">gives up halfway</strong> - on
                the map it is the dashed river that fades into the Rann of Kutch.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 06 · PYQs ────────────────────────────────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">PYQs</h2>
            <span class="sec-rule" />
            <span class="sec-meta">
              {{ attemptedCount }}/{{ pyqs.length }} attempted
              <template v-if="attemptedCount === pyqs.length"> · score {{ correctCount }}/{{ pyqs.length }}</template>
            </span>
          </header>

          <div class="callout mb-5">
            <p class="callout-title">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-4 w-4" />
              Real TGPRB questions
            </p>
            <p class="callout-body">
              All are from your extracted papers (2015–2023). Each card is tagged with the
              coverage pattern it tests - click an option to attempt, the reveal shows the trap.
            </p>
          </div>

          <div class="space-y-4">
            <article v-for="(q, qi) in pyqs" :key="qi" class="panel panel-pad">
              <div class="mb-3 flex flex-wrap items-center gap-2.5">
                <span class="chip chip-saffron chip-mono">Q{{ qi + 1 }}</span>
                <span class="chip chip-mono">{{ q.tag }}</span>
                <span class="font-mono text-[10.5px] uppercase tracking-[0.08em] t-lo">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto"
                  :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
                >{{ q.selected === q.correct ? 'Correct' : 'Missed' }}</span>
              </div>

              <p class="mb-4 whitespace-pre-line text-[13.5px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  type="button"
                  class="opt"
                  :class="optionClass(q, oi)"
                  :disabled="q.revealed"
                  @click="attempt(q, oi)"
                >
                  <span class="opt-letter">{{ 'ABCD'[oi] }}</span>
                  <span class="flex-1">{{ opt }}</span>
                  <UIcon v-if="q.revealed && oi === q.correct" name="i-heroicons-check-circle-solid" class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]" />
                  <UIcon v-else-if="q.revealed && oi === q.selected" name="i-heroicons-x-circle-solid" class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]" />
                </button>
              </div>

              <!-- Explanation -->
              <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
                <p class="callout-title">
                  <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
                  {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
              </div>

              <button v-else type="button" class="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent" @click="reveal(q)">
                Reveal answer →
              </button>
            </article>
          </div>
        </section>

        <!-- ── Footer nav ───────────────────────────────────────────────── -->
        <nav class="grid gap-3 border-t b-line pt-8 sm:grid-cols-2">
          <NuxtLink to="/notes/geography" class="panel panel-hover group flex items-center gap-3 p-5">
            <UIcon name="i-heroicons-arrow-left" class="h-4 w-4 shrink-0 t-lo transition-transform group-hover:-translate-x-1" />
            <div>
              <p class="eyebrow mb-0.5">Subject</p>
              <p class="text-[13.5px] font-semibold t-hi">All Geography topics</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/review" class="panel panel-hover group flex items-center justify-end gap-3 p-5 text-right">
            <div>
              <p class="eyebrow mb-0.5">Next step</p>
              <p class="text-[13.5px] font-semibold t-hi">Open the review queue</p>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="h-4 w-4 shrink-0 accent transition-transform group-hover:translate-x-1" />
          </NuxtLink>
        </nav>
      </article>

      <!-- ══ Sticky ToC ══════════════════════════════════════════════════ -->
      <aside class="hidden w-52 shrink-0 xl:block">
        <div class="sticky top-20">
          <p class="eyebrow mb-3">On this page</p>
          <nav class="space-y-0.5">
            <a
              v-for="(section, i) in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="group flex items-baseline gap-2.5 rounded-md px-2 py-1.5 text-body-xs transition-colors"
              :class="activeSection === section.id ? 'bg-accent-soft t-hi' : 't-lo hover:t-mid'"
              @click.prevent="scrollTo(section.id)"
            >
              <span class="num font-mono text-[10px]" :class="activeSection === section.id ? 'accent' : 't-lo'">{{ String(i + 1).padStart(2, '0') }}</span>
              <span :class="activeSection === section.id ? 'font-semibold' : ''">{{ section.label }}</span>
            </a>
          </nav>

          <div class="mt-6 border-t b-line pt-4">
            <p class="eyebrow mb-2">Weight in paper</p>
            <p class="text-body-xs leading-relaxed t-lo">2–3 questions per paper, every year since 2015.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Drainage System of India - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Complete TGPRB study note: Drainage System of India with an interactive physical river map, 28 PYQs, and 10 practice questions.' }],
})

/* Physical map component (locate-on-map from deep dive) */
function goMap(id: string) {
  document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ── The 6 coverage patterns (the spec for “enough, not overkill”) ─────── */
const coverage = [
  { label: 'Spatial order (N→S / E→W)' },
  { label: 'Tributary identification' },
  { label: 'Dam · river · place' },
  { label: 'Waterfall · river' },
  { label: 'Termination / drainage type' },
  { label: 'Statement verification' },
]

/* ── ToC + scrollspy + reading progress ──────────────────────────────────── */
const sections = [
  { id: 'map',           label: 'The Map' },
  { id: 'introduction',  label: 'Introduction' },
  { id: 'deep-dive',     label: 'Deep Dive' },
  { id: 'data',          label: 'Data & Comparisons' },
  { id: 'memory-hacks',  label: 'Memory Hacks' },
  { id: 'pyqs',          label: 'PYQs' },
]

const activeSection = ref('map')
const readProgress = ref(0)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let observer: IntersectionObserver | null = null
function onScroll() {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  readProgress.value = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0
}
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id })
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )
  sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
})

/* ── Stats ───────────────────────────────────────────────────────────────── */
const topStats = [
  { count: '8+', label: 'Godavari PYQs' },
  { count: '5+', label: 'Narmada PYQs' },
  { count: '4+', label: 'Krishna PYQs' },
]

/* ── Indus tributaries (hot = asked in a PYQ) ────────────────────────────── */
const indusTributaries = [
  { name: 'Sutlej', ancient: 'Shatudri', doab: 'Bist (with Beas)',         hot: false },
  { name: 'Beas',   ancient: 'Vipasha',  doab: 'Bari (with Ravi)',         hot: false },
  { name: 'Ravi',   ancient: 'Iravati',  doab: 'Rechna (with Chenab)',     hot: true  },
  { name: 'Chenab', ancient: 'Asikni',   doab: 'Chaj (with Jhelum)',       hot: false },
  { name: 'Jhelum', ancient: 'Vitasta',  doab: 'Sindh Sagar (with Indus)', hot: false },
]

/* ── East-flowing rivers ─────────────────────────────────────────────────── */
const eastRivers = [
  {
    name: 'Godavari', origin: 'Nasik, MH', length: '1,465 km',
    tribs: [{ n: 'Pranahita' }, { n: 'Indravati' }, { n: 'Sabari', hot: true }, { n: 'Manjira' }],
    states: '7', statesHot: true,
  },
  {
    name: 'Krishna', origin: 'Mahabaleshwar, WG', length: '1,400 km',
    tribs: [{ n: 'Bhima' }, { n: 'Tungabhadra' }, { n: 'Musi' }],
    states: 'MH, KA, TS, AP', statesHot: false,
  },
  {
    name: 'Mahanadi', origin: 'Sihawa, CG', length: '858 km',
    tribs: [{ n: 'Seonath' }, { n: 'Hasdeo' }],
    states: 'CG, OR', statesHot: false,
  },
  {
    name: 'Cauvery', origin: 'Brahmagiri Hills, Coorg', length: '800 km',
    tribs: [{ n: 'Hemavati' }, { n: 'Kabini' }],
    states: 'KA, TN, KL', statesHot: false,
  },
]

/* ── West-flowing rivers ─────────────────────────────────────────────────── */
const westRivers = [
  { name: 'Narmada',   origin: 'Amarkantak, MP',     length: '1,312 km', feature: 'Rift valley, Vindhyas (N) & Satpuras (S) - no delta', hot: true  },
  { name: 'Tapi',      origin: 'Multai, Betul, MP',  length: '724 km',   feature: 'Rift valley, parallel to Narmada',                   hot: false },
  { name: 'Sabarmati', origin: 'Aravalli Hills, RJ', length: '371 km',   feature: 'Gulf of Khambhat',                                   hot: false },
  { name: 'Luni',      origin: 'Pushkar Valley, RJ', length: '495 km',   feature: 'Rann of Kutch - inland, never reaches the sea',      hot: true  },
]

/* ── Dams (ts = Telangana project, hot = asked in a PYQ) ─────────────────── */
const dams = [
  { name: 'Bhakra-Nangal',  river: 'Sutlej',     state: 'HP / Punjab',            ts: false, hot: false },
  { name: 'Sardar Sarovar', river: 'Narmada',    state: 'Gujarat',                ts: false, hot: false },
  { name: 'Ukai',           river: 'Tapi',       state: 'Gujarat',                ts: false, hot: true  },
  { name: 'Matatilla',      river: 'Betwa',      state: 'Uttar Pradesh',          ts: false, hot: true  },
  { name: 'Hirakud',        river: 'Mahanadi',   state: 'Odisha',                 ts: false, hot: false },
  { name: 'Tehri',          river: 'Bhagirathi', state: 'Uttarakhand',            ts: false, hot: false },
  { name: 'Salal',          river: 'Chenab',     state: 'J&K',                    ts: false, hot: true  },
  { name: 'Sriram Sagar',   river: 'Godavari',   state: 'Telangana (Nizamabad)',  ts: true,  hot: false },
  { name: 'Kaleshwaram',    river: 'Godavari',   state: 'Telangana',              ts: true,  hot: false },
  { name: 'Lower Manair',   river: 'Manair',     state: 'Telangana (Karimnagar)', ts: true,  hot: false },
  { name: 'Kadam',          river: 'Kadam',      state: 'Telangana (Adilabad)',   ts: true,  hot: false },
  { name: 'Jayakwadi',      river: 'Godavari',   state: 'Maharashtra',            ts: false, hot: false },
]

/* ── Waterfalls ──────────────────────────────────────────────────────────── */
const falls = [
  { name: 'Jog (Gersoppa)', river: 'Sharavathi', note: 'Highest in India',       hot: false },
  { name: 'Dhuandhar',      river: 'Narmada',    note: 'Also: Marble Falls',     hot: true  },
  { name: 'Kapildhara',     river: 'Narmada',    note: 'Near Amarkantak origin', hot: false },
  { name: 'Dudhsagar',      river: 'Mandovi',    note: 'Goa',                    hot: false },
  { name: 'Hogenakal',      river: 'Cauvery',    note: 'Tamil Nadu',             hot: false },
]

/* ── Master table ────────────────────────────────────────────────────────── */
const masterTable = [
  { river: 'Ganga',       origin: 'Gangotri Glacier',   length: '2,525 km', drains: 'Bay of Bengal', fact: 'Largest basin in India' },
  { river: 'Brahmaputra', origin: 'Tibet (Mansarovar)', length: '2,900 km', drains: 'Bay of Bengal', fact: 'Antecedent · Tsangpo' },
  { river: 'Godavari',    origin: 'Nasik, MH',          length: '1,465 km', drains: 'Bay of Bengal', fact: '"Dakshin Ganga" · 7 states' },
  { river: 'Krishna',     origin: 'Mahabaleshwar',      length: '1,400 km', drains: 'Bay of Bengal', fact: '2nd largest peninsular' },
  { river: 'Narmada',     origin: 'Amarkantak',         length: '1,312 km', drains: 'Arabian Sea',   fact: 'Rift valley · no delta' },
  { river: 'Tapi',        origin: 'Multai, Betul',      length: '724 km',   drains: 'Arabian Sea',   fact: 'Parallel to Narmada' },
  { river: 'Cauvery',     origin: 'Brahmagiri Hills',   length: '800 km',   drains: 'Bay of Bengal', fact: 'Sacred river of South' },
  { river: 'Mahanadi',    origin: 'Sihawa, CG',         length: '858 km',   drains: 'Bay of Bengal', fact: 'Hirakud Dam' },
  { river: 'Luni',        origin: 'Pushkar Valley, RJ', length: '495 km',   drains: 'Rann of Kutch', fact: 'Inland drainage only' },
]

/* ── Doabs ───────────────────────────────────────────────────────────────── */
const doabs = [
  { name: 'Bist',        between: 'Beas - Sutlej' },
  { name: 'Bari',        between: 'Beas - Ravi' },
  { name: 'Rechna',      between: 'Ravi - Chenab' },
  { name: 'Chaj',        between: 'Chenab - Jhelum' },
  { name: 'Sindh Sagar', between: 'Jhelum - Indus' },
]

/* ── Memory hacks ────────────────────────────────────────────────────────── */
const memoryHacks = [
  {
    title: 'Peninsular east-flowing rivers - by length',
    mnemonic: 'God KriMa Cau',
    expansion: 'Godavari (1,465 km) → Krishna (1,400 km) → Mahanadi (858 km) → Cauvery (800 km)',
  },
  {
    title: 'Indus tributaries - west to east',
    mnemonic: 'J C R B S',
    expansion: 'Jhelum · Chenab · Ravi · Beas · Sutlej',
  },
  {
    title: 'Doabs - east to west',
    mnemonic: 'BiBarReChaJ',
    expansion: 'Bist · Bari · Rechna · Chaj · Jech (Sindh Sagar)',
  },
  {
    title: 'Brahmaputra names across regions',
    mnemonic: 'T → D → B',
    expansion: 'Tsangpo (Tibet) → Dihang (Arunachal) → Brahmaputra (Assam)',
  },
]

/* ── Text hierarchy (instant summary of the map) ─────────────────────────── */
const textHierarchy = `Indian Drainage System
├── Himalayan Rivers (perennial, glacier-fed)
│   ├── Indus → 5 tributaries (J C R B S, west→east)
│   │   Doabs: Sindh Sagar · Chaj · Rechna · Bari · Bist
│   ├── Ganga  → Largest basin; delta = Sundarban
│   └── Brahmaputra → antecedent · Tsangpo→Dihang→Brahmaputra
└── Peninsular Rivers (seasonal, rain-fed)
    ├── East-flowing (deltas): God > Kri > Maha > Cau
    ├── West-flowing (estuaries): Narmada, Tapi (rift valleys)
    └── Inland (no sea): Luni → Rann of Kutch`

/* ── PYQs - real TGPRB questions, tagged to the 6 coverage patterns ─────── */
interface Pyq {
  source: string
  question: string
  tag: string
  options: string[]
  correct: number
  explanation: string
  revealed: boolean
  selected: number | null
}

const pyqs = reactive<Pyq[]>([
  {
    source: 'Constable 2018 Prelims · Q92',
    tag: '2 · Tributaries',
    question: 'Which of the following is the easternmost tributary of the Godavari river system?',
    options: ['Pranahita', 'Sabari', 'Kinnerasani', 'Indravati'],
    correct: 1,
    explanation: 'Sabari is the easternmost - spot it east of Indravati on the map. Indravati is the largest but flows from the west. A very common trap.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2018 Prelims · Q115',
    tag: '5 · Drainage basin',
    question: 'The number of states at present which fall in the catchment area of the Godavari river:',
    options: ['8', '7', '4', '5'],
    correct: 1,
    explanation: '7 states: Maharashtra, Telangana, Andhra Pradesh, Chhattisgarh, Madhya Pradesh, Karnataka, Odisha.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2018 Mains · Q89',
    tag: '3 · Dam · river',
    question: 'Matatilla Project was built on which of the following rivers?',
    options: ['Mahanadi', 'Kosi', 'Betwa', 'Damodar'],
    correct: 2,
    explanation: 'Matatilla multipurpose project is on the Betwa river in Uttar Pradesh. Frequently confused with Damodar.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2022 Prelims · Q192',
    tag: '3 · Dam · river',
    question: 'Ukai dam is situated across which of the following rivers?',
    options: ['Tapi', 'Narmada', 'Kaveri', 'Chambal'],
    correct: 0,
    explanation: 'Ukai is on the Tapi (see the dam on the map). Narmada carries Sardar Sarovar instead.',
    revealed: false,
    selected: null,
  },
  {
    source: 'SI 2018 Prelims · Q158',
    tag: '6 · Statements',
    question: 'Read the following statements:\n(a) River Narmada flows in a rift valley.\n(b) Vindhya mountains are located to the south of river Narmada.\n(c) River Narmada is a west flowing river.\nWhich of the above statement/s is/are correct?',
    options: ['(a) and (c) only', '(a), (b) and (c)', '(b) and (c) only', '(a) only'],
    correct: 0,
    explanation: 'Vindhyas are to the NORTH of Narmada - (b) is wrong. (a) rift valley and (c) west-flowing are both correct. The map shows the Vindhya band above the Narmada.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2015/16 Prelims · Q192',
    tag: '3 · Dam · river',
    question: 'On which river is the “Rajoli Banda Diversion Scheme” built?',
    options: ['Krishna', 'Manjeera', 'Tungabhadra', 'Godavari'],
    correct: 0,
    explanation: 'Rajoli Banda is on the Krishna, in Telangana (Mahbubnagar). A named Telangana project on the Krishna - not on Tungabhadra.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2018 Prelims · Q99',
    tag: '1 · Spatial order',
    question: 'Arrange these west-flowing rivers from north to south: Mahi, Sabarmati, Tapi, Luni.',
    options: ['Luni, Sabarmati, Mahi, Tapi', 'Sabarmati, Luni, Tapi, Mahi', 'Mahi, Sabarmati, Luni, Tapi', 'Luni, Tapi, Sabarmati, Mahi'],
    correct: 0,
    explanation: 'Luni (Rajasthan) is northernmost → Sabarmati → Mahi → Tapi (Gujarat) southernmost. Answer it from the map, not memory.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2018 Mains · Q115',
    tag: '2 · Tributaries',
    question: 'Which of the following is/are NOT tributaries of the Krishna river?\n(a) Panchganga  (b) Malaprabha  (c) Purna  (d) Pravara',
    options: ['(a) and (b) only', '(c) and (d) only', '(a) only', '(b) only'],
    correct: 1,
    explanation: 'Purna and Pravara are Godavari tributaries. Panchganga and Malaprabha both join the Krishna.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2022 Prelims · Q173',
    tag: '5 · Termination',
    question: 'The Luni river, which originates in the Pushkar valley of the Aravalli range, ends in which of the following?',
    options: ['As a tributary to the Sabarmati', 'In the Rann of Kutch', 'The Arabian Sea', 'Near Mount Abu'],
    correct: 1,
    explanation: 'Luni is inland - on the map it is the dashed river that fades into the Rann of Kutch and never reaches the sea.',
    revealed: false,
    selected: null,
  },
  {
    source: 'Constable 2015 Mains · Q158',
    tag: '4 · Waterfall · river',
    question: 'The Dhuandhar (Marble) Falls are a waterfall on which river?',
    options: ['Narmada', 'Tapi', 'Mahanadi', 'Tungabhadra'],
    correct: 0,
    explanation: 'Dhuandhar is on the Narmada, at Bhedaghat (Jabalpur) - the waterfall marker sits right on the Narmada line on the map.',
    revealed: false,
    selected: null,
  },
])

const attemptedCount = computed(() => pyqs.filter(q => q.revealed).length)
const correctCount = computed(() => pyqs.filter(q => q.revealed && q.selected === q.correct).length)

function attempt(q: Pyq, optIdx: number) {
  if (q.revealed) return
  q.selected = optIdx
  q.revealed = true
}
function reveal(q: Pyq) {
  q.revealed = true
}
function optionClass(q: Pyq, oi: number) {
  if (!q.revealed) return ''
  if (oi === q.correct) return 'opt-correct'
  if (oi === q.selected) return 'opt-wrong'
  return 'opt-dim'
}
</script>
