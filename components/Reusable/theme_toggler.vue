<script setup>
// libs
import gsap from 'gsap'
// composables
import { use_set_theme } from '../../composables/set-theme'
// stores
import { use_util_store } from '../../stores/util-store'
import { storeToRefs } from 'pinia'
// vue
const { set_theme } = use_set_theme()
const { dark_theme } = storeToRefs(use_util_store())

const toggle = (dark) => {
  if (dark) gsap.fromTo('.moon', { right: '20px' }, { right: 0, duration: 0.3 })
  if (!dark) gsap.fromTo('.sun', { left: '20px' }, { left: 0, duration: 0.3 })
}
</script>

<template>
  <div
    class="themeContainer"
    @click.stop="(dark_theme = !dark_theme), set_theme(dark_theme), toggle(dark_theme)"
  >
    <span class="themeIcon sun" :style="{ visibility: dark_theme ? 'hidden' : 'visible' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    </span>

    <span class="themeIcon moon" :style="{ visibility: dark_theme ? 'visible' : 'hidden' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </span>
  </div>
</template>

<style scoped lang="scss">
@use './style/theme-toggle.scss' as *;
</style>
