import withErrorHandler from '@/server/utils/catchAsync';
import { setCookie } from 'h3';

export default withErrorHandler(async (event) => {
  // Clear the JWT cookie
  setCookie(event, 'jwt', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0 // expires immediately
  });

  return {
    status: 'success',
    message: 'Logged out successfully'
  };
});
