import { w as withErrorHandler, m as modelsRef, e as createError, f as setCookie } from '../../../_/nitro.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

const updateEmail_patch = withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  const user = event.context.user;
  const userWithPassword = await modelsRef.user.model.findOne({
    where: { id: user.id },
    attributes: { include: ["userPassword"] }
  });
  if (!userWithPassword) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  const correct = await bcrypt.compare(
    body.userPassword,
    userWithPassword.userPassword
  );
  if (!correct) {
    throw createError({
      statusCode: 400,
      statusMessage: "The currentPassword you provided is incorrect"
    });
  }
  userWithPassword.email = body.email;
  userWithPassword.passwordChangedAt = /* @__PURE__ */ new Date();
  const updatedUser = await userWithPassword.save();
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
  const responseData = updatedUser.toJSON();
  delete responseData.userPassword;
  return {
    status: "success",
    data: responseData
  };
});

export { updateEmail_patch as default };
//# sourceMappingURL=updateEmail.patch.mjs.map
