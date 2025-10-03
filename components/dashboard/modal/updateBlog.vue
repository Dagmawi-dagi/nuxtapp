<script setup>
const { any_open_modal } = useUtilStore()
const { blogPosts } = storeToRefs(useBlogStore())

const blogPost  = any_open_modal.AnythingTopass

const updateBlog = async (FormD, form$) => {
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
    if(form$.data.content) FormD.append('content_short', extractFirstWords(form$.data.content))

  try {
    const {data} = await $fetch(`/api/blog/${blogPost.id}`,{
        method:'PATCH',
        headers:{
            apiref:'/api/blog/[id]/PATCH'
        },
        body: FormD,
    })
    
    // ✅ Reactive update using splice
    const index = blogPosts.value.findIndex(v => v.id === blogPost.id)
  // ✅ Reactive update by creating new array
    if (index !== -1) {
        const updatedblogPosts = [...blogPosts.value]
        updatedblogPosts[index] = data[0]
        blogPosts.value = updatedblogPosts
    }
    frontEndErrorFeedback().success('blog updated successfully')
  } catch (error) {
    frontEndErrorFeedback().err(error,'vueForm')
  }
}
</script>

<template>
    <Overlay>
        <template #container>
            <ClientOnly>
                <Vueform :endpoint="updateBlog" :default="blogPost">
                <StaticElement
                name="h3"
                tag="h3"
                content="Update Blog Post"
                style="color: #1492E6;"
                bottom="2"
                />
                <TextElement
                name="title"
                label="title"
                info="blog title"
                />
                <EditorElement
                name="content"
                label="content"
                info="blog content"
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
                :create="false"
                />
                <FileElement
                name="coverImg"
                label="coverImg"
                :preview-url="`/blog/`" 
                :urls="{}"
                info="blog cover Img"
                :drop="true"
                accept="image/*" 
                view="image"
                :clickable="true"
                :url="`/blog/`"
                :upload-temp-endpoint="false" 
                />
                <ButtonElement
                name="post"
                button-label="Update Blog Post"
                :submits="true"
                size="sm"
                :columns="{
                    container: 12,
                }"
                />
            </Vueform>
            </ClientOnly>
        </template>
    </Overlay>
</template>

<style lang="scss" scoped>

</style>