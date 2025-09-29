<script setup>
// lib
import { format } from 'date-fns';
import { MazTrash,MazEye } from '@maz-ui/icons'

definePageMeta({
  layout:"dashboard",
  name: 'vacancy applications',
  middleware:['auth'],
})

const { applications,page,perPage } = storeToRefs(useVacancyStore())
const { any_open_modal } = useUtilStore()

try {
  const { data } = await useFetch('/api/vacancy/applications', {
    method:'get',
    headers: {
      apiref: '/api/vacancy/applications/GET',
    },
  })

  applications.value = data.value?.data
} catch (error) {
  console.log(error);
}

const selectedIds = ref()
const searchQuery = ref()

const loadingIds = ref([]) // holds the ids of rows being deleted
const isLoading = (id) => loadingIds.value.includes(id)

const deleteApplication = async (application)=>{
  if (!application?.id) return
  loadingIds.value.push(application.id)

  try {
    await $fetch(`/api/vacancy/application/${application.id}`,{
      method:'DELETE',
      headers:{
        apiref:"/api/vacancy/application/[id]DELETE"
      }
    })
    frontEndErrorFeedback().success(' vacancy deleted successfully')
    applications.value = applications.value.filter(p => p.id !== application.id)
  } catch (error) {
      frontEndErrorFeedback().err(error)
  } finally {
    loadingIds.value = loadingIds.value.filter(id => id !== application.id)
  }
}

const showApplication = (application)=>{
  any_open_modal.id = 'ViewVacancyApplication'
  any_open_modal.AnythingTopass = application
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
      { label:'#', key: 'id', align: 'center',  classes: 'selection-column',sortable: true },
      { label:'vacancy', key: 'vacancyId', classes:'trancate'  },
      { label:'fullName', key: 'fullName', classes:'trancate'  },
      { label:'phoneNumber', key: 'phoneNumber', classes:'trancate'  },
      { label:'email', key: 'email', classes:'trancate'  },
      { label: 'uploaded_files name', key: 'uploaded_files', classes:'trancate' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes:'trancate'  },
      { label: '', key: 'actions', align: 'center', classes:'actions-column', sortable: false,}, // Added empty header for actions
    ]"
    :rows="applications"
  >
    <template #cell-createdAt="{ value }">
      <span >{{  format(new Date(value), 'MMM dd,yyyy') }}</span>
    </template>
  
    <template #cell-fullName="{ row }">
      <span>{{ typeof(row.application_form) }}</span>
    </template>

    <template #cell-phoneNumber="{ row }">
      <span>{{ row.application_form?.phoneNumber || null }}</span>
    </template>

    <template #cell-email="{ row }">
      <span>{{ row.application_form?.email || null }}</span>
    </template>

    <template #cell-actions="{ row }">
      <div class="actions-container">
        <MazBtn 
          @click="showApplication(row)" 
          color="info" :left-icon="MazEye" size="xs" 
          v-tooltip.left="{ text: 'view application', color: 'default' }"
        />
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="deleteApplication(row)" 
          color="danger" :left-icon="MazTrash" size="xs" 
          v-tooltip.left="{ text: 'delete application', color: 'default' }"
        />
      </div>
    </template>

    <template #title>
      <div class="myTableHeader">
        <h4>Applied Applications</h4>
      </div>
    </template>
  </MazTable>
</template>

<style scoped lang="scss">
  @use "@/assets/style/dashboard/mazTableUi.scss" as *;
</style>