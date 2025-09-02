<script setup>
const { desktop,laptop,mobilePhone,tablet } = useBreakPoint()
const { sideBarOpen } = storeToRefs(useUtilStore())


const expand = computed(()=>{
  if( (desktop.value || laptop.value) && !sideBarOpen.value  ) return true
  if( (mobilePhone.value || tablet.value) ) return true
  return false
})

</script>

<template>
        <DashboardTopnav/>
        <div class="main">
            <DashboardAside/>
            <div  class="router-view" :class="{ expand }"  ref="router_view_container" >
                <slot/>
            </div>
        </div>
</template>

<style scoped lang="scss">

@use "@/assets/style/variables" as *;
@use "@/assets/style/mixins" as *;


.main{
  display: flex;
  position: relative;
  background-color: var(--light-blue);
}
.router-view{
  position: absolute;
  top:0;
  right: 0;
  background-color: var(--light-blue);
  color: var(--text-dark-gray);
  width: calc(100vw - $side-nav-width);
  margin-left: auto;
  height: calc(100vh - $top-nav-2-height);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 1.5rem;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 8px -3px inset;
  @include transition($prop:( width: .5s));
  @include scrollbar();
  &.expand{
    @include transition($prop:( width: .5s));
    width: 100vw;
  }
}

</style>