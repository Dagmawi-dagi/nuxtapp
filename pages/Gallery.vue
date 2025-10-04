<script setup>
// assets
import { Gallery } from '@/public/site_info_ref'
// libs
import gsap from 'gsap';
import { SEO_KEYWORDS } from '@/public/SEOkeywords'

definePageMeta({
    layout:"default",
    name: 'Gallery',
})

// Collect all titles and text content dynamically
const galleryTitles = Gallery.map(g => g.title).join(", ")
const galleryDescriptions = Gallery.map(g => g.p.join(" ")).join(" ").slice(0, 300) + "..."
const galleryImages = Gallery.flatMap(g => g.images)

// Nuxt SEO meta
useSeoMeta({
  title: "Gallery - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  description: galleryDescriptions || "Explore the DESTA ALCOHOL & LIQUOR FACTORY PLC gallery showcasing our community, staff, compound, certifications, and achievements.",
  ogTitle: "Gallery - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  ogDescription: galleryDescriptions || "Explore the DESTA ALCOHOL & LIQUOR FACTORY PLC gallery showcasing our community, staff, compound, certifications, and achievements.",
  ogUrl: "https://www.destaalcohol.et/gallery",
  ogImage:"https://www.destaalcohol.et/pictures/desta-logo.png",
  twitterCard: "summary_large_image",
   robots: 'index, follow',
  keywords: SEO_KEYWORDS().getAllKeywords().join(', ')
})

useHead({
  script: [
    {
      key: 'gallery-schema',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Gallery - DESTA ALCOHOL & LIQUOR FACTORY PLC",
        "url": "https://www.destaalcohol.et/gallery",
        "about": galleryTitles,
        "hasPart": Gallery.map((item, idx) => ({
          "@type": "ImageGallery",
          "name": item.title,
          "description": item.p.join(" "),
          "associatedMedia": item.images.map(img => ({
            "@type": "ImageObject",
            "url": `https://www.destaalcohol.et/pictures/Gallery/${img}`,
            "contentUrl": `https://www.destaalcohol.et/pictures/Gallery/${img}`,
            "caption": item.title
          }))
        }))
      })
    }
  ]
})


const { show_global_vueEasyLightbox } = useLightBox()
const showimg = (imgRef, isArr, index) => {
  let images;
  if (isArr) images = imgRef.map(i => `/pictures/Gallery/${i}`);
  else  images = `/pictures/Gallery/${imgRef}`;
  // Assuming show_global_vueEasyLightbox accepts:
  // (singleImage, imageArray, index)
    show_global_vueEasyLightbox(isArr ? null : images, isArr ? images : null, isArr ? index : 0);
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
        .from( targets.map(target => target.querySelector('.Gallery-image')).filter(img => img !== null), { // Animate child elements
            opacity: 0,
            x: (a,el) =>{  
                if( getComputedStyle(el.parentElement).flexDirection === 'row-reverse') return "100%"
                else return "-100%"
            },
            duration: .6,
        })
        .from( targets.map(target => target.querySelector('.Gallery-content')).filter(content => content !== null), { // Animate child elements
            opacity: 0,
            x: (a,el) =>{  
                if( getComputedStyle(el.parentElement).flexDirection === 'row-reverse') return "-100%"
                else return "100%"
            }, 
            duration: .6,
            delay:.3
        },"<");
    })
    document.querySelectorAll('.Gallery-item').forEach(el => observer.observe(el));
})

</script>

<template>
    <div class="container">
        <h3 style="text-align: center; font-weight: 500; margin: 2rem 0 3rem; color: #0072b8;">OUR GALLERY</h3>
        <div class="Gallery-grid">

            <article class="Gallery-item" v-for="(Galle,i) in Gallery" :key="i">
                <div class="Gallery-image" >
                    <img @click="showimg(Galle.images,true,0)" :src="`/pictures/Gallery/${Galle.images[0]}`" alt="Gallery image" style="width: 100%; object-fit: cover; cursor: pointer;" >
                    <MazCarousel v-if="Galle.images.length > 1" class="MazCarouselContainer" hideScrollbar>
                        <img v-for="img in Galle.images"  class="tambnail-image"
                            :src="`/pictures/Gallery/${img}`" 
                            @click="showimg(Galle.images,true,i)"
                             alt="Gallery image"
                            >
                    </MazCarousel>
                </div>
                <div class="Gallery-content">
                    <h2 class="Gallery-title">{{ Galle.title }}</h2>
                    <p class="Gallery-text" v-for="(p,i) in Galle.p" :key="i">
                        {{ p }}
                    </p>
                </div>
            </article> 
        </div>

        <NewsletterSub/>        
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

.Gallery-grid {
    display: grid;
    gap: 4rem 2rem;
    grid-template-columns: 1fr;
    margin-bottom: 4rem !important;
}

.Gallery-item {
    display: flex;
    gap: 2rem;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.Gallery-content {
    padding: 2rem;
    flex: 1;
}

.Gallery-image {
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

.Gallery-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 600;
    text-transform: capitalize;
}

.Gallery-text {
    color: #596575;
    margin: 1rem 0;
    line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 800px) {
    .Gallery-item {
        flex-direction: column;
    }

    .Gallery-image {
        width: 100%;
        // height: 200px;
    }

    .Gallery-content {
        padding: 1.5rem;
    }
}

@media (min-width: 800px) {
    /* Zig-zag layout - reverse every even item */
    .Gallery-item:nth-child(even) {
        flex-direction: row-reverse;
    }
}


@media (min-width: 1024px) {
    .Gallery-grid {
        grid-template-columns: repeat(1, 1fr);
        margin: 0 auto;
        margin-bottom: 3rem;
    }
}
</style>