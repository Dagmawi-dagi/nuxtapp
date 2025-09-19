import modelsRef from '@/server/database/models/modelsRefs'
import withErrorHandler from '@/server/utils/catchAsync'
import { commonController } from '@/server/service/commonCrud'

export default withErrorHandler( async(event) => {
    const id = event.context.params?.id;
    const result =  await commonController(event,modelsRef.newsletterSub.model).updateMany({id},event.context.modifiedBody)
    return{
     status: 'success',
     data: result
    }
})