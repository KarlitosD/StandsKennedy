// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    // '@kevinmarrec/nuxt-pwa',
  ],

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    db: {
      url: process.env.DB_URL
    },
    application: {
      url: process.env.APP_URL
    }
  },

  experimental: {
    componentIslands: true,
    watcher: "parcel",
    typedPages: true,
    asyncEntry: true,
    writeEarlyHints: true,
    headNext: true,
  },

  nitro: {
    preset: "bun",
    minify: true,
    experimental: {
      openAPI: true,
    },
    future: {
      nativeSWR: true
    },
    routeRules: {
      "api/qrcode": { 
        headers: { "cache-control": "public, max-age=15552000, inmutable" },
        swr: 60 * 60
      },
      "not-found": { static: true },
      "ranking": { swr: 30 }
    }
  },

  devtools: {
    enabled: true
  },
  // pwa: {
  //   workbox: {
  //     enabled: true
  //   }
  // }
})
