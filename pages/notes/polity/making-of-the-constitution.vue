<template>
  <div>
    <!-- Reading progress bar -->
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
          <span class="t-mid">Making of the Constitution</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 : High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
              🎯 Projected 2026: 2-3 Questions (2-3 Marks)
            </span>
            <span class="chip">{{ pyqs.length }} verified PYQs</span>
            <span class="chip">Polity</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Making of the Indian Constitution
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive forensic study notes covering the Constituent Assembly demand timeline (1934-1946), Cabinet Mission Plan composition, milestone sittings, 8 major committees, Drafting Committee roster, dual functions, enactment constants, calligraphy, and high-frequency exam traps.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />10 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />{{ pyqs.length }} verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~22 min read
            </span>
          </div>
        </header>

        <!-- Coverage strip -->
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
            Mastering these core dimensions ensures 100% mastery of every Constituent Assembly and Constitution-making question tested in TGPRB SI and Constable exams.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Predicted 2026 Question Patterns
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct Factual MCQs on <strong class="t-hi">Cabinet Mission Members</strong> (Pethick-Lawrence, Cripps, Alexander), <strong class="t-hi">Assembly Officer Appointments</strong> (Interim Sinha vs Permanent Prasad; Vice-Presidents Mukherjee &amp; Krishnamachari; Advisor Rau), <strong class="t-hi">8 Major Committee Chairs</strong> (Nehru vs Patel vs Prasad vs Ambedkar), and <strong class="t-hi">Nov 26, 1949 vs Jan 26, 1950 Enacted Articles</strong> (Articles 5-9, 60, 324 enforced immediately under Article 394).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · Demand Timeline (1934-1946) ────────────────────────── -->
        <section id="demand-timeline" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Roadmap &amp; Demand Timeline (1934-1946)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="demand-timeline"
              section-label="Visual Roadmap & Demand Timeline"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">1934 Roy to 1946 Cabinet Mission</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="demand-timeline"
            section-label="Visual Roadmap & Demand Timeline"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            The demand for an indigenous Constituent Assembly to frame India's constitution developed over twelve years of political evolution, from an ideological proposal into an official British operational blueprint.
          </p>

          <!-- Timeline Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- 1934 -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">1934</span>
                <span class="chip chip-mono text-[10px]">First Proposal</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-1.5">M.N. Roy's Pioneer Proposition</h3>
              <p class="text-xs t-mid leading-relaxed">
                Manabendra Nath Roy, a pioneer of the communist movement in India and advocate of radical humanism, was the <strong class="t-hi">first person</strong> to put forward the formal concept of a Constituent Assembly for India.
              </p>
              <div class="mt-3 p-2 rounded bg-sub border b-line text-[11px] t-lo">
                <strong class="t-hi">Exam Distractor:</strong> Do not confuse M.N. Roy with Mahatma Gandhi (who spoke of Swaraj in 1922) or Jawaharlal Nehru.
              </div>
            </div>

            <!-- 1935 -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">1935</span>
                <span class="chip chip-mono text-[10px]">Official Demand</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-1.5">INC Official Adoption</h3>
              <p class="text-xs t-mid leading-relaxed">
                The Indian National Congress (INC) officially demanded a Constituent Assembly to frame the Constitution of India for the first time in 1935, subsequently reaffirmed at the <strong class="t-hi">1936 Faizpur session</strong> under Jawaharlal Nehru.
              </p>
              <div class="mt-3 p-2 rounded bg-sub border b-line text-[11px] t-lo">
                <strong class="t-hi">Key Milestone:</strong> First rural Congress session at Faizpur (Maharashtra) formalized this demand into party policy.
              </div>
            </div>

            <!-- 1938 -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">1938</span>
                <span class="chip chip-mono text-[10px]">Franchise Principle</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-1.5">Nehru's Adult Franchise Declaration</h3>
              <p class="text-xs t-mid leading-relaxed">
                Jawaharlal Nehru, declaring the authoritative stance of the INC, asserted: <em class="t-hi">"The Constitution of free India must be framed, without outside interference, by a Constituent Assembly elected on the basis of adult franchise."</em>
              </p>
              <div class="mt-3 p-2 rounded bg-sub border b-line text-[11px] t-lo">
                <strong class="t-hi">Core Principle:</strong> Complete exclusion of British parliamentary interference and demand for popular sovereignty.
              </div>
            </div>

            <!-- 1940 -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">1940</span>
                <span class="chip chip-mono text-[10px]">British Recognition</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-1.5">The 'August Offer' (Lord Linlithgow)</h3>
              <p class="text-xs t-mid leading-relaxed">
                The British Government accepted in principle the demand for an Indian Constitution-making body for the first time. Announced on August 8, 1940 by Viceroy Linlithgow to secure Indian cooperation during World War II.
              </p>
              <div class="mt-3 p-2 rounded bg-sub border b-line text-[11px] t-lo">
                <strong class="t-hi">The Catch:</strong> The offer stated the body would consist <em class="t-hi">"mainly of Indians"</em> (not exclusively Indians), leading to its rejection by Congress.
              </div>
            </div>

            <!-- 1942 -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">1942</span>
                <span class="chip chip-mono text-[10px]">Draft Declaration</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-1.5">Cripps Mission Proposals</h3>
              <p class="text-xs t-mid leading-relaxed">
                Sir Stafford Cripps, member of the British War Cabinet, arrived with a draft declaration promising a Constituent Assembly <strong class="t-hi">after World War II</strong> with Dominion status.
              </p>
              <div class="mt-3 p-2 rounded bg-sub border b-line text-[11px] t-lo">
                <strong class="t-hi">Rejection:</strong> Muslim League rejected it (demanded two separate CAs); Congress rejected it because provinces could opt out of the Union ("provincial secession option").
              </div>
            </div>

            <!-- 1946 -->
            <div class="panel panel-pad bg-elev border b-line border-saffron-500/40">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-bold text-saffron-600 dark:text-saffron-400">1946</span>
                <span class="chip chip-saffron text-[10px]">Operational Blueprint</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-1.5">Cabinet Mission Plan (May 16, 1946)</h3>
              <p class="text-xs t-mid leading-relaxed">
                A 3-member mission consisting of <strong class="t-hi">Lord Pethick-Lawrence</strong> (Secretary of State), <strong class="t-hi">Sir Stafford Cripps</strong> (Board of Trade), and <strong class="t-hi">A.V. Alexander</strong> (Admiralty) arrived on March 24, 1946.
              </p>
              <div class="mt-3 p-2 rounded bg-sub border b-line text-[11px] t-lo">
                <strong class="t-hi">TGPRB Gold:</strong> Rejected two Constituent Assemblies. Formulated the single 389-seat Constituent Assembly under which India's Constitution was drafted (SI Mains 2023 Q#108).
              </div>
            </div>
          </div>

          <!-- Quick Summary Strip -->
          <div class="panel p-4 bg-sub border b-line rounded-xl">
            <p class="text-xs font-semibold uppercase tracking-wider t-hi mb-2">Chronology Quick-Reference</p>
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="chip chip-mono">1934: M.N. Roy Idea</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3 w-3 t-lo" />
              <span class="chip chip-mono">1935: INC Demand</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3 w-3 t-lo" />
              <span class="chip chip-mono">1938: Adult Franchise Call</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3 w-3 t-lo" />
              <span class="chip chip-mono">1940: August Offer</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3 w-3 t-lo" />
              <span class="chip chip-mono">1942: Cripps Mission</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3 w-3 t-lo" />
              <span class="chip chip-saffron font-bold">1946: Cabinet Mission</span>
            </div>
          </div>
        </section>

        <!-- ── 02 · Assembly Composition & Architecture ────────────────── -->
        <section id="assembly-composition" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Assembly Composition &amp; Architecture</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="assembly-composition"
              section-label="Assembly Composition & Architecture"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">389 to 299 Seats, STV &amp; Quotas</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="assembly-composition"
            section-label="Assembly Composition & Architecture"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            The Constituent Assembly of India was formulated under Paragraph 19 of the Cabinet Mission Statement of May 16, 1946. It was neither a sovereign body at inception nor elected by universal adult franchise.
          </p>

          <!-- Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div class="panel p-3.5 text-center bg-elev border b-line">
              <span class="font-mono text-2xl font-bold t-hi">389</span>
              <p class="text-[11.5px] t-lo mt-1">Initial Seats (1946)</p>
            </div>
            <div class="panel p-3.5 text-center bg-elev border b-line">
              <span class="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">296</span>
              <p class="text-[11.5px] t-lo mt-1">British India Seats</p>
            </div>
            <div class="panel p-3.5 text-center bg-elev border b-line">
              <span class="font-mono text-2xl font-bold t-hi">93</span>
              <p class="text-[11.5px] t-lo mt-1">Princely State Seats</p>
            </div>
            <div class="panel p-3.5 text-center bg-elev border b-line">
              <span class="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">299</span>
              <p class="text-[11.5px] t-lo mt-1">Post-Partition Seats</p>
            </div>
          </div>

          <!-- Composition Details Table -->
          <div class="panel p-5 bg-elev border b-line mb-6 overflow-x-auto">
            <h3 class="text-sm font-bold t-hi mb-3">Pre-Partition vs Post-Partition Breakdown</h3>
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b b-line text-body-xs font-semibold t-lo uppercase tracking-wider">
                  <th class="pb-2.5">Category</th>
                  <th class="pb-2.5">Pre-Partition (Cabinet Mission 1946)</th>
                  <th class="pb-2.5">Post-Partition (Dec 31, 1947)</th>
                  <th class="pb-2.5">Net Change</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--line)]">
                <tr>
                  <td class="py-2.5 font-medium t-hi">Governors' Provinces (11)</td>
                  <td class="py-2.5 font-mono t-mid">292 seats</td>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400 font-bold" rowspan="2">229 seats (Indian Provinces)</td>
                  <td class="py-2.5 font-mono text-red-500">-67 seats</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-medium t-hi">Chief Commissioners' Provinces (4)</td>
                  <td class="py-2.5 font-mono t-mid">4 seats (Delhi, Ajmer-Merwara, Coorg, British Baluchistan)</td>
                  <td class="py-2.5 font-mono text-red-500">(Baluchistan to Pak)</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-medium t-hi">Indian Princely States</td>
                  <td class="py-2.5 font-mono t-mid">93 seats (Nominated by Rulers)</td>
                  <td class="py-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-bold">70 seats</td>
                  <td class="py-2.5 font-mono text-red-500">-23 seats</td>
                </tr>
                <tr class="bg-sub font-bold">
                  <td class="py-2.5 t-hi">Total Assembly Strength</td>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">389 seats</td>
                  <td class="py-2.5 font-mono text-emerald-600 dark:text-emerald-400">299 seats</td>
                  <td class="py-2.5 font-mono text-red-500">-90 seats</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Key Principles Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="panel p-4 bg-sub border b-line">
              <p class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">1. Population Ratio</p>
              <p class="text-xs t-mid leading-relaxed">
                Seats were allocated in proportion to respective population at roughly <strong class="t-hi">1 seat per 1 million (10 lakh)</strong> inhabitants.
              </p>
            </div>

            <div class="panel p-4 bg-sub border b-line">
              <p class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">2. Three Communities</p>
              <p class="text-xs t-mid leading-relaxed">
                Seats in British India were divided among 3 categories: <strong class="t-hi">Muslims, Sikhs (Punjab), and General</strong> (all others including Hindus, SCs, and Christians).
              </p>
            </div>

            <div class="panel p-4 bg-sub border b-line">
              <p class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">3. Indirect Election (STV)</p>
              <p class="text-xs t-mid leading-relaxed">
                Members were elected indirectly by Provincial Legislative Assemblies using <strong class="t-hi">proportional representation via single transferable vote (STV)</strong>.
              </p>
            </div>
          </div>

          <div class="mt-4 p-3 rounded-lg border border-indigo-500/30 bg-indigo-500/5 text-xs t-mid leading-relaxed">
            <strong class="text-indigo-600 dark:text-indigo-400">Constitutional Character:</strong> The Constituent Assembly was a <strong class="t-hi">partly elected and partly nominated</strong> body. Provincial members were indirectly elected by provincial legislators (who were themselves elected under the limited property/tax franchise of the 1935 Act), while Princely State members were nominated by rulers.
          </div>
        </section>

        <!-- ── 03 · Milestone Sittings & Assembly Officers ─────────────── -->
        <section id="milestone-sittings" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Milestone Sittings &amp; Assembly Officers</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="milestone-sittings"
              section-label="Milestone Sittings & Assembly Officers"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Dec 9, 11, 13 &amp; Objectives Resolution</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="milestone-sittings"
            section-label="Milestone Sittings & Assembly Officers"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            The opening week of the Constituent Assembly in December 1946 established procedural conventions, elected its permanent officers, and defined its philosophical mandate through the Objectives Resolution.
          </p>

          <!-- 3 Sittings Horizontal Flow -->
          <div class="space-y-4 mb-6">
            <!-- Dec 9 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b b-line">
                <span class="chip chip-saffron font-mono text-xs">December 9, 1946 (11:00 AM)</span>
                <span class="text-xs font-semibold t-hi">Venue: Constitution Hall, New Delhi</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-2">First Inaugural Sitting : Interim President</h3>
              <ul class="text-xs space-y-2 t-mid">
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong class="t-hi">Attendance:</strong> Exactly <strong class="t-hi">211 members</strong> attended. The Muslim League boycotted, demanding Pakistan. Princely States stayed away.</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong class="t-hi">Interim Chairman:</strong> <strong class="text-amber-600 dark:text-amber-400 font-semibold">Dr. Sachchidananda Sinha</strong> was invited to take the chair as temporary Chairman.</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong class="t-hi">French Convention:</strong> Following the French practice of electing the oldest member to preside over an inaugural assembly, Acharya J.B. Kripalani escorted Dr. Sinha to the chair.</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong class="t-hi">Frank Anthony:</strong> Nominated by Dr. Sinha as temporary Deputy Chairman.</span>
                </li>
              </ul>
            </div>

            <!-- Dec 11 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b b-line">
                <span class="chip chip-saffron font-mono text-xs">December 11, 1946</span>
                <span class="text-xs font-semibold t-hi">Election of Permanent Officers</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-2">Permanent President, Two Vice-Presidents &amp; Advisor</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-3">
                <div class="p-3 rounded bg-sub border b-line">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Permanent President</span>
                  <p class="font-semibold t-hi">Dr. Rajendra Prasad</p>
                  <p class="text-[11px] t-lo mt-1">Elected unanimously; proposed by J.B. Kripalani, seconded by Vallabhbhai Patel.</p>
                </div>
                <div class="p-3 rounded bg-sub border b-line">
                  <span class="font-bold text-amber-600 dark:text-amber-400 block mb-1">Two Vice-Presidents</span>
                  <p class="font-semibold t-hi">1. Dr. H.C. Mukherjee<br>2. V.T. Krishnamachari</p>
                  <p class="text-[11px] t-lo mt-1">Represented Christian minorities (Mukherjee) and Princely States (Krishnamachari).</p>
                </div>
                <div class="p-3 rounded bg-sub border b-line">
                  <span class="font-bold text-sky-600 dark:text-sky-400 block mb-1">Constitutional Advisor</span>
                  <p class="font-semibold t-hi">Sir B.N. Rau</p>
                  <p class="text-[11px] t-lo mt-1">Prepared the initial draft constitution with 243 articles and 13 schedules.</p>
                </div>
              </div>
            </div>

            <!-- Dec 13 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b b-line">
                <span class="chip chip-saffron font-mono text-xs">December 13, 1946 to January 22, 1947</span>
                <span class="text-xs font-semibold t-hi">Constitutional Bedrock</span>
              </div>
              <h3 class="text-sm font-bold t-hi mb-2">Moving &amp; Adoption of the Objectives Resolution</h3>
              <p class="text-xs t-mid leading-relaxed mb-3">
                On <strong class="t-hi">December 13, 1946</strong>, Jawaharlal Nehru moved the historic <strong class="t-hi">'Objectives Resolution'</strong>. It laid down the fundamental principles, territorial sovereignty, and democratic guarantees of the Indian Republic.
              </p>
              <div class="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-xs">
                <p class="font-bold text-amber-700 dark:text-amber-300">Crucial TGPRB Exam Date Pair (PYQ-0766):</p>
                <p class="t-mid mt-1">
                  - <strong class="t-hi">Moved date:</strong> December 13, 1946 (by Jawaharlal Nehru)<br>
                  - <strong class="t-hi">Passed/Adopted date:</strong> <strong class="text-emerald-600 dark:text-emerald-400 font-bold">January 22, 1947</strong> (unanimously adopted by the Assembly)<br>
                  - <strong class="t-hi">Preamble Lineage:</strong> Its modified and perfected text became the Preamble of the Constitution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · 8 Major Committees & Rosters ───────────────────────── -->
        <section id="major-committees" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">8 Major Committees &amp; Rosters</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="major-committees"
              section-label="8 Major Committees & Rosters"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Nehru, Patel, Prasad, Ambedkar &amp; 5 Sub-Committees</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="major-committees"
            section-label="8 Major Committees & Rosters"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            The Constituent Assembly appointed 22 committees to deal with different tasks of constitution-making. Out of these, <strong class="t-hi">8 were major committees</strong>, headed by key national leaders.
          </p>

          <!-- 8 Major Committees Table -->
          <div class="panel p-5 bg-elev border b-line mb-8 overflow-x-auto">
            <h3 class="text-sm font-bold t-hi mb-3">The 8 Major Committees of the Constituent Assembly</h3>
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b b-line text-body-xs font-semibold t-lo uppercase tracking-wider">
                  <th class="pb-2.5">#</th>
                  <th class="pb-2.5">Committee Name</th>
                  <th class="pb-2.5">Chairperson</th>
                  <th class="pb-2.5">High-Yield Exam Trap Note</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--line)]">
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">1</td>
                  <td class="py-2.5 font-medium t-hi">Union Powers Committee</td>
                  <td class="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Jawaharlal Nehru</td>
                  <td class="py-2.5 t-mid">Union list subjects and defense demarcation.</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">2</td>
                  <td class="py-2.5 font-medium t-hi">Union Constitution Committee</td>
                  <td class="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Jawaharlal Nehru</td>
                  <td class="py-2.5 t-mid">Federal structure, Union executive, and Supreme Court.</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">3</td>
                  <td class="py-2.5 font-medium t-hi">States Committee (Negotiating with States)</td>
                  <td class="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Jawaharlal Nehru</td>
                  <td class="py-2.5 text-amber-600 dark:text-amber-400 font-medium">Top Trap: Chaired by Nehru, NOT Sardar Patel!</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">4</td>
                  <td class="py-2.5 font-medium t-hi">Provincial Constitution Committee</td>
                  <td class="py-2.5 font-semibold text-sky-600 dark:text-sky-400">Sardar Vallabhbhai Patel</td>
                  <td class="py-2.5 t-mid">Governors' powers and provincial executive rules.</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">5</td>
                  <td class="py-2.5 font-medium t-hi">Advisory Committee on FR, Minorities &amp; Tribal Areas</td>
                  <td class="py-2.5 font-semibold text-sky-600 dark:text-sky-400">Sardar Vallabhbhai Patel</td>
                  <td class="py-2.5 t-mid">Largest committee (54 members); worked via 5 sub-committees.</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">6</td>
                  <td class="py-2.5 font-medium t-hi">Drafting Committee</td>
                  <td class="py-2.5 font-semibold text-saffron-600 dark:text-saffron-400 font-bold">Dr. B.R. Ambedkar</td>
                  <td class="py-2.5 t-mid">7 members; appointed Aug 29, 1947; published Draft Constitution.</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">7</td>
                  <td class="py-2.5 font-medium t-hi">Rules of Procedure Committee</td>
                  <td class="py-2.5 font-semibold text-purple-600 dark:text-purple-400">Dr. Rajendra Prasad</td>
                  <td class="py-2.5 t-mid">Assembly debate regulations and standing orders.</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-mono text-amber-600 dark:text-amber-400">8</td>
                  <td class="py-2.5 font-medium t-hi">Steering Committee</td>
                  <td class="py-2.5 font-semibold text-purple-600 dark:text-purple-400">Dr. Rajendra Prasad</td>
                  <td class="py-2.5 t-mid">Assembly agenda and legislative priority management.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 5 Sub-Committees of Patel's Advisory Committee -->
          <div class="panel p-5 bg-sub border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-sky-500" />
              The 5 Sub-Committees under Sardar Patel's Advisory Committee
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded bg-elev border b-line">
                <span class="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase">Sub-Committee 1</span>
                <p class="font-bold t-hi mt-1">Fundamental Rights Sub-Committee</p>
                <p class="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Acharya J.B. Kripalani</p>
              </div>

              <div class="p-3 rounded bg-elev border b-line">
                <span class="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase">Sub-Committee 2</span>
                <p class="font-bold t-hi mt-1">Minorities Sub-Committee</p>
                <p class="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Dr. H.C. Mukherjee</p>
              </div>

              <div class="p-3 rounded bg-elev border b-line">
                <span class="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase">Sub-Committee 3</span>
                <p class="font-bold t-hi mt-1">North-East Frontier &amp; Assam Excluded Areas</p>
                <p class="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Gopinath Bardoloi</p>
              </div>

              <div class="p-3 rounded bg-elev border b-line">
                <span class="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase">Sub-Committee 4</span>
                <p class="font-bold t-hi mt-1">Excluded &amp; Partially Excluded Areas (Other than Assam)</p>
                <p class="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">A.V. Thakkar (Thakkar Bapa)</p>
              </div>

              <div class="p-3 rounded bg-elev border b-line">
                <span class="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase">Sub-Committee 5</span>
                <p class="font-bold t-hi mt-1">North-West Frontier Tribal Areas</p>
                <p class="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Did not report (Partition)</p>
              </div>
            </div>
          </div>

          <!-- Drafting Committee Roster Deep Dive -->
          <div class="panel p-5 bg-elev border b-line">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b b-line">
              <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                <UIcon name="i-heroicons-pencil-square" class="h-4 w-4 text-saffron-500" />
                The 7-Member Drafting Committee (Set Up August 29, 1947)
              </h3>
              <span class="chip chip-saffron text-[11px]">Ambedkar Chairman on Aug 30</span>
            </div>
            <p class="text-xs t-mid mb-4">
              Entrusted with preparing the formal Draft Constitution based on the scrutinies of Sir B.N. Rau's constitutional draft. Only <strong class="t-hi">Dr. K.M. Munshi</strong> was an original Congressman.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded bg-sub border b-line flex items-start gap-2.5">
                <span class="font-mono font-bold text-saffron-600 dark:text-saffron-400">1</span>
                <div>
                  <p class="font-bold t-hi">Dr. B.R. Ambedkar (Chairman)</p>
                  <p class="t-lo">Scheduled Castes Federation; elected from Bengal, later Bombay post-partition.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line flex items-start gap-2.5">
                <span class="font-mono font-bold text-saffron-600 dark:text-saffron-400">2</span>
                <div>
                  <p class="font-bold t-hi">N. Gopalaswamy Ayyangar</p>
                  <p class="t-lo">Former Prime Minister of Jammu &amp; Kashmir; primary architect of Article 370.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line flex items-start gap-2.5">
                <span class="font-mono font-bold text-saffron-600 dark:text-saffron-400">3</span>
                <div>
                  <p class="font-bold t-hi">Alladi Krishnaswamy Iyer</p>
                  <p class="t-lo">Former Advocate-General of Madras Presidency; foremost constitutional lawyer.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line flex items-start gap-2.5">
                <span class="font-mono font-bold text-saffron-600 dark:text-saffron-400">4</span>
                <div>
                  <p class="font-bold t-hi">Dr. K.M. Munshi</p>
                  <p class="t-lo">Eminent jurist and writer; the only original Indian National Congress party member.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line flex items-start gap-2.5">
                <span class="font-mono font-bold text-saffron-600 dark:text-saffron-400">5</span>
                <div>
                  <p class="font-bold t-hi">Syed Mohammad Saadulla</p>
                  <p class="t-lo">Former Premier of Assam; the sole Muslim League representative on the committee.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">6</span>
                <div>
                  <p class="font-bold t-hi">N. Madhava Rau <span class="chip chip-mono text-[10px]">Replacement</span></p>
                  <p class="t-lo"><strong class="t-hi">Replaced B.L. Mitter</strong>, who resigned due to ill-health.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 md:col-span-2">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">7</span>
                <div>
                  <p class="font-bold t-hi">T.T. Krishnamachari <span class="chip chip-mono text-[10px]">Replacement</span></p>
                  <p class="t-lo"><strong class="t-hi">Replaced D.P. Khaitan</strong>, who passed away in 1948. (Do not confuse T.T. Krishnamachari with V.T. Krishnamachari, Vice-President of CA!).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 05 · Dual Function & Enactment vs Enforcement ───────────── -->
        <section id="dual-function-enactment" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Dual Function &amp; Enactment vs Enforcement</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="dual-function-enactment"
              section-label="Dual Function & Enactment vs Enforcement"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Mavalankar, Article 394 &amp; Enacted Provisions</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="dual-function-enactment"
            section-label="Dual Function & Enactment vs Enforcement"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            Under the Indian Independence Act, 1947, the Constituent Assembly became a fully sovereign body with two separate constitutional responsibilities: framing the Constitution and enacting ordinary laws for the Dominion of India.
          </p>

          <!-- Dual Gavel Mechanics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                <UIcon name="i-heroicons-scale" class="h-4 w-4" />
                Role 1: Constituent Body
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Tasked with framing the Constitution for independent India.
              </p>
              <div class="p-3 rounded bg-sub border b-line text-xs">
                <p class="font-bold t-hi">Presiding Officer: Dr. Rajendra Prasad</p>
                <p class="t-lo mt-1">Presided whenever the Assembly sat to debate, amend, and vote on constitutional clauses.</p>
              </div>
            </div>

            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <UIcon name="i-heroicons-building-library" class="h-4 w-4" />
                Role 2: Dominion Legislature
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Tasked with enacting ordinary statutes and passing federal budgets.
              </p>
              <div class="p-3 rounded bg-sub border b-line text-xs">
                <p class="font-bold t-hi">Presiding Officer: G.V. Mavalankar</p>
                <p class="t-lo mt-1">Elected Speaker on November 17, 1947. First Speaker of the Lok Sabha in May 1952.</p>
              </div>
            </div>
          </div>

          <!-- Timeline Constants Matrix -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3">Constitutional Production Constants</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-base block">2y 11m 18d</span>
                <span class="text-[11px] t-lo">Total Duration</span>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-base block">11</span>
                <span class="text-[11px] t-lo">Formal Sessions</span>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-base block">165</span>
                <span class="text-[11px] t-lo">Total Sitting Days</span>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-base block">114</span>
                <span class="text-[11px] t-lo">Days on Draft</span>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-base block">~60</span>
                <span class="text-[11px] t-lo">Foreign Charters</span>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-base block">~₹64 Lakh</span>
                <span class="text-[11px] t-lo">Total Cost</span>
              </div>
            </div>
          </div>

          <!-- Adoption vs Commencement & Article 394 -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-3">Enactment (Nov 26, 1949) vs Commencement (Jan 26, 1950)</h3>
            <div class="space-y-4 text-xs t-mid leading-relaxed">
              <div class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-bold text-emerald-700 dark:text-emerald-300">November 26, 1949 : Date of Adoption (Constitution Day)</span>
                  <span class="chip chip-mono text-[10px]">284 Signatures</span>
                </div>
                <p>
                  The Constitution was formally adopted, enacted, and given to the people of India. Contained a <strong class="t-hi">Preamble, 395 Articles, 8 Schedules, and 22 Parts</strong>. Out of 299 total members, exactly 284 were present and signed the historic document.
                </p>
              </div>

              <div class="p-4 rounded-lg bg-sky-500/10 border border-sky-500/30">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-bold text-sky-700 dark:text-sky-300">Article 394 : Immediate Enforcement of 15 Articles on Nov 26, 1949</span>
                  <span class="chip chip-mono text-[10px]">Immediate Effect</span>
                </div>
                <p class="mb-2">
                  Under Article 394, fifteen specific articles came into force immediately on November 26, 1949:
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px]">
                  <div class="p-2 rounded bg-base border b-line">
                    <strong class="t-hi">Articles 5, 6, 7, 8, 9:</strong> Citizenship rules (vital for refugees arriving post-partition).
                  </div>
                  <div class="p-2 rounded bg-base border b-line">
                    <strong class="t-hi">Article 60:</strong> Oath or affirmation by the President.
                  </div>
                  <div class="p-2 rounded bg-base border b-line">
                    <strong class="t-hi">Article 324:</strong> Election Commission of India (to prepare 1951-52 rolls).
                  </div>
                  <div class="p-2 rounded bg-base border b-line">
                    <strong class="t-hi">Articles 366 &amp; 367:</strong> Definitions and General Clauses interpretations.
                  </div>
                  <div class="p-2 rounded bg-base border b-line sm:col-span-2">
                    <strong class="t-hi">Articles 379, 380, 388, 391, 392, 393:</strong> Provisional Parliament, interim President, removal of difficulties, and Short Title ("The Constitution of India").
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <span class="font-bold text-amber-700 dark:text-amber-300 block mb-1">January 26, 1950 : Date of Commencement (Republic Day)</span>
                <p>
                  All remaining provisions (including Fundamental Rights, DPSPs, Judiciary, and Federal structures) came into force on January 26, 1950. Chosen specifically to commemorate <strong class="t-hi">Purna Swaraj Day (January 26, 1930)</strong>, declared following the December 1929 Lahore Congress session.
                </p>
                <p class="mt-2 text-[11px] t-lo">
                  <strong class="t-hi">Article 395 Repeals:</strong> Repealed the Government of India Act 1935 and Indian Independence Act 1947, while specifically <strong class="t-hi">saving</strong> the Abolition of Privy Council Jurisdiction Act 1949.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 06 · Calligraphy, Artwork & Official Symbols ────────────── -->
        <section id="calligraphy-trap-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Calligraphy, Artwork &amp; Official Symbols</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="calligraphy-trap-matrix"
              section-label="Calligraphy, Artwork & Official Symbols"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Symbols, Artists &amp; TGPRB Exam Trap Matrix</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="calligraphy-trap-matrix"
            section-label="Calligraphy, Artwork & Official Symbols"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            The Constitution of India is unique among world charters: it was not typeset or printed, but entirely handwritten and illuminated by master craftsmen and artists.
          </p>

          <!-- Artefacts & Personalities Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs mb-8">
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Official Seal</span>
              <p class="text-sm font-bold t-hi mt-1.5">Elephant</p>
              <p class="t-lo mt-1">Adopted as the official seal and symbol of the Constituent Assembly.</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">English Calligrapher</span>
              <p class="text-sm font-bold t-hi mt-1.5">Prem Behari Narain Raizada</p>
              <p class="t-lo mt-1">Handwrote English text in italic style using No. 303 nibs across 251 parchment sheets without charge.</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Hindi Calligrapher</span>
              <p class="text-sm font-bold t-hi mt-1.5">Vasant Krishnan Vaidya</p>
              <p class="t-lo mt-1">Handwrote the original Hindi manuscript of the Constitution.</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Art Direction</span>
              <p class="text-sm font-bold t-hi mt-1.5">Acharya Nand Lal Bose</p>
              <p class="t-lo mt-1">Led Shantiniketan Kala Bhavan artists in illuminating borders depicting 5,000 years of Indian history.</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400">Preamble Illuminator</span>
              <p class="text-sm font-bold t-hi mt-1.5">Beohar Rammanohar Sinha</p>
              <p class="t-lo mt-1">Designed and illuminated the historic Preamble page; signed "Ram" in the bottom right corner.</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Secretariat Officers</span>
              <p class="text-sm font-bold t-hi mt-1.5">H.V.R. Iengar &amp; S.N. Mukherjee</p>
              <p class="t-lo mt-1">H.V.R. Iengar was Secretary to CA; S.N. Mukherjee was Chief Draftsman praised by Dr. Ambedkar.</p>
            </div>
          </div>

          <!-- Side-by-Side TGPRB Exam Trap Matrix -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 text-amber-500" />
              Side-by-Side TGPRB Exam Trap Matrix (8 High-Frequency Confusions)
            </h3>
            <div class="space-y-3 text-xs">
              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 1: Dr. Sachchidananda Sinha</span>
                  <p class="t-lo">Interim / Temporary Chairman on <strong class="t-hi">Dec 9, 1946</strong> (oldest member, French tradition).</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: Dr. Rajendra Prasad</span>
                  <p class="t-lo">Permanent President elected on <strong class="t-hi">Dec 11, 1946</strong> (unanimously elected).</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 2: States Committee (Negotiating with States)</span>
                  <p class="t-lo">Chaired by <strong class="t-hi">Jawaharlal Nehru</strong> (candidates incorrectly pick Patel due to princely states!).</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: Provincial Constitution Committee</span>
                  <p class="t-lo">Chaired by <strong class="t-hi">Sardar Vallabhbhai Patel</strong>.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 3: Objectives Resolution Moved Date</span>
                  <p class="t-lo">Moved by Jawaharlal Nehru on <strong class="t-hi">December 13, 1946</strong>.</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: Objectives Resolution Passed Date</span>
                  <p class="t-lo">Unanimously passed on <strong class="t-hi">January 22, 1947</strong> (tested in PYQ-0766).</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 4: B.L. Mitter's Replacement</span>
                  <p class="t-lo">Replaced by <strong class="t-hi">N. Madhava Rau</strong> (resigned due to ill-health).</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: D.P. Khaitan's Replacement</span>
                  <p class="t-lo">Replaced by <strong class="t-hi">T.T. Krishnamachari</strong> (Khaitan died in 1948).</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 5: V.T. Krishnamachari</span>
                  <p class="t-lo">Vice-President of the Constituent Assembly (representing Princely States).</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: T.T. Krishnamachari</span>
                  <p class="t-lo">Drafting Committee Member (replaced D.P. Khaitan).</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 6: Constituent Assembly Ad-hoc Flag Committee</span>
                  <p class="t-lo">Chaired by <strong class="t-hi">Dr. Rajendra Prasad</strong> (appointed June 23, 1947).</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: J.B. Kripalani Flag Role</span>
                  <p class="t-lo">Kripalani chaired the 1931 Congress Flag Committee, NOT the Assembly committee.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 7: Provisions Enforced on Nov 26, 1949</span>
                  <p class="t-lo">Citizenship (Arts 5-9), Presidential Oath (Art 60), Elections (Art 324) under Article 394.</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: Provisions Enforced on Jan 26, 1950</span>
                  <p class="t-lo">Fundamental Rights (Part III), DPSP (Part IV), Judiciary, and all remaining articles.</p>
                </div>
              </div>

              <div class="p-3 rounded bg-sub border b-line grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Trap 8: Constitutional Advisor (Sir B.N. Rau)</span>
                  <p class="t-lo">Prepared initial working draft (243 articles); studied ~60 foreign constitutions.</p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Contrast: Drafting Committee Chairman (Dr. B.R. Ambedkar)</span>
                  <p class="t-lo">Piloted the final draft debates and is acclaimed Father of the Indian Constitution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 07 · Previous Year Questions ────────────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">Previous Year Questions</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="pyqs"
              section-label="Previous Year Questions"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ filteredPyqs.length }} questions</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="pyqs"
            section-label="Previous Year Questions"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

          <!-- Exam Filter Tabs -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="f in examFilters"
                :key="f.value"
                type="button"
                class="chip min-h-[44px] px-3.5 transition-colors"
                :class="activeExamFilter === f.value ? 'chip-saffron font-semibold' : 'hover:t-hi'"
                @click="activeExamFilter = f.value"
              >
                {{ f.label }}
              </button>
            </div>
            <span class="text-xs font-mono t-lo">
              Score: {{ correctCount }} / {{ attemptedCount }} attempted
            </span>
          </div>

          <!-- Question Cards -->
          <div class="space-y-4">
            <article
              v-for="q in filteredPyqs"
              :key="q.uid"
              class="panel panel-pad transition-all duration-200 hover:b-strong"
            >
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="chip chip-saffron chip-mono">{{ q.exam }} {{ q.year }}</span>
                <span class="chip chip-mono">{{ q.tag }}</span>
                <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto sm:ms-0"
                  :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
                >
                  {{ q.selected === q.correct ? 'Correct' : 'Missed' }}
                </span>
              </div>

              <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  type="button"
                  class="opt min-h-[44px] flex items-center gap-2 text-left"
                  :class="optionClass(q, oi)"
                  :disabled="q.revealed"
                  @click="attempt(q, oi)"
                >
                  <span class="opt-letter">{{ 'ABCD'[oi] }}</span>
                  <span class="flex-1 text-left">{{ opt }}</span>
                  <UIcon
                    v-if="q.revealed && oi === q.correct"
                    name="i-heroicons-check-circle-solid"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]"
                  />
                  <UIcon
                    v-else-if="q.revealed && oi === q.selected"
                    name="i-heroicons-x-circle-solid"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]"
                  />
                </button>
              </div>

              <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
                <p class="callout-title">
                  <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
                  Correct Answer: Option {{ 'ABCD'[q.correct] }} : {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
                <AiAskButton
                  class="mt-3"
                  note-id="NOTE-POL-MAKING-CONST"
                  :prompt="`Explain the Constituent Assembly historical reasoning and potential exam traps for this PYQ: ${q.question}`"
                  :source-question-id="q.uid"
                  :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid], gate_score: 0, gate_total: 0 }"
                  label="Explain with AI"
                />
              </div>
              <button
                v-else
                type="button"
                class="mt-3 min-h-[44px] font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1"
                @click="reveal(q)"
              >
                <span>Reveal answer &amp; explanation</span>
                <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
              </button>
            </article>
          </div>
        </section>

        <!-- ── 08 · Advanced Practice ──────────────────────────────────── -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="advanced-practice"
              section-label="Advanced Practice"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ advancedPractice.length }} drills</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="advanced-practice"
            section-label="Advanced Practice"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />

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
              Source: Forensic Paper-Setting Evolution Audit, Aug 2026 : 1,350 questions classified across 7 papers.
            </p>
          </div>

          <!-- Advanced Cards Deck -->
          <div class="space-y-4">
            <article
              v-for="q in advancedPractice"
              :key="q.uid"
              class="panel panel-pad transition-all duration-200 hover:b-strong"
            >
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-bold font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  {{ q.format }}
                </span>
                <span class="chip chip-mono">TGPSC-Style Practice</span>
                <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
                <span
                  v-if="q.revealed && q.selected !== null"
                  class="chip chip-mono ms-auto sm:ms-0"
                  :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
                >
                  {{ q.selected === q.correct ? 'Correct' : 'Missed' }}
                </span>
              </div>

              <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  type="button"
                  class="opt min-h-[44px] flex items-center gap-2 text-left"
                  :class="advOptionClass(q, oi)"
                  :disabled="q.revealed"
                  @click="advAttempt(q, oi)"
                >
                  <span class="opt-letter">{{ 'ABCD'[oi] }}</span>
                  <span class="flex-1 text-left">{{ opt }}</span>
                  <UIcon
                    v-if="q.revealed && oi === q.correct"
                    name="i-heroicons-check-circle-solid"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]"
                  />
                  <UIcon
                    v-else-if="q.revealed && oi === q.selected"
                    name="i-heroicons-x-circle-solid"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]"
                  />
                </button>
              </div>

              <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
                <p class="callout-title">
                  <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
                  Correct Answer: Option {{ 'ABCD'[q.correct] }} : {{ q.options[q.correct] }}
                </p>
                <p class="callout-body">{{ q.explanation }}</p>
                <AiAskButton
                  class="mt-3"
                  note-id="NOTE-POL-MAKING-CONST"
                  :prompt="`Explain the reasoning for this TGPSC-style question and the exam trap: ${q.question}`"
                  :source-question-id="q.uid"
                  :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid], gate_score: 0, gate_total: 0 }"
                  label="Explain with AI"
                />
              </div>
              <button
                v-else
                type="button"
                class="mt-3 min-h-[44px] font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1"
                @click="advReveal(q)"
              >
                <span>Reveal answer &amp; explanation</span>
                <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
              </button>
            </article>
          </div>
        </section>

        <!-- ── 09 · Comprehension Gate ─────────────────────────────────── -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="gate"
              section-label="Comprehension Gate"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="gate"
            section-label="Comprehension Gate"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />
          <GateQuiz note-id="NOTE-POL-MAKING-CONST" />
        </section>

        <!-- ── 10 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton
              note-id="NOTE-POL-MAKING-CONST"
              section-id="current-affairs"
              section-label="Current Affairs"
              note-title="Making of the Indian Constitution"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-MAKING-CONST"
            section-id="current-affairs"
            section-label="Current Affairs"
            note-title="Making of the Indian Constitution"
            @open="openNotesDrawer"
          />
          <CurrentAffairsStrip note-id="NOTE-POL-MAKING-CONST" />
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
      <TableOfContents
        v-model="activeSection"
        :sections="sections"
        weight-text="2-3 questions per paper across SI &amp; Constable."
      />
    </div>

    <!-- Supplementary Drawers -->
    <AiAssistantDrawer
      note-id="NOTE-POL-MAKING-CONST"
      note-title="Making of the Indian Constitution"
      :quick-prompts="aiQuickPrompts"
    />
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-POL-MAKING-CONST"
      note-title="Making of the Indian Constitution"
    />

    <!-- Floating Mobile/Tablet ToC Trigger & Slideover -->
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
            <span class="font-mono text-[11px]" :class="activeSection === section.id ? 'accent' : 't-lo'">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span>{{ section.label }}</span>
          </a>
        </nav>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import TableOfContents from '@/components/TableOfContents.vue'
import CurrentAffairsStrip from '@/components/CurrentAffairsStrip.vue'
import GateQuiz from '@/components/GateQuiz.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import AiAssistantDrawer from '@/components/AiAssistantDrawer.vue'
import AiAskButton from '@/components/AiAskButton.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import { useAiPromptChips } from '@/composables/useAiPromptChips'
import type { SectionContext } from '@/types/annotations'

useHead({
  title: 'Making of the Indian Constitution - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Comprehensive TGPRB study note: Making of the Indian Constitution with Constituent Assembly milestones, Drafting Committee, and verified PYQs.' }],
})

const aiQuickPrompts = useAiPromptChips('NOTE-POL-MAKING-CONST')

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Demand Timeline (1934-1946)' },
  { label: 'Assembly Composition & Quotas' },
  { label: 'Milestone Sittings & Officers' },
  { label: '8 Major Committees & Rosters' },
  { label: 'Dual Function & Enacted Articles' },
  { label: 'Calligraphy, Symbols & Trap Matrix' },
]

const sections = [
  { id: 'demand-timeline',        label: 'Demand Timeline (1934-1946)' },
  { id: 'assembly-composition',   label: 'Assembly Composition & Architecture' },
  { id: 'milestone-sittings',     label: 'Milestone Sittings & Officers' },
  { id: 'major-committees',       label: '8 Major Committees & Rosters' },
  { id: 'dual-function-enactment',label: 'Dual Function & Enactment' },
  { id: 'calligraphy-trap-matrix',label: 'Calligraphy, Symbols & Trap Matrix' },
  { id: 'pyqs',                   label: 'Previous Year Questions' },
  { id: 'advanced-practice',      label: 'Advanced Practice' },
  { id: 'gate',                   label: 'Comprehension Gate' },
  { id: 'current-affairs',        label: 'Current Affairs' },
]

const mobileTocOpen = ref(false)
const readProgress = ref(0)
const activeSection = ref('demand-timeline')

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
    uid: 'PYQ-3037',
    exam: 'SI',
    year: '2023',
    tag: 'Constituent Assembly',
    source: 'SI 2023 Mains : Q108',
    question: 'The Constituent Assembly was formulated by',
    options: [
      'Indian Independence Act, 1947',
      'Government of India Act 1935',
      'Cabinet Mission Plan, 1946',
      'Government of India Act, 1919'
    ],
    correct: 2,
    explanation: 'The Constituent Assembly of India was set up in November 1946 under the scheme formulated by the Cabinet Mission Plan of May 1946, comprising Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0766',
    exam: 'Constable',
    year: '2018',
    tag: 'Constituent Assembly',
    source: 'Constable 2018 Prelims : Q146',
    question: "In the Constituent Assembly, the 'Objectives Resolution' was passed on:",
    options: [
      '24th January, 1947',
      '25th January, 1947',
      '26th January, 1947',
      '22nd January, 1947'
    ],
    correct: 3,
    explanation: "The historic 'Objectives Resolution' was moved by Pandit Jawaharlal Nehru on December 13, 1946, and was unanimously adopted (passed) by the Constituent Assembly on January 22, 1947. Its modified text became the Preamble.",
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1560',
    exam: 'SI',
    year: '2016',
    tag: 'Constitutional History',
    source: 'SI 2016 Mains : Q117',
    question: "Which of the following statements are correct?\na) Constituent Assembly was suggested by cabinet mission\nb) The first amendment to Preamble was made in 1975\nc) 1919 Government of India Act separated state budget from union budget\nd) Indian Independence Act was approved by British Parliament on July 15, 1947",
    options: [
      '(1) a&d',
      '(2) b&c',
      '(3) c & d',
      '(4) a&b'
    ],
    correct: 0,
    explanation: 'Statement (a) is correct because the Constituent Assembly was formulated under the Cabinet Mission Plan of 1946. Statement (d) is correct as the Indian Independence Bill was passed on July 15, 1947 by the British House of Commons (Royal Assent on July 18, 1947). Statement (b) is incorrect because the Preamble was amended in 1976 (42nd CAA).',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1168',
    exam: 'Constable',
    year: '2023',
    tag: 'Assembly Commissions',
    source: 'Constable 2023 Mains : Q153',
    question: 'Who was the Chairman of the Linguistic Provinces Commission appointed in June 1948?',
    options: [
      'Shri Rajendra Prasad',
      'Pandit Jawaharlal Nehru',
      'Shri S.K. Dhar',
      'Sir John Simon'
    ],
    correct: 2,
    explanation: 'In June 1948, Dr. Rajendra Prasad, President of the Constituent Assembly, appointed the Linguistic Provinces Commission headed by Justice S.K. Dhar (former Judge of Allahabad High Court) to examine state reorganization on a linguistic basis.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-2537',
    exam: 'SI',
    year: '2018',
    tag: 'Assembly Commissions',
    source: 'SI 2018 Prelims : Q188',
    question: 'The Linguistic Provinces Commission set up by the Government of India in June 1948 was headed by:',
    options: [
      'S.K. Patil',
      'S.K. Dhar',
      'Pataskar',
      'P.N. Haksar'
    ],
    correct: 1,
    explanation: 'The Linguistic Provinces Commission appointed in June 1948 was headed by Justice S.K. Dhar. Its report submitted in December 1948 recommended reorganization based on administrative convenience rather than linguistic considerations alone.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0972',
    exam: 'Constable',
    year: '2022',
    tag: 'Preamble',
    source: 'Constable 2022 Prelims : Q154',
    question: 'India is a Sovereign Socialist ______ country.',
    options: [
      'Secular',
      'Democratic',
      'Republic',
      'All the above'
    ],
    correct: 3,
    explanation: "The Preamble to the Indian Constitution declares India to be a 'SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC'. Therefore, all three terms (Secular, Democratic, Republic) complete the constitutional phraseology.",
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1240',
    exam: 'Constable',
    year: '2023',
    tag: 'Republic & Franchise',
    source: 'Constable 2023 Prelims : Q166',
    question: 'Assertion (A) : India is a Republic\nReason (R): India has universal adult franchise system\nThe correct answer is',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true and (R) is false',
      '(A) is false and (R) is true'
    ],
    correct: 1,
    explanation: 'A Republic signifies that the head of state (the President) is elected for a fixed term and not hereditary. Universal adult franchise establishes a representative democracy, but does not define a republic (e.g. the UK has universal adult franchise but is a constitutional monarchy).',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0943',
    exam: 'Constable',
    year: '2022',
    tag: 'Enactment & Schedules',
    source: 'Constable 2022 Prelims : Q124',
    question: 'How many schedules are there in the Indian Constitution ?',
    options: [
      '12',
      '10',
      '11',
      '9'
    ],
    correct: 0,
    explanation: 'When adopted on November 26, 1949, the Constitution originally contained 8 Schedules. Four additional schedules were added by subsequent constitutional amendments (9th by 1st CAA 1951, 10th by 52nd CAA 1985, 11th by 73rd CAA 1992, 12th by 74th CAA 1992), making 12 schedules currently.',
    revealed: false,
    selected: null
  }
])

const activeExamFilter = ref('all')

const examFilters = [
  { label: 'All Exams (8)', value: 'all' },
  { label: 'Constable (5)', value: 'Constable' },
  { label: 'SI (3)', value: 'SI' }
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
  revealed: boolean
  selected: number | null
}

const advancedPractice: AdvPractice[] = reactive([
  {
    uid: 'ADV-POL-MC-001',
    question: 'Consider the following statements regarding the Constituent Assembly of India:\n\n1. The idea of a Constituent Assembly for India was put forward for the first time by M.N. Roy in 1934.\n2. The Constituent Assembly was constituted in November 1946 under the scheme formulated by the Cripps Mission of 1942.\n3. The total strength of the Constituent Assembly was initially 389, of which 93 seats were allotted to the Princely States.\n4. Following the partition of India under the Mountbatten Plan, the total strength of the Assembly was reduced to 299.\n\nWhich of the statements given above are correct?',
    options: [
      '1 and 2 only',
      '1, 3 and 4 only',
      '3 and 4 only',
      '1, 2, 3 and 4'
    ],
    correct: 1,
    explanation: 'Statement 1 is correct (M.N. Roy first proposed in 1934). Statement 2 is incorrect: the Assembly was formulated under the Cabinet Mission Plan of 1946, not Cripps 1942. Statements 3 and 4 are correct: initial strength was 389 (296 British India + 93 Princely States), and post-partition strength was 299 (229 provinces + 70 princely states).',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-3037)',
    format: 'Multi-statement',
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-MC-002',
    question: 'Examine the following statements concerning the key officers and proceedings of the Constituent Assembly:\n\n1. Dr. Sachchidananda Sinha was elected as the temporary Chairman during the first sitting on December 9, 1946, following the French practice.\n2. The Assembly elected two Vice-Presidents: Dr. H.C. Mukherjee and V.T. Krishnamachari.\n3. Sir B.N. Rau served as the Chief Draftsman of the Constitution in the Constituent Assembly.\n4. The historic Objectives Resolution was moved by Jawaharlal Nehru on December 13, 1946, and adopted on January 22, 1947.\n\nWhich of the statements given above are correct?',
    options: [
      '1, 2 and 4 only',
      '2 and 3 only',
      '1 and 4 only',
      '1, 2, 3 and 4'
    ],
    correct: 0,
    explanation: 'Statements 1, 2, and 4 are correct. Statement 3 is incorrect because Sir B.N. Rau was appointed as the Constitutional Advisor. The Chief Draftsman was S.N. Mukherjee (praised by Dr. Ambedkar).',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0766)',
    format: 'Multi-statement',
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-MC-003',
    question: 'With reference to the Drafting Committee of the Constituent Assembly, consider the following statements:\n\n1. The Drafting Committee was set up on August 29, 1947, under the chairmanship of Dr. B.R. Ambedkar.\n2. It consisted of a total of 7 members.\n3. N. Madhava Rau joined the committee replacing B.L. Mitter who resigned due to ill-health.\n4. T.T. Krishnamachari joined the committee replacing D.P. Khaitan who died in 1948.\n\nWhich of the statements given above are correct?',
    options: [
      '1 and 2 only',
      '3 and 4 only',
      '1, 2 and 3 only',
      '1, 2, 3 and 4'
    ],
    correct: 3,
    explanation: 'All four statements are accurate historical facts. The 7 members were: Dr. B.R. Ambedkar (Chairman), N. Gopalaswamy Ayyangar, Alladi Krishnaswamy Iyer, Dr. K.M. Munshi, Syed Mohammad Saadulla, N. Madhava Rau (replaced B.L. Mitter), and T.T. Krishnamachari (replaced D.P. Khaitan).',
    source: 'TGPSC-Style Advanced Drill',
    format: 'Multi-statement',
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-MC-004',
    question: 'Consider the following statements regarding the adoption and enforcement of the Indian Constitution:\n\n1. The Constitution was adopted and enacted by the Constituent Assembly on November 26, 1949.\n2. The provisions relating to Citizenship, Elections, Provisional Parliament, and Temporary provisions came into force immediately on November 26, 1949.\n3. Article 324 (Election Commission) was among the articles enforced on November 26, 1949.\n4. January 26, 1950 was chosen as the date of commencement to commemorate the Poona Pact of 1932.\n\nWhich of the statements given above are correct?',
    options: [
      '1, 2 and 3 only',
      '1 and 4 only',
      '2 and 3 only',
      '1, 2, 3 and 4'
    ],
    correct: 0,
    explanation: 'Statements 1, 2, and 3 are correct: under Article 394, citizenship (Arts 5-9), presidential oath (Art 60), elections (Art 324), and provisional provisions took effect immediately on Nov 26, 1949. Statement 4 is incorrect because January 26 was chosen to commemorate Purna Swaraj Day (Jan 26, 1930 declared at 1929 Lahore Congress), not the Poona Pact.',
    source: 'TGPSC-Style Advanced Drill',
    format: 'Multi-statement',
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-MC-005',
    question: 'Match List-I (Major Committee of Constituent Assembly) with List-II (Chairperson):\n\nList-I:\nA. States Committee (Committee for Negotiating with States)\nB. Provincial Constitution Committee\nC. Steering Committee\nD. Fundamental Rights Sub-Committee\n\nList-II:\n1. Sardar Vallabhbhai Patel\n2. Dr. Rajendra Prasad\n3. Jawaharlal Nehru\n4. J.B. Kripalani\n\nChoose the correct option:',
    options: [
      'A-1, B-3, C-2, D-4',
      'A-3, B-1, C-2, D-4',
      'A-3, B-1, C-4, D-2',
      'A-1, B-2, C-3, D-4'
    ],
    correct: 1,
    explanation: 'States Committee was chaired by Jawaharlal Nehru (A-3). Provincial Constitution Committee was chaired by Sardar Vallabhbhai Patel (B-1). Steering Committee was chaired by Dr. Rajendra Prasad (C-2). Fundamental Rights Sub-Committee was chaired by J.B. Kripalani (D-4).',
    source: 'TGPSC-Style Advanced Drill',
    format: 'Matching',
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-MC-006',
    question: 'Match List-I (Constitutional Role / Artefact) with List-II (Personality / Symbol):\n\nList-I:\nA. Original Calligrapher of the English Constitution\nB. Calligrapher of the Hindi Version\nC. Artistic Illumination & Border Decorations\nD. Official Seal / Symbol of Constituent Assembly\n\nList-II:\n1. Nand Lal Bose & Beohar Rammanohar Sinha\n2. Prem Behari Narain Raizada\n3. Elephant\n4. Vasant Krishnan Vaidya\n\nChoose the correct option:',
    options: [
      'A-2, B-4, C-1, D-3',
      'A-4, B-2, C-1, D-3',
      'A-2, B-1, C-4, D-3',
      'A-3, B-4, C-1, D-2'
    ],
    correct: 0,
    explanation: 'English Calligrapher was Prem Behari Narain Raizada (A-2). Hindi Calligrapher was Vasant Krishnan Vaidya (B-4). Artistic Illumination was done by Nand Lal Bose & Beohar Rammanohar Sinha from Shantiniketan (C-1). Official Seal of the Assembly was the Elephant (D-3).',
    source: 'TGPSC-Style Advanced Drill',
    format: 'Matching',
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
