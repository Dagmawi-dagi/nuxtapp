import { u as useResizableColumns, e as el } from './MazTableUi-DJE3g4qh.mjs';
import { P } from './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import { withAsyncContext, ref, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { format } from 'date-fns';
import { q as qa, K as Kn } from './index-BKZP97f2.mjs';
import { _ as _export_sfc, o as useVacancyStore, d as useUtilStore, f as frontEndErrorFeedback } from './server.mjs';
import { u as useFetch } from './fetch-BwaowXL0.mjs';
import { storeToRefs } from 'pinia';
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
  __name: "applications",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { applications: applications2, page, perPage } = storeToRefs(useVacancyStore());
    const { any_open_modal } = useUtilStore();
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/vacancy/applications", {
        method: "get",
        headers: {
          apiref: "/api/vacancy/applications/GET"
        }
      }, "$lxQpcAAX8g")), __temp = await __temp, __restore(), __temp);
      applications2.value = (_a = data.value) == null ? void 0 : _a.data;
    } catch (error) {
      console.log(error);
    }
    const selectedIds = ref();
    const searchQuery = ref();
    const loadingIds = ref([]);
    const isLoading = (id) => loadingIds.value.includes(id);
    const deleteApplication = async (application) => {
      if (!(application == null ? void 0 : application.id)) return;
      loadingIds.value.push(application.id);
      try {
        await $fetch(`/api/vacancy/application/${application.id}`, {
          method: "DELETE",
          headers: {
            apiref: "/api/vacancy/application/[id]DELETE"
          }
        });
        frontEndErrorFeedback().success(" vacancy deleted successfully");
        applications2.value = applications2.value.filter((p) => p.id !== application.id);
      } catch (error) {
        frontEndErrorFeedback().err(error);
      } finally {
        loadingIds.value = loadingIds.value.filter((id) => id !== application.id);
      }
    };
    const showApplication = (application) => {
      any_open_modal.id = "ViewVacancyApplication";
      any_open_modal.AnythingTopass = application;
      any_open_modal.bool = true;
    };
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
          { label: "#", key: "id", align: "center", classes: "selection-column", sortable: true },
          { label: "vacancy", key: "vacancyId", classes: "trancate" },
          { label: "fullName", key: "fullName", classes: "trancate" },
          { label: "phoneNumber", key: "phoneNumber", classes: "trancate" },
          { label: "email", key: "email", classes: "trancate" },
          { label: "uploaded_files name", key: "uploaded_files", classes: "trancate" },
          { label: "createdAt", key: "createdAt", align: "center", classes: "trancate" },
          { label: "", key: "actions", align: "center", classes: "actions-column", sortable: false }
          // Added empty header for actions
        ],
        rows: unref(applications2)
      }, _attrs), {
        "cell-createdAt": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-662de60b${_scopeId}>${ssrInterpolate(unref(format)(new Date(value), "MMM dd,yyyy"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(format)(new Date(value), "MMM dd,yyyy")), 1)
            ];
          }
        }),
        "cell-fullName": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<span data-v-662de60b${_scopeId}>${ssrInterpolate(((_a2 = row.application_form) == null ? void 0 : _a2.fullName) || null)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(((_b = row.application_form) == null ? void 0 : _b.fullName) || null), 1)
            ];
          }
        }),
        "cell-phoneNumber": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<span data-v-662de60b${_scopeId}>${ssrInterpolate(((_a2 = row.application_form) == null ? void 0 : _a2.phoneNumber) || null)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(((_b = row.application_form) == null ? void 0 : _b.phoneNumber) || null), 1)
            ];
          }
        }),
        "cell-email": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<span data-v-662de60b${_scopeId}>${ssrInterpolate(((_a2 = row.application_form) == null ? void 0 : _a2.email) || null)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(((_b = row.application_form) == null ? void 0 : _b.email) || null), 1)
            ];
          }
        }),
        "cell-actions": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="actions-container" data-v-662de60b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              onClick: ($event) => showApplication(row),
              color: "info",
              "left-icon": unref(qa),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "view application", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              loading: isLoading(row.id),
              onClick: ($event) => deleteApplication(row),
              color: "danger",
              "left-icon": unref(Kn),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "delete application", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "actions-container" }, [
                withDirectives(createVNode(_component_MazBtn, {
                  onClick: ($event) => showApplication(row),
                  color: "info",
                  "left-icon": unref(qa),
                  size: "xs"
                }, null, 8, ["onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "view application", color: "default" },
                    void 0,
                    { left: true }
                  ]
                ]),
                withDirectives(createVNode(_component_MazBtn, {
                  loading: isLoading(row.id),
                  onClick: ($event) => deleteApplication(row),
                  color: "danger",
                  "left-icon": unref(Kn),
                  size: "xs"
                }, null, 8, ["loading", "onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "delete application", color: "default" },
                    void 0,
                    { left: true }
                  ]
                ])
              ])
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="myTableHeader" data-v-662de60b${_scopeId}><h4 data-v-662de60b${_scopeId}>Applied Applications</h4></div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", null, "Applied Applications")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/vacancy/applications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const applications = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-662de60b"]]);

export { applications as default };
//# sourceMappingURL=applications-DDtfzqlU.mjs.map
