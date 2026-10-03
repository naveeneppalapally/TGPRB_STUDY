import { readFileSync } from 'node:fs'
import { globSync } from 'glob'
import { parse } from '@vue/compiler-sfc'
import { baseParse, parserOptions, NodeTypes, type ElementNode, type RootNode } from '@vue/compiler-dom'
import ts from 'typescript'
import yaml from 'js-yaml'
import topics from '../data/topics_master.json'
import master from '../data/pyq_enriched_master.json'
import studyPyqs from '../content/data/study/pyqs.json'
import livePyqs from '../data/live_pyqs.json'
import { contentRoutes, noteRoute } from '../utils/topic-delivery'
import { LEARNING_ASSETS, cardsFor, gateFor, canonicalNoteId, allReviewContent } from '../server/utils/learning-content'
import { CHAPTERS } from '../server/utils/study-chapters'
import { validateCACard } from '../utils/ca-contract'

export function vueEvidence(source: string) {
  const { descriptor, errors } = parse(source)
  if (errors.length || !descriptor.template || !descriptor.scriptSetup) throw new Error('Unable to parse Vue template and script setup')
  const ast = baseParse(descriptor.template.content, parserOptions)
  const elements: ElementNode[] = []
  function visit(node: RootNode | ElementNode) {
    for (const child of node.children) if (child.type === NodeTypes.ELEMENT) { elements.push(child); visit(child) }
  }
  visit(ast)
  const script = ts.createSourceFile('topic.ts', descriptor.scriptSetup.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const toc = new Set<string>()
  function walk(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(script) === 'sections' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      for (const element of node.initializer.elements) if (ts.isObjectLiteralExpression(element)) for (const prop of element.properties) {
        if (ts.isPropertyAssignment(prop) && prop.name.getText(script) === 'id' && ts.isStringLiteral(prop.initializer)) toc.add(prop.initializer.text)
      }
    }
    ts.forEachChild(node, walk)
  }
  walk(script)
  return { elements, toc, script }
}
function property(object: ts.ObjectLiteralExpression | undefined, key: string) {
  return object?.properties.find((node): node is ts.PropertyAssignment =>
    ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === key)?.initializer
}
function objectProperty(object: ts.ObjectLiteralExpression | undefined, key: string) {
  const value = property(object, key)
  return value && ts.isObjectLiteralExpression(value) ? value : undefined
}
export function hasRouteBinding(source: string) {
  const script = ts.createSourceFile('nuxt.config.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const config = script.statements.find(ts.isExportAssignment)?.expression
  const object = config && ts.isCallExpression(config) && config.arguments[0] && ts.isObjectLiteralExpression(config.arguments[0]) ? config.arguments[0] : undefined
  const routes = property(objectProperty(objectProperty(object, 'nitro'), 'prerender'), 'routes')
  return !!routes && ts.isCallExpression(routes) && ts.isIdentifier(routes.expression) && routes.expression.text === 'contentRoutes' &&
    routes.arguments.length === 1 && ts.isIdentifier(routes.arguments[0]) && routes.arguments[0].text === 'topics'
}
function hasCall(script: ts.SourceFile, name: string) {
  let found = false
  function visit(node: ts.Node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) found = true
    ts.forEachChild(node, visit)
  }
  visit(script)
  return found
}
export function attribute(node: ElementNode, name: string): string | undefined {
  const prop = node.props.find(p => p.type === NodeTypes.ATTRIBUTE && p.name === name)
  return prop?.type === NodeTypes.ATTRIBUTE ? prop.value?.content : undefined
}
export function runIntegrity(readOverride?: (file: string) => string, chapters = CHAPTERS): string[] {
  const defects: string[] = []
  const check = (condition: unknown, message: string) => { if (!condition) defects.push(message) }
  const read = readOverride || ((file: string) => readFileSync(file, 'utf8'))
  const packageScripts = JSON.parse(read('package.json')).scripts
  const constitution = read('AGENTS.md')
  for (const match of constitution.matchAll(/`(docs\/[^`]+|scripts\/[^`]+|server\/[^`]+|data\/[^`]+|content\/[^`]+)`/g)) {
    if (/[<*>]/.test(match[1])) continue
    try { read(match[1]) } catch { defects.push(`Missing constitutional reference: ${match[1]}`) }
  }
  for (const match of constitution.matchAll(/npm run ([a-z:-]+)/g)) check(packageScripts[match[1]], `Missing constitutional command: ${match[1]}`)
  const ids = new Set<string>(), aliases = new Set<string>()
  for (const t of topics) {
    check(!ids.has(t.id), `Duplicate NOTE ID: ${t.id}`); ids.add(t.id)
    check(/^NOTE-[A-Z]+-[A-Z0-9-]+$/.test(t.id) && t.title && t.subject && Array.isArray(t.keywords) && Array.isArray(t.aliases), `Invalid topic: ${t.id}`)
    for (const alias of t.aliases) { check(!aliases.has(alias), `Duplicate alias: ${alias}`); aliases.add(alias) }
  }
  for (const alias of aliases) check(!ids.has(alias), `Alias collides with canonical ID: ${alias}`)
  const canonical = new Map(master.map(q => [q.uid, q])), bundle = new Map(studyPyqs.map(q => [q.uid,q]))
  for (const q of [...studyPyqs, ...livePyqs]) check(JSON.stringify(q) === JSON.stringify(canonical.get(q.uid)), `Study PYQ differs from master: ${q.uid}`)
  const caCounts = new Map<string,number>(), caIds = new Set<string>()
  for (const file of globSync('content/current-affairs/*.md')) {
    try {
      const card = yaml.load(read(file).split('---')[1]) as Record<string, any>
      for (const error of validateCACard(card)) defects.push(`${file}: ${error}`)
      check(!caIds.has(card.id), `Duplicate CA ID: ${card.id}`); caIds.add(card.id)
      for (const id of card.related_topic_ids || []) caCounts.set(id, (caCounts.get(id) || 0)+1)
    } catch (e) { defects.push(`${file}: ${String(e)}`) }
  }
  const seenNotes = new Set<string>()
  for (const file of globSync('pages/notes/**/*.vue').filter(p => !p.endsWith('/index.vue') && !p.includes('['))) {
    try {
      const { elements, toc } = vueEvidence(read(file))
      const gates = elements.filter(e => e.tag === 'GateQuiz'), strips = elements.filter(e => e.tag === 'CurrentAffairsStrip')
      const id = gates[0] && attribute(gates[0], 'note-id'), topic = topics.find(t => t.id === id)
      check(gates.length === 1 && id && canonicalNoteId(id) === id && topic, `${file}: exactly one canonical gate required`)
      if (!topic || !id) continue
      seenNotes.add(id)
      check(file === `pages/notes/${topic.subjectSlug}/${topic.noteSlug}.vue`, `${id}: note path differs from registry`)
      check(strips.length === 1 && attribute(strips[0], 'note-id') === id, `${id}: CA identity differs`)
      check(toc.has('gate') && toc.has('current-affairs'), `${id}: actual TOC entries missing`)
      check((caCounts.get(id) || 0)>0, `${id}: no canonical CA coverage`)
      const gate = gateFor(id)
      check(gate && gate.note_id === id && gate.pass_threshold === 3 && gate.questions.length >= 5, `${id}: incomplete gate schema/registration`)
      for (const q of gate?.questions || []) check(q.id && q.question && q.explanation && q.options.length === 4 && Number.isInteger(q.correct_answer) && q.correct_answer>=0 && q.correct_answer<4, `${id}: invalid gate question ${q.id}`)
      const rawGate = JSON.parse(read(topic.gateFile!))
      const rawDeck = JSON.parse(read(topic.deckFile!))
      check(JSON.stringify(rawGate) === JSON.stringify(LEARNING_ASSETS[id]?.gate), `${id}: gate import differs from declared file`)
      check(rawDeck.note_id === id && JSON.stringify(rawDeck) === JSON.stringify(LEARNING_ASSETS[id]?.deck), `${id}: deck NOTE identity/import differs from declared file`)
      const deck = cardsFor(id)
      check(LEARNING_ASSETS[id] && deck.length >= 10 && new Set(deck.map(c=>c.id)).size===deck.length && deck.every(c=>c.id && c.front && c.back && c.source_note_id===id), `${id}: incomplete or unstable deck`)
      check(topic.pyqUids?.every(uid=>canonical.has(uid)), `${id}: unresolved topic PYQs`)
      const chapter = topic.studySlug ? chapters[topic.studySlug] : undefined
      check(chapter?.noteId === id && chapter.hasNote === true && chapter.subjectSlug===topic.subjectSlug, `${id}: paired Study registration missing`)
      const links = elements.filter(e => (e.tag === 'NoteStudySwitch' && attribute(e,'slug')===topic.studySlug) || (e.tag === 'NuxtLink' && attribute(e,'to')===`/study/${topic.studySlug}`))
      check(links.length>=2 && links.some(e=>e.loc.start.offset<gates[0].loc.start.offset) && links.some(e=>e.loc.start.offset>(strips[0]?.loc.start.offset ?? Infinity)), `${id}: top/bottom Study transitions missing`)
      const hub = vueEvidence(read(`pages/notes/${topic.subjectSlug}/index.vue`)).elements
      check(hub.some(e=>(e.tag==='NuxtLink' && attribute(e,'to')===`/notes/${topic.subjectSlug}/${topic.noteSlug}`) || (e.tag==='SubjectTopicCards' && attribute(e,'subject')===topic.subjectSlug && attribute(e,'mode')==='note')), `${id}: hub Note card missing`)
      check(hub.some(e=>(e.tag==='NuxtLink' && attribute(e,'to')===`/study/${topic.studySlug}`) || (e.tag==='SubjectTopicCards' && attribute(e,'subject')===topic.subjectSlug && attribute(e,'mode')!=='note')), `${id}: hub Study card missing`)
    } catch (e) { defects.push(`${file}: ${String(e)}`) }
  }
  for (const t of topics.filter(t=>t.noteSlug)) check(seenNotes.has(t.id), `${t.id}: registered note absent`)
  for (const chapter of Object.values(chapters)) {
    check(topics.find(t=>t.id===chapter.noteId)?.studySlug===chapter.slug, `${chapter.slug}: Study identity differs`)
    check(chapter.sections.length>0 && new Set(chapter.sections.map(s=>s.id)).size===chapter.sections.length, `${chapter.slug}: invalid sections`)
    for (const section of chapter.sections) {
      check(section.estMinutes>=2 && section.estMinutes<=4 && section.blocks.length && section.pyqs.length && section.cards.length && section.traps.length, `${chapter.slug}/${section.id}: incomplete section`)
      const lines = new Set(section.blocks.flatMap(b=>'lineId' in b ? [b.lineId] : b.type==='compare' ? b.rows.map(r=>r.lineId) : b.type==='timeline' ? b.events.map(e=>e.lineId) : []))
      for (const ref of section.pyqs) check(topics.find(t=>t.id===chapter.noteId)?.pyqUids?.includes(ref.uid) && bundle.has(ref.uid) && ref.sourceLine && lines.has(ref.sourceLine), `${chapter.slug}/${section.id}: unresolved PYQ/sourceLine ${ref.uid}`)
    }
  }
  const all = allReviewContent()
  check(new Set(all.map(c=>c.id)).size===all.length, 'Duplicate review IDs across catalog')
  const routes = contentRoutes(topics)
  for (const t of topics) {
    if (t.noteSlug) check(routes.includes(noteRoute(t)!), `${t.id}: Note route absent`)
    if (t.studySlug) check(routes.includes(`/study/${t.studySlug}`) && routes.includes(`/api/study/${t.studySlug}`), `${t.id}: Study route absent`)
  }
  check(hasRouteBinding(read('nuxt.config.ts')), 'Nuxt must consume verified content routes')
  check(hasCall(vueEvidence(read('components/study/StudyTopbar.vue')).script, 'noteRoute'), 'Study topbar must use canonical Note route')
  return defects
}
if (process.argv[1]?.endsWith('verify-topic-integrity.ts')) {
  const defects = runIntegrity()
  if (defects.length) { for (const defect of defects) console.error(defect); process.exit(1) }
  console.log('PASS: parsed Note components/TOCs, gate/deck schemas and executable registrations, CA schema/IDs/coverage, paired Study chapters, section PYQs/source lines, bidirectional links, hub cards and registry-derived route configuration.')
  console.log('Separate verification is required for deployed SQL, browser layout, factual CA answers and production edge behavior.')
}
