import modelsRefs from '@/server/database/models/modelsRefs';
import withErrorHandler from '@/server/utils/catchAsync';
import { createError } from 'h3';

export default withErrorHandler(async (event) => {
  // Get authenticated user from middleware context
  const currentUser = event.context.user;

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You are not logged in'
    });
  }

  // Fetch fresh user data (optional but recommended)
  const user = await modelsRefs.user.model.findByPk(currentUser.id, {
    attributes: { exclude: ['userPassword', 'active'] }
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }

  return {
    status: 'success',
    data: user
  };
});