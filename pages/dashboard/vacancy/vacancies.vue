<script setup>
import { MazTrash,MazPlus } from '@maz-ui/icons'
  
definePageMeta({
  layout:"dashboard",
  name: 'vacancies',
  middleware:['auth'],
})

const { data: vacancies } = await useFetch('/api/vacancy', {
  method:'get',
  headers: {
    apiref: '/api/vacancy/GET',
  },
}).catch(err=>{
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
      { label:'company', key: 'company' },
      { label: 'position name', key: 'position_name' },
      { label: 'locations', key: 'locations',   },
      { label: 'description', key: 'description', align: 'center', },
      { label: 'salary', key: 'salary', align: 'center',  },
      { label: 'deadline', key: 'deadline', align: 'center',  },
      { label: 'createdAt', key: 'createdAt', align: 'center',  },
      { label: 'createdBy', key: 'createdBy', align: 'center',  },
    ]"
    :rows="vacancies?.data"
  >
    <template #cell-index="{ value }">
      <span class="maz-text-base">{{value}}</span>
    </template>
    <template #actions>
      <MazBtn  rounded-size="full" color="danger" :left-icon="MazTrash" size="xs" v-tooltip.left="{ text: 'delete vacancy', color: 'default' }"/>
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