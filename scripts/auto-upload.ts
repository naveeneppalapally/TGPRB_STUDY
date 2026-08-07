#!/usr/bin/env tsx
/**
 * scripts/auto-upload.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Scans for images in public/images/ and assets-to-upload/, uploads each one
 * to Cloudinary, rewrites every reference in .vue/.ts/.md files, deletes the
 * local file, and writes a MediaAsset record.
 *
 * Run automatically by GitHub Actions on every push.
 * Can also be run locally if CLOUDINARY_* env vars are set.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'
import { globSync } from 'glob'
import { v2 as cloudinary } from 'cloudinary'

// ── Cloudinary config ────────────────────────────────────────────────────────
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY    = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('Missing CLOUDINARY_* env vars. Set them in GitHub Secrets.')
  process.exit(1)
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET })

// ── Folders to scan ───────────────────────────────────────────────────────────
const SCAN_DIRS = [
  'public/images',
  'assets-to-upload',
]
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']

// ── Collect all local image files ─────────────────────────────────────────────
function collectImages(): string[] {
  const images: string[] = []
  for (const dir of SCAN_DIRS) {
    if (!fs.existsSync(dir)) continue
    const found = globSync(`${dir}/**/*`, { nodir: true })
    for (const f of found) {
      if (IMAGE_EXTS.includes(path.extname(f).toLowerCase())) {
        images.push(f)
      }
    }
  }
  return images
}

// ── WebP conversion ───────────────────────────────────────────────────────────
function toWebP(inputFile: string): { file: string; isTemp: boolean } {
  const ext = path.extname(inputFile).toLowerCase()
  if (['.webp', '.svg'].includes(ext)) return { file: inputFile, isTemp: false }

  try {
    execSync('ffmpeg -version', { stdio: 'ignore' })
  }
  catch {
    return { file: inputFile, isTemp: false }
  }

  const tmp = path.join(os.tmpdir(), `${path.basename(inputFile, ext)}.webp`)
  const origSize = fs.statSync(inputFile).size
  execSync(`ffmpeg -i "${inputFile}" -quality 85 "${tmp}" -y`, { stdio: 'pipe' })
  const newSize = fs.statSync(tmp).size
  const saving  = Math.round((1 - newSize / origSize) * 100)
  console.log(`  WebP: ${(origSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${saving}%)`)
  return { file: tmp, isTemp: true }
}

// ── Determine Cloudinary folder from file path ────────────────────────────────
// public/images/geography/foo.png -> geography
// assets-to-upload/polity/bar.png -> polity
function cloudinaryFolder(filePath: string): string {
  const parts = filePath.replace(/\\/g, '/').split('/')
  // Remove the base dir (public/images or assets-to-upload) and filename
  // Everything in between is the folder path
  const baseDirs = ['public/images', 'assets-to-upload']
  for (const base of baseDirs) {
    if (filePath.startsWith(base)) {
      const rel = filePath.slice(base.length + 1)
      const folder = path.dirname(rel)
      return folder === '.' ? 'general' : folder
    }
  }
  return 'general'
}

// ── Rewrite all references in source files ────────────────────────────────────
function rewriteRefs(localPath: string, cloudinaryUrl: string) {
  // Build the patterns we need to replace
  // e.g. /images/geography/foo.webp  OR  assets-to-upload/geography/foo.png
  const basename = path.basename(localPath)
  const basenameNoExt = path.basename(localPath, path.extname(localPath))

  // Match any path ending in this filename (with any extension)
  const pattern = new RegExp(
    `(["'/])((?:(?:public)?[/\\\\])?(?:images|assets-to-upload)[/\\\\][^"'\\s]*)?` +
    `${basenameNoExt}\\.[a-z]+`,
    'g'
  )

  const sourceFiles = globSync('**/*.{vue,ts,js,md}', {
    ignore: ['node_modules/**', '.nuxt/**', '.output/**', 'scripts/**'],
  })

  let totalReplaced = 0
  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf8')
    if (!content.includes(basenameNoExt)) continue

    const updated = content.replace(pattern, (_match, quote) => {
      totalReplaced++
      return `${quote}${cloudinaryUrl}`
    })

    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf8')
      console.log(`  Updated ref in: ${file}`)
    }
  }

  if (totalReplaced === 0) {
    console.log(`  No refs found for ${basename} - may already be updated`)
  }
}

// ── Write MediaAsset content record ──────────────────────────────────────────
function writeMediaAsset(localPath: string, cloudinaryUrl: string, folder: string) {
  const basename = path.basename(localPath, path.extname(localPath))
  const slug = `${folder}-${basename}`.replace(/\//g, '-').replace(/[^a-zA-Z0-9-]/g, '-')
  const outFile = `content/media/${slug}.md`

  // Don't overwrite if already exists (it may have manual rights info)
  if (fs.existsSync(outFile)) {
    // Just update the asset_url
    let existing = fs.readFileSync(outFile, 'utf8')
    existing = existing.replace(/asset_url:.*/, `asset_url: "${cloudinaryUrl}"`)
    fs.writeFileSync(outFile, existing)
    console.log(`  Updated MediaAsset: ${outFile}`)
    return
  }

  fs.mkdirSync('content/media', { recursive: true })
  fs.writeFileSync(outFile, `---
# ACTION REQUIRED: Verify image license before public release
id: "MEDIA-${slug.toUpperCase().replace(/[^A-Z0-9]/g, '-')}"
asset_url: "${cloudinaryUrl}"
source_domain: "unknown"
rights_status: "needs_replacement_before_release"
alt_text: ""
---

# Review Required
- Confirm image source and license
- Update rights_status to: original | public_domain | needs_replacement_before_release
- Add descriptive alt_text
`)
  console.log(`  Created MediaAsset: ${outFile}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const images = collectImages()

  if (images.length === 0) {
    console.log('No images found in public/images/ or assets-to-upload/. Nothing to do.')
    process.exit(0)
  }

  console.log(`Found ${images.length} image(s) to process:\n`)

  for (const imgPath of images) {
    console.log(`Processing: ${imgPath}`)

    const folder = cloudinaryFolder(imgPath)
    const { file: uploadFile, isTemp } = toWebP(imgPath)
    const publicId = path.basename(uploadFile, path.extname(uploadFile))

    try {
      const result = await cloudinary.uploader.upload(uploadFile, {
        folder,
        public_id:     publicId,
        resource_type: 'image',
        overwrite:     true,
        format:        'webp',
      })

      const url = result.secure_url
      console.log(`  Uploaded: ${url}`)

      // Rewrite all references in the codebase
      rewriteRefs(imgPath, url)

      // Write/update MediaAsset record
      writeMediaAsset(imgPath, url, folder)

      // Delete the local image file
      fs.unlinkSync(imgPath)
      console.log(`  Deleted local file: ${imgPath}`)

      // Clean up temp WebP if we created one
      if (isTemp) fs.unlinkSync(uploadFile)

      console.log(`  Done.\n`)
    }
    catch (err: any) {
      console.error(`  FAILED to upload ${imgPath}:`, err.message)
      if (isTemp && fs.existsSync(uploadFile)) fs.unlinkSync(uploadFile)
      // Don't exit - try to process remaining images
    }
  }

  // Clean up empty directories
  for (const dir of SCAN_DIRS) {
    try {
      const remaining = globSync(`${dir}/**/*`, { nodir: true })
      if (remaining.length === 0 && fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true })
        console.log(`Cleaned empty directory: ${dir}`)
      }
    }
    catch { /* ignore */ }
  }

  console.log('All done.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
