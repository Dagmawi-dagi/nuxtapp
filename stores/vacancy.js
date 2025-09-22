import { defineStore } from "pinia";

export const useVacancyStore= defineStore('vacancyStore',()=>{
  const page = ref(1)
  const perPage = ref(10) 

  const vacancies = ref([])
  const appledVac = ref(null)

  return {
    page,
    perPage,

    vacancies,
    appledVac,
  }
})