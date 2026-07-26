export default defineNuxtConfig({
  devtools: { enabled: false },
  telemetry: false,
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/nanaty-learning-world/',
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
