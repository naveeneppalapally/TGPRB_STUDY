import assert from 'node:assert/strict'
import { IncomingMessage, ServerResponse } from 'node:http'
import { Socket } from 'node:net'
import { createEvent } from 'h3'
import {
  CA_CARDS,
  entryDate,
  highYieldScore,
  parseCAMode,
  selectHighYieldCards,
  type CACard,
} from '../server/utils/ca-cards'
import feedHandler from '../server/api/ca/feed.get'
import datesHandler from '../server/api/ca/dates.get'

function makeCard(
  id: string,
  date: string,
  overrides: Record<string, any> = {},
): CACard {
  return {
    id,
    meta: {
      id,
      event_date: date,
      category: 'schemes',
      difficulty: 'O',
      is_telangana_focus: false,
      related_topic_ids: [],
      mcqs: [],
      ...overrides,
    },
  }
}

// 1. parseCAMode
assert.equal(parseCAMode(undefined), 'all')
assert.equal(parseCAMode('all'), 'all')
assert.equal(parseCAMode('invalid'), 'all')
assert.equal(parseCAMode('high-yield'), 'high-yield')
assert.equal(parseCAMode(' HIGH-YIELD '), 'high-yield')

// 2. highYieldScore weights
assert.equal(highYieldScore(makeCard('c0', '2026-08-01', { category: 'unknown', difficulty: 'O' })), 0)
assert.equal(
  highYieldScore(makeCard('c1', '2026-08-01', {
    category: 'telangana',
    difficulty: 'F',
    is_telangana_focus: true,
    related_topic_ids: ['NOTE-TEL-MOVEMENT'],
    mcqs: [{}, {}],
  })),
  4 + 5 + 5 + 1 + 1,
)
assert.equal(highYieldScore(makeCard('c2', '2026-08-01', { category: 'appointments', difficulty: 'M' })), 4 + 2)
assert.equal(highYieldScore(makeCard('c3', '2026-08-01', { category: 'awards', difficulty: 'O' })), 4)
assert.equal(highYieldScore(makeCard('c4', '2026-08-01', { category: 'defence', difficulty: 'O' })), 4)
assert.equal(highYieldScore(makeCard('c5', '2026-08-01', { category: 'science', difficulty: 'O' })), 3)
assert.equal(highYieldScore(makeCard('c6', '2026-08-01', { category: 'sports', difficulty: 'O' })), 3)
assert.equal(highYieldScore(makeCard('c7', '2026-08-01', { category: 'international', difficulty: 'O' })), 3)
assert.equal(highYieldScore(makeCard('c8', '2026-08-01', { category: 'economy', difficulty: 'O' })), 3)
assert.equal(highYieldScore(makeCard('c9', '2026-08-01', { category: 'judiciary', difficulty: 'O' })), 3)
assert.equal(highYieldScore(makeCard('c10', '2026-08-01', { category: 'environment', difficulty: 'O' })), 2)
assert.equal(highYieldScore(makeCard('c11', '2026-08-01', { category: 'books', difficulty: 'O' })), 2)
assert.equal(highYieldScore(makeCard('c12', '2026-08-01', { category: 'schemes', difficulty: 'O', mcqs: [{}] })), 1)

// 3. selectHighYieldCards: non-mutation and deterministic tiebreak
const tieCards = Object.freeze([
  makeCard('card-b', '2026-08-10', { category: 'appointments', difficulty: 'M' }), // score 6
  makeCard('card-a', '2026-08-10', { category: 'appointments', difficulty: 'M' }), // score 6
  makeCard('card-c', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
  makeCard('card-d', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
  makeCard('card-e', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
  makeCard('card-f', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
  makeCard('card-g', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
  makeCard('card-h', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
  makeCard('card-i', '2026-08-10', { category: 'schemes', difficulty: 'F' }), // score 5
])
const selectedNormal = selectHighYieldCards(tieCards)
assert.equal(selectedNormal.length, 7, 'Normal day caps at 7 when priorityCount <= 7')
assert.deepEqual(
  selectedNormal.map(c => c.id),
  ['card-a', 'card-b', 'card-c', 'card-d', 'card-e', 'card-f', 'card-g'],
)

// 4. Day with >7 TG-focus or F cards allows up to 8
const busyDay = Array.from({ length: 12 }, (_, idx) =>
  makeCard(`busy-${String(idx).padStart(2, '0')}`, '2026-08-11', {
    category: 'appointments',
    difficulty: idx < 8 ? 'F' : 'M',
    is_telangana_focus: idx === 0,
  }),
)
const selectedBusy = selectHighYieldCards(busyDay)
assert.equal(selectedBusy.length, 8, 'Day with >7 TG/F cards allows up to 8')
assert.equal(selectedBusy[0].id, 'busy-00')

// 5. Day with 6 cards >= 5 keeps 6 (between 5 and 7)
const sixQualDay = [
  ...Array.from({ length: 6 }, (_, i) => makeCard(`q-${i}`, '2026-08-12', { category: 'science', difficulty: 'M' })), // score 5
  ...Array.from({ length: 4 }, (_, i) => makeCard(`low-${i}`, '2026-08-12', { category: 'schemes', difficulty: 'O' })), // score 1
]
const selectedSix = selectHighYieldCards(sixQualDay)
assert.equal(selectedSix.length, 6)
assert.ok(selectedSix.every(c => c.id.startsWith('q-')))

// 6. Day with <5 cards >= 5 falls back to top min(5, dayCards.length)
const lowQualDay = [
  makeCard('hi-1', '2026-08-13', { category: 'awards', difficulty: 'M' }), // score 6
  makeCard('hi-2', '2026-08-13', { category: 'awards', difficulty: 'M' }), // score 6
  ...Array.from({ length: 6 }, (_, i) => makeCard(`mid-${i}`, '2026-08-13', { category: 'schemes', difficulty: 'M' })), // score 3
]
const selectedFallback = selectHighYieldCards(lowQualDay)
assert.equal(selectedFallback.length, 5)
assert.deepEqual(selectedFallback.map(c => c.id), ['hi-1', 'hi-2', 'mid-0', 'mid-1', 'mid-2'])

// 7. Day with <5 total cards keeps all of them
const smallDay = [
  makeCard('s-1', '2026-08-14', { category: 'schemes', difficulty: 'O' }),
  makeCard('s-2', '2026-08-14', { category: 'schemes', difficulty: 'O' }),
]
assert.equal(selectHighYieldCards(smallDay).length, 2)

// 8. Real archive invariant: every date keeps 1..8 cards
const hyArchive = selectHighYieldCards(CA_CARDS)
assert.ok(hyArchive.length > 0 && hyArchive.length <= CA_CARDS.length)
const countsByDay = new Map<string, number>()
for (const c of hyArchive) {
  const d = entryDate(c)
  countsByDay.set(d, (countsByDay.get(d) ?? 0) + 1)
}
for (const [d, count] of countsByDay) {
  assert.ok(count >= 1 && count <= 8, `Date ${d} had unexpected high-yield count ${count}`)
}

// 9. API handler consistency between /api/ca/feed and /api/ca/dates
function mockEvent(url: string) {
  const req = new IncomingMessage(new Socket())
  req.url = url
  req.method = 'GET'
  const res = new ServerResponse(req)
  return createEvent(req, res)
}

const feedAll = await feedHandler(mockEvent('/api/ca/feed?mode=all&limit=5'))
const feedHY = await feedHandler(mockEvent('/api/ca/feed?mode=high-yield&limit=5'))
const datesAll = await datesHandler(mockEvent('/api/ca/dates'))
const datesHY = await datesHandler(mockEvent('/api/ca/dates?mode=high-yield'))

assert.equal(feedAll.stats.total, CA_CARDS.length)
assert.equal(feedHY.stats.total, hyArchive.length)
assert.equal(feedHY.total, hyArchive.length)
assert.equal(feedHY.items.length, Math.min(5, hyArchive.length))

const sumDatesAll = datesAll.dates.reduce((acc: number, row: { count: number }) => acc + row.count, 0)
const sumDatesHY = datesHY.dates.reduce((acc: number, row: { count: number }) => acc + row.count, 0)
assert.equal(sumDatesAll, feedAll.stats.total)
assert.equal(sumDatesHY, feedHY.stats.total)
assert.equal(datesHY.dates.length, datesAll.dates.length)

// 10. Month filter + facets.months consistency + date > month precedence
const monthAll = await feedHandler(mockEvent('/api/ca/feed?month=2026-11&limit=500'))
const monthHY = await feedHandler(mockEvent('/api/ca/feed?month=2026-11&mode=high-yield&limit=500'))
assert.ok(monthAll.total > 0 && monthAll.items.length === monthAll.total)
assert.ok(monthAll.items.every((e: any) => entryDate(e).startsWith('2026-11-')))
assert.ok(monthHY.total > 0 && monthHY.items.length === monthHY.total)
assert.ok(monthHY.items.every((e: any) => entryDate(e).startsWith('2026-11-')))
assert.equal(feedAll.facets.months['2026-11'], monthAll.total)
assert.equal(feedHY.facets.months['2026-11'], monthHY.total)
assert.equal(
  Object.values(feedAll.facets.months as Record<string, number>).reduce((a, b) => a + b, 0),
  sumDatesAll,
)
const dateBeatsMonth = await feedHandler(mockEvent('/api/ca/feed?month=2026-11&date=2026-10-15&limit=100'))
assert.ok(dateBeatsMonth.total > 0 && dateBeatsMonth.items.every((e: any) => entryDate(e) === '2026-10-15'))
assert.equal(dateBeatsMonth.facets.months['2026-11'], monthAll.total)

console.log(
  `PASS: ca-high-yield tests (archive=${CA_CARDS.length}, highYield=${hyArchive.length}, dates=${datesHY.dates.length}, novAll=${monthAll.total}, novHY=${monthHY.total})`,
)
