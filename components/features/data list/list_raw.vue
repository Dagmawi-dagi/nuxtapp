<script setup>
// comps
import custom_btn_1 from '@/components/Reusable/button/custom_btn_1.vue';
// composables
import { useResizeObserver,useTimeAgo } from '@vueuse/core';
import { ref,computed } from 'vue';

const props = defineProps({
  resize:Boolean,
  size: String, // 'small' 
  list_head : Object,
  raw_items_object: Object,
  below_raw_content: { // for  now this is only spporting Sting values
    type: String,
    default: null,
    required: false,
  },
  utils: Array, // [ 'edit', 'delete' ,'''' ],
  utils_dropdown_open : Boolean, // for action utill controll when many list raws are rendered
})

const emits = defineEmits(['onResize','raw','raw_item','utils_toggler','util'])

// customize the list raw  based on the list header manually form your code 
// the raw items should match what the list header(column) is telling us
// if the row item is defined on the list headers else Don't display it 
const customized_list_raw_items_object = computed(()=>{
  const obj = {
    // always include the id of the Document to the list raw document but it wont be renderd  we may need it for CRUD operations
    id: props.raw_items_object._id ?? props.raw_items_object.id,
  }

  Object.keys(props.list_head).forEach(tab => {
    if ( tab == 'createdAt' ) obj[tab] = useTimeAgo( props.raw_items_object.createdAt ).value
    else if ( tab == 'updatedAt' ) obj[tab] = useTimeAgo( props.raw_items_object.updatedAt ).value
    else obj[tab] = props.raw_items_object[tab]
    // ...
  });

  return obj
})


const list_raw_el_container_minHight = 45
const list_raw_el_container = ref(null)
const resizeing = ref(false)
useResizeObserver(list_raw_el_container, (entries) => {
  const height = entries[0].contentRect.height
  if (height <= list_raw_el_container_minHight )  return resizeing.value = false
    resizeing.value = true
    emits('onResize',height) // we will use this event for the list drawer.vue
})

</script>

<template>
  <div  class="raw-container" ref="list_raw_el_container"  :size="size" :style="{resize: resize ? 'vertical' : '' }" >
    
    <div class="raw" @click="$emit('raw',raw_items_object)" :style="{paddingTop:resizeing ? '10px' : '', }">
      
      <template v-for="(key, i) in Object.keys( customized_list_raw_items_object )" :key="i" >
        <span @click.stop="emits('raw_item',{obj:raw_items_object, key}) " v-if="Object.keys(list_head).includes(key)" class="item" 
          :style="{  
              width: list_head[key]?.width, 
              backgroundColor:list_head[key]?.bg,
              color:list_head[key]?.tx,
              textWrap: resizeing ? 'wrap' : 'noWrap',
              alignSelf: resizeing ? 'start' : ''
            }"
          :class="{ grow: list_head[key]?.grow }">  {{ customized_list_raw_items_object[key] ?? 'undefined' }}   
        </span>

        <span class="Vline" v-if=" Object.keys( customized_list_raw_items_object )[i+1] && Object.keys(list_head).includes(key) " :style="{ alignSelf: resizeing ? 'start' : ''  }"/>
      </template>
    </div>

    <span class="util" @click="emits('utils_toggler')"  v-if="utils.length >0" />
    <div class="dropdown" v-if="utils_dropdown_open && utils.length >0"> 
      <custom_btn_1 v-for="(util,i) in utils " :key="i" 
      :spinner="{color: '#fff',width: '14px'}"
      :loading_state="false"
      @btn="emits('util',{ util_name:util,data: raw_items_object })"
      >{{ util }}</custom_btn_1>
    </div>

    <!-- we can add other stuff below the raw .. that only shows up after resizing the raw  -->
    <div v-if="resizeing" class="below_card_content">{{ below_raw_content  }} </div>

  </div>
</template>
<style scoped lang="scss">
@use './style/list_raw.scss' as *;
</style>

<!-- <list_raw
  :resize='Boolean'
  :size="'small'"
  :list_head="list_head"
  :raw_items_object="obj"
  :below_raw_content="'orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdforerdfsfsdfsdf orerdfsfsdfsdforerdfsfsdfsdf orerdfsfsdfsdf v orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf orerdfsfsdfsdf'"
  :utils="['edit','delete','update']"
  :utils_dropdown_open="utils_dropdown_open"
  @utils_toggler="utils_dropdown_open === true ? utils_dropdown_open  = false :  utils_dropdown_open  = true"
  @util="a"
  @raw="a"
  @raw_item="a"
/> -->