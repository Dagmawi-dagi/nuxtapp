import { w as withErrorHandler, f as setCookie } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'sequelize';
import 'zod';
import 'bcryptjs';
import 'crypto';
import 'nodemailer';
import 'html-to-text';
import 'fs';
import 'path';
import 'url';
import 'node:fs/promises';
import 'node:url';
import 'jsonwebtoken';
import 'util';
import 'fs/promises';

const logOut_post = withErrorHandler(async (event) => {
  setCookie(event, "jwt", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
    // expires immediately
  });
  return {
    status: "success",
    message: "Logged out successfully"
  };
});

export { logOut_post as default };
//# sourceMappingURL=logOut.post.mjs.map
