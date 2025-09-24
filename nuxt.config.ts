// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@vueuse/nuxt', '@pinia/nuxt', 'nuxt-easy-lightbox','@vueform/nuxt','maz-ui/nuxt'],
  css: ['@/assets/style/global.scss'],
  mazUi: {
    injectComponents: true,
    injectCss: true,
    injectAos: {
      injectCss: true,
    },
    injectUseToast: true,
    injectUseThemeHandler: true,
    devtools: true,
  },
  runtimeConfig:{
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000', // default for dev
    },
  }
})