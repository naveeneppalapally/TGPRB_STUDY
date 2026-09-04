import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Notes collection - study content
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['current-affairs/**'],
      },
    }),
    // Current affairs linked to study notes
    current_affair: defineCollection({
      type: 'page',
      source: 'current-affairs/**/*.md',
    }),
  },
})
