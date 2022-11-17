// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        'nuxt-icon'
    ],
    runtimeConfig: {
        adminPassword: process.env.ADMIN_PASSWORD
    }
})
