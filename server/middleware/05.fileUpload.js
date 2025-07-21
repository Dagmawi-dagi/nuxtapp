// //NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// // and only inspect or extend the request context or throw an error.


// // this file upload middle ware will work with Formdata ....  and change this to the normal body obj so that we
// // can use the file upoded {fieldname:string} on readValidatedBody(only works on bodydata) which will be on the next middleware
// // this way we can do validation onthe body even thought the data was formdata

// import withErrorHandler from '@/server/utils/catchAsync'
// import fs from 'fs'
// import path from 'path'
// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { createError } from 'h3';
// export default withErrorHandler( async(event) => {
//     // return event.context?.APIINFO
//     if(!event.context?.APIINFO?.fileUpload)return 'Noooo fle upload'
//     // if the api info for has fileUpload Obj make susure to check it form here and send error messages 
//     const form = await readMultipartFormData(event)
//     return form
// })

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);
    if (!form) {
      throw createError({ statusCode: 400, message: 'No form data found' });
    }

    // Resolve paths
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const publicDir = path.join(__dirname, '..', '..', 'public');
    const uploadDir = path.join(publicDir, 'uploadedfiles');
    
    // Create directory if needed
    await fs.mkdir(uploadDir, { recursive: true });

    const savedFiles = [];
    const nonFileFields = {};

    for (const part of form) {
      if (part.filename) {
        // Process file upload
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(part.filename);
        const newFilename = `${path.basename(part.filename, ext)}_${uniqueSuffix}${ext}`;
        const filePath = path.join(uploadDir, newFilename);

        await fs.writeFile(filePath, part.data);

        // Add file reference to nonFileFields
        nonFileFields[part.name] = newFilename;

        savedFiles.push({
          originalName: part.filename,
          savedName: newFilename,
          url: `/uploadedfiles/${newFilename}`,
          fieldName: part.name
        });
      } else {
        // Process non-file fields
        nonFileFields[part.name] = part.data.toString('utf-8');
      }
    }

    return {
      message: 'Form processed successfully',
      savedFiles,
      nonFileFields
    };

  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `File upload failed: ${error.message}`
    });
  }
});