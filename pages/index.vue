<script setup>
import { onMounted } from 'vue'
onMounted(()=>{
    console.log('asdasdasdasdasd');
})

useHead({
    titleTemplate: 'DALF | HOME',
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