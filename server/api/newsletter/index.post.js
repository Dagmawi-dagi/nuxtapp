import modelsRef from '@/server/database/models/modelsRefs'
import { saveFile } from '@/server/utils/saveFileUpload'
import withErrorHandler from "@/server/utils/catchAsync"
import {commonController} from '@/server/service/commonCrud.js'

export default withErrorHandler( async(event) => {
  const body = event.context.modifiedBody;
  const result = await commonController(event,modelsRef.newsletter.model).create(body)
  return{
    status: 'success',
    data: result
  }
})