<script setup>
definePageMeta({
  layout:"dashboard",
  name: 'postBlog',
  middleware:['auth'],
})

const blog_catagories = ref([
    {
    value: 'news',
    label: 'news',
    },
    {
    value: 'info',
    label: 'info',
    },
    {
    value: 'social',
    label: 'social',
    },
    {
    value: 'event',
    label: 'event',
    },
])

const postNewBlogPost = ()=>{

}

</script>

<template>
  <div class="container">
    <ClientOnly>
            <Vueform :endpoint="postNewBlogPost" >
                <StaticElement
                name="h3"
                tag="h3"
                content="Post New Blog Post"
                style="color: #1492E6;"
                bottom="2"
                />
                <TextElement
                name="title"
                label="title"
                info="blog title"
                :rules="[
                    'required',
                ]"
                />
                <EditorElement
                name="content"
                label="content"
                info="blog content"
                :rules="[
                    'required',
                ]"
                />
                <TagsElement
                name="category"
                :close-on-select="false"
                :search="true"
                :items="blog_catagories"
                label="category"
                input-type="search"
                autocomplete="off"
                info="blog category"
                :create="true"
                :add-option-on="[
                    'enter',
                    ',',
                ]"
                :rules="[
                'required',
                ]"
                />
                <FileElement
                name="coverImg"
                label="coverImg"
                :urls="{}"
                info="blog cover Img"
                :drop="true"
                accept="image/*" 
                view="image"
                :clickable="false"
                :url="false"
                :upload-temp-endpoint="false" 
                :rules="[
                'required',
                ]"
                />
                <ButtonElement
                name="post"
                button-label="Post New Blog Post"
                :submits="true"
                align="right"
                size="sm"
                :columns="{
                    container: 6,
                }"
                />
            </Vueform>
    </ClientOnly>
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