<script setup>
definePageMeta({
    layout:"default",
    name: 'blog',
})
// libs
import { format } from 'date-fns';
import gsap from 'gsap';
// comps
import { PaginationBar, PaginationPageNumbers, PaginationPreviousPage, PaginationNextPage } from 'v-page'

const { mobilePhone ,tablet } = useBreakPoint()
const { any_open_modal } = storeToRefs( useUtilStore() )
const { blogPosts,page,perPage } = storeToRefs( useBlogStore() )

const openBlogPostModal = (post)=>{
    any_open_modal.value.bool = true
    any_open_modal.value.id = 'blogModal'
    any_open_modal.value.AnythingTopass = post
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
        gsap.from(targets, { opacity: 0,  stagger:.3, duration: 2},)
    })
    document.querySelectorAll('.blogcard').forEach(el => observer.observe(el));
})

const catagoriesCount = ref({
    info: 0,
    event: 0,
    social: 0,
    news: 0,
})
const totalBlogCount = ref()
const searcq = ref('')
const recentPosts = ref()

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

function pagination_change () {
    console.log('blog pagination_change');
}

const onsearch  = ()=>{
    console.log('blog onsearch');
}

</script>
<template>
    <div class="main-container" id="blog-main-container">
        <h3 class="header">Blog</h3>

        <div class="chat" @click="$router.push('/contactUs')">
            <div class="chat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <button class="chat_btn"> Contact Us</button>
        </div>

        <div class="container" >
            <main class="main-content">
                <!-- Blog posts -->
                <MazCard  v-for="(blogPost,i) in blogPosts" :key="i" 
                    :images="[`blog/${blogPost.coverImg}`]" 
                    :orientation="mobilePhone ? 'column' : 'row'  " 
                    :galleryWidth=" tablet ?  '250px': '300px' "
                    :galleryHeight="'250px'"
                    class="blogcard"
                >
                    <template #title>
                        <span  class="blog-card-date"> {{  format(blogPost.createdAt, 'MMMM dd,yyyy') }} </span>
                        <h3 style="margin: 0; margin-bottom: 20px; font-weight: 500;"> {{ blogPost.title }} </h3>
                    </template>
                    <template #content>
                        <div class="maz-text-muted" >
                            <div  class="quill-html-content" v-html="`${blogPost.content_short}`"> </div>
                            <a href="#" class="card__link"  @click.stop="openBlogPostModal(blogPost)">Read Full Article <span class="arrow">→</span></a>
                        </div>
                    </template>
                </MazCard>
            </main>

            <aside class="sidebar"  >
                <!-- Search -->
                <div class="search-box">
                    <input type="search" placeholder="Search..."  v-model="searcq" @keyup.enter="onsearch">
                </div>

                <!-- Categories -->
                <div class="widget  Categories">
                    <h3 style="font-weight: 500;">Categories</h3>
                    <ul class="categories-list">
                        <li>News ({{ catagoriesCount.news }}) </li>
                        <li>info ({{ catagoriesCount.info }}) </li>
                        <li>event ({{ catagoriesCount.event }}) </li>
                        <li>social ({{ catagoriesCount.social }}) </li>
                    </ul>
                </div>

                <!-- Recent Posts -->
                <div class="widget">
                    <h3>Recent Posts</h3>
                    <div class="recent-posts">
                        <MazCard   v-for="(blogPost,i) in recentPosts" :key="i" 
                            @click.stop="openBlogPostModal(blogPost)"
                            :images="[`https://unsplash.com/photos/welcome-center-building-with-mountain-backdrop-VMlIOzs_kkg`]" 
                            :orientation="'row'" 
                            :galleryWidth="'50px'"
                            class="blogcard recent">
                            <template #title>
                                <span  class="blog-card-date" style="display: block;"> {{  format(blogPost.createdAt, 'MMMM dd,yyyy') }} </span>
                                <h3 style="margin: 0; margin-bottom: 20px; font-weight: 500;"> {{ blogPost.title }} </h3>
                            </template>
                        </MazCard>
                    </div>
                </div>
            </aside>
        </div>

        <PaginationBar v-if="!searcq" class="vpag" v-model="page" :total-row="totalBlogCount" :align="'left'" @change="pagination_change">
            <PaginationPreviousPage/>
            <PaginationPageNumbers/>
            <PaginationNextPage/>
        </PaginationBar>

        <NewsletterSub style="margin-top: 4rem;"/>
    </div>
</template>

<style scoped lang="scss">
    @use "@/assets/style/variables" as *;;
    @use "@/assets/style/mixins" as *;

    .blogcard :deep(.m-gallery__item__image){
        background-color: #9999996c !important;
    }

    .blogcard.recent :deep(.m-card__content__wrapper) {
        padding:  0 0 0 1rem;
        cursor: pointer !important;
        &:hover{
            .blog-card-title,.blog-card-date{
                text-decoration: underline;
                color: #ff4500;
            }
        }
    }

    .blogcard.recent :deep(.m-gallery) {
        border-radius: 1px;
        cursor: pointer !important;
    }

    .blog-card-title{
        @include dotdotdot;
        font-size: 12px;
    }

    .blog-card-date{
        display: inline-block;
        font-size: 12px; 
        color: #666;
        margin: 0 0 5px;
    }

    .vpag {
        margin: 2rem 0;

        :deep(.active) {
            a {
                background : linear-gradient(135deg, #0a1525 0%, #152a4a 100%) !important;
            }
        }
    }

    .card__link {
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;
      font-size: 14px;
      margin:1rem 0 10px;
      transition: 0.2s ease;
      &:hover {
        color: #ff4500;
        
        .arrow {
            transform: translateX(4px);
        }
  }
    }
    
    .arrow {
      margin-left: 6px;
      transition: transform 0.2s ease;
    }

    .main-container{
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 2rem;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
        justify-content: center;
        min-width: fit-content;
    }

    /* Header */
    .header {
        margin-bottom: 2rem;
        text-align:center; 
        font-weight: 500;
        
    }

    .header h1 {
        font-size: 2rem;
        font-weight: 600;
    }

    /* Main content */
    .main-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: sticky;
        top: 100px; /* Adjust this value to control when it sticks */
        height: fit-content; /* Viewport height minus top and bottom padding */
        overflow-y: auto; /* Make it scrollable if content is too tall */
    }

    .search-box {
        position: relative;
    }

    .search-box input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.9rem;
    }

    .widget {
        background: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .widget h3 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }

    .categories-list {
        list-style: none;
    }

    .categories-list li {
        margin-bottom: 0.5rem;
    }

    .recent-posts {
        color: #666;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .recent-post {
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }

    .recent-post img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 4px;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tag {
        background: #f5f5f5;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        color: #666;
    }

    .chat {
        position: sticky;
        top: 50%;
        transform: translate( -35px, -50%);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        z-index: 10;
        cursor: pointer;

        &:hover {
            .chat-icon{
                transform: scale(1.2);
                transition: .3s ease;
            }

        }

        .chat-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background-color: var(--dark-blue);
            border-radius: 50%;
            color: var(--white);
            transition: .3s ease;

        }
    
        .chat_btn{
            background-color: #fff;
            color: $text-dark-gray;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 1rem;
            padding: 5px 10px;
            font-weight: bold;
            text-transform: capitalize;
            display: none;

        }
    }


    /* Responsive design */
    @media (max-width: 768px) {
        .container {
            grid-template-columns: 350px;
        }

        .chat{
            transform: translateX(-10px);
        }
      
    }

    @media (max-width: 900px) {
        .sidebar {
            display: none;
        }
    }

    @media (max-width: 400px) {
        .container {
            grid-template-columns: min(99%,350px);
        }
    }

    @media (min-width: 600px) and (max-width: 900px) {
        .container {
            grid-template-columns: 1fr;
            justify-content: center;
        }
        .chat{
            transform: translateX(-31px);
        }
    }
</style>