import { u as useResizableColumns, e as el } from './MazTableUi-DJE3g4qh.mjs';
import { P } from './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import { withAsyncContext, ref, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { format } from 'date-fns';
import { J as Jr } from './index-BKZP97f2.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useFetch } from './fetch-BwaowXL0.mjs';
import { storeToRefs } from 'pinia';
import { u as useNewsLetterStore } from './newsletter-Cm8k1Cuz.mjs';
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
import 'vue-router';
import 'v-dialogs';
import '@vue/shared';

const _sfc_main = {
  __name: "newsletters",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { newsletters: newsletters2, page, perPage } = storeToRefs(useNewsLetterStore());
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/newsletter/", {
        headers: {
          apiref: "/api/newsletter/GET"
        }
      }, "$TOiJmK3pO0")), __temp = await __temp, __restore(), __temp);
      newsletters2.value = (_a = data.value) == null ? void 0 : _a.data;
    } catch (error) {
      console.log(error);
    }
    const selectedIds = ref();
    const searchQuery = ref();
    const tableRef = ref(null);
    useResizableColumns(tableRef, {
      skipClasses: ["actions-column", "selection-column"],
      minWidth: 70
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MazTable = el;
      const _component_MazBtn = P;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(ssrRenderComponent(_component_MazTable, mergeProps({
        ref_key: "tableRef",
        ref: tableRef,
        class: "MyMazTable",
        size: "sm",
        modelValue: unref(selectedIds),
        "onUpdate:modelValue": ($event) => isRef(selectedIds) ? selectedIds.value = $event : null,
        "search-query": unref(searchQuery),
        "onUpdate:searchQuery": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        page: unref(page),
        "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
        "page-size": unref(perPage),
        "onUpdate:pageSize": ($event) => isRef(perPage) ? perPage.value = $event : null,
        search: "",
        pagination: "",
        color: "info",
        sortable: "",
        selectable: "",
        scrollable: "",
        hoverable: "",
        "background-even": "",
        "selected-key": "id",
        headers: [
          { label: "Doc id", key: "id", align: "center", classes: "selection-column trancate", sortable: true },
          { label: "subject", key: "subject", classes: "trancate" },
          { label: "content", key: "content", align: "center", classes: "trancate" },
          { label: "recipientsIds", key: "recipientsIds", classes: "trancate" },
          { label: "createdBy", key: "createdBy", align: "center", classes: "maz-font-bold trancate" },
          { label: "createdAt", key: "createdAt", align: "center", classes: "maz-font-bold trancate" },
          { label: "", key: "actions", align: "center", classes: "actions-column", sortable: false }
          // Added empty header for actions
        ],
        rows: unref(newsletters2)
      }, _attrs), {
        "cell-createdAt": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-c0e814d8${_scopeId}>${ssrInterpolate(unref(format)(new Date(value), "MMM dd,yyyy"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(format)(new Date(value), "MMM dd,yyyy")), 1)
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="myTableHeader" data-v-c0e814d8${_scopeId}><h4 data-v-c0e814d8${_scopeId}>Sent Newsletters</h4>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              color: "primary",
              "left-icon": unref(Jr),
              size: "xs",
              onClick: ($event) => _ctx.$router.push({ name: "sendNewsletter" })
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "send new newsletter ", color: "default" }, void 0, { right: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", null, "Sent Newsletters"),
                withDirectives(createVNode(_component_MazBtn, {
                  color: "primary",
                  "left-icon": unref(Jr),
                  size: "xs",
                  onClick: ($event) => _ctx.$router.push({ name: "sendNewsletter" })
                }, null, 8, ["left-icon", "onClick"]), [
                  [
                    _directive_tooltip,
                    { text: "send new newsletter ", color: "default" },
                    void 0,
                    { right: true }
                  ]
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/newsletter/newsletters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const newsletters = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c0e814d8"]]);

export { newsletters as default };
//# sourceMappingURL=newsletters-Ds-VEUj1.mjs.map
