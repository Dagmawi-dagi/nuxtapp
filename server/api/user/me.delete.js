import modelsRefs from '~/server/database/models/modelsRefs';
import withErrorHandler from '~/server/utils/catchAsync';
import { createError } from 'h3';

export default withErrorHandler(async (event) => {
  // Get authenticated user from context
  const currentUser = event.context.user;
  
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    });
  }

  // Deactivate user (set active: false)
  const [updateCount] = await modelsRefs.user.model.update(
    { active: false },
    { where: { id: currentUser.id } }
  );

  if (updateCount === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }

  // Return success response (204 No Content)
  setResponseStatus(event, 204);
  return {
    status: 'success'
  };
});