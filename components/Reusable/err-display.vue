<script setup>
  defineProps({
    err: Boolean,
    succMsg: String,
    errMsg: String
  })
</script>

<template>
  <div class="status-container">
    <p class="err-msg" v-if="err">{{ errMsg }}</p>
    <p class="succ-msg" v-if="!err && succMsg">{{succMsg}}</p>
  </div>
</template>

<style scoped lang="scss">
  @use './style/err-display.scss' as *;
</style>