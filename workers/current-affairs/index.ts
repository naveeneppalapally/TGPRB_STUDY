/**
 * TSLPRB Current Affairs Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Runs daily at 7:00 AM IST (01:30 UTC).
 * 1. Fetches PIB RSS feeds (multiple categories)
 * 2. Filters items by TGPRB exam keywords
 * 3. Maps each hit to a note ID (e.g. NOTE-GEO-DRAINAGE)
 * 4. Skips already-processed items (using KV dedup)
 * 5. Creates content/current-affairs/*.md files via GitHub API
 * 6. Sends a Telegram summary message
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Secrets (set via wrangler secret put or Cloudflare dashboard):
 *   GITHUB_TOKEN        - PAT with repo write scope
 *   TELEGRAM_BOT_TOKEN  - from @BotFather
 *   TELEGRAM_CHAT_ID    - your chat/user ID
 *
 * KV Namespace:
 *   CA_SEEN  - stores processed item GUIDs to prevent duplicates
 */

// ── Topic keyword map ─────────────────────────────────────────────────────────
// Each entry: keywords to match (case-insensitive) -> topic metadata
const TOPIC_MAP = [
  {
    keywords: ['river', 'dam', 'flood', 'irrigation', 'drainage', 'basin', 'godavari', 'krishna', 'narmada', 'kaveri', 'ganga', 'brahmaputra', 'indus', 'mahanadi', 'ken-betwa', 'interlinking'],
    exam_section: 'Geography',
    topic: 'Drainage System of India',
    related_topic_ids: ['NOTE-GEO-DRAINAGE'],
  },
  {
    keywords: ['constitution', 'parliament', 'article', 'amendment', 'supreme court', 'high court', 'fundamental right', 'directive principle', 'preamble', 'governor', 'legislature', 'rajya sabha', 'lok sabha'],
    exam_section: 'Polity',
    topic: 'Indian Constitution',
    related_topic_ids: ['NOTE-POL-CONSTITUTION'],
  },
  {
    keywords: ['gdp', 'inflation', 'rbi', 'repo rate', 'budget', 'fiscal', 'monetary', 'gst', 'tax', 'economy', 'unemployment', 'poverty', 'fdi', 'trade deficit'],
    exam_section: 'Economy',
    topic: 'Indian Economy',
    related_topic_ids: ['NOTE-ECO-GENERAL'],
  },
  {
    keywords: ['climate', 'monsoon', 'cyclone', 'earthquake', 'disaster', 'forest', 'wildlife', 'tiger', 'national park', 'sanctuary', 'pollution', 'carbon', 'ozone'],
    exam_section: 'Geography',
    topic: 'Environment and Ecology',
    related_topic_ids: ['NOTE-GEO-ENVIRONMENT'],
  },
  {
    keywords: ['telangana', 'andhra', 'hyderabad', 'tgprb', 'tspsc', 'bifurcation', 'reorganisation act'],
    exam_section: 'Telangana',
    topic: 'Telangana State',
    related_topic_ids: ['NOTE-TEL-GENERAL'],
  },
  {
    keywords: ['science', 'technology', 'isro', 'space', 'satellite', 'chandrayaan', 'mission', 'missile', 'defence', 'nuclear', 'ai', 'artificial intelligence'],
    exam_section: 'Science & Technology',
    topic: 'Science and Technology',
    related_topic_ids: ['NOTE-SCI-GENERAL'],
  },
]

// PIB RSS feeds to monitor
const PIB_FEEDS = [
  'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3',    // Science & Technology
  'https://pib.gov.in/RssMain.aspx?ModId=7&Lang=1&Regid=3',    // Environment & Forests
  'https://pib.gov.in/RssMain.aspx?ModId=49&Lang=1&Regid=3',   // Jal Shakti (Water/Rivers)
  'https://pib.gov.in/RssMain.aspx?ModId=2&Lang=1&Regid=3',    // Ministry of Finance
  'https://pib.gov.in/RssMain.aspx?ModId=4&Lang=1&Regid=3',    // Home Affairs / Law
]

// ── Interfaces ────────────────────────────────────────────────────────────────
interface Env {
  CA_SEEN: KVNamespace
  GITHUB_TOKEN: string
  GITHUB_REPO: string   // e.g. "naveeneppalapally/TGPRB_STUDY"
  GITHUB_BRANCH: string // e.g. "main"
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
}

interface FeedItem {
  title: string
  link: string
  pubDate: string
  guid: string
  description: string
}

interface MatchedItem extends FeedItem {
  exam_section: string
  topic: string
  related_topic_ids: string[]
}

// ── RSS Parser ────────────────────────────────────────────────────────────────
function parseRSS(xml: string): FeedItem[] {
  const items: FeedItem[] = []
  const itemPattern = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemPattern.exec(xml)) !== null) {
    const block = match[1]
    const get = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
      return m ? (m[1] ?? m[2] ?? '').trim() : ''
    }

    items.push({
      title:       get('title'),
      link:        get('link'),
      pubDate:     get('pubDate'),
      guid:        get('guid') || get('link'),
      description: get('description'),
    })
  }

  return items
}

// ── Keyword matching ──────────────────────────────────────────────────────────
function matchTopics(item: FeedItem): MatchedItem | null {
  const searchText = `${item.title} ${item.description}`.toLowerCase()

  for (const entry of TOPIC_MAP) {
    if (entry.keywords.some(kw => searchText.includes(kw))) {
      return { ...item, ...entry }
    }
  }

  return null
}

// ── Date formatter ────────────────────────────────────────────────────────────
function formatDate(pubDate: string): string {
  try {
    const d = new Date(pubDate)
    return d.toISOString().split('T')[0]
  }
  catch {
    return new Date().toISOString().split('T')[0]
  }
}

// ── ID generator ──────────────────────────────────────────────────────────────
function makeId(item: MatchedItem, date: string): string {
  const section = item.exam_section.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
  const slug = item.title.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 20).replace(/-+/g, '-')
  const dateStr = date.replace(/-/g, '')
  return `CA-${section}-${slug}-${dateStr}`
}

// ── GitHub file creator ───────────────────────────────────────────────────────
async function createGithubFile(item: MatchedItem, env: Env): Promise<boolean> {
  const date = formatDate(item.pubDate)
  const id   = makeId(item, date)
  const slug = id.toLowerCase()
  const path = `content/current-affairs/${slug}.md`

  const content = `---
id: "${id}"
type: "current_affair"
exam_section: "${item.exam_section}"
topic: "${item.topic}"
related_topic_ids:
${item.related_topic_ids.map(t => `  - "${t}"`).join('\n')}
headline: "${item.title.replace(/"/g, "'")}"
date: "${date}"
source_url: "${item.link}"
---
`

  const encoded = btoa(unescape(encodeURIComponent(content)))

  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type':  'application/json',
        'User-Agent':    'TSLPRB-CA-Worker/1.0',
      },
      body: JSON.stringify({
        message: `ca: auto-add ${id} [skip ci]`,
        content: encoded,
        branch:  env.GITHUB_BRANCH || 'main',
      }),
    }
  )

  return res.ok || res.status === 422 // 422 = file already exists, that's fine
}

// ── Telegram notifier ─────────────────────────────────────────────────────────
async function sendTelegram(message: string, env: Env): Promise<void> {
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:    env.TELEGRAM_CHAT_ID,
      text:       message,
      parse_mode: 'HTML',
    }),
  })
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default {
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    const newItems: MatchedItem[] = []
    const errors: string[]        = []

    // Fetch and parse all RSS feeds
    for (const feedUrl of PIB_FEEDS) {
      try {
        const res = await fetch(feedUrl, {
          headers: { 'User-Agent': 'TSLPRB-CA-Worker/1.0' },
        })
        if (!res.ok) continue

        const xml   = await res.text()
        const items = parseRSS(xml)

        for (const item of items) {
          // Skip if already processed
          const seen = await env.CA_SEEN.get(item.guid)
          if (seen) continue

          // Check if it matches any TGPRB topic
          const matched = matchTopics(item)
          if (!matched) {
            await env.CA_SEEN.put(item.guid, '1', { expirationTtl: 60 * 60 * 24 * 90 }) // 90 days
            continue
          }

          // Create GitHub file
          const ok = await createGithubFile(matched, env)
          if (ok) {
            await env.CA_SEEN.put(item.guid, '1', { expirationTtl: 60 * 60 * 24 * 90 })
            newItems.push(matched)
          }
          else {
            errors.push(`Failed: ${item.title.slice(0, 50)}`)
          }
        }
      }
      catch (e: any) {
        errors.push(`Feed error: ${feedUrl.slice(-20)} - ${e.message}`)
      }
    }

    // Send Telegram summary
    if (newItems.length === 0 && errors.length === 0) {
      // Silent - nothing new today, no message needed
      return
    }

    let msg = '<b>TGPRB StudyOS - Current Affairs Update</b>\n\n'

    if (newItems.length > 0) {
      msg += `<b>${newItems.length} new item(s) added:</b>\n`
      for (const item of newItems) {
        msg += `\n- [${item.exam_section}] ${item.title.slice(0, 80)}\n`
        msg += `  Topic: ${item.topic}\n`
        msg += `  <a href="${item.link}">Read on PIB</a>\n`
      }
    }

    if (errors.length > 0) {
      msg += `\n<b>Errors (${errors.length}):</b>\n`
      for (const err of errors) msg += `- ${err}\n`
    }

    msg += '\nCloudflare Pages is redeploying. Check live site in ~2 min.'

    await sendTelegram(msg, env)
  },

  // Also allow manual trigger via HTTP GET for testing
  async fetch(_req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    ctx.waitUntil(this.scheduled({} as ScheduledEvent, env, ctx))
    return new Response('Current affairs check triggered. Watch your Telegram.', { status: 200 })
  },
}
