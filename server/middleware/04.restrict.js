//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.

import modelsRefs from '../database/models/modelsRefs';
import withErrorHandler from '../utils/catchAsync';
import { createError } from 'h3';

export default withErrorHandler( async(event) => {
 // Get authenticated user from context
    const currentUser = event.context.user;
    
    if (!currentUser) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Please log in'
      });
    }

    // Fetch user with roles
    const user = await modelsRefs.user.model.findByPk(currentUser.id, {
      include: ['role']
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    // Extract role names (assuming department_name is the field)
    const userRoles = user.role.map(role => role.department_name);
    
    // Check if user has any of the required roles
    const hasPermission = roles.some(role => userRoles.includes(role));
    
    if (!hasPermission) {
      throw createError({
        statusCode: 403,
        statusMessage: `Forbidden: Only ${roles.join(', ')} can perform this action`
      });
    }
    
    // User has permission - continue processing
    return true;
})