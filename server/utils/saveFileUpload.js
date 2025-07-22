// if the create or update handler ware is 200 OK then save the file on server NOT Before since the crud may fail and we will have trash file sved and taking space
// here are also processing image file uploads and other file upload processing as needed
import fs from 'fs/promises';
import { createError } from 'h3';

export async function saveFile (buffer, filePath)  {
  try {
    await fs.writeFile(filePath, buffer);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `File save failed: ${error.message}`
    });
  }
};