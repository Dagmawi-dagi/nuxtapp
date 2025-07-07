import { model as test } from '@/server/database/models/test'
import withErrorHandler from '@/server/utils/catchAsync'

export default withErrorHandler( async(event) => {
    const tests = await test.findAll()
    return {
        tests,
        APIINFO:event.context.APIINFO
    }
})