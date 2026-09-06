/**
 * Constitution Size Verification Gatekeeper
 *
 * Asserts that AGENTS.md raw byte size does not exceed 16,000 bytes.
 * This guarantees AGENTS.md is 100% visible with 0 bytes truncated
 * in the harness prompt injection buffer (~24,000 bytes).
 *
 * Detailed authoring specifications live in:
 * - docs/topic-authoring-spec.md
 * - docs/current-affairs-pipeline.md
 * - docs/forensic-paper-setting-evolution-audit-2026-08-15.md
 * - docs/tslprb-pyq-processing-engine-research-report.md
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = fs.existsSync(path.join(process.cwd(), 'AGENTS.md'))
  ? process.cwd()
  : path.resolve(__dirname, '..')
const CONSTITUTION_PATH = path.join(ROOT, 'AGENTS.md')
const MAX_BYTES = 16000

if (!fs.existsSync(CONSTITUTION_PATH)) {
  console.error(`[FAIL] Constitution file not found at: ${CONSTITUTION_PATH}`)
  process.exit(1)
}

const stats = fs.statSync(CONSTITUTION_PATH)
const sizeBytes = stats.size

console.log('\n========================================================')
console.log('       CONSTITUTION SIZE VERIFICATION GATEKEEPER')
console.log('========================================================')
console.log(`  File:      AGENTS.md`)
console.log(`  Raw Size:  ${sizeBytes} bytes`)
console.log(`  Max Limit: ${MAX_BYTES} bytes`)

if (sizeBytes > MAX_BYTES) {
  const excess = sizeBytes - MAX_BYTES
  console.error(`\n[FATAL] AGENTS.md exceeds maximum size limit by ${excess} bytes (${sizeBytes} > ${MAX_BYTES})!`)
  console.error('Detailed technical specs must be placed in docs/ companion files:')
  console.error('  - docs/topic-authoring-spec.md')
  console.error('  - docs/current-affairs-pipeline.md')
  console.error('Keep AGENTS.md focused on core constitutional rules and invariants.\n')
  process.exit(1)
}

const usagePct = ((sizeBytes / MAX_BYTES) * 100).toFixed(1)
console.log(`  Headroom:  ${MAX_BYTES - sizeBytes} bytes remaining (${usagePct}% of limit)`)
console.log('[PASS] AGENTS.md size is within safe bounds (0 bytes truncated in harness).\n')
process.exit(0)
