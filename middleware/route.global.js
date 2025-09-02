export default defineNuxtRouteMiddleware((to) => {
  // Read the cookie /// since the site is server renderomg theis cookiie ring will be done the the server 
  //  cus the cookie info of the user is being sent vie the http request heder
  const cookie = useCookie('ageVerifiedDate')
  const ageVerifiedDate = Number(cookie.value || 0)
  // If not set, redirect to verification
  if (!ageVerifiedDate && to.name !== 'ageVerification') return navigateTo('/ageVerification')
  
})