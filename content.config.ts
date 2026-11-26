import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Study notes collection - static topic notes markdown
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['current-affairs/**'],
      },
    }),
  },
})
