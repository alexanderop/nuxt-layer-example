// Cart Layer Configuration
// https://nuxt.com/docs/guide/going-further/layers

export default defineNuxtConfig({
  // Layer metadata
  $meta: {
    name: 'cart',
    description: 'Shopping cart feature with persistence and calculations',
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
