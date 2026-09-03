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
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 3–5 Questions (4–6 Marks)</span>
            <span class="chip">31 verified PYQs</span>
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
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />31 practice PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~16 min read
            </span>
          </div>
        </header>


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

          <!-- 2026 Predicted Question Format Callout -->
          <div class="mt-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 accent shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider accent">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Match the Following (River ↔ Tributary / Dam), followed by <strong class="t-hi">4-Statement True/False Verifications</strong> on East vs West flowing rivers. Trap alert: TGPRB frequently pairs Krishna tributaries with Godavari to induce negative marking.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · The physical map ───────────────────────────────────── -->
        <section id="map" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">The Map</h2>
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="map" section-label="The Map" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">dual-code · spatial</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="map" section-label="The Map" note-title="Drainage System of India" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            This is your anchor. Rivers are spatial - that is how the exam tests them
            (tributary order, dam placement, which river ends where). Learn the shape first,
            then click a river to attach its <span class="t-hi">PYQ-marked facts</span>.
          </p>

          <!-- High-Quality Labeled Physical River Map of India -->
          <div class="mb-6 rounded-xl border b-line bg-elev p-4 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786136897/geography/india_rivers_labeled2.webp"
              alt="Physical Map of India with labeled rivers - Indus, Ganges, Brahmaputra, Narmada, Godavari, Krishna, Kaveri"
              class="mx-auto block w-full max-w-4xl h-auto object-contain rounded-lg"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t b-line pt-3 text-body-xs t-lo font-mono">
              <span>Physical relief map with labeled river systems (Wikimedia Commons / CC BY-SA 3.0)</span>
              <a href="https://res.cloudinary.com/gbxjgmck/image/upload/v1786136897/geography/india_rivers_labeled2.webp" target="_blank" class="accent hover:underline flex items-center gap-1 font-sans font-medium">
                Open Full Res (1431×1491) ↗
              </a>
            </div>
          </div>

          <!-- Secondary Overview Flow Diagram -->
          <div class="mb-5 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786136896/geography/india_rivers_wiki.webp"
              alt="Plan of River Systems of India - System Overview Diagram"
              class="mx-auto block w-full max-w-3xl h-auto object-contain rounded-lg"
            />
            <p class="mt-2 text-center text-body-xs t-lo font-mono">
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
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="introduction" section-label="Introduction" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="introduction" section-label="Introduction" note-title="Drainage System of India" @open="openNotesDrawer" />

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
              31 verified PYQs across Constable + SI papers (2015–2023). Expect 2–3 per paper.
              Top question types follow the coverage strip above: tributaries, dam–river–state,
              waterfalls, doabs and drainage termination.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="stat in topStats"
              :key="stat.label"
              type="button"
              class="panel px-4 py-5 text-center transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5 hover:scale-[1.02] cursor-pointer group"
              @click="focusRiverPYQ(stat.riverKey)"
            >
              <p class="num font-display text-[26px] font-bold tracking-tight accent group-hover:scale-110 transition-transform">{{ stat.count }}</p>
              <p class="mt-1.5 text-[11px] leading-snug t-lo flex items-center justify-center gap-1">
                {{ stat.label }}
                <UIcon name="i-heroicons-arrow-down-right" class="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity accent" />
              </p>
            </button>
          </div>
        </section>

        <!-- ── 03 · Deep Dive ───────────────────────────────────────────── -->
        <section id="deep-dive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Deep Dive</h2>
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="deep-dive" section-label="Deep Dive" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">A–E</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="deep-dive" section-label="Deep Dive" note-title="Drainage System of India" @open="openNotesDrawer" />
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
            <div class="mt-4 mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786556254/geography/indus-river-basin-map.webp"
                alt="Indus River Basin Map showing Jhelum, Chenab, Ravi, Beas, Satluj tributaries and Pakistan India region"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Indus River Basin - Wikimedia Commons / CC BY-SA</p>
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
            <div class="mt-4 mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786558595/geography/ganga-river-map.webp"
                alt="Ganga Yamuna River System Map showing left and right bank tributaries - Kosi, Ghaghara, Yamuna, Son, Damodar"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Ganga-Yamuna River System &amp; Tributaries (PMF IAS / Exam Diagram)</p>
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
            <div class="mt-4 mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786558596/geography/brahmaputra-river-map.webp"
                alt="Brahmaputra River Basin Map showing Yarlung Tsangpo in Tibet, Dihang in Arunachal, tributaries Subhansiri Lohit Manas Teesta"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Brahmaputra River System &amp; Tributaries (Civilspedia Exam Diagram)</p>
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

            <div class="panel panel-pad mb-6">
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

            <!-- Godavari River Basin Map -->
            <div class="mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787323151/geography/godavari-river-map.webp"
                alt="Godavari River Basin Map showing Pravara Manjira Penganga Wardha Wainganga Indravati Sabari tributaries across Maharashtra Telangana Andhra Pradesh"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Godavari River Basin (TSLPRB / TGPRB Master Reference Diagram)</p>
            </div>

            <!-- Krishna River Basin Map -->
            <div class="mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787940466/geography/krishna-river-map.webp"
                alt="Krishna River Basin Map showing Bhima Musi Tungabhadra Malprabha tributaries across Maharashtra Karnataka Andhra Pradesh Telangana"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Krishna River Basin (TSLPRB / TGPRB Master Reference Diagram)</p>
            </div>

            <!-- Mahanadi River Basin Map -->
            <div class="mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787940465/geography/mahanadi-river-map.webp"
                alt="Mahanadi River System Map showing Seonath Hasdeo Mand Ib Tel Jonk tributaries"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Mahanadi River Basin (TSLPRB / TGPRB Master Reference Diagram)</p>
            </div>

            <!-- Cauvery River Basin Map -->
            <div class="mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787940469/geography/cauvery-river-map.webp"
                alt="Cauvery Kaveri River System Map showing Harangi Hemavati Arkavathi Kabini Bhavani Amaravathi tributaries"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Cauvery / Kaveri River Basin (TSLPRB / TGPRB Master Reference Diagram)</p>
            </div>
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

            <div class="panel panel-pad mb-6">
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

            <!-- Narmada River Map -->
            <div class="mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787940464/geography/narmada-river-map.webp"
                alt="Narmada River System Map showing Amarkantak origin, rift valley between Vindhya and Satpura ranges, Sardar Sarovar dam"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Narmada River System (TSLPRB / TGPRB Master Reference Diagram)</p>
            </div>

            <!-- Tapi River Map -->
            <div class="mb-6 rounded-xl border b-line bg-elev p-3 text-center shadow-sm">
              <img
                src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787940463/geography/tapi-river-map.webp"
                alt="Tapi River System Map showing Multai origin in Betul MP, Ukai dam, Gulf of Khambhat estuary"
                class="mx-auto block w-full max-w-2xl h-auto object-contain rounded-lg"
              />
              <p class="mt-2 text-[11px] t-lo font-mono">Tapi River System (TSLPRB / TGPRB Master Reference Diagram)</p>
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
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="data" section-label="Data & Comparisons" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="data" section-label="Data & Comparisons" note-title="Drainage System of India" @open="openNotesDrawer" />

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
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="memory-hacks" section-label="Memory Hacks" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="memory-hacks" section-label="Memory Hacks" note-title="Drainage System of India" @open="openNotesDrawer" />
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
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="pyqs" section-label="PYQs" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule"></span>
            <span class="sec-meta">
              {{ filteredPyqs.length }} questions
              <template v-if="attemptedCount > 0"> · {{ attemptedCount }} attempted ({{ correctCount }} correct)</template>
            </span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="pyqs" section-label="PYQs" note-title="Drainage System of India" @open="openNotesDrawer" />

          <div class="callout mb-5">
            <p class="callout-title">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-4 w-4" />
              Real TGPRB Verified Questions (2015–2023)
            </p>
            <p class="callout-body">
              Filter by exam type (Constable / SI), paper year, or specific river system. Click options to test your knowledge!
            </p>
          </div>

          <!-- ── Interactive Filter Controls ──────────────────────────────── -->
          <div class="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-sub p-4 space-y-4 shadow-sm">
            <!-- Row 1: Exam Type Tabs -->
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
              <span class="font-mono text-body-xs font-semibold uppercase tracking-wider t-lo flex items-center gap-1.5">
                <UIcon name="i-heroicons-academic-cap" class="h-4 w-4 accent" />
                Exam Type:
              </span>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="examOpt in ['all', 'Constable', 'SI']"
                  :key="examOpt"
                  type="button"
                  class="px-3.5 py-1.5 rounded-lg text-body-xs font-medium transition-all"
                  :class="activeExamFilter === examOpt ? 'bg-amber-500 text-white font-semibold shadow-sm' : 'bg-elev t-mid hover:t-hi border b-line'"
                  @click="activeExamFilter = examOpt"
                >
                  {{ examOpt === 'all' ? 'All Exams (' + pyqs.length + ')' : examOpt + ' (' + pyqs.filter(q => q.exam === examOpt).length + ')' }}
                </button>
              </div>
            </div>

            <!-- Row 2: Year Filter Chips -->
            <div class="flex flex-wrap items-center justify-between gap-3 border-b b-line pb-3">
              <span class="font-mono text-body-xs font-semibold uppercase tracking-wider t-lo flex items-center gap-1.5">
                <UIcon name="i-heroicons-calendar" class="h-4 w-4 accent" />
                Paper Year:
              </span>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="yrOpt in ['all', '2023', '2022', '2018', '2016', '2015']"
                  :key="yrOpt"
                  type="button"
                  class="px-2.5 py-1 rounded-md text-[11.5px] font-mono transition-all"
                  :class="activeYearFilter === yrOpt ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/40' : 'bg-elev t-lo hover:t-hi border b-line'"
                  @click="activeYearFilter = yrOpt"
                >
                  {{ yrOpt === 'all' ? 'All Years' : yrOpt }}
                </button>
              </div>
            </div>

            <!-- Row 3: River System Focus Chips -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              <span class="font-mono text-body-xs font-semibold uppercase tracking-wider t-lo flex items-center gap-1.5">
                <UIcon name="i-heroicons-map" class="h-4 w-4 accent" />
                River Focus:
              </span>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="rOpt in riverOptions"
                  :key="rOpt.id"
                  type="button"
                  class="px-3 py-1 rounded-full text-[11.5px] font-medium transition-all"
                  :class="activeRiverFilter === rOpt.id ? 'bg-saffron-500 text-white font-semibold shadow-sm' : 'bg-elev t-mid hover:t-hi border b-line'"
                  @click="activeRiverFilter = rOpt.id"
                >
                  {{ rOpt.label }}
                </button>
              </div>
            </div>

            <!-- Active Filter Reset Bar -->
            <div v-if="activeExamFilter !== 'all' || activeYearFilter !== 'all' || activeRiverFilter !== 'all'" class="pt-2 flex items-center justify-between text-[11px] t-lo border-t border-gray-200 dark:border-gray-800">
              <span>Showing {{ filteredPyqs.length }} of {{ pyqs.length }} total questions</span>
              <button type="button" class="text-amber-600 dark:text-amber-400 hover:underline font-mono" @click="resetPYQFilters()">
                Reset all filters ×
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredPyqs.length === 0" class="panel panel-pad text-center py-10">
            <UIcon name="i-heroicons-funnel" class="mx-auto h-8 w-8 t-lo mb-2" />
            <p class="text-body-sm font-semibold t-hi mb-1">No PYQs match this exact filter combination</p>
            <p class="text-body-xs t-lo mb-4">Try clearing one of your filters to view questions.</p>
            <button type="button" class="btn btn-secondary text-xs px-4 py-2" @click="resetPYQFilters()">
              Reset Filters
            </button>
          </div>

          <!-- PYQ Cards List -->
          <div v-else class="space-y-4">
            <article v-for="(q, qi) in filteredPyqs" :key="q.uid || qi" class="panel panel-pad transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="chip chip-saffron chip-mono">Q{{ qi + 1 }}</span>
                <span class="chip chip-mono">{{ q.exam }} {{ q.year }}</span>
                <span class="chip chip-jade chip-mono">{{ q.tag }}</span>
                <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto"
                  :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
                >{{ q.selected === q.correct ? 'Correct' : 'Missed' }}</span>
              </div>

              <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

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
                  Correct Answer: Option {{ 'ABCD'[q.correct] }} - {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
                <AiAskButton
                  class="mt-3"
                  note-id="NOTE-GEO-DRAINAGE"
                  :prompt="`Explain the reasoning for this PYQ and the likely exam trap: ${q.question}`"
                  :source-question-id="q.uid"
                  :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid ?? ''], gate_score: 0, gate_total: 0 }"
                  label="Explain with AI"
                />
              </div>

              <button v-else type="button" class="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1" @click="reveal(q)">
                <span>Reveal answer &amp; explanation</span>
                <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
              </button>
            </article>
          </div>
        </section>

        <!-- -- 07 - TGPSC-Style Advanced Practice ----------------------- -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="advanced-practice" section-label="Advanced Practice" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">
              {{ advancedPractice.length }} drills
              <template v-if="advAttemptedCount > 0"> - {{ advAttemptedCount }} attempted ({{ advCorrectCount }} correct)</template>
            </span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="advanced-practice" section-label="Advanced Practice" note-title="Drainage System of India" @open="openNotesDrawer" />

          <!-- Disclaimer callout -->
          <div class="mb-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <p class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
              TGPSC-Style Advanced Practice
            </p>
            <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
              These questions use <strong class="t-hi">multi-statement, matching, and assertion-reason</strong> formats
              from the TGPSC Group-I 2024 paper. TGPRB papers (2022-2023) remain
              <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your fact base
              against a potentially harder 2026 format.
            </p>
            <p class="mt-2 text-[11.5px] font-mono t-lo">
              Source: Forensic Paper-Setting Evolution Audit, Aug 2026 - 1,350 questions classified across 7 papers.
            </p>
          </div>

          <!-- Advanced Practice Cards -->
          <div class="space-y-4">
            <article
              v-for="(q, qi) in advancedPractice"
              :key="q.uid"
              class="panel panel-pad transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
            >
              <!-- Card header -->
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-bold font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  {{ q.format }}
                </span>
                <span v-if="q.isSynthetic" class="chip chip-mono">Synthetic</span>
                <span v-else class="chip chip-mono">Real TGPSC</span>
                <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto sm:ms-0"
                  :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
                >{{ q.selected === q.correct ? 'Correct' : 'Missed' }}</span>
              </div>

              <!-- Question stem -->
              <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

              <!-- Options grid -->
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  type="button"
                  class="opt"
                  :class="advOptionClass(q, oi)"
                  :disabled="q.revealed"
                  @click="advAttempt(q, oi)"
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
                  Correct Answer: Option {{ 'ABCD'[q.correct] }} - {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
                <AiAskButton
                  class="mt-3"
                  note-id="NOTE-GEO-DRAINAGE"
                  :prompt="`Explain the reasoning for this TGPSC-style question and the exam trap: ${q.question}`"
                  :source-question-id="q.uid"
                  :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid], gate_score: 0, gate_total: 0 }"
                  label="Explain with AI"
                />
              </div>

              <button v-else type="button" class="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1" @click="advReveal(q)">
                <span>Reveal answer &amp; explanation</span>
                <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
              </button>
            </article>
          </div>
        </section>

        <!-- -- 08 - Comprehension Gate ----------------------------------- -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="gate" section-label="Comprehension Gate" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="gate" section-label="Comprehension Gate" note-title="Drainage System of India" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-GEO-DRAINAGE" />
        </section>

        <!-- -- 09 - Current Affairs -------------------------------------- -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-GEO-DRAINAGE" section-id="current-affairs" section-label="Current Affairs" note-title="Drainage System of India" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-DRAINAGE" section-id="current-affairs" section-label="Current Affairs" note-title="Drainage System of India" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-GEO-DRAINAGE" />
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
      <TableOfContents
        v-model="activeSection"
        :sections="sections"
        weight-text="2-3 questions per paper, every year since 2015."
      />
    </div>
    <AiAssistantDrawer
      note-id="NOTE-GEO-DRAINAGE"
      note-title="Drainage System of India"
      :quick-prompts="aiQuickPrompts"
    />
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-GEO-DRAINAGE"
      note-title="Drainage System of India"
    />

    <!-- ══ Floating Mobile/Tablet ToC Trigger & Slideover (DEF-CRIT-08) ══ -->
    <div class="fixed bottom-6 start-6 z-20 xl:hidden">
      <UButton
        icon="i-heroicons-list-bullet"
        label="Contents"
        color="gray"
        variant="solid"
        size="sm"
        class="rounded-full shadow-lg border b-line bg-elev t-hi font-semibold min-h-[44px] px-3.5"
        @click="mobileTocOpen = true"
      />
    </div>

    <USlideover v-model="mobileTocOpen" side="left" class="xl:hidden" :ui="{ width: 'w-72 max-w-full' }">
      <div class="p-5 flex flex-col h-full bg-base">
        <div class="flex items-center justify-between pb-3 border-b b-line mb-4">
          <p class="eyebrow">On this page</p>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            size="sm"
            class="min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close table of contents"
            @click="mobileTocOpen = false"
          />
        </div>
        <nav class="space-y-1 overflow-y-auto flex-1">
          <a
            v-for="(section, i) in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition-colors min-h-[44px]"
            :class="activeSection === section.id ? 'bg-accent-soft t-hi font-semibold' : 't-lo hover:t-mid'"
            @click.prevent="mobileTocOpen = false; scrollTo(section.id)"
          >
            <span class="font-mono text-[11px]" :class="activeSection === section.id ? 'accent' : 't-lo'">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ section.label }}</span>
          </a>
        </nav>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import TableOfContents from '@/components/TableOfContents.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import type { SectionContext } from '@/types/annotations'
import { usePersonalNotes } from '@/composables/usePersonalNotes'

useHead({
  title: 'Drainage System of India - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Complete TGPRB study note: Drainage System of India with an interactive physical river map, 28 PYQs, and 10 practice questions.' }],
})

const aiQuickPrompts = useAiPromptChips('NOTE-GEO-DRAINAGE')

/* ── Personal notes ──────────────────────────────────────────────────────── */
const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

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
  { id: 'map',               label: 'The Map' },
  { id: 'introduction',     label: 'Introduction' },
  { id: 'deep-dive',        label: 'Deep Dive' },
  { id: 'data',             label: 'Data & Comparisons' },
  { id: 'memory-hacks',     label: 'Memory Hacks' },
  { id: 'pyqs',             label: 'PYQs' },
  { id: 'advanced-practice', label: 'Advanced Practice' },
  { id: 'gate',             label: 'Comprehension Gate' },
  { id: 'current-affairs',  label: 'Current Affairs' },
]

const mobileTocOpen = ref(false)
const activeSection = ref(sections[0].id)
const readProgress = ref(0)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = id
  }
}

function onScroll() {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  readProgress.value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  loadNotes()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

/* ── Stats ───────────────────────────────────────────────────────────────── */
const topStats = [
  { count: '8+', label: 'Godavari PYQs', riverKey: 'godavari' },
  { count: '5+', label: 'Narmada PYQs', riverKey: 'narmada' },
  { count: '4+', label: 'Krishna PYQs', riverKey: 'krishna' },
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
  uid?: string
  exam: string
  year: string
  river: string
  rivers: string[]
  source: string
  tag: string
  options: string[]
  correct: number
  explanation: string
  revealed: boolean
  selected: number | null
}

const pyqs = reactive<Pyq[]>([
  {
    "uid": "PYQ-0510",
    "exam": "Constable",
    "year": "2018",
    "river": "dams",
    "source": "Constable 2018 Mains \u00b7 Q89",
    "tag": "Dams & Falls",
    "question": "Matatilla Project was built on which of the following rivers?",
    "options": [
      "Mahanadi",
      "Kosi",
      "Betwa",
      "Damodar"
    ],
    "correct": 2,
    "explanation": "The Matatilla Dam project was constructed in 1958 across the Betwa River in Lalitpur district, Uttar Pradesh. It provides water for irrigation and power generation in Uttar Pradesh and Madhya Pradesh.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "mahanadi"
    ]
  },
  {
    "uid": "PYQ-0533",
    "exam": "Constable",
    "year": "2018",
    "river": "krishna",
    "source": "Constable 2018 Mains \u00b7 Q112",
    "tag": "Krishna",
    "question": "Which of the following river/s is/are not a tributary of the river Krishna? (a) Panchganga (b) Malaprabha (c) Purna (d) Pravara",
    "options": [
      "(a) only",
      "(c) only",
      "(c) and (d) only",
      "(c) and (a) only"
    ],
    "correct": 2,
    "explanation": "Panchganga and Malaprabha are major tributaries of the river Krishna. On the other hand, Purna and Pravara are tributaries of the river Godavari, making (c) and (d) the correct set of rivers that are not tributaries of Krishna.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "godavari",
      "krishna"
    ]
  },
  {
    "uid": "PYQ-0712",
    "exam": "Constable",
    "year": "2018",
    "river": "godavari",
    "source": "Constable 2018 Prelims \u00b7 Q92",
    "tag": "Godavari",
    "question": "Which of the following is the easternmost tributary of the Godavari river system?",
    "options": [
      "Pranahita",
      "Sabari",
      "Kinnerasani",
      "Indravati"
    ],
    "correct": 1,
    "explanation": "The Sabari River, which originates on the western slopes of the Eastern Ghats in Odisha, is the easternmost major tributary of the Godavari River. It flows through Odisha, Chhattisgarh, and Andhra Pradesh before joining the Godavari on its left bank near Kunavaram.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "godavari"
    ]
  },
  {
    "uid": "PYQ-0715",
    "exam": "Constable",
    "year": "2018",
    "river": "dams",
    "source": "Constable 2018 Prelims \u00b7 Q95",
    "tag": "Dams & Falls",
    "question": "Which one of the following pairs related to hydro-electricity projects and rivers is not correct?",
    "options": [
      "Salal - Tapi",
      "Tehri - Bhagirathi",
      "Dul-Hasti - Chenab",
      "Jayakwadi - Godavari"
    ],
    "correct": 0,
    "explanation": "The Salal Hydroelectric Power Station is built on the Chenab River in Jammu and Kashmir, not the Tapi River. Tehri Dam is located on the Bhagirathi River, Dul-Hasti on the Chenab River, and Jayakwadi Dam on the Godavari River.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "godavari",
      "tapi",
      "indus"
    ]
  },
  {
    "uid": "PYQ-0719",
    "exam": "Constable",
    "year": "2018",
    "river": "tapi",
    "source": "Constable 2018 Prelims \u00b7 Q99",
    "tag": "Tapi",
    "question": "Consider the following rivers in India from North to South and identify the correct sequence:\na. Mahi, b. Sabarmati, c. Tapi, d. Luni",
    "options": [
      "a, b, d, c",
      "d, b, a, c",
      "b, d, a, c",
      "d, b, c, a"
    ],
    "correct": 1,
    "explanation": "From North to South, the correct geographical order of these rivers is Luni (d) in Rajasthan, Sabarmati (b) in Rajasthan/Gujarat, Mahi (a) crossing the Tropic of Cancer twice, and Tapi (c) flowing south of Narmada. Thus, the sequence is d, b, a, c.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada",
      "tapi",
      "luni"
    ]
  },
  {
    "uid": "PYQ-0722",
    "exam": "Constable",
    "year": "2018",
    "river": "dams",
    "source": "Constable 2018 Prelims \u00b7 Q102",
    "tag": "Dams & Falls",
    "question": "'Marble Water Falls' (Dhuandhar Falls) is connected with which river ?",
    "options": [
      "Banas",
      "Periyar",
      "Tapti",
      "Narmada"
    ],
    "correct": 3,
    "explanation": "The Dhuandhar Falls, also known as the Marble Water Falls, is located on the Narmada River at Bhedaghat in Jabalpur district, Madhya Pradesh. It gets its name because the plunge of water creates a mist so fine that it looks like smoke (Dhuan).",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada"
    ]
  },
  {
    "uid": "PYQ-0735",
    "exam": "Constable",
    "year": "2018",
    "river": "godavari",
    "source": "Constable 2018 Prelims \u00b7 Q115",
    "tag": "Godavari",
    "question": "The number of states at present which fall in the catchment area of Godavari river",
    "options": [
      "8",
      "7",
      "4",
      "5"
    ],
    "correct": 1,
    "explanation": "The Godavari river basin extends across 7 states in India: Maharashtra, Telangana, Andhra Pradesh, Chhattisgarh, Madhya Pradesh, Odisha, and Karnataka (along with the Union Territory of Puducherry - Yanam).",
    "revealed": false,
    "selected": null,
    "rivers": [
      "godavari"
    ]
  },
  {
    "uid": "PYQ-0991",
    "exam": "Constable",
    "year": "2022",
    "river": "luni",
    "source": "Constable 2022 Prelims \u00b7 Q173",
    "tag": "Luni",
    "question": "The Luni river, which originates in the pushkar valley of the Aravalli range, ends in which among the following?",
    "options": [
      "As a tributary to Sabarmati",
      "Rann of Kutch",
      "Arabian sea",
      "Mt. Abu"
    ],
    "correct": 1,
    "explanation": "The Luni River originates in the Pushkar Valley of the Aravalli Range near Ajmer. It is an inland drainage system that flows southwest through the Thar Desert and dissipates into the marshy lands of the Rann of Kutch in Gujarat without reaching the sea.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "luni"
    ]
  },
  {
    "uid": "PYQ-1010",
    "exam": "Constable",
    "year": "2022",
    "river": "tapi",
    "source": "Constable 2022 Prelims \u00b7 Q192",
    "tag": "Tapi",
    "question": "Ukai dam is situated across which of the following rivers?",
    "options": [
      "Tapi",
      "Narmada",
      "Kaveri",
      "Chambal"
    ],
    "correct": 0,
    "explanation": "The Ukai Dam, constructed across the Tapi River in the Tapi district of Gujarat, is the second largest reservoir in Gujarat after the Sardar Sarovar Dam. It is an earth-cum-masonry dam used for irrigation, power generation, and flood control.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada",
      "tapi",
      "cauvery"
    ]
  },
  {
    "uid": "PYQ-1236",
    "exam": "Constable",
    "year": "2023",
    "river": "narmada",
    "source": "Constable 2023 \u00b7 Q158",
    "tag": "Narmada",
    "question": "Match the following:\nList - I\n(a) Guru Shikhar Peak\n(b) Dhuadhar waterfall\n(c) Thalghat gap\n(d) Coral reefs\nList - II\n(i) Lakshadweep islands\n(ii) Western ghats\n(iii) Narmada river\n(iv) Aravallis",
    "options": [
      "(1) (a) iv (b) iii (c) ii (d) i",
      "(2) (a) iii (b) iv (c) i (d) ii",
      "(3) (a) i (b) ii (c) iii (d) iv",
      "(4) (a) ii (b) iii (c) i (d) iv"
    ],
    "correct": 0,
    "explanation": "Guru Shikhar is the highest peak of the Aravalli Range (1,722 m). The Dhuandhar Falls are located on the Narmada River in Jabalpur, Madhya Pradesh. Thalghat is an important mountain pass located in the Western Ghats connecting Mumbai and Nashik, and the Lakshadweep Archipelago consists of coral reef islands.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada"
    ]
  },
  {
    "uid": "PYQ-1506",
    "exam": "SI",
    "year": "2016",
    "river": "narmada",
    "source": "SI 2016 \u00b7 Q63",
    "tag": "Narmada",
    "question": "Match the following\nList - I\na) Sardar Sarovar dam\nb) Highest mountain peak in South India\nc) Todas\nd) Copper\nList - II\ni) Anaimudi\nii) Agnigundala\niii) Narmada\niv) Nilgiri",
    "options": [
      "a-iv, b-ii, c-i, d-iii",
      "a-ii, b-iii, c-iv, d-i",
      "a-iii, b-i, c-iv, d-ii",
      "a-i, b-iv, c-iii, d-ii"
    ],
    "correct": 2,
    "explanation": "Sardar Sarovar Dam is constructed across the Narmada River in Gujarat. Anaimudi (2,695 m) is the highest peak in Peninsular/South India. The Toda tribe resides primarily in the Nilgiri Hills, while Agnigundala in Andhra Pradesh is famous for its copper ore deposits.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada"
    ]
  },
  {
    "uid": "PYQ-1507",
    "exam": "SI",
    "year": "2016",
    "river": "godavari",
    "source": "SI 2016 \u00b7 Q64",
    "tag": "Godavari",
    "question": "Match the following\nList - I\nRiver\na) Ganga\nb) Brahmaputra\nc) Godavari\nd) Krishna\nList - II\nTributary\ni) Bhima\nii) Wainganga\niii) Teesta\niv) Kosi",
    "options": [
      "a-iv, b-iii, c-ii, d-i",
      "a-i, b-ii, c-iii, d-iv",
      "a-iv, b-iii, c-i, d-ii",
      "a-i, b-ii, c-iv, d-iii"
    ],
    "correct": 0,
    "explanation": "Kosi is a major left-bank tributary of the Ganga; Teesta flows into the Brahmaputra; Wainganga is a prominent tributary of the Godavari river system; and Bhima is a major left-bank tributary of the Krishna river.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "godavari",
      "krishna",
      "brahmaputra"
    ]
  },
  {
    "uid": "PYQ-1511",
    "exam": "SI",
    "year": "2016",
    "river": "narmada",
    "source": "SI 2016 \u00b7 Q68",
    "tag": "Narmada",
    "question": "Match the following List - I Waterfall a) Dudhsagar b) Kapildhara c) Hogenakal d) Jog List - II River i) Mandovi ii) Narmada iii) Cauvery iv) Sharavaty",
    "options": [
      "a: iv, b: iii, c: ii, d: i",
      "a: i, b: ii, c: iii, d: iv",
      "a: iv, b: iii, c: i, d: ii",
      "a: i, b: ii, c: iv, d: iii"
    ],
    "correct": 1,
    "explanation": "Dudhsagar Falls is located on the Mandovi River in Goa, Kapildhara Falls is formed by the Narmada River in Madhya Pradesh, Hogenakal Falls is on the Cauvery River in Tamil Nadu, and Jog Falls is formed by the Sharavathi River in Karnataka.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada",
      "cauvery"
    ]
  },
  {
    "uid": "PYQ-1512",
    "exam": "SI",
    "year": "2016",
    "river": "krishna",
    "source": "SI 2016 \u00b7 Q69",
    "tag": "Krishna",
    "question": "Match the following List - I River a) Cauvery b) Narmada c) Sabarmati d) Krishna List - II Source/origin i) Brahmagiri Hills ii) Amarkantak Plateau iii) Aravalli Hills iv) Western ghats",
    "options": [
      "a: iv, b: iii, c: ii, d: i",
      "a: i, b: ii, c: iii, d: iv",
      "a: iv, b: iii, c: i, d: ii",
      "a: i, b: ii, c: iv, d: iii"
    ],
    "correct": 1,
    "explanation": "The Cauvery river originates in the Brahmagiri Hills of Karnataka, the Narmada river rises from the Amarkantak Plateau in Madhya Pradesh, the Sabarmati river originates in the Aravalli Range in Rajasthan, and the Krishna river originates near Mahabaleshwar in the Western Ghats of Maharashtra.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "krishna",
      "narmada",
      "cauvery",
      "luni"
    ]
  },
  {
    "uid": "PYQ-1513",
    "exam": "SI",
    "year": "2016",
    "river": "cauvery",
    "source": "SI 2016 \u00b7 Q70",
    "tag": "Cauvery",
    "question": "Match the following\nList - I\nProject\na) Rihind\nb) Sileru\nc) Mettur\nd) Almatti\nList - II\nState\ni) Karnataka\nii) Tamilnadu\niii) Andhra Pradesh\niv) Uttar Pradesh",
    "options": [
      "a:iv, b:iii, c:ii, d:i",
      "a:i, b:ii, c:iii, d:iv",
      "a:iv, b:iii, c:i, d:ii",
      "a:i, b:ii, c:iv, d:iii"
    ],
    "correct": 0,
    "explanation": "Rihand Project is located in Uttar Pradesh on the Rihand River; Sileru Hydroelectric Project is located in Andhra Pradesh; Mettur Dam is constructed across the Cauvery River in Tamil Nadu; and Almatti Dam is built across the Krishna River in Karnataka.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "krishna",
      "cauvery"
    ]
  },
  {
    "uid": "PYQ-1518",
    "exam": "SI",
    "year": "2016",
    "river": "brahmaputra",
    "source": "SI 2016 \u00b7 Q75",
    "tag": "Brahmaputra",
    "question": "Read the following statements\na) River Brahmaputra is an antecedent river.\nb) In Tibet, it is called as Tsangpo.\nc) The important tributaries are Shyok, Shigar.\nWhich of the above statements is/are correct",
    "options": [
      "(1) a & c",
      "(2) b & c",
      "(3) a & b",
      "(4) a, b & c"
    ],
    "correct": 2,
    "explanation": "The Brahmaputra is an antecedent river that originates in Tibet, where it is known as the Yarlung Tsangpo. Shyok and Shigar are major right-bank tributaries of the Indus River system, not the Brahmaputra.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "indus",
      "brahmaputra"
    ]
  },
  {
    "uid": "PYQ-1524",
    "exam": "SI",
    "year": "2016",
    "river": "general",
    "source": "SI 2016 \u00b7 Q81",
    "tag": "Drainage General",
    "question": "The Coast Line of India excluding Islands is approximately:",
    "options": [
      "5100 kms",
      "6100 kms",
      "7100 kms",
      "8100 kms"
    ],
    "correct": 1,
    "explanation": "The mainland coastline of India covers a distance of approximately 6,100 km. Including the island groups of Lakshadweep and Andaman & Nicobar, the total length of India's coastline extends to 7,516.6 km.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "general"
    ]
  },
  {
    "uid": "PYQ-1532",
    "exam": "SI",
    "year": "2016",
    "river": "indus",
    "source": "SI 2016 \u00b7 Q89",
    "tag": "Indus System",
    "question": "Bhakra-Nangal project is constructed on the river",
    "options": [
      "Ravi",
      "Bias",
      "Sutlej",
      "Chenab"
    ],
    "correct": 2,
    "explanation": "The Bhakra-Nangal Dam is one of India's earliest and largest multipurpose river valley projects, constructed on the Sutlej River near Bilaspur in Himachal Pradesh. The reservoir created by the dam is known as the Gobind Sagar lake.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "indus"
    ]
  },
  {
    "uid": "PYQ-1672",
    "exam": "SI",
    "year": "2016",
    "river": "cauvery",
    "source": "SI 2016 Mains \u00b7 Q70",
    "tag": "Cauvery",
    "question": "Match the following\nList - I\nProject\na) Rihind\nb) Sileru\nc) Mettur\nd) Almatti\nList - II\nState\ni) Karnataka\nii) Tamilnadu\niii) Andhra Pradesh\niv) Uttar Pradesh\nThe correct answer is",
    "options": [
      "(1) iv iii ii i",
      "(2) i ii iii iv",
      "(3) iv iii i ii",
      "(4) i ii iv iii"
    ],
    "correct": 0,
    "explanation": "Rihand Dam is situated on the Rihand River in Uttar Pradesh; Sileru project is located in Andhra Pradesh; Mettur Dam is constructed across the Kaveri River in Tamil Nadu; and Almatti Dam is a major dam on the Krishna River in Karnataka.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "krishna",
      "cauvery"
    ]
  },
  {
    "uid": "PYQ-1820",
    "exam": "SI",
    "year": "2016",
    "river": "general",
    "source": "SI 2016 Prelims \u00b7 Q152",
    "tag": "Drainage General",
    "question": "Assertion (A): West flowing rivers of peninsular India have no deltas.\nReason (R) : These rivers do not carry any alluvial sediments.\nCorrect answer is :",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true, but (R) is false",
      "(A) is false, but (R) is true"
    ],
    "correct": 2,
    "explanation": "West-flowing peninsular rivers like Narmada and Tapi form estuaries rather than deltas because they flow through hard-rock rift valleys with steep gradients. While they do carry some sediments, the strong sea currents and high flow velocity prevent delta formation, making Assertion (A) true and Reason (R) false.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada",
      "tapi"
    ]
  },
  {
    "uid": "PYQ-1890",
    "exam": "SI",
    "year": "2016",
    "river": "general",
    "source": "SI 2016 Prelims \u00b7 Q152",
    "tag": "Drainage General",
    "question": "Assertion (A): West flowing rivers of peninsular India have no deltas.\nReason (R) : These rivers do not carry any alluvial sediments.",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true, but (R) is false",
      "(A) is false, but (R) is true"
    ],
    "correct": 2,
    "explanation": "West-flowing peninsular rivers like Narmada and Tapi form estuaries instead of deltas because they flow through steep rift valleys of hard rock at high speeds. Saying they carry no sediments at all is false; they do transport sediments, but the high gradient and marine action prevent delta formation.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada",
      "tapi"
    ]
  },
  {
    "uid": "PYQ-2238",
    "exam": "SI",
    "year": "2018",
    "river": "general",
    "source": "SI 2018 Mains \u00b7 Q136",
    "tag": "Drainage General",
    "question": "In June 2018 Kerala initiated 'Water Literacy' campaign to create awareness about the importance of water conservation in the state. What are the correct statements from the following?\n(A) 70,000 students are involved.\n(B) Every student will campaign for 15 families.\n(C) Approximately 10 lakh people will be benefited knowing the importance of water, prevention of water pollution.\n(D) It is mandatory in Kerala.\nChoose the correct answer:",
    "options": [
      "(1) (A), (C), (D) only",
      "(2) (B), (D) only",
      "(3) (A), (B), (C), (D)",
      "(4) (A), (B), (C) only"
    ],
    "correct": 3,
    "explanation": "The Kerala State Literacy Mission Authority (KSLMA) launched the 'Water Literacy' campaign in June 2018. Over 70,000 instructors and equivalency students were mobilized to educate 15 families each, reaching around 10 lakh households about water conservation and pollution. The initiative was a voluntary educational drive, not mandatory by law.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "general"
    ]
  },
  {
    "uid": "PYQ-2336",
    "exam": "SI",
    "year": "2018",
    "river": "tapi",
    "source": "SI 2018 Mains \u00b7 Q99",
    "tag": "Tapi",
    "question": "Consider the following rivers in India from North to South and identify the correct sequence :\na. Mahi\nb. Sabarmati\nc. Tapi\nd. Luni",
    "options": [
      "a, b, d, c",
      "d, b, a, c",
      "b, d, a, c",
      "d, b, c, a"
    ],
    "correct": 1,
    "explanation": "Arranged from North to South, the West-flowing rivers of India are: Luni (originates in Aravallis, Rajasthan), Sabarmati (originates in Udaipur, Rajasthan), Mahi (originates in Vindhyas, MP), and Tapi (originates in Satpura range, MP). Thus, the correct sequence is Luni, Sabarmati, Mahi, Tapi (d, b, a, c).",
    "revealed": false,
    "selected": null,
    "rivers": [
      "tapi",
      "luni"
    ]
  },
  {
    "uid": "PYQ-2499",
    "exam": "SI",
    "year": "2018",
    "river": "general",
    "source": "SI 2018 Prelims \u00b7 Q149",
    "tag": "Drainage General",
    "question": "The lake Vembanad is located in:",
    "options": [
      "Malabar coast",
      "Coramandal coast",
      "Konkan coast",
      "Utkal coast"
    ],
    "correct": 0,
    "explanation": "Vembanad Lake is the longest lake in India and the largest lake in Kerala, located along the southwestern Malabar Coast. It is famous for hosting the Nehru Trophy Boat Race and forms a crucial part of Kerala's backwater network.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "general"
    ]
  },
  {
    "uid": "PYQ-2500",
    "exam": "SI",
    "year": "2018",
    "river": "general",
    "source": "SI 2018 Prelims \u00b7 Q150",
    "tag": "Drainage General",
    "question": "Assertion (A): Delta formation is not seen along the western coastal plains of India.\nReason (R): Indian western coastal plains are more broader than the eastern coastal plains.\nChoose the correct answer:",
    "options": [
      "Both (A) and (R) are individually true and (R) is the correct explanation of (A).",
      "Both (A) and (R) are individually true but (R) is not the correct explanation of (A).",
      "(A) is true and (R) is false.",
      "(A) is false but (R) is true."
    ],
    "correct": 2,
    "explanation": "Assertion (A) is true because west-flowing rivers like Narmada and Tapi flow through narrow fault valleys with high gradient, forming estuaries instead of deltas. Reason (R) is false because the Western Coastal Plains are narrow strips (approx. 50\u201380 km wide), whereas the Eastern Coastal Plains are much broader (100\u2013130 km wide) due to extensive deltaic depositions.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada",
      "tapi"
    ]
  },
  {
    "uid": "PYQ-2502",
    "exam": "SI",
    "year": "2018",
    "river": "indus",
    "source": "SI 2018 Prelims \u00b7 Q152",
    "tag": "Indus System",
    "question": "Match the following:\nList - I (Doab)\n(a) Bist\n(b) Bari\n(c) Chuj\n(d) Rechana\nList - II (Rivers)\n(i) Ravi and Chenab\n(ii) Chenab and Jhelum\n(iii) Beas and Ravi\n(iv) Beas and Sutlej\nChoose the correct answer/pairs:",
    "options": [
      "(1) (a)-(i), (b)-(iii), (c)-(iv), (d)-(ii)",
      "(2) (a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)",
      "(3) (a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(4) (a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)"
    ],
    "correct": 3,
    "explanation": "The names of the Punjab Doabs are formed using the names of the bordering rivers: Bist (Beas + Sutlej), Bari (Beas + Ravi), Chuj/Jech (Chenab + Jhelum), and Rechana (Ravi + Chenab). Therefore, the correct matching is (a)-(iv), (b)-(iii), (c)-(ii), (d)-(i).",
    "revealed": false,
    "selected": null,
    "rivers": [
      "indus"
    ]
  },
  {
    "uid": "PYQ-2508",
    "exam": "SI",
    "year": "2018",
    "river": "narmada",
    "source": "SI 2018 Prelims \u00b7 Q158",
    "tag": "Narmada",
    "question": "Read the following statements:\n(a) River Narmada flows in a rift valley.\n(b) Vindhya mountains are located to the south of river Narmada.\n(c) River Narmada is a west flowing river.\nWhich of the statements are correct?",
    "options": [
      "(a) and (b) only",
      "(a) and (c) only",
      "(b) and (c) only",
      "(a), (b) and (c)"
    ],
    "correct": 1,
    "explanation": "River Narmada flows westwards through a rift valley formed due to faulting. The Vindhya range lies to the north of the Narmada river, while the Satpura range lies to its south.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "narmada"
    ]
  },
  {
    "uid": "PYQ-2934",
    "exam": "SI",
    "year": "2023",
    "river": "dams",
    "source": "SI 2023 Mains \u00b7 Q3",
    "tag": "Dams & Falls",
    "question": "China is reportedly building a new dam on Mabja Zangbo river in Tibet at the trijunction with India and Nepal, the other side of the state _____",
    "options": [
      "Ladakh",
      "Uttarakhand",
      "Sikkim",
      "Arunachal Pradesh"
    ],
    "correct": 1,
    "explanation": "The Mabja Zangbo river originates in Tibet and flows into Nepal to form the Ghaghara (Karnali) river before entering India. China's dam on this river is located near the tri-junction of China, Nepal, and the Indian state of Uttarakhand (near Pithoragarh district).",
    "revealed": false,
    "selected": null,
    "rivers": [
      "general"
    ]
  },
  {
    "uid": "PYQ-2944",
    "exam": "SI",
    "year": "2023",
    "river": "indus",
    "source": "SI 2023 Mains \u00b7 Q13",
    "tag": "Indus System",
    "question": "Which of the following River is also known as 'Iravati'?",
    "options": [
      "Jhelum",
      "Chenab",
      "Ravi",
      "Beas"
    ],
    "correct": 2,
    "explanation": "The river Ravi was known as 'Iravati' or 'Parushni' in ancient Vedic literature. Among other Indus tributaries, Jhelum was known as Vitasta, Chenab as Asikni, Beas as Vipasa, and Sutlej as Shutudri.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "indus"
    ]
  },
  {
    "uid": "PYQ-3043",
    "exam": "SI",
    "year": "2023",
    "river": "indus",
    "source": "SI 2023 Mains \u00b7 Q114",
    "tag": "Indus System",
    "question": "Srinagar is situated on the bank of which river?",
    "options": [
      "Ravi",
      "Jhelum",
      "Beas",
      "Satlej"
    ],
    "correct": 1,
    "explanation": "Srinagar, the summer capital of Jammu and Kashmir, is situated on the banks of the Jhelum River, which is a major tributary of the Indus River. The river passes through Srinagar and flows into Wular Lake in the Kashmir Valley.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "indus"
    ]
  },
  {
    "uid": "PYQ-3118",
    "exam": "SI",
    "year": "2023",
    "river": "godavari",
    "source": "SI 2023 Mains \u00b7 Q189",
    "tag": "Godavari",
    "question": "When was the Godavari Water Disputes Tribunal headed by Justice Bachawat constituted by the central Government of India?",
    "options": [
      "April, 1969",
      "October, 1969",
      "June, 1969",
      "December, 1969"
    ],
    "correct": 0,
    "explanation": "The Godavari Water Disputes Tribunal (GWDT) was constituted by the Central Government on April 10, 1969, under the chairmanship of Justice R.S. Bachawat to resolve inter-state water sharing disputes regarding the Godavari river basin.",
    "revealed": false,
    "selected": null,
    "rivers": [
      "godavari"
    ]
  }
])

const activeExamFilter = ref<'all' | 'Constable' | 'SI'>('all')
const activeYearFilter = ref<string>('all')
const activeRiverFilter = ref<string>('all')

const riverOptions = [
  { id: 'all', label: 'All Rivers' },
  { id: 'godavari', label: 'Godavari (6+)' },
  { id: 'narmada', label: 'Narmada (11+)' },
  { id: 'krishna', label: 'Krishna (5+)' },
  { id: 'indus', label: 'Indus System (6+)' },
  { id: 'tapi', label: 'Tapi / West (7+)' },
  { id: 'cauvery', label: 'Cauvery (5+)' },
  { id: 'luni', label: 'Luni / Inland (4+)' },
]

const filteredPyqs = computed(() => {
  return pyqs.filter(q => {
    if (activeExamFilter.value !== 'all' && q.exam !== activeExamFilter.value) return false
    if (activeYearFilter.value !== 'all' && q.year !== activeYearFilter.value) return false
    if (activeRiverFilter.value !== 'all' && !q.rivers.includes(activeRiverFilter.value)) return false
    return true
  })
})

function resetPYQFilters() {
  activeExamFilter.value = 'all'
  activeYearFilter.value = 'all'
  activeRiverFilter.value = 'all'
}

function focusRiverPYQ(riverKey: string) {
  resetPYQFilters()
  activeRiverFilter.value = riverKey
  const el = document.getElementById('pyqs')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const attemptedCount = computed(() => pyqs.filter(q => q.revealed).length)
const correctCount = computed(() => pyqs.filter(q => q.revealed && q.selected === q.correct).length)

/* -- Advanced Practice: TGPSC-style hardening drills ---------------------- */
interface AdvPractice {
  uid: string
  question: string
  options: string[]
  correct: number
  explanation: string
  source: string
  format: string
  isSynthetic: boolean
  revealed: boolean
  selected: number | null
}

const advancedPractice = reactive<AdvPractice[]>([
  {
    uid: 'ADV-GEO-DRAIN-001',
    question: 'Match the following lift irrigation projects/barrage with the rivers:\n\nA. Mahatma Gandhi Kalwakurthy Lift Irrigation Project\nB. Nizam Sagar Project\nC. J. Chokka Rao Devadula Lift Irrigation Scheme\nD. Chanaka-Korata Barrage\n\nI. Godavari  II. Krishna  III. Penganga  IV. Manjeera',
    options: [
      'A-II, B-I, C-IV, D-III',
      'A-II, B-I, C-III, D-IV',
      'A-II, B-IV, C-I, D-III',
      'A-I, B-II, C-III, D-IV',
    ],
    correct: 2,
    explanation: 'Kalwakurthy LIS draws from Krishna (Srisailam foreshore). Nizam Sagar is on Manjeera River (Kamareddy). Devadula LIS lifts from Godavari at Gangaram. Chanaka-Korata Barrage is on Penganga River (Adilabad).',
    source: 'TGPSC Group-I 2024, Q101',
    format: 'Matching',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DRAIN-002',
    question: 'Consider the following statements:\n\nA. Koulasnala and Boggulavagu irrigation projects are located in the Godavari basin.\nB. Kotepally Vagu and Asif Nahar irrigation projects are located in the Krishna basin.\n\nWhich of the above statements is/are correct?',
    options: [
      'A only',
      'B only',
      'Both A and B',
      'Neither A nor B',
    ],
    correct: 2,
    explanation: 'Koulasnala (Jukkal, Kamareddy - Manjeera/Godavari) and Boggulavagu (Mancherial - Godavari basin) are Godavari projects. Kotepally Vagu (Vikarabad - Kagna/Bhima sub-basin) and Asif Nahar fall in the Krishna basin. Both statements are correct.',
    source: 'TGPSC Group-I 2024, Q71',
    format: 'Multi-statement',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DRAIN-003',
    question: 'Which of the following fluvial landforms are associated with rejuvenated topography?\n\nA. Incised meander\nB. Entrenched meander\nC. Knickpoint\nD. Natural levees\n\nChoose the correct answer:',
    options: [
      'A, B, C and D',
      'B, C and D only',
      'A, C and D only',
      'A, B and C only',
    ],
    correct: 3,
    explanation: 'Rejuvenation occurs when base level falls or land is uplifted, renewing downcutting. Incised meanders, entrenched meanders, and knickpoints are characteristic features. Natural levees are depositional features of mature/old river stages, not indicators of rejuvenation.',
    source: 'TGPSC Group-I 2024, Q62',
    format: 'Multi-statement',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DRAIN-004',
    question: 'Consider the following statements about the Godavari river system:\n\nA. It is the longest peninsular river of India at 1,465 km.\nB. Its basin covers parts of 7 states.\nC. It originates near Trimbakeshwar in Maharashtra.\nD. It drains into the Arabian Sea.\n\nWhich of the above statements are correct?',
    options: [
      'A, B and C only',
      'A and C only',
      'B, C and D only',
      'A, B, C and D',
    ],
    correct: 0,
    explanation: 'Godavari is the longest peninsular river (1,465 km), its basin spans 7 states (Maharashtra, Telangana, AP, Chhattisgarh, MP, Odisha, Karnataka), and it originates near Trimbakeshwar, Nashik. Statement D is false: Godavari drains into the Bay of Bengal, not the Arabian Sea.',
    source: 'Synthetic - derived from PYQ-0735, PYQ-0712',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DRAIN-005',
    question: 'Match the following rivers with their place of origin:\n\nA. Narmada\nB. Krishna\nC. Cauvery\nD. Godavari\n\nI. Brahmagiri Hills  II. Trimbakeshwar  III. Amarkantak  IV. Mahabaleshwar',
    options: [
      'A-III, B-IV, C-I, D-II',
      'A-IV, B-III, C-I, D-II',
      'A-III, B-I, C-IV, D-II',
      'A-III, B-IV, C-II, D-I',
    ],
    correct: 0,
    explanation: 'Narmada originates at Amarkantak (MP). Krishna originates near Mahabaleshwar (Maharashtra). Cauvery originates in Brahmagiri Hills (Karnataka). Godavari originates near Trimbakeshwar (Maharashtra).',
    source: 'Synthetic - derived from PYQ-1512',
    format: 'Matching',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
])

const advAttemptedCount = computed(() => advancedPractice.filter(q => q.revealed).length)
const advCorrectCount = computed(() => advancedPractice.filter(q => q.revealed && q.selected === q.correct).length)

function advAttempt(q: AdvPractice, optIdx: number) {
  if (q.revealed) return
  q.selected = optIdx
  q.revealed = true
}
function advReveal(q: AdvPractice) {
  q.revealed = true
}
function advOptionClass(q: AdvPractice, oi: number) {
  if (!q.revealed) return ''
  if (oi === q.correct) return 'opt-correct'
  if (oi === q.selected) return 'opt-wrong'
  return 'opt-dim'
}

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
