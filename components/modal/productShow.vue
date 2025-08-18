<script setup>
// libs
import gsap from 'gsap';
const {any_open_modal} = storeToRefs( useUtilStore() )
defineProps({
    productData : Object,
})

onMounted(()=>{
    gsap.fromTo('.pro-img',{  scale: 0},{ scale: 1.1, direction: 1 })
})


const getImageUrl = (imgName) => {
    return new URL(`../../assets/pictures/Products/${imgName}`, import.meta.url).href
}

</script>

<template>
    <div class="modal-overlay" @click.self="any_open_modal.bool = false">
        <div class="main-container">
            <div class="image-container">
                <!-- Background dots layers -->
                <div class="dots-pattern"></div>
                <img class="pro-img" :src="getImageUrl(productData.img)" alt="Heineken Beer Bottle">
                im                
            </div>
            <div class="content-container">
                <h1 class="product-title">
                    <img src="/assets/pictures/logo.jpg" alt="logo" class="logo" >
                    {{ productData.name }}.
                </h1>
                <p class="product-description">{{ productData.description }}</p>
                <div class="product-values">
                    <p v-for="(v,i) in productData.values" :key="i">• {{v}} </p>
                </div>
                <h2 class="nutritional-title">Ingredient</h2>
                <div class="product-values" style="margin-bottom: 0;">
                    <p v-for="(ingredient,i) in productData.ingredient" :key="i" >• {{ ingredient }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/style/variables" as *;;

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
    overflow-y: auto;
    padding: 20px;
    cursor: pointer;
}

.main-container {
    display: flex;
    background-color: white;
    border-radius: 8px;
    max-width: 1000px;
    width: 90%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    margin: auto;
    z-index: 9999999;
}

.image-container {
    flex: 1;
    background: radial-gradient(circle at 50% 50%,#152a4a,#0a1525 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
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

.image-container img {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    filter: drop-shadow(0px 9px 6px black);
    transition: .5s ease;        
}

.content-container {
    flex: 1;
    padding: 30px;
    background-color: #f9f9f9;
}

.product-title {
    font-size: 24px;
    margin-bottom: 15px;
    color: #0a1525;
    font-weight: 500;
    vertical-align: middle;
    opacity: 1;
    .logo{
        display: inline-block;
        width: 40px;
        height: 40px;
    }
}

.product-description {
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 25px;
}

.nutritional-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #152a4a;
}

.product-values {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
        width: 90%;
    }
    .modal-overlay {
        align-items: flex-start;
    }
}
</style>