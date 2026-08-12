/**
 * Single source of truth for the 12 PYQ-proven current-affairs categories.
 * Shared by CACard.vue (badge styling) and pages/current-affairs.vue (filter
 * chips + category breakdown), so labels/colors/icons never drift apart.
 *
 * Category set and PYQ weightage source: docs/current-affairs-audit.md.
 */

export interface CACategoryMeta {
  id: string
  label: string
  icon: string
  colorClass: string
}

export const CA_CATEGORIES: CACategoryMeta[] = [
  {
    id: 'appointments',
    label: 'Appointments',
    icon: 'i-heroicons-user-plus',
    colorClass: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30',
  },
  {
    id: 'awards',
    label: 'Awards',
    icon: 'i-heroicons-trophy',
    colorClass: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30',
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: 'i-heroicons-flag',
    colorClass: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
  },
  {
    id: 'telangana',
    label: 'Telangana Focus',
    icon: 'i-heroicons-map-pin',
    colorClass: 'text-saffron-700 bg-saffron-100 dark:text-saffron-300 dark:bg-saffron-900/30',
  },
  {
    id: 'defence',
    label: 'Defence',
    icon: 'i-heroicons-shield-check',
    colorClass: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
  },
  {
    id: 'economy',
    label: 'Economy',
    icon: 'i-heroicons-banknotes',
    colorClass: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30',
  },
  {
    id: 'international',
    label: 'International',
    icon: 'i-heroicons-globe-alt',
    colorClass: 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
  },
  {
    id: 'judiciary',
    label: 'Judiciary',
    icon: 'i-heroicons-scale',
    colorClass: 'text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30',
  },
  {
    id: 'science',
    label: 'Science',
    icon: 'i-heroicons-beaker',
    colorClass: 'text-cyan-700 bg-cyan-100 dark:text-cyan-300 dark:bg-cyan-900/30',
  },
  {
    id: 'environment',
    label: 'Environment',
    icon: 'i-heroicons-sun',
    colorClass: 'text-lime-700 bg-lime-100 dark:text-lime-300 dark:bg-lime-900/30',
  },
  {
    id: 'books',
    label: 'Books',
    icon: 'i-heroicons-book-open',
    colorClass: 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/30',
  },
  {
    id: 'schemes',
    label: 'Schemes',
    icon: 'i-heroicons-gift',
    colorClass: 'text-teal-700 bg-teal-100 dark:text-teal-300 dark:bg-teal-900/30',
  },
]

const FALLBACK: CACategoryMeta = {
  id: 'general',
  label: 'General',
  icon: 'i-heroicons-newspaper',
  colorClass: 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800',
}

export function useCACategories() {
  function getCategoryMeta(id?: string | null): CACategoryMeta {
    const key = (id || '').toLowerCase()
    const found = CA_CATEGORIES.find(c => c.id === key)
    if (found) return found
    if (!key) return FALLBACK
    return { ...FALLBACK, id: key, label: key.charAt(0).toUpperCase() + key.slice(1) }
  }

  return { categories: CA_CATEGORIES, getCategoryMeta }
}
