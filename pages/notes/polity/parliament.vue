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
          <span class="t-mid">Part V: Union Executive &amp; Parliament</span>
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
              to="/study/parliament"
              class="inline-flex items-center gap-2 rounded-lg border border-saffron-500/40 bg-saffron-500/10 px-3 py-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-300 transition-colors hover:bg-saffron-500/20"
            >
              <UIcon name="i-heroicons-book-open" class="h-4 w-4" />
              <span>Study Mode (3-Zone)</span>
              <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Part V: Union Executive &amp; Parliament
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            Comprehensive forensic study notes covering Articles 52-151: Union Executive (President, Vice-President, PM, Council of Ministers, Attorney General), Parliament (Rajya Sabha vs Lok Sabha), Presiding Officers, Money Bills &amp; Budgetary Procedure, Parliamentary Devices &amp; Financial Committees, 4-tier legal architecture, high-yield cloze recall anchors, and dedicated Union vs State comparisons.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />12 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />{{ pyqs.length }} verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~26 min read
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
            to="/study/parliament"
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
            Mastering Part V constitutional architecture guarantees 100% precision on all Union Executive, Lok Sabha, Rajya Sabha, Money Bill, and Presiding Officer questions in TGPRB SI &amp; Constable papers.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Predicted 2026 Question Patterns
              </p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Direct factual and multi-statement questions on <strong class="t-hi">Constitutional Definition of Parliament</strong> (Art. 79: President + RS + LS), <strong class="t-hi">Rajya Sabha seat allocations</strong> (AP 11, Gujarat 11, Telangana 7, UP 31; 12 nominated by President), <strong class="t-hi">Lok Sabha constitutional strength</strong> (550 post-104th CAA, 543 actual; Malkajgiri largest by electors, Lakshadweep smallest), <strong class="t-hi">Speaker casting vote</strong> (Art. 100(1)), <strong class="t-hi">Joint sitting precedence</strong> (Art. 118(4) - RS Chairman never presides), <strong class="t-hi">Money Bills</strong> (Arts. 109-110: LS only, 14 days in RS, no joint sitting, cannot be returned by President), <strong class="t-hi">Parliamentary Devices</strong> (Zero Hour 1962 Indian innovation vs Question Hour first hour), <strong class="t-hi">Committees</strong> (Estimates 30 LS only vs PAC 22 = 15 LS + 7 RS), and <strong class="t-hi">President vs Governor</strong> (Pardoning Art. 72 vs 161; Ordinance Art. 123 vs 213; Discretionary powers).
              </p>
            </div>
          </div>
        </section>

        <!-- 01 : Visual Roadmap & 4-Tier Legal Architecture -->
        <section id="visual-architecture" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Visual Roadmap &amp; 4-Tier Legal Architecture</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="visual-architecture"
              section-label="Visual Roadmap &amp; 4-Tier Legal Architecture"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 52-151 Blueprint</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="visual-architecture"
            section-label="Visual Roadmap &amp; 4-Tier Legal Architecture"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: How India's Central Government is Built
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Think of Part V of the Constitution (Articles 52 to 151) as the <strong class="t-hi">Master Blueprint of India's Central Government</strong>. Just like a large organization needs managers to run day-to-day operations, a governing board to debate rules and pass budgets, emergency authority when the board is away, a chief legal judge, and an independent financial auditor, Part V divides the Union into five clear chapters:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">1. Executive (Arts. 52-78):</span>
                <p class="t-lo mt-0.5">The management team. President, Vice-President, PM, Council of Ministers, and the Attorney General.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">2. Parliament (Arts. 79-122):</span>
                <p class="t-lo mt-0.5">The law-making assembly. Lok Sabha (people's voice), Rajya Sabha (states' voice), and President.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">3. Ordinances (Art. 123):</span>
                <p class="t-lo mt-0.5">Emergency laws. When Parliament is in recess, the President can issue temporary laws lasting up to 6 months + 6 weeks.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-purple-600 dark:text-purple-400">4. Supreme Court (Arts. 124-147):</span>
                <p class="t-lo mt-0.5">The constitutional referee. Settles disputes, protects Fundamental Rights, and reviews laws.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-rose-600 dark:text-rose-400">5. The CAG (Arts. 148-151):</span>
                <p class="t-lo mt-0.5">The public auditor. Inspects every government rupee to prevent waste and fraud.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-elev border b-line">
                <span class="font-bold text-saffron-600 dark:text-saffron-400">Privileges (Arts. 105 &amp; 122):</span>
                <p class="t-lo mt-0.5">Lawmakers can debate fearlessly without police lawsuits; courts cannot interfere in daily House debates.</p>
              </div>
            </div>
          </div>

          <!-- Part V Chapters Grid with Teacher Explanations -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Chapter I · Articles 52-78</span>
              <p class="text-sm font-bold t-hi mt-1.5">The Union Executive</p>
              <p class="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">Who makes executive decisions and signs official orders?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Covers the President (Arts. 52-62), Vice-President (Arts. 63-71), Prime Minister and Council of Ministers (Arts. 74-75), the Attorney General as the Union's top lawyer (Art. 76), and how central government business is officially conducted (Arts. 77-78).
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Chapter II · Articles 79-122</span>
              <p class="text-sm font-bold t-hi mt-1.5">The Parliament</p>
              <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Where are national laws debated, voted, and passed?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Covers the 3 components of Parliament under Art. 79 (President + Rajya Sabha + Lok Sabha), qualifications/disqualifications of MPs (Arts. 84, 102), presiding officers (Arts. 89-98), and step-by-step voting on bills and the annual budget (Arts. 107-117).
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Chapter III · Article 123</span>
              <p class="text-sm font-bold t-hi mt-1.5">Legislative Powers of President</p>
              <p class="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">What if Parliament is on break and a crisis hits?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Allows the President to issue an <strong class="t-hi">Ordinance</strong> when either House is not in session. It holds the exact same legal power as an Act of Parliament, but expires within 6 weeks of Parliament reassembling (maximum life: 6 months + 6 weeks).
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Chapter IV · Articles 124-147</span>
              <p class="text-sm font-bold t-hi mt-1.5">The Union Judiciary (Supreme Court)</p>
              <p class="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">Who protects the Constitution and settles legal disputes?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Sets up the Supreme Court of India, original jurisdiction over Centre-State conflicts (Art. 131), appellate powers (Arts. 132-136), advisory opinions requested by President (Art. 143), and the rule that SC rulings are binding on all courts across India (Art. 141).
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Chapter V · Articles 148-151</span>
              <p class="text-sm font-bold t-hi mt-1.5">Comptroller &amp; Auditor General (CAG)</p>
              <p class="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">Who keeps the government honest with taxpayer money?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Appointed as the independent "Guardian of the Public Purse" (Art. 148). The CAG audits all spending from the Consolidated Fund and submits reports to the President, who lays them before Parliament for scrutiny by the Public Accounts Committee (Art. 151).
              </p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400">Constitutional Shield</span>
              <p class="text-sm font-bold t-hi mt-1.5">Articles 105 &amp; 122</p>
              <p class="text-xs font-semibold text-saffron-600 dark:text-saffron-400 mt-0.5">Why can't police arrest MPs for parliamentary speeches?</p>
              <p class="text-xs t-lo mt-1 leading-relaxed">
                Protects parliamentary freedom of speech. Lawmakers cannot be taken to court for anything said or voted inside the House (Art. 105). Also, courts cannot question internal proceedings due to minor procedural errors (Art. 122).
              </p>
            </div>
          </div>

          <!-- 4-Tier Legal Architecture Hierarchy Panel -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-saffron-500" />
              The 4-Tier Legal Architecture: How Union Rules Actually Work
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              A major reason beginners get confused in Polity is mixing up <strong class="t-hi">what is written in the Constitution</strong> versus <strong class="t-hi">what is written in a normal law or tradition</strong>. Here is how authority flows from top to bottom:
            </p>
            <div class="space-y-3.5 text-xs">
              <!-- Tier 1 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px]">Tier 1 : The Constitution (Supreme Law - Cannot be Overridden)</span>
                  <span class="chip chip-mono text-[10px]">Supreme Law</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Articles 52 to 151. This is the supreme rulebook created by the Constituent Assembly. Any ordinary law, government order, or police action that contradicts Tier 1 is instantly struck down as unconstitutional. Examples: The Prime Minister must be collectively responsible to Lok Sabha (Art. 75(3)); the President must act on Cabinet advice (Art. 74(1)); a Money Bill can only start in Lok Sabha (Arts. 109-110).
                </p>
              </div>

              <!-- Tier 2 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">Tier 2 : Statutory Acts (Laws Passed by Parliament to Handle Details)</span>
                  <span class="chip chip-mono text-[10px]">Parliamentary Statutes</span>
                </div>
                <p class="t-mid leading-relaxed">
                  The Constitution gives the big principles, but does not specify every operational detail (like how to print ballot papers or draw district lines). So Parliament passes regular laws (statutes):
                </p>
                <ul class="list-disc pl-4 mt-1.5 space-y-1 t-lo">
                  <li><strong class="t-hi">Representation of the People Act, 1950 &amp; 1951:</strong> Sets voting qualifications, physical conduct of elections, corrupt election practices, and grounds to disqualify corrupt MPs.</li>
                  <li><strong class="t-hi">Delimitation Act, 2002:</strong> Establishes independent commissions to draw boundary lines of Lok Sabha constituencies based on census data.</li>
                  <li><strong class="t-hi">Salary of Leaders of Opposition Act, 1977:</strong> Officially recognizes the Leader of Opposition (LoP) as a statutory post with cabinet minister rank (requiring at least 10% seats of the House).</li>
                </ul>
              </div>

              <!-- Tier 3 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px]">Tier 3 : House Rules &amp; Healthy Traditions (Conventions)</span>
                  <span class="chip chip-mono text-[10px]">House Rules &amp; Traditions</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Internal rulebooks framed by each House under Article 118, plus unwritten "gentlemen's agreements" (called conventions) that have been followed for decades:
                </p>
                <ul class="list-disc pl-4 mt-1.5 space-y-1 t-lo">
                  <li><strong class="t-hi">Speaker's Neutrality:</strong> The Speaker never votes during the normal round; only casts a tie-breaker vote (Casting Vote, Art. 100(1)).</li>
                  <li><strong class="t-hi">PAC Chair to Opposition:</strong> Since 1967, by unwritten convention, the Public Accounts Committee chairman is always an Opposition MP so the government cannot hide financial fraud.</li>
                  <li><strong class="t-hi">Zero Hour (1962):</strong> An informal Indian parliamentary innovation where MPs raise urgent public scandals at 12 noon without giving 10 days advance notice. It is <strong class="t-hi">NOT mentioned in the official rulebook</strong>!</li>
                </ul>
              </div>

              <!-- Tier 4 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[11px]">Tier 4 : Landmark Supreme Court Rulings (The Referee's Whistle)</span>
                  <span class="chip chip-mono text-[10px]">Supreme Court Rulings</span>
                </div>
                <p class="t-mid leading-relaxed mb-2">
                  When political parties or leaders fight over the meaning of a constitutional article, the Supreme Court provides the final, binding legal interpretation:
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-amber-600 dark:text-amber-400">Shamsher Singh v. State of Punjab (1974)</p>
                    <p class="text-xs t-lo mt-0.5">A 7-judge bench ruled that the President is not an independent ruler. The President is a constitutional figurehead legally bound to follow the advice of the Prime Minister and Cabinet.</p>
                  </div>
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-emerald-600 dark:text-emerald-400">S.R. Bommai v. Union of India (1994)</p>
                    <p class="text-xs t-lo mt-0.5">A 9-judge bench stopped the central government from arbitrarily toppling state governments under Article 356 (President's Rule). Ruled that a Chief Minister's majority can only be tested on the floor of the Legislative Assembly.</p>
                  </div>
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-sky-600 dark:text-sky-400">Kihoto Hollohan v. Zachillhu (1992)</p>
                    <p class="text-xs t-lo mt-0.5">Upheld the 10th Schedule (Anti-Defection Law), but ruled that when a Speaker decides to disqualify an MP/MLA, the Speaker is acting like a courtroom judge, so courts can review the decision for unfairness.</p>
                  </div>
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-rose-600 dark:text-rose-400">Raja Ram Pal v. Hon'ble Speaker (2007)</p>
                    <p class="text-xs t-lo mt-0.5">Upheld Parliament's constitutional power to expel corrupt lawmakers (like MPs caught taking cash to ask questions in Parliament) to protect the dignity of the institution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 02 : Union Executive: President, VP, PM & Attorney General -->
        <section id="union-executive" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">Union Executive: President, VP, PM &amp; Attorney General</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="union-executive"
              section-label="Union Executive: President, VP, PM &amp; Attorney General"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 52-78 Governance Matrix</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="union-executive"
            section-label="Union Executive: President, VP, PM &amp; Attorney General"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Who Really Runs India?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              India has a parliamentary system of government. Think of national leadership like a large organisation with two distinct roles:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">1. The President (Head of the State):</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The official, ceremonial head. Every central government order, treaty, and law is signed in the President's name. But in practice, the President does not make daily decisions; the President is legally bound to act on the advice of the Prime Minister and Cabinet.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">2. The Prime Minister (Head of the Government):</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The real executive decision-maker. The Prime Minister leads the Council of Ministers, sets government policy, introduces bills, directs ministries, and commands the political majority in the Lok Sabha.
                </p>
              </div>
            </div>
          </div>

          <!-- Executive Offices Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- President of India -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Head of State · Articles 52-62, 72</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">First Citizen</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">The President of India</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Who Elects the President? (Electoral College - Art. 54):</p>
                  <p class="mt-0.5">Common citizens do not vote directly. Only our <strong class="t-hi">elected lawmakers</strong> cast ballots:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Elected MPs of Lok Sabha and Rajya Sabha</li>
                    <li>Elected MLAs of all State Legislative Assemblies</li>
                    <li>Elected MLAs of Delhi and Puducherry (added by 70th Amendment, 1992)</li>
                  </ul>
                  <div class="mt-1.5 p-2 rounded bg-rose-500/10 border border-rose-500/25 text-[11px] text-rose-700 dark:text-rose-300">
                    <strong>Who CANNOT vote (Classic Exam Traps):</strong>
                    <ul class="list-disc pl-3.5 mt-0.5">
                      <li>Nominated MPs (e.g. the 12 nominated by the President to Rajya Sabha) cannot vote.</li>
                      <li>Members of State Legislative Councils (MLCs) cannot vote, because only 6 states have Councils.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p class="font-bold t-hi">Election Method (Art. 55):</p>
                  <p class="mt-0.5">Proportional representation by single transferable vote (STV) using secret ballot. Instead of voting for just one candidate, lawmakers rank candidates by preference (1st choice, 2nd choice). Each MLA's vote value is calculated based on their state's population.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Oath &amp; Term (Arts. 56, 60):</p>
                  <p class="mt-0.5">Oath is administered by the <strong class="t-hi">Chief Justice of India</strong> (or the senior-most Supreme Court judge). Term is 5 years; eligible for re-election any number of times.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Pardoning Power (Article 72):</p>
                  <p class="mt-0.5">The President can show mercy to convicted persons under Union law. Learn the 5 exact terms:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li><strong class="t-hi">Pardon:</strong> Complete eraser. Completely wipes away both the conviction and sentence as if the crime never happened.</li>
                    <li><strong class="t-hi">Commutation (Swap):</strong> Changing a severe punishment to a lighter category (e.g. death sentence changed to life imprisonment).</li>
                    <li><strong class="t-hi">Remission (Reduce time):</strong> Shortening the jail sentence without changing the nature of punishment (e.g. 10 years rigorous imprisonment reduced to 5 years).</li>
                    <li><strong class="t-hi">Respite (Special condition):</strong> Awarding a lesser punishment due to a special circumstance (such as pregnancy of a female prisoner or mental/physical disability).</li>
                    <li><strong class="t-hi">Reprieve (Temporary delay):</strong> Putting an execution on hold temporarily to give time to file a mercy petition or appeal.</li>
                  </ul>
                  <p class="mt-1.5 text-[11px] text-amber-600 dark:text-amber-400">
                    <strong>President vs Governor Trap:</strong> The President can pardon <strong>Death Sentences</strong> and <strong>Military Court-Martial</strong> sentences. A Governor (Art. 161) cannot pardon death sentences and has zero authority over military courts.
                  </p>
                </div>

                <div>
                  <p class="font-bold t-hi text-rose-600 dark:text-rose-400">How to Remove a President (Impeachment - Art. 61):</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li><strong>Only Reason:</strong> "Violation of the Constitution" (the Constitution does not define what this means).</li>
                    <li><strong>Notice:</strong> Either Lok Sabha or Rajya Sabha can start it. At least <strong>1/4th (25%)</strong> of House members must sign a notice giving <strong>14 days advance warning</strong>.</li>
                    <li><strong>Vote Threshold:</strong> Must be passed by a majority of not less than <strong class="t-hi">two-thirds of the TOTAL membership</strong> in both Houses.</li>
                    <li><strong>The Reversal Trap:</strong> In the election, nominated MPs cannot vote, but state MLAs vote. In impeachment, it reverses: <strong class="t-hi">Nominated MPs can vote</strong>, while <strong class="t-hi">State MLAs cannot vote</strong>!</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Vice-President of India -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Second Citizen · Articles 63-71</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Ex-Officio Chairman</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">The Vice-President of India</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-emerald-600 dark:text-emerald-400">The Two Jobs of the Vice-President:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li>
                      <strong class="t-hi">Everyday Job (Article 64):</strong> Ex-officio Chairman of the Rajya Sabha. ("Ex-officio" means: by the simple fact of being Vice-President, you automatically become Chairman).
                      <br><span class="text-[11px] t-lo">Important exam fact: The Vice-President does not receive a salary as Vice-President; he receives the salary of the Chairman of the Rajya Sabha!</span>
                    </li>
                    <li>
                      <strong class="t-hi">Backup Job (Article 65):</strong> Acting President during vacancies (death, resignation, or removal) for a maximum of <strong class="t-hi">6 months</strong>. During this time, he does not perform duties of Chairman of Rajya Sabha.
                    </li>
                  </ul>
                </div>

                <div>
                  <p class="font-bold t-hi">Who Elects the Vice-President? (Art. 66):</p>
                  <p class="mt-0.5">Only members of Parliament vote (Lok Sabha + Rajya Sabha):</p>
                  <ul class="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Includes <strong class="t-hi">both elected AND nominated MPs</strong>.</li>
                    <li>State MLAs have <strong class="t-hi">zero role</strong> in electing the Vice-President!</li>
                  </ul>
                </div>

                <div>
                  <p class="font-bold t-hi">Qualifications (Art. 66(3)):</p>
                  <p class="mt-0.5">Citizen of India, at least 35 years of age, and qualified for election as a member of the Rajya Sabha (must not hold an office of profit).</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-emerald-600 dark:text-emerald-400">Removal Procedure (Article 67(b)):</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li>The removal resolution can originate <strong class="t-hi">ONLY in the Rajya Sabha</strong> with 14 days advance notice.</li>
                    <li>Must be passed by an <strong class="t-hi">effective majority</strong> (majority of all the current sitting members) of the Rajya Sabha.</li>
                    <li>Agreed to by the Lok Sabha by a <strong class="t-hi">simple majority</strong> (majority of members present and voting).</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Prime Minister & Council of Ministers -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Real Executive · Articles 74, 75, 78</span>
                <span class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">The Real Leader</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Prime Minister &amp; Council of Ministers</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-sky-600 dark:text-sky-400">Aid and Advice (Article 74):</p>
                  <p class="mt-0.5">The President must have a Council of Ministers with the Prime Minister at the head to aid and advise him. The President <strong class="t-hi">must act on this advice</strong>. Under the 44th Amendment (1978), the President may return advice once for reconsideration, but if the Cabinet sends it back, the President is obligated to sign it.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-rose-600 dark:text-rose-400">Collective Responsibility (Art. 75(3) - Top Exam PYQ):</p>
                  <p class="mt-0.5">The Council of Ministers is collectively responsible to the <strong class="t-hi">Lok Sabha alone</strong> (not to the Rajya Sabha, and not to Parliament as a whole).</p>
                  <p class="mt-1 text-[11px] t-lo">
                    <strong>What this means in plain words:</strong> "Ministers swim together or sink together." If the Lok Sabha passes a No-Confidence Motion, the entire ministry (including ministers who sit in the Rajya Sabha) must immediately resign.
                  </p>
                </div>

                <div>
                  <p class="font-bold t-hi">Individual Responsibility (Art. 75(2)):</p>
                  <p class="mt-0.5">Ministers hold office during the <strong class="t-hi">pleasure of the President</strong>. In practice, this means the Prime Minister can ask any minister to resign or advise the President to dismiss them at any time.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Size Ceiling on Ministry (91st Amendment, 2003):</p>
                  <p class="mt-0.5">To prevent oversized cabinets used for political bargaining, the total number of ministers (including the Prime Minister) cannot exceed <strong class="t-hi">15% of the total strength of the Lok Sabha</strong> (roughly 81 to 82 ministers max).</p>
                </div>

                <div>
                  <p class="font-bold t-hi">The 6-Month Rule (Article 75(5)):</p>
                  <p class="mt-0.5">A person who is not an MP can be appointed as a Minister or even Prime Minister. However, they must get elected to either the Lok Sabha or the Rajya Sabha within <strong class="t-hi">6 consecutive months</strong>, otherwise they immediately cease to be a Minister.</p>
                </div>
              </div>
            </div>

            <!-- Attorney General for India -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Top Legal Officer · Articles 76, 88</span>
                <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Government's Lawyer</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Attorney General for India</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-purple-600 dark:text-purple-400">Who is the Attorney General?</p>
                  <p class="mt-0.5">The Attorney General is the <strong class="t-hi">Chief Legal Advisor (Top Lawyer)</strong> of the Government of India. Whenever the central government is sued or needs representation in the Supreme Court or High Courts, the Attorney General appears on its behalf.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Qualifications &amp; Tenure (Article 76):</p>
                  <ul class="list-disc pl-4 mt-0.5 space-y-0.5">
                    <li>Must be qualified to be appointed a Judge of the Supreme Court (Indian citizen + 5 years High Court judge OR 10 years High Court advocate).</li>
                    <li>Has <strong class="t-hi">no fixed constitutional tenure</strong>. Serves during the <strong class="t-hi">pleasure of the President</strong> (meaning the government can replace him at will; conventionally resigns when the government changes).</li>
                  </ul>
                </div>

                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Special Parliamentary Right (Article 88 - Most Asked Fact):</p>
                  <p class="mt-0.5">The Attorney General has the constitutional right to speak in, take part in debates of either House of Parliament, attend joint sittings, and sit on any parliamentary committee he is named to.</p>
                  <p class="mt-1 p-2 rounded bg-amber-500/10 border border-amber-500/25 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                    CRITICAL RULE: The Attorney General DOES NOT have the right to vote! Because he is not an elected representative of the people, he cannot cast a ballot on any bill.
                  </p>
                </div>

                <div>
                  <p class="font-bold t-hi">Private Practice Permitted:</p>
                  <p class="mt-0.5">The Attorney General is not a full-time government servant and is not debarred from private legal practice. However, he cannot advise or take a case against the Government of India, and cannot defend an accused person in a criminal case without government permission.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- President vs VP Electoral College High-Yield Contrast Table -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-arrows-right-left" class="h-4 w-4 text-amber-500" />
              Presidential vs Vice-Presidential Electoral Architecture (High-Frequency Exam Trap)
            </h3>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Dimension</th>
                    <th class="py-2.5 px-4 text-amber-600 dark:text-amber-400">President of India (Art. 54)</th>
                    <th class="py-2.5 pl-4 text-emerald-600 dark:text-emerald-400">Vice-President of India (Art. 66)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Elected MPs of Lok Sabha &amp; Rajya Sabha</td>
                    <td class="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Part of Electoral College)</td>
                    <td class="py-2.5 pl-4 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Part of Electoral College)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Nominated MPs of Lok Sabha &amp; Rajya Sabha</td>
                    <td class="py-2.5 px-4 text-rose-600 dark:text-rose-400 font-semibold">NO (Excluded from Election)</td>
                    <td class="py-2.5 pl-4 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Participate in Election)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Elected MLAs of States</td>
                    <td class="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Value weighted by population)</td>
                    <td class="py-2.5 pl-4 text-rose-600 dark:text-rose-400 font-semibold">NO (Zero role in election)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Elected MLAs of Delhi &amp; Puducherry</td>
                    <td class="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Added by 70th CAA 1992)</td>
                    <td class="py-2.5 pl-4 text-rose-600 dark:text-rose-400 font-semibold">NO (Zero role in election)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Members of Legislative Councils (MLCs)</td>
                    <td class="py-2.5 px-4 text-rose-600 dark:text-rose-400 font-semibold">NO (Completely Excluded)</td>
                    <td class="py-2.5 pl-4 text-rose-600 dark:text-rose-400 font-semibold">NO (Completely Excluded)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Impeachment / Removal Forum &amp; Electorate</td>
                    <td class="py-2.5 px-4 t-mid">Both Houses of Parliament exclusively (Nominated MPs vote; MLAs DO NOT vote). 2/3rd total membership.</td>
                    <td class="py-2.5 pl-4 t-mid">Initiated ONLY in Rajya Sabha; passed by effective majority in RS and agreed to by simple majority in LS.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 03 : Parliament Composition & Architecture -->
        <section id="parliament-composition" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">Parliament Composition &amp; Architecture (Arts. 79-88)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="parliament-composition"
              section-label="Parliament Composition &amp; Architecture"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 79-88 Bicameralism</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="parliament-composition"
            section-label="Parliament Composition &amp; Architecture"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-emerald-500" />
              The Big Picture: What is Parliament &amp; Why Do We Have Two Houses?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Most beginners think Parliament means just "the building where MPs meet". In constitutional law, Parliament is defined by Article 79 as a trinity:
            </p>
            <div class="p-3 rounded-lg bg-elev border b-line text-xs font-semibold text-center mb-3 text-emerald-600 dark:text-emerald-400">
              Parliament of India = The President + Rajya Sabha (Council of States) + Lok Sabha (House of the People)
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Why is the President part of Parliament?</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Even though the President never sits or debates in either House, a bill passed by both Houses cannot become a law without the President's signature (assent).
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-sky-600 dark:text-sky-400">Why do we have Two Houses (Bicameralism)?</span>
                <p class="t-lo mt-1 leading-relaxed">
                  <strong class="t-hi">Lok Sabha</strong> represents the citizens directly. <strong class="t-hi">Rajya Sabha</strong> represents the States, ensuring that the Central Government does not rush through laws that damage state rights or regional interests.
                </p>
              </div>
            </div>
          </div>

          <!-- Houses Side-by-Side Architectural Panels -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Rajya Sabha -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Upper House · Article 80</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Max 250 Members</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Rajya Sabha (Council of States)</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Who Sits Here? (Article 80):</p>
                  <p class="mt-0.5">Maximum ceiling is <strong class="t-hi">250 members</strong>:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-0.5">
                    <li><strong class="t-hi">238 representatives</strong> elected from States and Union Territories.</li>
                    <li><strong class="t-hi">12 nominated members</strong> chosen directly by the President.</li>
                  </ul>
                  <div class="mt-1.5 p-2 rounded bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-700 dark:text-amber-300">
                    <strong>The 4 Nomination Fields (Art. 80(3)):</strong> Literature, Science, Art, and Social Service (Memory trick: <strong>LSAS</strong>). Note: "Sports" is not in the text; athletes like Sachin Tendulkar were nominated under the broad umbrella of Art/contribution.
                  </div>
                </div>

                <div>
                  <p class="font-bold t-hi">How are they elected?</p>
                  <p class="mt-0.5">Indirect election. Ordinary citizens do not vote for Rajya Sabha MPs. Instead, our elected State MLAs vote using proportional representation with the single transferable vote (STV).</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Why is it called a "Permanent House"? (Art. 83(1)):</p>
                  <p class="mt-0.5">Rajya Sabha is <strong class="t-hi">NEVER dissolved</strong>. While a Lok Sabha dissolves every 5 years, Rajya Sabha continues forever. Members serve a 6-year term, and <strong class="t-hi">one-third (1/3rd) of the members retire every 2 years</strong>.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Minimum Age (Art. 84):</p>
                  <p class="mt-0.5">Must be at least <strong class="t-hi">30 years old</strong> (5 years older than the Lok Sabha requirement of 25).</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-emerald-600 dark:text-emerald-400">3 Exclusive Federal Powers of Rajya Sabha:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li><strong class="t-hi">Article 249:</strong> If Rajya Sabha passes a resolution by 2/3rd majority, Parliament gains the power to make laws on a State List subject for 1 year in the national interest.</li>
                    <li><strong class="t-hi">Article 312:</strong> Rajya Sabha can pass a resolution to create brand new All-India Services (common to Centre and States, like IAS or IPS).</li>
                    <li><strong class="t-hi">Article 67(b):</strong> The proposal to remove the Vice-President of India can originate <strong class="t-hi">ONLY in the Rajya Sabha</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Lok Sabha -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Lower House · Article 81</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Ceiling 550 / Actual 543</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Lok Sabha (House of the People)</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-emerald-600 dark:text-emerald-400">Constitutional Strength &amp; 104th Amendment Change:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li><strong class="t-hi">Original Maximum:</strong> 552 members (530 States + 20 UTs + 2 Anglo-Indians nominated by President under Art. 331).</li>
                    <li><strong class="t-hi">The 104th Amendment (2019):</strong> Discontinued the 2 nominated Anglo-Indian seats starting January 2020.</li>
                    <li><strong class="t-hi">New Maximum Ceiling:</strong> <strong class="t-hi">550 members</strong> (530 States + 20 UTs).</li>
                    <li><strong class="t-hi">Actual Current Strength:</strong> <strong class="t-hi">543 elected MPs</strong> (524 from States + 19 from Union Territories).</li>
                  </ul>
                </div>

                <div>
                  <p class="font-bold t-hi">How are they elected?</p>
                  <p class="mt-0.5">Direct election by the people. Every Indian citizen aged 18 or above gets one vote (Universal Adult Suffrage). The voting age was reduced from 21 to 18 by the <strong class="t-hi">61st Constitutional Amendment Act, 1988</strong>.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Tenure &amp; Dissolution (Art. 83(2)):</p>
                  <p class="mt-0.5">Normal term is <strong class="t-hi">5 years</strong> from the date of its first meeting. It can be dissolved earlier by the President on the advice of the Prime Minister. During a National Emergency, its life can be extended by law for <strong class="t-hi">1 year at a time</strong>.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Minimum Age (Art. 84):</p>
                  <p class="mt-0.5">Must be at least <strong class="t-hi">25 years old</strong>.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-rose-600 dark:text-rose-400">Exclusive Financial &amp; Executive Powers:</p>
                  <ul class="list-disc pl-4 mt-1 space-y-1">
                    <li><strong class="t-hi">Money Bills (Art. 109):</strong> Can be introduced ONLY in Lok Sabha. Rajya Sabha cannot reject or amend them.</li>
                    <li><strong class="t-hi">Government Survival (Art. 75(3)):</strong> The Council of Ministers is responsible ONLY to the Lok Sabha. Rajya Sabha cannot pass a No-Confidence Motion.</li>
                    <li><strong class="t-hi">Budget Demands (Art. 113):</strong> Only Lok Sabha votes on the Demands for Grants (approving government ministry expenditure).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- State Representation Quotas & Constituency Extremes Panel -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-map-pin" class="h-4 w-4 text-saffron-500" />
              State Seat Allocations &amp; Constituency Extremes (TGPRB Tested Facts)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Seats are allotted to states roughly in proportion to their population. To prevent fast-growing states from unfairly gaining more power, seat counts have been frozen based on the 1971 Census until after 2026 (via the 84th CAA 2001). Memorize these exam pairs:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-4">
              <div class="p-3 rounded bg-sub border b-line">
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Telangana</span>
                <p class="text-sm font-bold t-hi mt-1">17 Lok Sabha · 7 Rajya Sabha</p>
                <p class="t-lo mt-0.5">Fixed under Andhra Pradesh Reorganisation Act, 2014.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Equal RS Seats Trap</span>
                <p class="text-sm font-bold t-hi mt-1">AP 11 = Gujarat 11</p>
                <p class="t-lo mt-0.5">Andhra Pradesh and Gujarat have equal Rajya Sabha seats (PYQ-0309).</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">Unequal LS Seats Trap</span>
                <p class="text-sm font-bold t-hi mt-1">Rajasthan 25 ≠ Odisha 21</p>
                <p class="t-lo mt-0.5">Rajasthan has 25 Lok Sabha seats while Odisha has 21 (PYQ-0309).</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Top State Allocations</span>
                <p class="text-sm font-bold t-hi mt-1">UP: 80 LS · 31 RS</p>
                <p class="t-lo mt-0.5">Highest representation in both Houses based on its large population.</p>
              </div>
            </div>

            <!-- Extremes Callouts -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold text-amber-600 dark:text-amber-400">Largest Constituency by Voters (PYQ-0326)</p>
                  <p class="t-mid mt-0.5"><strong class="t-hi">Malkajgiri (Telangana)</strong> is the largest Lok Sabha constituency in India by number of voters (~31.5+ lakh electors).</p>
                </div>
              </div>
              <div class="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
                <UIcon name="i-heroicons-user-minus" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">Smallest Constituency by Voters (PYQ-0191)</p>
                  <p class="t-mid mt-0.5"><strong class="t-hi">Lakshadweep</strong> is the smallest Lok Sabha constituency by electors (~57,000 electors).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 04 : Presiding Officers & Parliamentary Functionaries -->
        <section id="presiding-officers" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">Presiding Officers &amp; Functionaries (Arts. 89-100)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="presiding-officers"
              section-label="Presiding Officers &amp; Functionaries"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 89-100 Officers</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="presiding-officers"
            section-label="Presiding Officers &amp; Functionaries"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-sky-500/25 bg-sky-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-sky-500" />
              The Big Picture: The Referees of Parliament
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Imagine an intense, noisy match between two rival teams. Without an impartial referee with a whistle, the game would descend into chaos. In Parliament, the <strong class="t-hi">Speaker</strong> (in Lok Sabha) and the <strong class="t-hi">Chairman</strong> (in Rajya Sabha) act as neutral umpires: they decide who gets to speak, interpret house rules, discipline disruptive members, and protect parliamentary democracy.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Speaker of Lok Sabha:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  An elected MP chosen by the House. Commands immense power over money bills, joint sittings, and member disqualifications.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">Chairman of Rajya Sabha:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The Vice-President of India serving ex-officio. Crucial exam distinction: The Chairman is <strong class="t-hi">not an elected member of the House</strong>!
                </p>
              </div>
            </div>
          </div>

          <!-- Presiding Officers Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Speaker of Lok Sabha -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Lok Sabha Head · Article 93</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Elected Member</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Speaker of the Lok Sabha</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">How is the Speaker Chosen &amp; Tenure?</p>
                  <p class="mt-0.5">Elected by Lok Sabha MPs from amongst themselves by a simple majority. The election date is set by the President. When the Lok Sabha is dissolved, the Speaker does not immediately vacate office; holds office until right before the first meeting of the newly elected Lok Sabha.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-rose-600 dark:text-rose-400">Resignation Letters (The Mutual Swap Trap - Art. 94(b)):</p>
                  <p class="mt-0.5">The Speaker submits resignation to the <strong class="t-hi">Deputy Speaker</strong>. The Deputy Speaker submits resignation to the <strong class="t-hi">Speaker</strong>. (They NEVER submit resignation to the President!).</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Casting Vote Only on a Tie (Art. 100(1) - PYQ-0519):</p>
                  <p class="mt-0.5">To preserve strict referee neutrality, the Speaker <strong class="t-hi">never votes during the normal first round</strong>. The Speaker votes ONLY when there is an equal 50-50 tie between votes. This tie-breaker is called the <strong class="t-hi">Casting Vote</strong>.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Absolute Authority over Money Bills (Art. 110(3)):</p>
                  <p class="mt-0.5">If any dispute arises about whether a bill is a Money Bill or not, the Speaker's decision is <strong class="t-hi">FINAL</strong>. The signed certificate of the Speaker cannot be challenged in any court or by the Rajya Sabha.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-sky-600 dark:text-sky-400">What Happens during Speaker's Removal Debate? (Art. 96):</p>
                  <p class="mt-0.5">When a resolution to remove the Speaker is being debated, the Speaker cannot sit in the presiding chair. However, the Speaker can sit on the benches, speak, and <strong class="t-hi">vote in the first round</strong> (like an ordinary MP), but loses the right to cast a tie-breaking casting vote.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Anti-Defection Judge (10th Schedule):</p>
                  <p class="mt-0.5">The Speaker decides whether an MP should be disqualified for defecting from their political party. Under the Supreme Court's <em class="t-hi">Kihoto Hollohan (1992)</em> ruling, this decision acts like a tribunal and is subject to court review.</p>
                </div>
              </div>
            </div>

            <!-- Deputy Speaker & Chairman -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Articles 89, 93</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Chairs &amp; Conventions</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Deputy Speaker &amp; Rajya Sabha Chairman</h3>
              <div class="space-y-3 text-xs t-mid leading-relaxed">
                <div>
                  <p class="font-bold t-hi text-emerald-600 dark:text-emerald-400">Deputy Speaker of Lok Sabha (Art. 93):</p>
                  <p class="mt-0.5">Elected by Lok Sabha MPs from amongst themselves (election date is fixed by the Speaker; PYQ-0309). The Deputy Speaker is <strong class="t-hi">not subordinate to the Speaker</strong>; holds an independent constitutional office and presides when the Speaker is absent.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">The Opposition Convention (11th Lok Sabha, 1996 - PYQ-0754):</p>
                  <p class="mt-0.5">By healthy democratic tradition since 1996, the Speaker belongs to the ruling party/coalition, and the <strong class="t-hi">Deputy Speaker post is offered to the main Opposition party</strong>.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-sky-600 dark:text-sky-400">Chairman of Rajya Sabha (Art. 89):</p>
                  <p class="mt-0.5">The Vice-President is ex-officio Chairman. Because he is NOT an elected MP, when a resolution for his removal is under consideration (Art. 92), he cannot preside and <strong class="t-hi">cannot even vote in the first round</strong> (unlike the Speaker of LS who can vote in the first round!).</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Deputy Chairman of Rajya Sabha:</p>
                  <p class="mt-0.5">Elected by Rajya Sabha members from among themselves. Presides when the Chairman is absent or acting as President. Submits resignation directly to the Chairman.</p>
                </div>

                <div>
                  <p class="font-bold t-hi text-amber-600 dark:text-amber-400">Pro-tem Speaker (Art. 95(1)):</p>
                  <p class="mt-0.5">Appointed by the President (by convention, the senior-most elected MP) to administer the oath of office to all newly elected MPs until the House elects its permanent Speaker.</p>
                </div>

                <div>
                  <p class="font-bold t-hi">Leader of Opposition (LoP - PYQ-0314):</p>
                  <p class="mt-0.5">A statutory post created under the 1977 Act. Given to the leader of the largest opposition party having at least <strong class="t-hi">10% of total seats (55 seats in Lok Sabha)</strong>. Has the rank of a Cabinet Minister. The LoP is NOT appointed by the Speaker!</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Joint Sitting Precedence Order Panel -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-rose-500" />
              Joint Sitting Presiding Hierarchy (Article 118(4) &amp; High-Frequency Trap)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              When Lok Sabha and Rajya Sabha disagree on an Ordinary Bill and reach a complete deadlock, the President can summon a <strong class="t-hi">Joint Sitting</strong> under Article 108. The four-step chain of who presides is fixed by constitutional rules:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-saffron-500 font-bold">1st in Order</span>
                <p class="font-bold t-hi mt-1">Speaker of Lok Sabha</p>
                <p class="t-lo text-[11px] mt-0.5">Always presides if present.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-emerald-500 font-bold">2nd in Order</span>
                <p class="font-bold t-hi mt-1">Deputy Speaker of Lok Sabha</p>
                <p class="t-lo text-[11px] mt-0.5">Presides if Speaker is absent.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-sky-500 font-bold">3rd in Order</span>
                <p class="font-bold t-hi mt-1">Deputy Chairman of Rajya Sabha</p>
                <p class="t-lo text-[11px] mt-0.5">Presides if both LS officers absent.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-purple-500 font-bold">4th in Order</span>
                <p class="font-bold t-hi mt-1">Member Chosen by Sitting</p>
                <p class="t-lo text-[11px] mt-0.5">Chosen by majority of joint members.</p>
              </div>
            </div>
            <div class="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5">
              <UIcon name="i-heroicons-x-circle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div class="text-xs">
                <p class="font-bold text-rose-600 dark:text-rose-400">THE #1 EXAM TRAP (Tested in PYQ-2203):</p>
                <p class="t-mid mt-0.5">
                  The <strong class="t-hi">Chairman of the Rajya Sabha (Vice-President of India) NEVER presides</strong> over a joint sitting! Why? Because the Vice-President is not an elected member of either House of Parliament. Notice in the chain above that step 3 goes directly to the <strong class="t-hi">Deputy Chairman</strong> of the Rajya Sabha, completely skipping the Chairman!
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 05 : Legislative Procedure, Money Bills & Budget -->
        <section id="legislative-budgetary-procedure" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Legislative Procedure &amp; Money Bills (Arts. 107-117)</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="legislative-budgetary-procedure"
              section-label="Legislative Procedure &amp; Money Bills"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Articles 107-117 Procedure</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="legislative-budgetary-procedure"
            section-label="Legislative Procedure &amp; Money Bills"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: How Laws are Born &amp; Who Holds the Public Purse?
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              A <strong class="t-hi">Bill</strong> is simply a proposed draft of a law. Once it is approved by both Houses of Parliament and signed by the President, it becomes an <strong class="t-hi">Act</strong> (enforceable law). But when it comes to money and taxes, India follows a foundational democratic principle: <em class="t-hi">No taxation without representation</em>.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Why does Lok Sabha control the wallet?</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Lok Sabha MPs are directly elected by the taxpayers of India. Therefore, the Constitution gives the Lok Sabha virtually 100% control over taxes and government expenditure. The Rajya Sabha cannot block or delay money for more than 14 days.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">The Term "Budget" is NOT in the Constitution:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Article 112 never uses the word "Budget". It calls it the <strong class="t-hi">Annual Financial Statement</strong>, which is the estimated receipt and expenditure of the Government of India for that financial year.
                </p>
              </div>
            </div>
          </div>

          <!-- Types of Bills Comparison Table -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-document-text" class="h-4 w-4 text-emerald-500" />
              Comprehensive Legislative Typology: Ordinary vs Money vs Financial Bills
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Polity exams frequently test the exact procedural differences between bills. Pay special attention to the row on <strong class="t-hi">President's Return Power</strong> and <strong class="t-hi">Joint Sittings</strong>:
            </p>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Feature</th>
                    <th class="py-2.5 px-3">Ordinary Bill</th>
                    <th class="py-2.5 px-3 text-amber-600 dark:text-amber-400">Money Bill (Art. 110)</th>
                    <th class="py-2.5 px-3 text-sky-600 dark:text-sky-400">Financial Bill I (Art. 117(1))</th>
                    <th class="py-2.5 pl-3">Financial Bill II (Art. 117(3))</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Introduction House</td>
                    <td class="py-2.5 px-3 t-mid">Either House</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">Lok Sabha ONLY (Art. 109)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">Lok Sabha ONLY</td>
                    <td class="py-2.5 pl-3 t-mid">Either House</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">President Recommendation</td>
                    <td class="py-2.5 px-3 t-mid">Not required</td>
                    <td class="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">Mandatory for introduction</td>
                    <td class="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">Mandatory for introduction</td>
                    <td class="py-2.5 pl-3 t-mid">Required for consideration only</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Speaker Certification</td>
                    <td class="py-2.5 px-3 t-mid">Not applicable</td>
                    <td class="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">Mandatory (Art. 110(3))</td>
                    <td class="py-2.5 px-3 t-mid">Not applicable</td>
                    <td class="py-2.5 pl-3 t-mid">Not applicable</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Rajya Sabha Power</td>
                    <td class="py-2.5 px-3 t-mid">Equal power to amend or reject</td>
                    <td class="py-2.5 px-3 font-semibold text-rose-600 dark:text-rose-400">14 days only; recommendations only (cannot reject/amend)</td>
                    <td class="py-2.5 px-3 t-mid">Can amend or reject</td>
                    <td class="py-2.5 pl-3 t-mid">Can amend or reject</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Joint Sitting (Art. 108)</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (On deadlock)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">NO (Never applicable for Money Bills)</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (On deadlock)</td>
                    <td class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (On deadlock)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">President Return Power</td>
                    <td class="py-2.5 px-3 t-mid">Can return once (Art. 111)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">CANNOT return (PYQ-0301)</td>
                    <td class="py-2.5 px-3 t-mid">Can return once</td>
                    <td class="py-2.5 pl-3 t-mid">Can return once</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3 p-2.5 rounded bg-amber-500/10 border border-amber-500/25 text-xs text-amber-700 dark:text-amber-300">
              <strong>Why can't the President return a Money Bill? (Exam Logic):</strong> A Money Bill is introduced in the Lok Sabha only AFTER obtaining the President's prior permission. Since the President already approved its introduction, the President cannot turn around and return it!
            </div>
          </div>

          <!-- Budget & Constitutional Funds -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-banknotes" class="h-4 w-4 text-amber-500" />
              The Three Constitutional Accounts (Where India's Money Lives)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              All government revenues, loans, and emergency expenditures flow through three distinct constitutional bank accounts:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Article 266(1)</span>
                <p class="text-sm font-bold t-hi mt-1">Consolidated Fund of India</p>
                <p class="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">The Government's Main Current Account</p>
                <p class="t-lo mt-1 leading-relaxed">
                  All tax revenues, loans raised, and loan repayments flow in here. <strong class="t-hi">Iron Rule:</strong> Not a single rupee can be withdrawn without Parliament passing an <strong class="t-hi">Appropriation Act</strong> (Art. 114).
                </p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 267(1)</span>
                <p class="text-sm font-bold t-hi mt-1">Contingency Fund of India</p>
                <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">The Emergency Disaster Wallet</p>
                <p class="t-lo mt-1 leading-relaxed">
                  An imprest (advance cash) fund placed at the disposal of the <strong class="t-hi">President of India</strong> (administered by the Finance Secretary) to pay for urgent, unexpected disasters pending later approval by Parliament.
                </p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Article 266(2)</span>
                <p class="text-sm font-bold t-hi mt-1">Public Account of India</p>
                <p class="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">The Government's Custodial Locker</p>
                <p class="t-lo mt-1 leading-relaxed">
                  Holds moneys that do not belong to the government, but are kept in its trust: provident funds (PF), postal savings, and court deposits. Because this is the citizens' own money, withdrawals do not require a parliamentary vote.
                </p>
              </div>
            </div>

            <!-- Charged vs Votable Expenditure -->
            <div class="p-3 rounded-lg bg-base border b-line text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Expenditure Charged on CFI (Non-Votable):</span>
                  <p class="t-mid mt-1 leading-relaxed">
                    Salaries of the President, Speaker, Deputy Speaker, Chairman, SC Judges, and CAG. Parliament <strong class="t-hi">can discuss them, but CANNOT vote or reduce them</strong>. Why? To keep these constitutional protectors independent and immune from political arm-twisting!
                  </p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Expenditure Made from CFI (Votable):</span>
                  <p class="t-mid mt-1 leading-relaxed">
                    General government spending (highways, defense equipment, welfare schemes). Presented as <strong class="t-hi">Demands for Grants</strong> to the <strong class="t-hi">Lok Sabha exclusively</strong> (Rajya Sabha has zero voting power on Demands for Grants under Art. 113).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 06 : Parliamentary Devices & Financial Committees -->
        <section id="parliamentary-devices-committees" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Parliamentary Devices &amp; Financial Committees</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="parliamentary-devices-committees"
              section-label="Parliamentary Devices &amp; Financial Committees"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Devices &amp; Committees Watchdogs</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="parliamentary-devices-committees"
            section-label="Parliamentary Devices &amp; Financial Committees"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-emerald-500" />
              The Big Picture: How Lawmakers Grill Ministers &amp; Audit Spending
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              If Ministers were left alone without supervision, they could misuse power and waste public money. In our parliamentary democracy, MPs keep ministers in check using <strong class="t-hi">two daily questioning hours</strong>, <strong class="t-hi">censure motions</strong>, and <strong class="t-hi">three financial watchdog committees</strong>:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Daily Floor Scrutiny:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Every sitting day begins with <strong class="t-hi">Question Hour (11 AM)</strong> where MPs question ministers on their performance, followed by <strong class="t-hi">Zero Hour (12 Noon)</strong> to raise breaking public issues.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">Financial Committees (The Auditing Squads):</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Since 543 MPs cannot inspect thousands of detailed account books on the floor, small bipartisan committees (like PAC and Estimates) inspect receipts and audit reports behind closed doors.
                </p>
              </div>
            </div>
          </div>

          <!-- Devices Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Question Hour vs Zero Hour -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Daily Scrutiny Devices</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">11 AM - 1 PM</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Question Hour vs Zero Hour (PYQ-1834)</h3>
              <div class="space-y-3 text-xs">
                <div class="p-3 rounded-lg bg-sub border b-line">
                  <p class="font-bold text-amber-600 dark:text-amber-400">Question Hour (11:00 AM - First Hour):</p>
                  <p class="t-mid mt-0.5 leading-relaxed">Officially mentioned in the Rules of Procedure. Three question types:</p>
                  <ul class="list-disc pl-4 mt-1.5 space-y-1 t-lo">
                    <li><strong class="t-hi">Starred (*) Question:</strong> Marked with an asterisk. Minister must answer orally on the spot. Follow-up ("supplementary") questions are allowed.</li>
                    <li><strong class="t-hi">Unstarred Question:</strong> Answered in writing; placed on the table of the House. No oral follow-up questions permitted.</li>
                    <li><strong class="t-hi">Short Notice Question:</strong> Urgent public matter; given with notice shorter than 10 days; answered orally.</li>
                  </ul>
                </div>
                <div class="p-3 rounded-lg bg-sub border b-line">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">Zero Hour (Starts Exactly at 12:00 Noon):</p>
                  <p class="t-mid mt-0.5 leading-relaxed">Starts right when Question Hour ends at 12 noon:</p>
                  <ul class="list-disc pl-4 mt-1.5 space-y-1 t-lo">
                    <li><strong class="t-hi">The #1 Fact:</strong> An <strong class="t-hi">Indian parliamentary innovation dating back to 1962</strong>.</li>
                    <li><strong class="t-hi">The Rulebook Trap:</strong> It is <strong class="t-hi">NOT mentioned in the Rules of Procedure</strong>! It is an informal convention.</li>
                    <li>MPs can raise urgent public issues without waiting for the normal 10-day advance notice.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Key Parliamentary Motions -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Legislative Control</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Accountability Tools</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Key Parliamentary Motions in Plain Words</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li>
                  <strong class="t-hi">No-Confidence Motion (Rule 198):</strong> Moved <strong class="t-hi">ONLY in the Lok Sabha</strong>. Needs at least <strong class="t-hi">50 MPs</strong> to support introduction. No specific reasons needed. If passed, the entire government (PM and all ministers) must immediately resign!
                </li>
                <li>
                  <strong class="t-hi">Adjournment Motion:</strong> Halts all normal scheduled business of the day to urgently debate a sudden national crisis (e.g. major disaster). Lok Sabha only; requires support of <strong class="t-hi">50 MPs</strong>; acts as a censure (criticism) of the government.
                </li>
                <li>
                  <strong class="t-hi">Censure Motion:</strong> Moved against a specific Minister or policy to condemn their action. If passed, the government does not have to resign, but must prove its majority.
                </li>
                <li>
                  <strong class="t-hi">Calling Attention Motion:</strong> Indian innovation from 1954; listed in the rulebook; asks a Minister for an authoritative official statement on an urgent matter.
                </li>
                <li>
                  <strong class="t-hi">The Guillotine:</strong> When debate time expires on the final allotted day of the budget session, the Speaker drops the "guillotine", putting all remaining budget demands to vote together without further debate.
                </li>
              </ul>
            </div>
          </div>

          <!-- Cut Motions Panel -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-scissors" class="h-4 w-4 text-amber-500" />
              The Three Budget Cut Motions (Lok Sabha Only)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              When the government presents its Demands for Grants, the Opposition uses "Cut Motions" as scissors to reduce the amount requested. Learn the exact exam formulas:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Policy Disapproval</span>
                <p class="text-sm font-bold t-hi mt-1">Policy Cut Motion</p>
                <p class="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 mt-1">"Reduce demand to Re 1"</p>
                <p class="t-lo mt-1 leading-relaxed">Represents total rejection and disapproval of the underlying policy. If passed, it is equal to a vote of no confidence!</p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Financial Economy</span>
                <p class="text-sm font-bold t-hi mt-1">Economy Cut Motion</p>
                <p class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mt-1">"Reduce demand by a specified amount"</p>
                <p class="t-lo mt-1 leading-relaxed">E.g., "reduce by Rs 100 crore". Means the policy is acceptable, but the expenditure is bloated and can be executed cheaper.</p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Specific Grievance</span>
                <p class="text-sm font-bold t-hi mt-1">Token Cut Motion</p>
                <p class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mt-1">"Reduce demand by Rs 100"</p>
                <p class="t-lo mt-1 leading-relaxed">A symbolic cut to ventilate a specific public complaint or grievance against the ministry's performance.</p>
              </div>
            </div>
          </div>

          <!-- The Three Standing Financial Committees Comparison -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-chart-pie" class="h-4 w-4 text-emerald-500" />
              The Three Standing Financial Committees (High-Yield Contrast Table)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              Committees are elected every year using proportional representation (Single Transferable Vote). Pay close attention to the membership mix and chairmanship rules:
            </p>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Committee</th>
                    <th class="py-2.5 px-3">Members &amp; House Mix</th>
                    <th class="py-2.5 px-3">Origin / Recommendation</th>
                    <th class="py-2.5 px-3">Chairperson Convention</th>
                    <th class="py-2.5 pl-3">Primary Mandate</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-amber-600 dark:text-amber-400">Estimates Committee (PYQ-0768)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">30 members (ALL from Lok Sabha; ZERO from Rajya Sabha)</td>
                    <td class="py-2.5 px-3 t-mid">1950, on recommendation of Finance Minister John Mathai</td>
                    <td class="py-2.5 px-3 t-mid">Appointed by Speaker from the <strong class="t-hi">ruling party</strong></td>
                    <td class="py-2.5 pl-3 t-lo">Examines budget estimates; suggests savings and efficiency; nicknamed "continuous economy committee".</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-emerald-600 dark:text-emerald-400">Public Accounts Committee (PAC)</td>
                    <td class="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">22 members (15 Lok Sabha + 7 Rajya Sabha)</td>
                    <td class="py-2.5 px-3 t-mid">Oldest committee (set up 1921 under GoI Act 1919)</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">Appointed by Speaker from the <strong class="t-hi">Opposition</strong> (convention since 1967)</td>
                    <td class="py-2.5 pl-3 t-lo">Known as "post-mortem committee"; scrutinizes CAG audit reports to expose waste, fraud, and illegal expenditure.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-sky-600 dark:text-sky-400">Committee on Public Undertakings (CoPU)</td>
                    <td class="py-2.5 px-3 font-semibold text-sky-600 dark:text-sky-400">22 members (15 Lok Sabha + 7 Rajya Sabha)</td>
                    <td class="py-2.5 px-3 t-mid">Created 1964 on Krishna Menon Committee recommendation</td>
                    <td class="py-2.5 px-3 t-mid">Appointed by Speaker from Lok Sabha members only</td>
                    <td class="py-2.5 pl-3 t-lo">Examines reports and accounts of Public Sector Undertakings (PSUs like LIC, ONGC, BHEL) and CAG findings.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3 p-2.5 rounded bg-rose-500/10 border border-rose-500/25 text-xs text-rose-700 dark:text-rose-300 font-semibold">
              CRITICAL UNIVERSAL RULE: A Minister CANNOT be elected to any of these financial committees! If an MP becomes a Minister after joining a committee, they must immediately vacate their committee seat.
            </div>
          </div>
        </section>

        <!-- 07 : High-Yield Cloze Recall Anchors -->
        <section id="cloze-recall-anchors" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">07</span>
            <h2 class="sec-title">High-Yield Cloze Recall Anchors &amp; Memory Triggers</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="cloze-recall-anchors"
              section-label="High-Yield Cloze Recall Anchors"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Active Recall Anchors</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="cloze-recall-anchors"
            section-label="High-Yield Cloze Recall Anchors"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-4">
            Test your precision recall on core constitutional leaders, article numbers, and parliamentary devices. Click any card to reveal its cloze anchor, or use the global toggle button below.
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
            <!-- Group 1: Leaders & Historical Appointments -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-user-circle" class="h-3.5 w-3.5 text-amber-500" />
                Category A : Key Leaders &amp; Landmark Appointments
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Anchor 1 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-mavalankar')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">First Lok Sabha Speaker</span>
                  <p class="text-xs font-semibold t-hi mt-1">1st Speaker of Independent India</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-mavalankar')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      G.V. Mavalankar (1952-1956)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Speaker]</span>
                  </div>
                </div>

                <!-- Anchor 2 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-ayyangar')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">First Deputy Speaker</span>
                  <p class="text-xs font-semibold t-hi mt-1">1st Deputy Speaker of Lok Sabha</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-ayyangar')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      M. Ananthasayanam Ayyangar
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Deputy Speaker]</span>
                  </div>
                </div>

                <!-- Anchor 3 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-radhakrishnan')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">First Rajya Sabha Chairman</span>
                  <p class="text-xs font-semibold t-hi mt-1">1st Vice-President of India</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-radhakrishnan')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Dr. Sarvepalli Radhakrishnan
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal RS Chairman]</span>
                  </div>
                </div>

                <!-- Anchor 4 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-mathai')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Estimates Committee (1950)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Recommended 30-member committee</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-mathai')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      John Mathai (Finance Minister)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Recommender]</span>
                  </div>
                </div>

                <!-- Anchor 5 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-menon')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">CoPU Origin (1964)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Committee on Public Undertakings</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-menon')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Krishna Menon Committee
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Committee]</span>
                  </div>
                </div>

                <!-- Anchor 6 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-nominees')"
                >
                  <span class="text-[10px] font-mono font-bold text-saffron-600 dark:text-saffron-400">Nominated Members (PYQ-0313)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Legal luminaries nominated to RS</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-nominees')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      K.T. Tulsi &amp; K. Parasaran
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Nominees]</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 2: Articles Master Cloze -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-bookmark" class="h-3.5 w-3.5 text-emerald-500" />
                Category B : Constitutional Articles High-Yield Cloze
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Art 79 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art79')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Constitutional Definition</span>
                  <p class="text-xs font-semibold t-hi mt-1">Constitution of Parliament</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art79')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 79 : President + RS + LS
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Art 100(1) -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art100')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Speaker's Casting Vote</span>
                  <p class="text-xs font-semibold t-hi mt-1">Voting in Houses &amp; Quorum</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art100')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 100(1) : Casting vote only on tie
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Art 108 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art108')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">Joint Sitting Mechanism</span>
                  <p class="text-xs font-semibold t-hi mt-1">Deadlock resolution by President</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art108')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 108 (Presided under 118(4))
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Art 110 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art110')"
                >
                  <span class="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Money Bill Definition</span>
                  <p class="text-xs font-semibold t-hi mt-1">Definition &amp; Certification</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art110')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 110 (Clause 3: Speaker final)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Art 123 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art123')"
                >
                  <span class="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">President's Ordinance Power</span>
                  <p class="text-xs font-semibold t-hi mt-1">Recess legislative power</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art123')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 123 : Max 6 months + 6 weeks
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>

                <!-- Art 249 -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-art249')"
                >
                  <span class="text-[10px] font-mono font-bold text-saffron-600 dark:text-saffron-400">Rajya Sabha Special Power</span>
                  <p class="text-xs font-semibold t-hi mt-1">Legislate on State List</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-art249')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Article 249 : 2/3rd present &amp; voting
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Article]</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 3: Parliamentary Devices Cloze -->
            <div>
              <p class="eyebrow mb-3 flex items-center gap-1.5">
                <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5 text-sky-500" />
                Category C : Parliamentary Devices Cloze
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <!-- Zero Hour -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-zerohour')"
                >
                  <span class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">Indian Innovation (1962)</span>
                  <p class="text-xs font-semibold t-hi mt-1">Starts at 12 noon, no notice</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-zerohour')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Zero Hour (Not in Rules)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Device]</span>
                  </div>
                </div>

                <!-- Adjournment Motion -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-adjournment')"
                >
                  <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">50 Members Required</span>
                  <p class="text-xs font-semibold t-hi mt-1">Censures government, sets aside business</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-adjournment')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Adjournment Motion (LS only)
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Motion]</span>
                  </div>
                </div>

                <!-- Policy Cut -->
                <div
                  class="panel p-3.5 bg-elev border b-line cursor-pointer select-none transition-all hover:border-saffron-500/50"
                  @click="toggleAnchor('anc-policycut')"
                >
                  <span class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">Reduce Demand to Re 1</span>
                  <p class="text-xs font-semibold t-hi mt-1">Disapproval of entire policy</p>
                  <div class="mt-2 p-2 rounded bg-sub border b-line font-mono text-[11px]">
                    <span v-if="showClozeAnswers || revealedAnchors.has('anc-policycut')" class="text-emerald-600 dark:text-emerald-400 font-bold">
                      Policy Cut Motion
                    </span>
                    <span v-else class="text-amber-500/60 font-semibold">[Click to reveal Cut Motion]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 08 : Dedicated Union vs State Comparison Matrix -->
        <section id="union-vs-state-matrix" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">08</span>
            <h2 class="sec-title">Dedicated Union vs State Comparison Matrix</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="union-vs-state-matrix"
              section-label="Dedicated Union vs State Comparison Matrix"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Federal Parallels &amp; Contrasts</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="union-vs-state-matrix"
            section-label="Dedicated Union vs State Comparison Matrix"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <!-- Section Plain-English Introduction -->
          <div class="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <h3 class="text-sm font-bold t-hi mb-1.5 flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="h-4 w-4 text-amber-500" />
              The Big Picture: Why Union vs State Comparisons Dominate Exams
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-3">
              On the surface, the Central Government and State Governments look almost identical: the President is like a Governor, the Prime Minister is like a Chief Minister, and Parliament is like a State Legislature. But the examiners deliberately target the <strong class="t-hi">critical legal differences</strong> where the rules do NOT match:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-amber-600 dark:text-amber-400">Pardon Power:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Only the <strong class="t-hi">President</strong> can pardon a death sentence or military court-martial. A Governor cannot!
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">Constitutional Discretion:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  The <strong class="t-hi">Governor</strong> has explicit constitutional discretion (Art. 163). The President has NO explicit constitutional discretion!
                </p>
              </div>
              <div class="p-3 rounded-lg bg-elev border b-line">
                <span class="font-bold text-rose-600 dark:text-rose-400">Joint Sittings:</span>
                <p class="t-lo mt-1 leading-relaxed">
                  Parliament can hold a <strong class="t-hi">Joint Sitting</strong> (Art. 108) to break deadlocks. States have <strong class="t-hi">ZERO provision for a Joint Sitting</strong>!
                </p>
              </div>
            </div>
          </div>

          <!-- Table 1: President vs Governor Comparison Matrix -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-amber-500" />
              President of India vs Governor of a State: Head-to-Head Comparison
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Both are constitutional heads of their respective territories, but their appointment, removal, and emergency powers differ completely:
            </p>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Constitutional Dimension</th>
                    <th class="py-2.5 px-3 text-amber-600 dark:text-amber-400">President of India (Union)</th>
                    <th class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400">Governor of a State (State)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Constitutional Office</td>
                    <td class="py-2.5 px-3 t-mid">Article 52 : Head of State &amp; First Citizen of India</td>
                    <td class="py-2.5 pl-3 t-mid">Article 153 : Constitutional Head of the State</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">How are they appointed?</td>
                    <td class="py-2.5 px-3 t-mid">Elected by an Electoral College (Art. 54) of elected MPs and MLAs via Single Transferable Vote.</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-semibold">Appointed directly by the President on Central Cabinet advice (Art. 155); no election held.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Tenure &amp; How to Remove</td>
                    <td class="py-2.5 px-3 t-mid">5-year term. Removed ONLY through formal parliamentary impeachment for "Violation of Constitution" (Art. 61) by 2/3rd total membership.</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-semibold">Holds office during the <strong class="t-hi">pleasure of the President</strong> (Art. 156(1)). Can be dismissed at any time without giving reasons; no impeachment needed!</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Pardoning Powers</td>
                    <td class="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">
                      <strong class="t-hi">Article 72:</strong> Can pardon, reprieve, respite, remit, or commute:
                      <ul class="list-disc pl-4 mt-1 font-normal text-xs text-amber-700 dark:text-amber-300">
                        <li>All Court Martial (military court) sentences</li>
                        <li>All offenses against Union laws</li>
                        <li><strong class="t-hi">Can completely PARDON death sentences</strong></li>
                      </ul>
                    </td>
                    <td class="py-2.5 pl-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      <strong class="t-hi">Article 161:</strong> Can suspend, remit, or commute offenses against State laws:
                      <ul class="list-disc pl-4 mt-1 font-normal text-xs text-emerald-700 dark:text-emerald-300">
                        <li>Zero power over Court Martial (military) sentences</li>
                        <li><strong class="t-hi">CANNOT PARDON A DEATH SENTENCE</strong> (can only suspend, remit, or commute to life)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Ordinance-Making Power</td>
                    <td class="py-2.5 px-3 t-mid">
                      <strong class="t-hi">Article 123:</strong> Issued when Parliament is in recess. Valid for max 6 months + 6 weeks.
                    </td>
                    <td class="py-2.5 pl-3 t-mid">
                      <strong class="t-hi">Article 213:</strong> Issued when State Legislature is in recess. Cannot issue ordinances on certain subjects without President's prior instruction.
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Discretionary Power</td>
                    <td class="py-2.5 px-3 text-amber-600 dark:text-amber-400 font-semibold">
                      <strong class="t-hi">NO explicit constitutional discretion.</strong> Bound strictly by Article 74(1) Cabinet advice (confirmed in <em class="t-hi">Shamsher Singh 1974</em>).
                    </td>
                    <td class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <strong class="t-hi">EXPLICIT constitutional discretion under Article 163(1) &amp; 163(2).</strong> If any question arises whether a matter is in Governor's discretion, Governor's decision is final!
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Veto Powers over Bills</td>
                    <td class="py-2.5 px-3 t-mid">
                      <strong class="t-hi">Article 111:</strong> Can give Assent, Withhold assent, or Return ordinary bill once for reconsideration.
                    </td>
                    <td class="py-2.5 pl-3 t-mid">
                      <strong class="t-hi">Article 200:</strong> Can give Assent, Withhold assent, Return bill once, OR <strong class="t-hi">Reserve the bill for the consideration of the President</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Bill Passed Again upon Reconsideration</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      The President <strong class="t-hi">MUST give assent</strong> under Article 111 (Suspensive veto is broken).
                    </td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-bold">
                      Under <strong class="t-hi">Article 201</strong>, if a State Assembly re-passes a bill that was reserved for the President, the President is <strong class="t-hi">STILL NOT BOUND</strong> to sign it!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Table 2: Parliament vs State Legislature Comparison Matrix -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-2 flex items-center gap-2">
              <UIcon name="i-heroicons-building-library" class="h-4 w-4 text-emerald-500" />
              Parliament vs State Legislature: Structural Comparison
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              Understanding how power is distributed between upper and lower chambers at the Center versus in the States:
            </p>
            <div class="overflow-x-auto">
              <table class="table-note">
                <thead>
                  <tr class="border-b b-line">
                    <th class="py-2.5 pr-4">Dimension</th>
                    <th class="py-2.5 px-3 text-amber-600 dark:text-amber-400">Parliament of India (Union)</th>
                    <th class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400">State Legislature (State)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--line)]">
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Chamber Structure</td>
                    <td class="py-2.5 px-3 t-mid"><strong class="t-hi">Always Bicameral (Two Houses)</strong>: President + Rajya Sabha + Lok Sabha (Art. 79).</td>
                    <td class="py-2.5 pl-3 t-mid"><strong class="t-hi">Can be Unicameral or Bicameral</strong> (Art. 168): Governor + Assembly (and Council in only 6 states: UP, Bihar, Maharashtra, Karnataka, AP, Telangana).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Can the Upper House be Abolished?</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-semibold">IMPOSSIBLE. Rajya Sabha is a permanent federal pillar and cannot be abolished.</td>
                    <td class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <strong class="t-hi">EASILY ABOLISHED (Article 169):</strong> State Assembly passes a resolution by special majority, and Parliament passes an ordinary law with simple majority.
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Power of Upper House on Ordinary Bills</td>
                    <td class="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">
                      Rajya Sabha has <strong class="t-hi">equal power</strong> to amend or reject; deadlock can trigger a Joint Sitting (Art. 108).
                    </td>
                    <td class="py-2.5 pl-3 font-semibold text-rose-600 dark:text-rose-400">
                      Legislative Council is only a <strong class="t-hi">dilatory (delaying) chamber</strong>. Can delay a bill for max <strong class="t-hi">4 months</strong> (3 months 1st time + 1 month 2nd time), after which the Assembly overrides it!
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Joint Sitting Mechanism</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">YES : Article 108 (Summoned by President, presided by LS Speaker).</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-bold">NO : There is ZERO provision for a joint sitting in any State Legislature!</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Money Bills (Upper House Window)</td>
                    <td class="py-2.5 px-3 t-mid">Rajya Sabha limited to <strong class="t-hi">14 days</strong>; recommendations only (Art. 109).</td>
                    <td class="py-2.5 pl-3 t-mid">Legislative Council limited to <strong class="t-hi">14 days</strong>; recommendations only (Art. 198).</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Minimum Age for Membership</td>
                    <td class="py-2.5 px-3 t-mid">Lok Sabha: 25 years · Rajya Sabha: 30 years (Art. 84).</td>
                    <td class="py-2.5 pl-3 t-mid">Legislative Assembly: 25 years · Legislative Council: 30 years (Art. 173).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 09 : Previous Year Questions -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Previous Year Questions</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="pyqs"
              section-label="Previous Year Questions"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">18 Verified TGPRB PYQs</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="pyqs"
            section-label="Previous Year Questions"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />

          <p class="text-sm leading-relaxed t-mid mb-6">
            All 18 official TGPRB questions asked from Union Executive and Parliament across Telangana SI and Constable papers (2015-2023), verified against the canonical examination key.
          </p>

          <!-- Exam Filter Tabs & Score Bar -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-sub border b-line">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="tab in examFilters"
                :key="tab.value"
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                :class="activeExamFilter === tab.value
                  ? 'bg-saffron-500 text-white shadow-sm dark:text-stone-900'
                  : 't-mid hover:t-hi hover:bg-elev'"
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

        <!-- 10 : Advanced Practice -->
        <section id="advanced-practice" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">10</span>
            <h2 class="sec-title">Advanced Practice Drills</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="advanced-practice"
              section-label="Advanced Practice Drills"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">TGPSC/TGPRB Standard</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="advanced-practice"
            section-label="Advanced Practice Drills"
            note-title="Part V: Union Executive &amp; Parliament"
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
              note-id="NOTE-POL-UNION-EXEC"
              section-id="gate"
              section-label="Comprehension Gate"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="gate"
            section-label="Comprehension Gate"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />
          <GateQuiz note-id="NOTE-POL-UNION-EXEC" />
        </section>

        <!-- 12 : Current Affairs -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">12</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton
              note-id="NOTE-POL-UNION-EXEC"
              section-id="current-affairs"
              section-label="Current Affairs"
              note-title="Part V: Union Executive &amp; Parliament"
              @open="openNotesDrawer"
            />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip
            note-id="NOTE-POL-UNION-EXEC"
            section-id="current-affairs"
            section-label="Current Affairs"
            note-title="Part V: Union Executive &amp; Parliament"
            @open="openNotesDrawer"
          />
          <CurrentAffairsStrip note-id="NOTE-POL-UNION-EXEC" />
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
            to="/study/parliament"
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
      note-id="NOTE-POL-UNION-EXEC"
      note-title="Part V: Union Executive &amp; Parliament"
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
  title: 'Part V: Union Executive & Parliament - BeatBook',
  meta: [{ name: 'description', content: 'Comprehensive TGPRB study note: Part V Union Executive & Parliament with constitutional framework, presiding officers, Money bills, financial committees, and 18 verified PYQs.' }],
})

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Union Executive (Arts 52-78)' },
  { label: 'Parliament Composition (Arts 79-88)' },
  { label: 'Presiding Officers & Casting Vote' },
  { label: 'Legislative Procedure & Money Bills' },
  { label: 'Parliamentary Devices & Committees' },
  { label: '4-Tier Legal Architecture' },
  { label: 'High-Yield Cloze Recall Anchors' },
  { label: 'Dedicated Union vs State Matrix' },
]

const sections = [
  { id: 'visual-architecture',             label: 'Visual Roadmap & 4-Tier Architecture' },
  { id: 'union-executive',                label: 'Union Executive: President, VP & PM' },
  { id: 'parliament-composition',          label: 'Parliament Composition & Architecture' },
  { id: 'presiding-officers',              label: 'Presiding Officers & Functionaries' },
  { id: 'legislative-budgetary-procedure', label: 'Legislative Procedure & Money Bills' },
  { id: 'parliamentary-devices-committees', label: 'Devices & Financial Committees' },
  { id: 'cloze-recall-anchors',            label: 'High-Yield Cloze Recall Anchors' },
  { id: 'union-vs-state-matrix',           label: 'Dedicated Union vs State Matrix' },
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
    "uid": "PYQ-2699",
    "exam": "SI",
    "year": "2022",
    "tag": "Parliament",
    "source": "SI 2022 Prelims : Q155",
    "question": "Parliament means",
    "options": [
      "The Lok Sabha",
      "The Rajya Sabha",
      "The President",
      "All the above"
    ],
    "correct": 3,
    "explanation": "According to Article 79 of the Indian Constitution, the Parliament consists of the President and the two Houses: the Rajya Sabha (Council of States) and the Lok Sabha (House of the People). Although the President is not a member of either House, he is an integral part of Parliament as no bill can become law without his assent.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0998",
    "exam": "Constable",
    "year": "2022",
    "tag": "Parliament",
    "source": "Constable 2022 Prelims : Q180",
    "question": "The total sanctioned strength of the Rajya Sabha is _________ members.",
    "options": [
      "210",
      "230",
      "250",
      "280"
    ],
    "correct": 2,
    "explanation": "According to Article 80 of the Indian Constitution, the maximum sanctioned strength of the Rajya Sabha (Council of States) is fixed at 250 members. Out of these 250 members, 238 represent the States and Union Territories, while 12 are nominated by the President of India.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1182",
    "exam": "Constable",
    "year": "2023",
    "tag": "Parliament",
    "source": "Constable 2023 Mains : Q167",
    "question": "How many members can be nominated to Rajya Sabha by using His/Her powers of President of India?",
    "options": [
      "10",
      "11",
      "12",
      "13"
    ],
    "correct": 2,
    "explanation": "Under Article 80 of the Constitution of India, the President can nominate 12 members to the Rajya Sabha. These individuals are chosen for their special knowledge or practical experience in fields such as Literature, Science, Art, and Social Service.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0313",
    "exam": "Constable",
    "year": "2015",
    "tag": "Parliament",
    "source": "Constable 2015 Prelims : Q116",
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
    "uid": "PYQ-0309",
    "exam": "Constable",
    "year": "2015",
    "tag": "Parliament",
    "source": "Constable 2015 Prelims : Q111",
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
    "uid": "PYQ-0164",
    "exam": "Constable",
    "year": "2015",
    "tag": "Parliament",
    "source": "Constable 2015 Mains : Q164",
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
    "uid": "PYQ-1077",
    "exam": "Constable",
    "year": "2023",
    "tag": "Parliament",
    "source": "Constable 2023 Mains : Q59",
    "question": "As per the constitution of India, how many Members of Parliament (MPs) memberships are allotted for India Parliament?",
    "options": [
      "552",
      "543",
      "529",
      "None of the above"
    ],
    "correct": 0,
    "explanation": "Under the Constitution of India (Article 81 and Article 331), the maximum permitted strength of the Lok Sabha was fixed at 552 members (530 representing States, 20 representing Union Territories, and 2 nominated Anglo-Indians). The 104th Constitutional Amendment Act, 2019 discontinued the nomination of Anglo-Indians.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0326",
    "exam": "Constable",
    "year": "2015",
    "tag": "Parliament",
    "source": "Constable 2015 Prelims : Q129",
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
    "tag": "Parliament",
    "source": "Constable 2015 Mains : Q191",
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
    "uid": "PYQ-0519",
    "exam": "Constable",
    "year": "2018",
    "tag": "Parliament",
    "source": "Constable 2018 Mains : Q98",
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
    "uid": "PYQ-2203",
    "exam": "SI",
    "year": "2018",
    "tag": "Parliament",
    "source": "SI 2018 Mains : Q101",
    "question": "Which one among the following is not true with regard to joint sitting of the Parliament?",
    "options": [
      "In the absence of Speaker, Deputy Speaker presides over it.",
      "In the absence of Deputy Sepaker, Deputy Chairman of Rajya Sabha presides over it.",
      "In the absence of Deputy Chairman, the Chairman of Rajya Sabha presides over it.",
      "It is presided over by Speaker."
    ],
    "correct": 2,
    "explanation": "The Chairman of Rajya Sabha (Vice-President of India) never presides over a joint sitting of Parliament because he is not a member of either House. In the absence of the Deputy Chairman, a member agreed upon by the members present at the sitting presides.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0754",
    "exam": "Constable",
    "year": "2018",
    "tag": "Parliament",
    "source": "Constable 2018 Prelims : Q134",
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
    "uid": "PYQ-0314",
    "exam": "Constable",
    "year": "2015",
    "tag": "Parliament",
    "source": "Constable 2015 Prelims : Q117",
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
    "uid": "PYQ-1107",
    "exam": "Constable",
    "year": "2023",
    "tag": "Parliament",
    "source": "Constable 2023 Mains : Q90",
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
  },
  {
    "uid": "PYQ-0301",
    "exam": "Constable",
    "year": "2015",
    "tag": "Parliament",
    "source": "Constable 2015 Prelims : Q102",
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
    "uid": "PYQ-2517",
    "exam": "SI",
    "year": "2018",
    "tag": "Parliament",
    "source": "SI 2018 Prelims : Q167",
    "question": "Parliament enacts laws. In this regard, examine the following statements : (a) All bills including finance bills can be introduced in either house of the parliament. (b) All members of the parliament have the right to introduce bills in their respective houses. (c) A bill may be introduced either by a minister or by a private member. (d) If a bill has been published in the official gazette before its introduction, no motion for leave to introduce the bill is necessary. Choose the correct answer:",
    "options": [
      "(a), (b) and (c) only",
      "(b), (c) and (d) only",
      "(a), (b) and (d) only",
      "(a), (c) and (d) only"
    ],
    "correct": 1,
    "explanation": "Statement (a) is incorrect because Money Bills (Article 110) and Financial Bills Type I (Article 117(1)) can only be introduced in the Lok Sabha, not in either house. Statements (b), (c), and (d) are correct according to parliamentary procedures, where prior publication in the Gazette dispenses with the need for a motion for leave to introduce the bill under House Rules.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-1834",
    "exam": "SI",
    "year": "2016",
    "tag": "Parliament",
    "source": "SI 2016 Prelims : Q166",
    "question": "Read the following statements\n(a) The first hour of every parliament day is reserved for questions\n(b) Zero hour is a typical Indian innovation in the field of parliamentary practice\n(c) Judicial control over administrative acts stem from natural law\nThe correct answer is/are",
    "options": [
      "(1) (a) is correct, (b) and (c) are wrong",
      "(2) All (a), (b) and (c) are correct",
      "(3) All (a), (b) and (c) are wrong",
      "(4) (a) and (c) are wrong and (b) is correct"
    ],
    "correct": 1,
    "explanation": "Question Hour is the first hour of every parliamentary sitting dedicated to asking and answering questions. Zero Hour is an informal device introduced in 1962 as an Indian parliamentary innovation. Judicial control over administrative actions is grounded in natural law principles, such as natural justice and rule of law.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0768",
    "exam": "Constable",
    "year": "2018",
    "tag": "Parliament",
    "source": "Constable 2018 Prelims : Q148",
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
  }
]))

const activeExamFilter = ref('all')
const examFilters = [
  { label: 'All Exams (18)', value: 'all' },
  { label: 'Constable (14)', value: 'Constable' },
  { label: 'SI (4)', value: 'SI' },
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
    "uid": "ADV-POL-PARL-001",
    "question": "Consider the following statements regarding the President of India's election and impeachment under Articles 54 and 61:\n\n1. Elected members of both Houses of Parliament and elected members of State Legislative Assemblies participate in the election of the President.\n2. Nominated members of either House of Parliament do not participate in the election of the President.\n3. Nominated members of Parliament participate in the impeachment of the President.\n4. Elected members of the State Legislative Assemblies participate in the impeachment of the President.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2 and 3 only",
      "1 and 2 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 2, and 3 are correct. Statement 4 is incorrect because elected members of State Legislative Assemblies DO NOT participate in the impeachment of the President under Article 61, even though they participate in presidential elections. Impeachment is conducted exclusively by Parliament by a two-thirds majority of the total membership of each House.",
    "source": "TGPSC-Style Advanced Drill (Derived from Art. 54 & 61)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-PARL-002",
    "question": "Examine the following statements regarding the presiding officers and legislative procedure of the Indian Parliament:\n\n1. The Speaker of Lok Sabha exercises a casting vote only in the case of an equality of votes under Article 100(1).\n2. When a resolution for the removal of the Speaker is under consideration, the Speaker cannot preside but can vote in the first instance.\n3. The Chairman of the Rajya Sabha presides over a joint sitting of both Houses of Parliament in the absence of the Speaker and Deputy Speaker.\n4. The decision of the Speaker on whether a bill is a Money Bill or not is final and endorsed with a certificate under Article 110(3).\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2 and 4 only",
      "1, 3 and 4 only",
      "2 and 3 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 2, and 4 are correct. Statement 3 is incorrect because the Chairman of the Rajya Sabha (Vice-President of India) NEVER presides over a joint sitting under Article 118(4). In the absence of the Speaker and Deputy Speaker, the Deputy Chairman of the Rajya Sabha presides, followed by a member chosen by the sitting.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-2203 & PYQ-0519)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-PARL-003",
    "question": "With reference to Money Bills and Financial Bills in Parliament, consider the following statements:\n\n1. A Money Bill under Article 110 can be introduced only in the Lok Sabha with the prior recommendation of the President.\n2. The Rajya Sabha has no power to amend or reject a Money Bill and must return it within 14 days with recommendations.\n3. A Financial Bill (Type I) under Article 117(1) can be introduced only in the Lok Sabha on the President's recommendation, but is otherwise treated as an ordinary bill.\n4. In case of a deadlock on a Financial Bill (Type I), a joint sitting of both Houses can be summoned under Article 108.\n\nWhich of the statements given above are correct?",
    "options": [
      "1 and 2 only",
      "3 and 4 only",
      "1, 2 and 3 only",
      "1, 2, 3 and 4"
    ],
    "correct": 3,
    "explanation": "All four statements are correct. A Money Bill (Art. 110) originates only in Lok Sabha with presidential recommendation and cannot face a joint sitting. Financial Bill Type I (Art. 117(1)) also originates only in Lok Sabha on presidential recommendation, but after introduction, it follows ordinary bill procedures, allowing Rajya Sabha to amend/reject and enabling a joint sitting under Art. 108.",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-1107 & PYQ-2517)",
    "format": "Multi-statement",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-PARL-004",
    "question": "Match List-I (Parliamentary Device / Term) with List-II (Key Operational Feature):\n\nList-I:\nA. Zero Hour\nB. Question Hour\nC. Adjournment Motion\nD. Policy Cut Motion\n\nList-II:\n1. First hour of every sitting mentioned in the Rules of Procedure\n2. Indian innovation dating to 1962, not mentioned in Rules of Procedure\n3. Extraordinary motion requiring 50 members to censure the government\n4. Demand that the amount of the grant be reduced to Re 1\n\nChoose the correct option:",
    "options": [
      "A-2, B-1, C-3, D-4",
      "A-1, B-2, C-3, D-4",
      "A-2, B-1, C-4, D-3",
      "A-3, B-1, C-2, D-4"
    ],
    "correct": 0,
    "explanation": "Zero Hour is an Indian innovation from 1962 not in the Rules of Procedure (A-2). Question Hour is the first hour of every sitting listed in the Rules (B-1). Adjournment Motion requires 50 members support and censures the government (C-3). Policy Cut Motion demands reduction of grant to Re 1 representing disapproval of policy (D-4).",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-1834)",
    "format": "Matching",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-PARL-005",
    "question": "Match List-I (Parliamentary Committee) with List-II (Composition & Origin):\n\nList-I:\nA. Estimates Committee\nB. Public Accounts Committee (PAC)\nC. Committee on Public Undertakings (CoPU)\nD. Departmentally Related Standing Committees\n\nList-II:\n1. 22 members (15 LS + 7 RS); created 1921 under GoI Act 1919; chaired by opposition since 1967\n2. 30 members exclusively from Lok Sabha; nicknamed continuous economy committee; created 1950\n3. 31 members each (21 LS + 10 RS); 24 committees created in 1993\n4. 22 members (15 LS + 7 RS); created 1964 on Krishna Menon Committee recommendation\n\nChoose the correct option:",
    "options": [
      "A-2, B-1, C-4, D-3",
      "A-1, B-2, C-4, D-3",
      "A-2, B-4, C-1, D-3",
      "A-3, B-1, C-4, D-2"
    ],
    "correct": 0,
    "explanation": "Estimates Committee has 30 members all from Lok Sabha (A-2). Public Accounts Committee has 22 members (15 LS + 7 RS) set up in 1921 with opposition chair convention since 1967 (B-1). Committee on Public Undertakings has 22 members created in 1964 on Krishna Menon recommendation (C-4). Departmentally Related Standing Committees have 31 members each across 24 committees created in 1993 (D-3).",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0768)",
    "format": "Matching",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-POL-PARL-006",
    "question": "Consider the following statements comparing the President of India and the Governor of a State:\n\n1. The President has power to grant pardon in respect of all punishments by a Court Martial, while the Governor has no such power.\n2. The President can pardon a death sentence, whereas the Governor cannot pardon a death sentence even if state law provides for it.\n3. The Governor has explicit constitutional discretionary powers under Article 163, whereas the President has no explicit constitutional discretion.\n4. When a bill passed by a State Legislature is reserved by the Governor for the consideration of the President, and the State Legislature passes it again after reconsideration, the President is bound to give assent under Article 201.\n\nWhich of the statements given above are correct?",
    "options": [
      "1, 2 and 3 only",
      "1 and 2 only",
      "3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "correct": 0,
    "explanation": "Statements 1, 2, and 3 are correct. Statement 4 is incorrect because under Article 201, even if the State Legislature repasses the bill within 6 months, the President is STILL NOT bound to give assent! (This contrasts sharply with Article 111 for Parliament bills where the President must give assent upon reconsideration).",
    "source": "TGPSC-Style Advanced Drill (President vs Governor Comparison)",
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
