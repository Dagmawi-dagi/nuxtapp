//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


//1- here we will validate the reqBody with the DBSchema 
//2- we will validate the reqBody with custome validation rules defined for this route on ApiRouteRefs.js


import modelsRefs from '../database/models/modelsRefs';
import withErrorHandler from '../utils/catchAsync';
import { createError } from 'h3';

export default withErrorHandler( async(event) => {

    const url = getRequestURL(event).pathname;
    // Only run if the URL includes '/api/'
    if (url.includes('/api/')) {
        let result
        if (event.context.APIINFO.reqBodyValidation.bool){
            const modelRef = event.context.APIINFO.reqBodyValidation.modelRef
            const schemaName = event.context.APIINFO.reqBodyValidation.schemaName
            let validationSchema = modelsRefs[modelRef].zobSchema[schemaName];
             // if the form is multipart use the event.context.modifiedBody
            if(event.context.modifiedBody){
                result =  validationSchema.safeParse(event.context.modifiedBody) // or `.parse` to directly throw an error
            } 
            else{ // if the body is not formdata we can just use the readValidatedBody
                result = await readValidatedBody(event, body => validationSchema.safeParse(body)) // or `.parse` to directly throw an error
            }

            if (!result?.success){
                throw createError({
                    statusCode: 400,
                    statusMessage:"request body validation failed",
                    message: JSON.stringify(result.error.issues),
                });
            }
        } 

    }

})    
            


