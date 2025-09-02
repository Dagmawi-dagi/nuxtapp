export default defineNuxtRouteMiddleware(async(to) => {
   if(!useAuthStore().loggedInUser){
     const { data: user, error } = await useFetch('/api/user/me',{ headers:{
       apiref:"/api/user/[id]/GET"
     }});
     if (error.value) {
       // Clear invalid token
       const tokenCookie = useCookie('jwt');
       tokenCookie.value = null;
       return navigateTo({name:'auth'});
     }
     useAuthStore().loggedInUser = user?.value?.data
   }
})