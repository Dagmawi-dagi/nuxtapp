import modelsRefs from '~/server/database/models/modelsRefs';
import withErrorHandler from '~/server/utils/catchAsync';
import jwt from 'jsonwebtoken';

export default withErrorHandler(async (event) => {
  const body = await readBody(event);
  
  // Create user
  const user = await modelsRefs.user.model.create(body);
  
  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  
  // Update user with last login timestamp
  user.lastLoggedIn = new Date();
  await user.save();
  
  // Prepare response data
  const responseData = user.toJSON();
  delete responseData.userPassword;
  delete responseData.active;
  
  return {
    status: 'success',
    token,
    data: responseData
  };
});

