<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MovementTimeline from '@/components/visual/MovementTimeline.vue'

useHead({
  title: 'Telangana Armed Struggle & Statehood Movement - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Complete high-yield note on Telangana Statehood Movement 1948-2014 for TGPRB Constable and SI exams.' }],
})

// Scroll progress handling
const readingProgress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    readingProgress.value = Math.min(100, Math.round((scrollTop / docHeight) * 100))
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 pb-16 font-sans">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
      <div 
        class="h-full bg-amber-500 transition-all duration-150 ease-out"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <!-- Sticky Header Header -->
    <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-4 sm:px-6 py-4">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <NuxtLink to="/" class="hover:text-amber-400 transition-colors">StudyOS</NuxtLink>
            <span>/</span>
            <span class="text-slate-300">Telangana State</span>
            <span>/</span>
            <span class="text-slate-200">Statehood Movement</span>
          </nav>
          
          <h1 class="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Telangana Armed Struggle & Statehood Movement</span>
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
            1946 Peasant Struggle to 2014 Formation: Exhaustive Phase-by-Phase Master Note
          </p>
        </div>

        <!-- Metadata Badges -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
            Subject: Telangana History & Movement
          </span>
          <span class="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 font-bold flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            169 Verified PYQs
          </span>
          <span class="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 font-medium">
            Est. Read: 28 mins
          </span>
          <span class="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono">
            ID: NOTE-TEL-MOVEMENT
          </span>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <!-- Current Affairs Integration Banner -->
      <CurrentAffairsStrip note-id="NOTE-TEL-MOVEMENT" class="mb-8" />

      <!-- Exam Pattern Coverage Strip -->
      <div class="mb-8 p-4 rounded-xl bg-slate-950 border border-slate-800">
        <h3 class="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <span>🎯 High-Yield Exam Patterns Tested by TSLPRB / TGPRB</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
            <strong class="text-slate-200 block mb-1">1. Chronology Questions</strong>
            <p class="text-slate-400">Match formulas (8-Point -> 5-Point -> 6-Point -> Presidential Order) & Agitation Protests (Million March -> Sakala Janula Samme -> Sagaraharam -> Sadak Bandh).</p>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
            <strong class="text-slate-200 block mb-1">2. Leadership & Resistance Pairs</strong>
            <p class="text-slate-400">Chakali Ilamma vs Visnuru Ramachandra Reddy; Bhukya Balya (Lambada resistance); Annabathula Ravindranath (Khammam fast 1969); Konda Laxman Bapuji (Jantar Mantar satyagraha).</p>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
            <strong class="text-slate-200 block mb-1">3. Committees & Reports</strong>
            <p class="text-slate-400">Justice Jaganmohan Reddy (1952 City College firing), Wanchoo Committee (1969 Mulki rules), J.M. Girglani Commission (2001 G.O. 610), Srikrishna Committee (2010).</p>
          </div>
        </div>
      </div>

      <!-- SECTION 01: ARMED STRUGGLE & OPERATION POLO -->
      <section id="section-01" class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">01</span>
          <h2 class="text-2xl font-bold text-slate-100">Telangana Armed Struggle (1946-1951) & Operation Polo (1948)</h2>
        </div>

        <!-- Movement Visual Component -->
        <MovementTimeline mode="telangana" class="mb-10" />

        <div class="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            The Telangana Peasant Armed Struggle (1946-1951) was an anti-feudal and anti-Nizam armed uprising spearheaded by the Andhra Maha Sabha (AMS) and the Communist Party of India (CPI). It targeted oppressive land systems such as <em class="text-amber-300 font-normal">Vetti</em> (forced uncompensated labor), <em class="text-amber-300 font-normal">Jagirdari</em> exploitation, and feudal landlords (<em class="text-amber-300 font-normal">Doras</em>).
          </p>

          <!-- Key Leaders Table -->
          <div class="my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-900 text-amber-400 font-semibold border-b border-slate-800">
                <tr>
                  <th class="p-3">Leader / Revolutionary</th>
                  <th class="p-3">Community / Region</th>
                  <th class="p-3">Historical Significance & Specific Oppressor Resisted</th>
                  <th class="p-3">PYQ Reference</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-slate-300">
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Chityala Ailamma (Chakali Ilamma)</td>
                  <td class="p-3">Palakurthi, Jangaon</td>
                  <td class="p-3">Symbol of peasant armed struggle. Resisted land grabbing by feudal landlord <strong class="text-slate-100">Visnuru Ramachandra Reddy</strong> (Visnuru Dora). Her resistance sparked the rural uprising in 1946.</td>
                  <td class="p-3 font-mono text-xs text-amber-400 font-semibold">[PYQ-0589]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Bhukya Balya</td>
                  <td class="p-3">Lambada Community</td>
                  <td class="p-3">Prominent tribal/Lambada leader who led fierce resistance against Visnuru Dora's forced labor (vetti) and illegal land grabs.</td>
                  <td class="p-3 font-mono text-xs text-amber-400 font-semibold">[PYQ-0145]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Doddi Komarayya</td>
                  <td class="p-3">Kadavendi village</td>
                  <td class="p-3">Martyred on July 4, 1946 when Visnuru Dora's armed goons opened fire. His martyrdom triggered the full-blown armed struggle.</td>
                  <td class="p-3 font-mono text-xs text-slate-400">High-Yield Fact</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Konda Venkat Ranga Reddy</td>
                  <td class="p-3">Hyderabad Congress</td>
                  <td class="p-3"><strong class="text-rose-400">NOT associated with Communist Armed Struggle.</strong> He was an Indian National Congress leader and former Deputy CM of AP.</td>
                  <td class="p-3 font-mono text-xs text-amber-400 font-semibold">[PYQ-0608]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Operation Polo Sub-section -->
          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            Operation Polo (Police Action - September 1948)
          </h3>
          <p>
            When Nizam VII (Mir Osman Ali Khan) refused to accede to the Indian Union and encouraged Kasim Razvi's paramilitary <em class="text-amber-300 font-normal">Razakars</em>, the Union Government launched a military action codenamed <strong>Operation Polo</strong> (popularly known as Police Action).
          </p>

          <!-- Facts Box: Operation Polo Officers -->
          <div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 my-4 text-xs sm:text-sm">
            <div class="font-bold text-emerald-400 text-base mb-2 flex items-center gap-2">
              <span>🛡️ Key Commanders of Operation Polo (Crucial Exam Matches)</span>
            </div>
            <ul class="space-y-2 list-disc list-inside">
              <li>
                <strong class="text-slate-100">Military Plan Architect:</strong> Lieutenant General <strong>Eric Goddard</strong> (GOC-in-C, Southern Command prepared the operational plan). <span class="font-mono text-emerald-400 text-xs">[PYQ-0144]</span>
              </li>
              <li>
                <strong class="text-slate-100">GOC-in-C Southern Command during Action:</strong> Lieutenant General <strong>Rajendrasinhji Jadeja</strong> (Lt. Gen. Rajendra Singh). <span class="font-mono text-emerald-400 text-xs">[PYQ-0604]</span>
              </li>
              <li>
                <strong class="text-slate-100">Field Commander (Striking Force):</strong> Major General <strong>J.N. Chaudhuri</strong> (led the entry into Hyderabad and served as Military Governor 1948-1949).
              </li>
              <li>
                <strong class="text-slate-100">Commander-in-Chief of Nizam's Army:</strong> Major General <strong>Syed Ahmed El Edroos</strong> (surrendered to Indian Army on September 17, 1948). <span class="font-mono text-emerald-400 text-xs">[PYQ-0607]</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- SECTION 02: 1952 MULKI MOVEMENT & GENTLEMEN'S AGREEMENT -->
      <section id="section-02" class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">02</span>
          <h2 class="text-2xl font-bold text-slate-100">1952 Mulki Agitation & Gentlemen's Agreement (1956)</h2>
        </div>

        <div class="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            The origin of safeguards for locals traces back to Nizam rules. In <strong>1868</strong>, Prime Minister <strong>Salar Jung I</strong> issued an administrative order directing that local Mulkis must be given priority in civil services due to growing discontent over non-mulkis (Afaghis/Ghars) occupying top administrative posts <span class="font-mono text-amber-400 text-xs">[PYQ-0392]</span>.
          </p>

          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3">1952 Mulki Agitation & Police Firing</h3>
          <p>
            After Hyderabad State was integrated, non-mulki personnel were recruited in large numbers into schools and government departments, violating local domicile rights (15-year residence rule).
          </p>

          <!-- Warning Callout Box -->
          <div class="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 my-4 text-xs sm:text-sm">
            <div class="font-bold text-amber-400 text-base mb-1 flex items-center gap-2">
              <span>⚠️ Important Inquiry Commission: Justice Jaganmohan Reddy Commission</span>
            </div>
            <p>
              On September 3 and 4, 1952, police fired upon protesting students at <strong>City College, Hyderabad</strong>, killing several students. Chief Minister <strong>Burgula Ramakrishna Rao</strong> appointed the <strong>Justice Jaganmohan Reddy Commission</strong> to investigate the firing incident and student grievances. <span class="font-mono text-amber-300 text-xs">[PYQ-0147]</span>
            </p>
          </div>

          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3">The Gentlemen's Agreement (February 20, 1956)</h3>
          <p>
            To merge Telangana with Andhra State and create Andhra Pradesh, leaders signed the Gentlemen's Agreement at Hyderabad House, New Delhi on February 20, 1956.
          </p>

          <!-- Table of Gentlemen's Agreement Signatories -->
          <div class="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-900 text-amber-400 font-semibold border-b border-slate-800">
                <tr>
                  <th class="p-3">Region</th>
                  <th class="p-3">4 Key Signatories</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-slate-300">
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-amber-300">Telangana Region (4)</td>
                  <td class="p-3">Burgula Ramakrishna Rao (CM), K.V. Ranga Reddy, Marri Chenna Reddy, J.V. Narsing Rao</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-sky-300">Andhra Region (4)</td>
                  <td class="p-3">B. Gopala Reddy (CM), Neelam Sanjiva Reddy, Gouthu Latchanna, Alluri Satyanarayana Raju</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- TRC Note -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300">
            <strong class="text-slate-100 block mb-1">Telangana Regional Committee (TRC):</strong>
            As stipulated in the Gentlemen's Agreement, the Statutory TRC was created under Article 371(1). <strong class="text-amber-400">K. Achyutha Reddy</strong> served as the first Chairman/President of the Telangana Regional Committee. <span class="font-mono text-amber-400 text-xs">[PYQ-0384]</span>
          </div>
        </div>
      </section>

      <!-- SECTION 03: 1969 JAI TELANGANA MOVEMENT & FORMULAS -->
      <section id="section-03" class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">03</span>
          <h2 class="text-2xl font-bold text-slate-100">1969 Jai Telangana Agitation, Formulas & Committees</h2>
        </div>

        <div class="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Widespread violations of the Gentlemen's Agreement, revenue surplus diversion, and illegal recruitment of non-mulkis triggered the historic 1969 agitation.
          </p>

          <!-- Key Trigger Fact -->
          <div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 my-4 text-xs sm:text-sm">
            <strong class="text-emerald-400 block mb-1">The Spark: Annabathula Ravindranath's Fast</strong>
            On <strong>January 8, 1969</strong>, Annabathula Ravindranath, a B.A. student from Khammam Arts College, began an indefinite fast demanding implementation of Telangana safeguards and Mulki rules. This ignited student protests across Osmania University and the entire state. <span class="font-mono text-emerald-400 text-xs">[PYQ-0148]</span>
          </div>

          <!-- Chronology Table of Formulas & Orders -->
          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3">Chronological Sequence of Political Settlement Formulas</h3>
          
          <div class="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-900 text-amber-400 font-semibold border-b border-slate-800">
                <tr>
                  <th class="p-3">Order</th>
                  <th class="p-3">Formula / Settlement</th>
                  <th class="p-3">Date / Year</th>
                  <th class="p-3">Prime Minister / Context</th>
                  <th class="p-3">PYQ Reference</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-slate-300">
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">1</td>
                  <td class="p-3 font-semibold text-slate-100">Eight Point Formula</td>
                  <td class="p-3">April 11, 1969</td>
                  <td class="p-3">PM Indira Gandhi in Lok Sabha</td>
                  <td class="p-3 font-mono text-xs text-amber-400" rowspan="4">[PYQ-0149]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">2</td>
                  <td class="p-3 font-semibold text-slate-100">Five Point Formula</td>
                  <td class="p-3">November 27, 1972</td>
                  <td class="p-3">PM Indira Gandhi (Post Mulki Rules SC judgment)</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">3</td>
                  <td class="p-3 font-semibold text-slate-100">Six Point Formula</td>
                  <td class="p-3">September 21, 1973</td>
                  <td class="p-3">Bilateral accord ending Jai Andhra & Jai Telangana agitations</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">4</td>
                  <td class="p-3 font-semibold text-slate-100">The Presidential Order</td>
                  <td class="p-3">October 20, 1975</td>
                  <td class="p-3">Issued under Art. 371-D (32nd Constitutional Amendment)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Committees Table -->
          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3">Key High-Yield Committees & Commissions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span class="text-amber-400 font-bold block mb-1">Justice K.N. Wanchoo Committee (1969)</span>
              <p class="text-slate-300">
                Appointed by Central Government in April 1969 to recommend constitutional amendments necessary for continuing Mulki rules in recruitment after Supreme Court struck down Section 3 of Public Employment Act 1957. <span class="font-mono text-amber-400 text-xs">[PYQ-0610]</span>
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span class="text-amber-400 font-bold block mb-1">J.M. Girglani One-Man Commission (2001)</span>
              <p class="text-slate-300">
                Appointed in June 2001 by CM N. Chandrababu Naidu to examine the total non-implementation and widespread circumvention of G.O. 610 (which directed repatriation of non-local employees from Zone V and VI). <span class="font-mono text-amber-400 text-xs">[PYQ-0609]</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 04: ORGANISATIONAL PHASE & CULTURAL RENAISSANCE -->
      <section id="section-04" class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">04</span>
          <h2 class="text-2xl font-bold text-slate-100">Organisational Phase (1980s-1990s) & Cultural Renaissance</h2>
        </div>

        <div class="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            During the 1980s and 1990s, when political parties ignored statehood, civil society groups, intellectuals, and cultural organizations revived the movement through literature, songs, and public forums.
          </p>

          <!-- Match Organization High-Yield Table -->
          <div class="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-900 text-amber-400 font-semibold border-b border-slate-800">
                <tr>
                  <th class="p-3">Organization / Trust</th>
                  <th class="p-3">Founding Year</th>
                  <th class="p-3">Key Founder / Associated Personality</th>
                  <th class="p-3">PYQ Match Anchors</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-slate-300">
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Telangana Information Trust</td>
                  <td class="p-3 font-mono text-amber-300">1986 / 1989</td>
                  <td class="p-3">Telangana Prabhakar / Prabhakar Rao</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0150, PYQ-0390, PYQ-0408]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Telangana Students Forum</td>
                  <td class="p-3 font-mono text-amber-300">1991</td>
                  <td class="p-3">Osmania University Student Activists</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0150]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Telangana Ikya Vedica</td>
                  <td class="p-3 font-mono text-amber-300">1997</td>
                  <td class="p-3">Prof. Jayashankar, Prof. Keshav Rao Jadhav</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0150]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Telangana Janasabha</td>
                  <td class="p-3 font-mono text-amber-300">1998</td>
                  <td class="p-3">Akula Bhoomaiah</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0150]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Telangana Students Liberation Org (TSLO)</td>
                  <td class="p-3 font-mono text-amber-300">1990s</td>
                  <td class="p-3">K. Manohar Reddy</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0390, PYQ-0408]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Centre for Dalit Studies</td>
                  <td class="p-3 font-mono text-amber-300">1990s</td>
                  <td class="p-3">Mallepally Laxmaiah</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0390, PYQ-0408]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Telangana Pragativedika</td>
                  <td class="p-3 font-mono text-amber-300">1990s</td>
                  <td class="p-3">Rapolu Ananda Bhaskar</td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0390, PYQ-0408]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-semibold text-slate-100">Golla Kuruma Hakkula Porata Samithi</td>
                  <td class="p-3 font-mono text-amber-300">1990s</td>
                  <td class="p-3">Dubbagatla Narsing Rao <span class="text-rose-400 font-normal">(NOT Munnuru Kapu)</span></td>
                  <td class="p-3 font-mono text-xs text-amber-400">[PYQ-0153]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- SECTION 05: FINAL PHASE AGITATION & FORMATION -->
      <section id="section-05" class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">05</span>
          <h2 class="text-2xl font-bold text-slate-100">Final Phase Agitation (2009-2014) & AP Reorganisation Act</h2>
        </div>

        <div class="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <!-- Fast Unto Death & Student Role -->
          <p>
            The final mass surge began on <strong>November 29, 2009</strong>, when K. Chandrashekar Rao (KCR) declared a fast-unto-death. On November 28, 2009, police reached North Telangana Bhavan in Karimnagar to arrest KCR before he reached Siddipet <span class="font-mono text-amber-400 text-xs">[PYQ-0606]</span>. Osmania and Kakatiya University students joined immediately, proving student involvement to be inseparable from the movement <span class="font-mono text-amber-400 text-xs">[PYQ-0606]</span>.
          </p>

          <!-- TJAC & Srikrishna Committee -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <strong class="text-amber-400 block mb-1">Telangana Joint Action Committee (TJAC)</strong>
              <p>
                Formed in December 2009 with <strong>Prof. M. Kodandaram</strong> as Convener to unite political parties (TRS, CPI, BJP, CPI-ML ND) and employee/student JACs. Advocate JAC convener was <strong>Tanneru Sriranga Rao</strong> <span class="font-mono text-amber-400 text-xs">[PYQ-0152, PYQ-0391]</span>.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <strong class="text-amber-400 block mb-1">Justice B.N. Srikrishna Committee (2010)</strong>
              <p>
                5-member committee appointed on Feb 3, 2010. Members: Justice B.N. Srikrishna (Chairman), Prof. Ranbir Singh, Dr. Abusaleh Shariff, Prof. Ravinder Kaur, Vinod K. Duggal (Member-Secretary) <span class="font-mono text-amber-400 text-xs">[PYQ-0388]</span>.
              </p>
            </div>
          </div>

          <!-- Chronology of Protests Table -->
          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3">Chronology of Historic Mass Agitation Programs</h3>
          
          <div class="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-900 text-amber-400 font-semibold border-b border-slate-800">
                <tr>
                  <th class="p-3">Order</th>
                  <th class="p-3">Historic Event / Program</th>
                  <th class="p-3">Exact Date / Period</th>
                  <th class="p-3">Key Detail & Organizer</th>
                  <th class="p-3">PYQ Reference</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-slate-300">
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">1</td>
                  <td class="p-3 font-semibold text-slate-100">Million March</td>
                  <td class="p-3 font-mono text-xs">March 10, 2011</td>
                  <td class="p-3">Organized by TJAC on Tank Bund, Hyderabad</td>
                  <td class="p-3 font-mono text-xs text-amber-400" rowspan="4">[PYQ-0151, PYQ-0154]</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">2</td>
                  <td class="p-3 font-semibold text-slate-100">Sakala Janula Samme (All People's Strike)</td>
                  <td class="p-3 font-mono text-xs">Sep 13 - Oct 24, 2011 (42 Days)</td>
                  <td class="p-3">TJAC led strike paralysis of public services</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">3</td>
                  <td class="p-3 font-semibold text-slate-100">Telangana Sagaraharam (Human Chain around Hussain Sagar)</td>
                  <td class="p-3 font-mono text-xs">September 30, 2012</td>
                  <td class="p-3">Massive human chain around Hussain Sagar Lake</td>
                </tr>
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-mono font-bold text-amber-400">4</td>
                  <td class="p-3 font-semibold text-slate-100">Sadak Bandh (National Highway 7 Blockade)</td>
                  <td class="p-3 font-mono text-xs">March 21, 2013</td>
                  <td class="p-3">Blockade of NH-7 from Shamshabad to Alampur</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Konda Laxman Bapuji Satyagraha & AP Reorganisation Bill -->
          <div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 my-4 text-xs sm:text-sm">
            <strong class="text-emerald-400 block mb-1">Konda Laxman Bapuji Satyagraha in Delhi (2012)</strong>
            Veteran freedom fighter and pioneer Telangana leader <strong>Konda Laxman Bapuji</strong> undertook a 7-day Satyagraha at <strong>Jantar Mantar in Delhi</strong> in 2012 to demand statehood for Telangana. <span class="font-mono text-emerald-400 text-xs">[PYQ-0611]</span>
          </div>

          <h3 class="text-lg font-bold text-slate-100 mt-6 mb-3">AP Reorganisation Bill 2014 Key Timeline</h3>
          <ul class="space-y-2 list-disc list-inside text-xs sm:text-sm">
            <li>
              <strong class="text-slate-100">Introduction in Lok Sabha:</strong> Introduced by Home Minister <strong>Sushil Kumar Shinde</strong> on <strong>February 13, 2014</strong>. <span class="font-mono text-amber-400 text-xs">[PYQ-0155]</span>
            </li>
            <li>
              <strong class="text-slate-100">Lok Sabha Passed:</strong> February 18, 2014
            </li>
            <li>
              <strong class="text-slate-100">Rajya Sabha Passed:</strong> February 20, 2014
            </li>
            <li>
              <strong class="text-slate-100">Presidential Assent (Pranab Mukherjee):</strong> March 1, 2014
            </li>
            <li>
              <strong class="text-slate-100">Appointed Day (Telangana State Formation):</strong> <strong>June 2, 2014</strong>
            </li>
          </ul>
        </div>
      </section>

      <!-- Gate Quiz Assessment -->
      <GateQuiz note-id="NOTE-TEL-MOVEMENT" />
    </main>
  </div>
</template>