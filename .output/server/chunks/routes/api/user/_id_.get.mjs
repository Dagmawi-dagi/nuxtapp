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

const _id__get = withErrorHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing user ID"
    });
  }
  const user = await modelsRef.user.model.findByPk(userId, {
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

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
