import { G as executeAsync } from '../_/nitro.mjs';
import { p as defineNuxtRouteMiddleware, n as navigateTo, q as useCookie } from './server.mjs';
import { u as useAuthStore } from './user-CapvL0VR.mjs';
import { u as useFetch } from './fetch-BwaowXL0.mjs';
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
import 'vue';
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
import '@vue/shared';

const auth = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  const auth2 = useAuthStore();
  if (!auth2.loggedInUser) {
    const { data: user, error } = ([__temp, __restore] = executeAsync(() => useFetch("/api/user/me", {
      method: "GET",
      headers: {
        apiref: "/api/user/me/GET"
      }
    }, "$iafshigZRx")), __temp = await __temp, __restore(), __temp);
    if (!error.value && ((_a = user.value) == null ? void 0 : _a.data)) {
      auth2.loggedInUser = user.value.data;
      if (to.name === "auth") {
        return navigateTo({ name: "dashboard" });
      }
      return;
    }
    const tokenCookie = useCookie("jwt");
    tokenCookie.value = null;
    if (to.name !== "auth") {
      return navigateTo({ name: "auth" });
    }
    return;
  }
  if (to.name === "auth") {
    return navigateTo({ name: "dashboard" });
  }
});

export { auth as default };
//# sourceMappingURL=auth-Vkj_5s23.mjs.map
