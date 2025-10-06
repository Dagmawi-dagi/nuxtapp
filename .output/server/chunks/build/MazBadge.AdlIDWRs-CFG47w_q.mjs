import { defineComponent, createElementBlock, openBlock, normalizeStyle, normalizeClass, renderSlot } from 'vue';
import { Y } from './profile-aL465hzv.mjs';
import './server.mjs';
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
import './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import './user-CapvL0VR.mjs';

const d = /* @__PURE__ */ defineComponent({
  __name: "MazBadge",
  props: {
    color: { default: "primary" },
    size: { default: "0.8em" },
    nowrap: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    pastel: { type: Boolean, default: false },
    roundedSize: { default: "md" }
  },
  setup(p) {
    return (e, u) => (openBlock(), createElementBlock(
      "span",
      {
        class: normalizeClass(["m-badge m-reset-css", [
          `--${e.color}`,
          { "--outline": e.outline, "--pastel": e.pastel, "--nowrap": e.nowrap },
          `--rounded-${e.roundedSize}`
        ]]),
        style: normalizeStyle({ fontSize: e.size })
      },
      [
        renderSlot(e.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), m = /* @__PURE__ */ Y(d, [["__scopeId", "data-v-6e8e9093"]]);

export { m as default };
//# sourceMappingURL=MazBadge.AdlIDWRs-CFG47w_q.mjs.map
