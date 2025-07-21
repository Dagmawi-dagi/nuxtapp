// here we will define all the information for any api routes
// which can be used inn the next server middle wares

export const API_INFO = {   
    "/api/test" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: {fieldName: 'coverImage',image: false,saveFileTo:'path'},
        saveFileTo: 'testphotos',
        reqBodyValidation:{bool:true,schemaName:'test'},
        filterReqBodyWith:[],
        controller:{
            model: 'user',
            crudMethod: 'create',
            common: true,
            addCreatedBy: false,
        },
    },
    "/api/test/:id" : { 
        method: 'GET',
        auth: true,
        restrict:[],
        fileUpload: {},
        reqBodyValidation:{bool:true,schemaName:'test'},
        filterReqBodyWith:[],
        controller:{
            model: 'user',
            crudMethod: 'create',
            common: true,
            addCreatedBy: false,
        },
    },
    "/api/test/post" : { 
        method: 'POST',
        auth: true,
        restrict:['admin'],
        fileUpload: {fieldName: 'coverImg',image: true,saveFileTo:'public/test'},
        reqBodyValidation:{bool:true,schemaName:'test'},
        filterReqBodyWith:[],
        controller:{
            model: 'test',
            crudMethod: 'create',
            common: true,
            addCreatedBy: true,
        },
    },
}