import { model as test } from '@/server/database/models/test'

export default defineEventHandler( async(event) => {
    const tests = await test.findByPk(getRouterParams(event).id)
    return {tests}
})