<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'
  
definePageMeta({
  layout:"dashboard",
  name: 'newsletterSub',
  middleware:['auth'],
})

const { data: newsletterSubs } = await useFetch('/api/newsletter/sub', {
  method:'get',
  headers: {
    apiref: '/api/newsletter/sub/GET',
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
      { label:'name', key: 'name' },
      { label: 'email', key: 'email', align: 'center'  },
      { label: 'confirmed', key: 'confirmed' },
      { label: 'unsubscribe', key: 'unsubscribe', align: 'center', classes: 'maz-font-bold' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold' },
    ]"
    :rows="newsletterSubs?.data"
  >
    <template #actions>
      <MazBtn  rounded-size="full" color="danger" :left-icon="MazTrash" size="xs" v-tooltip.left="{ text: 'delete subscriber', color: 'default' }"/>
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
  @use "@/assets/style/variables" as *;

  .myTableHeader{
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
    color: $text-blue;
  }
</style>