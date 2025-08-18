<script setup>
import ReusableSpinner from '../spinner.vue';
defineProps({
  spinner: Object,
  loading_state: Boolean,
  succMsg: Boolean,
  errMsgDisplay: String
})
</script>

<template>
  <span>
    <button class="btn" @click="$emit('btn')" >
      <slot>click me</slot>
      <ReusableSpinner  v-if="loading_state" :color="spinner?.color" :width="spinner?.width" />
      <svg :width="spinner?.width" v-if="succMsg && !loading_state"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </button>
    <p class="err-msg" v-if="errMsgDisplay">{{ errMsgDisplay }}</p>
  </span>

</template>

<style scoped lang="scss">
@use '../../../style/variables' as *;
@use '../../../style/mixins' as *;
@use '../../../style/global.scss' as *;
.btn{
  margin-bottom: 10px;
 
  &:hover {
    filter: brightness(120%);
  }
  &:active {
    filter: brightness(80%);
  }
  &{
    @include button($bg-color:darken($color: $light-blue, $amount: 35), $text-color:white,$cssvar:false);
  }
  &{
    @include flexbox();
    gap: 7px;
  }
}
</style>