/**
 * Shared smooth collapse/expand behaviour for arrow-toggled sections
 * (Comprehension Gate, Flashcard Deck). Content fades and the container's
 * height animates to 0 on collapse, and grows back with a matching fade-in
 * on expand - elements below naturally reflow with the transition instead
 * of snapping.
 *
 * Pair with the global `.collapse-enter-active` / `.collapse-leave-active`
 * classes in assets/css/main.css via `<Transition name="collapse">`.
 */
import { ref } from 'vue'

export function useCollapse(initialCollapsed = false) {
  const collapsed = ref(initialCollapsed)

  function toggle() {
    collapsed.value = !collapsed.value
  }

  function collapse() {
    collapsed.value = true
  }

  function expand() {
    collapsed.value = false
  }

  function onBeforeEnter(element: Element) {
    const node = element as HTMLElement
    node.style.height = '0px'
    node.style.opacity = '0'
    node.style.overflow = 'hidden'
    node.style.marginTop = '0px'
    node.style.marginBottom = '0px'
  }

  function onEnter(element: Element, done: () => void) {
    const node = element as HTMLElement
    const targetHeight = node.scrollHeight
    let called = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const finish = () => {
      if (called) return
      called = true
      if (timer) clearTimeout(timer)
      node.removeEventListener('transitionend', finish)
      node.style.height = 'auto'
      node.style.overflow = ''
      done()
    }

    node.addEventListener('transitionend', finish)
    timer = setTimeout(finish, 400)

    requestAnimationFrame(() => {
      node.style.height = `${targetHeight}px`
      node.style.opacity = '1'
      node.style.marginTop = ''
      node.style.marginBottom = ''
    })
  }

  function onBeforeLeave(element: Element) {
    const node = element as HTMLElement
    node.style.height = `${node.offsetHeight}px`
    node.style.overflow = 'hidden'
  }

  function onLeave(element: Element, done: () => void) {
    const node = element as HTMLElement
    let called = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const finish = () => {
      if (called) return
      called = true
      if (timer) clearTimeout(timer)
      node.removeEventListener('transitionend', finish)
      done()
    }

    node.addEventListener('transitionend', finish)
    timer = setTimeout(finish, 400)

    requestAnimationFrame(() => {
      node.style.height = '0px'
      node.style.opacity = '0'
      node.style.marginTop = '0px'
      node.style.marginBottom = '0px'
    })
  }

  return {
    collapsed,
    toggle,
    collapse,
    expand,
    onBeforeEnter,
    onEnter,
    onBeforeLeave,
    onLeave,
  }
}
