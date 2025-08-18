<script setup>
// composables
// import { use_apicalls_from_store } from '../../composables/store-apicalls';

// const { apicall_from_store,apicall_from_store_loading } = use_apicalls_from_store()

const showSuccMsg = ref(false)
const errMsg = ref(false)
const subscribe = (FD,form$)=>{
  const obj = {
    name :form$.data.email.split('@')[0] || '',
    email: form$.data.email
  } 

  showSuccMsg.value = false
  errMsg.value = false
  // apicall_from_store('newsletter','newsletter-subscribe',{ onSucSaveTheJsonOn: 'subscriber', data:obj }).then(res=>{
  //   if(res.data.status === "success") return showSuccMsg.value = true
  //   showSuccMsg.value = false
  //   errMsg.value = res.data.errMessage
  // })
}

</script>

<template>
  <section class="newsletter-container">
    <div class="newsletter-content">
      <svg xmlns="http://www.w3.org/2000/svg" class="newsletter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
      </svg>
      <h1 class="newsletter-title">
        Subscribe to our newsletter
      </h1>
      <p class="newsletter-description">
        Stay up to date with out progress, announcements and exclusive discounts feel free to sign up with your email.
      </p>
    </div>
    <div class="newsletter-form-container">
          <ClientOnly>
            <Vueform
                :display-errors="false"
                :endpoint="subscribe"
                >
                  <TextElement
                    name="email"
                    input-type="email"
                    :rules="[
                      'required',
                      'email',
                    ]"
                    :columns="{
                      sm: {
                        container: 8,
                      },
                    }"
                    size="sm"
                  />
                  <ButtonElement
                    name="submit"
                    button-label="Submit"
                    :submits="true"
                    :full="true"
                    :columns="{
                      sm: {
                        container: 4,
                      },
                    }"
                    align="center"
                    size="sm"
                    :loading="false"
                  />
            </Vueform>
          </ClientOnly>
      <p class="newsletter-privacy">
        No spam ever, we are care about the protection of your data.
      </p>
      <!-- Success message -->
      <div class="message success-message" v-if="false && showSuccMsg && !errMsg">
        <div class="message-icon success-icon">
          <!-- Check Circle SVG Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="message-text success-text">
          <h4>Subscription Successful!</h4>
          <p>Please check your email to confirm your subscription.</p>
        </div>
      </div>
      <!-- Error message -->
      <div class="message error-message" v-if="!false && errMsg && !showSuccMsg">
        <div class="message-icon error-icon">
          <!-- X Circle SVG Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="message-text error-text">
          <!-- <h4>Subscription Failed</h4> -->
          <p>{{ errMsg }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/assets/style/newsletterSub.scss' as *;
</style>