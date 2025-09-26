<script setup>
definePageMeta({
  layout: "default",   // 👈 use custom layout
  name:"home"
})

</script>
<template>
    <!-- <button @click="$router.push('/dashboard')">das</button>
    <button @click="$router.push('/dashboard/auth')">log</button> -->
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