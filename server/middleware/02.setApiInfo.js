// here we will define all the special information for any api route 
// which can be used inn the next middle wares or at the finall route controller (handler)




export default defineEventHandler((event) => {
    console.log('🛠 Setting MYAPIINFO');
    const route = event.node.req.url || ''
    const mothod = event.node.req.method
    console.log(route);
    console.log(mothod);
    
    const MYAPIINFO = {
        requiresAuth: false,
        validateBody: false,
        uploadFiles: false,
        filterBody: false,
    }

    if (route.startsWith('/api/a/s/d')) {
        MYAPIINFO.requiresAuth = true
        MYAPIINFO.validateBody = true
        MYAPIINFO.uploadFiles = true
        MYAPIINFO.filterBody = true
    }
    event.context.MYAPIINFO = MYAPIINFO
    // here i need to add some info like if the api is "a/s/d..." calidate the reqbody, auth the user, uploadfiles,filter the reqbody ....
})
