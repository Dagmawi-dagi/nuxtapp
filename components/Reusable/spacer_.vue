<script setup>
defineProps({
  space:String
})
// use padding instead of margins 
</script>
<template>
  <div :style="{padding:space}"/>
</template>