<script setup>

definePageMeta({
  layout:"dashboard",
  name: 'sendNewsletter',
  middleware:['auth'],
})


const postNewsletter = async ()=>{

}

</script>

<template>
    <div class="container">
        <Vueform :endpoint="postNewsletter">
        <StaticElement
          name="h3"
          tag="h3"
          content="Send New Newsletter"
          style="color: #1492E6;"
          bottom="2"
        />
        <TextElement
          name="subject"
          label="mail subject"
          info="subject"
          :rules="[
            'required',
          ]"
          size="sm"
        />
        <EditorElement
          name="content"
          label="content"
          info="mail content"
          :rules="[
            'required',
          ]"
          size="sm"
        />
        <TagsElement
          name="recipientsIds"
          :close-on-select="false"
          :search="true"
          label="recipients"
          input-type="search"
          autocomplete="off"
          :items="async function(query, input){
             const res = await axios.get('http://localhost:8888/api/newsletter/subscriber')
             let mappedData = res.data.data.map(({ id, name }) => ({ value: id, label: name }))
              // mappedData.unshift({ value: 'all', label: 'All' })
              return mappedData
          }"
          info="email Recipients"
          :rules="[
            'required',
          ]"
          size="sm"
        />
        <ButtonElement
          name="submit"
          button-label="send news letter"
          :submits="true"
          size="sm"
          align="center"
          :loading="apicall_from_store_loading"
        />
      </Vueform>
    </div>
</template>

<style scoped lang="scss">
.container{
    width: min(70%,1000px);
    margin: 0 1rem;
    padding: 1rem 10px;
    background-color: var(--white);
    height: 100vh;
}
</style>