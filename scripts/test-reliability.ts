import assert from 'node:assert/strict'
import master from '../data/pyq_enriched_master.json'
import media from '../data/pyq_media.json'
import exceptions from '../data/pyq_review_issues.json'
import { buildPyqArchive, structuralIssues, type ArchivePyq } from '../utils/pyq-archive'
import { verifyPyqArchive } from './verify-pyq-archive'
import { NOTE_BODY_LIMIT, characterCount, validateNoteBody, validateFeedback } from '../utils/annotation-validation'
import { createOfflineSyncEngine, createSupabaseOfflineSyncAdapter, InMemoryMutationStore, FallbackMutationStore, type MutationStore, type OfflineMutation } from '../composables/useOfflineSync'
import { rewriteLocalMediaRefs } from '../utils/media-references'

validateNoteBody('x'.repeat(NOTE_BODY_LIMIT))
validateNoteBody('😀'.repeat(NOTE_BODY_LIMIT))
assert.equal(characterCount('😀'), 1)
assert.throws(() => validateNoteBody('x'.repeat(NOTE_BODY_LIMIT + 1)))
assert.throws(() => validateNoteBody('   '))
validateNoteBody('', true)
validateFeedback('fix_fact', 'x'.repeat(4000))
assert.throws(() => validateFeedback('fix_fact', 'x'.repeat(4001)))
assert.throws(() => validateFeedback('unregistered', 'Feedback'))
assert.throws(() => validateFeedback('fix_fact', '   '))

assert.deepEqual(verifyPyqArchive(), [])
for (const q of master) assert.equal(structuralIssues(q).length > 0, q.uid in exceptions, q.uid)
const unknown = { ...master[0], uid: 'PYQ-NEW', options: [] }
assert.ok(verifyPyqArchive([unknown], {}, {}).some(e => e.includes('PYQ-NEW')))
const changed = { ...master.find(q => q.uid === 'PYQ-2092')!, question_text: 'Changed history' }
assert.ok(verifyPyqArchive([changed], { 'PYQ-2092': exceptions['PYQ-2092'] }, {}).length)
assert.equal(buildPyqArchive(master, { exam: 'si', year: '2015' }).total, 0)
for (const exam of ['si', 'constable']) for (const year of ['2015', '2016', '2018', '2022', '2023']) {
  const result = buildPyqArchive(master, { exam, year, limit: 100 })
  for (const q of result.pyqs) { assert.equal(q.exam.toLowerCase(), exam); assert.equal(q.year, year) }
}
const mixed: ArchivePyq = { ...master[0], occurrences: [{source_file:'Constable_2015_Mains.json',q_no:1},{source_file:'SI_2018_Mains.json',q_no:2}] }
assert.equal(buildPyqArchive([mixed], {exam:'si',year:'2015'}).total, 0)
assert.equal(buildPyqArchive([mixed], {exam:'si',year:'2018'}).pyqs[0].paper_label, 'SI 2018 Mains · Q2')
const invalid = buildPyqArchive(master, { search: 'What is the sum of the ten terms' }).pyqs[0]
assert.equal(invalid.uid, 'PYQ-2092'); assert.equal(invalid.practice_available, false)
const illustrated = master.find(q => q.uid === 'PYQ-0080')!
assert.equal(buildPyqArchive([illustrated], {}, media).pyqs[0].practice_available, false)
const published = { ...media, 'PYQ-0080': { ...media['PYQ-0080'], asset_url: 'https://res.cloudinary.com/test/image/upload/diagram.webp' } }
assert.equal(buildPyqArchive([illustrated], {}, published).pyqs[0].practice_available, true)
assert.equal(buildPyqArchive([illustrated], {}, published).pyqs[0].image_url, published['PYQ-0080'].asset_url)
assert.equal(buildPyqArchive(master, { page:'NaN', limit:'invalid' }).pyqs.length, 20)
assert.equal(buildPyqArchive(master, {page:['1','2'],subject:['si','constable']}).page, 1)
assert.ok(rewriteLocalMediaRefs(JSON.stringify(media), 'assets-to-upload/pyqs/PYQ-0080.webp', published['PYQ-0080'].asset_url).includes(published['PYQ-0080'].asset_url))

let owner = 'A', online = false, clock = new Date('2026-10-18T10:00:00Z')
const store = new InMemoryMutationStore(), sent: string[] = []
const client = {
  auth: { async getSession() { return {data:{session:{user:{id:owner},access_token:'fixture-only'}}} } },
  rpc(name: string, args: any) { return { setHeader() {
    // These are actual PostgREST error shapes, not Error instances.
    if (name === 'merge_user_notes' && args.p_notes.some((n: any) => n.id === 'server-rejected')) return Promise.resolve({error:{code:'23514',message:'Fixture constraint violation'}})
    if (name === 'merge_user_notes') sent.push(...args.p_notes.map((n: any) => n.id))
    return Promise.resolve({error:null})
  } } },
}
const sync = createOfflineSyncEngine({getUserId:()=>owner,isOnline:()=>online,now:()=>clock,store,adapter:createSupabaseOfflineSyncAdapter(client as any),autoStart:false})
const note = (id: string, body = 'Normal note') => ({note:{id,note_id:'NOTE-GEO-DAMS',section_id:'facts-1',section_label:'Facts',body,is_important:false,is_doubt:false,deleted:false},updated_at:clock.toISOString()})
assert.throws(() => sync.queueNoteUpsert(note('oversized','x'.repeat(10001))))
const rejected = sync.queueNoteUpsert(note('server-rejected'))
const valid = sync.queueNoteUpsert(note('valid'))
await sync.initialize()
const legacy = { ...valid, id:'legacy-oversized', payload: note('legacy','x'.repeat(10001)) } as OfflineMutation
await store.put(legacy)
await store.put({...valid,id:'other-account',owner_id:'B'})
online = true
const result = await sync.flush()
assert.equal(result.syncedCount, 1)
assert.ok(sent.includes('valid'))
const pending = await store.listAllPending()
assert.ok(pending.find(item => item.id === rejected.id)?.rejected_reason)
assert.ok(pending.find(item => item.id === legacy.id)?.rejected_reason)
assert.equal(pending.find(item => item.id === 'other-account')?.rejected_reason, undefined)
assert.equal(sync.pendingCount.value, 0); assert.equal(sync.quarantinedCount.value, 2)
clock = new Date(clock.getTime() + 60000)
assert.equal((await sync.flush()).syncedCount, 0)
sync.queueNoteUpsert(note('legacy', 'Corrected note'))
assert.equal((await sync.flush()).syncedCount, 1)
assert.equal(sync.quarantinedCount.value, 1)
assert.ok(!(await store.listAllPending()).some(item => item.id === legacy.id))
owner = 'B'; assert.equal((await sync.flush()).syncedCount, 1)
sync.stop()

// Events written during an IndexedDB failure must remain quarantined after
// primary storage recovers; a stale fallback copy must not restart replay.
owner = 'A'
const primary = new InMemoryMutationStore(), fallback = new InMemoryMutationStore()
let primaryAvailable = false
const recovered = new FallbackMutationStore({
  put: async item => { if (!primaryAvailable) throw new Error('Storage unavailable'); await primary.put(item) },
  listPending: (...args) => primary.listPending(...args),
  listAllPending: () => primary.listAllPending(),
  markSynced: ids => primary.markSynced(ids),
  scheduleRetry: (...args) => primary.scheduleRetry(...args),
}, fallback)
for (const item of [legacy, rejected, valid, { ...valid, id: 'recovered-other-account', owner_id: 'B' }]) await recovered.put(item)
primaryAvailable = true
let reads = 0
const bounded: MutationStore = {
  put: item => recovered.put(item),
  listPending: (...args) => recovered.listPending(...args),
  listAllPending: async () => {
    // Fail deterministically rather than letting a regression hang the suite.
    assert.ok(++reads < 30, 'Fallback recovery repeatedly reprocessed a rejected event')
    return recovered.listAllPending()
  },
  markSynced: ids => recovered.markSynced(ids),
  scheduleRetry: (...args) => recovered.scheduleRetry(...args),
}
const recoveringSync = createOfflineSyncEngine({ getUserId: () => owner, isOnline: () => true, store: bounded, adapter: createSupabaseOfflineSyncAdapter(client as any), autoStart: false })
assert.equal((await recoveringSync.flush()).syncedCount, 1)
assert.equal(recoveringSync.pendingCount.value, 0)
assert.equal(recoveringSync.quarantinedCount.value, 2)
assert.ok((await recovered.listAllPending()).find(item => item.id === legacy.id)?.rejected_reason)
assert.ok((await recovered.listAllPending()).find(item => item.id === rejected.id)?.rejected_reason)
assert.equal((await recoveringSync.flush()).status, 'idle')
recoveringSync.queueNoteUpsert(note('legacy', 'Recovered correction'))
assert.equal((await recoveringSync.flush()).syncedCount, 1)
assert.equal(recoveringSync.quarantinedCount.value, 1)
owner = 'B'
assert.equal((await recoveringSync.flush()).syncedCount, 1)
recoveringSync.stop()

// A healthy primary must not require writes to an unused fallback (for
// example, when localStorage is full but IndexedDB still has capacity).
const unusedFallback: MutationStore = {
  put: async () => { throw new Error('Fallback is full') },
  listPending: async () => [],
  listAllPending: async () => [],
  markSynced: async () => { throw new Error('Fallback is full') },
  scheduleRetry: async () => { throw new Error('Fallback is full') },
}
await new FallbackMutationStore(primary, unusedFallback).put({ ...valid, id: 'primary-only-write' })
assert.ok((await primary.listAllPending()).some(item => item.id === 'primary-only-write'))
console.log('PASS: full archive validation, historical quarantine, diagram availability, same-paper filters, Unicode limits, actual Supabase adapter errors, permanent-error isolation and account-owned recovery.')
