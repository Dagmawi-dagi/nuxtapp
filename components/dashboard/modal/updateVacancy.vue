<script setup>
const { any_open_modal } = useUtilStore()
const { vacancies } = storeToRefs(useVacancyStore())

const vacancy  = any_open_modal.AnythingTopass

const updateVacancy = async (FormD, form$) => {
  console.log(vacancy) // access like this

  try {
    const {data} = await $fetch(`/api/vacancy/${vacancy.id}`,{
        method:'PATCH',
        headers:{
            apiref:'/api/vacancy/PATCH'
        },
        body: form$.data,
    })
    
    // ✅ Reactive update using splice
    const index = vacancies.value.findIndex(v => v.id === vacancy.id)
  // ✅ Reactive update by creating new array
    if (index !== -1) {
        const updatedVacancies = [...vacancies.value]
        updatedVacancies[index] = data[0]
        vacancies.value = updatedVacancies
    }
        
    frontEndErrorFeedback().success('vacancy updated successfully')
  } catch (error) {
    frontEndErrorFeedback().err(error,'vueForm')
  }
}
</script>

<template>
    <Overlay>
        <template #container>
            <ClientOnly>
                <Vueform :endpoint="updateVacancy">
                    <StaticElement
                    name="h3"
                    tag="h3"
                    content="Update Vacancy"
                    style="color: #1492E6;"
                    bottom="2"
                    align="center"
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
                    :default="vacancy.position_name"
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
                    :default="vacancy.company"
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
                    :default="vacancy.salary"
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
                    :default="JSON.parse(vacancy.locations)"
                    />
                    <TextareaElement
                    name="description"
                    label="description"
                    :rules="[
                        'required',
                    ]"
                    :default="vacancy.description"
                    />
                    <EditorElement
                    name="requirements"
                    label="requirements"
                    :rules="[
                        'required',
                    ]"
                    :default="vacancy.requirements"
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
                    :default="vacancy.deadline"
                    />
                    <ButtonElement
                    name="post"
                    button-label="update Vacancy"
                    :submits="true"
                    align="center"
                    size="sm"
                    :columns="{
                        container: 10,
                    }"
                    />
                </Vueform>
            </ClientOnly>
        </template>
    </Overlay>
</template>

<style lang="scss" scoped>

</style>