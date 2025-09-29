<script setup>
// lib
import { format } from 'date-fns';
import { MazTrash,MazPlus,MazPencil } from '@maz-ui/icons'
  
definePageMeta({
  layout:"dashboard",
  name: 'newsletters',
  middleware:['auth'],
})
const { newsletters,page,perPage } = storeToRefs(useNewsLetterStore())


try {
  const { data } = await useFetch('/api/newsletter/', {
    headers: {
      apiref: '/api/newsletter/GET',
    },
  })
  newsletters.value = data.value?.data  // important: use .value
} catch (error) {
  console.log(error );
}


const selectedIds = ref()
const searchQuery = ref()

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
      { label:'Doc id', key: 'id', align: 'center', classes: 'selection-column trancate',sortable: true },
      { label:'subject', key: 'subject',classes:'trancate' },
      { label: 'content', key: 'content', align: 'center',classes:'trancate'  },
      { label: 'recipientsIds', key: 'recipientsIds',classes:'trancate' },
      { label: 'createdBy', key: 'createdBy', align: 'center', classes: 'maz-font-bold trancate' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold trancate' },
      { label: '', key: 'actions', align: 'center', classes:'actions-column', sortable: false,}, // Added empty header for actions
    ]"
    :rows="newsletters"
  >

    <template #cell-createdAt="{ value }">
      <span >{{  format(new Date(value), 'MMM dd,yyyy') }}</span>
    </template>


    <template #title>
      <div class="myTableHeader">
        <h4>Sent Newsletters</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'send new newsletter ', color: 'default', }" @click="$router.push({name:'sendNewsletter'})"></MazBtn>
      </div>
    </template>
  </MazTable>
</template>

<style scoped lang="scss">
  @use "@/assets/style/dashboard/mazTableUi.scss" as *;
</style>