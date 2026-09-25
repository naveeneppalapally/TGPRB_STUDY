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

const ROOT = process.cwd()
const CONTENT_DIR = resolve(ROOT, 'content/current-affairs')
const OUT_DIR = resolve(ROOT, 'content/data/ca')
const OUT_FILE = join(OUT_DIR, 'cards.json')

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
    const id = String(fm.id ?? file.replace(/\.md$/, ''))
    cards.push({ id, meta: fm })
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
  const json = JSON.stringify(cards)
  writeFileSync(OUT_FILE, json, 'utf-8')

  const sizeMb = (json.length / 1024 / 1024).toFixed(2)
  console.log(`[ca-export] ${cards.length} cards -> content/data/ca/cards.json (${sizeMb} MB)`)
  if (skipped.length > 0) {
    // Loud but non-fatal: a single malformed card must never stop the site from
    // deploying, but it must be visible in the build log.
    console.warn(`[ca-export] WARNING: ${skipped.length} card(s) excluded from the feed:`)
    for (const s of skipped) console.warn(`[ca-export]   - ${s.file}: ${s.reason}`)
  }
}

main()
