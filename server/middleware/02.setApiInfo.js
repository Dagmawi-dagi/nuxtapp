// here we will define all the special information for any api route 
// which can be used inn the next middle wares or at the finall route controller (handler)

export default defineEventHandler(async (event) => {
    
    const route = event.node.req.url || ''
    const method = event.node.req.method || ''
    const params = event.context.params || {a:1}
    // use the info above to set info for the right api route
    console.log('🛠 Setting MYAPIINFO');
    const MYAPIINFO = { requiresAuth: false, validateBody: false, uploadFiles: false, filterBody: false }

    if (route.startsWith('/api/test') && method === 'POST') {
        MYAPIINFO.requiresAuth = true
        MYAPIINFO.validateBody = true
        MYAPIINFO.uploadFiles = true
        MYAPIINFO.filterBody = true
    }

     if (route.startsWith('/api/user') && method === 'POST' && Object.keys(params).keys().includes('aid') ) {
        MYAPIINFO.requiresAuth = true
        MYAPIINFO.validateBody = true
        MYAPIINFO.uploadFiles = true
        MYAPIINFO.filterBody = true
    }

    event.context.MYAPIINFO = MYAPIINFO
})
