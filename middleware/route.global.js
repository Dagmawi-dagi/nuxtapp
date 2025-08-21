import { compareAsc ,addDays  } from 'date-fns'
import { navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof window != 'undefined') {
    console.log(to);
    console.log(from);
        // check if we have age verified on local storage
    const ageVerifiedDate = Number(window.localStorage.getItem('ageVerifiedDate'))
    
    if (!ageVerifiedDate && to.name != "ageVerification" ) return navigateTo('/ageVerification')
    if ( compareAsc( addDays (new Date(ageVerifiedDate),1 ) , new Date() ) === -1  && to.name != "ageVerification" ) return navigateTo('/age-verification')
  };
})