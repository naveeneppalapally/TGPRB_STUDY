import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createOfflineSyncEngine, InMemoryMutationStore, createSupabaseOfflineSyncAdapter, reconcileFSRSReviewLog, type FSRSReviewMutation, type OfflineMutation, IndexedDBMutationStore, FallbackMutationStore } from '../composables/useOfflineSync'
import { cardToDbFields, newCard, toFsrsRating } from '../server/utils/fsrs'
import { gateFor, cardsFor } from '../server/utils/learning-content'
import { evaluateGate } from '../server/utils/gate-validation'
import { renderCloze } from '../utils/study-cloze'
import { rewriteLocalMediaRefs } from '../utils/media-references'
import { saveStudyCard, restoreStudyCard } from '../utils/review-state'
import { useFSRSEngine } from '../composables/useFSRSEngine'
import { runIntegrity, vueEvidence } from './verify-topic-integrity'
import { readAllRows } from '../utils/supabase-pages'
import { mergeCAAttempts } from '../utils/ca-attempts'
import subjectStats from '../data/subject_stats.json'
import topicStats from '../data/topic_stats.json'
import master from '../data/pyq_enriched_master.json'
import { CHAPTERS } from '../server/utils/study-chapters'
import { canonicalNotePyqs } from '../utils/note-pyqs'
import { caReviewId } from '../utils/ca-review-id'
import caCards from '../content/data/ca/cards.json'

assert.equal(cardToDbFields(newCard()).last_review, null)
const companions = (caCards as Array<{id:string;meta:{legacy_review_id?:string}}>).filter(card => card.meta.legacy_review_id)
assert.equal(companions.length,78)
for(const card of companions) {
  const legacy=card.meta.legacy_review_id!
  assert.equal(caReviewId(card.id,0,legacy),legacy)
  assert.ok(legacy.startsWith('ca-mcq-') && !legacy.startsWith('ca-mcq-ca-mcq-'))
}
assert.equal(caReviewId('ordinary-card',1),'ca-mcq-ordinary-card-q1')
const stalePyq = { uid: 'PYQ-0766', question: 'Old question', options: ['old'], correct: 0, explanation: 'Old copied official explanation' }
assert.equal(canonicalNotePyqs([stalePyq])[0].explanation, master.find(q=>q.uid===stalePyq.uid)!.explanation)
assert.equal(canonicalNotePyqs([stalePyq])[0].teaching_explanation, undefined)
assert.equal(canonicalNotePyqs([{...stalePyq,teaching_explanation:'Explicit authored teaching context'}])[0].teaching_explanation, 'Explicit authored teaching context')
assert.throws(() => toFsrsRating(2.5))
const gate = gateFor('NOTE-POL-HIST-ACTS')!
assert.deepEqual(gateFor('NOTE-POL-CONST-FRAME'), gate)
assert.deepEqual(cardsFor('NOTE-POL-CONST-FRAME'), cardsFor('NOTE-POL-HIST-ACTS'))
const answers = gate.questions.map(q => q.correct_answer)
assert.equal(evaluateGate({ note_id: gate.note_id, answers, score: 0, flashcard_ids: ['foreign'] }).passed, true)
assert.equal(evaluateGate({ note_id: gate.note_id, answers: answers.map(v => (v+1)%4), score: 999, pass_threshold: 0 }).passed, false)
for (const request of [null, {note_id: 'NOTE-UNKNOWN', answers}, {note_id: gate.note_id, answers: []}, {note_id: gate.note_id, answers: answers.map(()=>4)}, {note_id:gate.note_id,answers:answers.map(()=>1.5)}]) assert.throws(() => evaluateGate(request))

for (const prefix of ['1.', '100.', '2)', '(1)', '[1]', '1:']) {
  assert.equal(renderCloze(`${prefix} item`).includes('cloze-chip'), false, prefix)
  assert.equal(renderCloze(`<strong>${prefix}</strong> item`).includes('cloze-chip'), false, `strong ${prefix}`)
}
assert.ok(renderCloze('<strong>Godavari</strong>').includes('cloze-chip'))
assert.ok(renderCloze('<span class="hot">Nehru</span>').includes('cloze-chip'))
const media = '<img src="/images/geography/map.webp"><img src="/images/polity/map.webp"><img src="https://cdn.example/geography/map.webp">'
const rewritten = rewriteLocalMediaRefs(media, 'assets-to-upload/geography/map.webp', 'https://res.cloudinary.com/cloud/new.webp')
assert.ok(rewritten.includes('src="/images/polity/map.webp"'))
assert.ok(rewritten.includes('src="https://cdn.example/geography/map.webp"'))
assert.equal(rewriteLocalMediaRefs(rewritten, 'assets-to-upload/geography/map.webp', 'https://res.cloudinary.com/cloud/new.webp'), rewritten)

const engine = useFSRSEngine()
const dated = engine.createNewCard('current_affair', { id: 'ca-mcq-x-q0', contentId: 'ca-mcq-x-q0', contentType: 'atomic_flashcard', unlocked:true, verifiedPyqCount:0, sourceCurrentAffairId:'x',eventDate:'2024-01-01',validUntil:'2025-01-01',now:new Date('2026-10-02') })
const restored = restoreStudyCard(JSON.parse(JSON.stringify(saveStudyCard(dated))))
assert.deepEqual(restored, dated)
assert.equal(engine.buildDueQueue([restored],new Date('2026-10-02')).length,0)

// Real queue: retain A and ownerless data, upload only B, then resume A.
let owner = 'A'
let online = false
const store = new InMemoryMutationStore()
const uploads: Array<{owner:string,mutations:OfflineMutation[]}> = []
const sync = createOfflineSyncEngine({getUserId:()=>owner,isOnline:()=>online,store,autoStart:false,adapter:{async sync(owner,mutations){uploads.push({owner,mutations});return {syncedIds:mutations.map(m=>m.id)}}}})
sync.queueTopicVisit({topic_id:'A-private',last_seen_at:'2026-10-02T10:00:00Z'})
await sync.initialize()
const legacy = {...(await store.listAllPending())[0],id:'legacy',owner_id:undefined}
await store.put(legacy)
await sync.flush()
owner = 'B'
sync.queueBookmark({content_id:'B-only',bookmarked:true,updated_at:'2026-10-02T10:00:00Z'})
await sync.flush()
online = true
await sync.flush()
assert.equal(uploads.length,1)
assert.deepEqual(uploads[0].mutations.map(m=>m.owner_id),['B'])
assert.equal((await store.listAllPending()).length,2)
owner='A';await sync.flush()
assert.equal((await store.listAllPending()).length,1)
assert.equal((await store.listAllPending())[0].id,'legacy')
sync.stop()

// Real Supabase adapter pins the captured session token for every RPC.
const headers: string[] = []
const mock = {auth:{async getSession(){return {data:{session:{user:{id:'A'},access_token:'token-A'}}}}}, rpc(){ return { setHeader(name:string,value:string){headers.push(`${name}:${value}`);return Promise.resolve({error:null})} } }}
const adapter = createSupabaseOfflineSyncAdapter(mock as any)
const scoped = {...legacy,id:'visit',owner_id:'A'}
await adapter.sync('A',[scoped])
assert.deepEqual(headers,['Authorization:Bearer token-A'])
await assert.rejects(()=>adapter.sync('B',[scoped]))

const read = (file:string)=>readFileSync(file,'utf8')
assert.equal(runIntegrity().length,0)
const path='pages/notes/geography/dams-in-india.vue'
for (const edit of [
 (source:string)=>source.replace(/<GateQuiz[^>]*\/>/, '<!-- <GateQuiz note-id="NOTE-GEO-DAMS" /> -->'),
 (source:string)=>source.replace('<GateQuiz note-id="NOTE-GEO-DAMS"', '<GateQuiz :note-id="unrelatedId"'),
 (source:string)=>source.replace(/<NoteStudySwitch[^>]*\/>/g,''),
 (source:string)=>source.replace(/id: 'gate'/,"id: 'removed-gate'"),
]) assert.ok(runIntegrity(file=>file===path?edit(read(file)):read(file)).length>0)
assert.throws(()=>vueEvidence('<template><div></template>'))
const broken = structuredClone(CHAPTERS)
broken['dams-in-india'].sections[0].pyqs[0].sourceLine='missing-line'
assert.ok(runIntegrity(undefined,broken).some(error=>error.includes('sourceLine')))
const emptySection = structuredClone(CHAPTERS)
emptySection['dams-in-india'].sections[0].pyqs=[]
assert.ok(runIntegrity(undefined,emptySection).some(error=>error.includes('incomplete section')))
for (const [file, edit] of [
 ['nuxt.config.ts', (source: string) => source.replace('routes: contentRoutes(topics)', 'routes: [] /* routes: contentRoutes(topics) */')],
 ['components/study/StudyTopbar.vue', (source: string) => source.replace('noteRoute(topic)', 'null /* noteRoute(topic) */')],
 ['pages/notes/geography/index.vue', (source: string) => source.replace(/<SubjectTopicCards subject="geography" \/>/, '<!-- <SubjectTopicCards subject="geography" /> -->')],
] as const) assert.ok(runIntegrity(path => path===file ? edit(read(path)) : read(path)).length>0, file)
console.log('PASS: audit regression fixtures for account ownership, session pinning, gate authority, FSRS metadata, alias identity, media, cloze and negative integrity checks.')

const history = Array.from({length:2005},(_,id)=>({id}))
const pages = await readAllRows(async(from,to)=>({data:history.slice(from,to+1),error:null}))
assert.equal(pages.data?.length,2005)

// Request success is not a durable commit: a following transaction abort must reject.
const previousIndexedDB = globalThis.indexedDB
const transaction: any = { objectStore: () => ({ put: () => {
  const request: any = { result: 'event' }
  queueMicrotask(() => { request.onsuccess?.(); queueMicrotask(() => transaction.onabort()) })
  return request
} }) }
Object.defineProperty(globalThis, 'indexedDB', { configurable: true, value: { open: () => {
  const request: any = { result: { transaction: () => transaction } }
  queueMicrotask(() => request.onsuccess())
  return request
} } })
await assert.rejects(() => new IndexedDBMutationStore().put(scoped), /transaction aborted/)
Object.defineProperty(globalThis, 'indexedDB', { configurable: true, value: previousIndexedDB })

// Fallback writes and recovered primary writes both remain visible; neither is silently hidden.
const primary = new InMemoryMutationStore(), fallback = new InMemoryMutationStore()
await primary.put({...scoped,id:'primary'})
let storageAvailable = false
const mixed = new FallbackMutationStore({ ...primary, put: async item => { if (!storageAvailable) throw new Error('unavailable'); await primary.put(item) }, listAllPending: async () => { if (!storageAvailable) throw new Error('unavailable'); return primary.listAllPending() }, markSynced: ids => primary.markSynced(ids), scheduleRetry: (...args) => primary.scheduleRetry(...args), listPending: (...args) => primary.listPending(...args) }, fallback)
await mixed.put({...scoped,id:'fallback'})
await assert.rejects(() => mixed.listAllPending())
storageAvailable = true
assert.deepEqual((await mixed.listAllPending()).map(item => item.id).sort(), ['fallback','primary'])
await mixed.markSynced(['primary','fallback'])
assert.equal((await mixed.listAllPending()).length,0)
console.log('PASS: aborted transaction, fallback recovery, bounded acknowledged retention and complete cloud pagination.')

const answerA = { total: 2, score: 0, lastAt: '2026-10-02T10:00:00Z', perQuestion: [{selected:0,correct:false,at:'2026-10-02T10:00:00Z'},null] }
const answerB = { total: 2, score: 2, lastAt: '2026-10-01T10:00:00Z', perQuestion: [{selected:1,correct:true,at:'2026-10-01T10:00:00Z'}, {selected:1,correct:true,at:'2026-10-01T10:00:00Z'}] }
assert.deepEqual(mergeCAAttempts(answerA,answerB),mergeCAAttempts(answerB,answerA))
assert.equal(mergeCAAttempts(answerA,answerB).score,1)
assert.equal(subjectStats.reduce((n,row)=>n+row.pyqCount,0),master.length)
for (const row of subjectStats) assert.equal(row.pyqCount, master.filter(q=>q.subject_id===row.id).length)
for (const row of topicStats.canonical) assert.equal(row.count, master.filter(q=>q.topic_id===row.id).length)
assert.ok(subjectStats.every((row,index)=>index===0 || subjectStats[index-1].pyqCount>=row.pyqCount))
console.log('PASS: per-question CA reconciliation and canonical subject/topic statistics.')

const dateSeed = { card_id: 'timezone-card', initial_card: saveStudyCard(engine.createNewCard('static',{id:'timezone-card',contentId:'timezone-card',contentType:'atomic_flashcard',verifiedPyqCount:0,unlocked:true,now:new Date('2026-10-01')})).fsrs, created_at: '2026-10-01T00:00:00Z' }
const zoned = ['2026-10-02T11:00:00+05:30','2026-10-02T06:00:00Z'].map((time,index)=>({id:String(index),owner_id:'A',type:'fsrs_review',payload:{card_id:'timezone-card',rating:3,state:0,elapsed_days:0,review_time:time,card_seed:dateSeed},client_timestamp:time,synced:false,retry_count:0,next_retry_at:null})) as FSRSReviewMutation[]
assert.deepEqual(reconcileFSRSReviewLog(dateSeed,zoned).orderedEventIds,['0','1'])
assert.deepEqual(reconcileFSRSReviewLog(dateSeed,[...zoned].reverse()).card,reconcileFSRSReviewLog(dateSeed,zoned).card)
console.log('PASS: FSRS replay orders instants correctly across timezone offsets.')
