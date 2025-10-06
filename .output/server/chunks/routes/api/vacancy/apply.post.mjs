import { w as withErrorHandler, m as modelsRef } from '../../../_/nitro.mjs';
import { s as saveFile } from '../../../_/saveFileUpload.mjs';
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

const apply_post = withErrorHandler(async (event) => {
  event.context.modifiedBody.application_form = JSON.parse(event.context.modifiedBody.application_form);
  const result = await commonController(event, modelsRef.vacancyApplication.model).create(event.context.modifiedBody);
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath);
  return {
    status: "success",
    data: result
  };
});

export { apply_post as default };
//# sourceMappingURL=apply.post.mjs.map
