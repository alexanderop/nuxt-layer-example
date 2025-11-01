// Products Layer Configuration
// https://nuxt.com/docs/guide/going-further/layers

export default defineNuxtConfig({
  // Layer metadata
  $meta: {
    name: 'products',
    description: 'Products feature with catalog, filtering, and sorting',
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
