<script setup>
definePageMeta({
    layout:"dashboard",
    name: 'userProfile',
    middleware:['auth']
})
const tabs = ref(['Account','PhoneNumber','email','Password'])
const activetab = ref(1)
const loggedInUser = useAuthStore().loggedInUser
const updateAccount = async (FormD, form$)=>{
    try {
        // Convert FormData to plain object
        const obj = Object.fromEntries(FormD.entries());

        // Remove empty values (null, undefined, '', etc.)
        const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== '' && value != null)
        );

        // Recreate FormData
        const cleanFormData = new FormData();
        Object.entries(filteredObj).forEach(([key, value]) => {
        cleanFormData.append(key, value);
        });
        const { data } = await $fetch('/api/user/me', {
            method: 'PATCH',
            body: cleanFormData,
            headers:{
            apiref:"/api/user/me/PATCH"
            }
        });

        useAuthStore().loggedInUser = data
        frontEndErrorFeedback().success('profile updated successefully')

    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}


const updatePhoneNumber = async (FormD, form$)=>{
     try {
        const { data } = await $fetch('/api/user/updatePhoneNumber', {
            method: 'PATCH',
            body:  form$.data,
            headers:{
                apiref:"/api/user/updatePhoneNumber/PATCH"
            }
        });

        useAuthStore().loggedInUser = data
        frontEndErrorFeedback().success('PhoneNumber updated successefully')
    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}

const updateEmail = async(FormD, form$)=>{
     try {
        const { data } = await $fetch('/api/user/updateEmail', {
            method: 'PATCH',
            body:  form$.data,
            headers:{
                apiref:"/api/user/updateEmail/PATCH"
            }
        });

        useAuthStore().loggedInUser = data
        frontEndErrorFeedback().success('Email updated successefully')
    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}

const updatePassword = async (FormD, form$)=>{
    try {
        const { data } = await $fetch('/api/user/updatePassword', {
            method: 'PATCH',
            body:  form$.data,
            headers:{
                apiref:"/api/user/updatePassword/PATCH"
            }
        });

        useAuthStore().loggedInUser = data
        frontEndErrorFeedback().success('password updated successefully')
    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}

const logout = async()=>{
    try {
        await $fetch('/api/user/logOut', {
            method: 'POST',
            headers:{
                apiref:"/api/user/logOut/POST"
            }
        })
        useAuthStore().loggedInUser = null
        useRouter().push({name:"auth"})
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
                
                <MazTabsContentItem :tab="2" class="maz-py-4">
                    <template v-if="activetab == 2" >
                        <ClientOnly>
                            <Vueform :endpoint="updatePhoneNumber">
                                <PhoneElement
                                name="newPhoneNumber"
                                label="phoneNumber"
                                :allow-incomplete="true"
                                :unmask="true"
                                :rules="[
                                    'required',
                                ]"
                                :columns="{
                                    container: 8,
                                }"
                                :default="loggedInUser.phoneNumber"
                                />
                                <TextElement
                                name="userPassword"
                                input-type="password"
                                label="userPassword"
                                :columns="{
                                    container: 8,
                                }"
                                :rules="[
                                    'required',
                                ]"
                                />
                                <ButtonElement
                                name="submit"
                                button-label="update phoneNumber"
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
                
                <MazTabsContentItem :tab="3" class="maz-py-4">
                    <template v-if="activetab == 3" >
                        <ClientOnly>
                         <Vueform :endpoint="updateEmail">
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
                            :default="loggedInUser.email"
                            />
                            <TextElement
                            name="userPassword"
                            input-type="password"
                            label="userPassword"
                            :columns="{
                                container: 8,
                            }"
                            :rules="[
                                'required',
                            ]"
                            
                            />
                            <ButtonElement
                            name="submit"
                            button-label="update Account Email"
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

                <MazTabsContentItem :tab="4" class="maz-py-4">
                    <template v-if="activetab == 4" >
                        <ClientOnly>
                            <Vueform :endpoint="updatePassword">
                                <TextElement
                                name="userPassword"
                                input-type="password"
                                label="current userPassword"
                                :columns="{
                                    container: 8,
                                }"
                                :rules="[
                                    'required',
                                ]"
                                />
                                <TextElement
                                name="newPassword"
                                input-type="password"
                                label="newPassword"
                                :columns="{
                                    container: 8,
                                }"
                                :rules="[
                                    'required',
                                ]"
                                />
                                <ButtonElement
                                name="submit"
                                button-label="update Account password"
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
    <button class="logoutBtn" @click="logout">logout</button>
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

.logoutBtn{
    position: absolute;
    top: 2rem;
    right: 2rem;
}
</style>