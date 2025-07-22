import sharp from 'sharp'; 

export async function processImage  (buffer, filePath)  {
  try {
   return await sharp(buffer)
      .resize({ width: 1920, withoutEnlargement: true }) // Optimal resize
      .webp({ quality: 80 }) // Convert to efficient format
      .toBuffer(filePath);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Image processing failed: ${error.message}`
    });
  }
};