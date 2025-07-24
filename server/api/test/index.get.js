import modelsRef from '@/server/database/models/modelsRefs'
import withErrorHandler from '@/server/utils/catchAsync'
import { commonController } from '@/server/service/commonCrud'

export default withErrorHandler( async(event) => {
 const result =  await commonController(event,modelsRef.test.model).get()
   return{
     status: 'success',
     data: result.rows
   }
})