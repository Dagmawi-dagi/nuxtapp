import { s as saveFile } from '../../_/saveFileUpload.mjs';
import { w as withErrorHandler, E as Email } from '../../_/nitro.mjs';
import 'fs/promises';
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

const order_post = withErrorHandler(async (event) => {
  const info = event.context.modifiedBody;
  const files = event.context.uploadedFiles || [];
  await new Email().order(info, files);
  for (const file of files) await saveFile(file.buffer, file.filePath);
  return {
    status: "success",
    data: "Your message has been sent successfully."
  };
});

export { order_post as default };
//# sourceMappingURL=order.post.mjs.map
