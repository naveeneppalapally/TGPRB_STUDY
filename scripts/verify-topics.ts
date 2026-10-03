import { runIntegrity } from './verify-topic-integrity'

// OCR seed labels are unverified evidence. This command never promotes them.
const defects = runIntegrity()
if (defects.length) { console.error(defects.join('\n')); process.exit(1) }
console.log('PASS: canonical topic delivery integrity. OCR seed promotion is intentionally unsupported.')
