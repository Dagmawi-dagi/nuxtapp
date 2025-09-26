<script setup>
// assets
import { herosction } from "../public/site_info_ref";
import logo from '@/assets/pictures/Products/alcohol 70.png';
// libs
import gsap from 'gsap';
//vue
import { onMounted } from 'vue'

onMounted(()=>{
    
    gsap.to(".img1",{ scale: "1.5", duration: 1,ease:"linear"}).then((el)=>{
        gsap.to(".img1",{ scale: "1.3", duration: 3,ease:"linear"})
    })

    gsap.to(".img2",{ marginLeft: "54%",  duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img3",{ marginRight: "54%", duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img4",{ marginLeft: "61%",  duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img5",{ marginRight: "61%", duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img6",{ marginLeft: "67%",  duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img7",{ marginRight: "67%", duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img8",{ marginLeft: "72%",  duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img9",{ marginRight: "72%", duration: 2, delay: 1, ease:"linear"})
    gsap.to(".img10",{ marginLeft: "15%", duration: 2, delay: 1, ease:"linear"})
    // stagger effect (fade in one by one)
    gsap.to(".img",{ opacity: 1, duration: 3, delay:1, stagger: .3})
    // the neon light
    const tl = gsap.timeline()
    tl.to(".neon-light",{ width: "450px", duration: 4,ease:"slow" })
    .to(".neon-light",{ top: "20%", duration: 1})
    .to(".neon-light",{ top: "0", duration: 1,ease:"slow" })
    .to(".neon-light",{ top: "40%", duration: 1,ease:"slow" })
})

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
    <div class="hero">
        <!-- Background dots layers -->
        <div class="dots-pattern"></div>
        <div class="continer">
            <section class="info">
                <div class="info__content">
                    <h2 class="info__title">{{ herosction.header }}</h2>
                    <p class="info__subtitle">{{ herosction.subHeader }}</p>
                    <div class="info__buttons">
                        <button @click="scrollToSection('products')" class="btn btn--primary">Explore Our Brand</button>
                        <NuxtLink to="/aboutUs" class="btn btn--secondary">About Us</NuxtLink>
                    </div>
                </div>
            </section>
        </div>

        <div class="container-2">
            <div class="neon-light">
                <div class="light-beam"></div>
                <div class="light-glow"></div>
            </div>
            <img  class="img img1" src="/pictures/Products/vodka.png" alt="pruduct image">
            <img  class="img img2" src="/pictures/Products/uozo.png" alt="pruduct image">
            <img  class="img img3" src="/pictures/Products/gin.png" alt="pruduct image">
            <img  class="img img4" src="/pictures/Products/apple.png" alt="pruduct image">
            <img  class="img img5" src="/pictures/Products/superment.png" alt="pruduct image">
            <img  class="img img6" src="/pictures/Products/coffee.png" alt="pruduct image">
            <img  class="img img7" src="/pictures/Products/aprative.png" alt="pruduct image">
            <img  class="img img8" src="/pictures/Products/lime.png" alt="pruduct image">
            <img  class="img img9" src="/pictures/Products/zebib.png" alt="pruduct image">
            <img  class="img img10" src="/pictures/Products/ananas.png" alt="pruduct image">
        </div>

        <div class="chat" @click="$router.push('/contactUs')">    
            <div class="chat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <button class="chat_btn"> Contact Us</button>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use '/assets/style/heroSection.scss' as *;
</style>