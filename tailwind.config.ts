import type { Config } from 'tailwindcss'

/**
 * TGPRB StudyOS - design system foundation
 * ─────────────────────────────────────────
 * Palette intent:
 *   saffron  signature accent (marigold - TG police exam identity)
 *   jade     mastery / correct / passed gates
 *   ink      warm near-black surfaces for dark mode
 *   stone    (via app.config `gray`) warm neutral for both modes
 *
 * `surface`, `accent`, `success`, `danger`, `info` are kept as aliases so
 * older components (GateQuiz, FlashcardReview, DrainageMap) keep compiling.
 */
export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './app.config.ts',
    './content/**/*.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Noto Sans Telugu"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', '"Noto Sans Telugu"', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        hand: ['"Patrick Hand"', 'cursive', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      fontSize: {
        'h1': ['calc(30px * var(--scale-heading))', '1.1'],
        'h1-sm': ['calc(40px * var(--scale-heading))', '1.1'],
        'h2': ['calc(22px * var(--scale-heading))', '1.2'],
        'h3': ['calc(15px * var(--scale-subheading))', '1.4'],
        'h4': ['calc(14px * var(--scale-subheading))', '1.5'],
        'body': ['calc(14px * var(--scale-base))', '1.6'],
        'body-sm': ['calc(13px * var(--scale-base))', '1.5'],
        'body-xs': ['calc(11.5px * var(--scale-base))', '1.5'],
      },
      colors: {
        // Signature marigold - primary (set in app.config.ts)
        saffron: {
          '50':  '#fdf9eb',
          '100': '#f9efc7',
          '200': '#f3dd8d',
          '300': '#ecc555',
          '400': '#e5ad31',
          '500': '#cd8a14',
          '600': '#b26a0e',
          '700': '#8f4d0f',
          '800': '#773e13',
          '900': '#653313',
          '950': '#3b1a07',
        },
        // Mastery / success
        jade: {
          '50':  '#effaf4',
          '100': '#d7f2e3',
          '200': '#b2e4cb',
          '300': '#7fd0ab',
          '400': '#4ab488',
          '500': '#27986d',
          '600': '#187a57',
          '700': '#146247',
          '800': '#124e3a',
          '900': '#104031',
          '950': '#08241b',
        },
        // Warm near-black - dark-mode surfaces
        ink: {
          '50':  '#f6f5f2',
          '100': '#e8e6e1',
          '200': '#d0ccc3',
          '300': '#b1ab9e',
          '400': '#8f897a',
          '500': '#726c5e',
          '600': '#5a5549',
          '700': '#47443b',
          '800': '#2b2924',
          '900': '#1a1915',
          '950': '#100f0c',
        },
        // ── Legacy aliases (older components still reference these) ──
        surface: {
          '50':  '#f6f5f2',
          '100': '#e8e6e1',
          '200': '#d0ccc3',
          '300': '#b1ab9e',
          '400': '#8f897a',
          '500': '#726c5e',
          '600': '#5a5549',
          '700': '#47443b',
          '800': '#2b2924',
          '900': '#1a1915',
          '950': '#100f0c',
        },
        accent: {
          '50':  '#fdf9eb',
          '100': '#f9efc7',
          '200': '#f3dd8d',
          '300': '#ecc555',
          '400': '#e5ad31',
          '500': '#cd8a14',
          '600': '#b26a0e',
          '700': '#8f4d0f',
          '800': '#773e13',
          '900': '#653313',
        },
        success: { '400': '#4ab488', '500': '#27986d', '600': '#187a57' },
        danger:  { '400': '#f87171', '500': '#ef4444', '600': '#dc2626' },
        info:    { '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb' },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'glow-accent': '0 0 24px rgba(229, 173, 49, 0.16)',
        'glow-success': '0 0 24px rgba(74, 180, 136, 0.16)',
        'card': '0 1px 2px rgba(16, 15, 12, 0.05)',
        'card-hover': '0 4px 16px rgba(16, 15, 12, 0.10)',
        'pop': '0 12px 40px -12px rgba(16, 15, 12, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'rise': 'rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
