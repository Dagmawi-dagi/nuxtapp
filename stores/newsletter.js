import { defineStore } from "pinia";

export const useNewsLetterStore= defineStore('newsletterStore',()=>{
  const page = ref(1)
  const perPage = ref(10) 

  const subscribers = ref([])
  const newsletters = ref([])

  return {
    page,
    perPage,

    newsletters,
    subscribers,
  }
})