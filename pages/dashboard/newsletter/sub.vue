<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'
import { format } from 'date-fns';
  
definePageMeta({
  layout:"dashboard",
  name: 'newsletterSub',
  middleware:['auth'],
})

const { subscribers,perPage,page } = storeToRefs(useNewsLetterStore())
try {
  const { data } = await useFetch('/api/newsletter/sub', {
    method:'get',
    headers: {
      apiref: '/api/newsletter/sub/GET',
    },
  })
  subscribers.value = data.value?.data  // important: use .value
} catch (error) {
  console.log(error );
}


const selectedIds = ref()
const searchQuery = ref()

const loadingIds = ref([]) // holds the ids of rows being deleted
const isLoading = (id) => loadingIds.value.includes(id)
const deleteSub = async (sub) => {
  if (!sub?.id) return
  loadingIds.value.push(sub.id)

    try {
      const {data} = await  $fetch(`/api/newsletter/sub/delete/${sub.id}`,{
          method:'PATCH',
          body:{confirmed: false},
          headers:{
            apiref:'/api/newsletter/sub/delete/[id]/PATCH'
          }
        })
      frontEndErrorFeedback().success(' subscriber deleted successfully')
    // ✅ Reactive update using splice
    const index = subscribers.value.findIndex(v => v.id === sub.id)
    // ✅ Reactive update by creating new array
      if (index !== -1) {
          const updatedSubs = [...subscribers.value]
          updatedSubs[index] = data[0]
          subscribers.value = updatedSubs
      }

  } catch (error) {
      frontEndErrorFeedback().err(error)
  } finally {
    loadingIds.value = loadingIds.value.filter(id => id !== sub.id)
  }
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
      { label:'Doc id', key: 'id', align: 'center', classes: 'selection-column trancate',sortable: true },
      { label:'name', key: 'name' ,classes:'trancate'},
      { label: 'email', key: 'email', align: 'center',classes:'trancate'  },
      { label: 'confirmed', key: 'confirmed',classes:'trancate' },
      { label: 'unsubscribe', key: 'unsubscribe', align: 'center', classes: 'maz-font-bold trancate' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold trancate' },
      { label: '', key: 'actions', align: 'center', classes:'actions-column', sortable: false,}, // Added empty header for actions
    ]"
    :rows="subscribers"
  >
    <template #cell-createdAt="{ value }">
      <span >{{  format(new Date(value), 'MMM dd,yyyy') }}</span>
    </template>
  <template #cell-actions="{ row }">
      <div class="actions-container">
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="deleteSub(row)" 
          color="danger" :left-icon="MazTrash" size="xs" 
          v-tooltip.left="{ text: 'delete subscriber', color: 'default' }"
        />
      </div>
    </template>
    <template #title>
      <div class="myTableHeader">
        <h4>Newsletter Subscriptions</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'Add New Newsletter Subscriptions', color: 'default', }" @click="$router.push({name:'AddNewNewsletterSub'})"></MazBtn>
      </div>
    </template>
  </MazTable>
</template>

<style scoped lang="scss">
  @use "@/assets/style/dashboard/mazTableUi.scss" as *;
</style>