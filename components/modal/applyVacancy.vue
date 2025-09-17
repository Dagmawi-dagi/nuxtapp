<script setup>
// libs
import { format } from 'date-fns';

const { any_open_modal } = useUtilStore()

const props =  defineProps({ vacancy: Object })

async function applyVacancy (FD, form$){ 
    const formData = new FormData()
    formData.append('vacancyId', props.vacancy.id)
    form$.data.uploaded_files.forEach(file => { formData.append("uploaded_files", file)});
    formData.append('application_form', JSON.stringify({ 
        gender: form$.data.gender,
        workExperience: form$.data.workExperience,
        fullName: form$.data.fullName,
        skill: form$.data.skill,
        languages: form$.data.languages,
        workExperienceInformation: form$.data.workExperienceInformation,
    }))
    
    try {
        await $fetch('/api/vacancy/apply',{
            method:"POST",
            headers:{apiref:'/api/vacancy/apply/POST'},
            body:formData
        })
        frontEndErrorFeedback().success('vacancy applied sussfully')

    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}

</script>

<template>
    <div class="modal-overlay" @click.self="any_open_modal.bool = false">
        <div class="container">
            <div class="summary">
                <div class="job-discriptions">
                    <h5 class="dis">Position: <span class="value"> {{ vacancy.position_name }} </span> </h5>
                    <h5 class="dis">company: <span class="value"> {{ vacancy.company }} </span> </h5>
                    <h5 class="dis">location: <span class="value">  {{ JSON.parse(vacancy.locations).join(",") }} </span> </h5>
                    <h5 class="dis">deadline: <span class="value"> {{ format(new Date(vacancy.deadline), 'MMMM dd,yyyy')}} </span> </h5>
                    <h5 class="dis">salary: <span class="value"> {{ vacancy.salary }} </span> </h5>
                </div>
            </div>
            <Vueform :endpoint="applyVacancy">
                <StaticElement
                name="h3"
                tag="h3"
                content="personal information"
                size="sm"
                />
                <StaticElement
                name="p"
                tag="p"
                content="<div>&nbsp;Full Name&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <TextElement
                name="fullName"
                :columns="{
                    container: 8,
                }"
                :rules="[
                    'required',
                ]"
                size="sm"
                />
                <StaticElement
                name="workExperience"
                tag="p"
                content="<div>&nbsp;work experience&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <TextElement
                name="workExperience"
                :columns="{
                    container: 8,
                }"
                :rules="[
                    'required',
                ]"
                size="sm"
                />
                <StaticElement
                name="p_1"
                tag="p"
                content="<div>&nbsp;gender&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <GroupElement
                name="container"
                :columns="{
                    container: 8,
                }"
                >
                <RadiogroupElement
                    name="gender"
                    view="tabs"
                    :items="[
                    {
                        value: 'male',
                        label: ' male',
                    },
                    {
                        value: 'female',
                        label: 'female',
                    },
                    ]"
                    :columns="{
                    container: 8,
                    }"
                    :rules="[
                    'required',
                    ]"
                />
                </GroupElement>
                <StaticElement
                name="p_2"
                tag="p"
                content="<div>&nbsp;languages&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <TagsElement
                name="languages"
                :close-on-select="false"
                :search="true"
                :items="[
                    {
                    value: 'Amharic',
                    label: 'Amharic',
                    },
                    {
                    value: 'Tigrigna',
                    label: 'Tigrigna',
                    },
                    {
                    value: 'English',
                    label: 'English',
                    },
                ]"
                input-type="search"
                autocomplete="off"
                :columns="{
                    container: 8,
                }"
                :rules="[
                    'required',
                ]"
                size="sm"
                :create="true"
                :add-option-on="[
                    'enter',
                    ',',
                ]"
                />
                <StaticElement
                name="p_3"
                tag="p"
                content="<div>&nbsp;skill&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <TagsElement
                name="skill"
                :close-on-select="false"
                :search="true"
                :items="[
                    {
                    value: 'basic computer skill',
                    label: 'basic computer skill',
                    },
                    {
                    value: 'microsoft word',
                    label: 'microsoft word',
                    },
                    {
                    value: 'microsoft excel',
                    label: 'microsoft excel',
                    },
                ]"
                input-type="search"
                autocomplete="off"
                :columns="{
                    container: 8,
                }"
                :rules="[
                    'required',
                ]"
                size="sm"
                :create="true"
                :add-option-on="[
                    'enter',
                    ',',
                ]"
                />
                <StaticElement
                name="h3_1"
                tag="h3"
                content="work Experience Information"
                size="sm"
                />
                <ListElement
                name="workExperienceInformation"
                add-text="add other work experience"
                >
                <template #default="{ index }">
                    <ObjectElement
                    :name="index"
                    >
                    <StaticElement
                        name="p_4"
                        tag="p"
                        content="<div>&nbsp;position&nbsp;</div>"
                        :columns="{
                        container: 6,
                        }"
                        size="sm"
                    />
                    <TextElement
                        name="position"
                        :columns="{
                        container: 6,
                        }"
                        :rules="[
                        'required',
                        ]"
                        size="sm"
                    />
                    <StaticElement
                        name="p_5"
                        tag="p"
                        content="<div>&nbsp;company/employer name&nbsp;</div>"
                        :columns="{
                        container: 6,
                        }"
                        size="sm"
                    />
                    <TextElement
                        name="company/employerName"
                        :columns="{
                        container: 6,
                        }"
                        :rules="[
                        'required',
                        ]"
                        size="sm"
                    />
                    <StaticElement
                        name="p_6"
                        tag="p"
                        content="<div>&nbsp;Duties Description&nbsp;</div>"
                        :columns="{
                        container: 6,
                        }"
                        size="sm"
                    />
                    <TextareaElement
                        name="dutiesDescription"
                        :columns="{
                        container: 6,
                        }"
                        :rules="[
                        'required',
                        ]"
                        size="sm"
                    />
                    <StaticElement
                        name="manager/HR Contact"
                        tag="p"
                        content="<div>&nbsp;manager/HR email or phone number&nbsp;</div>"
                        :columns="{
                        container: 6,
                        }"
                        size="sm"
                    />
                    <TextElement
                        name="company/employerContact"
                        :columns="{
                        container: 6,
                        }"
                        :rules="[
                        'required',
                        ]"
                        size="sm"
                    />
                    </ObjectElement>
                </template>
                </ListElement>
                <StaticElement
                name="h3_2"
                tag="h3"
                content="File Attachments"
                size="sm"
                />
                <MultifileElement
                name="uploaded_files"
                :drop="true"
                :rules="[
                    'required',
                ]"
                field-name="uploaded_files"
                :urls="{}"
                size="sm"
                info="uploaded_files"
                accept=".pdf" 
                :clickable="false"
                :url="false"
                :upload-temp-endpoint="false" 
                />
                <ButtonElement
                name="submit"
                button-label="apply"
                :submits="true"
                :full="true"
                :loading="apicall_from_store_loading"
                />
            </Vueform>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    width: min(95%, 700px);
    height: max-content;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    z-index: 999;
    overflow-y: auto;
    padding: 3rem 20px;
    cursor: pointer;
}

.summary {
    padding: 10px 15px;
    background-color: #F8F8FA;
    font-weight: bold;
    cursor: pointer;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
}

.myhr {
    height: 10px;
    width: 10px;
    background-color: red;
}

.job-discriptions {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .dis {
        text-transform: capitalize;
        color: #0a1525;
    }

    .value {
        font-size: 14px;
        color: #666;
    }
}
</style>