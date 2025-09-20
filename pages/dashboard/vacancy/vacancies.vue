<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'
  
definePageMeta({
  layout:"dashboard",
  name: 'vacancies',
  middleware:['auth'],
})

const { vacancies,page,perPage } = storeToRefs(useVacancyStore())

try {
  const { data } = await useFetch('/api/vacancy', {
    method:'get',
    headers: {
      apiref: '/api/vacancy/GET',
    },
  })
  vacancies.value = data.value?.data  // important: use .value
} catch (error) {
    console.log(error );
}

const selectedIds = ref()
const searchQuery = ref()

const loadingIds = ref([]) // holds the ids of rows being deleted
const isLoading = (id) => loadingIds.value.includes(id)

const deleteVacancy =async (vacancy)=>{
  if (!vacancy?.id) return
  loadingIds.value.push(vacancy.id)

  try {
    await $fetch(`/api/vacancy/${vacancy.id}`,{
      method:'DELETE',
      headers:{
        apiref:"/api/vacancy/DELETE"
      }
    })
    frontEndErrorFeedback().success(' vacancy deleted successfully')
    vacancies.value = vacancies.value.filter(v => v.id !== vacancy.id)
  } catch (error) {
      frontEndErrorFeedback().err(error)
  } finally {
    loadingIds.value = loadingIds.value.filter(id => id !== vacancy.id)
  }
  
}

const rowClicked = ()=>{
  console.log('rowClicked');
}

</script>

<template>
<MazTable 
    size="sm"
    v-model="selectedIds"
    v-model:search-query="searchQuery"
    v-model:page="page"
    v-model:page-size="perPage"
    search
    pagination
    color="info"
    sortable
    selectable
    hoverable
    background-even
    selected-key="id"
    :headers="[
      { label:'#', key: 'id', align: 'center', width: '2rem', sortable: false },
      { label:'company', key: 'company' },
      { label: 'position name', key: 'position_name' },
      { label: 'locations', key: 'locations',   },
      { label: 'description', key: 'description', align: 'center', },
      { label: 'salary', key: 'salary', align: 'center',  },
      { label: 'deadline', key: 'deadline', align: 'center',  },
      { label: 'createdAt', key: 'createdAt', align: 'center',  },
      { label: 'createdBy', key: 'createdBy', align: 'center',  },
    ]"
    :rows="vacancies"
  >

    <template #cell-id="{ value }">
      <span class="maz-text-base">{{value}}</span>
    </template>
    <template #actions="{ row }">
      <MazBtn 
      :loading="isLoading(row.id)"
      @click="deleteVacancy(row)" 
      rounded-size="full" 
      color="danger" :left-icon="MazTrash" size="xs" 
      v-tooltip.left="{ text: 'delete vacancy', color: 'default' }"
      />
    </template>
    <template #title>
      <div class="myTableHeader">
        <h4>posted vacancies</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'Post New Vacancy', color: 'default', }" @click="$router.push({name:'vacancyPost'})"></MazBtn>
      </div>
    </template>
  </MazTable>
</template>

<style scoped lang="scss">
  @use "@/assets/style/variables" as *;

  .myTableHeader{
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
    color: $text-blue;
  }
</style>