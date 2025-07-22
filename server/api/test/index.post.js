import modelsRef from '@/server/database/models/modelsRefs'
import { saveFile } from '@/server/utils/saveFileUpload'
import withErrorHandler from "@/server/utils/catchAsync"

export default withErrorHandler( async(event) => {
  // save the uploaded files if any
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath); // processed buffer is already ready
 return
    const body = await readBody(event)
    let newTest;
    try {
      newTest = await test.create(body)
    } catch (error) {
      return {error}
    }
    return {newTest}
})