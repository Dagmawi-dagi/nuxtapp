// here we will define all the information for any api routes
// which can be used inn the next server middle wares

export const API_INFO = {   
    "/api/test/GET" : { 
        method: 'GET',
        auth: true,
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
        reqBodyValidation:{bool:true,modelRef:'test', schemaName: 'base'},
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
        reqBodyValidation:{bool:true,modelRef:'test', schemaName: 'base'},
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
     "/api/user/logIn/POST" : { 
        method: 'POST',
        auth: false,
        restrict:[],
        fileUpload: [],
        saveFileTo: null,
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'loginSchema'},
        filterReqBodyWith:[],
    },
     "/api/user/signUp/POST" : { 
        method: 'POST',
        auth: false,
        restrict:[],
        fileUpload: [],
        saveFileTo: null,
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'base'},
        filterReqBodyWith:[],
    },
}