//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.
import { join  } from 'path'
import { appendFile } from "node:fs/promises";

export default defineEventHandler((event) => {
  const startTime = Date.now();
  event.node.res.on('finish', async() => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const { method, url } = event.node.req;
    const statusCode = event.node.res.statusCode;

    // Format the log entry
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${method} [${statusCode}] ${url} ${responseTime}ms\n`;
    // Log to console
    console.log(logEntry.trim());
    try {
      const logPath = join(process.cwd(), 'server', 'access.log');
      await appendFile(logPath,logEntry, "utf8");
    } catch (fsErr) {
      console.error("Failed to write access log:", fsErr);
    }

  });
})

