import { w as withErrorHandler, m as modelsRef } from '../../../_/nitro.mjs';
import { c as commonController } from '../../../_/commonCrud.mjs';
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

const index_post = withErrorHandler(async (event) => {
  const body = event.context.modifiedBody;
  const result = await commonController(event, modelsRef.newsletterSub.model).create(body);
  return {
    status: "success",
    data: result
  };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
