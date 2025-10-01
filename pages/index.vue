<script setup se>
definePageMeta({
  layout: "default",   
  name: "home"
})

// Use `useSeoMeta` for common SEO tags
useSeoMeta({
  title: "Home - DESTA ALCOHOL & LIQUOR PLC",
  description: "Welcome to DESTA ALCOHOL & LIQUOR PLC – Discover the Art of Distilling Excellence.\n EVERY STEP IS METICULOUSLY CRAFTED TO BRING YOU UNPARALLELED QUALITY AND FLAVOR!",
  ogTitle: "Home - DESTA ALCOHOL & LIQUOR PLC",
  ogDescription: "Welcome to DESTA ALCOHOL & LIQUOR PLC – Discover the Art of Distilling Excellence.\n EVERY STEP IS METICULOUSLY CRAFTED TO BRING YOU UNPARALLELED QUALITY AND FLAVOR!",
  ogUrl: "https://www.destaalcohol.et/",
  ogImage: "https://www.destaalcohol.et/og-image.jpg",
  twitterCard: "summary_large_image"
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
