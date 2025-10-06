<script setup se>
import { SEO_KEYWORDS } from '@/public/SEOkeywords'
import { products } from '@/public/site_info_ref'

definePageMeta({
  layout: "default",   
  name: "home"
})

// Use `useSeoMeta` for common SEO tags
useSeoMeta({
  title: "Home - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  description: "Welcome to DESTA ALCOHOL & LIQUOR FACTORY PLC – Discover the Art of Distilling Excellence.\n EVERY STEP IS METICULOUSLY CRAFTED TO BRING YOU UNPARALLELED QUALITY AND FLAVOR!",
  ogTitle: "Home - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  ogDescription: "Welcome to DESTA ALCOHOL & LIQUOR FACTORY PLC – Discover the Art of Distilling Excellence.\n EVERY STEP IS METICULOUSLY CRAFTED TO BRING YOU UNPARALLELED QUALITY AND FLAVOR!",
  ogUrl: "https://www.destaalcohol.et/",
  ogImage: "https://www.destaalcohol.et/pictures/desta-logo.png",
  twitterCard: "summary_large_image",
  robots: 'index, follow',
  keywords: [
    ...SEO_KEYWORDS().getAllKeywords(),
    ...products.map(p => p.name) // dynamically include product names
  ].join(', ')
})
useHead({
  meta: [
    { name:"google-site-verification", content:"BYpoZQV2gmyX_kvcuQC-KjO9tBV9d6euznqamJLxCDA" },
  ],
  script:[
    {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Desta Alcohol & Liquor Factory PLC",
            "url": "https://www.destaalcohol.et/",
            "logo": "https://www.destaalcohol.et/pictures/desta-logo.png",
            "sameAs": [
              "https://www.facebook.com/...",
              "https://www.instagram.com/...",
              "https://twitter.com/..."
            ],
            "brand": products.map(p => ({
              "@type": "Product",
              "name": p.name,
              "image": `https://www.destaalcohol.et/pictures/${p.img}`,
              "description": p.description,
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "ETB"
              }
            }))
          })
        }
  ]
})

</script>

<template>
  <HeroSection />
  <OurPartners />
  <ClientOnly>
    <ProductCards />
  </ClientOnly>
  <HomeAbout />
  <OurNumbers />
  <NewsletterSub />        
</template>
