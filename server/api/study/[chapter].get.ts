import { createError, defineEventHandler, getRouterParam } from 'h3'
import fs from 'node:fs'
import path from 'node:path'
import type { StudyChapter, StudyChapterResolved, StudyPyq, StudyPyqRef } from '~/types/study'
import parliament from '~/content/data/study/polity/parliament'
import historicalBackground from '~/content/data/study/polity/historical-background-1773-1947'
import makingOfTheConstitution from '~/content/data/study/polity/making-of-the-constitution'
import staticPyqs from '~/content/data/study/pyqs.json'

/**
 * Study chapter registry.
 * Chapter files live in content/data/study/<subject>/<slug>.ts. They reference
 * PYQs by uid only; this endpoint resolves them against
 * data/pyq_enriched_master.json (single source of truth, never duplicated)
 * and staticPyqs for edge runtimes (Cloudflare Pages).
 */
const CHAPTERS: Record<string, StudyChapter> = {
  [parliament.slug]: parliament,
  [historicalBackground.slug]: historicalBackground,
  [makingOfTheConstitution.slug]: makingOfTheConstitution,
}

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
  // On-demand development fallback: only read master file if UID is not in staticPyqs cache
  if (!q && process.env.NODE_ENV !== 'production') {
    try {
      const filePath = path.resolve(process.cwd(), 'data/pyq_enriched_master.json')
      if (fs.existsSync(filePath)) {
        const all: MasterPyq[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        for (const item of all) index.set(item.uid, item)
        q = index.get(ref.uid)
      }
    } catch {
      // Edge runtime fallback
    }
  }
  if (!q) return null
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
