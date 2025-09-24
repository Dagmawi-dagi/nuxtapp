<script setup>
const { any_open_modal } = useUtilStore()
const application  = any_open_modal.AnythingTopass

const header  = `vacancy Application for: ${application.vacancyId}`

const isDownloading = ref(false);
const downloadFile = (file) => {
  if (isDownloading.value) return;
  isDownloading.value = true;
  try {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = `/vacancyApplicationFiles/${file}`;
    link.target = '_blank'; // Open in new tab for better UX
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
    alert('Download failed. Please try again.');
  } finally {
    isDownloading.value = false;
  }
}
</script>

<template>
    <Overlay>
        <template #container>
            <Vueform>
                <StaticElement
                name="h3"
                tag="h3"
                :content='header'
                size="sm"
                style="color: #1492E6;"
                bottom="2"
                align="center"
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
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.fullName"
                :columns="{
                    container: 8,
                }"
                size="sm"
                />
                <StaticElement
                name="p"
                tag="p"
                content="<div>&nbsp;phoneNumber&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.phoneNumber"
                :columns="{
                    container: 8,
                }"
                size="sm"
                />
                <StaticElement
                name="p"
                tag="p"
                content="<div>&nbsp;Email&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.email"
                :columns="{
                    container: 8,
                }"
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
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.workExperience"
                :columns="{
                    container: 8,
                }"
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
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.gender"
                :columns="{
                    container: 8,
                }"
                size="sm"
                />
                <StaticElement
                name="p_2"
                tag="p"
                content="<div>&nbsp;languages&nbsp;</div>"
                :columns="{
                    container: 4,
                }"
                size="sm"
                />
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.languages"
                :columns="{
                    container: 8,
                }"
                size="sm"
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
                <StaticElement
                name="p"
                tag="p"
                :content="application.application_form.skill"
                :columns="{
                    container: 8,
                }"
                size="sm"
                />
                <StaticElement
                name="h3_1"
                tag="h3"
                content="Work Experience Information"
                size="sm"
                />
                 <ListElement 
                 :default="application.application_form.workExperienceInformation"
                 name="workExperienceInformation" :controls="{ add: false, remove: false }" :submit="false">
                    <template #default="{ index }">
                        <ObjectElement :name="index">
                        <StaticElement name="label_position" tag="p" content="<div>&nbsp;Position&nbsp;</div>" :columns="{ container: 6 }" size="sm" />
                        <StaticElement
                            name="position"
                            tag="p"
                            :content="application.application_form.workExperienceInformation?.[index]?.position"
                            :columns="{ container: 6 }"
                            size="sm"
                        />

                        <StaticElement name="label_company" tag="p" content="<div>&nbsp;Company/Employer Name&nbsp;</div>" :columns="{ container: 6 }" size="sm" />
                        <StaticElement
                            name="company"
                            tag="p"
                            :content="application.application_form.workExperienceInformation?.[index]?.['company/employerName']"
                            :columns="{ container: 6 }"
                            size="sm"
                        />

                        <StaticElement name="label_duties" tag="p" content="<div>&nbsp;Duties Description&nbsp;</div>" :columns="{ container: 6 }" size="sm" />
                        <StaticElement
                            name="duties"
                            tag="p"
                            :content="application.application_form.workExperienceInformation?.[index]?.dutiesDescription"
                            :columns="{ container: 6 }"
                            size="sm"
                        />

                        <StaticElement name="label_contact" tag="p" content="<div>&nbsp;Manager/HR Contact&nbsp;</div>" :columns="{ container: 6 }" size="sm" />
                        <StaticElement
                            name="contact"
                            tag="p"
                            :content="application.application_form.workExperienceInformation?.[index]?.['company/employerContact']"
                            :columns="{ container: 6 }"
                            size="sm"
                        />
                        </ObjectElement>
                        <StaticElement v-if="index < application.application_form.workExperienceInformation.length - 1" 
                            name="divider"
                            tag="hr"
                            style="background-color: #ccc;"
                        />
                    </template>
                </ListElement>
                                
                        
                <StaticElement
                name="h3_1"
                tag="h3"
                content="File Attachments"
                size="sm"
                />
                <ListElement :default="JSON.parse(application.uploaded_files)" name="File Attachments" :controls="{ add: false, remove: false }" :submit="false">
                    <template #default="{ index }">
                        <ObjectElement :name="index">
                            <StaticElement
                                name="position"
                                tag="p"
                                :content='`
                                <span style=" display: flex;">
                                    <span style="width: 1.5rem; margin-right: 5px; ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </span>
                                    ${JSON.parse(application.uploaded_files)[index]}
                                </span>`'
                                :columns="{ container: 9 }"
                                size="sm"
                                :allow-html="true"
                            >
                            </StaticElement>

                            <ButtonElement
                                :loading="isDownloading"
                                name="download"
                                :submits="false"
                                :columns="{
                                    container: 3,
                                }"
                                :full="true"
                                @click="downloadFile(JSON.parse(application.uploaded_files)[index])"
                            >           
                                <span style="width: 1.5rem; margin-right: 5px; ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </span>
                                Download
                            </ButtonElement>

                        </ObjectElement>
                    </template>
                </ListElement>
             </Vueform>
        </template>
    </Overlay>
</template>

<style scoped lang="scss">

</style>