import { w as withErrorHandler, m as modelsRef, e as createError, f as setCookie } from '../../../_/nitro.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'sequelize';
import 'zod';
import 'crypto';
import 'nodemailer';
import 'html-to-text';
import 'fs';
import 'path';
import 'url';
import 'node:fs/promises';
import 'node:url';
import 'util';
import 'fs/promises';

const logIn_post = withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  const user = await modelsRef.user.model.findOne({
    where: { email: body.email },
    attributes: { include: ["userPassword"] }
  });
  if (!user || !await bcrypt.compare(body.userPassword, user.userPassword)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email or password"
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  setCookie(event, "jwt", token, {
    httpOnly: true,
    // prevents JS access
    secure: true,
    sameSite: "lax",
    path: "/",
    // cookie available to all routes
    maxAge: 60 * 60 * 24 * 7
    // 7 days
  });
  user.lastLoggedIn = /* @__PURE__ */ new Date();
  await user.save();
  const responseData = user.toJSON();
  delete responseData.userPassword;
  return {
    status: "success",
    data: responseData
  };
});

export { logIn_post as default };
//# sourceMappingURL=logIn.post.mjs.map
