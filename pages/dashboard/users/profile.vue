<script setup>
definePageMeta({
    layout:"dashboard",
    name: 'userProfile',
    middleware:['auth']
})
const tabs = ref(['Account','PhoneNumber','Password'])
const activetab = ref(1)
const loggedInUser = useAuthStore().loggedInUser
const updateAccount = async (FormData, form$)=>{
    try {
        const { data } = await $fetch('/api/user/me', {
            method: 'PATCH',
            body: FormData,
            headers:{
            apiref:"/api/user/me/PATCH"
            }
        });

        useAuthStore().loggedInUser = data
    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}

</script>

<template>
    <div class="container">
            <MazTabs class="tabs-container" @update:model-value="activetab = $event">
            <MazTabsBar :items="tabs" class="tabs_bar" />
            <MazTabsContent class="tabs-content-container">
                <MazTabsContentItem :tab="1" class="maz-py-4">
                    <template v-if="activetab == 1" >
                        <ClientOnly>
                            <Vueform :endpoint="updateAccount">
                                <TextElement
                                label="userName"
                                name="userName"
                                :columns="{
                                    container: 8,
                                }"
                                :rules="[
                                    'nullable',
                                ]"
                                field-name="userName"
                                :default="loggedInUser.userName"
                                />
                                <FileElement
                                name="avatar"
                                label="profile picture"
                                accept="image/*"
                                view="image"
                                :rules="[
                                    'nullable',
                                    'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff',
                                ]"
                                :drop="true"
                                :columns="{
                                    container: 8,
                                }"
                                :urls="{}"
                                :upload-temp-endpoint="false" 
                                />
                                <ButtonElement
                                name="submit"
                                button-label="update my account info"
                                :submits="true"
                                :columns="{
                                    container: 8,
                                }"
                                align="center"
                                size="sm"
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