<script setup>
definePageMeta({
  layout: "default",   // 👈 use custom layout
  name:"home"
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
    <button @click="$router.push('/dashboard')">das</button>
    <button @click="$router.push('/dashboard/auth')">log</button>
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