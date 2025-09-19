<script setup >
import { useRoute } from 'vue-router';

definePageMeta({
    layout:"default",
    name: 'confirmSub',
})

const isConfirmed = ref(false)
const route = useRoute()

const handleConfirm = async () => {
  isConfirmed.value = false
  const id = route.params.id
  const loading = true
    try {
      const response = await  $fetch(`/api/newsletter/sub/confirm/${id}`,{
          method:'PATCH',
          body:{confirmed: true},
          headers:{
            apiref:'/api/newsletter/sub/confirm/[id]/PATCH'
          }
        })
        isConfirmed.value = true
        loading.false
    } catch (error) {
       frontEndErrorFeedback().err(error)
       loading.false
    }
}

</script>

<template>
  <div class="subscription-container">
    <div class="subscription-card">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      </div>
      
      <h1 class="title">{{ isConfirmed ? 'Subscription confirmed!' : 'Almost done!' }}</h1>
      
      <p class="message">
        {{ isConfirmed 
          ? 'Your email address has been successfully added to our newsletter list.' 
          : 'Please confirm your subscription to our newsletter by clicking the button below.' }}
      </p>
      
      <div v-if="!isConfirmed" class="confirm-section">
        <button 
          @click="handleConfirm" 
          class="confirm-button"
          :disabled="loading"
        >
          {{ loading ? 'Confirming...' : 'Confirm Subscription' }}
        </button>
      </div>
      
      <div v-if="isConfirmed" class="success-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
        <span>Thank you for confirming!</span>
      </div>
    </div>
  </div>
</template>



<style scoped>
.subscription-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.subscription-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  max-width: 480px;
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  text-align: center;
}

.icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  color: #10b981; /* Green color for subscription success */
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
}

.confirm-section {
  margin-bottom: 1.5rem;
}

.confirm-button {
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-button:hover {
  background-color: #059669;
}

.confirm-button:disabled {
  background-color: #6ee7b7;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #10b981;
  font-weight: 500;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.check-icon {
  color: #10b981;
}

.manage-subscription {
  color: #6b7280;
  font-size: 0.95rem;
}

.link {
  color: #10b981;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>