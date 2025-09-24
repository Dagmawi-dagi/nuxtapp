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

const tableRef = ref(null)
useResizableColumns(tableRef, {
  skipClasses: ['actions-column', 'selection-column'],
  minWidth: 70
})

</script>


<template>
<MazTable 
    ref="tableRef"
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
      { label:'Doc id', key: 'id', align: 'center',  classes: 'selection-column',sortable: true },
      { label:'company', key: 'company', classes:'trancate'  },
      { label: 'position name', key: 'position_name', classes:'trancate' },
      { label: 'locations', key: 'locations', classes:'trancate' },
      { label: 'description', key: 'description', align: 'center', classes:'trancate'},
      { label: 'salary', key: 'salary', align: 'center', classes:'trancate' },
      { label: 'requirements', key: 'requirements', align: 'center', classes:'trancate' },
      { label: 'deadline', key: 'deadline', align: 'center', classes:'trancate' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes:'trancate'  },
      { label: 'createdBy', key: 'createdBy', align: 'center', classes:'trancate'  },
      { label: 'updatedBy', key: 'createdBy', align: 'center', classes:'trancate' },
      { label: '', key: 'actions', align: 'center', classes:'actions-column', sortable: false,}, // Added empty header for actions
    ]"
    :rows="vacancies"
  >
    <template #cell-createdAt="{ value }">
      <span >{{  format(new Date(value), 'MMM dd,yyyy') }}</span>
    </template>
      <template #cell-deadline="{ value }">
      <span >{{  format(new Date(value), 'MMM dd,yyyy') }}</span>
    </template>

    <template #cell-actions="{ row }">
      <div class="actions-container">
        <MazBtn 
          @click="updateVacancy(row)" 
          color="primary" :left-icon="MazPencil" size="xs" 
          v-tooltip.left="{ text: 'update vacancy', color: 'default' }"
        />
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="deleteVacancy(row)" 
          color="danger" :left-icon="MazTrash" size="xs" 
          v-tooltip.left="{ text: 'delete vacancy', color: 'default' }"
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
  @use "@/assets/style/dashboard/mazTableUi.scss" as *;
</style>