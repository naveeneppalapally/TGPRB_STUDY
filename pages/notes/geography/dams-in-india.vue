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
          <span class="t-mid">Dams in India</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 - High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 2-3 Questions (3-4 Marks)</span>
            <span class="chip">22 verified PYQs</span>
            <span class="chip">Geography</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Dams, Reservoirs &amp; Multipurpose Projects of India
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            TGPRB Constable / SI · 2-3 direct questions per paper. Master India's river valley projects, national superlative dams (Tehri, Bhakra, Hirakud), river ↔ state alignments, DVC, Dam Safety Act, and Telangana's historical &amp; modern projects.
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
            Cover all six dimensions to master every exam question asked on dams, reservoirs, barrages, and hydro-electric projects.
          </p>

          <!-- 2026 Predicted Question Format Callout -->
          <div class="mt-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 accent shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider accent">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> <strong class="t-hi">Match the Following</strong> (Dam ↔ River ↔ State, e.g., Matatilla on Betwa, Ukai on Tapi, Mettur on Cauvery, Almatti on Krishna) and <strong class="t-hi">Superlative Pairs</strong> (Highest: Tehri vs Highest Gravity: Bhakra; Longest: Hirakud). Watch out for <strong class="t-hi">Nawab Ali Nawaz Jung</strong> contributions in Hyderabad State.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · The Visual Architecture ────────────────────────────── -->
        <section id="visual" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">The Visual Architecture</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">macro projects · river basins</span>
          </header>

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            Jawaharlal Nehru famously hailed multipurpose river valley projects as the <strong class="t-hi">"Temples of Modern India"</strong>. Dams in India serve integrated functions: flood control, canal irrigation, hydroelectricity generation, navigation, and municipal water supply.
          </p>

          <!-- Primary National Spatial Anchor: Major Rivers and Dams of India Map -->
          <div class="mb-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm">
            <div class="mb-3 flex items-center justify-between border-b b-line pb-2.5">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">Master River Basin &amp; Dam Locator Map of India</p>
                <p class="text-[11.5px] t-lo mt-0.5">High-yield spatial alignment: Indus, Ganga, Narmada, Tapi, Mahanadi, Godavari, Krishna, and Cauvery projects</p>
              </div>
              <span class="chip chip-saffron chip-mono">Primary Spatial Anchor</span>
            </div>
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786733957/geography/major-rivers-and-dams-india-map.webp"
              alt="Major Rivers and Dams in India showing Tehri, Bhakra Nangal, Hirakud, Sardar Sarovar, Nagarjuna Sagar, Srisailam, Mettur, and DVC project alignments"
              class="mx-auto block w-full h-auto max-h-[700px] object-contain rounded-lg bg-inset"
              loading="eager"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-3 text-body-xs text-gray-500 dark:text-gray-400 font-mono">
              <span>Source: Survey of India &amp; Central Water Commission Basin Architecture</span>
              <span class="font-sans font-medium text-amber-600 dark:text-amber-400">Essential Spatial Reference for TGPRB River Valley Questions</span>
            </div>
          </div>

          <!-- Major Superlative Dams Visual Grid -->
          <div class="panel p-5 sm:p-6 mb-6">
            <div class="mb-4 flex items-center justify-between border-b b-line pb-3">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">National Superlative Dam Architectures</p>
                <p class="text-[11.5px] t-lo mt-0.5">Highest, Longest, Largest, and Oldest Engineering Landmarks</p>
              </div>
              <span class="chip chip-saffron chip-mono">Core Superlatives</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <!-- Tehri Dam -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786732871/geography/tehri-dam-uttarakhand.webp"
                    alt="Tehri Dam in Uttarakhand on Bhagirathi river"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip chip-saffron text-[10px] mb-1">260.5 m · Highest Dam</span>
                    <h5 class="text-[13px] font-bold t-hi">Tehri Dam (Uttarakhand)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Bhagirathi River · Highest rock-fill earth dam in India.</p>
                  </div>
                </div>
              </div>

              <!-- Bhakra Nangal Dam -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786732880/geography/bhakra-nangal-dam-sutlej.webp"
                    alt="Bhakra Dam on Sutlej River"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip text-[10px] mb-1">226 m · Straight Gravity</span>
                    <h5 class="text-[13px] font-bold t-hi">Bhakra Dam (HP / Punjab)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Sutlej River · Gobind Sagar reservoir · 2nd tallest.</p>
                  </div>
                </div>
              </div>

              <!-- Hirakud Dam -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728087/geography/hirakud-dam-mahanadi.webp"
                    alt="Hirakud Dam on Mahanadi river in Odisha"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip chip-saffron text-[10px] mb-1">25.8 km · Longest Dam</span>
                    <h5 class="text-[13px] font-bold t-hi">Hirakud Dam (Odisha)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Mahanadi River · Longest composite earthen dam in the world.</p>
                  </div>
                </div>
              </div>

              <!-- Sardar Sarovar -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786728080/geography/sardar-sarovar-dam-narmada.webp"
                    alt="Sardar Sarovar Dam on Narmada River"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip text-[10px] mb-1">163 m · Gravity Dam</span>
                    <h5 class="text-[13px] font-bold t-hi">Sardar Sarovar (Gujarat)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Narmada River · Terminal reservoir of Narmada Valley Project.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Southern & Peninsular Landmarks Gallery -->
            <div class="border-t b-line pt-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.14em] t-lo mb-3 font-semibold">Peninsular &amp; South Indian Landmarks</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Nagarjuna Sagar -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786732874/geography/nagarjuna-sagar-dam-krishna.webp"
                      alt="Nagarjuna Sagar Dam on Krishna River"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">Masonry Giant</span>
                    <h5 class="text-[13px] font-bold t-hi">Nagarjuna Sagar (TG/AP)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Krishna River · World's largest masonry dam with 26 crest gates.</p>
                  </div>
                </div>

                <!-- Idukki Arch Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786732877/geography/idukki-arch-dam-kerala.webp"
                      alt="Idukki Double Curvature Arch Dam in Kerala"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">168.9 m · Arch Dam</span>
                    <h5 class="text-[13px] font-bold t-hi">Idukki Dam (Kerala)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Periyar River · Double-curvature thin arch between Kuravan hills.</p>
                  </div>
                </div>

                <!-- Mettur Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786732876/geography/mettur-dam-cauvery.webp"
                      alt="Mettur Dam on Cauvery river in Tamil Nadu"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">Stanley Reservoir</span>
                    <h5 class="text-[13px] font-bold t-hi">Mettur Dam (Tamil Nadu)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Cauvery River (1934) · Lifeline of Cauvery Delta agriculture.</p>
                  </div>
                </div>

                <!-- Srisailam Dam -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786732872/geography/srisailam-dam-krishna.webp"
                      alt="Srisailam Dam on Krishna River gorge"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">Deep Gorge Dam</span>
                    <h5 class="text-[13px] font-bold t-hi">Srisailam Dam (AP/TG)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Krishna River gorge · 2nd largest working hydroelectric capacity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hierarchy text summary artifact -->
          <div class="artifact overflow-hidden">
            <div class="flex items-center justify-between border-b border-[var(--ink-card-line)] px-5 py-3">
              <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a89f8d]">
                Dams &amp; Basins Hierarchy at a glance
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
            India ranks <strong class="t-hi">third globally in operational large dams</strong> (over 5,334 large dams), trailing only China and the United States. Multipurpose river valley projects constitute the backbone of India's agrarian economy, power grid stability, and disaster resilience against droughts and floods.
          </p>

          <div class="callout callout-saffron mb-6">
            <p class="callout-title">
              <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
              Why this topic matters for TGPRB
            </p>
            <p class="callout-body">
              22 verified PYQs across Constable and SI papers. Questions consistently target: matching dams to their rivers and states (e.g., Ukai to Tapi, Matatilla to Betwa, Almatti to Krishna, Salal to Chenab), identifying national superlatives (Tehri vs Bhakra vs Hirakud), and recognizing historical contributions such as <strong class="t-hi">Nawab Ali Nawaz Jung Bahadur</strong> (Chief Engineer of Hyderabad State) and the Damodar Valley Corporation (DVC).
            </p>
          </div>

          <p class="text-body leading-[1.8] t-mid">
            The Damodar Valley Corporation (DVC), launched in <strong class="t-hi">1948</strong>, was the first multipurpose river valley project of independent India, modeled after the Tennessee Valley Authority (TVA) in the United States. In Southern India, irrigation and dam engineering reached monumental heights during both the Kakatiya/Nizam eras (tanks and masonry works) and post-independence river development (Nagarjuna Sagar, Srisailam, Sriram Sagar, and the Kaleshwaram barrage network).
          </p>
        </section>

        <!-- ── 03 · Deep Dive ──────────────────────────────────────────── -->
        <section id="deep-dive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Deep Dive</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">river directories · state projects · engineering landmarks</span>
          </header>

          <p class="mb-5 max-w-2xl text-body leading-[1.8] t-mid">
            Master the complete river basin directory of dams, state associations, and historical milestones.
          </p>

          <!-- 1. National Superlative Dams Analysis -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">1. Key Superlative Dams &amp; Architectural Types</h3>
            
            <div class="space-y-4 mb-4">
              <!-- Tehri Dam -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">Tehri Dam (Uttarakhand) · Highest Dam in India</h4>
                  <span class="chip chip-saffron chip-mono text-[10px]">Height: 260.5 m (855 ft)</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  Constructed on the <strong class="t-hi">Bhagirathi River</strong> in the Garhwal Himalayas near New Tehri. It is an earth-and-rockfill embankment dam with an installed hydroelectric capacity of 2,400 MW (including a 1,000 MW pumped-storage plant). Reservoir name: <strong class="t-hi">Swami Ram Tirtha Sagar</strong>.
                </p>
              </div>

              <!-- Bhakra Nangal Dam -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">Bhakra-Nangal Project (Himachal Pradesh / Punjab)</h4>
                  <span class="chip chip-mono text-[10px]">Height: 226 m · Highest Straight Gravity Dam</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  Constructed across the <strong class="t-hi">Sutlej River</strong> in Bilaspur, Himachal Pradesh. The reservoir formed by Bhakra Dam is <strong class="t-hi">Gobind Sagar</strong> (named after Guru Gobind Singh, 3rd largest reservoir in India by volume). Nangal Dam is a subsidiary barrage located 13 km downstream in Punjab to divert water into the Bhakra Canal System.
                </p>
              </div>

              <!-- Hirakud Dam -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">Hirakud Dam (Odisha) · Longest Dam in the World</h4>
                  <span class="chip chip-saffron chip-mono text-[10px]">Total Length: 25.8 km</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  Built across the <strong class="t-hi">Mahanadi River</strong> in Sambalpur district, Odisha (1957). The main dam spans 4.8 km between two hills (Laxmi Dungri on left and Chandili Dungri on right), flanked by 21 km of earthen dykes. Tamed the "Sorrow of Odisha" and created Asia's largest artificial lake.
                </p>
              </div>

              <!-- Nagarjuna Sagar Dam -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">Nagarjuna Sagar Dam (Telangana / Andhra Pradesh)</h4>
                  <span class="chip chip-mono text-[10px]">Height: 124 m · Largest Masonry Dam</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  Constructed across the <strong class="t-hi">Krishna River</strong> straddling Nalgonda (Telangana) and Palnadu/Guntur (AP) districts (1967). Built with stone masonry rather than concrete. Has 26 radial crest gates. Its two major main canals are named <strong class="t-hi">Jawahar Canal</strong> (Right canal) and <strong class="t-hi">Lal Bahadur Canal</strong> (Left canal).
                </p>
              </div>
            </div>
          </div>

          <!-- 2. River Basin-Wise Comprehensive Directory -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">2. Basin-Wise Master Directory of Major Dams &amp; Projects</h3>
            <p class="text-body-xs t-lo mb-3">High-yield project ↔ river ↔ state mappings tested in TGPRB questions:</p>

            <div class="overflow-x-auto mb-6">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>River Basin</th>
                    <th>Project / Dam Name</th>
                    <th>River</th>
                    <th>State / UT</th>
                    <th>Key Distinction</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Indus Basin -->
                  <tr>
                    <td rowspan="5" class="cell-key">Indus Basin</td>
                    <td class="font-semibold t-hi">Bhakra Dam</td>
                    <td class="font-mono accent">Sutlej</td>
                    <td>Himachal Pradesh</td>
                    <td>Gobind Sagar reservoir; 226 m high straight gravity</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Pong Dam (Beas Dam)</td>
                    <td class="font-mono accent">Beas</td>
                    <td>Himachal Pradesh</td>
                    <td>Maharana Pratap Sagar; Ramsar wetland</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Thein Dam (Ranjit Sagar)</td>
                    <td class="font-mono accent">Ravi</td>
                    <td>Punjab / J&amp;K</td>
                    <td>Ranjit Sagar reservoir on Ravi gorge</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Salal, Baglihar, Dulhasti</td>
                    <td class="font-mono accent">Chenab</td>
                    <td>Jammu &amp; Kashmir</td>
                    <td>Run-of-the-river hydroelectric stations on Chenab</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Uri &amp; Kishanganga</td>
                    <td class="font-mono accent">Jhelum &amp; Kishanganga</td>
                    <td>Jammu &amp; Kashmir</td>
                    <td>Kishanganga is a tributary of Jhelum (Neelum)</td>
                  </tr>

                  <!-- Ganga Basin -->
                  <tr>
                    <td rowspan="6" class="cell-key">Ganga Basin</td>
                    <td class="font-semibold t-hi">Tehri Dam</td>
                    <td class="font-mono accent">Bhagirathi</td>
                    <td>Uttarakhand</td>
                    <td>Highest dam in India (260.5 m)</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Rihand Dam</td>
                    <td class="font-mono accent">Rihand (Son tributary)</td>
                    <td>Uttar Pradesh (Sonbhadra)</td>
                    <td><strong class="t-hi">Govind Ballabh Pant Sagar</strong> (largest artificial reservoir by volume in India)</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Matatilla &amp; Rajghat</td>
                    <td class="font-mono accent">Betwa</td>
                    <td>UP / MP border</td>
                    <td>Joint multipurpose venture in Bundelkhand</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Gandhi Sagar, Rana Pratap, Jawahar Sagar</td>
                    <td class="font-mono accent">Chambal</td>
                    <td>MP &amp; Rajasthan</td>
                    <td>Chambal Valley project cascade (Gandhi Sagar in MP; others in RJ)</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Bansagar Dam</td>
                    <td class="font-mono accent">Son</td>
                    <td>Madhya Pradesh</td>
                    <td>Joint project of MP, UP, and Bihar on Son river</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Farakka Barrage</td>
                    <td class="font-mono accent">Ganga</td>
                    <td>West Bengal (Murshidabad)</td>
                    <td>Diverts water into Bhagirathi-Hooghly to flush Kolkata Port</td>
                  </tr>

                  <!-- Damodar Valley -->
                  <tr>
                    <td rowspan="2" class="cell-key">Damodar Valley</td>
                    <td class="font-semibold t-hi">Tilaiya &amp; Maithon Dams</td>
                    <td class="font-mono accent">Barakar (Damodar tributary)</td>
                    <td>Jharkhand</td>
                    <td>Under Damodar Valley Corporation (DVC - 1948)</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Panchet &amp; Konar Dams</td>
                    <td class="font-mono accent">Damodar &amp; Konar</td>
                    <td>Jharkhand</td>
                    <td>DVC multipurpose flood control &amp; thermal power network</td>
                  </tr>

                  <!-- Narmada & Tapi -->
                  <tr>
                    <td rowspan="3" class="cell-key">Central West-Flowing</td>
                    <td class="font-semibold t-hi">Sardar Sarovar Dam</td>
                    <td class="font-mono accent">Narmada</td>
                    <td>Gujarat (Navagam)</td>
                    <td>Key terminal dam; feeds Narmada Main Canal</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Indira Sagar Dam</td>
                    <td class="font-mono accent">Narmada</td>
                    <td>Madhya Pradesh (Khandwa)</td>
                    <td>Largest water storage capacity in India (12.22 billion m³)</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Ukai Dam &amp; Kakrapar</td>
                    <td class="font-mono accent">Tapi</td>
                    <td>Gujarat (Surat / Tapi)</td>
                    <td>Ukai reservoir also known as <strong class="t-hi">Vallabh Sagar</strong></td>
                  </tr>

                  <!-- Godavari Basin -->
                  <tr>
                    <td rowspan="3" class="cell-key">Godavari Basin</td>
                    <td class="font-semibold t-hi">Sriram Sagar Project (SRSP)</td>
                    <td class="font-mono accent">Godavari</td>
                    <td>Telangana (Nizamabad)</td>
                    <td>Pochampadu project; lifeline of North Telangana</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Kaleshwaram Barrages</td>
                    <td class="font-mono accent">Godavari</td>
                    <td>Telangana (Jayashankar Bhupalpally)</td>
                    <td>Medigadda (Lakshmi), Annaram (Saraswati), Sundilla (Parvati)</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Polavaram Project</td>
                    <td class="font-mono accent">Godavari</td>
                    <td>Andhra Pradesh (Eluru)</td>
                    <td>National Project under AP Reorganisation Act 2014</td>
                  </tr>

                  <!-- Krishna Basin -->
                  <tr>
                    <td rowspan="4" class="cell-key">Krishna Basin</td>
                    <td class="font-semibold t-hi">Almatti Dam (Lal Bahadur Shastri)</td>
                    <td class="font-mono accent">Krishna</td>
                    <td>Karnataka (Bagalkot)</td>
                    <td>Upper Krishna Project reservoir</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Srisailam Dam</td>
                    <td class="font-mono accent">Krishna</td>
                    <td>AP (Nandyal) / Telangana</td>
                    <td>Deep gorge dam; major hydro power generating station</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Nagarjuna Sagar Dam</td>
                    <td class="font-mono accent">Krishna</td>
                    <td>Telangana / AP</td>
                    <td>World's largest masonry dam; Jawahar &amp; Lal Bahadur canals</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Tungabhadra Dam</td>
                    <td class="font-mono accent">Tungabhadra</td>
                    <td>Karnataka (Hosapete)</td>
                    <td>Pampa Sagar reservoir; joint project with AP/Telangana</td>
                  </tr>

                  <!-- Cauvery Basin -->
                  <tr>
                    <td rowspan="3" class="cell-key">Cauvery Basin</td>
                    <td class="font-semibold t-hi">Krishna Raja Sagara (KRS)</td>
                    <td class="font-mono accent">Cauvery</td>
                    <td>Karnataka (Mandya)</td>
                    <td>Designed by Sir M. Visvesvaraya; hosts Brindavan Gardens</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Mettur Dam (Stanley Reservoir)</td>
                    <td class="font-mono accent">Cauvery</td>
                    <td>Tamil Nadu (Salem)</td>
                    <td>Built in 1934 across Cauvery gorge in Tamil Nadu</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Kallanai (Grand Anicut)</td>
                    <td class="font-mono accent">Cauvery</td>
                    <td>Tamil Nadu (Thanjavur)</td>
                    <td>Built by <strong class="t-hi">King Karikala Chola (2nd century CE)</strong>; oldest surviving water-diversion structure in India</td>
                  </tr>

                  <!-- Kerala & West Coast -->
                  <tr>
                    <td rowspan="2" class="cell-key">Kerala &amp; West Coast</td>
                    <td class="font-semibold t-hi">Idukki Dam</td>
                    <td class="font-mono accent">Periyar</td>
                    <td>Kerala (Idukki)</td>
                    <td>Double-curvature concrete arch dam between Kuravan &amp; Kurathi hills</td>
                  </tr>
                  <tr>
                    <td class="font-semibold t-hi">Mullaperiyar Dam</td>
                    <td class="font-mono accent">Periyar</td>
                    <td>Kerala (operated by Tamil Nadu)</td>
                    <td>Built in 1895 by John Pennycuick; subject of inter-state dispute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 3. Telangana Historical & Modern Water Architecture -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">3. Telangana Water Architecture: Nawab Ali Nawaz Jung to Kaleshwaram</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <!-- Nawab Ali Nawaz Jung Bahadur -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip chip-saffron mb-2">Legendary Chief Engineer</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Nawab Ali Nawaz Jung Bahadur (1877-1949)</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  Chief Engineer of Hyderabad State under the 7th Nizam Mir Osman Ali Khan. Designed monumental irrigation works: <strong class="t-hi">Nizam Sagar Dam</strong> on Manjeera River (1931), <strong class="t-hi">Osmansagar (Gandipet)</strong> and <strong class="t-hi">Himayatsagar</strong> reservoirs on Musi &amp; Esi rivers for Hyderabad flood protection, and the <strong class="t-hi">Rajoli Banda Diversion Scheme (RDS)</strong> on Tungabhadra River.
                </p>
                <div class="mt-2.5 p-2.5 rounded-lg bg-inset border b-line text-[11.5px] font-mono accent">
                  Telangana State celebrates Engineers Day on July 11 (his birth anniversary).
                </div>
              </div>

              <!-- Kaleshwaram Lift Irrigation Network -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip mb-2">Modern Mega Lift System</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Kaleshwaram Lift Barrage Network</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  Constructed at the confluence of Godavari and Pranahita rivers. Consists of 3 major barrages: <strong class="t-hi">Medigadda (Lakshmi) Barrage</strong>, <strong class="t-hi">Annaram (Saraswati) Barrage</strong>, and <strong class="t-hi">Sundilla (Parvati) Barrage</strong>. Water is lifted through massive underground surge pools to reservoirs including Mid Manair, Lower Manair, Kondapochamma Sagar, and Mallanna Sagar.
                </p>
                <div class="mt-2.5 p-2.5 rounded-lg bg-inset border b-line text-[11.5px] font-mono text-sky-500">
                  Inaugurated in June 2019 by Governor E.S.L. Narasimhan alongside CMs of TG, AP, and MH.
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · Data & Comparisons ─────────────────────────────────── -->
        <section id="data" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Data &amp; Comparisons</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">superlative matrix · inter-state disputes</span>
          </header>

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Consolidated comparison of India's major dam records and inter-state river project disputes:
          </p>

          <!-- Superlative Matrix -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">Dam Superlatives of India: Master Examination Matrix</h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Superlative Category</th>
                    <th>Dam Name</th>
                    <th>River</th>
                    <th>State</th>
                    <th>Key Metric</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Highest Dam in India</td>
                    <td class="font-mono accent font-semibold">Tehri Dam</td>
                    <td>Bhagirathi</td>
                    <td>Uttarakhand</td>
                    <td class="cell-num">260.5 metres</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Highest Straight Gravity Dam</td>
                    <td class="font-mono accent font-semibold">Bhakra Dam</td>
                    <td>Sutlej</td>
                    <td>Himachal Pradesh</td>
                    <td class="cell-num">226 metres</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Longest Earthen Dam</td>
                    <td class="font-mono accent font-semibold">Hirakud Dam</td>
                    <td>Mahanadi</td>
                    <td>Odisha</td>
                    <td class="cell-num">25.8 km total length</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Largest Water Storage Reservoir</td>
                    <td class="font-mono accent font-semibold">Indira Sagar Dam</td>
                    <td>Narmada</td>
                    <td>Madhya Pradesh</td>
                    <td class="cell-num">12.22 billion m³</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Largest Artificial Lake / Reservoir</td>
                    <td class="font-mono accent font-semibold">Govind Ballabh Pant Sagar</td>
                    <td>Rihand (Son tributary)</td>
                    <td>Uttar Pradesh</td>
                    <td class="cell-num">10.6 billion m³</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Largest Masonry Dam</td>
                    <td class="font-mono accent font-semibold">Nagarjuna Sagar Dam</td>
                    <td>Krishna</td>
                    <td>Telangana / AP</td>
                    <td class="cell-num">124 m height · 26 gates</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Only Arch Dam in India</td>
                    <td class="font-mono accent font-semibold">Idukki Dam</td>
                    <td>Periyar</td>
                    <td>Kerala</td>
                    <td class="cell-num">168.9 m height</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Oldest Surviving Dam in India</td>
                    <td class="font-mono accent font-semibold">Kallanai (Grand Anicut)</td>
                    <td>Cauvery</td>
                    <td>Tamil Nadu</td>
                    <td class="cell-num">Built 2nd Century CE</td>
                  </tr>
                  <tr>
                    <td class="cell-key">First Multipurpose Project (Independent India)</td>
                    <td class="font-mono accent font-semibold">Damodar Valley Corp (DVC)</td>
                    <td>Damodar</td>
                    <td>WB / Jharkhand</td>
                    <td class="cell-num">Established 1948 (TVA model)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Inter-State Disputes & Dam Safety Table -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">Major Inter-State River &amp; Dam Disputes</h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Project / River</th>
                    <th>Involved States</th>
                    <th>Core Point of Contention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Mullaperiyar Dam</td>
                    <td class="font-mono accent">Kerala vs Tamil Nadu</td>
                    <td>Dam located in Kerala, operated by Tamil Nadu. Dispute over water level (142 ft vs 152 ft) and structural safety of the 1895 masonry dam.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Almatti Dam Height</td>
                    <td class="font-mono accent">Karnataka vs AP &amp; Telangana</td>
                    <td>Height raising from 519.6 m to 524.256 m impacts Krishna water inflows to Srisailam and Nagarjuna Sagar downstream.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Mekedatu Balancing Reservoir</td>
                    <td class="font-mono accent">Karnataka vs Tamil Nadu</td>
                    <td>Proposed dam on Cauvery River at Mekedatu; Tamil Nadu argues it will obstruct designated water quota under the CWDT award.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Babli Barrage</td>
                    <td class="font-mono accent">Maharashtra vs Telangana (AP)</td>
                    <td>Constructed across Godavari in Maharashtra near Telangana border; Supreme Court allowed 2.74 TMC storage with gates lifted during monsoon.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ── 05 · Memory Hacks ───────────────────────────────────────── -->
        <section id="hacks" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Memory Hacks</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">mnemonics · negative marking traps</span>
          </header>

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Direct recall shortcuts and negative marking traps tested in TGPRB exams:
          </p>

          <div class="space-y-4">
            <div class="callout callout-red">
              <p class="callout-title">Trap 1: Highest Dam (Tehri) vs Highest Straight Gravity Dam (Bhakra)</p>
              <p class="callout-body">
                • <strong class="t-hi">Tehri Dam (260.5 m):</strong> Highest dam in India overall (rockfill structure on Bhagirathi in Uttarakhand).<br />
                • <strong class="t-hi">Bhakra Dam (226 m):</strong> Highest <strong class="t-hi">straight gravity</strong> concrete dam in India (on Sutlej in Himachal Pradesh).
              </p>
            </div>

            <div class="callout callout-saffron">
              <p class="callout-title">Trap 2: Almatti vs Mettur (Krishna vs Cauvery)</p>
              <p class="callout-body">
                • <strong class="t-hi">Almatti Dam:</strong> Located on the <strong class="t-hi">Krishna River</strong> in <strong class="t-hi">Karnataka</strong> (Lal Bahadur Shastri Reservoir).<br />
                • <strong class="t-hi">Mettur Dam:</strong> Located on the <strong class="t-hi">Cauvery River</strong> in <strong class="t-hi">Tamil Nadu</strong> (Stanley Reservoir).
              </p>
            </div>

            <div class="callout">
              <p class="callout-title">Trap 3: Rihand Dam (Govind Ballabh Pant) vs Bhakra (Gobind Sagar)</p>
              <p class="callout-body">
                • <strong class="t-hi">Gobind Sagar:</strong> Reservoir of Bhakra Dam on <strong class="t-hi">Sutlej</strong> in Himachal Pradesh.<br />
                • <strong class="t-hi">Govind Ballabh Pant Sagar:</strong> Reservoir of Rihand Dam on <strong class="t-hi">Rihand (Son tributary)</strong> in Uttar Pradesh (Largest artificial reservoir by volume).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 06 · PYQs ───────────────────────────────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">PYQs</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">2015-2023 verified papers</span>
          </header>

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
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">
              {{ advancedPractice.length }} drills
              <template v-if="advAttemptedCount > 0"> · {{ advAttemptedCount }} attempted ({{ advCorrectCount }} correct)</template>
            </span>
          </header>

          <!-- Disclaimer callout -->
          <div class="mb-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <p class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
              TGPSC-Style Advanced Practice
            </p>
            <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
              These questions use <strong class="t-hi">multi-statement, 4x4 matching, and basin cross-linking</strong> formats
              from recent TGPSC Group-I patterns. TGPRB papers (2022-2023) remain
              <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your project-river recall.
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
                  note-id="NOTE-GEO-DAMS"
                  :prompt="`Explain the reasoning for this TGPSC-style dam question and the exam trap: ${q.question}`"
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
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <GateQuiz note-id="NOTE-GEO-DAMS" />
        </section>

        <!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <CurrentAffairsStrip note-id="NOTE-GEO-DAMS" />
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
            <p class="text-body-xs leading-relaxed t-lo">2-3 questions per paper, every year since 2015.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

useHead({
  title: 'Dams & Multipurpose Projects of India - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Comprehensive TGPRB study note: Major dams, reservoirs, barrages, and multipurpose river valley projects of India and Telangana with verified PYQs and current affairs.' }],
})

const readProgress = ref(0)
const activeSection = ref('visual')

function onScroll() {
  const h = document.documentElement
  const b = document.body
  const st = 'scrollTop'
  const sh = 'scrollHeight'
  readProgress.value = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100

  const secEls = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
  const scrollPos = window.scrollY + 120
  for (let i = secEls.length - 1; i >= 0; i--) {
    const el = secEls[i]
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = sections[i].id
      break
    }
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const coverage = [
  { label: 'National Superlatives (Tehri, Bhakra, Hirakud)' },
  { label: 'Basin-Wise Directories (Indus, Ganga, Peninsular)' },
  { label: 'Damodar Valley Corporation (DVC - 1948)' },
  { label: 'Nawab Ali Nawaz Jung &amp; Hyderabad State Works' },
  { label: 'Inter-State River Disputes &amp; Dam Safety Act' },
  { label: 'Modern Barrages: Kaleshwaram &amp; Polavaram' },
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

const textHierarchy = `MAJOR DAMS & MULTIPURPOSE PROJECTS OF INDIA
|-- 1. INDUS BASIN
|   |-- Bhakra Dam (Sutlej, HP) -> 226 m highest gravity | Gobind Sagar
|   |-- Pong Dam (Beas, HP)    -> Maharana Pratap Sagar
|   +-- Salal / Baglihar / Dulhasti (Chenab, J&K)
|
|-- 2. GANGA BASIN
|   |-- Tehri Dam (Bhagirathi, UK) -> 260.5 m highest dam in India
|   |-- Rihand Dam (Rihand/Son, UP) -> Govind Ballabh Pant Sagar (largest volume)
|   |-- Matatilla & Rajghat (Betwa, UP/MP)
|   |-- Chambal Cascade (Gandhi Sagar, Rana Pratap, Jawahar Sagar)
|   +-- Farakka Barrage (Ganga, WB) -> Flushes Kolkata Port
|
|-- 3. DAMODAR VALLEY (1948 - First Multipurpose Project, TVA model)
|   +-- Tilaiya, Konar, Maithon, Panchet Dams
|
|-- 4. CENTRAL & PENINSULAR BASINS
|   |-- Narmada: Sardar Sarovar (GJ), Indira Sagar (MP)
|   |-- Tapi: Ukai Dam (Vallabh Sagar) & Kakrapar (GJ)
|   |-- Mahanadi: Hirakud Dam (OD) -> 25.8 km longest earthen dam
|   |-- Godavari: Sriram Sagar (SRSP), Kaleshwaram Barrages, Polavaram
|   |-- Krishna: Almatti (KA), Srisailam (AP/TG), Nagarjuna Sagar (TG/AP)
|   |-- Cauvery: KRS (KA), Mettur / Stanley (TN), Kallanai (Oldest, 2nd C. CE)
|   +-- Periyar: Idukki Arch Dam (KL), Mullaperiyar Dam (KL/TN)`

interface PYQItem {
  uid: string
  source: string
  tag: string
  question: string
  options: string[]
  correct: number
  explanation: string
  selected: number | null
  revealed: boolean
}

const pyqList = reactive<PYQItem[]>([
  {
    uid: 'PYQ-DAM-01',
    source: 'Constable 2018 Mains',
    tag: 'Dam ↔ River Matching',
    question: 'Matatilla Project was built on which of the following rivers?',
    options: [
      'Ken',
      'Chambal',
      'Betwa',
      'Son'
    ],
    correct: 2,
    explanation: 'Matatilla Dam is a joint multipurpose project of Uttar Pradesh and Madhya Pradesh built on the Betwa River in Lalitpur district, UP.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-02',
    source: 'Constable 2022 Prelims',
    tag: 'Dam ↔ River Matching',
    question: 'Ukai dam is situated across which of the following rivers?',
    options: [
      'Tapi',
      'Narmada',
      'Sabarmati',
      'Mahi'
    ],
    correct: 0,
    explanation: 'Ukai Dam (also known as Vallabh Sagar) is constructed across the Tapi River in Surat/Tapi district of Gujarat. It is the second largest reservoir in Gujarat after Sardar Sarovar.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-03',
    source: 'SI 2016 Final GS Paper',
    tag: 'Project ↔ State Matching',
    question: 'Match the following:\nList - I (Project)\n(a) Rihand\n(b) Sileru\n(c) Mettur\n(d) Almatti\n\nList - II (State)\n(i) Karnataka\n(ii) Tamil Nadu\n(iii) Andhra Pradesh\n(iv) Uttar Pradesh',
    options: [
      '(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)',
      '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)',
      '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)'
    ],
    correct: 0,
    explanation: 'Rihand Project is in Uttar Pradesh (Sonbhadra); Sileru Project is in Andhra Pradesh / Odisha border; Mettur Dam is in Tamil Nadu (Cauvery); Almatti Dam is in Karnataka (Krishna).',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-04',
    source: 'Constable 2015 Prelims',
    tag: 'Historical Chief Engineer',
    question: 'Name the Chief Engineer who designed many projects in Hyderabad State in the 20th Century?',
    options: [
      'Mir Alam',
      'Nawab Ali Nawaz Jung',
      'Mokshagundam Visvesvaraya',
      'Arthur Cotton'
    ],
    correct: 1,
    explanation: 'Nawab Ali Nawaz Jung Bahadur was the renowned Chief Engineer of Hyderabad State who designed Nizam Sagar on Manjeera, Osmansagar and Himayatsagar on Musi/Esi, and the Rajoli Banda Diversion Scheme (RDS).',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-05',
    source: 'Constable 2016 Mains',
    tag: 'Diversion Schemes',
    question: 'On which river is the "Rajoli Banda Diversion Scheme" built?',
    options: [
      'Krishna',
      'Godavari',
      'Manjeera',
      'Tungabhadra'
    ],
    correct: 3,
    explanation: 'The Rajoli Banda Diversion Scheme (RDS) is an anicut constructed across the Tungabhadra River in Manvi taluk of Raichur (Karnataka), serving Mahbubnagar/Jogulamba Gadwal district of Telangana.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-06',
    source: 'SI 2018 Mains Paper 4 GS',
    tag: 'Hydroelectric Project Identification',
    question: 'Which one of the following pairs related to hydro-electricity projects and rivers is NOT correct?',
    options: [
      'Salal - Tapi',
      'Shivanasamudram - Cauvery',
      'Koyna - Koyna',
      'Balimela - Sileru'
    ],
    correct: 0,
    explanation: 'Salal Hydroelectric Project is constructed across the Chenab River in Reasi district of Jammu and Kashmir, NOT on Tapi River. Ukai project is on Tapi.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-07',
    source: 'Constable 2023 Mains Official',
    tag: 'Telangana Mega Projects',
    question: 'Identify the name of the Governor who inaugurated the Kaleshwaram project in Telangana in June 2019?',
    options: [
      'E.S.L. Narasimhan',
      'Tamilisai Soundararajan',
      'C. Vidyasagar Rao',
      'Biswabhusan Harichandan'
    ],
    correct: 0,
    explanation: 'Governor E.S.L. Narasimhan inaugurated the Kaleshwaram Lift Irrigation Project at Medigadda (Lakshmi Barrage) on June 21, 2019, in the presence of Chief Ministers of Telangana, Andhra Pradesh, and Maharashtra.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-08',
    source: 'SI 2016 Mains Paper 2',
    tag: 'Dam ↔ River Matching',
    question: 'Sardar Sarovar Dam is constructed across which of the following rivers?',
    options: [
      'Tapi',
      'Mahi',
      'Narmada',
      'Luni'
    ],
    correct: 2,
    explanation: 'Sardar Sarovar Dam is constructed across the Narmada River near Kevadiya (Navagam) in Gujarat, delivering irrigation water to Gujarat, Rajasthan, and Madhya Pradesh.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-09',
    source: 'Constable 2018 Mains',
    tag: 'Environment Movements & Dams',
    question: 'The Narmada Bachao Andolan (NBA) was a prominent social movement against the construction of large dams on Narmada River, led by:',
    options: [
      'Sunderlal Bahuguna',
      'Medha Patkar and Baba Amte',
      'Gaura Devi',
      'Pandurang Hegde'
    ],
    correct: 1,
    explanation: 'Narmada Bachao Andolan (NBA) was spearheaded by Medha Patkar and Baba Amte against the height increase and displacement caused by the Sardar Sarovar Project on the Narmada River.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-DAM-10',
    source: 'Constable 2016 Prelims',
    tag: 'Dam Superlatives',
    question: 'Which is the longest composite earthen dam in India, built across the Mahanadi River?',
    options: [
      'Hirakud Dam',
      'Bhakra Dam',
      'Tehri Dam',
      'Nagarjuna Sagar Dam'
    ],
    correct: 0,
    explanation: 'Hirakud Dam in Sambalpur, Odisha, built across the Mahanadi River, is the longest earthen dam in the world with a total length of 25.8 km (main dam 4.8 km).',
    selected: null,
    revealed: false,
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
    uid: 'ADV-GEO-DAM-001',
    question: 'Match the following lift irrigation projects/barrage with the rivers:\n\nList I (Project/Barrage):\nA. Mahatma Gandhi Kalwakurthy Lift Irrigation Project\nB. Nizam Sagar Project\nC. J. Chokka Rao Devadula Lift Irrigation Scheme\nD. Chanaka-Korata Barrage\n\nList II (River):\nI. Godavari\nII. Krishna\nIII. Penganga\nIV. Manjeera\n\nChoose the correct answer:',
    options: [
      'A-II, B-I, C-IV, D-III',
      'A-II, B-I, C-III, D-IV',
      'A-II, B-IV, C-I, D-III',
      'A-I, B-II, C-III, D-IV'
    ],
    correct: 2,
    explanation: 'Kalwakurthy LIS draws from Krishna River foreshore (A-II). Nizam Sagar is on Manjeera River in Kamareddy (B-IV). Devadula LIS lifts water from Godavari at Gangaram (C-I). Chanaka-Korata Barrage is on Penganga River in Adilabad (D-III).',
    source: 'TGPSC Group-I 2024, Q101',
    format: 'Matching',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DAM-002',
    question: 'Consider the following statements regarding Telangana irrigation projects:\n\nA. Koulasnala and Boggulavagu irrigation projects are located in the Godavari basin.\nB. Kotepally Vagu and Asif Nahar irrigation projects are located in the Krishna basin.\n\nWhich of the above statements is/are correct?',
    options: [
      'A only',
      'B only',
      'Both A and B',
      'Neither A nor B'
    ],
    correct: 2,
    explanation: 'Koulasnala (Kamareddy - Manjeera/Godavari sub-basin) and Boggulavagu (Mancherial - Godavari basin) are in Godavari basin. Kotepally Vagu (Vikarabad - Kagna/Krishna sub-basin) and Asif Nahar fall in Krishna basin. Both statements are true.',
    source: 'TGPSC Group-I 2024, Q71',
    format: 'Multi-statement',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DAM-003',
    question: 'Match the following major dams of India with their river and structural type:\n\nList I (Dam):\nA. Tehri Dam\nB. Bhakra Dam\nC. Hirakud Dam\nD. Sardar Sarovar Dam\n\nList II (River & Superlative):\nI. Sutlej River (Highest Gravity Dam, 226 m)\nII. Mahanadi River (Longest Earthen Dam, 25.8 km)\nIII. Bhagirathi River (Highest Rock-fill Dam, 260.5 m)\nIV. Narmada River (Major Concrete Gravity Dam)',
    options: [
      'A-III, B-I, C-II, D-IV',
      'A-III, B-IV, C-II, D-I',
      'A-I, B-III, C-II, D-IV',
      'A-III, B-I, C-IV, D-II'
    ],
    correct: 0,
    explanation: 'Tehri Dam on Bhagirathi is the highest dam in India (260.5 m, III). Bhakra Dam on Sutlej is India\'s highest gravity dam (226 m, I). Hirakud on Mahanadi is the longest earthen dam (25.8 km, II). Sardar Sarovar is on Narmada (IV).',
    source: 'Synthetic - derived from PYQ national dam superlatives',
    format: 'Matching',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DAM-004',
    question: 'Consider the following statements regarding the Damodar Valley Corporation (DVC):\n\nA. It was established in 1948 as the first multipurpose river valley project of independent India.\nB. It was modeled on the Tennessee Valley Authority (TVA) of the USA.\nC. Tilaiya, Maithon, and Panchet dams are key storage dams constructed under the DVC system.\nD. The DVC project exclusively benefits only the state of Bihar.\n\nWhich of the above statements are correct?',
    options: [
      'A, B and C only',
      'A and B only',
      'B, C and D only',
      'A, B, C and D'
    ],
    correct: 0,
    explanation: 'Statements A, B, and C are correct. Statement D is false because DVC is a joint multipurpose project benefiting Jharkhand, West Bengal, and the Central Government, not exclusively Bihar.',
    source: 'Synthetic - derived from DVC historical PYQ inventory',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-DAM-005',
    question: 'Which of the following statements regarding historical irrigation works of Hyderabad State under Chief Engineer Nawab Ali Nawaz Jung are correct?\n\nA. Nizam Sagar Dam was constructed across the Manjeera River in Kamareddy district.\nB. Osman Sagar and Himayat Sagar were built on Musi and Esi rivers to protect Hyderabad from floods following the 1908 deluge.\nC. The Ali Sagar Lift Irrigation scheme in Nizamabad was named in honor of Nawab Ali Nawaz Jung.\nD. Kaddam Project was constructed across the Kaddam River, a left-bank tributary of Godavari.\n\nChoose the correct answer:',
    options: [
      'A, B, C and D',
      'A, B and C only',
      'B, C and D only',
      'A and B only'
    ],
    correct: 0,
    explanation: 'All four statements are correct historical and spatial facts regarding Hyderabad State irrigation architecture and the engineering legacy of Nawab Ali Nawaz Jung Bahadur.',
    source: 'Synthetic - derived from Telangana irrigation history',
    format: 'Multi-statement',
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
  return 'opacity-60'
}

function attempt(q: PYQItem, oi: number) {
  if (q.revealed) return
  q.selected = oi
  q.revealed = true
}

function reveal(q: PYQItem) {
  q.revealed = true
}

function optionClass(q: PYQItem, oi: number) {
  if (!q.revealed) {
    return q.selected === oi ? 'opt-selected' : ''
  }
  if (oi === q.correct) {
    return 'opt-correct'
  }
  if (q.selected === oi && oi !== q.correct) {
    return 'opt-wrong'
  }
  return 'opacity-60'
}
</script>
