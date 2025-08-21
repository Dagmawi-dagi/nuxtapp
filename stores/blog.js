import { defineStore } from "pinia";

export const useBlogStore= defineStore('blogStore',()=>{
  
  const page = ref(1)
  const perPage = ref(10) 

  const blogPosts = ref([])

  return {

    page,
    perPage,

    blogPosts,
  }
})
