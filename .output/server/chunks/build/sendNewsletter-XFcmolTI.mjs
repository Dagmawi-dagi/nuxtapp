import { u as useFetch } from './fetch-BwaowXL0.mjs';
import { resolveComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, f as frontEndErrorFeedback } from './server.mjs';
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
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'date-fns';
import 'v-dialogs';

const _sfc_main = {
  __name: "sendNewsletter",
  __ssrInlineRender: true,
  setup(__props) {
    const postNewsletter = async (FD, form$) => {
      try {
        const response = await $fetch("/api/newsletter", {
          method: "post",
          headers: {
            apiref: "/api/newsletter/POST"
          },
          body: form$.data
        });
        console.log(response);
        frontEndErrorFeedback().success("newsletter sent successfully");
      } catch (err) {
        frontEndErrorFeedback().err(err);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Vueform = resolveComponent("Vueform");
      const _component_StaticElement = resolveComponent("StaticElement");
      const _component_TextElement = resolveComponent("TextElement");
      const _component_EditorElement = resolveComponent("EditorElement");
      const _component_TagsElement = resolveComponent("TagsElement");
      const _component_ButtonElement = resolveComponent("ButtonElement");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-d420fe77>`);
      _push(ssrRenderComponent(_component_Vueform, { endpoint: postNewsletter }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_StaticElement, {
              name: "h3",
              tag: "h3",
              content: "Send New Newsletter",
              style: { "color": "#1492E6" },
              bottom: "2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TextElement, {
              name: "subject",
              label: "mail subject",
              info: "subject",
              rules: [
                "required"
              ],
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EditorElement, {
              name: "content",
              label: "content",
              info: "mail content",
              rules: [
                "required"
              ],
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TagsElement, {
              name: "recipientsIds",
              "close-on-select": false,
              search: true,
              label: "recipients",
              "input-type": "search",
              autocomplete: "off",
              items: async function(query, input) {
                const { data } = await ("useFetch" in _ctx ? _ctx.useFetch : unref(useFetch))("/api/newsletter/sub", {
                  method: "get",
                  headers: {
                    apiref: "/api/newsletter/sub/GET"
                  }
                });
                let mappedData = data.value.data.map(({ id, name }) => ({ value: id, label: name }));
                return mappedData;
              },
              info: "email Recipients",
              rules: [
                "required"
              ],
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ButtonElement, {
              name: "submit",
              "button-label": "send news letter",
              submits: true,
              size: "sm",
              align: "center",
              loading: _ctx.apicall_from_store_loading
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_StaticElement, {
                name: "h3",
                tag: "h3",
                content: "Send New Newsletter",
                style: { "color": "#1492E6" },
                bottom: "2"
              }),
              createVNode(_component_TextElement, {
                name: "subject",
                label: "mail subject",
                info: "subject",
                rules: [
                  "required"
                ],
                size: "sm"
              }),
              createVNode(_component_EditorElement, {
                name: "content",
                label: "content",
                info: "mail content",
                rules: [
                  "required"
                ],
                size: "sm"
              }),
              createVNode(_component_TagsElement, {
                name: "recipientsIds",
                "close-on-select": false,
                search: true,
                label: "recipients",
                "input-type": "search",
                autocomplete: "off",
                items: async function(query, input) {
                  const { data } = await ("useFetch" in _ctx ? _ctx.useFetch : unref(useFetch))("/api/newsletter/sub", {
                    method: "get",
                    headers: {
                      apiref: "/api/newsletter/sub/GET"
                    }
                  });
                  let mappedData = data.value.data.map(({ id, name }) => ({ value: id, label: name }));
                  return mappedData;
                },
                info: "email Recipients",
                rules: [
                  "required"
                ],
                size: "sm"
              }, null, 8, ["items"]),
              createVNode(_component_ButtonElement, {
                name: "submit",
                "button-label": "send news letter",
                submits: true,
                size: "sm",
                align: "center",
                loading: _ctx.apicall_from_store_loading
              }, null, 8, ["loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/newsletter/sendNewsletter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sendNewsletter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d420fe77"]]);

export { sendNewsletter as default };
//# sourceMappingURL=sendNewsletter-XFcmolTI.mjs.map
