//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.

import modelsRefs from '../database/models/modelsRefs';
import withErrorHandler from '../utils/catchAsync';
import { createError } from 'h3';

export default withErrorHandler( async(event) => {
  const { restrict } = event.context.APIINFO;
  // If no restrictions are set, skip role check
  if (restrict && restrict.length > 0) {
    // Get authenticated user from context
    const currentUser = event.context.user;
    if (!currentUser) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Please log in to continue'
      });
    }

    // Fetch user from DB
    const user = await modelsRefs.user.model.findByPk(currentUser.id);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    // User roles stored as JSON array in DB
    const userRoles = Array.isArray(user.role) ? user.role : [];
    // return userRoles
    // Check if user has any required role
    const hasPermission = restrict.some(requiredRole =>
      userRoles.includes(requiredRole)
    );
    // return hasPermission
    if (!hasPermission) {
      throw createError({
        statusCode: 403,
        statusMessage: `Forbidden: Only ${restrict.join(', ')} can perform this action`
      });
    }
  }
})