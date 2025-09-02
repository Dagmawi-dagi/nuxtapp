import { defineStore } from 'pinia';
//vue
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore',()=>{
  const loggedInUser = ref(null)

  return{
    loggedInUser,
  }
})