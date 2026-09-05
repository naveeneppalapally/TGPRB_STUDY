import { createError, defineEventHandler, getRouterParam } from 'h3'
import fs from 'node:fs'
import path from 'node:path'
import type { StudyChapter, StudyChapterResolved, StudyPyq, StudyPyqRef } from '~/types/study'
import parliament from '~/content/data/study/polity/parliament'

/**
 * Study chapter registry.
 * Chapter files live in content/data/study/<subject>/<slug>.ts. They reference
 * PYQs by uid only; this endpoint resolves them against
 * data/pyq_enriched_master.json (single source of truth, never duplicated).
 */
const CHAPTERS: Record<string, StudyChapter> = {
  [parliament.slug]: parliament,
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
  const filePath = path.resolve(process.cwd(), 'data/pyq_enriched_master.json')
  if (fs.existsSync(filePath)) {
    const all: MasterPyq[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    for (const q of all) masterIndex.set(q.uid, q)
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
  const q = index.get(ref.uid)
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
