/**
 * Global mobile-table support.
 *
 * The CSS in assets/css/main.css (section 9) turns every <table> in the app
 * into stacked "cards" below the sm breakpoint so nothing ever needs to
 * scroll horizontally. That CSS renders each cell's column label via
 * `content: attr(data-label)`, which this plugin supplies by copying the
 * real <thead> text onto each <td>/<th> at runtime.
 *
 * This runs once, globally, for every table already on the page and for any
 * table added later (ContentRenderer resolving markdown asynchronously,
 * v-if'd sections, tab panels, etc). No note page or table needs its own
 * markup change - this plugin is the entire "wiring".
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  function labelTable(table: HTMLTableElement) {
    const headerCells = Array.from(table.querySelectorAll<HTMLElement>('thead th, thead td'))
    if (headerCells.length === 0) return

    const labels = headerCells.map(cell => cell.textContent?.trim() ?? '')
    const bodyRows = table.querySelectorAll<HTMLTableRowElement>('tbody tr')

    bodyRows.forEach((row) => {
      const cells = Array.from(row.children) as HTMLElement[]
      cells.forEach((cell, index) => {
        const label = labels[index]
        if (label && !cell.hasAttribute('data-label')) {
          cell.setAttribute('data-label', label)
        }
      })
    })
  }

  function labelAllTables(root: ParentNode) {
    root.querySelectorAll<HTMLTableElement>('table').forEach(labelTable)
  }

  let scheduled = false
  function scheduleLabelPass() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      labelAllTables(document)
    })
  }

  // Initial pass for whatever is already rendered (SSR/prerendered HTML).
  scheduleLabelPass()

  // Re-run on every route change (Nuxt swaps <NuxtPage> content in place).
  nuxtApp.hook('page:finish', scheduleLabelPass)

  // Catch tables that appear later - markdown content resolved by
  // ContentRenderer, conditionally rendered sections, etc.
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          scheduleLabelPass()
          break
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }
})
