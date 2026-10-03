import { readFileSync } from 'node:fs'
import { globSync } from 'glob'

// Read-only gate. Never silently alter authored content during development/build.
const banned = String.fromCodePoint(0x2014)
const files = globSync('**/*.{vue,md,ts,js,mjs,cjs,json,css,py,sql,yml,yaml,sh,html,txt,toml}', {
  dot: true,
  ignore: ['node_modules/**', '**/node_modules/**', '.git/**', '.wrangler/**', '.agents/**', '.codex/**', '.nuxt/**', '.output/**', 'dist/**', '**/.venv/**', '**/__pycache__/**'],
})
let failures = 0
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, index) => {
    if (!line.includes(banned)) return
    console.error(`${file}:${index + 1}: forbidden U+2014`)
    failures++
  })
}
if (failures) process.exit(1)
console.log(`PASS: read-only U+2014 check (${files.length} text files, including Python, SQL and workflows).`)
