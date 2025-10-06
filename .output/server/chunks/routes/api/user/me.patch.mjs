import { w as withErrorHandler, e as createError, m as modelsRef, f as setCookie } from '../../../_/nitro.mjs';
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

const me_patch = withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  const user = event.context.user;
  if (body.userPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "This route is not for password updates"
    });
  }
  const [updateCount] = await modelsRef.user.model.update(body, {
    where: { id: user.id },
    validate: true,
    individualHooks: true
  });
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath);
  const updatedUser = await modelsRef.user.model.findByPk(user.id);
  const token = jwt.sign({ id: updatedUser.id }, process.env.JWT_SECRET, {
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
  return {
    status: "success",
    data: updatedUser
  };
});

export { me_patch as default };
//# sourceMappingURL=me.patch.mjs.map
