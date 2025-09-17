<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'
  
definePageMeta({
  layout:"dashboard",
  name: 'newsletters',
  middleware:['auth'],
})

const { data: newsletters } = await useFetch('/api/newsletter', {
  headers: {
    apiref: '/api/newsletter/GET',
  },
}).catch(err=>{
    console.log(err);
    frontEndErrorFeedback().err(err)
})

const selectedIds = ref()
const searchQuery = ref()
const page = ref(1)
const pageSize = ref(10)

</script>

<template>
<MazTable 
    size="sm"
    v-model="selectedIds"
    v-model:search-query="searchQuery"
    v-model:page="page"
    v-model:page-size="pageSize"
    search
    pagination
    color="info"
    sortable
    selectable
    hoverable
    background-even
    selected-key="id"
    :headers="[
      { label:'#', key: 'index', align: 'center', width: '2rem', sortable: false },
      { label:'subject', key: 'subject' },
      { label: 'content', key: 'content', align: 'center'  },
      { label: 'recipientsIds', key: 'recipientsIds' },
      { label: 'createdBy', key: 'createdBy', align: 'center', classes: 'maz-font-bold' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold' },
    ]"
    :rows="newsletters?.data"
  >
    <template #title>
      <div class="myTableHeader">
        <h4>Sent Newsletters</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'send new newsletter ', color: 'default', }" @click="$router.push({name:'sendNewsletter'})"></MazBtn>
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