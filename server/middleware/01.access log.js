//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.

import { createWriteStream } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { getRequestURL   } from 'h3'

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
  console.log(logLine);
})
