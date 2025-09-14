import modelsRefs from '~/server/database/models/modelsRefs';
import withErrorHandler from '~/server/utils/catchAsync';
import jwt from 'jsonwebtoken';
import { saveFile } from '@/server/utils/saveFileUpload'
import { setCookie } from 'h3';


export default withErrorHandler(async (event) => {
  let body =  event.context.modifiedBody
  
  // Create user
  const user = await modelsRefs.user.model.create(body);
  
  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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
  
  // Update user with last login timestamp
  user.lastLoggedIn = new Date();
  await user.save();

  // save the uploaded files if the create crud goes successfully
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath); // processed buffer is already ready

  // Prepare response data
  const responseData = user.toJSON();
  delete responseData.userPassword;
  delete responseData.active;
  
  return {
    status: 'success',
    data: responseData
  };
});

