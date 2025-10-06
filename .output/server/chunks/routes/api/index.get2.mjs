import { w as withErrorHandler, m as modelsRef } from '../../_/nitro.mjs';
import { c as commonController } from '../../_/commonCrud.mjs';
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

const index_get = withErrorHandler(async (event) => {
  const result = await commonController(event, modelsRef.newsletter.model).get();
  return {
    status: "success",
    data: result.rows
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
