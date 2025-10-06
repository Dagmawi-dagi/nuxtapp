import { w as withErrorHandler, m as modelsRef, f as setCookie } from '../../../_/nitro.mjs';
import jwt from 'jsonwebtoken';
import { s as saveFile } from '../../../_/saveFileUpload.mjs';
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
import 'util';
import 'fs/promises';

const signUp_post = withErrorHandler(async (event) => {
  let body = event.context.modifiedBody;
  const user = await modelsRef.user.model.create(body);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  setCookie(event, "jwt", token, {
    httpOnly: true,
    // prevents JS access
    // secure: "production" === 'production',
    secure: true,
    sameSite: "lax",
    path: "/",
    // cookie available to all routes
    maxAge: 60 * 60 * 24 * 7
    // 7 days
  });
  user.lastLoggedIn = /* @__PURE__ */ new Date();
  await user.save();
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath);
  const responseData = user.toJSON();
  delete responseData.userPassword;
  delete responseData.active;
  return {
    status: "success",
    data: responseData
  };
});

export { signUp_post as default };
//# sourceMappingURL=signUp.post.mjs.map
