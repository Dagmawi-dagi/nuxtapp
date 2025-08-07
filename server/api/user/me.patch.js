import modelsRefs from '~/server/database/models/modelsRefs';
import withErrorHandler from '~/server/utils/catchAsync';
import { createError } from 'h3';
import jwt from 'jsonwebtoken';


export default withErrorHandler(async (event) => {
  const body = await readBody(event);
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

  // Fetch updated user
  const updatedUser = await modelsRefs.user.model.findByPk(user.id);
  
  // Generate new token (if needed)
  const token = jwt.sign({ id: updatedUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return {
    status: 'success',
    token,
    data: updatedUser
  };
});