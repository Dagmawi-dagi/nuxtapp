<script setup>
defineProps({
  list_head : Object,
  size:String 
})
</script>

<template>
  <div class="tabsContainer" :size="size" >
    <template v-for="(key,i) in Object.keys(list_head)"  :key="i">
      <span class="tab"  :style="{ width:  list_head[key].width}" :class="{ grow: list_head[key].grow }" >  {{ key }} </span>
      <span class="Vline"  v-if="i !== Object.keys(list_head).length - 1 "> </span>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use './style/list_head.scss' as *;
</style>