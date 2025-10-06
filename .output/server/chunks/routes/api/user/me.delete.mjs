import { w as withErrorHandler, e as createError, m as modelsRef, g as setResponseStatus } from '../../../_/nitro.mjs';
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

const me_delete = withErrorHandler(async (event) => {
  const currentUser = event.context.user;
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Not authenticated"
    });
  }
  const [updateCount] = await modelsRef.user.model.update(
    { active: false },
    { where: { id: currentUser.id } }
  );
  if (updateCount === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  setResponseStatus(event, 204);
  return {
    status: "success"
  };
});

export { me_delete as default };
//# sourceMappingURL=me.delete.mjs.map
