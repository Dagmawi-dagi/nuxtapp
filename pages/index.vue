<script setup>
import { onMounted,onUpdated } from 'vue'
onMounted(async()=>{
    console.log('asdasdasdasdasd');
})

useHead({
    titleTemplate: 'DALF | HOME',
})

const { data: a,refresh,pending,execute:gettedtd } =  useFetch('/api/test', {
  headers: {
    apiref: '/api/test/GET',
  },
  lazy: true,
  immediate:false
})

</script>
<template>
    <div v-if="!pending">{{ a }}</div>
    <div v-else>pending </div>
    <button @click="refresh">refresh</button>
    <br>
    <button @click="gettedtd">gettests</button>
    
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