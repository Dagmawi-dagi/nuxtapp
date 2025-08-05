//NOTE:::: Middleware handlers should not return anything (nor close or respond to the request) 
// and only inspect or extend the request context or throw an error.

import modelsRefs from '../database/models/modelsRefs';
import withErrorHandler from '../utils/catchAsync';
import { createError } from 'h3';
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default withErrorHandler( async(event) => {

  // we need this middleware to run if the api url needs auth
  const url = getRequestURL(event).pathname;
  if (event.context.APIINFO?.auth && url.includes('/api/')) {
    // 1. Get token from headers
    const authHeader = event.node.req.headers?.authorization
    let token = null
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]
    }

    // 2. Handle missing token
    if (!token) {
      throw createError({ 
        statusCode: 401, 
        statusMessage: 'Please provide access token! You need to be logged in' 
      })
    }

    // 3. Verify token
    const verifyAsync = promisify(jwt.verify)
    const decoded = await verifyAsync(token, process.env.JWT_SECRET)

    // 4. Check user existence
    const user = await modelsRefs.user.model.findByPk(decoded.id)
    if (!user) {
      throw createError({ 
        statusCode: 401, 
        statusMessage: 'the token owner (user) does n\'t exist anymore'
      })
    }

    // 5. Check password change timestamp
    if (user.passwordChangedAt) {
      const tokenIssuedAt = decoded.iat
      const pwdChangedAt = Math.floor(user.passwordChangedAt.getTime() / 1000)
      
      if (tokenIssuedAt < pwdChangedAt) {
        throw createError({ 
          statusCode: 401, 
          statusMessage: 'Password was changed recently. Please login again' 
        })
      }
    }

    // 6. Attach user to context
    event.context.user = user
    return user
  }
})