<script setup>

</script>


<template>
    <div class="modal-overlay" @click.self="">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    z-index: 999;
    overflow-y: auto;
    padding: 3rem 20px;
    cursor: pointer;
}
</style>