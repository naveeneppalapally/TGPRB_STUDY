const NUM_RE = /(?<![&#\w<>"'=/-])((?:Art(?:icle)?\.?\s*)?\d+(?:,\d+)*(?:\(\d+\))?(?:[/-]\d+)?(?:st|nd|rd|th)?)(?![\w"'=-])/g
const chip = (text: string) => `<button type="button" class="cloze-chip" data-cloze="1"><span class="cloze-hidden">${text}</span></button>`
function enumerator(value: string, before: string, after: string): boolean {
  if (/^\s*(?:\d+[.):]|[([]\s*\d+\s*[)\]])\s*$/.test(value)) return true
  if (!/^\d+$/.test(value)) return false
  return /^[.):](?:\s|$)/.test(after) || /[(\[]\s*$/.test(before) && /^\s*[)\]]/.test(after)
}
export function renderCloze(source: string): string {
  const chunks = source.split(/(<strong\b[^>]*>[\s\S]*?<\/strong>|<span class="hot">[\s\S]*?<\/span>|<[^>]+>)/g)
  return chunks.map((chunk, index) => {
    if (!chunk) return ''
    if (/^<strong\b/.test(chunk) || chunk.startsWith('<span class="hot">')) {
      const inner = chunk.replace(/^<[^>]+>|<\/[^>]+>$/g,'')
      return enumerator(inner, chunks[index-1] || '', chunks[index+1] || '') ? chunk : chip(inner)
    }
    if (chunk.startsWith('<')) return chunk
    return chunk.replace(NUM_RE,(match,_value,offset,full) => enumerator(match,full.slice(0,offset),full.slice(offset+match.length)) ? match : chip(match))
  }).join('')
}
