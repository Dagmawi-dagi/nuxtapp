import { model as test  } from '@/server/database/models/test'

export default defineEventHandler(async(event) => {
    return 'post method handled'
    const body = await readBody(event)
    let newTest;
    try {
       newTest = await test.create(body)
    } catch (error) {
      return {error}
    }
    return {newTest}

})