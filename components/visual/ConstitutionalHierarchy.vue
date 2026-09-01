<script setup lang="ts">
type SystemId = 'union' | 'judiciary'

type HierarchyNode = {
  id: string
  label: string
  subtitle: string
  x: number
  y: number
  width: number
  articles: string[]
  appointment: string
  oath: string
  tenure: string
  removal: string
}

type SystemDefinition = {
  id: SystemId
  label: string
  description: string
  nodes: HierarchyNode[]
  lines: Array<{ x1: number, y1: number, x2: number, y2: number }>
}

const systems: SystemDefinition[] = [
  {
    id: 'union',
    label: 'Union executive and legislature',
    description: 'A constitutional relationship map. Parliament is not subordinate to the Cabinet.',
    lines: [
      { x1: 410, y1: 105, x2: 210, y2: 180 },
      { x1: 410, y1: 105, x2: 590, y2: 180 },
      { x1: 210, y1: 245, x2: 210, y2: 325 },
      { x1: 590, y1: 245, x2: 510, y2: 325 },
      { x1: 590, y1: 245, x2: 690, y2: 325 }
    ],
    nodes: [
      {
        id: 'president', label: 'President', subtitle: 'Constitutional head', x: 325, y: 40, width: 170,
        articles: ['Article 52', 'Article 53', 'Article 54', 'Article 60', 'Article 61'],
        appointment: 'Elected by an electoral college under Article 54.',
        oath: 'Administered by the Chief Justice of India or, in the CJI’s absence, the senior-most available Supreme Court judge.',
        tenure: 'Five years under Article 56, subject to earlier resignation or removal.',
        removal: 'Impeachment for violation of the Constitution under Article 61.'
      },
      {
        id: 'prime-minister', label: 'Prime Minister', subtitle: 'Head of government', x: 120, y: 180, width: 180,
        articles: ['Article 74', 'Article 75'],
        appointment: 'Appointed by the President.',
        oath: 'Administered by the President.',
        tenure: 'Continues while enjoying Lok Sabha confidence and during the President’s pleasure.',
        removal: 'Resigns or must leave office after loss of Lok Sabha confidence; there is no separate constitutional impeachment process.'
      },
      {
        id: 'parliament', label: 'Parliament', subtitle: 'President + two Houses', x: 495, y: 180, width: 190,
        articles: ['Article 79'],
        appointment: 'Constituted by the President, the Council of States and the House of the People.',
        oath: 'Members make and subscribe an oath or affirmation before a person appointed by the President.',
        tenure: 'Lok Sabha normally has a five-year term; Rajya Sabha is a continuing chamber.',
        removal: 'This is an institution, not an office with a single removal procedure.'
      },
      {
        id: 'cabinet', label: 'Cabinet', subtitle: 'Core Council of Ministers', x: 120, y: 325, width: 180,
        articles: ['Article 74', 'Article 75(3)'],
        appointment: 'Ministers are appointed by the President on the advice of the Prime Minister.',
        oath: 'Administered by the President.',
        tenure: 'Ministers hold office during the President’s pleasure, in practice on the Prime Minister’s advice.',
        removal: 'A minister may resign, be dropped by the Prime Minister or leave with the Council after loss of Lok Sabha confidence.'
      },
      {
        id: 'lok-sabha', label: 'Lok Sabha', subtitle: 'House of the People', x: 420, y: 325, width: 180,
        articles: ['Article 81', 'Article 83(2)', 'Article 93', 'Article 99'],
        appointment: 'Members are directly elected under election law; the House elects its Speaker and Deputy Speaker.',
        oath: 'A member takes oath or affirmation before a person appointed by the President.',
        tenure: 'Normally five years from its first meeting, unless sooner dissolved.',
        removal: 'Members can be disqualified under constitutional and statutory provisions; the House itself may be dissolved by the President.'
      },
      {
        id: 'rajya-sabha', label: 'Rajya Sabha', subtitle: 'Council of States', x: 610, y: 325, width: 180,
        articles: ['Article 80', 'Article 83(1)', 'Article 89', 'Article 99'],
        appointment: 'Most members are elected by State Legislative Assemblies; 12 are nominated by the President.',
        oath: 'A member takes oath or affirmation before a person appointed by the President.',
        tenure: 'A continuing chamber. One-third of its members retire every second year.',
        removal: 'Members can be disqualified under constitutional and statutory provisions; the Rajya Sabha is not dissolved.'
      }
    ]
  },
  {
    id: 'judiciary',
    label: 'Indian judiciary',
    description: 'Judicial hierarchy from the Supreme Court to subordinate courts.',
    lines: [
      { x1: 410, y1: 105, x2: 410, y2: 180 },
      { x1: 410, y1: 245, x2: 410, y2: 325 },
      { x1: 410, y1: 390, x2: 410, y2: 470 }
    ],
    nodes: [
      {
        id: 'supreme-court', label: 'Supreme Court', subtitle: 'Apex court', x: 315, y: 40, width: 190,
        articles: ['Article 124'],
        appointment: 'Judges are appointed by the President after the constitutionally required consultation.',
        oath: 'Administered by the President or a person appointed by the President.',
        tenure: 'A Supreme Court judge holds office until age 65.',
        removal: 'The President removes a judge after an address by each House of Parliament under Article 124(4).'
      },
      {
        id: 'high-courts', label: 'High Courts', subtitle: 'State-level constitutional courts', x: 300, y: 180, width: 220,
        articles: ['Article 214', 'Article 217', 'Article 219'],
        appointment: 'Judges are appointed by the President after the consultations stated in Article 217.',
        oath: 'Administered by the Governor or a person appointed by the Governor.',
        tenure: 'A High Court judge holds office until age 62.',
        removal: 'The removal process follows Article 217 read with the parliamentary-removal process in Article 124(4).'
      },
      {
        id: 'district-courts', label: 'District Courts', subtitle: 'District judiciary', x: 310, y: 325, width: 200,
        articles: ['Article 233', 'Article 235'],
        appointment: 'District judges are appointed by the Governor in consultation with the High Court.',
        oath: 'Governed by the applicable State service rules.',
        tenure: 'Service conditions are governed by the Constitution and applicable State rules.',
        removal: 'The High Court has control over district courts and courts subordinate to it under Article 235.'
      },
      {
        id: 'subordinate-courts', label: 'Subordinate Courts', subtitle: 'Courts below district level', x: 295, y: 470, width: 230,
        articles: ['Article 233', 'Article 234', 'Article 235', 'Article 237'],
        appointment: 'Appointments are made under the applicable constitutional provisions and State judicial-service rules.',
        oath: 'Governed by the applicable State service rules.',
        tenure: 'Service conditions vary within the constitutional and State-rule framework.',
        removal: 'Administrative control is vested in the High Court under Article 235, subject to applicable service rules.'
      }
    ]
  }
]

const activeSystemId = ref<SystemId>('union')
const activeSystem = computed(() => systems.find((system) => system.id === activeSystemId.value) ?? systems[0])
const selectedNodeId = ref('president')
const selectedNode = computed(() => activeSystem.value.nodes.find((node) => node.id === selectedNodeId.value) ?? activeSystem.value.nodes[0])

function selectSystem(systemId: SystemId) {
  activeSystemId.value = systemId
  selectedNodeId.value = systems.find((system) => system.id === systemId)?.nodes[0]?.id ?? ''
}

function selectNode(node: HierarchyNode) {
  selectedNodeId.value = node.id
}
</script>

<template>
  <section class="rounded-2xl border border-white/10 bg-[#0c0d0e] p-4 text-stone-100 shadow-2xl shadow-black/20 sm:p-6">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Hierarchical anchor</p>
        <h2 class="mt-1 text-xl font-bold tracking-tight text-white">Constitutional hierarchy</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-stone-400">Choose a node for Articles, appointment, oath, tenure and removal details.</p>
      </div>
      <div class="flex gap-2" role="tablist" aria-label="Choose constitutional system">
        <UButton
          v-for="system in systems"
          :key="system.id"
          size="sm"
          :color="activeSystemId === system.id ? 'primary' : 'gray'"
          :variant="activeSystemId === system.id ? 'solid' : 'soft'"
          role="tab"
          :aria-selected="activeSystemId === system.id"
          @click="selectSystem(system.id)"
        >{{ system.id === 'union' ? 'Union' : 'Judiciary' }}</UButton>
      </div>
    </header>

    <p class="mt-5 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs leading-5 text-stone-400">{{ activeSystem.description }}</p>

    <div class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
      <div class="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#111417] to-slate-900 p-3">
        <!-- Mobile scroll hint (DEF-POL-01) -->
        <div class="flex items-center gap-1.5 pb-2 text-[11px] text-stone-400 sm:hidden">
          <UIcon name="i-heroicons-arrows-right-left" class="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>Scroll horizontally to explore full chart</span>
        </div>
        <div class="overflow-x-auto">
          <svg
            class="h-auto min-w-[800px] w-full"
            viewBox="0 0 820 560"
            role="img"
            :aria-label="`${activeSystem.label} interactive hierarchy`"
          >
          <title>{{ activeSystem.label }}</title>
          <desc>Select a box in the hierarchy to read the related constitutional facts.</desc>
          <g stroke="#57534e" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line v-for="(line, index) in activeSystem.lines" :key="index" v-bind="line" />
          </g>
          <g v-for="node in activeSystem.nodes" :key="node.id">
            <rect
              :x="node.x"
              :y="node.y"
              :width="node.width"
              height="65"
              rx="12"
              :fill="selectedNodeId === node.id ? '#f59e0b' : '#1c1917'"
              :stroke="selectedNodeId === node.id ? '#fcd34d' : '#57534e'"
              stroke-width="2"
              class="cursor-pointer outline-none transition-colors duration-150"
              role="button"
              tabindex="0"
              :aria-label="`Show facts for ${node.label}`"
              @click="selectNode(node)"
              @keydown.enter.prevent="selectNode(node)"
              @keydown.space.prevent="selectNode(node)"
            />
            <text :x="node.x + node.width / 2" :y="node.y + 28" text-anchor="middle" class="pointer-events-none fill-white text-[15px] font-bold">{{ node.label }}</text>
            <text :x="node.x + node.width / 2" :y="node.y + 48" text-anchor="middle" :class="selectedNodeId === node.id ? 'fill-stone-900' : 'fill-stone-400'" class="pointer-events-none text-[11px]">{{ node.subtitle }}</text>
          </g>
        </svg>
      </div>
    </div>

      <aside v-if="selectedNode" class="rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-4 sm:p-5" aria-live="polite">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Selected constitutional office</p>
        <h3 class="mt-1 text-xl font-bold text-white">{{ selectedNode.label }}</h3>
        <div class="mt-4 flex flex-wrap gap-2" aria-label="Related constitutional Articles">
          <UBadge v-for="article in selectedNode.articles" :key="article" color="amber" variant="subtle">{{ article }}</UBadge>
        </div>
        <dl class="mt-5 space-y-4 text-sm leading-6">
          <div>
            <dt class="font-semibold text-stone-200">Appointment authority</dt>
            <dd class="mt-1 text-stone-400">{{ selectedNode.appointment }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-stone-200">Oath administrator</dt>
            <dd class="mt-1 text-stone-400">{{ selectedNode.oath }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-stone-200">Term</dt>
            <dd class="mt-1 text-stone-400">{{ selectedNode.tenure }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-stone-200">Removal procedure</dt>
            <dd class="mt-1 text-stone-400">{{ selectedNode.removal }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>
