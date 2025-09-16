<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'

definePageMeta({
    layout:"dashboard",
    name: 'users',
    middleware:['auth']
})

const { data: users } = await useFetch('/api/user', {
  headers: {
    apiref: '/api/test/GET',
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
      { label:'userName', key: 'userName' },
      { label: 'email', key: 'email', align: 'center'  },
      { label: 'phoneNumber', key: 'phoneNumber' },
      { label: 'lastLoggedIn', key: 'lastLoggedIn', align: 'center', classes: 'maz-font-bold' },
      { label: 'role', key: 'role', align: 'center', classes: 'maz-font-bold' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold' },
    ]"
    :rows="users?.data"
  >
    <template #cell-index="{ value }">
      <span class="maz-text-base">{{value}}</span>
    </template>
    <template #cell-userName="{ row, value }">
      <div class="maz-flex maz-items-center maz-gap-2">
        <MazAvatar :src="`/users/${row.avatar}`" size="0.5rem"></MazAvatar>
        <span>{{value}}</span>
      </div>
    </template>
    <template #actions>
      <MazBtn  rounded-size="full" color="danger" :left-icon="MazTrash" size="xs" v-tooltip.left="{ text: 'delete user', color: 'default' }"/>
    </template>
    <template #title>
      <div class="myTableHeader">
        <h4>Users</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'create new user', color: 'default', }" @click="$router.push({name:'createUser'})"></MazBtn>
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