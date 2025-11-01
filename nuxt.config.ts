// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Disable component auto-imports
  components: {
    dirs: []
  },

  devtools: { enabled: true },

  // Disable all auto-imports
  imports: {
    autoImport: false
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt'
  ]
})