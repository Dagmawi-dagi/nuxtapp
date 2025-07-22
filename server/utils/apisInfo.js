// here we will define all the information for any api routes
// which can be used inn the next server middle wares

export const API_INFO = {   
    "/api/test" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: {},
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
        fileUpload: [
            {
                fieldName: 'coverImg',
                saveFileToFolder: 'test',
                allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
                type:"image"
            },
            {
                fieldName: 'gallery',
                saveFileToFolder: 'test/gallery',
                allowedTypes: ['.jpg', '.png', '.webp'],
                type:"image"
            }
        ],
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