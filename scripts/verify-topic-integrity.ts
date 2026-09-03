/**
 * Topic Integrity & Contract Gatekeeper
 * 
 * Enforces strict consistency across all study topics in TSLPRB StudyOS:
 * 1. Every note page must have a valid GateQuiz with registered JSON and API endpoint.
 * 2. Every note page must have an atomic Flashcard deck with registered JSON and API endpoint.
 * 3. Every note page must have a matching CurrentAffairsStrip.
 * 4. All subject links in layouts/default.vue and pages/index.vue must route to Subject Hubs.
 * 
 * Run automatically in predev, prebuild, and CI.
 */

import fs from 'node:fs'
import path from 'node:path'
import { globSync } from 'glob'

const ROOT = process.cwd()

interface Defect {
  file: string
  issue: string
}

const defects: Defect[] = []

function addDefect(file: string, issue: string) {
  defects.push({ file, issue })
}

console.log('\n╔══════════════════════════════════════════════════════════════════╗')
console.log('║       TSLPRB STUDYOS - TOPIC INTEGRITY & CONTRACT GATEKEEPER     ║')
console.log('╚══════════════════════════════════════════════════════════════════╝\n')

// 1. Gather all note pages
const notePages = globSync('pages/notes/**/*.vue', {
  cwd: ROOT,
}).filter(p => !p.endsWith('index.vue') && !path.basename(p).startsWith('['))

console.log(`Found ${notePages.length} active topic note pages to audit:`)
notePages.forEach(p => console.log(`  - ${p}`))
console.log('')

// Read API registries
const gateApiContent = fs.readFileSync(path.join(ROOT, 'server/api/gate/[noteId].get.ts'), 'utf-8')
const fcApiContent = fs.readFileSync(path.join(ROOT, 'server/api/flashcards/[noteId].get.ts'), 'utf-8')

// Read all Gate JSON files
const gateFiles = globSync('content/data/gates/*.json', { cwd: ROOT })
const gateMap = new Map<string, any>()
for (const gf of gateFiles) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(ROOT, gf), 'utf-8'))
    if (raw.note_id) {
      gateMap.set(raw.note_id, { file: gf, data: raw })
    }
  } catch (e: any) {
    addDefect(gf, `Corrupted Gate JSON syntax: ${e.message}`)
  }
}

// Read all Flashcard JSON files
const fcFiles = globSync('content/data/flashcards/**/*.json', { cwd: ROOT })
const fcMap = new Map<string, { file: string; cards: any[] }>()
for (const ff of fcFiles) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(ROOT, ff), 'utf-8'))
    let cards: any[] = []
    let noteId: string | null = null

    if (Array.isArray(raw)) {
      cards = raw
      noteId = raw[0]?.source_note_id || raw[0]?.related_topic_ids?.[0]
    } else if (raw && typeof raw === 'object') {
      cards = Array.isArray(raw.cards) ? raw.cards : []
      noteId = raw.note_id || raw.topic_id
    }

    if (noteId) {
      fcMap.set(noteId, { file: ff, cards })
    }
    // Also check cards for explicit source_note_id
    for (const c of cards) {
      if (c.source_note_id && !fcMap.has(c.source_note_id)) {
        fcMap.set(c.source_note_id, { file: ff, cards })
      }
    }
  } catch (e: any) {
    addDefect(ff, `Corrupted Flashcards JSON syntax: ${e.message}`)
  }
}

// 2. Audit each note page
let verifiedCount = 0

for (const notePage of notePages) {
  const fullPath = path.join(ROOT, notePage)
  const content = fs.readFileSync(fullPath, 'utf-8')

  // Extract GateQuiz note-id
  const gateMatch = content.match(/<GateQuiz\s+[^>]*note-id="([^"]+)"/)
  if (!gateMatch) {
    addDefect(notePage, 'Missing <GateQuiz note-id="..." /> component invocation.')
    continue
  }
  const noteId = gateMatch[1]

  // Validate format
  if (!/^NOTE-[A-Z]+-[A-Z0-9-]+$/.test(noteId)) {
    addDefect(notePage, `Malformed note-id "${noteId}". Must follow "NOTE-{SECTION}-{TOPIC}".`)
  }

  // Check CurrentAffairsStrip
  const caMatch = content.match(/<CurrentAffairsStrip\s+[^>]*note-id="([^"]+)"/)
  if (!caMatch) {
    addDefect(notePage, 'Missing <CurrentAffairsStrip note-id="..." /> component invocation.')
  } else if (caMatch[1] !== noteId) {
    addDefect(notePage, `CurrentAffairsStrip note-id "${caMatch[1]}" does not match GateQuiz note-id "${noteId}".`)
  }

  // Check TOC registration
  if (!content.includes("'gate'") && !content.includes('"gate"')) {
    addDefect(notePage, 'TOC sections array missing "gate" anchor registration.')
  }
  if (!content.includes("'current-affairs'") && !content.includes('"current-affairs"')) {
    addDefect(notePage, 'TOC sections array missing "current-affairs" anchor registration.')
  }

  // Verify Gate JSON
  const gateEntry = gateMap.get(noteId)
  if (!gateEntry) {
    addDefect(notePage, `Missing gate JSON in content/data/gates/ for note-id "${noteId}".`)
  } else {
    const qData = gateEntry.data
    if (!Array.isArray(qData.questions) || qData.questions.length < 5) {
      addDefect(gateEntry.file, `Gate quiz for "${noteId}" must contain at least 5 questions (found ${qData.questions?.length || 0}).`)
    } else {
      qData.questions.forEach((q: any, qi: number) => {
        if (!q.id) addDefect(gateEntry.file, `Question #${qi + 1} missing "id".`)
        if (!q.question) addDefect(gateEntry.file, `Question #${qi + 1} missing "question" text.`)
        if (!Array.isArray(q.options) || q.options.length < 4) {
          addDefect(gateEntry.file, `Question "${q.id || qi}" has fewer than 4 options.`)
        }
        if (typeof q.correct_answer !== 'number' || q.correct_answer < 0 || q.correct_answer >= (q.options?.length || 0)) {
          addDefect(gateEntry.file, `Question "${q.id || qi}" has out-of-bounds correct_answer "${q.correct_answer}".`)
        }
        if (!q.explanation) addDefect(gateEntry.file, `Question "${q.id || qi}" missing "explanation".`)
      })
    }
  }

  // Verify Gate API Registration
  if (!gateApiContent.includes(`"${noteId}"`) && !gateApiContent.includes(`'${noteId}'`) && !gateApiContent.includes(noteId)) {
    // Check if imported object has note_id
    const hasDynamic = gateApiContent.includes(`[(`) && gateApiContent.includes(`.note_id]:`)
    if (!hasDynamic) {
      addDefect('server/api/gate/[noteId].get.ts', `Note ID "${noteId}" is NOT registered in GATES map.`)
    }
  }

  // Verify Flashcards JSON
  const fcEntry = fcMap.get(noteId)
  if (!fcEntry) {
    addDefect(notePage, `Missing flashcards JSON in content/data/flashcards/ for note-id "${noteId}".`)
  } else {
    if (!Array.isArray(fcEntry.cards) || fcEntry.cards.length < 10) {
      addDefect(fcEntry.file, `Flashcard deck for "${noteId}" must contain at least 10 cards (found ${fcEntry.cards?.length || 0}).`)
    } else {
      fcEntry.cards.forEach((c: any, ci: number) => {
        if (!c.front) addDefect(fcEntry.file, `Flashcard #${ci + 1} missing "front" prompt.`)
        if (!c.back && !c.key_fact) addDefect(fcEntry.file, `Flashcard #${ci + 1} missing "back" answer.`)
      })
    }
  }

  // Verify Flashcard API Registration
  if (!fcApiContent.includes(`'${noteId}'`) && !fcApiContent.includes(`"${noteId}"`)) {
    addDefect('server/api/flashcards/[noteId].get.ts', `Note ID "${noteId}" is NOT registered in DECKS or DECK_META maps.`)
  }

  verifiedCount++
}

// 3. Verify Navigation Invariants
console.log('Auditing Subject Banks navigation links in layouts/default.vue and pages/index.vue...')
const layoutContent = fs.readFileSync(path.join(ROOT, 'layouts/default.vue'), 'utf-8')
const indexContent = fs.readFileSync(path.join(ROOT, 'pages/index.vue'), 'utf-8')

// Check default layout subjects array
const subjectsBlockMatch = layoutContent.match(/const\s+subjects\s*=\s*\[([\s\S]*?)\]/)
if (subjectsBlockMatch) {
  const subjectsBlock = subjectsBlockMatch[1]
  const subjectRoutes = Array.from(subjectsBlock.matchAll(/name:\s*"([^"]+)"(?:,\s*icon:\s*"[^"]+")?,\s*to:\s*"([^"]+)"/g))

  for (const match of subjectRoutes) {
    const [_, name, toRoute] = match
    if (toRoute.startsWith('/notes/')) {
      const parts = toRoute.split('/').filter(Boolean)
      if (parts.length > 2) {
        addDefect('layouts/default.vue', `Subject "${name}" routes directly to topic "${toRoute}" instead of Subject Hub "/${parts[0]}/${parts[1]}".`)
      } else {
        const hubPath = path.join(ROOT, 'pages', parts[0], parts[1], 'index.vue')
        if (!fs.existsSync(hubPath)) {
          addDefect('layouts/default.vue', `Subject Hub target does not exist: pages/${parts[0]}/${parts[1]}/index.vue`)
        }
      }
    }
  }
}

// Check index.vue openSubject navigation
const openSubjectMatch = indexContent.match(/function\s+openSubject[\s\S]*?\{([\s\S]*?)\n\}/)
if (openSubjectMatch) {
  const openSubjectBody = openSubjectMatch[1]
  const navMatches = Array.from(openSubjectBody.matchAll(/navigateTo\(['"]([^'"]+)['"]\)/g))
  for (const m of navMatches) {
    const toRoute = m[1]
    if (toRoute.startsWith('/notes/')) {
      const parts = toRoute.split('/').filter(Boolean)
      if (parts.length > 2) {
        addDefect('pages/index.vue', `openSubject() navigates directly to topic "${toRoute}" instead of Subject Hub "/${parts[0]}/${parts[1]}".`)
      }
    }
  }
}

// 4. Report results
if (defects.length > 0) {
  console.error('\n❌ TOPIC INTEGRITY AUDIT FAILED WITH DEFECTS:\n')
  defects.forEach((d, i) => {
    console.error(`  ${i + 1}. [${d.file}]`)
    console.error(`     └─ ${d.issue}\n`)
  })
  console.error('All defects must be resolved before proceeding with build or deployment.\n')
  process.exit(1)
}

console.log(`✔ ALL ${verifiedCount} ACTIVE TOPIC NOTE PAGES FULLY VERIFIED.`)
console.log('✔ Comprehension Gate JSONs present and valid (>= 5 questions with options and explanations).')
console.log('✔ Nitro /api/gate/[noteId] API endpoints registered.')
console.log('✔ Atomic Flashcard decks present and valid (>= 10 cards with front/back).')
console.log('✔ Nitro /api/flashcards/[noteId] API endpoints registered.')
console.log('✔ Subject Banks navigation verified to target Subject Hubs without bypass.')
console.log('✔ Status: 100% PASS\n')
process.exit(0)
