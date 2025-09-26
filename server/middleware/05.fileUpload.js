//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.


// this file upload middle ware will work with Formdata ....  and change this to the normal body obj so that we
// can use the file upoded {fieldname:string} on readValidatedBody(only works on bodydata) which will be on the next middleware
// this way we can do validation onthe body even thought the data was formdata

import withErrorHandler from '@/server/utils/catchAsync'
// import {processImage} from  '@/server/utils/processImage';
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
          form = await readMultipartFormData(event)
          if (!form) throw createError({ statusCode: 400, message: 'No form data found' });
        }


        // Resolve paths
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        let publicDir;
        if (process.env.NODE_ENV === 'production') {
          // In production, use .output/public
          publicDir = path.join(process.cwd(), 'public')
        } else {
          // In dev, use normal /public
          publicDir = path.join(__dirname, '..', '..', 'public')
        }
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
              const newFilename = `${basename}_${uniqueSuffix}${ext}`.replace(/\s+/g, "_");
              const filePath = path.join(saveDir, newFilename);

              // Save to buffer
              let fileBuffer = part.data;
              // if (config.type === "image") {
              //   fileBuffer = await processImage(part.data, filePath);
              // }

              if (!event.context.uploadedFiles) event.context.uploadedFiles = [];
              event.context.uploadedFiles.push({
                fieldName: part.name,
                buffer: fileBuffer,
                filename: newFilename,
                filePath,
                config
              });

              // ✅ Allow multiple files per field
              if (nonFileFields[part.name]) {
                if (Array.isArray(nonFileFields[part.name])) {
                  nonFileFields[part.name].push(newFilename);
                } 
              } else {
                if (config.isarray ) {
                  nonFileFields[part.name] = [newFilename];
                }else nonFileFields[part.name] = newFilename;
              }
            }  else {
              const value = part.data.toString("utf-8");
              const arrayMatch = part.name.match(/^(.+)\[(\d+)\]$/); // detect field[index]
              if (arrayMatch) {
                const field = arrayMatch[1];
                const index = parseInt(arrayMatch[2], 10);
                if (!nonFileFields[field]) nonFileFields[field] = [];
                nonFileFields[field][index] = value; // preserve order
              } else {
                nonFileFields[part.name] = value;
              }
            }
          }
        }

        // since we need {} for bodyValidation to work with readValidatedBody 
        // we need to pass the nonFileFields to event.context
        if( Object.keys(nonFileFields).length >0) event.context.modifiedBody = nonFileFields
    }
  
});