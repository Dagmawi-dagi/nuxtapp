<script setup>
const { global_vue_easy_lightbox,any_open_modal } = useUtilStore()
const { onhide } = useLightBox()


</script>

<template>
    <NuxtLoadingIndicator/>
    
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>

    <transition :name="'fadeIn'">
        <ModalBlogPost v-if="any_open_modal.bool && any_open_modal.id === 'blogModal'"  :blog-post="any_open_modal.AnythingTopass"/>
    </transition>

    <transition :name="'fadeIn'">
        <ModalProductShow  v-if="any_open_modal.bool && any_open_modal.id === 'productModal'"  :product-data="any_open_modal.AnythingTopass" />
    </transition>

    <transition :name="'fadeIn'">
        <ModalApplyVacancy  v-if="any_open_modal.bool && any_open_modal.id === 'applyVacancyModal'" :vacancy="any_open_modal.AnythingTopass"/>
    </transition>

    <transition :name="'fadeIn'">
        <DashboardModalUpdateVacancy  v-if="any_open_modal.bool && any_open_modal.id === 'updateVacancy'" />
    </transition>

    <transition :name="'fadeIn'">
        <DashboardModalViewVacancyApplication  v-if="any_open_modal.bool && any_open_modal.id === 'ViewVacancyApplication'" />
    </transition>

    <transition :name="'fadeIn'">
        <DashboardModalUpdateBlog  v-if="any_open_modal.bool && any_open_modal.id === 'updateBlog'" />
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


 
 
 
 
