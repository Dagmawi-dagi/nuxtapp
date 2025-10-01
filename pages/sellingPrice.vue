<script setup>
import { FactorySellingPrice,AgentsSellingPrice } from '@/public/site_info_ref'

definePageMeta({
    layout:"default",
    name: 'sellingPrice',
})


const { mobilePhone } = useBreakPoint()

const tableRef = ref(null)
useResizableColumns(tableRef, {
  skipClasses: ['actions-column', 'selection-column'],
  minWidth: 70
})
</script>

<template>
    <MazTable 
        ref="tableRef"
        :style="{width:mobilePhone ? '95%' : '80%'}"
        class="MyMazTable"
        size="sm"
        :input-size="'sm'"
        :no-search-by="true"
        search
        :color="'primary'"
        sortable
        :selectable="false"
        scrollable 
        hoverable
        background-even
        selected-key="id"
        :headers="[
        { label:'No', key: 'id', align: 'center', classes: 'selection-column trancate',sortable: false },
        { label:'item', key: 'item', classes:'trancate'  },
        { label: 'Price before any tax name', key: 'Price before any tax', classes:'trancate' },
        { label: 'Excise tax', key: 'Excise tax', classes:'trancate' },
        { label: 'VAT', key: 'VAT', align: 'center', classes:'trancate'},
        { label: 'Excise tax+VAT', key: 'Excise tax+VAT', align: 'center', classes:'trancate' },
        { label: 'Total price with Excise tax & VAT', key: 'Total price with Excise tax & VAT', align: 'center', classes:'trancate' },
        ]"
        :rows="FactorySellingPrice"
    >
        <template #title>
        <div class="myTableHeader">
            <h4 style="font-weight: normal;">Factory Selling Price</h4>
        </div>
        </template>
    </MazTable>
    
    <MazTable 
        ref="tableRef"
        :style="{width:mobilePhone ? '95%' : '80%'}"
        class="MyMazTable"
        size="sm"
        :input-size="'sm'"
        :no-search-by="true"
        search
        :color="'primary'"
        sortable
        :selectable="false"
        scrollable 
        hoverable
        background-even
        selected-key="id"
        :headers="[
        { label:'No', key: 'id', align: 'center', classes: 'selection-column trancate',sortable: false },
        { label:'item', key: 'item', classes:'trancate'  },
        { label: 'Price before any tax name', key: 'Price before any tax', classes:'trancate' },
        { label: 'Excise tax', key: 'Excise tax', classes:'trancate' },
        { label: 'VAT', key: 'VAT', align: 'center', classes:'trancate'},
        { label: 'Excise tax+VAT', key: 'Excise tax+VAT', align: 'center', classes:'trancate' },
        { label: 'Total price with Excise tax & VAT', key: 'Total price with Excise tax & VAT', align: 'center', classes:'trancate' },
        ]"
        :rows="AgentsSellingPrice"
    >
        <template #title>
        <div class="myTableHeader">
            <h4 style="font-weight: normal;">Agents Selling Price</h4>
        </div>
        </template>
    </MazTable>
  
</template>

<style scoped lang="scss">
  @use "@/assets/style/dashboard/mazTableUi.scss" as *;
  .MyMazTable{
    margin: 0 auto;
    margin-bottom: 5rem;
  }
  .myTableHeader{
    margin: 0;
  }
</style>