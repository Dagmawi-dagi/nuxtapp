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

const _id__delete = withErrorHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const result = await commonController(event, modelsRef.test.model).deleteMany({ id });
  return {
    status: "success",
    data: result
  };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
