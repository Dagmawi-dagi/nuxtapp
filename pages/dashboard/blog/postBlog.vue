<script setup>
definePageMeta({
  layout:"dashboard",
  name: 'postBlog',
  middleware:['auth'],
})

const postNewBlogPost =async (FD, form$)=>{
    function extractFirstWords(html, wordCount = 20) {
        // Create a temporary element to parse the HTML
        let tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        // Extract the text content (without tags)
        let text = tempElement.textContent || tempElement.innerText || "";
        // Split the text into words and get the first 'wordCount' words
        let words = text.trim().split(/\s+/).slice(0, wordCount);
        return words.join(" ");
    }
    
    FD.append('content_short', extractFirstWords(form$.data.content))

    try {
        await $fetch('/api/blog/postBlog',{
            method:'POST',
            body: FD,
            headers:{
                apiref: '/api/blog/postBlog/POST',
            },
        })
        frontEndErrorFeedback().success('new blog posted successfully')
    } catch (error) {
        frontEndErrorFeedback().err(error,'vueform')
    }
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
                :items="[
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
                    ]"
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