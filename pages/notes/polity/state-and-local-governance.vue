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
          <span class="t-mid">State Government &amp; Local Governance</span>
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
              to="/study/state-and-local-governance"
              class="inline-flex items-center gap-2 rounded-lg border border-saffron-500/40 bg-saffron-500/10 px-3 py-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-300 transition-colors hover:bg-saffron-500/20"
            >
              <UIcon name="i-heroicons-book-open" class="h-4 w-4" />
              <span>Study Mode (3-Zone)</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            State Government &amp; Local Governance
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive forensic study notes covering Part VI &amp; Part IX / IX-A (Articles 152-243ZT): State Executive (Governor, Chief Minister, Council of Ministers, Advocate General), State Legislature (Assembly vs Council, Art. 169 Abolition, 4-Month Legislative Delay, Bill Reservation under Arts. 200/201), 73rd CAA (Panchayati Raj, Gram Sabha, 11th Schedule 29 Subjects, Landmark Committees), 74th CAA (Municipalities, 12th Schedule 18 Subjects, Planning Committees), State Election Commission (Art. 243K), State Finance Commission (Art. 243I), and Telangana State Panchayati Raj Act 2018.
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
            to="/study/state-and-local-governance"
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
            Mastering State Executive &amp; Grassroots Local Self-Government architecture guarantees 100% precision across all Governor, State Legislature, Panchayati Raj, Municipality, and Telangana PR Act questions in TGPRB SI &amp; Constable examinations.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Predicted 2026 Question Patterns
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct factual recall, multi-statement pairs, and matching matrices testing <strong class="t-hi">Governor's qualifications &amp; constitutional status</strong> (Art. 157: only citizen + 35 years; not central employment - Hargovind Pant), <strong class="t-hi">Governor's Discretion</strong> (Art. 163 vs Art. 74 President), <strong class="t-hi">Pardoning limits</strong> (Art. 161: cannot pardon death sentence or court martial), <strong class="t-hi">Bill Reservation</strong> (Art. 200 vs Art. 201: President is NOT bound to assent on repassed state bills), <strong class="t-hi">State Legislative Delay</strong> (Council ordinary bill max delay 3+1 = 4 months; Money Bill 14 days; NO joint sitting exists in states), <strong class="t-hi">73rd &amp; 74th CAAs</strong> (Part IX &amp; IX-A; 11th Schedule 29 subjects vs 12th Schedule 18 subjects; min 33% women reservation, Bihar 50% first in 2006), <strong class="t-hi">PR Committees</strong> (Balwant Rai 1957, Ashok Mehta 1977, GVK Rao 1985, LM Singhvi 1986), <strong class="t-hi">SEC Removal Paradox</strong> (Appointed by Governor under Art. 243K, removed only like HC Judge by President), and <strong class="t-hi">Telangana State Panchayati Raj Act 2018</strong> (Sarpanch age 21, Roznamcha diary, 1500-3000 pop = 11 wards, 60 days vacancy rule).
              </p>
            </div>
          </div>
        </section>

        <!-- 01 : Visual Roadmap & 4-Tier Legal Architecture -->
        <section id="visual-architecture" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Architecture &amp; Part VI / IX Blueprint</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="visual-architecture"
              section-label="Visual Architecture &amp; Part VI / IX Blueprint"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 152-243ZT Blueprint</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="visual-architecture"
            section-label="Visual Architecture &amp; Part VI / IX Blueprint"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: What is this &amp; Why does it exist?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              India is a massive subcontinent with 1.4 billion people speaking hundreds of languages across diverse topographies. A single government sitting in New Delhi cannot possibly fix a broken village handpump in Adilabad, manage traffic signals in Hyderabad, or decide how state police forces are deployed in rural districts. To solve this, the Indian Constitution builds a <strong class="t-hi">Three-Tier Democratic Pyramid</strong>:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400 font-bold">Tier 1 : Union (Part V)</span>
                <p class="font-bold t-hi mt-1">National Sovereignty</p>
                <p class="text-[11px] t-mid mt-0.5">Defence, foreign affairs, railways, currency, and federal coordination (Arts. 52-151).</p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">Tier 2 : States (Part VI)</span>
                <p class="font-bold t-hi mt-1">Regional Administration</p>
                <p class="text-[11px] t-mid mt-0.5">Public order, police, public health, agriculture, and state taxation (Arts. 152-237).</p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Tier 3 : Local (Parts IX &amp; IX-A)</span>
                <p class="font-bold t-hi mt-1">Grassroots Self-Rule</p>
                <p class="text-[11px] t-mid mt-0.5">Village Panchayats and Urban Municipalities delivering drinking water, sanitation, and streetlights (Arts. 243-243ZT).</p>
              </div>
            </div>
            <p class="text-xs t-mid leading-relaxed">
              <strong class="t-hi">The Real-World Analogy:</strong> Think of India as a giant residential township. The Union Government is the Central Management Committee that owns the perimeter security and external roads. The State Government is the Block Building Administration that oversees power connections, plumbing risers, and elevators. Local Self-Government (Panchayats &amp; Municipalities) is the floor-level committee that cleans corridors, replaces hallway bulbs, and collects daily doorstep garbage. Local problems require local hands!
            </p>
          </div>

          <!-- 4-Tier Legal Architecture Breakdown -->
          <div class="mb-8">
            <p class="eyebrow mb-3">The 4-Tier Legal Architecture of State &amp; Local Governance</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div class="panel p-4 bg-elev border b-line flex flex-col justify-between">
                <div>
                  <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">Tier 1 : Constitutional</span>
                  <h4 class="font-bold t-hi mt-2 text-sm">Parts VI, IX &amp; IX-A</h4>
                  <p class="text-xs t-mid mt-1 leading-relaxed">
                    Articles 152 to 237 (State Executive, Legislature &amp; Judiciary) and Articles 243 to 243ZT (Panchayats &amp; Municipalities). 11th Schedule (29 subjects) and 12th Schedule (18 subjects).
                  </p>
                </div>
                <div class="mt-3 pt-2 border-t b-line text-[11px] font-mono t-lo">Rigid fundamental framework</div>
              </div>
              <div class="panel p-4 bg-elev border b-line flex flex-col justify-between">
                <div>
                  <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Tier 2 : Statutory Acts</span>
                  <h4 class="font-bold t-hi mt-2 text-sm">State &amp; Central Statutes</h4>
                  <p class="text-xs t-mid mt-1 leading-relaxed">
                    Representation of the People Acts (1950 &amp; 1951), PESA Act 1996 (Fifth Schedule areas), and Telangana State Panchayati Raj Act 2018 (Act No. 5 of 2018).
                  </p>
                </div>
                <div class="mt-3 pt-2 border-t b-line text-[11px] font-mono t-lo">Legislative enactments</div>
              </div>
              <div class="panel p-4 bg-elev border b-line flex flex-col justify-between">
                <div>
                  <span class="chip chip-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">Tier 3 : Conventions &amp; Rules</span>
                  <h4 class="font-bold t-hi mt-2 text-sm">Commission Norms</h4>
                  <p class="text-xs t-mid mt-1 leading-relaxed">
                    Sarkaria Commission (1988) &amp; Punchhi Commission (2010) recommendations: Governor must be an eminent outsider, detached from active politics, appointed after consulting the State CM.
                  </p>
                </div>
                <div class="mt-3 pt-2 border-t b-line text-[11px] font-mono t-lo">Institutional norms</div>
              </div>
              <div class="panel p-4 bg-elev border b-line flex flex-col justify-between">
                <div>
                  <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400 font-bold">Tier 4 : Judicial Precedents</span>
                  <h4 class="font-bold t-hi mt-2 text-sm">Landmark SC Rulings</h4>
                  <p class="text-xs t-mid mt-1 leading-relaxed">
                    Hargovind Pant (1979 - Governor not Central employee), S.R. Bommai (1994 - Floor test mandatory), Nabam Rebia (2016 - Discretion strictly bounded), and D.C. Wadhwa (1987 - Ordinance re-promulgation unconstitutional).
                  </p>
                </div>
                <div class="mt-3 pt-2 border-t b-line text-[11px] font-mono t-lo">Binding interpretation</div>
              </div>
            </div>
          </div>

          <!-- Part VI Chapter Structure Visual Breakdown -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-rectangle-stack" class="h-4 w-4 text-saffron-500" />
              Part VI Architecture : The Six Internal Chapters
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Chapter I : General (Art. 152)</span>
                <p class="mt-1 t-mid">Excludes Jammu &amp; Kashmir from the historical definition of 'State' (rendered largely redundant post-2019 Reorganisation Act).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Chapter II : State Executive (Arts. 153-167)</span>
                <p class="mt-1 t-mid">Governor (153-162), Council of Ministers &amp; CM (163-164), Advocate General for the State (165), Conduct of Government Business (166), and CM duties (167).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-blue-600 dark:text-blue-400">Chapter III : State Legislature (Arts. 168-212)</span>
                <p class="mt-1 t-mid">Constitution of Legislatures (168), Abolition/Creation of Councils (169), Assembly composition (170), Council composition (171), and Legislative Procedure (196-212).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-purple-600 dark:text-purple-400">Chapter IV : Legislative Power of Governor (Art. 213)</span>
                <p class="mt-1 t-mid">Promulgation of Ordinances during recess of State Legislature; temporary legislative power with equal force and effect as an Act of Legislature.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-rose-600 dark:text-rose-400">Chapter V : High Courts in States (Arts. 214-231)</span>
                <p class="mt-1 t-mid">High Courts as courts of record, appointment of judges, writ jurisdiction (Art. 226), and superintendence over subordinate courts (Art. 227).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-cyan-600 dark:text-cyan-400">Chapter VI : Subordinate Courts (Arts. 233-237)</span>
                <p class="mt-1 t-mid">Appointment of District Judges (Art. 233 by Governor in consultation with High Court), control over subordinate judiciary (Art. 235).</p>
              </div>
            </div>
          </div>

          <!-- Connected Verified PYQ Callout -->
          <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs flex items-start gap-3">
            <UIcon name="i-heroicons-bookmark-square" class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-[11px]">
                Exam Anchor : Tested in SI Mains 2023 &amp; Constable Mains 2018
              </p>
              <p class="mt-1 t-mid leading-relaxed">
                <strong class="t-hi">PYQ-3065:</strong> "Which part of the Indian Constitution deals with State Legislature?" -> <strong class="t-hi">Part VI</strong> (specifically Chapter III, Articles 168-212).<br />
                <strong class="t-hi">PYQ-0590:</strong> "Reservations as per 73rd and 74th Constitutional Amendment have facilitated..." -> <strong class="t-hi">Women entering Gram Panchayats and Municipalities</strong> through mandatory 33% (now 50% in Telangana &amp; Bihar) constitutional reservations.
              </p>
            </div>
          </div>
        </section>

        <!-- 02 : State Executive -->
        <section id="state-executive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">State Executive: Governor, Chief Minister &amp; Council of Ministers</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="state-executive"
              section-label="State Executive: Governor, Chief Minister &amp; Council of Ministers"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 153-167, 213</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="state-executive"
            section-label="State Executive: Governor, Chief Minister &amp; Council of Ministers"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: The Dual Hat of the Governor
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              In India's parliamentary federal system, executive power in every State is split between a <strong class="t-hi">De Jure Head (Nominal Constitutional Head)</strong> and a <strong class="t-hi">De Facto Head (Real Political Head)</strong>. The Governor is the nominal constitutional head, while the Chief Minister heading the Council of Ministers is the real executive.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Unlike the President of India (who is purely the constitutional head of the Union), the Governor wears <strong class="t-hi">two distinct hats</strong>:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">Hat 1 : Constitutional Head of State</span>
                <p class="font-bold t-hi mt-1">Bound by State Cabinet Advice</p>
                <p class="text-[11px] t-mid mt-0.5">Acts on the aid and advice of the Chief Minister and Council of Ministers in day-to-day state governance (Art. 163).</p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Hat 2 : Vital Federal Link &amp; Agent</span>
                <p class="font-bold t-hi mt-1">Representative of the Union</p>
                <p class="text-[11px] t-mid mt-0.5">Appointed by the President; reports on constitutional machinery breakdowns (Art. 356) and reserves state bills for presidential scrutiny (Art. 200/201).</p>
              </div>
            </div>
            <p class="text-xs t-mid leading-relaxed">
              <strong class="t-hi">Real-World Analogy:</strong> Think of a State as a subsidiary corporation. The Chief Minister is the active CEO who runs the factory, pays staff, and designs product lines. The Governor is the Chairman of the Board sent by the parent holding company. Most days, the Chairman signs off on the CEO's proposals with a rubber stamp. But if the CEO violates corporate bylaws or the company goes broke, the Chairman pulls the emergency brake and calls headquarters!
            </p>
          </div>

          <!-- Constitutional Articles & Qualifications -->
          <div class="mb-8">
            <p class="eyebrow mb-3">Governor Constitutional Blueprint (Articles 153 - 162)</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Article 153</span>
                  <span class="chip text-[10px]">7th CAA 1956</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Governors of States</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  There shall be a Governor for each State. The 7th Constitutional Amendment Act, 1956 added a proviso allowing the appointment of the same person as Governor for two or more States.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Article 154</span>
                  <span class="chip text-[10px]">Executive Power</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Vesting of Executive Power</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  The executive power of the State is vested in the Governor and is exercised either directly or through subordinate officers in accordance with the Constitution (PYQ-1154).
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-blue-600 dark:text-blue-400">Article 155 &amp; 156</span>
                  <span class="chip text-[10px]">Appointment &amp; Tenure</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Appointment &amp; Pleasure</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Governor is appointed by the President by warrant under hand and seal (PYQ-3041). Holds office during the pleasure of the President (Art. 156(1)). Normal tenure is 5 years, but no security of tenure exists.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-rose-600 dark:text-rose-400">Article 157</span>
                  <span class="chip text-[10px]">Exam Trap</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Only Two Qualifications!</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  The Constitution prescribes ONLY TWO qualifications: (1) Must be a citizen of India, and (2) Must have completed 35 years of age. Domicile or residency in another state is merely an executive convention (PYQ-0755).
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-purple-600 dark:text-purple-400">Article 158</span>
                  <span class="chip text-[10px]">Conditions of Office</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Conditions &amp; Emoluments</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Must not be a member of either House of Parliament or State Legislature. Cannot hold any office of profit. Emoluments (Rs. 3.5 Lakh/month) charged on the Consolidated Fund of the State; cannot be diminished during tenure.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-cyan-600 dark:text-cyan-400">Article 159</span>
                  <span class="chip text-[10px]">Oath of Office</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Oath Administration</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  The oath of office is administered by the Chief Justice of the concerned High Court (or senior-most available judge), swearing to preserve, protect, and defend the Constitution.
                </p>
              </div>
            </div>
          </div>

          <!-- Deep Dive: Constitutional vs Situational Discretion -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-saffron-500" />
              Governor's Discretionary Powers : Article 163 Asymmetry
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Here lies one of the sharpest differences between the President of India and the Governor: <strong class="t-hi">The Constitution explicitly mentions the Governor's discretion in Article 163, whereas Article 74 gives no explicit constitutional discretion to the President.</strong>
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-sub border b-line">
                <h4 class="font-bold text-amber-700 dark:text-amber-300 text-sm mb-2 flex items-center gap-1.5">
                  <UIcon name="i-heroicons-document-check" class="h-4 w-4" />
                  1. Constitutional Discretion (Textual)
                </h4>
                <ul class="space-y-2 text-xs t-mid list-disc pl-4">
                  <li><strong class="t-hi">Reservation of Bills (Art. 200):</strong> Reserving a state bill for President's consideration (mandatory if it threatens High Court powers).</li>
                  <li><strong class="t-hi">Recommendation of President's Rule (Art. 356):</strong> Reporting to the President that government of state cannot be carried on according to the Constitution.</li>
                  <li><strong class="t-hi">Fifth Schedule Administration (Para 5(1)):</strong> Directing that any Act of Parliament or State Legislature shall NOT apply to Scheduled Areas (PYQ-0761).</li>
                  <li><strong class="t-hi">Sixth Schedule Royalties:</strong> Determining mining royalty shares between District Council and State Government in Assam, Meghalaya, Tripura, Mizoram.</li>
                  <li><strong class="t-hi">Art. 163(2) Finality:</strong> If any question arises whether a matter falls under Governor's discretion, the Governor's decision is final and cannot be called into question!</li>
                </ul>
              </div>

              <div class="p-4 rounded-xl bg-sub border b-line">
                <h4 class="font-bold text-blue-700 dark:text-blue-300 text-sm mb-2 flex items-center gap-1.5">
                  <UIcon name="i-heroicons-bolt" class="h-4 w-4" />
                  2. Situational Discretion (Conventions)
                </h4>
                <ul class="space-y-2 text-xs t-mid list-disc pl-4">
                  <li><strong class="t-hi">Appointment of CM in Hung Assembly:</strong> When no single party or pre-poll alliance commands a clear majority after an election.</li>
                  <li><strong class="t-hi">Dismissal of Ministry:</strong> When the Council of Ministers loses majority support on the floor of the Assembly but refuses to resign (S.R. Bommai 1994 mandated floor test).</li>
                  <li><strong class="t-hi">Dissolution of Legislative Assembly:</strong> When the Council of Ministers has lost its majority and no alternative government can be formed.</li>
                  <li><strong class="t-hi">Seeking Information (Art. 167):</strong> Demanding administrative files and legislative proposals directly from the Chief Minister.</li>
                  <li><strong class="t-hi">Sanction for Prosecution:</strong> Granting sanction to prosecute ministers under the Prevention of Corruption Act (independent of cabinet advice).</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Pardoning Powers vs President Trap Duel -->
          <div class="mb-8 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 sm:p-5">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Critical Exam Trap : Article 161 (Governor) vs Article 72 (President) Pardoning Powers
                </p>
                <p class="mt-1 text-xs leading-relaxed t-mid">
                  Examiners repeatedly bait students on the exact boundaries of executive clemency. Note the two absolute constitutional asymmetries:
                </p>
                <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-lg bg-elev border border-rose-500/20">
                    <p class="font-bold text-rose-600 dark:text-rose-400">Trap 1 : Death Sentence Pardon</p>
                    <p class="mt-1 t-mid leading-relaxed">
                      The Governor <strong class="t-hi">CANNOT pardon a death sentence</strong>. Even if a capital crime falls under state law, ONLY the President possesses the constitutional authority to grant an absolute pardon for capital punishment. The Governor can only <strong class="t-hi">suspend, remit, or commute</strong> a death sentence.
                    </p>
                  </div>
                  <div class="p-3 rounded-lg bg-elev border border-rose-500/20">
                    <p class="font-bold text-rose-600 dark:text-rose-400">Trap 2 : Court Martial (Military Courts)</p>
                    <p class="mt-1 t-mid leading-relaxed">
                      The Governor has <strong class="t-hi">ZERO power over Court Martial convictions</strong>. Only the President (as Supreme Commander of the Armed Forces under Art. 72) can pardon, commute, or remit sentences passed by military tribunals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ordinance Power (Article 213) -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-document-text" class="h-4 w-4 text-emerald-500" />
              Ordinance-Making Power of Governor (Article 213)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              When the State Legislature (or either House in bicameral states) is in recess, the Governor is empowered to promulgate ordinances to deal with urgent, unforeseen circumstances. An ordinance has the exact same force and effect as an Act of the State Legislature.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Condition Precedent</span>
                <p class="mt-1 t-mid">Promulgated ONLY when legislature is NOT in session. Not a parallel law-making power; exercised on aid and advice of Council of Ministers.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Maximum Duration</span>
                <p class="mt-1 t-mid">Ceases to operate <strong class="t-hi">6 weeks</strong> from reassembly of legislature. Maximum possible lifespan is <strong class="t-hi">6 months + 6 weeks</strong> (~7.5 months).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-rose-600 dark:text-rose-400">D.C. Wadhwa (1987)</span>
                <p class="mt-1 t-mid">SC ruled that mechanical re-promulgation of ordinances without legislative passage is a <strong class="t-hi">fraud on the Constitution</strong> and unconstitutional.</p>
              </div>
            </div>
          </div>

          <!-- Chief Minister, Council of Ministers & Advocate General -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-users" class="h-4 w-4 text-blue-500" />
              Chief Minister, Council of Ministers &amp; Advocate General (Arts. 163 - 167)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="space-y-3">
                <div class="p-3 rounded-lg bg-sub border b-line">
                  <span class="font-mono font-bold text-blue-600 dark:text-blue-400">Article 164 : Appointment &amp; Responsibility</span>
                  <p class="mt-1 t-mid leading-relaxed">
                    The Chief Minister is appointed by the Governor, and other ministers are appointed by the Governor on the advice of the Chief Minister. The Council of Ministers is <strong class="t-hi">collectively responsible to the Legislative Assembly</strong> (Vidhan Sabha), not to the Council.
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-sub border b-line">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400">91st CAA 2003 : 15% Size Ceiling</span>
                  <p class="mt-1 t-mid leading-relaxed">
                    The total number of ministers, including the Chief Minister, in a State Council of Ministers <strong class="t-hi">shall not exceed 15%</strong> of the total strength of the Legislative Assembly. Minimum strength is fixed at <strong class="t-hi">12 ministers</strong>. For Telangana (119 MLAs), the maximum cabinet size is 18 ministers (15% of 119 = 17.85 -> 18).
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <div class="p-3 rounded-lg bg-sub border b-line">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Article 165 : Advocate General for the State</span>
                  <p class="mt-1 t-mid leading-relaxed">
                    Highest legal officer of the State. Appointed by the Governor; must be qualified to be appointed as a <strong class="t-hi">Judge of a High Court</strong> (Citizen of India, 10 years judicial office or 10 years advocate in HC). Holds office during the <strong class="t-hi">pleasure of the Governor</strong>.
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-sub border b-line">
                  <span class="font-mono font-bold text-purple-600 dark:text-purple-400">Article 177 : Legislative Rights</span>
                  <p class="mt-1 t-mid leading-relaxed">
                    The Advocate General has the right to speak and take part in proceedings of both Houses of State Legislature and any committee thereof of which they are named a member, but <strong class="t-hi">CANNOT VOTE</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Connected Verified PYQs -->
          <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs flex items-start gap-3">
            <UIcon name="i-heroicons-bookmark-square" class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-[11px]">
                Exam Anchors : Tested in 10 TGPRB SI &amp; Constable Papers (2015-2023)
              </p>
              <p class="mt-1 t-mid leading-relaxed">
                <strong class="t-hi">PYQ-0755:</strong> Art. 157 prescribes only two qualifications (Citizen of India, 35 years). It is an independent constitutional office, not GoI employment (Hargovind Pant case).<br />
                <strong class="t-hi">PYQ-1154:</strong> Executive power of the state is vested in the <strong class="t-hi">Governor</strong> under Article 154(1).<br />
                <strong class="t-hi">PYQ-3041:</strong> Governors are appointed by the <strong class="t-hi">President of India</strong> by warrant under hand and seal.<br />
                <strong class="t-hi">PYQ-0761:</strong> Power to decide applicability of an Act of Parliament to a Scheduled Area is vested in the <strong class="t-hi">Governor</strong> (Fifth Schedule Para 5(1)).<br />
                <strong class="t-hi">PYQ-0168, 0316, 0403, 0518, 1103:</strong> TGPRB frequently asks contemporary Governor and Chief Minister matching pairs across Indian States.
              </p>
            </div>
          </div>
        </section>

        <!-- 03 : State Legislature -->
        <section id="state-legislature" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">State Legislature: Assembly vs Council &amp; Bill Reservations</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="state-legislature"
              section-label="State Legislature: Assembly vs Council &amp; Bill Reservations"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 168-212, 200, 201</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="state-legislature"
            section-label="State Legislature: Assembly vs Council &amp; Bill Reservations"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Assembly vs Council - Why the Council is Only a Speed-Breaker
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              In Parliament, both Houses (Lok Sabha and Rajya Sabha) have nearly equal authority on ordinary legislation; if they deadlock, a Joint Sitting (Article 108) resolves it. But in State Legislatures, the relationship between the <strong class="t-hi">Legislative Assembly (Vidhan Sabha)</strong> and <strong class="t-hi">Legislative Council (Vidhan Parishad)</strong> is completely lopsided.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              The Legislative Council is deliberately designed as a <strong class="t-hi">Dilatory Chamber (Delaying Body)</strong>, not a revisory veto chamber. It can slow down a hasty law, point out flaws, and force a second debate, but it <strong class="t-hi">CANNOT stop or defeat any bill passed by the Assembly</strong>.
            </p>
            <p class="text-xs t-mid leading-relaxed">
              <strong class="t-hi">Real-World Analogy:</strong> Think of the Legislative Assembly as a heavy freight truck barreling down an expressway with democratic momentum. The Legislative Council is a speed bump on the road. It forces the truck to slow down for a few seconds to check its mirrors, but it has no concrete wall to stop the truck. The truck will inevitably roll right over the speed bump!
            </p>
          </div>

          <!-- Bicameral States & Article 169 Abolition -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-building-library" class="h-4 w-4 text-saffron-500" />
              Bicameralism in States &amp; Article 169 Abolition / Creation Mechanism
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Most Indian states are unicameral (possessing only a Legislative Assembly). Currently, only <strong class="t-hi">6 States</strong> maintain a bicameral legislature:
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="chip font-bold text-amber-600 dark:text-amber-400">1. Andhra Pradesh (58)</span>
              <span class="chip font-bold text-amber-600 dark:text-amber-400">2. Bihar (75)</span>
              <span class="chip font-bold text-amber-600 dark:text-amber-400">3. Karnataka (75)</span>
              <span class="chip font-bold text-amber-600 dark:text-amber-400">4. Maharashtra (78)</span>
              <span class="chip font-bold text-amber-600 dark:text-amber-400">5. Telangana (40)</span>
              <span class="chip font-bold text-amber-600 dark:text-amber-400">6. Uttar Pradesh (100)</span>
            </div>
            <div class="p-4 rounded-xl bg-sub border b-line text-xs">
              <p class="font-bold text-saffron-600 dark:text-saffron-400 text-sm mb-1.5">
                Article 169 : Two-Step Creation &amp; Abolition Procedure
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-2">
                <div class="p-3 rounded-lg bg-elev border b-line">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Step 1 : State Assembly Resolution</span>
                  <p class="mt-1 t-mid leading-relaxed">
                    The State Legislative Assembly must pass a resolution by a <strong class="t-hi">Special Majority</strong>: (1) Majority of total membership of the Assembly, AND (2) Not less than 2/3 of members present and voting.
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-elev border b-line">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Step 2 : Parliamentary Law</span>
                  <p class="mt-1 t-mid leading-relaxed">
                    Parliament may then by law create or abolish the Council by a <strong class="t-hi">Simple Majority</strong>. Under Article 169(3), this Act of Parliament is NOT deemed an amendment under Article 368.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Composition & Election Formulas -->
          <div class="mb-8">
            <p class="eyebrow mb-3">Assembly (Art. 170) vs Council (Art. 171) Composition</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <!-- Assembly -->
              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-amber-600 dark:text-amber-400 text-sm">Legislative Assembly (Vidhan Sabha)</span>
                  <span class="chip text-[10px]">Article 170</span>
                </div>
                <ul class="space-y-2 text-xs t-mid list-disc pl-4">
                  <li><strong class="t-hi">Maximum Strength:</strong> 500 members.</li>
                  <li><strong class="t-hi">Minimum Strength:</strong> 60 members (Exceptions: Sikkim 32, Goa 40, Mizoram 40, Puducherry 30). Telangana has <strong class="t-hi">119 elected MLAs</strong>.</li>
                  <li><strong class="t-hi">Direct Election:</strong> Elected directly by voters from single-member territorial constituencies via adult suffrage.</li>
                  <li><strong class="t-hi">Qualifying Age:</strong> Minimum <strong class="t-hi">25 years</strong>.</li>
                  <li><strong class="t-hi">Tenure:</strong> 5 years from date of first meeting (subject to earlier dissolution by Governor). Can be extended by Parliament during National Emergency by 1 year at a time.</li>
                </ul>
              </div>

              <!-- Council -->
              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Legislative Council (Vidhan Parishad)</span>
                  <span class="chip text-[10px]">Article 171</span>
                </div>
                <ul class="space-y-2 text-xs t-mid list-disc pl-4">
                  <li><strong class="t-hi">Maximum Strength:</strong> One-third (1/3) of total strength of the Legislative Assembly.</li>
                  <li><strong class="t-hi">Minimum Strength:</strong> 40 members. Telangana has <strong class="t-hi">40 MLCs</strong>.</li>
                  <li><strong class="t-hi">Permanent Chamber:</strong> Not subject to dissolution; 1/3 of members retire every second year (6-year tenure).</li>
                  <li><strong class="t-hi">Qualifying Age:</strong> Minimum <strong class="t-hi">30 years</strong>.</li>
                  <li><strong class="t-hi">Election Method:</strong> Proportional representation by single transferable vote (PR-STV).</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Council 5-Part Composition Formula Table -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-table-cells" class="h-4 w-4 text-saffron-500" />
              The 5-Part Composition Formula of Legislative Council (Article 171(3))
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b b-line text-body-xs font-mono t-lo">
                    <th class="py-2.5 px-3">Fraction</th>
                    <th class="py-2.5 px-3">Electorate / Selecting Body</th>
                    <th class="py-2.5 px-3">Constitutional Details</th>
                    <th class="py-2.5 px-3">Telangana (40 Total)</th>
                  </tr>
                </thead>
                <tbody class="divide-y b-line t-mid">
                  <tr>
                    <td class="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">1/3 (33.3%)</td>
                    <td class="py-2.5 px-3 font-bold t-hi">Local Authorities</td>
                    <td class="py-2.5 px-3">Elected by electorates consisting of members of Municipalities, District Boards, and Zilla Parishads.</td>
                    <td class="py-2.5 px-3 font-mono">14 seats</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">1/12 (8.3%)</td>
                    <td class="py-2.5 px-3 font-bold t-hi">Graduates</td>
                    <td class="py-2.5 px-3">Elected by persons residing in the state who have been graduates of at least 3 years' standing.</td>
                    <td class="py-2.5 px-3 font-mono">3 seats</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">1/12 (8.3%)</td>
                    <td class="py-2.5 px-3 font-bold t-hi">Teachers</td>
                    <td class="py-2.5 px-3">Elected by persons engaged for at least 3 years in teaching in secondary schools or higher within the state.</td>
                    <td class="py-2.5 px-3 font-mono">3 seats</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">1/3 (33.3%)</td>
                    <td class="py-2.5 px-3 font-bold t-hi">MLAs (Assembly Members)</td>
                    <td class="py-2.5 px-3">Elected by members of the Legislative Assembly from amongst persons who are NOT members of the Assembly.</td>
                    <td class="py-2.5 px-3 font-mono">14 seats</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400">1/6 (16.7%)</td>
                    <td class="py-2.5 px-3 font-bold t-hi">Governor Nominees</td>
                    <td class="py-2.5 px-3">Nominated by Governor having special knowledge in: Literature, Science, Art, <strong class="t-hi">Co-operative Movement</strong>, and Social Service.</td>
                    <td class="py-2.5 px-3 font-mono">6 seats</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
              <span class="font-bold text-amber-600 dark:text-amber-400">Exam Trap Duel:</span> Note that <strong class="t-hi">'Co-operative Movement'</strong> is an explicit field for nomination to the State Legislative Council under Art. 171(5), but is <strong class="t-hi">NOT</strong> included in presidential nominations to the Rajya Sabha under Art. 80(3) (which only lists Literature, Science, Art, and Social Service).
            </div>
          </div>

          <!-- Legislative Procedure: Delay Limits & No Joint Sitting -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-clock" class="h-4 w-4 text-rose-500" />
              Legislative Procedure &amp; The 4-Month Maximum Delay Rule (Arts. 196 - 199)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              When an Ordinary Bill is passed by the Legislative Assembly and sent to the Legislative Council, the Council has strictly circumscribed powers. The entire procedure moves in two distinct phases:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Phase 1 : First Transmission (3 Months)</span>
                <p class="mt-1 t-mid leading-relaxed">
                  The Council can: (1) Pass the bill, (2) Reject it, (3) Propose amendments, or (4) Take no action. The Council can hold the bill for a <strong class="t-hi">maximum of 3 months</strong>.
                </p>
              </div>
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Phase 2 : Second Transmission (1 Month)</span>
                <p class="mt-1 t-mid leading-relaxed">
                  If the Assembly repasses the bill (with or without amendments) and sends it back, the Council can delay it for <strong class="t-hi">only 1 month</strong>. Whether the Council passes it, rejects it, or sits on it, the bill is <strong class="t-hi">deemed passed by both Houses</strong>!
                </p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
              <p class="font-bold text-rose-600 dark:text-rose-400">Absolute Rule: Total Maximum Delay = 3 + 1 = 4 Months!</p>
              <p class="mt-1 t-mid leading-relaxed">
                For Ordinary Bills, the Council can delay legislation for a total of <strong class="t-hi">4 months max</strong> (PYQ-0757). For Money Bills, the Council can delay for only <strong class="t-hi">14 days</strong>. Most crucially: <strong class="t-hi">THERE IS NO PROVISION FOR A JOINT SITTING OF BOTH HOUSES IN THE STATE LEGISLATURE</strong> (Article 108 applies exclusively to Parliament).
              </p>
            </div>
          </div>

          <!-- Bill Assent & Reservation: Article 200 vs 201 -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-shield-exclamation" class="h-4 w-4 text-saffron-500" />
              Bill Assent &amp; Presidential Reservation : Article 200 vs Article 201
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              When a bill is passed by the State Legislature (or both Houses in bicameral states), it is presented to the Governor under Article 200. The Governor has four constitutional choices:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-4">
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">1. Assent</span>
                <p class="mt-1 t-mid">The Governor gives assent, and the bill immediately becomes an Act of the State Legislature.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-rose-600 dark:text-rose-400">2. Withhold Assent</span>
                <p class="mt-1 t-mid">The Governor withholds assent; the bill fails and does not become law (rarely exercised).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-blue-600 dark:text-blue-400">3. Return for Review</span>
                <p class="mt-1 t-mid">Returns bill (if NOT a Money Bill) with a message. If repassed by legislature, <strong class="t-hi">Governor MUST give assent</strong>.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-purple-600 dark:text-purple-400">4. Reserve for President</span>
                <p class="mt-1 t-mid">Governor reserves bill for consideration of the President (mandatory if it threatens High Court powers).</p>
              </div>
            </div>

            <!-- Article 201 President Discretion Trap -->
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
              <div class="flex items-start gap-2.5">
                <UIcon name="i-heroicons-exclamation-circle" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide text-[11px]">
                    Super High-Yield Exam Trap : Article 201 Presidential Discretion on Returned State Bills
                  </p>
                  <p class="mt-1 t-mid leading-relaxed">
                    Under Article 201, when a state bill is reserved for the President, the President may assent, withhold assent, or direct the Governor to return it to the state legislature within 6 months.<br />
                    <strong class="t-hi">THE CRITICAL EXAM TRAP (PYQ-2516):</strong> If the State Legislature reconsiders and passes the bill again (with or without amendments), <strong class="t-hi">THE PRESIDENT IS UNDER NO CONSTITUTIONAL OBLIGATION TO GIVE ASSENT!</strong> The President can still withhold assent indefinitely. This stands in complete contrast to Article 111 (Union bills) and Article 200 (Governor), where assent is mandatory upon second passage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Connected Verified PYQs -->
          <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs flex items-start gap-3">
            <UIcon name="i-heroicons-bookmark-square" class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-[11px]">
                Exam Anchors : Tested in Constable Prelims 2018 &amp; SI Prelims 2018
              </p>
              <p class="mt-1 t-mid leading-relaxed">
                <strong class="t-hi">PYQ-0757:</strong> Ordinary bills can originate in either house of state legislature; Legislative Council can delay an ordinary bill for maximum 4 months (3 months first instance + 1 month second instance); Money Bill max 14 days delay; NO joint sitting exists in states.<br />
                <strong class="t-hi">PYQ-2516:</strong> Regarding state bills reserved for President's consideration under Article 201, the President may assent, withhold assent, or return the bill within 6 months. If passed again, the President is NOT bound to give assent.
              </p>
            </div>
          </div>
        </section>

        <!-- 04 : Panchayati Raj Institutions -->
        <section id="panchayati-raj" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Panchayati Raj Institutions: 73rd CAA 1992 &amp; Part IX</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="panchayati-raj"
              section-label="Panchayati Raj Institutions: 73rd CAA 1992 &amp; Part IX"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 243 - 243-O, 11th Schedule</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="panchayati-raj"
            section-label="Panchayati Raj Institutions: 73rd CAA 1992 &amp; Part IX"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Taking Democracy to the Grassroots
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              For four decades after independence, Indian democracy lived only in New Delhi and State Capitals. Although Article 40 of the Directive Principles directed the State to organize village panchayats, local elections were irregular, funds were non-existent, and bureaucrats dissolved local councils at will.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              The <strong class="t-hi">73rd Constitutional Amendment Act, 1992</strong> completely revolutionized this by giving constitutional status to rural local governments. It transformed village self-governance from a noble Gandhian dream into a legally enforceable constitutional guarantee with mandatory elections every 5 years, statutory revenue devolution, and historic reservations for women and marginalized communities.
            </p>
            <p class="text-xs t-mid leading-relaxed">
              <strong class="t-hi">Direct Democracy vs Representative Democracy:</strong> In Parliament or State Assemblies, we elect MPs and MLAs to speak for us (Representative Democracy). But in a village, the <strong class="t-hi">Gram Sabha</strong> is pure <strong class="t-hi">Direct Democracy</strong>! Every single adult resident whose name is on the electoral roll is a member. Just like the ancient Greek assemblies, the citizens themselves gather in the village square to approve the budget, audit works, and question their elected Sarpanch.
            </p>
          </div>

          <!-- Chronology of Panchayati Raj Committees -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-clock" class="h-4 w-4 text-saffron-500" />
              Chronology &amp; Landmark Recommendations of Panchayati Raj Committees
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              TGPRB and TGPSC frequently test the evolution of committees that shaped local self-governance in India. Memorize this four-decade evolutionary chain:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <!-- Balwant Rai Mehta -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-bold text-amber-600 dark:text-amber-400 text-sm">Balwant Rai Mehta Committee (1957)</span>
                  <span class="chip chip-mono text-[10px]">Pioneer</span>
                </div>
                <p class="text-xs t-mid leading-relaxed">
                  Appointed to review the Community Development Programme (1952). Coined the phrase <strong class="t-hi">'Democratic Decentralization'</strong>. Recommended a <strong class="t-hi">3-tier structure</strong>: Gram Panchayat (village), Panchayat Samiti (block - executive body), and Zilla Parishad (district - advisory &amp; supervisory body with District Collector as chairman).<br />
                  <span class="font-semibold text-emerald-600 dark:text-emerald-400">First State:</span> Rajasthan (Nagaur district, Oct 2, 1959 by PM Nehru), followed by Andhra Pradesh (Oct 1959 at Shadnagar).
                </p>
              </div>

              <!-- Ashok Mehta -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Ashok Mehta Committee (1977-78)</span>
                  <span class="chip chip-mono text-[10px]">Janata Govt</span>
                </div>
                <p class="text-xs t-mid leading-relaxed">
                  Appointed to revive declining PRIs. Recommended replacing 3-tier with a <strong class="t-hi">2-tier system</strong>: <strong class="t-hi">Mandal Panchayat</strong> (group of villages, 15,000-20,000 population) and <strong class="t-hi">Zilla Parishad</strong> (district - made the executive body responsible for planning). Advocated official participation of political parties on party symbols, regular social audit, and minister for Panchayati Raj.
                </p>
              </div>

              <!-- G.V.K. Rao -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-bold text-blue-600 dark:text-blue-400 text-sm">G.V.K. Rao Committee (1985)</span>
                  <span class="chip chip-mono text-[10px]">Planning Comm</span>
                </div>
                <p class="text-xs t-mid leading-relaxed">
                  Appointed by Planning Commission on Administrative Arrangements for Rural Development. Coined the famous metaphor that bureaucratization had turned PRIs into <strong class="t-hi">'Grass Without Roots'</strong>. Recommended making District the basic unit of planning and creating the post of <strong class="t-hi">District Development Commissioner (DDC)</strong> to act as CEO of Zilla Parishad.
                </p>
              </div>

              <!-- L.M. Singhvi -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-bold text-purple-600 dark:text-purple-400 text-sm">L.M. Singhvi Committee (1986)</span>
                  <span class="chip chip-mono text-[10px]">Constitutional Status</span>
                </div>
                <p class="text-xs t-mid leading-relaxed">
                  Appointed by Rajiv Gandhi government. First committee to firmly recommend that Panchayati Raj Institutions must be <strong class="t-hi">constitutionally recognized, protected, and preserved</strong> through a new constitutional chapter. Also recommended constitutional provisions for regular, free, and fair elections, and establishing <strong class="t-hi">Nyaya Panchayats</strong> for a cluster of villages (PYQ-0762).
                </p>
              </div>
            </div>
            <div class="mt-3 p-3 rounded-lg bg-sub border b-line text-xs t-mid">
              <strong class="t-hi">Subsequent Drafting Committees:</strong> P.K. Thungon Committee (1988) and V.N. Gadgil Committee (1988) formulated the precise legislative draft that culminated in the 73rd Constitutional Amendment Act, 1992 under the P.V. Narasimha Rao government.
            </div>
          </div>

          <!-- 73rd Constitutional Amendment Act, 1992 Architecture -->
          <div class="mb-8">
            <p class="eyebrow mb-3">73rd Constitutional Amendment Act, 1992 : Structural Features</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Article 243A</span>
                  <span class="chip text-[10px]">Direct Democracy</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Gram Sabha</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  A body consisting of all persons registered in the electoral rolls relating to a village comprised within the area of the Panchayat (PYQ-2700). Exercises powers and performs functions at the village level as state law provides.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Article 243B</span>
                  <span class="chip text-[10px]">3-Tier Hierarchy</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Constitution of Panchayats</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Establishes a mandatory 3-tier structure in every State: (1) Village level (Gram Panchayat), (2) Intermediate level (Mandal/Block), and (3) District level (Zilla Parishad). States with population &lt; 20 Lakhs may omit intermediate tier.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-blue-600 dark:text-blue-400">Article 243C</span>
                  <span class="chip text-[10px]">Elections</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Composition &amp; Elections</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  All seats across all three tiers are filled by <strong class="t-hi">Direct Election</strong> from territorial constituencies. Chairpersons of Intermediate and District Panchayats are elected <strong class="t-hi">indirectly</strong> by and from elected members.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-rose-600 dark:text-rose-400">Article 243D</span>
                  <span class="chip text-[10px]">Women 33% &amp; 50%</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Reservation of Seats</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  SCs and STs reserved in proportion to population. Not less than <strong class="t-hi">one-third (33%)</strong> of total seats and chairperson offices reserved for women. <strong class="t-hi">Bihar (2006)</strong> was the first state to offer 50% reservation; Telangana also provides 50% (PYQ-0297).
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-purple-600 dark:text-purple-400">Article 243E</span>
                  <span class="chip text-[10px]">5-Year Term</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Duration &amp; Dissolution</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Fixed 5-year tenure. If dissolved prematurely, elections must be held within <strong class="t-hi">6 months</strong>. The reconstituted Panchayat serves only the remainder of the original 5-year term.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-cyan-600 dark:text-cyan-400">Article 243F</span>
                  <span class="chip text-[10px]">Age: 21 Years</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Disqualifications</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  No person disqualified on age grounds if they have completed <strong class="t-hi">21 years of age</strong> (whereas voting age is 18 years, and MLA age is 25 years). Disqualification disputes referred to state-appointed authority.
                </p>
              </div>
            </div>
          </div>

          <!-- Compulsory vs Voluntary Provisions & 11th Schedule -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-adjustments-horizontal" class="h-4 w-4 text-emerald-500" />
              Compulsory vs Voluntary Provisions &amp; The 11th Schedule (29 Subjects)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
              <div class="p-4 rounded-xl bg-sub border b-line">
                <h4 class="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-2">Compulsory Provisions (Mandatory by Constitution)</h4>
                <ul class="space-y-1.5 text-xs t-mid list-disc pl-4">
                  <li>Organization of Gram Sabha in a village or group of villages.</li>
                  <li>Establishment of Panchayats at village, intermediate, and district levels.</li>
                  <li>Direct elections to all seats in all three tiers.</li>
                  <li>Indirect election to the post of Chairperson at intermediate and district levels.</li>
                  <li>Minimum age of 21 years for contesting elections.</li>
                  <li>Reservation of seats for SCs and STs in proportion to population.</li>
                  <li>Reservation of not less than 1/3 (33.3%) seats and chairperson posts for women.</li>
                  <li>Fixed 5-year tenure and mandatory elections within 6 months of dissolution.</li>
                  <li>Creation of State Election Commission (243K) and State Finance Commission (243I).</li>
                </ul>
              </div>

              <div class="p-4 rounded-xl bg-sub border b-line">
                <h4 class="font-bold text-amber-700 dark:text-amber-300 text-sm mb-2">Voluntary Provisions (State Legislature Discretion)</h4>
                <ul class="space-y-1.5 text-xs t-mid list-disc pl-4">
                  <li>Giving voting rights to MPs and MLAs in Panchayats at different tiers.</li>
                  <li>Providing reservations for Other Backward Classes (OBCs) in seats or chairpersons.</li>
                  <li>Devolution of powers and responsibilities over 29 subjects in 11th Schedule.</li>
                  <li>Authorizing Panchayats to levy, collect, and appropriate local taxes, duties, tolls, and fees.</li>
                  <li>Mode of election of the Chairperson of the Gram Panchayat (Direct Sarpanch election vs indirect).</li>
                  <li>Providing financial grants-in-aid to Panchayats from State Consolidated Fund.</li>
                </ul>
              </div>
            </div>

            <!-- 11th Schedule Breakdown -->
            <div class="p-3 rounded-lg bg-elev border b-line text-xs">
              <p class="font-bold t-hi mb-1">The 11th Schedule : 29 Functional Subjects (Article 243G)</p>
              <p class="text-xs t-mid leading-relaxed">
                Added by 73rd CAA 1992. Covers grassroots developmental sectors: (1) Agriculture and agricultural extension, (2) Land improvement and soil conservation, (3) Minor irrigation and water management, (4) Animal husbandry and dairying, (5) Fisheries, (6) Social forestry, (7) Minor forest produce, (8) Small scale industries, (9) Khadi and village industries, (10) Rural housing, (11) Drinking water, (12) Fuel and fodder, (13) Roads, culverts, bridges, (14) Rural electrification, (15) Non-conventional energy, (16) Poverty alleviation programmes, (17) Primary and secondary education, (18) Technical training and vocational education, (19) Adult education, (20) Libraries, (21) Cultural activities, (22) Markets and fairs, (23) Health and sanitation, (24) Family welfare, (25) Women and child development, (26) Social welfare, (27) Welfare of weaker sections, (28) Public distribution system (PDS), and (29) Maintenance of community assets.
              </p>
            </div>
          </div>

          <!-- PESA Act 1996 -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-shield-check" class="h-4 w-4 text-purple-500" />
              PESA Act, 1996 : Panchayats Extension to Scheduled Areas
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              The provisions of Part IX do not automatically apply to the Fifth Schedule areas (predominantly tribal areas). To extend local governance to these regions, Parliament enacted the <strong class="t-hi">Provisions of the Panchayats (Extension to the Scheduled Areas) Act, 1996 (PESA)</strong> on the recommendations of the <strong class="t-hi">Dilib Singh Bhuria Committee</strong>.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-purple-600 dark:text-purple-400">Customary Law Safeguards</span>
                <p class="mt-1 t-mid">Gram Sabha empowered to safeguard tribal customs, religious practices, traditional management practices of community resources, and customary mode of dispute resolution.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Ownership of MFP</span>
                <p class="mt-1 t-mid">Gram Sabha is endowed with the <strong class="t-hi">ownership of Minor Forest Produce (MFP)</strong>, power to enforce prohibition/regulation of intoxicants, and prevent alienation of tribal lands.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Mandatory Consultation</span>
                <p class="mt-1 t-mid">Prior mandatory consultation with Gram Sabha before land acquisition for development projects and granting prospecting licenses or mining leases for minor minerals in Scheduled Areas.</p>
              </div>
            </div>
          </div>

          <!-- Connected Verified PYQs -->
          <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs flex items-start gap-3">
            <UIcon name="i-heroicons-bookmark-square" class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-[11px]">
                Exam Anchors : Tested in 4 TGPRB SI &amp; Constable Papers
              </p>
              <p class="mt-1 t-mid leading-relaxed">
                <strong class="t-hi">PYQ-3067:</strong> Part IX has been added to the Constitution of India through the <strong class="t-hi">73rd Constitutional Amendment Act, 1992</strong>.<br />
                <strong class="t-hi">PYQ-2700:</strong> "A body consisting of persons registered in the electoral rolls relating to a village comprised within the area of panchayat" is the constitutional definition of <strong class="t-hi">Gram Sabha</strong> (Article 243(b) / 243A).<br />
                <strong class="t-hi">PYQ-0762:</strong> Matching Committees: Balwant Rai Mehta (ZP advisory), Ashok Mehta (ZP executive), Santhanam (PR Finance Corporation), LM Singhvi (Nyaya Panchayats &amp; constitutional status).<br />
                <strong class="t-hi">PYQ-0297:</strong> The first state in India to offer 50% reservation for women in Panchayati Raj Institutions is <strong class="t-hi">Bihar</strong> (2006).
              </p>
            </div>
          </div>
        </section>

        <!-- 05 : Municipalities & Urban Local Bodies -->
        <section id="municipalities-ulbs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Municipalities &amp; Urban Local Bodies (74th CAA 1992)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="municipalities-ulbs"
              section-label="Municipalities &amp; Urban Local Bodies (74th CAA 1992)"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 243P - 243ZG, 12th Schedule</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="municipalities-ulbs"
            section-label="Municipalities &amp; Urban Local Bodies (74th CAA 1992)"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Governing India's Rapid Urbanization
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Just as the 73rd Amendment transformed rural governance, the <strong class="t-hi">74th Constitutional Amendment Act, 1992</strong> gave constitutional status to Urban Local Bodies (ULBs). As towns grow into bustling cities and mega-metropolises like Hyderabad, governance cannot be managed through village panchayats. Urban spaces face complex, high-density challenges: storm-water drainage, building zoning, flyovers, solid waste processing, and fire services.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              The 74th CAA came into force on <strong class="t-hi">1 June 1993</strong>, inserting <strong class="t-hi">Part IX-A (Articles 243P to 243ZG)</strong> and the <strong class="t-hi">12th Schedule (18 functional subjects)</strong> into the Constitution.
            </p>
            <p class="text-xs t-mid leading-relaxed">
              <strong class="t-hi">Mayor vs Municipal Commissioner Analogy:</strong> In a Municipal Corporation (like GHMC), executive power is split between the elected political leadership and professional civil servants. The <strong class="t-hi">Mayor</strong> is the 'First Citizen' and political face elected by the councillors, but real executive and financial administration is vested in the <strong class="t-hi">Municipal Commissioner</strong> (a senior IAS officer appointed by the State Government). Think of the Mayor as the non-executive Chairman of the board, and the Municipal Commissioner as the operational Managing Director!
            </p>
          </div>

          <!-- 3 Types of Municipal Bodies (Article 243Q) -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-building-office-2" class="h-4 w-4 text-saffron-500" />
              The 3-Tier Classification of Urban Local Bodies (Article 243Q)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Article 243Q provides for the constitution of three distinct types of municipalities in every State, determined by the Governor based on population size, density, revenue generation, and percentage of non-agricultural employment:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">1. Nagar Panchayat</span>
                <h4 class="font-bold t-hi text-sm mt-1">Transitional Areas</h4>
                <p class="text-xs t-mid mt-1.5 leading-relaxed">
                  For a transitional area, that is to say, an area in transition from a rural area to an urban area (typically semi-urban towns with 11,000 to 25,000 population).
                </p>
              </div>

              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">2. Municipal Council</span>
                <h4 class="font-bold t-hi text-sm mt-1">Smaller Urban Areas</h4>
                <p class="text-xs t-mid mt-1.5 leading-relaxed">
                  For smaller urban areas (cities and medium towns, typically population from 25,000 to 3 lakhs, classified into grades: Selection, Special, 1st, 2nd, 3rd grade). Headed by an elected Municipal Chairperson.
                </p>
              </div>

              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">3. Municipal Corporation</span>
                <h4 class="font-bold t-hi text-sm mt-1">Larger Urban Areas</h4>
                <p class="text-xs t-mid mt-1.5 leading-relaxed">
                  For large urban agglomerations (population exceeding 3-5 lakhs, e.g., GHMC Hyderabad, Warangal, Nizamabad). Created by special state statutes; headed politically by Mayor and administratively by an IAS Municipal Commissioner.
                </p>
              </div>
            </div>
            <div class="mt-3 p-3 rounded-lg bg-elev border b-line text-xs t-mid">
              <strong class="t-hi">Industrial Township Exception (Art. 243Q Proviso):</strong> A municipality may not be constituted in such urban area or part thereof as the Governor may specify, having regard to the size of the area and the municipal services being provided by an industrial establishment (e.g., Jamshedpur, BHEL).
            </div>
          </div>

          <!-- Wards Committees & Planning Committees -->
          <div class="mb-8">
            <p class="eyebrow mb-3">Committees Architecture : Wards, DPC &amp; MPC</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-amber-600 dark:text-amber-400">Article 243S</span>
                  <span class="chip text-[10px]">Pop &gt;= 3 Lakhs</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Wards Committees</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Constitution of Wards Committees (consisting of one or more wards) is <strong class="t-hi">mandatory</strong> within the territorial area of a Municipality having a <strong class="t-hi">population of 3 lakhs or more</strong> to ensure citizen access to civic administration.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">Article 243ZD</span>
                  <span class="chip text-[10px]">4/5ths Elected</span>
                </div>
                <h4 class="font-bold t-hi text-sm">District Planning Committee (DPC)</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Created at the district level to consolidate draft development plans prepared by Panchayats and Municipalities in the district. <strong class="t-hi">Four-fifths (4/5)</strong> of its members are elected by and from elected members of the Zilla Parishad and Municipalities.
                </p>
              </div>

              <div class="panel p-4 bg-elev border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-purple-600 dark:text-purple-400">Article 243ZE</span>
                  <span class="chip text-[10px]">2/3rds Elected</span>
                </div>
                <h4 class="font-bold t-hi text-sm">Metropolitan Planning Committee</h4>
                <p class="text-xs t-mid mt-1 leading-relaxed">
                  Constituted for every Metropolitan area (population of 10 lakhs or more) to prepare a draft development plan for the metropolitan area as a whole. <strong class="t-hi">Two-thirds (2/3)</strong> of members are elected by and from elected members of Municipalities and Chairpersons of Panchayats.
                </p>
              </div>
            </div>
          </div>

          <!-- Municipal Finances & The Contingency Fund Trap -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-banknotes" class="h-4 w-4 text-emerald-500" />
              Municipal Revenue Architecture &amp; The Contingency Fund Trap (Article 243X)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Municipalities in India depend on five recognized structural sources of revenue authorized by the State Legislature by law:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs mb-4">
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">1. Own Tax Revenues</span>
                <p class="mt-1 t-mid">Property tax, vacant land tax, advertisement tax, entertainment tax, and trade licenses authorized by state law.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">2. Assigned / Shared Taxes</span>
                <p class="mt-1 t-mid">Taxes collected by State Government but shared with or assigned to Municipalities (e.g., motor vehicle tax, stamp duty surcharges).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-blue-600 dark:text-blue-400">3. Non-Tax User Charges</span>
                <p class="mt-1 t-mid">Water charges, sewerage fees, building plan approval fees, parking charges, and municipal market rents.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-purple-600 dark:text-purple-400">4. State Grants-in-Aid</span>
                <p class="mt-1 t-mid">Grants-in-aid from the <strong class="t-hi">Consolidated Fund of the State</strong> on the recommendations of the State Finance Commission (Art. 243Y).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-rose-600 dark:text-rose-400">5. Central CFC Grants</span>
                <p class="mt-1 t-mid">Central Finance Commission grants devolved via State Governments under Article 280(3)(c) for urban local bodies.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line">
                <span class="font-bold text-cyan-600 dark:text-cyan-400">6. Municipal Bonds &amp; Loans</span>
                <p class="mt-1 t-mid">Borrowings from financial institutions or issuing municipal bonds with State Government approval (e.g., GHMC Rs. 200 Cr bonds).</p>
              </div>
            </div>

            <!-- Exam Trap Callout Box -->
            <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs">
              <div class="flex items-start gap-2.5">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wide text-[11px]">
                    Major Exam Trap : PYQ-0521 (Constable Mains 2018)
                  </p>
                  <p class="mt-1 t-mid leading-relaxed">
                    <strong class="t-hi">Question:</strong> "Which one of the following statements is NOT correct with regard to sources of revenue to Municipalities?"<br />
                    <strong class="t-hi">Wrong / Trapping Statement:</strong> "Grants-in-aid from the Contingency Fund of India."<br />
                    <strong class="t-hi">Why:</strong> The <strong class="t-hi">Contingency Fund of India (Article 267)</strong> is maintained exclusively at the disposal of the President of India to meet unforeseen urgent national expenditures pending parliamentary appropriation. It CANNOT be drawn upon to provide routine grants or revenues to municipal bodies. Municipal grants flow exclusively from the Consolidated Fund of the State or Central Finance Commission transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 12th Schedule Breakdown -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-list-bullet" class="h-4 w-4 text-saffron-500" />
              The 12th Schedule : 18 Functional Subjects (Article 243W)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Whereas the 11th Schedule gives 29 subjects to Panchayats, the 12th Schedule entrusts <strong class="t-hi">18 functional items</strong> to Municipalities:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono t-mid">
              <div class="p-2 rounded bg-sub border b-line">01. Urban planning &amp; town planning</div>
              <div class="p-2 rounded bg-sub border b-line">02. Regulation of land-use &amp; buildings</div>
              <div class="p-2 rounded bg-sub border b-line">03. Planning for economic &amp; social development</div>
              <div class="p-2 rounded bg-sub border b-line">04. Roads and bridges</div>
              <div class="p-2 rounded bg-sub border b-line">05. Water supply: domestic, industrial, commercial</div>
              <div class="p-2 rounded bg-sub border b-line">06. Public health, sanitation &amp; solid waste</div>
              <div class="p-2 rounded bg-sub border b-line">07. Fire services</div>
              <div class="p-2 rounded bg-sub border b-line">08. Urban forestry &amp; environmental protection</div>
              <div class="p-2 rounded bg-sub border b-line">09. Safeguarding interests of weaker sections</div>
              <div class="p-2 rounded bg-sub border b-line">10. Slum improvement and upgradation</div>
              <div class="p-2 rounded bg-sub border b-line">11. Urban poverty alleviation</div>
              <div class="p-2 rounded bg-sub border b-line">12. Provision of urban amenities: parks, gardens</div>
              <div class="p-2 rounded bg-sub border b-line">13. Promotion of cultural, educational aspects</div>
              <div class="p-2 rounded bg-sub border b-line">14. Burials, cremation grounds &amp; electric crematoria</div>
              <div class="p-2 rounded bg-sub border b-line">15. Cattle pounds; prevention of cruelty to animals</div>
              <div class="p-2 rounded bg-sub border b-line">16. Vital statistics: births and deaths registration</div>
              <div class="p-2 rounded bg-sub border b-line">17. Public amenities: street lighting, parking lots</div>
              <div class="p-2 rounded bg-sub border b-line">18. Regulation of slaughter houses &amp; tanneries</div>
            </div>
          </div>

          <!-- Connected Verified PYQs -->
          <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs flex items-start gap-3">
            <UIcon name="i-heroicons-bookmark-square" class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-[11px]">
                Exam Anchor : Tested in Constable Mains 2018
              </p>
              <p class="mt-1 t-mid leading-relaxed">
                <strong class="t-hi">PYQ-0521:</strong> Identified that Grants-in-aid from the Contingency Fund of India is NOT a source of revenue for Municipalities. Revenue comes from local taxes authorized by state law, taxes assigned by state, and Consolidated Fund grants.
              </p>
            </div>
          </div>
        </section>

        <!-- 06 : SEC, SFC & TS Panchayati Raj Act 2018 -->
        <section id="sec-sfc-ts-pr-act" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">SEC, SFC &amp; Telangana State Panchayati Raj Act 2018</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="sec-sfc-ts-pr-act"
              section-label="SEC, SFC &amp; Telangana State Panchayati Raj Act 2018"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 243I, 243K &amp; Act 5 of 2018</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="sec-sfc-ts-pr-act"
            section-label="SEC, SFC &amp; Telangana State Panchayati Raj Act 2018"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Twin Institutional Pillars &amp; Telangana's Rural Engine
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Giving Panchayats and Municipalities constitutional status is useless without two foundational guarantees: <strong class="t-hi">regular, fearless elections</strong> and <strong class="t-hi">guaranteed financial resources</strong>. If the State Government could postpone local elections at will or starve local bodies of funds, decentralization would collapse.
            </p>
            <p class="text-xs t-mid leading-relaxed mb-3">
              To prevent this, the Constitution erected two independent institutions:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">Pillar 1 : State Election Commission (Art. 243K)</span>
                <p class="font-bold t-hi mt-1">Independent Ballot Keeper</p>
                <p class="text-[11px] t-mid mt-0.5">Autonomous constitutional body conducting free and fair elections to all Panchayats and Municipalities, shielded from state cabinet interference.</p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Pillar 2 : State Finance Commission (Art. 243I)</span>
                <p class="font-bold t-hi mt-1">Grassroots Financial Lifeline</p>
                <p class="text-[11px] t-mid mt-0.5">Quasi-judicial commission constituted every 5 years to mandate tax devolution and grants from the State Consolidated Fund to local bodies.</p>
              </div>
            </div>
            <p class="text-xs t-mid leading-relaxed">
              <strong class="t-hi">The Telangana Transformation:</strong> In 2018, Telangana passed the landmark <strong class="t-hi">Telangana State Panchayati Raj Act (Act No. 5 of 2018)</strong>. It completely reorganized rural governance: elevating remote tribal Thandas into 12,769+ self-governing Gram Panchayats, mandating daily work logs ('Roznamcha'), enforcing strict Gram Sabha quorums, and backing villages with dedicated monthly funding through the Palle Pragathi initiative.
            </p>
          </div>

          <!-- SEC & SFC Architecture -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-xs">
            <!-- State Election Commission -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-amber-600 dark:text-amber-400 text-sm">State Election Commission (SEC)</span>
                <span class="chip chip-mono text-[10px]">Art. 243K &amp; 243ZA</span>
              </div>
              <ul class="space-y-2 text-xs t-mid list-disc pl-4">
                <li><strong class="t-hi">Mandate:</strong> Superintendence, direction, and control of electoral rolls and the conduct of all elections to Panchayats (243K) and Municipalities (243ZA) (PYQ-3078).</li>
                <li><strong class="t-hi">Appointment:</strong> Consists of a State Election Commissioner appointed by the <strong class="t-hi">Governor</strong>.</li>
                <li><strong class="t-hi">Jurisdiction Boundary:</strong> SEC conducts ONLY local body elections! The Election Commission of India (Art. 324) conducts Parliament, State Assembly, and Presidential elections.</li>
              </ul>
              <!-- SEC Removal Paradox Trap -->
              <div class="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
                <p class="font-bold text-rose-600 dark:text-rose-400">The SEC Removal Paradox : Critical Exam Trap</p>
                <p class="mt-1 t-mid leading-relaxed">
                  Although the State Election Commissioner is appointed by the Governor, the <strong class="t-hi">Governor CANNOT remove the SEC!</strong> Under Article 243K(2), the SEC can only be removed from office in <strong class="t-hi">like manner and on like grounds as a Judge of a High Court</strong> (by an order of the President passed after an address by each House of Parliament supported by a special majority).
                </p>
              </div>
            </div>

            <!-- State Finance Commission -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">State Finance Commission (SFC)</span>
                <span class="chip chip-mono text-[10px]">Art. 243I &amp; 243Y</span>
              </div>
              <ul class="space-y-2 text-xs t-mid list-disc pl-4">
                <li><strong class="t-hi">Constitution:</strong> Constituted by the <strong class="t-hi">Governor every 5 years</strong> to review the financial position of Panchayats (243I) and Municipalities (243Y).</li>
                <li><strong class="t-hi">Core Recommendations:</strong> Principles governing the distribution of net proceeds of state taxes between State and local bodies, allocation of shares between tiers, and grants-in-aid from the State Consolidated Fund.</li>
                <li><strong class="t-hi">Legislative Tabling:</strong> Governor causes recommendations together with action-taken memorandum to be laid before the State Legislature.</li>
              </ul>
              <!-- Link to Central FC -->
              <div class="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <p class="font-bold text-emerald-600 dark:text-emerald-400">Link to Central Finance Commission (Art. 280)</p>
                <p class="mt-1 t-mid leading-relaxed">
                  Under Article 280(3)(bb) and (c), the Central Finance Commission recommends measures to augment the Consolidated Fund of a State to supplement local body resources <strong class="t-hi">on the basis of recommendations made by the State Finance Commission</strong>.
                </p>
              </div>
            </div>
          </div>

          <!-- Deep Dive: Telangana State Panchayati Raj Act, 2018 -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-sparkles" class="h-4 w-4 text-saffron-500" />
                <h3 class="text-sm font-bold t-hi">Telangana State Panchayati Raj Act, 2018 (Act No. 5 of 2018)</h3>
              </div>
              <span class="chip chip-saffron text-[10px] font-mono">TGPRB High-Yield Law</span>
            </div>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Enacted by the Telangana Legislative Assembly to replace the composite AP PR Act 1994. It introduced sweeping institutional reforms across Telangana's <strong class="t-hi">12,769 Gram Panchayats</strong> and <strong class="t-hi">540 Mandal Praja Parishads</strong>:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
              <!-- Reorganization & Thandas -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400">1. Tribal Hamlets &amp; Thandas Upgrade</span>
                <p class="mt-1 t-mid leading-relaxed">
                  All tribal habitations, Thandas, Gudems, and Chenchu pentas with a population of 500 or more were carved out into independent, self-governing Gram Panchayats. In Scheduled Areas (Agency tracts), 100% of Sarpanch posts are reserved exclusively for Scheduled Tribes (STs).
                </p>
              </div>

              <!-- Gram Sabha Quorum -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">2. Gram Sabha Frequency &amp; Strict Quorum</span>
                <p class="mt-1 t-mid leading-relaxed">
                  Gram Sabha must meet <strong class="t-hi">at least once every two months</strong> (minimum 6 meetings annually). Quorum is strictly population-graded:
                </p>
                <div class="mt-2 grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  <div class="p-1 rounded bg-elev border b-line">&lt;= 500 pop: 50 voters</div>
                  <div class="p-1 rounded bg-elev border b-line">501-1000 pop: 75 voters</div>
                  <div class="p-1 rounded bg-elev border b-line">1001-3000 pop: 150 voters</div>
                  <div class="p-1 rounded bg-elev border border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold">3001-5000 pop: 200 voters</div>
                  <div class="p-1 rounded bg-elev border b-line col-span-2">&gt; 5000 pop: 250 voters</div>
                </div>
              </div>

              <!-- Sarpanch Powers & Roznamcha -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="font-mono font-bold text-blue-600 dark:text-blue-400">3. Sarpanch, Joint Cheque &amp; Roznamcha</span>
                <p class="mt-1 t-mid leading-relaxed">
                  Sarpanch is directly elected; minimum age is <strong class="t-hi">21 years</strong> (PYQ-2201). Financial transactions require <strong class="t-hi">joint signature</strong> of Sarpanch and Up-Sarpanch (or Panchayat Secretary). Maintenance of the <strong class="t-hi">'Roznamcha'</strong> (official daily work diary recording inspections, morning sanitation rounds, and civic operations) is legally mandatory.
                </p>
              </div>

              <!-- Ward Distribution & Disqualifications -->
              <div class="p-4 rounded-xl bg-sub border b-line">
                <span class="font-mono font-bold text-rose-600 dark:text-rose-400">4. Ward Distribution &amp; Disqualifications</span>
                <p class="mt-1 t-mid leading-relaxed">
                  Panchayats are divided into 5 to 21 wards. A GP with population between <strong class="t-hi">1,500 and 3,000 has exactly 11 wards</strong> (PYQ-2201). Strict disqualification: Sarpanch can be removed by District Collector for failing to hold Gram Sabha, misappropriation, or failing to maintain 85% survival rate of Haritha Haram saplings. Casual vacancies must be filled within <strong class="t-hi">60 days</strong>.
                </p>
              </div>
            </div>

            <!-- Palle Pragathi Infrastructure Highlights -->
            <div class="p-3 rounded-lg bg-elev border b-line text-xs">
              <span class="font-bold t-hi">Palle Pragathi Program Deliverables in Every Telangana GP:</span>
              <div class="mt-1.5 flex flex-wrap gap-2 text-[11px] t-mid">
                <span class="chip">Vaikunta Dhamam (Crematorium)</span>
                <span class="chip">Rythu Vedika (Farmers' Hall)</span>
                <span class="chip">Segregation Shed &amp; Dump Yard</span>
                <span class="chip">Tractor &amp; Water Tanker</span>
                <span class="chip">Palle Prakruthi Vanam (Village Park)</span>
                <span class="chip">Brihat Natural Forest</span>
              </div>
            </div>
          </div>

          <!-- Connected Verified PYQs -->
          <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs flex items-start gap-3">
            <UIcon name="i-heroicons-bookmark-square" class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-[11px]">
                Exam Anchors : Tested in SI Mains 2023 &amp; SI Mains 2018
              </p>
              <p class="mt-1 t-mid leading-relaxed">
                <strong class="t-hi">PYQ-3078:</strong> In India, the conduct of elections to Panchayats is vested under the <strong class="t-hi">State Election Commissioner</strong> (Article 243K).<br />
                <strong class="t-hi">PYQ-2201:</strong> Under the Telangana State Panchayati Raj Act, 2018: (1) Minimum age to contest Sarpanch is <strong class="t-hi">21 years</strong>, (2) Population 1,500-3,000 is divided into <strong class="t-hi">11 wards</strong>, (3) Roznamcha is the official daily activity diary, and (4) Gram Sabha quorum for population 3,001-5,000 is <strong class="t-hi">200</strong> (not 300).
              </p>
            </div>
          </div>
        </section>

        <!-- 07 : High-Yield Cloze Recall Anchors -->
        <section id="cloze-recall-anchors" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">High-Yield Cloze Recall Anchors &amp; Memory Triggers</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="cloze-recall-anchors"
              section-label="High-Yield Cloze Recall Anchors"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Active Recall Anchors</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="cloze-recall-anchors"
            section-label="High-Yield Cloze Recall Anchors"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-4">
            Test your precision recall on core constitutional articles, committee recommendations, statutory numbers, and exam traps. Click any card to reveal its cloze anchor, or use the global toggle button below.
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
            <!-- Group 1: Key Constitutional Articles -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-document-text" class="h-3.5 w-3.5 text-amber-500" />
                Category A : Key Constitutional Articles
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Anchor 1 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art154')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Executive Power of State</span>
                  <p class="text-xs font-semibold t-hi mt-1">In whom is State executive power vested?</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art154')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Governor of the State (Article 154(1))
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 2 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art157')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Governor Qualifications</span>
                  <p class="text-xs font-semibold t-hi mt-1">Constitutional qualifications for Governor</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art157')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Only 2: Citizen of India &amp; 35 years age (Art. 157)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 3 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art169')"
                >
                  <span class="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">Legislative Council Abolition</span>
                  <p class="text-xs font-semibold t-hi mt-1">Mechanism to abolish or create Council</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art169')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Assembly Special Majority + Parliament Simple Law (Art. 169)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 4 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art201')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">President Assent on State Bill</span>
                  <p class="text-xs font-semibold t-hi mt-1">Is President bound on repassed state bills?</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art201')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      NO, President is NOT bound under Article 201
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 5 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art213')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Governor Ordinance Lifespan</span>
                  <p class="text-xs font-semibold t-hi mt-1">Ordinance duration after legislature reassembles</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art213')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      6 weeks from date of reassembly (Article 213)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 6 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art243k')"
                >
                  <span class="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">SEC Removal Procedure</span>
                  <p class="text-xs font-semibold t-hi mt-1">How can State Election Commissioner be removed?</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art243k')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      In like manner as a High Court Judge (Art. 243K(2))
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 2: Landmark Committees & SC Precedents -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-scale" class="h-3.5 w-3.5 text-emerald-500" />
                Category B : Landmark Committees &amp; Supreme Court Precedents
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Anchor 7 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-balwant')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Balwant Rai Mehta (1957)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Core recommendation on tier structure &amp; ZP role</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-balwant')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      3-tier PRIs; Zilla Parishad as Advisory body
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 8 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-ashok')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Ashok Mehta (1977-78)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Recommended tier model &amp; political parties</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-ashok')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      2-tier (Mandal + ZP); Official party participation
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 9 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-singhvi')"
                >
                  <span class="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">L.M. Singhvi (1986)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Historic breakthrough recommendation</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-singhvi')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Constitutional recognition &amp; Nyaya Panchayats
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 10 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-pant')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">Hargovind Pant (1979)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Constitutional status of Governor's office</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-pant')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Independent constitutional office, NOT GoI employment
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 11 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-wadhwa')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">D.C. Wadhwa (1987)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Ruling on repromulgating ordinances</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-wadhwa')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Fraud on Constitution &amp; subversion of democracy
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 12 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-rebia')"
                >
                  <span class="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">Nabam Rebia (2016)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Governor discretion in summoning assembly</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-rebia')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Cannot summon assembly without cabinet aid &amp; advice
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 3: Statutory Numbers & Traps -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-hashtag" class="h-3.5 w-3.5 text-blue-500" />
                Category C : Statutory Numbers &amp; Exam Traps
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Anchor 13 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-age-panchayat')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Sarpanch Qualifying Age</span>
                  <p class="text-xs font-semibold t-hi mt-1">Minimum age to contest Panchayat elections</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-age-panchayat')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      21 Years (Art. 243F &amp; TS PR Act 2018)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 14 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-schedules')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">11th vs 12th Schedule</span>
                  <p class="text-xs font-semibold t-hi mt-1">Number of subjects in 11th and 12th Schedules</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-schedules')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      29 Subjects (11th) vs 18 Subjects (12th)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 15 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-council-delay')"
                >
                  <span class="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">Council Ordinary Bill Delay</span>
                  <p class="text-xs font-semibold t-hi mt-1">Total maximum delay by Legislative Council</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-council-delay')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      4 Months Max (3 months 1st + 1 month 2nd)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 16 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-women-50')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">50% Women Reservation</span>
                  <p class="text-xs font-semibold t-hi mt-1">First State to offer 50% reservation in PRIs</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-women-50')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Bihar (in 2006; PYQ-0297)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 17 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-ts-wards')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">TS PR Act 2018 Wards</span>
                  <p class="text-xs font-semibold t-hi mt-1">Number of wards for 1,500-3,000 population</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-ts-wards')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Exactly 11 Wards (PYQ-2201)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>

                <!-- Anchor 18 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-roznamcha')"
                >
                  <span class="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">TS PR Act 2018 Roznamcha</span>
                  <p class="text-xs font-semibold t-hi mt-1">What is Roznamcha in village governance?</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-roznamcha')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Mandatory official daily work &amp; inspection diary
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 08 : Dedicated Constitutional Comparison Matrices -->
        <section id="comparison-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Dedicated Constitutional Comparison Matrices</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="comparison-matrix"
              section-label="Dedicated Constitutional Comparison Matrices"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Structural Duels</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="comparison-matrix"
            section-label="Dedicated Constitutional Comparison Matrices"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            Side-by-side comparative matrices resolving the highest-frequency confusion points and trap duels between Union, State, and Local governance institutions.
          </p>

          <!-- Matrix 1: President vs Governor -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-arrows-right-left" class="h-4 w-4 text-saffron-500" />
              Comparison Matrix 1 : President of India vs Governor of a State
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b b-line text-body-xs font-mono t-lo">
                    <th class="py-2.5 px-3">Dimension</th>
                    <th class="py-2.5 px-3">President of India (Part V)</th>
                    <th class="py-2.5 px-3">Governor of a State (Part VI)</th>
                  </tr>
                </thead>
                <tbody class="divide-y b-line t-mid">
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Election / Appointment</td>
                    <td class="py-2.5 px-3">Elected by Electoral College (MPs + MLAs) via PR-STV (Art. 54).</td>
                    <td class="py-2.5 px-3">Appointed directly by President by warrant under hand and seal (Art. 155).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Security of Tenure</td>
                    <td class="py-2.5 px-3">Fixed 5-year tenure; removed ONLY by impeachment under Art. 61 for 'violation of the Constitution'.</td>
                    <td class="py-2.5 px-3">NO security of tenure; holds office during 'pleasure of the President' (Art. 156).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Constitutional Discretion</td>
                    <td class="py-2.5 px-3">NO explicit constitutional discretion in Article 74; bound by cabinet advice (except situational).</td>
                    <td class="py-2.5 px-3">Explicit constitutional discretion under Article 163(1) &amp; 163(2); Governor's decision is final.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Pardoning Death Sentences</td>
                    <td class="py-2.5 px-3"><strong class="t-hi">Exclusive power to pardon</strong> death sentences under Article 72.</td>
                    <td class="py-2.5 px-3"><strong class="t-hi">CANNOT pardon</strong> death sentence; can only suspend, remit, or commute (Art. 161).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Court Martial Clemency</td>
                    <td class="py-2.5 px-3">Full power to pardon, remit, or commute sentences of military courts.</td>
                    <td class="py-2.5 px-3">ZERO power over sentences awarded by Court Martial.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Veto on Repassed Bills</td>
                    <td class="py-2.5 px-3">MUST give assent if Parliament repasses returned bill (Art. 111).</td>
                    <td class="py-2.5 px-3">MUST give assent if State Legislature repasses returned bill (Art. 200). BUT President is NOT bound under Art. 201!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Matrix 2: Legislative Assembly vs Legislative Council -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-emerald-500" />
              Comparison Matrix 2 : Legislative Assembly (Vidhan Sabha) vs Legislative Council (Vidhan Parishad)
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b b-line text-body-xs font-mono t-lo">
                    <th class="py-2.5 px-3">Parameter</th>
                    <th class="py-2.5 px-3">Legislative Assembly (Vidhan Sabha)</th>
                    <th class="py-2.5 px-3">Legislative Council (Vidhan Parishad)</th>
                  </tr>
                </thead>
                <tbody class="divide-y b-line t-mid">
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Constitutional Status</td>
                    <td class="py-2.5 px-3">Mandatory House in every State (Art. 170).</td>
                    <td class="py-2.5 px-3">Optional House; exists in only 6 States; can be abolished under Art. 169.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Qualifying Age</td>
                    <td class="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">25 Years</td>
                    <td class="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">30 Years</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Tenure &amp; Dissolution</td>
                    <td class="py-2.5 px-3">5-year term; subject to dissolution by Governor at any time.</td>
                    <td class="py-2.5 px-3">Permanent House; not subject to dissolution; 1/3 members retire every 2 years.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Ordinary Bill Delay Power</td>
                    <td class="py-2.5 px-3">Originates and passes bills with sovereign popular mandate.</td>
                    <td class="py-2.5 px-3">Dilatory chamber only; can delay for maximum <strong class="t-hi">4 months (3 + 1)</strong>. Cannot defeat a bill!</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Money Bill Authority</td>
                    <td class="py-2.5 px-3">Exclusive origination; Assembly decides whether to accept Council suggestions.</td>
                    <td class="py-2.5 px-3">Cannot introduce or amend Money Bill; can delay for <strong class="t-hi">14 days only</strong>.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Joint Sitting (Art. 108)</td>
                    <td class="py-2.5 px-3">Will always prevails; no joint sitting needed.</td>
                    <td class="py-2.5 px-3"><strong class="t-hi">NO joint sitting exists in states</strong>.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Executive Responsibility</td>
                    <td class="py-2.5 px-3">Council of Ministers is <strong class="t-hi">collectively responsible to Assembly</strong> (Art. 164(2)).</td>
                    <td class="py-2.5 px-3">Can question ministers, but cannot pass a No-Confidence Motion to oust government.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Matrix 3: 73rd CAA vs 74th CAA -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-squares-2x2" class="h-4 w-4 text-blue-500" />
              Comparison Matrix 3 : 73rd CAA (Panchayati Raj) vs 74th CAA (Municipalities)
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b b-line text-body-xs font-mono t-lo">
                    <th class="py-2.5 px-3">Feature</th>
                    <th class="py-2.5 px-3">73rd CAA, 1992 (Panchayats)</th>
                    <th class="py-2.5 px-3">74th CAA, 1992 (Municipalities)</th>
                  </tr>
                </thead>
                <tbody class="divide-y b-line t-mid">
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Constitutional Part</td>
                    <td class="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">Part IX (Articles 243 to 243-O)</td>
                    <td class="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">Part IX-A (Articles 243P to 243ZG)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Effective Date</td>
                    <td class="py-2.5 px-3 font-mono">24 April 1993 (Panchayati Raj Day)</td>
                    <td class="py-2.5 px-3 font-mono">1 June 1993</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Constitutional Schedule</td>
                    <td class="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">11th Schedule (29 Subjects)</td>
                    <td class="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">12th Schedule (18 Subjects)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Grassroots Deliberative Body</td>
                    <td class="py-2.5 px-3 font-bold t-hi">Gram Sabha (Art. 243A: all voters of village)</td>
                    <td class="py-2.5 px-3 font-bold t-hi">Wards Committees (Art. 243S: pop &gt;= 3 Lakhs)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">3-Tier Hierarchy</td>
                    <td class="py-2.5 px-3">Gram Panchayat, Mandal Panchayat, Zilla Parishad.</td>
                    <td class="py-2.5 px-3">Nagar Panchayat, Municipal Council, Municipal Corporation.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">State Election Commission</td>
                    <td class="py-2.5 px-3 font-mono">Article 243K</td>
                    <td class="py-2.5 px-3 font-mono">Article 243ZA (same Commission conducts both)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">State Finance Commission</td>
                    <td class="py-2.5 px-3 font-mono">Article 243I</td>
                    <td class="py-2.5 px-3 font-mono">Article 243Y (same Commission reviews both)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Matrix 4: Age Eligibility Hierarchy -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-purple-500" />
              Comparison Matrix 4 : Constitutional Age Eligibility Hierarchy (18, 21, 25, 30, 35)
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
              <div class="p-3 rounded-lg bg-sub border b-line text-center">
                <span class="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">18 Years</span>
                <p class="font-bold t-hi mt-1">Voting Age</p>
                <p class="text-[11px] t-mid mt-0.5">Article 326 (reduced from 21 by 61st CAA, 1988). Universal adult suffrage.</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border border-amber-500/40 text-center">
                <span class="text-lg font-mono font-bold text-amber-600 dark:text-amber-400">21 Years</span>
                <p class="font-bold t-hi mt-1">Local Bodies Contest</p>
                <p class="text-[11px] t-mid mt-0.5">Sarpanch, Ward Member, Councillor, Corporator (Arts. 243F &amp; 243V).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line text-center">
                <span class="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">25 Years</span>
                <p class="font-bold t-hi mt-1">Lower House</p>
                <p class="text-[11px] t-mid mt-0.5">Member of Legislative Assembly (MLA) &amp; Lok Sabha MP (Arts. 84 &amp; 173).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line text-center">
                <span class="text-lg font-mono font-bold text-purple-600 dark:text-purple-400">30 Years</span>
                <p class="font-bold t-hi mt-1">Upper House</p>
                <p class="text-[11px] t-mid mt-0.5">Member of Legislative Council (MLC) &amp; Rajya Sabha MP (Arts. 84 &amp; 173).</p>
              </div>
              <div class="p-3 rounded-lg bg-sub border b-line text-center">
                <span class="text-lg font-mono font-bold text-rose-600 dark:text-rose-400">35 Years</span>
                <p class="font-bold t-hi mt-1">Constitutional Head</p>
                <p class="text-[11px] t-mid mt-0.5">President of India &amp; Governor of a State (Arts. 58 &amp; 157).</p>
              </div>
            </div>
          </div>

          <!-- Matrix 5: Appointment vs Removal Paradox -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-bolt" class="h-4 w-4 text-rose-500" />
              Comparison Matrix 5 : The Appointment vs Removal Paradox Matrix
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              One of TGPRB's favorite tricks is testing functionaries whom the Governor <strong class="t-hi">appoints</strong>, but whom the Governor <strong class="t-hi">CANNOT remove</strong>:
            </p>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b b-line text-body-xs font-mono t-lo">
                    <th class="py-2.5 px-3">Constitutional Post</th>
                    <th class="py-2.5 px-3">Appointing Authority</th>
                    <th class="py-2.5 px-3">Removing Authority &amp; Grounds</th>
                  </tr>
                </thead>
                <tbody class="divide-y b-line t-mid">
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">State Election Commissioner (SEC)</td>
                    <td class="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Governor (Art. 243K)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold"><strong class="t-hi">President ONLY</strong>, in like manner and grounds as a High Court Judge (Art. 243K(2)). Governor cannot remove!</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">SPSC Chairman &amp; Members (TGPSC)</td>
                    <td class="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Governor (Art. 316)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold"><strong class="t-hi">President ONLY</strong>, on grounds of misbehaviour after Supreme Court inquiry under Art. 317. Governor can only suspend!</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">High Court Judges</td>
                    <td class="py-2.5 px-3 font-mono text-blue-600 dark:text-blue-400 font-bold">President (Art. 217)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold"><strong class="t-hi">President ONLY</strong>, following address by both Houses of Parliament with special majority (Art. 217/124).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">Advocate General for State</td>
                    <td class="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Governor (Art. 165)</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold"><strong class="t-hi">Governor</strong> at pleasure (Art. 165(3)).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 px-3 font-bold t-hi">State Ministers &amp; Chief Minister</td>
                    <td class="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Governor (Art. 164)</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold"><strong class="t-hi">Governor</strong> at pleasure, subject to floor majority of Legislative Assembly.</td>
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
            <h2 class="sec-title">Previous Year Questions (TGPRB 2015-2023)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="pyqs"
              section-label="Previous Year Questions"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ pyqs.length }} Questions</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="pyqs"
            section-label="Previous Year Questions"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />

          <!-- PYQ Filters & Scoreboard -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-sub border b-line">
            <div class="flex flex-wrap items-center gap-2">
              <button
                v-for="tab in examFilters"
                :key="tab.value"
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                :class="activeExamFilter === tab.value ? 'bg-saffron-500 text-white shadow-sm' : 'bg-elev border b-line t-mid hover:t-hi'"
                @click="activeExamFilter = tab.value"
              >
                {{ tab.label }}
              </button>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="t-lo">Attempted:</span>
              <span class="font-bold t-hi">{{ attemptedCount }}/{{ pyqs.length }}</span>
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
                  {{ q.revealed ? 'Hide solution' : 'Show solution' }}
                </button>
              </div>

              <!-- Question Text -->
              <p class="text-sm font-medium t-hi leading-relaxed whitespace-pre-line mb-4">
                {{ q.question }}
              </p>

              <!-- Options Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                <button
                  v-for="(opt, optIdx) in q.options"
                  :key="optIdx"
                  type="button"
                  class="p-3 rounded-lg border text-left text-xs transition-all select-none"
                  :class="[
                    q.selected === optIdx
                      ? optIdx === q.correct
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-semibold'
                        : 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200 font-semibold'
                      : q.revealed && optIdx === q.correct
                        ? 'border-emerald-500/60 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200'
                        : 'border-line bg-sub/60 hover:bg-sub t-mid hover:t-hi'
                  ]"
                  @click="attempt(q, optIdx)"
                >
                  <div class="flex items-start gap-2">
                    <span class="num font-mono text-[11px] shrink-0 mt-0.5">
                      {{ ['(A)', '(B)', '(C)', '(D)', '(E)'][optIdx] || (optIdx + 1) }}
                    </span>
                    <span class="leading-relaxed">{{ opt }}</span>
                  </div>
                </button>
              </div>

              <!-- Answer / Explanation Box -->
              <div
                v-if="q.revealed"
                class="p-4 rounded-lg bg-sub border b-line text-xs space-y-2 transition-all"
              >
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-emerald-500" />
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">
                    Correct Option: {{ ['(A)', '(B)', '(C)', '(D)', '(E)'][q.correct] || (q.correct + 1) }}
                  </span>
                </div>
                <p class="text-xs t-mid leading-relaxed">
                  {{ q.explanation }}
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
              note-id="NOTE-POL-PANCHAYAT"
              section-id="advanced-practice"
              section-label="Advanced Practice Drills"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">TGPSC/TGPRB Standard</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="advanced-practice"
            section-label="Advanced Practice Drills"
            note-title="State Government &amp; Local Governance"
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
                  @click="revealAdv(adv)"
                >
                  {{ adv.revealed ? 'Hide solution' : 'Show solution' }}
                </button>
              </div>

              <p class="text-sm font-medium t-hi leading-relaxed whitespace-pre-line mb-4">
                {{ adv.question }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                <button
                  v-for="(opt, optIdx) in adv.options"
                  :key="optIdx"
                  type="button"
                  class="p-3 rounded-lg border text-left text-xs transition-all select-none"
                  :class="[
                    adv.selected === optIdx
                      ? optIdx === adv.correct
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-semibold'
                        : 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200 font-semibold'
                      : adv.revealed && optIdx === adv.correct
                        ? 'border-emerald-500/60 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200'
                        : 'border-line bg-sub/60 hover:bg-sub t-mid hover:t-hi'
                  ]"
                  @click="attemptAdv(adv, optIdx)"
                >
                  <div class="flex items-start gap-2">
                    <span class="num font-mono text-[11px] shrink-0 mt-0.5">
                      {{ ['(A)', '(B)', '(C)', '(D)'][optIdx] || (optIdx + 1) }}
                    </span>
                    <span class="leading-relaxed">{{ opt }}</span>
                  </div>
                </button>
              </div>

              <div
                v-if="adv.revealed"
                class="p-4 rounded-lg bg-sub border b-line text-xs space-y-2 transition-all"
              >
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-emerald-500" />
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">
                    Correct Option: {{ ['(A)', '(B)', '(C)', '(D)'][adv.correct] || (adv.correct + 1) }}
                  </span>
                </div>
                <p class="text-xs t-mid leading-relaxed">
                  {{ adv.explanation }}
                </p>
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
              note-id="NOTE-POL-PANCHAYAT"
              section-id="gate"
              section-label="Comprehension Gate"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="gate"
            section-label="Comprehension Gate"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />
          <GateQuiz note-id="NOTE-POL-PANCHAYAT" />
        </section>

        <!-- 12 : Current Affairs -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">12</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton
              note-id="NOTE-POL-PANCHAYAT"
              section-id="current-affairs"
              section-label="Current Affairs"
              note-title="State Government &amp; Local Governance"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-PANCHAYAT"
            section-id="current-affairs"
            section-label="Current Affairs"
            note-title="State Government &amp; Local Governance"
            @open="openNotesDrawer"
          />
          <CurrentAffairsStrip note-id="NOTE-POL-PANCHAYAT" />
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
            to="/study/state-and-local-governance"
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
      note-id="NOTE-POL-PANCHAYAT"
      note-title="State Government &amp; Local Governance"
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

    <USlideover v-model="mobileTocOpen" side="left">
      <div class="p-5 overflow-y-auto max-h-screen">
        <div class="flex items-center justify-between pb-4 border-b b-line mb-4">
          <span class="font-bold t-hi text-sm">Table of Contents</span>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            size="xs"
            @click="mobileTocOpen = false"
          />
        </div>
        <nav class="space-y-1">
          <button
            v-for="(sec, si) in sections"
            :key="sec.id"
            type="button"
            class="w-full text-left py-2 px-3 rounded-lg text-xs transition-colors flex items-center gap-2"
            :class="activeSection === sec.id ? 'bg-saffron-500/10 text-saffron-700 dark:text-saffron-300 font-bold' : 't-mid hover:bg-sub'"
            @click="scrollTo(sec.id); mobileTocOpen = false"
          >
            <span class="font-mono text-[10px] text-amber-500">{{ String(si + 1).padStart(2, '0') }}</span>
            <span>{{ sec.label }}</span>
          </button>
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
  title: 'State Government & Local Governance - BeatBook',
  meta: [{ name: 'description', content: 'Comprehensive TGPRB study note: State Government & Local Governance covering Governor powers, State Legislature, 73rd & 74th CAAs, SEC, SFC, TS Panchayati Raj Act 2018, and 21 verified PYQs.' }],
})

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Part VI: State Executive (Arts 153-167)' },
  { label: 'State Legislature & Delay Rules (Arts 168-212)' },
  { label: 'Governor Discretion & Bill Reservation (Arts 200-201)' },
  { label: '73rd CAA & 3-Tier Panchayati Raj (Part IX)' },
  { label: '74th CAA & Urban Local Bodies (Part IX-A)' },
  { label: 'SEC (Art 243K) & SFC (Art 243I)' },
  { label: 'Telangana State Panchayati Raj Act 2018' },
  { label: 'Exam Trap Matrices & High-Yield Drills' },
]

const sections = [
  { id: 'visual-architecture',             label: 'Visual Architecture & Part VI / IX Blueprint' },
  { id: 'state-executive',                label: 'State Executive: Governor, CM & Council' },
  { id: 'state-legislature',              label: 'State Legislature: Assembly vs Council' },
  { id: 'panchayati-raj',                 label: 'Panchayati Raj (73rd CAA & Part IX)' },
  { id: 'municipalities-ulbs',            label: 'Municipalities & ULBs (74th CAA)' },
  { id: 'sec-sfc-ts-pr-act',              label: 'SEC, SFC & TS Panchayati Raj Act 2018' },
  { id: 'cloze-recall-anchors',            label: 'High-Yield Cloze Recall Anchors' },
  { id: 'comparison-matrix',               label: 'Dedicated Constitutional Comparison Matrices' },
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
    "uid": "PYQ-3065",
    "exam": "SI",
    "year": "2023",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "SI 2023 Mains : Q136",
    "question": "Which part of the Indian Constitution deals with State Legislature ?",
    "options": [
      "Part -VII",
      "Part - V",
      "Part - IV",
      "Part - VI"
    ],
    "correct": 3,
    "explanation": "Part VI of the Indian Constitution (Articles 152 to 237) deals with 'The States', where Chapter III specifically covers the State Legislature (Articles 168 to 212). Part V covers 'The Union', Part IV contains the Directive Principles of State Policy, and Part VII was repealed by the 7th Constitutional Amendment Act, 1956.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0590",
    "exam": "Constable",
    "year": "2018",
    "tag": "Panchayati Raj (73rd Amendment); Municipalities & Urban Local Bodies (74th Amendment)",
    "source": "Constable 2018 Mains : Q169",
    "question": "Reservations as per 73rd and 74th Constitutional Amendment have facilitated",
    "options": [
      "Women's appointments in all top positions",
      "Women entering Gram Panchayats and Municipalities",
      "Establishing small shops by many women",
      "Increasing women labour in Agriculture"
    ],
    "correct": 1,
    "explanation": "The 73rd and 74th Constitutional Amendment Acts mandates a reservation of not less than one-third (33%) of the total seats for women in local self-governments. This structural provision facilitated political empowerment by ensuring women's entry into Gram Panchayats and Municipalities across India.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0755",
    "exam": "Constable",
    "year": "2018",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2018 Prelims : Q135",
    "question": "Which one of the following statements is true with regard to the office of the Governor?",
    "options": [
      "It is subordinate to the Union Government.",
      "Governor's salary is fixed by Union Home Minister.",
      "The constitution under Article 157 prescribes only two qualifications.",
      "It is an employment under the Government of India."
    ],
    "correct": 2,
    "explanation": "Article 157 of the Constitution prescribes only two qualifications for a person to be appointed as Governor: they must be a citizen of India and must have completed 35 years of age. Additionally, the Supreme Court ruled in 1979 that the office of the Governor is an independent constitutional office and not an employment under the Union Government.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1154",
    "exam": "Constable",
    "year": "2023",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2023 Mains : Q139",
    "question": "In India, The executive power of the state shall be vested in ________.",
    "options": [
      "President",
      "Chief Minister",
      "Prime Minister",
      "Governor"
    ],
    "correct": 3,
    "explanation": "According to Article 154(1) of the Constitution of India, the executive power of the State shall be vested in the Governor. While the Chief Minister is the real executive head (de facto), the Governor is the constitutional or nominal executive head (de jure) of the state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3041",
    "exam": "SI",
    "year": "2023",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "SI 2023 Mains : Q112",
    "question": "In India who appoints the Governors for states ?",
    "options": [
      "Prime minister",
      "President of India",
      "Supreme Court Chief Justice",
      "Lok Sabha Speaker"
    ],
    "correct": 1,
    "explanation": "Under Article 155 of the Indian Constitution, the Governor of a State is appointed by the President of India by warrant under his hand and seal. The Governor holds office during the pleasure of the President (Article 156).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0761",
    "exam": "Constable",
    "year": "2018",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2018 Prelims : Q141",
    "question": "Who among the following is authorized to decide the applicability of any Particular Act of Parliament to a Scheduled Area ?",
    "options": [
      "Union Tribal Affairs Minster",
      "Prime Minister",
      "President",
      "Governor"
    ],
    "correct": 3,
    "explanation": "Under Paragraph 5(1) of the Fifth Schedule of the Indian Constitution, the Governor of a state is empowered to direct that any particular Act of Parliament or State Legislature shall not apply to a Scheduled Area, or shall apply subject to specified exceptions and modifications.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0757",
    "exam": "Constable",
    "year": "2018",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2018 Prelims : Q137",
    "question": "Consider the following statements with regard to the State Legislature. i. An ordinary bill can originate in any of the Houses. ii. Legislative Council can delay ordinary bill only for a period of three months in the first instance. iii. Legislative Council in the second instance can hold ordinary bill for fifteen days. iv. Legislative Council can only delay a money bill for twenty days. Choose the correct answer among the following:",
    "options": [
      "i, ii, iii, iv",
      "i & ii",
      "i, ii & iii",
      "i, ii, iv"
    ],
    "correct": 1,
    "explanation": "An ordinary bill can originate in either house of a bicameral state legislature. The Legislative Council can delay an ordinary bill for up to 3 months in the first instance and 1 month (30 days) in the second instance, making statement iii incorrect. Money bills can only be delayed by the Legislative Council for up to 14 days, making statement iv incorrect. Thus, only statements i and ii are correct.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2516",
    "exam": "SI",
    "year": "2018",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "SI 2018 Prelims : Q166",
    "question": "Regarding the state bills reserved for President's consideration, examine the following statements:\n(a) President may declare his assent to the bill.\n(b) President may return the bill to the state legislature for its consideration.\n(c) State legislature shall reconsider it accordingly within a period of six months.\n(d) If the legislature again passed it with or without amendment, President shall approve it.\nChoose the correct answer :",
    "options": [
      "(a), (b) and (c) only",
      "(a), (b) and (d) only",
      "(b), (c) and (d) only",
      "(a) and (c) only"
    ],
    "correct": 0,
    "explanation": "Under Article 201 of the Constitution, when a bill is reserved by the Governor for the President's consideration, the President may declare assent, withhold assent, or direct the Governor to return the bill to the state legislature, which must reconsider it within six months. Unlike the Governor, the President is NOT bound to give assent even if the state legislature passes the bill again.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3067",
    "exam": "SI",
    "year": "2023",
    "tag": "Panchayati Raj (73rd Amendment)",
    "source": "SI 2023 Mains : Q138",
    "question": "Part -IX has been added to the Constitution of India through ______",
    "options": [
      "104th Constitutional Amendment Act",
      "86th Constitutional Amendment Act",
      "73rd Constitutional Amendment Act",
      "74th Constitutional Amendment Act"
    ],
    "correct": 2,
    "explanation": "Part IX of the Constitution of India, titled 'The Panchayats', was added by the 73rd Constitutional Amendment Act, 1992. It constitutionalized the three-tier Panchayati Raj system along with the Eleventh Schedule containing 29 functional items.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2700",
    "exam": "SI",
    "year": "2022",
    "tag": "Panchayati Raj (73rd Amendment)",
    "source": "SI 2022 Prelims : Q156",
    "question": "\"A body consisting of persons registered in the electoral rolls relating to a village comprised within the area of panchayat at the village level\" is called",
    "options": [
      "District",
      "Gram Sabha",
      "Panchayat Area",
      "None of the above"
    ],
    "correct": 1,
    "explanation": "According to Article 243(b) of the Indian Constitution (introduced by the 73rd Constitutional Amendment Act, 1992), 'Gram Sabha' is defined as a body consisting of persons registered in the electoral rolls relating to a village comprised within the area of Panchayat at the village level.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0762",
    "exam": "Constable",
    "year": "2018",
    "tag": "Panchayati Raj (73rd Amendment)",
    "source": "Constable 2018 Prelims : Q142",
    "question": "Match the following: List-I (Committee) a. Balwant Rai Mehta b. Ashok Mehta c. K. Santhanam d. L.M. Singhvi List-II (Recommendation) i. Zilla Parishad should be executive body ii. Nyaya Panchayats iii. Zilla Parishad should be advisory body iv. Panchayati Raj Finance Corporation The correct answer is :",
    "options": [
      "a:ii, b:i, c:iv, d:iii",
      "a:i, b:iii, c:iv, d:ii",
      "a:iii, b:i, c:iv, d:ii",
      "a:iii, b:ii, c:i, d:iv"
    ],
    "correct": 2,
    "explanation": "Balwant Rai Mehta Committee (1957) recommended that Zilla Parishad be an advisory body. Ashok Mehta Committee (1978) recommended that Zilla Parishad be the primary executive body. K. Santhanam Committee (1963) recommended setting up a Panchayati Raj Finance Corporation, while the L.M. Singhvi Committee (1986) emphasized the establishment of Nyaya Panchayats.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0297",
    "exam": "Constable",
    "year": "2015",
    "tag": "Panchayati Raj (73rd Amendment)",
    "source": "Constable 2015 Prelims : Q98",
    "question": "Read the following statements :\n(a) First State to offer 50% reservation for women in Panchayati Raj Institutions is Bihar\n(b) The number of seats reserved for scheduled caste members in Lok Sabha is 84\n(c) The number of seats reserved for scheduled tribe members in Lok Sabha is 41\nThe correct answer is",
    "options": [
      "(c) is correct but (a) and (b) are wrong",
      "(c) and (a) are correct, but (b) is wrong",
      "(a) and (b) are correct, but (c) is wrong",
      "All (a), (b) and (c) are wrong"
    ],
    "correct": 2,
    "explanation": "Bihar was the first state to implement 50% reservation for women in Panchayati Raj Institutions in 2006. Currently, 84 seats are reserved for Scheduled Castes (SC) and 47 seats (not 41) are reserved for Scheduled Tribes (ST) in the Lok Sabha.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0521",
    "exam": "Constable",
    "year": "2018",
    "tag": "Municipalities & Urban Local Bodies (74th Amendment)",
    "source": "Constable 2018 Mains : Q100",
    "question": "Which one of the following statements is not correct with regard to sources of revenue to Municipalities?",
    "options": [
      "Grants-in-aid from contingency fund of India.",
      "Grants-in-aid from consolidated fund of India.",
      "Taxes collected by Municipalities authorized by the State Legislature by law.",
      "Taxes collected by state but are assigned to Municipality."
    ],
    "correct": 0,
    "explanation": "The Contingency Fund of India (Article 267) is strictly maintained to meet unforeseen urgent expenditures pending parliamentary approval, and is not a revenue source for local bodies. Municipalities derive revenue through taxes authorized or assigned by the State Legislature, as well as grants-in-aid from the Consolidated Fund of the State and Consolidated Fund of India (based on Finance Commission recommendations).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3078",
    "exam": "SI",
    "year": "2023",
    "tag": "Panchayati Raj (73rd Amendment)",
    "source": "SI 2023 Mains : Q149",
    "question": "In India, the conduct of election to Panchayats is vested under:",
    "options": [
      "State Election Commissioner",
      "District Election Commissioner",
      "Chief Election Commissioner",
      "Chief Minister of the State"
    ],
    "correct": 0,
    "explanation": "Under Article 243K of the Indian Constitution, the superintendence, direction, and control of the preparation of electoral rolls for and conduct of all elections to the Panchayats are vested in the State Election Commission headed by the State Election Commissioner. The State Election Commissioner is appointed by the Governor of the state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2201",
    "exam": "SI",
    "year": "2018",
    "tag": "Panchayati Raj (73rd Amendment) & TS PR Act 2018",
    "source": "SI 2018 Mains : Q99",
    "question": "Examine the following statements with regard to Telangana State Panchayati Raj Act, 2018.\na. Roznamcha is a diary in which details of dead people are maintained.\nb. The quorum for the Grama Sabha if voters are 3001 to 5000 is 300 members.\nc. The eligibility age for office of Sarpanch is 21 years.\nd. The number of wards in a village with population exceeding 1500 but not exceeding 3000 is 11 (eleven).\nChoose the correct answer.",
    "options": [
      "a & b only",
      "c & d only",
      "b, c & d only",
      "a, c & d only"
    ],
    "correct": 1,
    "explanation": "Under the Telangana State Panchayati Raj Act, 2018, the minimum age to contest for Sarpanch is 21 years (statement c) and a village with a population between 1500 and 3000 is divided into 11 wards (statement d). 'Roznamcha' is a general daily diary of events maintained by village officers, not a death register, and the Grama Sabha quorum for 3001-5000 voters is 200 members (300 is for voters exceeding 5000).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0168",
    "exam": "Constable",
    "year": "2015",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2015 Mains : Q168",
    "question": "Read the following statements: a) Shanmuganathan is appointed as Governor of Meghalaya b) Draupadi Murmu is appointed as Governor of Jharkhand c) Tathagata Roy is appointed as Governor of Arunachal Pradesh d) Najma Heptullah is appointed as Governor of Mizoram Choose the correct statements :",
    "options": [
      "(1) a & c",
      "(2) a & b",
      "(3) b&d",
      "(4) a&d"
    ],
    "correct": 1,
    "explanation": "V. Shanmuganathan was appointed as the Governor of Meghalaya and Draupadi Murmu was appointed as the Governor of Jharkhand in May 2015. Meanwhile, Tathagata Roy was appointed as the Governor of Tripura and Najma Heptulla was appointed as the Governor of Manipur.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0316",
    "exam": "Constable",
    "year": "2015",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2015 Prelims : Q119",
    "question": "Match the following: List-I (State) (a) Goa (b) Nagaland (c) Mizoram (d) Uttarakhand List-II (Chief Minister) (i) Harish Rawat (ii) Lal Thanhawla (iii) Lakshmikant Parsekar (iv) T.R. Zeliang",
    "options": [
      "(a) - (ii), (b) - (iv), (c) - (iii), (d) - (i)",
      "(a) - (iii), (b) - (iv), (c) - (ii), (d) - (i)",
      "(a) - (iv), (b) - (ii), (c) - (iii), (d) - (i)",
      "(a) - (i), (b) - (iii), (c) - (iv), (d) - (ii)"
    ],
    "correct": 1,
    "explanation": "Lakshmikant Parsekar served as Chief Minister of Goa, T.R. Zeliang headed Nagaland, Lal Thanhawla led Mizoram, and Harish Rawat was the Chief Minister of Uttarakhand during the mid-2010s period.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0403",
    "exam": "Constable",
    "year": "2016",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2016 Mains : Q119",
    "question": "Match the following :\nList-I\n(State)\n(a) Goa\n(b) Nagaland\n(c) Mizoram\n(d) Uttarakhand\nList-II\n(Chief Minister)\n(i) Harish Rawat\n(ii) Lal Thanhawla\n(iii) Lakshmikant Parsekar\n(iv) T.R. Zeliang",
    "options": [
      "(a) - (ii), (b) - (iv), (c) - (iii), (d) - (i)",
      "(a) - (iii), (b) - (iv), (c) - (ii), (d) - (i)",
      "(a) - (iv), (b) - (ii), (c) - (iii), (d) - (i)",
      "(a) - (i), (b) - (iii), (c) - (iv), (d) - (ii)"
    ],
    "correct": 1,
    "explanation": "Matching the States with their respective Chief Ministers during the 2014-2016 period: Goa was led by Lakshmikant Parsekar, Nagaland by T.R. Zeliang, Mizoram by Lal Thanhawla, and Uttarakhand by Harish Rawat.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0518",
    "exam": "Constable",
    "year": "2018",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2018 Mains : Q97",
    "question": "Match the following states with their Chief Minister as on 20th Feb, 2019:\nList - I (States)\na. Uttarakhand\nb. Himachal Pradesh\nc. Tripura\nd. Puducherry\nList - II (Chief Ministers)\ni. Biplab Kumar Deb\nii. Trivendra Singh Rawat\niii. V. Narayana Swamy\niv. Jai Ram Thakur\nThe correct answer is:",
    "options": [
      "a-iii, b-ii, c-i, d-iv",
      "a-ii, b-i, c-iii, d-iv",
      "a-ii, b-iv, c-i, d-iii",
      "a-ii, b-iv, c-i, d-iii"
    ],
    "correct": 2,
    "explanation": "As of February 2019, Trivendra Singh Rawat served as the CM of Uttarakhand, Jai Ram Thakur as the CM of Himachal Pradesh, Biplab Kumar Deb as the CM of Tripura, and V. Narayana Swamy as the CM of Union Territory Puducherry.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1103",
    "exam": "Constable",
    "year": "2023",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "Constable 2023 Mains : Q86",
    "question": "Identify the Governors of states and match them with the states of their ruling accordingly.\nGroup-I (Governors):\n(a) S. Abdul Najeer\n(b) Shri Ramesh bais\n(c) Anandiben Patel\n(d) Arif Mohammad Khan\n(e) Shri Satyadev Narain Arya\nGroup-II (States):\n(i) Maharashtra\n(ii) Andhra Pradesh\n(iii) Kerala\n(iv) Tripura\n(v) Uttar pradesh",
    "options": [
      "(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv), (e)-(v)",
      "(a)-(iii), (b)-(ii), (c)-(v), (d)-(iv), (e)-(i)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv), (e)-(v)",
      "(a)-(ii), (b)-(i), (c)-(v), (d)-(iii), (e)-(iv)"
    ],
    "correct": 3,
    "explanation": "Justice S. Abdul Nazeer serves as the Governor of Andhra Pradesh, Ramesh Bais as the Governor of Maharashtra, Anandiben Patel as the Governor of Uttar Pradesh, Arif Mohammad Khan as the Governor of Kerala, and Satyadev Narain Arya served as the Governor of Tripura.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2473",
    "exam": "SI",
    "year": "2018",
    "tag": "Governor, Chief Minister & State Legislature",
    "source": "SI 2018 Prelims : Q123",
    "question": "Examine the following statements :\n(a) Governor's rule has been imposed in Jammu and Kashmir in the third week of June 2018.\n(b) B.V.R. Subrahmanyam was appointed as the Governor of Jammu and Kashmir.\n(c) The Director General of Police of Jammu and Kashmir is S.P. Vaid.\nChoose the correct answer:",
    "options": [
      "(a) and (b) only",
      "(b) and (c) only",
      "(a) and (c) only",
      "(a), (b) and (c)"
    ],
    "correct": 2,
    "explanation": "Governor's rule was imposed in J&K on June 20, 2018 (third week of June), and S.P. Vaid was serving as the DGP of J&K at the time. However, B.V.R. Subrahmanyam was appointed as the Chief Secretary of J&K, not the Governor (N.N. Vohra was the Governor then). Thus, statements (a) and (c) are correct.",
    "revealed": false,
    "selected": null
  }
]))

const activeExamFilter = ref('all')
const examFilters = [
  { label: 'All Exams (21)', value: 'all' },
  { label: 'Constable (13)', value: 'Constable' },
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
  q.revealed = !q.revealed
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
    "uid": "ADV-POL-SLG-001",
    "question": "Consider the following statements regarding the Governor's constitutional powers and status:\n\n1. Under Article 157, the Constitution prescribes only two qualifications: the person must be a citizen of India and must have completed 35 years of age.\n2. The office of the Governor is an employment under the Central Government, subordinate to the Union executive.\n3. Under Article 161, the Governor possesses the power to grant pardons, reprieves, respites or remissions, but cannot pardon a death sentence.\n4. Under Article 213, an ordinance promulgated by the Governor ceases to operate after six weeks from the reassembly of the State Legislature.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 3 and 4 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 3, and 4 are correct. Statement 2 is incorrect because the Supreme Court held in Hargovind Pant v. Raghukul Tilak (1979) that the office of the Governor is an independent constitutional office and is not an employment under the Government of India, nor is it subordinate to the Central Government.",
    "source": "TGPSC Group-I Standard Drill (Governor Constitutional Status)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-SLG-002",
    "question": "Examine the following statements regarding the legislative procedure in a bicameral State Legislature under the Indian Constitution:\n\n1. An ordinary bill can originate in either the Legislative Assembly or the Legislative Council.\n2. In case of disagreement between the Assembly and the Council on an ordinary bill, the Governor summons a joint sitting of both Houses.\n3. The Legislative Council can delay an ordinary bill passed by the Legislative Assembly for a maximum period of four months (three months in first instance, one month in second instance).\n4. A Money Bill cannot be introduced in the Legislative Council and can be delayed by the Council for a maximum of 14 days.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 3 and 4 only",
      "1 and 2 only",
      "2 and 3 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 3, and 4 are correct. Statement 2 is incorrect because there is NO provision for a joint sitting of both Houses in the State Legislature (Article 108 applies exclusively to Parliament). The Legislative Council is only a dilatory (delaying) chamber and has no co-equal veto power against the Legislative Assembly.",
    "source": "TGPRB SI Mains Pattern Drill (State Legislative Asymmetry)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-SLG-003",
    "question": "Match List-I (Panchayati Raj Committees) with List-II (Key Recommendations):\n\nList-I:\na. Balwant Rai Mehta Committee (1957)\nb. Ashok Mehta Committee (1977-78)\nc. G.V.K. Rao Committee (1985)\nd. L.M. Singhvi Committee (1986)\n\nList-II:\n1. Recommended a 2-tier system (Mandal Panchayat and Zilla Parishad) with official participation of political parties\n2. Recommended 3-tier Panchayati Raj with Zilla Parishad primarily as an advisory and supervisory body\n3. First recommended according constitutional recognition, protection, and preservation to Panchayati Raj Institutions\n4. Highlighted 'grass without roots' phenomenon and recommended creating the office of District Development Commissioner (DDC)\n\nSelect the correct code:",
    "options": [
      "a-2, b-1, c-4, d-3",
      "a-1, b-2, c-3, d-4",
      "a-2, b-4, c-1, d-3",
      "a-3, b-1, c-4, d-2"
    ],
    "correct": 0,
    "explanation": "Balwant Rai Mehta Committee (1957) recommended a 3-tier structure with ZP as advisory (a-2). Ashok Mehta Committee (1977) recommended a 2-tier system with Mandal Panchayat and Zilla Parishad as executive (b-1). G.V.K. Rao Committee (1985) criticized bureaucratization as 'grass without roots' and suggested DDC (c-4). L.M. Singhvi Committee (1986) recommended constitutional status and protection for PRIs (d-3).",
    "source": "TGPSC / TGPRB Matching Matrix Drill",
    "format": "Matching",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-SLG-004",
    "question": "Consider the following statements regarding the 73rd and 74th Constitutional Amendment Acts, 1992:\n\n1. The 11th Schedule contains 29 functional items for Panchayats, while the 12th Schedule contains 18 functional items for Municipalities.\n2. Both amendments mandate not less than one-third (33%) reservation of seats and chairperson posts for women.\n3. The minimum age required to contest elections to Panchayats and Municipalities is 21 years.\n4. The State Election Commissioner is appointed by the Governor and can be removed by the Governor at pleasure.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2 and 3 only",
      "2 and 4 only",
      "1, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 2, and 3 are correct. Statement 4 is incorrect because under Article 243K(2), although the State Election Commissioner is appointed by the Governor, the SEC CANNOT be removed by the Governor at pleasure. The SEC can only be removed from office in like manner and on like grounds as a Judge of a High Court (by order of the President following parliamentary address).",
    "source": "TGPRB SI Prelims / Mains Advanced Evaluation",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-SLG-005",
    "question": "Assertion (A): When a state bill is reserved by the Governor for the consideration of the President under Article 201, and the State Legislature passes the bill again after presidential return, the President is bound to give assent.\nReason (R): Under Article 111, when Parliament repasses a bill returned by the President, the President must give assent.",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(A) is false, but (R) is true",
      "(A) is true, but (R) is false"
    ],
    "correct": 2,
    "explanation": "Assertion (A) is false: Under Article 201, even if the State Legislature reconsiders and passes the reserved bill again (with or without amendments) within 6 months, the President is NOT bound to give assent; the President still has absolute discretion to withhold assent. Reason (R) is true: Under Article 111, if Parliament passes a returned bill again, the President must give assent.",
    "source": "TGPSC Assertion-Reason Drill (Arts. 200 & 201)",
    "format": "Assertion-Reason",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-SLG-006",
    "question": "Examine the following statements regarding the Telangana State Panchayati Raj Act, 2018:\n\n1. The minimum qualifying age to contest for the post of Sarpanch or Ward Member is 21 years.\n2. A Gram Panchayat with a population between 1,500 and 3,000 is divided into 11 wards.\n3. The Sarpanch and Panchayat Secretary must maintain a daily diary called 'Roznamcha' recording daily village activities and works.\n4. A Sarpanch can be removed by the District Collector if the Gram Sabha is not convened at least once every two months.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2, 3 and 4",
      "1, 2 and 3 only",
      "1 and 3 only",
      "2 and 4 only"
    ],
    "correct": 0,
    "explanation": "All four statements are correct under the Telangana State Panchayati Raj Act, 2018. The minimum age to contest is 21 years (statement 1); a Gram Panchayat with 1,500-3,000 population has 11 wards (statement 2); Roznamcha is the mandatory official daily work diary (statement 3); and failure to convene Gram Sabha at least once in 2 months (6 times a year) invites disqualification and removal of the Sarpanch (statement 4).",
    "source": "TGPRB Specific State Law Drill (TS PR Act 2018)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  }
])

function attemptAdv(adv: AdvPractice, optIndex: number) {
  if (adv.revealed) return
  adv.selected = optIndex
  adv.revealed = true
}

function revealAdv(adv: AdvPractice) {
  adv.revealed = !adv.revealed
}
</script>
