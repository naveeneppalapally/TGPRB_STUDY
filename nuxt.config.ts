import topics from './data/topics_master.json'
import { contentRoutes } from './utils/topic-delivery'

// https://nuxt.com/docs/api/configuration/nuxt-config

// CF_PAGES=1 is auto-injected by Cloudflare's build environment.
// Local dev keeps node-server; production builds use cloudflare-pages.
const isCFBuild = !!process.env.CF_PAGES

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
        'heroicons:user-plus',
        'heroicons:trophy',
        'heroicons:flag',
        'heroicons:shield-check',
        'heroicons:banknotes',
        'heroicons:globe-alt',
        'heroicons:beaker',
        'heroicons:gift',
        'heroicons:map-pin',
        'heroicons:map',
        'heroicons:building-library',
        'heroicons:ellipsis-horizontal',
        'heroicons:play-solid',
        'heroicons:minus-small',
        'heroicons:chevron-double-right',
      ],
    },
  },

  // Nitro server config
  nitro: {
    // Switch preset based on build environment
    preset: isCFBuild ? 'cloudflare-pages' : 'node-server',
    // The prerenderer uses a Node preset. Bind its public directory to this
    // build too, so an earlier Node build cannot shadow the Cloudflare HTML.
    output: { publicDir: isCFBuild ? 'dist' : '.output/public' },

    // cloudflare-pages preset needs nodejs_compat flag set in wrangler.toml.
    // Here we make sure iconify JSON is inlined regardless of preset.
    externals: {
      inline: [/@iconify-json/],
    },

    // Pre-render active notes and subject hubs statically.
    // Explicit routes array avoids slow recursive crawling and V8 heap limits.
    prerender: {
      routes: contentRoutes(topics),
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
    },
  },

  // Content module config
  content: {
    // Collection definitions live in content.config.ts
  },

  // App-level head tags
  app: {
    head: {
      title: 'BeatBook - Police SI & Constable OS',
      meta: [
        { name: 'description', content: 'Spaced-repetition study system for Telangana Police SI & Constable exam prep' },
        { name: 'robots', content: 'noindex, nofollow' }, // unlisted until exam release
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
      rollupOptions: {
        output: {
          manualChunks: (id) => id.includes('/@supabase/') ? 'supabase' : undefined,
        },
      },
    },
  },

  experimental: {
    appManifest: false,
  },

  devtools: { enabled: !isCFBuild },
})
