import modelsRefs from '~/server/database/models/modelsRefs';
import withErrorHandler from '~/server/utils/catchAsync';
import { createError } from 'h3';
import jwt from 'jsonwebtoken';
import { saveFile } from '@/server/utils/saveFileUpload'


export default withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  const user = event.context.user;

  // Prevent password updates through this route
  if (body.userPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'This route is not for password updates'
    });
  }

  // Update user
  const [updateCount] = await modelsRefs.user.model.update(body, {
    where: { id: user.id },
    validate: true,
    individualHooks: true
  });

  if (updateCount === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found or no changes made'
    });
  }
  // save the uploaded files if the update was successfully
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath); // processed buffer is already ready
  // Fetch updated user
  const updatedUser = await modelsRefs.user.model.findByPk(user.id);
  
  // Generate new token (if needed)
  const token = jwt.sign({ id: updatedUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
    // Save token inside cookie (httpOnly, secure)
  setCookie(event, 'jwt', token, {
    httpOnly: true,  // prevents JS access
    // secure: process.env.NODE_ENV === 'production',
    secure: true,
    sameSite: 'lax',
    path: '/',       // cookie available to all routes
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
  
  return {
    status: 'success',
    data: updatedUser
  };
});