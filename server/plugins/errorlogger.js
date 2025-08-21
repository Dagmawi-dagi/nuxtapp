import { appendFile } from "node:fs/promises";
import { join } from "node:path";

export default defineNitroPlugin((nitroApp) => {

  nitroApp.hooks.hook("error", async(error, { event }) => {

    const timestamp = new Date().toISOString();

    // 1. Console log for immediate visibility
    console.error( `[${timestamp}] [${error.statusCode || 500}] ${error.message}
    URL: ${event?.node?.req?.url}
    Method: ${event?.node?.req?.method}`);

    try {
      // 2. Append to server/error.log
      const logPath = join(process.cwd(), "server", "error.log");
      await appendFile(logPath, 
        `[${timestamp}] [${error.statusCode || 500}] ${error.message}
          URL: ${event?.node?.req?.url}
        Method: ${event?.node?.req?.method}
        Stack: ${error.stack || "N/A"}
        `, 
        "utf8");

    } catch (fsErr) {
      console.error("Failed to write error log:", fsErr);
    }

  });
});
