import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import master from '../data/pyq_enriched_master.json'
import exceptions from '../data/pyq_review_issues.json'
import media from '../data/pyq_media.json'
import { structuralIssues, publishedImage, type ArchivePyq, type PyqMediaMap } from '../utils/pyq-archive'

type Exception = { issues: string[]; historical_sha256: string; reason: string }
export const archiveReadiness = {
  records: master.length,
  recordsAwaitingReview: Object.keys(exceptions).length,
  diagramsAwaitingPublication: Object.values(media).filter(asset => !publishedImage(asset)).length,
}
export function verifyPyqArchive(records: readonly ArchivePyq[] = master, known: Record<string, Exception> = exceptions, images: PyqMediaMap = media): string[] {
  const errors: string[] = [], ids = new Set<string>()
  for (const q of records) {
    if (ids.has(q.uid)) errors.push(`Duplicate PYQ: ${q.uid}`)
    ids.add(q.uid)
    const issues = structuralIssues(q), exception = known[q.uid]
    if (issues.length) {
      const historical = { question_text: q.question_text, options: q.options, correct_option_index: q.correct_option_index, occurrences: q.occurrences }
      const hash = createHash('sha256').update(JSON.stringify(historical)).digest('hex')
      if (!exception || JSON.stringify(exception.issues) !== JSON.stringify(issues) || exception.historical_sha256 !== hash || !exception.reason.trim()) errors.push(`Unreviewed or changed incomplete PYQ: ${q.uid}`)
    } else if (exception) errors.push(`Remove resolved PYQ exception: ${q.uid}`)
    if (q.has_image) {
      const asset = images[q.uid]
      if (!asset || !asset.alt_text.trim() || !asset.source_image.startsWith('extracted_question_paper_json/images/') || asset.source_image.includes('..') || !existsSync(asset.source_image)) errors.push(`Missing original diagram source: ${q.uid}`)
      if (asset && !publishedImage(asset) && asset.asset_url !== `/images/pyqs/${q.uid}.webp`) errors.push(`Invalid diagram reference: ${q.uid}`)
    }
  }
  for (const uid of Object.keys(known)) if (!ids.has(uid)) errors.push(`Orphaned PYQ exception: ${uid}`)
  for (const uid of Object.keys(images)) if (!records.some(q => q.uid === uid && q.has_image)) errors.push(`Orphaned PYQ media: ${uid}`)
  return errors
}
