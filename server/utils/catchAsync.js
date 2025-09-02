import { createError } from 'h3';


export default function withErrorHandler(handler) {
  return defineEventHandler(async (event) => {

    try {
      // do something before the route handler
      let resObj =  await handler(event) 
      return resObj;

    } catch (error) {
      const err = {
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Internal Server Error',
        message: error,
      }

      // handling error needed errors

      //-----------------------------------ER_DUP_ENTRY------------------------------------------------
      if(err.message?.parent?.code === 'ER_DUP_ENTRY'){
        throw createError({
          statusCode: 400,
          message: JSON.stringify(err.message?.parent?.sqlMessage)
        });
      }

      //-----------------------------------------------------------------------------------

      throw createError({
        statusCode: err.statusCode,
        statusMessage: err.statusMessage ,
        message: err.message
      });
    }
  })
}
