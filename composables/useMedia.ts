/**
 * composables/useMedia.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Resolves r2:// asset paths to their public HTTPS URL at runtime.
 *
 * Usage in any component:
 *   const { r2url } = useMedia()
 *   const src = r2url('r2://tslprb-media/images/geography/foo.png')
 *   // returns: https://pub-xxxx.r2.dev/images/geography/foo.png
 *
 * The public base URL comes from runtimeConfig.public.r2PublicUrl,
 * which is injected from the R2_PUBLIC_URL environment variable.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useMedia() {
  const config = useRuntimeConfig()
  const base = (config.public.r2PublicUrl as string | undefined)?.replace(/\/$/, '') ?? ''

  /**
   * Convert an r2:// path to its public HTTPS URL.
   * Gracefully falls back to the raw path if R2_PUBLIC_URL is not set.
   */
  function r2url(assetUrl: string): string {
    if (!assetUrl) return ''

    // Already a full URL - return as-is
    if (assetUrl.startsWith('http://') || assetUrl.startsWith('https://')) {
      return assetUrl
    }

    // r2://bucket-name/path/to/file.png -> strip the r2://bucket-name prefix
    const r2Match = assetUrl.match(/^r2:\/\/[^/]+\/(.+)$/)
    if (r2Match) {
      const key = r2Match[1]
      if (base) return `${base}/${key}`
      // Fallback: public images dir (for local dev before R2 is set up)
      return `/images/${key}`
    }

    return assetUrl
  }

  return { r2url }
}
