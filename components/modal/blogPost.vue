<script setup>
import { format } from 'date-fns';

defineProps({
    blogPost : Object,
})

const { show_global_vueEasyLightbox } = useLightBox()

const showimg = (imgRef,isArr,index)=>{
    let  imges = imgRef
    show_global_vueEasyLightbox(isArr ? null : imges, isArr ? imges:null , isArr ? index : 0)
}
</script>

<template>
    <Overlay>
        <div class="container">
            <div class="header-image-container" @click.stop="showimg(`/blog/${blogPost?.coverImg}`,false,0)">
                    <!-- Background dots layers -->
                    <div class="dots-pattern"></div>
                    <img class="header-image"  :src="`/blog/${blogPost?.coverImg}`" alt="blog cover image" >
                <div class="cat"> 
                    <span v-for="cat in blogPost.category">{{ cat }}</span>
                </div>
                <img src="/public/pictures/desta-logo.png" alt="logo" class="author-image">
            </div>
            <div class="content">
                <div class="date">{{  format(new Date(blogPost.createdAt), 'MMMM dd,yyyy') }} </div>
                <h3 class="blog-title">{{ blogPost.title }}</h3>
                <!-- <h3 class="blog-title">Celebrating 25 Years of Success: A Milestone of Growth and Gratitude</h3> -->
                <div class="blog-content">
                    <div  class="quill-html-content" v-html="`${blogPost.content}`"> </div>
                </div>
            </div>
        </div>
    </Overlay>
</template>

<style lang="scss" scoped>
@use "@/assets/style/variables" as *;
@use "@/assets/style/global.scss" as *;

.emoji {
    position: absolute;
    top: 40px;
    z-index: 99999999;
}

/* Container */
.container {
    max-width: 800px;
    width: 800px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

/* Header image container */
.header-image-container {
    position: relative;
    width: 100%;
}

/* Category badge as ::before pseudo-element using data attribute */
.cat {
    position: absolute;
    bottom: -12px;
    left: 20px;
    z-index: 2;
    display: flex;
    gap: 10px;
    span{
        background-color: #0095ff;
        color: white;
        padding: 5px 15px;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 500;
    }
}

/* Header image */

.header-image-container{
    background: radial-gradient(circle at 50% 50%, #0072b8, #152a4a 130%);
    
    // Dots pattern
    .dots-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(circle, $text-blue, 1px, transparent 1px);
        background-size: 16px 16px;
        opacity: .09;
        pointer-events: none;
    }
}
.header-image {
    width: 100%;
    max-height: 400px;
    min-height: 300px;
    object-fit: cover;
    display: block;
    color: #fff;
}

.content {
    padding: 20px;
}

.author-image {
    position: absolute;
    bottom: -35px;
    right: 20px;
    z-index: 2;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
}
.reaction-icon{
    width: 20px;
}
/* Social stats */
.social-stats {
    display: flex;
    gap: 15px;
    color: #666;
    margin-bottom: 25px;
    margin-top: 10px;
}

.stat {
    display: flex;
    align-items: center;
}

.stat-icon {
    margin-right: 5px;
    color: #555;
}

/* Blog title */
.blog-title {
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 1.3;
}

/* Date */
.date {
    color: #777;
    margin-bottom: 10px;
}

/* Blog content */
.blog-content {
    font-size: 16px;
    color: #444;
    line-height: 1.7;
}

.blog-content p {
    margin-bottom: 15px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .container {
        border-radius: 0;
        box-shadow: none;
    }

    .header-image {
       max-height: 400px;
    }

    .header-image-container::before {
        bottom: 15px;
        left: 15px;
        font-size: 12px;
        padding: 4px 12px;
    }
}

@media (max-width: 480px) {

    .social-stats {
        flex-wrap: wrap;
        gap: 10px;
    }

    .author-image {
        width: 40px;
        height: 40px;
    }
}
</style>
