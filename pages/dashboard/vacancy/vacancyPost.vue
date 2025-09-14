<script setup>
  
definePageMeta({
  layout:"dashboard",
  name: 'vacancyPost',
  middleware:['auth'],
})


const postVacancy =async ()=>{

}

</script>

<template>
  <div class="container">
    <ClientOnly>
        <Vueform :endpoint="postNewVacancy">
            <StaticElement
            name="h3"
            tag="h3"
            content="Post New Vacancy"
            style="color: #1492E6;"
            bottom="2"
            />
            <StaticElement
            name="p"
            tag="p"
            content="<div>position name</div>"
            :columns="{
                container: 2,
            }"
            />
            <TextElement
            name="position_name"
            :columns="{
                container: 10,
            }"
            :rules="[
                'required',
            ]"
            />
            <StaticElement
            name="p_1"
            tag="p"
            content="<div>company</div>"
            :columns="{
                container: 2,
            }"
            />
            <TextElement
            name="company"
            :columns="{
                container: 10,
            }"
            :rules="[
                'required',
            ]"
            />
            <StaticElement
            name="p_3"
            tag="p"
            content="<div>salary</div>"
            :columns="{
                container: 2,
            }"
            />
            <TextElement
            name="salary"
            :columns="{
                container: 10,
            }"
            :rules="[
                'required',
            ]"
            />
            <StaticElement
            name="p_2"
            tag="p"
            content="<div>location</div>"
            :columns="{
                container: 2,
            }"
            />
            <TagsElement
            name="locations"
            :close-on-select="false"
            :search="true"
            :items="[
                {
                value: 'mekelle',
                label: 'mekelle',
                },
                {
                value: 'quiha',
                label: 'quiha',
                },
                {
                value: 'ayder',
                label: 'ayder',
                },
            ]"
            input-type="search"
            autocomplete="off"
            :columns="{
                container: 10,
            }"
            :create="true"
            :add-option-on="[
                'enter',
                ',',
            ]"
            :rules="[
                'required',
            ]"
            />
            <TextareaElement
            name="description"
            label="description"
            :rules="[
                'required',
            ]"
            />
            <EditorElement
            name="requirements"
            label="requirements"
            :rules="[
                'required',
            ]"
            />
            <DateElement
            name="deadline"
            label="deadline"
            size="sm"
            :rules="[
                'required',
            ]"
            :columns="{
                container: 4,
            }"
            />
            <ButtonElement
            name="post"
            button-label="Post New Vacancy"
            :submits="true"
            align="center"
            size="sm"
            :columns="{
                container: 10,
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