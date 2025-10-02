<script setup>
import { FactorySellingPrice,AgentsSellingPrice } from '@/public/site_info_ref'

definePageMeta({
  layout:"default",
  name: 'sellingPrice',
})

useSeoMeta({
  title: "Factory Selling Prices - DESTA ALCOHOL & LIQUOR PLC",
  description: "Check the official factory selling prices for DESTA ALCOHOL & LIQUOR PLC products in Ethiopia. View vodka, gin, ouzo, zebib, superment, lemon, coffee, apple, annanas, denatured alcohol, and sanitizer prices with and without tax.",
  ogTitle: "Factory Selling Prices - DESTA ALCOHOL & LIQUOR PLC",
  ogDescription: "Official factory price list for Desta Alcohol & Liquor PLC – Vodka, Gin, Ouzo, Zebib, Superment, Lemon, Coffee, Apple, Annanas, Denatured Alcohol, and Sanitizer. Prices include Excise Tax & VAT.",
  ogUrl: "https://www.destaalcohol.et/sellingPrice",
  ogImage: "https://www.destaalcohol.com/pictures/desta-logo.png",
  twitterCard: "summary_large_image",
  keywords: "factory alcohol prices Ethiopia, Desta vodka price, Desta gin price, Desta ouzo price, Desta zebib price, Desta liquor PLC price list, Ethiopian liquor factory prices"
})

const sellingPriceSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Factory Selling Prices - DESTA ALCOHOL & LIQUOR PLC",
  "description": "Official factory alcohol & liquor selling prices including excise tax and VAT in Ethiopia.",
  "url": "https://www.destaalcohol.et/sellingPrice",
  "numberOfItems": FactorySellingPrice.length,
  "itemListElement": FactorySellingPrice.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": item.item,
      "brand": {
        "@type": "Brand",
        "name": "DESTA ALCOHOL & LIQUOR PLC"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "ETB",
        "price": item["Total price with Excise tax & VAT"],
        "url": "https://www.destaalcohol.et/sellingPrice",
        "availability": "https://schema.org/InStock",
        "eligibleRegion": {
          "@type": "Country",
          "name": "Ethiopia"
        }
      }
    }
  }))
}))

useHead({
  script: [
    {
      key: 'selling-price-schema',
      type: 'application/ld+json',
      children: JSON.stringify(sellingPriceSchema.value)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.destaalcohol.et/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Factory Selling Prices",
            "item": "https://www.destaalcohol.et/sellingPrice"
          }
        ]
      })
    }
  ]
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