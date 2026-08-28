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
          <span class="t-mid">Irrigation in India</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 - High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 3–4 Questions (4–5 Marks)</span>
            <span class="chip">10 verified PYQs</span>
            <span class="chip">Geography</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Irrigation in India & Telangana
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            TGPRB Constable / SI · 2–4 direct questions per paper. Learn the 4 sources, major canal headworks, multipurpose dams, and Telangana lift irrigation schemes.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />8 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />10 practice PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~18 min read
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
            Cover all six and you have everything TGPRB has ever asked about irrigation and dams here.
            Anything outside these six is context, not exam material.
          </p>

          <!-- 2026 Predicted Question Format Callout -->
          <div class="mt-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 accent shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider accent">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Match the Following (Project ↔ River / Dam) and <strong class="t-hi">4-Statement True/False Verifications</strong> on Canal origins (Harike Barrage) and PMKSY components (Per Drop More Crop). Trap alert: Watch out for Tank vs Tube-well leading state traps.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · The Visual Architecture ────────────────────────────── -->
        <section id="visual" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">The Visual Architecture</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="visual" section-label="The Visual Architecture" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">spatial · hierarchy</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="visual" section-label="The Visual Architecture" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            Irrigation in India is spatially divided: the <strong class="t-hi">Northern Alluvial Plains</strong> rely on Wells &amp; Perennial Canals fed by Himalayan rivers; the <strong class="t-hi">Peninsular Plateau</strong> relies on Tanks &amp; Multi-Stage Lift Irrigation due to impermeable hard basalt/granite rock.
          </p>

          <!-- Master Visual Architecture Map of India -->
          <div class="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 text-center shadow-sm">
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728085/geography/india-irrigation-zones-map.webp"
              alt="India Irrigation Sources, Major Canals & Multipurpose Dam Headworks"
              class="mx-auto block w-full max-w-4xl h-auto object-contain rounded-lg"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-3 text-body-xs text-gray-500 dark:text-gray-400 font-mono">
              <span>National Irrigation Zones, Canal Networks &amp; Key Headworks</span>
              <span class="font-sans font-medium text-amber-600 dark:text-amber-400">Core TGPRB Spatial Anchor</span>
            </div>
          </div>

          <!-- Infographic Architecture Panel -->
          <div class="panel p-5 sm:p-6 mb-6">
            <div class="mb-4 flex items-center justify-between border-b b-line pb-3">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">National Irrigation Sources &amp; Canal Network Infrastructure</p>
                <p class="text-[11.5px] t-lo mt-0.5">Macro percentages, state distributions, and key engineering headworks</p>
              </div>
              <span class="chip chip-saffron chip-mono">Core Macro</span>
            </div>

            <!-- 4 Sources Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono t-lo uppercase">Source 01</span>
                  <span class="chip chip-saffron text-[10px]">Rank 1</span>
                </div>
                <p class="text-[26px] font-bold font-mono accent mt-2">62–64%</p>
                <p class="text-[13.5px] font-semibold t-hi mt-1">Wells &amp; Tube-wells</p>
                <p class="text-[11.5px] t-lo mt-1 leading-snug">Uttar Pradesh leads. Gangetic plain tube-wells + Deccan open dug wells.</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono t-lo uppercase">Source 02</span>
                  <span class="chip text-[10px]">Rank 2</span>
                </div>
                <p class="text-[26px] font-bold font-mono text-sky-500 mt-2">24–26%</p>
                <p class="text-[13.5px] font-semibold t-hi mt-1">Canals</p>
                <p class="text-[11.5px] t-lo mt-1 leading-snug">UP, Punjab, Haryana, Rajasthan. Indira Gandhi Canal (650 km from Harike).</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono t-lo uppercase">Source 03</span>
                  <span class="chip text-[10px]">South India</span>
                </div>
                <p class="text-[26px] font-bold font-mono text-amber-500 mt-2">3–4%</p>
                <p class="text-[13.5px] font-semibold t-hi mt-1">Tanks</p>
                <p class="text-[11.5px] t-lo mt-1 leading-snug">Tamil Nadu, AP, Telangana. Deccan plateau hard rock terrain &amp; natural bowls.</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono t-lo uppercase">Source 04</span>
                  <span class="chip text-[10px]">Modern</span>
                </div>
                <p class="text-[26px] font-bold font-mono text-emerald-500 mt-2">6–8%</p>
                <p class="text-[13.5px] font-semibold t-hi mt-1">Other / Lift</p>
                <p class="text-[11.5px] t-lo mt-1 leading-snug">Multi-stage lift irrigation (Kaleshwaram), springs, water harvesting.</p>
              </div>
            </div>

            <p class="mt-3 mb-4 text-body-xs t-lo font-mono">
              Source: 4th &amp; 5th Minor Irrigation Census, Ministry of Jal Shakti. Verify statistical distributions against latest official publications before exam.
            </p>

            <!-- Canal Alignment Schematic -->
            <div class="rounded-xl border b-line bg-sub p-4 text-[12.5px] space-y-2">
              <p class="font-semibold t-hi flex items-center gap-1.5">
                <UIcon name="i-heroicons-map-pin" class="h-4 w-4 accent" />
                Major Canal Take-off Headworks (High-Yield PYQ Discriminators)
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-[11.5px]">
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="accent block font-bold">Harike Barrage (Punjab)</span>
                  <span class="t-mid">Confluence of Sutlej + Beas → Indira Gandhi Canal into Thar Desert</span>
                </div>
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="text-sky-500 block font-bold">Tajewala / Hathnikund (Haryana)</span>
                  <span class="t-mid">Yamuna River → Western Yamuna Canal (Oldest North canal)</span>
                </div>
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="text-amber-500 block font-bold">Medigadda Barrage (Telangana)</span>
                  <span class="t-mid">Godavari + Pranahita → KLIP 7 links to lift 45 lakh acres uphill</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Hierarchy text summary artifact -->
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
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="introduction" section-label="Introduction" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="introduction" section-label="Introduction" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <p class="mb-5 max-w-2xl text-body leading-[1.8] t-mid">
            India has the <strong class="font-semibold t-hi">largest net irrigated area in the world</strong> (~70+ million hectares). Irrigation is indispensable for Indian agriculture because over 75% of total annual precipitation falls during just 100 to 120 days of the Southwest Monsoon, leaving the remaining 8 months dry.
          </p>

          <div class="callout callout-saffron mb-6">
            <p class="callout-title">
              <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
              Why this topic matters for TGPRB
            </p>
            <p class="callout-body">
              29 verified PYQs across Constable + SI papers (2015–2023). Expect 2–4 per paper.
              Top question types follow the coverage strip above: source percentages, dam–river–state pairs, canal origins, lift irrigation stages, and PMKSY micro-irrigation schemes.
            </p>
          </div>

          <p class="text-body leading-[1.8] t-mid">
            Historically, irrigation development evolved through three distinct eras: <strong class="t-hi">Traditional community tanks</strong> (Kakatiya and Chola era), <strong class="t-hi">Canal barrages</strong> (British colonial era like Sir Arthur Cotton's Dowleswaram Barrage), and <strong class="t-hi">Mega Multi-purpose River Valley Projects &amp; Modern Lift Irrigation</strong> (Post-independence era, Nehru's "Temples of Modern India").
          </p>
        </section>

        <!-- ── 03 · Deep Dive ──────────────────────────────────────────── -->
        <section id="deep-dive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Deep Dive</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="deep-dive" section-label="Deep Dive" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">projects · canals · telangana</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="deep-dive" section-label="Deep Dive" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <p class="mb-5 max-w-2xl text-body leading-[1.8] t-mid">
            Master the major river valley projects, canal headworks, and Telangana's lift irrigation architecture.
          </p>

          <!-- 1. Multipurpose River Valley Projects -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">1. Major Multipurpose River Valley Projects</h3>
            <p class="text-body-xs t-lo mb-3">River ↔ Project ↔ Reservoir ↔ State pairings tested in TGPRB match-the-following questions:</p>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>River</th>
                    <th>State(s)</th>
                    <th>Key Exam Superlative</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Bhakra-Nangal</td>
                    <td class="font-mono accent">Sutlej</td>
                    <td>HP, Punjab, Haryana, Rajasthan</td>
                    <td>Highest concrete gravity dam (226 m). Forms <strong class="t-hi">Govind Sagar</strong> reservoir.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Hirakud Dam</td>
                    <td class="font-mono accent">Mahanadi</td>
                    <td>Odisha (Sambalpur)</td>
                    <td><strong class="t-hi">Longest earthen dam</strong> in India (4.8 km main, 25.8 km total).</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Damodar Valley (DVC)</td>
                    <td class="font-mono accent">Damodar (Barakar, Konar)</td>
                    <td>Jharkhand &amp; West Bengal</td>
                    <td><strong class="t-hi">First multipurpose project of independent India (1948)</strong>. Modeled on USA's TVA. Dams: Tilaiya, Maithon, Panchet.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Tehri Dam</td>
                    <td class="font-mono accent">Bhagirathi</td>
                    <td>Uttarakhand</td>
                    <td><strong class="t-hi">Highest dam in India</strong> (260.5 m). Earth and rock-fill embankment dam at Bhilangna confluence.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Sardar Sarovar</td>
                    <td class="font-mono accent">Narmada</td>
                    <td>Gujarat, MP, Maharashtra, Rajasthan</td>
                    <td>Lifeline of Gujarat (Saurashtra/Kutch). Main canal length 458 km to Rajasthan border.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Nagarjuna Sagar</td>
                    <td class="font-mono accent">Krishna</td>
                    <td>Telangana (Nalgonda) &amp; AP (Palnadu)</td>
                    <td><strong class="t-hi">World's largest masonry dam</strong>. Right canal: Jawahar Canal; Left canal: Lal Bahadur Canal. Foundation laid by Pt. Nehru on 10 Dec 1955.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Tungabhadra Project</td>
                    <td class="font-mono accent">Tungabhadra</td>
                    <td>Karnataka &amp; Telangana / AP</td>
                    <td>Located at Hosapete (Pampa Sagar reservoir). Supplies Raichur and Jogulamba Gadwal.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Idukki Dam</td>
                    <td class="font-mono accent">Periyar</td>
                    <td>Kerala</td>
                    <td>Double curvature concrete <strong class="t-hi">arch dam</strong> built between Kuravan and Kurathi hills.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Rihand Project</td>
                    <td class="font-mono accent">Rihand (Son tributary)</td>
                    <td>Uttar Pradesh (Sonbhadra)</td>
                    <td>Forms <strong class="t-hi">Govind Ballabh Pant Sagar</strong>, the largest artificial reservoir in India by surface area.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Major Dams Visual Gallery Grid -->
            <div class="mt-6 border-t b-line pt-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.14em] t-lo mb-3 font-semibold">Visual Gallery · High-Yield Tested Dams &amp; Reservoirs</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Nagarjuna Sagar -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728081/geography/nagarjuna-sagar-dam.webp"
                      alt="Nagarjuna Sagar Dam across Krishna River (Telangana / AP)"
                      class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="chip chip-saffron text-[10px] mb-1">Masonry Superlative</span>
                      <h4 class="text-[13.5px] font-bold t-hi">Nagarjuna Sagar Dam</h4>
                      <p class="text-[11.5px] t-mid mt-0.5">Krishna River · World's largest masonry dam (Nalgonda/Palnadu).</p>
                    </div>
                    <p class="font-mono text-[10px] t-lo mt-2">Canals: Jawahar (Right) &amp; Lal Bahadur (Left)</p>
                  </div>
                </div>

                <!-- Bhakra Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728089/geography/bhakra-dam-sutlej.webp"
                      alt="Bhakra Dam on Sutlej River"
                      class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="chip text-[10px] mb-1">Gravity Superlative</span>
                      <h4 class="text-[13.5px] font-bold t-hi">Bhakra Dam</h4>
                      <p class="text-[11.5px] t-mid mt-0.5">Sutlej River · Highest concrete gravity dam (226 m) in India.</p>
                    </div>
                    <p class="font-mono text-[10px] t-lo mt-2">Reservoir: Govind Sagar (Himachal Pradesh)</p>
                  </div>
                </div>

                <!-- Hirakud Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728087/geography/hirakud-dam-mahanadi.webp"
                      alt="Hirakud Dam on Mahanadi River in Sambalpur Odisha"
                      class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="chip text-[10px] mb-1">Earthen Superlative</span>
                      <h4 class="text-[13.5px] font-bold t-hi">Hirakud Dam</h4>
                      <p class="text-[11.5px] t-mid mt-0.5">Mahanadi River · Longest earthen dam in India (25.8 km total).</p>
                    </div>
                    <p class="font-mono text-[10px] t-lo mt-2">Sambalpur (Odisha) · Control of Mahanadi floods</p>
                  </div>
                </div>

                <!-- Tehri Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728077/geography/tehri-dam-bhagirathi.webp"
                      alt="Tehri Dam on Bhagirathi River in Uttarakhand"
                      class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="chip chip-saffron text-[10px] mb-1">Height Superlative</span>
                      <h4 class="text-[13.5px] font-bold t-hi">Tehri Dam</h4>
                      <p class="text-[11.5px] t-mid mt-0.5">Bhagirathi River · Highest dam in India (260.5 m, Uttarakhand).</p>
                    </div>
                    <p class="font-mono text-[10px] t-lo mt-2">Confluence with Bhilangna · Rock &amp; earth fill</p>
                  </div>
                </div>

                <!-- Sardar Sarovar -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728080/geography/sardar-sarovar-dam-narmada.webp"
                      alt="Sardar Sarovar Dam on Narmada River"
                      class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="chip text-[10px] mb-1">Narmada Basin</span>
                      <h4 class="text-[13.5px] font-bold t-hi">Sardar Sarovar Dam</h4>
                      <p class="text-[11.5px] t-mid mt-0.5">Narmada River (Gujarat) · 4-state project with 458 km Main Canal.</p>
                    </div>
                    <p class="font-mono text-[10px] t-lo mt-2">Feeds drought-prone Saurashtra &amp; Kutch</p>
                  </div>
                </div>

                <!-- Idukki Arch Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728086/geography/idukki-arch-dam.webp"
                      alt="Idukki Concrete Arch Dam on Periyar River in Kerala"
                      class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="chip text-[10px] mb-1">Arch Dam</span>
                      <h4 class="text-[13.5px] font-bold t-hi">Idukki Dam</h4>
                      <p class="text-[11.5px] t-mid mt-0.5">Periyar River (Kerala) · Double curvature concrete arch dam.</p>
                    </div>
                    <p class="font-mono text-[10px] t-lo mt-2">Between Kuravan &amp; Kurathi granite hills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Major Canal Networks -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">2. Major Canal Systems of India</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip chip-saffron mb-2">Longest Canal</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Indira Gandhi Canal (Rajasthan Canal)</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  Originates from <strong class="t-hi">Harike Barrage</strong> in Punjab at the confluence of the <strong class="t-hi">Sutlej and Beas rivers</strong>. Runs ~650 km through Punjab/Haryana into Western Rajasthan (Thar Desert: Ganganagar, Bikaner, Jaisalmer, Barmer).
                </p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip mb-2">Northern Historic</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Sirhind &amp; Western Yamuna Canals</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  <strong class="t-hi">Sirhind Canal:</strong> Takes off from Sutlej at Ropar (Punjab).<br />
                  <strong class="t-hi">Western Yamuna Canal:</strong> Oldest canal in North India, originates from Tajewala/Hathnikund Barrage on the Yamuna (Haryana).
                </p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip mb-2">East Coast System</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Buckingham Canal</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  796 km long freshwater navigation and drainage canal running parallel to the Coromandel Coast from Kakinada (AP) to Viluppuram (TN). Integrated with National Waterway 4 (NW-4).
                </p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip mb-2">Delta Systems</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Dowleswaram &amp; Prakasam Barrages</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  <strong class="t-hi">Sir Arthur Cotton Barrage:</strong> Across Godavari at Rajahmundry (1852).<br />
                  <strong class="t-hi">Prakasam Barrage:</strong> Across Krishna at Vijayawada (1957).
                </p>
              </div>
            </div>

            <!-- Canal Visual Diagrams & Photos Grid -->
            <div class="border-t b-line pt-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.14em] t-lo mb-3 font-semibold">Canal Infrastructure &amp; Take-off Headworks</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Harike Barrage -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728088/geography/harike-barrage-confluence.webp"
                      alt="Harike Barrage headworks at Sutlej and Beas confluence in Punjab"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Harike Barrage (Punjab)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Origin of Indira Gandhi Canal at Sutlej + Beas confluence.</p>
                  </div>
                </div>

                <!-- Indira Gandhi Canal Route Diagram -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset flex items-center justify-center p-1 bg-white dark:bg-stone-900">
                    <img
                      src="/images/geography/indira-gandhi-canal-route.webp"
                      alt="Indira Gandhi Lift Canal schematic route and distribution branches"
                      class="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Indira Gandhi Canal Alignment</h5>
                    <p class="text-[11px] t-mid mt-0.5">Route schematic showing Feeder Canal and Lift branches in Thar.</p>
                  </div>
                </div>

                <!-- Indira Gandhi Canal in Thar Desert -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728084/geography/indira-gandhi-canal-flow.webp"
                      alt="Indira Gandhi Canal flowing through Thar Desert in Western Rajasthan"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Desert Flow (Thar)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Canal bringing perennial Himalayan waters to Jaisalmer &amp; Bikaner.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Telangana Projects -->
          <div class="panel p-5 sm:p-6 mb-6">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 class="font-display text-[16px] font-bold t-hi">3. Telangana Lift Irrigation &amp; Reservoir Systems</h3>
              <span class="chip chip-saffron chip-mono text-[10px]">Telangana Special Focus</span>
            </div>
            <p class="text-body-xs t-lo mb-4">Because Telangana sits on an elevated plateau (300m–600m MSL), multi-stage lift irrigation is the primary engineering solution:</p>

            <!-- KLIP Visual Card with Pumphouse Photo -->
            <div class="rounded-xl border b-line bg-sub overflow-hidden mb-4">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-0">
                <div class="md:col-span-5 aspect-video md:aspect-auto w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728082/geography/kaleshwaram-lakshmi-pumphouse.webp"
                    alt="Aerial view of Lakshmi Medigadda Pumphouse under Kaleshwaram Lift Irrigation Project"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="md:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <h4 class="font-display text-[16px] font-bold t-hi">Kaleshwaram Lift Irrigation Project (KLIP)</h4>
                      <span class="chip chip-mono text-[10px]">World's Largest Lift</span>
                    </div>
                    <p class="text-[12.5px] leading-relaxed t-mid">
                      Draws water from <strong class="t-hi">Godavari River</strong> at the confluence of <strong class="t-hi">Pranahita and Godavari</strong> at Kaleshwaram. Lifts water across <strong class="t-hi">7 links and 28 packages</strong> through Medigadda (Lakshmi), Annaram (Saraswati), and Sundilla (Parvati) barrages to irrigate ~45 lakh acres.
                    </p>
                  </div>
                  <div class="mt-3 grid grid-cols-3 gap-2 pt-2 border-t b-line font-mono text-[10.5px]">
                    <div>
                      <span class="t-lo block uppercase">Origin</span>
                      <span class="t-hi font-bold">Medigadda</span>
                    </div>
                    <div>
                      <span class="t-lo block uppercase">Confluence</span>
                      <span class="accent font-bold">Godavari+Pranahita</span>
                    </div>
                    <div>
                      <span class="t-lo block uppercase">Lift Height</span>
                      <span class="text-sky-500 font-bold">~536 metres</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="rounded-xl border b-line bg-sub p-4">
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Sriram Sagar Project (SRSP / Pochampad Project)</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  Constructed across <strong class="t-hi">Godavari River</strong> at Pochampad in Nizamabad district. Lifeline of North Telangana agriculture. Key canals: <strong class="t-hi">Kakatiya Canal</strong> (146 km), Saraswati Canal, and Laxmi Canal.
                </p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-4">
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Rajolibanda Diversion Scheme (RDS) &amp; Other Schemes</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  <strong class="t-hi">RDS:</strong> Anicut across <strong class="t-hi">Tungabhadra River</strong> supplying Jogulamba Gadwal and Raichur.<br />
                  <strong class="t-hi">Priyadarshini Jurala:</strong> First project on Krishna River entering Telangana (Jogulamba Gadwal).<br />
                  <strong class="t-hi">Mission Kakatiya:</strong> Flagship scheme to restore 46,531 minor irrigation chain-tanks across Telangana.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · Data & Comparisons ─────────────────────────────────── -->
        <section id="data" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Data & Comparisons</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="data" section-label="Data & Comparisons" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">comparison · efficiency</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="data" section-label="Data & Comparisons" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Micro-irrigation and precision water delivery comparison matrix:
          </p>

          <!-- Drip vs Sprinkler Table -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">Drip vs Sprinkler Micro-Irrigation</h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Drip Irrigation (Trickle)</th>
                    <th>Sprinkler Irrigation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Water Efficiency</td>
                    <td class="font-mono accent font-semibold">90–95%</td>
                    <td class="font-mono text-sky-500 font-semibold">75–85%</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Mechanism</td>
                    <td>Water drips slowly directly to root zone via emitters</td>
                    <td>Water sprayed under pressure into air like artificial rain</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Ideal Terrain & Crops</td>
                    <td>Orchards, vegetables, cash crops, flat or terraced lands</td>
                    <td>Undulating terrain, sandy soil, tea/coffee, pulses, wheat</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Key Advantages</td>
                    <td>Zero weed growth, minimal evaporation, fertiliser via fertigation</td>
                    <td>Cleans dust from leaves, frost protection, prevents soil erosion</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Leading States</td>
                    <td>Maharashtra, Andhra Pradesh, Gujarat, Karnataka</td>
                    <td>Rajasthan, Haryana, Gujarat, Madhya Pradesh</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PMKSY Scheme Details -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-2">Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)</h3>
            <p class="text-[13px] leading-relaxed t-mid mb-4">
              Launched on <strong class="t-hi">1 July 2015</strong> with the motto <em class="t-hi">"Har Khet Ko Pani"</em> and <em class="t-hi">"More Crop Per Drop"</em>. Amalgamated 4 central programs:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">1. AIBP (Accelerated Irrigation Benefit Programme)</strong>
                <p class="t-lo">Fast-tracks major and medium multi-purpose dams and national canal projects.</p>
              </div>
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">2. Har Khet Ko Pani (HKKP)</strong>
                <p class="t-lo">Command Area Development (CAD), repair and restoration of water bodies.</p>
              </div>
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">3. Per Drop More Crop (PDMC)</strong>
                <p class="t-lo">Promotes micro-irrigation technologies (Drip & Sprinkler) and precision water delivery.</p>
              </div>
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">4. Watershed Development</strong>
                <p class="t-lo">Soil & moisture conservation, check dams, rainwater harvesting, and runoff management.</p>
              </div>
            </div>
            <p class="mt-3 text-[12px] font-mono t-lo">
              * Micro Irrigation Fund (MIF): Dedicated corpus of ₹5,000 Crore established with NABARD.
            </p>
            <p class="mt-2 text-body-xs t-lo font-mono">
              Source: 4th &amp; 5th Minor Irrigation Census (Ministry of Jal Shakti) and NABARD Annual Reports. 6th Census data compilation in progress as of 2025 · verify statistical allocations before exam.
            </p>
          </div>
        </section>

        <!-- ── 05 · Memory Hacks ───────────────────────────────────────── -->
        <section id="hacks" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Memory Hacks</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="hacks" section-label="Memory Hacks" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">negative marking traps</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="hacks" section-label="Memory Hacks" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Negative marking traps designed by exam setters to induce errors:
          </p>

          <div class="space-y-4">
            <div class="callout callout-red">
              <p class="callout-title">Trap 1: Govind Sagar vs Govind Ballabh Pant Sagar</p>
              <p class="callout-body">
                • <strong class="t-hi">Govind Sagar:</strong> Formed behind <strong class="t-hi">Bhakra Dam</strong> on <strong class="t-hi">Sutlej River</strong> (Himachal Pradesh).<br />
                • <strong class="t-hi">Govind Ballabh Pant Sagar:</strong> Formed behind <strong class="t-hi">Rihand Dam</strong> on <strong class="t-hi">Rihand River</strong> (Uttar Pradesh). Largest artificial reservoir in India.
              </p>
            </div>

            <div class="callout callout-saffron">
              <p class="callout-title">Trap 2: Highest vs Longest vs Oldest Dam</p>
              <p class="callout-body">
                • <strong class="t-hi">Highest Dam:</strong> Tehri Dam on Bhagirathi (260.5 m).<br />
                • <strong class="t-hi">Highest Concrete Gravity Dam:</strong> Bhakra Dam on Sutlej (226 m).<br />
                • <strong class="t-hi">Longest Dam:</strong> Hirakud Dam on Mahanadi (25.8 km total).<br />
                • <strong class="t-hi">Oldest Dam:</strong> Kallanai Dam (Grand Anicut) on Cauvery, built by Karikala Chola (2nd century CE).
              </p>
            </div>

            <div class="callout">
              <p class="callout-title">Trap 3: Polavaram vs Kaleshwaram River Association</p>
              <p class="callout-body">
                Both mega-projects are on the <strong class="t-hi">Godavari River</strong>. However:<br />
                • <strong class="t-hi">Kaleshwaram:</strong> Multi-stage lift irrigation upstream at Medigadda (Telangana).<br />
                • <strong class="t-hi">Polavaram (Indira Sagar):</strong> Gravity dam downstream in Eluru/East Godavari (Andhra Pradesh, declared National Project under AP Reorganisation Act 2014).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 06 · PYQs ───────────────────────────────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">PYQs</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="pyqs" section-label="PYQs" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">2015–2023 verified papers</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="pyqs" section-label="PYQs" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <p class="mb-6 max-w-2xl text-body leading-[1.8] t-mid">
            Every question below appeared in an official TSLPRB Constable or SI paper.
            Click an option to test your understanding.
          </p>

          <div class="space-y-6">
            <article
              v-for="q in pyqList"
              :key="q.uid"
              class="panel p-5 sm:p-6 transition-all duration-200"
            >
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="chip chip-mono">{{ q.source }}</span>
                <span class="chip font-mono text-[10.5px]">{{ q.tag }}</span>
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
                  <span class="flex-1 text-left">{{ opt }}</span>
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
              </div>

              <button v-else type="button" class="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1" @click="reveal(q)">
                <span>Reveal answer &amp; explanation</span>
                <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
              </button>
            </article>
          </div>
        </section>

        <!-- ── 07 · Advanced Practice ───────────────────────────────────── -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="advanced-practice" section-label="Advanced Practice" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">
              {{ advancedPractice.length }} drills
              <template v-if="advAttemptedCount > 0"> · {{ advAttemptedCount }} attempted ({{ advCorrectCount }} correct)</template>
            </span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="advanced-practice" section-label="Advanced Practice" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />

          <!-- Disclaimer callout -->
          <div class="mb-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <p class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
              TGPSC-Style Advanced Practice
            </p>
            <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
              These questions use <strong class="t-hi">multi-statement, 4x4 matching, and scheme verification</strong> formats
              from recent TGPSC Group-I patterns. TGPRB papers (2022-2023) remain
              <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your policy and canal recall.
            </p>
            <p class="mt-2 text-[11.5px] font-mono t-lo">
              Source: Forensic Paper-Setting Evolution Audit, Aug 2026 - 1,350 questions classified across 7 papers.
            </p>
          </div>

          <!-- Advanced Practice Cards -->
          <div class="space-y-6">
            <article
              v-for="q in advancedPractice"
              :key="q.uid"
              class="panel p-5 sm:p-6 transition-all duration-200"
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
                  <span class="flex-1 text-left">{{ opt }}</span>
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
                  note-id="NOTE-GEO-IRRIGATION"
                  :prompt="`Explain the reasoning for this TGPSC-style irrigation question and the exam trap: ${q.question}`"
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

        <!-- ── 08 · Comprehension Gate ─────────────────────────────────── -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="gate" section-label="Comprehension Gate" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="gate" section-label="Comprehension Gate" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-GEO-IRRIGATION" />
        </section>

        <!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-GEO-IRRIGATION" section-id="current-affairs" section-label="Current Affairs" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-IRRIGATION" section-id="current-affairs" section-label="Current Affairs" note-title="Irrigation in India & Telangana" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-GEO-IRRIGATION" />
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
              :class="activeSection === section.id ? 'bg-accent-soft t-hi font-semibold' : 't-lo hover:t-mid'"
              @click.prevent="scrollTo(section.id)"
            >
              <span class="num font-mono text-[10px]" :class="activeSection === section.id ? 'accent' : 't-lo'">{{ String(i + 1).padStart(2, '0') }}</span>
              <span>{{ section.label }}</span>
            </a>
          </nav>

          <div class="mt-6 border-t b-line pt-4">
            <p class="eyebrow mb-2">Weight in paper</p>
            <p class="text-body-xs leading-relaxed t-lo">2–4 questions per paper, every year since 2015.</p>
          </div>
        </div>
      </aside>
    </div>
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-GEO-IRRIGATION"
      note-title="Irrigation in India & Telangana"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import type { SectionContext } from '@/types/annotations'
import { usePersonalNotes } from '@/composables/usePersonalNotes'

useHead({
  title: 'Irrigation in India & Telangana - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Complete TGPRB study note: Irrigation in India & Telangana with sources breakdown, multipurpose projects, canal networks, KLIP lift schemes, and verified PYQs.' }],
})

/* ── Personal notes ──────────────────────────────────────────────────────── */
const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const readProgress = ref(0)
const activeSection = ref('visual')

function onScroll() {
  const h = document.documentElement
  const b = document.body
  const st = 'scrollTop'
  const sh = 'scrollHeight'
  const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
  readProgress.value = Math.min(100, Math.max(0, percent))

  // Determine active section
  const sectionEls = sections.map(s => document.getElementById(s.id)).filter(Boolean)
  for (let i = sectionEls.length - 1; i >= 0; i--) {
    const el = sectionEls[i]
    if (el && el.getBoundingClientRect().top <= 120) {
      activeSection.value = sections[i].id
      break
    }
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  loadNotes()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const coverage = [
  { label: 'Sources Breakdown (Wells/Canals/Tanks)' },
  { label: 'Multipurpose River Valley Projects' },
  { label: 'Indira Gandhi & Major Canal Systems' },
  { label: 'Telangana Lift Irrigation & KLIP' },
  { label: 'Micro-Irrigation (Drip vs Sprinkler)' },
  { label: 'PMKSY & Government Schemes' },
]

const sections = [
  { id: 'visual',            label: 'The Visual Architecture' },
  { id: 'introduction',      label: 'Introduction' },
  { id: 'deep-dive',         label: 'Deep Dive' },
  { id: 'data',              label: 'Data & Comparisons' },
  { id: 'hacks',             label: 'Memory Hacks' },
  { id: 'pyqs',              label: 'PYQs' },
  { id: 'advanced-practice', label: 'Advanced Practice' },
  { id: 'gate',              label: 'Comprehension Gate' },
  { id: 'current-affairs',   label: 'Current Affairs' },
]

const textHierarchy = `IRRIGATION IN INDIA (Macro Sources & Distribution)
├── Wells & Tube-wells : ~62-64% (Largest share | UP leads in Tube-wells | Rajasthan, Gujarat, MP)
├── Canals             : ~24-26% (Second largest | UP leads network | Indira Gandhi Canal in Thar)
├── Tanks              : ~3-4%   (Dominant in South India | TN, AP, Telangana | Hard rock terrain)
└── Other / Lift       : ~6-8%   (Multi-stage lift irrigation like Kaleshwaram, springs, check dams)

MAJOR CANAL HEADWORKS & MULTIPURPOSE DAMS
├── Harike Barrage (Sutlej + Beas) → Indira Gandhi Canal (650 km to Thar Desert)
├── Bhakra Dam (Sutlej River)      → Govind Sagar (Highest Concrete Gravity Dam - 226 m)
├── Hirakud Dam (Mahanadi River)   → Longest Earthen Dam (25.8 km in Odisha)
├── Tehri Dam (Bhagirathi River)   → Highest Dam in India (260.5 m in Uttarakhand)
├── Sardar Sarovar (Narmada River) → Navagam Dam + 458 km Main Canal to Rajasthan
└── Nagarjuna Sagar (Krishna River)→ World's Largest Masonry Dam (Nalgonda/Palnadu)`

interface Pyq {
  uid: string
  exam: string
  year: string
  source: string
  tag: string
  question: string
  options: string[]
  correct: number
  explanation: string
  revealed: boolean
  selected: number | null
}

const pyqList = reactive<Pyq[]>([
  {
    uid: 'PYQ-1532',
    exam: 'SI',
    year: '2016',
    source: 'SI 2016 Final GS Paper · Q89',
    tag: 'Multipurpose Projects',
    question: 'Bhakra-Nangal project is constructed on the river',
    options: ['Ravi', 'Bias', 'Sutlej', 'Chenab'],
    correct: 2,
    explanation: "The Bhakra-Nangal Dam is one of India's earliest and largest multipurpose river valley projects, constructed on the Sutlej River near Bilaspur in Himachal Pradesh. The reservoir created by the dam is known as the Gobind Sagar lake.",
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0386',
    exam: 'Constable',
    year: '2015',
    source: 'Constable 2015 Prelims · Q192',
    tag: 'Telangana Schemes',
    question: "On which river is the 'Rajoli Banda Diversion Scheme' built ?",
    options: ['Krishna', 'Musi', 'Manjeera', 'Tungabhadra'],
    correct: 3,
    explanation: 'The Rajolibanda Diversion Scheme (RDS) is an inter-state anicut constructed across the Tungabhadra River. It provides irrigation water to parts of Karnataka (Raichur district) and Telangana (Jogulamba Gadwal district).',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1513',
    exam: 'SI',
    year: '2016',
    source: 'SI 2016 Final GS Paper · Q70',
    tag: 'Match Projects',
    question: 'Match the following\nList - I\nProject\na) Rihind\nb) Sileru\nc) Mettur\nd) Almatti\nList - II\nState\ni) Karnataka\nii) Tamilnadu\niii) Andhra Pradesh\niv) Uttar Pradesh',
    options: [
      'a:iv, b:iii, c:ii, d:i',
      'a:i, b:ii, c:iii, d:iv',
      'a:iv, b:iii, c:i, d:ii',
      'a:i, b:ii, c:iv, d:iii'
    ],
    correct: 0,
    explanation: 'Rihand Project is located in Uttar Pradesh on the Rihand River; Sileru Hydroelectric Project is located in Andhra Pradesh; Mettur Dam is constructed across the Cauvery River in Tamil Nadu; and Almatti Dam is built across the Krishna River in Karnataka.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-2526',
    exam: 'SI',
    year: '2018',
    source: 'SI 2018 Prelims Paper1 · Q176',
    tag: 'Historical Foundation',
    question: 'On which of the following dates did Pandit Jawaharlal Nehru laid the foundation stone for the construction of the great Nagarjuna Sagar Project?',
    options: ['1 August 1955', '11 December 1955', '1 October 1956', '1 November 1956'],
    correct: 1,
    explanation: 'Prime Minister Pandit Jawaharlal Nehru laid the foundation stone for the Nagarjuna Sagar Dam across the Krishna River in December 1955 (commemorated on 10–11 December 1955). It remains one of the largest masonry dams and vital multipurpose irrigation projects in southern India.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-2518',
    exam: 'SI',
    year: '2018',
    source: 'SI 2018 Prelims Paper1 · Q168',
    tag: 'Micro-Irrigation',
    question: "Examine the following statements: (a) The Indian Government approves corpus of ₹ 5,000 crore for setting up of 'Micro Irrigation Fund' (MIF) with NABARD under Pradhan Mantri Krishi Sinchayee Yojana (PMKSY). (b) The 'Micro Irrigation Fund' would substitute 'Per Drop More Crop' (PDMC) component of PMKSY. Choose the correct answer:",
    options: [
      'Both (a) and (b) are correct.',
      'Both (a) and (b) are incorrect.',
      'Only (a) is correct.',
      'Only (b) is correct.'
    ],
    correct: 2,
    explanation: "Statement (a) is correct as the Cabinet approved an initial corpus of ₹5,000 crore with NABARD to establish the Micro Irrigation Fund (MIF). Statement (b) is incorrect because MIF does not substitute the 'Per Drop More Crop' (PDMC) component of PMKSY; instead, it supplements and mobilizes additional financial resources to boost micro-irrigation coverage.",
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-2977',
    exam: 'SI',
    year: '2023',
    source: 'SI 2023 Mains General Studies · Q46',
    tag: 'Irrigation Superlatives',
    question: 'Which State has the largest irrigated area ?',
    options: ['Haryana', 'Punjab', 'Uttar Pradesh', 'West Bengal'],
    correct: 2,
    explanation: 'Uttar Pradesh has the largest total net and gross irrigated area in India due to its extensive network of canals and tube wells across the fertile Indo-Gangetic plain. Note that while Punjab ranks highest in terms of the percentage of cropped area under irrigation (~98%), Uttar Pradesh leads in absolute total area.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1790',
    exam: 'SI',
    year: '2016',
    source: 'SI 2016 Prelims Paper · Q121',
    tag: 'Telangana Reservoirs',
    question: 'Match the following\nList-I\n(a) Rajoliband Diversion Scheme\n(b) Sriram Sagar Dam\n(c) Lower Manair Dam\n(d) Kadam Reservoir\nList-II\n(i) Karimnagar\n(ii) Adilabad\n(iii) Mahabubnagar\n(iv) Nizamabad',
    options: [
      '(1) (i) (ii) (iii) (iv)',
      '(2) (iii) (iv) (i) (ii)',
      '(3) (iv) (iii) (ii) (i)',
      '(4) (iii) (iv) (ii) (i)'
    ],
    correct: 1,
    explanation: 'Rajoliband Diversion Scheme is located in undivided Mahabubnagar (Gadwal), Sriram Sagar Dam in Nizamabad (Pochampad), Lower Manair Dam in Karimnagar, and Kadam Reservoir in Adilabad (Nirmal district). Thus, the correct sequence matching (a)-(b)-(c)-(d) is (iii)-(iv)-(i)-(ii).',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0510',
    exam: 'Constable',
    year: '2018',
    source: 'Constable 2018 Mains · Q89',
    tag: 'River Projects',
    question: 'Matatilla Project was built on which of the following rivers?',
    options: ['Mahanadi', 'Kosi', 'Betwa', 'Damodar'],
    correct: 2,
    explanation: 'The Matatilla Dam project was constructed in 1958 across the Betwa River in Lalitpur district, Uttar Pradesh. It provides water for irrigation and power generation in Uttar Pradesh and Madhya Pradesh.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1506',
    exam: 'SI',
    year: '2016',
    source: 'SI 2016 Final GS Paper · Q63',
    tag: 'Projects & Geography',
    question: 'Match the following\nList - I\na) Sardar Sarovar dam\nb) Highest mountain peak in South India\nc) Todas\nd) Copper\nList - II\ni) Anaimudi\nii) Agnigundala\niii) Narmada\niv) Nilgiri',
    options: [
      'a-iv, b-ii, c-i, d-iii',
      'a-ii, b-iii, c-iv, d-i',
      'a-iii, b-i, c-iv, d-ii',
      'a-i, b-iv, c-iii, d-ii'
    ],
    correct: 2,
    explanation: 'Sardar Sarovar Dam is constructed across the Narmada River in Gujarat. Anaimudi (2,695 m) is the highest peak in Peninsular/South India. The Toda tribe resides primarily in the Nilgiri Hills, while Agnigundala in Andhra Pradesh is famous for its copper ore deposits.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1010',
    exam: 'Constable',
    year: '2022',
    source: 'Constable 2022 Prelims · Q192',
    tag: 'Dam & River Matching',
    question: 'Ukai dam is situated across which of the following rivers?',
    options: ['Tapi', 'Narmada', 'Kaveri', 'Chambal'],
    correct: 0,
    explanation: 'The Ukai Dam, constructed across the Tapi River in the Tapi district of Gujarat, is the second largest reservoir in Gujarat after the Sardar Sarovar Dam. It is an earth-cum-masonry dam used for irrigation, power generation, and flood control.',
    revealed: false,
    selected: null
  }
])

/* ── Advanced Practice: TGPSC-style hardening drills ────────────────────── */
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
    uid: 'ADV-GEO-IRR-001',
    question: 'Match the following lift irrigation projects/barrage with the rivers:\n\nList I (Project/Barrage):\nA. Mahatma Gandhi Kalwakurthy Lift Irrigation Project\nB. Nizam Sagar Project\nC. J. Chokka Rao Devadula Lift Irrigation Scheme\nD. Chanaka-Korata Barrage\n\nList II (River):\nI. Godavari\nII. Krishna\nIII. Penganga\nIV. Manjeera\n\nChoose the correct answer:',
    options: [
      'A-II, B-I, C-IV, D-III',
      'A-II, B-I, C-III, D-IV',
      'A-II, B-IV, C-I, D-III',
      'A-I, B-II, C-III, D-IV'
    ],
    correct: 2,
    explanation: 'Kalwakurthy LIS draws from Krishna River (A-II). Nizam Sagar is on Manjeera River in Kamareddy (B-IV). Devadula LIS lifts water from Godavari at Gangaram (C-I). Chanaka-Korata Barrage is on Penganga River in Adilabad (D-III).',
    source: 'TGPSC Group-I 2024, Q101',
    format: 'Matching',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-IRR-002',
    question: 'Consider the following statements regarding Telangana irrigation projects:\n\nA. Koulasnala and Boggulavagu irrigation projects are located in the Godavari basin.\nB. Kotepally Vagu and Asif Nahar irrigation projects are located in the Krishna basin.\n\nWhich of the above statements is/are correct?',
    options: [
      'A only',
      'B only',
      'Both A and B',
      'Neither A nor B'
    ],
    correct: 2,
    explanation: 'Koulasnala (Kamareddy - Manjeera/Godavari) and Boggulavagu (Mancherial - Godavari basin) are Godavari projects. Kotepally Vagu (Vikarabad - Kagna/Krishna) and Asif Nahar fall in Krishna basin. Both statements are correct.',
    source: 'TGPSC Group-I 2024, Q71',
    format: 'Multi-statement',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-IRR-003',
    question: 'Jal Jeevan Mission is a Government of India programme. Which of the following statements are correct about Jal Jeevan Mission?\n\nA. \'Har Ghar Jal\' initiative was launched in 2019.\nB. Goa became the first certified Har Ghar Jal State in August 2022.\nC. Har Ghar Jal initiative is set to provide all rural households with safe drinking water through taps by 2025.\nD. More than 73.7% households are reported to have tap water supply as on 30.01.2024.\n\nChoose the correct answer:',
    options: [
      'A and B only',
      'A, B and C only',
      'A, B and D only',
      'A, C and D only'
    ],
    correct: 2,
    explanation: 'Statements A, B, and D are factually correct. Statement C is false because the original mission target deadline was 2024, not 2025.',
    source: 'TGPSC Group-I 2024, Q36',
    format: 'Multi-statement',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-IRR-004',
    question: 'Which of the following statements regarding the sources of irrigation in India are correct?\n\nA. Tube-wells and other wells constitute the largest source of net irrigated area in India (~62-64%).\nB. Canals form the second largest source of irrigation (~24-26%), with Uttar Pradesh possessing the largest canal network.\nC. Tank irrigation is predominantly practiced in the Peninsular region due to hard crystalline non-porous rock terrain.\nD. Micro-irrigation (Drip and Sprinkler) is promoted under the \'Per Drop More Crop\' component of PMKSY.\n\nChoose the correct answer:',
    options: [
      'A, B, C and D',
      'A, B and C only',
      'B, C and D only',
      'A and B only'
    ],
    correct: 0,
    explanation: 'All four statements are verified factual principles from Ministry of Jal Shakti reports and NCERT irrigation geography.',
    source: 'Synthetic - derived from National Irrigation Census & PYQ inventory',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-IRR-005',
    question: 'Match the following major canal systems with their headworks/source rivers:\n\nList I (Canal System):\nA. Indira Gandhi Canal\nB. Buckingham Canal\nC. Sirhind Canal\nD. Kurnool-Cuddapah (K-C) Canal\n\nList II (Headworks / Source):\nI. Sutlej River at Ropar (Punjab)\nII. Sunkesula Barrage on Tungabhadra River\nIII. Harike Barrage at Sutlej-Beas confluence\nIV. Saltwater navigation canal along AP/TN coast',
    options: [
      'A-III, B-IV, C-I, D-II',
      'A-III, B-I, C-IV, D-II',
      'A-I, B-IV, C-III, D-II',
      'A-III, B-IV, C-II, D-I'
    ],
    correct: 0,
    explanation: 'Indira Gandhi Canal takes off from Harike Barrage (III). Buckingham Canal is a historic coastal canal in AP/TN (IV). Sirhind Canal originates at Ropar from Sutlej (I). K-C Canal originates from Sunkesula Barrage on Tungabhadra (II).',
    source: 'Synthetic - derived from canal systems inventory',
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

function attempt(q: Pyq, oi: number) {
  if (q.revealed) return
  q.selected = oi
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
