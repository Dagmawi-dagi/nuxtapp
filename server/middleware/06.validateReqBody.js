//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


//1- here we will validate the reqBody with the DBSchema 
//2- we will validate the reqBody with custome validation rules defined for this route on ApiRouteRefs.js

import { generateZodSchema } from '@/server/utils/zodValidationSchema'
import modelsRefs from '../database/models/modelsRefs';
import withErrorHandler from '../utils/catchAsync';

export default withErrorHandler( async(event) => {
    let result
    if (event.context.APIINFO.reqBodyValidation.bool){
        const dbSchema = modelsRefs[event.context.APIINFO.reqBodyValidation.schemaName].schema
        if(event.context.modifiedBody){
            result =  generateZodSchema(dbSchema,'test').safeParse(event.context.modifiedBody) // or `.parse` to directly throw an error
        }
        else{ // if the body is not formdata we can just use the readValidatedBody
            result = await readValidatedBody(event, body => generateZodSchema(dbSchema,'test').safeParse(body)) // or `.parse` to directly throw an error
        }
    } 

    return result
    // // check if we have modifed body to mean thta have multipart form data 
    // // else just use the regular readValidatedBody cus it will read from the req.body
})