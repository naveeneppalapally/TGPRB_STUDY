/** Replace only the staged asset's full local path. Remote CDN URLs are immutable here. */
export function rewriteLocalMediaRefs(content: string, localPath: string, remoteUrl: string): string {
  const normalized = localPath.replaceAll('\\', '/')
  const relative = normalized.replace(/^(?:public\/images|assets-to-upload)\//, '')
  const stem = relative.replace(/\.[^.\/]+$/, '')
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const paths = [`/images/${stem}`, `public/images/${stem}`, `assets-to-upload/${stem}`].map(escape).join('|')
  return content.replace(new RegExp(`(["'(])(?:${paths})\\.(?:webp|png|jpe?g|avif|gif)(?=["')])`, 'gi'), `$1${remoteUrl}`)
}
