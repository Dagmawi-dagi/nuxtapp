<script setup>
definePageMeta({
    layout:"default",
    name: 'contactUs',
})

// store
// import { global_apihandler } from '../plugIn/axios/global-api-hadler';
// vue
import { ref, reactive } from 'vue';

const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Name validation
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
    isValid = false
  } else if (!phoneRegex.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number'
    isValid = false
  }

  // Subject validation
  if (!form.subject.trim()) {
    errors.subject = 'Subject is required'
    isValid = false
  }

  // Message validation
  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  
  try {
    const data = await global_apihandler('contactus-contact',{data: form})
    console.log(data);
    // Reset form after successful submission
    Object.keys(form).forEach(key => form[key] = '')
    alert('Message sent successfully!')
  } catch (error) {
    alert('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>



<template>
  <div class="contact-container">
    <h3 class="title">Contact Us</h3>
    
    <div class="contact-content">
      <!-- Contact Info Section -->
      <div class="contact-info">
        <h4 class="info-title">Have Questions?</h4>
        <h5 class="info-subtitle">Get in Touch!</h5>
        <p style="margin: 10px 0 20px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur ea praesentium impedit debitis animi sint, facilis</p>
        <div class="contact-details">
          <div class="contact-item">

            <svg  class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            <span>Quha, Mekelle, Tigray</span>
          </div>
          <div class="contact-item">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>+251 914300007</span>
          </div>
          <div class="contact-item">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>+251 914705089</span>
          </div>
            <div class="contact-item">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>+251 914314811</span>
          </div>
          <div class="contact-item">
            <svg  class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span>destaalcohol@gmail.com</span>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-grid">
          <div class="form-group">
            <input 
              v-model="form.name"
              type="text"
              placeholder="Name"
              :class="{ 'error': errors.name }"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <input 
              v-model="form.email"
              type="email"
              placeholder="Email Address"
              :class="{ 'error': errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <input 
              v-model="form.phone"
              type="tel"
              placeholder="Phone"
              :class="{ 'error': errors.phone }"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <input 
              v-model="form.subject"
              type="text"
              placeholder="Subject"
              :class="{ 'error': errors.subject }"
            />
            <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
          </div>
        </div>

        <div class="form-group message-group">
          <textarea 
            v-model="form.message"
            placeholder="How Can We Help You? Feel Free to Get in Touch!"
            rows="4"
            :class="{ 'error': errors.message }"
          ></textarea>
          <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
        </div>

        <button type="submit" class="submit-button"  :disabled="isSubmitting">
            <!-- Background dots layers -->
            <div class="dots-pattern"></div>
          <svg  v-if="!isSubmitting" class="button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <ReusableSpinner :color="'#fff'" :width="'1rem'" style="margin: auto;" v-if="isSubmitting"/>
          <span v-if="!isSubmitting">Get in Touch</span>  
        </button>
      </form>
    </div>

    <NewsletterSub style="margin-top: 4rem;"/>

  </div>
</template>



<style scoped lang="scss">
@use "@/assets/style/variables" as *;;
.contact-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  
  .title {
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 500;
  }
}

.contact-content {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 1000px) {
    gap: 7rem;
  }
  @media (min-width: 780px) {
    grid-template-columns: 400px 1fr;
  }
}

.contact-info {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  height: fit-content;
  color: #666666;
  
  .info-title {
    color: #000;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .info-subtitle {
    color: #000;
    margin-bottom: 1.5rem;
  }
}

.contact-details {
  color: #4b5563;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .icon {
      height: 1rem;
      width: 1rem;
    }
  }
}

.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  input, textarea {
    width: 100%;
    padding: 0.75rem 0.5rem;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    outline: none;
    transition: border-color 0.2s;
    background-color: transparent;

    &::placeholder{
      color: #666;
    }

    &:focus-visible{
      outline: none;
      box-shadow: none;
    }
    
    &:focus {
      border-bottom-color: #2563eb;
    }
    
    &.error {
      border-bottom-color: #ef4444;
    }
  }
  
  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
  }
}

.message-group {
  max-width: 500px;
  margin-top: 1rem;
}

.submit-button {
  min-width: 167px;
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background:linear-gradient(135deg, #0a1525 0%, #152a4a 100%);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #1e3a8a;
  }
  
  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
  
  .button-icon {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }

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
</style>