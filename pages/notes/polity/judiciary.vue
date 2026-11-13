<template>
  <div>
    <!-- Reading progress bar -->
    <div
      class="fixed left-0 top-0 z-50 h-[2px] bg-gradient-to-r from-saffron-500 to-saffron-400 transition-[width] duration-100"
      :style="{ width: readProgress + '%' }"
      aria-hidden="true"
    />

    <div class="flex gap-10">
      <!-- Article -->
      <article class="min-w-0 flex-1">
        <!-- Breadcrumb -->
        <nav class="mb-6 flex items-center gap-1.5 text-body-xs t-lo" aria-label="Breadcrumb">
          <NuxtLink to="/" class="transition-colors hover:t-hi">Dashboard</NuxtLink>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <NuxtLink to="/notes/polity" class="transition-colors hover:t-hi">Indian Polity</NuxtLink>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <span class="t-mid">Judiciary &amp; Constitutional Bodies</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="chip chip-saffron"><span class="dot" />T1 : High priority</span>
              <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                🎯 Projected 2026: 3-4 Questions (3-4 Marks)
              </span>
              <span class="chip">{{ pyqs.length }} verified PYQs</span>
              <span class="chip">Polity</span>
            </div>
            <NuxtLink
              to="/study/judiciary"
              class="inline-flex items-center gap-2 rounded-lg border border-saffron-500/40 bg-saffron-500/10 px-3 py-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-300 transition-colors hover:bg-saffron-500/20"
            >
              <UIcon name="i-heroicons-book-open" class="h-4 w-4" />
              <span>Study Mode (3-Zone)</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Judiciary &amp; Constitutional Bodies
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive forensic study notes covering Supreme Court (Arts. 124-147), High Courts (Arts. 214-231), Subordinate Courts (Arts. 233-237), The 5 Constitutional Writs (Arts. 32 &amp; 226), Key Constitutional Bodies (CAG, ECI, FC, UPSC, AG, Inter-State Council, NCBC), Statutory &amp; Non-Constitutional Bodies (NITI Aayog, NHRC, CVC, Lokpal), 4-tier legal architecture, high-yield cloze recall anchors, and dedicated comparison matrices.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />12 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />{{ pyqs.length }} verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~28 min read
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
            to="/study/judiciary"
            class="inline-flex items-center gap-2 rounded-lg bg-saffron-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-saffron-600 dark:text-stone-900"
          >
            <UIcon name="i-heroicons-bolt" class="h-4 w-4" />
            <span>Open in Study Mode</span>
          </NuxtLink>
        </div>

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
            Mastering the Indian Judicial Hierarchy and Constitutional/Statutory Bodies guarantees high-scoring precision across all TGPRB SI &amp; Constable papers.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Predicted 2026 Question Patterns
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct factual recall, multi-statement evaluations, and matching pairs testing <strong class="t-hi">Supreme Court Strength</strong> (prescribed by Parliament under Art. 124(1)), <strong class="t-hi">Retirement Age Asymmetry</strong> (SC 65 years vs HC 62 years), <strong class="t-hi">Writ Scope</strong> (Art. 226 HC is wider than Art. 32 SC), <strong class="t-hi">District Judge Appointments</strong> (Governor under Art. 233 in consultation with HC), <strong class="t-hi">CAG Scope</strong> (audits both Union and State accounts under Art. 149), <strong class="t-hi">ECI Structure</strong> (originally 1 member, multi-member 3 members today with equal status), <strong class="t-hi">Attorney General</strong> (pleasure of President under Art. 76, right to speak in Parliament but no vote under Art. 88), and <strong class="t-hi">Constitutional vs Statutory vs Extra-Constitutional Bodies</strong> (NCBC Art. 338B vs NHRC under PHRA 1993 vs NITI Aayog via Cabinet Resolution 2015).
              </p>
            </div>
          </div>
        </section>

        <!-- 01 : Visual Architecture & Integrated Judicial System -->
        <section id="visual-architecture" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Architecture &amp; Integrated Judicial System</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="visual-architecture"
              section-label="Visual Architecture &amp; Integrated Judicial System"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 124-147, 214-237</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="visual-architecture"
            section-label="Visual Architecture &amp; Integrated Judicial System"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: What is this &amp; Why does it exist?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Imagine a national referee system for a sports league. In the United States, there are two separate court systems: federal courts handle only national federal laws, and state courts handle only state laws. But India rejected this dual court model! Dr. B.R. Ambedkar and the Constituent Assembly gave India a <strong class="t-hi">single integrated judicial pyramid</strong>.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              This means a single unified chain of courts enforces <strong class="t-hi">both Union laws and State laws</strong> from the highest apex in New Delhi right down to the local district munsiff magistrate.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">1. Apex Court (Arts. 124-147):</span>
                <p class="t-lo mt-0.5">Supreme Court of India. The final interpreter of the Constitution and apex court of appeal for the entire nation.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">2. State Apex (Arts. 214-231):</span>
                <p class="t-lo mt-0.5">High Courts. The highest judicial tribunal in each State, exercising constitutional supervision and wider writ powers.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">3. District Courts (Arts. 233-237):</span>
                <p class="t-lo mt-0.5">Subordinate Courts. District &amp; Sessions Courts administering civil and criminal justice directly to citizens.</p>
              </div>
            </div>
          </div>

          <!-- 4-Tier Legal Architecture Hierarchy Panel -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-saffron-500" />
              The 4-Tier Legal Architecture: How Judicial Authority Operates
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              To avoid confusion in competitive exams, understand how legal authority is structured from supreme constitutional mandates down to administrative guidelines:
            </p>
            <div class="space-y-3.5 text-xs">
              <!-- Tier 1 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px]">Tier 1 : The Constitution of India (Supreme Law)</span>
                  <span class="chip chip-mono text-[10px]">Supreme Groundnorm</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Articles 124-147 establish the Supreme Court; Articles 214-231 establish High Courts; Articles 233-237 establish Subordinate Courts. Article 141 mandates that law declared by the Supreme Court is binding on all courts within India. Article 32 and Article 226 empower courts to issue constitutional writs.
                </p>
              </div>

              <!-- Tier 2 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">Tier 2 : Parliamentary &amp; State Statutes</span>
                  <span class="chip chip-mono text-[10px]">Acts of Legislature</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Supreme Court (Number of Judges) Act 1956 (amended 2019 to 34 judges), Judges (Inquiry) Act 1968 (removal procedure), Advocates Act 1961, Legal Services Authorities Act 1987 (statutory basis for Lok Adalats and NALSA), and the Protection of Human Rights Act 1993 (NHRC).
                </p>
              </div>

              <!-- Tier 3 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px]">Tier 3 : Judicial Precedents &amp; Landmark Judgments</span>
                  <span class="chip chip-mono text-[10px]">Judge-Made Law</span>
                </div>
                <p class="t-mid leading-relaxed">
                  The Three Judges Cases (1981, 1993, 1998) which created the Collegium system. The Fourth Judges Case (2015), where a 5-judge Constitution Bench headed by Justice J.S. Khehar struck down the 99th Constitutional Amendment Act and the NJAC Act by a 4:1 majority to preserve judicial independence (tested in PYQ-0312).
                </p>
              </div>

              <!-- Tier 4 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[11px]">Tier 4 : Executive Resolutions &amp; Delegated Regulations</span>
                  <span class="chip chip-mono text-[10px]">Administrative Orders</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Cabinet Resolutions creating extra-constitutional advisory bodies like NITI Aayog (Jan 1, 2015) and National Development Council, as well as Supreme Court Rules framed under Article 145 with presidential approval.
                </p>
              </div>
            </div>
          </div>

          <!-- Section Exam Trap -->
          <div class="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 flex items-start gap-3 mb-6">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                CRITICAL EXAM TRAP : SINGLE PYRAMID VS DUAL COURTS
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                Candidates often mistake India's federal polity for a federal dual judicial system. Remember: In India, there are NO separate state court hierarchies for state laws. The High Court and Subordinate Courts enforce Central Acts (like the Indian Penal Code or Income Tax Act) as well as State Acts (like Telangana Land Revenue laws).
              </p>
            </div>
          </div>
        </section>

        <!-- 02 : Supreme Court of India -->
        <section id="supreme-court" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Supreme Court of India: Composition, Collegium &amp; Jurisdictions</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="supreme-court"
              section-label="Supreme Court of India: Composition, Collegium &amp; Jurisdictions"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 124, 129, 131, 136, 141, 143</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="supreme-court"
            section-label="Supreme Court of India: Composition, Collegium &amp; Jurisdictions"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Big picture box -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: The Supreme Court as the Ultimate Sentinel
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Inaugurated on <strong class="t-hi">January 28, 1950</strong> (succeeding the Federal Court of India set up under the GoI Act 1935), the Supreme Court of India stands at the pinnacle of justice. It is the guardian of the Constitution, the ultimate protector of Fundamental Rights, and the final court of civil and criminal appeal.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Total Strength:</span>
                <p class="t-lo mt-0.5">34 Judges (1 Chief Justice of India + 33 Puisne Judges). Prescribed by Parliament by law (PYQ-0523).</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">Retirement Age:</span>
                <p class="t-lo mt-0.5">65 Years (Art. 124(2)). There is NO minimum age requirement for appointment!</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">Appointment:</span>
                <p class="t-lo mt-0.5">By the President by warrant under hand and seal based on the Collegium recommendation (PYQ-0936).</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-purple-600 dark:text-purple-400">Removal:</span>
                <p class="t-lo mt-0.5">By President after special majority address by both Houses of Parliament in the same session.</p>
              </div>
            </div>
          </div>

          <!-- Plain English Legal Definitions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Legal Term Unpacked</span>
              <h4 class="text-sm font-bold t-hi mt-1">What is the "Collegium"?</h4>
              <p class="text-xs t-mid leading-relaxed mt-1">
                The Collegium is a system where a committee of senior judges recommends names for appointment and transfer of judges to the Supreme Court and High Courts. It is <strong class="t-hi">not mentioned in the Constitution</strong> or in any Parliamentary statute. It evolved through three Supreme Court judgments (First, Second, and Third Judges Cases). For Supreme Court appointments, the Collegium consists of the <strong class="t-hi">CJI + 4 senior-most SC judges</strong>.
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Legal Term Unpacked</span>
              <h4 class="text-sm font-bold t-hi mt-1">What is a "Court of Record" (Art. 129)?</h4>
              <p class="text-xs t-mid leading-relaxed mt-1">
                Under Article 129, the Supreme Court is a "Court of Record". This means two critical things:
                <br />1. Its acts and proceedings are recorded for perpetual memory and testimony. When presented in any court, their legal authenticity cannot be questioned.
                <br />2. It has the summary power to punish for <strong class="t-hi">contempt of itself</strong> (both civil and criminal contempt), ensuring its dignity and orders are respected.
              </p>
            </div>
          </div>

          <!-- Supreme Court Jurisdictions Breakdown -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-squares-2x2" class="h-4 w-4 text-sky-500" />
              The Multi-Tiered Jurisdictions of the Supreme Court (PYQ-2236)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              TGPRB SI 2018 tested which jurisdictions are enjoyed by the Supreme Court. The answer: <strong class="t-hi">Original, Advisory, and Appellate Jurisdictions</strong>. Here is how each operates:
            </p>
            <div class="space-y-3 text-xs">
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">1. Original Jurisdiction (Article 131):</span>
                <p class="t-mid mt-0.5 leading-relaxed">
                  Disputes where the Supreme Court is the first and only court a party can go to (exclusive original jurisdiction). Covers:
                  (a) Government of India vs one or more States;
                  (b) Government of India + State(s) vs other State(s);
                  (c) State vs State.
                  <br /><strong class="text-rose-600 dark:text-rose-400">Exclusions:</strong> Inter-State river water disputes (Art. 262), Finance Commission matters (Art. 280), and pre-constitutional treaty disputes are excluded from Art. 131.
                </p>
              </div>

              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">2. Writ Jurisdiction (Article 32):</span>
                <p class="t-mid mt-0.5 leading-relaxed">
                  The Supreme Court is the guarantor of Fundamental Rights. An aggrieved citizen can directly approach the Supreme Court under Article 32 without having to climb up from lower courts. Dr. Ambedkar called Article 32 the "Heart and Soul of the Constitution".
                </p>
              </div>

              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">3. Appellate Jurisdiction (Articles 132-136):</span>
                <p class="t-mid mt-0.5 leading-relaxed">
                  Appeals from High Courts on Constitutional matters (Art. 132), Civil matters (Art. 133), and Criminal matters (Art. 134). Under <strong class="t-hi">Article 136 (Special Leave Petition - SLP)</strong>, the Supreme Court has extraordinary discretionary power to grant special leave to appeal against ANY judgment, decree, sentence or order passed by ANY court or tribunal in India (except military courts-martial).
                </p>
              </div>

              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-purple-600 dark:text-purple-400">4. Advisory Jurisdiction (Article 143):</span>
                <p class="t-mid mt-0.5 leading-relaxed">
                  The President may refer a question of law or fact of public importance, or pre-constitutional treaties, to the Supreme Court for its opinion. The Supreme Court's opinion is <strong class="t-hi">purely advisory and not binding</strong> on the President.
                </p>
              </div>

              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-rose-600 dark:text-rose-400">5. Binding Law &amp; Complete Justice (Articles 141 &amp; 142):</span>
                <p class="t-mid mt-0.5 leading-relaxed">
                  Under <strong class="t-hi">Article 141</strong>, law declared by the Supreme Court is binding on all courts across India. Under <strong class="t-hi">Article 142</strong>, the Supreme Court possesses the unique power to pass any decree or order necessary for doing "complete justice" in any cause or matter pending before it.
                </p>
              </div>
            </div>
          </div>

          <!-- Section Exam Trap -->
          <div class="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 flex items-start gap-3 mb-6">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                CRITICAL EXAM TRAP : WHO PRESCRIBES JUDGE STRENGTH?
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                Under Article 124(1), the power to increase the number of judges in the Supreme Court belongs strictly to <strong class="t-hi">PARLIAMENT BY LAW</strong> (tested in PYQ-0523). It is NOT decided by the President or the CJI! Conversely, the strength of each High Court is decided by the <strong class="t-hi">PRESIDENT</strong>.
              </p>
            </div>
          </div>
        </section>

        <!-- 03 : High Courts & Subordinate Courts -->
        <section id="high-courts-subordinate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">High Courts &amp; Subordinate Courts: Powers, Writs &amp; Lok Adalat</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="high-courts-subordinate"
              section-label="High Courts &amp; Subordinate Courts: Powers, Writs &amp; Lok Adalat"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 214-237, NALSA &amp; Lok Adalat</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="high-courts-subordinate"
            section-label="High Courts &amp; Subordinate Courts: Powers, Writs &amp; Lok Adalat"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Big picture box -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: State Head of Justice &amp; Grassroots Access
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Under Article 214, each State has a High Court. However, Parliament can establish a <strong class="t-hi">common High Court</strong> for two or more States, or for States and Union Territories under Article 231 (e.g., Punjab and Haryana High Court at Chandigarh, Bombay High Court covering Maharashtra, Goa, Dadra &amp; Nagar Haveli, and Daman &amp; Diu).
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              As tested in TGPRB Constable 2018 (PYQ-0549), there are currently <strong class="t-hi">25 High Courts in India</strong>. Following the Andhra Pradesh Reorganisation Act 2014, a separate High Court for the State of Andhra Pradesh was established with principal seat at Amaravati effective <strong class="t-hi">January 1, 2019</strong>.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">High Court Tenure:</span>
                <p class="t-lo mt-0.5">Retirement age is <strong class="t-hi">62 years</strong> (Art. 217(1)). Resignation letter is addressed to the <strong class="t-hi">President</strong> (not Governor!).</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">District Judges:</span>
                <p class="t-lo mt-0.5">Appointed by the <strong class="t-hi">Governor in consultation with the High Court</strong> under Article 233 (PYQ-1113).</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">Lok Adalat (People's Court):</span>
                <p class="t-lo mt-0.5">Statutory alternative dispute mechanism under Legal Services Authorities Act 1987; awards are final with NO appeal (PYQ-1562).</p>
              </div>
            </div>
          </div>

          <!-- District Courts & Subordinate Judiciary Structure -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-building-library" class="h-4 w-4 text-emerald-500" />
              Subordinate Courts Architecture (Articles 233 to 237)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Below the High Court lies the subordinate judiciary in each administrative district:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Civil Justice Hierarchy</span>
                <ul class="mt-2 space-y-1.5 text-t-mid list-disc list-inside">
                  <li><strong class="t-hi">District Judge Court:</strong> Highest civil court in the district. Has unlimited pecuniary jurisdiction.</li>
                  <li><strong class="t-hi">Senior Civil Judge Court:</strong> Deals with intermediate value property and contract disputes.</li>
                  <li><strong class="t-hi">Junior Civil Judge / Munsiff Court:</strong> Handles small claims and petty civil suits at taluk/mandal level.</li>
                </ul>
              </div>

              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">Criminal Justice Hierarchy</span>
                <ul class="mt-2 space-y-1.5 text-t-mid list-disc list-inside">
                  <li><strong class="t-hi">Sessions Judge Court:</strong> Highest criminal court in district. Can award any sentence authorized by law, including death penalty (capital punishment must be confirmed by High Court!).</li>
                  <li><strong class="t-hi">Chief Judicial Magistrate (CJM):</strong> Can award imprisonment up to 7 years.</li>
                  <li><strong class="t-hi">Judicial Magistrate First Class (JMFC):</strong> Imprisonment up to 3 years and fine up to Rs 10,000.</li>
                </ul>
              </div>
            </div>
            <p class="mt-3 text-xs t-lo italic border-t b-line pt-2">
              Note: The same judicial officer presides as District Judge on the civil side and Sessions Judge on the criminal side (District and Sessions Judge).
            </p>
          </div>

          <!-- Lok Adalats & Free Legal Aid (PYQ-1562 Focus) -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-hand-raised" class="h-4 w-4 text-amber-500" />
              Lok Adalats, NALSA &amp; Article 39A (PYQ-1562)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Article 39A (inserted by 42nd Amendment Act 1976) directs the State to secure equal justice and provide free legal aid to the poor. To operationalize this, Parliament passed the <strong class="t-hi">Legal Services Authorities Act, 1987</strong>, creating:
            </p>
            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded bg-sub border b-line">
                <strong class="text-emerald-600 dark:text-emerald-400">1. NALSA (National Legal Services Authority):</strong> CJI is the Patron-in-Chief. Senior SC Judge serves as Executive Chairman.
              </div>
              <div class="p-2.5 rounded bg-sub border b-line">
                <strong class="text-sky-600 dark:text-sky-400">2. Lok Adalat (People's Court):</strong> Non-adversarial tribunal consisting of a judicial officer + advocate + social worker. No court fee is payable.
              </div>
              <div class="p-2.5 rounded bg-sub border b-line">
                <strong class="text-purple-600 dark:text-purple-400">3. Binding Final Award:</strong> Every award of Lok Adalat is deemed a decree of a Civil Court. <strong class="text-rose-600 dark:text-rose-400">No appeal lies</strong> to any court against an award of Lok Adalat!
              </div>
              <div class="p-2.5 rounded bg-sub border b-line">
                <strong class="text-amber-600 dark:text-amber-400">4. Mobile Courts:</strong> India's first mobile court was inaugurated in Punhana, Mewat district of Haryana in 2007 (tested in PYQ-1562).
              </div>
            </div>
          </div>

          <!-- Section Exam Trap -->
          <div class="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 flex items-start gap-3 mb-6">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                CRITICAL EXAM TRAP : RETIREMENT AGE ASYMMETRY
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                Supreme Court judges retire at <strong class="t-hi">65 years</strong>. High Court judges retire at <strong class="t-hi">62 years</strong>. A High Court judge submits resignation to the <strong class="t-hi">President</strong>, NOT to the State Governor!
              </p>
            </div>
          </div>
        </section>

        <!-- 04 : The 5 Constitutional Writs & Judicial Doctrines -->
        <section id="writs-and-doctrines" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">The 5 Constitutional Writs &amp; Judicial Doctrines</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="writs-and-doctrines"
              section-label="The 5 Constitutional Writs &amp; Judicial Doctrines"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 32, 226, Judicial Review, PIL</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="writs-and-doctrines"
            section-label="The 5 Constitutional Writs &amp; Judicial Doctrines"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Big picture box -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: What is a "Writ" &amp; Why does it exist?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Imagine Fundamental Rights written on a beautiful piece of parchment. If an unlawful police officer detains you or a corrupt bureaucrat refuses to register your birth certificate, that parchment is useless without an emergency enforcement lever.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              A <strong class="t-hi">Writ</strong> is a formal command issued by the Supreme Court (Art. 32) or High Court (Art. 226) that orders the government or an official to immediately restore a citizen's constitutional rights. Borrowed from English Prerogative Writs ("the fountains of justice"), India has 5 specific writs:
            </p>
          </div>

          <!-- The 5 Writs Grid with Plain English Definitions -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Writ 1 · Latin: "To have the body"</span>
              <h4 class="text-sm font-bold t-hi mt-1">Habeas Corpus</h4>
              <p class="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">Bulwark of Individual Liberty</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                An order to bring a detained or arrested person before the court to examine whether the detention is lawful. If illegal, the court frees the person immediately.
                <br /><strong class="text-emerald-600 dark:text-emerald-400">Unique Feature:</strong> Can be issued against <strong class="t-hi">BOTH public authorities and private individuals</strong>!
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Writ 2 · Latin: "We Command"</span>
              <h4 class="text-sm font-bold t-hi mt-1">Mandamus</h4>
              <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Wake-Up Call for Inactive Officials</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                An order commanding a public official, tribunal, or government body to perform a mandatory statutory or constitutional duty they have failed or refused to perform.
                <br /><strong class="text-rose-600 dark:text-rose-400">Cannot be issued against:</strong> The President, State Governors, private individuals, or for discretionary (non-mandatory) duties.
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Writ 3 · Latin: "To Forbid"</span>
              <h4 class="text-sm font-bold t-hi mt-1">Prohibition</h4>
              <p class="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">Preventive Stay Order</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Issued by a higher court (SC or HC) to a lower court or quasi-judicial tribunal to stop it from continuing proceedings that exceed its legal jurisdiction.
                <br /><strong class="text-sky-600 dark:text-sky-400">Nature:</strong> Strictly preventive ("Prevention is better than cure"). Available only while the trial is ongoing.
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Writ 4 · Latin: "To Be Certified"</span>
              <h4 class="text-sm font-bold t-hi mt-1">Certiorari</h4>
              <p class="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">Curative Quashing Order</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Issued by a higher court to quash an order already passed by a lower court, tribunal, or administrative authority that acted without jurisdiction or violated natural justice.
                <br /><strong class="text-purple-600 dark:text-purple-400">Nature:</strong> Both preventive and curative. Since 1991, also available against administrative bodies affecting rights!
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Writ 5 · Latin: "By What Authority"</span>
              <h4 class="text-sm font-bold t-hi mt-1">Quo-Warranto</h4>
              <p class="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">Challenging Illegal Office Usurpers</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Inquires into the legal title and qualifications of a person holding a substantive public office. Prevents illegal usurpation of public posts.
                <br /><strong class="text-emerald-600 dark:text-emerald-400">No Victim Required:</strong> Can be sought by <strong class="t-hi">any interested citizen</strong>, not necessarily an aggrieved victim (no strict locus standi!).
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400">Writ Comparison</span>
              <h4 class="text-sm font-bold t-hi mt-1">Article 32 vs Article 226</h4>
              <p class="text-xs font-semibold text-saffron-600 dark:text-saffron-400 mt-0.5">Which Writ Power is Wider?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                <strong class="text-rose-600 dark:text-rose-400">Supreme Court (Art. 32):</strong> Only for Fundamental Rights (Part III). Cannot issue writs for ordinary legal rights.
                <br /><strong class="text-emerald-600 dark:text-emerald-400">High Court (Art. 226):</strong> For Fundamental Rights AND "for any other purpose" (ordinary legal/statutory rights). Thus, <strong class="t-hi">High Court writ power is wider</strong>!
              </p>
            </div>
          </div>

          <!-- Key Landmark Judicial Doctrines -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-sparkles" class="h-4 w-4 text-purple-500" />
              Landmark Judicial Doctrines Every Candidate Must Know
            </h3>
            <div class="space-y-3 text-xs">
              <div class="p-3 rounded bg-sub border b-line">
                <strong class="text-amber-600 dark:text-amber-400">1. Basic Structure Doctrine (Kesavananda Bharati Case, 1973):</strong>
                A 13-judge Constitution Bench held that Parliament has wide amending powers under Article 368, but CANNOT alter or destroy the "Basic Structure" of the Constitution (judicial review, federalism, secularism, democracy, separation of powers).
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <strong class="text-emerald-600 dark:text-emerald-400">2. Public Interest Litigation (PIL) &amp; Locus Standi (PYQ-0321):</strong>
                Pioneered by Justice P.N. Bhagwati and Justice V.R. Krishna Iyer in the late 1970s. Traditional litigation required locus standi (only the aggrieved person could sue). PIL relaxed this rule: any public-spirited citizen or NGO can approach the High Court or Supreme Court on behalf of underprivileged, unrepresented, or exploited persons. Admission of a PIL is at the discretion of the court.
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <strong class="text-sky-600 dark:text-sky-400">3. Anti-Defection &amp; Judicial Review (Kihoto Hollohan Case, 1992 - PYQ-3062):</strong>
                The Supreme Court upheld the Tenth Schedule (52nd Amendment Act 1985) but struck down the clause that excluded judicial review. The Presiding Officer acts as a tribunal when deciding disqualification, and that decision is subject to judicial review by the High Court and Supreme Court.
              </div>
            </div>
          </div>
        </section>

        <!-- 05 : Constitutional Bodies -->
        <section id="constitutional-bodies" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Constitutional Bodies: Articles, Powers &amp; Independence</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="constitutional-bodies"
              section-label="Constitutional Bodies: Articles, Powers &amp; Independence"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Arts. 76, 148, 263, 280, 315, 324, 338B</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="constitutional-bodies"
            section-label="Constitutional Bodies: Articles, Powers &amp; Independence"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Big picture box -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: What Makes a Body "Constitutional"?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              A <strong class="t-hi">Constitutional Body</strong> is an institution created directly by the text of the Constitution itself. Its powers, composition, tenure, and removal are anchored in dedicated constitutional articles. The ruling government cannot alter or abolish these bodies through ordinary executive orders or simple parliamentary bills; doing so requires a <strong class="t-hi">Constitutional Amendment Act under Article 368</strong>.
            </p>
          </div>

          <!-- Constitutional Bodies Profiles Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <!-- CAG -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Article 148-151</span>
                <span class="chip text-[10px]">6 yrs or 65 yrs</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Comptroller &amp; Auditor General (CAG)</h4>
              <p class="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">Guardian of the Public Purse</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Appointed by the President by warrant under hand and seal. Audits all expenditure from the Consolidated Fund of India AND the Consolidated Fund of each State (audits states too!).
                <br /><strong class="t-hi">Removal:</strong> Same as a Supreme Court judge (parliamentary address with special majority).
                <br /><strong class="t-hi">Reports (Art. 151):</strong> Submits Union audit reports to the President (laid before Parliament and examined by PAC) and State reports to the Governor. The CAG acts as "guide, friend, and philosopher" to the Public Accounts Committee.
              </p>
            </div>

            <!-- ECI -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 324</span>
                <span class="chip text-[10px]">6 yrs or 65 yrs</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Election Commission of India (ECI)</h4>
              <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Superintendent of National &amp; State Polls</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Conducts elections to Parliament, State Legislatures, and the offices of President and Vice-President. (Panchayat and Municipal polls are conducted by State Election Commissions under Arts. 243K &amp; 243ZA!).
                <br /><strong class="t-hi">Evolution:</strong> From 1950 to 1989, it was a 1-member body. In 1993, it permanently became a <strong class="t-hi">3-member body</strong> (1 CEC + 2 ECs).
                <br /><strong class="t-hi">Equal Status:</strong> All three have equal powers, equal salary (matching SC judge), and equal voting power. In case of disagreement, majority decision prevails.
                <br /><strong class="t-hi">Removal:</strong> CEC removed like SC judge. Other ECs removed by President only on CEC recommendation.
              </p>
            </div>

            <!-- Finance Commission -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Article 280</span>
                <span class="chip text-[10px]">Constituted Every 5th Year</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Finance Commission of India (FC)</h4>
              <p class="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">Fiscal Federal Arbitrator (PYQ-0320 &amp; PYQ-2519)</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Constituted by the President at the end of every 5th year (or earlier). Consists of a Chairman + 4 other members appointed by President.
                <br /><strong class="t-hi">Core Responsibilities:</strong> (1) Sharing net tax proceeds between Union and States; (2) Determining principles for grants-in-aid to States under Art. 275; (3) Measures to augment State Consolidated Funds to assist Panchayats and Municipalities.
                <br /><strong class="t-hi">Historical Precedents:</strong> First FC headed by K.C. Neogy (1951). 14th FC headed by Dr. Y.V. Reddy recommended 42% devolution. 15th FC headed by N.K. Singh recommended 41% devolution. Recommendations are advisory only.
              </p>
            </div>

            <!-- UPSC & State PSCs -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Articles 315-323</span>
                <span class="chip text-[10px]">UPSC: 65 yrs · SPSC: 62 yrs</span>
              </div>
              <h4 class="text-sm font-bold t-hi">UPSC &amp; State PSCs (TGPSC)</h4>
              <p class="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">Watchdog of the Merit System</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Central and state recruiting agencies. UPSC members appointed by President (tenure 6 yrs or 65 yrs). State PSC (like TGPSC) members appointed by Governor (tenure 6 yrs or 62 yrs).
                <br /><strong class="text-rose-600 dark:text-rose-400">Crucial Removal Trap:</strong> Although SPSC members are appointed by the Governor, they can be <strong class="t-hi">REMOVED ONLY BY THE PRESIDENT</strong> under Article 317 on grounds of misbehaviour after inquiry by the Supreme Court! The Governor has no power to remove an SPSC member.
              </p>
            </div>

            <!-- Attorney General -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Article 76</span>
                <span class="chip text-[10px]">Pleasure of President</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Attorney General for India (PYQ-0318)</h4>
              <p class="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">First Law Officer of the Government</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Must be qualified to be appointed a judge of the Supreme Court. Appointed by President.
                <br /><strong class="t-hi">No Fixed Tenure:</strong> Holds office during the <strong class="t-hi">pleasure of the President</strong>!
                <br /><strong class="t-hi">Privileges (Art. 88):</strong> Right of audience in all courts in India. Has the right to speak and take part in proceedings of both Houses of Parliament and any Joint Sitting, but has <strong class="text-rose-600 dark:text-rose-400">NO RIGHT TO VOTE</strong>!
              </p>
            </div>

            <!-- Inter-State Council & NCBC -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400">Arts. 263 &amp; 338B</span>
                <span class="chip text-[10px]">Constitutional Status</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Inter-State Council &amp; NCBC</h4>
              <p class="text-xs font-semibold text-saffron-600 dark:text-saffron-400 mt-0.5">Sarkaria Precedent &amp; 102nd Amendment</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                <strong class="t-hi">Inter-State Council (Art. 263 - PYQ-0516):</strong> Established in 1990 on the recommendation of the <strong class="t-hi">Sarkaria Commission</strong> (not Verma Commission!). Chaired by Prime Minister; members include all Chief Ministers and 6 Cabinet Ministers.
                <br /><strong class="t-hi">NCBC (Art. 338B - PYQ-0763):</strong> Conferred full constitutional status by the <strong class="t-hi">102nd Constitutional Amendment Act, 2018</strong>, placing it alongside NCSC (Art. 338) and NCST (Art. 338A).
                <br /><strong class="t-hi">Special Officer for Linguistic Minorities (Art. 350B - PYQ-3049):</strong> Constitutional office created by 7th Amendment Act 1956.
              </p>
            </div>
          </div>
        </section>

        <!-- 06 : Statutory & Non-Constitutional Bodies -->
        <section id="statutory-and-non-constitutional" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Statutory, Regulatory &amp; Extra-Constitutional Bodies</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="statutory-and-non-constitutional"
              section-label="Statutory, Regulatory &amp; Extra-Constitutional Bodies"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">NITI Aayog, NHRC, CVC, Lokpal</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="statutory-and-non-constitutional"
            section-label="Statutory, Regulatory &amp; Extra-Constitutional Bodies"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Big picture box -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Statutory vs Extra-Constitutional Bodies
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Not every important national institution is written in the Constitution:
              <br />1. <strong class="t-hi">Statutory Bodies:</strong> Created by an Act of Parliament (a statute). Examples: NHRC, CVC, Lokpal, NCW, CIC, NDMA.
              <br />2. <strong class="t-hi">Extra-Constitutional / Non-Statutory Bodies:</strong> Created by an executive resolution of the Union Cabinet without any statute. Examples: NITI Aayog, National Development Council.
            </p>
          </div>

          <!-- Statutory & Extra-Constitutional Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <!-- NITI Aayog -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Cabinet Resolution (Jan 1, 2015)</span>
                <span class="chip text-[10px]">Non-Statutory Think Tank</span>
              </div>
              <h4 class="text-sm font-bold t-hi">NITI Aayog (PYQ-1796)</h4>
              <p class="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">National Institution for Transforming India</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Replaced the 65-year-old Planning Commission (established March 15, 1950). Promotes "Cooperative Federalism" with a bottom-up approach.
                <br /><strong class="t-hi">Chairperson:</strong> Prime Minister.
                <br /><strong class="t-hi">Governing Council:</strong> Prime Minister + Chief Ministers of all States and UTs with legislatures + Lt Governors of other UTs.
                <br /><strong class="t-hi">Vice-Chairperson:</strong> Appointed by PM, holds rank of Cabinet Minister. CEO holds rank of Secretary to GoI.
              </p>
            </div>

            <!-- NHRC -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">PHRA Act, 1993</span>
                <span class="chip text-[10px]">3 yrs or 70 yrs (amended 2019)</span>
              </div>
              <h4 class="text-sm font-bold t-hi">National Human Rights Commission (NHRC) (PYQ-2707)</h4>
              <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Statutory Human Rights Watchdog</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Created under the Protection of Human Rights Act 1993. It is a <strong class="t-hi">statutory body, NOT constitutional</strong>!
                <br /><strong class="t-hi">Chairperson:</strong> Retired CJI or retired Judge of Supreme Court.
                <br /><strong class="t-hi">6-Member Selection Committee:</strong> Prime Minister (Head), Speaker of Lok Sabha, Deputy Chairman of Rajya Sabha, Leaders of Opposition in Lok Sabha &amp; Rajya Sabha, and Union Home Minister.
                <br /><strong class="t-hi">Powers:</strong> Has powers of a civil court. Recommendations are advisory only (cannot directly punish violators).
              </p>
            </div>

            <!-- CVC -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">CVC Act, 2003</span>
                <span class="chip text-[10px]">4 yrs or 65 yrs</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Central Vigilance Commission (CVC)</h4>
              <p class="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">Anti-Corruption Vigilance Agency</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Set up in 1964 on the recommendations of the <strong class="t-hi">Santhanam Committee</strong>. Conferred statutory status by the CVC Act 2003.
                <br /><strong class="t-hi">Composition:</strong> Central Vigilance Commissioner + not more than two Vigilance Commissioners.
                <br /><strong class="t-hi">Selection Committee:</strong> Prime Minister (Head), Union Home Minister, Leader of Opposition in Lok Sabha.
                <br /><strong class="text-rose-600 dark:text-rose-400">Tenure Trap:</strong> 4 years or 65 years of age (whichever is earlier). Ineligible for further employment under Centre or State!
              </p>
            </div>

            <!-- Lokpal & Lokayuktas -->
            <div class="panel p-4 bg-elev border b-line">
              <div class="flex items-center justify-between mb-1.5">
                <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Lokpal Act, 2013</span>
                <span class="chip text-[10px]">5 yrs or 70 yrs</span>
              </div>
              <h4 class="text-sm font-bold t-hi">Lokpal &amp; Lokayuktas (PYQ-0627)</h4>
              <p class="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">National Anti-Corruption Ombudsman</p>
              <p class="text-xs t-lo mt-1.5 leading-relaxed">
                Statutory anti-corruption ombudsman for Union (Lokpal) and States (Lokayuktas). First Lokpal Chairperson: Justice Pinaki Chandra Ghose (appointed March 2019).
                <br /><strong class="t-hi">Search Committee:</strong> 8-member Lokpal search committee was headed by <strong class="t-hi">Justice Ranjana Prakash Desai</strong> (tested in PYQ-0627).
                <br /><strong class="t-hi">Jurisdiction:</strong> Covers Prime Minister (with exceptions on atomic energy, space, foreign relations, and public order), Ministers, MPs, and Central Group A, B, C, D employees.
              </p>
            </div>
          </div>
        </section>

        <!-- 07 : High-Yield Cloze Recall Anchors -->
        <section id="cloze-recall-anchors" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">High-Yield Cloze Recall Anchors</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="cloze-recall-anchors"
              section-label="High-Yield Cloze Recall Anchors"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Active Recall Memory Hooks</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="cloze-recall-anchors"
            section-label="High-Yield Cloze Recall Anchors"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs t-mid">
              Click any flashcard to toggle its key constitutional anchor, or reveal all to review before exam drills.
            </p>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border b-line bg-elev px-3 py-1.5 text-xs font-semibold t-hi transition-colors hover:bg-sub"
              @click="toggleAllCloze"
            >
              <UIcon name="i-heroicons-eye" class="h-4 w-4" />
              <span>{{ showClozeAnswers ? 'Hide All Anchors' : 'Reveal All Anchors' }}</span>
            </button>
          </div>

          <div class="space-y-6">
            <!-- Group 1: High-Yield Articles -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-scale" class="h-3.5 w-3.5 text-amber-500" />
                Category A : Critical Constitutional Articles
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Art 124(1) -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art124')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Supreme Court Strength</span>
                  <p class="text-xs font-semibold t-hi mt-1">Who prescribes the number of SC judges?</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art124')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 124(1) : Parliament by Law (34 judges)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- Art 129 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art129')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Court of Record</span>
                  <p class="text-xs font-semibold t-hi mt-1">Contempt &amp; Evidentiary Value</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art129')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 129 (SC) &amp; Article 215 (HC)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- Art 131 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art131')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">Centre-State Disputes</span>
                  <p class="text-xs font-semibold t-hi mt-1">Exclusive Original Jurisdiction</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art131')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 131 (SC Exclusive)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- Art 136 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art136')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Special Leave Petition</span>
                  <p class="text-xs font-semibold t-hi mt-1">Discretionary Apex Appeal</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art136')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 136 (All courts except Armed Forces)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- Art 143 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art143')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">Advisory Jurisdiction</span>
                  <p class="text-xs font-semibold t-hi mt-1">Presidential Reference to SC</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art143')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 143 (Advisory &amp; Non-Binding)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- Art 233 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art233')"
                >
                  <span class="text-[10px] font-mono font-bold text-saffron-600 dark:text-saffron-400">District Judges Appointment</span>
                  <p class="text-xs font-semibold t-hi mt-1">Who appoints District Judges? (PYQ-1113)</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art233')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 233 : Governor + High Court
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 2: Tenures & Retirement Ages -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5 text-emerald-500" />
                Category B : Tenures &amp; Retirement Ages
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- SC vs HC -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-retire')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Judge Retirement Age</span>
                  <p class="text-xs font-semibold t-hi mt-1">SC Judge vs High Court Judge</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-retire')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      SC: 65 Years · HC: 62 Years
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- CAG Tenure -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-cagtenure')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">CAG Tenure</span>
                  <p class="text-xs font-semibold t-hi mt-1">Article 148 Term</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-cagtenure')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      6 Years or 65 Years of Age
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>

                <!-- CVC Tenure -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-cvctenure')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">CVC Term</span>
                  <p class="text-xs font-semibold t-hi mt-1">Central Vigilance Commissioner</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-cvctenure')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      4 Years or 65 Years of Age
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Answer]</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 3: Firsts & Key Leaders -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-user-group" class="h-3.5 w-3.5 text-sky-500" />
                Category C : Pioneer Leaders &amp; Key Committees (PYQ-0303)
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <!-- First CJI -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-firstcji')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">First CJI of India</span>
                  <p class="text-xs font-semibold t-hi mt-1">Supreme Court Pioneer</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-firstcji')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      H.J. Kania (1950-1951)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- First FC Chair -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-firstfc')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">First FC Chairman</span>
                  <p class="text-xs font-semibold t-hi mt-1">1st Finance Commission 1951</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-firstfc')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      K.C. Neogy
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- First CEC -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-firstcec')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">First CEC of India</span>
                  <p class="text-xs font-semibold t-hi mt-1">First Election Commissioner</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-firstcec')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Sukumar Sen
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Inter-State Council Commission -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-isc')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Inter-State Council</span>
                  <p class="text-xs font-semibold t-hi mt-1">Recommending Commission</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-isc')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Sarkaria Commission (1990)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 08 : Dedicated Comparison Matrices -->
        <section id="comparison-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Dedicated Comparison Matrices</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="comparison-matrix"
              section-label="Dedicated Comparison Matrices"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Constitutional vs Statutory vs Courts</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="comparison-matrix"
            section-label="Dedicated Comparison Matrices"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <!-- Matrix 1: Constitutional vs Statutory vs Extra-Constitutional -->
          <div class="mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-table-cells" class="h-4 w-4 text-amber-500" />
              Matrix 1 : Constitutional vs Statutory vs Extra-Constitutional Bodies
            </h3>
            <div class="panel overflow-hidden border b-line">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="border-b b-line bg-sub">
                      <th class="py-3 px-4 font-bold t-hi">Dimension</th>
                      <th class="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">Constitutional Bodies</th>
                      <th class="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">Statutory Bodies</th>
                      <th class="py-3 px-4 font-bold text-sky-600 dark:text-sky-400">Extra-Constitutional Bodies</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[var(--line)]">
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Establishment Source</td>
                      <td class="py-2.5 px-4 t-mid">Directly in the Constitution text</td>
                      <td class="py-2.5 px-4 t-mid">Act of Parliament or State Legislature</td>
                      <td class="py-2.5 px-4 t-mid">Executive Resolution of Cabinet</td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Modification Procedure</td>
                      <td class="py-2.5 px-4 text-rose-600 dark:text-rose-400 font-semibold">
                        Requires Article 368 Constitutional Amendment
                      </td>
                      <td class="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                        Ordinary law amendment by Parliament
                      </td>
                      <td class="py-2.5 px-4 text-sky-600 dark:text-sky-400 font-semibold">
                        Executive decision by Cabinet order
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Prime Examples</td>
                      <td class="py-2.5 px-4 t-mid">
                        CAG (148), ECI (324), FC (280), UPSC (315), AG (76), NCBC (338B), NCSC (338), NCST (338A), Linguistic Minorities (350B)
                      </td>
                      <td class="py-2.5 px-4 t-mid">
                        NHRC (PHRA 1993), CVC (CVC Act 2003), Lokpal (2013), NCW (1990), CIC (RTI Act 2005), NDMA (2005), NALSA (1987)
                      </td>
                      <td class="py-2.5 px-4 t-mid">
                        NITI Aayog (Jan 1, 2015), National Development Council (NDC, 1952)
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Removal Security</td>
                      <td class="py-2.5 px-4 font-bold text-amber-600 dark:text-amber-400">
                        Very high: special majority address for CAG/CEC; SC judicial inquiry for UPSC/SPSC
                      </td>
                      <td class="py-2.5 px-4 t-mid">
                        As provided in statute (usually President on inquiry or specific committee)
                      </td>
                      <td class="py-2.5 px-4 t-mid">
                        At the pleasure of the executive government
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Matrix 2: Supreme Court vs High Court Head-to-Head -->
          <div>
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-emerald-500" />
              Matrix 2 : Supreme Court vs High Courts Head-to-Head Comparison
            </h3>
            <div class="panel overflow-hidden border b-line">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="border-b b-line bg-sub">
                      <th class="py-3 px-4 font-bold t-hi">Constitutional Feature</th>
                      <th class="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">Supreme Court of India (Arts. 124-147)</th>
                      <th class="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">High Courts of India (Arts. 214-231)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[var(--line)]">
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Retirement Age</td>
                      <td class="py-2.5 px-4 font-bold text-rose-600 dark:text-rose-400">65 Years</td>
                      <td class="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">62 Years</td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Strength Determined By</td>
                      <td class="py-2.5 px-4 font-bold text-amber-600 dark:text-amber-400">Parliament by passing a law (Art. 124(1))</td>
                      <td class="py-2.5 px-4 font-bold text-sky-600 dark:text-sky-400">President of India from time to time</td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Distinguished Jurist Criterion</td>
                      <td class="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">YES: Eligible if distinguished jurist in President's opinion</td>
                      <td class="py-2.5 px-4 text-rose-600 dark:text-rose-400 font-bold">NO: No distinguished jurist provision exists for HC!</td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Writ Jurisdiction Scope</td>
                      <td class="py-2.5 px-4 font-semibold text-rose-600 dark:text-rose-400">
                        Narrower: Article 32 only covers Fundamental Rights (Part III)
                      </td>
                      <td class="py-2.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                        Wider: Article 226 covers Fundamental Rights AND any other legal rights
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Territorial Writ Jurisdiction</td>
                      <td class="py-2.5 px-4 t-mid">Throughout the entire territory of India</td>
                      <td class="py-2.5 px-4 t-mid">Within its State / UT or where cause of action arises (Art. 226(2))</td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Resignation Addressed To</td>
                      <td class="py-2.5 px-4 t-mid">President of India</td>
                      <td class="py-2.5 px-4 font-bold text-amber-600 dark:text-amber-400">President of India (NOT the Governor!)</td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-4 font-semibold t-hi">Total Number of Courts</td>
                      <td class="py-2.5 px-4 t-mid">1 Apex Court at New Delhi</td>
                      <td class="py-2.5 px-4 t-mid">25 High Courts across India (25th: Andhra Pradesh at Amaravati)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- 09 : Previous Year Questions -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Previous Year Questions</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="pyqs"
              section-label="Previous Year Questions"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">22 Verified TGPRB PYQs</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="pyqs"
            section-label="Previous Year Questions"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            All 22 official TGPRB questions asked from Judiciary, Writs, and Constitutional/Statutory Bodies across Telangana SI and Constable papers (2015-2023), verified against the canonical examination key.
          </p>

          <!-- Exam Filter Tabs & Score Bar -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border b-line bg-sub">
            <div class="flex items-center gap-1.5">
              <button
                v-for="filter in examFilters"
                :key="filter.value"
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                :class="activeExamFilter === filter.value ? 'bg-saffron-500 text-white shadow-sm dark:text-stone-900' : 'bg-elev t-mid hover:t-hi border b-line'"
                @click="activeExamFilter = filter.value"
              >
                {{ filter.label }}
              </button>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="t-lo">Attempted:</span>
              <span class="font-mono font-bold t-hi">{{ attemptedCount }}/{{ pyqs.length }}</span>
              <span class="t-lo ml-2">Score:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ correctCount }}/{{ attemptedCount }}</span>
            </div>
          </div>

          <!-- PYQ Cards Stream -->
          <div class="space-y-6">
            <div
              v-for="(q, idx) in filteredPyqs"
              :key="q.uid"
              class="panel p-5 bg-elev border b-line"
            >
              <!-- Card Header -->
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                    Q{{ idx + 1 }} · {{ q.uid }}
                  </span>
                  <span class="chip text-[10px]">{{ q.source }}</span>
                  <span class="chip text-[10px]">{{ q.exam }} {{ q.year }}</span>
                </div>
                <button
                  type="button"
                  class="text-[11px] font-mono font-medium accent hover:underline"
                  @click="reveal(q)"
                >
                  {{ q.revealed ? 'Answer Revealed' : 'Show Answer' }}
                </button>
              </div>

              <!-- Question Text -->
              <p class="text-sm font-medium leading-relaxed t-hi whitespace-pre-line mb-4">
                {{ q.question }}
              </p>

              <!-- Options Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <button
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  type="button"
                  class="opt text-left text-xs transition-all"
                  :class="optionClass(q, oi)"
                  @click="attempt(q, oi)"
                >
                  <span class="font-mono text-saffron-500 font-bold mr-2">{{ String.fromCharCode(65 + oi) }}.</span>
                  <span>{{ opt }}</span>
                </button>
              </div>

              <!-- Explanation Box -->
              <div
                v-if="q.revealed"
                class="p-3.5 rounded-lg bg-sub border b-line text-xs space-y-1.5 animate-fadeIn"
              >
                <div class="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4" />
                  <span>Correct Answer: Option {{ String.fromCharCode(65 + q.correct) }}</span>
                </div>
                <p class="t-mid leading-relaxed">{{ q.explanation }}</p>
                <p v-if="q.teaching_explanation" class="t-lo leading-relaxed italic border-t b-line pt-1.5">
                  {{ q.teaching_explanation }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 10 : Advanced Practice Drills -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">Advanced Practice Drills</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="advanced-practice"
              section-label="Advanced Practice Drills"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">TGPSC/TGPRB Standard</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="advanced-practice"
            section-label="Advanced Practice Drills"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            Multi-statement, matching, and assertion-reason drills authored to match the rigorous testing format of recent TGPSC Group-I/II and TGPRB SI Mains papers.
          </p>

          <!-- Advanced Practice Cards -->
          <div class="space-y-6">
            <div
              v-for="(adv, ai) in advancedPractice"
              :key="adv.uid"
              class="panel p-5 bg-elev border b-line"
            >
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2">
                  <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                    ADV-{{ ai + 1 }} · {{ adv.uid }}
                  </span>
                  <span class="chip text-[10px]">{{ adv.format }}</span>
                </div>
                <button
                  type="button"
                  class="text-[11px] font-mono font-medium accent hover:underline"
                  @click="advReveal(adv)"
                >
                  {{ adv.revealed ? 'Answer Revealed' : 'Show Answer' }}
                </button>
              </div>

              <!-- Question Text -->
              <p class="text-sm font-medium leading-relaxed t-hi whitespace-pre-line mb-4">
                {{ adv.question }}
              </p>

              <!-- Options -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <button
                  v-for="(opt, oi) in adv.options"
                  :key="oi"
                  type="button"
                  class="opt text-left text-xs transition-all"
                  :class="advOptionClass(adv, oi)"
                  @click="advAttempt(adv, oi)"
                >
                  <span class="font-mono text-saffron-500 font-bold mr-2">{{ String.fromCharCode(65 + oi) }}.</span>
                  <span>{{ opt }}</span>
                </button>
              </div>

              <!-- Explanation Box -->
              <div
                v-if="adv.revealed"
                class="p-3.5 rounded-lg bg-sub border b-line text-xs space-y-1.5 animate-fadeIn"
              >
                <div class="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4" />
                  <span>Correct Answer: Option {{ String.fromCharCode(65 + adv.correct) }}</span>
                </div>
                <p class="t-mid leading-relaxed">{{ adv.explanation }}</p>
                <p class="t-lo text-[11px] italic pt-1 border-t b-line">Source: {{ adv.source }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 11 : Comprehension Gate -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">11</span>
            <h2 class="sec-title">Comprehension Gate</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="gate"
              section-label="Comprehension Gate"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="gate"
            section-label="Comprehension Gate"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />
          <GateQuiz note-id="NOTE-POL-JUDICIARY" />
        </section>

        <!-- 12 : Current Affairs -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">12</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton
              note-id="NOTE-POL-JUDICIARY"
              section-id="current-affairs"
              section-label="Current Affairs"
              note-title="Judiciary &amp; Constitutional Bodies"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-JUDICIARY"
            section-id="current-affairs"
            section-label="Current Affairs"
            note-title="Judiciary &amp; Constitutional Bodies"
            @open="openNotesDrawer"
          />
          <CurrentAffairsStrip note-id="NOTE-POL-JUDICIARY" />
        </section>

        <!-- Study Mode Transition Banner -->
        <div class="mt-12 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 sm:p-5">
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
            to="/study/judiciary"
            class="inline-flex items-center gap-2 rounded-lg bg-saffron-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-saffron-600 dark:text-stone-900"
          >
            <UIcon name="i-heroicons-bolt" class="h-4 w-4" />
            <span>Start Study Mode</span>
          </NuxtLink>
        </div>

        <!-- Footer nav -->
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

      <!-- Sticky ToC -->
      <TableOfContents
        v-model="activeSection"
        :sections="sections"
        weight-text="3-4 questions per paper across SI &amp; Constable."
      />
    </div>

    <!-- Supplementary Drawers -->
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-POL-JUDICIARY"
      note-title="Judiciary &amp; Constitutional Bodies"
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
            :href="'#' + section.id"
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
import { canonicalNotePyqs } from "~/utils/note-pyqs"
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import TableOfContents from '@/components/TableOfContents.vue'
import CurrentAffairsStrip from '@/components/CurrentAffairsStrip.vue'
import GateQuiz from '@/components/GateQuiz.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import type { SectionContext } from '@/types/annotations'

useHead({
  title: 'Judiciary & Constitutional Bodies - BeatBook',
  meta: [{ name: 'description', content: 'Comprehensive TGPRB study note: Judiciary & Constitutional Bodies with Supreme Court, High Courts, Writs, CAG, ECI, Finance Commission, and 22 verified PYQs.' }],
})

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Supreme Court & High Courts' },
  { label: 'Subordinate Courts & Lok Adalat' },
  { label: '5 Constitutional Writs' },
  { label: 'Comptroller & Auditor General' },
  { label: 'Election Commission of India' },
  { label: 'Finance Commission & UPSC' },
  { label: 'Statutory Bodies (NHRC, CVC, Lokpal)' },
  { label: 'NITI Aayog & Extra-Constitutional Bodies' },
]

const sections = [
  { id: 'visual-architecture',             label: 'Visual Roadmap & 4-Tier Architecture' },
  { id: 'supreme-court',                  label: 'Supreme Court: Composition & Powers' },
  { id: 'high-courts-subordinate',         label: 'High Courts & Subordinate Courts' },
  { id: 'writs-and-doctrines',             label: '5 Writs & Landmark Doctrines' },
  { id: 'constitutional-bodies',           label: 'Constitutional Bodies & Articles' },
  { id: 'statutory-and-non-constitutional',label: 'Statutory & Extra-Constitutional Bodies' },
  { id: 'cloze-recall-anchors',            label: 'High-Yield Cloze Recall Anchors' },
  { id: 'comparison-matrix',               label: 'Dedicated Comparison Matrices' },
  { id: 'pyqs',                           label: 'Previous Year Questions' },
  { id: 'advanced-practice',               label: 'Advanced Practice Drills' },
  { id: 'gate',                           label: 'Comprehension Gate' },
  { id: 'current-affairs',                 label: 'Current Affairs' },
]

const mobileTocOpen = ref(false)
const readProgress = ref(0)
const activeSection = ref('visual-architecture')

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

// Cloze interactive recall state
const showClozeAnswers = ref(false)
const revealedAnchors = reactive(new Set<string>())

function toggleAnchor(id: string) {
  if (revealedAnchors.has(id)) {
    revealedAnchors.delete(id)
  } else {
    revealedAnchors.add(id)
  }
}

function toggleAllCloze() {
  showClozeAnswers.value = !showClozeAnswers.value
}

interface Pyq {
  teaching_explanation?: string
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

const pyqs: Pyq[] = reactive(canonicalNotePyqs([
  {
    "uid": "PYQ-0312",
    "exam": "Constable",
    "year": "2015",
    "tag": "Supreme Court & High Courts",
    "source": "Constable 2015 : Q115",
    "question": "Who among the following headed the Constitutional Bench that invalidated NJAC Act ?",
    "options": [
      "(1) Justice Madan B. Lokur",
      "(2) Justice Kurien Joseph",
      "(3) Justice A.K. Goel",
      "(4) Justice J.S. Kehar"
    ],
    "correct": 3,
    "explanation": "The 5-judge Constitution Bench that struck down the 99th Constitutional Amendment Act and the NJAC Act in October 2015 was headed by Justice J.S. Khehar. By a 4:1 majority, the Supreme Court declared the NJAC unconstitutional and restored the Collegium system to safeguard the independence of the judiciary."
  },
  {
    "uid": "PYQ-2653",
    "exam": "SI",
    "year": "2022",
    "tag": "Supreme Court & High Courts",
    "source": "SI 2022 : Q108",
    "question": "The Supreme Court of India suspended ______ covering sedition",
    "options": [
      "Section 120(B) of IPC",
      "Section 124(A) of IPC",
      "Section 128 of IPC",
      "Section 132 of IPC"
    ],
    "correct": 1,
    "explanation": "Section 124A of the Indian Penal Code (IPC) defines sedition as an offense committed when any person brings or attempts to bring hatred, contempt, or disaffection towards the government established by law. In May 2022, the Supreme Court of India suspended all pending trials and proceedings under Section 124A IPC until the law is re-examined."
  },
  {
    "uid": "PYQ-0523",
    "exam": "Constable",
    "year": "2018",
    "tag": "Supreme Court & High Courts",
    "source": "Constable 2018 : Q102",
    "question": "Who has the power to prescribe the number of judges in Supreme Court?",
    "options": [
      "President in consultation with Prime Minister",
      "President in consultation with Chief Justice of India",
      "Rajya Sabha by passing a law",
      "Parliament by passing a law"
    ],
    "correct": 3,
    "explanation": "Under Article 124(1) of the Indian Constitution, the power to prescribe or increase the number of judges in the Supreme Court rests with Parliament through legislation. In contrast, the strength of a High Court is determined by the President."
  },
  {
    "uid": "PYQ-0936",
    "exam": "Constable",
    "year": "2022",
    "tag": "Supreme Court & High Courts",
    "source": "Constable 2022 : Q117",
    "question": "Who appoints the Supreme Court judges?",
    "options": [
      "Prime Minister",
      "Attorney General",
      "Vice President",
      "President"
    ],
    "correct": 3,
    "explanation": "Under Article 124(2) of the Indian Constitution, the judges of the Supreme Court are appointed by the President of India by warrant under his hand and seal. This appointment is made based on the recommendations of the Supreme Court Collegium system."
  },
  {
    "uid": "PYQ-2236",
    "exam": "SI",
    "year": "2018",
    "tag": "Supreme Court & High Courts",
    "source": "SI 2018 : Q134",
    "question": "Which of the following jurisdictions are enjoyed by the Supreme Court of India?\n(A) Original Jurisdictions (B) Advisory Jurisdictions (C) Appellate Jurisdictions\nChoose the correct answer:",
    "options": [
      "(1) (A) and (B) only",
      "(2) (B) and (C) only",
      "(3) (A) and (C) only",
      "(4) (A), (B) and (C)"
    ],
    "correct": 3,
    "explanation": "The Supreme Court of India enjoys Original Jurisdiction (Article 131) for federal disputes, Advisory Jurisdiction (Article 143) to advise the President, and Appellate Jurisdiction (Articles 132-136) over civil, criminal, and constitutional appeals."
  },
  {
    "uid": "PYQ-0303",
    "exam": "Constable",
    "year": "2015",
    "tag": "Constitutional and Statutory Positions & First Officeholders",
    "source": "Constable 2015 : Q104",
    "question": "Match the following: List-I: (a) First Finance Commission Chairman, (b) First Chief Election Commissioner, (c) First Chief Justice of India, (d) First Chairman of Planning Commission of India. List-II: (i) H.J. Kania, (ii) Jawaharlal Nehru, (iii) K.C. Neogy, (iv) Sukumar Sen.",
    "options": [
      "(a) \u2013 (iv), (b) \u2013 (ii), (c) \u2013 (iii), (d) \u2013 (i)",
      "(a) \u2013 (iii), (b) \u2013 (iv), (c) \u2013 (i), (d) \u2013 (ii)",
      "(a) \u2013 (ii), (b) \u2013 (iv), (c) \u2013 (iii), (d) \u2013 (i)",
      "(a) \u2013 (i), (b) \u2013 (ii), (c) \u2013 (iv), (d) \u2013 (iii)"
    ],
    "correct": 1,
    "explanation": "K.C. Neogy was appointed as the chairman of the First Finance Commission in 1951. Sukumar Sen served as India's first Chief Election Commissioner, H.J. Kania was the first Chief Justice of independent India, and Jawaharlal Nehru, as Prime Minister, served as the ex-officio first Chairman of the Planning Commission."
  },
  {
    "uid": "PYQ-0549",
    "exam": "Constable",
    "year": "2018",
    "tag": "Supreme Court & High Courts",
    "source": "Constable 2018 : Q128",
    "question": "Read the following statements about High Courts in India :\na. A separate High Court for the state of Andhra Pradesh was constituted by the President of India with effect from January 1, 2019.\nb. With the creation of this new High Court, India has 27 High Courts as on March 1, 2019.\nChoose the correct answer:",
    "options": [
      "Both a and b are correct",
      "Both a and b are not correct",
      "Only a is correct",
      "Only b is correct"
    ],
    "correct": 2,
    "explanation": "A separate High Court for Andhra Pradesh (principal seat at Amaravati) was constituted with effect from January 1, 2019. With this addition, the total number of High Courts in India became 25, not 27."
  },
  {
    "uid": "PYQ-1113",
    "exam": "Constable",
    "year": "2023",
    "tag": "Supreme Court & High Courts",
    "source": "Constable 2023 : Q97",
    "question": "Under which article in constitution of India, District Judges are appointed?",
    "options": [
      "243",
      "233",
      "320",
      "None of the above"
    ],
    "correct": 1,
    "explanation": "Article 233 of the Indian Constitution deals with the appointment, posting, and promotion of District Judges in a State, which is done by the Governor in consultation with the High Court exercising jurisdiction over that State."
  },
  {
    "uid": "PYQ-1562",
    "exam": "SI",
    "year": "2016",
    "tag": "Legal Services Authorities & Free Legal Aid",
    "source": "SI 2016 : Q119",
    "question": "Which of the following statements are correct?\na) The first mobile court was started in Haryana\nb) The executive chairman of National Legal Services Authority is Justice Anil R.Dave\nc) Article 40 provides for free legal aid\nd) Legal Services Authorities Act was enacted in 1987",
    "options": [
      "a, b & c",
      "a, b & d",
      "b, c & d",
      "a & d"
    ],
    "correct": 1,
    "explanation": "Statement (a) is correct as India's first mobile court was inaugurated at Punhana in Mewat district, Haryana in 2007. Statement (d) is correct because the Legal Services Authorities Act was passed in 1987. Statement (c) is incorrect because free legal aid is provided under Article 39A (Directive Principles), whereas Article 40 deals with the organisation of village panchayats."
  },
  {
    "uid": "PYQ-0321",
    "exam": "Constable",
    "year": "2015",
    "tag": "Supreme Court & High Courts",
    "source": "Constable 2015 : Q124",
    "question": "Assertion (A) : Public Interest Litigation protects peoples' cause.\nReason (R) : Higher Courts have the discretion to admit Public Interest Litigations.",
    "options": [
      "Both (A) and (R) are individually true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are individually true but (R) is not the correct explanation of (A)",
      "(A) is true but (R) is false",
      "(A) is false but (R) is true"
    ],
    "correct": 1,
    "explanation": "Assertion (A) is true as PIL allows public-spirited citizens to file petitions for enforcing public welfare and human rights. Reason (R) is also true because the Supreme Court and High Courts hold discretionary power to entertain or reject PILs to curb frivolous litigation. However, this discretionary power is a procedural safeguard and not the reason why PIL protects the cause of the people."
  },
  {
    "uid": "PYQ-0760",
    "exam": "Constable",
    "year": "2018",
    "tag": "Important Constitutional Amendments",
    "source": "Constable 2018 : Q140",
    "question": "Which Amendment of Indian constitution implicitly says that fundamental rights are amendable under the procedure laid down in Article 368?",
    "options": [
      "29th",
      "42nd",
      "25th",
      "24th"
    ],
    "correct": 3,
    "explanation": "The 24th Constitutional Amendment Act, 1971 was passed to counteract the Golaknath judgement (1967). It explicitly amended Articles 13 and 368 to clarify that Parliament has the power to amend any part of the Constitution, including Fundamental Rights, using the procedure in Article 368."
  },
  {
    "uid": "PYQ-3062",
    "exam": "SI",
    "year": "2023",
    "tag": "Important Constitutional Amendments",
    "source": "SI 2023 : Q133",
    "question": "The anti-defection law is part of which schedule of Indian Constitution ?",
    "options": [
      "II Schedule",
      "VI Schedule",
      "VII Schedule",
      "X Schedule"
    ],
    "correct": 3,
    "explanation": "The Anti-Defection Law was inserted into the Indian Constitution as the 10th Schedule (Tenth Schedule) through the 52nd Constitutional Amendment Act of 1985. It lays down the process and criteria for disqualifying elected legislators on grounds of defecting from one political party to another."
  },
  {
    "uid": "PYQ-0318",
    "exam": "Constable",
    "year": "2015",
    "tag": "Attorney General of India",
    "source": "Constable 2015 : Q121",
    "question": "Read the following statements\n(a) The present Attorney General is Mukul Rohatgi\n(b) The Attorney General is appointed by Chief Justice of India\n(c) The tenure of office of Attorney General is six years\nWhich of the statement given above is/are correct ?",
    "options": [
      "(1) (a) and (c)",
      "(2) (b) and (c)",
      "(3) (b) and (a)",
      "(4) (a) only"
    ],
    "correct": 3,
    "explanation": "Under Article 76 of the Indian Constitution, the Attorney General is appointed by the President (not the CJI) and holds office during the pleasure of the President, meaning there is no fixed tenure of six years. Thus, statements (b) and (c) are incorrect, making (a) only the correct choice."
  },
  {
    "uid": "PYQ-0320",
    "exam": "Constable",
    "year": "2015",
    "tag": "Finance Commission (Article 280)",
    "source": "Constable 2015 : Q123",
    "question": "Which among the following is/are correct statements ?\n(A) The 14th Finance Commission was headed by Dr. Y.V. Reddy\n(B) The 14th Finance Commission recommended devolution of 42% of funds to State Governments\n(C) Finance Commission is appointed by Union Finance Minister",
    "options": [
      "(A) and (C)",
      "(A) and (B)",
      "(B) and (C)",
      "(A) only"
    ],
    "correct": 1,
    "explanation": "Statements (A) and (B) are correct: Dr. Y.V. Reddy chaired the 14th Finance Commission, which recommended a historic hike in state share of central taxes from 32% to 42%. Statement (C) is incorrect because the Finance Commission is constituted by the President of India under Article 280 of the Constitution, not by the Union Finance Minister."
  },
  {
    "uid": "PYQ-0516",
    "exam": "Constable",
    "year": "2018",
    "tag": "Inter-State Council & Constitutional/Statutory Bodies",
    "source": "Constable 2018 : Q95",
    "question": "Which one of the following is not correct statement with regard to Inter-State Council ?",
    "options": [
      "It's Chairman is Prime Minister.",
      "All Chief Ministers are it's members.",
      "It was constituted on the recommendation of Justice J.S. Verma Committee report.",
      "Administrators of Union Territories not having Legislative Assembly are its members."
    ],
    "correct": 2,
    "explanation": "The Inter-State Council was set up in May 1990 under Article 263 of the Constitution on the recommendation of the Sarkaria Commission (1983-88), not the Justice J.S. Verma Committee. It is chaired by the Prime Minister and includes Chief Ministers of all States and UTs as well as Administrators of UTs without assemblies."
  },
  {
    "uid": "PYQ-0649",
    "exam": "Constable",
    "year": "2018",
    "tag": "Election Commission, UPSC, CAG & Finance Commission",
    "source": "Constable 2018 : Q28",
    "question": "Read the following statements about the Election Commission:\na. The Prime Minister of India appointed Sunil Chandra as the Election Commissioner in February 2019.\nb. The appointment of Election Commissioner is made under the clause 2 of Article 324 of the Indian Constitution.\nChoose the correct answer:",
    "options": [
      "Both a and b are correct",
      "Both a and b are not correct",
      "Only a is correct",
      "Only b is correct"
    ],
    "correct": 3,
    "explanation": "Statement 'a' is incorrect because the Election Commissioners are appointed by the President of India, not the Prime Minister. Statement 'b' is correct because Article 324(2) of the Indian Constitution specifies that the appointment of the Chief Election Commissioner and other Election Commissioners shall be made by the President."
  },
  {
    "uid": "PYQ-0763",
    "exam": "Constable",
    "year": "2018",
    "tag": "Important Constitutional Amendments",
    "source": "Constable 2018 : Q143",
    "question": "Which constitutional amendment conferred constitutional status on the National Commission for Backward classes ?",
    "options": [
      "102nd",
      "103rd",
      "100th",
      "101th"
    ],
    "correct": 0,
    "explanation": "The 102nd Constitutional Amendment Act of 2018 granted constitutional status to the National Commission for Backward Classes (NCBC). It inserted Article 338B into the Constitution, defining the structure, duties, and powers of the commission."
  },
  {
    "uid": "PYQ-2519",
    "exam": "SI",
    "year": "2018",
    "tag": "Election Commission, UPSC, CAG & Finance Commission",
    "source": "SI 2018 : Q169",
    "question": "Which of the following responsibilities are under the preview of the Finance Commission? (a) Sharing of net proceeds of taxes between the centre and states. (b) Recommending the principles for governing the grant-in-aid to the states by the centre. (c) Recommendation on the matters referred to it by the President for the interest of sound finance. Choose the correct answer:",
    "options": [
      "(a) only",
      "(b) only",
      "(b) and (c) only",
      "(a), (b) and (c)"
    ],
    "correct": 3,
    "explanation": "Under Article 280(3) of the Indian Constitution, the Finance Commission is tasked with recommending tax distribution between the Union and States, establishing principles for Grants-in-Aid to States, and addressing any other matter referred to it by the President in the interest of sound finance."
  },
  {
    "uid": "PYQ-3049",
    "exam": "SI",
    "year": "2023",
    "tag": "Election Commission, UPSC, CAG & Finance Commission; NITI Aayog, NHRC, Lokpal & Tribunals; Important Constitutional Amendments",
    "source": "SI 2023 : Q120",
    "question": "Identify the Indian Constitutional Body among the following.",
    "options": [
      "Central Council of Indian Medicine",
      "Special Officer for Linguistic Minorities",
      "Central Council of Homeotherapy",
      "Transport Development Council"
    ],
    "correct": 1,
    "explanation": "The Special Officer for Linguistic Minorities is a Constitutional Body provided under Article 350B of the Indian Constitution, inserted by the 7th Constitutional Amendment Act of 1956. In contrast, the Central Council of Indian Medicine and Central Council of Homoeopathy are statutory bodies created by Acts of Parliament."
  },
  {
    "uid": "PYQ-0627",
    "exam": "Constable",
    "year": "2018",
    "tag": "Lokpal & Search Committee",
    "source": "Constable 2018 : Q6",
    "question": "Lokpal search committee, which was constituted by the government of India in September, 2018 is headed by:",
    "options": [
      "Sakha Ram Singh Yadav",
      "A. Surya Prakash",
      "Arundhati Bhattacharya",
      "Ranjana Prakash Desai"
    ],
    "correct": 3,
    "explanation": "In September 2018, the Government of India constituted an eight-member search committee headed by former Supreme Court judge Justice Ranjana Prakash Desai to recommend a panel of names for the chairperson and members of Lokpal. Under the Lokpal and Lokayuktas Act, 2013, the search committee assists the Selection Committee chaired by the Prime Minister."
  },
  {
    "uid": "PYQ-1796",
    "exam": "SI",
    "year": "2016",
    "tag": "NITI Aayog, NHRC, Lokpal & Tribunals",
    "source": "SI 2016 : Q127",
    "question": "NITI Ayog stands for",
    "options": [
      "National Institute for Technical Investigation",
      "National Income Transfer to Individuals",
      "National Institute for Transforming India",
      "National Intelligence Training Institute"
    ],
    "correct": 2,
    "explanation": "NITI Aayog stands for National Institution (or Institute) for Transforming India. Formed on January 1, 2015, via a Cabinet resolution, it replaced the Planning Commission to serve as the premier policy think tank of the Indian Government."
  },
  {
    "uid": "PYQ-2707",
    "exam": "SI",
    "year": "2022",
    "tag": "NITI Aayog, NHRC, Lokpal & Tribunals; Important Constitutional Amendments",
    "source": "SI 2022 : Q163",
    "question": "Identify the Non-Constitutional Body.",
    "options": [
      "National Human Rights Commission",
      "Election Commission of India",
      "National Commission for SCs",
      "National Commission for STs"
    ],
    "correct": 0,
    "explanation": "The National Human Rights Commission (NHRC) is a statutory (non-constitutional) body established under the Protection of Human Rights Act, 1993. On the other hand, the Election Commission (Article 324), National Commission for SCs (Article 338), and National Commission for STs (Article 338A) are constitutional bodies established directly by the Constitution of India."
  }
]))

const activeExamFilter = ref('all')
const examFilters = [
  { label: 'All Exams (22)', value: 'all' },
  { label: 'Constable (14)', value: 'Constable' },
  { label: 'SI (8)', value: 'SI' },
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
  format: 'Multi-statement' | 'Matching' | 'Assertion-Reason'
  revealed: boolean
  selected: number | null
}

const advancedPractice: AdvPractice[] = reactive([
  {
    "uid": "ADV-POL-JUD-001",
    "question": "Consider the following statements regarding the Supreme Court and High Courts of India:\n\n1. The power to increase the number of judges in the Supreme Court is vested in Parliament by law under Article 124(1).\n2. The strength of a High Court is determined from time to time by the President of India.\n3. A distinguished jurist in the opinion of the President is eligible to be appointed as a judge of both the Supreme Court and the High Court.\n4. A High Court judge submits their resignation in writing to the Governor of the respective State.\n\nWhich of the statements given above are correct?",
    "options": [
      "1 and 2 only",
      "1, 2 and 3 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1 and 2 are correct. Statement 3 is incorrect because the 'distinguished jurist' category exists only for appointment to the Supreme Court under Article 124(3)(c), not for High Courts under Article 217. Statement 4 is incorrect because a High Court judge addresses their resignation to the President of India under Article 217(1)(a), NOT to the Governor.",
    "source": "TGPSC-Style Advanced Drill (Derived from Arts. 124 & 217)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-JUD-002",
    "question": "Match List-I (Constitutional Writ) with List-II (Core Operational Scope):\n\nList-I:\nA. Habeas Corpus\nB. Mandamus\nC. Prohibition\nD. Quo-Warranto\n\nList-II:\n1. Commands a public authority to perform a mandatory statutory or constitutional duty\n2. Prevents illegal usurpation of a public office; can be sought by any citizen without locus standi\n3. Protects personal liberty against unlawful detention; can be issued against both public and private entities\n4. Issued to a lower judicial body to prevent it from exceeding its jurisdiction while proceedings are ongoing\n\nChoose the correct option:",
    "options": [
      "A-3, B-1, C-4, D-2",
      "A-1, B-3, C-4, D-2",
      "A-3, B-1, C-2, D-4",
      "A-4, B-1, C-3, D-2"
    ],
    "correct": 0,
    "explanation": "Habeas Corpus protects liberty and applies against both public and private entities (A-3). Mandamus commands performance of an official duty (B-1). Prohibition stops a lower tribunal from exceeding jurisdiction (C-4). Quo-Warranto challenges illegal usurpation of public office and requires no victim locus standi (D-2).",
    "source": "TGPSC-Style Advanced Drill (Derived from Arts. 32 & 226)",
    "format": "Matching",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-JUD-003",
    "question": "With reference to the constitutional and statutory bodies in India, examine the following statements:\n\n1. The Comptroller and Auditor General audits the accounts of both the Union and the State governments.\n2. The Chief Election Commissioner can be removed from office only in like manner and on like grounds as a Judge of the Supreme Court.\n3. The members of a State Public Service Commission are appointed by the Governor and can be removed from office by the Governor.\n4. The National Human Rights Commission is a statutory body established under the Protection of Human Rights Act, 1993.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2 and 4 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 2, and 4 are correct. Statement 3 is incorrect because although members of a State Public Service Commission are appointed by the Governor (Article 316), they can be removed from office ONLY BY THE PRESIDENT of India under Article 317 on grounds of misbehaviour after an inquiry by the Supreme Court.",
    "source": "TGPSC-Style Advanced Drill (Derived from Arts. 148, 317, 324 & PHRA 1993)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-JUD-004",
    "question": "Match List-I (Body / Commission) with List-II (Originating Recommendation / Statute):\n\nList-I:\nA. Central Vigilance Commission (CVC)\nB. Inter-State Council\nC. Lok Adalat statutory recognition\nD. National Commission for Backward Classes (NCBC) constitutional status\n\nList-II:\n1. 102nd Constitutional Amendment Act, 2018 (Article 338B)\n2. Sarkaria Commission Recommendation (Constituted 1990 under Art. 263)\n3. Santhanam Committee Recommendation (1964)\n4. Legal Services Authorities Act, 1987 (Article 39A)\n\nChoose the correct option:",
    "options": [
      "A-3, B-2, C-4, D-1",
      "A-2, B-3, C-4, D-1",
      "A-3, B-2, C-1, D-4",
      "A-4, B-2, C-3, D-1"
    ],
    "correct": 0,
    "explanation": "CVC originated from Santhanam Committee recommendations (A-3). Inter-State Council was set up in 1990 following Sarkaria Commission recommendations (B-2). Lok Adalats received statutory footing under the Legal Services Authorities Act 1987 (C-4). NCBC received constitutional status via the 102nd Constitutional Amendment Act 2018 under Article 338B (D-1).",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0516, PYQ-0763 & PYQ-1562)",
    "format": "Matching",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-JUD-005",
    "question": "Consider the following statements regarding the Election Commission of India (ECI) under Article 324:\n\n1. From the commencement of the Constitution in 1950 until October 1989, the Election Commission functioned as a single-member body.\n2. The Chief Election Commissioner and the two Election Commissioners have equal powers and receive equal salary and allowances equal to a Judge of the Supreme Court.\n3. In case of difference of opinion amongst the Chief Election Commissioner and other Election Commissioners, the matter is decided according to the opinion of the majority.\n4. The conditions of service and tenure of office of Election Commissioners are determined by the President.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2, 3 and 4",
      "1, 2 and 3 only",
      "2 and 3 only",
      "1 and 4 only"
    ],
    "correct": 0,
    "explanation": "All four statements are correct. ECI started as a single-member body (1950-1989) and became permanently multi-member in October 1993. The CEC and ECs enjoy identical status, salary, and powers; differences are resolved by majority vote; and service conditions are regulated by Parliament / President under Article 324(5).",
    "source": "TGPSC-Style Advanced Drill (Derived from Art. 324 & PYQ-0649)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-JUD-006",
    "question": "Consider the following statements regarding Subordinate Courts and Alternative Dispute Resolution in India:\n\n1. District Judges are appointed by the Governor of the State in consultation with the High Court exercising jurisdiction under Article 233.\n2. A Sessions Judge has the power to impose capital punishment (death sentence), but it must be confirmed by the High Court before execution.\n3. An award passed by a Lok Adalat is deemed to be a decree of a civil court, but an appeal lies against it to the High Court.\n4. The first mobile court in India was launched in Haryana in 2007.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2 and 4 only",
      "1 and 2 only",
      "2 and 3 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 2, and 4 are correct. Statement 3 is incorrect because under the Legal Services Authorities Act 1987, every award of a Lok Adalat is final and binding on all parties, and NO APPEAL lies to any court against an award of a Lok Adalat.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-1113 & PYQ-1562)",
    "format": "Multi-statement",
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
