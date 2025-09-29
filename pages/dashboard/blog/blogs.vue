<script setup>
import { format } from 'date-fns';
import { MazTrash,MazPlus,MazEye,MazPencil } from '@maz-ui/icons'

definePageMeta({
  layout:"dashboard",
  name: 'blogs',
  middleware:['auth'],
})

const { blogPosts,page,perPage } = storeToRefs(useBlogStore())
const {any_open_modal} = useUtilStore()

try {
  const { data } = await useFetch('/api/blog', {
    method:'get',
    headers: {
      apiref: '/api/blog/GET',
    },
  })
  
  blogPosts.value = data.value?.data

} catch (error) {
  console.log(error);
}

const selectedIds = ref()
const searchQuery = ref()

const loadingIds = ref([]) // holds the ids of rows being deleted
const isLoading = (id) => loadingIds.value.includes(id)

const deleteBlog =async (blog)=>{
  if (!blog?.id) return
  loadingIds.value.push(blog.id)

  try {
    await $fetch(`/api/blog/${blog.id}`,{
      method:'DELETE',
      headers:{
        apiref:"/api/blog/[id]/DELETE"
      }
    })
    frontEndErrorFeedback().success(' blog deleted successfully')
    blogPosts.value = blogPosts.value.filter(v => v.id !== blog.id)
  } catch (error) {
      frontEndErrorFeedback().err(error)
  } finally {
    loadingIds.value = loadingIds.value.filter(id => id !== blog.id)
  }
}

const updateBlog = (blog)=>{
  any_open_modal.id = 'updateBlog'
  any_open_modal.AnythingTopass = blog
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
      { label:'Doc id', key: 'id', align: 'center', width: '100px', sortable: true,classes: 'selection-column trancate' },
      { label:'title', key: 'title' ,classes:'trancate'},
      { label: 'category', key: 'category', align: 'center',classes:'trancate'  },
      { label: 'content', key: 'content',classes:'trancate' },
      { label: 'createdBy', key: 'createdBy', align: 'center', classes:'trancate'},
      { label: 'createdAt', key: 'createdAt', align: 'center', classes:'trancate' },
      { label: 'updatedBy', key: 'createdBy', align: 'center', classes:'trancate' },
      { label: '', key: 'actions', align: 'center', classes:'actions-column', sortable: false,}, // Added empty header for actions
    ]"
    :rows="blogPosts"
  >
    <template #cell-id="{ value }">
      <span class="maz-text-base">{{value}}</span>
    </template>
    <template #cell-createdAt="{ value }">
      <span >{{  format(new Date(value), 'MMM dd,yyyy') }}</span>
    </template>

    <template #cell-actions="{ row }">
      <div class="actions-container">
        <MazBtn 
          color="info" :left-icon="MazEye" size="xs" 
          v-tooltip.left="{ text: 'view blog post', color: 'default' }"
        />
        <MazBtn 
          @click="updateBlog(row)" 
          color="primary" :left-icon="MazPencil" size="xs" 
          v-tooltip.left="{ text: 'update blog post', color: 'default' }"
        />
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="deleteBlog(row)" 
          color="danger" :left-icon="MazTrash" size="xs" 
          v-tooltip.left="{ text: 'delete blog post', color: 'default' }"
        />
      </div>
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
  @use "@/assets/style/dashboard/mazTableUi.scss" as *;
</style>