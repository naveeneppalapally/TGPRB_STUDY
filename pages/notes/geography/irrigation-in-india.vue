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
            <span class="chip">29 verified PYQs</span>
            <span class="chip">Geography & TG Economy</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Irrigation in India & Telangana
          </h1>
          <p class="mt-3 max-w-2xl text-body leading-relaxed t-mid">
            TGPRB Constable / SI · 2–4 direct questions per paper. Master the 4 irrigation sources, multi-purpose dams, canal headworks, Telangana lift irrigation systems, and PMKSY schemes.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />8 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />12 practice PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~18 min read
            </span>
          </div>
        </header>

        <!-- ══ Coverage strip - How TGPRB tests Irrigation ══ -->
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
            Covers all core tested dimensions: Source percentages, Dam-River pairs, Canal headworks, Lift irrigation stages, and Micro-irrigation subsidies.
          </p>

          <!-- 2026 Predicted Question Format Callout -->
          <div class="mt-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 accent shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider accent">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Match the Following (Project ↔ River / District) and <strong class="t-hi">4-Statement True/False Verifications</strong> on Canal origins (Harike Barrage) and PMKSY components (Per Drop More Crop). Trap alert: Watch out for Tank vs Tube-well leading state traps.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · Visual Scaffold ────────────────────────────────────── -->
        <section id="visual" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Architecture</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">spatial · hierarchy</span>
          </header>

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            Irrigation in India is spatially bifurcated: <strong class="t-hi">Alluvial North</strong> relies on Wells & Canals; <strong class="t-hi">Peninsular South</strong> relies on Tanks & Lift Irrigation due to hard crystalline basalt terrain.
          </p>

          <!-- Infographic Card -->
          <div class="panel p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div class="rounded-xl border b-line bg-sub p-4">
                <p class="text-[28px] font-bold font-mono accent">62-64%</p>
                <p class="text-[14px] font-semibold t-hi mt-1">Wells & Tube-wells</p>
                <p class="text-[11.5px] t-lo mt-1">Dominant in UP, Rajasthan, Punjab, Gujarat. Largest national share.</p>
              </div>
              <div class="rounded-xl border b-line bg-sub p-4">
                <p class="text-[28px] font-bold font-mono text-sky-500">24-26%</p>
                <p class="text-[14px] font-semibold t-hi mt-1">Canals</p>
                <p class="text-[11.5px] t-lo mt-1">Dominant in UP, Rajasthan (Indira Gandhi Canal), Punjab, Haryana.</p>
              </div>
              <div class="rounded-xl border b-line bg-sub p-4">
                <p class="text-[28px] font-bold font-mono text-amber-500">3-4%</p>
                <p class="text-[14px] font-semibold t-hi mt-1">Tanks</p>
                <p class="text-[11.5px] t-lo mt-1">Peninsular India (TN, AP, Telangana). Crystalline rock terrain.</p>
              </div>
              <div class="rounded-xl border b-line bg-sub p-4">
                <p class="text-[28px] font-bold font-mono text-emerald-500">6-8%</p>
                <p class="text-[14px] font-semibold t-hi mt-1">Other Sources</p>
                <p class="text-[11.5px] t-lo mt-1">Lift irrigation, check dams, springs, water harvesting structures.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 02 · Sources Breakdown ──────────────────────────────────── -->
        <section id="overview" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Sources of Irrigation in India</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">macro data</span>
          </header>

          <div class="space-y-6 text-body leading-[1.8] t-mid">
            <div class="panel p-5">
              <h3 class="font-display text-[17px] font-bold t-hi mb-2">1. Wells and Tube-wells (62–64% of Net Irrigated Area)</h3>
              <p>
                Wells and tube-wells form the backbone of Indian agriculture since the Green Revolution (1960s). High adoption is driven by independent control over water delivery, availability of rural electrification, and submersible pumps.
              </p>
              <ul class="mt-3 list-disc list-inside space-y-1 text-[13px] t-lo">
                <li><strong class="t-hi">Leading State:</strong> <span class="accent font-medium">Uttar Pradesh</span> leads India in both total well-irrigated area and tube-well density.</li>
                <li><strong class="t-hi">Other High States:</strong> Rajasthan, Madhya Pradesh, Punjab, Gujarat, and Haryana.</li>
                <li><strong class="t-hi">Exam Distinction:</strong> Open wells are common in Deccan traps, while deep tube-wells dominate the Gangetic alluvial plain.</li>
              </ul>
            </div>

            <div class="panel p-5">
              <h3 class="font-display text-[17px] font-bold t-hi mb-2">2. Canals (24–26% of Net Irrigated Area)</h3>
              <p>
                Second largest source. Canals are classified into <strong class="t-hi">Inundation Canals</strong> (draw water only during floods, no barrage) and <strong class="t-hi">Perennial Canals</strong> (draw water year-round using barrages/dams across perennial rivers).
              </p>
              <ul class="mt-3 list-disc list-inside space-y-1 text-[13px] t-lo">
                <li><strong class="t-hi">Leading State:</strong> <span class="accent font-medium">Uttar Pradesh</span> has the largest canal network in India (Upper Ganga Canal, Lower Ganga Canal, Sharda Canal).</li>
                <li><strong class="t-hi">Key Feature:</strong> Perennial canals dominate Punjab, Haryana, and Western Rajasthan due to Himalayan glacier-fed rivers.</li>
              </ul>
            </div>

            <div class="panel p-5">
              <h3 class="font-display text-[17px] font-bold t-hi mb-2">3. Tanks (3–4% of Net Irrigated Area)</h3>
              <p>
                Tank irrigation is an ancient, community-managed irrigation practice predominant in <strong class="t-hi">Peninsular South India</strong> (Tamil Nadu, Andhra Pradesh, Telangana, Karnataka).
              </p>
              <div class="callout callout-saffron mt-3">
                <p class="callout-title">Why Tank Irrigation Dominates South India (High-Yield PYQ Reason):</p>
                <p class="callout-body mt-1">
                  1. <strong>Impermeable Bedrock:</strong> Hard crystalline basalt and granite rocks make digging deep tube-wells difficult and costly.<br />
                  2. <strong>Undulating Topography:</strong> Natural depressions in the Deccan plateau form ideal natural water storage catchments.<br />
                  3. <strong>Seasonal Non-Perennial Rivers:</strong> Peninsular rivers dry up post-monsoon, making perennial canal systems unviable without large storage tanks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 03 · Multipurpose River Valley Projects ─────────────────── -->
        <section id="projects" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Multipurpose River Valley Projects</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">dams · rivers · states</span>
          </header>

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Jawaharlal Nehru famously called these projects the <em class="t-hi">"Temples of Modern India"</em>. TGPRB frequently tests River ↔ Dam ↔ Beneficiary State matching pairs.
          </p>

          <div class="panel overflow-x-auto mb-6">
            <table class="table-note min-w-[680px]">
              <thead>
                <tr>
                  <th class="pl-4">Project Name</th>
                  <th>River</th>
                  <th>State(s)</th>
                  <th>Key Exam Fact / Superlative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Bhakra-Nangal Project</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Sutlej</td>
                  <td>Himachal Pradesh, Punjab, Haryana, Rajasthan</td>
                  <td>Forms <strong class="t-hi">Govind Sagar</strong> reservoir. Highest concrete gravity dam in India (226 m).</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Hirakud Dam</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Mahanadi</td>
                  <td>Odisha (Sambalpur)</td>
                  <td><strong class="t-hi">Longest earthen dam</strong> in India (4.8 km main, 25.8 km total with dykes).</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Damodar Valley Corp (DVC)</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Damodar (Barakar, Konar)</td>
                  <td>Jharkhand & West Bengal</td>
                  <td><strong class="t-hi">First multipurpose project of independent India (1948)</strong>. Modeled on USA's Tennessee Valley Authority (TVA).</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Tehri Dam</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Bhagirathi (at Bhilangna confluence)</td>
                  <td>Uttarakhand</td>
                  <td><strong class="t-hi">Highest dam in India</strong> (260.5 m). Earth and rock-fill embankment dam.</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Sardar Sarovar Project</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Narmada</td>
                  <td>Gujarat, MP, Maharashtra, Rajasthan</td>
                  <td>Lifeline of Gujarat (Saurashtra/Kutch). Narmada Main Canal is world's largest lined irrigation canal.</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Nagarjuna Sagar Dam</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Krishna</td>
                  <td>Telangana (Nalgonda) & AP (Palnadu)</td>
                  <td><strong class="t-hi">World's largest masonry dam</strong>. Foundation laid on 10 Dec 1955 by Pt. Nehru. Right Canal: Jawahar Canal; Left Canal: Lal Bahadur Canal.</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Tungabhadra Project</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Tungabhadra</td>
                  <td>Karnataka & Andhra Pradesh / Telangana</td>
                  <td>Located at Hosapete (Pampa Sagar reservoir). Joint venture between Karnataka and erstwhile Andhra Pradesh.</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Idukki Dam</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Periyar</td>
                  <td>Kerala</td>
                  <td>Double curvature concrete <strong class="t-hi">arch dam</strong> built between Kuravan and Kurathi hills.</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Rihand Project (Govind Ballabh Pant Sagar)</td>
                  <td class="font-mono text-saffron-600 dark:text-saffron-400">Rihand (Son tributary)</td>
                  <td>Uttar Pradesh (Sonbhadra)</td>
                  <td><strong class="t-hi">Largest man-made reservoir in India by surface area</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ── 04 · Major Canal Networks ───────────────────────────────── -->
        <section id="canals" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Major Canal Systems of India</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">headworks · routes</span>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div class="panel p-5">
              <span class="chip chip-saffron mb-2">Longest in India</span>
              <h3 class="font-display text-[16px] font-bold t-hi mb-1">Indira Gandhi Canal (Rajasthan Canal)</h3>
              <p class="text-[13px] leading-relaxed t-mid">
                Originates from <strong class="t-hi">Harike Barrage</strong> in Punjab at the confluence of the <strong class="t-hi">Sutlej and Beas rivers</strong>. Runs ~650 km through Punjab and Haryana into Western Rajasthan (Thar Desert: Ganganagar, Bikaner, Jaisalmer, Barmer), transforming arid desert into fertile agricultural land.
              </p>
            </div>

            <div class="panel p-5">
              <span class="chip mb-2">Historic Northern Canals</span>
              <h3 class="font-display text-[16px] font-bold t-hi mb-1">Sirhind & Western Yamuna Canals</h3>
              <p class="text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Sirhind Canal:</strong> Takes off from Sutlej at Ropar (Punjab).<br />
                <strong class="t-hi">Western Yamuna Canal:</strong> Oldest canal in Northern India, originates from Tajewala/Hathnikund Barrage on the Yamuna (Haryana).
              </p>
            </div>

            <div class="panel p-5">
              <span class="chip mb-2">Eastern & Coastal Canals</span>
              <h3 class="font-display text-[16px] font-bold t-hi mb-1">Buckingham Canal</h3>
              <p class="text-[13px] leading-relaxed t-mid">
                796 km long freshwater navigation and drainage canal running parallel to the Coromandel Coast from Kakinada (Andhra Pradesh) to Viluppuram (Tamil Nadu). Connected to the National Waterway 4 (NW-4).
              </p>
            </div>

            <div class="panel p-5">
              <span class="chip mb-2">Delta Systems</span>
              <h3 class="font-display text-[16px] font-bold t-hi mb-1">Godavari & Krishna Delta Canals</h3>
              <p class="text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Sir Arthur Cotton Barrage (Dowleswaram):</strong> Across Godavari at Rajahmundry.<br />
                <strong class="t-hi">Prakasam Barrage:</strong> Across Krishna at Vijayawada, supplying Buckingham and Eluru canal systems.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 05 · Telangana Projects ─────────────────────────────────── -->
        <section id="telangana" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Telangana Major Irrigation & Lift Schemes</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">state specific · high yield</span>
          </header>

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Because Telangana sits on an elevated plateau (Deccan plateau slope), conventional gravity canals cannot reach high-altitude agricultural fields. Hence, <strong class="t-hi">Multi-Stage Lift Irrigation</strong> is Telangana's primary engineering model.
          </p>

          <div class="space-y-4 mb-6">
            <!-- Kaleshwaram -->
            <div class="panel p-5 border-l-4 border-l-saffron-500">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 class="font-display text-[17px] font-bold t-hi">1. Kaleshwaram Lift Irrigation Project (KLIP)</h3>
                <span class="chip chip-saffron chip-mono">World's Largest Lift Project</span>
              </div>
              <p class="text-[13px] leading-relaxed t-mid">
                Draws water from the <strong class="t-hi">Godavari River</strong> at the confluence of the <strong class="t-hi">Pranahita and Godavari</strong> at Kaleshwaram. Lifts water across 7 links and 28 packages to irrigate ~45 lakh acres.
              </p>
              <div class="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px]">
                <div class="bg-sub p-2.5 rounded-lg">
                  <span class="font-semibold block t-hi">Medigadda (Lakshmi) Barrage</span>
                  <span class="t-lo">Primary intake barrage across Godavari</span>
                </div>
                <div class="bg-sub p-2.5 rounded-lg">
                  <span class="font-semibold block t-hi">Annaram (Saraswati) Barrage</span>
                  <span class="t-lo">Second stage lift barrage</span>
                </div>
                <div class="bg-sub p-2.5 rounded-lg">
                  <span class="font-semibold block t-hi">Sundilla (Parvati) Barrage</span>
                  <span class="t-lo">Third stage lift upstream</span>
                </div>
              </div>
            </div>

            <!-- Sriram Sagar -->
            <div class="panel p-5">
              <h3 class="font-display text-[16px] font-bold t-hi mb-1">2. Sriram Sagar Project (SRSP / Pochampad Project)</h3>
              <p class="text-[13px] leading-relaxed t-mid">
                Constructed across the <strong class="t-hi">Godavari River</strong> at Pochampad in Nizamabad district. Serves as the agricultural lifeline of North Telangana (Nizamabad, Nirmal, Jagtial, Karimnagar, Warangal). Its main canals include the <strong class="t-hi">Kakatiya Canal</strong> (146 km), Saraswati Canal, and Laxmi Canal.
              </p>
            </div>

            <!-- RDS & Other Schemes -->
            <div class="panel p-5">
              <h3 class="font-display text-[16px] font-bold t-hi mb-1">3. Rajolibanda Diversion Scheme (RDS) & Other Dams</h3>
              <p class="text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Rajolibanda Diversion Scheme (RDS):</strong> Anicut on the <strong class="t-hi">Tungabhadra River</strong> providing irrigation to Jogulamba Gadwal district (Telangana) and Raichur (Karnataka).<br />
                <strong class="t-hi">Priyadarshini Jurala Project:</strong> First project on Krishna River in Telangana (Jogulamba Gadwal).<br />
                <strong class="t-hi">Lower Manair Dam (LMD):</strong> Built on the Manair River at Karimnagar.<br />
                <strong class="t-hi">Kadam Reservoir:</strong> Across Kadam river in Nirmal district.
              </p>
            </div>

            <!-- Mission Kakatiya -->
            <div class="panel p-5">
              <div class="flex items-center justify-between gap-2 mb-1">
                <h3 class="font-display text-[16px] font-bold t-hi">4. Mission Kakatiya (Mana Ooru - Mana Cheruvu)</h3>
                <span class="chip chip-jade chip-mono">Tank Restoration</span>
              </div>
              <p class="text-[13px] leading-relaxed t-mid">
                Flagship program launched in 2015 to restore <strong class="t-hi">46,531 minor irrigation tanks and water bodies</strong> across Telangana built during the Kakatiya, Qutb Shahi, and Asaf Jahi dynasties. Tagline: <em>"Mana Ooru - Mana Cheruvu"</em>.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 06 · Micro-Irrigation & Central Schemes ─────────────────── -->
        <section id="micro-irrigation" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Micro-Irrigation & Government Schemes</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">drip · sprinkler · pmksy</span>
          </header>

          <div class="panel overflow-x-auto mb-6">
            <table class="table-note min-w-[620px]">
              <thead>
                <tr>
                  <th class="pl-4">Feature</th>
                  <th>Drip Irrigation (Trickle)</th>
                  <th>Sprinkler Irrigation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Water Efficiency</td>
                  <td class="accent font-mono font-bold">90–95%</td>
                  <td class="text-sky-500 font-mono font-bold">75–85%</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Mechanism</td>
                  <td>Water drips slowly directly to roots via emitters</td>
                  <td>Water sprayed into air like artificial rain</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Ideal Terrain & Crops</td>
                  <td>Orchards, vegetables, cash crops, flat/terraced lands</td>
                  <td>Undulating terrain, sandy soil, tea/coffee, pulses, wheat</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Key Advantages</td>
                  <td>Zero weed growth, minimal evaporation, fertiliser via fertigation</td>
                  <td>Cleans dust from leaves, frost protection, prevents soil erosion</td>
                </tr>
                <tr>
                  <td class="pl-4 font-semibold t-hi">Leading States</td>
                  <td>Maharashtra, Andhra Pradesh, Gujarat, Karnataka</td>
                  <td>Rajasthan, Haryana, Gujarat, Madhya Pradesh</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PMKSY Scheme Details -->
          <div class="panel p-5">
            <h3 class="font-display text-[16px] font-bold t-hi mb-2">Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)</h3>
            <p class="text-[13px] leading-relaxed t-mid">
              Launched on <strong class="t-hi">1 July 2015</strong> with the overarching motto <em class="t-hi">"Har Khet Ko Pani"</em> and <em class="t-hi">"More Crop Per Drop"</em>. It amalgamated four existing central programs:
            </p>
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">1. AIBP (Accelerated Irrigation Benefit Programme)</strong>
                <p class="t-lo">Focuses on fast-tracking major and medium irrigation dams and multi-purpose canal projects.</p>
              </div>
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">2. Har Khet Ko Pani (HKKP)</strong>
                <p class="t-lo">Command Area Development (CAD), repair and restoration of water bodies, and ground water development.</p>
              </div>
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">3. Per Drop More Crop (PDMC)</strong>
                <p class="t-lo">Promotes micro-irrigation (Drip & Sprinkler) and precision water management technologies.</p>
              </div>
              <div class="bg-sub p-3 rounded-lg border b-line">
                <strong class="t-hi block mb-1">4. Watershed Development</strong>
                <p class="t-lo">Soil & moisture conservation, rain-water harvesting structures, and runoff management.</p>
              </div>
            </div>
            <p class="mt-3 text-[12px] font-mono t-lo">
              * Micro Irrigation Fund (MIF): Dedicated corpus of ₹5,000 Crore established with NABARD to subsidize micro-irrigation installations.
            </p>
          </div>
        </section>

        <!-- ── 07 · Exam Distinction Matrix ────────────────────────────── -->
        <section id="memory-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">Exam Distinction & Memory Hacks</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">negative marking traps</span>
          </header>

          <div class="space-y-4">
            <div class="callout callout-red">
              <p class="callout-title">Trap 1: Govind Sagar vs Govind Ballabh Pant Sagar</p>
              <p class="callout-body">
                • <strong class="t-hi">Govind Sagar:</strong> Formed behind <strong class="t-hi">Bhakra Dam</strong> on <strong class="t-hi">Sutlej River</strong> (Himachal Pradesh).<br />
                • <strong class="t-hi">Govind Ballabh Pant Sagar:</strong> Formed behind <strong class="t-hi">Rihand Dam</strong> on <strong class="t-hi">Rihand River</strong> (Uttar Pradesh). It is the largest artificial lake in India.
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
                • <strong class="t-hi">Kaleshwaram:</strong> Lift irrigation project upstream at Medigadda (Telangana).<br />
                • <strong class="t-hi">Polavaram (Indira Sagar):</strong> Gravity dam project downstream in Eluru/East Godavari (Andhra Pradesh, declared National Project under AP Reorganisation Act 2014).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 08 · Verified PYQs ──────────────────────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Verified TGPRB Previous Questions</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">2015–2023 papers</span>
          </header>

          <div class="space-y-4">
            <div
              v-for="(pyq, idx) in pyqList"
              :key="pyq.id"
              class="panel p-5"
            >
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span class="font-mono text-[11px] accent font-bold">{{ pyq.tag }}</span>
                <span class="chip chip-mono text-[10px]">{{ pyq.exam }}</span>
              </div>
              <p class="text-[14px] font-semibold t-hi mb-3">{{ idx + 1 }}. {{ pyq.question }}</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <div
                  v-for="(opt, optIdx) in pyq.options"
                  :key="optIdx"
                  class="p-2.5 rounded-lg text-[12.5px] border b-line"
                  :class="pyq.showAnswer && optIdx === pyq.answer ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold' : 'bg-sub t-mid'"
                >
                  <span class="font-mono mr-1">({{ String.fromCharCode(65 + optIdx) }})</span> {{ opt }}
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t b-line">
                <button
                  type="button"
                  class="text-[12px] font-medium accent hover:underline"
                  @click="pyq.showAnswer = !pyq.showAnswer"
                >
                  {{ pyq.showAnswer ? 'Hide Explanation' : 'Show Answer & Explanation' }}
                </button>
              </div>

              <div v-if="pyq.showAnswer" class="mt-3 p-3 rounded-lg bg-sub text-[12px] leading-relaxed t-lo">
                <strong class="t-hi">Answer: ({{ String.fromCharCode(65 + pyq.answer) }})</strong> - {{ pyq.explanation }}
              </div>
            </div>
          </div>
        </section>

        <!-- ── 09 · Comprehension Gate ─────────────────────────────────── -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <GateQuiz note-id="NOTE-GEO-IRRIGATION" />
        </section>

        <!-- ── 10 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">Current Affairs</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <CurrentAffairsStrip note-id="NOTE-GEO-IRRIGATION" />
        </section>

        <!-- Footer Navigation -->
        <footer class="mt-16 pt-8 border-t b-line flex flex-wrap items-center justify-between gap-4">
          <NuxtLink
            to="/notes/geography/drainage-system-of-india"
            class="flex items-center gap-2 text-[13px] font-medium t-mid hover:t-hi transition-colors"
          >
            <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
            Previous: Drainage System of India
          </NuxtLink>
          <NuxtLink
            to="/notes/polity/union-executive-and-legislature"
            class="flex items-center gap-2 text-[13px] font-medium accent hover:underline"
          >
            Next: Union Executive & Parliament
            <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
          </NuxtLink>
        </footer>
      </article>

      <!-- ══ Right-side TOC (Sticky) ═════════════════════════════════════ -->
      <aside class="hidden xl:block w-64 shrink-0">
        <div class="sticky top-20 rounded-xl border b-line bg-sub p-4 text-[12px]">
          <p class="eyebrow mb-3">On this page</p>
          <nav class="space-y-1">
            <a
              v-for="s in sections"
              :key="s.id"
              :href="'#' + s.id"
              class="block py-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {{ s.label }}
            </a>
          </nav>

          <div class="mt-6 pt-4 border-t b-line">
            <p class="text-[11px] t-lo mb-2">Note Stats</p>
            <div class="space-y-1.5 font-mono text-[11px] t-mid">
              <div class="flex justify-between"><span>PYQ Weightage:</span><span class="accent">High (T1)</span></div>
              <div class="flex justify-between"><span>Verified PYQs:</span><span>29 Qs</span></div>
              <div class="flex justify-between"><span>Flashcards:</span><span>12 Cards</span></div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const readProgress = ref(0)

function onScroll() {
  const h = document.documentElement
  const b = document.body
  const st = 'scrollTop'
  const sh = 'scrollHeight'
  const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
  readProgress.value = Math.min(100, Math.max(0, percent))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
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
  { id: 'visual', label: '01 · Visual Scaffold' },
  { id: 'overview', label: '02 · Sources Breakdown' },
  { id: 'projects', label: '03 · River Valley Projects' },
  { id: 'canals', label: '04 · Major Canal Networks' },
  { id: 'telangana', label: '05 · Telangana Projects' },
  { id: 'micro-irrigation', label: '06 · Micro-Irrigation & PMKSY' },
  { id: 'memory-matrix', label: '07 · Exam Distinction Matrix' },
  { id: 'pyqs', label: '08 · Verified PYQs' },
  { id: 'gate', label: '09 · Comprehension Gate' },
  { id: 'current-affairs', label: '10 · Current Affairs' },
]

const pyqList = reactive([
  {
    id: 'PYQ-IRR-01',
    tag: 'TSLPRB SI 2022',
    exam: 'SI Prelims',
    question: 'Bhakra-Nangal project is constructed on the river:',
    options: ['Ravi', 'Chenab', 'Sutlej', 'Jhelum'],
    answer: 2,
    showAnswer: false,
    explanation: 'Bhakra-Nangal is constructed across the Sutlej river in Himachal Pradesh/Punjab. The reservoir formed is Govind Sagar.'
  },
  {
    id: 'PYQ-IRR-02',
    tag: 'TSLPRB Constable 2018',
    exam: 'Constable Mains',
    question: 'On which river is the Rajolibanda Diversion Scheme built?',
    options: ['Krishna', 'Tungabhadra', 'Godavari', 'Pennar'],
    answer: 1,
    showAnswer: false,
    explanation: 'Rajolibanda Diversion Scheme (RDS) is an anicut built across the Tungabhadra river to serve Jogulamba Gadwal and Raichur.'
  },
  {
    id: 'PYQ-IRR-03',
    tag: 'TSLPRB SI 2018',
    exam: 'SI Mains',
    question: 'Match the Following: (a) Sardar Sarovar (b) Nagarjuna Sagar (c) Hirakud (d) Bhakra Nangal with Rivers: (i) Mahanadi (ii) Sutlej (iii) Narmada (iv) Krishna',
    options: [
      'a-iii, b-iv, c-i, d-ii',
      'a-ii, b-i, c-iv, d-iii',
      'a-iv, b-iii, c-ii, d-i',
      'a-i, b-ii, c-iii, d-iv'
    ],
    answer: 0,
    showAnswer: false,
    explanation: 'Sardar Sarovar is on Narmada, Nagarjuna Sagar is on Krishna, Hirakud is on Mahanadi, and Bhakra Nangal is on Sutlej.'
  },
  {
    id: 'PYQ-IRR-04',
    tag: 'TSLPRB SI 2016',
    exam: 'SI Prelims',
    question: 'On which date did Pandit Jawaharlal Nehru lay the foundation stone for the great Nagarjuna Sagar Project?',
    options: ['10 December 1955', '15 August 1956', '26 January 1950', '2 October 1958'],
    answer: 0,
    showAnswer: false,
    explanation: 'Pandit Jawaharlal Nehru laid the foundation stone for Nagarjuna Sagar Dam across the Krishna River on 10 December 1955.'
  },
  {
    id: 'PYQ-IRR-05',
    tag: 'TSLPRB Constable 2022',
    exam: 'Constable Prelims',
    question: 'The Indian Government approved a corpus of ₹5,000 crore for setting up the Micro Irrigation Fund (MIF) with which apex financial institution?',
    options: ['RBI', 'NABARD', 'SIDBI', 'SBI'],
    answer: 1,
    showAnswer: false,
    explanation: 'The ₹5,000 crore Micro Irrigation Fund (MIF) was set up with NABARD under PMKSY to facilitate states in expanding micro-irrigation coverage.'
  }
])
</script>
