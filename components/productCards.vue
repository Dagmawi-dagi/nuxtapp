<script setup>
// assets
import { products } from '@/public/site_info_ref'
import gsap from 'gsap';


const { any_open_modal } = storeToRefs( useUtilStore() )

onMounted(()=>{
    // Restore liked products on page load using local Storage
    let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('.product-name').innerHTML;
        const svg = card.querySelector('svg');
        console.log(productName);

        const names = likedProducts.map((pro)=> {return pro.name}  ) ;
        
        if (names.includes(productName)) {
            svg.style.fill = 'red';
            svg.style.stroke = 'red';
        }
    });

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
        gsap.fromTo(targets,
            { 
                opacity: 0, 
                scale: 0.5
            },
            { 
                opacity: 1,
                scale: 1.1, 
                stagger:.3, 
                duration: 2
            }
        )
    })

    document.querySelectorAll('.product-image').forEach(el => observer.observe(el));
})


const likeProduct = (product,evt)=>{

    const svg = evt.currentTarget.querySelector('svg');
    let likedProducts = []
    if(localStorage.getItem('likedProducts')) likedProducts = JSON.parse(localStorage.getItem('likedProducts'));
    else localStorage.setItem('likedProducts',JSON.stringify(likedProducts))

    if (svg.style.fill === 'red') {
        svg.style.fill = 'none';
        svg.style.stroke = '#999';
        // Remove product from liked list
        likedProducts = likedProducts.filter(item => item.name !== product.name);
    } else {
        svg.style.fill = 'red';
        svg.style.stroke = 'red';
        // Add product to liked list
        if (!likedProducts.includes(product)) {
            likedProducts.push(product);
        }
    }

    // Save updated list to localStorage
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}

const getImageUrl = (imgName) => {
return new URL(`../assets/pictures/Products/${imgName}`, import.meta.url).href
}

const openProductModal = (product)=>{
    any_open_modal.value.bool = true
    any_open_modal.value.id = 'productModal'
    any_open_modal.value.AnythingTopass = product
}

</script>
<template>
    <section id="products" class="container">
        <div class="header">
            <h2>Our Brand Catalog</h2>
        </div>

        <div class="product-grid">
            <!-- Product 2 -->
             <template v-for="(pro,i) in products" :key="i">
                 <div class="product-card"  @click="openProductModal(pro)">
                     <div class="product-image-container">
                         <!-- Background dots layers -->
                         <div class="dots-pattern"></div>
                         <!-- <img decoding="async" loading="lazy" :src="`/src/assets/pictures/Products/${pro.img}`" alt="product image" class="product-image"> -->
                         <img decoding="async" loading="lazy" :src="getImageUrl(pro.img)" alt="product image" class="product-image">
                         <button class="favorite-btn" aria-label="Add to favorites" @click.stop="likeProduct(pro,$event)">
                             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                             </svg>
                         </button>
                         <span class="alcohol"> {{ pro.values[0].split(':')[1]  }} </span>
                     </div>
                     <div class="product-info">
                         <h2 class="product-name">{{ pro.name  }}</h2>
                     </div>
                 </div>
             </template>
        </div> 
    </section>
</template>

<style scoped lang="scss">
@use '/assets/style/productCards.scss' as *;
</style>