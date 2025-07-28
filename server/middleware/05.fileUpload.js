//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


// this file upload middle ware will work with Formdata ....  and change this to the normal body obj so that we
// can use the file upoded {fieldname:string} on readValidatedBody(only works on bodydata) which will be on the next middleware
// this way we can do validation onthe body even thought the data was formdata

import withErrorHandler from '@/server/utils/catchAsync'
import {processImage} from  '@/server/utils/processImage';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createError } from 'h3';


// Main handler
export default withErrorHandler(async (event) => {

    const url = getRequestURL(event).pathname;
    // Only run if the URL includes '/api/'
    if (url.includes('/api/')) {
      const apiConfig = event.context.APIINFO;
          
        // Check if file upload is expected
        const fileUploadConfigs = apiConfig.fileUpload || [];
        const expectsFileUpload = fileUploadConfigs.length > 0;
        
        // Read form data only if file upload is expected
        let form;

        if (expectsFileUpload) {
          form = await readMultipartFormData(event);
          if (!form) throw createError({ statusCode: 400, message: 'No form data found' });
        }

        // Resolve paths
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const publicDir = path.join(__dirname, '..', '..', 'public');
        const defaultUploadDir = path.join(publicDir, 'uploadedfiles');
        
        // Create default directory
        await fs.mkdir(defaultUploadDir, { recursive: true });
        
        const nonFileFields = {};
        const uploadConfigMap = new Map();

        // Create fieldName to config mapping
        fileUploadConfigs.forEach(config => {
          uploadConfigMap.set(config.fieldName, config);
        });

        if (form) {
          for (const part of form) {
            if (part.filename) {
              // Validate expected file field
              const config = uploadConfigMap.get(part.name);
              if (!config) {
                throw createError({
                  statusCode: 400,
                  message: `Unexpected file upload field: ${part.name}`
                });
              }
              // Validate file type
              const ext = path.extname(part.filename).toLowerCase();
              if (config.allowedTypes && !config.allowedTypes.includes(ext)) {
                throw createError({
                  statusCode: 400,
                  message: `Invalid file type for ${part.name}. Allowed: ${config.allowedTypes.join(', ')}`
                });
              }
              // Prepare save directory
              const saveDir = path.join(publicDir, config.saveFileToFolder);
              await fs.mkdir(saveDir, { recursive: true });
              // Generate unique filename
              const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
              const basename = path.basename(part.filename, ext);
              const newFilename = `${basename}_${uniqueSuffix}${ext}`;
              const filePath = path.join(saveDir, newFilename);

              // save the file to memory buffer
              let fileBuffer = part.data;
              // Process file 
              if (config.type === 'image') {fileBuffer  = await processImage(part.data, filePath);}
              if (!event.context.uploadedFiles) event.context.uploadedFiles = [];
              event.context.uploadedFiles.push({
                fieldName: part.name,
                buffer: fileBuffer,
                filename: newFilename,
                filePath,
                config
              });
              // Add file reference
              nonFileFields[part.name] = newFilename;
            } else {
              // Handle non-file fields
              nonFileFields[part.name] = part.data.toString('utf-8');
            }
          }
        }

        // since we need {} for bodyValidation to work with readValidatedBody 
        // we need to pass the nonFileFields to event.context
        event.context.modifiedBody = nonFileFields
        // return  event.context.modifiedBody;
    }
  
});