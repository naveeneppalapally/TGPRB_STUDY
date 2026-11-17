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
          <span class="t-mid">Fundamental Rights, DPSP &amp; Duties</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="chip chip-saffron"><span class="dot" />T1 : High priority</span>
              <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                🎯 Projected 2026: 4-5 Questions (4-5 Marks)
              </span>
              <span class="chip">{{ pyqs.length }} verified PYQs</span>
              <span class="chip">Polity</span>
            </div>
            <NuxtLink
              to="/study/fundamental-rights-dpsp-duties"
              class="inline-flex items-center gap-2 rounded-lg border border-saffron-500/40 bg-saffron-500/10 px-3 py-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-300 transition-colors hover:bg-saffron-500/20"
            >
              <UIcon name="i-heroicons-book-open" class="h-4 w-4" />
              <span>Study Mode (3-Zone)</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Fundamental Rights, DPSP &amp; Fundamental Duties
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive forensic study notes covering Parts III, IV, and IV-A (Articles 12-51A): The Triad of Liberty, Right to Equality (Arts. 14-18), Right to Freedom &amp; Life (Arts. 19-22), Protection against Exploitation, Religious Freedoms &amp; Constitutional Remedies (Arts. 23-32), Directive Principles of State Policy (Arts. 36-51), and Fundamental Duties (Art. 51A).
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />12 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />{{ pyqs.length }} verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~30 min read
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
            to="/study/fundamental-rights-dpsp-duties"
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
            Mastering the Triad of Liberty (Fundamental Rights, DPSP &amp; Duties) guarantees 100% precision on high-frequency constitutional questions in TGPRB SI &amp; Constable papers.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Predicted 2026 Question Patterns
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct factual recall, multi-statement evaluations, and case matching testing <strong class="t-hi">Articles 20 &amp; 21 Non-Suspendability</strong> during National Emergency (44th CAA 1978), <strong class="t-hi">Right to Equality Exceptions</strong> (Articles 15(3) women/children, 16(4) backward class reservations; economic equality is not an FR), <strong class="t-hi">Abolition of Untouchability</strong> (Art. 17 enforced by PCR Act 1955 and SC-ST Atrocities Act 1989), <strong class="t-hi">Right to Education</strong> (Art. 21A inserted by 86th CAA 2002, 6-14 years), <strong class="t-hi">DPSP Classification</strong> (Art. 39A free legal aid, Art. 40 village panchayats, Art. 44 UCC, Art. 48A environment), <strong class="t-hi">FR vs DPSP Balance</strong> (Champakam Dorairajan to Minerva Mills), and <strong class="t-hi">Fundamental Duties</strong> (Swaran Singh Committee, 42nd CAA added 10 duties, 86th CAA added 11th duty, non-justiciable).
              </p>
            </div>
          </div>
        </section>

        <!-- 01 : Visual Architecture & The Triad of Liberty -->
        <section id="visual-architecture" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Architecture &amp; The Triad of Liberty (Arts. 12-51A)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="visual-architecture"
              section-label="Visual Architecture &amp; The Triad of Liberty"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 12-51A Conscience</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="visual-architecture"
            section-label="Visual Architecture &amp; The Triad of Liberty"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: The "Conscience of the Constitution"
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Renowned constitutional scholar Granville Austin described Fundamental Rights and Directive Principles as the <strong class="t-hi">"Conscience of the Constitution"</strong>. Think of these three parts as the complete social contract of India:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">1. Part III (Fundamental Rights):</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The Shield. Negative commands against the State to prevent tyranny and guarantee political democracy (Justiciable in court).
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">2. Part IV (Directive Principles):</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The Blueprint. Positive duties directing governments to build a socio-economic welfare state (Non-justiciable, moral duties of law-makers).
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">3. Part IV-A (Fundamental Duties):</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The Citizen's Pledge. Moral reminders that citizens cannot demand rights from the nation while vandalizing public property or dishonoring national symbols.
                </p>
              </div>
            </div>
          </div>

          <!-- Articles 12 & 13 Deep-Dive Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Article 12: Definition of State -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Article 12</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Who is Bound?</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Definition of "The State" (Art. 12 &amp; 36)</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <p>
                  Fundamental Rights are mostly claims of citizens <strong class="t-hi">against the State</strong> (not private persons). Article 12 defines what counts as "State" across four clear pillars:
                </p>
                <ul class="list-disc pl-4 space-y-1">
                  <li><strong class="t-hi">Central Level:</strong> Government of India (Executive) and Parliament of India.</li>
                  <li><strong class="t-hi">State Level:</strong> Government of each State (Executive) and State Legislatures.</li>
                  <li><strong class="t-hi">Local Authorities:</strong> Municipalities, Panchayats, District Boards, Improvement Trusts.</li>
                  <li><strong class="t-hi">Other Authorities:</strong> Statutory and non-statutory bodies acting as agencies of the State (e.g. LIC, ONGC, SAIL, UGC).</li>
                </ul>
                <div class="p-2.5 rounded bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-700 dark:text-amber-300">
                  <strong>Exam Connection (PYQ-2202):</strong> Article 36 in Part IV defines "the State" identically to Article 12. Purely private companies (like private schools without government aid) do not fall under Article 12.
                </div>
              </div>
            </div>

            <!-- Article 13: Judicial Review & Laws Void -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 13</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Judicial Review Bedrock</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Laws Inconsistent with Rights are Void</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <p>
                  Article 13 provides the constitutional teeth for <strong class="t-hi">Judicial Review (PYQ-1835)</strong>:
                </p>
                <ul class="list-disc pl-4 space-y-1">
                  <li><strong class="t-hi">Article 13(1) - Pre-Constitutional Laws:</strong> Laws existing before 26 Jan 1950 become void to the extent of inconsistency (<em class="t-hi">Doctrine of Eclipse</em>: the law goes to sleep).</li>
                  <li><strong class="t-hi">Article 13(2) - Post-Constitutional Laws:</strong> The State shall NOT make any law taking away or abridging Fundamental Rights; any law made in violation is void from birth (<em class="t-hi">Doctrine of Severability</em>).</li>
                  <li><strong class="t-hi">What counts as "Law"? (Art. 13(3)):</strong> Ordinances, orders, bye-laws, rules, regulations, notifications, customs, or usages.</li>
                  <li><strong class="t-hi">The Golaknath Precedent (PYQ-1561):</strong> In 1967, an 11-judge SC bench ruled that constitutional amendments under Art. 368 are also "law" under Art. 13(2) and cannot touch Fundamental Rights. This was countered by the 24th Amendment, leading to <em class="t-hi">Kesavananda Bharati (1973)</em> which created the <strong class="t-hi">Basic Structure Doctrine</strong>!</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 02 : Right to Equality & Social Justice -->
        <section id="right-to-equality" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Right to Equality &amp; Social Justice (Arts. 14-18)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="right-to-equality"
              section-label="Right to Equality &amp; Social Justice"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 14-18 Parity</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="right-to-equality"
            section-label="Right to Equality &amp; Social Justice"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-emerald-500" />
              The Big Picture: Treating Equals Equally
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Equality does not mean treating unequals equally. If a police exam forced an Olympic sprinter and an ordinary candidate with a disability to run the same race without adjustment, that would be injustice! The Indian Constitution permits <strong class="t-hi">reasonable classification and affirmative action</strong> so underprivileged sections can compete on equal terms.
            </p>
            <div class="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
              CRITICAL EXAM FACT (PYQ-0513): The Right to Equality includes legal equality, social non-discrimination, title abolition, and untouchability abolition. Economic equality (equal wealth distribution) is NOT a Fundamental Right!
            </div>
          </div>

          <!-- Articles 14 to 18 Detailed Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Article 14 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Article 14 · PYQ-1002</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Twin Concepts</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Equality Before Law vs Equal Protection</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-amber-600 dark:text-amber-400">1. Equality Before the Law (British Concept):</p>
                  <p class="t-lo mt-0.5">Negative concept based on Dicey's Rule of Law: No individual (whether a minister, constable, or farmer) is above the ordinary law of the land.</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">2. Equal Protection of the Laws (American Concept):</p>
                  <p class="t-lo mt-0.5">Positive concept: Equals must be treated equally in equal circumstances. Permits reasonable classification based on <strong class="t-hi">Intelligible Differentia</strong> (clear difference) with a <strong class="t-hi">Rational Nexus</strong> (logical link) to the goal.</p>
                </div>
                <p class="text-[11px] t-lo">Available to all persons (both Indian citizens and foreigners, and legal corporations).</p>
              </div>
            </div>

            <!-- Article 15 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 15 · PYQ-3060, PYQ-0764</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">5 Grounds Only</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Prohibition of Discrimination</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <p>
                  The State shall not discriminate against any citizen on grounds <strong class="t-hi">ONLY of Religion, Race, Caste, Sex, or Place of Birth</strong>.
                </p>
                <div class="space-y-1.5 text-xs">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">The 4 Special Exceptions (Affirmative Action):</p>
                  <ul class="list-disc pl-4 space-y-1 t-lo">
                    <li><strong class="t-hi">Art. 15(3) (PYQ-0764):</strong> Special provisions for <strong class="t-hi">women and children</strong> (e.g. free education, maternity benefits, reserved seats).</li>
                    <li><strong class="t-hi">Art. 15(4):</strong> Special provisions for Socially and Educationally Backward Classes (SEBCs), SCs, and STs (added by 1st CAA 1951).</li>
                    <li><strong class="t-hi">Art. 15(5):</strong> Reservations in higher educational institutions (including private aided/unaided, except minority schools per 93rd CAA 2005).</li>
                    <li><strong class="t-hi">Art. 15(6):</strong> Up to 10% reservation for Economically Weaker Sections (EWS per 103rd CAA 2019).</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Article 16 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Article 16 · PYQ-2470</span>
                <span class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">Public Jobs</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Equal Opportunity in Public Employment</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <p>
                  Guarantees equality of opportunity for all citizens in state jobs. Prohibits discrimination on <strong class="t-hi">7 grounds</strong>: Religion, Race, Caste, Sex, Place of Birth, <strong class="t-hi">Descent</strong>, and <strong class="t-hi">Residence</strong>.
                </p>
                <div class="space-y-1.5 text-xs">
                  <p class="font-bold text-sky-600 dark:text-sky-400">Key Constitutional Exceptions:</p>
                  <ul class="list-disc pl-4 space-y-1 t-lo">
                    <li><strong class="t-hi">Art. 16(3):</strong> Parliament (not State Legislatures) can prescribe residence qualifications for certain state jobs.</li>
                    <li><strong class="t-hi">Art. 16(4):</strong> Reservations for backward classes not adequately represented in state services.</li>
                    <li><strong class="t-hi">Art. 16(4A) &amp; (4B):</strong> Reservations in promotions for SC/ST with consequential seniority (77th &amp; 85th CAA) and carry-forward backlog vacancy rule (81st CAA).</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Articles 17 & 18 -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Articles 17 &amp; 18 · PYQ-0785, PYQ-0787</span>
                <span class="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">Dignity Shield</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Abolition of Untouchability &amp; Titles</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold text-rose-600 dark:text-rose-400">Article 17 - Abolition of Untouchability:</p>
                  <p class="mt-0.5 t-lo">
                    Untouchability is abolished and its practice in any form is forbidden. It is an <strong class="t-hi">absolute Fundamental Right</strong> with zero exceptions.
                  </p>
                  <ul class="list-disc pl-4 mt-1 space-y-0.5 text-[11px] t-lo">
                    <li>"Untouchability" is NOT defined anywhere in the Constitution or in any Act!</li>
                    <li>Enforced via <strong class="t-hi">Protection of Civil Rights Act, 1955</strong> (originally Untouchability Offences Act, renamed in 1976).</li>
                    <li>Strengthened by <strong class="t-hi">SC &amp; ST (Prevention of Atrocities) Act, 1989 (PYQ-0787)</strong>.</li>
                  </ul>
                </div>
                <div>
                  <p class="font-bold text-amber-600 dark:text-amber-400">Article 18 - Abolition of Titles:</p>
                  <p class="mt-0.5 t-lo">
                    Abolishes hereditary titles (Rai Bahadur, Maharaja). The State confers only military (Param Vir Chakra) and academic distinctions.
                  </p>
                  <p class="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
                    <strong>Balaji Raghavan Case (1996):</strong> Supreme Court held that Bharat Ratna and Padma awards are national honors, not titles under Art. 18. However, they cannot be used as prefixes or suffixes to names!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 03 : Right to Freedom, Life & Personal Liberty -->
        <section id="right-to-freedom" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Right to Freedom, Life &amp; Liberty (Arts. 19-22)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="right-to-freedom"
              section-label="Right to Freedom, Life &amp; Liberty"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 19-22 Freedoms</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="right-to-freedom"
            section-label="Right to Freedom, Life &amp; Liberty"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-sky-500/25 bg-sky-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-sky-500" />
              The Big Picture: Civil Liberty &amp; The Emergency Shield
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Articles 19 to 22 form the core of democratic individual freedom. While freedom of speech and movement can be regulated for national security, your life, bodily dignity, and protection against arbitrary arrest are protected by ironclad safeguards:
            </p>
            <div class="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 font-semibold">
              THE #1 EXAM TRAP (PYQ-1789): Under Article 359 (as amended by the 44th Amendment Act 1978), Articles 20 and 21 CANNOT BE SUSPENDED even during a National Emergency! The State can never take away your protection against illegal punishment or right to life.
            </div>
          </div>

          <!-- Freedom & Liberty Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Article 19: The 6 Freedoms -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Article 19 · PYQ-2198</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Citizens Only</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">The Six Democratic Freedoms</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <p>Originally guaranteed 7 freedoms; the 44th CAA 1978 abolished Art. 19(1)(f) Right to Property. The remaining 6 freedoms are:</p>
                <ul class="list-disc pl-4 space-y-1">
                  <li><strong class="t-hi">19(1)(a):</strong> Freedom of speech and expression (includes freedom of press, right to silence, right to know).</li>
                  <li><strong class="t-hi">19(1)(b):</strong> Freedom to assemble peaceably and without arms.</li>
                  <li><strong class="t-hi">19(1)(c):</strong> Freedom to form associations, unions, or co-operative societies (co-ops added by 97th CAA 2011).</li>
                  <li><strong class="t-hi">19(1)(d):</strong> Freedom to move freely throughout the territory of India.</li>
                  <li><strong class="t-hi">19(1)(e):</strong> Freedom to reside and settle in any part of India.</li>
                  <li><strong class="t-hi">19(1)(g):</strong> Freedom to practise any profession, trade, or business.</li>
                </ul>
                <div class="p-2 rounded bg-sub border b-line text-[11px] t-lo">
                  <strong>Reasonable Restrictions (Arts. 19(2)-19(6)):</strong> None of these freedoms are absolute; restricted on grounds like sovereignty, integrity, public order, and morality.
                </div>
              </div>
            </div>

            <!-- Article 20: Criminal Safeguards -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 20 · PYQ-2511</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">3 Criminal Shields</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Protection in Respect of Conviction</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-amber-600 dark:text-amber-400">1. No Ex-Post Facto Law (Art. 20(1)):</p>
                  <p class="t-lo mt-0.5">No person can be punished for an act that was not a crime when committed, nor given a punishment higher than what existed at the time. Applies ONLY to criminal laws, NOT civil/tax liabilities.</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">2. No Double Jeopardy (Art. 20(2)):</p>
                  <p class="t-lo mt-0.5">No person shall be prosecuted and punished for the same offence twice. Applies only before a court of law or judicial tribunal (departmental suspension is not double jeopardy!).</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-sky-600 dark:text-sky-400">3. No Self-Incrimination (Art. 20(3)):</p>
                  <p class="t-lo mt-0.5">No accused person can be compelled to be a witness against himself. Note: Giving voice samples, fingerprints, or signature specimens does NOT violate Art. 20(3) (<em class="t-hi">Kathi Kalu Oghad case</em>).</p>
                </div>
              </div>
            </div>

            <!-- Article 21 & 21A: Life, Liberty & Education -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Articles 21 &amp; 21A · PYQ-1791, PYQ-2702</span>
                <span class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">The Golden Article</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Right to Life, Privacy &amp; Education</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold text-sky-600 dark:text-sky-400">Article 21 - Protection of Life and Personal Liberty:</p>
                  <p class="mt-0.5 t-lo">
                    "No person shall be deprived of his life or personal liberty except according to procedure established by law."
                  </p>
                  <ul class="list-disc pl-4 mt-1 space-y-0.5 text-[11px] t-lo">
                    <li><strong class="t-hi">Maneka Gandhi Case (1978):</strong> The procedure must not just be formal; it must be <strong>just, fair, and reasonable</strong> (introducing American "due process").</li>
                    <li><strong class="t-hi">K.S. Puttaswamy Case (2017):</strong> 9-judge bench ruled that the <strong class="t-hi">Right to Privacy</strong> is an intrinsic part of Article 21. Overruled the infamous <em class="t-hi">ADM Jabalpur (Habeas Corpus) 1976</em> ruling (PYQ-1836).</li>
                  </ul>
                </div>
                <div>
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">Article 21A - Right to Education (PYQ-1791, PYQ-2702):</p>
                  <p class="mt-0.5 t-lo">
                    Added by the <strong class="t-hi">86th Constitutional Amendment Act, 2002</strong>. Mandates free and compulsory education for all children aged <strong class="t-hi">6 to 14 years</strong>. Enacted via the Right to Education (RTE) Act, 2009.
                  </p>
                </div>
              </div>
            </div>

            <!-- Article 22: Preventive Detention -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Article 22 · PYQ-1558</span>
                <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Arrest Safeguards</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Punitive vs Preventive Detention</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">Ordinary (Punitive) Arrest Safeguards:</p>
                  <ul class="list-disc pl-4 mt-0.5 space-y-0.5 t-lo">
                    <li>Right to be informed of the grounds of arrest as soon as possible.</li>
                    <li>Right to consult and be defended by a legal practitioner of choice.</li>
                    <li>Mandatory production before the nearest magistrate within <strong class="t-hi">24 hours</strong> of arrest.</li>
                  </ul>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-rose-600 dark:text-rose-400">Preventive Detention Safeguards:</p>
                  <ul class="list-disc pl-4 mt-0.5 space-y-0.5 t-lo">
                    <li>Arrested on suspicion before committing a crime. The ordinary 24-hour magistrate production does NOT apply!</li>
                    <li>Maximum detention without Advisory Board review is <strong class="t-hi">3 months</strong>.</li>
                    <li>Detaining authority must communicate grounds of detention (unless against public interest) and afford earliest opportunity for representation.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 04 : Exploitation, Religious Freedoms & Constitutional Remedies -->
        <section id="remedies-and-freedoms" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Exploitation, Religion &amp; Writs (Arts. 23-32)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="remedies-and-freedoms"
              section-label="Exploitation, Religion &amp; Writs"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 23-32 Remedies</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="remedies-and-freedoms"
            section-label="Exploitation, Religion &amp; Writs"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-purple-500/25 bg-purple-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-purple-500" />
              The Big Picture: Rights are Useless without Enforcement
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              A constitution could promise a thousand rights on paper, but if you have no courtroom to enforce them when police or politicians abuse power, the paper is worthless. Dr. B.R. Ambedkar called <strong class="t-hi">Article 32</strong> the very "Heart and Soul of the Constitution" because it makes the Supreme Court the direct protector and guarantor of Fundamental Rights.
            </p>
          </div>

          <!-- Exploitation & Religion Panels -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Exploitation (Arts. 23-24) -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Articles 23 &amp; 24</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Anti-Exploitation</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Right Against Exploitation</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold text-amber-600 dark:text-amber-400">Article 23 - Human Trafficking &amp; Begar:</p>
                  <p class="mt-0.5 t-lo">Prohibits traffic in human beings, begar (forced unpaid labor), and similar forms of bonded labor. Exception: State can impose compulsory service for public purposes (like military conscription) without discriminating on religion, race, caste, or class.</p>
                </div>
                <div>
                  <p class="font-bold text-rose-600 dark:text-rose-400">Article 24 - Child Labour Prohibition:</p>
                  <p class="mt-0.5 t-lo">Prohibits the employment of children <strong class="t-hi">below 14 years of age</strong> in any factory, mine, or other hazardous employment. Strengthened by Child Labour (Prohibition and Regulation) Amendment Act, 2016.</p>
                </div>
              </div>
            </div>

            <!-- Religion & Minorities (Arts. 25-30) -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Articles 25-30 · PYQ-3056</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Religious Freedoms</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Freedom of Religion &amp; Minority Rights</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <ul class="list-disc pl-4 space-y-1">
                  <li><strong class="t-hi">Article 25:</strong> Freedom of conscience and free profession, practice, and propagation of religion. Explanation II clarifies that Sikhs carrying a Kirpan is included.</li>
                  <li><strong class="t-hi">Article 26:</strong> Freedom to manage religious affairs and establish religious institutions.</li>
                  <li><strong class="t-hi">Article 27:</strong> Freedom from payment of taxes for promotion of any particular religion (taxes barred; fee for administrative service is permitted).</li>
                  <li><strong class="t-hi">Article 28:</strong> No religious instruction in schools wholly maintained out of State funds.</li>
                  <li><strong class="t-hi">Articles 29 &amp; 30:</strong> Protection of distinct language, script, or culture of minorities; right of religious and linguistic minorities to establish and administer educational institutions.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Article 32: The 5 Writs Table -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-purple-500" />
              The 5 Constitutional Writs: Weapon of Judicial Enforcement (Article 32 &amp; 226)
            </h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Writ</th>
                    <th class="py-2.5 px-3 text-purple-600 dark:text-purple-400">Literal Meaning</th>
                    <th class="py-2.5 px-3">Against Whom Issued?</th>
                    <th class="py-2.5 pl-3">When is it Used?</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)] text-xs">
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-amber-600 dark:text-amber-400">Habeas Corpus</td>
                    <td class="py-2.5 px-3 font-mono font-semibold">"To have the body of"</td>
                    <td class="py-2.5 px-3 t-mid">Both Public Authorities and Private Individuals</td>
                    <td class="py-2.5 pl-3 t-lo">Releases a person who has been detained unlawfully or without legal authority. The premier bulwark of personal liberty.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-emerald-600 dark:text-emerald-400">Mandamus</td>
                    <td class="py-2.5 px-3 font-mono font-semibold">"We Command"</td>
                    <td class="py-2.5 px-3 t-mid">Public officials, courts, tribunals, or governments</td>
                    <td class="py-2.5 pl-3 t-lo">Commands a public officer to perform an official statutory duty they have failed or refused to perform. Cannot issue against President or Governor.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-sky-600 dark:text-sky-400">Prohibition</td>
                    <td class="py-2.5 px-3 font-mono font-semibold">"To Forbid"</td>
                    <td class="py-2.5 px-3 t-mid">Lower judicial and quasi-judicial bodies only</td>
                    <td class="py-2.5 pl-3 t-lo">Issued by a higher court to a lower court to prevent it from exceeding its jurisdiction while proceedings are still pending (prevention).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-purple-600 dark:text-purple-400">Certiorari</td>
                    <td class="py-2.5 px-3 font-mono font-semibold">"To be Certified"</td>
                    <td class="py-2.5 px-3 t-mid">Lower judicial bodies and administrative authorities</td>
                    <td class="py-2.5 pl-3 t-lo">Quashes an order passed by a lower court/tribunal after trial for lack or excess of jurisdiction (both curative and preventive).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-rose-600 dark:text-rose-400">Quo-Warranto</td>
                    <td class="py-2.5 px-3 font-mono font-semibold">"By What Authority"</td>
                    <td class="py-2.5 px-3 t-mid">Holder of a substantive public office</td>
                    <td class="py-2.5 pl-3 t-lo">Prevents illegal usurpation of a public office created by statute or constitution. Can be sought by any citizen without needing personal locus standi!</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3 p-2.5 rounded bg-purple-500/10 border border-purple-500/25 text-xs text-purple-700 dark:text-purple-300">
              <strong>Article 32 vs Article 226 Exam Trap:</strong> Article 32 (Supreme Court) is itself a Fundamental Right, but can be invoked ONLY for Fundamental Rights. Article 226 (High Court) is a discretionary remedy, but has a WIDER scope because High Courts can issue writs for Fundamental Rights AND for ordinary legal rights!
            </div>
          </div>
        </section>

        <!-- 05 : Directive Principles of State Policy -->
        <section id="directive-principles" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Directive Principles of State Policy (Arts. 36-51)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="directive-principles"
              section-label="Directive Principles of State Policy"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Part IV Socio-Economic</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="directive-principles"
            section-label="Directive Principles of State Policy"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-emerald-500" />
              The Big Picture: Building a Welfare State
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Borrowed from the <strong class="t-hi">Irish Constitution (1937)</strong>, Directive Principles are the moral and developmental instructions given to elected governments. Article 37 states that although DPSP are <strong class="t-hi">non-justiciable</strong> (you cannot sue the government in court if it fails to give you a job), they are <strong class="t-hi">fundamental in the governance of the country</strong>.
            </p>
          </div>

          <!-- 3-Fold Classification of DPSP -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-xs">
            <!-- Socialistic -->
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Socialistic Ideology</span>
              <p class="text-sm font-bold t-hi mt-1.5">Socialistic Principles</p>
              <ul class="list-disc pl-4 mt-2 space-y-1 t-lo leading-relaxed">
                <li><strong class="t-hi">Art. 38 (PYQ-3042):</strong> Promote social order through justice (social, economic, political) and minimize income inequalities.</li>
                <li><strong class="t-hi">Art. 39(b) &amp; (c):</strong> Distribution of material resources for common good; prevention of wealth concentration.</li>
                <li><strong class="t-hi">Art. 39(d) (PYQ-2698):</strong> Equal pay for equal work for both men and women.</li>
                <li><strong class="t-hi">Art. 39A (PYQ-2697):</strong> Equal justice and free legal aid to the poor (42nd CAA 1976).</li>
                <li><strong class="t-hi">Art. 41 &amp; 42:</strong> Right to work and education; just and humane conditions of work and maternity relief.</li>
              </ul>
            </div>

            <!-- Gandhian -->
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Gandhian Ideology</span>
              <p class="text-sm font-bold t-hi mt-1.5">Gandhian Principles</p>
              <ul class="list-disc pl-4 mt-2 space-y-1 t-lo leading-relaxed">
                <li><strong class="t-hi">Art. 40:</strong> Organize Village Panchayats as units of local self-government.</li>
                <li><strong class="t-hi">Art. 43:</strong> Promote cottage industries on individual or co-operative basis in rural areas.</li>
                <li><strong class="t-hi">Art. 43B:</strong> Promote voluntary formation and democratic control of co-operative societies (97th CAA 2011).</li>
                <li><strong class="t-hi">Art. 46 (PYQ-0027):</strong> Promote educational and economic interests of SCs, STs, and other weaker sections.</li>
                <li><strong class="t-hi">Art. 47 &amp; 48:</strong> Prohibit intoxicating drinks and drugs; prohibit slaughter of cows, calves, and milch cattle.</li>
              </ul>
            </div>

            <!-- Liberal-Intellectual -->
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Liberal Ideology</span>
              <p class="text-sm font-bold t-hi mt-1.5">Liberal-Intellectual Principles</p>
              <ul class="list-disc pl-4 mt-2 space-y-1 t-lo leading-relaxed">
                <li><strong class="t-hi">Art. 44:</strong> Secure for citizens a Uniform Civil Code (UCC) throughout India.</li>
                <li><strong class="t-hi">Art. 45:</strong> Early childhood care and education for all children until age 6 (amended by 86th CAA).</li>
                <li><strong class="t-hi">Art. 48A (PYQ-2523):</strong> Protect and improve the environment, and safeguard forests and wildlife (42nd CAA 1976).</li>
                <li><strong class="t-hi">Art. 50:</strong> Separate the judiciary from the executive in the public services of the State.</li>
                <li><strong class="t-hi">Art. 51:</strong> Promote international peace, security, and respect for international law.</li>
              </ul>
            </div>
          </div>

          <!-- The Historic FR vs DPSP Battle Panel -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-arrows-pointing-out" class="h-4 w-4 text-rose-500" />
              The Historic Clash: Fundamental Rights vs Directive Principles
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              When Parliament passes socialist laws (like land redistribution) to enforce DPSP, citizens often challenged them for violating Fundamental Rights (like Right to Property). Here is the landmark evolution:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-amber-600 dark:text-amber-400 font-bold">1951</span>
                <p class="font-bold t-hi mt-0.5">Champakam Dorairajan</p>
                <p class="t-lo text-[11px] mt-1">SC held that Fundamental Rights prevail over DPSP; DPSP must run subservient to Part III.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">1967</span>
                <p class="font-bold t-hi mt-0.5">Golaknath Case (PYQ-1561)</p>
                <p class="t-lo text-[11px] mt-1">SC ruled Parliament cannot take away or abridge any FR even by a constitutional amendment.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-sky-600 dark:text-sky-400 font-bold">1973</span>
                <p class="font-bold t-hi mt-0.5">Kesavananda Bharati</p>
                <p class="t-lo text-[11px] mt-1">Upheld 25th CAA inserting Art. 31C (protecting Arts. 39(b) &amp; (c) over Arts. 14 &amp; 19). Established Basic Structure.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">1980</span>
                <p class="font-bold t-hi mt-0.5">Minerva Mills Case</p>
                <p class="t-lo text-[11px] mt-1">The final word: Indian Constitution is founded on the bedrock of balance and harmony between Parts III and IV!</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 06 : Fundamental Duties & Civic Ethics -->
        <section id="fundamental-duties" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Fundamental Duties &amp; Civic Ethics (Part IV-A, Art. 51A)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="fundamental-duties"
              section-label="Fundamental Duties &amp; Civic Ethics"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Part IV-A Citizen Duties</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="fundamental-duties"
            section-label="Fundamental Duties &amp; Civic Ethics"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-sky-500/25 bg-sky-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-sky-500" />
              The Big Picture: Two Sides of the Same Coin
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Mahatma Gandhi said, <em>"The true source of right is duty. If we all discharge our duties, rights will not be far to seek."</em> The original 1950 Constitution contained only Fundamental Rights, not duties. During the Internal Emergency (1976), the government realized that citizens must be reminded of their national responsibilities alongside their freedoms.
            </p>
          </div>

          <!-- Fundamental Duties Anatomy Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Origin & Committee -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Swaran Singh Committee · 1976</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">42nd CAA Origin</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Creation of Part IV-A (Article 51A)</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <ul class="list-disc pl-4 space-y-1">
                  <li><strong class="t-hi">Source Inspiration:</strong> Borrowed from the erstwhile <strong class="t-hi">USSR Constitution</strong>. Among democratic nations, Japan is the only major constitution containing a comprehensive list of citizen duties.</li>
                  <li><strong class="t-hi">Swaran Singh Committee (1976):</strong> Recommended 8 Fundamental Duties. The government accepted the concept and incorporated <strong class="t-hi">10 Fundamental Duties</strong> via the <strong class="t-hi">42nd Constitutional Amendment Act, 1976</strong>.</li>
                  <li><strong class="t-hi">The 11th Duty (86th CAA 2002):</strong> Article 51A(k) was added in 2002: duty of every parent or guardian to provide educational opportunities to their child between ages 6 and 14.</li>
                  <li><strong class="t-hi">Enforceability (PYQ-2515):</strong> Like DPSP, Fundamental Duties are <strong class="t-hi">non-justiciable</strong>; they cannot be directly enforced by courts through writs. However, Parliament has passed independent criminal and civil laws to punish violations (Verma Committee 1999).</li>
                </ul>
              </div>
            </div>

            <!-- The 11 Fundamental Duties Checklist -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 51A (a) to (k)</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">The 11 Duties</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Key Constitutional Duties Every Aspirant Must Know</h3>
              <div class="space-y-1.5 text-xs t-mid leading-relaxed">
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(a):</strong> Abide by the Constitution, respect the National Flag and National Anthem.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(b):</strong> Cherish and follow the noble ideals that inspired the national struggle for freedom.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(c):</strong> Uphold and protect the sovereignty, unity, and integrity of India.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(e):</strong> Promote harmony, common brotherhood, and renounce practices derogatory to the dignity of women.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(g):</strong> Protect and improve the natural environment including forests, lakes, rivers, and wildlife.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(h):</strong> Develop scientific temper, humanism, and the spirit of inquiry and reform.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(i):</strong> Safeguard public property and abjure violence.</div>
                <div class="p-2 rounded bg-sub border b-line"><strong class="t-hi">51A(k):</strong> Provide educational opportunities to child between 6-14 years (86th CAA 2002).</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 07 : High-Yield Cloze Recall Anchors -->
        <section id="cloze-recall-anchors" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">High-Yield Cloze Recall Anchors &amp; Memory Triggers</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="cloze-recall-anchors"
              section-label="High-Yield Cloze Recall Anchors"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Active Recall Anchors</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="cloze-recall-anchors"
            section-label="High-Yield Cloze Recall Anchors"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-4">
            Test your precision recall on core constitutional articles, amendment years, and landmark case doctrines. Click any card to reveal its cloze anchor, or use the global toggle button below.
          </p>

          <!-- Cloze Global Controls -->
          <div class="mb-6 flex items-center justify-between gap-3 p-3 rounded-lg bg-sub border b-line">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-eye" class="h-4 w-4 text-saffron-500" />
              <span class="text-xs font-semibold t-hi">Active Recall Cloze Drills</span>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-saffron-500/40 bg-saffron-500/10 text-xs font-semibold text-saffron-700 dark:text-saffron-300 hover:bg-saffron-500/20 transition-colors"
              @click="toggleAllCloze"
            >
              <UIcon :name="showClozeAnswers ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="h-3.5 w-3.5" />
              <span>{{ showClozeAnswers ? 'Hide All Cloze Blanks' : 'Reveal All Cloze Blanks' }}</span>
            </button>
          </div>

          <!-- Cloze Anchors Grid -->
          <div class="space-y-6">
            <!-- Group 1: Articles Master Cloze -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-bookmark" class="h-3.5 w-3.5 text-amber-500" />
                Category A : Key Constitutional Articles High-Yield Cloze
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Anchor 1 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art14')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Equality Before Law</span>
                  <p class="text-xs font-semibold t-hi mt-1">Article guaranteeing equality</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art14')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 14 (Equality before law &amp; Equal protection)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Anchor 2 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art17')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">Untouchability Abolition</span>
                  <p class="text-xs font-semibold t-hi mt-1">Abolition of Untouchability</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art17')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 17 (Enforced by PCR Act 1955)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Anchor 3 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art21a')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">Right to Education</span>
                  <p class="text-xs font-semibold t-hi mt-1">Free &amp; Compulsory Education (6-14)</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art21a')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 21A (86th CAA 2002)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Anchor 4 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art44')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Uniform Civil Code</span>
                  <p class="text-xs font-semibold t-hi mt-1">UCC for all citizens</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art44')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 44 (Part IV DPSP)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Anchor 5 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art39a')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Free Legal Aid</span>
                  <p class="text-xs font-semibold t-hi mt-1">Equal Justice &amp; Free Legal Aid</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art39a')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 39A (Added by 42nd CAA 1976)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Anchor 6 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-emergency')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">Emergency Immunity</span>
                  <p class="text-xs font-semibold t-hi mt-1">Articles never suspended during Emergency</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-emergency')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Articles 20 &amp; 21 (44th CAA 1978)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Immunity]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 08 : Dedicated Rights vs DPSP Comparison Matrices -->
        <section id="comparisons-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Dedicated Rights vs DPSP Comparison Matrices</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="comparisons-matrix"
              section-label="Dedicated Rights vs DPSP Comparison Matrices"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Forensic Parallels &amp; Contrasts</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="comparisons-matrix"
            section-label="Dedicated Rights vs DPSP Comparison Matrices"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Matrix 1: Fundamental Rights vs Directive Principles -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-amber-500" />
              Fundamental Rights (Part III) vs Directive Principles (Part IV)
            </h3>
            <div class="overflow-x-auto">
              <table class="table-note text-xs">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Dimension</th>
                    <th class="py-2.5 px-3 text-amber-600 dark:text-amber-400">Fundamental Rights (Part III)</th>
                    <th class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400">Directive Principles (Part IV)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Nature &amp; Direction</td>
                    <td class="py-2.5 px-3 t-mid">Largely negative: prohibitions on the State (what State cannot do).</td>
                    <td class="py-2.5 pl-3 t-mid">Largely positive: affirmative commands to the State (what State should do).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Court Justiciability</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">Justiciable: Directly enforceable by Supreme Court (Art. 32) and High Courts (Art. 226).</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-bold">Non-justiciable: Cannot be directly enforced by courts (Art. 37).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Democratic Objective</td>
                    <td class="py-2.5 px-3 t-mid">Establishes Political Democracy in the country.</td>
                    <td class="py-2.5 pl-3 t-mid">Establishes Social and Economic Democracy (Welfare State).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Legal Enforcement</td>
                    <td class="py-2.5 px-3 t-mid">Automatically enforceable; do not require separate enabling legislation.</td>
                    <td class="py-2.5 pl-3 t-mid">Require separate statutory legislation passed by Parliament for implementation (e.g. MGNREGA for Art. 41).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">National Emergency</td>
                    <td class="py-2.5 px-3 t-mid">Can be suspended by President under Art. 359 (EXCEPT Articles 20 &amp; 21 which can never be suspended).</td>
                    <td class="py-2.5 pl-3 t-mid">Never suspended (remain guiding principles for governance at all times).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 09 : Previous Year Questions Stream -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Previous Year Questions Stream (35 Verified PYQs)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="pyqs"
              section-label="Previous Year Questions Stream"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Historical TGPRB Records</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="pyqs"
            section-label="Previous Year Questions Stream"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <!-- Filter Toolbar -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-sub border b-line">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-semibold transition-colors"
                :class="activeFilter === 'all' ? 'bg-saffron-500 text-white dark:text-stone-900' : 'bg-elev t-mid hover:t-hi border b-line'"
                @click="activeFilter = 'all'"
              >
                All ({{ pyqs.length }})
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-semibold transition-colors"
                :class="activeFilter === 'si' ? 'bg-saffron-500 text-white dark:text-stone-900' : 'bg-elev t-mid hover:t-hi border b-line'"
                @click="activeFilter = 'si'"
              >
                Sub-Inspector ({{ siCount }})
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs font-semibold transition-colors"
                :class="activeFilter === 'constable' ? 'bg-saffron-500 text-white dark:text-stone-900' : 'bg-elev t-mid hover:t-hi border b-line'"
                @click="activeFilter = 'constable'"
              >
                Constable ({{ constableCount }})
              </button>
            </div>
            <span class="text-xs font-mono t-lo">35 Questions Loaded</span>
          </div>

          <!-- Questions List -->
          <div class="space-y-4">
            <div
              v-for="(q, idx) in filteredPyqs"
              :key="q.uid"
              class="panel p-5 bg-elev border b-line transition-all hover:border-saffron-500/40"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400">#{{ idx + 1 }} · {{ q.uid }}</span>
                  <span class="chip text-[10px]">{{ q.occurrences?.[0]?.source_file || 'TGPRB Paper' }}</span>
                </div>
                <button
                  type="button"
                  class="text-[11px] font-semibold text-saffron-600 dark:text-saffron-400 hover:underline"
                  @click="toggleSolution(q.uid)"
                >
                  {{ revealedSolutions.has(q.uid) ? 'Hide Solution' : 'View Answer & Explanation' }}
                </button>
              </div>

              <!-- Question text -->
              <p class="text-xs sm:text-sm font-semibold t-hi leading-relaxed whitespace-pre-line mb-3">
                {{ q.question_text }}
              </p>

              <!-- Options -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs">
                <div
                  v-for="(opt, optIdx) in q.options"
                  :key="optIdx"
                  class="p-2.5 rounded-lg border transition-all"
                  :class="revealedSolutions.has(q.uid) && optIdx === q.correct_option_index ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold' : 'bg-sub border b-line t-mid'"
                >
                  <span class="font-mono font-bold mr-1.5">{{ String.fromCharCode(65 + optIdx) }}.</span>
                  {{ opt }}
                </div>
              </div>

              <!-- Explanation -->
              <div
                v-if="revealedSolutions.has(q.uid)"
                class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-800 dark:text-emerald-200 mt-2"
              >
                <div class="flex items-center gap-1.5 font-bold mb-1 text-emerald-700 dark:text-emerald-300">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4" />
                  <span>Correct Answer: Option {{ String.fromCharCode(65 + (q.correct_option_index ?? 0)) }}</span>
                </div>
                <p class="leading-relaxed t-lo">{{ q.explanation || 'Verified canonical answer according to the official TGPRB answer key.' }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 10 : TGPSC-Style Advanced Practice Drills -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">TGPSC-Style Advanced Practice Drills</h2>
            <SectionNotesButton
              note-id="NOTE-POL-RIGHTS"
              section-id="advanced-practice"
              section-label="TGPSC-Style Advanced Practice Drills"
              note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Multi-Statement Hardening</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-RIGHTS"
            section-id="advanced-practice"
            section-label="TGPSC-Style Advanced Practice Drills"
            note-title="Fundamental Rights, DPSP &amp; Fundamental Duties"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            Higher-tier TGPRB SI &amp; Constable papers increasingly feature complex multi-statement assertions, landmark case pairings, and constitutional exception traps. Test yourself against these 6 hardened drills:
          </p>

          <div class="space-y-5">
            <div
              v-for="(drill, dIdx) in advQuestions"
              :key="drill.uid"
              class="panel p-5 bg-elev border b-line"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Drill {{ dIdx + 1 }} · {{ drill.format }}</span>
                <span class="text-xs font-mono t-lo">{{ drill.source }}</span>
              </div>
              <p class="text-xs sm:text-sm font-semibold t-hi leading-relaxed whitespace-pre-line mb-4">
                {{ drill.question }}
              </p>

              <!-- Interactive Options -->
              <div class="space-y-2 mb-4">
                <button
                  v-for="(opt, optIdx) in drill.options"
                  :key="optIdx"
                  type="button"
                  class="w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2"
                  :class="advOptionClass(drill, optIdx)"
                  @click="advAttempt(drill, optIdx)"
                >
                  <span class="font-mono font-bold shrink-0 mt-0.5">{{ String.fromCharCode(65 + optIdx) }}.</span>
                  <span class="flex-1">{{ opt }}</span>
                </button>
              </div>

              <!-- Reveal Explanation -->
              <div
                v-if="drill.revealed"
                class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-800 dark:text-emerald-200"
              >
                <p class="font-bold mb-1 text-emerald-700 dark:text-emerald-300">
                  Explanation (Correct: Option {{ String.fromCharCode(65 + drill.correct) }}):
                </p>
                <p class="leading-relaxed t-lo">{{ drill.explanation }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 11 : Comprehension Gate Check -->
        <section id="gate" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">11</span>
            <h2 class="sec-title">Comprehension Gate Check</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Pass 3 of 5 to unlock</span>
          </header>
          <GateQuiz note-id="NOTE-POL-RIGHTS" />
        </section>

        <!-- 12 : Connected Current Affairs -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">12</span>
            <h2 class="sec-title">Connected Current Affairs</h2>
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Real-time Legal Developments</span>
          </header>
          <CurrentAffairsStrip note-id="NOTE-POL-RIGHTS" />
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
            to="/study/fundamental-rights-dpsp-duties"
            class="inline-flex items-center gap-2 rounded-lg bg-saffron-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-saffron-600 dark:text-stone-900"
          >
            <UIcon name="i-heroicons-bolt" class="h-4 w-4" />
            <span>Start Study Mode</span>
          </NuxtLink>
        </div>

        <!-- Personal Notes Drawer Wire -->
        <PersonalNotesDrawer
          ref="notesDrawerRef"
          :note-id="'NOTE-POL-RIGHTS'"
        />
      </article>

      <!-- Table of contents right rail -->
      <aside class="hidden xl:block w-64 shrink-0">
        <div class="sticky top-20">
          <p class="eyebrow mb-3">On this page</p>
          <nav class="space-y-1 text-xs" aria-label="Table of contents">
            <a
              v-for="sec in sections"
              :key="sec.id"
              :href="'#' + sec.id"
              class="block py-1.5 px-2.5 rounded transition-colors text-body-xs hover:bg-elev hover:t-hi"
              :class="activeSection === sec.id ? 'font-bold text-saffron-600 dark:text-saffron-400 bg-saffron-500/10' : 't-lo'"
            >
              {{ sec.label }}
            </a>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import livePyqs from '~/data/live_pyqs.json'
import topics from '~/data/topics_master.json'

interface PyqOccurrence {
  source_file: string
  q_no: number
  source_page?: number
}

interface EnrichedPyq {
  uid: string
  question_text: string
  options: string[]
  correct_option_index: number
  explanation: string
  occurrences: PyqOccurrence[]
  topic_id?: string
}

useHead({
  title: 'Fundamental Rights, DPSP & Duties (Articles 12-51A) - TGPRB Study Notes',
  meta: [
    {
      name: 'description',
      content: 'Comprehensive forensic notes for TGPRB SI & Constable covering Fundamental Rights (Arts. 12-35), Directive Principles (Arts. 36-51), Fundamental Duties (Art. 51A), landmark case laws, and 35 verified PYQs.',
    },
  ],
})

// Progress bar
const readProgress = ref(0)
const activeSection = ref('visual-architecture')
const activeFilter = ref<'all' | 'si' | 'constable'>('all')
const revealedSolutions = ref<Set<string>>(new Set())

// Cloze state
const showClozeAnswers = ref(false)
const revealedAnchors = ref<Set<string>>(new Set())

function toggleAnchor(id: string) {
  if (revealedAnchors.value.has(id)) {
    revealedAnchors.value.delete(id)
  } else {
    revealedAnchors.value.add(id)
  }
}

function toggleAllCloze() {
  showClozeAnswers.value = !showClozeAnswers.value
}

function toggleSolution(uid: string) {
  if (revealedSolutions.value.has(uid)) {
    revealedSolutions.value.delete(uid)
  } else {
    revealedSolutions.value.add(uid)
  }
}

// Personal notes drawer ref
const notesDrawerRef = ref<any>(null)
function openNotesDrawer(ctx: any) {
  notesDrawerRef.value?.openForSection?.(ctx)
}

// Canonical PYQs
const topicMeta = topics.find(t => t.id === 'NOTE-POL-RIGHTS')
const targetUids = new Set(topicMeta?.pyqUids || [])
const pyqs = computed<EnrichedPyq[]>(() => {
  return (livePyqs as EnrichedPyq[]).filter(q => targetUids.has(q.uid))
})
const siCount = computed(() => pyqs.value.filter((q: EnrichedPyq) => q.occurrences?.[0]?.source_file?.toLowerCase().includes('si')).length)
const constableCount = computed(() => pyqs.value.filter((q: EnrichedPyq) => q.occurrences?.[0]?.source_file?.toLowerCase().includes('constable')).length)

const filteredPyqs = computed(() => {
  if (activeFilter.value === 'si') {
    return pyqs.value.filter((q: EnrichedPyq) => q.occurrences?.[0]?.source_file?.toLowerCase().includes('si'))
  }
  if (activeFilter.value === 'constable') {
    return pyqs.value.filter((q: EnrichedPyq) => q.occurrences?.[0]?.source_file?.toLowerCase().includes('constable'))
  }
  return pyqs.value
})

const coverage = [
  { label: 'Arts. 14-18 Equality' },
  { label: 'Arts. 19-22 Freedoms & Life' },
  { label: 'Arts. 20-21 Emergency Shield' },
  { label: 'Art. 21A RTE Act' },
  { label: 'Art. 32 Constitutional Writs' },
  { label: 'Arts. 36-51 DPSP' },
  { label: 'Art. 51A Fundamental Duties' },
  { label: 'FR vs DPSP Balance' },
]

const sections = [
  { id: 'visual-architecture', label: '01. Visual Architecture & Triad' },
  { id: 'right-to-equality', label: '02. Right to Equality (14-18)' },
  { id: 'right-to-freedom', label: '03. Right to Freedom & Life (19-22)' },
  { id: 'remedies-and-freedoms', label: '04. Exploitation, Religion & Writs' },
  { id: 'directive-principles', label: '05. Directive Principles (36-51)' },
  { id: 'fundamental-duties', label: '06. Fundamental Duties (51A)' },
  { id: 'cloze-recall-anchors', label: '07. High-Yield Cloze Recall' },
  { id: 'comparisons-matrix', label: '08. Rights vs DPSP Matrices' },
  { id: 'pyqs', label: '09. Verified PYQs Stream' },
  { id: 'advanced-practice', label: '10. Advanced Practice Drills' },
  { id: 'gate', label: '11. Comprehension Gate' },
  { id: 'current-affairs', label: '12. Current Affairs' },
]

interface AdvPractice {
  uid: string
  question: string
  options: string[]
  correct: number
  explanation: string
  source: string
  format: string
  revealed: boolean
  selected: number | null
}

const advQuestions = ref<AdvPractice[]>([
  {
    uid: 'ADV-POL-FR-001',
    question: "Consider the following statements regarding the suspension of Fundamental Rights during a National Emergency under Article 352:\n\n1. When a National Emergency is declared on grounds of war or external aggression, Fundamental Rights under Article 19 are automatically suspended under Article 358.\n2. When a National Emergency is declared on the ground of armed rebellion, Fundamental Rights under Article 19 cannot be suspended under Article 358.\n3. The President can suspend the right to move any court for the enforcement of Fundamental Rights under Articles 20 and 21 during an emergency.\n4. Article 359 requires a separate Presidential Order specifying the period and rights whose enforcement is suspended.\n\nWhich of the statements given above are correct?",
    options: [
      "1, 2 and 4 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    correct: 0,
    explanation: "Statements 1, 2, and 4 are correct. Statement 3 is incorrect because under Article 359, as amended by the 44th Constitutional Amendment Act 1978, the right to move any court for the enforcement of Articles 20 (Protection in respect of conviction) and 21 (Protection of life and personal liberty) CANNOT be suspended under any circumstance.",
    source: "TGPSC-Style Advanced Drill (Derived from Arts. 358 & 359 & PYQ-1789)",
    format: "Multi-statement",
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-FR-002',
    question: "With reference to the Right to Equality under Articles 14 to 18 of the Constitution, examine the following statements:\n\n1. Article 14 permits reasonable classification of persons, objects, and transactions by the legislature provided it has an intelligible differentia and a rational nexus.\n2. Article 15 prohibits discrimination on grounds only of religion, race, caste, sex, or place of birth, but not on grounds of language or residence.\n3. Article 16 permits Parliament to make any law prescribing a requirement as to residence within a State for employment in that State.\n4. Untouchability is explicitly defined in the Protection of Civil Rights Act, 1955.\n\nWhich of the statements given above are correct?",
    options: [
      "1, 2 and 3 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    correct: 0,
    explanation: "Statements 1, 2, and 3 are correct. Statement 4 is incorrect because neither the Constitution of India nor the Protection of Civil Rights Act 1955 defines the term 'Untouchability'. It is understood historically in the context of caste-based social boycotts and disabilities.",
    source: "TGPSC-Style Advanced Drill (Derived from Arts. 14, 15, 16 & 17)",
    format: "Multi-statement",
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-FR-003',
    question: "Match List-I (Landmark Case) with List-II (Core Constitutional Doctrine):\n\nList-I:\nA. A.K. Gopalan v. State of Madras (1950)\nB. Maneka Gandhi v. Union of India (1978)\nC. K.S. Puttaswamy v. Union of India (2017)\nD. Minerva Mills v. Union of India (1980)\n\nList-II:\n1. Procedure established by law under Art. 21 must be just, fair, and reasonable (due process)\n2. The Constitution is founded on the bedrock of balance between Fundamental Rights and DPSP\n3. Narrow literal interpretation holding Art. 21 only protects against arbitrary executive action\n4. Right to Privacy is an intrinsic fundamental right guaranteed under Article 21\n\nChoose the correct option:",
    options: [
      "A-3, B-1, C-4, D-2",
      "A-1, B-3, C-4, D-2",
      "A-3, B-1, C-2, D-4",
      "A-4, B-1, C-3, D-2"
    ],
    correct: 0,
    explanation: "A.K. Gopalan held narrow literal view of Art. 21 (A-3). Maneka Gandhi introduced just, fair, and reasonable procedure (A-1). Puttaswamy recognized Right to Privacy under Art. 21 (C-4). Minerva Mills established the balance between Parts III and IV as part of Basic Structure (D-2).",
    source: "TGPSC-Style Advanced Drill (Derived from Arts. 21, 31C & Landmark Judgments)",
    format: "Matching",
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-FR-004',
    question: "Consider the following statements regarding the Directive Principles of State Policy (Part IV):\n\n1. Article 39A provides for equal justice and free legal aid, inserted by the 42nd Constitutional Amendment Act, 1976.\n2. Article 40 directs the State to organize village panchayats and endow them with powers of self-government.\n3. Article 44 directs the State to secure a Uniform Civil Code for all citizens throughout the territory of India.\n4. Article 48A directs the State to protect and improve the environment, added by the 44th Constitutional Amendment Act, 1978.\n\nWhich of the statements given above are correct?",
    options: [
      "1, 2 and 3 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    correct: 0,
    explanation: "Statements 1, 2, and 3 are correct. Statement 4 is incorrect because Article 48A (protection of environment, forests, and wildlife) was added by the 42nd Constitutional Amendment Act, 1976 (NOT the 44th CAA 1978).",
    source: "TGPSC-Style Advanced Drill (Derived from Arts. 39A, 40, 44, 48A & PYQ-2697)",
    format: "Multi-statement",
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-FR-005',
    question: "Regarding Fundamental Duties incorporated in Part IV-A of the Constitution, consider the following statements:\n\n1. The Fundamental Duties were incorporated on the recommendation of the Swaran Singh Committee via the 42nd Constitutional Amendment Act, 1976.\n2. Originally, 10 Fundamental Duties were added to Article 51A; the 11th duty was added by the 86th Constitutional Amendment Act, 2002.\n3. The Swaran Singh Committee recommended that Parliament should provide for imposition of penalty or punishment for non-compliance with any duty.\n4. Like Directive Principles, Fundamental Duties are non-justiciable and cannot be directly enforced through writs.\n\nWhich of the statements given above are correct?",
    options: [
      "1, 2, 3 and 4",
      "1, 2 and 4 only",
      "2 and 3 only",
      "1 and 4 only"
    ],
    correct: 0,
    explanation: "All four statements are correct. The Swaran Singh Committee recommended 8 duties and penalties for non-compliance, but the government incorporated 10 duties without penalties. The 11th duty (education for children 6-14) was added in 2002. Duties are non-justiciable.",
    source: "TGPSC-Style Advanced Drill (Derived from Art. 51A & PYQ-2515)",
    format: "Multi-statement",
    revealed: false,
    selected: null
  },
  {
    uid: 'ADV-POL-FR-006',
    question: "With reference to the Right to Constitutional Remedies under Article 32, examine the following statements:\n\n1. The right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights is itself a Fundamental Right.\n2. The power of the Supreme Court to issue writs under Article 32 is wider than that of the High Courts under Article 226.\n3. A writ of Mandamus cannot be issued against the President of India or the Governor of a State for the exercise of their official duties.\n4. A writ of Quo-Warranto can be moved by any citizen, even if that citizen is not an aggrieved person.\n\nWhich of the statements given above are correct?",
    options: [
      "1, 3 and 4 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    correct: 0,
    explanation: "Statements 1, 3, and 4 are correct. Statement 2 is incorrect because the writ jurisdiction of High Courts under Article 226 is WIDER than that of the Supreme Court under Article 32. The Supreme Court can issue writs ONLY for Fundamental Rights, whereas High Courts can issue writs for Fundamental Rights AND ordinary legal rights.",
    source: "TGPSC-Style Advanced Drill (Derived from Arts. 32 & 226)",
    format: "Multi-statement",
    revealed: false,
    selected: null
  }
])

function advAttempt(q: AdvPractice, optIndex: number) {
  if (q.revealed) return
  q.selected = optIndex
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
