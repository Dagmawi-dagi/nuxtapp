<script setup>
  defineProps({
    color: String,
    width: String,
  })
</script>

<template>
    <div class="spinner" 
      :style="{  
      width:width,
      height:width,
      borderTopColor:color,
      borderBottomColor:color,
      borderLeftColor:color,
    }"/>
</template>

<style scoped lang="scss">
.spinner{
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 3px solid transparent;
  animation: spinner .5s infinite linear;
}
</style>
