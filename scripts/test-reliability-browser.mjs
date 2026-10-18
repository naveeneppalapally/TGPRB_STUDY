import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000'
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true, args: ['--no-sandbox'] })
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    const page = await context.newPage(), errors = []
    page.on('pageerror', error => errors.push(error.message))
    const go = async path => {
      await page.goto(base + path, { waitUntil: 'domcontentloaded' })
      await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt.isHydrating === false)
    }
    await go('/pyq-archive')
    await page.getByRole('button', { name: 'SI Papers', exact: true }).click()
    await page.getByRole('button', { name: '2015', exact: true }).click()
    await page.getByRole('heading', { name: 'No PYQs found' }).waitFor()
    await page.getByRole('button', { name: 'Reset All Filters', exact: true }).click()
    const search = page.getByPlaceholder('Search question text, keywords, or topics...')
    await search.fill('What is the sum of the ten terms')
    await page.getByText('PYQ-2092', { exact: false }).waitFor()
    assert.equal(await page.locator('article .opt:enabled').count(), 0)
    assert.equal(await page.getByRole('button', { name: 'Reveal answer & explanation' }).count(), 0)
    await search.fill('Observe the figures given below')
    await page.getByText('PYQ-0080', { exact: false }).waitFor()
    assert.equal(await page.locator('article .opt:enabled').count(), 0)
    assert.ok(await page.getByText('The original diagram is not available yet.', { exact: false }).count() > 0)
    await search.fill('amenable')
    await page.waitForFunction(() => document.querySelectorAll('article').length === 1 && document.querySelector('article')?.textContent.includes('amenable'))
    await page.locator('article .opt').first().click()
    await page.getByText('Correct Answer: Option C', { exact: false }).waitFor()

    // Test the real diagram rendering/failure guards with a local fixture,
    // without treating that fixture as a published exam diagram.
    const image = 'https://res.cloudinary.com/fixture/image/upload/diagram.svg'
    let imageFails = false
    await page.route(image + '**', route => imageFails ? route.abort() : route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><text x="10" y="40">Test diagram</text></svg>' }))
    await page.route('**/api/pyqs?**', async route => {
      const response = await route.fetch(), data = await response.json()
      for (const q of data.pyqs) if (q.uid === 'PYQ-0080') Object.assign(q, { image_url: image + (imageFails ? '?failure=1' : ''), image_alt: 'Diagram fixture', practice_available: true, practice_issues: [] })
      await route.fulfill({ response, json: data })
    })
    await search.fill('Observe the figures given below')
    const illustrated = page.locator('article').filter({ hasText: 'Constable 2015 Mains · Q80' })
    await illustrated.locator('img').scrollIntoViewIfNeeded()
    await page.waitForFunction(() => document.querySelector('article img')?.complete)
    await illustrated.locator('.opt:enabled').first().waitFor()
    imageFails = true
    await search.fill('amenable')
    await page.waitForFunction(() => document.querySelectorAll('article').length === 1 && document.querySelector('article')?.textContent.includes('amenable'))
    await search.fill('Observe the figures given below.')
    await illustrated.scrollIntoViewIfNeeded()
    await page.getByText('The diagram could not load.', { exact: false }).waitFor()
    assert.equal(await illustrated.locator('.opt:enabled').count(), 0)
    console.log(`PASS: ${width}px archive quarantine, same-paper filters and diagram loading/failure.`)
    await page.unroute('**/api/pyqs?**')

    await go('/study/dams-in-india')
    if (width < 1024) await page.locator('.study-tray .tray-handle').click()
    await page.getByRole('tab', { name: /^Notes/ }).first().click()
    const draft = page.locator('textarea[placeholder="Margin note on: Fact set 1"]:visible')
    await draft.fill('x'.repeat(10001))
    await page.getByRole('alert').filter({ hasText: '10,000 characters' }).waitFor()
    assert.equal(await page.getByRole('button', { name: 'Save note', exact: true }).isDisabled(), true)
    await draft.press('Control+Enter')
    assert.equal(await page.evaluate(() => document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$stgprb:personal-notes-state'].length), 0)
    await draft.fill('Private note retained after reload')
    await page.getByRole('button', { name: 'Save note', exact: true }).click()
    assert.ok(await page.evaluate(() => localStorage.getItem('tgprb:personal-notes:guest')?.includes('Private note retained after reload')))
    console.log(`PASS: ${width}px real note size validation and persistence.`)

    await go('/notes/geography/dams-in-india')
    await page.getByRole('button', { name: /Add or view your notes for/ }).first().click()
    const dialog = page.getByRole('dialog')
    // The Note page's first section differs from the Study page's first
    // section. Create this fixture in the drawer's actual section.
    await dialog.getByRole('button', { name: 'Add note', exact: true }).click()
    await dialog.getByPlaceholder('Type your note here (Ctrl+Enter to save)...').fill('Drawer edit regression')
    await dialog.getByRole('button', { name: 'Save Note', exact: true }).click()
    await dialog.getByRole('button', { name: 'Edit note', exact: true }).click()
    await dialog.locator('textarea').fill('Saved when switching note tabs')
    await dialog.getByRole('tab', { name: 'Suggest Improvement', exact: true }).click()
    await dialog.getByRole('tab', { name: 'My Notes', exact: true }).click()
    await dialog.getByText('Saved when switching note tabs', { exact: true }).waitFor()
    await dialog.getByRole('button', { name: 'Edit note', exact: true }).click()
    await dialog.locator('textarea').fill('Saved when closing the note drawer')
    await dialog.getByRole('button', { name: 'Close', exact: true }).click()
    await dialog.waitFor({ state: 'hidden' })
    await page.getByRole('button', { name: /Add or view your notes for/ }).first().click()
    await dialog.getByText('Saved when closing the note drawer', { exact: true }).waitFor()

    // A pending edit must not turn deletion back into an active note.
    await dialog.getByRole('button', { name: 'Add note', exact: true }).click()
    await dialog.getByPlaceholder('Type your note here (Ctrl+Enter to save)...').fill('Disposable note')
    await dialog.getByRole('button', { name: 'Save Note', exact: true }).click()
    const disposableId = await page.evaluate(() => JSON.parse(localStorage.getItem('tgprb:personal-notes:guest')).find(note => note.body === 'Disposable note').id)
    const disposable = dialog.locator('.group').nth(1)
    await disposable.getByRole('button', { name: 'Edit note', exact: true }).click()
    await disposable.locator('textarea').fill('Pending edit on deleted note')
    page.once('dialog', prompt => prompt.accept())
    await disposable.getByRole('button', { name: 'Delete note', exact: true }).click()
    await disposable.waitFor({ state: 'hidden' })
    await page.waitForTimeout(900)
    assert.equal(await page.evaluate(id => JSON.parse(localStorage.getItem('tgprb:personal-notes:guest')).find(note => note.id === id).deleted, disposableId), true)

    await dialog.getByRole('tab', { name: 'Suggest Improvement', exact: true }).click()
    await dialog.getByRole('link', { name: 'Sign in to send feedback', exact: true }).waitFor()
    assert.equal(await dialog.getByRole('button', { name: 'Submit Improvement', exact: true }).count(), 0)
    await dialog.getByRole('tab', { name: 'My Notes', exact: true }).click()
    const guestSnapshot = await page.evaluate(() => localStorage.getItem('tgprb:personal-notes:guest'))
    await dialog.getByRole('button', { name: 'Edit note', exact: true }).click()
    await dialog.locator('textarea').fill('Guest draft must never enter another account')
    // Inject only a local user ref; real server authorization stays absent.
    await page.route('**/rest/v1/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }))
    await page.evaluate(() => { document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt.payload.state['$ssupabase_user'] = { id: '00000000-0000-0000-0000-000000000001' } })
    await dialog.getByRole('tab', { name: 'Suggest Improvement', exact: true }).click()
    const feedback = dialog.getByPlaceholder('Describe what should change and where...')
    await feedback.fill('x'.repeat(4001))
    assert.equal(await dialog.getByRole('button', { name: 'Submit Improvement', exact: true }).isDisabled(), true)
    await feedback.fill('Review this existing question source')
    await dialog.getByRole('button', { name: 'Submit Improvement', exact: true }).click()
    await page.getByText('Feedback queued', { exact: true }).waitFor()
    const records = await page.evaluate(() => new Promise((resolve, reject) => {
      const request = indexedDB.open('tslprb-studyos-offline', 1)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result, read = db.transaction('mutations').objectStore('mutations').getAll()
        read.onerror = () => reject(read.error)
        read.onsuccess = () => { resolve(read.result); db.close() }
      }
    }))
    const submissions = records.filter(item => item.type === 'improvement_create')
    assert.equal(submissions.length, 1)
    assert.equal(submissions[0].owner_id, '00000000-0000-0000-0000-000000000001')
    assert.ok(records.some(item => item.type === 'note_upsert' && item.owner_id === 'guest'))
    assert.ok(!records.some(item => item.type === 'note_upsert' && item.owner_id === '00000000-0000-0000-0000-000000000001'))
    // Recovery attaches the real queued event ID. Note identity, content and
    // timestamps must survive, while that transport bookkeeping may change.
    const content = json => JSON.parse(json).map(({ last_event_id, ...note }) => note)
    assert.deepEqual(content(await page.evaluate(() => localStorage.getItem('tgprb:personal-notes:guest'))), content(guestSnapshot))
    assert.deepEqual(errors, [])
    console.log(`PASS: ${width}px archive filtering/quarantine, diagram loading/failure, note validation/persistence, edits on tab/drawer dismissal, deletion safety, account isolation and queued feedback.`)
    await context.close()
  }
} finally { await browser.close() }
