<script setup>
const { global_vue_easy_lightbox,any_open_modal } = storeToRefs(useUtilStore())
const { onhide } = useLightBox()

const d = ()=>{
    frontEndErrorFeedback().err('new error has been caught')
}
</script>

<template>
    <button @click="d">cliclme</button>
    <NuxtLoadingIndicator/>
    <Topnavs v-if="$route.name != 'ageVerification' "/>
    <div style="min-height: 80vh;" > <NuxtPage/> </div>
    <MyFooter v-if="$route.name != 'ageVerification' "/>
    
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
<style lang="scss">

</style>


 
 
 
 
