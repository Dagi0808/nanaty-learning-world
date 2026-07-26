export default defineNuxtConfig({
  devtools: { enabled: false },
  telemetry: false,
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    // On Netlify: deploy at root, no baseURL needed
    // On GitHub Pages: set NUXT_APP_BASE_URL=/nanaty-learning-world/ as env var
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: "Nanaty's Learning World",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A fun learning website for Nanaty' },
      ],
    },
  },
})
