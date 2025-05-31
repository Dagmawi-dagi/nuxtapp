<script setup>
// libs
import { format } from 'date-fns';
// composable
// import { use_apicalls_from_store } from '../../composables/store-apicalls';
//store

const { any_open_modal } = storeToRefs( useUtilStore() )
const { vacancies,page,perPage } = storeToRefs( useVacancyVtore() )
// const { apicall_from_store } = use_apicalls_from_store();


const openVacancyApplyModal = (vac)=>{
    any_open_modal.value.bool = true
    any_open_modal.value.id = 'applyVacancyModal'   
    any_open_modal.value.AnythingTopass = vac
}

// apicall_from_store( 'vacancy','vacancy-getList',{ queryObj : { page:page.value, perPage: 100 }, onSucSaveTheJsonOn: 'vacancies'})

</script>

<template>
    <div class="job-container">
        <h3 class="job-header">Vacancy openings</h3>
        <div class="job-details" >
            <h5 class="job-header" style="border: none;" v-if="vacancies.length === 0">No posted vacancy for now!!!</h5>
            <!-- Position Section -->
            <div class="section" v-for="(vac,i) in vacancies">
                <details>
                    <summary>
                        <div class="job-discriptions"> 
                            <h5 class="dis">Position: <span class="value"> {{ vac.position_name }} </span> </h5>
                            <h5 class="dis">company: <span class="value"> {{ vac.company }} </span> </h5>
                            <h5 class="dis">location: <span class="value">  {{ vac.locations.join() }} </span> </h5>
                            <h5 class="dis">deadline: <span class="value">  {{  format(new Date(vac.deadline), 'MMMM dd,yyyy') }} </span> </h5>
                            <h5 class="dis">salary: <span class="value"> {{ vac.salary }} </span> </h5>
                        </div>
                    </summary>
                    <div class="content">
                        <div class="job-discriptions"> 
                            <h5 class="dis">description: <span class="value"> {{ vac.description }} </span> </h5>
                        </div>
                        <div  class="quill-html-content" v-html="`${vac.requirements}`"> </div>
                    </div>
                    <div class="apply-button"  @click="openVacancyApplyModal(vac)" >
                        <button >To Apply, Click Here</button>
                    </div>
                </details>
            </div>

        </div>
    </div>
    <NewsletterSub/>
</template>

<style scoped lang="scss">
@import '/assets/style/variables';
/* Main container */
.job-container {
    max-width: 800px;
    min-height: 400px;
    margin: 0 auto;
    margin-bottom: 4rem;
    background-color: #fff;
    border-radius: 4px;
}

/* Header */
.job-header {
    text-transform: capitalize;
    text-align: center;
    padding-bottom: 10px;
    margin: 2rem auto;
    border-bottom: 1px solid #ddd;
    font-weight: 500;
}



/* Job details */
.job-details {
    padding: 0;
}

/* Section styling */
.section {
    border: 1px solid #eee;
    margin: 1rem 0;
}



/* Collapsible sections */
details {
    width: 100%;
}

details summary {
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

details summary::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2rem;
    content: '+';
    font-size: 25px;
}

details[open] summary::after {
    content: '-';
}

details summary::-webkit-details-marker {
    display: none;
}

.content {
    padding: 15px;
}

.job-discriptions{
    display: flex;
    flex-direction: column;
    gap: 5px;
    .dis{
        text-transform: capitalize;
        color: #0a1525;
    }
    .value{
        font-size: 14px;
        color: #666;
    }
}

/* Apply button */
.apply-button {
    text-align: center;
    padding: 20px;
}

.apply-button button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    background: linear-gradient(135deg, #0a1525 0%, #152a4a 100%);
    outline: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
    cursor: pointer;
    &:hover {
        box-shadow: 0 2px 6px 1px #666;
    }
}
</style>