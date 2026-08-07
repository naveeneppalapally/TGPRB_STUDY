export default defineNuxtPlugin(() => {
  // Apply font size scaling before first paint from localStorage
  if (import.meta.client) {
    const scaleMap: Record<string, string> = {
      small:   '0.875',
      default: '1',
      large:   '1.125',
    }

    const heading = localStorage.getItem('studyos-scale-heading') || 'default'
    const subheading = localStorage.getItem('studyos-scale-subheading') || 'default'
    const base = localStorage.getItem('studyos-scale-base') || 'default'

    document.documentElement.style.setProperty('--scale-heading', scaleMap[heading] ?? '1')
    document.documentElement.style.setProperty('--scale-subheading', scaleMap[subheading] ?? '1')
    document.documentElement.style.setProperty('--scale-base', scaleMap[base] ?? '1')
  }
})
