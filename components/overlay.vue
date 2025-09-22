<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

const { any_open_modal } = useUtilStore()
const closeModal = ()=>{
    any_open_modal.bool = false
    any_open_modal.id = ''
    any_open_modal.AnythingTopass = null
}
</script>

<template>
    <div class="modal-overlay" @click.self="closeModal">
        <!-- Default slot -->
        <slot></slot>
        <!-- Render container only if slot exists -->
        <div v-if="slots.container" class="container">
            <slot name="container"></slot>
        </div>
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

.container {
    width: min(95%, 700px);
    height: max-content;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
}
</style>