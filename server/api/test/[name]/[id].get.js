export default defineEventHandler((event) => {
  console.log(event.method);
  return {
    method: event.method,
    event: getRouterParams(event)
  }
})