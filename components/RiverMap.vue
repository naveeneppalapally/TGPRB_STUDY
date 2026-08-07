<template>
  <div class="river-map">
    <!-- Toolbar: mode + layers -->
    <div class="rm-toolbar">
      <div class="rm-mode" role="tablist">
        <button
          type="button"
          class="rm-mode-btn"
          :class="{ 'is-on': mode === 'explore' }"
          role="tab"
          @click="mode = 'explore'"
        >Explore</button>
        <button
          type="button"
          class="rm-mode-btn"
          :class="{ 'is-on': mode === 'quiz' }"
          role="tab"
          @click="mode = 'quiz'"
        >Quiz</button>
      </div>
      <div class="rm-layers">
        <button
          v-for="layer in layerOptions"
          :key="layer.key"
          type="button"
          class="chip chip-mono"
          :class="{ 'chip-saffron': layers[layer.key] }"
          @click="layers[layer.key] = !layers[layer.key]"
        >{{ layer.label }}</button>
      </div>
    </div>

    <div class="rm-body" :class="{ 'is-quiz': mode === 'quiz' }">
      <!-- ══ The physical map ══ -->
      <div class="rm-map">
        <svg
          ref="svg"
          :viewBox="viewBox"
          class="rm-svg"
          role="img"
          aria-label="Physical map of Indian river systems"
        >
          <!-- Telangana (exam state) -->
          <path :d="tsOutline" class="rm-ts" :class="{ 'is-hidden': !layers.systems }" />
          <text v-if="layers.systems" x="330" y="608" class="rm-ts-label">TELANGANA</text>

          <!-- Mountain ranges (answer the Narmada/Vindhya PYQ) -->
          <g :class="{ 'is-hidden': !layers.systems }">
            <path :d="vindhyaD" class="rm-range" />
            <text x="300" y="462" class="rm-range-label" transform="rotate(-8 300 462)">VINDHYAS</text>
            <path :d="satpuraD" class="rm-range" />
            <text x="196" y="566" class="rm-range-label">SATPURAS</text>
          </g>

          <!-- India outline -->
          <path :d="indiaD" class="rm-india" />

          <!-- Rivers -->
          <g v-for="r in rivers" :key="r.id">
            <path
              :d="r.d"
              class="rm-river"
              :class="[r.cls, { 'rm-hot-now': r.hot && layers.hot, 'rm-off': !riverVisible(r), 'rm-focused': focusId === r.id, 'rm-wrong-flash': wrongId === r.id, 'rm-right-flash': rightId === r.id }]"
              :style="riverStyle(r)"
              :data-river="r.id"
              @click="pick(r)"
              @mouseenter="hover = r"
              @mouseleave="hover && hover.id === r.id && (hover = null)"
            />
            <text
              v-if="r.label && riverLabelShown(r)"
              :x="r.lx"
              :y="r.ly"
              class="rm-label"
              :class="{ 'rm-hot-label': r.hot }"
            >{{ r.label }}</text>
          </g>

          <!-- Dams -->
          <g v-for="d in dams" :key="d.id" :class="{ 'is-hidden': !layers.dams }">
            <path :d="damGlyph(d)" class="rm-dam" @click="pickId(d.on)" />
            <text :x="d.x + (d.dx || 7)" :y="d.y + (d.dy || 4)" class="rm-dam-label">{{ d.label }}</text>
          </g>

          <!-- Waterfalls -->
          <g v-for="f in falls" :key="f.id" :class="{ 'is-hidden': !layers.dams }">
            <circle :cx="f.x" :cy="f.y" r="5" class="rm-fall" @click="pickId(f.on)" />
            <path :d="`M ${f.x - 4} ${f.y - 7} q 4 6 8 0`" class="rm-fall-sheet" />
            <text :x="f.x + 8" :y="f.y + 3" class="rm-dam-label">{{ f.label }}</text>
          </g>

          <!-- PYQ hotspots -->
          <g v-for="h in hotspots" :key="h.id" :class="{ 'is-hidden': !layers.hot }">
            <circle :cx="h.x" :cy="h.y" r="9" class="rm-hot" />
            <circle :cx="h.x" :cy="h.y" r="2.5" class="rm-hot-core" />
            <text :x="h.x + 12" :y="h.y + 3" class="rm-hot-label">{{ h.label }}</text>
          </g>

          <!-- Quiz highlight target (explained in panel) -->
          <circle v-if="mode === 'quiz' && quizTarget" :cx="quizTarget.x" :cy="quizTarget.y" r="14" class="rm-quiz-marker">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <!-- ══ Side panel ══ -->
      <aside class="rm-panel">
        <!-- EXPLORE -->
        <template v-if="mode === 'explore'">
          <div v-if="!selectedRiver" class="rm-empty">
            <UIcon name="i-heroicons-map" class="h-5 w-5 accent" />
            <p class="rm-empty-title">Tap a river to inspect it</p>
            <p class="rm-empty-sub">
              Turn on <span class="chip chip-saffron chip-mono">Hotspots</span> in the toolbar
              to light up every fact TGPRB has already asked about.
            </p>
          </div>
          <transition name="rm-pop" mode="out-in">
            <div v-if="selectedRiver" :key="selectedRiver.id" class="rm-fact">
              <div class="rm-fact-head">
                <span class="chip chip-mono" :class="selectedRiver.chipClass">{{ selectedRiver.chipLabel }}</span>
                <span v-if="selectedRiver.hot" class="chip chip-saffron chip-mono"><span class="dot" />PYQ</span>
              </div>
              <h4 class="rm-fact-name">{{ selectedRiver.name }}</h4>
              <dl class="rm-fact-rows">
                <div v-for="row in selectedRiver.facts" :key="row.k" class="rm-fact-row">
                  <dt class="rm-fact-k">{{ row.k }}</dt>
                  <dd class="rm-fact-v">{{ row.v }}</dd>
                </div>
              </dl>
            </div>
          </transition>
        </template>

        <!-- QUIZ -->
        <template v-else>
          <div v-if="quizDone" class="rm-empty">
            <p class="rm-score-big num">{{ quizCorrect }}/{{ quizTotal }}</p>
            <p class="rm-empty-title">{{ quizCorrect === quizTotal ? 'Map mastered' : 'Good - brush the misses' }}</p>
            <button type="button" class="btn-primary rm-restart" @click="restartQuiz">Quiz again</button>
          </div>
          <div v-else>
            <p class="eyebrow mb-2">Map recall · {{ quizIndex + 1 }}/{{ quizTotal }}</p>
            <p class="rm-q">{{ quiz.prompt }}</p>
            <p v-if="quizMsg" class="rm-msg" :class="quizMsgOk ? 'is-ok' : 'is-no'">{{ quizMsg }}</p>
            <p class="rm-qsub">Click the river on the map.<template v-if="quizMissed > 0"> Missed {{ quizMissed }} so far.</template></p>
          </div>
        </template>
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ focus?: string }>()
const emit = defineEmits<{ focus: [id: string] }>()

const viewBox = '0 0 800 980'
const mode = ref<'explore' | 'quiz'>('explore')
const layers = reactive({ systems: true, tribs: true, dams: true, hot: true })
const layerOptions = [
  { key: 'systems', label: 'Systems' },
  { key: 'tribs',   label: 'Tributaries' },
  { key: 'dams',    label: 'Dams & falls' },
  { key: 'hot',     label: 'Hotspots' },
]

const hover = ref<any>(null)
const selectedId = ref<string | null>(null)
const focusId = ref<string | null>(null)
const wrongId = ref<string | null>(null)
const rightId = ref<string | null>(null)
const svg = ref<SVGSVGElement | null>(null)

const byId = new Map<string, any>()

/* ── Map outlines (simplified, stylized) ─────────────────────────────── */
const indiaD = 'M 430 30 L 417 78 L 442 116 L 419 160 L 401 186 L 361 196 L 331 226 L 286 246 L 238 286 L 186 332 L 118 380 L 82 415 L 121 446 L 128 490 L 165 505 L 205 492 L 186 546 L 178 582 L 172 626 L 211 686 L 206 746 L 222 820 L 250 885 L 292 852 L 303 800 L 320 758 L 346 715 L 368 668 L 392 626 L 408 585 L 425 552 L 452 530 L 480 508 L 506 500 L 546 513 L 580 496 L 605 470 L 625 455 L 600 420 L 558 398 L 512 388 L 478 372 L 452 336 L 452 290 L 470 255 L 458 206 L 430 160 L 430 110 Z'
const tsOutline = 'M 296 558 L 352 540 L 382 600 L 360 674 L 300 664 L 286 606 Z'
const vindhyaD = 'M 198 486 C 262 478 330 474 396 484'
const satpuraD = 'M 206 560 C 268 552 330 548 386 552'

function damGlyph(d: any) {
  const x = d.x
  const y = d.y
  return 'M ' + (x - 6) + ' ' + y + ' L ' + x + ' ' + (y - 6) + ' L ' + (x + 6) + ' ' + y + ' L ' + x + ' ' + (y + 6) + ' Z'
}

/* ── Rivers ───────────────────────────────────────────────────────────── */
type FactRow = { k: string; v: string }
interface River {
  id: string; name: string; d: string; lx: number; ly: number; label: string
  cls: 'sys-him' | 'sys-east' | 'sys-west' | 'sys-inland'
  isTrib: boolean; hot: boolean; qx: number; qy: number
  chipLabel: string; facts: FactRow[]
}

const rivers: River[] = [
  { id:'indus', name:'Indus', d:'M 470 104 C 454 120 443 146 429 168 C 414 184 396 185 372 184', lx:342, ly:168, label:'Indus', cls:'sys-him', isTrib:false, hot:false, qx:420, qy:150, chipLabel:'Himalayan', facts:[{k:'Origin',v:'Lake Mansarovar, Tibet'},{k:'Length',v:'2,880 km · 709 km in India'},{k:'Tributaries',v:'Jhelum · Chenab · Ravi · Beas · Sutlej'}] },
  { id:'jhelum', name:'Jhelum', d:'M 438 148 C 428 158 417 168 406 178', lx:390, ly:160, label:'Jhelum', cls:'sys-him', isTrib:true, hot:false, qx:420, qy:164, chipLabel:'Himalayan', facts:[] },
  { id:'chenab', name:'Chenab', d:'M 453 158 C 441 166 429 172 417 180', lx:402, ly:170, label:'Chenab', cls:'sys-him', isTrib:true, hot:false, qx:434, qy:170, chipLabel:'Himalayan', facts:[] },
  { id:'ravi', name:'Ravi', d:'M 466 168 C 456 175 444 179 433 184', lx:426, ly:180, label:'Ravi', cls:'sys-him', isTrib:true, hot:false, qx:448, qy:176, chipLabel:'Himalayan', facts:[] },
  { id:'beas', name:'Beas', d:'M 479 178 C 470 183 459 186 447 188', lx:438, ly:190, label:'Beas', cls:'sys-him', isTrib:true, hot:false, qx:462, qy:183, chipLabel:'Himalayan', facts:[] },
  { id:'sutlej', name:'Sutlej', d:'M 494 189 C 486 193 474 195 462 194', lx:452, ly:204, label:'Sutlej', cls:'sys-him', isTrib:true, hot:false, qx:482, qy:193, chipLabel:'Himalayan', facts:[] },
  { id:'ganga', name:'Ganga', d:'M 486 264 C 495 282 501 300 498 318 C 496 342 496 370 503 394 C 511 421 514 450 505 476 C 498 500 490 522 478 540 C 470 552 462 559 452 556', lx:452, ly:512, label:'Ganga', cls:'sys-him', isTrib:false, hot:false, qx:492, qy:400, chipLabel:'Himalayan', facts:[{k:'Origin',v:'Gangotri Glacier (Bhagirathi + Alaknanda at Devprayag)'},{k:'Length',v:'2,525 km · largest basin'},{k:'Delta',v:'Sundarban, world largest'},{k:'Banks',v:'Left: Ramganga·Gomti·Ghaghara·Gandak·Kosi · Right: Yamuna·Son·Damodar'}] },
  { id:'yamuna', name:'Yamuna', d:'M 462 352 C 480 370 498 392 502 414 C 507 436 508 456 505 474', lx:468, ly:394, label:'Yamuna', cls:'sys-him', isTrib:true, hot:false, qx:500, qy:420, chipLabel:'Himalayan', facts:[] },
  { id:'kosi', name:'Kosi', d:'M 522 396 C 520 424 514 452 506 478 C 500 500 494 518 486 534', lx:526, ly:430, label:'Kosi', cls:'sys-him', isTrib:true, hot:true, qx:510, qy:480, chipLabel:'Himalayan', facts:[{k:'Bank',v:'Left-bank (north) tributary of the Ganga, often examined'}] },
  { id:'brahmaputra', name:'Brahmaputra', d:'M 506 394 C 548 390 590 386 622 390 C 630 404 632 420 623 434 C 610 450 588 462 560 472 C 530 482 500 488 468 498', lx:536, ly:436, label:'Brahmaputra', cls:'sys-him', isTrib:false, hot:false, qx:590, qy:440, chipLabel:'Himalayan', facts:[{k:'Names',v:'Tsangpo (Tibet) → Dihang (Arunachal) → Brahmaputra (Assam)'},{k:'Type',v:'Antecedent - older than the Himalayas'},{k:'Length',v:'2,900 km'}] },
  { id:'mahanadi', name:'Mahanadi', d:'M 380 518 C 396 540 407 566 414 592', lx:388, ly:548, label:'Mahanadi', cls:'sys-east', isTrib:false, hot:false, qx:398, qy:552, chipLabel:'Peninsular · east', facts:[{k:'Origin',v:'Sihawa, Chhattisgarh'},{k:'Length',v:'858 km'},{k:'Dam',v:'Hirakud'}] },
  { id:'godavari', name:'Godavari', d:'M 300 562 C 330 576 352 586 360 604 C 368 624 378 644 388 664', lx:298, ly:594, label:'Godavari', cls:'sys-east', isTrib:false, hot:true, qx:352, qy:610, chipLabel:'Peninsular · east', facts:[{k:'Nickname',v:'"Dakshin Ganga" · longest peninsular river'},{k:'Origin',v:'Nasik, Maharashtra'},{k:'Length',v:'1,465 km'},{k:'States',v:'7 - MH, TS, AP, CG, MP, KA, OR'},{k:'TS dams',v:'Sriram Sagar · Kaleshwaram'}] },
  { id:'pranahita', name:'Pranahita', d:'M 372 516 C 366 544 362 566 360 586', lx:372, ly:540, label:'Pranahita', cls:'sys-east', isTrib:true, hot:false, qx:366, qy:556, chipLabel:'tributary', facts:[] },
  { id:'indravati', name:'Indravati', d:'M 388 528 C 381 556 374 580 368 600', lx:388, ly:552, label:'Indravati', cls:'sys-east', isTrib:true, hot:false, qx:380, qy:566, chipLabel:'tributary', facts:[] },
  { id:'sabari', name:'Sabari', d:'M 400 548 C 394 580 390 608 387 632', lx:404, ly:600, label:'Sabari', cls:'sys-east', isTrib:true, hot:true, qx:394, qy:592, chipLabel:'tributary', facts:[{k:'Claim to fame',v:'Easternmost tributary of the Godavari - NOT Indravati (common trap)'}] },
  { id:'krishna', name:'Krishna', d:'M 243 598 C 278 612 305 622 316 636 C 327 650 342 664 358 678 C 369 689 378 696 384 702', lx:286, ly:624, label:'Krishna', cls:'sys-east', isTrib:false, hot:true, qx:320, qy:650, chipLabel:'Peninsular · east', facts:[{k:'Origin',v:'Mahabaleshwar (Western Ghats)'},{k:'Length',v:'1,400 km · 2nd largest peninsular'},{k:'Crosses',v:'Telangana - Musi, Bhima, Tungabhadra join it'},{k:'TS project',v:'Rajoli Banda Diversion Scheme'}] },
  { id:'bhima', name:'Bhima', d:'M 284 556 C 306 578 322 596 322 612', lx:296, ly:578, label:'Bhima', cls:'sys-east', isTrib:true, hot:false, qx:306, qy:584, chipLabel:'tributary', facts:[] },
  { id:'tungabhadra', name:'Tungabhadra', d:'M 252 644 C 284 652 308 652 322 654', lx:266, ly:646, label:'Tungabhadra', cls:'sys-east', isTrib:true, hot:false, qx:288, qy:651, chipLabel:'tributary', facts:[] },
  { id:'musi', name:'Musi', d:'M 316 600 C 312 618 313 634 320 648', lx:312, ly:610, label:'Musi', cls:'sys-east', isTrib:true, hot:false, qx:315, qy:622, chipLabel:'tributary', facts:[] },
  { id:'cauvery', name:'Cauvery', d:'M 230 722 C 250 740 272 754 288 768 C 298 780 304 788 308 794', lx:246, ly:772, label:'Cauvery', cls:'sys-east', isTrib:false, hot:false, qx:278, qy:764, chipLabel:'Peninsular · east', facts:[{k:'Origin',v:'Brahmagiri Hills, Coorg'},{k:'Length',v:'800 km'},{k:'Title',v:'Sacred river of the South'}] },
  { id:'narmada', name:'Narmada', d:'M 388 518 C 344 512 296 504 246 500 C 216 498 192 497 178 500', lx:240, ly:512, label:'Narmada', cls:'sys-west', isTrib:false, hot:true, qx:292, qy:508, chipLabel:'Peninsular · west', facts:[{k:'Origin',v:'Amarkantak (Madhya Pradesh)'},{k:'Length',v:'1,312 km'},{k:'Rift valley',v:'Flows between the Vindhyas (N) & Satpuras (S)'},{k:'Mouth',v:'Estuary - no delta'},{k:'Falls',v:'Dhuandhar (Marble Falls)'}] },
  { id:'tapi', name:'Tapi', d:'M 334 522 C 300 525 262 530 228 532 C 200 534 186 534 179 531', lx:246, ly:544, label:'Tapi', cls:'sys-west', isTrib:false, hot:true, qx:262, qy:528, chipLabel:'Peninsular · west', facts:[{k:'Origin',v:'Multai, Betul'},{k:'Length',v:'724 km'},{k:'Rift valley',v:'Parallel to Narmada'},{k:'Dam',v:'Ukai'}] },
  { id:'mahi', name:'Mahi', d:'M 258 354 C 236 402 212 454 192 486', lx:224, ly:430, label:'Mahi', cls:'sys-west', isTrib:false, hot:false, qx:226, qy:430, chipLabel:'Peninsular · west', facts:[] },
  { id:'sabarmati', name:'Sabarmati', d:'M 246 302 C 222 360 202 424 190 478', lx:204, ly:398, label:'Sabarmati', cls:'sys-west', isTrib:false, hot:false, qx:212, qy:402, chipLabel:'Peninsular · west', facts:[{k:'Origin',v:'Aravalli Hills, Rajasthan'},{k:'Length',v:'371 km'},{k:'Mouth',v:'Gulf of Khambhat'}] },
  { id:'luni', name:'Luni', d:'M 308 234 C 282 272 240 318 190 360 C 160 386 138 398 123 400', lx:190, ly:352, label:'Luni', cls:'sys-inland', isTrib:false, hot:true, qx:222, qy:340, chipLabel:'Inland', facts:[{k:'Origin',v:'Pushkar Valley (Aravalli)'},{k:'Length',v:'495 km'},{k:'Fate',v:'Inland - fades into the Rann of Kutch, never reaches the sea'}] },
  { id:'sharavathi', name:'Sharavathi', d:'M 210 690 C 214 678 220 668 224 660', lx:204, ly:680, label:'', cls:'sys-west', isTrib:true, hot:false, qx:218, qy:676, chipLabel:'tributary', facts:[] },
  { id:'manair', name:'Manair', d:'M 344 540 C 338 556 336 572 340 584', lx:346, ly:556, label:'Manair', cls:'sys-east', isTrib:true, hot:false, qx:339, qy:560, chipLabel:'tributary', facts:[] },
]

rivers.forEach(r => byId.set(r.id, r))

/* ── Dams & waterfalls (points ON rivers) ─────────────────────────────── */
const dams = [
  { id:'ukai',            x:250, y:528, label:'Ukai',            on:'tapi' },
  { id:'sardar-sarovar',  x:222, y:499, label:'Sardar Sarovar',  on:'narmada' },
  { id:'salal',           x:426, y:172, label:'Salal',           on:'chenab' },
  { id:'hirakud',         x:396, y:528, label:'Hirakud',         on:'mahanadi' },
  { id:'bhakra',          x:470, y:196, label:'Bhakra-Nangal',   on:'sutlej' },
  { id:'sriram-sagar',    x:344, y:586, label:'Sriram Sagar',    on:'godavari', ts:true },
  { id:'kaleshwaram',     x:356, y:600, label:'Kaleshwaram',     on:'godavari', ts:true },
  { id:'lower-manair',    x:338, y:566, label:'Lower Manair',    on:'manair',   ts:true },
  { id:'kadam',           x:388, y:556, label:'Kadam',           on:'manair',   ts:true },
  { id:'rajoli-banda',    x:316, y:642, label:'Rajoli Banda',    on:'krishna',  ts:true },
]

const falls = [
  { id:'dhuandhar', x:300, y:498, label:'Dhuandhar', on:'narmada' },
  { id:'jog',       x:228, y:652, label:'Jog',       on:'sharavathi' },
]

/* ── PYQ hotspots (exam-marked facts) ─────────────────────────────────── */
const hotspots = [
  { id:'sabari',     x:394, y:618, label:'easternmost Godavari trib' },
  { id:'dhuandhar',  x:300, y:494, label:'Dhuandhar' },
  { id:'ukai',       x:250, y:524, label:'Ukai dam' },
  { id:'salal',      x:426, y:168, label:'Salal' },
  { id:'rann',       x:126, y:404, label:'Rann of Kutch' },
  { id:'rajoli',     x:316, y:638, label:'Rajoli Banda' },
  { id:'ts-dams',    x:356, y:590, label:'TS dams' },
]

/* ── Selected river / panel ───────────────────────────────────────────── */
const selectedRiver = computed(() => selectedId.value ? byId.get(selectedId.value) || null : null)

function riverVisible(r: River) {
  return r.isTrib ? layers.tribs : true
}
function riverLabelShown(r: River) {
  return r.isTrib ? (layers.tribs || r.hot) : layers.systems
}
function riverStyle(r: River) {
  return { 'stroke-width': r.isTrib ? '1.7' : '2.6' }
}

/* ── Explore / quiz interaction ───────────────────────────────────────── */
const quizBank = [
  { p: 'Click the easternmost tributary of the Godavari.', a: 'sabari' },
  { p: 'Which river never reaches the sea - it fades into the Rann of Kutch?', a: 'luni' },
  { p: 'The Ukai dam sits across which river?', a: 'tapi' },
  { p: 'This west-flowing river rises at Amarkantak and cuts through a rift valley (between the two ranges shown).', a: 'narmada' },
  { p: 'Click the river nicknamed “Dakshin Ganga”.', a: 'godavari' },
  { p: 'Which Himalayan river is called Tsangpo in Tibet?', a: 'brahmaputra' },
  { p: 'The Rajoli Banda diversion scheme (Telangana) is on which river?', a: 'krishna' },
]
const quizIndex = ref(0)
const quizMissed = ref(0)
const quizCorrect = ref(0)
const quizDone = ref(false)
const quizMsg = ref('')
const quizMsgOk = ref(false)
const lastCorrectId = ref<string | null>(null)

const quiz = computed(() => quizBank[quizIndex.value])
const quizTotal = quizBank.length
const quizTarget = computed(() => lastCorrectId.value ? byId.get(lastCorrectId.value) || null : null)

function pick(r: River) {
  if (mode.value === 'quiz') answerQuiz(r)
  else {
    selectedId.value = r.id
    emit('focus', r.id)
  }
}
function pickId(id: string) {
  const r = byId.get(id)
  if (r) pick(r)
}

function flash(id: string | null, kind: 'right' | 'wrong') {
  if (kind === 'right') { rightId.value = id; wrongId.value = null }
  else { wrongId.value = id; rightId.value = null }
  setTimeout(() => { rightId.value = null; wrongId.value = null }, 650)
}

function answerQuiz(r: River) {
  if (quizDone.value) return
  const q = quiz.value
  if (r.id === q.a) {
    quizCorrect.value++
    lastCorrectId.value = r.id
    quizMsg.value = 'Correct.'
    quizMsgOk.value = true
    flash(r.id, 'right')
    if (quizIndex.value < quizTotal - 1) quizIndex.value++
    else quizDone.value = true
  } else {
    quizMissed.value++
    quizMsg.value = 'Not that one - try again.'
    quizMsgOk.value = false
    flash(r.id, 'wrong')
  }
}
function restartQuiz() {
  quizIndex.value = 0
  quizMissed.value = 0
  quizCorrect.value = 0
  quizDone.value = false
  quizMsg.value = ''
  lastCorrectId.value = null
}

/* ── "Locate on map" control surfaced to the note page ────────────────── */
function focusRiver(id: string) {
  focusId.value = id
  layers.tribs = true
  const r = byId.get(id)
  if (r) { selectedId.value = id; layers.hot = layers.hot }
  setTimeout(() => { focusId.value = null }, 2400)
}

watch(() => props.focus, (v) => { if (v) focusRiver(v) })

defineExpose({ focusRiver })
</script>

<style scoped>
.river-map { }

.rm-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.rm-mode {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  background: var(--bg-subtle);
  border: 1px solid var(--line);
}
.rm-mode-btn {
  padding: 5px 14px;
  border-radius: 7px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-3);
  cursor: pointer;
  transition: color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
}
.rm-mode-btn.is-on {
  color: var(--text-1);
  background: var(--bg-elevated);
  box-shadow: 0 1px 3px rgba(16,15,12,0.12);
}
.rm-layers { display: flex; flex-wrap: wrap; gap: 6px; }

.rm-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 1024px) {
  .rm-body { grid-template-columns: minmax(0, 1fr) 260px; }
}

.rm-map {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-elevated);
  overflow: hidden;
}
.rm-svg {
  width: 100%;
  height: auto;
  display: block;
  animation: rm-fade 0.5s ease;
}
@keyframes rm-fade { from { opacity: 0; } to { opacity: 1; } }

.rm-india {
  fill: none;
  stroke: var(--line-strong);
  stroke-width: 2;
  stroke-linejoin: round;
}
.rm-ts {
  fill: var(--accent-soft);
  stroke: var(--accent-line);
  stroke-width: 1.5;
  stroke-dasharray: 5 4;
  transition: opacity 0.2s ease;
}
.rm-ts-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.3em;
  fill: var(--accent-strong);
  opacity: 0.85;
}
.rm-range {
  fill: none;
  stroke: var(--text-3);
  stroke-width: 1.4;
  stroke-dasharray: 2 5;
  opacity: 0.5;
}
.rm-range-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.22em;
  fill: var(--text-3);
  opacity: 0.7;
}

.rm-river {
  fill: none;
  stroke-linecap: round;
  cursor: pointer;
  transition: stroke-width 0.12s ease, opacity 0.15s ease, filter 0.12s ease;
}
.rm-river:hover { filter: brightness(1.25) drop-shadow(0 0 4px currentcolor); }
.sys-him { stroke: #5aa2f8; }
.sys-east { stroke: #e2a63a; }
.sys-west { stroke: #2fb38a; }
.sys-inland { stroke: #a1a7ae; stroke-dasharray: 3 4; opacity: 0.8; }
.rm-off { opacity: 0.12; pointer-events: none; }
.rm-hot-now { filter: drop-shadow(0 0 5px currentcolor); opacity: 1; }
.rm-focused { stroke: var(--accent-strong) !important; stroke-width: 4.5 !important; }
.rm-wrong-flash { stroke: var(--red) !important; }
.rm-right-flash { stroke: var(--jade) !important; }

.rm-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  fill: var(--text-2);
  pointer-events: none;
  paint-order: stroke;
  stroke: var(--bg-elevated);
  stroke-width: 3px;
  stroke-linejoin: round;
}
.rm-hot-label { fill: var(--accent-strong); font-weight: 600; }

.rm-dam {
  fill: var(--accent);
  stroke: var(--bg-elevated);
  stroke-width: 1.5;
  cursor: pointer;
  transition: filter 0.12s ease;
}
.rm-dam:hover { filter: brightness(1.2); }
.rm-dam-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  fill: var(--text-3);
  pointer-events: none;
  paint-order: stroke;
  stroke: var(--bg-elevated);
  stroke-width: 3px;
}
.rm-fall {
  fill: var(--sky);
  stroke: var(--bg-elevated);
  stroke-width: 1.5;
  cursor: pointer;
}
.rm-fall-sheet {
  fill: none;
  stroke: var(--sky);
  stroke-width: 1.6;
  pointer-events: none;
}

.rm-hot {
  fill: var(--accent-soft);
  stroke: var(--accent-line);
  stroke-width: 1.5;
  animation: rm-pulse 1.8s ease-in-out infinite;
}
@keyframes rm-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
.rm-hot-core { fill: var(--accent); }
.rm-hot-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  fill: var(--accent-strong);
  pointer-events: none;
  paint-order: stroke;
  stroke: var(--bg-elevated);
  stroke-width: 3px;
}
.rm-quiz-marker {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-dasharray: 4 3;
  pointer-events: none;
}
.is-hidden { opacity: 0; pointer-events: none; }

.rm-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-elevated);
  padding: 18px;
  min-height: 180px;
}
.rm-empty { text-align: center; }
.rm-empty-title { margin-top: 10px; font-size: 13.5px; font-weight: 600; color: var(--text-1); }
.rm-empty-sub { margin-top: 6px; font-size: 12px; line-height: 1.6; color: var(--text-3); }

.rm-fact { animation: rm-fade 0.25s ease; }
.rm-fact-head { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.rm-fact-name { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: var(--text-1); }
.rm-fact-rows { margin-top: 10px; display: grid; gap: 8px; }
.rm-fact-row { display: grid; grid-template-columns: 84px 1fr; gap: 8px; }
.rm-fact-k { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); padding-top: 2px; }
.rm-fact-v { font-size: 12.5px; line-height: 1.55; color: var(--text-2); }

.rm-q { font-size: 15px; line-height: 1.55; font-weight: 600; color: var(--text-1); }
.rm-qsub { margin-top: 12px; font-size: 11px; color: var(--text-3); }
.rm-msg { margin-top: 12px; padding: 8px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 600; }
.rm-msg.is-ok { background: var(--jade-soft); border: 1px solid var(--jade-line); color: var(--jade); }
.rm-msg.is-no { background: var(--red-soft); border: 1px solid var(--red-line); color: var(--red); }
.rm-score-big { font-family: 'Space Grotesk', sans-serif; font-size: 44px; font-weight: 700; color: var(--accent); }
.rm-restart { margin-top: 14px; }

.rm-pop-enter-active, .rm-pop-leave-active { transition: opacity 0.16s ease, transform 0.16s ease; }
.rm-pop-enter-from, .rm-pop-leave-to { opacity: 0; transform: translateY(4px); }
</style>
