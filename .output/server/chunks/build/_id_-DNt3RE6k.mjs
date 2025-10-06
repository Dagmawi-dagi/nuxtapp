import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'date-fns';
import 'v-dialogs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const isConfirmed = ref(false);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "subscription-container" }, _attrs))} data-v-8f36e25e><div class="subscription-card" data-v-8f36e25e><div class="icon" data-v-8f36e25e><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8f36e25e><rect width="20" height="16" x="2" y="4" rx="2" data-v-8f36e25e></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-v-8f36e25e></path></svg></div><h1 class="title" data-v-8f36e25e>${ssrInterpolate(unref(isConfirmed) ? "Subscription confirmed!" : "Almost done!")}</h1><p class="message" data-v-8f36e25e>${ssrInterpolate(unref(isConfirmed) ? "Your email address has been successfully added to our newsletter list." : "Please confirm your subscription to our newsletter by clicking the button below.")}</p>`);
      if (!unref(isConfirmed)) {
        _push(`<div class="confirm-section" data-v-8f36e25e><button class="confirm-button"${ssrIncludeBooleanAttr(_ctx.loading) ? " disabled" : ""} data-v-8f36e25e>${ssrInterpolate(_ctx.loading ? "Confirming..." : "Confirm Subscription")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isConfirmed)) {
        _push(`<div class="success-message" data-v-8f36e25e><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon" data-v-8f36e25e><path d="M20 6 9 17l-5-5" data-v-8f36e25e></path></svg><span data-v-8f36e25e>Thank you for confirming!</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/confirmSub/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f36e25e"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DNt3RE6k.mjs.map
