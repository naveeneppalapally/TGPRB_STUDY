<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans pb-16">
    <!-- Top Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-800 z-50">
      <div 
        class="h-full bg-emerald-500 transition-all duration-150 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- Main Container -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      <!-- Header Section -->
      <header class="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <!-- Breadcrumbs -->
        <nav class="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span>Indian Polity</span>
          <span>/</span>
          <span class="font-medium text-emerald-600 dark:emerald-400">Union Executive & Parliament</span>
        </nav>

        <!-- Title & Subtitle -->
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Union Executive & Parliament
        </h1>
        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Comprehensive study notes covering the President, Vice-President, Prime Minister, Council of Ministers, Lok Sabha, Rajya Sabha, Speaker, Parliamentary Committees, and key Articles tested in TSLPRB Police Constable & SI Exams.
        </p>

        <!-- Metadata Chips -->
        <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span class="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            Note ID: NOTE-POL-UNION-EXEC
          </span>
          <span class="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            Verified PYQs: 57
          </span>
          <span class="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            TSLPRB SI & Constable Core
          </span>
          <span class="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            High-Yield Weightage
          </span>
        </div>
      </header>

      <!-- Dynamic Current Affairs Strip -->
      <CurrentAffairsStrip note-id="NOTE-POL-UNION-EXEC" class="mb-8" />

      <!-- Exam Coverage Strategy Strip -->
      <div class="mb-10 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white rounded-xl p-5 shadow-lg border border-slate-700">
        <h3 class="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          How TSLPRB Tests "Union Executive & Parliament" (57 PYQs Analysis)
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span class="font-semibold text-amber-300 block mb-1">1. Articles & Constitutional Powers</span>
            Direct matching on Art 52-78 (Executive) & Art 79-122 (Parliament), Casting Vote under Art 100(1), Art 249 RS powers.
          </div>
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span class="font-semibold text-amber-300 block mb-1">2. Veto & Legislative Procedures</span>
            President's Veto types (Absolute, Suspensive, Pocket) and absence of Qualified Veto in India [PYQ-0753].
          </div>
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span class="font-semibold text-amber-300 block mb-1">3. Lok Sabha & Electorates</span>
            Malkajgiri (Largest voter base) [PYQ-0326] vs Lakshadweep (Smallest) [PYQ-0191]; State seat allocations (e.g., Bihar = 40) [PYQ-0515].
          </div>
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span class="font-semibold text-amber-300 block mb-1">4. Speaker & Deputy Speaker Rules</span>
            Resignation procedure (Speaker resigns to Dy Speaker), Deputy Speaker opposition convention starting from 11th LS [PYQ-0754].
          </div>
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span class="font-semibold text-amber-300 block mb-1">5. Parliamentary Committees</span>
            Estimates Committee strength (30 members exclusively from LS, 0 from RS) [PYQ-0768].
          </div>
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span class="font-semibold text-amber-300 block mb-1">6. Historical Portfolios & PMs</span>
            Matching historic cabinets (Janata, UF, NF, NDA) and Union portfolios [PYQ-0200, PYQ-0315, PYQ-0878].
          </div>
        </div>
      </div>

      <!-- SECTION 01: UNION EXECUTIVE: PRESIDENT & VICE PRESIDENT -->
      <section id="president-vp" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 flex items-center gap-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-sm font-black">01</span>
          Union Executive: President & Vice President
        </h2>

        <!-- Visual Hierarchy Component -->
        <ConstitutionalHierarchy mode="executive" class="mb-10" />

        <!-- Key Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 class="font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wide mb-2">President (Articles 52 - 62)</h4>
            <ul class="text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <li><strong class="text-slate-900 dark:text-slate-100">Art. 52:</strong> Executive Head of the Union of India.</li>
              <li><strong class="text-slate-900 dark:text-slate-100">Art. 53:</strong> Supreme Commander of Armed Forces.</li>
              <li><strong class="text-slate-900 dark:text-slate-100">Art. 54 & 55:</strong> Electoral College (Elected MPs + Elected MLAs of States + UTs of Delhi, Puducherry, J&K).</li>
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
              <li><strong class="text-slate-900 dark:text-slate-100">Electoral College:</strong> All MPs (both Elected & Nominated) of Lok Sabha & Rajya Sabha; MLAs do NOT vote.</li>
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
                Presidential Veto Powers & Prior Recommendation Rules [PYQ-0753, PYQ-0301, PYQ-0756]
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
                <td class="p-3">Article 110 & 117(1): Introduced only in Lok Sabha with prior recommendation.</td>
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

      <!-- SECTION 02: PRIME MINISTER & COUNCIL OF MINISTERS -->
      <section id="pm-com" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 flex items-center gap-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-sm font-black">02</span>
          Prime Minister & Council of Ministers
        </h2>

        <!-- Constitutional Sequence Box -->
        <div class="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
          <h4 class="font-bold text-amber-900 dark:text-amber-200 text-sm mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Sequence of Government Formation & Collective Responsibility [PYQ-0302, PYQ-0167]
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
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Historical Ministers & Governments Matching [PYQ-0200, PYQ-0315, PYQ-0878]</p>
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
                <td class="p-3">Social Justice & Empowerment</td>
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

      <!-- SECTION 03: PARLIAMENT STRUCTURE: LOK SABHA & RAJYA SABHA -->
      <section id="parliament-structure" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 flex items-center gap-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-sm font-black">03</span>
          Parliament Structure: Lok Sabha & Rajya Sabha
        </h2>

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

      <!-- SECTION 04: OFFICERS OF PARLIAMENT & COMMITTEES -->
      <section id="officers-committees" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 flex items-center gap-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-sm font-black">04</span>
          Parliamentary Officers & Committees
        </h2>

        <!-- Red Penalty Box for Frequent Traps -->
        <div class="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60">
          <h4 class="font-bold text-rose-900 dark:text-rose-200 text-sm mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            High Penalty Traps: Speaker & Parliamentary Rules [PYQ-0314, PYQ-0519, PYQ-0754]
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

      <!-- SECTION 05: MEMORY MNEMONICS & SPEED REVISION MATRIX -->
      <section id="mnemonics" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 flex items-center gap-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-sm font-black">05</span>
          Memory Mnemonics & Speed Revision Matrix
        </h2>

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
                <td class="p-3 font-bold">Andhra Pradesh & Gujarat</td>
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

      <!-- Gate Quiz Component Callout -->
      <section class="mt-12">
        <GateQuiz note-id="NOTE-POL-UNION-EXEC" />
      </section>

    </div>
    <AiAssistantDrawer
      note-id="NOTE-POL-UNION-EXEC"
      note-title="Union Executive and Legislature"
      :quick-prompts="aiQuickPrompts"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CurrentAffairsStrip from '@/components/CurrentAffairsStrip.vue'
import ConstitutionalHierarchy from '@/components/visual/ConstitutionalHierarchy.vue'

const aiQuickPrompts = useAiPromptChips('NOTE-POL-UNION-EXEC')

// Scroll progress bar indicator
const scrollProgress = ref<number>(0)

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  
  if (documentHeight > windowHeight) {
    scrollProgress.value = (scrollTop / (documentHeight - windowHeight)) * 100
  } else {
    scrollProgress.value = 0
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<style scoped>
/* Ensure smooth transitions for progress bar */
</style>
