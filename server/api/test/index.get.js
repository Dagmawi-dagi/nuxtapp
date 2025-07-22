import modelsRefs from '@/server/database/models/modelsRefs'
import withErrorHandler from '@/server/utils/catchAsync'

export default withErrorHandler( async(event) => {
    const tests = await modelsRefs.test.model.findAll()
    return {
        tests,
        APIINFO:event.context.APIINFO
    }
})