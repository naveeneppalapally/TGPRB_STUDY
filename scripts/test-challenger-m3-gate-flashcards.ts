/**
 * Challenger 1 (Milestone 3): Empirical API, GateQuiz & Flashcards Stress Harness
 * 
 * Target Artifacts:
 * - content/data/gates/making-of-the-constitution.json
 * - content/data/flashcards/polity/making-of-the-constitution.json
 * - server/api/gate/[noteId].get.ts
 * - server/api/flashcards/[noteId].get.ts
 * 
 * Run with: npx tsx scripts/test-challenger-m3-gate-flashcards.ts
 */

import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { createApp, createRouter, toNodeListener } from 'h3'

// Import endpoint handlers directly
import gateHandler from '../server/api/gate/[noteId].get'
import flashcardHandler from '../server/api/flashcards/[noteId].get'

const ROOT = process.cwd()

let totalAssertions = 0
let passedAssertions = 0
let failedAssertions = 0
const failures: Array<{ suite: string; assertion: string; detail?: string }> = []

function assert(condition: boolean, suite: string, assertion: string, detail?: string) {
  totalAssertions++
  if (condition) {
    passedAssertions++
    console.log(`  [PASS] [${suite}] ${assertion}`)
  } else {
    failedAssertions++
    const msg = `  [FAIL] [${suite}] ${assertion}${detail ? ' -> ' + detail : ''}`
    console.error(msg)
    failures.push({ suite, assertion, detail })
  }
}

async function runTestSuite() {
  console.log('\n╔══════════════════════════════════════════════════════════════════════════╗')
  console.log('║   CHALLENGER 1: EMPIRICAL GATEQUIZ & FLASHCARDS STRESS TEST HARNESS     ║')
  console.log('╚══════════════════════════════════════════════════════════════════════════╝\n')

  // ──────────────────────────────────────────────────────────────────────────
  // 1. SETUP IN-MEMORY HTTP SERVER USING H3 & NITRO ROUTER
  // ──────────────────────────────────────────────────────────────────────────
  const app = createApp()
  const router = createRouter()

  router.get('/api/gate/:noteId', gateHandler)
  router.get('/api/flashcards/:noteId', flashcardHandler)
  app.use(router)

  const server = http.createServer(toNodeListener(app))
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()))
  const address = server.address() as { port: number }
  const baseUrl = `http://127.0.0.1:${address.port}`
  console.log(`  Initialized ephemeral Nitro test server on ${baseUrl}\n`)

  try {
    // ──────────────────────────────────────────────────────────────────────────
    // SUITE 1: NITRO SERVER ENDPOINT - /api/gate/NOTE-POL-MAKING-CONST
    // ──────────────────────────────────────────────────────────────────────────
    console.log('=== SUITE 1: Nitro Server Endpoint - /api/gate/NOTE-POL-MAKING-CONST ===')
    const gateRes = await fetch(`${baseUrl}/api/gate/NOTE-POL-MAKING-CONST`)
    assert(gateRes.status === 200, 'Suite 1 - Gate Endpoint', 'HTTP status is 200 OK')

    const gateData = await gateRes.json()
    assert(gateData.note_id === 'NOTE-POL-MAKING-CONST', 'Suite 1 - Gate Endpoint', 'Response contains note_id === "NOTE-POL-MAKING-CONST"')
    assert(gateData.pass_threshold === 3, 'Suite 1 - Gate Endpoint', 'Response contains pass_threshold === 3')
    assert(Array.isArray(gateData.questions), 'Suite 1 - Gate Endpoint', 'Questions property is an array')
    assert(gateData.questions.length >= 5, 'Suite 1 - Gate Endpoint', `Questions length >= 5 (actual: ${gateData.questions?.length})`)

    const questionIds = new Set<string>()
    gateData.questions.forEach((q: any, idx: number) => {
      const qPrefix = `Question #${idx + 1} (${q.id || 'missing-id'})`
      assert(typeof q.id === 'string' && q.id.length > 0, 'Suite 1 - Gate Endpoint', `${qPrefix} has non-empty ID`)
      assert(!questionIds.has(q.id), 'Suite 1 - Gate Endpoint', `${qPrefix} has unique ID`)
      questionIds.add(q.id)

      assert(typeof q.question === 'string' && q.question.trim().length > 0, 'Suite 1 - Gate Endpoint', `${qPrefix} has non-empty question string`)
      assert(Array.isArray(q.options) && q.options.length === 4, 'Suite 1 - Gate Endpoint', `${qPrefix} has exactly 4 options`)
      
      const distinctOptions = new Set(q.options)
      assert(distinctOptions.size === 4, 'Suite 1 - Gate Endpoint', `${qPrefix} has 4 distinct options (no duplicate distractors)`)
      q.options?.forEach((opt: any, optIdx: number) => {
        assert(typeof opt === 'string' && opt.trim().length > 0, 'Suite 1 - Gate Endpoint', `${qPrefix} option ${optIdx + 1} is non-empty string`)
      })

      assert(
        typeof q.correct_answer === 'number' && Number.isInteger(q.correct_answer) && q.correct_answer >= 0 && q.correct_answer < 4,
        'Suite 1 - Gate Endpoint',
        `${qPrefix} correct_answer is integer in range [0, 3] (actual: ${q.correct_answer})`
      )
      assert(typeof q.explanation === 'string' && q.explanation.trim().length > 0, 'Suite 1 - Gate Endpoint', `${qPrefix} has non-empty explanation`)
    })

    // ──────────────────────────────────────────────────────────────────────────
    // SUITE 2: NITRO SERVER ENDPOINT - /api/flashcards/NOTE-POL-MAKING-CONST
    // ──────────────────────────────────────────────────────────────────────────
    console.log('\n=== SUITE 2: Nitro Server Endpoint - /api/flashcards/NOTE-POL-MAKING-CONST ===')
    const fcRes = await fetch(`${baseUrl}/api/flashcards/NOTE-POL-MAKING-CONST`)
    assert(fcRes.status === 200, 'Suite 2 - Flashcards Endpoint', 'HTTP status is 200 OK')

    const fcData = await fcRes.json()
    assert(fcData.note_id === 'NOTE-POL-MAKING-CONST', 'Suite 2 - Flashcards Endpoint', 'Response contains note_id === "NOTE-POL-MAKING-CONST"')
    assert(Array.isArray(fcData.cards), 'Suite 2 - Flashcards Endpoint', 'Response contains cards array')
    assert(fcData.cards.length >= 15, 'Suite 2 - Flashcards Endpoint', `Cards length >= 15 (actual: ${fcData.cards?.length})`)
    assert(fcData.cards.length === 20, 'Suite 2 - Flashcards Endpoint', `Cards length matches all 20 authored cards (actual: ${fcData.cards?.length})`)

    // Check endpoint behavior regarding topic_id and card fields
    const hasTopicIdAtRoot = fcData.topic_id === 'POL-MAKING-CONST'
    assert(
      hasTopicIdAtRoot,
      'Suite 2 - Flashcards Endpoint Contract',
      'Endpoint response top-level contains topic_id === "POL-MAKING-CONST"',
      hasTopicIdAtRoot ? undefined : 'Endpoint returns only { note_id, cards }, omitting topic_id'
    )

    const cardIds = new Set<string>()
    fcData.cards?.forEach((card: any, idx: number) => {
      const cPrefix = `Endpoint Card #${idx + 1} (${card.id || 'missing-id'})`
      assert(typeof card.id === 'string' && card.id.length > 0, 'Suite 2 - Flashcards Endpoint', `${cPrefix} has non-empty ID`)
      assert(!cardIds.has(card.id), 'Suite 2 - Flashcards Endpoint', `${cPrefix} has unique ID`)
      cardIds.add(card.id)

      assert(typeof card.front === 'string' && card.front.trim().length > 0, 'Suite 2 - Flashcards Endpoint', `${cPrefix} has non-empty front`)
      assert(typeof card.back === 'string' && card.back.trim().length > 0, 'Suite 2 - Flashcards Endpoint', `${cPrefix} has non-empty back`)

      const hasKeyFact = typeof card.key_fact === 'string' && card.key_fact.trim().length > 0
      assert(
        hasKeyFact,
        'Suite 2 - Flashcards Endpoint Contract',
        `${cPrefix} preserves non-empty key_fact property`,
        hasKeyFact ? undefined : 'Endpoint normalizeCards() stripped key_fact'
      )

      const hasTags = Array.isArray(card.tags) && card.tags.length > 0
      assert(
        hasTags,
        'Suite 2 - Flashcards Endpoint Contract',
        `${cPrefix} preserves non-empty tags array`,
        hasTags ? undefined : 'Endpoint normalizeCards() stripped tags'
      )
    })

    // ──────────────────────────────────────────────────────────────────────────
    // SUITE 3: UNDERLYING RAW JSON DATA PAYLOAD VERIFICATION
    // ──────────────────────────────────────────────────────────────────────────
    console.log('\n=== SUITE 3: Raw JSON Data Payloads Verification ===')
    const rawGatePath = path.join(ROOT, 'content/data/gates/making-of-the-constitution.json')
    const rawFcPath = path.join(ROOT, 'content/data/flashcards/polity/making-of-the-constitution.json')

    assert(fs.existsSync(rawGatePath), 'Suite 3 - Raw JSON', 'content/data/gates/making-of-the-constitution.json exists on disk')
    assert(fs.existsSync(rawFcPath), 'Suite 3 - Raw JSON', 'content/data/flashcards/polity/making-of-the-constitution.json exists on disk')

    const rawGate = JSON.parse(fs.readFileSync(rawGatePath, 'utf-8'))
    assert(rawGate.note_id === 'NOTE-POL-MAKING-CONST', 'Suite 3 - Raw Gate JSON', 'Raw Gate JSON note_id === "NOTE-POL-MAKING-CONST"')
    assert(rawGate.pass_threshold === 3, 'Suite 3 - Raw Gate JSON', 'Raw Gate JSON pass_threshold === 3')
    assert(Array.isArray(rawGate.questions) && rawGate.questions.length === 5, 'Suite 3 - Raw Gate JSON', 'Raw Gate JSON has exactly 5 questions')

    const rawFc = JSON.parse(fs.readFileSync(rawFcPath, 'utf-8'))
    assert(rawFc.note_id === 'NOTE-POL-MAKING-CONST', 'Suite 3 - Raw Flashcards JSON', 'Raw Flashcards JSON note_id === "NOTE-POL-MAKING-CONST"')
    assert(rawFc.topic_id === 'POL-MAKING-CONST', 'Suite 3 - Raw Flashcards JSON', 'Raw Flashcards JSON topic_id === "POL-MAKING-CONST"')
    assert(Array.isArray(rawFc.cards) && rawFc.cards.length === 20, 'Suite 3 - Raw Flashcards JSON', 'Raw Flashcards JSON has exactly 20 cards')

    const rawCardIds = new Set<string>()
    rawFc.cards?.forEach((c: any, idx: number) => {
      const cPrefix = `Raw Card #${idx + 1} (${c.id || 'missing-id'})`
      assert(typeof c.id === 'string' && c.id.length > 0, 'Suite 3 - Raw Flashcards JSON', `${cPrefix} has non-empty ID`)
      assert(!rawCardIds.has(c.id), 'Suite 3 - Raw Flashcards JSON', `${cPrefix} has unique ID`)
      rawCardIds.add(c.id)

      assert(typeof c.front === 'string' && c.front.trim().length > 0, 'Suite 3 - Raw Flashcards JSON', `${cPrefix} has non-empty front`)
      assert(typeof c.back === 'string' && c.back.trim().length > 0, 'Suite 3 - Raw Flashcards JSON', `${cPrefix} has non-empty back`)
      assert(typeof c.key_fact === 'string' && c.key_fact.trim().length > 0, 'Suite 3 - Raw Flashcards JSON', `${cPrefix} has non-empty key_fact`)
      assert(Array.isArray(c.tags) && c.tags.length > 0, 'Suite 3 - Raw Flashcards JSON', `${cPrefix} has non-empty tags array`)
    })

    // ──────────────────────────────────────────────────────────────────────────
    // SUITE 4: NEGATIVE & ADVERSARIAL ERROR HANDLING (404 RESPONSES)
    // ──────────────────────────────────────────────────────────────────────────
    console.log('\n=== SUITE 4: Negative & Adversarial Error Handling (404 Responses) ===')
    const invalidIds = [
      'NOTE-POL-NONEXISTENT-9999',
      'NOTE-UNKNOWN-RANDOM',
      'NOTE-POL-MAKING-CONST-INJECTION%27--',
      'null',
      'undefined',
    ]

    for (const badId of invalidIds) {
      const badGateRes = await fetch(`${baseUrl}/api/gate/${badId}`)
      assert(
        badGateRes.status === 404,
        'Suite 4 - Negative Error Handling',
        `GET /api/gate/${badId} returns HTTP 404 (actual: ${badGateRes.status})`
      )

      const badFcRes = await fetch(`${baseUrl}/api/flashcards/${badId}`)
      assert(
        badFcRes.status === 404,
        'Suite 4 - Negative Error Handling',
        `GET /api/flashcards/${badId} returns HTTP 404 (actual: ${badFcRes.status})`
      )
    }

    // ──────────────────────────────────────────────────────────────────────────
    // SUITE 5: ZERO EM-DASH & FORMATTING DEFECT AUDIT
    // ──────────────────────────────────────────────────────────────────────────
    console.log('\n=== SUITE 5: Zero Em-Dash & Formatting Defect Audit ===')
    const EM_DASH = String.fromCharCode(8212) // \u2014 '-'
    const gateRawContent = fs.readFileSync(rawGatePath, 'utf-8')
    const fcRawContent = fs.readFileSync(rawFcPath, 'utf-8')

    assert(
      !gateRawContent.includes(EM_DASH),
      'Suite 5 - Formatting Audit',
      'content/data/gates/making-of-the-constitution.json contains 0 em-dashes (\\u2014)'
    )
    assert(
      !fcRawContent.includes(EM_DASH),
      'Suite 5 - Formatting Audit',
      'content/data/flashcards/polity/making-of-the-constitution.json contains 0 em-dashes (\\u2014)'
    )

    // Check for null characters or weird non-printable control codes
    assert(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(gateRawContent), 'Suite 5 - Formatting Audit', 'Gate JSON has zero control characters')
    assert(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(fcRawContent), 'Suite 5 - Formatting Audit', 'Flashcards JSON has zero control characters')

  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SUMMARY REPORT
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════════════════════════')
  console.log(`TOTAL ASSERTIONS : ${totalAssertions}`)
  console.log(`PASSED           : ${passedAssertions}`)
  console.log(`FAILED           : ${failedAssertions}`)
  console.log('══════════════════════════════════════════════════════════════════════════\n')

  if (failedAssertions > 0) {
    console.error('FAILURES SUMMARY:')
    failures.forEach((f, idx) => {
      console.error(`  ${idx + 1}. [${f.suite}] ${f.assertion}${f.detail ? ' -> ' + f.detail : ''}`)
    })
    console.log('')
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal execution error in test harness:', err)
  process.exit(1)
})
