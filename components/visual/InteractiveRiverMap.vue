<script setup lang="ts">
type RiverSystem = {
  id: string
  name: string
  basin: string
  path: string
  labelX: number
  labelY: number
  labelAnchor?: 'start' | 'middle' | 'end'
  origin: string
  outflow: string
  leftBank: string[]
  rightBank: string[]
  projects: string[]
  pyqIds: string[]
}

const rivers: RiverSystem[] = [
  {
    id: 'indus',
    name: 'Indus',
    basin: 'Himalayan',
    path: 'M188 148 C164 188 157 227 163 272 C169 322 151 365 132 409 C118 441 118 475 122 502',
    labelX: 96,
    labelY: 264,
    labelAnchor: 'start',
    origin: 'Near Lake Manasarovar on the Tibetan Plateau',
    outflow: 'Arabian Sea, through Pakistan',
    leftBank: ['Zanskar', 'Jhelum', 'Chenab', 'Ravi', 'Beas', 'Sutlej'],
    rightBank: ['Shyok', 'Gilgit', 'Kabul'],
    projects: ['Bhakra Nangal project on the Sutlej, an Indus-system river'],
    pyqIds: []
  },
  {
    id: 'ganga',
    name: 'Ganga',
    basin: 'Himalayan',
    path: 'M326 257 C353 266 382 276 416 284 C452 292 477 306 498 327 C518 346 538 357 560 366',
    labelX: 421,
    labelY: 252,
    labelAnchor: 'middle',
    origin: 'Gangotri Glacier, Uttarakhand, as the Bhagirathi',
    outflow: 'Bay of Bengal through the Ganga-Brahmaputra delta',
    leftBank: ['Ramganga', 'Gomti', 'Ghaghara', 'Gandak', 'Kosi', 'Mahananda'],
    rightBank: ['Yamuna', 'Son', 'Punpun', 'Damodar'],
    projects: ['Tehri project', 'Farakka Barrage'],
    pyqIds: ['PYQ-2016-M-64-P2']
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra',
    basin: 'Himalayan',
    path: 'M573 226 C615 217 653 229 675 253 C693 273 686 292 658 297 C624 304 602 317 578 341',
    labelX: 645,
    labelY: 208,
    labelAnchor: 'middle',
    origin: 'Tibetan Plateau, where it is known as the Tsangpo',
    outflow: 'Bay of Bengal through Bangladesh',
    leftBank: ['Dibang', 'Lohit', 'Subansiri', 'Kameng', 'Manas', 'Sankosh'],
    rightBank: ['Burhi Dihing', 'Disang', 'Dikhow', 'Dhansiri', 'Kopili'],
    projects: ['Lower Subansiri hydroelectric project in the basin'],
    pyqIds: ['PYQ-2016-M-75-P2']
  },
  {
    id: 'mahanadi',
    name: 'Mahanadi',
    basin: 'Peninsular',
    path: 'M469 407 C498 400 526 404 550 420 C572 435 589 449 607 462',
    labelX: 553,
    labelY: 394,
    labelAnchor: 'middle',
    origin: 'Sihawa Hills, Chhattisgarh',
    outflow: 'Bay of Bengal, Odisha',
    leftBank: ['Seonath', 'Hasdeo', 'Mand', 'Ib'],
    rightBank: ['Ong', 'Tel'],
    projects: ['Hirakud Dam'],
    pyqIds: []
  },
  {
    id: 'godavari',
    name: 'Godavari',
    basin: 'Peninsular',
    path: 'M348 440 C385 432 425 440 457 458 C494 479 528 491 565 496 C590 499 610 506 628 522',
    labelX: 476,
    labelY: 446,
    labelAnchor: 'middle',
    origin: 'Trimbakeshwar, Maharashtra',
    outflow: 'Bay of Bengal, Andhra Pradesh',
    leftBank: ['Pranhita', 'Indravati', 'Sabari'],
    rightBank: ['Manjira', 'Manair'],
    projects: ['Sriram Sagar Project', 'Kaleshwaram Lift Irrigation Scheme', 'Polavaram Project'],
    pyqIds: ['PYQ-2016-M-64-P2']
  },
  {
    id: 'krishna',
    name: 'Krishna',
    basin: 'Peninsular',
    path: 'M320 499 C357 501 389 507 425 517 C465 529 500 539 540 548 C562 553 582 565 600 580',
    labelX: 456,
    labelY: 539,
    labelAnchor: 'middle',
    origin: 'Near Mahabaleshwar, Maharashtra',
    outflow: 'Bay of Bengal, Andhra Pradesh',
    leftBank: ['Bhima', 'Musi', 'Munneru'],
    rightBank: ['Koyna', 'Ghataprabha', 'Malaprabha', 'Tungabhadra'],
    projects: ['Nagarjuna Sagar', 'Srisailam', 'Priyadarshini Jurala'],
    pyqIds: ['PYQ-2016-M-64-P2', 'PYQ-2016-M-69-P2']
  },
  {
    id: 'narmada',
    name: 'Narmada',
    basin: 'West-flowing',
    path: 'M435 452 C403 455 371 463 334 470 C294 476 256 473 224 464',
    labelX: 332,
    labelY: 455,
    labelAnchor: 'middle',
    origin: 'Amarkantak Plateau, Madhya Pradesh',
    outflow: 'Arabian Sea through the Gulf of Khambhat',
    leftBank: ['Burhner', 'Banjar', 'Sher', 'Shakkar', 'Dudhi'],
    rightBank: ['Hiran', 'Tawa', 'Kolar', 'Orsang'],
    projects: ['Sardar Sarovar Project', 'Indira Sagar Project'],
    pyqIds: ['PYQ-2016-M-68-P2', 'PYQ-2016-M-69-P2', 'PYQ-2018-P-158']
  },
  {
    id: 'tapi',
    name: 'Tapi',
    basin: 'West-flowing',
    path: 'M428 488 C390 491 351 499 318 510 C279 523 245 529 216 526',
    labelX: 319,
    labelY: 504,
    labelAnchor: 'middle',
    origin: 'Satpura Range near Multai, Madhya Pradesh',
    outflow: 'Arabian Sea through the Gulf of Khambhat',
    leftBank: ['Purna', 'Girna', 'Panjhra', 'Bori'],
    rightBank: ['Vaghur', 'Gomai', 'Arunavati'],
    projects: ['Ukai Dam'],
    pyqIds: []
  },
  {
    id: 'cauvery',
    name: 'Cauvery',
    basin: 'Peninsular',
    path: 'M408 630 C443 638 478 651 511 672 C537 689 557 711 573 741',
    labelX: 499,
    labelY: 648,
    labelAnchor: 'middle',
    origin: 'Brahmagiri Hills, Karnataka',
    outflow: 'Bay of Bengal at Poompuhar, Tamil Nadu',
    leftBank: ['Harangi', 'Hemavati', 'Shimsha', 'Arkavati'],
    rightBank: ['Lakshmana Tirtha', 'Kabini', 'Bhavani', 'Noyyal', 'Amaravati'],
    projects: ['Krishna Raja Sagara Dam', 'Mettur Dam'],
    pyqIds: ['PYQ-2016-M-68-P2', 'PYQ-2016-M-69-P2']
  }
]

const selectedId = ref<string | null>(null)
const hoveredId = ref<string | null>(null)
const isOpen = computed({
  get: () => selectedId.value !== null,
  set: (value: boolean) => {
    if (!value) selectedId.value = null
  }
})
const selectedRiver = computed(() => rivers.find((river) => river.id === selectedId.value) ?? null)

function openRiver(river: RiverSystem) {
  selectedId.value = river.id
}

function riverStroke(river: RiverSystem) {
  return river.id === selectedId.value || river.id === hoveredId.value ? '#f59e0b' : '#38bdf8'
}
</script>

<template>
  <section class="rounded-2xl border border-white/10 bg-[#0c0d0e] p-4 text-stone-100 shadow-2xl shadow-black/20 sm:p-6">
    <header class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Spatial anchor</p>
        <h2 class="mt-1 text-xl font-bold tracking-tight text-white">India river systems</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-stone-400">Select a river for basin facts, tributary banks and major projects.</p>
      </div>
      <div class="flex items-center gap-3 text-xs text-stone-400" aria-label="Map legend">
        <span class="flex items-center gap-1.5"><i class="h-2.5 w-2.5 rounded-full bg-sky-400" /> River</span>
        <span class="flex items-center gap-1.5"><i class="h-2.5 w-2.5 rounded-full bg-amber-500" /> Active</span>
      </div>
    </header>

    <div class="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#111417] to-slate-900 p-2 sm:p-4">
      <svg
        class="h-auto w-full min-w-[560px]"
        viewBox="0 0 760 860"
        role="img"
        aria-label="Interactive schematic map of India showing nine major river systems"
      >
        <title>Major river systems of India</title>
        <desc>Select a labelled river to open its origin, outflow, tributaries, projects and verified PYQ references.</desc>
        <defs>
          <linearGradient id="indiaLand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#27272a" />
            <stop offset="1" stop-color="#18181b" />
          </linearGradient>
          <filter id="riverGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path
          d="M214 110 L250 88 L287 111 L325 102 L358 120 L396 113 L438 132 L482 131 L513 151 L551 155 L587 190 L602 222 L642 230 L689 256 L675 300 L637 315 L611 345 L600 380 L621 410 L626 451 L607 489 L617 528 L599 561 L585 605 L567 640 L573 689 L553 735 L525 765 L495 743 L481 708 L451 682 L425 642 L398 608 L369 576 L335 556 L301 531 L271 510 L246 476 L223 440 L210 405 L190 379 L186 341 L171 307 L166 266 L178 228 L174 190 L192 154 Z"
          fill="url(#indiaLand)"
          stroke="#57534e"
          stroke-width="2"
          aria-hidden="true"
        />
        <path d="M610 538 L630 550 L641 570 L630 589 L613 577 L604 557 Z" fill="#27272a" stroke="#57534e" stroke-width="1.5" aria-hidden="true" />
        <path d="M684 315 L704 327 L713 350 L703 366 L685 352 Z" fill="#27272a" stroke="#57534e" stroke-width="1.5" aria-hidden="true" />

        <g v-for="river in rivers" :key="river.id">
          <path
            :d="river.path"
            fill="none"
            :stroke="riverStroke(river)"
            :stroke-width="river.id === hoveredId || river.id === selectedId ? 8 : 5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :filter="river.id === hoveredId || river.id === selectedId ? 'url(#riverGlow)' : undefined"
            class="cursor-pointer outline-none transition-all duration-150"
            role="button"
            tabindex="0"
            :aria-label="`Open ${river.name} river facts`"
            @click="openRiver(river)"
            @mouseenter="hoveredId = river.id"
            @mouseleave="hoveredId = null"
            @focus="hoveredId = river.id"
            @blur="hoveredId = null"
            @keydown.enter.prevent="openRiver(river)"
            @keydown.space.prevent="openRiver(river)"
          />
          <text
            :x="river.labelX"
            :y="river.labelY"
            :text-anchor="river.labelAnchor ?? 'middle'"
            class="pointer-events-none select-none fill-stone-100 text-[14px] font-semibold"
          >{{ river.name }}</text>
        </g>
        <text x="245" y="815" class="fill-stone-500 text-[12px]">Schematic map. It shows basin relationships, not survey boundaries.</text>
      </svg>
    </div>

    <p class="mt-4 text-xs leading-5 text-stone-500">PYQ badges identify questions traceable to the local verified PYQ collection. Other panel details are study facts.</p>

    <USlideover v-model="isOpen" side="right" :ui="{ width: 'w-full max-w-xl', background: 'bg-[#0c0d0e]', ring: 'ring-white/10', padding: 'p-0' }">
      <div v-if="selectedRiver" class="flex h-full flex-col bg-[#0c0d0e] text-stone-100">
        <header class="border-b border-white/10 px-5 py-5 sm:px-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">{{ selectedRiver.basin }} system</p>
              <h3 class="mt-1 text-2xl font-bold text-white">{{ selectedRiver.name }} River</h3>
            </div>
            <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" aria-label="Close river facts" @click="isOpen = false" />
          </div>
        </header>

        <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <dl class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <dt class="text-xs font-semibold uppercase tracking-wide text-stone-500">Origin</dt>
              <dd class="mt-2 text-sm leading-6 text-stone-200">{{ selectedRiver.origin }}</dd>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <dt class="text-xs font-semibold uppercase tracking-wide text-stone-500">Outflow</dt>
              <dd class="mt-2 text-sm leading-6 text-stone-200">{{ selectedRiver.outflow }}</dd>
            </div>
          </dl>

          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <section class="rounded-xl border border-white/10 p-4" :aria-label="`${selectedRiver.name} left-bank tributaries`">
              <h4 class="text-sm font-bold text-amber-400">Left-bank tributaries</h4>
              <ul class="mt-3 space-y-2 text-sm text-stone-300">
                <li v-for="tributary in selectedRiver.leftBank" :key="tributary" class="flex gap-2"><span class="text-amber-500">•</span>{{ tributary }}</li>
              </ul>
            </section>
            <section class="rounded-xl border border-white/10 p-4" :aria-label="`${selectedRiver.name} right-bank tributaries`">
              <h4 class="text-sm font-bold text-sky-300">Right-bank tributaries</h4>
              <ul class="mt-3 space-y-2 text-sm text-stone-300">
                <li v-for="tributary in selectedRiver.rightBank" :key="tributary" class="flex gap-2"><span class="text-sky-400">•</span>{{ tributary }}</li>
              </ul>
            </section>
          </div>

          <section class="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4" aria-label="Major projects">
            <h4 class="text-sm font-bold text-white">Major dams and projects</h4>
            <ul class="mt-3 space-y-2 text-sm leading-6 text-stone-300">
              <li v-for="project in selectedRiver.projects" :key="project" class="flex gap-2"><span class="text-emerald-400">•</span>{{ project }}</li>
            </ul>
          </section>

          <section v-if="selectedRiver.pyqIds.length" class="mt-5" aria-label="Verified PYQ references">
            <h4 class="text-sm font-bold text-white">Verified PYQ references</h4>
            <div class="mt-3 flex flex-wrap gap-2">
              <UBadge v-for="pyqId in selectedRiver.pyqIds" :key="pyqId" color="amber" variant="subtle">{{ pyqId }}</UBadge>
            </div>
          </section>
        </div>
      </div>
    </USlideover>
  </section>
</template>
