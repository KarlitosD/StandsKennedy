// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@kevinmarrec/nuxt-pwa",
  ],
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    db: {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
    },
  },
  pwa: {
    workbox: {
      enabled: true
    }
  }
});
