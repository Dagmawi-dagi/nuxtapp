<script setup se>
import { SEO_KEYWORDS } from '@/public/SEOkeywords'

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
  keywords: SEO_KEYWORDS().getAllKeywords().join(', ')
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
