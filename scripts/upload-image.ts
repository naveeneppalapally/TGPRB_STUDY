#!/usr/bin/env tsx
/**
 * scripts/upload-image.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Upload a local image to Cloudflare R2 and print the r2:// asset path.
 *
 * Usage:
 *   npx tsx scripts/upload-image.ts \
 *     --file ./local/path/image.png \
 *     --key images/geography/image.png \
 *     --alt "Description of the image" \
 *     --source "wikimedia.org" \
 *     --rights needs_replacement_before_release
 *
 * The script will:
 *   1. Upload the file to R2 under the given key
 *   2. Print the r2:// path and the public HTTPS URL
 *   3. Print a ready-to-paste MediaAsset record for content/media/
 *
 * Env vars required (set in .env or shell):
 *   CLOUDFLARE_ACCOUNT_ID
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 *   R2_PUBLIC_URL   (the https://pub-xxxx.r2.dev URL from CF dashboard)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

// ── Parse CLI args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2)
function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : undefined
}

const filePath  = getArg('--file')
const key       = getArg('--key')
const altText   = getArg('--alt')       ?? ''
const source    = getArg('--source')    ?? 'unknown'
const rights    = (getArg('--rights')   ?? 'needs_replacement_before_release') as
  'original' | 'public_domain' | 'needs_replacement_before_release'

if (!filePath || !key) {
  console.error('Usage: npx tsx scripts/upload-image.ts --file <path> --key <r2-key> [--alt <text>] [--source <domain>] [--rights original|public_domain|needs_replacement_before_release]')
  process.exit(1)
}

// ── Env validation ───────────────────────────────────────────────────────────
const accountId    = process.env.CLOUDFLARE_ACCOUNT_ID
const accessKeyId  = process.env.R2_ACCESS_KEY_ID
const secretKey    = process.env.R2_SECRET_ACCESS_KEY
const bucketName   = process.env.R2_BUCKET_NAME    ?? 'tslprb-media'
const publicUrl    = process.env.R2_PUBLIC_URL      ?? ''

if (!accountId || !accessKeyId || !secretKey) {
  console.error([
    'Missing R2 credentials. Set these in .env:',
    '  CLOUDFLARE_ACCOUNT_ID',
    '  R2_ACCESS_KEY_ID',
    '  R2_SECRET_ACCESS_KEY',
    '  R2_BUCKET_NAME',
    '  R2_PUBLIC_URL',
  ].join('\n'))
  process.exit(1)
}

// ── S3-compatible R2 client ──────────────────────────────────────────────────
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     accessKeyId,
    secretAccessKey: secretKey,
  },
})

// ── Content-type detection ───────────────────────────────────────────────────
function mimeType(file: string): string {
  const ext = path.extname(file).toLowerCase()
  const map: Record<string, string> = {
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg':  'image/svg+xml',
    '.gif':  'image/gif',
  }
  return map[ext] ?? 'application/octet-stream'
}

// ── Upload ───────────────────────────────────────────────────────────────────
async function upload() {
  const resolvedFile = path.resolve(filePath!)
  if (!fs.existsSync(resolvedFile)) {
    console.error(`File not found: ${resolvedFile}`)
    process.exit(1)
  }

  const body = fs.readFileSync(resolvedFile)
  const contentType = mimeType(resolvedFile)
  const fileSizeMB = (body.length / 1024 / 1024).toFixed(2)

  console.log(`Uploading ${path.basename(resolvedFile)} (${fileSizeMB} MB) -> ${bucketName}/${key} ...`)

  await r2.send(new PutObjectCommand({
    Bucket:      bucketName,
    Key:         key!,
    Body:        body,
    ContentType: contentType,
    // Set cache control for static assets
    CacheControl: 'public, max-age=31536000, immutable',
  }))

  // Verify upload succeeded
  const head = await r2.send(new HeadObjectCommand({ Bucket: bucketName, Key: key! }))

  const r2Path   = `r2://${bucketName}/${key}`
  const httpsUrl = publicUrl ? `${publicUrl.replace(/\/$/, '')}/${key}` : `(set R2_PUBLIC_URL to get HTTPS URL)`

  console.log('\n-- Upload complete --')
  console.log(`r2://  ${r2Path}`)
  console.log(`https: ${httpsUrl}`)
  console.log(`size:  ${head.ContentLength} bytes`)
  console.log(`type:  ${head.ContentType}`)

  // ── Print ready-to-paste MediaAsset YAML frontmatter ──────────────────────
  const slug = path.basename(key!, path.extname(key!))
  const rightsNote = rights === 'needs_replacement_before_release'
    ? '\n# ACTION REQUIRED: Verify license before public release'
    : ''

  console.log(`\n-- Paste into content/media/${slug}.md --`)
  console.log(`---${rightsNote}
id: "MEDIA-${slug.toUpperCase().replace(/[^A-Z0-9]/g, '-')}"
asset_url: "${r2Path}"
public_url: "${httpsUrl}"
source_domain: "${source}"
rights_status: "${rights}"
alt_text: "${altText}"
---`)
}

upload().catch((err) => {
  console.error('Upload failed:', err.message)
  process.exit(1)
})
