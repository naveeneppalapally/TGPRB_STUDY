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
          <NuxtLink to="/notes/polity" class="transition-colors hover:t-hi">Indian Polity</NuxtLink>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <span class="t-mid">Constitutional Framework &amp; Preamble</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 · High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 3-4 Questions (3-4 Marks)</span>
            <span class="chip">31 verified PYQs</span>
            <span class="chip">Polity</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Constitutional Framework &amp; Preamble
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive study notes covering the Historical Evolution (1773-1947), Constituent Assembly milestones, Borrowed Features, Preamble keywords, 12 Schedules ("TEARS OF OLD PM"), Union &amp; Territory (Arts 1-4), and State Reorganisation tested in TGPRB SI &amp; Constable Exams.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />11 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />31 verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~24 min read
            </span>
          </div>
        </header>

        <!-- ══ Coverage strip · the 6 ways TGPRB tests this topic ══ -->
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
            Mastering these six dimensions gives you 100% coverage of every Constitutional Framework question asked by TGPRB from 2015 to 2023.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct Factual MCQs on <strong class="t-hi">7th Schedule List Allocations</strong> (Cruelty to Animals, Economic Planning, Food Adulteration), <strong class="t-hi">Preamble Keyword Sequence &amp; 42nd Amendment</strong>, and <strong class="t-hi">Article 3 State Alteration Rules</strong>. Trap alert: Watch out for 1919 (Provincial Dyarchy) vs 1935 (Provincial Autonomy &amp; Central Dyarchy).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · Visual Architecture & Historical Roadmap ───────────── -->
        <section id="visual-roadmap" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Architecture &amp; Historical Roadmap</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="visual-roadmap" section-label="Visual Architecture & Historical Roadmap" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">1773-1950 Evolution</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="visual-roadmap" section-label="Visual Architecture & Historical Roadmap" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <!-- Interactive Evolution Roadmap Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <!-- Phase 1: Company Rule -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-3 pb-2 border-b b-line">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <UIcon name="i-heroicons-building-office-2" class="h-4 w-4" />
                  Company Rule (1773 - 1858)
                </span>
                <span class="chip chip-mono text-[10.5px]">85 Years</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Characterized by progressive centralization of British legislative and administrative control over the East India Company.
              </p>
              <div class="space-y-2 text-xs">
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">1773</span>
                  <span class="t-mid"><strong class="t-hi">Regulating Act:</strong> First parliamentary control; Governor-General of Bengal (Warren Hastings); Supreme Court at Calcutta (1774).</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">1784</span>
                  <span class="t-mid"><strong class="t-hi">Pitt's India Act:</strong> Double Government (Board of Control + Court of Directors); "British possessions in India".</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">1813</span>
                  <span class="t-mid"><strong class="t-hi">Charter Act:</strong> Ended trade monopoly except Tea &amp; China; Rs 1 Lakh education grant; Christian missionaries permitted.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">1833</span>
                  <span class="t-mid"><strong class="t-hi">Charter Act:</strong> Apex of centralization; Governor-General of India (William Bentinck); Macaulay Law Member; commercial trade ended completely.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">1853</span>
                  <span class="t-mid"><strong class="t-hi">Charter Act:</strong> Separated executive &amp; legislative functions; 6-member Indian Legislative Council; open competition for ICS (1854).</span>
                </div>
              </div>
            </div>

            <!-- Phase 2: Crown Rule -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-3 pb-2 border-b b-line">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <UIcon name="i-heroicons-shield-check" class="h-4 w-4" />
                  Crown Rule (1858 - 1947)
                </span>
                <span class="chip chip-mono text-[10.5px]">89 Years</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Direct governance by the British Crown leading from legislative devolution to representative democracy, provincial autonomy, and partition.
              </p>
              <div class="space-y-2 text-xs">
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1858</span>
                  <span class="t-mid"><strong class="t-hi">GoI Act:</strong> Good Government of India; Viceroy of India (Lord Canning); Secretary of State for India + 15-member Council of India.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1861</span>
                  <span class="t-mid"><strong class="t-hi">Councils Act:</strong> Legislative decentralization; 3 Indians nominated (Benaras, Patiala, Dinkar Rao); Portfolio system &amp; Ordinances.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1909</span>
                  <span class="t-mid"><strong class="t-hi">Morley-Minto:</strong> Separate electorates for Muslims; Satyendra Prasad Sinha in Viceroy Executive Council.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1919</span>
                  <span class="t-mid"><strong class="t-hi">Mont-Ford:</strong> Dyarchy in Provinces; Bicameralism at Centre; separate provincial budgets [PYQ-1560]; Lee Commission PSC (1926).</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1935</span>
                  <span class="t-mid"><strong class="t-hi">GoI Act:</strong> Provincial Autonomy; 3 Lists; Federal Court (1937); RBI; Bicameralism in 6 provinces; 60% backbone of 1950 Constitution.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1947</span>
                  <span class="t-mid"><strong class="t-hi">Independence Act:</strong> Approved July 15, Royal Assent July 18 [PYQ-1560]; Two Dominions; Constituent Assemblies sovereign.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 02 · Company Rule Acts (1773-1853) ──────────────────────── -->
        <section id="company-rule" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Company Rule Acts (1773 - 1853)</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="company-rule" section-label="Company Rule Acts (1773-1853)" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Centralization &amp; Monopoly</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="company-rule" section-label="Company Rule Acts (1773-1853)" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- 1773 & 1784 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="panel panel-pad bg-elev border b-line">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-bold t-hi">1. Regulating Act of 1773</h3>
                  <span class="chip chip-mono text-[10px]">First Parliamentary Control</span>
                </div>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Governor-General of Bengal:</strong> Designated Governor of Bengal as Governor-General of Bengal. <strong class="t-hi">Lord Warren Hastings</strong> was the first.</li>
                  <li><strong class="t-hi">Executive Council:</strong> 4-member council to assist the Governor-General. Decisions by majority; casting vote in tie.</li>
                  <li><strong class="t-hi">Supreme Court at Calcutta (1774):</strong> 1 Chief Justice (<strong class="t-hi">Sir Elijah Impey</strong>) and 3 other judges (Chambers, Lemaistre, Hyde).</li>
                  <li><strong class="t-hi">Subordination:</strong> Governors of Bombay and Madras Presidencies made subordinate to Bengal in foreign/war affairs.</li>
                  <li><strong class="t-hi">Anti-Corruption:</strong> Prohibited Company servants from engaging in private trade or taking native gifts/bribes.</li>
                </ul>
              </div>

              <div class="panel panel-pad bg-elev border b-line">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-bold t-hi">2. Pitt's India Act of 1784</h3>
                  <span class="chip chip-mono text-[10px]">Double Government</span>
                </div>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Double Government:</strong> Commercial functions managed by <strong class="t-hi">Court of Directors</strong>; Political/revenue affairs controlled by a new 6-member <strong class="t-hi">Board of Control</strong>.</li>
                  <li><strong class="t-hi">British Possessions:</strong> Company territories in India were for the first time called <em class="t-hi">"British possessions in India"</em>.</li>
                  <li><strong class="t-hi">Supreme Control:</strong> British Government given direct superintending control over Company administration.</li>
                  <li><strong class="t-hi">Council Reduction:</strong> Governor-General Executive Council strength reduced from 4 to 3 members.</li>
                </ul>
              </div>
            </div>

            <!-- 1813 & 1833 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="panel panel-pad bg-elev border b-line">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-bold t-hi">3. Charter Act of 1813</h3>
                  <span class="chip chip-mono text-[10px]">Commercial Opening</span>
                </div>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">End of Monopoly:</strong> Abolished EIC trade monopoly in India, throwing Indian trade open to all British merchants.</li>
                  <li><strong class="t-hi">Monopoly Exceptions:</strong> EIC retained monopoly over <strong class="t-hi">Tea trade</strong> and <strong class="t-hi">Trade with China</strong> for 20 more years.</li>
                  <li><strong class="t-hi">Education Grant:</strong> Sanctioned an annual fund of <strong class="t-hi">Rs 1 Lakh</strong> for the revival of literature and promotion of science among natives.</li>
                  <li><strong class="t-hi">Christian Missionaries:</strong> Allowed Christian missionaries to enter India for proselytization.</li>
                </ul>
              </div>

              <div class="panel panel-pad bg-elev border b-line">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-bold t-hi">4. Charter Act of 1833</h3>
                  <span class="chip chip-mono text-[10px]">Apex of Centralization</span>
                </div>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Governor-General of India:</strong> Redesignated Governor-General of Bengal as <strong class="t-hi">Governor-General of India</strong>. First: <strong class="t-hi">Lord William Bentinck</strong>.</li>
                  <li><strong class="t-hi">Exclusive Legislation:</strong> Deprived Bombay and Madras of lawmaking powers; Governor-General given exclusive legislative power for all British India.</li>
                  <li><strong class="t-hi">Complete End of Commerce:</strong> EIC became a purely administrative body holding territories in trust for the Crown.</li>
                  <li><strong class="t-hi">Law Member (Macaulay):</strong> 4th member added to Council; First Law Commission (1834) drafted Indian Penal Code.</li>
                </ul>
              </div>
            </div>

            <!-- 1853 -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi">5. Charter Act of 1853</h3>
                <span class="chip chip-mono text-[10px]">Birth of Mini-Parliament</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs t-mid">
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">Separation of Powers</p>
                  <p>Separated executive and legislative functions of Governor-General's Council for the first time.</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">Indian Legislative Council</p>
                  <p>Added 6 new legislative members (Central Legislative Council) functioning as a mini-Parliament.</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">Open Competition for ICS</p>
                  <p>Introduced open competitive exam for civil service recruitment; Macaulay Committee formed in 1854.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 03 · Crown Rule Acts (1858-1947) ────────────────────────── -->
        <section id="crown-rule" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Crown Rule Acts (1858 - 1947)</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="crown-rule" section-label="Crown Rule Acts (1858-1947)" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Representative Rule to Independence</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="crown-rule" section-label="Crown Rule Acts (1858-1947)" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- 1858 & 1861 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="panel panel-pad bg-elev border b-line">
                <h3 class="text-sm font-bold t-hi mb-2 flex items-center justify-between">
                  <span>1. GoI Act 1858 ("Good Government")</span>
                  <span class="chip chip-mono text-[10px]">Crown Takeover</span>
                </h3>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Viceroy of India:</strong> Redesignated Governor-General as Viceroy (direct Crown representative). First Viceroy: <strong class="t-hi">Lord Canning</strong>.</li>
                  <li><strong class="t-hi">Double Government Abolished:</strong> Dissolved Board of Control and Court of Directors.</li>
                  <li><strong class="t-hi">Secretary of State for India:</strong> British Cabinet Minister with 15-member advisory <strong class="t-hi">Council of India</strong>.</li>
                </ul>
              </div>

              <div class="panel panel-pad bg-elev border b-line">
                <h3 class="text-sm font-bold t-hi mb-2 flex items-center justify-between">
                  <span>2. Indian Councils Act 1861</span>
                  <span class="chip chip-mono text-[10px]">Devolution &amp; Portfolio</span>
                </h3>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">3 Indians Nominated (1862):</strong> Raja of Benaras, Maharaja of Patiala, Sir Dinkar Rao.</li>
                  <li><strong class="t-hi">Legislative Devolution:</strong> Restored legislative powers to Bombay &amp; Madras Presidencies.</li>
                  <li><strong class="t-hi">Portfolio System &amp; Ordinances:</strong> Recognized Canning's 1859 Portfolio system; Viceroy empowered to issue 6-month emergency Ordinances.</li>
                </ul>
              </div>
            </div>

            <!-- 1909 & 1919 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="panel panel-pad bg-elev border b-line">
                <h3 class="text-sm font-bold t-hi mb-2 flex items-center justify-between">
                  <span>3. Morley-Minto Reforms (1909)</span>
                  <span class="chip chip-mono text-[10px]">Communal Electorates</span>
                </h3>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Separate Electorates for Muslims:</strong> Muslim members elected exclusively by Muslim voters. Lord Minto recognized as <em class="t-hi">"Father of Communal Electorate"</em>.</li>
                  <li><strong class="t-hi">First Indian in Executive Council:</strong> <strong class="t-hi">Satyendra Prasad Sinha</strong> joined Viceroy Executive Council as Law Member.</li>
                  <li><strong class="t-hi">Expanded Powers:</strong> Members permitted to ask supplementary questions and move budget resolutions.</li>
                </ul>
              </div>

              <div class="panel panel-pad bg-elev border b-line">
                <h3 class="text-sm font-bold t-hi mb-2 flex items-center justify-between">
                  <span>4. Montagu-Chelmsford Reforms (1919)</span>
                  <span class="chip chip-mono text-[10px]">Dyarchy in Provinces</span>
                </h3>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Provincial Dyarchy:</strong> Transferred subjects (Ministers) vs Reserved subjects (Governor &amp; Executive Council).</li>
                  <li><strong class="t-hi">Bicameralism at Centre:</strong> Council of State (60 members) &amp; Central Legislative Assembly (144 members).</li>
                  <li><strong class="t-hi">Provincial Budget Separation [PYQ-1560]:</strong> Separated provincial budgets from central budget for the first time.</li>
                  <li><strong class="t-hi">PSC &amp; High Commissioner:</strong> Established Central Public Service Commission (1926 Lee Commission) and High Commissioner in London.</li>
                </ul>
              </div>
            </div>

            <!-- 1935 & 1947 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="panel panel-pad bg-elev border b-line">
                <h3 class="text-sm font-bold t-hi mb-2 flex items-center justify-between">
                  <span>5. Government of India Act 1935</span>
                  <span class="chip chip-mono text-[10px]">60% Constitution Backbone</span>
                </h3>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Provincial Autonomy:</strong> Abolished provincial dyarchy; established responsible government in 11 provinces.</li>
                  <li><strong class="t-hi">3 Legislative Lists:</strong> Federal (59), Provincial (54), Concurrent (36). Residuary powers with Viceroy.</li>
                  <li><strong class="t-hi">Key Institutions:</strong> Federal Court (1937, CJ Maurice Gwyer), Reserve Bank of India (1935), FPSC/PPSC/JPSC.</li>
                  <li><strong class="t-hi">Bicameralism in 6 Provinces:</strong> Bengal, Bombay, Madras, Bihar, Assam, United Provinces.</li>
                </ul>
              </div>

              <div class="panel panel-pad bg-elev border b-line">
                <h3 class="text-sm font-bold t-hi mb-2 flex items-center justify-between">
                  <span>6. Indian Independence Act 1947</span>
                  <span class="chip chip-mono text-[10px]">Mountbatten Plan</span>
                </h3>
                <ul class="text-xs space-y-2 t-mid leading-relaxed">
                  <li><strong class="t-hi">Passage Dates [PYQ-1560]:</strong> Approved by British Parliament July 15, 1947; Royal Assent July 18, 1947.</li>
                  <li><strong class="t-hi">Two Dominions:</strong> Created India &amp; Pakistan from August 15, 1947.</li>
                  <li><strong class="t-hi">Sovereign Constituent Assemblies:</strong> Assemblies empowered to repeal any British Act and frame constitutions freely.</li>
                  <li><strong class="t-hi">Lapse of Paramountcy:</strong> British paramountcy over Princely States ended; interim governance under 1935 Act.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · Making of the Constitution & Committees ────────────── -->
        <section id="constituent-assembly" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Making of the Constitution &amp; Committees</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="constituent-assembly" section-label="Making of the Constitution & Committees" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Cabinet Mission · Drafting</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="constituent-assembly" section-label="Making of the Constitution & Committees" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <!-- High-Yield Chronology & Facts -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="p-3 rounded-xl bg-elev border b-line shadow-sm">
              <span class="eyebrow text-amber-600 dark:text-amber-400">Demands Evolution</span>
              <ul class="mt-2 text-xs space-y-1.5 t-mid">
                <li><strong class="t-hi">1934:</strong> M.N. Roy first proposed Constituent Assembly.</li>
                <li><strong class="t-hi">1935:</strong> INC officially demanded it.</li>
                <li><strong class="t-hi">1938:</strong> Nehru declared adult franchise framing.</li>
                <li><strong class="t-hi">1940:</strong> August Offer accepted in principle.</li>
                <li><strong class="t-hi">1946 [PYQ-3037]:</strong> Cabinet Mission Plan framed scheme.</li>
              </ul>
            </div>

            <div class="p-3 rounded-xl bg-elev border b-line shadow-sm">
              <span class="eyebrow text-emerald-600 dark:text-emerald-400">Composition (389 Seats)</span>
              <ul class="mt-2 text-xs space-y-1.5 t-mid">
                <li><strong class="t-hi">296 British India:</strong> 292 provinces + 4 Chief Commissioners.</li>
                <li><strong class="t-hi">93 Princely States:</strong> Nominated by rulers.</li>
                <li><strong class="t-hi">Ratio:</strong> 1 seat per 1 million population.</li>
                <li><strong class="t-hi">Communities:</strong> Muslims, Sikhs, General.</li>
                <li><strong class="t-hi">Post-Partition:</strong> Reduced to 299 seats.</li>
              </ul>
            </div>

            <div class="p-3 rounded-xl bg-elev border b-line shadow-sm">
              <span class="eyebrow text-sky-600 dark:text-sky-400">Constitutional Facts</span>
              <ul class="mt-2 text-xs space-y-1.5 t-mid">
                <li><strong class="t-hi">Time Taken:</strong> 2 yrs, 11 mos, 18 days (11 sessions).</li>
                <li><strong class="t-hi">Total Cost:</strong> ~Rs 64 Lakhs.</li>
                <li><strong class="t-hi">Symbol / Seal:</strong> Elephant.</li>
                <li><strong class="t-hi">Advisor:</strong> Sir B.N. Rau.</li>
                <li><strong class="t-hi">English Calligraphy:</strong> Prem Behari Raizada.</li>
              </ul>
            </div>
          </div>

          <!-- Landmark Milestone Timeline -->
          <div class="panel panel-pad bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3">Constituent Assembly Milestone Timeline</h3>
            <div class="space-y-2.5 text-xs">
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">Dec 9, 1946</span>
                <span class="t-mid">First meeting (211 members). <strong class="t-hi">Dr. Sachchidananda Sinha</strong> elected interim President (French practice).</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">Dec 11, 1946</span>
                <span class="t-mid"><strong class="t-hi">Dr. Rajendra Prasad</strong> elected permanent President; H.C. Mukherjee &amp; V.T. Krishnamachari elected Vice-Presidents; Sir B.N. Rau appointed Advisor.</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-saffron font-bold shrink-0">Dec 13, 1946 / Jan 22, 1947 [PYQ-0766]</span>
                <span class="t-mid">Nehru moved <strong class="t-hi">Objectives Resolution</strong> on Dec 13, 1946; <strong class="t-hi">unanimously adopted on January 22, 1947</strong> (became Preamble).</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">July 22, 1947</span>
                <span class="t-mid">National Flag adopted (Tri-color with 24-spoke Ashoka Chakra, ratio 3:2, designed by <strong class="t-hi">Pingali Venkayya</strong>).</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">Aug 29, 1947</span>
                <span class="t-mid"><strong class="t-hi">Drafting Committee</strong> appointed under Chairmanship of <strong class="t-hi">Dr. B.R. Ambedkar</strong> (7 members).</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">Nov 26, 1949</span>
                <span class="t-mid">Constitution adopted &amp; enacted (<strong class="t-hi">Constitution Day</strong>). Contained Preamble, 395 Articles, 8 Schedules, 22 Parts (signed by 284 members).</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">Jan 24, 1950</span>
                <span class="t-mid">National Anthem ("Jana Gana Mana") &amp; Song ("Vande Mataram") adopted; Dr. Rajendra Prasad elected first President.</span>
              </div>
              <div class="flex items-start gap-3 p-2.5 rounded bg-sub border b-line">
                <span class="chip chip-mono font-bold shrink-0">Jan 26, 1950</span>
                <span class="t-mid">Constitution commenced in full (<strong class="t-hi">Republic Day</strong>), commemorating Lahore Congress Purna Swaraj Day (Jan 26, 1930).</span>
              </div>
            </div>
          </div>

          <!-- Drafting Committee 7 Members & Major Committees -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 mb-2">The 7 Drafting Committee Members</h4>
              <ol class="list-decimal list-inside text-xs space-y-1.5 t-mid">
                <li><strong class="t-hi">Dr. B.R. Ambedkar</strong> (Chairman - "Modern Manu")</li>
                <li><strong class="t-hi">N. Gopalaswamy Ayyangar</strong></li>
                <li><strong class="t-hi">Alladi Krishnaswamy Iyer</strong></li>
                <li><strong class="t-hi">Dr. K.M. Munshi</strong> (Only active INC member throughout)</li>
                <li><strong class="t-hi">Syed Mohammad Saadulla</strong> (Only Muslim League member)</li>
                <li><strong class="t-hi">N. Madhava Rau</strong> (Replaced B.L. Mitter due to ill-health)</li>
                <li><strong class="t-hi">T.T. Krishnamachari</strong> (Replaced D.P. Khaitan on his death)</li>
              </ol>
            </div>

            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">Key Assembly Committees</h4>
              <ul class="text-xs space-y-1.5 t-mid">
                <li><strong class="t-hi">Jawaharlal Nehru:</strong> Union Powers, Union Constitution, States Committee.</li>
                <li><strong class="t-hi">Dr. Rajendra Prasad:</strong> Rules of Procedure, Steering, Finance &amp; Staff.</li>
                <li><strong class="t-hi">Sardar Patel:</strong> Provincial Constitution, Advisory Committee on FR/Minorities/Tribals.</li>
                <li><strong class="t-hi">J.B. Kripalani:</strong> Fundamental Rights Sub-Committee.</li>
                <li><strong class="t-hi">H.C. Mukherjee:</strong> Minorities Sub-Committee.</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 05 · Borrowed Sources Matrix ────────────────────────────── -->
        <section id="borrowed-sources" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Borrowed Sources Matrix</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="borrowed-sources" section-label="Borrowed Sources Matrix" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">10 Countries + GoI Act 1935</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="borrowed-sources" section-label="Borrowed Sources Matrix" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <div class="overflow-x-auto mb-6">
            <table class="w-full text-left text-xs border-collapse bg-elev rounded-xl shadow-sm border b-line">
              <thead class="bg-sub t-mid uppercase font-bold">
                <tr>
                  <th class="p-3 border-b b-line">Source Country</th>
                  <th class="p-3 border-b b-line">Constitutional Features Borrowed</th>
                  <th class="p-3 border-b b-line">High-Yield TGPRB Focus</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--line)] t-mid">
                <tr>
                  <td class="p-3 font-semibold t-hi">GoI Act 1935</td>
                  <td class="p-3">Federal Scheme, Office of Governor, Judiciary structure, Public Service Commissions (UPSC/SPSC), Emergency Provisions details, Administrative details.</td>
                  <td class="p-3 text-amber-600 dark:text-amber-400 font-medium">Structural backbone (~60% of text).</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">United Kingdom</td>
                  <td class="p-3">Parliamentary Government, Rule of Law (Dicey), Legislative Procedure, Single Citizenship [PYQ-0306], Cabinet System, Prerogative Writs, Parliamentary Privileges (Art 105), Bicameralism.</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Single Citizenship prevents regionalism.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">United States</td>
                  <td class="p-3">Fundamental Rights (Part III), Judicial Independence, Judicial Review, Impeachment of President (Art 61), Removal of SC/HC Judges, Post of Vice-President, Preamble concept.</td>
                  <td class="p-3">Judicial review &amp; Fundamental Rights.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">Ireland</td>
                  <td class="p-3">Directive Principles of State Policy (DPSP, Part IV), Nomination of 12 Rajya Sabha members, Method of Presidential Election (PR-STV).</td>
                  <td class="p-3 text-amber-600 dark:text-amber-400 font-medium">DPSP borrowed via Spanish Constitution.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">Canada</td>
                  <td class="p-3">Federation with a Strong Centre, Vesting of Residuary Powers in Centre (Art 248), Appointment of State Governors by Centre, Advisory Jurisdiction of Supreme Court (Art 143).</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Residuary powers with Centre (not States).</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">Australia</td>
                  <td class="p-3">Concurrent List (7th Schedule List III), Freedom of Trade &amp; Commerce (Part XIII), Joint Sitting of Parliament (Art 108).</td>
                  <td class="p-3">Concurrent list &amp; Joint Sitting.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">USSR (Russia)</td>
                  <td class="p-3">Fundamental Duties (Article 51A, Part IV-A added by 42nd CAA 1976), Ideals of Justice (Social, Economic, Political) in Preamble.</td>
                  <td class="p-3">Russian Revolution 1917 ideals.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">France</td>
                  <td class="p-3">Republic Concept (Elected Head of State [PYQ-0166, PYQ-1240]), Ideals of Liberty, Equality, and Fraternity in Preamble.</td>
                  <td class="p-3">French Revolution 1789 ideals.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">Germany (Weimar)</td>
                  <td class="p-3">Suspension of Fundamental Rights during Emergency (Arts 358 &amp; 359).</td>
                  <td class="p-3 text-rose-600 dark:text-rose-400 font-medium">Emergency declaration is 1935; FR suspension is Germany.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">South Africa</td>
                  <td class="p-3">Procedure for Amendment of Constitution (Article 368), Election of Rajya Sabha members by MLAs.</td>
                  <td class="p-3">Article 368 amendment mechanism.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold t-hi">Japan</td>
                  <td class="p-3">Procedure Established by Law (Article 21).</td>
                  <td class="p-3">Contrasted with US "Due Process of Law".</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ── 06 · The Preamble & 12 Schedules ────────────────────────── -->
        <section id="preamble-schedules" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">The Preamble &amp; 12 Schedules</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="preamble-schedules" section-label="The Preamble & 12 Schedules" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">SO-SO-SE-DE-RE · TEARS OF OLD PM</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="preamble-schedules" section-label="The Preamble & 12 Schedules" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <!-- Preamble Keyword Sequence Banner -->
          <div class="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <h4 class="font-bold text-amber-900 dark:text-amber-200 text-sm mb-2">
              Preamble Core Keyword Order: S-S-S-D-R [PYQ-0972, PYQ-2472]
            </h4>
            <p class="text-xs text-amber-800 dark:text-amber-300 leading-relaxed mb-3">
              "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a <strong class="text-amber-950 dark:text-amber-100">SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</strong>..."
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div class="p-2 rounded bg-elev border b-line font-bold t-hi">1. Sovereign</div>
              <div class="p-2 rounded bg-elev border b-line font-bold text-amber-600 dark:text-amber-400">2. Socialist (42nd)</div>
              <div class="p-2 rounded bg-elev border b-line font-bold text-amber-600 dark:text-amber-400">3. Secular (42nd)</div>
              <div class="p-2 rounded bg-elev border b-line font-bold t-hi">4. Democratic</div>
              <div class="p-2 rounded bg-elev border b-line font-bold t-hi">5. Republic</div>
            </div>
          </div>

          <!-- 42nd CAA & Judicial Precedents -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">42nd Amendment Act 1976 [PYQ-1560]</h4>
              <p class="text-xs t-mid leading-relaxed mb-2">
                Enacted during National Emergency (effective Jan 3, 1977). The Preamble has been amended <strong class="t-hi">ONLY ONCE</strong> in history, adding 3 new words:
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="chip chip-jade font-bold">1. SOCIALIST</span>
                <span class="chip chip-jade font-bold">2. SECULAR</span>
                <span class="chip chip-jade font-bold">3. INTEGRITY</span>
              </div>
            </div>

            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">Preamble Legal Status &amp; Cases</h4>
              <ul class="text-xs space-y-1.5 t-mid">
                <li><strong class="t-hi">Berubari Union (1960):</strong> SC held Preamble is <em class="text-rose-500">NOT part</em> of Constitution.</li>
                <li><strong class="t-hi">Kesavananda Bharati (1973):</strong> SC overruled Berubari; held Preamble <em class="text-emerald-500">IS an integral part</em> and amendable under Art 368 without altering Basic Structure.</li>
                <li><strong class="t-hi">Non-Justiciable:</strong> Preamble provisions are NOT enforceable in courts.</li>
              </ul>
            </div>
          </div>

          <!-- 12 Schedules Master Table with Mnemonic -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-bold t-hi">The 12 Schedules: Mnemonic "TEARS OF OLD PM" [PYQ-0943]</h3>
              <span class="chip chip-mono text-[10.5px]">8 Original + 4 Added</span>
            </div>
            <p class="text-xs t-lo mb-3">
              Originally 8 schedules existed in 1949. Amendments added 9th (1st CAA 1951), 10th (52nd CAA 1985), 11th (73rd CAA 1992), and 12th (74th CAA 1992).
            </p>
          </div>

          <div class="overflow-x-auto mb-6">
            <table class="w-full text-left text-xs border-collapse bg-elev rounded-xl shadow-sm border b-line">
              <thead class="bg-sub t-mid uppercase font-bold">
                <tr>
                  <th class="p-3 border-b b-line">Mnemonic</th>
                  <th class="p-3 border-b b-line">Schedule</th>
                  <th class="p-3 border-b b-line">Subject Matter</th>
                  <th class="p-3 border-b b-line">Key Exam Traps &amp; Amendments</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--line)] t-mid">
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">T</td>
                  <td class="p-3 font-semibold t-hi">1st Schedule</td>
                  <td class="p-3"><strong class="t-hi">T</strong>erritories &amp; States (28 States, 8 UTs)</td>
                  <td class="p-3">Articles 1 &amp; 4; lists territorial jurisdiction.</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">E</td>
                  <td class="p-3 font-semibold t-hi">2nd Schedule</td>
                  <td class="p-3"><strong class="t-hi">E</strong>moluments &amp; Salaries</td>
                  <td class="p-3">President, Governors, Speakers, Judges, CAG. (PM/Ministers not listed here).</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">A</td>
                  <td class="p-3 font-semibold t-hi">3rd Schedule</td>
                  <td class="p-3"><strong class="t-hi">A</strong>ffirmations &amp; Oaths</td>
                  <td class="p-3 text-rose-600 dark:text-rose-400 font-bold">TRAP: President (Art 60), VP (Art 69), Governor (Art 159) oaths are in Articles, NOT in 3rd Schedule!</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">R</td>
                  <td class="p-3 font-semibold t-hi">4th Schedule</td>
                  <td class="p-3"><strong class="t-hi">R</strong>ajya Sabha Seat Allocation</td>
                  <td class="p-3">Allocated by population: Telangana (7), Andhra Pradesh (11), UP (max 31).</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">S</td>
                  <td class="p-3 font-semibold t-hi">5th Schedule</td>
                  <td class="p-3"><strong class="t-hi">S</strong>cheduled Areas Administration</td>
                  <td class="p-3">Applies to 10 States (including Telangana &amp; AP). Governed via Tribes Advisory Councils.</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">O</td>
                  <td class="p-3 font-semibold t-hi">6th Schedule</td>
                  <td class="p-3"><strong class="t-hi">O</strong>ther Tribal Areas (AMTM)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold">4 NE States: Assam, Meghalaya, Tripura, Mizoram (AMTM). Autonomous District Councils.</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">F</td>
                  <td class="p-3 font-semibold t-hi">7th Schedule</td>
                  <td class="p-3"><strong class="t-hi">F</strong>ederal Lists (3 Lists)</td>
                  <td class="p-3">
                    <strong class="t-hi">List I (Union - 100):</strong> Defence, Railways, Police jurisdiction extension (Entry 60) [PYQ-1557].<br>
                    <strong class="t-hi">List II (State - 61):</strong> Public Order (1), Police (2) [PYQ-1557].<br>
                    <strong class="t-hi">List III (Concurrent - 52):</strong> Prevention of Cruelty to Animals (17) [PYQ-1563], Food Adulteration (18) [PYQ-2194], Economic &amp; Social Planning (20) [PYQ-1787].
                  </td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">O</td>
                  <td class="p-3 font-semibold t-hi">8th Schedule</td>
                  <td class="p-3"><strong class="t-hi">O</strong>fficial Languages (22 Languages)</td>
                  <td class="p-3">
                    Originally 14. Additions:<br>
                    • 21st CAA 1967: Sindhi (15th)<br>
                    • 71st CAA 1992: Konkani, Manipuri, Nepali (KMN)<br>
                    • 92nd CAA 2003: Bodo, Dogri, Maithili, Santhali (BDMS)<br>
                    • 96th CAA 2011: Renamed Oriya to Odia. (English is NOT in 8th Schedule).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">L</td>
                  <td class="p-3 font-semibold t-hi">9th Schedule</td>
                  <td class="p-3"><strong class="t-hi">L</strong>and Reforms &amp; Judicial Immunity</td>
                  <td class="p-3">Added by 1st CAA 1951 (Art 31B). I.R. Coelho case (2007): Laws added after April 24, 1973 are subject to Basic Structure judicial review.</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">D</td>
                  <td class="p-3 font-semibold t-hi">10th Schedule</td>
                  <td class="p-3"><strong class="t-hi">D</strong>efection (Anti-Defection Law)</td>
                  <td class="p-3">Added by 52nd CAA 1985 (Arts 102 &amp; 191). 91st CAA 2003 barred 1/3rd split. Decided by Speaker/Chairman (Kihoto Hollohan case).</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">P</td>
                  <td class="p-3 font-semibold t-hi">11th Schedule</td>
                  <td class="p-3"><strong class="t-hi">P</strong>anchayati Raj (29 Subjects)</td>
                  <td class="p-3">Added by 73rd CAA 1992 (Art 243G, Part IX). Contains 29 functional items.</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">M</td>
                  <td class="p-3 font-semibold t-hi">12th Schedule</td>
                  <td class="p-3"><strong class="t-hi">M</strong>unicipalities (18 Subjects)</td>
                  <td class="p-3">Added by 74th CAA 1992 (Art 243W, Part IX-A). Contains 18 functional items.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ── 07 · TGPRB Exam Trap Matrix ─────────────────────────────── -->
        <section id="trap-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">TGPRB Exam Trap Matrix &amp; Memory Hacks</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="trap-matrix" section-label="Exam Trap Matrix" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">6 High-Frequency Distractor Tables</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="trap-matrix" section-label="Exam Trap Matrix" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- Trap 1: Dyarchy 1919 vs 1935 -->
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                Trap 1: Dyarchy Evolution (1919 vs 1935)
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse bg-sub rounded-lg border b-line">
                  <thead class="t-hi font-bold">
                    <tr>
                      <th class="p-2.5 border-b b-line">Governance Level</th>
                      <th class="p-2.5 border-b b-line">Government of India Act 1919</th>
                      <th class="p-2.5 border-b b-line">Government of India Act 1935</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[var(--line)] t-mid">
                    <tr>
                      <td class="p-2.5 font-bold t-hi">Provincial Level</td>
                      <td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold"><strong class="t-hi">INTRODUCED Dyarchy</strong> (Transferred vs Reserved subjects).</td>
                      <td class="p-2.5 text-rose-600 dark:text-rose-400 font-bold"><strong class="t-hi">ABOLISHED Dyarchy</strong>; Introduced Provincial Autonomy.</td>
                    </tr>
                    <tr>
                      <td class="p-2.5 font-bold t-hi">Central Level</td>
                      <td class="p-2.5">Introduced Bicameralism &amp; Direct Elections.</td>
                      <td class="p-2.5 font-medium"><strong class="t-hi">PROPOSED Dyarchy at Centre</strong> (never came into operation).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Trap 2: Governor-General Designation Evolution -->
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                Trap 2: Governor-General Designation Evolution
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse bg-sub rounded-lg border b-line">
                  <thead class="t-hi font-bold">
                    <tr>
                      <th class="p-2.5 border-b b-line">Act</th>
                      <th class="p-2.5 border-b b-line">Designation Created</th>
                      <th class="p-2.5 border-b b-line">First Incumbent</th>
                      <th class="p-2.5 border-b b-line">Key Exam Distinction</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[var(--line)] t-mid">
                    <tr>
                      <td class="p-2.5 font-bold t-hi">Regulating Act 1773</td>
                      <td class="p-2.5">Governor-General of Bengal</td>
                      <td class="p-2.5 font-semibold text-amber-600 dark:text-amber-400">Lord Warren Hastings</td>
                      <td class="p-2.5">Executive Council of 4; Supreme Court at Calcutta 1774.</td>
                    </tr>
                    <tr>
                      <td class="p-2.5 font-bold t-hi">Charter Act 1833</td>
                      <td class="p-2.5">Governor-General of India</td>
                      <td class="p-2.5 font-semibold text-amber-600 dark:text-amber-400">Lord William Bentinck</td>
                      <td class="p-2.5">Exclusive legislative power; ended EIC commercial trade.</td>
                    </tr>
                    <tr>
                      <td class="p-2.5 font-bold t-hi">GoI Act 1858</td>
                      <td class="p-2.5">Viceroy of India</td>
                      <td class="p-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Lord Canning</td>
                      <td class="p-2.5">Direct representative of British Crown; abolished EIC rule.</td>
                    </tr>
                    <tr>
                      <td class="p-2.5 font-bold t-hi">Independence Act 1947</td>
                      <td class="p-2.5">Governor-General of Independent India</td>
                      <td class="p-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Lord Mountbatten / C. Rajagopalachari</td>
                      <td class="p-2.5">Rajagopalachari was the first and only Indian Governor-General.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Trap 3: Separate Electorates Timeline -->
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Trap 3: Separate Electorates Expansion Timeline
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs t-mid">
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">1909 Act (Morley-Minto)</p>
                  <p class="text-emerald-600 dark:text-emerald-400 font-bold">Muslims Only</p>
                  <p class="mt-1 t-lo">Lord Minto = Father of Communal Electorate.</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">1919 Act (Mont-Ford)</p>
                  <p class="text-amber-600 dark:text-amber-400 font-bold">Sikhs, Indian Christians, Anglo-Indians, Europeans</p>
                  <p class="mt-1 t-lo">Expanded from 1 to 5 categories.</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">1935 Act (GoI Act)</p>
                  <p class="text-sky-600 dark:text-sky-400 font-bold">Depressed Classes, Women, Labor (Workers)</p>
                  <p class="mt-1 t-lo">Post-Poona Pact 1932 extension.</p>
                </div>
              </div>
            </div>

            <!-- Trap 4: Residuary Powers Allocation -->
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
                Trap 4: Residuary Powers Allocation Matrix
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs t-mid">
                <div class="p-2 rounded bg-sub border b-line text-center">
                  <p class="font-bold t-hi">GoI Act 1935</p>
                  <p class="font-semibold text-rose-600 dark:text-rose-400 mt-1">Governor-General (Viceroy)</p>
                </div>
                <div class="p-2 rounded bg-sub border b-line text-center">
                  <p class="font-bold t-hi">USA &amp; Australia</p>
                  <p class="font-semibold text-amber-600 dark:text-amber-400 mt-1">States / Provinces</p>
                </div>
                <div class="p-2 rounded bg-sub border b-line text-center">
                  <p class="font-bold t-hi">Canada</p>
                  <p class="font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Dominion Centre</p>
                </div>
                <div class="p-2 rounded bg-sub border b-line text-center">
                  <p class="font-bold t-hi">India (Art 248)</p>
                  <p class="font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Union Parliament</p>
                </div>
              </div>
            </div>

            <!-- Trap 5: Oaths in 3rd Schedule vs Specific Articles -->
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                Trap 5: Constitutional Oaths Location
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs t-mid">
                <div class="p-2.5 rounded bg-sub border border-rose-300 dark:border-rose-900/50">
                  <p class="font-bold text-rose-600 dark:text-rose-400 mb-1">NOT in 3rd Schedule (Specific Articles!):</p>
                  <ul class="space-y-1 t-mid">
                    <li>• <strong class="t-hi">President:</strong> Article 60 (by Chief Justice of India)</li>
                    <li>• <strong class="t-hi">Vice-President:</strong> Article 69 (by President)</li>
                    <li>• <strong class="t-hi">Governor:</strong> Article 159 (by High Court Chief Justice)</li>
                  </ul>
                </div>
                <div class="p-2.5 rounded bg-sub border border-emerald-300 dark:border-emerald-900/50">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400 mb-1">Specified in 3rd Schedule:</p>
                  <ul class="space-y-1 t-mid">
                    <li>• Union &amp; State Ministers</li>
                    <li>• MPs, MLAs, and Election Candidates</li>
                    <li>• Supreme Court &amp; High Court Judges, CAG</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Trap 6: 5th Schedule vs 6th Schedule -->
            <div class="panel panel-pad bg-elev border b-line">
              <h4 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                Trap 6: 5th Schedule vs 6th Schedule Tribal Administration
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs t-mid">
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">5th Schedule (Scheduled Areas)</p>
                  <p><strong class="t-hi">10 States:</strong> AP, Telangana, Odisha, Jharkhand, MP, Chhattisgarh, Rajasthan, Gujarat, Maharashtra, HP.</p>
                  <p class="mt-1 font-medium text-amber-600 dark:text-amber-400">Administered via Tribes Advisory Councils (TAC).</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold t-hi mb-1">6th Schedule (Tribal Areas: AMTM)</p>
                  <p><strong class="t-hi">4 NE States:</strong> Assam, Meghalaya, Tripura, Mizoram (<strong class="t-hi">AMTM</strong>).</p>
                  <p class="mt-1 font-medium text-emerald-600 dark:text-emerald-400">Administered via Autonomous District Councils (ADCs).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 08 · Previous Year Questions (31 Verified TGPRB PYQs) ────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Previous Year Questions</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="pyqs" section-label="Previous Year Questions" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">31 verified questions · 2015-2023</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="pyqs" section-label="Previous Year Questions" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <!-- Filter bar -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border b-line bg-sub p-3">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="f in examFilters"
                :key="f.value"
                type="button"
                class="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                :class="activeExamFilter === f.value ? 'bg-elev t-hi font-semibold shadow-sm border b-line' : 't-lo hover:t-mid'"
                @click="activeExamFilter = f.value"
              >
                {{ f.label }}
              </button>
            </div>
            <div class="flex items-center gap-3 text-xs font-mono t-lo">
              <span>Attempted: <strong class="t-hi">{{ attemptedCount }}</strong>/{{ pyqs.length }}</span>
              <span>Score: <strong class="text-emerald-600 dark:text-emerald-400">{{ correctCount }}</strong></span>
            </div>
          </div>

          <!-- Question Cards Deck -->
          <div class="space-y-4">
            <article v-for="(q, qi) in filteredPyqs" :key="q.uid" class="panel panel-pad transition-all duration-200 hover:b-strong">
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="chip chip-mono" :class="q.exam === 'SI' ? 'chip-saffron' : 'chip-sky'">{{ q.exam }} {{ q.year }}</span>
                <span class="chip chip-mono">{{ q.tag }}</span>
                <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto sm:ms-0"
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

              <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
                <p class="callout-title">
                  <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
                  Correct Answer: Option {{ 'ABCD'[q.correct] }} · {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
                <AiAskButton
                  class="mt-3"
                  note-id="NOTE-POL-CONST-FRAME"
                  :prompt="`Explain the constitutional reasoning and potential exam traps for this PYQ: ${q.question}`"
                  :source-question-id="q.uid"
                  :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid], gate_score: 0, gate_total: 0 }"
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

        <!-- ── 09 · Advanced Practice (TGPSC Group-I 2024 Drills) ──────── -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="advanced-practice" section-label="Advanced Practice" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ advancedPractice.length }} drills</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="advanced-practice" section-label="Advanced Practice" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />

          <!-- Indigo Disclaimer -->
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
              Source: Forensic Paper-Setting Evolution Audit, Aug 2026 · 1,350 questions classified across 7 papers.
            </p>
          </div>

          <!-- Advanced Cards Deck -->
          <div class="space-y-4">
            <article v-for="(q, qi) in advancedPractice" :key="q.uid" class="panel panel-pad transition-all duration-200 hover:b-strong">
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-bold font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  {{ q.format }}
                </span>
                <span v-if="q.isSynthetic" class="chip chip-mono">TGPSC-Style Practice</span>
                <span v-else class="chip chip-mono">Real TGPSC</span>
                <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto sm:ms-0"
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

              <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
                <p class="callout-title">
                  <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
                  Correct Answer: Option {{ 'ABCD'[q.correct] }} · {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
                <AiAskButton
                  class="mt-3"
                  note-id="NOTE-POL-CONST-FRAME"
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

        <!-- ── 10 · Comprehension Gate ─────────────────────────────────── -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="gate" section-label="Comprehension Gate" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="gate" section-label="Comprehension Gate" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-POL-CONST-FRAME" />
        </section>

        <!-- ── 11 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">11</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-POL-CONST-FRAME" section-id="current-affairs" section-label="Current Affairs" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-CONST-FRAME" section-id="current-affairs" section-label="Current Affairs" note-title="Constitutional Framework & Preamble" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-POL-CONST-FRAME" />
        </section>

        <!-- ── Footer nav ───────────────────────────────────────────────── -->
        <nav class="grid gap-3 border-t b-line pt-8 sm:grid-cols-2">
          <NuxtLink to="/" class="panel panel-hover group flex items-center gap-3 p-5">
            <UIcon name="i-heroicons-arrow-left" class="h-4 w-4 shrink-0 t-lo transition-transform group-hover:-translate-x-1" />
            <div>
              <p class="eyebrow mb-0.5">Dashboard</p>
              <p class="text-[13.5px] font-semibold t-hi">All StudyOS topics</p>
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
          <nav ref="tocNavRef" class="relative space-y-0.5">
            <div
              class="toc-pill pointer-events-none absolute start-0 w-full rounded-md"
              :style="tocPillStyle"
              aria-hidden="true"
            />
            <a
              v-for="(section, i) in sections"
              :key="section.id"
              :ref="(el) => setTocItemRef(section.id, el)"
              :href="`#${section.id}`"
              class="group relative z-10 flex items-baseline gap-2.5 rounded-md px-2 py-1.5 text-body-xs bg-transparent transition-colors"
              :class="activeSection === section.id ? 't-hi font-semibold' : 't-lo hover:t-mid'"
              @click.prevent="scrollTo(section.id)"
            >
              <span class="num font-mono text-[10px] transition-colors" :class="activeSection === section.id ? 'accent' : 't-lo'">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="transition-colors">{{ section.label }}</span>
            </a>
          </nav>
          <div class="mt-6 border-t b-line pt-4">
            <p class="eyebrow mb-2">Weight in paper</p>
            <p class="text-body-xs leading-relaxed t-lo">3-4 questions per paper across SI &amp; Constable.</p>
          </div>
        </div>
      </aside>
    </div>

    <AiAssistantDrawer
      note-id="NOTE-POL-CONST-FRAME"
      note-title="Constitutional Framework &amp; Preamble"
      :quick-prompts="aiQuickPrompts"
    />
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-POL-CONST-FRAME"
      note-title="Constitutional Framework &amp; Preamble"
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
import { computed, onMounted, onUnmounted, reactive, ref, watch, nextTick } from 'vue'
import CurrentAffairsStrip from '@/components/CurrentAffairsStrip.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import { useAiPromptChips } from '@/composables/useAiPromptChips'
import type { SectionContext } from '@/types/annotations'

useHead({
  title: 'Constitutional Framework & Preamble - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Comprehensive TGPRB study note: Constitutional Framework & Preamble with 31 verified PYQs, TGPSC-style hardening drills, and memory matrix.' }],
})

const aiQuickPrompts = useAiPromptChips('NOTE-POL-CONST-FRAME')

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Acts 1773-1947' },
  { label: 'Constituent Assembly' },
  { label: 'Preamble & 42nd CAA' },
  { label: '12 Schedules & 3 Lists' },
  { label: 'Borrowed Sources' },
  { label: 'Trap Matrices' },
]

const sections = [
  { id: 'visual-roadmap',      label: 'Visual Roadmap (1773-1950)' },
  { id: 'company-rule',        label: 'Company Rule Acts (1773-1853)' },
  { id: 'crown-rule',          label: 'Crown Rule Acts (1858-1947)' },
  { id: 'constituent-assembly',label: 'Making of the Constitution' },
  { id: 'borrowed-sources',    label: 'Borrowed Features Matrix' },
  { id: 'preamble-schedules',  label: 'Preamble & 12 Schedules' },
  { id: 'trap-matrix',         label: 'Exam Trap Matrix' },
  { id: 'pyqs',                label: 'Previous Year Questions' },
  { id: 'advanced-practice',   label: 'Advanced Practice' },
  { id: 'gate',                label: 'Comprehension Gate' },
  { id: 'current-affairs',     label: 'Current Affairs' },
]

const mobileTocOpen = ref(false)
const readProgress = ref(0)
const activeSection = ref('visual-roadmap')

const tocNavRef = ref<HTMLElement | null>(null)
const tocItemRefs = new Map<string, HTMLElement>()
const pillTop = ref(0)
const pillHeight = ref(0)
const hasPill = ref(false)
let tocResizeObserver: ResizeObserver | null = null

function setTocItemRef(id: string, el: any) {
  if (el) {
    const domEl = el.$el || el
    if (domEl instanceof HTMLElement) {
      tocItemRefs.set(id, domEl)
    }
  } else {
    tocItemRefs.delete(id)
  }
}

function updatePillPosition() {
  const activeEl = tocItemRefs.get(activeSection.value)
  if (activeEl && tocNavRef.value) {
    pillTop.value = activeEl.offsetTop
    pillHeight.value = activeEl.offsetHeight
    hasPill.value = true
  } else {
    hasPill.value = false
  }
}

const tocPillStyle = computed(() => ({
  transform: `translateY(${pillTop.value}px)`,
  height: `${pillHeight.value}px`,
  opacity: hasPill.value ? 1 : 0,
}))

watch(activeSection, () => {
  nextTick(() => {
    updatePillPosition()
  })
})

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

  // Bottom-scroll detector for #gate & #current-affairs
  if (window.innerHeight + window.scrollY >= h.scrollHeight - 50) {
    activeSection.value = sections[sections.length - 1].id
    return
  }

  // getBoundingClientRect top evaluation
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) {
        activeSection.value = sections[i].id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  loadNotes()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

interface Pyq {
  uid: string
  exam: string
  year: string
  tag: string
  source: string
  question: string
  options: string[]
  correct: number
  explanation: string
  revealed: boolean
  selected: number | null
}

const pyqs: Pyq[] = reactive([
  {
    "uid": "PYQ-0166",
    "exam": "Constable",
    "year": "2015",
    "tag": "Republic & Franchise",
    "source": "Constable 2015 Mains \u00b7 Q166",
    "question": "Assertion (A): India is a Republic\nReason (R): India has universal adult franchise system",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true and (R) is false",
      "(A) is false and (R) is true"
    ],
    "correct": 1,
    "explanation": "A 'Republic' means that the head of the state (the President) is elected and there is no hereditary monarch, whereas 'Universal Adult Franchise' (Article 326) grants voting rights to all citizens aged 18 and above. Both statements are correct, but adult franchise describes democracy rather than explaining why India is a republic (as constitutional monarchies like the UK also have universal suffrage).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0182",
    "exam": "Constable",
    "year": "2015",
    "tag": "State Security & Territory",
    "source": "Constable 2015 Mains \u00b7 Q182",
    "question": "Read the following statements: A) The first state in the country to draft its own internal security legislation is Maharashtra. B) The city to host Bharatiya Pravas Divas in 2017 will be Hyderabad C) The first island district that emerged recently in India is Majuli Choose the correct statements:",
    "options": [
      "A&B",
      "B & C",
      "C&A",
      "A, B & C"
    ],
    "correct": 2,
    "explanation": "Statements A and C are correct: Maharashtra was the first Indian state to draft its own internal security bill (MPISA) in 2016, and Majuli in Assam became India's first river island district in September 2016. Statement B is incorrect because the 14th Pravasi Bharatiya Divas (2017) was held in Bengaluru, Karnataka.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0306",
    "exam": "Constable",
    "year": "2015",
    "tag": "Citizenship",
    "source": "Constable 2015 Prelims \u00b7 Q107",
    "question": "Assertion (A) : In general, citizens in a federal country have dual citizenship. Though India is a federal country, Indian citizens have single citizenship. Reason (R) : India has been following the policy of single citizenship with a view to safeguard national integrity by curbing disruptive forces.",
    "options": [
      "Both (A) and (R) are individually true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are individually true but (R) is not the correct explanation of (A)",
      "(A) is true but (R) is false",
      "(A) is false but (R) is true"
    ],
    "correct": 0,
    "explanation": "Federal nations like the USA typically grant dual citizenship, but India adopted single citizenship to foster national integration and prevent regional divisive tendencies. Thus, both statements are correct, and the Reason correctly explains the Assertion.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0310",
    "exam": "Constable",
    "year": "2015",
    "tag": "Republic Day",
    "source": "Constable 2015 Prelims \u00b7 Q112",
    "question": "Who among the following participated in the Republic Day parade, 2016 ?",
    "options": [
      "French soldiers",
      "American soldiers",
      "Japanese soldiers",
      "British soldiers"
    ],
    "correct": 0,
    "explanation": "During the 67th Republic Day parade in 2016, French soldiers became the first-ever foreign military contingent to march down Rajpath alongside Indian troops. French President Fran\u00e7ois Hollande was the chief guest at the parade.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0592",
    "exam": "Constable",
    "year": "2018",
    "tag": "National Anthem",
    "source": "Constable 2018 Mains \u00b7 Q171",
    "question": "India's National Anthem is an expression of",
    "options": [
      "Unity of India",
      "the integration of rivers",
      "diversity in the implementation of rules",
      "Geographical Description"
    ],
    "correct": 0,
    "explanation": "India's National Anthem, composed by Rabindranath Tagore, is an expression of the unity of India. While it mentions various geographical regions and rivers, its overarching theme and political significance represent national integration and unity amidst diversity.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0766",
    "exam": "Constable",
    "year": "2018",
    "tag": "Constituent Assembly",
    "source": "Constable 2018 Prelims \u00b7 Q146",
    "question": "In the Constituent Assembly, the 'Objectives Resolution' was passed on:",
    "options": [
      "24th January, 1947",
      "25th January, 1947",
      "26th January, 1947",
      "22nd January, 1947"
    ],
    "correct": 3,
    "explanation": "The 'Objectives Resolution' was moved by Pandit Jawaharlal Nehru on December 13, 1946, and unanimously adopted by the Constituent Assembly on January 22, 1947. This resolution laid down the fundamental principles and philosophy that later formed the Preamble of the Indian Constitution.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0803",
    "exam": "Constable",
    "year": "2018",
    "tag": "SRC 1953",
    "source": "Constable 2018 Prelims \u00b7 Q184",
    "question": "The Government of India formed the States Reorganisation Commission (SRC) in December 1953. Who among the following was not connected with the commission?",
    "options": [
      "Justice Bhargava",
      "Saiyid Fazal Ali",
      "H.N. Kunzru",
      "K.M. Panikkar"
    ],
    "correct": 0,
    "explanation": "The States Reorganisation Commission (SRC) appointed in December 1953 consisted of three members: Saiyid Fazal Ali (Chairman), H.N. Kunzru, and K.M. Panikkar. Justice Bhargava was not a member of this commission.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0943",
    "exam": "Constable",
    "year": "2022",
    "tag": "Seventh Schedule",
    "source": "Constable 2022 Prelims \u00b7 Q124",
    "question": "How many schedules are there in the Indian Constitution ?",
    "options": [
      "12",
      "10",
      "11",
      "9"
    ],
    "correct": 0,
    "explanation": "The Constitution of India originally had 8 schedules when it was adopted in 1949. Through various constitutional amendments, 4 more schedules were added, bringing the total number of schedules in the Indian Constitution to 12.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0972",
    "exam": "Constable",
    "year": "2022",
    "tag": "Seventh Schedule",
    "source": "Constable 2022 Prelims \u00b7 Q154",
    "question": "India is a Sovereign Socialist ______ country.",
    "options": [
      "Secular",
      "Democratic",
      "Republic",
      "All the above"
    ],
    "correct": 3,
    "explanation": "The Preamble to the Indian Constitution declares India to be a 'Sovereign Socialist Secular Democratic Republic'. Therefore, Secular, Democratic, and Republic all accurately complete the description of India.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1091",
    "exam": "Constable",
    "year": "2023",
    "tag": "Diaspora & Polity",
    "source": "Constable 2023 Mains \u00b7 Q74",
    "question": "Identify the Indian-origin leaders across the world.",
    "options": [
      "RISHI SUNAK only",
      "KAMALA HARIS only",
      "PRAVIND JUGANAUTH only",
      "All of the above"
    ],
    "correct": 3,
    "explanation": "Rishi Sunak (former UK Prime Minister), Kamala Harris (US Vice President), and Pravind Jugnauth (former Prime Minister of Mauritius) are all prominent world leaders of Indian origin.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1100",
    "exam": "Constable",
    "year": "2023",
    "tag": "Diaspora & Polity",
    "source": "Constable 2023 Mains \u00b7 Q83",
    "question": "Identify the country which does not have an Indian Embassy.",
    "options": [
      "Somalia",
      "Pakistan",
      "China",
      "Bangladesh"
    ],
    "correct": 0,
    "explanation": "India closed its resident embassy in Mogadishu, Somalia, in 1991 following the outbreak of civil war. The High Commission of India in Nairobi, Kenya, remains concurrently accredited to Somalia.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1168",
    "exam": "Constable",
    "year": "2023",
    "tag": "Dhar Commission",
    "source": "Constable 2023 Mains \u00b7 Q153",
    "question": "Who was the Chairman of the Linguistic Provinces Commission?",
    "options": [
      "Shri Rajendra Prasad",
      "Pandit Jawaharlal Nehru",
      "Shri S.K. Dhar",
      "Sir John Simon"
    ],
    "correct": 2,
    "explanation": "In June 1948, the Constituent Assembly appointed the Linguistic Provinces Commission under the Chairmanship of Shri S.K. Dhar (retired judge of the Allahabad High Court) to examine the desirability of reorganizing states on a linguistic basis. The commission submitted its report in December 1948, recommending reorganization based on administrative convenience rather than language.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1169",
    "exam": "Constable",
    "year": "2023",
    "tag": "Constitutional Ethics",
    "source": "Constable 2023 Mains \u00b7 Q154",
    "question": "Which of the following is considered as an alternative to moral principles ?",
    "options": [
      "Real Ethics",
      "Logic Ethics",
      "Virtue Ethics",
      "Computer Ethics"
    ],
    "correct": 2,
    "explanation": "Virtue ethics focuses on an individual's character and moral virtues rather than following strict rules or moral principles (deontology). Consequently, it is regarded as a primary alternative framework to principle-based normative ethics.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1177",
    "exam": "Constable",
    "year": "2023",
    "tag": "Constitutional Ethics",
    "source": "Constable 2023 Mains \u00b7 Q162",
    "question": "Ethics is the study of what is right or wrong in",
    "options": [
      "Human Conduct",
      "Philosophical Conduct",
      "Moral Conduct",
      "Logical Conduct"
    ],
    "correct": 0,
    "explanation": "Ethics (moral philosophy) is broadly defined as the branch of knowledge concerned with evaluating and systematizing principles of right and wrong in human conduct.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1240",
    "exam": "Constable",
    "year": "2023",
    "tag": "Republic & Franchise",
    "source": "Constable 2023 Prelims \u00b7 Q166",
    "question": "Assertion (A) : India is a Republic\nReason (R): India has universal adult franchise system\nThe correct answer is",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true and (R) is false",
      "(A) is false and (R) is true"
    ],
    "correct": 1,
    "explanation": "A 'Republic' indicates that the head of the state (the President) is elected, not a hereditary monarch. While both statements are true individually, Universal Adult Franchise explains the democratic nature of elections rather than the specific republican form of government.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1480",
    "exam": "SI",
    "year": "2016",
    "tag": "Seventh Schedule",
    "source": "SI 2016 Mains \u00b7 Q37",
    "question": "Read the following statements:\nA) The US presidential election is scheduled for November 9, 2016.\nB) Donald Trump is the presidential nominee of the Republican Party in the US elections.\nC) Hillary Clinton is the presidential nominee of the Democratic Party in the US elections.\nD) Hillary Clinton has served as the US Defence Minister, earlier.\nChoose the incorrect statements:",
    "options": [
      "A&B",
      "B & C",
      "A&D",
      "D, A & B"
    ],
    "correct": 2,
    "explanation": "In 2016, the US presidential election took place on November 8, 2016 (not November 9). Hillary Clinton served as the US Secretary of State, not Defense Minister. Therefore, statements A and D are incorrect.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1557",
    "exam": "SI",
    "year": "2016",
    "tag": "Seventh Schedule",
    "source": "SI 2016 Mains \u00b7 Q114",
    "question": "Consider the following statements:\na) Indian police service is constituted under Article 314 of the Constitution\nb) 'Public order' and 'police' figure as 1 and 2 respectively in state list.\nc) Under entry 60 of the union list, the centre can extend Jurisdiction of police force of one state to another state.\nWhich of the above statements is/are correct?",
    "options": [
      "a&b",
      "b&c",
      "a&c",
      "a"
    ],
    "correct": 1,
    "explanation": "The Indian Police Service is constituted under Article 312 of the Constitution, rendering statement (a) false. In the State List (List II) of the Seventh Schedule, 'Public order' is Entry 1 and 'Police' is Entry 2, making statement (b) correct. Eliminating statement (a) directly leads to Option 2 (b&c).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1560",
    "exam": "SI",
    "year": "2016",
    "tag": "Constituent Assembly",
    "source": "SI 2016 Mains \u00b7 Q117",
    "question": "Which of the following statements are correct?\na) Constituent Assembly was suggested by cabinet mission\nb) The first amendment to Preamble was made in 1975\nc) 1919 Government of India Act separated state budget from union budget\nd) Indian Independence Act was approved by British Parliament on July 15, 1947",
    "options": [
      "(1) a&d",
      "(2) b&c",
      "(3) c & d",
      "(4) a&b"
    ],
    "correct": 0,
    "explanation": "Statement (a) is correct because the scheme for the Constituent Assembly was formulated by the Cabinet Mission Plan of 1946. Statement (d) is correct as the Indian Independence Bill was passed by the House of Commons on July 15, 1947 (and received Royal Assent on July 18, 1947). Statement (b) is incorrect because the Preamble was amended in 1976 (42nd Amendment Act), not 1975.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1563",
    "exam": "SI",
    "year": "2016",
    "tag": "Constitutional Framework",
    "source": "SI 2016 Mains \u00b7 Q120",
    "question": "Prevention of Cruelty to animals in the Constitution is in:",
    "options": [
      "Union list",
      "State list",
      "Concurrent list",
      "Residuary powers"
    ],
    "correct": 2,
    "explanation": "Entry 17 of the Concurrent List (List III) in the Seventh Schedule of the Indian Constitution covers the 'Prevention of cruelty to animals'. This enables both the Union Parliament and State Legislatures to enact laws regarding animal welfare.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1619",
    "exam": "SI",
    "year": "2016",
    "tag": "Article 3 Territory",
    "source": "SI 2016 Mains \u00b7 Q181",
    "question": "The article 3 of Indian constitution allows\n(a) Increase the area of any state\n(b) Daminish the are of any state\n(c) Alter the boundaries of the any state\n(d) Alter the name of any state",
    "options": [
      "(a), (b), (d)",
      "(a), (b), (c), (d)",
      "(b), (c), (d)",
      "(a), (b), (c)"
    ],
    "correct": 1,
    "explanation": "Article 3 of the Indian Constitution empowers Parliament to form new states and alter the areas, boundaries, or names of existing states. Specifically, it allows Parliament to increase the area, diminish the area, alter boundaries, and alter the name of any state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1787",
    "exam": "SI",
    "year": "2016",
    "tag": "Constitutional Framework",
    "source": "SI 2016 Prelims \u00b7 Q118",
    "question": "Economic and Social planning is in",
    "options": [
      "Union list",
      "State list",
      "Concurrent list",
      "Residual powers"
    ],
    "correct": 2,
    "explanation": "Economic and Social Planning is explicitly enumerated as Entry 20 in List III (Concurrent List) under the Seventh Schedule of the Indian Constitution. This allows both the Parliament and State Legislatures to make laws regarding economic planning.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1792",
    "exam": "SI",
    "year": "2016",
    "tag": "Citizenship",
    "source": "SI 2016 Prelims \u00b7 Q123",
    "question": "Minimum duration of stay in India before applying for Indian citizenship is",
    "options": [
      "3 years",
      "5 years",
      "6 years",
      "7 years"
    ],
    "correct": 3,
    "explanation": "Under Section 5(1)(a) and 5(1)(c) of the Citizenship Act, 1955 (as amended in 2003), a person of Indian origin or someone married to an Indian citizen must be ordinarily resident in India for a minimum of 7 years before applying for Indian citizenship by registration.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1840",
    "exam": "SI",
    "year": "2016",
    "tag": "Article 3 Territory",
    "source": "SI 2016 Prelims \u00b7 Q172",
    "question": "Assertion (A): The Parliament is empowered to alter the boundaries of any existing State of India.\nReason (R): A bill pertaining to the alteration of the boundaries of any State can be introduced only in Rajya Sabha.\nAnswer :",
    "options": [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "(A) is correct and (R) is not correct",
      "(A) is not correct and (R) is correct"
    ],
    "correct": 2,
    "explanation": "Under Article 3 of the Indian Constitution, Parliament is empowered to form new states and alter the area, boundaries, or names of existing states. However, such a bill can be introduced in either House of Parliament (Lok Sabha or Rajya Sabha) on the prior recommendation of the President, not exclusively in the Rajya Sabha.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1894",
    "exam": "SI",
    "year": "2016",
    "tag": "Article 3 Territory",
    "source": "SI 2016 Prelims \u00b7 Q172",
    "question": "Assertion (A): The Parliament is empowered to alter the boundaries of any existing State of India. Reason (R): A bill pertaining to the alteration of the boundaries of any State can be introduced only in Rajya Sabha.",
    "options": [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "(A) is correct and (R) is not correct",
      "(A) is not correct and (R) is correct"
    ],
    "correct": 2,
    "explanation": "Under Article 3 of the Indian Constitution, Parliament has the power to alter state boundaries or form new states. However, such a bill can be introduced in either House of Parliament (Lok Sabha or Rajya Sabha), requiring only the prior recommendation of the President.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1905",
    "exam": "SI",
    "year": "2016",
    "tag": "Article 3 Territory",
    "source": "SI 2016 Prelims \u00b7 Q172",
    "question": "Assertion (A) : The Parliament is empowered to alter the boundaries of any existing State of India. Reason (R) : A bill pertaining to the alteration of the boundaries of any State can be introduced only in Rajya Sabha.",
    "options": [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "(A) is correct and (R) is not correct",
      "(A) is not correct and (R) is correct"
    ],
    "correct": 2,
    "explanation": "Article 3 of the Indian Constitution empowers Parliament to alter the boundaries, area, or name of any existing State. However, such a bill can be introduced in either House of Parliament (Lok Sabha or Rajya Sabha) with the prior recommendation of the President, making Reason (R) incorrect.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2194",
    "exam": "SI",
    "year": "2018",
    "tag": "Seventh Schedule",
    "source": "SI 2018 Mains \u00b7 Q92",
    "question": "Examine the following statements:\nA. The subject of the prevention of food adulteration is in the 'central list' of Indian Constituion.\nB. The 'Prevention of Food Adulteration Act, 1954' came into force on 28th September, 1954 in India.\nChoose the correct answer:",
    "options": [
      "Both A and B are incorrect",
      "Only A is correct",
      "Only B is correct",
      "Both A and B are correct"
    ],
    "correct": 0,
    "explanation": "Statement A is incorrect because the 'Adulteration of foodstuffs and other goods' falls under Entry 18 of the Concurrent List (List III), not the Union/Central List. Statement B is incorrect because while the Prevention of Food Adulteration Act received Presidential assent on September 29, 1954, it actually came into force on June 1, 1955.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2472",
    "exam": "SI",
    "year": "2018",
    "tag": "Preamble",
    "source": "SI 2018 Prelims \u00b7 Q122",
    "question": "Examine the following statements related to national integration:\n(a) Preamble begins with 'We the people of India'.\n(b) Directive principles of Indian Constitution direct the states to take steps towards bringing equality, justice, liberty to all.\nChoose the correct answer:",
    "options": [
      "Both (a) and (b) are correct",
      "Both (a) and (b) are incorrect",
      "Only (a) is correct",
      "Only (b) is correct"
    ],
    "correct": 0,
    "explanation": "The Preamble to the Indian Constitution opens with the phrase 'We, the People of India', signifying that ultimate sovereignty lies with the citizens. Furthermore, the Directive Principles of State Policy (Part IV) direct the State to establish a social order aimed at promoting justice, equality, and liberty for all citizens.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2537",
    "exam": "SI",
    "year": "2018",
    "tag": "Dhar Commission",
    "source": "SI 2018 Prelims \u00b7 Q188",
    "question": "The Linguistic Provinces Commission set up by the Government of India in June 1948 was headed by:",
    "options": [
      "S.K. Patil",
      "S.K. Dhar",
      "Pataskar",
      "P.N. Haksar"
    ],
    "correct": 1,
    "explanation": "In June 1948, the Government of India appointed the Linguistic Provinces Commission under the chairmanship of Justice S.K. Dhar (retired Allahabad High Court Judge). The Dhar Commission recommended the reorganization of states on administrative convenience rather than linguistic lines.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2939",
    "exam": "SI",
    "year": "2023",
    "tag": "Constitutional Framework",
    "source": "SI 2023 Mains \u00b7 Q8",
    "question": "The Chinese strategy of grabbing land inch-by-inch is described as",
    "options": [
      "Salami Slicing",
      "Guerilla Warfare",
      "Strategic Hold",
      "Disproportionate Force"
    ],
    "correct": 0,
    "explanation": "'Salami slicing' refers to a geopolitical strategy involving a series of small, incremental actions aimed at acquiring territory inch-by-inch over time without triggering a major war. China frequently uses this tactic in territorial disputes in the South China Sea and along the Line of Actual Control (LAC) with India.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2979",
    "exam": "SI",
    "year": "2023",
    "tag": "Republic Day",
    "source": "SI 2023 Mains \u00b7 Q48",
    "question": "Which of the following country's President was the Chief Guest at the Indian Republic Day Celebrations held in 2023?",
    "options": [
      "Egypt",
      "France",
      "Hungary",
      "Israel"
    ],
    "correct": 0,
    "explanation": "President Abdel Fattah el-Sisi of Egypt was the Chief Guest at India's 74th Republic Day celebrations on January 26, 2023. This was the first time an Egyptian leader served as the Republic Day chief guest.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3037",
    "exam": "SI",
    "year": "2023",
    "tag": "Constituent Assembly",
    "source": "SI 2023 Mains \u00b7 Q108",
    "question": "The Constituent Assembly was formulated by",
    "options": [
      "Indian Independence Act, 1947",
      "Government of India Act 1935",
      "Cabinet Mission Plan, 1946",
      "Government of India Act, 1919"
    ],
    "correct": 2,
    "explanation": "The Constituent Assembly of India was set up in November 1946 under the framework suggested by the Cabinet Mission Plan of 1946. The plan provided for a body composed of indirectly elected representatives from provincial legislative assemblies and nominated members from princely states.",
    "revealed": false,
    "selected": null
  }
])

const activeExamFilter = ref('all')

const examFilters = [
  { label: 'All Exams (31)', value: 'all' },
  { label: 'Constable (15)', value: 'Constable' },
  { label: 'SI (16)', value: 'SI' }
]

const filteredPyqs = computed(() => {
  if (activeExamFilter.value === 'all') return pyqs
  return pyqs.filter(q => q.exam === activeExamFilter.value)
})

const attemptedCount = computed(() => pyqs.filter(q => q.selected !== null).length)
const correctCount = computed(() => pyqs.filter(q => q.selected !== null && q.selected === q.correct).length)

function attempt(q: Pyq, optIndex: number) {
  if (q.revealed) return
  q.selected = optIndex
  q.revealed = true
}

function reveal(q: Pyq) {
  q.revealed = true
}

function optionClass(q: Pyq, optIndex: number) {
  if (!q.revealed) {
    return q.selected === optIndex ? 'opt-selected' : ''
  }
  if (optIndex === q.correct) {
    return 'opt-correct'
  }
  if (q.selected === optIndex) {
    return 'opt-wrong'
  }
  return 'opt-dim'
}

interface AdvPractice {
  uid: string
  question: string
  options: string[]
  correct: number
  explanation: string
  source: string
  format: 'Multi-statement' | 'Matching' | 'Assertion-Reason' | 'Chronology'
  isSynthetic: boolean
  revealed: boolean
  selected: number | null
}

const advancedPractice: AdvPractice[] = reactive([
  {
    uid: 'ADV-POL-CONST-001',
    question: 'Match List-I (Pre-Independence Acts) with List-II (Key Institutional Features):\n\nList-I:\nA. Regulating Act of 1773\nB. Pitt\'s India Act of 1784\nC. Charter Act of 1833\nD. Government of India Act of 1919\n\nList-II:\nI. Established Double Government via Board of Control and Court of Directors\nII. Designated Governor-General of Bengal and created Supreme Court at Calcutta\nIII. Introduced Dyarchy in Provinces and Bicameralism at the Centre\nIV. Created Governor-General of India and completely ended commercial monopoly of EIC\n\nChoose the correct answer:',
    options: [
      'A-II, B-I, C-IV, D-III',
      'A-I, B-II, C-IV, D-III',
      'A-II, B-IV, C-I, D-III',
      'A-III, B-I, C-IV, D-II'
    ],
    correct: 0,
    explanation: 'Regulating Act 1773 created Governor-General of Bengal and Supreme Court at Calcutta (A-II). Pitt\'s India Act 1784 established Double Government with Board of Control and Court of Directors (B-I). Charter Act 1833 created Governor-General of India and abolished EIC commercial operations (C-IV). GoI Act 1919 introduced Provincial Dyarchy and Central Bicameralism (D-III).',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-1560, PYQ-3037)',
    format: 'Matching',
    isSynthetic: true,
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-CONST-002',
    question: 'Consider the following statements regarding the Constituent Assembly of India:\n\nA. The Constituent Assembly was formulated based on the framework recommended by the Cabinet Mission Plan of 1946.\nB. Dr. Sachchidananda Sinha was elected as the temporary President during the inaugural session on December 9, 1946, following the French practice.\nC. The historic \'Objectives Resolution\' moved by Jawaharlal Nehru on December 13, 1946, was unanimously adopted on January 22, 1947.\nD. The original manuscript of the Constitution was handwritten in English calligraphy by Nandalal Bose.\n\nWhich of the statements given above are correct?',
    options: [
      'A, B and C only',
      'A and C only',
      'B, C and D only',
      'A, B, C and D'
    ],
    correct: 0,
    explanation: 'Statements A, B, and C are correct. Cabinet Mission Plan 1946 formulated the Constituent Assembly scheme [PYQ-3037]. Dr. Sachchidananda Sinha was interim President on Dec 9, 1946. Objectives Resolution was moved Dec 13, 1946 and adopted Jan 22, 1947 [PYQ-0766]. Statement D is incorrect because Prem Behari Narain Raizada was the calligrapher of the English manuscript; Nandalal Bose was the artist who illuminated the pages.',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0766, PYQ-3037)',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-CONST-003',
    question: 'Match List-I (Borrowed Constitutional Feature) with List-II (Country Source):\n\nList-I:\nA. Vesting of Residuary Powers in the Centre\nB. Joint Sitting of both Houses of Parliament\nC. Nomination of members to Rajya Sabha and DPSP\nD. Procedure for Amendment of the Constitution\n\nList-II:\nI. Australia\nII. Canada\nIII. South Africa\nIV. Ireland\n\nChoose the correct option:',
    options: [
      'A-II, B-I, C-IV, D-III',
      'A-I, B-II, C-IV, D-III',
      'A-II, B-IV, C-I, D-III',
      'A-III, B-I, C-IV, D-II'
    ],
    correct: 0,
    explanation: 'Residuary Powers with Centre (Art 248) is from Canada (A-II). Joint Sitting (Art 108) and Concurrent List is from Australia (B-I). DPSPs and RS nominations are from Ireland (C-IV). Constitutional Amendment procedure (Art 368) is from South Africa (D-III).',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-1563, PYQ-1787, PYQ-0306)',
    format: 'Matching',
    isSynthetic: true,
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-CONST-004',
    question: 'Consider the following statements regarding the Preamble to the Constitution of India:\n\nA. In the Berubari Union Case (1960), the Supreme Court ruled that the Preamble is an integral part of the Constitution.\nB. In the landmark Kesavananda Bharati Case (1973), the Supreme Court held that the Preamble is a part of the Constitution and can be amended under Article 368 without altering the Basic Structure.\nC. The 42nd Constitutional Amendment Act, 1976 added the words \'Socialist\', \'Secular\', and \'Integrity\' to the Preamble.\nD. The Preamble is directly enforceable in a court of law and acts as a substantive source of legislative power.\n\nWhich of the statements given above are correct?',
    options: [
      'B and C only',
      'A and D only',
      'A, B and C only',
      'B, C and D only'
    ],
    correct: 0,
    explanation: 'Statements B and C are correct. Kesavananda Bharati (1973) held Preamble is part of Constitution and amendable under Art 368. 42nd CAA 1976 added Socialist, Secular, and Integrity [PYQ-1560]. Statement A is false because Berubari (1960) held Preamble is NOT a part of Constitution. Statement D is false because the Preamble is non-justiciable and neither confers legislative power nor limits it.',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0972, PYQ-1560, PYQ-2472)',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null
  }
])

function advAttempt(q: AdvPractice, optIndex: number) {
  if (q.revealed) return
  q.selected = optIndex
  q.revealed = true
}

function advReveal(q: AdvPractice) {
  q.revealed = true
}

function advOptionClass(q: AdvPractice, optIndex: number) {
  if (!q.revealed) {
    return q.selected === optIndex ? 'opt-selected' : ''
  }
  if (optIndex === q.correct) {
    return 'opt-correct'
  }
  if (q.selected === optIndex) {
    return 'opt-wrong'
  }
  return 'opt-dim'
}
</script>

<style scoped>
.toc-pill {
  background-color: var(--accent-soft);
  border: 1px solid var(--accent-line);
  transition: transform 190ms cubic-bezier(0.2, 0, 0, 1), height 190ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms ease;
  will-change: transform, height;
}

@media (prefers-reduced-motion: reduce) {
  .toc-pill {
    transition: none !important;
  }
}
</style>
