import modelsRefs from '~/server/database/models/modelsRefs';
import withErrorHandler from '~/server/utils/catchAsync';
import { createError } from 'h3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  const user = event.context.user;

  // Fetch user with password
  const userWithPassword = await modelsRefs.user.model.findOne({
    where: { id: user.id },
    attributes: { include: ['userPassword'] }
  });

  if (!userWithPassword) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }

  // Verify current password
  const correct = await bcrypt.compare(
    body.userPassword, 
    userWithPassword.userPassword
  );

  if (!correct) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The currentPassword you provided is incorrect'
    });
  }

  // Update phone number
  userWithPassword.phoneNumber = body.newPhoneNumber;
  const updatedUser = await userWithPassword.save();
  
  // Generate new token
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
  // Prepare response
  const responseData = updatedUser.toJSON();
  delete responseData.userPassword;

  return {
    status: 'success',
    data: responseData
  };
});