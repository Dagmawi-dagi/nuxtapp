export default defineEventHandler((event) => {
  // Set the HTTP response status code to 404 Not Found
  setResponseStatus(event, 404);

  // Return a JSON response with an error message
  return {
    error: 'API route not found',
    message: `The requested endpoint '${event.path}' does not exist.`
  };
});