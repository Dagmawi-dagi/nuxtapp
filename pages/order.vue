<script setup>
import { SEO_KEYWORDS } from '@/public/SEOkeywords'
import { products } from '@/public/site_info_ref'

definePageMeta({
  layout: "default",
  name: "orderForm",
})

useSeoMeta({
  title: "Order Online - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  description: "Place your order directly with DESTA ALCOHOL & LIQUOR FACTORY PLC. Choose from vodka, gin, ouzo, zebib, superment, lemon, coffee, apple, annanas, denatured alcohol, and sanitizer. Available for local and export orders in Ethiopia.",
  ogTitle: "Order Online - DESTA ALCOHOL & LIQUOR FACTORY PLC",
  ogDescription: "Submit your order online for DESTA ALCOHOL & LIQUOR FACTORY PLC products. Available for Local and Export. Vodka, Gin, Ouzo, Zebib, Superment, Lemon, Coffee, Apple, Annanas, Denatured Alcohol, and Sanitizer.",
  ogUrl: "https://www.destaalcohol.et/order",
  ogImage: "https://www.destaalcohol.com/pictures/desta-logo.png",
  twitterCard: "summary_large_image",
   robots: 'index, follow',
  keywords: SEO_KEYWORDS().getAllKeywords().join(', '),
})

useHead({
  script: [
    {
      key: 'order-form-schema',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Alcohol & Liquor Orders",
        "provider": {
          "@type": "Organization",
          "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
          "url": "https://www.destaalcohol.et/",
          "logo": "https://www.destaalcohol.et/pictures/desta-logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+251914300007",
            "contactType": "customer service",
            "areaServed": "ET",
            "availableLanguage": ["en", "am"]
          }
        },
        "areaServed": {
          "@type": "Country",
          "name": "Ethiopia"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.destaalcohol.et/order",
          "priceCurrency": "ETB",
          "eligibleRegion": {
            "@type": "Country",
            "name": "Ethiopia"
          },
          "availability": "https://schema.org/InStock"
        },
        "potentialAction": {
          "@type": "OrderAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.destaalcohol.et/order",
            "inLanguage": "en",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "Order",
            "orderStatus": "https://schema.org/OrderProcessing"
          }
        }
      })
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
            "name": "Order Form",
            "item": "https://www.destaalcohol.et/order"
          }
        ]
      })
    }
  ]
})



const {mobilePhone,tablet} = useBreakPoint()

const getWidth = computed(()=>{
  if(mobilePhone.value) return '90%'
  if(tablet.value) return '70%'
  return '50%'
})
const orderMail = async (FD,form$)=>{
    const formData = new FormData()
    formData.append('fullName', form$.data.fullName)
    formData.append('email', form$.data.email)
    formData.append('country', form$.data.country)
    formData.append('phoneNumber', form$.data.phoneNumber)
    formData.append('orderArea', form$.data.orderArea)
    formData.append('product', form$.data.product)
    formData.append('message', form$.data.message)
    form$.data.FileAttachments.forEach(file => { formData.append("FileAttachments", file)});
  
  // send email
    try {
   await $fetch('/api/order',{
      method:'POST',
      headers:{
        apiref:'/api/order/POST'
      },
      body:formData
    })
    frontEndErrorFeedback().success('order sent successfully!')
  } catch (err) {
    frontEndErrorFeedback().err(err)
  } finally {
    // isSubmitting.value = false
  }
}

</script>

<template>
    <Vueform style="margin: 2rem auto;" :endpoint="orderMail" :style="{width: getWidth }" >
      <StaticElement
        name="header"
        tag="h3"
        content="Order Form"
        align="center"
        size="sm"
        bottom="3"
        top="1"
        style="color: #0072b8;text-transform: capitalize;"
      />
      <RadiogroupElement
        name="orderArea"
        :items="[
          {
            value: 'Local',
            label: 'Local',
          },
          {
            value: 'Export',
            label: 'Export',
          },
        ]"
        label="LOCAL / EXPORT"
        default="Local"
        size="sm"
        view="tabs"
        :rules="[
          'required',
        ]"
      :columns="{
            container: 5,
        }"
      />
      <TextElement
        name="fullName"
        label="Full Name"
        size="sm"
        :rules="[
          'required',
        ]"
      />
      <TextElement
        name="email"
        input-type="email"
        :rules="[
          'required',
          'email',
        ]"
        label="Email"
        size="sm"
      />
      <PhoneElement
        name="phoneNumber"
        label="phone Number"
        :allow-incomplete="true"
        :unmask="true"
        default="+251"
        size="sm"
        :rules="[
          'required',
        ]"
      />
      <SelectElement
        name="country"
        :search="true"
        :native="false"
        label="Country"
        input-type="search"
        autocomplete="off"
        :items="[
          {
            value: 'Afghanistan',
            label: 'Afghanistan',
          },
          {
            value: 'Albania',
            label: 'Albania',
          },
          {
            value: 'Algeria',
            label: 'Algeria',
          },
          {
            value: 'Andorra',
            label: 'Andorra',
          },
          {
            value: 'Angola',
            label: 'Angola',
          },
          {
            value: 'Antigua and Barbuda',
            label: 'Antigua and Barbuda',
          },
          {
            value: 'Argentina',
            label: 'Argentina',
          },
          {
            value: 'Armenia',
            label: 'Armenia',
          },
          {
            value: 'Australia',
            label: 'Australia',
          },
          {
            value: 'Austria',
            label: 'Austria',
          },
          {
            value: 'Azerbaijan',
            label: 'Azerbaijan',
          },
          {
            value: 'Bahamas',
            label: 'Bahamas',
          },
          {
            value: 'Bahrain',
            label: 'Bahrain',
          },
          {
            value: 'Bangladesh',
            label: 'Bangladesh',
          },
          {
            value: 'Barbados',
            label: 'Barbados',
          },
          {
            value: 'Belarus',
            label: 'Belarus',
          },
          {
            value: 'Belgium',
            label: 'Belgium',
          },
          {
            value: 'Belize',
            label: 'Belize',
          },
          {
            value: 'Benin',
            label: 'Benin',
          },
          {
            value: 'Bhutan',
            label: 'Bhutan',
          },
          {
            value: 'Bolivia',
            label: 'Bolivia',
          },
          {
            value: 'Bosnia and Herzegovina',
            label: 'Bosnia and Herzegovina',
          },
          {
            value: 'Botswana',
            label: 'Botswana',
          },
          {
            value: 'Brazil',
            label: 'Brazil',
          },
          {
            value: 'Brunei',
            label: 'Brunei',
          },
          {
            value: 'Bulgaria',
            label: 'Bulgaria',
          },
          {
            value: 'Burkina Faso',
            label: 'Burkina Faso',
          },
          {
            value: 'Burundi',
            label: 'Burundi',
          },
          {
            value: 'Cabo Verde',
            label: 'Cabo Verde',
          },
          {
            value: 'Cambodia',
            label: 'Cambodia',
          },
          {
            value: 'Cameroon',
            label: 'Cameroon',
          },
          {
            value: 'Canada',
            label: 'Canada',
          },
          {
            value: 'Central African Republic',
            label: 'Central African Republic',
          },
          {
            value: 'Chad',
            label: 'Chad',
          },
          {
            value: 'Chile',
            label: 'Chile',
          },
          {
            value: 'China',
            label: 'China',
          },
          {
            value: 'Colombia',
            label: 'Colombia',
          },
          {
            value: 'Comoros',
            label: 'Comoros',
          },
          {
            value: 'Congo, Democratic Republic of the',
            label: 'Congo, Democratic Republic of the',
          },
          {
            value: 'Congo, Republic of the',
            label: 'Congo, Republic of the',
          },
          {
            value: 'Costa Rica',
            label: 'Costa Rica',
          },
          {
            value: 'Croatia',
            label: 'Croatia',
          },
          {
            value: 'Cuba',
            label: 'Cuba',
          },
          {
            value: 'Cyprus',
            label: 'Cyprus',
          },
          {
            value: 'Czech Republic',
            label: 'Czech Republic',
          },
          {
            value: 'Denmark',
            label: 'Denmark',
          },
          {
            value: 'Djibouti',
            label: 'Djibouti',
          },
          {
            value: 'Dominica',
            label: 'Dominica',
          },
          {
            value: 'Dominican Republic',
            label: 'Dominican Republic',
          },
          {
            value: 'Ecuador',
            label: 'Ecuador',
          },
          {
            value: 'Egypt',
            label: 'Egypt',
          },
          {
            value: 'El Salvador',
            label: 'El Salvador',
          },
          {
            value: 'Equatorial Guinea',
            label: 'Equatorial Guinea',
          },
          {
            value: 'Eritrea',
            label: 'Eritrea',
          },
          {
            value: 'Estonia',
            label: 'Estonia',
          },
          {
            value: 'Eswatini',
            label: 'Eswatini',
          },
          {
            value: 'Ethiopia',
            label: 'Ethiopia',
          },
          {
            value: 'Fiji',
            label: 'Fiji',
          },
          {
            value: 'Finland',
            label: 'Finland',
          },
          {
            value: 'France',
            label: 'France',
          },
          {
            value: 'Gabon',
            label: 'Gabon',
          },
          {
            value: 'Gambia',
            label: 'Gambia',
          },
          {
            value: 'Georgia',
            label: 'Georgia',
          },
          {
            value: 'Germany',
            label: 'Germany',
          },
          {
            value: 'Ghana',
            label: 'Ghana',
          },
          {
            value: 'Greece',
            label: 'Greece',
          },
          {
            value: 'Grenada',
            label: 'Grenada',
          },
          {
            value: 'Guatemala',
            label: 'Guatemala',
          },
          {
            value: 'Guinea',
            label: 'Guinea',
          },
          {
            value: 'Guinea-Bissau',
            label: 'Guinea-Bissau',
          },
          {
            value: 'Guyana',
            label: 'Guyana',
          },
          {
            value: 'Haiti',
            label: 'Haiti',
          },
          {
            value: 'Honduras',
            label: 'Honduras',
          },
          {
            value: 'Hungary',
            label: 'Hungary',
          },
          {
            value: 'Iceland',
            label: 'Iceland',
          },
          {
            value: 'India',
            label: 'India',
          },
          {
            value: 'Indonesia',
            label: 'Indonesia',
          },
          {
            value: 'Iran',
            label: 'Iran',
          },
          {
            value: 'Iraq',
            label: 'Iraq',
          },
          {
            value: 'Ireland',
            label: 'Ireland',
          },
          {
            value: 'Israel',
            label: 'Israel',
          },
          {
            value: 'Italy',
            label: 'Italy',
          },
          {
            value: 'Jamaica',
            label: 'Jamaica',
          },
          {
            value: 'Japan',
            label: 'Japan',
          },
          {
            value: 'Jordan',
            label: 'Jordan',
          },
          {
            value: 'Kazakhstan',
            label: 'Kazakhstan',
          },
          {
            value: 'Kenya',
            label: 'Kenya',
          },
          {
            value: 'Kiribati',
            label: 'Kiribati',
          },
          {
            value: 'Kuwait',
            label: 'Kuwait',
          },
          {
            value: 'Kyrgyzstan',
            label: 'Kyrgyzstan',
          },
          {
            value: 'Laos',
            label: 'Laos',
          },
          {
            value: 'Latvia',
            label: 'Latvia',
          },
          {
            value: 'Lebanon',
            label: 'Lebanon',
          },
          {
            value: 'Lesotho',
            label: 'Lesotho',
          },
          {
            value: 'Liberia',
            label: 'Liberia',
          },
          {
            value: 'Libya',
            label: 'Libya',
          },
          {
            value: 'Liechtenstein',
            label: 'Liechtenstein',
          },
          {
            value: 'Lithuania',
            label: 'Lithuania',
          },
          {
            value: 'Luxembourg',
            label: 'Luxembourg',
          },
          {
            value: 'Madagascar',
            label: 'Madagascar',
          },
          {
            value: 'Malawi',
            label: 'Malawi',
          },
          {
            value: 'Malaysia',
            label: 'Malaysia',
          },
          {
            value: 'Maldives',
            label: 'Maldives',
          },
          {
            value: 'Mali',
            label: 'Mali',
          },
          {
            value: 'Malta',
            label: 'Malta',
          },
          {
            value: 'Marshall Islands',
            label: 'Marshall Islands',
          },
          {
            value: 'Mauritania',
            label: 'Mauritania',
          },
          {
            value: 'Mauritius',
            label: 'Mauritius',
          },
          {
            value: 'Mexico',
            label: 'Mexico',
          },
          {
            value: 'Micronesia',
            label: 'Micronesia',
          },
          {
            value: 'Moldova',
            label: 'Moldova',
          },
          {
            value: 'Monaco',
            label: 'Monaco',
          },
          {
            value: 'Mongolia',
            label: 'Mongolia',
          },
          {
            value: 'Montenegro',
            label: 'Montenegro',
          },
          {
            value: 'Morocco',
            label: 'Morocco',
          },
          {
            value: 'Mozambique',
            label: 'Mozambique',
          },
          {
            value: 'Myanmar',
            label: 'Myanmar',
          },
          {
            value: 'Namibia',
            label: 'Namibia',
          },
          {
            value: 'Nauru',
            label: 'Nauru',
          },
          {
            value: 'Nepal',
            label: 'Nepal',
          },
          {
            value: 'Netherlands',
            label: 'Netherlands',
          },
          {
            value: 'New Zealand',
            label: 'New Zealand',
          },
          {
            value: 'Nicaragua',
            label: 'Nicaragua',
          },
          {
            value: 'Niger',
            label: 'Niger',
          },
          {
            value: 'Nigeria',
            label: 'Nigeria',
          },
          {
            value: 'North Korea',
            label: 'North Korea',
          },
          {
            value: 'North Macedonia',
            label: 'North Macedonia',
          },
          {
            value: 'Norway',
            label: 'Norway',
          },
          {
            value: 'Oman',
            label: 'Oman',
          },
          {
            value: 'Pakistan',
            label: 'Pakistan',
          },
          {
            value: 'Palau',
            label: 'Palau',
          },
          {
            value: 'Palestine',
            label: 'Palestine',
          },
          {
            value: 'Panama',
            label: 'Panama',
          },
          {
            value: 'Papua New Guinea',
            label: 'Papua New Guinea',
          },
          {
            value: 'Paraguay',
            label: 'Paraguay',
          },
          {
            value: 'Peru',
            label: 'Peru',
          },
          {
            value: 'Philippines',
            label: 'Philippines',
          },
          {
            value: 'Poland',
            label: 'Poland',
          },
          {
            value: 'Portugal',
            label: 'Portugal',
          },
          {
            value: 'Qatar',
            label: 'Qatar',
          },
          {
            value: 'Romania',
            label: 'Romania',
          },
          {
            value: 'Russia',
            label: 'Russia',
          },
          {
            value: 'Rwanda',
            label: 'Rwanda',
          },
          {
            value: 'Saint Kitts and Nevis',
            label: 'Saint Kitts and Nevis',
          },
          {
            value: 'Saint Lucia',
            label: 'Saint Lucia',
          },
          {
            value: 'Saint Vincent and the Grenadines',
            label: 'Saint Vincent and the Grenadines',
          },
          {
            value: 'Samoa',
            label: 'Samoa',
          },
          {
            value: 'San Marino',
            label: 'San Marino',
          },
          {
            value: 'Sao Tome and Principe',
            label: 'Sao Tome and Principe',
          },
          {
            value: 'Saudi Arabia',
            label: 'Saudi Arabia',
          },
          {
            value: 'Senegal',
            label: 'Senegal',
          },
          {
            value: 'Serbia',
            label: 'Serbia',
          },
          {
            value: 'Seychelles',
            label: 'Seychelles',
          },
          {
            value: 'Sierra Leone',
            label: 'Sierra Leone',
          },
          {
            value: 'Singapore',
            label: 'Singapore',
          },
          {
            value: 'Slovakia',
            label: 'Slovakia',
          },
          {
            value: 'Slovenia',
            label: 'Slovenia',
          },
          {
            value: 'Solomon Islands',
            label: 'Solomon Islands',
          },
          {
            value: 'Somalia',
            label: 'Somalia',
          },
          {
            value: 'South Africa',
            label: 'South Africa',
          },
          {
            value: 'South Korea',
            label: 'South Korea',
          },
          {
            value: 'South Sudan',
            label: 'South Sudan',
          },
          {
            value: 'Spain',
            label: 'Spain',
          },
          {
            value: 'Sri Lanka',
            label: 'Sri Lanka',
          },
          {
            value: 'Sudan',
            label: 'Sudan',
          },
          {
            value: 'Suriname',
            label: 'Suriname',
          },
          {
            value: 'Sweden',
            label: 'Sweden',
          },
          {
            value: 'Switzerland',
            label: 'Switzerland',
          },
          {
            value: 'Syria',
            label: 'Syria',
          },
          {
            value: 'Taiwan',
            label: 'Taiwan',
          },
          {
            value: 'Tajikistan',
            label: 'Tajikistan',
          },
          {
            value: 'Tanzania',
            label: 'Tanzania',
          },
          {
            value: 'Thailand',
            label: 'Thailand',
          },
          {
            value: 'Timor-Leste',
            label: 'Timor-Leste',
          },
          {
            value: 'Togo',
            label: 'Togo',
          },
          {
            value: 'Tonga',
            label: 'Tonga',
          },
          {
            value: 'Trinidad and Tobago',
            label: 'Trinidad and Tobago',
          },
          {
            value: 'Tunisia',
            label: 'Tunisia',
          },
          {
            value: 'Turkey',
            label: 'Turkey',
          },
          {
            value: 'Turkmenistan',
            label: 'Turkmenistan',
          },
          {
            value: 'Tuvalu',
            label: 'Tuvalu',
          },
          {
            value: 'Uganda',
            label: 'Uganda',
          },
          {
            value: 'Ukraine',
            label: 'Ukraine',
          },
          {
            value: 'United Arab Emirates',
            label: 'United Arab Emirates',
          },
          {
            value: 'United Kingdom',
            label: 'United Kingdom',
          },
          {
            value: 'United States',
            label: 'United States',
          },
          {
            value: 'Uruguay',
            label: 'Uruguay',
          },
          {
            value: 'Uzbekistan',
            label: 'Uzbekistan',
          },
          {
            value: 'Vanuatu',
            label: 'Vanuatu',
          },
          {
            value: 'Vatican City',
            label: 'Vatican City',
          },
          {
            value: 'Venezuela',
            label: 'Venezuela',
          },
          {
            value: 'Vietnam',
            label: 'Vietnam',
          },
          {
            value: 'Yemen',
            label: 'Yemen',
          },
          {
            value: 'Zambia',
            label: 'Zambia',
          },
          {
            value: 'Zimbabwe',
            label: 'Zimbabwe',
          },
        ]"
        size="sm"
        :rules="[
          'required',
        ]"
      />

      <SelectElement
        name="product"
        :search="true"
        :native="true"
        label="Product"
        input-type="search"
        autocomplete="off"
        :items="async function() {
          return products.flatMap(product =>
            product.sizes
              .filter(size => size !== 'And as per customer requests') // filter unwanted string
              .map(size => ({
                value: `${product.name} ${size}`,
                label: `${product.name} ${size}`
              }))
          )
        }"
        size='sm'
        :rules= "[
          'required',
        ]"
      />
      <TextElement
        name="quantity"
        input-type="number"
        :rules="[
          'required',
          'numeric',
        ]"
        autocomplete="off"
        label="Quantity"
        :force-numbers="true"
        default="1000"
        size="sm"
      />
      <TextareaElement
        name="message"
        label="Additional Message"
        :rules="[
          'required',
        ]"
        field-name="message"
      />
      <MultifileElement
        name="FileAttachments"
        label="File Attachments"
        :drop="true"
        :rules="[
            'required',
        ]"
        field-name="FileAttachments"
        :urls="{}"
        size="sm"
        accept=".pdf" 
        :clickable="false"
        :url="false"
        :upload-temp-endpoint="false" 
        />
      <ButtonElement
        name="submit "
        button-label="Submit Order"
        :submits="true"
        align="center"
        size="sm"
        :columns="{
          sm: {
            container: 5,
          },
        }"
        :full="true"
      />
    </Vueform>
</template>

<style scoped lang="scss">

</style>