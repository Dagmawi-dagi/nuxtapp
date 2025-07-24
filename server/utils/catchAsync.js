export default function withErrorHandler(handler) {
  return defineEventHandler(async (event) => {
    const isDev = true
    try {
      // do something before the route handler
      return await handler(event)
    } catch (error) {
      const err = {
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Internal Server Error',
        message: error,
      }

      if (isDev) {
        console.error('[API ERROR]', err)
      }
      throw err
    }
  })
}
