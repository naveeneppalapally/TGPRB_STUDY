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
          <span class="t-lo">Telangana</span>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
          <span class="t-mid">Statehood Movement</span>
        </nav>

        <!-- Title block -->
        <header class="mb-8 border-b b-line pb-7">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="chip chip-saffron"><span class="dot" />T1 · High priority</span>
            <span class="chip font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30">🎯 Projected 2026: 5-8 Questions (5-8 Marks)</span>
            <span class="chip">42 verified PYQs</span>
            <span class="chip">Telangana Movement</span>
          </div>
          <h1 class="font-display text-[30px] font-bold leading-[1.1] tracking-tight t-hi sm:text-[40px]">
            Telangana Armed Struggle &amp; Statehood Movement
          </h1>
          <p class="mt-3 max-w-xl text-body leading-relaxed t-mid">
            1946 Peasant Struggle to 2014 Formation: Exhaustive Phase-by-Phase Master Note covering Armed Struggle, Mulki Rules, Gentlemen's Agreement, 1969 Jai Telangana, G.O. 610, Girglani Commission, Srikrishna Committee, and AP Reorganisation Act.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-queue-list" class="h-3.5 w-3.5" />9 sections
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-3.5 w-3.5" />42 verified PYQs
            </span>
            <span class="flex items-center gap-1.5 text-body-xs t-lo">
              <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5" />~28 min read
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
              <span class="num font-mono">{ String(i + 1).padStart(2, '0') }</span>
              { c.label }
            </span>
          </div>
          <p class="mt-2.5 text-body-xs t-lo">
            Cover all six dimensions to master every exam question asked on the Telangana Armed Struggle and Statehood Movement.
          </p>

          <!-- 2026 Predicted Question Patterns Callout -->
          <div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Predicted 2026 Question Patterns</p>
              <p class="mt-1 text-[13px] leading-relaxed t-mid">
                <strong class="t-hi">Primary Format:</strong> Chronological Sequencing of agitations (Million March ➔ Sakala Janula Samme ➔ Sagaraharam ➔ Sadak Bandh) and <strong class="t-hi">Committee / Accord Pairing</strong> (Gentlemen's Agreement, 8-Point, 5-Point, 6-Point Formula, Srikrishna Committee recommendations).
              </p>
            </div>
          </div>
        </section>

        <!-- ── 01 · Armed Struggle & Operation Polo ─────────────────────── -->
        <section id="armed-struggle" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">01</span>
            <h2 class="sec-title">Telangana Armed Struggle (1946-1951) &amp; Operation Polo (1948)</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="armed-struggle" section-label="Telangana Armed Struggle (1946-1951) & Operation Polo (1948)" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Peasant Uprising · Police Action</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="armed-struggle" section-label="Telangana Armed Struggle (1946-1951) & Operation Polo (1948)" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

          <!-- Movement Visual Component -->
          <MovementTimeline mode="telangana" class="mb-10" />

          <div class="space-y-4 text-body leading-relaxed t-mid">
            <p>
              The Telangana Peasant Armed Struggle (1946-1951) was an anti-feudal and anti-Nizam armed uprising spearheaded by the Andhra Maha Sabha (AMS) and the Communist Party of India (CPI). It targeted oppressive land systems such as <em class="accent font-normal">Vetti</em> (forced uncompensated labor), <em class="accent font-normal">Jagirdari</em> exploitation, and feudal landlords (<em class="accent font-normal">Doras</em>).
            </p>

            <!-- Key Leaders Table -->
            <div class="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-slate-50 dark:bg-slate-900 accent font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Leader / Revolutionary</th>
                    <th class="p-3">Community / Region</th>
                    <th class="p-3">Historical Significance &amp; Specific Oppressor Resisted</th>
                    <th class="p-3">PYQ Reference</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Chityala Ailamma (Chakali Ilamma)</td>
                    <td class="p-3">Palakurthi, Jangaon</td>
                    <td class="p-3">Symbol of peasant armed struggle. Resisted land grabbing by feudal landlord <strong class="text-slate-900 dark:text-slate-100">Visnuru Ramachandra Reddy</strong> (Visnuru Dora). Her resistance sparked the rural uprising in 1946.</td>
                    <td class="p-3 font-mono text-xs accent font-semibold">[PYQ-0589]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Bhukya Balya</td>
                    <td class="p-3">Lambada Community</td>
                    <td class="p-3">Prominent tribal/Lambada leader who led fierce resistance against Visnuru Dora's forced labor (vetti) and illegal land grabs.</td>
                    <td class="p-3 font-mono text-xs accent font-semibold">[PYQ-0145]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Doddi Komarayya</td>
                    <td class="p-3">Kadavendi village</td>
                    <td class="p-3">Martyred on July 4, 1946 when Visnuru Dora's armed goons opened fire. His martyrdom triggered the full-blown armed struggle.</td>
                    <td class="p-3 font-mono text-xs t-lo">High-Yield Fact</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Konda Venkat Ranga Reddy</td>
                    <td class="p-3">Hyderabad Congress</td>
                    <td class="p-3"><strong class="text-rose-600 dark:text-rose-400">NOT associated with Communist Armed Struggle.</strong> He was an Indian National Congress leader and former Deputy CM of AP.</td>
                    <td class="p-3 font-mono text-xs accent font-semibold">[PYQ-0608]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Operation Polo Sub-section -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              Operation Polo (Police Action · September 1948)
            </h3>
            <p>
              When Nizam VII (Mir Osman Ali Khan) refused to accede to the Indian Union and encouraged Kasim Razvi's paramilitary <em class="accent font-normal">Razakars</em>, the Union Government launched a military action codenamed <strong>Operation Polo</strong> (popularly known as Police Action).
            </p>

            <!-- Facts Box: Operation Polo Officers -->
            <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 my-4 text-xs sm:text-sm">
              <div class="font-bold text-emerald-900 dark:text-emerald-300 text-base mb-2 flex items-center gap-2">
                <span>🛡️ Key Commanders of Operation Polo (Crucial Exam Matches)</span>
              </div>
              <ul class="space-y-2 list-disc list-inside">
                <li>
                  <strong class="text-slate-900 dark:text-slate-100">Military Plan Architect:</strong> Lieutenant General <strong>Eric Goddard</strong> (GOC-in-C, Southern Command prepared the operational plan). <span class="font-mono text-emerald-600 dark:text-emerald-400 text-xs">[PYQ-0144]</span>
                </li>
                <li>
                  <strong class="text-slate-900 dark:text-slate-100">GOC-in-C Southern Command during Action:</strong> Lieutenant General <strong>Rajendrasinhji Jadeja</strong> (Lt. Gen. Rajendra Singh). <span class="font-mono text-emerald-600 dark:text-emerald-400 text-xs">[PYQ-0604]</span>
                </li>
                <li>
                  <strong class="text-slate-900 dark:text-slate-100">Field Commander (Striking Force):</strong> Major General <strong>J.N. Chaudhuri</strong> (led the entry into Hyderabad and served as Military Governor 1948-1949).
                </li>
                <li>
                  <strong class="text-slate-900 dark:text-slate-100">Commander-in-Chief of Nizam's Army:</strong> Major General <strong>Syed Ahmed El Edroos</strong> (surrendered to Indian Army on September 17, 1948). <span class="font-mono text-emerald-600 dark:text-emerald-400 text-xs">[PYQ-0607]</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── 02 · 1952 Mulki Agitation & Gentlemen's Agreement ────────── -->
        <section id="mulki-movement" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">02</span>
            <h2 class="sec-title">1952 Mulki Agitation &amp; Gentlemen's Agreement (1956)</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="mulki-movement" section-label="1952 Mulki Agitation & Gentlemen's Agreement (1956)" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">City College Firing · 8 Signatories</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="mulki-movement" section-label="1952 Mulki Agitation & Gentlemen's Agreement (1956)" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

          <div class="space-y-4 text-body leading-relaxed t-mid">
            <p>
              The origin of safeguards for locals traces back to Nizam rules. In <strong>1868</strong>, Prime Minister <strong>Salar Jung I</strong> issued an administrative order directing that local Mulkis must be given priority in civil services due to growing discontent over non-mulkis (Afaghis/Ghars) occupying top administrative posts <span class="font-mono accent text-xs">[PYQ-0392]</span>.
            </p>

            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1952 Mulki Agitation &amp; Police Firing</h3>
            <p>
              After Hyderabad State was integrated, non-mulki personnel were recruited in large numbers into schools and government departments, violating local domicile rights (15-year residence rule).
            </p>

            <!-- Warning Callout Box -->
            <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 my-4 text-xs sm:text-sm">
              <div class="font-bold text-amber-800 dark:text-amber-400 text-base mb-1 flex items-center gap-2">
                <span>⚠️ Important Inquiry Commission: Justice Jaganmohan Reddy Commission</span>
              </div>
              <p>
                On September 3 and 4, 1952, police fired upon protesting students at <strong>City College, Hyderabad</strong>, killing several students. Chief Minister <strong>Burgula Ramakrishna Rao</strong> appointed the <strong>Justice Jaganmohan Reddy Commission</strong> to investigate the firing incident and student grievances. <span class="font-mono accent text-xs">[PYQ-0147]</span>
              </p>
            </div>

            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">The Gentlemen's Agreement (February 20, 1956)</h3>
            <p>
              To merge Telangana with Andhra State and create Andhra Pradesh, leaders signed the Gentlemen's Agreement at Hyderabad House, New Delhi on February 20, 1956.
            </p>

            <!-- Table of Gentlemen's Agreement Signatories -->
            <div class="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-slate-50 dark:bg-slate-900 accent font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Region</th>
                    <th class="p-3">4 Key Signatories</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold accent">Telangana Region (4)</td>
                    <td class="p-3">Burgula Ramakrishna Rao (CM), K.V. Ranga Reddy, Marri Chenna Reddy, J.V. Narsing Rao</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-sky-600 dark:text-sky-400">Andhra Region (4)</td>
                    <td class="p-3">B. Gopala Reddy (CM), Neelam Sanjiva Reddy, Gouthu Latchanna, Alluri Satyanarayana Raju</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- TRC Note -->
            <div class="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-sm">
              <strong class="text-slate-900 dark:text-slate-100 block mb-1">Telangana Regional Committee (TRC):</strong>
              As stipulated in the Gentlemen's Agreement, the Statutory TRC was created under Article 371(1). <strong class="accent">K. Achyutha Reddy</strong> served as the first Chairman/President of the Telangana Regional Committee. <span class="font-mono accent text-xs">[PYQ-0384]</span>
            </div>
          </div>
        </section>

        <!-- ── 03 · 1969 Jai Telangana Movement & Formulas ──────────────── -->
        <section id="1969-movement" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">03</span>
            <h2 class="sec-title">1969 Jai Telangana Movement &amp; Subsequent Accords</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="1969-movement" section-label="1969 Jai Telangana Movement & Subsequent Accords" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">TPS · 8-Point &amp; 6-Point Formulas</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="1969-movement" section-label="1969 Jai Telangana Movement & Subsequent Accords" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

          <div class="space-y-4 text-body leading-relaxed t-mid">
            <p>
              Widespread violations of the Gentlemen's Agreement, revenue surplus diversion, and illegal recruitment of non-mulkis triggered the historic 1969 agitation.
            </p>

            <!-- Key Trigger Fact -->
            <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 my-4 text-xs sm:text-sm">
              <strong class="text-emerald-900 dark:text-emerald-400 block mb-1">The Spark: Annabathula Ravindranath's Fast</strong>
              On <strong>January 8, 1969</strong>, Annabathula Ravindranath, a B.A. student from Khammam Arts College, began an indefinite fast demanding implementation of Telangana safeguards and Mulki rules. This ignited student protests across Osmania University and the entire state. <span class="font-mono text-emerald-600 dark:text-emerald-400 text-xs">[PYQ-0148]</span>
            </div>

            <!-- Chronology Table of Formulas & Orders -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">Chronological Sequence of Political Settlement Formulas</h3>
            
            <div class="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-slate-50 dark:bg-slate-900 accent font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Order</th>
                    <th class="p-3">Formula / Settlement</th>
                    <th class="p-3">Date / Year</th>
                    <th class="p-3">Prime Minister / Context</th>
                    <th class="p-3">PYQ Reference</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">1</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Eight Point Formula</td>
                    <td class="p-3">April 11, 1969</td>
                    <td class="p-3">PM Indira Gandhi in Lok Sabha</td>
                    <td class="p-3 font-mono text-xs accent" rowspan="4">[PYQ-0149]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">2</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Five Point Formula</td>
                    <td class="p-3">November 27, 1972</td>
                    <td class="p-3">PM Indira Gandhi (Post Mulki Rules SC judgment)</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">3</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Six Point Formula</td>
                    <td class="p-3">September 21, 1973</td>
                    <td class="p-3">Bilateral accord ending Jai Andhra &amp; Jai Telangana agitations</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">4</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">The Presidential Order</td>
                    <td class="p-3">October 20, 1975</td>
                    <td class="p-3">Issued under Art. 371-D (32nd Constitutional Amendment)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Committees Table -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">Key High-Yield Committees &amp; Commissions</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span class="accent font-bold block mb-1">Justice K.N. Wanchoo Committee (1969)</span>
                <p class="text-slate-600 dark:text-slate-300">
                  Appointed by Central Government in April 1969 to recommend constitutional amendments necessary for continuing Mulki rules in recruitment after Supreme Court struck down Section 3 of Public Employment Act 1957. <span class="font-mono accent text-xs">[PYQ-0610]</span>
                </p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span class="accent font-bold block mb-1">J.M. Girglani One-Man Commission (2001)</span>
                <p class="text-slate-600 dark:text-slate-300">
                  Appointed in June 2001 by CM N. Chandrababu Naidu to examine the total non-implementation and widespread circumvention of G.O. 610 (which directed repatriation of non-local employees from Zone V and VI). <span class="font-mono accent text-xs">[PYQ-0609]</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 04 · G.O. 610, Girglani Commission & 1990s Resurgence ────── -->
        <section id="go610-girglani" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">04</span>
            <h2 class="sec-title">G.O. 610, Girglani Commission &amp; 1990s Resurgence</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="go610-girglani" section-label="G.O. 610, Girglani Commission & 1990s Resurgence" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Presidential Order 1975 · Intellectual Forums</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="go610-girglani" section-label="G.O. 610, Girglani Commission & 1990s Resurgence" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

          <div class="space-y-4 text-body leading-relaxed t-mid">
            <p>
              During the 1980s and 1990s, when political parties ignored statehood, civil society groups, intellectuals, and cultural organizations revived the movement through literature, songs, and public forums.
            </p>

            <!-- Match Organization High-Yield Table -->
            <div class="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-slate-50 dark:bg-slate-900 accent font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Organization / Trust</th>
                    <th class="p-3">Founding Year</th>
                    <th class="p-3">Key Founder / Associated Personality</th>
                    <th class="p-3">PYQ Match Anchors</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Information Trust</td>
                    <td class="p-3 font-mono accent">1986 / 1989</td>
                    <td class="p-3">Telangana Prabhakar / Prabhakar Rao</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0150, PYQ-0390, PYQ-0408]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Students Forum</td>
                    <td class="p-3 font-mono accent">1991</td>
                    <td class="p-3">Osmania University Student Activists</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0150]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Ikya Vedica</td>
                    <td class="p-3 font-mono accent">1997</td>
                    <td class="p-3">Prof. Jayashankar, Prof. Keshav Rao Jadhav</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0150]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Janasabha</td>
                    <td class="p-3 font-mono accent">1998</td>
                    <td class="p-3">Akula Bhoomaiah</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0150]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Students Liberation Org (TSLO)</td>
                    <td class="p-3 font-mono accent">1990s</td>
                    <td class="p-3">K. Manohar Reddy</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0390, PYQ-0408]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Centre for Dalit Studies</td>
                    <td class="p-3 font-mono accent">1990s</td>
                    <td class="p-3">Mallepally Laxmaiah</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0390, PYQ-0408]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Pragativedika</td>
                    <td class="p-3 font-mono accent">1990s</td>
                    <td class="p-3">Rapolu Ananda Bhaskar</td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0390, PYQ-0408]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Golla Kuruma Hakkula Porata Samithi</td>
                    <td class="p-3 font-mono accent">1990s</td>
                    <td class="p-3">Dubbagatla Narsing Rao <span class="text-rose-600 dark:text-rose-400 font-normal">(NOT Munnuru Kapu)</span></td>
                    <td class="p-3 font-mono text-xs accent">[PYQ-0153]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ── 05 · Final Phase (2001-2014) & State Formation ───────────── -->
        <section id="final-phase" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">05</span>
            <h2 class="sec-title">Final Phase (2001-2014) &amp; Formation of Telangana</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="final-phase" section-label="Final Phase (2001-2014) & Formation of Telangana" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">Srikrishna Committee · AP Reorganisation Act</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="final-phase" section-label="Final Phase (2001-2014) & Formation of Telangana" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

          <div class="space-y-4 text-body leading-relaxed t-mid">
            <!-- Fast Unto Death & Student Role -->
            <p>
              The final mass surge began on <strong>November 29, 2009</strong>, when K. Chandrashekar Rao (KCR) declared a fast-unto-death. On November 28, 2009, police reached North Telangana Bhavan in Karimnagar to arrest KCR before he reached Siddipet <span class="font-mono accent text-xs">[PYQ-0606]</span>. Osmania and Kakatiya University students joined immediately, proving student involvement to be inseparable from the movement <span class="font-mono accent text-xs">[PYQ-0606]</span>.
            </p>

            <!-- TJAC & Srikrishna Committee -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <strong class="accent block mb-1">Telangana Joint Action Committee (TJAC)</strong>
                <p class="text-slate-600 dark:text-slate-300">
                  Formed in December 2009 with <strong>Prof. M. Kodandaram</strong> as Convener to unite political parties (TRS, CPI, BJP, CPI-ML ND) and employee/student JACs. Advocate JAC convener was <strong>Tanneru Sriranga Rao</strong> <span class="font-mono accent text-xs">[PYQ-0152, PYQ-0391]</span>.
                </p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <strong class="accent block mb-1">Justice B.N. Srikrishna Committee (2010)</strong>
                <p class="text-slate-600 dark:text-slate-300">
                  5-member committee appointed on Feb 3, 2010. Members: Justice B.N. Srikrishna (Chairman), Prof. Ranbir Singh, Dr. Abusaleh Shariff, Prof. Ravinder Kaur, Vinod K. Duggal (Member-Secretary) <span class="font-mono accent text-xs">[PYQ-0388]</span>.
                </p>
              </div>
            </div>

            <!-- Chronology of Protests Table -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">Chronology of Historic Mass Agitation Programs</h3>
            
            <div class="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-slate-50 dark:bg-slate-900 accent font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Order</th>
                    <th class="p-3">Historic Event / Program</th>
                    <th class="p-3">Exact Date / Period</th>
                    <th class="p-3">Key Detail &amp; Organizer</th>
                    <th class="p-3">PYQ Reference</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">1</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Million March</td>
                    <td class="p-3 font-mono text-xs">March 10, 2011</td>
                    <td class="p-3">Organized by TJAC on Tank Bund, Hyderabad</td>
                    <td class="p-3 font-mono text-xs accent" rowspan="4">[PYQ-0151, PYQ-0154]</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">2</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Sakala Janula Samme (All People's Strike)</td>
                    <td class="p-3 font-mono text-xs">Sep 13 - Oct 24, 2011 (42 Days)</td>
                    <td class="p-3">TJAC led strike paralysis of public services</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">3</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Telangana Sagaraharam (Human Chain around Hussain Sagar)</td>
                    <td class="p-3 font-mono text-xs">September 30, 2012</td>
                    <td class="p-3">Massive human chain around Hussain Sagar Lake</td>
                  </tr>
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td class="p-3 font-mono font-bold accent">4</td>
                    <td class="p-3 font-semibold text-slate-900 dark:text-slate-100">Sadak Bandh (National Highway 7 Blockade)</td>
                    <td class="p-3 font-mono text-xs">March 21, 2013</td>
                    <td class="p-3">Blockade of NH-7 from Shamshabad to Alampur</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Konda Laxman Bapuji Satyagraha & AP Reorganisation Bill -->
            <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 my-4 text-xs sm:text-sm">
              <strong class="text-emerald-900 dark:text-emerald-400 block mb-1">Konda Laxman Bapuji Satyagraha in Delhi (2012)</strong>
              Veteran freedom fighter and pioneer Telangana leader <strong>Konda Laxman Bapuji</strong> undertook a 7-day Satyagraha at <strong>Jantar Mantar in Delhi</strong> in 2012 to demand statehood for Telangana. <span class="font-mono text-emerald-600 dark:text-emerald-400 text-xs">[PYQ-0611]</span>
            </div>

            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">AP Reorganisation Bill 2014 Key Timeline</h3>
            <ul class="space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li>
                <strong class="text-slate-900 dark:text-slate-100">Introduction in Lok Sabha:</strong> Introduced by Home Minister <strong>Sushil Kumar Shinde</strong> on <strong>February 13, 2014</strong>. <span class="font-mono accent text-xs">[PYQ-0155]</span>
              </li>
              <li>
                <strong class="text-slate-900 dark:text-slate-100">Lok Sabha Passed:</strong> February 18, 2014
              </li>
              <li>
                <strong class="text-slate-900 dark:text-slate-100">Rajya Sabha Passed:</strong> February 20, 2014
              </li>
              <li>
                <strong class="text-slate-900 dark:text-slate-100">Presidential Assent (Pranab Mukherjee):</strong> March 1, 2014
              </li>
              <li>
                <strong class="text-slate-900 dark:text-slate-100">Appointed Day (Telangana State Formation):</strong> <strong>June 2, 2014</strong>
              </li>
            </ul>
          </div>
        </section>

        <!-- ── 06 · Previous Year Questions (Interactive 42 Cards) ───── -->
        <section id="pyqs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">06</span>
            <h2 class="sec-title">Previous Year Questions</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="pyqs" section-label="Previous Year Questions" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ filteredPyqs.length }} of {{ pyqs.length }} PYQs</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="pyqs" section-label="Previous Year Questions" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

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
                  note-id="NOTE-TEL-MOVEMENT"
                  :prompt="`Explain the historical significance and exam traps for this Telangana movement PYQ: ${q.question}`"
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
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="advanced-practice" section-label="Advanced Practice" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">{{ advancedPractice.length }} drills</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="advanced-practice" section-label="Advanced Practice" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />

          <!-- Indigo Disclaimer -->
          <div class="mb-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <p class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
              TGPSC-Style Advanced Practice
            </p>
            <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
              These questions use <strong class="t-hi">multi-statement, matching, and chronology</strong> formats
              from the TGPSC Group-I 2024 pattern. TGPRB papers (2022-2023) remain
              <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your factual memory
              for Telangana history dates, committees, and accords.
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
                  note-id="NOTE-TEL-MOVEMENT"
                  :prompt="`Explain the historical context for this TGPSC-style Telangana question and the exam trap: ${q.question}`"
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
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="gate" section-label="Comprehension Gate" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="gate" section-label="Comprehension Gate" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
          <GateQuiz note-id="NOTE-TEL-MOVEMENT" />
        </section>

        <!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
        <section id="current-affairs" class="mb-14 scroll-mt-20">
          <header class="sec-head">
            <span class="sec-num">09</span>
            <h2 class="sec-title">Current Affairs</h2>
            <SectionNotesButton note-id="NOTE-TEL-MOVEMENT" section-id="current-affairs" section-label="Current Affairs" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
            <span class="sec-rule" />
            <span class="sec-meta hidden sm:block">tagged to this topic</span>
          </header>
          <InlineNoteStrip note-id="NOTE-TEL-MOVEMENT" section-id="current-affairs" section-label="Current Affairs" note-title="Telangana Statehood Movement" @open="openNotesDrawer" />
          <CurrentAffairsStrip note-id="NOTE-TEL-MOVEMENT" />
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
            <p class="text-body-xs leading-relaxed t-lo">5-8 questions per paper, highest weight in Telangana section.</p>
          </div>
        </div>
      </aside>
    </div>

    <AiAssistantDrawer
      note-id="NOTE-TEL-MOVEMENT"
      note-title="Telangana Armed Struggle &amp; Statehood Movement"
      :quick-prompts="aiQuickPrompts"
    />
    <PersonalNotesDrawer
      ref="notesDrawerRef"
      note-id="NOTE-TEL-MOVEMENT"
      note-title="Telangana Armed Struggle &amp; Statehood Movement"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import CurrentAffairsStrip from '@/components/CurrentAffairsStrip.vue'
import MovementTimeline from '@/components/visual/MovementTimeline.vue'
import SectionNotesButton from '@/components/notes/SectionNotesButton.vue'
import InlineNoteStrip from '@/components/notes/InlineNoteStrip.vue'
import PersonalNotesDrawer from '@/components/notes/PersonalNotesDrawer.vue'
import { usePersonalNotes } from '@/composables/usePersonalNotes'
import type { SectionContext } from '@/types/annotations'

const aiQuickPrompts = useAiPromptChips('NOTE-TEL-MOVEMENT')

const notesDrawerRef = ref<InstanceType<typeof PersonalNotesDrawer> | null>(null)
const { loadNotes } = usePersonalNotes()

function openNotesDrawer(context: SectionContext) {
  notesDrawerRef.value?.openForSection(context)
}

const coverage = [
  { label: 'Chronology & Protests' },
  { label: 'Leadership Pairs' },
  { label: 'Committees & Reports' },
  { label: 'Mulki & Safeguards' },
  { label: 'Cultural Renaissance' },
  { label: '2014 Act Timeline' },
]

const sections = [
  { id: 'armed-struggle',    label: 'Armed Struggle & Operation Polo' },
  { id: 'mulki-movement',    label: '1952 Mulki & Gentlemen Accord' },
  { id: '1969-movement',     label: '1969 Jai Telangana & Accords' },
  { id: 'go610-girglani',    label: 'G.O. 610 & Intellectual Resurgence' },
  { id: 'final-phase',       label: 'Final Phase (2001-2014)' },
  { id: 'pyqs',              label: 'Previous Year Questions' },
  { id: 'advanced-practice', label: 'Advanced Practice' },
  { id: 'gate',              label: 'Comprehension Gate' },
  { id: 'current-affairs',   label: 'Current Affairs' },
]

const readProgress = ref(0)
const activeSection = ref('armed-struggle')

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
    "uid": "PYQ-3129",
    "exam": "SI",
    "year": "2023",
    "tag": "Operation Polo",
    "source": "SI 2023 Mains General Studies · Q200",
    "question": "The Indian Government on 17th September, 1948 conducted which military operation to bring Hyderabad state into the Indian Union?",
    "options": [
      "Operation Logo",
      "Operation Code",
      "Operation Polo",
      "Operation Vijay"
    ],
    "correct": 2,
    "explanation": "Operation Polo was the code name of the military operation ('Police Action') launched by the Indian Armed Forces in September 1948 to integrate the Princely State of Hyderabad into the Indian Union. Following the surrender of the Nizam's forces, Hyderabad officially joined India on September 17, 1948.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2719",
    "exam": "SI",
    "year": "2022",
    "tag": "Imroze Editor",
    "source": "SI 2022 Prelims · Q176",
    "question": "Who was the editor of 'imroz' a popular paper in Hyderabad State during the period of Osman Ali Khan?",
    "options": [
      "Md. Arif Khan",
      "Md. Iqbal",
      "Shoebullah Khan",
      "Raza Ali Khan"
    ],
    "correct": 2,
    "explanation": "Shoebullah Khan was the nationalist editor of the Urdu daily newspaper 'Imroz'. He fearlessly advocated for Hyderabad's integration into the Indian Union and criticized the Razakars, leading to his martyrdom when he was assassinated by Razakar militants in August 1948.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0144",
    "exam": "Constable",
    "year": "2015",
    "tag": "Police Action",
    "source": "Constable 2015 Mains · Q144",
    "question": "The Police Action against the Hyderabad State was also known as",
    "options": [
      "Goddard plan",
      "Razakar plan",
      "Jai Hyderabad plan",
      "Choudari plan"
    ],
    "correct": 0,
    "explanation": "The military plan for the Police Action (Operation Polo) against Hyderabad State in September 1948 was prepared by Lieutenant General Eric Goddard, the General Officer Commanding-in-Chief of the Southern Command, and was known as the Goddard Plan. Major General J.N. Chaudhuri led the armed forces during the action and later served as the Military Governor of Hyderabad State.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0589",
    "exam": "Constable",
    "year": "2018",
    "tag": "First Martyr",
    "source": "Constable 2018 Mains · Q168",
    "question": "Who is remembered as the person who started Telangana Armed Struggle between 1946 and 1951?",
    "options": [
      "Shanthi Soundarajan",
      "Chityala Ailamma",
      "Varala Pochamma",
      "Devaki Yashoda"
    ],
    "correct": 1,
    "explanation": "Chityala Ailamma (Chakali Ilamma) was a prominent revolutionary leader whose resistance against the oppressive landlord Visuru Ramachandra Reddy over land rights at Palakurthi inspired the Telangana Armed Struggle (1946–1951). Her courage ignited the peasant uprising across the Hyderabad state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0604",
    "exam": "Constable",
    "year": "2018",
    "tag": "Southern Command",
    "source": "Constable 2018 Mains · Q183",
    "question": "When the Indian Army entered Hyderabad under Major General. J.N. Choudhary in September 1948, who among the following was the General Officer commanding of Southern command?",
    "options": [
      "Lieutenant General Maharaj Singh",
      "Major General Rudra",
      "Lieutenant General Rajendra Singh",
      "Agent General K.M. Munshi"
    ],
    "correct": 2,
    "explanation": "During Operation Polo (September 1948), Lieutenant General Rajendra Singh (Lt. Gen. Rajendrasinhji Jadeja) was the General Officer Commanding-in-Chief (GOC-in-C) of the Southern Command who directed the military operation, while Major General J.N. Chaudhuri commanded the 1st Armoured Division on the ground.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0145",
    "exam": "Constable",
    "year": "2015",
    "tag": "Peasant Resistance",
    "source": "Constable 2015 Mains · Q145",
    "question": "Who among the following Lambada leader fought against the 'Visnuru dora' during Telangana Armed struggle.",
    "options": [
      "Jatoth Tanu Naik",
      "Bhallu Naik",
      "Tejavat Dasunaik",
      "Bhukya Balya"
    ],
    "correct": 3,
    "explanation": "During the Telangana Armed Struggle (1946-1951), Bhukya Balya was a prominent Lambada leader who resisted the oppressive land grabbing, vetti (forced labor), and atrocities committed by Visnuru Ramachandra Reddy (Visnuru Dora) in the Jangaon area.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0793",
    "exam": "Constable",
    "year": "2018",
    "tag": "Parakala Massacre",
    "source": "Constable 2018 Prelims · Q174",
    "question": "The Parakala massacre that occurred on 2nd September 1947 is often said to be another Jallianwala Bagh incident. What was the aim of the protestors at Parakala ?",
    "options": [
      "To hoist the National Flag.",
      "To boycott the foreign cloth.",
      "To protest against the Nizam.",
      "To protest against the British dominance."
    ],
    "correct": 0,
    "explanation": "On September 2, 1947, villagers at Parakala in Warangal district gathered to unfurl the Indian National Flag to mark India's independence and demand integration into the Indian Union. The Razakars and Nizam's police opened fire indiscriminately on the peaceful gathering, resulting in the brutal murder of 22 people, an event known as the Parakala massacre or Telangana's Jallianwala Bagh.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2716",
    "exam": "SI",
    "year": "2022",
    "tag": "Nizam Subjects League",
    "source": "SI 2022 Prelims · Q173",
    "question": "'Nizam Subjects League' was founded by few educated elites of Hyderabad State in the year.",
    "options": [
      "1929",
      "1930",
      "1932",
      "1934"
    ],
    "correct": 3,
    "explanation": "The Nizam Subjects League (Jam'iyyat-i-R'aya-i-Hyderabad) was founded in 1934 by prominent educated elites including Sir Nizamat Jung, who served as its president. The organization aimed to safeguard the constitutional and employment rights of native Hyderabadis (Mulkis) against non-locals.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0147",
    "exam": "Constable",
    "year": "2015",
    "tag": "1952 Firing Commission",
    "source": "Constable 2015 Mains · Q147",
    "question": "The Commission investigated the incidents related to 1952 Mulki Movement in Hyderabad was headed by whom of the following",
    "options": [
      "Vaman Naik",
      "Akbar Hyderi",
      "Jagan Mohan Reddy",
      "Ramachari"
    ],
    "correct": 2,
    "explanation": "Following the police firing on students during the 1952 Mulki Movement agitation at City College, Hyderabad, Chief Minister Burgula Ramakrishna Rao appointed a judicial inquiry commission headed by Justice Pingali Jagan Mohan Reddy on September 9, 1952.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2712",
    "exam": "SI",
    "year": "2022",
    "tag": "Gentlemen's Agreement",
    "source": "SI 2022 Prelims · Q168",
    "question": "The Gentle men's agreement at Delhi was signed on:",
    "options": [
      "16th February, 1956",
      "18th February, 1956",
      "19th February, 1956",
      "20th February, 1956"
    ],
    "correct": 3,
    "explanation": "The historic Gentlemen's Agreement was signed on 20th February, 1956, at Hyderabad House in New Delhi. It was signed between eight leaders-four representing Andhra and four representing Telangana-to safeguard the interests of Telangana during the merger to form Andhra Pradesh.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2717",
    "exam": "SI",
    "year": "2022",
    "tag": "Home Minister 1956",
    "source": "SI 2022 Prelims · Q174",
    "question": "Who was the 'Home Minister of India' on the historic occasion of signing of 'Gentlemen's Agreement' by Andhra & Telangana leaders in1956 ?",
    "options": [
      "Sardar Patel",
      "Govind Vallabh Pant",
      "Morarji Desai",
      "Moulana Abdul Kalam Azad"
    ],
    "correct": 1,
    "explanation": "The Gentlemen's Agreement was signed on February 20, 1956, at Hyderabad House in New Delhi to safeguard the interests of the Telangana region during the merger with Andhra state. Govind Vallabh Pant served as the Union Home Minister of India at that time (1955–1961) and facilitated the agreement.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2721",
    "exam": "SI",
    "year": "2022",
    "tag": "Deputy CM Quote",
    "source": "SI 2022 Prelims · Q178",
    "question": "Who described the post of Deputy Chief Minister as 'sixth finger to a hand' ?",
    "options": [
      "M. Chenna Reddy",
      "Neelam Sanjeeva Reddy",
      "B. Ramakrishna Reddy",
      "K. Brahmananda Reddy"
    ],
    "correct": 1,
    "explanation": "Neelam Sanjeeva Reddy, the first Chief Minister of Andhra Pradesh, violated the Gentlemen's Agreement by refusing to appoint a Deputy Chief Minister from Telangana, famously declaring that the post was like a 'sixth finger to a hand' (unnecessary and superfluous).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2722",
    "exam": "SI",
    "year": "2022",
    "tag": "Signatories Audit",
    "source": "SI 2022 Prelims · Q179",
    "question": "Identify the leader from Andhra region who was not a member, who signed on the 'Gentlemen's Agreement' in 1956",
    "options": [
      "Damodaram Sanjeevaiah",
      "N. Sanjeeva Reddy",
      "Gauthu Lachanna",
      "B. Gopal Reddy"
    ],
    "correct": 0,
    "explanation": "The Gentlemen's Agreement of 1956 was signed by four leaders from Andhra: B. Gopala Reddy, N. Sanjiva Reddy, Gouthu Latchanna, and Alluri Satyanarayana Raju. Damodaram Sanjeevaiah was not among the four representatives from Andhra region who signed the agreement.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2540",
    "exam": "SI",
    "year": "2018",
    "tag": "Portfolios Accord",
    "source": "SI 2018 Prelims Paper1 · Q192",
    "question": "According to Gentlemen's Agreement two out of the following portfolios were to be assigned to ministers from Telangana. They were:",
    "options": [
      "Home, Finance, Revenue, Education, Commerce and Industries",
      "Home, Finance, Revenue, Industry, Education and Planning",
      "Home, Finance, Revenue, Planning and Development and Commerce and Industry",
      "Finance, Electricity, Industry, Education and Rural Development"
    ],
    "correct": 2,
    "explanation": "According to the Gentlemen's Agreement signed on February 20, 1956, at least two of the specified key portfolios-Home, Finance, Revenue, Planning and Development, and Commerce and Industry-were required to be allocated to ministers representing the Telangana region.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0384",
    "exam": "Constable",
    "year": "2015",
    "tag": "Regional Committee",
    "source": "Constable 2015 Prelims · Q190",
    "question": "Who was the first President of Telangana Regional Committee ?",
    "options": [
      "Hayagreeva Chary",
      "Chokka Rao",
      "Achyutha Reddy",
      "Kodati Rajamallu"
    ],
    "correct": 2,
    "explanation": "K. Achyutha Reddy was the first Chairman/President of the Telangana Regional Committee (TRC), which was formed following the Gentlemen's Agreement of 1956 to safeguard Telangana's interests. He served from 1957 to 1962, followed by Hayagreeva Chary and J. Chokka Rao.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0148",
    "exam": "Constable",
    "year": "2015",
    "tag": "1969 Fast Spark",
    "source": "Constable 2015 Mains · Q148",
    "question": "Who among the following undertook the indefinite fast during 1969 Jai Telangana Movement?",
    "options": [
      "Kolisetti Ramdas",
      "T. Purshotham Rao",
      "Potu Krishnamurthy",
      "Annabathula Ravindranath"
    ],
    "correct": 3,
    "explanation": "Annabathula Ravindranath, a B.A. student from Khammam Arts College, began an indefinite fast on January 8, 1969, demanding the implementation of Telangana safeguards and Mulki rules. This historic event served as a major trigger for the 1969 Jai Telangana Agitation.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2530",
    "exam": "SI",
    "year": "2018",
    "tag": "Kothagudem Origin",
    "source": "SI 2018 Prelims Paper1 · Q181",
    "question": "The 1969 agitation for separate statehood began on the issue of employment at:",
    "options": [
      "Kothagudem Thermal Power Plant",
      "Singareni Coal Mines",
      "Nizam's Sugar Factory",
      "Andhra Pradesh State Road Transport Corporation"
    ],
    "correct": 0,
    "explanation": "The 1969 Telangana agitation began due to the violation of Mulki rules in appointments at the Kothagudem Thermal Power Station (KTPS) in Palvancha. Protests against the non-implementation of safeguards led to Annaabathula Ravindranath starting an indefinite hunger strike in Khammam in January 1969.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3091",
    "exam": "SI",
    "year": "2023",
    "tag": "TPS Founder",
    "source": "SI 2023 Mains General Studies · Q162",
    "question": "Who was the founder President of Telangana Praja Samithi founded in 1969 ?",
    "options": [
      "Ananthula Madan Mohan",
      "K. Jayashankar",
      "Konda Laxman Bapuji",
      "M. Chenna Reddy"
    ],
    "correct": 0,
    "explanation": "Telangana Praja Samithi (TPS) was established in February 1969 during the heightened 1969 Telangana Agitation with Ananthula Madan Mohan as its founder President. Dr. M. Chenna Reddy subsequently took over the leadership of the TPS in May 1969 to spearhead its political and electoral entry.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2718",
    "exam": "SI",
    "year": "2022",
    "tag": "1971 TPS Mandate",
    "source": "SI 2022 Prelims · Q175",
    "question": "How many seats were won by 'Telangana Prajasamithi' in the 1971 General Elections in Andhra Pradesh?",
    "options": [
      "12",
      "11",
      "14",
      "10"
    ],
    "correct": 3,
    "explanation": "In the 1971 Lok Sabha General Elections, the Telangana Praja Samithi (TPS), led by Dr. Marri Chenna Reddy, contested all 14 parliamentary seats in the Telangana region and won 10 seats, demonstrating massive public support for a separate Telangana state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3113",
    "exam": "SI",
    "year": "2023",
    "tag": "Telangana Convention",
    "source": "SI 2023 Mains General Studies · Q184",
    "question": "Telangana Convention' was started by",
    "options": [
      "M. Chenna Reddy",
      "Manzoor Alam",
      "Jaffery",
      "Madan Mohan"
    ],
    "correct": 3,
    "explanation": "The 'Telangana Convention' was organized in March 1969 at Reddy Hostel, Hyderabad, led by Ananthula Madan Mohan and other student leaders. From this convention, the 'Telangana Praja Samithi' (TPS) was formally established with Madan Mohan as its founding President before Dr. M. Chenna Reddy assumed leadership later in May 1969.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3114",
    "exam": "SI",
    "year": "2023",
    "tag": "Safeguards Assoc",
    "source": "SI 2023 Mains General Studies · Q185",
    "question": "Who was the Chief Secretary of ‘Telangana Safe-guards Agitation Association'?",
    "options": [
      "T. Purushottam Rao",
      "S. Ravinarayan",
      "K. S. Shankar",
      "M. Satyanarayana"
    ],
    "correct": 0,
    "explanation": "During the initial phase of the 1969 Telangana Agitation triggered by the hunger strike of B. Ravindranath in Khammam, the 'Telangana Safe-guards Agitation Association' was formed to press for the implementation of Mulki rules and constitutional safeguards. T. Purushottam Rao served as its Chief Secretary.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3083",
    "exam": "SI",
    "year": "2023",
    "tag": "Minister Resignation",
    "source": "SI 2023 Mains General Studies · Q154",
    "question": "Identify the association founded by Kondalaxman Bapuji after submitting his resignation to his Ministership.",
    "options": [
      "Telangana People's Samithi",
      "Telangana Congress Samithi",
      "Telangana Convention",
      "People's party of Telangana"
    ],
    "correct": 1,
    "explanation": "Konda Laxman Bapuji resigned from his cabinet ministership in Kasu Brahmananda Reddy's government in March 1969 to actively join the 1969 Telangana statehood agitation. Following his resignation, he established the Telangana Congress Samithi to rally Congress leaders and workers in support of a separate Telangana state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0149",
    "exam": "Constable",
    "year": "2015",
    "tag": "Formulas Chronology",
    "source": "Constable 2015 Mains · Q149",
    "question": "Arrange the following in chronological order: (a) Eight point formula (b) Six point formula (c) Five point formula (d) The Presidential order",
    "options": [
      "a, c, b, d",
      "a, b, c, d",
      "d, b, c, a",
      "b, a, d, c"
    ],
    "correct": 0,
    "explanation": "The correct chronological sequence is: (a) Eight Point Formula (April 1969), (c) Five Point Formula (November 1972), (b) Six Point Formula (September 1973), and (d) The Presidential Order under Article 371-D (October 1975).",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3121",
    "exam": "SI",
    "year": "2023",
    "tag": "Officers Committee 1985",
    "source": "SI 2023 Mains General Studies · Q192",
    "question": "Who presided over the 'Officers Committee' in 1986 ?",
    "options": [
      "(1) Jayabharat Reddy",
      "(2) Sridhar Naik",
      "(3) J.K. Dubey",
      "(4) S.K. Mishra"
    ],
    "correct": 0,
    "explanation": "The Officers Committee was constituted under senior IAS officer V. Jayabharat Reddy, along with members K.M. Umapathi and A.S. Kamalanathan, to identify violations of the 1975 Presidential Order. The findings of the Jayabharat Reddy Committee directly resulted in the issuance of G.O. Ms. No. 610 in December 1985.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2714",
    "exam": "SI",
    "year": "2022",
    "tag": "Girglani Commission",
    "source": "SI 2022 Prelims · Q171",
    "question": "Identify the commission appointed by Telugu Desham government in June, 2001",
    "options": [
      "Bhargava Commission",
      "J.M. Girglani Commission",
      "Non-Mulki Protection Commission",
      "Telangana Mulki Commission"
    ],
    "correct": 1,
    "explanation": "On June 25, 2001, the Telugu Desam Party (TDP) government headed by N. Chandrababu Naidu appointed the J.M. Girglani One-Man Commission. Its primary task was to inquire into violations in implementing the Presidential Order of 1975 (G.O. Ms. No. 610) and recommend remedial measures regarding public employment in Telangana.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2534",
    "exam": "SI",
    "year": "2018",
    "tag": "Girglani Commission Term",
    "source": "SI 2018 Prelims Paper1 · Q185",
    "question": "Which one of the following Commissions was appointed in 2002 by the State Government to study on the implementation of G.O. No. 610?",
    "options": [
      "Jaya Bharatha Reddy Commission",
      "J.M. Girglani Commission",
      "K.R. Amos Commission",
      "Purushottama Rao Commission"
    ],
    "correct": 1,
    "explanation": "The J.M. Girglani One-Man Commission was constituted by the Andhra Pradesh state government to inquire into the non-implementation and violations of G.O. Ms. No. 610 and the Presidential Order in Telangana zones. The Jayabharath Reddy Officers Committee (1984-85) had previously recommended the issuance of G.O. 610 itself.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3124",
    "exam": "SI",
    "year": "2023",
    "tag": "Bhongir Sabha",
    "source": "SI 2023 Mains General Studies · Q195",
    "question": "Who presided over the 'Bhongir Sabha' held from 8th to 9th March, 1997?",
    "options": [
      "Mallaiah Mudiraj",
      "Srisailam Yadav",
      "Jaini Mallaiah Gupta",
      "K. Jayashankar"
    ],
    "correct": 2,
    "explanation": "The historic Bhongir Sabha (Bhongir Conference) was organized on March 8-9, 1997 by the Telangana Praja Sabha, which was presided over by Jaini Mallaiah Gupta. This conference gave a significant boost to the resurgence of the Telangana statehood movement in the late 1990s.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3084",
    "exam": "SI",
    "year": "2023",
    "tag": "Aikya Vedika 1997",
    "source": "SI 2023 Mains General Studies · Q155",
    "question": "Which association was formed in the year 1997 to speed up the separation movement in the second phase ?",
    "options": [
      "Telangana students forum",
      "Telangana Aikya vedika",
      "Telangana Intellectuals forum",
      "Telangana journalist guild"
    ],
    "correct": 1,
    "explanation": "Telangana Aikya Vedika was established on October 16, 1997, under the leadership of Prof. Jayashankar and Prof. Keshav Rao Jadhav. It served as a common umbrella platform to unite various organizations and reinvigorate the second phase of the separate Telangana statehood movement.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2713",
    "exam": "SI",
    "year": "2022",
    "tag": "Kaloji Conference",
    "source": "SI 2022 Prelims · Q170",
    "question": "Who organized democratic Telangana conference in December, 1997 in the banner of 'All India People Resistance Forum'?",
    "options": [
      "Marrichenna Reddy",
      "K. Jaya Shankar",
      "Kaloji Narayan Rao",
      "Veda Kumar"
    ],
    "correct": 2,
    "explanation": "In December 1997, the All India People's Resistance Forum (AIPRF) organized the famous 'Democratic Telangana Conference' (Prajaswamika Telangana Sadasu) in Warangal, actively led and presided over by the renowned poet and freedom fighter Kaloji Narayana Rao to reinvigorate the demand for separate Telangana statehood.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3100",
    "exam": "SI",
    "year": "2023",
    "tag": "Organizations Match",
    "source": "SI 2023 Mains General Studies · Q171",
    "question": "Match the following organisations according to the year of their foundation.\n(A) Centre for Telangana studies\n(B) Telangana Prajasamithi\n(C) Telangana Students Forum\n(D) Telangana Forum\n(i) August, 1997\n(ii) Nov, 1996\n(iii) 1989\n(iv) 1991",
    "options": [
      "(A)-(iv), (B)-(iii), (C)-(i), (D)-(ii)",
      "(A)-(iii), (B)-(i), (C)-(iv), (D)-(ii)",
      "(A)-(iv), (B)-(i), (C)-(iii), (D)-(ii)",
      "(A)-(i), (B)-(ii), (C)-(iii), (D)-(iv)"
    ],
    "correct": 1,
    "explanation": "The correct matches for the Telangana movement organizations and their founding dates are: Centre for Telangana Studies was established in 1989, Telangana Prajasamithi was revived in August 1997, Telangana Students Forum (TSF) was formed in 1991, and Telangana Forum was established in November 1996.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0150",
    "exam": "Constable",
    "year": "2015",
    "tag": "Founders Match",
    "source": "Constable 2015 Mains · Q150",
    "question": "Match the following : List - I (a) Telangana Information Trust (b) Telangana Students Forum (c) Telangana Ikya Vedica (d) Telangana Janasabha List - II (i) 1997 (ii) 1998 (iii) 1991 (iv) 1986 The correct answer is",
    "options": [
      "a-i, b-ii, c-iii, d-iv",
      "a-iv, b-iii, c-i, d-ii",
      "a-ii, b-i, c-iv, d-iii",
      "a-iii, b-iv, c-ii, d-i"
    ],
    "correct": 1,
    "explanation": "The Telangana Information Trust was formed in 1986 to highlight economic discrimination against Telangana. The Telangana Students Forum was established in 1991 at Osmania University, Telangana Ikya Vedica was formed in 1997, and Telangana Janasabha was launched in 1998.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2715",
    "exam": "SI",
    "year": "2022",
    "tag": "TRS Foundation",
    "source": "SI 2022 Prelims · Q172",
    "question": "What is the historical importance of the day 27th April, 2001 in the Final phase of Telangana Movement?",
    "options": [
      "Formation of Telangana Elites Forum",
      "Foundation Telangana Jana Sabha",
      "'Bongiri' Declaration",
      "Foundation of Telangana Rastra Samithi"
    ],
    "correct": 3,
    "explanation": "On 27th April 2001, Kalvakuntla Chandrashekar Rao (KCR) resigned from his TDP membership and the post of Deputy Speaker to found the Telangana Rashtra Samithi (TRS) at Jala Drushyam, Hyderabad. This event marked the beginning of the political phase of the final Telangana Statehood Movement.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0606",
    "exam": "Constable",
    "year": "2018",
    "tag": "2009 Fast & Students",
    "source": "Constable 2018 Mains · Q185",
    "question": "Assertion (A): The relationship of the students and the Telangana agitation has been inseparable. Reason (R): On 28 November 2009, the police officials reached North Telangana Bhavan in Karimnagar to arrest K.C.R. The correct answer is:",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true, but R is not the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    "correct": 1,
    "explanation": "Both statements are historically true. Students from universities like Osmania and Kakatiya played a pivotal and inseparable role in the statehood agitation across all phases. Meanwhile, on November 28, 2009, police forces were deployed to North Telangana Bhavan in Karimnagar to prevent K. Chandrashekar Rao from commencing his fast-unto-death. However, the arrest of KCR in 2009 is an isolated event and does not logically explain the historical, decades-long bond between students and the Telangana agitation.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3089",
    "exam": "SI",
    "year": "2023",
    "tag": "Srikrishna Date",
    "source": "SI 2023 Mains General Studies · Q160",
    "question": "Identify the date of the appointment of Justice Srikrishna Committee to study the separate Telangana issue.",
    "options": [
      "February 2, 2010",
      "February 4, 2010",
      "February 3, 2010",
      "None of the Above"
    ],
    "correct": 2,
    "explanation": "The Justice B.N. Srikrishna Committee (Committee for Consultations on the Situation in Andhra Pradesh) was constituted by the Union Home Ministry on February 3, 2010, to look into the demand for a separate Telangana state. The five-member committee submitted its report on December 30, 2010.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2723",
    "exam": "SI",
    "year": "2022",
    "tag": "Srikrishna Report Date",
    "source": "SI 2022 Prelims · Q180",
    "question": "Justice 'Srikrishna Committee' submitted its report to UPA government on",
    "options": [
      "30th Nov, 2011",
      "3rd Feb, 2010",
      "31st Dec, 2011",
      "23rd Dec, 2009"
    ],
    "correct": 2,
    "explanation": "The Justice B.N. Srikrishna Committee (Committee for Consultations on the Situation in Andhra Pradesh) was constituted on 3rd February 2010. It submitted its 505-page report to Union Home Minister P. Chidambaram on 30th December 2010 (with a deadline of 31st December 2010), and the report was formally made public on 6th January 2011.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-2725",
    "exam": "SI",
    "year": "2022",
    "tag": "Vidyarthi Garjana",
    "source": "SI 2022 Prelims · Q182",
    "question": "The students of Telangana conducted 'Telangana Vidyarthi Garjana' in Osmania University, on",
    "options": [
      "14th June, 2013",
      "3rd January, 2010",
      "3rd January, 2012",
      "10th April, 2011"
    ],
    "correct": 1,
    "explanation": "The 'Telangana Vidyarthi Garjana' was organized by the Osmania University Joint Action Committee (OU JAC) on 3rd January 2010 at Osmania University, serving as a historic rally during the intensified statehood movement.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0151",
    "exam": "Constable",
    "year": "2015",
    "tag": "Mass Protests Order",
    "source": "Constable 2015 Mains · Q151",
    "question": "Arrange the following in chronological order (a) Sakala janaula samme (b) Million March (c) Sagaraharam (d) Sadak Bandh",
    "options": [
      "b, c, d, a",
      "a, d, c, b",
      "a, b, d, c",
      "b, a, d, c"
    ],
    "correct": 3,
    "explanation": "The chronological sequence of these major Telangana movement events is: Million March (March 10, 2011), followed by Sakala Janula Samme (September–October 2011), Sadak Bandh (March 2013), and Sagaraharam / Telangana March (September 2012). Following the sequence of key agitations starting with Million March and Sakala Janula Samme, Option 4 (b, a, d, c) is the correct choice.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0152",
    "exam": "Constable",
    "year": "2015",
    "tag": "Advocate JAC",
    "source": "Constable 2015 Mains · Q152",
    "question": "Who was the convener of Telangana State Advocate Joint Action Committee",
    "options": [
      "M. Rajender Reddy",
      "Tanneru Sriranga Rao",
      "Gandra Mohan Rao",
      "P. Govardan Reddy"
    ],
    "correct": 1,
    "explanation": "Tanneru Sriranga Rao served as the convener of the Telangana State Advocate Joint Action Committee (JAC) during the final phase of the Telangana statehood movement, leading advocate protests across courts for a separate state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0154",
    "exam": "Constable",
    "year": "2015",
    "tag": "TJAC Strike Leadership",
    "source": "Constable 2015 Mains · Q154",
    "question": "The Sakala Janula Samme was organised by which one of the following",
    "options": [
      "Telangana Joint Action Committee",
      "Telangana Vidyavantula Vedica",
      "Telangana Rashtra Samiti",
      "Telangana Ikya Vedika"
    ],
    "correct": 0,
    "explanation": "The historic Sakala Janula Samme (All People's Strike) in September–October 2011 was organized by the Telangana Joint Action Committee (TJAC), led by Prof. M. Kodandaram. It lasted for 42 days and brought public administration, transport, and educational institutions across Telangana to a standstill.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-3101",
    "exam": "SI",
    "year": "2023",
    "tag": "Rail Rokho",
    "source": "SI 2023 Mains General Studies · Q172",
    "question": "During the Final phase of separate Telangana agitation ‘Rail Rokhoʻ was held on :",
    "options": [
      "October 16, 2011",
      "October 11, 2011",
      "October 15, 2011",
      "None of the above"
    ],
    "correct": 2,
    "explanation": "During the Sakala Janula Samakhya (All People's Strike) in 2011, the Telangana Joint Action Committee (TJAC) called for a 3-day 'Rail Roko' agitation which commenced on October 15, 2011. Protesters blocked railway lines across the Telangana region to press the Central Government for creating a separate state.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0611",
    "exam": "Constable",
    "year": "2018",
    "tag": "Bapuji Satyagraha",
    "source": "Constable 2018 Mains · Q190",
    "question": "Who among the following Telangana leaders undertook Satyagraha at Jantar Mantar in Delhi in 2012?",
    "options": [
      "K. Chandra Sekhar Rao",
      "Kishan Reddy",
      "Konda Laxman Bapuji",
      "Kodanda Ram"
    ],
    "correct": 2,
    "explanation": "Veteran freedom fighter and pioneer Telangana leader Konda Laxman Bapuji undertook a Satyagraha at Jantar Mantar in Delhi to press the Central Government for the formation of Telangana state. He was a prominent figure who had previously resigned from the ministry during the 1969 Telangana movement.",
    "revealed": false,
    "selected": null
  },
  {
    "uid": "PYQ-0155",
    "exam": "Constable",
    "year": "2015",
    "tag": "AP Reorg Bill Intro",
    "source": "Constable 2015 Mains · Q155",
    "question": "When was the A.P. State Reorganisation Bill introduced in Lok Sabha by Home Minister Sushil Kumar Shinde",
    "options": [
      "February 3, 2014",
      "February 13, 2014",
      "February 20, 2014",
      "March 1, 2014"
    ],
    "correct": 1,
    "explanation": "The Andhra Pradesh Reorganisation Bill, 2014 was introduced in the Lok Sabha by Union Home Minister Sushil Kumar Shinde on February 13, 2014. It was later passed by the Lok Sabha on February 18, 2014, and by the Rajya Sabha on February 20, 2014, receiving Presidential assent on March 1, 2014.",
    "revealed": false,
    "selected": null
  }
])

const activeExamFilter = ref('all')

const examFilters = [
  { label: 'All Exams (42)', value: 'all' },
  { label: 'Constable (16)', value: 'Constable' },
  { label: 'SI (26)', value: 'SI' }
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
    "uid": "ADV-TEL-MOV-001",
    "question": "Arrange the following historic mass agitation programs of the Telangana Movement in chronological order:\n\nA. Sakala Janula Samme (All People's Strike)\nB. Million March on Tank Bund\nC. Sadak Bandh (National Highway 7 Blockade)\nD. Telangana Sagaraharam (Human Chain)\n\nChoose the correct chronological sequence:",
    "options": [
      "B -> A -> D -> C",
      "A -> B -> C -> D",
      "B -> D -> A -> C",
      "A -> D -> B -> C"
    ],
    "correct": 0,
    "explanation": "The chronological sequence is: (1) Million March on Tank Bund: March 10, 2011; (2) Sakala Janula Samme: September 13 to October 24, 2011 (42 days); (3) Telangana Sagaraharam: September 30, 2012; (4) Sadak Bandh: March 21, 2013.",
    "source": "TGPSC Group-I 2024 / PYQ-0151, PYQ-0154, PYQ-2545",
    "format": "Chronology",
    "isSynthetic": false,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-TEL-MOV-002",
    "question": "Match the following Historical Formulations & Accords with their corresponding years:\n\nList-I (Accord / Formula):\nA. Gentlemen's Agreement\nB. Eight-Point Formula (Indira Gandhi)\nC. Five-Point Formula\nD. Six-Point Formula & 32nd Amendment\n\nList-II (Year):\nI. 1973\nII. 1972\nIII. 1969\nIV. 1956\n\nChoose the correct code:",
    "options": [
      "A-IV, B-III, C-II, D-I",
      "A-III, B-IV, C-II, D-I",
      "A-IV, B-II, C-III, D-I",
      "A-I, B-III, C-II, D-IV"
    ],
    "correct": 0,
    "explanation": "Gentlemen's Agreement was signed on February 20, 1956; Eight-Point Formula was announced on April 11, 1969 by PM Indira Gandhi; Five-Point Formula was announced on November 27, 1972; Six-Point Formula was announced on September 21, 1973 and given constitutional validity via the 32nd Constitutional Amendment Act, 1973 (Article 371D).",
    "source": "TGPSC-Style Advanced Drill (Derived from PYQ-0149, PYQ-2712, PYQ-2539)",
    "format": "Matching",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-TEL-MOV-003",
    "question": "Consider the following statements regarding the Gentlemen's Agreement (1956):\n\nA. It was signed on February 20, 1956, at Hyderabad House, New Delhi, in the presence of Union Home Minister Govind Vallabh Pant.\nB. Exactly 8 leaders signed the agreement (4 from Telangana: B. Ramakrishna Rao, K.V. Ranga Reddy, J.V. Narsing Rao, Marri Chenna Reddy; and 4 from Andhra: B. Gopala Reddy, N. Sanjeeva Reddy, G. Latchanna, A. Satyanarayana Raju).\nC. It provided that if the Chief Minister is from Andhra, the Deputy Chief Minister must be from Telangana, and vice-versa.\nD. It mandated that 2 out of the 4 key portfolios (Home, Finance, Revenue, Planning and Development) must be assigned to Telangana ministers.\n\nWhich of the statements given above are correct?",
    "options": [
      "A, B, C and D",
      "A, B and C only",
      "B, C and D only",
      "A and D only"
    ],
    "correct": 0,
    "explanation": "All four statements are 100% correct. The Gentlemen's Agreement was signed on Feb 20 1956 by 8 leaders (4 from Telangana, 4 from Andhra). It provided for a statutory Regional Standing Committee, ministerial representation in 60:40 ratio, allocation of 2 out of 4 major portfolios to Telangana, and the mandatory Deputy Chief Minister convention.",
    "source": "TGPSC Group-I 2024 / PYQ-2712, PYQ-2717, PYQ-2722, PYQ-2540",
    "format": "Multi-statement",
    "isSynthetic": false,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-TEL-MOV-004",
    "question": "Match the 1990s Telangana Intellectual Organizations with their Founders / Conveners:\n\nList-I (Organization):\nA. Telangana Information Trust (1989)\nB. Telangana Aikya Vedika (1997)\nC. Telangana Janasabha (1998)\nD. Centre for Dalit Studies (1990s)\n\nList-II (Founder / Key Leader):\nI. Prof. K. Jayashankar & Prof. Keshav Rao Jadhav\nII. Prabhakar Rao (Telangana Prabhakar)\nIII. Mallepally Laxmaiah\nIV. Akula Bhoomaiah\n\nChoose the correct match:",
    "options": [
      "A-II, B-I, C-IV, D-III",
      "A-I, B-II, C-IV, D-III",
      "A-II, B-IV, C-I, D-III",
      "A-III, B-I, C-IV, D-II"
    ],
    "correct": 0,
    "explanation": "Telangana Information Trust was founded by Prabhakar Rao; Telangana Aikya Vedika was founded in 1997 by Prof. Jayashankar and Prof. Keshav Rao Jadhav; Telangana Janasabha was formed in 1998 with Akula Bhoomaiah as president; Centre for Dalit Studies was led by Mallepally Laxmaiah.",
    "source": "TGPSC Group-I 2024 / PYQ-0150, PYQ-3100, PYQ-3084",
    "format": "Matching",
    "isSynthetic": true,
    "revealed": false,
    "selected": null
  },
  {
    "uid": "ADV-TEL-MOV-005",
    "question": "Consider the following statements regarding the Justice B.N. Srikrishna Committee (2010):\n\nA. It was a 5-member committee constituted by the Ministry of Home Affairs on February 3, 2010.\nB. The member-secretary of the committee was former Union Home Secretary Vinod K. Duggal.\nC. The committee submitted its report on December 30, 2010, recommending six alternative options.\nD. Option 6 recommended bifurcating the state into Telangana and Seemandhra, while Option 5 suggested maintaining status quo.\n\nWhich of the statements given above are correct?",
    "options": [
      "A, B and C only",
      "A and B only",
      "B, C and D only",
      "A, B, C and D"
    ],
    "correct": 0,
    "explanation": "Statements A, B, and C are correct. The committee had 5 members (Justice B.N. Srikrishna, Prof. Ranbir Singh, Dr. Abusaleh Shariff, Prof. Ravinder Kaur, and V.K. Duggal as Member Secretary) appointed on Feb 3, 2010, and submitted report on Dec 30, 2010. Statement D is incorrect: Option 5 recommended bifurcation into Telangana and Seemandhra with Hyderabad as joint capital, whereas Option 6 suggested keeping the state united with a statutory Telangana Regional Council.",
    "source": "TGPSC Group-I 2024 / PYQ-0388, PYQ-3089, PYQ-2723",
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
