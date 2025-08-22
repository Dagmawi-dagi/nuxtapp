<script setup>

</script>

<template>
  <nav>
    <div class="container">
      <img @click="$router.push('/dashboard')" src="/assets/pictures/desta-logo.png" alt="logo" >
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '/assets/style/dashboardTopnav.scss' as *;
</style>