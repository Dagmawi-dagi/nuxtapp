// here we will define all the information for any api routes
// which can be used inn the next server middle wares

export const API_INFO = {   
    "/api/test" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: [],
        saveFileTo: null,
        reqBodyValidation:{},
        filterReqBodyWith:[],
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
        ],
        reqBodyValidation:{bool:true,schemaName:'test'},
        filterReqBodyWith:[],
    },
    "/api/test/patch" : { 
        method: 'patch',
        auth: false,
        restrict:[],
        fileUpload: [
            {
                fieldName: 'coverImg',
                saveFileToFolder: 'test',
                allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
                type:"image"
            },
        ],
        saveFileTo: null,
        reqBodyValidation:{bool:true,schemaName:'test'},
        filterReqBodyWith:[],
    },
    "/api/test/delete" : { 
        method: 'delete',
        auth: false,
        restrict:[],
        fileUpload: [],
        saveFileTo: null,
        reqBodyValidation:{},
        filterReqBodyWith:[],
    },
}