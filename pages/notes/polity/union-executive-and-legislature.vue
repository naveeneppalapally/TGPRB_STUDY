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
          <span class="t-lo">Indian Polity</span>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <span class="t-mid">Union Executive &amp; Parliament</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 · High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 4-5 Questions (4-5 Marks)</span>
            <span class="chip">26 verified PYQs</span>
            <span class="chip">Polity</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Union Executive &amp; Parliament
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive study notes covering President, Vice-President, Prime Minister, Council of Ministers, Lok Sabha, Rajya Sabha, Speaker, Parliamentary Committees, and key Articles tested in TSLPRB Police Constable &amp; SI Exams.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />9 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />26 verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~22 min read
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
            Cover all six dimensions to master every exam question asked on Union Executive and Parliamentary institutions.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> 4-Statement True/False Verifications on President &amp; Speaker powers (Money Bill certification, Casting Vote Art 100), and <strong class="t-hi">Direct Article Matching (Art 52-123)</strong>. Trap alert: Watch for Council of Ministers collective responsibility (Lok Sabha only vs Parliament).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · Union Executive: President & VP ──────────────────────── -->
        <section id="president-vp" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Union Executive: President &amp; Vice President</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="president-vp" section-label="Union Executive: President & Vice President" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 52-73 · Veto Powers</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="president-vp" section-label="Union Executive: President & Vice President" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

          <!-- Visual Hierarchy Component -->
          <ConstitutionalHierarchy mode="executive" class="mb-10" />

          <!-- Key Articles Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h4 class="font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wide mb-2">President (Articles 52 - 62)</h4>
              <ul class="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 52:</strong> Executive Head of the Union of India.</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 53:</strong> Supreme Commander of Armed Forces.</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 54 &amp; 55:</strong> Electoral College (Elected MPs + Elected MLAs of States + UTs of Delhi, Puducherry, J&amp;K).</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 61:</strong> Impeachment Procedure for violation of the Constitution.</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 72:</strong> Pardoning Powers (Pardon, Commutation, Remission, Respite, Reprieve).</li>
              </ul>
            </div>

            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h4 class="font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wide mb-2">Vice President (Articles 63 - 70)</h4>
              <ul class="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 63:</strong> Vice-President of India.</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 64:</strong> Ex-officio Chairman of Rajya Sabha.</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Art. 65:</strong> Acts as President during vacancy (max period 6 months).</li>
                <li><strong class="text-slate-900 dark:text-slate-100">Electoral College:</strong> All MPs (both Elected &amp; Nominated) of Lok Sabha &amp; Rajya Sabha; MLAs do NOT vote.</li>
              </ul>
            </div>
          </div>

          <!-- High-Yield Callout: Veto Powers & Prior Sanction Bills -->
          <div class="p-4 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-emerald-500 text-white rounded-lg mt-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 class="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">
                  Presidential Veto Powers &amp; Prior Recommendation Rules [PYQ-0753, PYQ-0301, PYQ-0756]
                </h4>
                <p class="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed mb-2">
                  The Indian President enjoys three types of Veto power: <strong>Absolute Veto</strong> (withholding assent), <strong>Suspensive Veto</strong> (returning bill for reconsideration), and <strong>Pocket Veto</strong> (keeping bill pending indefinitely).
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="bg-white dark:bg-slate-900 p-2.5 rounded border border-emerald-300 dark:border-emerald-700">
                    <span class="font-bold text-rose-600 dark:text-rose-400">NO Qualified Veto in India [PYQ-0753]:</span>
                    Unlike the US President, the Indian President does NOT possess a "Qualified Veto" (which requires a higher majority to override).
                  </div>
                  <div class="bg-white dark:bg-slate-900 p-2.5 rounded border border-emerald-300 dark:border-emerald-700">
                    <span class="font-bold text-emerald-700 dark:text-emerald-400">Money Bills Cannot Be Returned [PYQ-0301]:</span>
                    A Money Bill is introduced ONLY with prior recommendation of the President. Therefore, the President cannot return a Money Bill for reconsideration (must give assent or withhold it).
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Table: Bills Requiring Prior Recommendation vs Not -->
          <div class="overflow-x-auto mb-6">
            <table class="w-full text-left text-xs border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <thead class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase font-bold">
                <tr>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Category</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Prior Sanction Required?</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Relevant Article / Details [PYQ-0756]</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Money Bills</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold">YES</td>
                  <td class="p-3">Article 110 &amp; 117(1): Introduced only in Lok Sabha with prior recommendation.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">State Reorganisation Bills</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold">YES</td>
                  <td class="p-3">Article 3: Altering state boundaries/names requires President's prior recommendation.</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Bills Affecting Taxation of States</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold">YES</td>
                  <td class="p-3">Article 274: Legislation impacting state financial interests.</td>
                </tr>
                <tr class="bg-amber-50/50 dark:bg-amber-950/20">
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Ordinary Bills (Non-Money)</td>
                  <td class="p-3 text-rose-600 dark:text-rose-400 font-bold">NO</td>
                  <td class="p-3">Can be introduced in either House without prior recommendation [PYQ-0756].</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Table: Officiating / Acting Presidents of India -->
          <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
            <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Vice Presidents Who Acted as Officiating Presidents [PYQ-0767]
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <p class="font-bold text-slate-900 dark:text-white mb-1">1. V.V. Giri (1969)</p>
                <p class="text-slate-600 dark:text-slate-300">Acted as President following the demise of Dr. Zakir Husain in May 1969. Later resigned to contest the presidential election.</p>
              </div>
              <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <p class="font-bold text-slate-900 dark:text-white mb-1">2. B.D. Jatti (1977)</p>
                <p class="text-slate-600 dark:text-slate-300">Acted as President after the death of President Fakhruddin Ali Ahmed in February 1977.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 02 · Prime Minister & Council of Ministers ───────────────── -->
        <section id="pm-com" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Prime Minister &amp; Council of Ministers</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="pm-com" section-label="Prime Minister & Council of Ministers" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 74-78 · Portfolios</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="pm-com" section-label="Prime Minister & Council of Ministers" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

          <!-- Constitutional Sequence Box -->
          <div class="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <h4 class="font-bold text-amber-900 dark:text-amber-200 text-sm mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Sequence of Government Formation &amp; Collective Responsibility [PYQ-0302, PYQ-0167]
            </h4>
            <ul class="text-xs text-amber-950 dark:text-amber-200 space-y-2 leading-relaxed">
              <li>
                <strong class="text-amber-800 dark:text-amber-400">Formation Order [PYQ-0302]:</strong> Under <strong>Article 75(1)</strong>, the formation of the Council of Ministers <em>starts with the appointment of the Prime Minister</em> by the President. Other ministers are subsequently appointed by the President on the advice of the Prime Minister.
              </li>
              <li>
                <strong class="text-amber-800 dark:text-amber-400">Collective Responsibility [PYQ-0167]:</strong> Under <strong>Article 75(3)</strong>, the Council of Ministers is collectively responsible to the <strong>Lok Sabha</strong>. They sink or swim together.
              </li>
              <li>
                <strong class="text-amber-800 dark:text-amber-400">PM's Cabinet Prerogative [PYQ-0167]:</strong> It is the exclusive prerogative of the Prime Minister to select, allocate portfolios to, or drop any minister from the cabinet.
              </li>
              <li>
                <strong class="text-amber-800 dark:text-amber-400">Leader of the House [PYQ-0165]:</strong> The Prime Minister acts as the Leader of the House in the Lok Sabha if he is a member of the Lok Sabha (e.g., Narendra Modi in 16th and 17th Lok Sabha).
              </li>
            </ul>
          </div>

          <!-- Table: Historical Union Ministers & Ministries (PYQ Match Matrix) -->
          <div class="overflow-x-auto mb-6">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Historical Ministers &amp; Governments Matching [PYQ-0200, PYQ-0315, PYQ-0878]</p>
            <table class="w-full text-left text-xs border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <thead class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold uppercase">
                <tr>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Union Minister</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Portfolio / Ministry</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Government / Period</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">H.M. Patel</td>
                  <td class="p-3">Finance Minister</td>
                  <td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Janata Party Govt (1977-1979) [PYQ-0200]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Indrajit Gupta</td>
                  <td class="p-3">Home Minister</td>
                  <td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">United Front Govt (1996-1998) [PYQ-0200]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Madhu Dandavate</td>
                  <td class="p-3">Finance Minister</td>
                  <td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">National Front Govt (1989-1990) [PYQ-0200]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">George Fernandes</td>
                  <td class="p-3">Defence Minister</td>
                  <td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">NDA-I Govt (1998-2004) [PYQ-0200]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Dr. Virendra Kumar</td>
                  <td class="p-3">Social Justice &amp; Empowerment</td>
                  <td class="p-3">Union Cabinet [PYQ-0878]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Dr. Mahendra Nath Pandey</td>
                  <td class="p-3">Heavy Industries</td>
                  <td class="p-3">Union Cabinet [PYQ-0878]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ── 03 · Structure of Parliament: Lok Sabha & Rajya Sabha ─────── -->
        <section id="parliament-structure" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Structure of Parliament: Lok Sabha &amp; Rajya Sabha</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="parliament-structure" section-label="Structure of Parliament: Lok Sabha & Rajya Sabha" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 79-106 · Seat Allocations</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="parliament-structure" section-label="Structure of Parliament: Lok Sabha & Rajya Sabha" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

          <!-- Comparison Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Rajya Sabha Card -->
            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                <span>Rajya Sabha (Council of States)</span>
                <span class="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">Upper House</span>
              </h3>
              <ul class="text-xs space-y-2.5 text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Max Strength:</strong> 250 (238 elected from States/UTs + 12 nominated by President).</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Nominated Members [PYQ-0313]:</strong> President nominates 12 members under Article 80 for contributions to Art, Literature, Science, and Social Service.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Special Power (Art. 249) [PYQ-0164]:</strong> Parliament can legislate on items in the State List in national interest IF Rajya Sabha passes a resolution supported by not less than 2/3rd of members present and voting.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Equal Seat Allocation [PYQ-0309]:</strong> Andhra Pradesh and Gujarat both have equal seats (<strong>11 seats each</strong>) in Rajya Sabha.</span>
                </li>
              </ul>
            </div>

            <!-- Lok Sabha Card -->
            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                <span>Lok Sabha (House of the People)</span>
                <span class="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">Lower House</span>
              </h3>
              <ul class="text-xs space-y-2.5 text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Max Strength:</strong> 550 (530 from States + 20 from UTs). Note: Anglo-Indian nomination (2 seats) abolished by 104th Constitutional Amendment Act, 2019.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Largest Voter Base [PYQ-0326]:</strong> <strong>Malkajgiri</strong> (Telangana) is the largest Parliamentary constituency in India by total electors (~31.5 lakh voters).</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>Smallest Voter Base [PYQ-0191]:</strong> <strong>Lakshadweep</strong> is the smallest Parliamentary constituency by electors (~55,000 to 60,000 voters).</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold text-emerald-600">•</span>
                  <span><strong>State Seats Fact [PYQ-0515]:</strong> Bihar has <strong>40</strong> Lok Sabha seats; Goa = 2, Meghalaya = 2, MP = 29.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Matching Table: Lok Sabha Term vs Prime Ministerial Government -->
          <div class="overflow-x-auto mb-6">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lok Sabha Term vs Government Formation [PYQ-0517]</p>
            <table class="w-full text-left text-xs border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <thead class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold uppercase">
                <tr>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Lok Sabha Term</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Governing Party / Front</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Key PMs / Context</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
                <tr>
                  <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">6th Lok Sabha (1977-1979)</td>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Janata Party Government</td>
                  <td class="p-3">Morarji Desai / Charan Singh [PYQ-0517]</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">9th Lok Sabha (1989-1991)</td>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">National Front Government</td>
                  <td class="p-3">V.P. Singh / Chandra Shekhar [PYQ-0517]</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">10th Lok Sabha (1991-1996)</td>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Congress Party Government</td>
                  <td class="p-3">P.V. Narasimha Rao [PYQ-0517]</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">11th Lok Sabha (1996-1998)</td>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">United Front Government</td>
                  <td class="p-3">H.D. Deve Gowda / I.K. Gujral [PYQ-0517]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ── 04 · Parliamentary Officers & Standing Committees ───────── -->
        <section id="officers-committees" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Parliamentary Officers &amp; Standing Committees</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="officers-committees" section-label="Parliamentary Officers & Standing Committees" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Speaker Rules · Estimates &amp; PAC</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="officers-committees" section-label="Parliamentary Officers & Standing Committees" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

          <!-- Red Penalty Box for Frequent Traps -->
          <div class="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60">
            <h4 class="font-bold text-rose-900 dark:text-rose-200 text-sm mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              High Penalty Traps: Speaker &amp; Parliamentary Rules [PYQ-0314, PYQ-0519, PYQ-0754]
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-800">
                <span class="font-bold text-rose-700 dark:text-rose-400 block mb-1">TRAP 1: Speaker's Resignation [PYQ-0314]</span>
                The Speaker submits his resignation letter to the <strong>Deputy Speaker of Lok Sabha</strong>, NOT to the President!
              </div>
              <div class="p-3 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-800">
                <span class="font-bold text-rose-700 dark:text-rose-400 block mb-1">TRAP 2: Leader of Opposition [PYQ-0314]</span>
                The Speaker does NOT appoint the Leader of Opposition. The LoP is recognised based on statutory rule (party having at least 10% of total seats).
              </div>
              <div class="p-3 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-800">
                <span class="font-bold text-rose-700 dark:text-rose-400 block mb-1">TRAP 3: Casting Vote Article [PYQ-0519]</span>
                Under <strong>Article 100(1)</strong>, the Speaker does not vote in the first instance, but exercises a <em>Casting Vote</em> in case of an equality of votes (tie).
              </div>
              <div class="p-3 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-800">
                <span class="font-bold text-rose-700 dark:text-rose-400 block mb-1">TRAP 4: Opposition Deputy Speaker [PYQ-0754]</span>
                The parliamentary convention of giving the Deputy Speaker post to the opposition party began in the <strong>11th Lok Sabha (1996)</strong>.
              </div>
            </div>
          </div>

          <!-- Notable Speakers Grid -->
          <div class="p-4 mb-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2">
              Notable Speakers of Lok Sabha Verified in PYQs [PYQ-0317]
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mb-3">
              TSLPRB often presents lists of public figures and asks candidates to identify who served as Speaker of Lok Sabha.
            </p>
            <div class="flex flex-wrap gap-2 text-xs">
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Somnath Chatterjee</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Rabi Ray</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Manohar Joshi</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Sumitra Mahajan</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Meira Kumar (1st Woman)</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Shivraj Patil</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">Balram Jakhar</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">P.A. Sangma</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">K.S. Hegde</span>
            </div>
          </div>

          <!-- Standing Committees Key Focus -->
          <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center justify-between">
              <span>Estimates Committee vs PAC (Parliamentary Committees)</span>
              <span class="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                High-Yield PYQ Topic
              </span>
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Estimates Committee [PYQ-0768]</span>
                <ul class="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• <strong>30 Members</strong> (Largest committee of Parliament).</li>
                  <li>• <strong>EXCLUSIVELY from Lok Sabha</strong> (0 members from Rajya Sabha).</li>
                  <li>• Elected annually by LS members using proportional representation by single transferable vote.</li>
                  <li>• Minister cannot be elected as a member.</li>
                </ul>
              </div>
              <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">Public Accounts Committee (PAC)</span>
                <ul class="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• <strong>22 Members</strong> (15 from Lok Sabha + 7 from Rajya Sabha).</li>
                  <li>• Examines CAG audit reports.</li>
                  <li>• Chairman is conventionally appointed from the Opposition party by the Speaker.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 05 · Memory Mnemonics & Speed Revision Matrix ───────────── -->
        <section id="mnemonics" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Memory Mnemonics &amp; Speed Revision Matrix</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="mnemonics" section-label="Memory Mnemonics & Speed Revision Matrix" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Recall shortcuts · Exam tables</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="mnemonics" section-label="Memory Mnemonics & Speed Revision Matrix" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

          <!-- Mnemonic Box 1 -->
          <div class="p-4 mb-4 rounded-xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-md">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 text-xs font-bold bg-amber-400 text-slate-950 rounded">MNEMONIC</span>
              <h4 class="font-bold text-sm text-amber-300">Presidents Vetoes in India: "A-S-P"</h4>
            </div>
            <p class="text-xs text-slate-200 mb-2">
              Remember <strong>ASP</strong> (Absolute, Suspensive, Pocket). India has NO Qualified Veto!
            </p>
            <div class="text-xs bg-slate-800/80 p-2.5 rounded border border-slate-700 space-y-1">
              <p><strong class="text-emerald-400">A</strong> = <strong>Absolute Veto</strong> (Withholding assent completely)</p>
              <p><strong class="text-emerald-400">S</strong> = <strong>Suspensive Veto</strong> (Returning to Parliament; overridden by simple majority)</p>
              <p><strong class="text-emerald-400">P</strong> = <strong>Pocket Veto</strong> (Keeping bill pending with no time limit)</p>
            </div>
          </div>

          <!-- Speed Revision Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <thead class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold uppercase">
                <tr>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Key Fact / Article</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">Exact Value / Provision</th>
                  <th class="p-3 border-b border-slate-200 dark:border-slate-600">PYQ Reference</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Largest Constituency (Voters)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Malkajgiri (Telangana)</td>
                  <td class="p-3">[PYQ-0326]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Smallest Constituency (Voters)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Lakshadweep</td>
                  <td class="p-3">[PYQ-0191]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Speaker's Casting Vote Article</td>
                  <td class="p-3 font-bold">Article 100(1)</td>
                  <td class="p-3">[PYQ-0519]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Rajya Sabha Resolution for State List</td>
                  <td class="p-3 font-bold">Article 249 (2/3rd majority)</td>
                  <td class="p-3">[PYQ-0164]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Equal Rajya Sabha Seats (11 each)</td>
                  <td class="p-3 font-bold">Andhra Pradesh &amp; Gujarat</td>
                  <td class="p-3">[PYQ-0309]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Nominated RS Members Count</td>
                  <td class="p-3 font-bold">12 members (Article 80)</td>
                  <td class="p-3">[PYQ-0313]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Estimates Committee Strength</td>
                  <td class="p-3 font-bold">30 members (100% from Lok Sabha)</td>
                  <td class="p-3">[PYQ-0768]</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-900 dark:text-white">Speaker Resigns To</td>
                  <td class="p-3 font-bold text-rose-600 dark:text-rose-400">Deputy Speaker of Lok Sabha</td>
                  <td class="p-3">[PYQ-0314]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ── 06 · Previous Year Questions (Interactive 26 Cards) ───── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Previous Year Questions</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="pyqs" section-label="Previous Year Questions" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ filteredPyqs.length }} of {{ pyqs.length }} PYQs</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="pyqs" section-label="Previous Year Questions" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

          <!-- Filter toolbar -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 shadow-sm">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="f in examFilters"
                :key="f.value"
                type="button"
                class="chip transition-colors"
                :class="activeExamFilter === f.value ? 'chip-saffron font-bold' : 'chip-muted'"
                @click="activeExamFilter = f.value"
              >
                {{ f.label }}
              </button>
            </div>
            <span class="font-mono text-[11px] t-lo">Score: {{ correctCount }} / {{ attemptedCount }}</span>
          </div>

          <!-- PYQ Card Deck -->
          <div class="space-y-4">
            <article v-for="(q, qi) in filteredPyqs" :key="q.uid" class="panel panel-pad transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <span class="chip chip-saffron chip-mono">Q{{ qi + 1 }}</span>
                <span class="chip chip-mono">{{ q.exam }} {{ q.year }}</span>
                <span class="chip chip-jade chip-mono">{{ q.tag }}</span>
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
                  note-id="NOTE-POL-UNION-EXEC"
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

        <!-- ── 07 · Advanced Practice (TGPSC Group-I 2024 Drills) ──────── -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="advanced-practice" section-label="Advanced Practice" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ advancedPractice.length }} drills</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="advanced-practice" section-label="Advanced Practice" note-title="Union Executive & Parliament" @open="openNotesDrawer" />

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
            <article v-for="(q, qi) in advancedPractice" :key="q.uid" class="panel panel-pad transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
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
                  note-id="NOTE-POL-UNION-EXEC"
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
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="gate" section-label="Comprehension Gate" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="gate" section-label="Comprehension Gate" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-POL-UNION-EXEC" />
        </section>

        <!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-POL-UNION-EXEC" section-id="current-affairs" section-label="Current Affairs" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-UNION-EXEC" section-id="current-affairs" section-label="Current Affairs" note-title="Union Executive & Parliament" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-POL-UNION-EXEC" />
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
            <p class="text-body-xs leading-relaxed t-lo">4-5 questions per paper, highest weight in Polity.</p>
          </div>
        </div>
      </aside>
    </div>

    <AiAssistantDrawer
      note-id="NOTE-POL-UNION-EXEC"
      note-title="Union Executive &amp; Parliament"
      :quick-prompts="aiQuickPrompts"
    />
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-POL-UNION-EXEC"
      note-title="Union Executive &amp; Parliament"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import CurrentAffairsStrip from '@/components/CurrentAffairsStrip.vue'
import ConstitutionalHierarchy from '@/components/visual/ConstitutionalHierarchy.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import type { SectionContext } from '@/types/annotations'

const aiQuickPrompts = useAiPromptChips('NOTE-POL-UNION-EXEC')

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Articles & Powers' },
  { label: 'Veto & Procedure' },
  { label: 'Lok Sabha Electorates' },
  { label: 'Speaker Rules' },
  { label: 'Committees' },
  { label: 'Historical Portfolios' },
]

const sections = [
  { id: 'president-vp',         label: 'President & Vice President' },
  { id: 'pm-com',               label: 'PM & Council of Ministers' },
  { id: 'parliament-structure', label: 'Lok Sabha & Rajya Sabha' },
  { id: 'officers-committees',  label: 'Officers & Committees' },
  { id: 'mnemonics',            label: 'Memory Mnemonics & Matrix' },
  { id: 'pyqs',                 label: 'Previous Year Questions' },
  { id: 'advanced-practice',    label: 'Advanced Practice' },
  { id: 'gate',                 label: 'Comprehension Gate' },
  { id: 'current-affairs',      label: 'Current Affairs' },
]

const readProgress = ref(0)
const activeSection = ref('president-vp')

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
  loadNotes()
  window.addEventListener('scroll', onScroll, { passive: true })
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
    "uid": "PYQ-0753",
    "exam": "Constable",
    "year": "2018",
    "tag": "President Veto",
    "source": "Constable 2018 Prelims · Q133",
    "question": "The President of India doesn't have which one of the following veto powers?",
    "options": [
      "Suspensive veto",
      "Pocket veto",
      "Absolute veto",
      "Qualified veto"
    ],
    "correct": 3,
    "explanation": "The President of India possesses Absolute Veto, Suspensive Veto, and Pocket Veto, but does not have a Qualified Veto. A Qualified Veto, which can be overridden by the legislature with an extraordinary majority, is a feature of the American Presidency rather than the Indian Constitution.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0756",
    "exam": "Constable",
    "year": "2018",
    "tag": "Prior Recommendation",
    "source": "Constable 2018 Prelims · Q136",
    "question": "Which one of following type of legislation can be made without the prior sanction or recommendation of the President?",
    "options": [
      "A bill which varies the definition of Agricultural income.",
      "A bill which affects the freedom of trade of commerce with other countries.",
      "Alteration of boundaries of an existing state.",
      "A bill which is money bill."
    ],
    "correct": 1,
    "explanation": "Under the Indian Constitution, prior recommendation of the President is required for Money Bills (Art. 117), state boundary alteration bills (Art. 3), and bills varying 'agricultural income' definitions (Art. 274). However, legislation regarding trade and commerce with foreign countries falls under the Union List (Entry 41) and does not require the President's prior sanction.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0767",
    "exam": "Constable",
    "year": "2018",
    "tag": "Acting Presidents",
    "source": "Constable 2018 Prelims · Q147",
    "question": "Which of these two following Vice Presidents acted as officiating Presidents of India?",
    "options": [
      "K.R. Narayanan & Krishna Kant",
      "B.D. Jatti & R. Venkatraman",
      "S. Radhakrishnan & V.V. Giri",
      "V.V. Giri & B.D. Jatti"
    ],
    "correct": 3,
    "explanation": "V.V. Giri became the acting President in May 1969 after the death of President Dr. Zakir Husain. Similarly, B.D. Jatti served as the acting President in February 1977 following the sudden demise of President Fakhruddin Ali Ahmed.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1137",
    "exam": "Constable",
    "year": "2023",
    "tag": "President Oath",
    "source": "Constable 2023 Mains Official · Q122",
    "question": "The oath or affirmation by Indian President will be in the presence of _____.",
    "options": [
      "Out going President",
      "Prime Minister of India",
      "Chief Justice of India",
      "Vice-President of India"
    ],
    "correct": 2,
    "explanation": "According to Article 60 of the Indian Constitution, the oath or affirmation of the President of India is administered by the Chief Justice of India. In the absence of the Chief Justice of India, it is administered by the senior-most judge of the Supreme Court available.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1161",
    "exam": "Constable",
    "year": "2023",
    "tag": "Chief Justice Acting",
    "source": "Constable 2023 Mains Official · Q146",
    "question": "Which Chief Justice of India became the acting President of India ?",
    "options": [
      "Justice H.J. Kania",
      "Justice Mohammad Hidayatullah",
      "Justice A.N. Ray",
      "Justice Hans Raj Khanna"
    ],
    "correct": 1,
    "explanation": "Justice Mohammad Hidayatullah served as the Chief Justice of India and acted as the President of India from July 20, 1969 to August 24, 1969 following the resignation of Vice President V.V. Giri. He is the only Chief Justice of India to have served as the Acting President.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1843",
    "exam": "SI",
    "year": "2016",
    "tag": "President Profile",
    "source": "SI 2016 Prelims Paper · Q175",
    "question": "Who among the following Presidents of India was associated with the Trade Union Movement in India ?",
    "options": [
      "V.V. Giri",
      "N. Sanjeeva Reddy",
      "Zakir Hussain",
      "R. Venkatraman"
    ],
    "correct": 0,
    "explanation": "V.V. Giri, the 4th President of India, was a pioneering leader in the trade union movement in India. He served as the President of the All India Trade Union Congress (AITUC) twice and played a crucial role in founding the All India Railwaymen's Federation.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3055",
    "exam": "SI",
    "year": "2023",
    "tag": "Council of Ministers",
    "source": "SI 2023 Mains General Studies · Q126",
    "question": "In Indian constitution, 'There shall be a council of ministers with prime minister at the head to aid and advice the President' is mentioned in ______ article.",
    "options": [
      "73",
      "74",
      "75",
      "76"
    ],
    "correct": 1,
    "explanation": "Article 74(1) of the Indian Constitution provides that there shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President, who shall act in accordance with such advice. Article 75 deals with the appointment and conditions of ministers, while Article 76 relates to the Attorney-General for India.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0302",
    "exam": "Constable",
    "year": "2015",
    "tag": "Government Formation",
    "source": "Constable 2015 Prelims · Q103",
    "question": "The formation of Council of Ministers Starts with",
    "options": [
      "The ordering of General Elections",
      "The appointment of Prime Minister",
      "The formal notification of the President",
      "The convening of Parliament session"
    ],
    "correct": 1,
    "explanation": "According to Article 75(1) of the Indian Constitution, the Prime Minister is appointed by the President first. The formation of the Council of Ministers begins with the appointment of the Prime Minister, on whose advice other ministers are subsequently appointed.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0167",
    "exam": "Constable",
    "year": "2015",
    "tag": "Collective Responsibility",
    "source": "Constable 2015 Mains · Q167",
    "question": "Assertion (A): Collective responsibility of cabinet signifies unity and coordination among members of the council of ministers\nReason (R): It is the prerogative of the Prime Minister to select or drop a member of the cabinet",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true and (R) is false",
      "(A) is false and (R) is true"
    ],
    "correct": 1,
    "explanation": "Both statements are correct. Collective responsibility under Article 75(3) mandates that the Council of Ministers functions as a team and remains jointly accountable to the Lok Sabha. While the Prime Minister's authority to appoint or remove ministers helps enforce cabinet discipline, the primary rationale of collective responsibility is joint parliamentary accountability, making R a true statement but not the direct conceptual explanation of A.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0966",
    "exam": "Constable",
    "year": "2022",
    "tag": "Cabinet Control",
    "source": "Constable 2022 Prelims · Q148",
    "question": "The Council of Ministers of Government of India is controlled by",
    "options": [
      "Rajya Sabha only",
      "Lok Sabha only",
      "Both Rajya Sabha and Lok Sabha",
      "None of the above"
    ],
    "correct": 1,
    "explanation": "According to Article 75(3) of the Constitution of India, the Council of Ministers is collectively responsible to the Lok Sabha (House of the People) only. Therefore, the executive branch remains in power only as long as it enjoys the confidence of the Lok Sabha, which can remove it by passing a No-Confidence Motion.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0200",
    "exam": "Constable",
    "year": "2015",
    "tag": "Cabinet Matching",
    "source": "Constable 2015 Mains · Q200",
    "question": "Match the following:\nMinister\n(a) H.M. Patel\n(b) Indrajit Gupta\n(c) Madhu Dandavate\n(d) George Fernandes\nUnion Government\n(i) Finance Minister, NF Government\n(ii) Defence Minister, NDA-I\n(iii) Finance Minister, Janata Government\n(iv) Home Minister, UF Government\nThe correct answer is",
    "options": [
      "a-ii, b-iv, c-i, d-iii",
      "a-iv, b-iii, c-i, d-ii",
      "a-iv, b-ii, c-i, d-iii",
      "a-iii, b-iv, c-i, d-ii"
    ],
    "correct": 3,
    "explanation": "H.M. Patel served as the Finance Minister in Morarji Desai's Janata Party Government (1977–1979). Indrajit Gupta was the Home Minister in the United Front Government (1996–1998). Madhu Dandavate was the Finance Minister in V.P. Singh's National Front Government (1989–1990), and George Fernandes was the Defence Minister in the NDA-I Government.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0315",
    "exam": "Constable",
    "year": "2015",
    "tag": "Union Ministers",
    "source": "Constable 2015 Prelims · Q118",
    "question": "Match the following: List-I Union Ministers (Feb. 2016) (a) Arun Jaitley (b) Anantha Kumar (c) Chaudhary Birendra Singh (d) Thawar Chand Gehlot List-II Portfolios (i) Panchayati Raj (ii) Social Justice and Empowerment (iii) Information and Broadcasting (iv) Chemicals and Fertilizers",
    "options": [
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)",
      "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)"
    ],
    "correct": 2,
    "explanation": "In February 2016, Arun Jaitley held the Information and Broadcasting portfolio alongside Finance. Anantha Kumar served as the Minister of Chemicals and Fertilizers, Chaudhary Birendra Singh was the Minister of Panchayati Raj and Rural Development, and Thawar Chand Gehlot was the Minister of Social Justice and Empowerment.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0878",
    "exam": "Constable",
    "year": "2022",
    "tag": "Cabinet Portfolios",
    "source": "Constable 2022 Prelims · Q59",
    "question": "Match the following lists. List I (Ministers) (A) Dr. Virendra Kumar (B) Dr. Mahendra Nath Pandey (C) Dr. Jitendra Singh (D) Dr. Subrahmanyam Jaishankar List II (Portfolio) (I) Heavy Industries (II) Social Justice and empowerment (III) Science and Technology (IV) External Affairs The correct answer/",
    "options": [
      "(A) - (II), (B) - (IV), (C) - (I), (D) - (III)",
      "(A) - (I), (B) - (II), (C) - (III), (D) - (IV)",
      "(A) - (III), (B) - (I), (C) - (II), (D) - (IV)",
      "(A) - (II), (B) - (I), (C) - (III), (D) - (IV)"
    ],
    "correct": 3,
    "explanation": "Dr. Virendra Kumar holds the portfolio of Social Justice and Empowerment, Dr. Mahendra Nath Pandey served as the Minister of Heavy Industries, Dr. Jitendra Singh oversees Science and Technology, and Dr. S. Jaishankar is the Minister of External Affairs.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0326",
    "exam": "Constable",
    "year": "2015",
    "tag": "Electorate Superlatives",
    "source": "Constable 2015 Prelims · Q129",
    "question": "The largest Parliamentary constituency in terms of number of voters is in",
    "options": [
      "Uttar Pradesh",
      "Telangana",
      "Andhra Pradesh",
      "Madhya Pradesh"
    ],
    "correct": 1,
    "explanation": "Malkajgiri Lok Sabha constituency in Telangana is the largest Parliamentary constituency in India in terms of the number of electors/voters. Conversely, Lakshadweep is the smallest constituency by number of voters, while Ladakh is the largest by geographic area.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0191",
    "exam": "Constable",
    "year": "2015",
    "tag": "Electorate Superlatives",
    "source": "Constable 2015 Mains · Q191",
    "question": "Smallest parliamentary constituency in terms of number of electors is",
    "options": [
      "Ladak",
      "Daman and Diu",
      "Lakshadweep",
      "Andaman and Nicobar island"
    ],
    "correct": 2,
    "explanation": "Lakshadweep is the smallest Lok Sabha constituency in India in terms of the total number of electors, having around 55,000 to 60,000 voters. In contrast, Malkajgiri in Telangana is the largest constituency by number of electors, and Ladakh is the largest by area.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0164",
    "exam": "Constable",
    "year": "2015",
    "tag": "Rajya Sabha Powers",
    "source": "Constable 2015 Mains · Q164",
    "question": "Assertion (A): The Parliament can legislate matters in State List in national interest. Reason (R) : Rajya Sabha is part of Parliament. The correct answer is",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true and (R) is not the correct explanation of (A)",
      "(A) is true and (R) is false",
      "(A) is false and (R) is true"
    ],
    "correct": 1,
    "explanation": "Both statements are correct facts. Under Article 249, Parliament can make laws on items in the State List if the Rajya Sabha passes a resolution by a two-thirds majority declaring it to be in the national interest; however, merely stating that Rajya Sabha is part of Parliament does not explain this specific constitutional mechanism.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0309",
    "exam": "Constable",
    "year": "2015",
    "tag": "Rajya Sabha Seats",
    "source": "Constable 2015 Prelims · Q111",
    "question": "Read the following statements\n(a) Andhra Pradesh and Gujarat have equal number of seats in Rajya Sabha\n(b) Rajasthan and Odisha have equal number of seats in Lok Sabha\n(c) Deputy Speaker of Lok Sabha is appointed by the Speaker\nThe correct answer is",
    "options": [
      "(a) is correct but (b) and (c) are wrong",
      "(c) and (a) are correct but (b) is wrong",
      "(a), (b) and (c) are correct",
      "(a), (b) and (c) are wrong"
    ],
    "correct": 0,
    "explanation": "Andhra Pradesh and Gujarat both have 11 seats in the Rajya Sabha, making statement (a) correct. Rajasthan has 25 Lok Sabha seats while Odisha has 21, making statement (b) incorrect. Under Article 93, the Deputy Speaker of Lok Sabha is elected by the members of the House from amongst themselves, not appointed by the Speaker, making statement (c) incorrect.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0313",
    "exam": "Constable",
    "year": "2015",
    "tag": "Rajya Sabha Nominated",
    "source": "Constable 2015 Prelims · Q116",
    "question": "Who among the following are nominated members of Rajya Sabha ?",
    "options": [
      "(1) K.T. Tulsi, K. Parasaran",
      "(2) Smt. B. Jayashree, Smt. Smriti Irani",
      "(3) M. Venkaiah Naidu, Javed Akhtar",
      "(4) P. Goverdhan Reddy, Sachin Tendulkar"
    ],
    "correct": 0,
    "explanation": "Under Article 80 of the Indian Constitution, the President nominates 12 members to the Rajya Sabha for their contributions to art, literature, science, and social services. Both K.T. Tulsi and K. Parasaran served as nominated members of the Rajya Sabha during their respective tenure.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0515",
    "exam": "Constable",
    "year": "2018",
    "tag": "Lok Sabha Seats",
    "source": "Constable 2018 Mains · Q94",
    "question": "Which one of the following statements is correct?",
    "options": [
      "Bihar has 40 Lok Sabha constituencies.",
      "Goa has one Lok Sabha constituency.",
      "Madhya Pradesh has twenty eight Lok Sabha constituencies.",
      "Meghalaya has three Lok Sabha constituencies."
    ],
    "correct": 0,
    "explanation": "Bihar has 40 Lok Sabha constituencies, making statement 1 correct. Goa has 2 Lok Sabha seats, Madhya Pradesh has 29 seats, and Meghalaya has 2 seats.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0517",
    "exam": "Constable",
    "year": "2018",
    "tag": "Lok Sabha Chronology",
    "source": "Constable 2018 Mains · Q96",
    "question": "Match the period of the following governments with the number of Lok Sabha concerned : List - I (Government) a. National Front b. Janata Party c. United Front d. Congress Party List - II (Lok Sabha) i. Tenth ii. Ninth iii. Sixth iv. Eleventh The correct answer is :",
    "options": [
      "ii iii i iv",
      "iii ii iv i",
      "ii iii iv i",
      "i iv ii iii"
    ],
    "correct": 2,
    "explanation": "The Janata Party formed the government during the 6th Lok Sabha (1977-1979). The National Front government governed during the 9th Lok Sabha (1989-1991). Congress held office under P.V. Narasimha Rao during the 10th Lok Sabha (1991-1996), and the United Front ruled during the 11th Lok Sabha (1996-1998).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0314",
    "exam": "Constable",
    "year": "2015",
    "tag": "Speaker Rules",
    "source": "Constable 2015 Prelims · Q117",
    "question": "Read the following statements\n(A) Speaker appoints the leader of Opposition\n(B) Speaker nominates two members to Lok Sabha\n(C) Speaker submits his resignation to President\nWhich of the statements given above is/are not correct ?",
    "options": [
      "(1) (A) and (B)",
      "(2) (A) and (C)",
      "(3) (B) and (C)",
      "(4) (A) only"
    ],
    "correct": 2,
    "explanation": "Statement (B) is incorrect because the President (not the Speaker) previously nominated two Anglo-Indian members to the Lok Sabha. Statement (C) is incorrect because under Article 94(b), the Speaker addresses their resignation letter to the Deputy Speaker, not the President.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0519",
    "exam": "Constable",
    "year": "2018",
    "tag": "Speaker Casting Vote",
    "source": "Constable 2018 Mains · Q98",
    "question": "'Casting Vote' to the Speaker of Lok Sabha is given in which Article of the Constitution?",
    "options": [
      "Article 100",
      "Article 101",
      "Article 102",
      "Article 103"
    ],
    "correct": 0,
    "explanation": "Article 100(1) of the Indian Constitution grants the Speaker of Lok Sabha (or Chairman of Rajya Sabha) a 'casting vote' in the case of an equality of votes (a tie). The Presiding Officer does not vote in the first instance.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0754",
    "exam": "Constable",
    "year": "2018",
    "tag": "Deputy Speaker Tradition",
    "source": "Constable 2018 Prelims · Q134",
    "question": "During which Lok Sabha's tenure the tradition of giving the post of Deputy Speaker to the nominee of opposition party began ?",
    "options": [
      "11th Lok Sabha",
      "12th Lok Sabha",
      "9th Lok Sabha",
      "10th Lok Sabha"
    ],
    "correct": 0,
    "explanation": "Since the 11th Lok Sabha (1996), a parliamentary convention was established wherein the Speaker of the Lok Sabha is chosen from the ruling party or coalition, while the post of Deputy Speaker is offered to the main opposition party.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0768",
    "exam": "Constable",
    "year": "2018",
    "tag": "Estimates Committee",
    "source": "Constable 2018 Prelims · Q148",
    "question": "Which one of the following statement is correct with regard to parliamentary committees?",
    "options": [
      "The members of the Estimates Committees are elected by Lok Shabha.",
      "Public Accounts Committee consists of 30 members.",
      "Committee on Empowerment of women is a departmentally related committee.",
      "Committee on Home affairs is a Joint Parliamentary Committee."
    ],
    "correct": 0,
    "explanation": "The Estimates Committee consists of 30 members who are exclusively elected from the Lok Sabha annually using proportional representation by single transferable vote. The Public Accounts Committee has 22 members (15 Lok Sabha, 7 Rajya Sabha), and the Committee on Home Affairs is a Departmentally Related Standing Committee (DRSC), not a JPC.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0301",
    "exam": "Constable",
    "year": "2015",
    "tag": "Money Bill Veto",
    "source": "Constable 2015 Prelims · Q102",
    "question": "Assertion (A): Money bill cannot be returned by the President to the Parliament\nReason (R) : Money bill is presented in the Lok Sabha with the permission of the President",
    "options": [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) (A) is false but (R) is true"
    ],
    "correct": 0,
    "explanation": "Both statements are true. A Money Bill is introduced in the Lok Sabha only with the prior recommendation (permission) of the President, which is why the President generally gives assent and cannot return it to Parliament for reconsideration under Article 111.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1107",
    "exam": "Constable",
    "year": "2023",
    "tag": "Money Bill Introduction",
    "source": "Constable 2023 Mains Official · Q90",
    "question": "Identify the following in which Money Bill cannot be introduced",
    "options": [
      "House of the People only",
      "Council of States only",
      "Both (1) and (2)",
      "None of the above"
    ],
    "correct": 1,
    "explanation": "According to Article 109(1) of the Indian Constitution, a Money Bill cannot be introduced in the Council of States (Rajya Sabha). It can only be introduced in the House of the People (Lok Sabha) on the prior recommendation of the President.",
    "revealed": false,
    "selected": null
  }
])

const activeExamFilter = ref('all')

const examFilters = [
  { label: 'All Exams (26)', value: 'all' },
  { label: 'Constable (21)', value: 'Constable' },
  { label: 'SI (5)', value: 'SI' }
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
    "uid": "ADV-POL-UNION-001",
    "question": "Consider the following statements regarding the President of India's legislative and veto powers:\n\nA. The President possesses Absolute Veto, Suspensive Veto, and Pocket Veto, but does NOT possess Qualified Veto.\nB. Under Article 111, the President cannot return a Money Bill to Parliament for reconsideration.\nC. A Bill altering the boundary or name of a State under Article 3 can be introduced in Parliament without the prior recommendation of the President.\nD. An Ordinance promulgated under Article 123 must be approved by Parliament within 6 weeks from its reassembly.\n\nWhich of the statements given above are correct?",
    "options": [
      "A, B and D only",
      "A and C only",
      "B, C and D only",
      "A, B, C and D"
    ],
    "correct": 0,
    "explanation": "Statements A, B, and D are correct. India does not have Qualified Veto (unlike the US Constitution). Money bills require prior recommendation and cannot be returned for reconsideration (Art 111). Ordinances under Art 123 lapse after 6 weeks from reassembly. Statement C is incorrect because Article 3 explicitly mandates the prior recommendation of the President before introduction.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0753, PYQ-0756, PYQ-0301)",
    "format": "Multi-statement",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-UNION-002",
    "question": "Match List-I (Constitutional Provisions) with List-II (Relevant Articles):\n\nList-I:\nA. Casting vote of Speaker in case of tie\nB. Council of Ministers to aid and advise President\nC. Rajya Sabha resolution authorising Parliament on State List\nD. Joint Sitting of both Houses of Parliament\n\nList-II:\nI. Article 74\nII. Article 100(1)\nIII. Article 108\nIV. Article 249\n\nChoose the correct answer:",
    "options": [
      "A-II, B-I, C-IV, D-III",
      "A-I, B-II, C-IV, D-III",
      "A-II, B-I, C-III, D-IV",
      "A-III, B-IV, C-I, D-II"
    ],
    "correct": 0,
    "explanation": "Article 100(1) grants Casting Vote to the Speaker during a tie; Article 74 establishes the Council of Ministers with PM to aid and advise the President; Article 249 empowers Rajya Sabha to authorize Parliament to legislate on the State List with a 2/3rd majority; Article 108 provides for a Joint Sitting of both Houses convened by the President.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0519, PYQ-3055, PYQ-0164, PYQ-2203)",
    "format": "Matching",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-UNION-003",
    "question": "Consider the following statements regarding the office of the Speaker of Lok Sabha:\n\nA. The Speaker submits his resignation letter to the Deputy Speaker of Lok Sabha.\nB. The Speaker decides whether a bill is a Money Bill or not, and his decision is final under Article 110(3).\nC. The Speaker appoints the Leader of the Opposition in Lok Sabha.\nD. In the absence of the Speaker and Deputy Speaker, the Deputy Chairman of Rajya Sabha presides over a Joint Sitting of Parliament.\n\nWhich of the statements given above are correct?",
    "options": [
      "A, B and D only",
      "A and B only",
      "B, C and D only",
      "A, B, C and D"
    ],
    "correct": 0,
    "explanation": "Statements A, B, and D are correct. The Speaker resigns to the Deputy Speaker (Art 94). The Speaker's decision on a Money Bill is final (Art 110(3)). If both Speaker and Deputy Speaker are absent, the Deputy Chairman of Rajya Sabha presides (Chairman of RS never presides over Joint Sittings as he is not a member of Parliament). Statement C is false: The Speaker does not appoint the Leader of Opposition; the leader of the largest opposition party securing at least 10% seats is recognised by statutory rule.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0314, PYQ-2203)",
    "format": "Multi-statement",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-UNION-004",
    "question": "Match the Prime Ministerial Governments with their respective Lok Sabha terms:\n\nList-I (Government / Coalition):\nA. Janata Party Government (Morarji Desai)\nB. National Front Government (V.P. Singh)\nC. Congress Government (P.V. Narasimha Rao)\nD. United Front Government (H.D. Deve Gowda)\n\nList-II (Lok Sabha Term):\nI. 11th Lok Sabha (1996-1998)\nII. 10th Lok Sabha (1991-1996)\nIII. 6th Lok Sabha (1977-1979)\nIV. 9th Lok Sabha (1989-1991)\n\nChoose the correct code:",
    "options": [
      "A-III, B-IV, C-II, D-I",
      "A-IV, B-III, C-II, D-I",
      "A-III, B-II, C-IV, D-I",
      "A-I, B-IV, C-II, D-III"
    ],
    "correct": 0,
    "explanation": "6th Lok Sabha (1977-1979) was Janata Party (Morarji Desai / Charan Singh); 9th Lok Sabha (1989-1991) was National Front (V.P. Singh / Chandra Shekhar); 10th Lok Sabha (1991-1996) was Congress (P.V. Narasimha Rao); 11th Lok Sabha (1996-1998) was United Front (Deve Gowda / I.K. Gujral).",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0517)",
    "format": "Matching",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-UNION-005",
    "question": "Consider the following statements regarding Parliamentary Committees:\n\nA. The Estimates Committee consists of 30 members, all elected exclusively from the Lok Sabha.\nB. The Public Accounts Committee (PAC) consists of 22 members (15 from Lok Sabha and 7 from Rajya Sabha).\nC. A Minister is eligible for election to both the Estimates Committee and Public Accounts Committee.\nD. The Chairman of the Public Accounts Committee is conventionally appointed by the Speaker from the Opposition party.\n\nWhich of the statements given above are correct?",
    "options": [
      "A, B and D only",
      "A and B only",
      "B and C only",
      "A, B, C and D"
    ],
    "correct": 0,
    "explanation": "Statements A, B, and D are correct. Estimates Committee has 30 members exclusively from Lok Sabha (0 from RS). PAC has 22 members (15 LS + 7 RS), with the Chairman conventionally appointed from the Opposition since 1967. Statement C is incorrect: A Minister CANNOT be elected or nominated to either the Estimates Committee, PAC, or Committee on Public Undertakings.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0768, PYQ-1554)",
    "format": "Multi-statement",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
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
