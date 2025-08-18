<script setup>
// composables
import { useScroll } from '@vueuse/core';
// vue
import { ref,watch }   from 'vue';

const props =  defineProps({
  containerRef: Object,
  fromTop: Number
})
const show_scrollTop_Icon = ref(false )
const { y } = useScroll( props.containerRef )
watch(y,()=>{
  if( y.value > props.fromTop )  return show_scrollTop_Icon.value = true
  show_scrollTop_Icon.value = false
})
const scrollTo = ()=>{
  props.containerRef.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <span class="scrollTop" @click="scrollTo" v-if="show_scrollTop_Icon"  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  </span >
</template>

<style scoped lang="scss"> 
@use '../../style/mixins' as *;
.scrollTop{
  @include flexbox;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color:  darken($color: $dark-red, $amount: 10)  ;
  color: #fff;
  cursor: pointer;
  & svg{
    width: 60%;
    stroke-width: 3px;
  }
}
</style>