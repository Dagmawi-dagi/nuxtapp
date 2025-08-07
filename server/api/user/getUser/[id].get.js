import modelsRefs from '@/server/database/models/modelsRefs';
import withErrorHandler from '@/server/utils/catchAsync';
import { createError } from 'h3';

export default withErrorHandler(async (event) => {
  // Get ID from route params
  const userId = event.context.params?.id;
  
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing user ID'
    });
  }

  const user = await modelsRefs.user.model.findByPk(userId, {
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