import { w as withErrorHandler, e as createError, m as modelsRef } from '../../../_/nitro.mjs';
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

const me_get = withErrorHandler(async (event) => {
  const currentUser = event.context.user;
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "You are not logged in"
    });
  }
  const user = await modelsRef.user.model.findByPk(currentUser.id, {
    attributes: { exclude: ["userPassword", "active"] }
  });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  return {
    status: "success",
    data: user
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
