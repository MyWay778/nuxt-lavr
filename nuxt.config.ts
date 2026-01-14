// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [],
  runtimeConfig: {
    public: {
      baseApiUrl: 'http://localhost:3001'
    }
  },
  routeRules: {
    '/office/**': { ssr: false }
  },
  vite: {
    server: {
      hmr: false
    }
  }
})
