<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

definePageMeta({
    layout:"clean",
    name: 'Unsub',
})

onBeforeMount(async ()=>{
    try {
      const {data} = await  $fetch(`/api/newsletter/sub/delete/${route.params.id}`,{
          method:'PATCH',
          body:{unsubscribe: true},
          headers:{
            apiref:'/api/newsletter/sub/delete/[id]/PATCH'
          }
        })
      frontEndErrorFeedback().success(' Unsubscribed successfully')

  } catch (error) {
      console.log(error?.response?._data?.message || null)
  } 
})
</script>

<template>
    <div class="unsubscribe-container">
      <div class="unsubscribe-card">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        
        <h1 class="title">Unsubscribe successful!</h1>
        
        <p class="message">
          Your email address has been unsubscribed from our newsletter email list.
          {{  $route.params.id }}
        </p>
        
        <div class="resubscribe">
          <a href="/" @click.prevent="$router.push('/')" class="link">DestaAlcohol&Liquor.com</a> 
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .unsubscribe-container {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .unsubscribe-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    max-width: 480px;
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top: 2rem;
  }
  
  .icon {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    color: #4f46e5;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .message {
    color: #6b7280;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .resubscribe {
    color: #6b7280;
    font-size: 0.95rem;
  }
  
  .link {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  </style>