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
          <span class="t-mid">Historical Background (1773-1947)</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="chip chip-saffron"><span class="dot" />T1 · High priority</span>
              <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 2-3 Questions (2-3 Marks)</span>
              <span class="chip">{{ pyqs.length }} verified PYQs</span>
              <span class="chip">Polity</span>
            </div>
            <NuxtLink
              to="/study/historical-background-1773-1947"
              class="inline-flex items-center gap-2 rounded-lg border border-saffron-500/40 bg-saffron-500/10 px-3 py-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-300 transition-colors hover:bg-saffron-500/20"
            >
              <UIcon name="i-heroicons-book-open" class="h-4 w-4" />
              <span>Study Mode (3-Zone)</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Historical Background: Company Rule &amp; Crown Rule (1773-1947)
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Rigorous examination study notes covering British constitutional enactments from the 1773 Regulating Act to the 1947 Indian Independence Act: legislative centralization vs devolution, executive councils, communal representation, Dyarchy, 1935 Provincial Autonomy, and TGPRB exam traps.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />11 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />{{ pyqs.length }} verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~22 min read
            </span>
          </div>
        </header>

        <!-- Study Mode Switcher Banner -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 sm:p-5">
          <div class="flex items-center gap-3.5">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-saffron-500/15 text-saffron-600 dark:text-saffron-400">
              <UIcon name="i-heroicons-book-open" class="h-5 w-5" />
            </span>
            <div>
              <div class="flex items-center gap-2">
                <p class="text-[13.5px] font-bold t-hi">Prefer active recall study?</p>
                <span class="chip chip-jade chip-mono text-[10px]">Study Mode Live</span>
              </div>
              <p class="mt-0.5 text-[12px] t-mid leading-relaxed">
                Step through 6 screen-sized stages with section-bound PYQs, flashcards, and trap duels.
              </p>
            </div>
          </div>
          <NuxtLink
            to="/study/historical-background-1773-1947"
            class="inline-flex items-center gap-2 rounded-lg bg-saffron-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-saffron-600 dark:text-stone-900"
          >
            <UIcon name="i-heroicons-bolt" class="h-4 w-4" />
            <span>Open in Study Mode</span>
          </NuxtLink>
        </div>

        <!-- ══ Coverage strip · how TGPRB tests this topic ══ -->
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
            Mastering these core constitutional layers ensures 100% precision on historical British Acts asked across TGPRB SI &amp; Constable exams.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct Factual MCQs on <strong class="t-hi">1919 Dyarchy (Reserved vs Transferred subjects)</strong>, <strong class="t-hi">1909 Morley-Minto (Father of Communal Electorate)</strong>, and <strong class="t-hi">1935 GoI Act (Provincial Autonomy &amp; 3 Lists)</strong>. High-frequency trap: Confusing 1919 provincial dyarchy with 1935 central dyarchy (which never took effect).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · Visual Roadmap ──────────────────────────────────────── -->
        <section id="visual-roadmap" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Architecture &amp; Historical Roadmap</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="visual-roadmap" section-label="Visual Architecture &amp; Historical Roadmap" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">1773-1947 Timeline</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="visual-roadmap" section-label="Visual Architecture &amp; Historical Roadmap" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

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
                Progressive centralization: British parliamentary oversight established over the East India Company, culminating in total centralization by 1833.
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
                  <span class="t-mid"><strong class="t-hi">Charter Act:</strong> Apex of centralization; Governor-General of India (William Bentinck); Macaulay Law Member; commercial monopoly ended entirely.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">1853</span>
                  <span class="t-mid"><strong class="t-hi">Charter Act:</strong> Separated executive &amp; legislative wings; 6-member Indian Legislative Council; open competition for ICS (1854).</span>
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
                Direct Crown governance: Post-1857 legislative decentralization, expansion of representative institutions, provincial dyarchy, autonomy, and independence.
              </p>
              <div class="space-y-2 text-xs">
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1858</span>
                  <span class="t-mid"><strong class="t-hi">GoI Act:</strong> Good Government of India; Viceroy of India (Lord Canning); Secretary of State + 15-member Council of India.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1861</span>
                  <span class="t-mid"><strong class="t-hi">Councils Act:</strong> Legislative decentralization; 3 Indians nominated (Benaras, Patiala, Dinkar Rao); Portfolio system &amp; Ordinances.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1892</span>
                  <span class="t-mid"><strong class="t-hi">Councils Act:</strong> Legislative functions enlarged; right to discuss budget and address questions to executive; indirect election principle.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1909</span>
                  <span class="t-mid"><strong class="t-hi">Morley-Minto Reforms:</strong> Communal representation (separate electorates for Muslims); Satyendra Prasad Sinha in Viceroy Executive Council.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1919</span>
                  <span class="t-mid"><strong class="t-hi">Mont-Ford Reforms:</strong> Provincial Dyarchy (Reserved vs Transferred); Bicameralism at Centre; separate provincial budget.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1935</span>
                  <span class="t-mid"><strong class="t-hi">GoI Act:</strong> Provincial Autonomy (Dyarchy abolished in provinces); 3 Lists; Federal Court (1937); Reserve Bank.</span>
                </div>
                <div class="p-2 rounded bg-sub border b-line flex items-start gap-2">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">1947</span>
                  <span class="t-mid"><strong class="t-hi">Independence Act:</strong> Partition into two sovereign Dominions (India &amp; Pakistan); lapse of British paramountcy; Mountbatten Viceroy.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 02 · Company Rule Acts (1773-1853) ───────────────────────── -->
        <section id="company-rule" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Company Rule Acts (1773-1853)</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="company-rule" section-label="Company Rule Acts (1773-1853)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Centralization Phase</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="company-rule" section-label="Company Rule Acts (1773-1853)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- 1773 Regulating Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1773</span>
                  Regulating Act of 1773
                </h3>
                <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold">First Parliamentary Control</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Governor-General of Bengal:</strong> Redesignated Governor of Bengal as Governor-General of Bengal. First was <strong class="t-hi">Lord Warren Hastings</strong>. Created 4-member Executive Council to assist him.</li>
                <li><strong class="t-hi">Subordination of Presidencies:</strong> Made the Governors of Bombay and Madras subordinate to the Governor-General of Bengal in foreign and war affairs.</li>
                <li><strong class="t-hi">Supreme Court at Calcutta (1774):</strong> Established at Fort William with 1 Chief Justice and 3 regular judges. First Chief Justice: <strong class="t-hi">Sir Elijah Impey</strong>.</li>
                <li><strong class="t-hi">Prohibition on Private Trade:</strong> Prohibited Company servants from engaging in private trade or accepting presents and bribes from natives.</li>
                <li><strong class="t-hi">Court of Directors:</strong> Mandated reporting on revenue, civil, and military affairs to the British Government.</li>
              </ul>
            </div>

            <!-- 1784 Pitt's India Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1784</span>
                  Pitt's India Act of 1784
                </h3>
                <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold">System of Double Government</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Double Government:</strong> Distinguished commercial and political functions. Court of Directors retained commercial management; a new 6-member <strong class="t-hi">Board of Control</strong> supervised civil, military, and revenue affairs.</li>
                <li><strong class="t-hi">"British Possessions in India":</strong> Company territories in India were named "British possessions in India" for the first time in official British statute.</li>
                <li><strong class="t-hi">Governor-General's Council Reduced:</strong> Council strength reduced from 4 to 3 members to facilitate decisive voting by the Governor-General.</li>
              </ul>
            </div>

            <!-- 1813 Charter Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1813</span>
                  Charter Act of 1813
                </h3>
                <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold">End of General Trade Monopoly</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Trade Monopoly Ended:</strong> Abolished EIC commercial monopoly over Indian trade, opening it to all private British merchants. Retained monopoly strictly in <strong class="t-hi">Tea trade</strong> and <strong class="t-hi">Trade with China</strong>.</li>
                <li><strong class="t-hi">Education Allocation:</strong> Mandated annual expenditure of <strong class="t-hi">Rs 1,00,000 (One Lakh)</strong> for the revival and promotion of literature and modern science among Indians [PYQ-0925].</li>
                <li><strong class="t-hi">Christian Missionaries:</strong> Permitted Christian missionaries to enter India under license to preach and educate.</li>
              </ul>
            </div>

            <!-- 1833 Charter Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1833</span>
                  Charter Act of 1833 (Saint Helena Act)
                </h3>
                <span class="text-xs text-red-500 font-semibold">Apex of Legislative Centralization</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Governor-General of India:</strong> Redesignated Governor-General of Bengal as <strong class="t-hi">Governor-General of India</strong>. First: <strong class="t-hi">Lord William Bentinck</strong>. Vested full civil and military powers.</li>
                <li><strong class="t-hi">Abolition of Presidencies' Lawmaking:</strong> Governors of Bombay and Madras completely stripped of their legislative powers; exclusive lawmaking authority vested in Governor-General in Council.</li>
                <li><strong class="t-hi">Commercial Monopoly Terminated:</strong> Completely ended all commercial activities of EIC (including tea and China). Company became a purely administrative trustee for the British Crown.</li>
                <li><strong class="t-hi">Law Member Added:</strong> Added 4th member (<strong class="t-hi">Lord Thomas Babington Macaulay</strong>) to Executive Council for legislative purposes only, initiating the First Law Commission (1834) and Indian Penal Code (IPC).</li>
              </ul>
            </div>

            <!-- 1853 Charter Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1853</span>
                  Charter Act of 1853
                </h3>
                <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold">Birth of Mini-Parliament</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Separation of Powers:</strong> For the first time, separated legislative and executive functions of the Governor-General's Council. Added 6 legislative councillors to form the <strong class="t-hi">Indian (Central) Legislative Council</strong>.</li>
                <li><strong class="t-hi">Open Civil Service Competition:</strong> Threw open recruitment to the covenanted civil service through open competitive examination. Led to the appointment of the <strong class="t-hi">Macaulay Committee on the Indian Civil Service (1854)</strong>.</li>
                <li><strong class="t-hi">Local Representation:</strong> Introduced local representation in the Central Legislative Council: 4 out of 6 legislative members appointed by provincial governments of Madras, Bombay, Bengal, and Agra.</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 03 · Crown Rule: Early Devolution (1858-1892) ─────────────── -->
        <section id="crown-devolution" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Crown Rule: Direct Administration &amp; Early Devolution (1858-1892)</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="crown-devolution" section-label="Crown Rule: Early Devolution (1858-1892)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Post-1857 Transformation</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="crown-devolution" section-label="Crown Rule: Early Devolution (1858-1892)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- 1858 GoI Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1858</span>
                  Government of India Act 1858 (Act for Better Government of India)
                </h3>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Crown Takeover</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Enacted in the immediate wake of the 1857 Revolt (Sepoy Mutiny). Liquidated the East India Company and transferred powers of government, territories, and revenues directly to the British Crown [PYQ-3003].
              </p>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Viceroy of India:</strong> Changed designation of Governor-General of India to <strong class="t-hi">Viceroy of India</strong> (direct representative of the Crown). First Viceroy: <strong class="t-hi">Lord Canning</strong>.</li>
                <li><strong class="t-hi">Secretary of State for India:</strong> Created new cabinet office in London: <strong class="t-hi">Secretary of State for India</strong>, member of British Cabinet, responsible to Parliament.</li>
                <li><strong class="t-hi">Council of India:</strong> Established 15-member advisory body in London to assist the Secretary of State (corporate body capable of suing and being sued).</li>
                <li><strong class="t-hi">Abolition of Double Government:</strong> Abolished both the Court of Directors and the Board of Control.</li>
              </ul>
            </div>

            <!-- 1861 Councils Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1861</span>
                  Indian Councils Act of 1861
                </h3>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Initiation of Decentralization</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Association of Indians in Lawmaking:</strong> Mandated nomination of non-official Indian members to Viceroy Legislative Council. In 1862, Lord Canning nominated three Indians: <strong class="t-hi">Raja of Benaras</strong>, <strong class="t-hi">Maharaja of Patiala</strong>, and <strong class="t-hi">Sir Dinkar Rao</strong>.</li>
                <li><strong class="t-hi">Legislative Devolution:</strong> Reversed 1833 centralization by restoring legislative powers to the Presidencies of Bombay and Madras. Established new legislative councils for Bengal (1862), NWFP (1886), and Punjab (1897).</li>
                <li><strong class="t-hi">Portfolio System:</strong> Statutorily recognized the portfolio system introduced by Lord Canning in 1859 (member placed in charge of one or more departments, issuing orders on behalf of Council).</li>
                <li><strong class="t-hi">Ordinance-Making Power:</strong> Empowered Viceroy to issue ordinances during emergency without council concurrence (valid for 6 months).</li>
              </ul>
            </div>

            <!-- 1892 Councils Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1892</span>
                  Indian Councils Act of 1892
                </h3>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Budgetary Discussion Powers</span>
              </div>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Enlarged Legislative Functions:</strong> Granted members the right to <strong class="t-hi">discuss the annual budget</strong> and <strong class="t-hi">address questions to the executive</strong> (with 6 days prior notice). However, members could neither vote on the budget nor ask supplementary questions [PYQ-0520].</li>
                <li><strong class="t-hi">Indirect Election Principle:</strong> Provided for nomination of non-official members to Central Council on recommendation of provincial councils and Bengal Chamber of Commerce, and to provincial councils on recommendation of universities, district boards, and municipalities. (Word "election" was carefully avoided in the text).</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 04 · Crown Rule: Reforms (1909-1919) ──────────────────────── -->
        <section id="crown-representation" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Crown Rule: Communal Representation &amp; Dyarchy (1909-1919)</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="crown-representation" section-label="Crown Rule: Reforms (1909-1919)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Representative Experiments</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="crown-representation" section-label="Crown Rule: Reforms (1909-1919)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- 1909 Morley-Minto Reforms -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1909</span>
                  Indian Councils Act 1909 (Morley-Minto Reforms)
                </h3>
                <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold">Communal Electorates Introduced</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Named after <strong class="t-hi">Lord Morley</strong> (Secretary of State for India in London) and <strong class="t-hi">Lord Minto</strong> (Viceroy of India in Calcutta) [PYQ-0758, PYQ-3073].
              </p>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Separate Electorates for Muslims:</strong> Introduced communal representation for Muslims where Muslim members could only be elected by Muslim voters. Lord Minto came to be known as the <strong class="t-hi">"Father of Communal Electorate"</strong>.</li>
                <li><strong class="t-hi">Enlarged Councils:</strong> Central Legislative Council size increased from 16 to 60. Maintained official majority at Centre, but allowed non-official majority in Provincial Legislative Councils.</li>
                <li><strong class="t-hi">Deliberative Powers:</strong> Members allowed to move resolutions on the budget, ask supplementary questions, and discuss matters of public interest.</li>
                <li><strong class="t-hi">Indians in Executive Council:</strong> For the first time, provided for association of Indians with the Viceroy's Executive Council. <strong class="t-hi">Satyendra Prasad Sinha</strong> became the first Indian appointed to Viceroy's Executive Council (appointed as Law Member).</li>
              </ul>
            </div>

            <!-- 1919 Montagu-Chelmsford Reforms -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1919</span>
                  Government of India Act 1919 (Montagu-Chelmsford Reforms)
                </h3>
                <span class="text-xs text-red-500 font-semibold">Provincial Dyarchy &amp; Bicameralism</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Enacted based on the August Declaration 1917 ("responsible government"). Named after Edwin Montagu (Secretary of State) and Lord Chelmsford (Viceroy). Came into operation in 1921.
              </p>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Provincial Dyarchy:</strong> Divided provincial subjects into two categories:
                  <ul class="list-circle pl-5 mt-1 space-y-1">
                    <li><strong class="t-hi">Transferred Subjects:</strong> Administered by the Governor with the advice of Ministers responsible to the Legislative Council (e.g. Local Self-Government, Public Health, Education, Agriculture) [PYQ-0759].</li>
                    <li><strong class="t-hi">Reserved Subjects:</strong> Administered by the Governor and his Executive Council without legislative accountability (e.g. Police, Land Revenue, Justice, Finance, Irrigation) [PYQ-0759].</li>
                  </ul>
                </li>
                <li><strong class="t-hi">Bicameralism at Centre:</strong> Introduced bicameral legislature at the Centre: Council of State (Upper House) and Legislative Assembly (Lower House) [PYQ-0690].</li>
                <li><strong class="t-hi">Separation of Budgets:</strong> First time separated provincial budgets from central budgets, empowering provincial legislatures to enact their own budgets [PYQ-1560].</li>
                <li><strong class="t-hi">Extension of Communal Electorates:</strong> Extended separate electorates to Sikhs, Indian Christians, Anglo-Indians, and Europeans [PYQ-0520].</li>
                <li><strong class="t-hi">Franchise Restrictions:</strong> Franchise granted to limited electorate based on property, tax, and education; universal adult franchise was strictly NOT introduced [PYQ-0690].</li>
                <li><strong class="t-hi">Statutory Commission:</strong> Mandated appointment of a statutory commission after 10 years to inquire into the working of the Act (resulted in the Simon Commission in 1927) [PYQ-1086].</li>
                <li><strong class="t-hi">Public Service Commission:</strong> Provided for the establishment of a Central Public Service Commission (set up in 1926 under Lee Commission recommendations).</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 05 · Crown Rule: Federation & Independence (1935-1947) ────── -->
        <section id="crown-federal" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Crown Rule: Federation, Autonomy &amp; Independence (1935-1947)</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="crown-federal" section-label="Crown Rule: Federation &amp; Independence (1935-1947)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Blueprint for Indian Constitution</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="crown-federal" section-label="Crown Rule: Federation &amp; Independence (1935-1947)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <div class="space-y-6">
            <!-- 1935 GoI Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1935</span>
                  Government of India Act 1935
                </h3>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Provincial Autonomy &amp; 3 Lists</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Longest and most detailed British enactment for India (321 sections and 10 schedules). Served as the primary structural blueprint for the Constitution of India 1950.
              </p>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">All-India Federation:</strong> Envisaged a federation of British Indian provinces and princely states. Never materialized because princely states refused to join.</li>
                <li><strong class="t-hi">Provincial Autonomy:</strong> Abolished provincial dyarchy. Provinces established as autonomous units of administration; Governors required to act on advice of ministers responsible to provincial legislatures (took effect in 1937, resigned in 1939).</li>
                <li><strong class="t-hi">Dyarchy at Centre (Proposed):</strong> Provided for division of federal subjects into Reserved (Defence, Foreign Affairs, Ecclesiastical, Tribal) and Transferred, but this central dyarchy never took effect.</li>
                <li><strong class="t-hi">Division of Powers into Three Lists:</strong>
                  <ul class="list-circle pl-5 mt-1 space-y-1">
                    <li><strong class="t-hi">Federal List:</strong> 59 items (Foreign Affairs, Defence, Currency).</li>
                    <li><strong class="t-hi">Provincial List:</strong> 54 items (Police, Public Order, Education).</li>
                    <li><strong class="t-hi">Concurrent List:</strong> 36 items (Civil procedure, Criminal law).</li>
                  </ul>
                </li>
                <li><strong class="t-hi">Residuary Powers Trap:</strong> Residuary powers were vested neither in Federal nor Provincial legislatures, but in the <strong class="t-hi">Governor-General (Viceroy)</strong> in his discretion (Contrast with Art 248 of modern Constitution which vests residuary powers in Parliament).</li>
                <li><strong class="t-hi">Federal Court &amp; Institutions:</strong> Established the <strong class="t-hi">Federal Court in 1937</strong> (Sir Maurice Gwyer as first Chief Justice), Reserve Bank of India (1935), and Federal Public Service Commission.</li>
                <li><strong class="t-hi">Provincial Bicameralism:</strong> Introduced bicameralism in 6 out of 11 provinces: Bengal, Bombay, Madras, Bihar, Assam, and United Provinces.</li>
              </ul>
            </div>

            <!-- 1947 Independence Act -->
            <div class="panel panel-pad bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold t-hi flex items-center gap-2">
                  <span class="chip chip-saffron chip-mono text-[11px]">1947</span>
                  Indian Independence Act 1947
                </h3>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Sovereign Dominions Created</span>
              </div>
              <p class="text-xs t-mid mb-3 leading-relaxed">
                Formulated based on the Mountbatten Plan of June 3, 1947. Introduced in British Parliament on July 4, 1947, passed by Commons on July 15, and received Royal Assent on July 18, 1947 [PYQ-1560].
              </p>
              <ul class="list-disc pl-5 text-xs t-mid space-y-1.5 leading-relaxed">
                <li><strong class="t-hi">Termination of British Rule:</strong> Declared India an independent and sovereign state from August 15, 1947.</li>
                <li><strong class="t-hi">Partition &amp; Two Dominions:</strong> Created two independent sovereign Dominions: India and Pakistan.</li>
                <li><strong class="t-hi">Abolition of Viceroy &amp; Secretary of State:</strong> Abolished the office of Viceroy (designated Governor-General for each Dominion, appointed by King on advice of Dominion Cabinet) and abolished the Secretary of State for India.</li>
                <li><strong class="t-hi">Constituent Assemblies Sovereign:</strong> Empowered Constituent Assemblies of both Dominions to legislate for their territories and repeal any British act, including the Independence Act itself.</li>
                <li><strong class="t-hi">Lapse of British Paramountcy:</strong> Declared lapse of British suzerainty over Indian princely states and treaty relations with tribal areas, granting them freedom to join either Dominion or remain independent.</li>
                <li><strong class="t-hi">Last Viceroy:</strong> <strong class="t-hi">Lord Mountbatten</strong> served as last Viceroy of British India and first Governor-General of the Dominion of India [PYQ-3126].</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 06 · Evolution Comparison Matrix ─────────────────────────── -->
        <section id="comparison-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Comprehensive Evolution Comparison Matrix</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="comparison-matrix" section-label="Comprehensive Evolution Comparison Matrix" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Office &amp; Power Progression</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="comparison-matrix" section-label="Comprehensive Evolution Comparison Matrix" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <!-- Table: Office of Supreme Executive -->
          <div class="panel overflow-hidden border b-line mb-8">
            <div class="bg-sub px-4 py-3 border-b b-line font-bold text-xs uppercase tracking-wider t-hi flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-amber-500" />
              Evolution of the Supreme Executive (1773-1947)
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b b-line bg-sub/50">
                    <th class="p-3 font-semibold t-hi">Designation</th>
                    <th class="p-3 font-semibold t-hi">Enactment</th>
                    <th class="p-3 font-semibold t-hi">First Incumbent</th>
                    <th class="p-3 font-semibold t-hi">Key Constitutional Authority</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="p-3 font-medium t-hi">Governor-General of Bengal</td>
                    <td class="p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400">Regulating Act 1773</td>
                    <td class="p-3 font-semibold t-hi">Lord Warren Hastings</td>
                    <td class="p-3 t-mid">Executive Council of 4 members; Bombay &amp; Madras subordinate in war/treaty.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium t-hi">Governor-General of India</td>
                    <td class="p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400">Charter Act 1833</td>
                    <td class="p-3 font-semibold t-hi">Lord William Bentinck</td>
                    <td class="p-3 t-mid">Apex centralization; exclusive lawmaking for all British India; Macaulay Law Member.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium t-hi">Viceroy &amp; Governor-General of India</td>
                    <td class="p-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">GoI Act 1858</td>
                    <td class="p-3 font-semibold t-hi">Lord Canning</td>
                    <td class="p-3 t-mid">Direct representative of British Crown; reported to Secretary of State for India in London.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium t-hi">Last Viceroy of British India</td>
                    <td class="p-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">Independence Act 1947</td>
                    <td class="p-3 font-semibold t-hi">Lord Mountbatten</td>
                    <td class="p-3 t-mid">Oversaw partition and transition to Dominion status [PYQ-3126].</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium t-hi">First &amp; Only Indian Governor-General</td>
                    <td class="p-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">Dominion of India (1948-50)</td>
                    <td class="p-3 font-semibold t-hi">C. Rajagopalachari</td>
                    <td class="p-3 t-mid">Served from June 1948 until the Constitution took effect on 26 January 1950.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Table: Expansion of Franchise & Electorates -->
          <div class="panel overflow-hidden border b-line">
            <div class="bg-sub px-4 py-3 border-b b-line font-bold text-xs uppercase tracking-wider t-hi flex items-center gap-2">
              <UIcon name="i-heroicons-envelope-open" class="h-4 w-4 text-emerald-500" />
              Evolution of Legislative Powers &amp; Separate Electorates
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b b-line bg-sub/50">
                    <th class="p-3 font-semibold t-hi">Act</th>
                    <th class="p-3 font-semibold t-hi">Legislative Development</th>
                    <th class="p-3 font-semibold t-hi">Electoral &amp; Representative Scope</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">1861</td>
                    <td class="p-3 t-mid">Legislative devolution restored to Bombay &amp; Madras; portfolio system legalized.</td>
                    <td class="p-3 t-mid">Nomination of 3 non-official Indians (Benaras, Patiala, Dinkar Rao).</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">1892</td>
                    <td class="p-3 t-mid">Right to discuss budget and ask questions to executive (no voting on budget).</td>
                    <td class="p-3 t-mid">Indirect election recommendations from universities, chambers of commerce [PYQ-0520].</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">1909</td>
                    <td class="p-3 t-mid">Non-official majority in provinces; supplementary questions allowed.</td>
                    <td class="p-3 t-mid">Separate electorates for <strong class="t-hi">Muslims</strong>; Satyendra Prasad Sinha in Executive Council [PYQ-0758, PYQ-3073].</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">1919</td>
                    <td class="p-3 t-mid">Bicameral central legislature; Dyarchy in provinces; provincial budget separated.</td>
                    <td class="p-3 t-mid">Extended separate electorates to <strong class="t-hi">Sikhs, Anglo-Indians, Christians, Europeans</strong>; restricted franchise [PYQ-0690, PYQ-0520].</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">1935</td>
                    <td class="p-3 t-mid">Provincial Autonomy; 3 legislative lists; bicameralism in 6 provinces; Federal Court.</td>
                    <td class="p-3 t-mid">Extended separate electorates to <strong class="t-hi">Depressed Classes (SC), Women, and Labour</strong>; ~10% population franchised.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ── 07 · TGPRB Exam Trap Matrix ──────────────────────────────── -->
        <section id="trap-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">TGPRB High-Frequency Exam Traps</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="trap-matrix" section-label="TGPRB High-Frequency Exam Traps" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Deadly Contrast Pairs</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="trap-matrix" section-label="TGPRB High-Frequency Exam Traps" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Trap 1: Dyarchy 1919 vs 1935 -->
            <div class="panel panel-pad bg-elev border border-red-500/30">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 shrink-0" />
                TRAP 1: Dyarchy (1919 vs 1935)
              </div>
              <p class="text-xs t-mid leading-relaxed mb-2">
                <strong class="text-amber-500">1919 Act:</strong> Introduced Dyarchy in <strong class="t-hi">PROVINCES</strong> (Reserved vs Transferred subjects). Bicameralism at Centre.
              </p>
              <p class="text-xs t-mid leading-relaxed">
                <strong class="text-emerald-500">1935 Act:</strong> <strong class="t-hi">ABOLISHED</strong> Dyarchy in provinces (introduced Provincial Autonomy) and proposed Dyarchy at <strong class="t-hi">CENTRE</strong> (which never came into force).
              </p>
            </div>

            <!-- Trap 2: Residuary Powers 1935 vs Modern India -->
            <div class="panel panel-pad bg-elev border border-red-500/30">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 shrink-0" />
                TRAP 2: Residuary Legislative Powers
              </div>
              <p class="text-xs t-mid leading-relaxed mb-2">
                <strong class="text-amber-500">GoI Act 1935:</strong> Residuary powers were vested in the <strong class="t-hi">Governor-General (Viceroy)</strong> in his personal discretion.
              </p>
              <p class="text-xs t-mid leading-relaxed">
                <strong class="text-emerald-500">Indian Constitution (Art 248):</strong> Residuary powers belong to <strong class="t-hi">PARLIAMENT</strong> (Canada model), NOT the President.
              </p>
            </div>

            <!-- Trap 3: Commercial Monopoly Abolition 1813 vs 1833 -->
            <div class="panel panel-pad bg-elev border border-red-500/30">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 shrink-0" />
                TRAP 3: Trade Monopoly Abolition (1813 vs 1833)
              </div>
              <p class="text-xs t-mid leading-relaxed mb-2">
                <strong class="text-amber-500">1813 Charter Act:</strong> Abolished general trade monopoly, but <strong class="t-hi">PRESERVED</strong> monopoly on <strong class="t-hi">Tea trade &amp; China trade</strong>.
              </p>
              <p class="text-xs t-mid leading-relaxed">
                <strong class="text-emerald-500">1833 Charter Act:</strong> <strong class="t-hi">COMPLETELY ENDED</strong> all commercial activity, making EIC purely an administrative body.
              </p>
            </div>

            <!-- Trap 4: Open Civil Services 1833 vs 1853 -->
            <div class="panel panel-pad bg-elev border border-red-500/30">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 shrink-0" />
                TRAP 4: Open Civil Services Competition
              </div>
              <p class="text-xs t-mid leading-relaxed mb-2">
                <strong class="text-amber-500">1833 Charter Act:</strong> <strong class="t-hi">Attempted</strong> to introduce open competition, but negated due to strong opposition from Court of Directors.
              </p>
              <p class="text-xs t-mid leading-relaxed">
                <strong class="text-emerald-500">1853 Charter Act:</strong> <strong class="t-hi">Successfully introduced</strong> open competition; Macaulay Committee on Civil Services appointed in 1854.
              </p>
            </div>

            <!-- Trap 5: Secretary of State vs Viceroy -->
            <div class="panel panel-pad bg-elev border border-red-500/30">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 shrink-0" />
                TRAP 5: Morley vs Minto Roles (1909)
              </div>
              <p class="text-xs t-mid leading-relaxed mb-2">
                <strong class="text-amber-500">Lord Morley:</strong> Secretary of State for India (stationed in London, Cabinet minister) [PYQ-0758].
              </p>
              <p class="text-xs t-mid leading-relaxed">
                <strong class="text-emerald-500">Lord Minto:</strong> Viceroy &amp; Governor-General of India (stationed in India) [PYQ-0758].
              </p>
            </div>

            <!-- Trap 6: Budget Powers 1892 vs 1919 -->
            <div class="panel panel-pad bg-elev border border-red-500/30">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 shrink-0" />
                TRAP 6: Budgetary Evolution (1892 vs 1919)
              </div>
              <p class="text-xs t-mid leading-relaxed mb-2">
                <strong class="text-amber-500">1892 Act:</strong> Members could <strong class="t-hi">discuss</strong> the budget, but could NOT vote or move resolutions [PYQ-0520].
              </p>
              <p class="text-xs t-mid leading-relaxed">
                <strong class="text-emerald-500">1919 Act:</strong> Separated <strong class="t-hi">Provincial Budget from Central Budget</strong>, giving provinces independent budgeting authority [PYQ-1560].
              </p>
            </div>
          </div>
        </section>

        <!-- ── 08 · Previous Year Questions (PYQs) ─────────────────────── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Previous Year Questions (PYQs)</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="pyqs" section-label="Previous Year Questions (PYQs)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">100% TGPRB Verified</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="pyqs" section-label="Previous Year Questions (PYQs)" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <!-- Filter chips & Score tracker -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="f in examFilters"
                :key="f.value"
                class="chip transition-colors"
                :class="activeExamFilter === f.value ? 'chip-saffron font-bold' : 'hover:bg-sub'"
                @click="activeExamFilter = f.value"
              >
                {{ f.label }}
              </button>
            </div>
            <div class="text-xs t-mid">
              Attempted: <span class="font-bold text-amber-500 font-mono">{{ attemptedCount }}/{{ filteredPyqs.length }}</span>
              <span class="mx-1.5">·</span>
              Correct: <span class="font-bold text-emerald-500 font-mono">{{ correctCount }}</span>
            </div>
          </div>

          <!-- PYQ Interactive Cards -->
          <div class="space-y-4">
            <div
              v-for="q in filteredPyqs"
              :key="q.uid"
              class="panel panel-pad bg-elev border b-line"
            >
              <div class="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b b-line">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">{{ q.uid }}</span>
                  <span class="chip text-[10px]">{{ q.source }}</span>
                </div>
                <span class="chip chip-mono text-[10px]">{{ q.tag }}</span>
              </div>

              <p class="text-xs font-medium t-hi mb-3 whitespace-pre-line leading-relaxed">{{ q.question }}</p>

              <!-- Options -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <button
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  class="p-2.5 rounded text-left text-xs border transition-colors flex items-start gap-2"
                  :class="optionClass(q, oi)"
                  :disabled="q.revealed"
                  @click="attempt(q, oi)"
                >
                  <span class="font-mono font-bold shrink-0">{{ String.fromCharCode(65 + oi) }}.</span>
                  <span class="leading-tight">{{ opt }}</span>
                </button>
              </div>

              <!-- Explanation -->
              <div v-if="q.revealed" class="mt-3 p-3 rounded bg-sub border b-line text-xs">
                <p class="font-bold mb-1" :class="q.selected === q.correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'">
                  {{ q.selected === q.correct ? '✔ Correct' : '✖ Incorrect (Correct answer: ' + String.fromCharCode(65 + q.correct) + ')' }}
                </p>
                <p class="t-mid leading-relaxed">{{ q.explanation }}</p>
              </div>
              <div v-else class="flex justify-end">
                <button class="text-[11px] text-amber-600 dark:text-amber-400 font-medium hover:underline" @click="reveal(q)">
                  Show Explanation
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 09 · Advanced Practice (TGPSC Hardening) ────────────────── -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Advanced Practice</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="advanced-practice" section-label="Advanced Practice" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">TGPSC-Style Drills</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="advanced-practice" section-label="Advanced Practice" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />

          <!-- Pedagogical disclaimer banner -->
          <div class="mb-6 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-academic-cap" class="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">TGPSC-Style Advanced Hardening Practice</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                While TGPRB SI/Constable exams historically feature 92-93.5% direct factual MCQs, the following drills model higher-complexity multi-statement and matching questions for conceptual depth and 2026 format preparedness.
              </p>
            </div>
          </div>

          <!-- Interactive Advanced Drills -->
          <div class="space-y-4">
            <div
              v-for="adv in advancedPractice"
              :key="adv.uid"
              class="panel panel-pad bg-elev border border-indigo-500/20"
            >
              <div class="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b b-line">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{{ adv.uid }}</span>
                  <span class="chip text-[10px] bg-indigo-500/10 text-indigo-500 border-indigo-500/30">{{ adv.format }}</span>
                </div>
                <span class="text-[11px] text-indigo-500/80 font-mono">{{ adv.source }}</span>
              </div>

              <p class="text-xs font-medium t-hi mb-3 whitespace-pre-line leading-relaxed">{{ adv.question }}</p>

              <!-- Options -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <button
                  v-for="(opt, oi) in adv.options"
                  :key="oi"
                  class="p-2.5 rounded text-left text-xs border transition-colors flex items-start gap-2"
                  :class="advOptionClass(adv, oi)"
                  :disabled="adv.revealed"
                  @click="advAttempt(adv, oi)"
                >
                  <span class="font-mono font-bold shrink-0">{{ String.fromCharCode(65 + oi) }}.</span>
                  <span class="leading-tight">{{ opt }}</span>
                </button>
              </div>

              <!-- Explanation -->
              <div v-if="adv.revealed" class="mt-3 p-3 rounded bg-sub border b-line text-xs">
                <p class="font-bold mb-1" :class="adv.selected === adv.correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'">
                  {{ adv.selected === adv.correct ? '✔ Correct' : '✖ Incorrect (Correct answer: ' + String.fromCharCode(65 + adv.correct) + ')' }}
                </p>
                <p class="t-mid leading-relaxed">{{ adv.explanation }}</p>
              </div>
              <div v-else class="flex justify-end">
                <button class="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium hover:underline" @click="advReveal(adv)">
                  Show Explanation
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 10 · Comprehension Gate ──────────────────────────────────── -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="gate" section-label="Comprehension Gate" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="gate" section-label="Comprehension Gate" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-POL-HIST-ACTS" />
        </section>

        <!-- ── 11 · Current Affairs ────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">11</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-POL-HIST-ACTS" section-id="current-affairs" section-label="Current Affairs" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-POL-HIST-ACTS" section-id="current-affairs" section-label="Current Affairs" note-title="Historical Background (1773-1947)" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-POL-HIST-ACTS" />
        </section>

        <!-- Study Mode Transition Banner -->
        <div class="mt-12 mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 sm:p-5">
          <div class="flex items-center gap-3.5">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-saffron-500/15 text-saffron-600 dark:text-saffron-400">
              <UIcon name="i-heroicons-bolt" class="h-5 w-5" />
            </span>
            <div>
              <p class="text-[13.5px] font-bold t-hi">Ready to master this topic?</p>
              <p class="mt-0.5 text-[12px] t-mid leading-relaxed">
                Step through 6 screen-sized stages with section-bound PYQs, flashcards, and trap duels.
              </p>
            </div>
          </div>
          <NuxtLink
            to="/study/historical-background-1773-1947"
            class="inline-flex items-center gap-2 rounded-lg bg-saffron-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-saffron-600 dark:text-stone-900"
          >
            <UIcon name="i-heroicons-bolt" class="h-4 w-4" />
            <span>Start Study Mode</span>
          </NuxtLink>
        </div>
      </article>

      <!-- ══ Right TOC ═══════════════════════════════════════════════════ -->
      <aside class="hidden xl:block xl:w-64 shrink-0">
        <div class="sticky top-20">
          <TableOfContents :sections="sections" />
        </div>
      </aside>
    </div>

    <!-- Personal Notes Drawer slideover -->
    <PersonalNotesDrawer ref="notesDrawerRef" note-id="NOTE-POL-HIST-ACTS" note-title="Historical Background (1773-1947)" />
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
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import { useAiPromptChips } from '@/composables/useAiPromptChips'
import type { SectionContext } from '@/types/annotations'

useHead({
  title: 'Historical Background: Company Rule & Crown Rule (1773-1947) - TGPRB StudyOS',
  meta: [
    {
      name: 'description',
      content: 'Comprehensive study note for TGPRB SI & Constable on British constitutional enactments (1773-1947): Company Rule, Crown Rule, 1919 Dyarchy, 1935 Provincial Autonomy, and 12 verified PYQs.',
    },
  ],
})

const aiQuickPrompts = useAiPromptChips('NOTE-POL-HIST-ACTS')

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Company Rule Acts (1773-1853)' },
  { label: 'Crown Takeover (1858)' },
  { label: 'Councils Devolution (1861-1892)' },
  { label: 'Morley-Minto (1909) & Mont-Ford (1919)' },
  { label: 'GoI Act 1935 & 1947 Independence' },
  { label: 'Evolution & Trap Matrices' },
]

const sections = [
  { id: 'visual-roadmap',       label: 'Visual Architecture & Roadmap' },
  { id: 'company-rule',         label: 'Company Rule Acts (1773-1853)' },
  { id: 'crown-devolution',     label: 'Crown Rule: Early Devolution (1858-1892)' },
  { id: 'crown-representation', label: 'Crown Rule: Reforms (1909-1919)' },
  { id: 'crown-federal',        label: 'Crown Rule: Federation & Independence (1935-1947)' },
  { id: 'comparison-matrix',    label: 'Evolution Comparison Matrix' },
  { id: 'trap-matrix',          label: 'TGPRB Exam Trap Matrix' },
  { id: 'pyqs',                 label: 'Previous Year Questions' },
  { id: 'advanced-practice',    label: 'Advanced Practice' },
  { id: 'gate',                 label: 'Comprehension Gate' },
  { id: 'current-affairs',      label: 'Current Affairs' },
]

const readProgress = ref(0)

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  readProgress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  loadNotes('NOTE-POL-HIST-ACTS')
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
    uid: 'PYQ-3073',
    exam: 'SI',
    year: '2023',
    tag: 'Morley-Minto Reforms',
    source: 'SI 2023 Mains GS · Q144',
    question: 'Indian Council Act of 1909 is also called as:',
    options: [
      'Morley-Minto Reforms',
      'Montague - Chelmsford Reforms',
      'Charter Act',
      'Act of Good Government'
    ],
    correct: 0,
    explanation: 'The Indian Councils Act 1909 is popularly named after Lord Morley (Secretary of State for India in London) and Lord Minto (Viceroy of India). It introduced separate electorates for Muslims.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0690',
    exam: 'Constable',
    year: '2018',
    tag: 'GoI Act 1919',
    source: 'Constable 2018 Prelims · Q69',
    question: 'Which one of the following was not a part of the Government of India Act of 1919?',
    options: [
      'The universal franchise was introduced by the Act.',
      'There was to be two houses of legislature at the centre.',
      'It gave more powers to the Provincial governments.',
      'It introduced Dyarchy in the Provinces.'
    ],
    correct: 0,
    explanation: 'The GoI Act 1919 introduced Dyarchy in the provinces, a bicameral legislature at the Centre, and enlarged the provincial legislative councils. Universal franchise was NOT introduced; voting rights remained strictly limited by property, tax, and educational qualifications.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0758',
    exam: 'Constable',
    year: '2018',
    tag: 'Morley-Minto 1909',
    source: 'Constable 2018 Prelims · Q138',
    question: 'Choose the correct statements from the following:\ni. Lord Morley was Secretary of State for India in British Government.\nii. Lord Minto was Governor General of India.\niii. Lord Morley was Governor General of India.\niv. Lord Minto was secretary of state for India in British Government',
    options: [
      'i & ii',
      'iii & iv',
      'i & iv',
      'ii & iv'
    ],
    correct: 0,
    explanation: 'During the enactment of the Indian Councils Act of 1909, Lord Morley was the Secretary of State for India based in London, while Lord Minto was the Viceroy and Governor-General stationed in India.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0759',
    exam: 'Constable',
    year: '2018',
    tag: 'Dyarchy 1919',
    source: 'Constable 2018 Prelims · Q139',
    question: 'Which one of the following was not a part of Reserved subjects in the Govt. of India Act of 1919?',
    options: [
      'Land Revenue',
      'Administration of Justice',
      'Local Self Government',
      'Police'
    ],
    correct: 2,
    explanation: 'Under provincial Dyarchy (GoI Act 1919), Local Self-Government was classified as a Transferred subject administered by ministers responsible to the Legislative Council. Land Revenue, Police, and Administration of Justice were Reserved subjects held by the Governor and his Executive Council.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0520',
    exam: 'Constable',
    year: '2018',
    tag: 'Councils & GoI Acts',
    source: 'Constable 2018 Mains · Q99',
    question: 'Which of the following statements are true?\ni. The Indian Council Act, of 1909 introduced the principle of election for the first time.\nii. The Government of India Act, 1919 gave separate electorates to Sikhs.\niii. The Government of India Act, 1935 gave separate representation to Indian Christians.\niv. The Indian Councils Act, 1892 decreased the functions of Legislative Council\nChoose the correct answer:',
    options: [
      'i, ii & iv',
      'ii & iii',
      'i & iv',
      'iii & iv'
    ],
    correct: 1,
    explanation: 'Statement iv is false because the Indian Councils Act 1892 increased (not decreased) the functions of legislative councils by allowing members to discuss the budget and address questions to the executive. GoI Act 1919 extended separate electorates to Sikhs, and GoI Act 1935 extended communal representation to Indian Christians, Anglo-Indians, and Europeans.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1560',
    exam: 'SI',
    year: '2016',
    tag: 'Independence Act 1947',
    source: 'SI 2016 Final GS · Q117',
    question: 'Which of the following statements are correct?\na) Constituent Assembly was suggested by cabinet mission\nb) The first amendment to Preamble was made in 1975\nc) 1919 Government of India Act separated state budget from union budget\nd) Indian Independence Act was approved by British Parliament on July 15, 1947\nChoose the correct option:',
    options: [
      'a & d',
      'b & c',
      'c & d',
      'a & b'
    ],
    correct: 0,
    explanation: 'Statement a is correct as Cabinet Mission Plan 1946 formulated the Assembly scheme. Statement d is correct as the Indian Independence Act was approved by the House of Commons on July 15, 1947 (received Royal Assent July 18, 1947). Statement b is false because the Preamble was amended in 1976 (42nd Amendment).',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-3003',
    exam: 'SI',
    year: '2023',
    tag: 'GoI Act 1858',
    source: 'SI 2023 Mains GS · Q72',
    question: 'Which one of the following is not result of 1857 Sepoy Mutiny ?',
    options: [
      'The control of Indian Administration was transferred from the East India company to the crown.',
      'The Taluqdars of Oudh who had joined in large numbers in the rebellion were reinstated and confirmed in their estates.',
      'Revolt of 1857 was the lack of contact between ruler and the ruled. Hence it paved for the introduction of 1861 Indian Councils Act.',
      'The entry of muslims into Indian Army banned temporarily.'
    ],
    correct: 3,
    explanation: 'Following 1857, the British did not ban Muslims from the army. Instead, recruitment shifted toward martial races (Sikhs, Gurkhas, Pathans). Control transferred from EIC to the Crown via GoI Act 1858, and Indian Councils Act 1861 was enacted to associate Indians with governance.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-3126',
    exam: 'SI',
    year: '2023',
    tag: 'Independence 1947',
    source: 'SI 2023 Mains GS · Q197',
    question: 'Identify the British VICEROY during the time of independence of India.',
    options: [
      'Lord Mountbatten',
      'Lord Canning',
      'Lord Curzon',
      'Lord Harding II'
    ],
    correct: 0,
    explanation: 'Lord Mountbatten served as the last British Viceroy of India from March 1947 to August 1947, executing partition under the Indian Independence Act 1947 and serving as first Governor-General of the Dominion of India until June 1948.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0495',
    exam: 'Constable',
    year: '2018',
    tag: 'Civil Services Evolution',
    source: 'Constable 2018 Mains · Q74',
    question: 'Name the Governor - General who for the first time introduced Civil Services in India.',
    options: [
      'Warren Hastings',
      'Lord Cornwallis',
      'Lord Wellesley',
      'Lord Dalhousie'
    ],
    correct: 1,
    explanation: 'Lord Cornwallis is known as the Father of Civil Services in India. He organized and reformed the administration, separating commercial and judicial/revenue roles into the Covenanted Civil Service.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-0925',
    exam: 'Constable',
    year: '2022',
    tag: 'Charter Act 1813',
    source: 'Constable 2022 Prelims · Q106',
    question: 'Which one of the following statements is not correct about growth of English Education in India?',
    options: [
      'The 1813 Charter Act allocated Rs 1,00,000 (one lakh) towards promoting the knowledge of modern sciences and improvement of literature.',
      'Babington Macaulay issued his famous minute on English Education on 2nd February 1835.',
      'The famous Woods Dispatch of 1854 was another important step in the development of Education in India.',
      'In 1864 Hunter Committee was appointed to review the growth of Higher Education in India.'
    ],
    correct: 3,
    explanation: 'The Hunter Education Commission was appointed in 1882 (not 1864) by Lord Ripon. The Charter Act 1813 explicitly allocated Rs 1,00,000 for promoting education and literature in India.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1086',
    exam: 'Constable',
    year: '2023',
    tag: 'Simon Commission',
    source: 'Constable 2023 Mains · Q68',
    question: 'In which year, the Simon Commission was appointed and who appointed it?',
    options: [
      '1926 and US Government',
      '1927 and British Government',
      '1928 and French Government',
      '1929 and Dutch Government'
    ],
    correct: 1,
    explanation: 'The Simon Commission (Indian Statutory Commission) was appointed in November 1927 by the British Government under Prime Minister Stanley Baldwin to examine the working of the Government of India Act 1919.',
    revealed: false,
    selected: null
  },
  {
    uid: 'PYQ-1813',
    exam: 'SI',
    year: '2016',
    tag: 'Legislative Council Resignations',
    source: 'SI 2016 Prelims · Q145',
    question: 'The Indian member in Viceroy Legislative Council who resigned in protest against Rowlatt Bills in 1919:',
    options: [
      'Tej Bahadur Sapru',
      'B.D. Sukul',
      'M.R. Jayakar',
      'G.S. Kaparde'
    ],
    correct: 1,
    explanation: 'In protest against the passage of the repressive Rowlatt Act of 1919 in the Imperial Legislative Council, prominent non-official members resigned, including B.D. Sukul, Mohammad Ali Jinnah, and Madan Mohan Malaviya.',
    revealed: false,
    selected: null
  }
])

const activeExamFilter = ref('all')

const examFilters = [
  { label: 'All Exams (12)', value: 'all' },
  { label: 'Constable (7)', value: 'Constable' },
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
    uid: 'ADV-POL-HIST-001',
    question: 'Match List-I (Pre-Independence Acts) with List-II (Key Institutional Features):\n\nList-I:\nA. Regulating Act of 1773\nB. Pitt\'s India Act of 1784\nC. Charter Act of 1833\nD. Government of India Act of 1919\n\nList-II:\nI. Established Double Government via Board of Control and Court of Directors\nII. Designated Governor-General of Bengal and created Supreme Court at Calcutta\nIII. Introduced Dyarchy in Provinces and Bicameralism at the Centre\nIV. Created Governor-General of India and completely ended commercial monopoly of EIC\n\nChoose the correct answer:',
    options: [
      'A-II, B-I, C-IV, D-III',
      'A-I, B-II, C-IV, D-III',
      'A-II, B-IV, C-I, D-III',
      'A-III, B-I, C-IV, D-II'
    ],
    correct: 0,
    explanation: 'Regulating Act 1773 created Governor-General of Bengal and Supreme Court at Calcutta (A-II). Pitt\'s India Act 1784 established Double Government with Board of Control (B-I). Charter Act 1833 created Governor-General of India and abolished EIC commercial operations (C-IV). GoI Act 1919 introduced Provincial Dyarchy and Central Bicameralism (D-III).',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0690, PYQ-3073)',
    format: 'Matching',
    isSynthetic: true,
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-HIST-002',
    question: 'Consider the following statements regarding the Government of India Act 1935:\n\nA. It abolished Dyarchy in the provinces and established Provincial Autonomy in its place.\nB. It divided legislative powers between the Centre and Units into three lists: Federal, Provincial, and Concurrent.\nC. Residuary legislative powers were vested in the Federal Legislature, following the Canadian model.\nD. It provided for the establishment of a Federal Court which was formally inaugurated in 1937.\n\nWhich of the statements given above are correct?',
    options: [
      'A, B and D only',
      'A and C only',
      'B, C and D only',
      'A, B, C and D'
    ],
    correct: 0,
    explanation: 'Statements A, B, and D are correct. GoI Act 1935 abolished provincial dyarchy, created 3 lists, and set up the Federal Court in 1937. Statement C is incorrect because residuary legislative powers were vested in the Governor-General (Viceroy) at his discretion, not in the Federal Legislature.',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0520, PYQ-0690)',
    format: 'Multi-statement',
    isSynthetic: true,
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-HIST-003',
    question: 'Arrange the following British enactments in correct chronological sequence:\n\n1. Indian Councils Act introducing separate electorates for Muslims\n2. Charter Act establishing open competitive examination for Civil Services\n3. Government of India Act introducing Dyarchy in provinces\n4. Indian Councils Act restoring legislative powers to Bombay and Madras\n\nSelect the correct code:',
    options: [
      '2 - 4 - 1 - 3',
      '4 - 2 - 1 - 3',
      '2 - 1 - 4 - 3',
      '4 - 1 - 2 - 3'
    ],
    correct: 0,
    explanation: 'Chronological sequence: 2. Charter Act 1853 (open competition for civil services) -> 4. Indian Councils Act 1861 (legislative devolution to Bombay & Madras) -> 1. Indian Councils Act 1909 (Morley-Minto separate electorates) -> 3. Government of India Act 1919 (Provincial Dyarchy). Correct code is 2 - 4 - 1 - 3.',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0520, PYQ-0758)',
    format: 'Chronology',
    isSynthetic: true,
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-HIST-004',
    question: 'Given below are two statements, one labelled as Assertion (A) and the other as Reason (R):\n\nAssertion (A): The Charter Act of 1833 was the culminating step towards legislative centralization in British India.\nReason (R): It deprived the Governors of Bombay and Madras of their legislative powers and vested exclusive legislative power for the whole of British India in the Governor-General of India.\n\nChoose the correct code:',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true'
    ],
    correct: 0,
    explanation: 'The Charter Act of 1833 was the final step towards centralization in British India because it concentrated all legislative authority in the Governor-General of India and his Council, while completely divesting the Bombay and Madras Presidencies of their independent law-making authority.',
    source: 'TGPSC-Style Advanced Drill (Derived from PYQ-0495, PYQ-0925)',
    format: 'Assertion-Reason',
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
