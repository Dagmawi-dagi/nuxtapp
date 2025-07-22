import modelsRefs from '@/server/database/models/modelsRefs'

export default defineEventHandler( async(event) => {
    const testt = await modelsRefs.test.model.findByPk(getRouterParams(event).id)
    
    return {
        testt,
        APIINFO:event.context.APIINFO
    }
})