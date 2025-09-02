<script setup>
//comps
import listHead from './list_head.vue'
import listFilterSearch from './list_filter_search.vue'
import listRaw from './list_raw.vue';
import list_drawer from './list_drawer.vue';
import spinner_ from '@/components/Reusable/spinner_.vue';
// vue 
import { ref } from 'vue';

defineEmits(['filter','search','raw','raw_item','util'])
defineProps({
  data_loading: Boolean,

  list_items: Array,
  with_list_filter_search: Boolean,
  with_list_head: Boolean,
  raws_container_margin: String,

  list_filter_search:Object, // this object will hold all the needed props for the filter_search
  list_head:Object, // this object will hold all the needed props for the header
  list_raw:Object, // this object will hold all the needed props for the raw
})

const data_list_utils_dropdown_open = ref(null)

</script>
<template>
  <div>
    <div class="fixed">
      <list-filter-search  v-if="with_list_filter_search"  
        :size="list_filter_search.size"
        :filter_bool="list_filter_search.filter_bool" 
        :filterArray="list_filter_search.filterArray" 
        :search_bool="list_filter_search.search_bool" 
        @filter="$emit('filter',$event)"  
        @search="$emit('search',$event)"
      >
        <slot name="list_filter_search"></slot>
      </list-filter-search>
      
      <listHead v-if="with_list_head" 
      :size="list_head.size" 
      :list_head="list_head.heads" 
      />
    </div>
    
    <spinner_ v-if="data_loading" :style="{margin:raws_container_margin,marginLeft:'auto',marginRight:'auto'}" 
    :color="'var(--dark-red)'"  
    :width="'1.9rem'"
    />

    <h4 class="no_data_found" :style="{margin:raws_container_margin, fontSize: list_raw.size ? '13px':'' }" v-if="!data_loading && (list_items && list_items.length === 0)"> No Data Found </h4>

    <transition-group tag="div" name="list" :style="{margin:raws_container_margin}" >
        <template  v-for="(item,i) in list_items" :key="i"  >
            <listRaw 
            :resize="list_raw.resize"
            :size="list_raw.size"
            :list_head="list_raw.heads"
            :raw_items_object="item"
            :below_raw_content="'orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdforerdfsfsdfsdf orerdfsfsdfsdforerdfsfsdfsdf orerdfsfsdfsdf v orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf'"
            :utils="list_raw.utils" 
            :utils_dropdown_open="data_list_utils_dropdown_open === i"
            @utils_toggler="data_list_utils_dropdown_open === i ?  data_list_utils_dropdown_open = '' : data_list_utils_dropdown_open = i "
            @util="$emit('util',$event)"
            @raw="$emit('raw',$event)"
            @raw_item="$emit('raw_item',$event)"
          />
        </template> 
    </transition-group>

  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/style/variables" as *;
.fixed{
  position: fixed;
  width: -webkit-fill-available;
  top: $top-nav-2-height;
  z-index: $zindex-top-nav;
}
.spinner{
  z-index: 99999999999999;
  margin: auto;
  margin-top: 1rem;
}
.no_data_found{
  color: $text-blue;
  text-align: center;
}
</style>