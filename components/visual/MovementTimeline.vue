<script setup lang="ts">
type TimelineKind = 'telangana' | 'freedom'

type Milestone = {
  id: string
  year: string
  title: string
  phase: string
  phaseLabel: string
  summary: string
  facts: string[]
  pyqIds: string[]
}

const props = withDefaults(defineProps<{
  timeline?: TimelineKind
}>(), {
  timeline: 'telangana'
})

const telanganaMilestones: Milestone[] = [
  {
    id: 'operation-polo',
    year: '1948',
    title: 'Operation Polo',
    phase: 'phase-1',
    phaseLabel: 'Phase 1: 1948-1956',
    summary: 'Hyderabad State was integrated with the Indian Union in September 1948.',
    facts: ['Often called the Police Action in exam material.', 'Major General J. N. Chaudhuri led the Indian military operation.', 'Use this as the starting point for post-integration Telangana chronology.'],
    pyqIds: []
  },
  {
    id: 'mulki-rules',
    year: '1952',
    title: 'City College Incident and Mulki Rules',
    phase: 'phase-1',
    phaseLabel: 'Phase 1: 1948-1956',
    summary: 'The non-Mulki agitation brought local-residency safeguards and public employment into sharp focus.',
    facts: ['Mulki rules concerned eligibility connected with local domicile in the former Hyderabad State.', 'The City College incident is a recurring reference point in accounts of the 1952 agitation.', 'Remember the event within the employment and local safeguards theme.'],
    pyqIds: []
  },
  {
    id: 'gentlemens-agreement',
    year: '1956',
    title: "Gentlemen's Agreement",
    phase: 'phase-1',
    phaseLabel: 'Phase 1: 1948-1956',
    summary: 'Safeguards were negotiated before the formation of Andhra Pradesh on 1 November 1956.',
    facts: ['The agreement included safeguards relating to Telangana representation, expenditure and local opportunities.', 'The Telangana Regional Committee was an important institutional safeguard.', 'Link the agreement with the formation of Andhra Pradesh, not with Telangana statehood in 2014.'],
    pyqIds: []
  },
  {
    id: 'telangana-agitation',
    year: '1969',
    title: 'Telangana Movement',
    phase: 'phase-2',
    phaseLabel: 'Phase 2: 1969-1990',
    summary: 'A mass agitation revived the demand for separate Telangana amid concerns about safeguards and implementation.',
    facts: ['Dr. Marri Chenna Reddy was associated with the Telangana Praja Samithi.', 'Questions commonly connect this phase with safeguards, public mobilisation and the separate-state demand.', 'Keep the 1969 movement distinct from the 2001-2014 statehood phase.'],
    pyqIds: []
  },
  {
    id: 'trs-formation',
    year: '2001',
    title: 'TRS Formation',
    phase: 'phase-3',
    phaseLabel: 'Phase 3: 2001-2014',
    summary: 'K. Chandrashekar Rao founded the Telangana Rashtra Samithi on 27 April 2001.',
    facts: ['The organisation made statehood its central political objective.', 'The exact date, 27 April 2001, is a direct chronology fact.', 'Place this before the 2009 Union government statement and the 2014 Act.'],
    pyqIds: ['PYQ-2022-P-172']
  },
  {
    id: 'december-statement',
    year: '2009',
    title: '9 December Statement',
    phase: 'phase-3',
    phaseLabel: 'Phase 3: 2001-2014',
    summary: 'The Union government announced that the process for the formation of Telangana would be initiated.',
    facts: ['The statement was made by Union Home Minister P. Chidambaram.', 'Justice B. N. Srikrishna Committee was subsequently constituted in 2010.', 'Sequence questions connect the committee, Rail Bandh and Million March to this phase.'],
    pyqIds: ['PYQ-2022-P-181', 'PYQ-2022-P-177']
  },
  {
    id: 'reorganisation-act',
    year: '2014',
    title: 'Andhra Pradesh Reorganisation Act',
    phase: 'phase-3',
    phaseLabel: 'Phase 3: 2001-2014',
    summary: 'The Act provided for the creation of Telangana, which came into existence on 2 June 2014.',
    facts: ['The Andhra Pradesh Reorganisation Act, 2014 is the legislative anchor for state formation.', '2 June 2014 is Telangana Formation Day.', 'Separate the date of the Act from the date Telangana came into existence.'],
    pyqIds: []
  }
]

const freedomMilestones: Milestone[] = [
  {
    id: 'revolt-1857',
    year: '1857',
    title: 'Revolt of 1857',
    phase: 'foundation',
    phaseLabel: 'Foundation: 1857-1904',
    summary: 'A major anti-colonial uprising that remains a key chronological landmark.',
    facts: ['Use this as the opening anchor for modern freedom movement timelines.', 'Questions may test centres, leaders and immediate causes separately.'],
    pyqIds: []
  },
  {
    id: 'congress-1885',
    year: '1885',
    title: 'Indian National Congress founded',
    phase: 'foundation',
    phaseLabel: 'Foundation: 1857-1904',
    summary: 'The Indian National Congress was formed as an all-India political platform.',
    facts: ['Chronology questions commonly use its founding year as a reference point.', 'Keep founder, first session and later movements as separate flashcard facts.'],
    pyqIds: []
  },
  {
    id: 'swadeshi-1905',
    year: '1905',
    title: 'Swadeshi Movement',
    phase: 'mass-politics',
    phaseLabel: 'Mass politics: 1905-1919',
    summary: 'The anti-partition movement expanded boycott and swadeshi as political methods.',
    facts: ['Connect this event to the partition of Bengal.', 'Use it before the Home Rule movement in chronological practice.'],
    pyqIds: []
  },
  {
    id: 'non-cooperation',
    year: '1920',
    title: 'Non-Cooperation Movement',
    phase: 'gandhian',
    phaseLabel: 'Gandhian phase: 1920-1942',
    summary: 'A nationwide movement based on non-cooperation with colonial institutions.',
    facts: ['Keep launch, suspension and associated events as separate recall prompts.', 'Chronology questions often contrast it with Civil Disobedience and Quit India.'],
    pyqIds: []
  },
  {
    id: 'civil-disobedience',
    year: '1930',
    title: 'Civil Disobedience Movement',
    phase: 'gandhian',
    phaseLabel: 'Gandhian phase: 1920-1942',
    summary: 'The Salt March opened a mass campaign of civil disobedience.',
    facts: ['Associate the launch with the Dandi March.', 'Do not merge this movement with the 1942 Quit India Movement.'],
    pyqIds: []
  },
  {
    id: 'quit-india',
    year: '1942',
    title: 'Quit India Movement',
    phase: 'gandhian',
    phaseLabel: 'Gandhian phase: 1920-1942',
    summary: 'The movement called for an immediate end to British rule.',
    facts: ['Use the 1942 date as the final major mass-movement anchor before independence.', 'Review slogans and resolutions as atomic facts.'],
    pyqIds: []
  },
  {
    id: 'independence',
    year: '1947',
    title: 'Indian Independence',
    phase: 'transition',
    phaseLabel: 'Transition: 1947',
    summary: 'India became independent on 15 August 1947.',
    facts: ['This is the end anchor for a modern Indian freedom movement timeline.', 'Follow-up questions may cover partition and integration separately.'],
    pyqIds: []
  }
]

const phaseLabels = computed(() => {
  const milestones = props.timeline === 'telangana' ? telanganaMilestones : freedomMilestones
  return [...new Map(milestones.map((milestone) => [milestone.phase, milestone.phaseLabel])).entries()].map(([id, label]) => ({ id, label }))
})
const allMilestones = computed(() => props.timeline === 'telangana' ? telanganaMilestones : freedomMilestones)
const activePhase = ref('all')
const expandedId = ref<string | null>(props.timeline === 'telangana' ? 'trs-formation' : 'non-cooperation')
const visibleMilestones = computed(() => activePhase.value === 'all'
  ? allMilestones.value
  : allMilestones.value.filter((milestone) => milestone.phase === activePhase.value))
const heading = computed(() => props.timeline === 'telangana' ? 'Telangana statehood movement' : 'Modern Indian freedom movement')

watch(() => props.timeline, (timeline) => {
  activePhase.value = 'all'
  expandedId.value = timeline === 'telangana' ? 'trs-formation' : 'non-cooperation'
})

function toggleMilestone(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
  <section class="rounded-2xl border border-white/10 bg-[#0c0d0e] p-4 text-stone-100 shadow-2xl shadow-black/20 sm:p-6">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Chronological anchor</p>
        <h2 class="mt-1 text-xl font-bold tracking-tight text-white">{{ heading }}</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-stone-400">Open a milestone to turn dates, leaders, committees and safeguards into recall cues.</p>
      </div>
      <div class="flex flex-wrap gap-2" aria-label="Filter timeline phases">
        <UButton size="xs" :color="activePhase === 'all' ? 'primary' : 'gray'" :variant="activePhase === 'all' ? 'solid' : 'soft'" @click="activePhase = 'all'">All phases</UButton>
        <UButton
          v-for="phase in phaseLabels"
          :key="phase.id"
          size="xs"
          :color="activePhase === phase.id ? 'primary' : 'gray'"
          :variant="activePhase === phase.id ? 'solid' : 'soft'"
          @click="activePhase = phase.id"
        >{{ phase.label }}</UButton>
      </div>
    </header>

    <ol class="relative mt-8 border-s border-white/15 ps-6 sm:ps-8" aria-label="Interactive movement timeline">
      <li v-for="milestone in visibleMilestones" :key="milestone.id" class="relative pb-7 last:pb-0">
        <span class="absolute -start-[34px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0c0d0e] bg-amber-500 shadow-[0_0_0_1px_rgba(245,158,11,0.55)] sm:-start-[42px]" aria-hidden="true" />
        <article class="overflow-hidden rounded-xl border transition-colors" :class="expandedId === milestone.id ? 'border-amber-500/50 bg-amber-500/[0.06]' : 'border-white/10 bg-white/[0.025]'">
          <button
            type="button"
            class="flex w-full items-start gap-4 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            :aria-expanded="expandedId === milestone.id"
            :aria-controls="`milestone-${milestone.id}`"
            @click="toggleMilestone(milestone.id)"
          >
            <span class="min-w-14 font-mono text-lg font-bold text-amber-400">{{ milestone.year }}</span>
            <span class="min-w-0 flex-1">
              <span class="block text-base font-bold text-white">{{ milestone.title }}</span>
              <span class="mt-1 block text-sm leading-6 text-stone-400">{{ milestone.summary }}</span>
            </span>
            <UIcon :name="expandedId === milestone.id ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="mt-1 h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
          </button>

          <div v-if="expandedId === milestone.id" :id="`milestone-${milestone.id}`" class="border-t border-white/10 px-4 pb-4 pt-3 sm:ps-[88px]">
            <ul class="space-y-2 text-sm leading-6 text-stone-300">
              <li v-for="fact in milestone.facts" :key="fact" class="flex gap-2"><span class="mt-0.5 text-emerald-400">•</span><span>{{ fact }}</span></li>
            </ul>
            <div v-if="milestone.pyqIds.length" class="mt-4 flex flex-wrap items-center gap-2">
              <span class="text-xs font-medium text-stone-500">Verified local PYQ</span>
              <UBadge v-for="pyqId in milestone.pyqIds" :key="pyqId" color="amber" variant="subtle">{{ pyqId }}</UBadge>
            </div>
          </div>
        </article>
      </li>
    </ol>
  </section>
</template>
