import { defineComponent, createElementBlock, openBlock, normalizeClass, createElementVNode } from 'vue';
import { M as Me } from './server.mjs';
import '../_/nitro.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'date-fns';
import 'v-dialogs';

const i = ["width", "height"], l = /* @__PURE__ */ defineComponent({
  __name: "MazSpinner",
  props: {
    size: { default: "2em" },
    color: { default: "theme" }
  },
  setup(m) {
    return (e, s) => (openBlock(), createElementBlock("svg", {
      width: e.size,
      height: e.size,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      viewBox: "0 0 50 50",
      "xml:space": "preserve",
      class: normalizeClass(["m-spinner m-reset-css", `m-spinner--${e.color}`]),
      style: { "enable-background": "new 0 0 50 50" }
    }, s[0] || (s[0] = [
      createElementVNode(
        "path",
        { d: "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" },
        null,
        -1
        /* HOISTED */
      )
    ]), 10, i));
  }
}), h = /* @__PURE__ */ Me(l, [["__scopeId", "data-v-52831d3b"]]);

export { h as default };
//# sourceMappingURL=MazSpinner.Cx7mdOJ3-CJ_o-Ntp.mjs.map
