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
          <span class="t-mid">Forests &amp; Natural Vegetation in India</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 - High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 3-4 Questions (4-5 Marks)</span>
            <span class="chip">10 verified PYQs</span>
            <span class="chip">Geography</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Forests, Natural Vegetation &amp; Protected Areas of India
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            TGPRB Constable / SI · Core environmental geography note. Master Champion &amp; Seth vegetation zones, India State of Forest Report (ISFR) statistics, Biosphere Reserves, National Parks, Project Tiger, and Telangana's Kawal &amp; Amrabad sanctuaries.
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
            Master the spatial distributions, characteristic tree species, state forest cover rankings, and environmental movements.
          </p>

          <!-- 2026 Predicted Question Format Callout -->
          <div class="mt-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 accent shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider accent">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> <strong class="t-hi">Match the Following</strong> (National Park / Biosphere Reserve ↔ State / District, e.g., Keibul Lamjao ↔ Manipur, Dachigam ↔ J&amp;K, Silent Valley ↔ Kerala) and <strong class="t-hi">Vegetation ↔ Tree Species</strong> (Teak &amp; Sal ↔ Tropical Deciduous; Rosewood &amp; Mahogany ↔ Tropical Evergreen). Watch out for <strong class="t-hi">Telangana's Kawal vs Amrabad Tiger Reserves</strong> and <strong class="t-hi">Largest Area (MP) vs Highest % (Mizoram)</strong>.
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · The Visual Architecture ────────────────────────────── -->
        <section id="visual" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">The Visual Architecture</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="visual" section-label="The Visual Architecture" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">vegetation zones · biosphere reserves</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="visual" section-label="The Visual Architecture" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            India's vegetation spans six major bioclimatic zones determined by rainfall gradients, temperature, and relief: from the wet evergreen rainforests of the Western Ghats to the alpine meadows of the high Himalayas.
          </p>

          <!-- 1. Primary National Spatial Anchor Map: Natural Vegetation & Forest Types of India -->
          <div class="mb-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm">
            <div class="mb-3 flex items-center justify-between border-b b-line pb-2.5">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">Master Natural Vegetation &amp; Forest Zones Map of India</p>
                <p class="text-[11.5px] t-lo mt-0.5">Champion &amp; Seth classification: Tropical Wet Evergreen, Moist Deciduous, Dry Deciduous, Thorn, and Montane</p>
              </div>
              <span class="chip chip-saffron chip-mono">Primary Spatial Anchor</span>
            </div>
            <img
              src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786735509/geography/india-natural-vegetation-map.webp"
              alt="Natural Vegetation Map of India showing Tropical Evergreen, Tropical Deciduous, Tropical Thorn, and Alpine zones"
              class="mx-auto block w-full h-auto max-h-[700px] object-contain rounded-lg bg-inset"
              loading="eager"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-3 text-body-xs text-gray-500 dark:text-gray-400 font-mono">
              <span>Source: Survey of India &amp; National Atlas and Thematic Mapping Organisation (NATMO)</span>
              <span class="font-sans font-medium text-amber-600 dark:text-amber-400">Essential Spatial Anchor for TGPRB Vegetation Questions</span>
            </div>
          </div>

          <!-- 2. Dual Spatial Diagrams: Biosphere Reserves of India & Nilgiri Tripartite Junction -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Biosphere Reserves Locator Map -->
            <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div class="mb-3 flex items-center justify-between border-b b-line pb-2">
                  <h4 class="font-display text-[14px] font-bold t-hi">18 Biosphere Reserves of India (UNESCO MAB Network)</h4>
                  <span class="chip chip-mono text-[10px]">18 Reserves</span>
                </div>
                <img
                  src="https://res.cloudinary.com/gbxjgmck/image/upload/v1787940467/geography/india-biosphere-reserves-map.webp"
                  alt="18 Official Biosphere Reserves of India locator map and comprehensive UNESCO MAB inventory"
                  class="w-full h-auto max-h-[380px] object-contain rounded-lg bg-inset"
                  loading="lazy"
                />
              </div>
              <p class="mt-3 text-[11px] t-mid border-t b-line pt-2">
                <strong class="t-hi font-mono">Key Milestones:</strong> First: Nilgiri (1986); Largest: Great Rann of Kutch (Gujarat); Smallest: Panna (MP) / Dibru-Saikhowa (Assam); Marine: Gulf of Mannar.
              </p>
            </div>

            <!-- Nilgiri Tripartite Cluster Map -->
            <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-stone-900 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div class="mb-3 flex items-center justify-between border-b b-line pb-2">
                  <h4 class="font-display text-[14px] font-bold t-hi">Nilgiri Biosphere Complex (TN - Kerala - Karnataka Tri-Junction)</h4>
                  <span class="chip chip-mono text-[10px]">Tri-Junction</span>
                </div>
                <img
                  src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786735507/geography/nilgiri-biosphere-reserve-tripartite-map.webp"
                  alt="Nilgiri Biosphere Reserve map showing Bandipur, Nagarhole, Wayanad, Mudumalai, Mukurthi, and Silent Valley national parks"
                  class="w-full h-auto max-h-[380px] object-cover rounded-lg bg-inset"
                  loading="lazy"
                />
              </div>
              <p class="mt-3 text-[11px] t-mid border-t b-line pt-2">
                <strong class="t-hi font-mono">Protected Interlocks:</strong> Bandipur &amp; Nagarhole (Karnataka) + Wayanad (Kerala) + Mudumalai &amp; Mukurthi (TN) + Silent Valley (Kerala).
              </p>
            </div>
          </div>

          <!-- Secondary Visual Cue: Mangrove Adaptation in Sundarbans -->
          <div class="panel p-5 sm:p-6 mb-6">
            <div class="mb-4 flex items-center justify-between border-b b-line pb-3">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">Mangrove Ecosystem Adaptations (Littoral / Swamp Forests)</p>
                <p class="text-[11.5px] t-lo mt-0.5">Pneumatophores (Breathing Roots), Stilt Roots &amp; Vivipary Germination</p>
              </div>
              <span class="chip chip-saffron chip-mono">Ecosystem Deep-Dive</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div class="md:col-span-1 aspect-video md:aspect-square rounded-xl overflow-hidden bg-inset border b-line">
                <img
                  src="https://res.cloudinary.com/gbxjgmck/image/upload/v1786735506/geography/sundarbans-mangrove-vegetation.webp"
                  alt="Sundarbans mangrove vegetation showing exposed stilt roots and vertical pneumatophores"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="md:col-span-2 space-y-2.5 text-[12.5px] t-mid">
                <p>
                  <strong class="t-hi">1. Pneumatophores (Blind/Breathing Roots):</strong> Upward-growing roots with lenticels (pores) that take in oxygen in waterlogged, anaerobic saline mud.
                </p>
                <p>
                  <strong class="t-hi">2. Stilt &amp; Prop Roots:</strong> Provide mechanical stability against powerful ocean tides and cyclonic waves.
                </p>
                <p>
                  <strong class="t-hi">3. Vivipary Germination:</strong> Seeds germinate and develop while still attached to the parent tree before dropping into saline water (e.g., <em>Rhizophora</em>).
                </p>
                <p>
                  <strong class="t-hi">4. Core Indian Habitats:</strong> Sundarbans (West Bengal - 42.45% of India's mangroves), Gujarat coastline (23.66%), Andaman &amp; Nicobar Islands, Mahanadi delta (Bhitarkanika), Godavari-Krishna deltas (Coringa Sanctuary in AP), and Pichavaram (Tamil Nadu).
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 02 · Introduction & Forest Policies ────────────────────── -->
        <section id="intro" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Introduction &amp; Forest Policies</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="intro" section-label="Introduction & Forest Policies" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">constitutional basis · statutory milestones</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="intro" section-label="Introduction & Forest Policies" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            In the Constitution of India, 'Forests' and 'Protection of Wild Animals &amp; Birds' were transferred from the <strong class="t-hi">State List to the Concurrent List (List III, 7th Schedule)</strong> by the <strong class="t-hi">42nd Constitutional Amendment Act, 1976</strong>.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Constitutional Provisions -->
            <div class="rounded-xl border b-line bg-sub p-4">
              <p class="text-[14px] font-bold t-hi flex items-center gap-1.5 mb-2">
                <UIcon name="i-heroicons-scale" class="h-4 w-4 accent" />
                Constitutional Mandates
              </p>
              <ul class="space-y-2 text-[12px] t-mid">
                <li>
                  <strong class="t-hi font-mono">Article 48A (DPSP):</strong> Added by 42nd Amendment 1976. The State shall endeavour to protect and improve the environment and safeguard forests and wildlife.
                </li>
                <li>
                  <strong class="t-hi font-mono">Article 51A(g) (Fundamental Duty):</strong> Duty of every citizen to protect and improve the natural environment including forests, lakes, rivers, and wildlife.
                </li>
                <li>
                  <strong class="t-hi font-mono">Schedule VII (Entry 17A &amp; 17B):</strong> 'Forests' and 'Protection of wild animals and birds' in Concurrent List.
                </li>
              </ul>
            </div>

            <!-- Major Forest Enactments -->
            <div class="rounded-xl border b-line bg-sub p-4">
              <p class="text-[14px] font-bold t-hi flex items-center gap-1.5 mb-2">
                <UIcon name="i-heroicons-document-text" class="h-4 w-4 accent" />
                Statutory Milestones
              </p>
              <ul class="space-y-2 text-[12px] t-mid">
                <li>
                  <strong class="t-hi">National Forest Policy, 1988:</strong> Mandates minimum <strong class="accent">33.33% (one-third)</strong> of total geographical land area under forest/tree cover (60% in hilly and mountainous regions).
                </li>
                <li>
                  <strong class="t-hi">Wildlife Protection Act, 1972:</strong> Created 6 schedules of protection; established National Parks, Wildlife Sanctuaries, Community Reserves, and NTCA.
                </li>
                <li>
                  <strong class="t-hi">Forest (Conservation) Act, 1980 (Amended 2023):</strong> Restricts de-reservation of forests or diversion for non-forest purposes without Central approval.
                </li>
                <li>
                  <strong class="t-hi">Forest Rights Act (FRA), 2006:</strong> Recognizes pre-existing rights of Scheduled Tribes and Other Traditional Forest Dwellers (OTFD).
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 03 · Champion & Seth Classification Deep-Dive ─────────── -->
        <section id="types" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Forest Types &amp; Vegetation Deep Dive</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="types" section-label="Forest Types & Vegetation Deep Dive" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">rainfall · species · spatial extent</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="types" section-label="Forest Types & Vegetation Deep Dive" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            Sir H. G. Champion and S. K. Seth (1968) classified India's forest vegetation into 5 major groups and 16 sub-types. The 5 major macro-types are rigorously tested in TGPRB:
          </p>

          <!-- The 5 Macro Forest Types Grid -->
          <div class="space-y-4 mb-6">
            <!-- 1. Tropical Evergreen -->
            <div class="rounded-xl border b-line bg-sub p-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b b-line pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-saffron text-[11px] font-mono font-bold">01</span>
                  <h3 class="font-display text-[16px] font-bold t-hi">Tropical Wet Evergreen &amp; Semi-Evergreen Forests</h3>
                </div>
                <span class="chip chip-mono text-[11px]">Rainfall: &gt;200 cm · Temp: 22°C - 27°C</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
                <div>
                  <p class="font-semibold t-hi mb-1">Spatial Distribution:</p>
                  <p class="t-mid leading-relaxed">
                    Western slopes of Western Ghats (Kerala, Karnataka, Goa, Maharashtra), North-Eastern states (Assam, Meghalaya, Tripura, Mizoram, Nagaland), and Andaman &amp; Nicobar Islands.
                  </p>
                </div>
                <div>
                  <p class="font-semibold t-hi mb-1">Distinct Characteristics:</p>
                  <p class="t-mid leading-relaxed">
                    Dense multi-layered canopy (trees reach 60m+ height). No definite leaf-shedding season. Rich in epiphytes, lianas, and ferns. Semi-evergreen occurs in transitional zones (rainfall 200-250cm).
                  </p>
                </div>
                <div>
                  <p class="font-semibold accent mb-1">Indicator Tree Species (PYQ Crucial):</p>
                  <p class="t-mid leading-relaxed font-mono text-[11.5px]">
                    <strong class="t-hi">Rosewood, Mahogany, Ebony, Aini, Rubber, Cinchona, Chaplash, White Cedar.</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- 2. Tropical Moist Deciduous -->
            <div class="rounded-xl border b-line bg-sub p-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b b-line pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-saffron text-[11px] font-mono font-bold">02</span>
                  <h3 class="font-display text-[16px] font-bold t-hi">Tropical Moist Deciduous Forests</h3>
                </div>
                <span class="chip chip-mono text-[11px]">Rainfall: 100 cm - 200 cm</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
                <div>
                  <p class="font-semibold t-hi mb-1">Spatial Distribution:</p>
                  <p class="t-mid leading-relaxed">
                    Foothills of Himalayas (Siwaliks), Chotanagpur Plateau (Jharkhand, West Bengal, Odisha), Chhattisgarh, eastern slopes of Western Ghats, and north-eastern peninsular highlands.
                  </p>
                </div>
                <div>
                  <p class="font-semibold t-hi mb-1">Distinct Characteristics:</p>
                  <p class="t-mid leading-relaxed">
                    Shed leaves for 6-8 weeks during spring and early dry summer to conserve moisture. Economically the most valuable timber forest type of India.
                  </p>
                </div>
                <div>
                  <p class="font-semibold accent mb-1">Indicator Tree Species (PYQ Crucial):</p>
                  <p class="t-mid leading-relaxed font-mono text-[11.5px]">
                    <strong class="t-hi">Teak (Tectona grandis), Sal (Shorea robusta), Sandalwood (Santalum album), Shisham, Mahua, Amla, Semul, Kusum, Bamboo.</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- 3. Tropical Dry Deciduous -->
            <div class="rounded-xl border b-line bg-sub p-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b b-line pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-saffron text-[11px] font-mono font-bold">03</span>
                  <h3 class="font-display text-[16px] font-bold t-hi">Tropical Dry Deciduous Forests (Most Widespread in India)</h3>
                </div>
                <span class="chip chip-mono text-[11px]">Rainfall: 70 cm - 100 cm · Dominant in Deccan &amp; TG</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
                <div>
                  <p class="font-semibold t-hi mb-1">Spatial Distribution:</p>
                  <p class="t-mid leading-relaxed">
                    Rainier parts of Peninsular plateau (Telangana, Andhra Pradesh, Maharashtra, Karnataka), plains of Uttar Pradesh, Madhya Pradesh, and Bihar.
                  </p>
                </div>
                <div>
                  <p class="font-semibold t-hi mb-1">Distinct Characteristics:</p>
                  <p class="t-mid leading-relaxed">
                    Open stretches with patches of grass. Trees shed completely in dry season, leaving the landscape looking bare and leafless. Prone to seasonal forest fires.
                  </p>
                </div>
                <div>
                  <p class="font-semibold accent mb-1">Indicator Tree Species (PYQ Crucial):</p>
                  <p class="t-mid leading-relaxed font-mono text-[11.5px]">
                    <strong class="t-hi">Tendu (Bidi leaf), Palas (Flame of the forest), Bel, Khair, Axlewood (Dhaora), Amaltas, Teak, Neem.</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- 4. Tropical Thorn & Scrub -->
            <div class="rounded-xl border b-line bg-sub p-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b b-line pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-saffron text-[11px] font-mono font-bold">04</span>
                  <h3 class="font-display text-[16px] font-bold t-hi">Tropical Thorn &amp; Scrub Forests</h3>
                </div>
                <span class="chip chip-mono text-[11px]">Rainfall: &lt;50 cm - 70 cm</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
                <div>
                  <p class="font-semibold t-hi mb-1">Spatial Distribution:</p>
                  <p class="t-mid leading-relaxed">
                    Semi-arid areas of south-west Punjab, Haryana, Rajasthan, Gujarat, Madhya Pradesh, and rain-shadow interior of Deccan (Rayalaseema / eastern Karnataka).
                  </p>
                </div>
                <div>
                  <p class="font-semibold t-hi mb-1">Distinct Characteristics:</p>
                  <p class="t-mid leading-relaxed">
                    Xerophytic adaptations: Deep long roots to tap groundwater, small fleshy waxy leaves, and sharp thorns/spines to minimize evapotranspiration.
                  </p>
                </div>
                <div>
                  <p class="font-semibold accent mb-1">Indicator Tree Species (PYQ Crucial):</p>
                  <p class="t-mid leading-relaxed font-mono text-[11.5px]">
                    <strong class="t-hi">Babool (Acacia nilotica), Kikar, Ber (Ziziphus), Khair, Date Palm, Euphorbias, Cacti.</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- 5. Montane & Alpine Forests -->
            <div class="rounded-xl border b-line bg-sub p-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b b-line pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-saffron text-[11px] font-mono font-bold">05</span>
                  <h3 class="font-display text-[16px] font-bold t-hi">Montane Himalayan &amp; Southern Shola Forests</h3>
                </div>
                <span class="chip chip-mono text-[11px]">Elevation Gradient: 1000m to 3600m+</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
                <div>
                  <p class="font-semibold t-hi mb-1">Himalayan Altitudinal Zonation:</p>
                  <p class="t-mid leading-relaxed">
                    • 1000-2000m: Wet Temperate (Oak, Chestnut)<br />
                    • 1500-3000m: Temperate Coniferous (Pine, Deodar, Silver Fir, Spruce, Cedar)<br />
                    • 3000-3600m+: Alpine Forests &amp; Pastures (Silver Fir, Juniper, Birch/Bhojpatra, Rhododendron, Gujjar/Bakarwal grazing lands).
                  </p>
                </div>
                <div>
                  <p class="font-semibold t-hi mb-1">Southern Peninsular Sholas:</p>
                  <p class="t-mid leading-relaxed">
                    Stunted tropical montane evergreen forests found in sheltered valleys (folds) of Nilgiri, Anamalai, and Palani hills above 1500m, interspersed with rolling grasslands. Trees: Magnolia, Laurel, Cinchona, Wattle.
                  </p>
                </div>
                <div>
                  <p class="font-semibold accent mb-1">Exam Highlights (PYQ Crucial):</p>
                  <p class="t-mid leading-relaxed font-mono text-[11.5px]">
                    <strong class="t-hi">Deodar (Durable timber, Western Himalayas), Birch/Bhojpatra (High altitude line), Shola-Grassland mosaic (Endemic Nilgiri Tahr habitat).</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · Data & Comparisons Matrix ────────────────────────── -->
        <section id="protected-areas" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Protected Areas &amp; Telangana Sanctuaries</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="protected-areas" section-label="Protected Areas & Telangana Sanctuaries" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">ISFR statistics · tiger reserves · wildlife</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="protected-areas" section-label="Protected Areas & Telangana Sanctuaries" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            National Parks, Wildlife Sanctuaries, and Biosphere Reserves form India's core In-Situ conservation architecture under the Wildlife Protection Act, 1972:
          </p>

          <!-- 1. Protected Areas Hierarchy Table -->
          <div class="overflow-x-auto mb-8 rounded-xl border b-line">
            <table class="w-full text-left text-[12.5px]">
              <thead class="bg-sub border-b b-line font-mono text-[11.5px] uppercase tracking-wider t-hi">
                <tr>
                  <th class="p-3.5">Category</th>
                  <th class="p-3.5">Total in India</th>
                  <th class="p-3.5">Governing Law</th>
                  <th class="p-3.5">Human Activity Permitted?</th>
                  <th class="p-3.5">National Milestones</th>
                </tr>
              </thead>
              <tbody class="divide-y b-line font-mono text-[12px] t-mid">
                <tr class="hover:bg-sub/50">
                  <td class="p-3.5 font-bold t-hi font-sans">National Parks</td>
                  <td class="p-3.5 accent">106</td>
                  <td class="p-3.5">WPA 1972</td>
                  <td class="p-3.5 text-rose-500">Strictly Prohibited (No grazing, no private rights)</td>
                  <td class="p-3.5 font-sans">First: Hailey / Jim Corbett (1936, UK); Largest: Hemis (Ladakh, 4,400 sq km); Floating: Keibul Lamjao (Manipur).</td>
                </tr>
                <tr class="hover:bg-sub/50">
                  <td class="p-3.5 font-bold t-hi font-sans">Wildlife Sanctuaries</td>
                  <td class="p-3.5 accent">573+</td>
                  <td class="p-3.5">WPA 1972</td>
                  <td class="p-3.5 text-emerald-500">Regulated (Grazing and collection of minor forest produce allowed with permit)</td>
                  <td class="p-3.5 font-sans">Created for particular species (e.g. Gir for Asiatic Lion, Manjira for Marsh Crocodiles).</td>
                </tr>
                <tr class="hover:bg-sub/50">
                  <td class="p-3.5 font-bold t-hi font-sans">Biosphere Reserves</td>
                  <td class="p-3.5 accent">18 (12 in UNESCO MAB)</td>
                  <td class="p-3.5">UNESCO MAB</td>
                  <td class="p-3.5 text-amber-500">3-Zone Concept: Core (Strict), Buffer (Research/Education), Transition (Sustainable settlements)</td>
                  <td class="p-3.5 font-sans">First: Nilgiri (1986); Largest: Great Rann of Kutch (12,454 sq km); Cold Desert (HP).</td>
                </tr>
                <tr class="hover:bg-sub/50">
                  <td class="p-3.5 font-bold t-hi font-sans">Tiger Reserves</td>
                  <td class="p-3.5 accent">55</td>
                  <td class="p-3.5">NTCA (WPA 1972)</td>
                  <td class="p-3.5 text-rose-500">Core/Critical Tiger Habitat (Inviolate) + Buffer Zone</td>
                  <td class="p-3.5 font-sans">50 Years of Project Tiger (1973-2023). India tiger count: 3,682 (MP: 785, Karnataka: 563).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 2. Telangana Forests, Sanctuaries & National Parks Grid -->
          <div class="panel p-5 sm:p-6 mb-8">
            <div class="mb-4 flex items-center justify-between border-b b-line pb-3">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">Telangana Wildlife Sanctuaries, Tiger Reserves &amp; National Parks</p>
                <p class="text-[11.5px] t-lo mt-0.5">High-yield Telangana GK Matrix (Districts, Fauna, Corridors)</p>
              </div>
              <span class="chip chip-saffron chip-mono">Telangana Focus</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[12px]">
              <!-- Kawal Tiger Reserve -->
              <div class="p-3.5 rounded-xl border b-line bg-sub">
                <span class="chip chip-saffron text-[10px] mb-1.5">Tiger Reserve 01</span>
                <p class="font-bold t-hi text-[13.5px]">Kawal Tiger Reserve</p>
                <p class="text-[11px] accent font-mono mt-0.5">Mancherial, KB Asifabad, Adilabad, Nirmal</p>
                <p class="mt-2 t-mid leading-relaxed">
                  Located on the Godavari-Kadam basin. Forest type: Tropical dry deciduous teak and bamboo. Contiguous to Tadoba-Andhari Tiger Reserve (Maharashtra) via tiger corridor.
                </p>
              </div>

              <!-- Amrabad Tiger Reserve -->
              <div class="p-3.5 rounded-xl border b-line bg-sub">
                <span class="chip chip-saffron text-[10px] mb-1.5">Tiger Reserve 02</span>
                <p class="font-bold t-hi text-[13.5px]">Amrabad Tiger Reserve</p>
                <p class="text-[11px] accent font-mono mt-0.5">Nagarkurnool &amp; Nalgonda (Nallamala)</p>
                <p class="mt-2 t-mid leading-relaxed">
                  Second largest tiger reserve in India after bifurcation (Nagarjunasagar-Srisailam northern extension). Forest: Dry deciduous scrub and savanna. Home to Chenchu indigenous tribes.
                </p>
              </div>

              <!-- Eturnagaram Wildlife Sanctuary -->
              <div class="p-3.5 rounded-xl border b-line bg-sub">
                <span class="chip text-[10px] mb-1.5">Wildlife Sanctuary</span>
                <p class="font-bold t-hi text-[13.5px]">Eturnagaram Sanctuary</p>
                <p class="text-[11px] accent font-mono mt-0.5">Mulugu District</p>
                <p class="mt-2 t-mid leading-relaxed">
                  One of the oldest sanctuaries in Telangana (declared 1952 by Hyderabad State). River Dayyum Vagu runs through it. Famous for Sammakka Sarakka Jathara at Medaram.
                </p>
              </div>

              <!-- Pakhal Wildlife Sanctuary -->
              <div class="p-3.5 rounded-xl border b-line bg-sub">
                <span class="chip text-[10px] mb-1.5">Wildlife Sanctuary</span>
                <p class="font-bold t-hi text-[13.5px]">Pakhal Sanctuary</p>
                <p class="text-[11px] accent font-mono mt-0.5">Warangal / Mahabubabad</p>
                <p class="mt-2 t-mid leading-relaxed">
                  Encompasses the historic Pakhal Lake constructed by Kakatiya ruler Ganapati Deva in 1213 AD. Fauna: Leopard, chital, sambar, nilgai, marsh crocodiles.
                </p>
              </div>

              <!-- Shivaram Wildlife Sanctuary -->
              <div class="p-3.5 rounded-xl border b-line bg-sub">
                <span class="chip text-[10px] mb-1.5">Wildlife Sanctuary (PYQ)</span>
                <p class="font-bold t-hi text-[13.5px]">Shivaram Sanctuary</p>
                <p class="text-[11px] accent font-mono mt-0.5">Mancherial &amp; Peddapalli</p>
                <p class="mt-2 t-mid leading-relaxed">
                  Located along the banks of River Godavari. Noted primarily for the conservation of freshwater marsh crocodiles (Muggers) and river otters.
                </p>
              </div>

              <!-- Pocharam & Manjira -->
              <div class="p-3.5 rounded-xl border b-line bg-sub">
                <span class="chip text-[10px] mb-1.5">Wildlife Sanctuaries</span>
                <p class="font-bold t-hi text-[13.5px]">Manjira &amp; Pocharam</p>
                <p class="text-[11px] accent font-mono mt-0.5">Sangareddy &amp; Medak / Kamareddy</p>
                <p class="mt-2 t-mid leading-relaxed">
                  Manjira is an aquatic bird and crocodile sanctuary on the Manjira river (9 islands). Pocharam surrounds Pocharam lake (built 1916-1922 across Allair river).
                </p>
              </div>
            </div>

            <!-- National Parks in Hyderabad -->
            <div class="mt-4 p-4 rounded-xl bg-inset border b-line text-[12px]">
              <p class="font-bold t-hi mb-1.5 flex items-center gap-1">
                <UIcon name="i-heroicons-building-office-2" class="h-4 w-4 accent" />
                3 National Parks in and around Hyderabad:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px] mt-2">
                <div class="p-2 rounded bg-sub border b-line">
                  <span class="accent font-bold block">KBR National Park</span>
                  <span class="t-mid text-[10.5px]">Jubilee Hills (Chiran Palace, 390 acres, peacocks, pangolins).</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line">
                  <span class="accent font-bold block">Mrugavani National Park</span>
                  <span class="t-mid text-[10.5px]">Chilkur / Himayat Sagar (850 acres, Indian hare, cheetal, vipers).</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line">
                  <span class="accent font-bold block">Mahavir Harina Vanasthali</span>
                  <span class="t-mid text-[10.5px]">Vanasthalipuram (3,600 acres, Blackbuck state animal sanctuary).</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Forest Survey of India (ISFR) State Rankings Matrix -->
          <div class="panel p-5 sm:p-6 mb-6">
            <div class="mb-4 flex items-center justify-between border-b b-line pb-3">
              <div>
                <p class="font-display text-[15px] font-bold t-hi">India State of Forest Report (ISFR) Statistical Matrix</p>
                <p class="text-[11.5px] t-lo mt-0.5">Forest Survey of India (FSI, Dehradun) Biennial Assessment</p>
              </div>
              <span class="chip chip-mono text-[11px]">ISFR Data</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[12px] font-mono">
              <div class="p-3.5 rounded-xl bg-sub border b-line">
                <span class="text-[10.5px] text-amber-500 uppercase block font-bold">Largest Forest Area</span>
                <p class="text-[16px] font-bold t-hi mt-1">1. Madhya Pradesh</p>
                <p class="text-[11px] t-mid mt-0.5">77,493 sq km</p>
                <p class="text-[10px] t-lo mt-1 font-sans">Followed by Arunachal Pradesh, Chhattisgarh, Odisha, Maharashtra.</p>
              </div>

              <div class="p-3.5 rounded-xl bg-sub border b-line">
                <span class="text-[10.5px] text-emerald-500 uppercase block font-bold">Highest Forest %</span>
                <p class="text-[16px] font-bold t-hi mt-1">1. Mizoram</p>
                <p class="text-[11px] t-mid mt-0.5">84.53% of area</p>
                <p class="text-[10px] t-lo mt-1 font-sans">Followed by Arunachal Pradesh (79.33%), Meghalaya (76.00%), Manipur.</p>
              </div>

              <div class="p-3.5 rounded-xl bg-sub border b-line">
                <span class="text-[10.5px] text-rose-500 uppercase block font-bold">Lowest Forest Cover</span>
                <p class="text-[16px] font-bold t-hi mt-1">1. Haryana</p>
                <p class="text-[11px] t-mid mt-0.5">3.63% of area</p>
                <p class="text-[10px] t-lo mt-1 font-sans">Followed by Punjab (3.67%), Rajasthan (4.87%), and UP (6.15%).</p>
              </div>

              <div class="p-3.5 rounded-xl bg-sub border b-line">
                <span class="text-[10.5px] text-sky-500 uppercase block font-bold">Largest Mangrove State</span>
                <p class="text-[16px] font-bold t-hi mt-1">1. West Bengal</p>
                <p class="text-[11px] t-mid mt-0.5">42.45% of India total</p>
                <p class="text-[10px] t-lo mt-1 font-sans">Followed by Gujarat (23.66%) and Andaman &amp; Nicobar (12.39%).</p>
              </div>
            </div>

            <p class="mt-3 text-body-xs t-lo font-mono">
              Source: India State of Forest Report (ISFR 2021), Forest Survey of India (MoEFCC). ISFR 2023/2025 assessment data in release cycle - verify against latest official publication before exam.
            </p>
          </div>
        </section>

        <!-- ── 05 · Memory Hacks & Negative Marking Traps ────────────── -->
        <section id="traps" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Memory Hacks &amp; Negative Marking Traps</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="traps" section-label="Memory Hacks & Negative Marking Traps" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">mnemonics · confusion pairs · 20% penalty guards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="traps" section-label="Memory Hacks & Negative Marking Traps" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            TGPRB questions exploit common confusions between forest indicator species, biosphere reserve locations, and state forest percentages:
          </p>

          <div class="space-y-3.5 mb-6">
            <!-- Trap 1 -->
            <div class="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
              <div class="flex items-center gap-2 mb-1.5">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 text-rose-500" />
                <p class="text-[13px] font-bold text-rose-600 dark:text-rose-400">Trap 1: Sandalwood is Deciduous, NOT Evergreen!</p>
              </div>
              <p class="text-[12px] t-mid leading-relaxed">
                <strong class="t-hi">Exam Trap:</strong> Examiners often list <strong class="t-hi">Sandalwood (Chandan)</strong> alongside Rosewood and Mahogany as an option for Tropical Wet Evergreen forest. Sandalwood (<em>Santalum album</em>) is a <strong class="accent">Tropical Moist Deciduous</strong> species endemic to dry/moist deciduous tracts of Karnataka, Tamil Nadu, and Kerala.
              </p>
            </div>

            <!-- Trap 2 -->
            <div class="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <div class="flex items-center gap-2 mb-1.5">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 text-amber-500" />
                <p class="text-[13px] font-bold text-amber-600 dark:text-amber-400">Trap 2: Largest Area (MP) vs Highest Percentage (Mizoram)</p>
              </div>
              <p class="text-[12px] t-mid leading-relaxed">
                <strong class="t-hi">Exam Trap:</strong> 'Largest Forest Cover' without the word 'percentage' means <strong class="accent">Madhya Pradesh (77,493 sq km)</strong>. If the question specifies 'Highest percentage of geographical area', the answer is <strong class="accent">Mizoram (84.53%)</strong>. Among UTs, <strong class="t-hi">Lakshadweep (90.33%)</strong> leads.
              </p>
            </div>

            <!-- Trap 3 -->
            <div class="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
              <div class="flex items-center gap-2 mb-1.5">
                <UIcon name="i-heroicons-academic-cap" class="h-4 w-4 text-sky-500" />
                <p class="text-[13px] font-bold text-sky-600 dark:text-sky-400">Trap 3: Chronology of Historic Environmental Movements</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] t-mid font-mono mt-2">
                <div class="p-2 rounded bg-sub border b-line">
                  <strong class="t-hi block">1. Bishnoi Movement (1730 AD):</strong> Khejarli, Rajasthan (Amrita Devi sacrificed life to protect Khejri trees).
                </div>
                <div class="p-2 rounded bg-sub border b-line">
                  <strong class="t-hi block">2. Chipko Movement (1973):</strong> Chamoli, Uttarakhand (Gaura Devi, Sunderlal Bahuguna, Chandi Prasad Bhatt - tree hugging).
                </div>
                <div class="p-2 rounded bg-sub border b-line">
                  <strong class="t-hi block">3. Silent Valley Movement (1978):</strong> Palakkad, Kerala (Save Silent Valley against Kunthipuzha hydro-dam).
                </div>
                <div class="p-2 rounded bg-sub border b-line">
                  <strong class="t-hi block">4. Appiko Movement (1983):</strong> Uttara Kannada, Karnataka (Pandurang Hegde - southern version of Chipko).
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 06 · Verified PYQs Drill ────────────────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Verified PYQs Drill</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="pyqs" section-label="Verified PYQs Drill" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">10 official exam questions · 2015-2023</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="pyqs" section-label="Verified PYQs Drill" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <p class="mb-4 max-w-2xl text-body leading-[1.8] t-mid">
            Solve these 10 verified questions from official TSLPRB Constable and SI papers. Click any card to reveal the official answer and analytical breakdown:
          </p>

          <div class="space-y-3.5 mb-8">
            <div
              v-for="(q, idx) in pyqDrill"
              :key="idx"
              class="rounded-xl border b-line bg-sub p-4 transition-all duration-150"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="chip chip-saffron text-[10px] font-mono uppercase">Q{{ idx + 1 }}</span>
                    <span class="chip text-[10px] font-mono">{{ q.source }}</span>
                    <span class="chip text-[10px]">{{ q.topic }}</span>
                  </div>
                  <p class="text-[13.5px] font-medium leading-relaxed t-hi whitespace-pre-line">{{ q.question }}</p>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-[12px] font-mono">
                    <div
                      v-for="(opt, oIdx) in q.options"
                      :key="oIdx"
                      class="p-2 rounded-lg border b-line"
                      :class="revealedPyqs[idx] ? (oIdx === q.answer ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold' : 'bg-inset opacity-70') : 'bg-inset'"
                    >
                      <span class="accent mr-1.5 font-bold">({{ String.fromCharCode(65 + oIdx) }})</span>
                      {{ opt }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3 pt-3 border-t b-line flex items-center justify-between">
                <button
                  type="button"
                  class="text-[11.5px] font-medium accent flex items-center gap-1 hover:underline"
                  @click="togglePyq(idx)"
                >
                  <UIcon :name="revealedPyqs[idx] ? 'i-heroicons-chevron-up' : 'i-heroicons-eye'" class="h-3.5 w-3.5" />
                  {{ revealedPyqs[idx] ? 'Hide Answer &amp; Explanation' : 'View Verified Answer' }}
                </button>
                <span v-if="revealedPyqs[idx]" class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Official Key: ({{ String.fromCharCode(65 + q.answer) }})
                </span>
              </div>

              <div v-if="revealedPyqs[idx]" class="mt-2.5 p-3 rounded-lg bg-inset border b-line text-[12px] t-mid leading-relaxed">
                <p><strong class="t-hi">Analytical Explanation:</strong> {{ q.explanation }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 07 · Advanced Practice ───────────────────────────────────── -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="advanced-practice" section-label="Advanced Practice" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">
              {{ advancedPractice.length }} drills
              <template v-if="advAttemptedCount > 0"> · {{ advAttemptedCount }} attempted ({{ advCorrectCount }} correct)</template>
            </span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="advanced-practice" section-label="Advanced Practice" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />

          <!-- Disclaimer callout -->
          <div class="mb-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <p class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
              TGPSC-Style Advanced Practice
            </p>
            <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
              These questions use <strong class="t-hi">multi-statement, 4x4 matching, and sequence ranking</strong> formats
              from recent TGPSC Group-I patterns. TGPRB papers (2022-2023) remain
              <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your forest area and protected zone recall.
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
                  note-id="NOTE-GEO-FORESTS"
                  :prompt="`Explain the reasoning for this TGPSC-style forest question and the exam trap: ${q.question}`"
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
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="gate" section-label="Comprehension Gate" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="gate" section-label="Comprehension Gate" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-GEO-FORESTS" />
        </section>

        <!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-GEO-FORESTS" section-id="current-affairs" section-label="Current Affairs" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-GEO-FORESTS" section-id="current-affairs" section-label="Current Affairs" note-title="Forests, Natural Vegetation & Protected Areas" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-GEO-FORESTS" />
        </section>

        <!-- Footer Navigation -->
        <footer class="border-t b-line pt-6 pb-12 flex items-center justify-between text-body-xs font-mono">
          <NuxtLink to="/notes/geography/dams-in-india" class="accent flex items-center gap-1 hover:underline">
            <UIcon name="i-heroicons-arrow-left" class="h-3.5 w-3.5" /> Previous: Dams in India
          </NuxtLink>
          <NuxtLink to="/notes/geography/irrigation-in-india" class="accent flex items-center gap-1 hover:underline">
            Next: Irrigation in India <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
          </NuxtLink>
        </footer>
      </article>

      <!-- ══ Right TOC Sticky Sidebar ════════════════════════════════════ -->
      <TableOfContents
        v-model="activeSection"
        :sections="sections"
        weight-text="38 Verified PYQs · TSLPRB Constable / SI"
      />
    </div>
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-GEO-FORESTS"
      note-title="Forests, Natural Vegetation & Protected Areas"
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
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import TableOfContents from '@/components/TableOfContents.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import type { SectionContext } from '@/types/annotations'
import { usePersonalNotes } from '@/composables/usePersonalNotes'

/* ── Personal notes ──────────────────────────────────────────────────────── */
const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const mobileTocOpen = ref(false)
const activeSection = ref('visual')
const readProgress = ref(0)
const revealedPyqs = ref<Record<number, boolean>>({})

const togglePyq = (idx: number) => {
  revealedPyqs.value[idx] = !revealedPyqs.value[idx]
}

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

const coverage = [
  { label: 'Champion & Seth 5 Forest Types' },
  { label: 'ISFR Forest Cover State Rankings' },
  { label: 'Biosphere Reserves & UNESCO MAB' },
  { label: 'National Parks & Wildlife Sanctuaries' },
  { label: 'Telangana Kawal & Amrabad Tiger Reserves' },
  { label: 'Historic Environmental Movements' },
]

const sections = [
  { id: 'visual',            label: '01 · Visual Architecture' },
  { id: 'intro',             label: '02 · Forest Policies' },
  { id: 'types',             label: '03 · Forest Types Deep Dive' },
  { id: 'protected-areas',   label: '04 · Protected Areas & TG' },
  { id: 'traps',             label: '05 · Memory Hacks & Traps' },
  { id: 'pyqs',              label: '06 · Verified PYQs Drill' },
  { id: 'advanced-practice', label: '07 · Advanced Practice' },
  { id: 'gate',              label: '08 · Comprehension Gate' },
  { id: 'current-affairs',   label: '09 · Current Affairs' },
]

const pyqDrill = [
  {
    uid: 'PYQ-1815',
    source: 'SI 2016 Prelims Paper · Q147',
    topic: 'Forest Cover Area Ranking',
    question: 'The state having largest area of forest cover in India is',
    options: ['Madhya Pradesh', 'Assam', 'Arunachal Pradesh', 'Haryana'],
    answer: 0,
    explanation: 'According to the India State of Forest Report (ISFR), Madhya Pradesh has the largest forest cover in India in terms of area, followed by Arunachal Pradesh and Chhattisgarh. In contrast, Mizoram has the highest forest cover relative to its total geographical area (percentage basis).'
  },
  {
    uid: 'PYQ-1533',
    source: 'SI 2016 Final GS Paper · Q90',
    topic: 'Least Forested State',
    question: 'The state with least forested area is',
    options: ['Rajasthan', 'Punjab', 'Haryana', 'Gujarat'],
    answer: 2,
    explanation: 'According to the India State of Forest Report (ISFR), Haryana has the lowest forest cover in terms of total area (around 1,603 sq km) as well as percentage of geographical area (~3.63%) among all Indian states. It is closely followed by Punjab.'
  },
  {
    uid: 'PYQ-1212',
    source: 'Constable 2023 Mains Official · Q199',
    topic: 'Telangana Tiger Reserves',
    question: 'Identify the Tiger Reserve Forests in Telangana State:',
    options: ['Srisailam Tiger Reserve only', 'Kaval Tiger Reserve only', 'Amrabad Tiger Reserve only', 'All of the above'],
    answer: 3,
    explanation: "Telangana state features key tiger reserves including Amrabad Tiger Reserve (located in Nallamala forest track across Nagarkurnool and Nalgonda districts, formerly part of Nagarjunsagar-Srisailam Tiger Reserve) and Kawal Tiger Reserve (located in Mancherial, Asifabad, Adilabad, and Nirmal districts). Since multiple choices represent notified tiger reserves connected to Telangana's forest network, 'All of the above' is the correct answer."
  },
  {
    uid: 'PYQ-0143',
    source: 'Constable 2015 Mains · Q143',
    topic: 'Telangana Wildlife Sanctuaries',
    question: 'The Shivaram Wildlife Sanctuary is located in which of the following districts of Telangana',
    options: ['Adilabad - Nizamabad', 'Mahabubnagar - Medak', 'Karimnagar - Warangal', 'Adilabad - Karimnagar'],
    answer: 3,
    explanation: 'Shivaram Wildlife Sanctuary is located along the banks of the Godavari River in the erstwhile undivided Adilabad and Karimnagar districts (presently Mancherial and Peddapalli). It is renowned for its riverine forest flora and population of freshwater marsh crocodiles (muggers).'
  },
  {
    uid: 'PYQ-1509',
    source: 'SI 2016 Final GS Paper · Q66',
    topic: 'National Parks & States',
    question: 'Match the following List - I: a) Bandipur, b) Corbett, c) Kanha, d) Dhudwa. List - II: i) Uttar Pradesh, ii) Madhya Pradesh, iii) Uttarakhand, iv) Karnataka.',
    options: ['a-iv, b-iii, c-ii, d-i', 'a-i, b-ii, c-iii, d-iv', 'a-iv, b-iii, c-i, d-ii', 'a-i, b-ii, c-iv, d-iii'],
    answer: 0,
    explanation: 'Bandipur National Park is located in Karnataka, Jim Corbett National Park in Uttarakhand, Kanha National Park in Madhya Pradesh, and Dudhwa National Park in Uttar Pradesh.'
  },
  {
    uid: 'PYQ-0733',
    source: 'Constable 2018 Prelims · Q113',
    topic: 'Endangered Species (Hangul)',
    question: "'Hangul' is a critically endangered species found mainly in the State of",
    options: ['Arunachal Pradesh', 'Jammu & Kashmir', 'Kerala', 'Tamil Nadu'],
    answer: 1,
    explanation: 'Hangul, also known as the Kashmir Stag, is a critically endangered subspecies of red deer native to India. It is mainly found in Dachigam National Park located near Srinagar in Jammu & Kashmir.'
  },
  {
    uid: 'PYQ-1149',
    source: 'Constable 2023 Mains Official · Q134',
    topic: 'Rajbari National Park',
    question: "'Bison' National park is situated in",
    options: ['Madhya Pradesh', 'Tripura', 'West Bengal', 'Manipur'],
    answer: 1,
    explanation: 'Bison National Park (also known as Rajbari National Park) is located in the South Tripura district of Tripura. It was established within the Trishna Wildlife Sanctuary to protect the Indian Bison (Gaur) and conserve local biodiversity.'
  },
  {
    uid: 'PYQ-1008',
    source: 'Constable 2022 Prelims · Q190',
    topic: 'Fossil National Parks',
    question: 'Ghughua Fossil Park is located in',
    options: ['Tamil Nadu', 'Rajasthan', 'Madhya Pradesh', 'Chhattisgarh'],
    answer: 2,
    explanation: 'Ghughua Fossil National Park is located in the Dindori district of Madhya Pradesh. It contains rare plant fossils, including petrified tree trunks and palm fossils dating back 40 to 70 million years ago.'
  },
  {
    uid: 'PYQ-2512',
    source: 'SI 2018 Prelims Paper 1 · Q162',
    topic: 'Environmental Movements Match',
    question: 'Match the following: List-I (a) Narmada bachao andolan (b) Chipko movement (c) Biodiversity concept (d) Vanajeevi List - II (i) Sunderlal Bahuguna (ii) Daripally Ramaiah (iii) Medha Patkar (iv) Edward O Wilson (v) Michael Greenstone Choose the correct answer/pairs :',
    options: [
      '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)',
      '(a)-(ii), (b)-(i), (c)-(v), (d)-(iv)',
      '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)',
      '(a)-(iii), (b)-(iv), (c)-(v), (d)-(i)'
    ],
    answer: 0,
    explanation: "Medha Patkar led the Narmada Bachao Andolan, Sunderlal Bahuguna was a prominent leader of the Chipko Movement, Edward O. Wilson popularized the concept of biodiversity, and Padma Shri Daripally Ramaiah is popularly known as 'Vanajeevi Ramaiah' for his social forestry efforts in Telangana."
  },
  {
    uid: 'PYQ-1483',
    source: 'SI 2016 Final GS Paper · Q40',
    topic: 'Biosphere Reserve Statements',
    question: "Read the following statements:\nA) India's 'Valley of Flowers' is a part of Nanda Devi Biosphere Reserve.\nB) It is India's second biosphere reserve established in 1986.\nC) It is located in Tamil Nadu, Kerala and Karnataka.\nChoose the correct statements",
    options: ['A&B', 'B & C', 'A, B & C', 'C&A'],
    answer: 0,
    explanation: 'Valley of Flowers National Park is located in Uttarakhand and forms part of the Nanda Devi Biosphere Reserve (Statement A is correct). Statement C incorrectly claims it is located in South India (TN, Kerala, Karnataka), which describes the Nilgiri Biosphere Reserve. By eliminating Statement C, Options 2, 3, and 4 are ruled out, leaving Option 1 (A&B) as the correct choice.'
  }
]

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
    uid: 'ADV-GEO-FOR-001',
    question: 'Arrange the following States in descending order based on percentage of Geographical Area under Recorded Forest Area (RFA) in 2021 as per the India - State of Forest Report - 2021 published by Forest Survey of India:\n\nA. Nagaland\nB. Sikkim\nC. Mizoram\nD. Arunachal Pradesh\n\nChoose the correct order:',
    options: [
      'A, B, D, C',
      'B, A, D, C',
      'B, D, A, C',
      'D, B, A, C'
    ],
    correct: 2,
    explanation: '% Recorded Forest Area (RFA) in ISFR 2021: Sikkim (82.31%) -> Arunachal Pradesh (61.55%) -> Nagaland (52.01%) -> Mizoram (35.83%). Note the trap: Mizoram leads in % Forest Cover (84.53%), but Sikkim leads in % RFA (82.31%).',
    source: 'TGPSC Group-I 2024, Q9',
    format: 'Sequence Ranking',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-FOR-002',
    question: 'Match the following National parks and their States:\n\nList I (National Park):\nA. Tadoba National Park\nB. Madhav National Park\nC. Dudhwa National Park\nD. Bandipur National Park\n\nList II (State):\nI. Karnataka\nII. Uttar Pradesh\nIII. Maharashtra\nIV. Madhya Pradesh\n\nChoose the correct answer:',
    options: [
      'A-IV, B-III, C-II, D-I',
      'A-III, B-IV, C-I, D-II',
      'A-I, B-IV, C-II, D-III',
      'A-III, B-IV, C-II, D-I'
    ],
    correct: 3,
    explanation: 'Tadoba NP is in Chandrapur, Maharashtra (A-III). Madhav NP is in Shivpuri, Madhya Pradesh (B-IV). Dudhwa NP is in Lakhimpur Kheri, Uttar Pradesh (C-II). Bandipur NP is in Chamarajanagar, Karnataka (D-I).',
    source: 'TGPSC Group-I 2024, Q69',
    format: 'Matching',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-FOR-003',
    question: 'Match the following Environmental and Forest Acts with their year of enactment:\n\nList I (Act):\nA. Forest (Conservation) Act\nB. National Green Tribunal (NGT) Act\nC. Wild Life (Protection) Act\nD. Biological Diversity Act\n\nList II (Year):\nI. 2010\nII. 2002\nIII. 1972\nIV. 1980',
    options: [
      'A-IV, B-I, C-III, D-II',
      'A-I, B-IV, C-III, D-II',
      'A-IV, B-I, C-II, D-III',
      'A-III, B-I, C-IV, D-II'
    ],
    correct: 0,
    explanation: 'Forest Conservation Act was passed in 1980 (IV). NGT Act in 2010 (I). Wildlife Protection Act in 1972 (III). Biological Diversity Act in 2002 (II).',
    source: 'TGPSC Group-I 2024, Q41',
    format: 'Matching',
    isSynthetic: false,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-FOR-004',
    question: 'Consider the following statements regarding Indian forest types:\n\nA. Tropical Wet Evergreen forests occur in regions with annual rainfall exceeding 200 cm and a short dry season.\nB. Rosewood, Mahogany, Ebony, and Aini are characteristic commercial tree species of Tropical Evergreen forests.\nC. Tropical Moist Deciduous forests form the most widespread forest cover in India, shedding leaves in dry summer.\nD. Teak, Sal, Shisham, and Sandalwood are dominant species of Tropical Deciduous forests.\n\nWhich of the above statements are correct?',
    options: [
      'A, B, C and D',
      'A, B and D only',
      'A and B only',
      'B, C and D only'
    ],
    correct: 0,
    explanation: 'All four statements are verified classifications per Champion & Seth and NCERT Biogeography.',
    source: 'Synthetic - derived from Forest Types inventory',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null,
  },
  {
    uid: 'ADV-GEO-FOR-005',
    question: 'Which of the following statements regarding protected areas and wildlife in Telangana are correct?\n\nA. Amrabad Tiger Reserve is located in the Nallamala Hills across Nagarkurnool and Nalgonda districts.\nB. Kawal Tiger Reserve is located in Mancherial, Kumuram Bheem Asifabad, and Nirmal districts in northern Telangana.\nC. Pakhal Wildlife Sanctuary is located around the historical Pakhal Lake in Jayashankar Bhupalpally / Warangal.\nD. Telangana has no national parks or tiger reserves notified under the Wildlife Protection Act, 1972.\n\nChoose the correct answer:',
    options: [
      'A, B and C only',
      'A and B only',
      'B, C and D only',
      'A, B, C and D'
    ],
    correct: 0,
    explanation: 'Statements A, B, and C are correct. Statement D is false because Telangana has 2 Tiger Reserves (Amrabad and Kawal) and 3 National Parks (KBR, Mahavir Harina Vanasthali, and Mrugavani).',
    source: 'Synthetic - derived from Telangana Protected Areas inventory',
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
</script>
