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

          <p class="text-sm leading-relaxed t-mid mb-6">
            Part V of the Constitution of India ("The Union", Articles 52 to 151) establishes the structural backbone of Indian parliamentary democracy. It divides national governance into five sequential chapters, establishing parliamentary supremacy with constitutional judicial oversight.
          </p>

          <!-- Part V Chapters Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Chapter I · Articles 52-78</span>
              <p class="text-sm font-bold t-hi mt-1.5">The Union Executive</p>
              <p class="text-xs t-lo mt-1">President (52-62), Vice-President (63-71), Council of Ministers &amp; Prime Minister (74-75), Attorney General for India (76), Conduct of Government Business (77-78).</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Chapter II · Articles 79-122</span>
              <p class="text-sm font-bold t-hi mt-1.5">The Parliament</p>
              <p class="text-xs t-lo mt-1">Composition (79-82), Duration &amp; Officers (83-98), Conduct of Business &amp; Disqualifications (99-106), Legislative &amp; Financial Procedure (107-117), Rules of Procedure (118-122).</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Chapter III · Article 123</span>
              <p class="text-sm font-bold t-hi mt-1.5">Legislative Powers of President</p>
              <p class="text-xs t-lo mt-1">Promulgation of Ordinances during recess of Parliament. Co-extensive with parliamentary law-making, temporary life of 6 months + 6 weeks.</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Chapter IV · Articles 124-147</span>
              <p class="text-sm font-bold t-hi mt-1.5">The Union Judiciary</p>
              <p class="text-xs t-lo mt-1">Establishment and constitution of the Supreme Court, jurisdiction (Original 131, Appellate 132-136, Advisory 143), Court of Record (129), and Law declared binding (141).</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Chapter V · Articles 148-151</span>
              <p class="text-sm font-bold t-hi mt-1.5">Comptroller &amp; Auditor General</p>
              <p class="text-xs t-lo mt-1">Guardian of the public purse, duties and powers (149), forms of accounts (150), audit reports submitted to President for parliamentary scrutiny by PAC (151).</p>
            </div>

            <div class="panel p-4 bg-elev border b-line">
              <span class="chip chip-mono text-[10px] text-saffron-600 dark:text-saffron-400">Key Constitutional Shield</span>
              <p class="text-sm font-bold t-hi mt-1.5">Articles 105 &amp; 122</p>
              <p class="text-xs t-lo mt-1">Parliamentary privileges, freedom of speech in Parliament, immunity from court inquiry into internal proceedings on ground of alleged irregularity of procedure.</p>
            </div>
          </div>

          <!-- 4-Tier Legal Architecture Hierarchy Panel -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-saffron-500" />
              The 4-Tier Legal Architecture of Union Governance
            </h3>
            <div class="space-y-3.5 text-xs">
              <!-- Tier 1 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px]">Tier 1 : Constitutional Articles &amp; Core Doctrine</span>
                  <span class="chip chip-mono text-[10px]">Supreme Law</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Articles 52-78 (Executive), 79-122 (Parliament), 123 (Ordinance), and 143 (Advisory Jurisdiction). Fixes the foundational doctrines: parliamentary executive, collective responsibility to Lok Sabha (Art. 75(3)), aid and advice binding on President (Art. 74(1)), bicameralism (Art. 79), and Money Bill supremacy (Art. 109-110).
                </p>
              </div>

              <!-- Tier 2 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">Tier 2 : Statutory Acts &amp; Electoral Frameworks</span>
                  <span class="chip chip-mono text-[10px]">Parliamentary Statutes</span>
                </div>
                <p class="t-mid leading-relaxed">
                  <strong class="t-hi">Representation of the People Act 1950</strong> (allocation of seats, delimitation), <strong class="t-hi">Representation of the People Act 1951</strong> (conduct of elections, qualification/disqualification of MPs), <strong class="t-hi">Delimitation Act 2002</strong>, <strong class="t-hi">Parliamentary Proceedings (Protection of Publication) Act 1977</strong> (statutory immunity under Art. 361A), and <strong class="t-hi">Salary and Allowances of Leaders of Opposition in Parliament Act 1977</strong> (10% seat quota threshold).
                </p>
              </div>

              <!-- Tier 3 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px]">Tier 3 : Rules of Procedure &amp; Conventions</span>
                  <span class="chip chip-mono text-[10px]">House Rules &amp; Precedents</span>
                </div>
                <p class="t-mid leading-relaxed">
                  Rules of Procedure and Conduct of Business in Lok Sabha and Rajya Sabha framed under Article 118. Key unwritten conventions with binding constitutional weight: Speaker impartiality and casting vote only on tie (Art. 100(1)); Public Accounts Committee (PAC) chairmanship to the Opposition since 1967; Deputy Speaker post to the Opposition since 11th Lok Sabha (1996); Zero Hour emergence in 1962 as an informal device without rulebook mention.
                </p>
              </div>

              <!-- Tier 4 -->
              <div class="p-3.5 rounded-lg bg-sub border b-line">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[11px]">Tier 4 : Landmark Judicial Precedents &amp; Rulings</span>
                  <span class="chip chip-mono text-[10px]">Supreme Court Rulings</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-amber-600 dark:text-amber-400">Shamsher Singh v. State of Punjab (1974)</p>
                    <p class="text-xs t-lo mt-0.5">7-judge bench held President and Governor are constitutional heads bound by aid and advice; personal satisfaction is not required except in rare exceptional contingencies.</p>
                  </div>
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-emerald-600 dark:text-emerald-400">S.R. Bommai v. Union of India (1994)</p>
                    <p class="text-xs t-lo mt-0.5">9-judge bench ruled floor of the House is the only constitutional forum to test executive majority; presidential proclamation under Article 356 is subject to judicial review.</p>
                  </div>
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-sky-600 dark:text-sky-400">Kihoto Hollohan v. Zachillhu (1992)</p>
                    <p class="text-xs t-lo mt-0.5">Upheld 10th Schedule (Anti-Defection Law) but ruled Speaker/Chairman acts as a tribunal when deciding disqualifications, making decisions subject to judicial review.</p>
                  </div>
                  <div class="p-2.5 rounded bg-base border b-line">
                    <p class="font-semibold text-rose-600 dark:text-rose-400">Raja Ram Pal v. Hon'ble Speaker (2007)</p>
                    <p class="text-xs t-lo mt-0.5">Upheld Parliament's power to expel corrupt members (cash-for-query) under Article 105 privileges, while affirming judicial review over gross constitutional violations.</p>
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

          <p class="text-sm leading-relaxed t-mid mb-6">
            The Union Executive consists of the President, Vice-President, Prime Minister, Council of Ministers, and the Attorney General for India. India follows the Westminster model where the President is the de jure titular head, while the Prime Minister heading the Council of Ministers exercises de facto executive authority.
          </p>

          <!-- Executive Offices Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- President of India -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Head of State · Articles 52-62, 72</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">De Jure Head</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">The President of India</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Electoral College (Art. 54):</strong> Elected members of Lok Sabha, elected members of Rajya Sabha, elected MLAs of all States, and elected MLAs of Delhi &amp; Puducherry (70th CAA 1992). Nominated members and MLCs NEVER vote.</li>
                <li><strong class="t-hi">Election Method (Art. 55):</strong> Proportional representation by single transferable vote (PR-STV) using secret ballot. Uniformity in scale of representation across States.</li>
                <li><strong class="t-hi">Oath (Art. 60):</strong> Administered by the Chief Justice of India (or senior-most Supreme Court Judge).</li>
                <li><strong class="t-hi">Impeachment (Art. 61):</strong> Sole ground is "Violation of the Constitution". Quasi-judicial process initiated in either House with 14 days notice signed by at least 1/4th members; passed by a majority of not less than <strong class="t-hi">two-thirds of the TOTAL membership</strong> of each House. Nominated MPs PARTICIPATE, while State MLAs DO NOT participate.</li>
                <li><strong class="t-hi">Pardoning Power (Art. 72):</strong> Five powers: Pardon (complete forgiveness), Commutation (lighter form of punishment), Remission (reducing period without changing character), Respite (lesser penalty on special grounds like pregnancy), Reprieve (temporary stay). Extends to Court Martial sentences, death sentences, and Union offenses.</li>
                <li><strong class="t-hi">Ordinance Power (Art. 123):</strong> Promulgated only during recess of Parliament; co-extensive with legislative power; maximum life of 6 months + 6 weeks.</li>
              </ul>
            </div>

            <!-- Vice-President of India -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Ex-Officio Chairman · Articles 63-71</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Second Citizen</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">The Vice-President of India</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Ex-officio Role (Art. 64):</strong> Ex-officio Chairman of the Council of States (Rajya Sabha). Does not draw salary as Vice-President, but draws salary as Chairman of Rajya Sabha (2nd Schedule).</li>
                <li><strong class="t-hi">Electoral College (Art. 66):</strong> Consists of ALL members of both Houses of Parliament (both elected AND nominated). State MLAs have NO role in Vice-Presidential elections.</li>
                <li><strong class="t-hi">Qualifications:</strong> Citizen of India, at least 35 years of age, qualified for election as a member of the Rajya Sabha.</li>
                <li><strong class="t-hi">Removal (Art. 67(b)):</strong> Resolution can be initiated ONLY in the Rajya Sabha. Requires 14 days advance notice. Must be passed by an <strong class="t-hi">effective majority</strong> (majority of all the then members) of Rajya Sabha and agreed to by Lok Sabha by a <strong class="t-hi">simple majority</strong>.</li>
                <li><strong class="t-hi">Acting President (Art. 65):</strong> Acts as President during casual vacancies for a maximum of 6 months, during which he does not perform duties of Chairman of Rajya Sabha.</li>
              </ul>
            </div>

            <!-- Prime Minister & Council of Ministers -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Real Executive · Articles 74, 75, 78</span>
                <span class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">De Facto Head</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Prime Minister &amp; Council of Ministers</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Aid and Advice (Art. 74(1)):</strong> Council of Ministers with Prime Minister at head to aid and advise the President, who shall act in accordance with such advice. The 42nd CAA (1976) made advice binding; 44th CAA (1978) gave President power to return advice once for reconsideration, but post-reconsideration advice is strictly binding.</li>
                <li><strong class="t-hi">Judicial Immunity (Art. 74(2)):</strong> Nature of advice tendered by Ministers to the President cannot be inquired into by any court.</li>
                <li><strong class="t-hi">Appointment (Art. 75(1)):</strong> PM appointed by President; other Ministers appointed by President on advice of PM.</li>
                <li><strong class="t-hi">Collective Responsibility (Art. 75(3)):</strong> The Council of Ministers is collectively responsible to the <strong class="t-hi">Lok Sabha (House of the People)</strong>, not to Parliament as a whole.</li>
                <li><strong class="t-hi">Individual Responsibility (Art. 75(2)):</strong> Ministers hold office during the pleasure of the President.</li>
                <li><strong class="t-hi">Size Ceiling (91st CAA 2003):</strong> Total Ministers including PM shall not exceed <strong class="t-hi">15%</strong> of total Lok Sabha strength.</li>
                <li><strong class="t-hi">Non-Member Minister (Art. 75(5)):</strong> A Minister who is not a member of either House for 6 consecutive months ceases to be a Minister.</li>
                <li><strong class="t-hi">Duties of PM (Art. 78):</strong> Constitutional obligation to communicate all Cabinet decisions, legislative proposals, and administrative information to the President.</li>
              </ul>
            </div>

            <!-- Attorney General for India -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-purple-600 dark:text-purple-400">Chief Legal Advisor · Articles 76, 88</span>
                <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Highest Law Officer</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Attorney General for India</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Appointment &amp; Tenure (Art. 76):</strong> Appointed by President; must be qualified to be appointed a Judge of the Supreme Court. Holds office during the <strong class="t-hi">pleasure of the President</strong> with no fixed constitutional tenure or remuneration.</li>
                <li><strong class="t-hi">Audience Rights (Art. 76(3)):</strong> Right of audience in all courts in the territory of India.</li>
                <li><strong class="t-hi">Parliamentary Privileges (Art. 88):</strong> Has the right to speak in and participate in proceedings of either House, joint sittings, and any parliamentary committee whereof he is named a member, but <strong class="t-hi">WITHOUT THE RIGHT TO VOTE</strong>.</li>
                <li><strong class="t-hi">Limitations:</strong> Does not hold a full-time government post; not debarred from private legal practice, but cannot advise or hold brief against the Government of India or defend accused persons in criminal prosecutions without permission.</li>
              </ul>
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

          <p class="text-sm leading-relaxed t-mid mb-6">
            Under Article 79, the Parliament of India consists of three constituent elements: the <strong class="t-hi">President</strong>, the <strong class="t-hi">Council of States (Rajya Sabha)</strong>, and the <strong class="t-hi">House of the People (Lok Sabha)</strong>. Though the President is an integral component of Parliament without whose assent no bill can become law, the President is not a member of either House.
          </p>

          <!-- Houses Side-by-Side Architectural Panels -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Rajya Sabha -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Upper House · Article 80</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Max 250 Members</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Rajya Sabha (Council of States)</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Constitutional Maximum:</strong> 250 members: up to 238 representing States and Union Territories, plus <strong class="t-hi">12 nominated by the President</strong>.</li>
                <li><strong class="t-hi">Nomination Criteria (Art. 80(3)):</strong> Special knowledge or practical experience in <strong class="t-hi">Literature, Science, Art, and Social Service</strong> (tested in PYQ-0998, PYQ-1182, PYQ-0313).</li>
                <li><strong class="t-hi">Mode of Election:</strong> Indirect election by elected members of State Legislative Assemblies (MLAs) using proportional representation with the single transferable vote (STV).</li>
                <li><strong class="t-hi">Tenure &amp; Dissolution (Art. 83(1)):</strong> Permanent body; NEVER subject to dissolution. Members serve 6-year terms; <strong class="t-hi">one-third retire every second year</strong>.</li>
                <li><strong class="t-hi">Minimum Age (Art. 84):</strong> 30 years.</li>
                <li><strong class="t-hi">Special Federal Powers:</strong>
                  <ul class="list-circle pl-4 mt-1 space-y-1">
                    <li><strong class="t-hi">Article 249:</strong> Resolution passed by 2/3rd present and voting empowers Parliament to legislate on State List matters in national interest for 1 year (PYQ-0164).</li>
                    <li><strong class="t-hi">Article 312:</strong> Resolution passed by 2/3rd present and voting authorizes creation of new All-India Services.</li>
                    <li><strong class="t-hi">Article 67(b):</strong> Vice-President removal resolution can originate ONLY in Rajya Sabha.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <!-- Lok Sabha -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Lower House · Article 81</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Ceiling 550 / Actual 543</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Lok Sabha (House of the People)</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Constitutional Maximum:</strong> 552 as originally enacted (530 States + 20 UTs + 2 Anglo-Indian nominees under Art. 331; tested in PYQ-1077).</li>
                <li><strong class="t-hi">104th CAA (2019) Impact:</strong> Discontinued Anglo-Indian presidential nomination from Jan 2020. Constitutional ceiling is now <strong class="t-hi">550</strong>. Actual sitting strength is <strong class="t-hi">543</strong> (524 States + 19 UTs).</li>
                <li><strong class="t-hi">Mode of Election:</strong> Direct election by adult suffrage (18+ years per 61st CAA 1988) from territorial constituencies.</li>
                <li><strong class="t-hi">Tenure &amp; Dissolution (Art. 83(2)):</strong> 5 years from date of first sitting unless dissolved earlier by the President. During a National Emergency, term can be extended by Parliament by law for <strong class="t-hi">one year at a time</strong>.</li>
                <li><strong class="t-hi">Minimum Age (Art. 84):</strong> 25 years.</li>
                <li><strong class="t-hi">Exclusive Powers:</strong> Money Bills originate ONLY here (Art. 109); Council of Ministers is collectively responsible ONLY to Lok Sabha (Art. 75(3)); Demands for Grants are voted ONLY by Lok Sabha (Art. 113).</li>
              </ul>
            </div>
          </div>

          <!-- State Representation Quotas & Constituency Extremes Panel -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-map-pin" class="h-4 w-4 text-saffron-500" />
              State Seat Allocations &amp; Constituency Extremes (TGPRB Tested Facts)
            </h3>
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
                <p class="t-lo mt-0.5">Highest representation in both Houses based on population.</p>
              </div>
            </div>

            <!-- Extremes Callouts -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold text-amber-600 dark:text-amber-400">Largest Constituency by Electors (PYQ-0326)</p>
                  <p class="t-mid mt-0.5"><strong class="t-hi">Malkajgiri (Telangana)</strong> is the largest Lok Sabha constituency in India by number of voters (~31.5+ lakh electors).</p>
                </div>
              </div>
              <div class="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
                <UIcon name="i-heroicons-user-minus" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">Smallest Constituency by Electors (PYQ-0191)</p>
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

          <p class="text-sm leading-relaxed t-mid mb-6">
            The Presiding Officers maintain order, conduct legislative proceedings, regulate debate, and protect parliamentary privileges. Each House has its own designated presiding officers with specific constitutional roles and voting powers.
          </p>

          <!-- Presiding Officers Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Speaker of Lok Sabha -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Lok Sabha Head · Article 93</span>
                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Elected Member</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Speaker of the Lok Sabha</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Election &amp; Tenure:</strong> Elected by Lok Sabha members from among themselves by simple majority. Date of election fixed by the President. Holds office until immediately before the first meeting of the new Lok Sabha after dissolution.</li>
                <li><strong class="t-hi">Resignation (Art. 94(b)):</strong> The Speaker submits resignation to the <strong class="t-hi">Deputy Speaker</strong>. The Deputy Speaker submits resignation to the <strong class="t-hi">Speaker</strong>. (NEVER to the President!).</li>
                <li><strong class="t-hi">Casting Vote (Art. 100(1)):</strong> Does not vote in the first instance; votes <strong class="t-hi">ONLY in the case of an equality of votes (tie)</strong> (tested in PYQ-0519).</li>
                <li><strong class="t-hi">Money Bill Decider (Art. 110(3)):</strong> The decision of the Speaker on whether a bill is a Money Bill or not is <strong class="t-hi">FINAL</strong> and cannot be questioned in court.</li>
                <li><strong class="t-hi">Joint Sitting Precedence (Art. 118(4)):</strong> Presides over joint sittings of both Houses.</li>
                <li><strong class="t-hi">Removal Consideration (Art. 96):</strong> When a resolution for removal is under consideration, Speaker cannot preside, but has the right to speak, take part, and <strong class="t-hi">vote in the first instance</strong>, but NOT a casting vote.</li>
                <li><strong class="t-hi">Disqualification Arbiter (10th Schedule):</strong> Decides questions of disqualification of MPs on grounds of defection (subject to judicial review per Kihoto Hollohan 1992).</li>
              </ul>
            </div>

            <!-- Deputy Speaker & Chairman -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Articles 89, 93</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Chairs &amp; Conventions</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Deputy Speaker &amp; Rajya Sabha Chairman</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Deputy Speaker Election:</strong> Elected by the Lok Sabha from among its members (date fixed by Speaker; PYQ-0309). Not subordinate to Speaker; holds an independent constitutional office.</li>
                <li><strong class="t-hi">11th Lok Sabha Convention (1996):</strong> Since the 11th Lok Sabha, consensus convention dictates that the Speaker comes from the ruling party and the <strong class="t-hi">Deputy Speaker comes from the main Opposition party</strong> (PYQ-0754).</li>
                <li><strong class="t-hi">Rajya Sabha Chairman (Art. 89):</strong> Vice-President is ex-officio Chairman. Not an elected member of the House. Can vote only in case of a tie. When removal resolution is under consideration (Art. 92), cannot preside and cannot even vote in the first instance.</li>
                <li><strong class="t-hi">Rajya Sabha Deputy Chairman:</strong> Elected by Rajya Sabha members from among themselves. Presides in Chairman's absence. Submits resignation to the Chairman.</li>
                <li><strong class="t-hi">Pro-tem Speaker (Art. 95(1)):</strong> Appointed by President (senior-most member by convention) to administer oath to new MPs under Article 99 until regular Speaker is elected.</li>
                <li><strong class="t-hi">Leader of Opposition (LoP):</strong> Statutory post under 1977 Act (requires 10% seats). <strong class="t-hi">NOT appointed by Speaker</strong> (tested in PYQ-0314).</li>
              </ul>
            </div>
          </div>

          <!-- Joint Sitting Precedence Order Panel -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" class="h-4 w-4 text-rose-500" />
              Joint Sitting Presiding Hierarchy (Article 118(4) &amp; High-Frequency Trap)
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              A joint sitting under Article 108 is summoned by the President to resolve legislative deadlock between Houses. The order of presiding is strictly laid down in the Rules of Procedure:
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
                <p class="t-lo text-[11px] mt-0.5">Presides in absence of Speaker.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-sky-500 font-bold">3rd in Order</span>
                <p class="font-bold t-hi mt-1">Deputy Chairman of Rajya Sabha</p>
                <p class="t-lo text-[11px] mt-0.5">Presides if both LS officers absent.</p>
              </div>
              <div class="p-3 rounded bg-sub border b-line">
                <span class="font-mono text-purple-500 font-bold">4th in Order</span>
                <p class="font-bold t-hi mt-1">Member Chosen by Sitting</p>
                <p class="t-lo text-[11px] mt-0.5">Agreed upon by the joint house.</p>
              </div>
            </div>
            <div class="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5">
              <UIcon name="i-heroicons-x-circle" class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div class="text-xs">
                <p class="font-bold text-rose-600 dark:text-rose-400">CRITICAL EXAM TRAP (Tested in PYQ-2203):</p>
                <p class="t-mid mt-0.5">The <strong class="t-hi">Chairman of the Rajya Sabha (Vice-President of India) NEVER presides</strong> over a joint sitting because the Vice-President is not a member of either House of Parliament!</p>
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

          <p class="text-sm leading-relaxed t-mid mb-6">
            Parliamentary enactment differentiates sharply between Ordinary Bills, Money Bills, Financial Bills (Types I &amp; II), and Constitutional Amendment Bills. Financial primacy rests firmly with the directly elected Lok Sabha.
          </p>

          <!-- Types of Bills Comparison Table -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-document-text" class="h-4 w-4 text-emerald-500" />
              Comprehensive Legislative Typology (Ordinary vs Money vs Financial Bills)
            </h3>
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
                    <td class="py-2.5 px-3 font-semibold text-rose-600 dark:text-rose-400">14 days only; recommendations only</td>
                    <td class="py-2.5 px-3 t-mid">Can amend or reject</td>
                    <td class="py-2.5 pl-3 t-mid">Can amend or reject</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Joint Sitting (Art. 108)</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (On deadlock)</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">NO (Never applicable)</td>
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
          </div>

          <!-- Budget & Constitutional Funds -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-banknotes" class="h-4 w-4 text-amber-500" />
              Annual Financial Statement (Budget) &amp; The Three Constitutional Funds
            </h3>
            <p class="text-xs t-mid leading-relaxed mb-4">
              The term "Budget" does not appear anywhere in the Constitution; Article 112 refers to it as the <strong class="t-hi">Annual Financial Statement</strong>. All central revenues and expenditures flow through three designated constitutional funds:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Article 266(1)</span>
                <p class="text-sm font-bold t-hi mt-1">Consolidated Fund of India</p>
                <p class="t-lo mt-1 leading-relaxed">All revenues received by GoI, loans raised, and repayments. <strong class="t-hi">No money can be withdrawn without parliamentary Appropriation Act</strong> (Art. 114).</p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Article 267(1)</span>
                <p class="text-sm font-bold t-hi mt-1">Contingency Fund of India</p>
                <p class="t-lo mt-1 leading-relaxed">Imprest fund placed at the disposal of the <strong class="t-hi">President of India</strong> (administered by Finance Secretary) to meet unforeseen urgent expenses pending ex-post parliamentary sanction.</p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Article 266(2)</span>
                <p class="text-sm font-bold t-hi mt-1">Public Account of India</p>
                <p class="t-lo mt-1 leading-relaxed">Moneys received other than consolidated revenues: provident funds, small savings, judicial deposits. Operates as executive banking accounts; no parliamentary vote required.</p>
              </div>
            </div>

            <!-- Charged vs Votable Expenditure -->
            <div class="p-3 rounded-lg bg-base border b-line text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span class="font-bold text-amber-600 dark:text-amber-400">Expenditure Charged on CFI (Non-Votable):</span>
                  <p class="t-mid mt-1">Emoluments of President, Presiding Officers of LS and RS, Supreme Court Judges, CAG, debt servicing charges. <strong class="t-hi">Can be discussed in Parliament, but NEVER voted upon.</strong></p>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Expenditure Made from CFI (Votable):</span>
                  <p class="t-mid mt-1">Presented in the form of Demands for Grants to the <strong class="t-hi">Lok Sabha exclusively</strong> (Rajya Sabha has no voting power on Demands for Grants under Art. 113).</p>
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

          <p class="text-sm leading-relaxed t-mid mb-6">
            Parliament exercises day-to-day scrutiny over the executive through specific procedural devices and institutional financial committees that audit government spending and administrative policy.
          </p>

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
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-amber-600 dark:text-amber-400">Question Hour (First Hour of Sitting):</p>
                  <p class="t-mid mt-0.5">Formal device listed in the Rules of Procedure. Three question types: <strong class="t-hi">Starred (*)</strong> (oral answer, supplementary questions permitted); <strong class="t-hi">Unstarred</strong> (written answer, no supplementary questions); <strong class="t-hi">Short Notice</strong> (urgent public importance, notice less than 10 days, answered orally).</p>
                </div>
                <div class="p-2.5 rounded bg-sub border b-line">
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">Zero Hour (Starts at 12 Noon):</p>
                  <p class="t-mid mt-0.5">Informal device; <strong class="t-hi">NOT mentioned in the Rules of Procedure</strong>. An <strong class="t-hi">Indian parliamentary innovation dating back to 1962</strong>. MPs can raise matters of urgent public importance without prior 10 days notice.</p>
                </div>
              </div>
            </div>

            <!-- Key Parliamentary Motions -->
            <div class="panel p-5 bg-elev border b-line">
              <div class="flex items-center justify-between mb-2">
                <span class="chip chip-mono text-[10px] text-emerald-600 dark:text-emerald-400">Legislative Censure &amp; Control</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Lok Sabha Exclusive</span>
              </div>
              <h3 class="text-base font-bold t-hi mb-2">Key Parliamentary Motions</h3>
              <ul class="space-y-2 text-xs t-mid leading-relaxed list-disc pl-4">
                <li><strong class="t-hi">Adjournment Motion:</strong> Extraordinary motion setting aside normal business to debate a definite urgent public matter. Requires support of <strong class="t-hi">50 members</strong> to admit. Lok Sabha only; involves censure of government.</li>
                <li><strong class="t-hi">No-Confidence Motion:</strong> Governed by Rule 198 of Lok Sabha Rules (rooted in Art. 75(3)). Supported by <strong class="t-hi">50 members</strong>. No specific reasons required. If passed, the entire Council of Ministers MUST resign.</li>
                <li><strong class="t-hi">Censure Motion:</strong> Moved against a specific Minister or Council for specific policies. If passed, government does not have to resign, but must demonstrate majority on the floor.</li>
                <li><strong class="t-hi">Calling Attention Motion:</strong> Indian innovation from 1954; listed in Rules; calls Minister's attention to an urgent matter for official statement.</li>
                <li><strong class="t-hi">Guillotine:</strong> Parliamentary guillotine puts all outstanding Demands for Grants to vote together without further debate on the final allotted day.</li>
              </ul>
            </div>
          </div>

          <!-- Cut Motions Panel -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scissors" class="h-4 w-4 text-amber-500" />
              The Three Budget Cut Motions (Lok Sabha Only)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-rose-600 dark:text-rose-400">Policy Disapproval</span>
                <p class="text-sm font-bold t-hi mt-1">Policy Cut Motion</p>
                <p class="t-lo mt-1 leading-relaxed">Form: <strong class="t-hi">"That the amount of the demand be reduced to Re 1."</strong> Represents complete disapproval of the underlying policy. If passed, amounts to a vote of no confidence.</p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-amber-600 dark:text-amber-400">Financial Economy</span>
                <p class="text-sm font-bold t-hi mt-1">Economy Cut Motion</p>
                <p class="t-lo mt-1 leading-relaxed">Form: <strong class="t-hi">"That the amount of the demand be reduced by a specified amount"</strong> (e.g., reduced by Rs 1 crore). Indicates that economy can be effected without impairing policy efficiency.</p>
              </div>
              <div class="p-3.5 rounded bg-sub border b-line">
                <span class="chip chip-mono text-[10px] text-sky-600 dark:text-sky-400">Specific Grievance</span>
                <p class="text-sm font-bold t-hi mt-1">Token Cut Motion</p>
                <p class="t-lo mt-1 leading-relaxed">Form: <strong class="t-hi">"That the amount of the demand be reduced by Rs 100."</strong> Ventilates a specific grievance that lies within the sphere of responsibility of GoI.</p>
              </div>
            </div>
          </div>

          <!-- The Three Standing Financial Committees Comparison -->
          <div class="panel p-5 bg-elev border b-line mb-6">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-chart-pie" class="h-4 w-4 text-emerald-500" />
              The Three Standing Financial Committees (High-Yield Contrast Table)
            </h3>
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
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">30 members (ALL from Lok Sabha; NO Rajya Sabha)</td>
                    <td class="py-2.5 px-3 t-mid">1950, on recommendation of Finance Minister John Mathai</td>
                    <td class="py-2.5 px-3 t-mid">Appointed by Speaker from the <strong class="t-hi">ruling party</strong></td>
                    <td class="py-2.5 pl-3 t-lo">Examines budget estimates; suggests economies in expenditure; nicknamed "continuous economy committee".</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-emerald-600 dark:text-emerald-400">Public Accounts Committee (PAC)</td>
                    <td class="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">22 members (15 Lok Sabha + 7 Rajya Sabha)</td>
                    <td class="py-2.5 px-3 t-mid">Set up in 1921 under Government of India Act 1919</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">Appointed by Speaker from the <strong class="t-hi">Opposition</strong> (convention since 1967)</td>
                    <td class="py-2.5 pl-3 t-lo">Examines annual audit reports of the Comptroller &amp; Auditor General (CAG); hunts waste, corruption, and misuse.</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-bold text-sky-600 dark:text-sky-400">Committee on Public Undertakings (CoPU)</td>
                    <td class="py-2.5 px-3 font-semibold text-sky-600 dark:text-sky-400">22 members (15 Lok Sabha + 7 Rajya Sabha)</td>
                    <td class="py-2.5 px-3 t-mid">Created 1964 on Krishna Menon Committee recommendation</td>
                    <td class="py-2.5 px-3 t-mid">Appointed by Speaker from Lok Sabha members only</td>
                    <td class="py-2.5 pl-3 t-lo">Examines reports and accounts of Public Sector Undertakings (PSUs) and relevant CAG audit findings.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-xs t-lo mt-3">
              Common Rule: Members of all three financial committees are elected annually by proportional representation using single transferable vote (STV). <strong class="t-hi">A Minister cannot be elected to any of these committees.</strong>
            </p>
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

          <p class="text-sm leading-relaxed t-mid mb-6">
            The Indian Constitution establishes a dual polity with structural parallels between the Union and State levels, yet with vital asymmetric distinctions in executive discretion, pardoning powers, ordinance scope, and legislative council checks.
          </p>

          <!-- Table 1: President vs Governor Comparison Matrix -->
          <div class="panel p-5 bg-elev border b-line mb-8">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-scale" class="h-4 w-4 text-amber-500" />
              President of India vs Governor of a State : Forensic Comparison Matrix
            </h3>
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
                    <td class="py-2.5 px-3 t-mid">Article 52 : Head of State &amp; First Citizen</td>
                    <td class="py-2.5 pl-3 t-mid">Article 153 : Constitutional Head of State</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Selection Mode</td>
                    <td class="py-2.5 px-3 t-mid">Elected by Electoral College (Art. 54) via PR-STV</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-semibold">Appointed by President under hand and seal (Art. 155)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Tenure &amp; Removal</td>
                    <td class="py-2.5 px-3 t-mid">5 years; removed ONLY by parliamentary impeachment for "Violation of Constitution" (Art. 61)</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-semibold">Holds office during <strong class="t-hi">pleasure of the President</strong> (Art. 156(1)); no impeachment required</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Pardoning Powers</td>
                    <td class="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">
                      <strong class="t-hi">Article 72:</strong> Can pardon, reprieve, respite, remit, or commute:
                      <ul class="list-disc pl-4 mt-1 font-normal text-xs text-amber-700 dark:text-amber-300">
                        <li>All Court Martial (military court) sentences</li>
                        <li>All offenses against Union laws</li>
                        <li><strong class="t-hi">Can pardon ALL death sentences</strong></li>
                      </ul>
                    </td>
                    <td class="py-2.5 pl-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      <strong class="t-hi">Article 161:</strong> Can suspend, remit, or commute offenses against State laws:
                      <ul class="list-disc pl-4 mt-1 font-normal text-xs text-emerald-700 dark:text-emerald-300">
                        <li>NO power over Court Martial sentences</li>
                        <li><strong class="t-hi">CANNOT PARDON A DEATH SENTENCE</strong> (can only suspend, remit or commute)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Ordinance-Making Power</td>
                    <td class="py-2.5 px-3 t-mid">
                      <strong class="t-hi">Article 123:</strong> Promulgated during recess of Parliament. Valid for max 6 months + 6 weeks.
                    </td>
                    <td class="py-2.5 pl-3 t-mid">
                      <strong class="t-hi">Article 213:</strong> Promulgated during recess of State Legislature. Cannot promulgate without presidential instruction on certain subjects.
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Constitutional Discretion</td>
                    <td class="py-2.5 px-3 text-amber-600 dark:text-amber-400 font-semibold">
                      <strong class="t-hi">NO explicit constitutional discretion.</strong> Bound strictly by Article 74(1) aid and advice (Shamsher Singh 1974).
                    </td>
                    <td class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <strong class="t-hi">EXPLICIT constitutional discretion under Article 163(1) &amp; 163(2).</strong> Governor's decision on what is discretionary is final.
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Veto Powers over Bills</td>
                    <td class="py-2.5 px-3 t-mid">
                      <strong class="t-hi">Article 111:</strong> Assent, Withhold assent, or Return ordinary bill once for reconsideration.
                    </td>
                    <td class="py-2.5 pl-3 t-mid">
                      <strong class="t-hi">Article 200:</strong> Assent, Withhold assent, Return bill once, or <strong class="t-hi">Reserve bill for the consideration of the President</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Bill Passed Again upon Reconsideration</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      President <strong class="t-hi">MUST give assent</strong> under Article 111 (Suspensive veto overridden).
                    </td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-bold">
                      Under <strong class="t-hi">Article 201</strong>, if State Legislature passes reserved bill again, President is <strong class="t-hi">STILL NOT BOUND</strong> to give assent!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Table 2: Parliament vs State Legislature Comparison Matrix -->
          <div class="panel p-5 bg-elev border b-line">
            <h3 class="text-sm font-bold t-hi mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-building-library" class="h-4 w-4 text-emerald-500" />
              Parliament vs State Legislature : Institutional Comparison Matrix
            </h3>
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
                    <td class="py-2.5 px-3 t-mid"><strong class="t-hi">Mandatory Bicameral</strong> (Art. 79: President + Rajya Sabha + Lok Sabha)</td>
                    <td class="py-2.5 pl-3 t-mid"><strong class="t-hi">Unicameral or Bicameral</strong> (Art. 168: Governor + SLA [and SLC in only 6 States: UP, Bihar, Maharashtra, Karnataka, AP, Telangana])</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Creation / Abolition of Upper House</td>
                    <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-semibold">NOT possible (Rajya Sabha is an indestructible federal pillar)</td>
                    <td class="py-2.5 pl-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <strong class="t-hi">Article 169:</strong> State Assembly passes resolution by special majority; Parliament enacts by ordinary law (simple majority).
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Upper House Power on Ordinary Bills</td>
                    <td class="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">
                      Rajya Sabha has <strong class="t-hi">equal power</strong> to amend or reject; deadlock leads to Joint Sitting (Art. 108).
                    </td>
                    <td class="py-2.5 pl-3 font-semibold text-rose-600 dark:text-rose-400">
                      Legislative Council is a <strong class="t-hi">dilatory chamber only</strong>; can delay for maximum <strong class="t-hi">4 months</strong> (3 months 1st time + 1 month 2nd time); Assembly overrides!
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Joint Sitting Mechanism</td>
                    <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">YES : Article 108 (President summons, Speaker presides)</td>
                    <td class="py-2.5 pl-3 text-rose-600 dark:text-rose-400 font-bold">NO : There is NO provision for a joint sitting in State Legislatures!</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Money Bills (Upper House Window)</td>
                    <td class="py-2.5 px-3 t-mid">Rajya Sabha limited to <strong class="t-hi">14 days</strong>; recommendations only (Art. 109)</td>
                    <td class="py-2.5 pl-3 t-mid">Legislative Council limited to <strong class="t-hi">14 days</strong>; recommendations only (Art. 198)</td>
                  </tr>
                  <tr>
                    <td class="py-2.5 pr-4 font-semibold t-hi">Minimum Age for Membership</td>
                    <td class="py-2.5 px-3 t-mid">Lok Sabha: 25 years · Rajya Sabha: 30 years (Art. 84)</td>
                    <td class="py-2.5 pl-3 t-mid">Legislative Assembly: 25 years · Legislative Council: 30 years (Art. 173)</td>
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
