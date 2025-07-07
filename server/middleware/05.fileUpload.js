// this file upload middle ware will work with Formdata ....  and change this to the normal body obj so that we
// can use the file upoded {flename:string} on readValidatedBody(only works on bodydata) which will be the next middle ware
// this way we can do validation onthe body even thought the data was formdata

import withErrorHandler from '@/server/utils/catchAsync'
import fs from 'fs'
import path from 'path'

export default withErrorHandler( async(event) => {
    if(Object.keys(event.context?.APIINFO?.fileUpload).length === 0){
        return 'Noooo fle upload'
    }
    // if the api info for has fileUpload Obj make susure to check it form here and send error messages 
    const form = await readFormData(event)
    return form
})