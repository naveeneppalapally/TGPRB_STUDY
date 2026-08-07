import fs from 'fs'
import { globSync } from 'glob'

const EM_DASH = String.fromCharCode(8212)
const files = globSync('**/*.{vue,md,ts,js}', {
  ignore: ['node_modules/**', '.nuxt/**', '.output/**', 'dist/**', 'scripts/ban-em-dash.ts'],
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
