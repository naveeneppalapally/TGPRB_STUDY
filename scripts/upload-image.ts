#!/usr/bin/env tsx
/**
 * scripts/upload-image.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Upload a local image to Cloudinary, auto-converting PNG/JPG to WebP first.
 * Prints the public URL and a ready-to-paste MediaAsset record.
 *
 * Usage:
 *   npx tsx scripts/upload-image.ts \
 *     --file ./public/images/geography/india_rivers_labeled2.webp \
 *     --folder geography \
 *     --alt "Physical map of India showing river systems" \
 *     --source "wikimedia.org" \
 *     --rights needs_replacement_before_release
 *
 * Env vars needed (set inline or in .env):
 *   CLOUDINARY_CLOUD_NAME   (from dashboard top-left, e.g. gbxjgmck)
 *   CLOUDINARY_API_KEY      (Settings > API Keys)
 *   CLOUDINARY_API_SECRET   (Settings > API Keys)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'
import { v2 as cloudinary } from 'cloudinary'

// ── Parse CLI args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2)
function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : undefined
}

const filePath = getArg('--file')
const folder   = getArg('--folder') ?? 'general'
const altText  = getArg('--alt')    ?? ''
const source   = getArg('--source') ?? 'unknown'
const rights   = (getArg('--rights') ?? 'needs_replacement_before_release') as
  'original' | 'public_domain' | 'needs_replacement_before_release'

if (!filePath) {
  console.error('Usage: npx tsx scripts/upload-image.ts --file <path> --folder <cloudinary-folder> [--alt <text>] [--source <domain>] [--rights original|public_domain|needs_replacement_before_release]')
  process.exit(1)
}

// ── Env validation ───────────────────────────────────────────────────────────
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey    = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.error([
    '',
    'Missing Cloudinary credentials. Run with inline env vars:',
    '',
    '  CLOUDINARY_CLOUD_NAME=gbxjgmck \\',
    '  CLOUDINARY_API_KEY=your_key \\',
    '  CLOUDINARY_API_SECRET=your_secret \\',
    '  npx tsx scripts/upload-image.ts --file <path> --folder geography',
    '',
    'Get API key+secret from: Cloudinary Dashboard > Settings > API Keys',
    '',
  ].join('\n'))
  process.exit(1)
}

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

// ── WebP auto-conversion ─────────────────────────────────────────────────────
function convertToWebP(inputFile: string): string {
  const ext = path.extname(inputFile).toLowerCase()
  if (['.webp', '.svg', '.gif'].includes(ext)) return inputFile

  try {
    execSync('ffmpeg -version', { stdio: 'ignore' })
  }
  catch {
    console.log('ffmpeg not found - uploading original without conversion')
    return inputFile
  }

  const tmpOut = path.join(os.tmpdir(), `${path.basename(inputFile, ext)}.webp`)
  const origSize = fs.statSync(inputFile).size
  console.log(`Converting ${ext} -> WebP (quality 85)...`)
  execSync(`ffmpeg -i "${inputFile}" -quality 85 "${tmpOut}" -y`, { stdio: 'pipe' })
  const newSize = fs.statSync(tmpOut).size
  const saving  = Math.round((1 - newSize / origSize) * 100)
  console.log(`WebP: ${(origSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${saving}%)`)
  return tmpOut
}

// ── Upload ───────────────────────────────────────────────────────────────────
async function upload() {
  const resolvedFile = path.resolve(filePath!)
  if (!fs.existsSync(resolvedFile)) {
    console.error(`File not found: ${resolvedFile}`)
    process.exit(1)
  }

  const uploadFile  = convertToWebP(resolvedFile)
  const publicId    = path.basename(uploadFile, path.extname(uploadFile))
  const fileSizeKB  = (fs.statSync(uploadFile).size / 1024).toFixed(0)

  console.log(`\nUploading ${path.basename(uploadFile)} (${fileSizeKB}KB) -> ${cloudName}/${folder}/${publicId} ...`)

  const result = await cloudinary.uploader.upload(uploadFile, {
    folder,
    public_id:     publicId,
    resource_type: 'image',
    overwrite:     true,
    // Cloudinary auto-serves WebP to modern browsers via f_auto
    // even if you upload a .webp directly
    format:        'webp',
  })

  // Clean up temp file if we created one
  if (uploadFile !== resolvedFile && uploadFile.startsWith(os.tmpdir())) {
    fs.unlinkSync(uploadFile)
  }

  const publicUrl = result.secure_url

  console.log('\n-- Upload complete --')
  console.log(`URL:       ${publicUrl}`)
  console.log(`Public ID: ${result.public_id}`)
  console.log(`Size:      ${result.bytes} bytes`)
  console.log(`Format:    ${result.format}`)

  // ── Print ready-to-paste MediaAsset record ────────────────────────────────
  const slug = `${folder}-${publicId}`.replace(/\//g, '-')
  const rightsNote = rights === 'needs_replacement_before_release'
    ? '\n# ACTION REQUIRED: Verify license before public release'
    : ''

  console.log(`\n-- Paste into content/media/${slug}.md --`)
  console.log(`---${rightsNote}
id: "MEDIA-${slug.toUpperCase().replace(/[^A-Z0-9]/g, '-')}"
asset_url: "${publicUrl}"
source_domain: "${source}"
rights_status: "${rights}"
alt_text: "${altText}"
---`)
}

upload().catch((err) => {
  console.error('\nUpload failed:', err.message)
  process.exit(1)
})
