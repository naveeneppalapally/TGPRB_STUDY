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
          <span class="t-mid">Mountains in India</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 - High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 3-4 Questions (4-5 Marks)</span>
            <span class="chip">34 verified PYQs</span>
            <span class="chip">Geography</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Mountains, Ranges &amp; Passes of India
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            TGPRB Constable / SI · 2-4 direct questions per paper. Master the Himalayan ranges (KLZPS), North-to-South peak order, major mountain passes, Western &amp; Eastern Ghats, and Peninsular block mountains.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />8 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />10 practice PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~20 min read
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
            Cover all six and you master every question TGPRB has ever asked about mountains, relief divisions, passes, and peaks.
          </p>

          <!-- 2026 Predicted Question Format Callout -->
          <div class="mt-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 accent shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider accent">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> North-to-South Chronological Ordering of Ranges (Karakoram -> Ladakh -> Zaskar -> Pir Panjal -> Shivalik) and <strong class="t-hi">Match the Following</strong> (Pass ↔ State / Range and Peak ↔ Mountain System). Watch out for the trap between <strong class="t-hi">Anamudi</strong> (highest in South India) vs <strong class="t-hi">Dodda Betta</strong> (highest in Nilgiris).
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
            <span class="sec-meta hidden sm:block">spatial · relief · ranges</span>
          </header>

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            India's orography is divided into two major macro-systems: the young tertiary <strong class="t-hi">Himalayan Fold Mountains</strong> in the north (created by the collision of the Indian and Eurasian tectonic plates) and the ancient relict <strong class="t-hi">Peninsular Block &amp; Ghat Ranges</strong> in the south (Pre-Cambrian crystalline shields).
          </p>

          <!-- 1. Primary National Spatial Anchor Map: Physical Ranges & Relief of India -->
          <div class="mb-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm">
            <div class="mb-3 flex items-center justify-between border-b b-line pb-2.5">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">Master Physical Map: Mountain Ranges &amp; Plateaus of India</p>
                <p class="text-[11.5px] t-lo mt-0.5">Comprehensive spatial locator: Himalayas, Aravallis, Vindhyas, Satpura, Western &amp; Eastern Ghats</p>
              </div>
              <span class="chip chip-saffron chip-mono">Primary Spatial Anchor</span>
            </div>
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786733961/geography/india-mountain-ranges-physical-map.webp"
              alt="Complete Physical Relief and Mountain Ranges Map of India showing Himalayas, Peninsular Plateau, Western Ghats, Eastern Ghats, and Purvanchal"
              class="mx-auto block w-full h-auto max-h-[700px] object-contain rounded-lg bg-inset"
              loading="eager"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-3 text-body-xs text-gray-500 dark:text-gray-400 font-mono">
              <span>Source: Survey of India Topographic Base &amp; National Geographic Data</span>
              <span class="font-sans font-medium text-amber-600 dark:text-amber-400">Essential Spatial Anchor for TGPRB Physical Geography</span>
            </div>
          </div>

          <!-- 2. Dual Range Diagrams: KLZPS Parallel Trends & West-East Syntaxial Extent -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Himalayan Trends & KLZPS System Map -->
            <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div class="mb-3 flex items-center justify-between border-b b-line pb-2">
                  <h4 class="font-display text-[14px] font-bold t-hi">Himalayan &amp; Trans-Himalayan Parallel Systems</h4>
                  <span class="chip chip-mono text-[10px]">KLZPS Order</span>
                </div>
                <img
                  src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786733964/geography/himalayan-ranges-klzps-map.webp"
                  alt="Chart illustrating the trends of the principal mountain ranges of the Himalayan and Trans-Himalayan systems"
                  class="w-full h-auto max-h-[380px] object-contain rounded-lg bg-inset"
                  loading="lazy"
                />
              </div>
              <p class="mt-3 text-[11px] t-mid border-t b-line pt-2">
                <strong class="t-hi font-mono">North-to-South Order:</strong> Karakoram -> Ladakh -> Zaskar -> Great Himalaya -> Pir Panjal / Lesser Himalaya -> Siwalik.
              </p>
            </div>

            <!-- West-to-East Syntaxial Extent & 8000m Peaks -->
            <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div class="mb-3 flex items-center justify-between border-b b-line pb-2">
                  <h4 class="font-display text-[14px] font-bold t-hi">West-to-East Syntaxial Extent (Nanga Parbat to Namcha Barwa)</h4>
                  <span class="chip chip-mono text-[10px]">8000m Peaks</span>
                </div>
                <img
                  src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786733965/geography/himalaya-eight-thousanders-annotated-map.webp"
                  alt="NASA Landsat annotated showing the 14 eight-thousander peaks and syntaxial bends from Nanga Parbat to Namcha Barwa"
                  class="w-full h-auto max-h-[380px] object-cover rounded-lg bg-inset"
                  loading="lazy"
                />
              </div>
              <p class="mt-3 text-[11px] t-mid border-t b-line pt-2">
                <strong class="t-hi font-mono">Syntaxial Terminals:</strong> Nanga Parbat (8,126 m, Indus bend) in the West to Namcha Barwa (7,782 m, Tsangpo bend) in the East.
              </p>
            </div>
          </div>

          <!-- Ranges North to South Sequential Hierarchy Grid -->
          <div class="panel p-5 sm:p-6 mb-6">
            <div class="mb-4 flex items-center justify-between border-b b-line pb-3">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">Himalayan Ranges: North-to-South Sequential Order</p>
                <p class="text-[11.5px] t-lo mt-0.5">Tested in TGPRB sequence questions (Mnemonic: K L Z P D S)</p>
              </div>
              <span class="chip chip-saffron chip-mono">Sequence Crucial</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
              <div class="rounded-xl border b-line bg-sub p-3.5">
                <span class="chip chip-saffron text-[10px] uppercase">Rank 1 (North)</span>
                <p class="text-[15px] font-bold t-hi mt-2">Karakoram Range</p>
                <p class="text-[11px] accent font-mono mt-0.5">Trans-Himalayas</p>
                <p class="text-[11px] t-lo mt-1 leading-snug">Home to K2 (8,611 m) and Siachen Glacier (longest glacier outside polar realms).</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-3.5">
                <span class="chip text-[10px] uppercase">Rank 2</span>
                <p class="text-[15px] font-bold t-hi mt-2">Ladakh Range</p>
                <p class="text-[11px] text-sky-500 font-mono mt-0.5">Trans-Himalayas</p>
                <p class="text-[11px] t-lo mt-1 leading-snug">Lies between Indus &amp; Shyok rivers. Highest peak: Mt. Rakaposhi (steepest slope on Earth).</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-3.5">
                <span class="chip text-[10px] uppercase">Rank 3</span>
                <p class="text-[15px] font-bold t-hi mt-2">Zaskar Range</p>
                <p class="text-[11px] text-amber-500 font-mono mt-0.5">Trans / Greater</p>
                <p class="text-[11px] t-lo mt-1 leading-snug">Lies south of Indus river valley. Highest peak: Kamet (7,756 m) in Garhwal.</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-3.5">
                <span class="chip text-[10px] uppercase">Rank 4</span>
                <p class="text-[15px] font-bold t-hi mt-2">Pir Panjal / Dhauladhar</p>
                <p class="text-[11px] text-emerald-500 font-mono mt-0.5">Lesser Himalayas</p>
                <p class="text-[11px] t-lo mt-1 leading-snug">Longest range of Lesser Himalayas. Hosts Kashmir Valley &amp; Karewas saffron terraces.</p>
              </div>

              <div class="rounded-xl border b-line bg-sub p-3.5">
                <span class="chip text-[10px] uppercase">Rank 5 (South)</span>
                <p class="text-[15px] font-bold t-hi mt-2">Shivalik Range</p>
                <p class="text-[11px] text-purple-400 font-mono mt-0.5">Outer Himalayas</p>
                <p class="text-[11px] t-lo mt-1 leading-snug">Youngest southernmost range. Forms longitudinal valleys called 'Duns' (Dehradun).</p>
              </div>
            </div>

            <!-- Peninsular Ranges Quick Matrix -->
            <div class="rounded-xl border b-line bg-sub p-4 text-[12.5px]">
              <p class="font-semibold t-hi flex items-center gap-1.5 mb-2">
                <UIcon name="i-heroicons-globe-alt" class="h-4 w-4 accent" />
                Peninsular Ranges &amp; Highest Peaks Summary
              </p>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-2 font-mono text-[11px]">
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="accent block font-bold">Aravalli Range</span>
                  <span class="t-mid">Oldest fold relict mountains. Peak: Guru Shikhar (1,722 m, Mt Abu).</span>
                </div>
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="text-sky-500 block font-bold">Vindhya &amp; Satpura</span>
                  <span class="t-mid">Block mountains flanking Narmada rift valley. Satpura Peak: Dhupgarh (1,350 m).</span>
                </div>
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="text-amber-500 block font-bold">Western Ghats (Sahyadri)</span>
                  <span class="t-mid">Continuous escarpment. Peak: Anamudi (2,695 m, highest in South India).</span>
                </div>
                <div class="p-2.5 rounded-lg bg-inset border b-line">
                  <span class="text-emerald-500 block font-bold">Nilgiri &amp; Eastern Ghats</span>
                  <span class="t-mid">Nilgiri Peak: Dodda Betta (2,637 m). Eastern Ghats Peak: Jindhagada (1,690 m).</span>
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
            <span class="sec-rule" />
          </header>

          <p class="mb-5 max-w-2xl text-body leading-[1.8] t-mid">
            The physiography of India is anchored by mountain systems of two entirely different geological eras: the <strong class="font-semibold t-hi">Himalayan Arc</strong> (young, flexible, tertiary fold mountains stretching 2,400 km from the Indus gorge in the west to the Brahmaputra gorge at Namcha Barwa in the east) and the <strong class="font-semibold t-hi">Peninsular Plateau Mountain Ranges</strong> (rigid, ancient Pre-Cambrian block mountains and denuded relict ridges).
          </p>

          <div class="callout callout-saffron mb-6">
            <p class="callout-title">
              <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
              Why this topic matters for TGPRB
            </p>
            <p class="callout-body">
              34 verified PYQs across Constable + SI papers (2015-2023). Expect 2-4 direct questions per paper.
              Top question types: North-to-South range sequencing (Karakoram to Shivalik), state-wise pass connections (Zoji La, Shipki La, Nathu La, Palghat), peak superlatives (Anamudi vs Dodda Betta), and geological landforms (Duns and Karewas).
            </p>
          </div>

          <p class="text-body leading-[1.8] t-mid">
            The Himalayas act as a formidable climatic barrier, intercepting the moisture-laden South-West Monsoons to produce torrential rainfall across the Gangetic plains while shielding the Indian subcontinent from the frigid Siberian blizzards. Geologically, they were formed when the drifting <strong class="t-hi">Indian tectonic plate</strong> collided with the <strong class="t-hi">Eurasian plate</strong>, uplifting the sediments deposited in the ancient <strong class="t-hi">Tethys Sea geosyncline</strong>.
          </p>
        </section>

        <!-- ── 03 · Deep Dive ──────────────────────────────────────────── -->
        <section id="deep-dive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Deep Dive</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">ranges · passes · peaks · ghats</span>
          </header>

          <p class="mb-5 max-w-2xl text-body leading-[1.8] t-mid">
            Master the 3 parallel Himalayan belts, regional river boundaries, strategic mountain passes, and the Peninsular mountain framework.
          </p>

          <!-- 1. The Himalayan System -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">1. The Three Longitudinal Belts of the Himalayas</h3>
            <p class="text-body-xs t-lo mb-4">The Himalayas consist of three parallel mountain ranges running from west to east:</p>

            <div class="space-y-4 mb-6">
              <!-- Greater Himalayas -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">A. Greater Himalayas (Himadri / Inner Himalayas)</h4>
                  <span class="chip chip-saffron chip-mono text-[10px]">Avg Height: ~6,000 m</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  The most continuous, loftiest range on Earth. Composed of core crystalline granite rocks. Covered with permanent snow. Contains all the highest peaks: <strong class="t-hi">Mt. Everest</strong> (8,848.86 m, Nepal), <strong class="t-hi">Kanchenjunga</strong> (8,586 m, Sikkim - highest in India), <strong class="t-hi">Makalu</strong> (8,481 m), <strong class="t-hi">Dhaulagiri</strong> (8,172 m), <strong class="t-hi">Nanga Parbat</strong> (8,126 m), <strong class="t-hi">Annapurna</strong> (8,091 m), and <strong class="t-hi">Nanda Devi</strong> (7,816 m, Uttarakhand).
                </p>
              </div>

              <!-- Lesser Himalayas -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">B. Lesser Himalayas (Himachal / Middle Himalayas)</h4>
                  <span class="chip chip-mono text-[10px]">Avg Height: 3,700-4,500 m</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  Rugged and heavily compressed metamorphic rocks. Contains prominent sub-ranges: <strong class="t-hi">Pir Panjal Range</strong> (longest and most important), <strong class="t-hi">Dhauladhar Range</strong> (Himachal Pradesh), <strong class="t-hi">Nag Tibba</strong>, and <strong class="t-hi">Mahabharat Range</strong> (Nepal). Famous hill stations: Shimla, Mussoorie, Nainital, Ranikhet, Darjeeling.
                </p>
                <div class="mt-3 p-3 rounded-lg bg-inset border b-line text-[12px]">
                  <strong class="accent block mb-1">PYQ Discriminator · Karewas of Kashmir</strong>
                  <p class="t-mid">Thick lacustrine (lake silt and clay) formations found along the lower slopes of the <strong class="t-hi">Pir Panjal Range</strong> in Kashmir Valley. Famous for cultivating <strong class="t-hi">Zafran (Saffron)</strong>, walnuts, and almonds.</p>
                </div>
              </div>

              <!-- Outer Himalayas -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 class="font-display text-[15px] font-bold t-hi">C. Outer Himalayas (Shivalik Hills)</h4>
                  <span class="chip chip-mono text-[10px]">Avg Height: 900-1,100 m</span>
                </div>
                <p class="text-[13px] leading-relaxed t-mid">
                  Youngest, outermost range composed of unconsolidated river sediments, gravel, and alluvium. Highly prone to earthquakes and landslides. In Arunachal Pradesh, Shivaliks are known as <strong class="t-hi">Dafla, Miri, Abor, and Mishmi Hills</strong>.
                </p>
                <div class="mt-3 p-3 rounded-lg bg-inset border b-line text-[12px]">
                  <strong class="text-sky-500 block mb-1">PYQ Discriminator · Longitudinal Duns / Doons</strong>
                  <p class="t-mid">Longitudinal structural valleys formed between the Lesser Himalayas (Himachal) and Outer Himalayas (Shivalik). Examples: <strong class="t-hi">Dehradun</strong> (largest, ~35 km long), <strong class="t-hi">Kotli Dun</strong>, and <strong class="t-hi">Patli Dun</strong>.</p>
                </div>
              </div>
            </div>

            <!-- Regional River Divisions of Himalayas -->
            <div class="border-t b-line pt-5">
              <h4 class="text-[14px] font-bold t-hi mb-3">Regional Divisions of the Himalayas (Demarcated by River Valleys)</h4>
              <div class="overflow-x-auto">
                <table class="table-note">
                  <thead>
                    <tr>
                      <th>Division</th>
                      <th>River Boundaries</th>
                      <th>Key Ranges &amp; Peaks</th>
                      <th>Key States / Regions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="cell-key">Punjab / Kashmir Himalaya</td>
                      <td class="font-mono accent">Between Indus and Sutlej</td>
                      <td>Karakoram, Ladakh, Zaskar, Pir Panjal</td>
                      <td>J&amp;K, Ladakh, Himachal Pradesh</td>
                    </tr>
                    <tr>
                      <td class="cell-key">Kumaon Himalaya</td>
                      <td class="font-mono accent">Between Sutlej and Kali</td>
                      <td>Nanda Devi, Kamet, Trishul, Badrinath, Kedarnath</td>
                      <td>Uttarakhand</td>
                    </tr>
                    <tr>
                      <td class="cell-key">Nepal Himalaya</td>
                      <td class="font-mono accent">Between Kali and Teesta</td>
                      <td>Mt. Everest, Kanchenjunga, Makalu, Annapurna</td>
                      <td>Nepal, Sikkim, Northern West Bengal</td>
                    </tr>
                    <tr>
                      <td class="cell-key">Assam Himalaya</td>
                      <td class="font-mono accent">Between Teesta and Dihang (Brahmaputra)</td>
                      <td>Namcha Barwa, Kula Kangri</td>
                      <td>Arunachal Pradesh, Assam, Bhutan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Peak Photography Gallery -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">Himalayan Peak Photography &amp; Geomorphic Landforms</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- K2 -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731872/geography/k2-godwin-austen.webp"
                    alt="Mount K2 Godwin Austen in the Karakoram Range"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip chip-saffron text-[10px] mb-1">8,611 m</span>
                    <h5 class="text-[13px] font-bold t-hi">K2 (Godwin Austen)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Karakoram Range · 2nd highest peak in the world.</p>
                  </div>
                </div>
              </div>

              <!-- Kangchenjunga -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731871/geography/kanchenjunga-peak.webp"
                    alt="Kangchenjunga peak viewed from Sikkim"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip chip-saffron text-[10px] mb-1">8,586 m</span>
                    <h5 class="text-[13px] font-bold t-hi">Kangchenjunga</h5>
                    <p class="text-[11px] t-mid mt-0.5">Sikkim-Nepal border · Highest peak in Indian territory.</p>
                  </div>
                </div>
              </div>

              <!-- Nanda Devi -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731870/geography/nanda-devi-peak.webp"
                    alt="Mount Nanda Devi in Garhwal Himalayas Uttarakhand"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip text-[10px] mb-1">7,816 m</span>
                    <h5 class="text-[13px] font-bold t-hi">Nanda Devi</h5>
                    <p class="text-[11px] t-mid mt-0.5">Garhwal Himalayas · Highest peak entirely within India.</p>
                  </div>
                </div>
              </div>

              <!-- Karewas Valley -->
              <div class="rounded-xl border b-line bg-sub overflow-hidden flex flex-col">
                <div class="aspect-video w-full overflow-hidden bg-inset">
                  <img
                    src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731870/geography/karewas-kashmir-valley.webp"
                    alt="Kashmir Valley with Karewa terraces and Pir Panjal range"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="chip text-[10px] mb-1">Lacustrine Terrace</span>
                    <h5 class="text-[13px] font-bold t-hi">Karewas of Kashmir</h5>
                    <p class="text-[11px] t-mid mt-0.5">Pir Panjal slopes · Saffron &amp; almond cultivation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Mountain Passes of India -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">2. Strategic Mountain Passes of India</h3>
            <p class="text-body-xs t-lo mb-3">State ↔ Mountain Pass ↔ Connected Regions tested in TGPRB match-the-following questions:</p>
            <div class="overflow-x-auto mb-6">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Pass Name</th>
                    <th>State / UT</th>
                    <th>Mountain Range</th>
                    <th>Connects / Strategic Significance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Zoji La</td>
                    <td class="font-mono accent">Ladakh / J&amp;K</td>
                    <td>Great Himalayas</td>
                    <td><strong class="t-hi">Srinagar to Leh</strong> (NH 1D). Gateway to Ladakh.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Banihal Pass</td>
                    <td class="font-mono accent">Jammu &amp; Kashmir</td>
                    <td>Pir Panjal Range</td>
                    <td><strong class="t-hi">Jammu to Srinagar</strong>. Contains the historic <strong class="t-hi">Jawahar Tunnel</strong>.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Shipki La</td>
                    <td class="font-mono accent">Himachal Pradesh</td>
                    <td>Zaskar Range</td>
                    <td>Connects HP with Tibet. <strong class="t-hi">Sutlej River enters India</strong> through this pass gorge.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Rohtang Pass</td>
                    <td class="font-mono accent">Himachal Pradesh</td>
                    <td>Pir Panjal Range</td>
                    <td>Connects <strong class="t-hi">Kullu Valley with Lahaul and Spiti</strong>. Underneath lies the 9.02 km <strong class="t-hi">Atal Tunnel</strong>.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Bara-lacha La</td>
                    <td class="font-mono accent">Himachal Pradesh</td>
                    <td>Zaskar Range</td>
                    <td>Connects <strong class="t-hi">Lahaul (HP) with Leh (Ladakh)</strong> on the Manali-Leh Highway.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Lipulekh Pass</td>
                    <td class="font-mono accent">Uttarakhand</td>
                    <td>Kumaon Himalayas</td>
                    <td>Tri-junction of India-China-Nepal. Key route for <strong class="t-hi">Kailash-Mansarovar Yatra</strong>.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Mana &amp; Niti Passes</td>
                    <td class="font-mono accent">Uttarakhand</td>
                    <td>Great Himalayas</td>
                    <td>Connects Uttarakhand (Garhwal) to Tibet. Mana is the last Indian village before Tibet.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Nathu La</td>
                    <td class="font-mono accent">Sikkim</td>
                    <td>Dongkya Range</td>
                    <td>Connects <strong class="t-hi">Sikkim with Tibet (Chumbi Valley)</strong>. Part of the ancient Silk Route. Reopened in 2006.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Jelep La</td>
                    <td class="font-mono accent">Sikkim</td>
                    <td>Great Himalayas</td>
                    <td>Connects Sikkim and Kalimpong (WB) with Lhasa (Tibet) via Chumbi Valley.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Bomdi La</td>
                    <td class="font-mono accent">Arunachal Pradesh</td>
                    <td>Greater Himalayas</td>
                    <td>Connects <strong class="t-hi">Arunachal Pradesh (Tawang) with Lhasa</strong> (Tibet).</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Diphu Pass</td>
                    <td class="font-mono accent">Arunachal Pradesh</td>
                    <td>Mishmi Hills</td>
                    <td>Strategic tri-junction border pass of <strong class="t-hi">India, China, and Myanmar</strong>.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Thal Ghat (Kasara)</td>
                    <td class="font-mono accent">Maharashtra</td>
                    <td>Western Ghats (Sahyadri)</td>
                    <td>Connects <strong class="t-hi">Mumbai to Nashik and Kolkata</strong>.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Bhor Ghat</td>
                    <td class="font-mono accent">Maharashtra</td>
                    <td>Western Ghats (Sahyadri)</td>
                    <td>Connects <strong class="t-hi">Mumbai to Pune and Chennai</strong>.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Palghat Gap (Palakkad)</td>
                    <td class="font-mono accent">Kerala / Tamil Nadu</td>
                    <td>Between Nilgiris &amp; Anamalai</td>
                    <td>Connects <strong class="t-hi">Palakkad (Kerala) with Coimbatore (TN)</strong>. Breaks continuity of Western Ghats.</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Shencottah Gap</td>
                    <td class="font-mono accent">Kerala / Tamil Nadu</td>
                    <td>Cardamom Hills</td>
                    <td>Connects <strong class="t-hi">Kollam (Kerala) with Madurai (TN)</strong>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Passes Visual Gallery -->
            <div class="border-t b-line pt-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.14em] t-lo mb-3 font-semibold">Strategic Mountain Passes Gallery</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Zoji La -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731864/geography/zojila-mountain-pass.webp"
                      alt="Zoji La pass highway connecting Srinagar and Leh"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Zoji La (Ladakh)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Srinagar to Leh highway across Great Himalayas.</p>
                  </div>
                </div>

                <!-- Nathu La -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731869/geography/nathula-pass-sikkim.webp"
                      alt="Nathu La border pass in Sikkim"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Nathu La (Sikkim)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Ancient Silk Route into Chumbi Valley of Tibet.</p>
                  </div>
                </div>

                <!-- Rohtang Pass -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731866/geography/rohtang-pass-himachal.webp"
                      alt="Rohtang Pass in Himachal Pradesh"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Rohtang Pass (HP)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Pir Panjal Range · Connects Kullu with Lahaul-Spiti.</p>
                  </div>
                </div>

                <!-- Palghat Gap -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731868/geography/palghat-gap-western-ghats.webp"
                      alt="Palghat Gap in the Western Ghats between Nilgiris and Anamalai"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <h5 class="text-[13px] font-bold t-hi">Palghat Gap (South)</h5>
                    <p class="text-[11px] t-mid mt-0.5">Major natural break between Nilgiris and Anamalai Hills.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Peninsular Mountain Ranges -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">3. Peninsular Mountain Ranges &amp; Coastal Ghats</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <!-- Aravalli -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip chip-saffron mb-2">Relict Fold Mountain</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Aravalli Range</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  One of the <strong class="t-hi">oldest fold mountain systems in the world</strong> (Pre-Cambrian). Extends ~800 km from Gujarat (Palanpur) through Rajasthan and Haryana to Delhi (Delhi Ridge / Raisina Hill). Highest peak is <strong class="t-hi">Guru Shikhar (1,722 m)</strong> located on Mount Abu. Contains famous Dilwara Jain Temples.
                </p>
              </div>

              <!-- Vindhyan Range -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip mb-2">North-South Watershed</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Vindhya Range</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  Runs parallel to the north of the Narmada River rift valley across Madhya Pradesh and Uttar Pradesh. Composed of sedimentary sandstones. Acts as the <strong class="t-hi">primary geographical divide between Northern India (Ganga Basin) and Southern India (Peninsula)</strong>. Highest point: Sadbhavna Shikhar / Kalumar Peak (752 m).
                </p>
              </div>

              <!-- Satpura Range -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip mb-2">Central Block Mountain</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Satpura Range</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  A classic horst/block mountain range lying between two rift valleys: <strong class="t-hi">Narmada to the north</strong> and <strong class="t-hi">Tapi to the south</strong>. Subdivided into: Rajpipla Hills (west) -> Mahadeo Hills (central) -> Maikal Range (east). Highest peak is <strong class="t-hi">Dhupgarh (1,350 m)</strong> located in Mahadeo Hills near Pachmarhi. Amarkantak plateau (Maikal Range) is the radial source of Narmada, Son, and Johilla rivers.
                </p>
              </div>

              <!-- Nilgiri Hills -->
              <div class="rounded-xl border b-line bg-sub p-4">
                <span class="chip chip-saffron mb-2">Ghats Confluence</span>
                <h4 class="font-display text-[15px] font-bold t-hi mb-1">Nilgiri Hills (Blue Mountains)</h4>
                <p class="text-[13px] leading-relaxed t-mid">
                  The physiological <strong class="t-hi">knot where the Western Ghats and Eastern Ghats converge</strong>. Tri-junction of Tamil Nadu, Kerala, and Karnataka. Highest peak is <strong class="t-hi">Dodda Betta (2,637 m)</strong> (second highest peak in South India). Famous hill station: Ooty (Udhagamandalam). Hosts Toda tribal community.
                </p>
              </div>
            </div>

            <!-- Peninsular Peaks Gallery -->
            <div class="border-t b-line pt-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.14em] t-lo mb-3 font-semibold">Peninsular Peaks &amp; Hill Ranges Gallery</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Anamudi -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731876/geography/anamudi-western-ghats.webp"
                      alt="Anamudi peak in Anamalai Hills of Western Ghats in Kerala"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip chip-saffron text-[10px] mb-1">2,695 m · Highest in South</span>
                    <h5 class="text-[13px] font-bold t-hi">Anamudi Peak</h5>
                    <p class="text-[11px] t-mid mt-0.5">Anamalai Hills (Kerala) · Highest point of Peninsular India.</p>
                  </div>
                </div>

                <!-- Doddabetta -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731875/geography/doddabetta-nilgiri-hills.webp"
                      alt="Dodda Betta peak in Nilgiri Hills of Tamil Nadu"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">2,637 m · Highest in Nilgiris</span>
                    <h5 class="text-[13px] font-bold t-hi">Dodda Betta</h5>
                    <p class="text-[11px] t-mid mt-0.5">Nilgiri Hills (Tamil Nadu) · 2nd highest peak in South India.</p>
                  </div>
                </div>

                <!-- Guru Shikhar -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731875/geography/guru-shikhar-aravalli.webp"
                      alt="Guru Shikhar peak in Aravalli Range at Mount Abu"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">1,722 m · Highest in Aravalli</span>
                    <h5 class="text-[13px] font-bold t-hi">Guru Shikhar</h5>
                    <p class="text-[11px] t-mid mt-0.5">Mount Abu (Rajasthan) · Highest summit of Aravalli Range.</p>
                  </div>
                </div>

                <!-- Satpura Range -->
                <div class="rounded-xl border b-line bg-sub overflow-hidden">
                  <div class="aspect-video w-full overflow-hidden bg-inset">
                    <img
                      src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786731865/geography/satpura-mahadeo-range.webp"
                      alt="Satpura mountain ranges in Central India"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3">
                    <span class="chip text-[10px] mb-1">1,350 m · Dhupgarh</span>
                    <h5 class="text-[13px] font-bold t-hi">Satpura &amp; Mahadeo</h5>
                    <p class="text-[11px] t-mid mt-0.5">Pachmarhi (MP) · Horst block range between Narmada &amp; Tapi.</p>
                  </div>
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
            <span class="sec-meta hidden sm:block">ghats comparison · peak rankings</span>
          </header>

          <p class="mb-4 text-body leading-[1.8] t-mid">
            Master the contrastive distinctions between the Western Ghats and Eastern Ghats:
          </p>

          <!-- Western vs Eastern Ghats Table -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">Western Ghats (Sahyadri) vs Eastern Ghats (Purva Ghat)</h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Western Ghats (Sahyadri)</th>
                    <th>Eastern Ghats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Continuity</td>
                    <td class="font-mono accent font-semibold">Continuous</td>
                    <td class="font-mono text-sky-500 font-semibold">Discontinuous &amp; Dissected</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Gaps / Passes</td>
                    <td>Passable only via gaps: Thal Ghat, Bhor Ghat, Palghat</td>
                    <td>Dissected by major rivers: Godavari, Krishna, Mahanadi, Cauvery</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Average Elevation</td>
                    <td class="cell-num">900-1,600 metres (Higher)</td>
                    <td class="cell-num">~600 metres (Lower)</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Highest Peak</td>
                    <td><strong class="t-hi">Anamudi (2,695 m)</strong> in Anamalai Hills</td>
                    <td><strong class="t-hi">Jindhagada Peak (1,690 m)</strong> in Araku Valley / Mahendragiri (1,501 m)</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Rainfall Nature</td>
                    <td>Heavy orographic rain on windward side (200-400 cm)</td>
                    <td>Moderate rain, mostly during retreating NE Monsoon (Oct-Dec)</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Ecological Status</td>
                    <td>UNESCO World Heritage Site · Global Biodiversity Hotspot</td>
                    <td>Heavily degraded, scattered hills (Javadi, Shevaroy, Nallamala, Velikonda)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Highest Peaks of India Matrix -->
          <div class="panel p-5 sm:p-6 mb-6">
            <h3 class="font-display text-[16px] font-bold t-hi mb-3">Highest Mountain Peaks in India by System</h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr>
                    <th>Mountain System</th>
                    <th>Highest Peak</th>
                    <th>Elevation</th>
                    <th>Location / State</th>
                    <th>Key Distinction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-key">Karakoram (Trans-Himalaya)</td>
                    <td class="font-mono accent font-semibold">K2 (Godwin Austen)</td>
                    <td class="cell-num">8,611 m</td>
                    <td>Ladakh (PoK) / Gilgit-Baltistan</td>
                    <td>2nd highest peak in the world</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Greater Himalayas (India)</td>
                    <td class="font-mono accent font-semibold">Kangchenjunga</td>
                    <td class="cell-num">8,586 m</td>
                    <td>Sikkim</td>
                    <td>Highest peak in undisputed Indian territory</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Garhwal Himalayas (Pure India)</td>
                    <td class="font-mono accent font-semibold">Nanda Devi</td>
                    <td class="cell-num">7,816 m</td>
                    <td>Uttarakhand</td>
                    <td>Highest peak completely within Indian borders</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Western Ghats / South India</td>
                    <td class="font-mono accent font-semibold">Anamudi</td>
                    <td class="cell-num">2,695 m</td>
                    <td>Kerala (Anamalai Hills)</td>
                    <td>Highest summit in Peninsular / South India</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Nilgiri Hills</td>
                    <td class="font-mono accent font-semibold">Dodda Betta</td>
                    <td class="cell-num">2,637 m</td>
                    <td>Tamil Nadu</td>
                    <td>2nd highest in South India; highest in Nilgiris</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Aravalli Range</td>
                    <td class="font-mono accent font-semibold">Guru Shikhar</td>
                    <td class="cell-num">1,722 m</td>
                    <td>Rajasthan (Mount Abu)</td>
                    <td>Highest summit of the ancient Aravalli relict range</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Eastern Ghats</td>
                    <td class="font-mono accent font-semibold">Jindhagada / Arma Konda</td>
                    <td class="cell-num">1,690 m</td>
                    <td>Andhra Pradesh (Visakhapatnam)</td>
                    <td>Highest peak of the discontinuous Eastern Ghats</td>
                  </tr>
                  <tr>
                    <td class="cell-key">Satpura Range</td>
                    <td class="font-mono accent font-semibold">Dhupgarh</td>
                    <td class="cell-num">1,350 m</td>
                    <td>Madhya Pradesh (Mahadeo Hills)</td>
                    <td>Highest peak of Central India block mountains</td>
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
            Negative marking traps designed by exam setters to induce errors:
          </p>

          <div class="space-y-4">
            <div class="callout callout-red">
              <p class="callout-title">Trap 1: Anamudi vs Dodda Betta</p>
              <p class="callout-body">
                • <strong class="t-hi">Anamudi (2,695 m):</strong> Located in <strong class="t-hi">Anamalai Hills</strong> (Kerala). Highest peak in all of South India / Peninsular India.<br />
                • <strong class="t-hi">Dodda Betta (2,637 m):</strong> Located in <strong class="t-hi">Nilgiri Hills</strong> (Tamil Nadu). Highest peak ONLY of the Nilgiris (2nd highest in South India).
              </p>
            </div>

            <div class="callout callout-saffron">
              <p class="callout-title">Trap 2: Western Ghats Passes (North to South Order: T B P S)</p>
              <p class="callout-body">
                Remember the formula <strong class="t-hi font-mono">T B P S</strong>:<br />
                1. <strong class="t-hi">T - Thal Ghat:</strong> Mumbai to Nashik (Northernmost)<br />
                2. <strong class="t-hi">B - Bhor Ghat:</strong> Mumbai to Pune<br />
                3. <strong class="t-hi">P - Palghat Gap:</strong> Palakkad (Kerala) to Coimbatore (TN)<br />
                4. <strong class="t-hi">S - Shencottah Gap:</strong> Kollam (Kerala) to Madurai (TN) (Southernmost)
              </p>
            </div>

            <div class="callout">
              <p class="callout-title">Trap 3: Garo, Khasi, Jaintia Hills Are NOT Part of the Himalayas</p>
              <p class="callout-body">
                The <strong class="t-hi">Garo, Khasi, and Jaintia Hills</strong> forming the Meghalaya (Shillong) Plateau are geologically an <strong class="t-hi">outlier extension of the Peninsular Deccan Plateau</strong>, separated by the <strong class="t-hi">Malda Fault (Garo-Rajmahal Gap)</strong>. They are NOT fold mountains and are NOT part of the Himalayas or Purvanchal.
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
              These questions use <strong class="t-hi">multi-statement, 4x4 matching, and assertion-reason</strong> formats
              from recent TGPSC Group-I patterns. TGPRB papers (2022-2023) remain
              <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your spatial and conceptual recall.
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
                  note-id="NOTE-GEO-MOUNTAINS"
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

        <!-- ── 08 · Comprehension Gate ─────────────────────────────────── -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <GateQuiz note-id="NOTE-GEO-MOUNTAINS" />
        </section>

        <!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <CurrentAffairsStrip note-id="NOTE-GEO-MOUNTAINS" />
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
            <p class="text-body-xs leading-relaxed t-lo">2-4 questions per paper, every year since 2015.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

useHead({
  title: 'Mountains, Ranges & Passes of India - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Complete TGPRB study note: Mountains, Ranges & Passes of India with Himalayan sequence (KLZPS), Western and Eastern Ghats, Peak superlatives, Duns, Karewas, and verified PYQs.' }],
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
  { label: 'Himalayan Belt (Himadri, Himachal, Shivalik)' },
  { label: 'North-to-South Range Sequence (KLZPS)' },
  { label: 'Strategic Mountain Passes & Connectors' },
  { label: 'Western & Eastern Ghats Comparison' },
  { label: 'Peninsular Ranges (Aravalli, Vindhya, Satpura)' },
  { label: 'Landforms: Duns, Karewas & Peak Superlatives' },
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

const textHierarchy = `MOUNTAINS OF INDIA (Macro Structure & Spatial Order)
|-- 1. TRANS-HIMALAYAS (North of Great Himalayas)
|   |-- Karakoram Range  -> K2 / Godwin Austen (8,611 m) | Siachen Glacier
|   |-- Ladakh Range     -> Between Indus & Shyok | Khardung La
|   +-- Zaskar Range     -> Between Indus & Great Himalayas | Kamet (7,756 m)
|
|-- 2. HIMALAYAN SYSTEM (Tertiary Fold Mountains)
|   |-- Greater Himalayas (Himadri)  -> Everest (8,848.86 m), Kanchenjunga (8,586 m), Nanda Devi (7,816 m)
|   |-- Lesser Himalayas (Himachal) -> Pir Panjal (longest), Dhauladhar, Mahabharat | Karewas Saffron Soil
|   |-- Outer Himalayas (Shivalik)  -> Youngest range | Duns / Doons (Dehradun) | Mishmi Hills in AP
|   +-- Purvanchal (Eastern Hills)  -> Patkai Bum, Naga Hills, Mizo (Lushai) Hills
|
|-- 3. PENINSULAR MOUNTAIN RANGES
|   |-- Aravalli Range   -> Oldest relict fold mountain | Guru Shikhar (1,722 m, Mt Abu)
|   |-- Vindhya Range    -> North of Narmada rift | Watershed between Ganga & Peninsular rivers
|   |-- Satpura Range    -> Horst block between Narmada & Tapi | Dhupgarh (1,350 m, Mahadeo Hills)
|   |-- Western Ghats    -> Continuous escarpment | Anamudi (2,695 m, highest in South India)
|   |-- Eastern Ghats    -> Discontinuous broken ranges | Jindhagada Peak (1,690 m) / Mahendragiri
|   +-- Nilgiri Hills    -> Western & Eastern Ghats junction knot | Dodda Betta (2,637 m)`

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
    uid: 'PYQ-MNT-01',
    source: 'Constable 2018 Prelims',
    tag: 'Mountain Ranges Sequence',
    question: 'Consider the following ranges in Himalayas and find out the correct sequence from North to South:\n(a) Zaskar range\n(b) Pir Panjal range\n(c) Shivalik range\n(d) Ladakh range',
    options: [
      '(d) - (a) - (b) - (c)',
      '(a) - (d) - (b) - (c)',
      '(d) - (b) - (a) - (c)',
      '(b) - (d) - (a) - (c)'
    ],
    correct: 0,
    explanation: 'The correct sequence from North to South is: Ladakh range (d) -> Zaskar range (a) -> Pir Panjal range (b) -> Shivalik range (c). Remember the mnemonic KLZPS (Karakoram, Ladakh, Zaskar, Pir Panjal, Shivalik).',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-02',
    source: 'SI 2018 Mains',
    tag: 'Peak & Range Matching',
    question: 'Match the following:\nList-I (Peaks & Ranges)\n(a) Aravali Hills\n(b) Highest Peak of Nilgiris\n(c) Mahendragiri Hills\n(d) Western Ghats\n\nList-II (Geographical Formations)\n(i) Eastern Ghats\n(ii) Kondesh Hills\n(iii) Dodda Betta\n(iv) Malwa plateau',
    options: [
      '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)',
      '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)',
      '(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)'
    ],
    correct: 2,
    explanation: 'Aravalli Hills borders Malwa plateau; Highest Peak of Nilgiris is Dodda Betta (2,637 m); Mahendragiri is situated in the Eastern Ghats (Odisha); Western Ghats connects with Kondesh hills.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-03',
    source: 'SI 2016 Prelims',
    tag: 'Mountain Superlatives',
    question: 'Match the following:\nList-I\n(a) Siachen glacier\n(b) Bundi hills\n(c) Highest point of Satpura hills\n(d) Shivalik Range\n\nList-II\n(I) Malwa plateau\n(II) Mishmi Hills\n(III) Karakoram Range\n(IV) Mahadeo Hills',
    options: [
      '(a)-(I), (b)-(III), (c)-(IV), (d)-(II)',
      '(a)-(III), (b)-(IV), (c)-(I), (d)-(II)',
      '(a)-(III), (b)-(I), (c)-(IV), (d)-(II)',
      '(a)-(IV), (b)-(I), (c)-(III), (d)-(II)'
    ],
    correct: 2,
    explanation: 'Siachen glacier is in the Karakoram Range (III); Bundi hills border the Malwa plateau (I); Highest point of Satpura hills is Mount Dhupgarh in Mahadeo Hills (IV); In Arunachal Pradesh, Shivalik Range is known as Mishmi Hills (II).',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-04',
    source: 'Constable 2016 Mains',
    tag: 'Karewas Landform',
    question: 'Karewas of Kashmir are generally found along the lower slopes of:',
    options: [
      'Pir Panjal',
      'Dhauladhar',
      'Karol',
      'Kathmandu valley'
    ],
    correct: 0,
    explanation: 'Karewas are thick lacustrine (lake clay and silt) terrace deposits formed during the Pleistocene epoch, situated along the lower slopes of the Pir Panjal range in the Kashmir Valley. They are exceptionally fertile for Saffron (Zafran) cultivation.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-05',
    source: 'Constable 2022 Prelims',
    tag: 'Duns & Longitudinal Valleys',
    question: 'The longitudinal valleys also called Duns/Doons are found in:',
    options: [
      'Greater Himalayas',
      'Trans-Himalayas',
      'Lesser-Himalayas',
      'Shiwalik Hills'
    ],
    correct: 3,
    explanation: 'Duns (or Doons) are longitudinal structural valleys formed between the Lesser Himalayas (Himachal) and the Outer Himalayas (Shiwalik Hills). Examples include Dehradun, Kotli Dun, and Patli Dun.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-06',
    source: 'Constable 2016 Prelims',
    tag: 'Western Ghats Passes',
    question: 'Match the following:\nList - I\n(a) Guru Shikhar Peak\n(b) Dhuandhar waterfall\n(c) Thalghat gap\n(d) Coral reefs\n\nList - II\n(i) Western Ghats\n(ii) Lakshadweep\n(iii) Aravalli Range\n(iv) Narmada River',
    options: [
      '(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)',
      '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)',
      '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)'
    ],
    correct: 1,
    explanation: 'Guru Shikhar is in Aravalli Range (iii); Dhuandhar waterfall is on Narmada River (iv); Thalghat is a major pass in Western Ghats (i); Coral reefs form the Lakshadweep Islands (ii).',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-07',
    source: 'SI 2022 Prelims',
    tag: 'Greater Himalayas Peaks',
    question: 'Gosainthan peak (Shishapangma) is situated in:',
    options: [
      'Trans-Himalayas',
      'Greater-Himalayas',
      'Lesser-Himalayas',
      'Shiwalik Hills'
    ],
    correct: 1,
    explanation: 'Gosainthan (Shishapangma, 8,027 m) is the 14th highest mountain in the world, located in the Greater Himalayas (Himadri) range.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-08',
    source: 'Constable 2018 Mains',
    tag: 'Shivalik Regional Names',
    question: 'Read the following statements:\n(a) In Arunachal Pradesh, the Siwalik range of hills are called Mishmi hills.\n(b) Minicoy islands are located in the Arabian Sea.\n(c) Conifer wood is used as raw material to manufacture paper.\n\nThe correct answer is:',
    options: [
      'Only (a) and (b) are correct',
      'All (a), (b) and (c) are correct',
      'Only (b) and (c) are correct',
      'Only (a) and (c) are correct'
    ],
    correct: 1,
    explanation: 'All three statements are correct. In Arunachal Pradesh, the Shivalik hills are called Dafla, Miri, Abor, and Mishmi hills; Minicoy is the southernmost island of Lakshadweep in Arabian Sea; Coniferous softwood from temperate Himalayas is the primary raw material for paper pulp.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-09',
    source: 'SI 2018 Prelims',
    tag: 'Highest Peak South India',
    question: 'Which is the highest peak in the Western Ghats and the entire South Indian peninsula?',
    options: [
      'Dodda Betta',
      'Anamudi',
      'Kalsubai',
      'Mullayanagiri'
    ],
    correct: 1,
    explanation: 'Anamudi (2,695 m), located in the Anamalai Hills of Kerala, is the highest peak in South India and the Western Ghats. Dodda Betta (2,637 m) is the highest peak in the Nilgiri Hills.',
    selected: null,
    revealed: false,
  },
  {
    uid: 'PYQ-MNT-10',
    source: 'Constable 2015 Prelims',
    tag: 'Mountain Passes',
    question: 'Which strategic mountain pass connects the city of Srinagar with Leh in Ladakh?',
    options: [
      'Shipki La',
      'Nathu La',
      'Zoji La',
      'Bara-lacha La'
    ],
    correct: 2,
    explanation: 'Zoji La (elevation 3,528 m) connects Srinagar with Dras and Leh across the Great Himalayan range on National Highway 1D.',
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
    uid: 'ADV-GEO-MTN-001',
    question: 'Consider the following two statements:\n\nAssertion (A): Orographic precipitation results when moving moisture-laden air strikes a topographic barrier and is forced upwards.\nReason (R): Most of the precipitation falls on the windward side of the barrier and the leeward side is likely to be dry.\n\nChoose the correct answer:',
    options: [
      '(A) is true, but (R) is false.',
      'Both (A) and (R) are true and (R) is the correct explanation of (A).',
      '(A) is false, but (R) is true.',
      'Both (A) and (R) are true, but (R) is not the correct explanation of (A).'
    ],
    correct: 3,
    explanation: 'Assertion (A) describes the physical mechanism (adiabatic cooling through forced ascent). Reason (R) describes the spatial consequence (rain shadow on leeward slope). While both statements are factually true, (R) is the outcome, not the causal mechanism of (A).',
    source: 'TGPSC Group-I 2024, Q64',
    format: 'Assertion-Reason',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-MTN-002',
    question: 'Consider the following mountain ranges of the Trans-Himalayan and Himalayan systems. Arrange them in the correct North-to-South sequence:\n\nA. Zaskar Range\nB. Karakoram Range\nC. Pir Panjal Range\nD. Ladakh Range\n\nChoose the correct order:',
    options: [
      'B, D, A, C',
      'B, A, D, C',
      'D, B, A, C',
      'B, D, C, A'
    ],
    correct: 0,
    explanation: 'The correct North-to-South mnemonic order is KLZPS: Karakoram (B) -> Ladakh (D) -> Zaskar (A) -> Pir Panjal (C) -> Shivalik.',
    source: 'Synthetic - derived from PYQ KLZPS sequence rule',
    format: 'Spatial Sequence',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-MTN-003',
    question: 'Match the following strategic mountain passes with the regions/cities they connect:\n\nList I (Pass):\nA. Zoji La\nB. Shipki La\nC. Nathu La\nD. Thalghat\n\nList II (Connector):\nI. Himachal Pradesh to Tibet (Sutlej gorge)\nII. Mumbai to Nashik\nIII. Srinagar to Leh (Ladakh)\nIV. Sikkim to Tibet (Chumbi Valley)',
    options: [
      'A-III, B-I, C-IV, D-II',
      'A-III, B-IV, C-I, D-II',
      'A-I, B-III, C-IV, D-II',
      'A-III, B-I, C-II, D-IV'
    ],
    correct: 0,
    explanation: 'Zoji La connects Srinagar to Leh (III). Shipki La links Himachal with Tibet along the Sutlej gorge (I). Nathu La links Sikkim with Chumbi Valley, Tibet (IV). Thalghat connects Mumbai with Nashik across the Western Ghats (II).',
    source: 'Synthetic - derived from PYQ pass inventory',
    format: 'Matching',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-MTN-004',
    question: 'Consider the following statements regarding Peninsular mountain ranges:\n\nA. Anamudi (2,695 m) in the Anaimalai Hills is the highest peak in South India.\nB. Doddabetta (2,637 m) is the highest peak in the Nilgiri Hills where Western and Eastern Ghats meet.\nC. Guru Shikhar (1,722 m) in Mount Abu is the highest peak of the Satpura Range.\nD. Dhupgarh (1,350 m) near Pachmarhi is the highest peak of the Satpura Range.\n\nWhich of the above statements are correct?',
    options: [
      'A, B and D only',
      'A, B and C only',
      'B, C and D only',
      'A, B, C and D'
    ],
    correct: 0,
    explanation: 'Statements A, B, and D are correct. Statement C is false: Guru Shikhar (1,722 m) is the highest peak of the Aravalli Range, not the Satpura Range.',
    source: 'Synthetic - derived from PYQ peak superlatives',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-MTN-005',
    question: 'Which of the following statements comparing the Western Ghats and Eastern Ghats are correct?\n\nA. Western Ghats form an unbroken, continuous escarpment traversable only through passes like Thalghat and Bhorghat.\nB. Eastern Ghats are discontinuous and highly dissected by major East-flowing rivers like Godavari, Krishna, and Mahanadi.\nC. The average elevation of Eastern Ghats (1,500 m) is higher than that of Western Ghats (900-1,600 m).\nD. Western Ghats cause heavy orographic rainfall along their windward western slopes.\n\nChoose the correct answer:',
    options: [
      'A, B and D only',
      'A and B only',
      'B, C and D only',
      'A, B, C and D'
    ],
    correct: 0,
    explanation: 'Western Ghats are continuous (A), Eastern Ghats are dissected by rivers (B), and Western Ghats receive heavy orographic rain (D). Statement C is false: Western Ghats average 900-1,600 m whereas Eastern Ghats average only ~600 m.',
    source: 'Synthetic - derived from NCERT & PYQ Ghats contrast',
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
