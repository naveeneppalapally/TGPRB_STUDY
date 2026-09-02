<template>
  <div ref="mapContainer" class="drainage-map card overflow-hidden">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-lg">🗺️</span>
      <h3 class="font-semibold text-sm">Interactive River Map</h3>
      <span class="text-xs" style="color: var(--text-muted)">Click a river to explore</span>
    </div>

    <!-- SVG India Map with River Systems -->
    <div class="relative" style="aspect-ratio: 3/4; max-height: 500px">
      <svg
        ref="svgMap"
        viewBox="0 0 400 500"
        class="w-full h-full"
        style="background: var(--bg-secondary); border-radius: 0.75rem"
      >
        <!-- India outline (simplified) -->
        <path
          ref="indiaOutline"
          d="M200,30 L280,60 L320,100 L340,160 L350,220 L340,280 L300,340 L260,380 L220,430 L200,470 L180,430 L140,380 L100,340 L60,280 L50,220 L60,160 L80,100 L120,60 Z"
          fill="none"
          stroke="var(--border-subtle)"
          stroke-width="1.5"
          opacity="0"
        />

        <!-- Himalayan rivers -->
        <g ref="himalayanGroup" opacity="0">
          <!-- Ganga -->
          <path
            class="river-path"
            d="M170,80 L190,100 L220,120 L260,140 L300,160 L330,180"
            fill="none"
            stroke="#60a5fa"
            stroke-width="2"
            stroke-linecap="round"
            data-river="Ganga"
            @click="selectRiver('Ganga')"
            @mouseenter="hoverRiver('Ganga')"
            @mouseleave="unhoverRiver"
          />
          <!-- Brahmaputra -->
          <path
            class="river-path"
            d="M340,90 L320,100 L300,110 L310,130 L330,150"
            fill="none"
            stroke="#818cf8"
            stroke-width="2"
            stroke-linecap="round"
            data-river="Brahmaputra"
            @click="selectRiver('Brahmaputra')"
            @mouseenter="hoverRiver('Brahmaputra')"
            @mouseleave="unhoverRiver"
          />
          <!-- Indus tributaries -->
          <path
            class="river-path"
            d="M100,60 L90,90 L80,120 L70,160"
            fill="none"
            stroke="#38bdf8"
            stroke-width="1.5"
            stroke-linecap="round"
            data-river="Indus"
            @click="selectRiver('Indus')"
            @mouseenter="hoverRiver('Indus')"
            @mouseleave="unhoverRiver"
          />
        </g>

        <!-- Peninsular east-flowing rivers -->
        <g ref="peninsularEastGroup" opacity="0">
          <!-- Godavari -->
          <path
            class="river-path"
            d="M120,280 L160,290 L200,300 L240,310 L280,320 L310,330"
            fill="none"
            stroke="#f0b429"
            stroke-width="2.5"
            stroke-linecap="round"
            data-river="Godavari"
            @click="selectRiver('Godavari')"
            @mouseenter="hoverRiver('Godavari')"
            @mouseleave="unhoverRiver"
          />
          <!-- Krishna -->
          <path
            class="river-path"
            d="M100,320 L140,330 L180,340 L220,345 L260,355 L290,360"
            fill="none"
            stroke="#fb923c"
            stroke-width="2"
            stroke-linecap="round"
            data-river="Krishna"
            @click="selectRiver('Krishna')"
            @mouseenter="hoverRiver('Krishna')"
            @mouseleave="unhoverRiver"
          />
          <!-- Cauvery -->
          <path
            class="river-path"
            d="M130,380 L160,390 L190,395 L220,400 L250,410"
            fill="none"
            stroke="#f472b6"
            stroke-width="1.5"
            stroke-linecap="round"
            data-river="Cauvery"
            @click="selectRiver('Cauvery')"
            @mouseenter="hoverRiver('Cauvery')"
            @mouseleave="unhoverRiver"
          />
        </g>

        <!-- Peninsular west-flowing rivers -->
        <g ref="peninsularWestGroup" opacity="0">
          <!-- Narmada -->
          <path
            class="river-path"
            d="M200,250 L170,255 L140,260 L110,265 L80,270 L60,275"
            fill="none"
            stroke="#34d399"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="6,3"
            data-river="Narmada"
            @click="selectRiver('Narmada')"
            @mouseenter="hoverRiver('Narmada')"
            @mouseleave="unhoverRiver"
          />
          <!-- Tapi -->
          <path
            class="river-path"
            d="M180,270 L150,275 L120,278 L90,282 L65,285"
            fill="none"
            stroke="#2dd4bf"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-dasharray="6,3"
            data-river="Tapi"
            @click="selectRiver('Tapi')"
            @mouseenter="hoverRiver('Tapi')"
            @mouseleave="unhoverRiver"
          />
        </g>

        <!-- Labels -->
        <g ref="labelsGroup" opacity="0">
          <text x="200" y="25" text-anchor="middle" fill="var(--text-muted)" font-size="10">HIMALAYAN</text>
          <text x="200" y="240" text-anchor="middle" fill="var(--text-muted)" font-size="10">PENINSULAR</text>
          <text x="55" y="290" text-anchor="end" fill="#34d399" font-size="9">← Arabian Sea</text>
          <text x="340" y="340" text-anchor="start" fill="#f0b429" font-size="9">Bay of Bengal →</text>
        </g>
      </svg>

      <!-- River info tooltip -->
      <div
        v-if="selectedRiver"
        class="absolute bottom-4 left-4 right-4 card animate-slide-up"
        style="background: var(--bg-tertiary)"
      >
        <div class="flex items-start justify-between">
          <div>
            <h4 class="font-semibold" :style="{ color: riverData[selectedRiver]?.color || 'var(--text-primary)' }">
              {{ selectedRiver }}
            </h4>
            <p class="text-xs mt-1" style="color: var(--text-secondary)">
              {{ riverData[selectedRiver]?.info || '' }}
            </p>
          </div>
          <button class="text-xs" style="color: var(--text-muted)" @click="selectedRiver = null">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const mapContainer = ref<HTMLElement | null>(null)
const svgMap = ref<SVGElement | null>(null)
const indiaOutline = ref<SVGElement | null>(null)
const himalayanGroup = ref<SVGElement | null>(null)
const peninsularEastGroup = ref<SVGElement | null>(null)
const peninsularWestGroup = ref<SVGElement | null>(null)
const labelsGroup = ref<SVGElement | null>(null)

const selectedRiver = ref<string | null>(null)
const hoveredRiver = ref<string | null>(null)

const riverData: Record<string, { color: string; info: string }> = {
  Ganga: { color: '#60a5fa', info: 'Origin: Gangotri Glacier · 2,525 km · Largest basin in India · Tributaries: Yamuna, Kosi, Son' },
  Brahmaputra: { color: '#818cf8', info: 'Origin: Tibet (as Tsangpo) · 2,900 km · Antecedent river · Tributaries: Teesta, Subansiri' },
  Indus: { color: '#38bdf8', info: 'Origin: Lake Mansarovar · 2,880 km · Tributaries: Jhelum, Chenab, Ravi, Beas, Sutlej' },
  Godavari: { color: '#f0b429', info: 'Origin: Nasik, MH · 1,465 km · "Dakshin Ganga" · 7 states · 8+ PYQs in TSLPRB' },
  Krishna: { color: '#fb923c', info: 'Origin: Mahabaleshwar · 1,400 km · Tributaries: Bhima, Tungabhadra, Malaprabha' },
  Cauvery: { color: '#f472b6', info: 'Origin: Brahmagiri Hills · 800 km · Sacred river of South India' },
  Narmada: { color: '#34d399', info: 'Origin: Amarkantak · 1,312 km · Flows through rift valley · West-flowing → Arabian Sea · No delta' },
  Tapi: { color: '#2dd4bf', info: 'Origin: Multai, Betul · 724 km · Parallel to Narmada · West-flowing · Ukai Dam' },
}

function isReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function selectRiver(name: string) {
  selectedRiver.value = selectedRiver.value === name ? null : name
}

function hoverRiver(name: string) {
  hoveredRiver.value = name
  const reduced = isReducedMotion()
  // Highlight the hovered river path
  const paths = svgMap.value?.querySelectorAll('.river-path')
  paths?.forEach(p => {
    const el = p as SVGElement
    if (el.dataset.river === name) {
      gsap.to(el, { strokeWidth: 4, duration: reduced ? 0 : 0.2 })
    } else {
      gsap.to(el, { opacity: 0.3, duration: reduced ? 0 : 0.2 })
    }
  })
}

function unhoverRiver() {
  hoveredRiver.value = null
  const reduced = isReducedMotion()
  const paths = svgMap.value?.querySelectorAll('.river-path')
  paths?.forEach(p => {
    const el = p as SVGElement
    gsap.to(el, { strokeWidth: parseFloat(el.getAttribute('stroke-width') || '2'), opacity: 1, duration: reduced ? 0 : 0.2 })
  })
}

onMounted(() => {
  if (!import.meta.client) return

  const paths = svgMap.value?.querySelectorAll('.river-path')

  if (isReducedMotion()) {
    if (indiaOutline.value) gsap.set(indiaOutline.value, { opacity: 0.6 })
    if (himalayanGroup.value) gsap.set(himalayanGroup.value, { opacity: 1 })
    if (peninsularEastGroup.value) gsap.set(peninsularEastGroup.value, { opacity: 1 })
    if (peninsularWestGroup.value) gsap.set(peninsularWestGroup.value, { opacity: 1 })
    if (labelsGroup.value) gsap.set(labelsGroup.value, { opacity: 1 })
    paths?.forEach(path => {
      const p = path as SVGPathElement
      const length = p.getTotalLength?.() ?? 100
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: 0 })
    })
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  // Entrance animation - triggered when the map scrolls into view
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: mapContainer.value,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  })

  tl.to(indiaOutline.value, { opacity: 0.6, duration: 0.5, ease: 'power2.out' })
    .to(himalayanGroup.value, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .to(peninsularEastGroup.value, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to(peninsularWestGroup.value, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to(labelsGroup.value, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')

  // Animate river paths drawing in
  paths?.forEach(path => {
    const p = path as SVGPathElement
    const length = p.getTotalLength()
    gsap.set(p, { strokeDasharray: length, strokeDashoffset: length })
    tl.to(p, { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' }, '-=0.8')
  })
})
</script>

<style scoped>
.river-path {
  cursor: pointer;
  transition: filter 0.2s ease;
}
.river-path:hover {
  filter: drop-shadow(0 0 6px currentColor);
}
</style>
