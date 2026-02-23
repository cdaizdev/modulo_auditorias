// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      auditProb: process.env.NUXT_PUBLIC_AUDIT_PROBABILITY || 0.5,
      auditDelay: process.env.NUXT_PUBLIC_AUDIT_DELAY || 1000,
    }
  }
})