<script setup>
definePageMeta({
  layout: "default",   // 👈 use custom layout
  name:"home"
})

</script>
<template>
    <HeroSection/>
    <OurPartners/>
    <ClientOnly>
        <ProductCards/>
    </ClientOnly>
    <HomeAbout/>
    <OurNumbers/>
    <NewsletterSub/>        
</template>
<style>
</style>