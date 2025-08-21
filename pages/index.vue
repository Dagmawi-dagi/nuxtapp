<script setup>
import { onMounted,onUpdated } from 'vue'
onMounted(async()=>{
    console.log('asdasdasdasdasd');
})

useHead({
    titleTemplate: 'DALF | HOME',
})

    const a = ref()
    const get = async()=>{
        const data = await $fetch('/api/test')
        a.value = data
        console.log(data)
    }
</script>
<template>
    <button @click="get">sdasdasdasd</button>
    {{ a }}
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