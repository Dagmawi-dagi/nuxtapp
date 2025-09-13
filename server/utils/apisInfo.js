// here we will define all the information for any api routes
// which can be used inn the next server middle wares

export const API_INFO = {   
    "/api/test/GET" : { 
        method: 'GET',
        auth: true,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{},
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
        
        reqBodyValidation:{bool:true,modelRef:'test', schemaName: 'base'},
        
    },
    "/api/test/delete" : { 
        method: 'delete',
        auth: false,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{},
        
    },
    // ------------------------------user--------------------------
     "/api/user/logIn/POST" : { 
        method: 'POST',
        auth: false,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'loginSchema'},
    },
    "/api/user/logOut/POST" : { 
        method: 'POST',
        auth: ['user'],
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{},
    },
     "/api/user/signUp/POST" : { 
        method: 'POST',
        auth: false,
        restrict:[],
        fileUpload: [
            {
                fieldName: 'avatar',
                saveFileToFolder: 'users',
                allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
                type:"image"
            },
        ],
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'base'},
    },
    "/api/user/me/GET" : { 
        method: 'GET',
        auth: true,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{},
        
    },
    "/api/user/[id]/GET" : { 
        method: 'GET',
        auth: true,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{},
        
    },
    "/api/user/updatePassword/PATCH" : { 
        method: 'PATCH',
        auth: true,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'updatePasswordSchema'},
        
    },
    "/api/user/updatePhoneNumber/PATCH" : { 
        method: 'PATCH',
        auth: true,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'updatePhonenumberSchema'},
    },
    "/api/user/updateEmail/PATCH" : { 
        method: 'PATCH',
        auth: true,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{bool:true,modelRef:'user', schemaName: 'updateEmailSchema'},
    },
    "/api/user/me/PATCH" : { 
        method: 'PATCH',
        auth: true,
        restrict:[],
        fileUpload: [
            {
                fieldName: 'avatar',
                saveFileToFolder: 'users',
                allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
                type:"image"
            },
        ],
        reqBodyValidation:{ bool:true,modelRef:'user', schemaName: 'updateSchema'},
    },
    "/api/user/me/DELETE" : { 
        method: 'DELETE',
        auth: true,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{},
    },
    "/api/user/GET" : { 
        method: 'GET',
        auth: true,
        restrict:['admin'],
        fileUpload: [],
        reqBodyValidation:{},
    },
    // ------------------------------blog--------------------------
    "/api/blog/GET" : { 
        method: 'GET',
        auth: true,
        restrict:[],
        fileUpload: [],
        
        reqBodyValidation:{},
    },

}