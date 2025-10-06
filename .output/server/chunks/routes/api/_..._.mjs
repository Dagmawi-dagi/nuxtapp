import { c as defineEventHandler, e as createError } from '../../_/nitro.mjs';
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

const _____ = defineEventHandler((event) => {
  throw createError({
    statusCode: 404,
    statusMessage: "API route not found",
    message: `The requested endpoint '${event.path}' does not exist.`
  });
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
