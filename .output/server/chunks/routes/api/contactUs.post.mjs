import { w as withErrorHandler, E as Email } from '../../_/nitro.mjs';
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

const contactUs_post = withErrorHandler(async (event) => {
  const info = event.context.modifiedBody;
  new Email().contactus(info);
  return {
    status: "success",
    data: "Your message has been sent successfully."
  };
});

export { contactUs_post as default };
//# sourceMappingURL=contactUs.post.mjs.map
