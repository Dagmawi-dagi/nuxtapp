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
  },
  app: {
    head: {
      title: 'DESTA ALCOHOL & LIQUOR FACTORY PLC',
      meta: [
        // Global SEO defaults
        { name: 'author', content: 'DESTA ALCOHOL & LIQUOR FACTORY PLC' },
        // { name: 'robots', content: 'index, follow' },  // allow crawling

        // Open Graph (site-wide) LinkedIn, Twitter, WhatsApp, Slack, Telegram and more when your link is shared. They control how your page looks in link previews
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.destaalcohol.et/' },
        { property: 'og:title', content: 'DESTA ALCOHOL & LIQUOR FACTORY PLC' },
        { property: 'og:description', content: 'Welcome to DESTA ALCOHOL & LIQUOR FACTORY PLC – Discover the Art of Distilling Excellence.\n EVERY STEP IS METICULOUSLY CRAFTED TO BRING YOU UNPARALLELED QUALITY AND FLAVOR!.' },
        { property: 'og:image', content: 'https://www.destaalcohol.et/pictures/desta-logo.png' },

        // Twitter (site-wide)
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://www.destaalcohol.et/' },
        { name: 'twitter:title', content: 'DESTA ALCOHOL & LIQUOR FACTORY PLC' },
        { name: 'twitter:description', content: 'Welcome to DESTA ALCOHOL & LIQUOR FACTORY PLC – Discover the Art of Distilling Excellence.\n EVERY STEP IS METICULOUSLY CRAFTED TO BRING YOU UNPARALLELED QUALITY AND FLAVOR!.' },
        { name: 'twitter:image', content: 'https://www.destaalcohol.et/pictures/desta-logo.png' },

        // Mobile / PWA
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'theme-color', content: '#0BA6DF' }
      ],
      link: [
        // Canonical (site-wide)
        { rel: 'canonical', href: 'https://www.destaalcohol.et/' },

        // Favicons
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' } // Special icon for iOS devices
      ],
      script: [
        {
          key:'ld-org',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
            "url": "https://www.destaalcohol.et/",
            "logo": "https://www.destaalcohol.et/pictures/desta-logo.png",
            "sameAs": [
              "https://www.facebook.com/destaalcohol",
              "https://www.twitter.com/destaalcohol",
              "https://www.linkedin.com/company/destaalcohol",
              "https://www.instagram.com/destaalcohol"
            ]
          })
        } as any
      ],
      
    }
  }

})

  