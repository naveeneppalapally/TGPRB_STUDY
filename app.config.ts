/**
 * TGPRB StudyOS - Nuxt UI v2 theme
 * ─────────────────────────────────
 * `saffron`, `jade` and `ink` ramps live in tailwind.config.ts.
 * Anything component-shaped that Nuxt UI can express globally lives here;
 * raw design tokens (surfaces, hairlines, text) live in assets/css/main.css.
 */
export default defineAppConfig({
  ui: {
    primary: 'saffron',
    gray: 'stone',

    notifications: {
      position: 'top-0 bottom-auto',
    },

    button: {
      rounded: 'rounded-lg',
      font: 'font-semibold tracking-[-0.01em]',
      default: {
        color: 'primary',
        variant: 'solid',
        size: 'md',
      },
    },

    badge: {
      rounded: 'rounded-md',
      font: 'font-medium',
    },

    card: {
      base: 'overflow-hidden',
      background: 'bg-white dark:bg-ink-900',
      divide: 'divide-y divide-stone-200 dark:divide-stone-800',
      ring: 'ring-1 ring-stone-900/[0.07] dark:ring-white/[0.07]',
      rounded: 'rounded-xl',
      shadow: 'shadow-none',
      header: {
        padding: 'px-5 py-4 sm:px-6',
      },
      body: {
        padding: 'p-5 sm:p-6',
      },
      footer: {
        padding: 'px-5 py-4 sm:px-6',
      },
    },

    alert: {
      rounded: 'rounded-lg',
      title: 'text-sm font-semibold',
      description: 'text-[13px] leading-relaxed',
    },

    verticalNavigation: {
      wrapper: 'relative space-y-0.5',
      base: [
        'group relative flex items-center gap-2.5 -ms-px border-s-2 border-transparent',
        'focus:outline-none focus-visible:bg-stone-500/10 dark:focus-visible:bg-white/10',
        'disabled:cursor-not-allowed disabled:opacity-50',
      ].join(' '),
      ring: '',
      padding: 'px-3 py-[7px]',
      width: 'w-full',
      rounded: 'rounded-r-lg',
      font: 'font-medium',
      size: 'text-[13px]',
      active: 'border-saffron-500 text-stone-900 dark:text-stone-50 bg-saffron-500/[0.09] dark:bg-saffron-400/[0.09]',
      inactive: 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-500/[0.06] dark:hover:bg-white/[0.05]',
      label: 'truncate relative',
      icon: {
        base: 'h-4 w-4 flex-shrink-0 text-stone-400 dark:text-stone-500 transition-colors',
        active: 'text-saffron-600 dark:text-saffron-400',
        inactive: 'group-hover:text-stone-600 dark:group-hover:text-stone-300',
      },
      badge: {
        base: 'ms-auto',
        color: 'gray',
        variant: 'subtle',
        size: 'xs',
      },
    },

    commandPalette: {
      group: {
        label: 'px-2.5 pb-1.5 pt-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500',
        command: {
          base: 'rounded-lg',
          active: 'bg-stone-100 dark:bg-white/[0.06] text-stone-900 dark:text-stone-50',
          inactive: 'text-stone-600 dark:text-stone-300',
          label: 'text-[13px]',
          icon: {
            base: 'h-4 w-4 text-stone-400 dark:text-stone-500',
            active: 'text-saffron-600 dark:text-saffron-400',
            inactive: '',
          },
        },
      },
      default: {
        icon: 'i-heroicons-magnifying-glass-20-solid',
        selectedIcon: 'i-heroicons-check-20-solid',
        emptyState: {
          icon: 'i-heroicons-magnifying-glass',
          label: 'Nothing found',
          queryLabel: 'No matches for',
        },
      },
    },

    modal: {
      width: 'w-full sm:max-w-xl',
      background: 'bg-white dark:bg-ink-900',
      ring: 'ring-1 ring-stone-900/10 dark:ring-white/10',
      rounded: 'rounded-2xl',
      shadow: 'shadow-pop',
      overlay: {
        background: 'bg-ink-950/60 backdrop-blur-sm',
      },
    },

    kbd: {
      base: 'font-mono font-medium',
      padding: 'px-1.5',
      size: {
        xs: 'text-[10px]',
        sm: 'text-[11px]',
        md: 'text-xs',
        lg: 'text-sm',
      },
      rounded: 'rounded',
      background: 'bg-stone-100 dark:bg-white/[0.07]',
      ring: 'ring-1 ring-inset ring-stone-900/10 dark:ring-white/10',
    },

    tooltip: {
      background: 'bg-ink-950 dark:bg-ink-700',
      color: 'text-stone-100',
      rounded: 'rounded-md',
      font: 'font-medium',
    },

    divider: {
      border: {
        base: 'border-stone-900/[0.08] dark:border-white/[0.08]',
      },
    },
  },
})
