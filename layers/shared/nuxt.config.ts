// Shared Layer Configuration
// https://nuxt.com/docs/guide/going-further/layers

export default defineNuxtConfig({
  // Layer metadata
  $meta: {
    name: 'shared',
    description: 'Shared UI components and utilities',
  },

  // Disable component auto-imports to maintain explicit imports
  components: {
    dirs: [],
  },

  // Disable auto-imports
  imports: {
    autoImport: false,
  },
})
