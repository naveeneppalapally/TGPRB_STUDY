import { createError, defineEventHandler, getRouterParam } from 'h3'
import type { StudyChapterResolved, StudyPyq, StudyPyqRef } from '~/types/study'
import { CHAPTERS } from '../../utils/study-chapters'
import staticPyqs from '~/content/data/study/pyqs.json'

interface MasterPyq {
  uid: string
  question_text: string
  options: string[]
  correct_option_index: number
  explanation: string
  difficulty?: string
  occurrences: Array<{ source_file: string }>
}

let masterIndex: Map<string, MasterPyq> | null = null

function loadMasterIndex(): Map<string, MasterPyq> {
  if (masterIndex) return masterIndex
  masterIndex = new Map()

  // 1. Seed with bundled static PYQs (guarantees Cloudflare Pages edge runtime resolution and instant startup)
  if (Array.isArray(staticPyqs)) {
    for (const q of staticPyqs as MasterPyq[]) masterIndex.set(q.uid, q)
  }

  return masterIndex
}

/** "SI_2018_Mains_Paper2.json" -> "SI 2018 Mains" */
function paperLabel(sourceFile: string): string {
  const base = sourceFile.replace(/\.json$/i, '')
  const parts = base.split('_')
  const exam = parts[0] === 'SI' ? 'SI' : 'Constable'
  const year = parts.find(p => /^20\d\d$/.test(p)) ?? ''
  const stage = parts.find(p => /^(Prelims|Mains|Final)$/i.test(p)) ?? ''
  return [exam, year, stage === 'Final' ? 'Mains' : stage].filter(Boolean).join(' ')
}

function resolvePyq(ref: StudyPyqRef, index: Map<string, MasterPyq>): StudyPyq | null {
  let q = index.get(ref.uid)
  if (!q) throw createError({ statusCode: 500, statusMessage: `Unresolved verified Study PYQ: ${ref.uid}` })
  const papers = Array.from(new Set((q.occurrences || []).map(o => paperLabel(o.source_file))))
  return {
    uid: q.uid,
    question: q.question_text,
    options: q.options,
    answer: q.correct_option_index,
    explanation: q.explanation,
    difficulty: q.difficulty,
    paper: papers[0] ?? 'TGPRB',
    papers,
    sourceLine: ref.sourceLine,
  }
}

export default defineEventHandler((event): StudyChapterResolved => {
  const slug = (getRouterParam(event, 'chapter') || '').toLowerCase()
  const chapter = CHAPTERS[slug]
  if (!chapter) {
    throw createError({ statusCode: 404, statusMessage: `Unknown study chapter: ${slug}` })
  }

  const index = loadMasterIndex()

  return {
    ...chapter,
    sections: chapter.sections.map(section => ({
      ...section,
      pyqs: section.pyqs
        .map(ref => resolvePyq(ref, index))
        .filter((q): q is StudyPyq => q !== null),
    })),
  }
})
