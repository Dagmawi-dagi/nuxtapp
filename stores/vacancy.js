import { defineStore } from "pinia";

export const useVacancyVtore= defineStore('vacancyStore',()=>{
  
  // this array items have thier corespondant( same string ) urlRef on the "api-urls" Asset file
  const api_calls = ['getList','apply']
  const vacancy_store_apicalls_statusholder_obj = ref({})

  const page = ref(1)
  const perPage = ref(10) 

  const vacancies = ref([])
  const appledVac = ref(null)

  return {
    api_calls,
    vacancy_store_apicalls_statusholder_obj,

    page,
    perPage,

    vacancies,
    appledVac,
  }
})