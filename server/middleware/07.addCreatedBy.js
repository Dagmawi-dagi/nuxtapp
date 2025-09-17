
import withErrorHandler from '@/server/utils/catchAsync';

export default withErrorHandler( async(event) => {
    /// NOTE we will be using the event.context.modifiedBody after this middle ware
    const url = getRequestURL(event).pathname;
    if (url.includes('/api/')) {
        const apiConfig = event.context.APIINFO;
         // Check if file upload is expected
        if (event.context.modifiedBody) {

            // add the created by to the request Body
            if (apiConfig.addCreatedBy) {
                event.context.modifiedBody.createdBy = event.context.user.id
            }
        }
        else {
            const body = await readBody(event)
            event.context.modifiedBody = body

            // add the created by to the request Body
            if (apiConfig.addCreatedBy) {
                event.context.modifiedBody.createdBy = event.context.user.id
            }
        }
    }

})    
            


