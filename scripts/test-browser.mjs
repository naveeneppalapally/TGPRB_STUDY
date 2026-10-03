import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000'
const topics = JSON.parse(readFileSync('data/topics_master.json','utf8'))
for(let attempt=0;attempt<120;attempt++) {
  try { if((await fetch(base)).ok) break } catch {}
  if(attempt===119) throw new Error('Preview server did not start')
  await new Promise(resolve=>setTimeout(resolve,500))
}
const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || undefined,headless:true,args:['--no-sandbox']})
const page = await browser.newPage({viewport:{width:390,height:844}})
const errors=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('console',message=>{if(message.type()==='error' && message.text().includes('Failed to load module script')) errors.push(message.text())})
const json = async path => {const response=await fetch(base+path);assert.equal(response.status,200,path);return response.json()}
const archive=await json('/api/pyqs?limit=1');assert.equal(archive.total,3129)
assert.ok((await json('/api/pyqs?subject=geography&limit=3')).total>0)
const si2018=await json('/api/pyqs?exam=si&year=2018&limit=1')
assert.ok(si2018.total>1)
assert.notEqual(si2018.pyqs[0].uid,(await json('/api/pyqs?exam=si&year=2018&page=2&limit=1')).pyqs[0].uid)
const search=await json(`/api/pyqs?search=${encodeURIComponent(si2018.pyqs[0].question_text)}&limit=100`)
assert.ok(search.pyqs.some(question=>question.uid===si2018.pyqs[0].uid))
const legacyCA=JSON.parse(readFileSync('content/data/ca/cards.json','utf8')).filter(card=>card.meta.legacy_review_id)
const legacyIds=legacyCA.map(card=>card.meta.legacy_review_id)
const repaired=await fetch(base+'/api/ca/review-content',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({ids:legacyIds})})
assert.equal(repaired.status,200)
const metadata=await repaired.json()
assert.deepEqual(metadata.cards.map(card=>card.id).sort(),[...legacyIds].sort())
for(const card of metadata.cards) assert.equal(card.front,legacyCA.find(source=>source.meta.legacy_review_id===card.id).meta.mcqs[0].question)
for(const topic of topics.filter(t=>t.noteSlug)) {
  const chapter=await json(`/api/study/${topic.studySlug}`)
  assert.equal(chapter.noteId,topic.id)
  assert.ok(chapter.sections.every(s=>s.pyqs.length>0))
  await page.goto(`${base}/notes/${topic.subjectSlug}/${topic.noteSlug}`,{waitUntil:'domcontentloaded'})
  await page.waitForFunction(()=>!!document.querySelector('#__nuxt')?.__vue_app__)
  await page.locator(`a[href="/study/${topic.studySlug}"]`).first().waitFor()
  assert.ok(await page.locator(`a[href="/study/${topic.studySlug}"]`).count()>=2)
  assert.equal(await page.getByRole('button',{name:/ask ai/i}).count(),0)
  await page.goto(`${base}/study/${topic.studySlug}`,{waitUntil:'domcontentloaded'})
  await page.locator(`a[href="/notes/${topic.subjectSlug}/${topic.noteSlug}"]`).waitFor()
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,topic.id)
}
console.log('PASS: all paired routes, mobile widths and Note/Study links.')

for (const subject of new Set(topics.filter(t=>t.noteSlug).map(t=>t.subjectSlug))) {
  await page.goto(`${base}/notes/${subject}`,{waitUntil:'domcontentloaded'})
  await page.waitForFunction(()=>!!document.querySelector('#__nuxt')?.__vue_app__)
  for (const topic of topics.filter(t=>t.subjectSlug===subject&&t.noteSlug)) {
    assert.ok(await page.locator(`a[href="/notes/${subject}/${topic.noteSlug}"]`).count()>0)
    assert.ok(await page.locator(`a[href="/study/${topic.studySlug}"]`).count()>0)
  }
}
console.log('PASS: subject hubs derive Note and Study cards.')
for (const route of ['/pyq-archive','/current-affairs','/my-notes','/auth/login']) {
  await page.goto(base+route,{waitUntil:'domcontentloaded'})
  await page.waitForFunction(()=>!!document.querySelector('#__nuxt')?.__vue_app__)
  assert.equal(await page.getByRole('button',{name:/ask ai/i}).count(),0)
}
console.log('PASS: archive, Current Affairs, personal notes and login hydrate.')
// Use the real Study Notes panel and delay A's actual Supabase request until B has hydrated.
await page.goto(`${base}/study/dams-in-india`,{waitUntil:'domcontentloaded'})
await page.waitForFunction(()=>!!document.querySelector('#__nuxt')?.__vue_app__)
await page.locator('.study-tray .tray-handle').click()
await page.getByRole('tab',{name:'Notes',exact:true}).first().click()
const workTray=page.getByRole('region',{name:'Work tray',exact:true})
await workTray.getByPlaceholder('Margin note on: Fact set 1').fill('Guest private note')
await workTray.getByRole('button',{name:'Save note',exact:true}).click()
const A='00000000-0000-0000-0000-000000000001', B='00000000-0000-0000-0000-000000000002'
let releaseA, requestedA
const aWaiting=new Promise(resolve=>{requestedA=resolve})
const aRelease=new Promise(resolve=>{releaseA=resolve})
await page.route('**/rest/v1/**',async route=>{
  const url=new URL(route.request().url())
  let rows=[]
  if(url.pathname.endsWith('/user_personal_notes')) {
    const isA=url.searchParams.get('user_id')===`eq.${A}`
    if(isA) {requestedA();await aRelease}
    rows=[{id:isA?A:B,note_id:'NOTE-GEO-DAMS',section_id:'facts-1',section_label:'Fact set 1',body:isA?'A private delayed response':'B private note',deleted:false,created_at:'2026-10-02T10:00:00Z',client_updated_at:'2026-10-02T10:00:00Z'}]
  }
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(rows)})
})
const setUser=async id=>page.evaluate(id=>{document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$ssupabase_user']=id?{id}:null},id)
await setUser(A)
await Promise.race([aWaiting,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Account A notes request did not start')),10000))])
await setUser(B)
await page.waitForFunction(()=>document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$stgprb:personal-notes-state']?.some(note=>note.body==='B private note'))
const aResponse=page.waitForResponse(response=>new URL(response.url()).searchParams.get('user_id')===`eq.${A}`)
releaseA()
await aResponse
await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
assert.equal(await page.evaluate(()=>localStorage.getItem('tgprb:personal-notes:00000000-0000-0000-0000-000000000002')?.includes('A private delayed response')),false)
assert.equal(await page.evaluate(()=>document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$stgprb:personal-notes-state']?.some(note=>note.body.includes('Guest')||note.body.startsWith('A private'))),false)
await setUser(null)
await page.waitForFunction(()=>document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$stgprb:personal-notes-state']?.some(note=>note.body==='Guest private note'))
console.log('PASS: private guest notes and delayed account responses stay isolated.')
await page.goto(base,{waitUntil:'domcontentloaded'})
await page.waitForFunction(()=>document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt)
// Exercise the real shared client store without granting a fake session server authorization.
await page.evaluate(()=>{
 const app=document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt
 localStorage.setItem('studyos-flashcard-unlock-mode:guest','direct')
 app.payload.state['$sstudyos-flashcard-unlock-mode']='direct'
})
await page.waitForFunction(()=>{
 const app=document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt
 return Object.keys(app.payload.state['$sreview:saved']||{}).length>0
})
const firstCount=await page.evaluate(()=>Object.keys(document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$sreview:saved']).length)
assert.ok(firstCount>0)

await page.goto(`${base}/review`,{waitUntil:'domcontentloaded'})
await page.waitForFunction(()=>!!document.querySelector('#__nuxt')?.__vue_app__)
await page.getByRole('button',{name:'Show answer',exact:true}).waitFor()
const before=await page.evaluate(()=>Object.values(document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$sreview:saved']).reduce((n,card)=>n+card.fsrs.reps,0))
await page.getByRole('button',{name:'Show answer',exact:true}).click()
await page.getByRole('button',{name:/^Again\s+1$/}).click()
await page.waitForFunction(before=>Object.values(document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$sreview:saved']).reduce((n,card)=>n+card.fsrs.reps,0)===before+1,before)
const gradedId=await page.evaluate(()=>Object.values(document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$sreview:saved']).find(card=>card.fsrs.reps>0).id)
assert.ok(await page.evaluate(id=>new Date(JSON.parse(localStorage.getItem('studyos:fsrs:card-states:guest'))[id].fsrs.due)>new Date(),gradedId))
// Legacy snapshots have full schedules but no unlocked field. Preserve them.
await page.evaluate(()=>{
  const saved=JSON.parse(localStorage.getItem('studyos:fsrs:card-states:guest'))
  for(const card of Object.values(saved)) delete card.unlocked
  localStorage.setItem('studyos:fsrs:card-states:guest',JSON.stringify(saved))
})
await page.reload({waitUntil:'domcontentloaded'})
await page.waitForFunction(id=>document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt.payload.state['$sreview:saved']?.[id]?.fsrs.reps===1,gradedId)
await page.waitForFunction(id=>document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt.payload.state['$sreview:saved']?.[id]?.unlocked===true,gradedId)
await page.getByRole('button',{name:'Show answer',exact:true}).waitFor()
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('studyos:fsrs:events:guest')).length),1)
await page.evaluate(()=>{
 const app=document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt
 app.payload.state['$ssupabase_user']={id:'00000000-0000-0000-0000-000000000002'}
})
await page.waitForFunction(()=>{
 const state=document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state
 return state['$sreview:owner']==='00000000-0000-0000-0000-000000000002' && Object.keys(state['$sreview:saved']||{}).length===0
})
assert.equal(await page.evaluate(()=>localStorage.getItem('studyos-flashcard-unlock-mode:00000000-0000-0000-0000-000000000002')),null)
assert.deepEqual(errors,[])
await page.screenshot({path:'/tmp/studyos-mobile-verification.png',fullPage:false})
await browser.close()
console.log(`PASS: ${topics.filter(t=>t.noteSlug).length} Note/Study pairs, canonical archive, mobile widths, removed AI controls, hydration, hub registrations, real grading/reload, delayed private-note account race and shared account transition (${base}).`)
