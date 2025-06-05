export default defineEventHandler((event) => {
  console.log('33333')
  event.context.auth = { user: 123 }
})