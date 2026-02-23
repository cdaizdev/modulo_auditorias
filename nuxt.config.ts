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
      checkProb: process.env.NUXT_PUBLIC_CHECK_PROBABILITY || "0.5",
      checkDelay: process.env.NUXT_PUBLIC_CHECK_DELAY || "1000",
      maxLatency: process.env.NUXT_PUBLIC_NETWORK_MAX_LATENCY || "1200",
      minLatency: process.env.NUXT_PUBLIC_NETWORK_MIN_LATENCY || "300",
      netErrorprob: process.env.NUXT_PUBLIC_NETWORK_ERROR_PROBABILITY || "0.15"
    }
  }
})