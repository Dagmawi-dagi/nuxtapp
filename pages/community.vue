<script setup>
// assets
import { communityImages } from '@/public/site_info_ref'
// libs
import gsap from 'gsap';

const { show_global_vueEasyLightbox } = useLightBox()
const showimg = (imgRef,isArr,index)=>{
    let imges;
    if(isArr) imges =  imgRef.map(i=>{ return new URL(`../assets/pictures/community/${i}`, import.meta.url).href })
    else imges = new URL(`../assets/pictures/community/${imgRef}`, import.meta.url).href
    show_global_vueEasyLightbox(isArr ? null : imges, isArr ? imges:null , isArr ? index : 0)
}

onMounted(()=>{
    const observer = new IntersectionObserver(function(entries,self){
        // get an array of vissible elemets
        let targets = entries.map(entry=>{
            if( entry.isIntersecting ){ 
                self.unobserve(entry.target); // Stop observing once visible
                return entry.target
            }
        })
        // filter the undefined values
        targets = targets.filter(tar=>{ return tar != undefined })
        // if the intersecting targets are [] Dont run the gsap animation cus there are no elements to animate
        if (targets.length < 1) return
        const tl = gsap.timeline();

        tl.from(targets,{duration:.0001})
        .from( targets.map(target => target.querySelector('.community-image')).filter(img => img !== null), { // Animate child elements
            opacity: 0,
            x: (a,el) =>{  
                if( getComputedStyle(el.parentElement).flexDirection === 'row-reverse') return "100%"
                else return "-100%"
            },
            duration: .6,
        })
        .from( targets.map(target => target.querySelector('.community-content')).filter(content => content !== null), { // Animate child elements
            opacity: 0,
            x: (a,el) =>{  
                if( getComputedStyle(el.parentElement).flexDirection === 'row-reverse') return "-100%"
                else return "100%"
            }, 
            duration: .6,
            delay:.3
        },"<");
    })
    document.querySelectorAll('.community-item').forEach(el => observer.observe(el));
})

const getImageUrl = (imgName) => {
return new URL(`../assets/pictures/community/${imgName}`, import.meta.url).href
}


</script>

<template>
    <div class="container">
        <h3 style="text-align: center; font-weight: 500; margin: 2rem 0 3rem;">Community</h3>
        <div class="community-grid">

            <!-- Sport -->
            <article class="community-item" >
                <div class="community-image" >
                    <img @click="showimg(communityImages.sport.map(spo=> spo.img),true,0)" src="/assets/pictures/community/test.jpg" style="width: 100%; object-fit: cover; cursor: pointer;" >
                    <MazCarousel class="MazCarouselContainer" hideScrollbar>
                        <img  v-for="(data, i) in communityImages.sport" :key="i"  class="tambnail-image"
                            :src="getImageUrl(data.img)" 
                            @click="showimg(communityImages.sport.map(d=> d.img),true,i)"
                            >
                    </MazCarousel>
                </div>
                <div class="community-content">
                    <h2 class="community-title">Community Sport</h2>
                    <p class="community-text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, repellendus dicta sapiente quas maxime recusandae corrupti velit praesentium laborum eius minima asperiores dolorum distinctio quod debitis aperiam reiciendis reprehenderit, temporibus pariatur, ipsa neque earum assumenda? Ab deserunt animi dolores, eos non minima quisquam voluptatum neque consectetur! Eius eligendi inventore sint.
                    </p>
                </div>
            </article> 

            <!-- other community work -->
            <article class="community-item" v-for="(data,i) in communityImages.others" :key="i" >
                <img loading="lazy" class="community-image" @click="showimg(data.img,false,0)" :src="getImageUrl(data.img)">
                <div class="community-content">
                    <h2 class="community-title">7 LEVELS OF community</h2>
                    <p class="community-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis velit quae inventore officia hic sed libero doloribus aliquam nostrum? Dicta quae placeat at repellat quod, soluta explicabo nemo reiciendis, a quisquam tenetur, dolor dolore? Laboriosam soluta quaerat explicabo architecto commodi itaque obcaecati, accusantium aut aperiam eum voluptatibus blanditiis rerum inventore.
                    </p>
                </div>
            </article>
        </div>

        <newsletterSub/>

    </div>
</template>

<style scoped lang="scss">
.MazCarouselContainer{
    margin-top: 10px;
    &:deep(.m-btn.m-reset-css.--is-button.m-carousel__btn){
        width: 1.5rem;
        min-height: 1rem !important;
    }
}

.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.community-grid {
    display: grid;
    gap: 4rem 2rem;
    grid-template-columns: 1fr;
    margin-bottom: 4rem !important;
}

.community-item {
    display: flex;
    gap: 2rem;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.community-content {
    padding: 2rem;
    flex: 1;
}

.community-image {
    width: 50%;
    object-fit: cover;
    cursor: pointer;
}

.tambnail-image{
    width: 50px;
    height: 50px;
    object-fit: cover;
    transition: all .4s;
    &:hover{
        transform: scale(1.1);
        transition: all .4s;
    }
}

.community-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 600;
}

.community-text {
    color: #596575;
}

/* Responsive Design */
@media (max-width: 800px) {
    .community-item {
        flex-direction: column;
    }

    .community-image {
        width: 100%;
        // height: 200px;
    }

    .community-content {
        padding: 1.5rem;
    }
}

@media (min-width: 800px) {
    /* Zig-zag layout - reverse every even item */
    .community-item:nth-child(even) {
        flex-direction: row-reverse;
    }
}


@media (min-width: 1024px) {
    .community-grid {
        grid-template-columns: repeat(1, 1fr);
        margin: 0 auto;
        margin-bottom: 3rem;
    }
}
</style>