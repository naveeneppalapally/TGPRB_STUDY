import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config

// CF_PAGES=1 is auto-injected by Cloudflare's build environment.
// Local dev keeps node-server; production builds use cloudflare-pages.
const isCFBuild = !!process.env.CF_PAGES
let cachedManifest: unknown = null

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/supabase',
  ],

  // CSS
  css: ['~/assets/css/main.css'],

  // Nuxt Icon configuration: pre-bundle all heroicons into client bundle to prevent missing icons on edge hosting
  icon: {
    serverBundle: {
      collections: ['heroicons'],
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 1024,
      icons: [
        'heroicons:sun',
        'heroicons:moon',
        'heroicons:arrow-right-on-rectangle',
        'heroicons:bars-3',
        'heroicons:x-mark',
        'heroicons:magnifying-glass',
        'heroicons:bolt',
        'heroicons:bell',
        'heroicons:chevron-left',
        'heroicons:chevron-right',
        'heroicons:chevron-double-left',
        'heroicons:bars-3-bottom-left',
        'heroicons:clipboard-document-check',
        'heroicons:rectangle-stack',
        'heroicons:pencil-square',
        'heroicons:exclamation-triangle',
        'heroicons:question-mark-circle',
        'heroicons:hashtag',
        'heroicons:language',
        'heroicons:check',
        'heroicons:home',
        'heroicons:book-open',
        'heroicons:clock',
        'heroicons:academic-cap',
        'heroicons:archive-box',
        'heroicons:squares-2x2',
        'heroicons:newspaper',
        'heroicons:document-text',
        'heroicons:scale',
        'heroicons:arrow-right',
        'heroicons:chat-bubble-bottom-center-text',
      ],
    },
  },

  // Nitro server config
  nitro: {
    // Switch preset based on build environment
    preset: isCFBuild ? 'cloudflare-pages' : 'node-server',

    // cloudflare-pages preset needs nodejs_compat flag set in wrangler.toml.
    // Here we make sure iconify JSON is inlined regardless of preset.
    externals: {
      inline: [/@iconify-json/],
    },

    // Pre-render active notes and subject hubs statically.
    // Explicit routes array avoids slow recursive crawling and V8 heap limits.
    prerender: {
      routes: [
        '/',
        '/notes/polity',
        '/notes/polity/historical-background-1773-1947',
        '/notes/polity/making-of-the-constitution',
        '/notes/geography',
        '/notes/geography/drainage-system-of-india',
        '/notes/geography/dams-in-india',
        '/notes/geography/mountains-in-india',
        '/notes/geography/forests-in-india',
        '/notes/geography/irrigation-in-india',
        '/notes/telangana',
        '/notes/telangana/telangana-statehood-movement',
        '/pyq-archive',
        '/study/parliament',
        '/api/study/parliament',
        '/study/historical-background-1773-1947',
        '/api/study/historical-background-1773-1947',
        '/study/making-of-the-constitution',
        '/api/study/making-of-the-constitution',
      ],
      crawlLinks: false,
    },
  },

  routeRules: {
    '/notes/polity/constitutional-framework-and-preamble': {
      redirect: { to: '/notes/polity/historical-background-1773-1947', statusCode: 301 },
    },
    '/api/**': {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    },
  },

  // Supabase module config.
  // Real credentials go in .env (never committed).
  // Placeholders prevent hard-crash during local dev without .env.
  supabase: {
    url: process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
    key: process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key',
    serviceKey: process.env.SUPABASE_SERVICE_KEY || 'placeholder-service-key',
    redirect: false,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      include: ['/review(.*)', '/api/review(.*)', '/api/gate(.*)'],
      exclude: ['/', '/notes(.*)', '/pyq(.*)'],
      cookieRedirect: false,
    },
  },

  // Runtime config - server-side secrets (real values come from .env / CF env vars)
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
      // R2 public base URL - used by useMedia() composable to resolve r2:// paths
      r2PublicUrl: process.env.R2_PUBLIC_URL || '',
    },
  },

  // Content module config
  content: {
    // Collection definitions live in content.config.ts
  },

  // App-level head tags
  app: {
    head: {
      title: 'TSLPRB StudyOS',
      meta: [
        { name: 'description', content: 'Spaced-repetition study system for TSLPRB Constable/SI exam prep' },
        { name: 'robots', content: 'noindex, nofollow' }, // unlisted until exam release
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700&family=Patrick+Hand&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ['ts-fsrs'],
    },
    build: {
      manifest: 'manifest.json',
    },
  },

  hooks: {
    'build:manifest': (manifest) => {
      cachedManifest = manifest
      try {
        const clientDist = resolve('.nuxt/dist/client')
        if (!existsSync(clientDist)) {
          mkdirSync(clientDist, { recursive: true })
        }
        writeFileSync(resolve(clientDist, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8')
      } catch {
        // Safe fallback if client directory not yet available
      }
    },
    'vite:compiled': () => {
      try {
        const clientDist = resolve('.nuxt/dist/client')
        const manifestPath = resolve(clientDist, 'manifest.json')
        const dotViteManifest = resolve(clientDist, '.vite/manifest.json')
        if (!existsSync(clientDist)) {
          mkdirSync(clientDist, { recursive: true })
        }
        if (!existsSync(manifestPath)) {
          if (existsSync(dotViteManifest)) {
            copyFileSync(dotViteManifest, manifestPath)
          } else if (cachedManifest) {
            writeFileSync(manifestPath, JSON.stringify(cachedManifest, null, 2), 'utf-8')
          }
        }
      } catch {
        // Safe fallback
      }
    },
    'nitro:build:before': () => {
      try {
        const clientDist = resolve('.nuxt/dist/client')
        const manifestPath = resolve(clientDist, 'manifest.json')
        const dotViteManifest = resolve(clientDist, '.vite/manifest.json')
        if (!existsSync(clientDist)) {
          mkdirSync(clientDist, { recursive: true })
        }
        if (!existsSync(manifestPath)) {
          if (existsSync(dotViteManifest)) {
            copyFileSync(dotViteManifest, manifestPath)
          } else if (cachedManifest) {
            writeFileSync(manifestPath, JSON.stringify(cachedManifest, null, 2), 'utf-8')
          }
        }
      } catch {
        // Safe fallback
      }
    },
  },

  experimental: {
    appManifest: false,
  },

  devtools: { enabled: !isCFBuild },
})
