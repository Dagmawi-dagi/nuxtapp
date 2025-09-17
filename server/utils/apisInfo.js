// here we will define all the information for any api routes
// which can be used inn the next server middle wares

export const API_INFO = {   
    "/api/test/GET" : { 
        method: 'GET',
        auth: false,
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
        auth: false,
        restrict:['admin'],
        fileUpload: [],
        reqBodyValidation:{},
    },
    // ------------------------------blog--------------------------
    "/api/blog/GET" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{},
    },
    "/api/blog/postBlog/POST" : { 
        method: 'POST',
        auth: true,
        restrict:[],
        fileUpload: [
            {
                fieldName: 'coverImg',
                saveFileToFolder: 'blog',
                allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
                type:"file",
                isarray: false

            },
        ],
        reqBodyValidation:{ bool:true,modelRef:'blog', schemaName: 'base'},
        addCreatedBy:true
    },
    // ------------------------------vacancy--------------------------
    "/api/vacancy/GET" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{},
    },
    "/api/vacancy/POST" : { 
        method: 'POST',
        auth: true,
        restrict:[],
        fileUpload:[],
        reqBodyValidation:{ bool:true,modelRef:'vacancy', schemaName: 'base'},
        addCreatedBy:true
    },
    "/api/vacancy/apply/POST" : { 
        method: 'POST',
        auth: true,
        restrict:[],
        fileUpload: [
            {
                fieldName: 'uploaded_files',
                saveFileToFolder: 'vacancyApplicationFiles',
                allowedTypes: ['.pdf'],
                type:"file",
                isarray: true
            },
        ],
        reqBodyValidation:{ bool:true,modelRef:'vacancyApplication', schemaName: 'base'},
    },

    // ------------------------------newsletterSub--------------------------
    "/api/newsletterSub/GET" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{},
    },
    "/api/newsletterSub/POST" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{ bool:true,modelRef:'newsletterSub', schemaName: 'base'},
    },
    // ------------------------------newsletter--------------------------
    "/api/newsletter/GET" : { 
        method: 'GET',
        auth: false,
        restrict:[],
        fileUpload: [],
        reqBodyValidation:{},
    },

}