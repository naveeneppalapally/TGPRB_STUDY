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

  // Nitro server config
  nitro: {
    // Switch preset based on build environment
    preset: isCFBuild ? 'cloudflare-pages' : 'node-server',

    // cloudflare-pages preset needs nodejs_compat flag set in wrangler.toml.
    // Here we make sure iconify JSON is inlined regardless of preset.
    externals: {
      inline: [/@iconify-json/],
    },

    // Pre-render the homepage and crawl all linked routes.
    // On CF Pages this produces fully-static HTML for all note pages,
    // so they load at edge speed even before a user is authenticated.
    prerender: {
      routes: ['/'],
      crawlLinks: true,
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
    // Nuxt maps NUXT_* variables at runtime, including in Cloudflare Pages.
    vertexProject: process.env.VERTEX_PROJECT || process.env.NUXT_VERTEX_PROJECT || '',
    vertexLocation: process.env.VERTEX_LOCATION || process.env.NUXT_VERTEX_LOCATION || 'global',
    googleServiceAccountJson: process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.NUXT_GOOGLE_SERVICE_ACCOUNT_JSON || '',
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY || '',
    aiModel: process.env.AI_MODEL || process.env.NUXT_AI_MODEL || 'gemini-2.5-flash',
    aiDailyQueryLimit: process.env.AI_DAILY_QUERY_LIMIT ? Number(process.env.AI_DAILY_QUERY_LIMIT) : 20,
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
    },
  },

  vite: {
    optimizeDeps: {
      include: ['ts-fsrs'],
    },
  },

  devtools: { enabled: !isCFBuild },
})
