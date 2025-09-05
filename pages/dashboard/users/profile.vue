<script setup>
definePageMeta({
    layout:"dashboard",
    name: 'userProfile',
    middleware:['auth']
})
const tabs = ref(['Account','PhoneNumber','Password'])
const activetab = ref(1)

</script>

<template>
    <div class="container">
            <MazTabs class="tabs-container" @update:model-value="activetab = $event">
            <MazTabsBar :items="tabs" class="tabs_bar" />
            <MazTabsContent class="tabs-content-container">
                <MazTabsContentItem :tab="1" class="maz-py-4">
                    <template v-if="activetab == 1" >
                        <ClientOnly>
                            <Vueform>
                                <TextElement
                                name="text"
                                label="Text"
                                :columns="{
                                    container: 8,
                                }"
                                />
                                <TextElement
                                name="email"
                                input-type="email"
                                :rules="[
                                    'nullable',
                                    'email',
                                ]"
                                label="Email"
                                :columns="{
                                    container: 8,
                                }"
                                />
                                <FileElement
                                name="image"
                                label="Image"
                                accept="image/*"
                                view="image"
                                :rules="[
                                    'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff',
                                ]"
                                :drop="true"
                                :auto="false"
                                :columns="{
                                    container: 8,
                                }"
                                />
                            </Vueform>
                        </ClientOnly>
                    </template>
                </MazTabsContentItem>
                
            </MazTabsContent>
        </MazTabs>
    </div>

</template>

<style scoped lang="scss">  
@use "@/assets/style/variables" as *;
@use "@/assets/style/mixins" as *;
@use "@/assets/style/global.scss" as *;

.container{
    margin: 0 1rem;
    padding: 1rem 10px;
    background-color: var(--white);
    height: 100vh;
}

</style>