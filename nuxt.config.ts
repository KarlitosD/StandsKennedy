// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    '@vite-pwa/nuxt'
  ],
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    db: {
      url: process.env.DB_URL
    },
  },
})
