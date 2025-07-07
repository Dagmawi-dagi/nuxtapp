import { model as test } from '@/server/database/models/test'

export default defineEventHandler( async(event) => {
    const testt = await test.findByPk(getRouterParams(event).id)
    
    return {
        testt,
        APIINFO:event.context.APIINFO
    }
})