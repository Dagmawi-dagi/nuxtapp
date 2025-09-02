<script setup>
// comps
import  Accordion from '../../Reusable/Accordion/accordion_.vue';
// composables
import { onClickOutside } from '@vueuse/core';
// vue
import { ref } from 'vue';

defineEmits(['filter','search'])
defineProps({
  filterArray : Array,
  size:String,
  filter_bool: Boolean,
  search_bool: Boolean
})

const serach_input = ref('')

const ActiveAcc = ref('')
const filterEl =  ref(null)
const filterDropdownOpen = ref(false)
onClickOutside(filterEl,()=>{filterDropdownOpen.value = false})
</script>

<template>
  <div class="container" :size="size" >
    <slot></slot> <!--we can pass any thing to the list header as a slot(default slot)  -->
    

    <div style="margin-left: auto;display: flex; gap: 1rem;">
      <div class="filter" ref="filterEl" v-if="filter_bool" >
        <span class="filter-icon"  @click="filterDropdownOpen = !filterDropdownOpen">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
        </span>
    
        <span class="filter-dropDown"  v-if="filterDropdownOpen">
          <span style="font-weight: bold;"> Filter </span>
          <Accordion 
            v-for="(item, i) in filterArray" :key="i"
            @accActive="ActiveAcc === item?.filterHeader ? ActiveAcc = '' :  ActiveAcc = $event" 
            @handleAccChoice=" $emit('filter',{filter_header: item?.filterHeader, filter: $event})"
            :accordion-open=" ActiveAcc === item?.filterHeader"
            :items="item?.filters"
            :sub-items="'sub'"
            :header="item?.filterHeader"
            :AccTogglerIcon="true" 
          />
        </span>
      </div>

      <!-- search -->
      <div class="search" v-if="search_bool" >
        <input type="text" class="search-input" placeholder="search"  v-model="serach_input"  @keyup.enter="$emit('search',serach_input)" >
        <span class="search-icon"   @click="$emit('search',serach_input)" >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z" fill="currentColor"></path></svg>
        </span>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">
@use './style/list_filter_search.scss' as *;
</style>