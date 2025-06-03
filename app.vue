<script setup>
const { global_vue_easy_lightbox,any_open_modal } = storeToRefs(useUtilStore())
const { onhide } = useLightBox()

if (useNuxtApp().isServer) {
  console.log('Running on the server 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💢💢💢')
}
const aa = ()=>{
    if (useNuxtApp().isClient) {
        console.log('Running on the client')
    }
}

</script>

<template>
    <!-- <button @click="aa">click me </button> -->

    <Topnavs/>
    <div style="min-height: 80vh;"> <NuxtPage/> </div>
    <MyFooter/>
    
    <transition :name="'fadeIn'">
        <ModalBlogPost v-if="any_open_modal.bool && any_open_modal.id === 'blogModal'"  :blog-post="any_open_modal.AnythingTopass"/>
    </transition>

    <transition :name="'fadeIn'">
        <ModalProductShow  v-if="any_open_modal.bool && any_open_modal.id === 'productModal'"  :product-data="any_open_modal.AnythingTopass" />
    </transition>

    <transition :name="'fadeIn'">
        <ModalApplyVacancy  v-if="any_open_modal.bool && any_open_modal.id === 'applyVacancyModal'" :vacancy="any_open_modal.AnythingTopass"/>
    </transition>

    <VueEasyLightbox
    :index="global_vue_easy_lightbox.imgIndex" 
    @hide="onhide"
    :maxZoom="4" 
    :scroll-disabled="false" 
    :loop="true" 
    :visible="global_vue_easy_lightbox.display" 
    :imgs="global_vue_easy_lightbox.imgs" 
    />
</template>


 
 
 
 
