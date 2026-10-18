import { readFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import media from '../data/pyq_media.json'
import { publishedImage, type PyqMediaMap } from '../utils/pyq-archive'

// Stage only a visually reviewed original crop. Upload and URL replacement use
// the existing Cloudinary workflow, never a guessed public asset URL.
const id = process.argv[2]
const asset = (media as PyqMediaMap)[id]
if (!asset) throw new Error('Pass a registered image-bearing PYQ ID, for example PYQ-0080.')
if (publishedImage(asset)) throw new Error('This question already has a published diagram.')
if (!existsSync(asset.source_image) || !readFileSync(asset.source_image).length) throw new Error('The original crop is missing or empty.')
if (process.argv.includes('--dry-run')) {
  console.log(`${asset.source_image} -> assets-to-upload/pyqs/${id}.webp`)
} else {
  mkdirSync('assets-to-upload/pyqs', { recursive: true })
  execFileSync('ffmpeg', ['-i', asset.source_image, '-quality', '95', `assets-to-upload/pyqs/${id}.webp`, '-n'], { stdio: 'inherit' })
}
