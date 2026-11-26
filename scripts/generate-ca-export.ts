/**
 * scripts/generate-ca-export.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Exports every current-affairs card's frontmatter to a single JSON file that
 * the Nitro API routes import directly.
 *
 * Why this exists
 * ---------------
 * Cloudflare Pages has no database at runtime, so `queryCollection(event, ...)`
 * inside a server route throws and the endpoint returns HTTP 500. The routes
 * that work on the edge are the ones importing JSON at build time (see
 * server/api/study/[chapter].get.ts and content/data/study/pyqs.json).
 *
 * This script produces the same shape for current affairs:
 *   content/data/ca/cards.json -> [{ id, meta }, ...]
 *
 * It runs from `predev` and `prebuild`, so the export always matches the .md
 * files in the checkout. The file is gitignored on purpose: it is a build
 * artifact, and committing it would let it drift from the source of truth.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import yaml from 'js-yaml'
import { validateCACard } from '../utils/ca-contract'

const ROOT = process.cwd()
const CONTENT_DIR = resolve(ROOT, 'content/current-affairs')
const OUT_DIR = resolve(ROOT, 'content/data/ca')
const OUT_FILE = join(OUT_DIR, 'cards.json')
const RUNTIME_DIR = resolve(ROOT, 'public/_ca')
const RUNTIME_FILE = join(RUNTIME_DIR, 'cards-runtime.json')

// Non-runtime scraper provenance keys that can be omitted from the edge worker
// payload while staying present in markdown sources and cards.json.
const RUNTIME_OMIT_META_KEYS = new Set([
  'retrieved_at',
  'extraction_model',
  'event_key',
  'event_date_basis',
  'source_topic_ids',
  'keyword_topic_ids',
  'ministry',
  'topic',
  'type',
])

function slimRuntimeMeta(meta: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(meta)) {
    if (RUNTIME_OMIT_META_KEYS.has(k)) continue
    if (k === 'canonical_source_url' && v === meta.source_url) continue
    out[k] = v
  }
  return out
}

interface CACardExport {
  id: string
  meta: Record<string, unknown>
}

function extractFrontmatter(raw: string): Record<string, unknown> | null {
  if (!raw.startsWith('---')) return null
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return null
  const block = raw.slice(3, end)
  try {
    const parsed = yaml.load(block)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null
  } catch {
    return null
  }
}

function main(): void {
  if (!existsSync(CONTENT_DIR)) {
    console.error(`[ca-export] content directory not found: ${CONTENT_DIR}`)
    process.exit(1)
  }

  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md')).sort()
  const cards: CACardExport[] = []
  const skipped: Array<{ file: string, reason: string }> = []

  for (const file of files) {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8')
    const fm = extractFrontmatter(raw)
    if (!fm) {
      skipped.push({ file, reason: 'frontmatter missing or not valid YAML' })
      continue
    }
    const errors = validateCACard(fm)
    if (errors.length) { skipped.push({ file, reason: errors.join(', ') }); continue }
    const id = String(fm.id)
    cards.push({ id, meta: fm })
  }

  if (skipped.length) throw new Error(skipped.map(s => `${s.file}: ${s.reason}`).join('\n'))
  if (new Set(cards.map(c => c.id)).size !== cards.length) throw new Error('Duplicate CA IDs')
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
  const json = JSON.stringify(cards)
  writeFileSync(OUT_FILE, json, 'utf-8')

  if (!existsSync(RUNTIME_DIR)) mkdirSync(RUNTIME_DIR, { recursive: true })
  const runtimeCards = cards.map(c => ({ id: c.id, meta: slimRuntimeMeta(c.meta) }))
  const runtimeJson = JSON.stringify(runtimeCards)
  writeFileSync(RUNTIME_FILE, runtimeJson, 'utf-8')

  const sizeMb = (json.length / 1024 / 1024).toFixed(2)
  const runtimeMb = (runtimeJson.length / 1024 / 1024).toFixed(2)
  console.log(`[ca-export] ${cards.length} cards -> content/data/ca/cards.json (${sizeMb} MB), public/_ca/cards-runtime.json (${runtimeMb} MB)`)

}

main()
