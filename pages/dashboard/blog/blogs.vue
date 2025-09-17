<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'

definePageMeta({
  layout:"dashboard",
  name: 'blogs',
  middleware:['auth'],
})
const { data: users } = await useFetch('/api/blog', {
  method:'get',
  headers: {
    apiref: '/api/blog/GET',
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
      { label:'Doc id', key: 'id', align: 'center', width: '4rem', sortable: false },
      { label:'title', key: 'title' },
      { label: 'category', key: 'category', align: 'center'  },
      { label: 'content', key: 'content' },
      { label: 'createdBy', key: 'createdBy', align: 'center', classes: 'maz-font-bold' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold' },
    ]"
    :rows="users?.data"
  >
    <template #cell-id="{ value }">
      <span class="maz-text-base">{{value}}</span>
    </template>
 
    <template #actions>
      <MazBtn  rounded-size="full" color="danger" :left-icon="MazTrash" size="xs" v-tooltip.left="{ text: 'delete blog post', color: 'default' }"/>
    </template>
    <template #title>
      <div class="myTableHeader">
        <h4>posted blogs</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'Post New Blog', color: 'default', }" @click="$router.push({name:'postBlog'})"></MazBtn>
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