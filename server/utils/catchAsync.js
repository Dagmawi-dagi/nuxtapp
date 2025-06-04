export default function withErrorHandler(handler) {
  return defineEventHandler(async (event) => {
    const isDev = 'development'
    try {
      // do something before the route handler
      return await handler(event)
    } catch (error) {
      const err = {
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Internal Server Error',
        message: error.message || String(error),
      }

      if (isDev) {
        console.error('[API ERROR]', error)
      }

      // Optionally send to external logging service here

      return err
    }
  })
}
