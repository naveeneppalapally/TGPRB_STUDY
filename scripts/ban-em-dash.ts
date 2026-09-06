import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'

const EM_DASH = String.fromCharCode(8212)
const files = globSync('**/*.{vue,md,ts,js,json}', {
  ignore: ['node_modules/**', '.nuxt/**', '.output/**', 'dist/**', 'scripts/ban-em-dash.ts', 'package-lock.json'],
})

let replacedCount = 0

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  if (content.includes(EM_DASH)) {
    // Replace all em-dashes with standard dash
    const regex = new RegExp(EM_DASH, 'g')
    const newContent = content.replace(regex, '-')
    fs.writeFileSync(file, newContent, 'utf8')
    console.log(`Replaced em-dash in: ${file}`)
    replacedCount++
  }
}

if (replacedCount > 0) {
  console.log(`BANNED EM-DASH: Found and replaced em-dashes in ${replacedCount} files.`)
} else {
  console.log('Em-dash check passed. No em-dashes found.')
}

// Enforce AGENTS.md constitution size limit (<= 16,000 bytes)
const constitutionPath = fs.existsSync('AGENTS.md')
  ? 'AGENTS.md'
  : path.resolve(__dirname, '..', 'AGENTS.md')

if (fs.existsSync(constitutionPath)) {
  const constitutionSize = fs.statSync(constitutionPath).size
  if (constitutionSize > 16000) {
    console.error(`BANNED SIZE: AGENTS.md exceeds 16,000 bytes (${constitutionSize} bytes)!`)
    process.exit(1)
  }
}
