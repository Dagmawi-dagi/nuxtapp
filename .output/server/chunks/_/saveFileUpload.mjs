import fs from 'fs/promises';
import { e as createError } from './nitro.mjs';

async function saveFile(buffer, filePath) {
  try {
    await fs.writeFile(filePath, buffer);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `File save failed: ${error.message}`
    });
  }
}

export { saveFile as s };
//# sourceMappingURL=saveFileUpload.mjs.map
