<script setup>
  
definePageMeta({
  layout:"dashboard",
  name: 'AddNewNewsletterSub',
  middleware:['auth'],
})


const AddNewNewsletterSub = async (FormD,form$)=>{
    const name = `${form$.data.email}`.split('@')[0]
    try {
        await $fetch('/api/newsletter/sub/',{
            method:'POST',
            body:{name,...form$.data},
            headers:{
                apiref: '/api/newsletterSub/POST',
            },
        })
        frontEndErrorFeedback().success('New Newsletter Subscriptions Created successfully')
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
  <div class="container">
    <ClientOnly>
        <Vueform :endpoint="AddNewNewsletterSub">
            <StaticElement
                name="h3"
                tag="h3"
                content="Create New Newsletter Subscription"
                :columns="{
                    container: 9,
                }"
                bottom="2"
                style="color: #1492E6;"
                />
            <TextElement
            name="email"
            input-type="email"
            :rules="[
                'required',
                'email',
            ]"
            label="Email"
            :columns="{
                container: 8,
            }"
            />
            <ButtonElement
            name="submit"
            button-label="Add New Newsletter Subscription"
            :submits="true"
            :columns="{
                container: 8,
            }"
            align="center"
            size="sm"
            />
        </Vueform>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.container{
    width: 70%;
    margin: 0 auto;
    padding: 1rem 10px;
    background-color: var(--white);
    height: 100vh;
}
</style>