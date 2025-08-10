export default defineEventHandler((event) => {
  throw createError({
    statusCode: 404,
    statusMessage: 'API route not found',
    message: `The requested endpoint '${event.path}' does not exist.`
  })
});
