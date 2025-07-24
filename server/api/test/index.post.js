import modelsRef from '@/server/database/models/modelsRefs'
import { saveFile } from '@/server/utils/saveFileUpload'
import withErrorHandler from "@/server/utils/catchAsync"
import {commonController} from '@/server/service/commonCrud.js'

export default withErrorHandler( async(event) => {
  commonController(event,modelsRef.test).create({})
  // save the uploaded files if the create crud goes successfully
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath); // processed buffer is already ready
 
})