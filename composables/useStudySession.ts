import { computed, inject, onBeforeUnmount, onMounted, provide, ref, watch, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type {
  DockTab,
  SectionProgress,
  StudyChapterResolved,
  StudySectionResolved,
  TrayHeight,
} from '~/types/study'

/**
 * One study session = one chapter open on the 3-zone screen.
 *
 * The single most important invariant lives here: `section` is the ONLY
 * source the dock/tray reads from. Change `activeSectionId` and every panel
 * (PYQ, Cards, Notes, Traps) re-binds because they all derive from it.
 */

export interface StudySession {
  chapter: Ref<StudyChapterResolved | null>
  sections: ComputedRef<StudySectionResolved[]>
  section: ComputedRef<StudySectionResolved>
  activeSectionId: Ref<string>
  activeIndex: ComputedRef<number>
  hasPrev: ComputedRef<boolean>
  hasNext: ComputedRef<boolean>

  // Dock / tray
  dockTab: Ref<DockTab>
  trayHeight: Ref<TrayHeight>
  /** Per-section index of the question currently shown in the PYQ panel */
  pyqIndex: Ref<number>
  cardIndex: Ref<number>
  trapIndex: Ref<number>

  // Rail
  railPinned: Ref<boolean>

  // Stage
  clozeOn: Ref<boolean>
  flashLineId: Ref<string | null>
  /** Pending quote captured from a text selection; Notes panel consumes it */
  pendingAnchor: Ref<string | null>

  // Progress
  progress: Ref<Record<string, SectionProgress>>
  sectionProgress: ComputedRef<SectionProgress>
  chapterPercent: ComputedRef<number>
  elapsedSeconds: Ref<number>

  goTo: (sectionId: string) => void
  next: () => void
  prev: () => void
  openTab: (tab: DockTab, opts?: { raiseTray?: TrayHeight }) => void
  setTray: (h: TrayHeight) => void
  answerPyq: (uid: string, optionIndex: number) => void
  gradeCard: (cardId: string, knew: boolean) => void
  recordTrap: (trapId: string, correct: number, total: number) => void
  markRead: (sectionId?: string) => void
  flashLine: (lineId?: string) => void
  captureAnchor: (text: string, tab?: DockTab) => void
  sectionStatus: (sectionId: string) => 'todo' | 'reading' | 'read' | 'cleared'
  sectionCounts: (s?: StudySectionResolved) => { pyqs: number; cards: number; traps: number; wrong: number }
}

const KEY: InjectionKey<StudySession> = Symbol('study-session')

function emptyProgress(): SectionProgress {
  return { read: false, answers: {}, cards: {}, traps: {} }
}

const fallbackSection: StudySectionResolved = {
  id: '',
  title: '',
  short: '',
  estMinutes: 0,
  blocks: [],
  pyqs: [],
  cards: [],
  traps: [],
}

interface PersistedState {
  activeSectionId: string
  progress: Record<string, SectionProgress>
  railPinned: boolean
  clozeOn: boolean
}

export function createStudySession(chapter: Ref<StudyChapterResolved | null>): StudySession {
  const storageKey = computed(() => `studyos:study:${chapter.value?.slug || 'unknown'}`)

  const sections = computed(() => chapter.value?.sections || [])
  const activeSectionId = ref(sections.value[0]?.id ?? '')
  const activeIndex = computed(() => Math.max(0, sections.value.findIndex(s => s.id === activeSectionId.value)))
  const section = computed(() => sections.value[activeIndex.value] ?? sections.value[0] ?? fallbackSection)
  const hasPrev = computed(() => activeIndex.value > 0)
  const hasNext = computed(() => activeIndex.value < sections.value.length - 1)

  const dockTab = ref<DockTab>('pyq')
  const trayHeight = ref<TrayHeight>('peek')
  const pyqIndex = ref(0)
  const cardIndex = ref(0)
  const trapIndex = ref(0)
  const railPinned = ref(false)
  const clozeOn = ref(false)
  const flashLineId = ref<string | null>(null)
  const pendingAnchor = ref<string | null>(null)

  const progress = ref<Record<string, SectionProgress>>({})
  const sectionProgress = computed(() => progress.value[activeSectionId.value] ?? emptyProgress())
  const elapsedSeconds = ref(0)

  const chapterPercent = computed(() => {
    const total = sections.value.length || 1
    const done = sections.value.filter(s => progress.value[s.id]?.read).length
    return Math.round((done / total) * 100)
  })

  function ensure(sectionId: string): SectionProgress {
    if (!progress.value[sectionId]) {
      progress.value = { ...progress.value, [sectionId]: emptyProgress() }
    }
    return progress.value[sectionId]
  }

  watch(sections, (s) => {
    if (s.length > 0 && (!activeSectionId.value || !s.some(x => x.id === activeSectionId.value))) {
      activeSectionId.value = s[0].id
    }
  }, { immediate: true })

  // ── Navigation: this is the re-bind point ─────────────────────────────
  function goTo(sectionId: string) {
    if (!sections.value.some(s => s.id === sectionId)) return
    if (sectionId === activeSectionId.value) return
    activeSectionId.value = sectionId
    // Reset panel cursors so the dock never shows a stale question/card index
    pyqIndex.value = 0
    cardIndex.value = 0
    trapIndex.value = 0
    flashLineId.value = null
    pendingAnchor.value = null
    // On mobile, a section change drops the tray back to peek
    if (trayHeight.value === 'full') trayHeight.value = 'peek'
  }
  function next() {
    if (hasNext.value) goTo(sections.value[activeIndex.value + 1].id)
  }
  function prev() {
    if (hasPrev.value) goTo(sections.value[activeIndex.value - 1].id)
  }

  function openTab(tab: DockTab, opts?: { raiseTray?: TrayHeight }) {
    dockTab.value = tab
    if (opts?.raiseTray) trayHeight.value = opts.raiseTray
    else if (trayHeight.value === 'peek') trayHeight.value = 'half'
  }
  function setTray(h: TrayHeight) {
    trayHeight.value = h
  }

  // ── Progress writes ───────────────────────────────────────────────────
  function answerPyq(uid: string, optionIndex: number) {
    const p = ensure(activeSectionId.value)
    if (p.answers[uid] !== undefined) return
    p.answers = { ...p.answers, [uid]: optionIndex }
    progress.value = { ...progress.value }
  }
  function gradeCard(cardId: string, knew: boolean) {
    const p = ensure(activeSectionId.value)
    p.cards = { ...p.cards, [cardId]: knew }
    progress.value = { ...progress.value }
  }
  function recordTrap(trapId: string, correct: number, total: number) {
    const p = ensure(activeSectionId.value)
    p.traps = { ...p.traps, [trapId]: { correct, total } }
    progress.value = { ...progress.value }
  }
  function markRead(sectionId = activeSectionId.value) {
    const p = ensure(sectionId)
    p.read = true
    progress.value = { ...progress.value }
  }

  let flashTimer: ReturnType<typeof setTimeout> | null = null
  function flashLine(lineId?: string) {
    if (!lineId) return
    flashLineId.value = null
    if (flashTimer) clearTimeout(flashTimer)
    // next tick so a repeat click on the same line re-triggers the animation
    requestAnimationFrame(() => {
      flashLineId.value = lineId
      flashTimer = setTimeout(() => { flashLineId.value = null }, 2200)
    })
    // On mobile, make sure the stage is visible above the tray
    if (trayHeight.value === 'full') trayHeight.value = 'half'
  }

  function captureAnchor(text: string, tab: DockTab = 'notes') {
    pendingAnchor.value = text.trim().slice(0, 400)
    dockTab.value = tab
    trayHeight.value = 'full'
  }

  function sectionStatus(sectionId: string): 'todo' | 'reading' | 'read' | 'cleared' {
    if (!sectionId) return 'todo'
    const p = progress.value[sectionId]
    const s = sections.value.find(x => x.id === sectionId)
    if (sectionId === activeSectionId.value && !p?.read) return 'reading'
    if (!p?.read) return 'todo'
    if (s && s.pyqs && s.pyqs.length > 0) {
      const allAnswered = s.pyqs.every(q => p.answers[q.uid] !== undefined)
      const allRight = s.pyqs.every(q => p.answers[q.uid] === q.answer)
      if (allAnswered && allRight) return 'cleared'
    }
    return 'read'
  }

  function sectionCounts(s?: StudySectionResolved) {
    if (!s || !s.id) return { pyqs: 0, cards: 0, traps: 0, wrong: 0 }
    const p = progress.value[s.id]
    const pyqs = s.pyqs || []
    const cards = s.cards || []
    const traps = s.traps || []
    const wrong = p ? pyqs.filter(q => p.answers[q.uid] !== undefined && p.answers[q.uid] !== q.answer).length : 0
    return { pyqs: pyqs.length, cards: cards.length, traps: traps.length, wrong }
  }

  // ── Persistence ───────────────────────────────────────────────────────
  let timer: ReturnType<typeof setInterval> | null = null

  function restoreState() {
    if (!import.meta.client || storageKey.value === 'studyos:study:unknown') return
    try {
      const raw = localStorage.getItem(storageKey.value)
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistedState>
        if (saved.progress) progress.value = saved.progress
        if (saved.activeSectionId && sections.value.some(s => s.id === saved.activeSectionId)) {
          activeSectionId.value = saved.activeSectionId
        }
        if (typeof saved.railPinned === 'boolean') railPinned.value = saved.railPinned
        if (typeof saved.clozeOn === 'boolean') clozeOn.value = saved.clozeOn
      }
    } catch { /* ignore corrupt state */ }
  }

  onMounted(() => {
    restoreState()
    timer = setInterval(() => { elapsedSeconds.value += 1 }, 1000)
  })

  watch(storageKey, (key) => {
    if (key !== 'studyos:study:unknown') restoreState()
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
    if (flashTimer) clearTimeout(flashTimer)
  })

  watch([activeSectionId, progress, railPinned, clozeOn], () => {
    if (!import.meta.client || storageKey.value === 'studyos:study:unknown') return
    const state: PersistedState = {
      activeSectionId: activeSectionId.value,
      progress: progress.value,
      railPinned: railPinned.value,
      clozeOn: clozeOn.value,
    }
    try { localStorage.setItem(storageKey.value, JSON.stringify(state)) } catch { /* quota */ }
  }, { deep: true })

  const session: StudySession = {
    chapter, sections, section, activeSectionId, activeIndex, hasPrev, hasNext,
    dockTab, trayHeight, pyqIndex, cardIndex, trapIndex,
    railPinned, clozeOn, flashLineId, pendingAnchor,
    progress, sectionProgress, chapterPercent, elapsedSeconds,
    goTo, next, prev, openTab, setTray, answerPyq, gradeCard, recordTrap, markRead,
    flashLine, captureAnchor, sectionStatus, sectionCounts,
  }

  provide(KEY, session)
  return session
}

export function useStudySession(): StudySession {
  const s = inject(KEY)
  if (!s) throw new Error('useStudySession() must be used inside a page that called createStudySession()')
  return s
}
