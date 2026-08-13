import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

interface MasterPyq {
  uid: string
  topic_id: string
  question_text: string
  options: string[]
  correct_option_index: number
  explanation: string
  occurrences: Array<{ source_file: string; q_no?: number }>
}

const NOTE_TOPIC_IDS = new Set([
  'GEO-DRAINAGE',
  'POL-UNION-EXEC-LEG',
  'TEL-MOVEMENT',
])

const root = process.cwd()
const masterPath = path.join(root, 'data', 'pyq_enriched_master.json')
const outputPath = path.join(root, 'data', 'ai_verified_pyqs.json')

const bannedDash = String.fromCharCode(8212)
const cleanText = (value: string) => value.replaceAll(bannedDash, '-')

const source = await readFile(masterPath, 'utf8')
const master = JSON.parse(source) as MasterPyq[]

const compact = master
  .filter(question => NOTE_TOPIC_IDS.has(question.topic_id))
  .map(question => ({
    uid: cleanText(question.uid),
    topic_id: cleanText(question.topic_id),
    question_text: cleanText(question.question_text),
    options: question.options.map(cleanText),
    correct_option_index: question.correct_option_index,
    explanation: cleanText(question.explanation),
    occurrences: question.occurrences.map(({ source_file, q_no }) => ({ source_file: cleanText(source_file), q_no })),
  }))

await writeFile(outputPath, `${JSON.stringify(compact, null, 2)}\n`, 'utf8')
console.log(`Generated ${compact.length} verified PYQ records for AI grounding.`)
