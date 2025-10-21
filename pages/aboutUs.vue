<script setup>
import { aboutUs_p,aboutUsCardswithIcon,manager,customerReview,products } from '@/public/site_info_ref';
import { format } from 'date-fns';
import { SEO_KEYWORDS } from '@/public/SEOkeywords'

const config = useRuntimeConfig()

definePageMeta({
    layout:"default",
    name: 'aboutUs',
})

useSeoMeta({
  title: "About Us - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  description: "Learn about DESTA ALCOHOL & LIQUOR FACTORY PLC, Ethiopia's premier producer of premium quality alcohol and liquor since 2001. Discover our mission, vision, core values, and team.",
  ogTitle: "About Us - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  ogDescription: "Learn about DESTA ALCOHOL & LIQUOR FACTORY PLC, Ethiopia's premier producer of premium quality alcohol and liquor since 2001. Discover our mission, vision, core values, and team.",
  ogImage:"https://www.destaalcohol.com/pictures/desta-logo.png", // choose a hero image or team image
  ogUrl: "https://www.destaalcohol.et/aboutUs",
  twitterCard: "summary_large_image",
   robots: 'index, follow',
  keywords: SEO_KEYWORDS().getAllKeywords().join(', ')
})

 useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'about-org',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
        "url": "https://www.destaalcohol.et",
        "logo": "https://www.destaalcohol.com/pictures/desta-logo.png",
        "foundingDate": "2001",
        "founders": [
          {
            "@type": "Person",
            "name": "Mr. Tsigabu belay Desta"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/destaalcohol",
          "https://twitter.com/destaalcohol",
          "https://www.linkedin.com/company/destaalcohol",
          "https://www.instagram.com/destaalcohol"
        ],
        "employee": [
          {
            "@type": "Person",
            "name": "Mussie Hagos",
            "jobTitle": "General Manager"
          }
        ],
        "description": "DESTA ALCOHOL & LIQUOR FACTORY PLC is Ethiopia's premier producer of premium quality alcohol and liquor since 2001. Learn about our mission, vision, objectives, and core values."
      })
    } 
  ]
})


const { any_open_modal } = storeToRefs( useUtilStore() )
const { blogPosts,page,perPage } = storeToRefs( useBlogStore() )
try {
    const { data } = await useFetch('/api/blog', {
        headers: {
            apiref: '/api/blog/GET',
        },
    })
    blogPosts.value = data.value?.data
} catch (err) {
    frontEndErrorFeedback().err(err)
    console.log(err);
}

const openBlogPostModal = (post)=>{
    any_open_modal.value.bool = true
    any_open_modal.value.id = 'blogModal'
    any_open_modal.value.AnythingTopass = post
}

const openProductModal = (product)=>{
    any_open_modal.value.bool = true
    any_open_modal.value.id = 'productModal'
    any_open_modal.value.AnythingTopass = product
}

</script>

<template>
    <div class="wrapper">
        
        <div class="main-container" >
            <main class="content">
                <div class="about-content">

                    <div class="brand-info">
                        <p class="brand-tagline" style="color: #0072b8;">SINCE</p>
                        <h1 class="brand-name" style="color: #0072b8;">2001 G.C</h1>
                        <h3 class="header">ABOUT US</h3>
                    </div>
                    
                    <div class="section-text" >
                    <template v-for="(par, i) in aboutUs_p" :key="i">
                    <!-- Normal paragraph -->
                    <p v-if="!par.includes('•') && !par.includes('<ul>')">
                        {{ par }}
                    </p>

                    <!-- Section with title and description -->
                    <div v-else-if="par.includes('•') && !par.includes('<ul>')">
                        <h3
                        class="section-title"
                        style="opacity:0.9; top: 10px;  margin-bottom: 20px; color: #0072b8;"
                        >
                        • {{ par.split('•')[1] }}
                        </h3>
                        <p>{{ par.split('•')[2] }}</p>
                    </div>

                    <!-- Section with unordered list -->
                    <div v-else-if="par.includes('<ul>')">
                        <h3
                        class="section-title"
                        style="opacity:0.9; top: 10px;  margin-bottom: 20px; color: #0072b8; "
                        >
                        • {{ par.split('•')[1] }}
                        </h3>
                        <ul class="custom-list">
                        <li style="margin-bottom: 10px;"
                            v-for="(item, j) in par.split('<ul>')[1].split('-').filter(str => str.trim() !== '')"
                            :key="j"
                        >
                            {{ item.trim() }}
                        </li>
                        </ul>
                    </div>
                    </template>
                    </div>
                </div>
            </main>

            <aside class="sidebar">
                <div class="product-image">
                    <div class="img-container" @click="openProductModal(products[0])">
                        <div class="dots-pattern"></div>
                        <img src="/public/pictures/Products/vodka.png" alt="Premium Vodka" class="bottle">
                    </div>
                    <div class="img-container" @click="openProductModal(products[1])">
                        <div class="dots-pattern"></div>
                            <img src="/public/pictures/Products/uozo.png" alt="Premium Vodka" class="bottle">
                    </div>
                    <div class="img-container" @click="openProductModal(products[2])">
                        <div class="dots-pattern"></div>
                        <img src="/public/pictures/Products/gin.png" alt="Premium Vodka" class="bottle">
                    </div>
                </div>
            </aside>
        </div>

        <div class="features">

            <div class="feature">
                <svg width="59" class="icon organic-icon" height="69" viewBox="0 0 59 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M57.5042 33.9879C58.1146 33.9879 58.6093 33.4931 58.6093 32.8828C58.6093 32.2725 58.1146 31.7777 57.5042 31.7777C56.8939 31.7777 56.3992 32.2725 56.3992 32.8828C56.3992 33.4931 56.8939 33.9879 57.5042 33.9879Z" fill="#1F316F"/>
                    <path d="M45.6719 10.7812C46.8627 10.7812 47.8281 9.81586 47.8281 8.625C47.8281 7.43414 46.8627 6.46875 45.6719 6.46875C44.481 6.46875 43.5156 7.43414 43.5156 8.625C43.5156 9.81586 44.481 10.7812 45.6719 10.7812Z" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M45.8196 18.0015V19.527" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M45.8196 24.1025V25.6281" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M42.0063 21.8148H43.5308" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M48.1074 21.8148H49.633" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.3281 50.1199V63.6094H13.1718C12.6415 63.6097 12.133 63.8205 11.758 64.1955C11.383 64.5705 11.1722 65.079 11.1719 65.6093V67.9219H39.2031V65.6093C39.2028 65.079 38.992 64.5705 38.617 64.1955C38.242 63.8205 37.7335 63.6097 37.2032 63.6094H37.0469V49.5938" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M37.0469 31.7777V21.9668C37.0467 21.5498 36.8998 21.1462 36.6319 20.8267C36.364 20.5071 35.9923 20.2921 35.5817 20.2192L25.1875 18.3281L14.7771 20.2138C14.37 20.2898 14.0023 20.5057 13.7376 20.8243C13.473 21.1429 13.3281 21.544 13.3281 21.9582V35.1113" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M48.9062 35.5781H1.46875V49.5938H48.9062V35.5781Z" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M37.0469 46.3594L39.2031 38.8125H40.2812L42.4375 46.3594" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M38.125 43.125H41.3594" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.9375 38.8125L10.0938 46.3594H11.1719L13.3281 38.8125" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.7969 40.9688C19.7969 39.7779 18.8315 38.8125 17.6406 38.8125C16.4498 38.8125 15.4844 39.7779 15.4844 40.9688V44.2031C15.4844 45.394 16.4498 46.3594 17.6406 46.3594C18.8315 46.3594 19.7969 45.394 19.7969 44.2031V40.9688Z" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.0312 38.8125H25.9972C26.174 38.8125 26.3491 38.8473 26.5125 38.915C26.6759 38.9827 26.8243 39.0819 26.9493 39.2069C27.0744 39.3319 27.1736 39.4804 27.2412 39.6438C27.3089 39.8071 27.3438 39.9822 27.3438 40.1591V45.0106C27.344 45.1877 27.3094 45.363 27.2419 45.5266C27.1743 45.6902 27.0752 45.8389 26.9501 45.9642C26.825 46.0895 26.6765 46.1889 26.513 46.2567C26.3495 46.3245 26.1742 46.3594 25.9972 46.3594H23.0312V38.8125Z" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M30.5781 38.8125V46.3594" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M29.5 18.7637V1.07812H20.875V18.7637" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M30.5781 41.662L34.8906 46.3594" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M34.8907 38.8125L31.1992 41.5811" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M37.0469 63.6094H17.6406" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M24.1093 1.41016V9.70309H21.2361" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25.1875 31.2656V26.9531" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28.4219 32.3438L30.5781 30.1875" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.9531 32.3438L19.7969 30.1875" stroke="#1F316F" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M29.5 15.0938H20.875" stroke="#1F316F" stroke-width="1.875" stroke-linejoin="round"/>
                    </svg>  
                <h3>premium Vodka</h3>
                <p>{{ aboutUsCardswithIcon['premium Vodka'].p }}</p>
            </div>

            <div class="feature">
                <svg width="68" class="icon organic-icon"  height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_110_88)">
                    <path d="M61.4129 60.1361C58.7894 53.9171 49.9229 34.3862 49.9229 34.3862C53.0114 30.7425 54.8793 26.0341 54.8793 20.8958C54.8793 9.37391 45.5058 0 33.9839 0C22.4623 0 13.0882 9.37391 13.0882 20.8958C13.0882 26.0341 14.9566 30.7425 18.0446 34.3862L6.53252 60.3108C6.27416 60.8929 6.39872 61.5745 6.84696 62.027C7.29521 62.4789 7.97294 62.612 8.56036 62.3603L16.2135 59.0608L18.8981 66.951C19.1034 67.5544 19.6577 67.97 20.2938 67.9985C20.3173 67.9993 20.3408 68 20.3635 68C20.9733 68 21.5289 67.6413 21.7784 67.0804L33.019 41.7664C33.3391 41.7816 33.6606 41.7914 33.9841 41.7914C34.3076 41.7914 34.6285 41.7816 34.9493 41.7664L46.1898 67.0804C46.4393 67.6408 46.9945 68 47.6047 68C47.6275 68 47.6506 67.9993 47.6741 67.9985C48.3106 67.97 48.8645 67.5544 49.0701 66.951L51.7548 59.0608L59.3546 62.3079C59.5526 62.3929 59.7604 62.4345 59.967 62.4345C59.9731 62.4345 59.9807 62.4345 59.9829 62.4345C60.8385 62.4345 61.5362 61.814 61.598 60.9445C61.6121 60.7437 61.5673 60.5014 61.4129 60.1361ZM20.5547 62.2085L18.6046 56.4774C18.4658 56.0686 18.1617 55.7367 17.7675 55.5615C17.568 55.4732 17.3533 55.4284 17.1392 55.4284C16.9306 55.4284 16.722 55.4708 16.5262 55.5546L10.9676 57.9515L20.3861 36.7418C23.0367 39.0192 26.2579 40.6476 29.8078 41.372L20.5547 62.2085ZM16.1837 20.8958C16.1837 11.0805 24.1686 3.09552 33.9839 3.09552C43.7989 3.09552 51.7836 11.0805 51.7836 20.8958C51.7836 30.7107 43.7987 38.6957 33.9839 38.6957C24.1686 38.6957 16.1837 30.7109 16.1837 20.8958ZM51.4414 55.5546C51.0452 55.3855 50.5949 55.3879 50.2005 55.5615C49.8058 55.7367 49.5022 56.0686 49.3631 56.4774L47.4133 62.2085L38.1605 41.372C41.7101 40.648 44.9315 39.0192 47.5817 36.7418L57.0003 57.9515L51.4414 55.5546Z" fill="#1F316F"/>
                    <path d="M33.984 6.96521C26.3032 6.96521 20.0535 13.2151 20.0535 20.8958C20.0535 28.5765 26.3034 34.8262 33.984 34.8262C41.6647 34.8262 47.9143 28.5767 47.9143 20.8958C47.9143 13.2149 41.6649 6.96521 33.984 6.96521ZM33.984 31.7305C28.0097 31.7305 23.149 26.8701 23.149 20.8958C23.149 14.9215 28.0097 10.0611 33.984 10.0611C39.9584 10.0611 44.8185 14.9215 44.8185 20.8958C44.8187 26.8701 39.9584 31.7305 33.984 31.7305Z" fill="#1F316F"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_110_88">
                    <rect width="68" height="68" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>

                <h3>Award Winner</h3>
                <p>{{ aboutUsCardswithIcon['Award Winner'].p}}</p>
            </div>

            <!-- Organic Products Feature -->
            <div class="feature">
                <svg  class="icon organic-icon" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
                    <path d="M29.2969 2.34375C29.2969 2.03295 29.1735 1.73488 28.9537 1.51511C28.7339 1.29534 28.4359 1.17188 28.1251 1.17188H18.7501C18.4393 1.17188 18.1412 1.29534 17.9214 1.51511C17.7016 1.73488 17.5782 2.03295 17.5782 2.34375V17.9098C17.5832 19.4035 17.2057 20.8737 16.4816 22.1802C15.7575 23.4867 14.7108 24.586 13.4415 25.3734C11.8344 26.3709 10.5094 27.7631 9.59253 29.4174C8.67563 31.0717 8.19734 32.9332 8.20318 34.8246V67.9688C8.20504 69.5222 8.82296 71.0115 9.9214 72.1099C11.0198 73.2083 12.5091 73.8263 14.0626 73.8281H32.8126C34.366 73.8263 35.8553 73.2083 36.9537 72.1099C38.0521 71.0115 38.6701 69.5222 38.6719 67.9688V34.8246C38.6778 32.9332 38.1995 31.0717 37.2826 29.4174C36.3657 27.7631 35.0407 26.3709 33.4336 25.3734C32.1643 24.586 31.1176 23.4867 30.3935 22.1802C29.6694 20.8737 29.2919 19.4035 29.2969 17.9098V2.34375ZM19.9219 3.51562H26.9532V11.7188H19.9219V3.51562ZM26.9532 16.4062H19.9219V14.0625H26.9532V16.4062ZM32.1915 27.3609C33.4608 28.1483 34.5075 29.2477 35.2316 30.5542C35.9557 31.8607 36.3332 33.3309 36.3282 34.8246V67.9688C36.3282 68.9012 35.9578 69.7954 35.2985 70.4547C34.6392 71.114 33.745 71.4844 32.8126 71.4844H14.0626C13.1302 71.4844 12.2359 71.114 11.5766 70.4547C10.9173 69.7954 10.5469 68.9012 10.5469 67.9688V34.8246C10.5419 33.3309 10.9194 31.8607 11.6435 30.5542C12.3676 29.2477 13.4143 28.1483 14.6836 27.3609C16.1665 26.437 17.4095 25.1751 18.3108 23.6784C19.2121 22.1817 19.7461 20.4928 19.8692 18.75H27.0059C27.129 20.4928 27.663 22.1817 28.5643 23.6784C29.4656 25.1751 30.7086 26.437 32.1915 27.3609Z" fill="#1F316F"/>
                    <path d="M23.4375 25.7812C21.5733 25.7831 19.7859 26.5245 18.4677 27.8427C17.1495 29.1609 16.4081 30.9483 16.4063 32.8125C16.4063 32.9297 16.418 33.0469 16.4238 33.1641C15.3122 34.1477 14.4223 35.3564 13.8132 36.71C13.2041 38.0636 12.8896 39.5313 12.8906 41.0156V56.25C12.8906 59.0472 14.0018 61.7298 15.9797 63.7078C17.9577 65.6857 20.6403 66.7969 23.4375 66.7969C26.2347 66.7969 28.9173 65.6857 30.8953 63.7078C32.8732 61.7298 33.9844 59.0472 33.9844 56.25V41.0156C33.9854 39.5313 33.671 38.0636 33.0618 36.71C32.4527 35.3564 31.5628 34.1477 30.4512 33.1641C30.4512 33.0469 30.4688 32.9297 30.4688 32.8125C30.4669 30.9483 29.7255 29.1609 28.4073 27.8427C27.0891 26.5245 25.3017 25.7831 23.4375 25.7812ZM23.4375 28.125C24.3646 28.125 25.2709 28.3999 26.0417 28.915C26.8126 29.4301 27.4134 30.1621 27.7682 31.0187C28.123 31.8752 28.2158 32.8177 28.0349 33.727C27.8541 34.6363 27.4076 35.4715 26.7521 36.1271C26.0965 36.7826 25.2613 37.2291 24.352 37.4099C23.4427 37.5908 22.5002 37.498 21.6437 37.1432C20.7871 36.7884 20.0551 36.1876 19.54 35.4167C19.0249 34.6459 18.75 33.7396 18.75 32.8125C18.75 31.5693 19.2439 30.377 20.1229 29.4979C21.002 28.6189 22.1943 28.125 23.4375 28.125ZM31.6406 41.0156V56.25C31.6406 58.4256 30.7764 60.5121 29.238 62.0505C27.6996 63.5889 25.6131 64.4531 23.4375 64.4531C21.2619 64.4531 19.1754 63.5889 17.637 62.0505C16.0986 60.5121 15.2344 58.4256 15.2344 56.25V41.0156C15.2305 39.1207 15.8873 37.2836 17.0918 35.8207C17.6593 37.0239 18.5571 38.041 19.6807 38.7534C20.8042 39.4657 22.1072 39.844 23.4375 39.844C24.7678 39.844 26.0708 39.4657 27.1943 38.7534C28.3179 38.041 29.2157 37.0239 29.7832 35.8207C30.9877 37.2836 31.6445 39.1207 31.6406 41.0156Z" fill="#1F316F"/>
                    <path d="M29.2969 56.25H17.5781V58.5938H29.2969V56.25Z" fill="#1F316F"/>
                    <path d="M29.2969 51.5625H17.5781V53.9062H29.2969V51.5625Z" fill="#1F316F"/>
                    <path d="M29.2969 46.875H17.5781V49.2188H29.2969V46.875Z" fill="#1F316F"/>
                    <path d="M29.2969 42.1875H17.5781V44.5312H29.2969V42.1875Z" fill="#1F316F"/>
                    <path d="M65.625 46.875H42.1875C41.8767 46.875 41.5786 46.9985 41.3589 47.2182C41.1391 47.438 41.0156 47.7361 41.0156 48.0469V65.625C41.0184 67.7997 41.8836 69.8846 43.4213 71.4224C44.9591 72.9602 47.044 73.8253 49.2188 73.8281H58.5938C60.7685 73.8253 62.8534 72.9602 64.3912 71.4224C65.9289 69.8846 66.7941 67.7997 66.7969 65.625V48.0469C66.7969 47.7361 66.6734 47.438 66.4536 47.2182C66.2339 46.9985 65.9358 46.875 65.625 46.875ZM64.4531 65.625C64.4513 67.1784 63.8333 68.6677 62.7349 69.7661C61.6365 70.8646 60.1472 71.4825 58.5938 71.4844H49.2188C47.6653 71.4825 46.176 70.8646 45.0776 69.7661C43.9792 68.6677 43.3612 67.1784 43.3594 65.625V49.2188H64.4531V65.625Z" fill="#1F316F"/>
                    <path d="M49.2188 69.1406H58.5938C59.5262 69.1406 60.4204 68.7702 61.0797 68.1109C61.739 67.4516 62.1094 66.5574 62.1094 65.625V55.0781C62.1094 54.7673 61.9859 54.4693 61.7661 54.2495C61.5464 54.0297 61.2483 53.9062 60.9375 53.9062H46.875C46.5642 53.9062 46.2661 54.0297 46.0464 54.2495C45.8266 54.4693 45.7031 54.7673 45.7031 55.0781V65.625C45.7031 66.5574 46.0735 67.4516 46.7328 68.1109C47.3921 68.7702 48.2863 69.1406 49.2188 69.1406ZM48.0469 56.25H59.7656V65.625C59.7656 65.9358 59.6422 66.2339 59.4224 66.4536C59.2026 66.6734 58.9046 66.7969 58.5938 66.7969H49.2188C48.9079 66.7969 48.6099 66.6734 48.3901 66.4536C48.1703 66.2339 48.0469 65.9358 48.0469 65.625V56.25Z" fill="#1F316F"/>
                </svg>
                <h3>Organic Products</h3>
                <p>{{ aboutUsCardswithIcon['Organic Products'].p }}</p>
            </div>

            <!-- Modern Distillery Feature -->
            <div class="feature">
                <svg class="icon distillery-icon"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="75" height="75" viewBox="0 0 75 75" fill="none">
                <rect width="75" height="75" fill="url(#pattern0_57_113)"/>
                <defs>
                <pattern id="pattern0_57_113" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_57_113" transform="scale(0.00195312)"/>
                </pattern>
                <image id="image0_57_113" width="512" height="512" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                </defs>
                </svg>
                <h3>Modern Distillery</h3>
                <p>{{ aboutUsCardswithIcon['Modern Distillery'].p }}</p>
            </div>
        
        </div>

        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-container">
                    <img :src="`${config.public.baseURL}/pictures/manager.jpg`" alt="Desta Areki" class="profile-image">
                    <div style="display: flex; flex-direction: column; align-self:center">
                        <h4 class="profile-name">Mussie Hagos </h4>
                        <p class="profile-title">General Manager</p>
                    </div>
                </div>
            </div>
            <div class="profile-right">
                <div class="quote-container">
                    <blockquote class="profile-quote">{{ manager.quote }}</blockquote>
                </div>
                <br>
                <div class="bio-container">
                    <div class="profile-bio">
                        <template v-for="(par, i) in manager.p" :key="i">
                            <p style="margin-bottom: 10px;"  >{{ par }}</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <MazCarousel  :hide-scrollbar="true" >
            <template #title>  <h4 class="maz-m-0" style="text-align: center; color: #0072b8;">Customers review</h4> </template>
            <MazCard  v-for="(rev, i) in customerReview" :key="i"  style="min-width: 300px; max-width: 300px;" >
                <template #content>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <img src="/assets/pictures/desta-logo.png" alt="logo" style="width: 60px; height: 60px;">
                        <div style="display: flex; flex-direction: column;">
                            <span class="customer-name">{{ rev.name }}</span>
                            <span class="customer-location">{{ rev.location }}</span>
                        </div>
                    </div>
                    <div class="maz-text-muted" style="margin: 0; margin-top: 10px">
                        {{ rev.review }}
                        <div style="display: flex; margin: 1rem 0;">
                            <svg v-for="i in rev.rating" :index="i" xmlns="http://www.w3.org/2000/svg" fill="#FFC107" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFC107" style="width: 15px;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                    </div>
                </template>
            </MazCard>
        </MazCarousel>

        <OurPartners style="margin-top: 4rem; margin-bottom: 4rem;"/>

        <MazCarousel  :hide-scrollbar="false">
            <template #title>  <h4 class="maz-m-0" style="text-align: center;">Latest News</h4> </template>
            <MazCard class="blogcard" v-for="(blogPost, i) in blogPosts" :key="i"  :images="[{src:`/blog/${blogPost?.coverImg}`,alt:'blog post cover image'}]" :gallery-height="200" style="min-width: 300px; max-width: 400px;" >
                <template #title>
                    <h5 style="margin: 0">  {{ blogPost.title }} </h5>
                    <span style="font-size: 12px; color: #666666;"> {{  format(blogPost.createdAt, 'MMM dd,yyyy') }} </span>
                </template>
                <template #content>
                    <div class="maz-text-muted" style="margin: 0; margin-top: 10px">
                        {{ blogPost.content_short }}
                        <button  class="card__link"  @click.stop="openBlogPostModal(blogPost)">Readmore <span class="arrow">→</span></button>
                    </div>
                </template>
            </MazCard>
        </MazCarousel>

        <NewsletterSub style="margin: 3rem auto 2rem;"/>
    </div>
</template>

<style scoped lang="scss">
@use '/assets/style/aboutUs.scss' as *;
</style>