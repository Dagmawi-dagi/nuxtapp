import modelsRefs from '@/server/database/models/modelsRefs';
import withErrorHandler from '@/server/utils/catchAsync';
import { createError,setCookie } from 'h3';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  
  // Find user with password
  const user = await modelsRefs.user.model.findOne({
    where: { email: body.email },
    attributes: { include: ['userPassword'] }
  });
  
  // Validate credentials
  if (!user || !(await bcrypt.compare(body.userPassword, user.userPassword))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email or password'
    });
  }
  
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
  
  // Update last login
  user.lastLoggedIn = new Date();
  await user.save();
  
  // Prepare response data
  const responseData = user.toJSON();
  delete responseData.userPassword;
  
  return {
    status: 'success',
    data: responseData
  };
});