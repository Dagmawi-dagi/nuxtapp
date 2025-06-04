import { createWriteStream } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { getRequestURL,getMethod   } from 'h3'

// Ensure __dirname works in ES module context
const __dirname = dirname(fileURLToPath(import.meta.url))
// Create a write stream for access.log
const accessLogStream = createWriteStream(join(__dirname, '../../access.log'), {
  flags: 'a', // Append mode
})

export default defineEventHandler((event) => {
  const url = getRequestURL(event).toString()
  const logLine = `[${new Date().toISOString()}] ${event.node.req.method} ${url}\n`

  accessLogStream.write(logLine)
})
