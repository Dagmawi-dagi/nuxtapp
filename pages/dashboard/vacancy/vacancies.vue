<script setup>
// lib
import { format } from 'date-fns';
import { MazTrash,MazPlus,MazPencil } from '@maz-ui/icons'
  
definePageMeta({
  layout:"dashboard",
  name: 'vacancies',
  middleware:['auth'],
})

const { vacancies,page,perPage } = storeToRefs(useVacancyStore())
const { any_open_modal } = useUtilStore()
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

const updateVacancy = (vacancy)=>{
  any_open_modal.id = 'updateVacancy'
  any_open_modal.AnythingTopass = vacancy
  any_open_modal.bool = true
}

onMounted(() => {
 const rows  =  document.querySelectorAll('.m-table-row')
  rows.forEach((el)=>{
    el.addEventListener('mouseover',()=>{
      console.log(el);
    })
  })

})
</script>

<template>
<MazTable 
    class="MyMazTable"
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
    scrollable
    hoverable
    background-even
    selected-key="id"
    :headers="[
      { label:'#', key: 'id', align: 'center', width: '1rem', sortable: true },
      { label:'company', key: 'company',  },
      { label: 'position name', key: 'position_name' },

    ]"
    :rows="vacancies"
  >
    <template #cell-createdAt="{ value }">
      <span >{{  format(new Date(value), 'MMMM dd,yyyy') }}</span>
    </template>
      <template #cell-deadline="{ value }">
      <span >{{  format(new Date(value), 'MMMM dd,yyyy') }}</span>
    </template>
    

    <template #actions="{ row }"  v-if="false">
      <div 
        class="actions-container" 
      >
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="deleteVacancy(row)" 
          color="danger" :left-icon="MazTrash" size="xs" 
          v-tooltip.left="{ text: 'delete vacancy', color: 'default' }"
        />
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="updateVacancy(row)" 
          color="primary" :left-icon="MazPencil" size="xs" 
          v-tooltip.left="{ text: 'update vacancy', color: 'default' }"
        />
      </div>
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

  .MyMazTable :deep(.truncate) {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .actions-container{
    background-color: brown;
    position: absolute;
    top: 50%;
    left: 50%;
    right: 1rem;
    transform: translate(-50%, -50%);
    gap: 0 .5rem;
    display: flex;
    & .m-btn{
      min-width: max-content;
    }
  }


</style>