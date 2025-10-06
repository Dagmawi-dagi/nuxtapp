import { u as useResizableColumns, e as el } from './MazTableUi-DJE3g4qh.mjs';
import { P } from './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import { withAsyncContext, ref, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { format } from 'date-fns';
import { J as Jr, f as fr, K as Kn } from './index-BKZP97f2.mjs';
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
  __name: "vacancies",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { vacancies: vacancies2, page, perPage } = storeToRefs(useVacancyStore());
    const { any_open_modal } = useUtilStore();
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/vacancy", {
        method: "get",
        headers: {
          apiref: "/api/vacancy/GET"
        }
      }, "$7arUGnxQqg")), __temp = await __temp, __restore(), __temp);
      vacancies2.value = (_a = data.value) == null ? void 0 : _a.data;
    } catch (error) {
      console.log(error);
    }
    const selectedIds = ref();
    const searchQuery = ref();
    const loadingIds = ref([]);
    const isLoading = (id) => loadingIds.value.includes(id);
    const deleteVacancy = async (vacancy) => {
      if (!(vacancy == null ? void 0 : vacancy.id)) return;
      loadingIds.value.push(vacancy.id);
      try {
        await $fetch(`/api/vacancy/${vacancy.id}`, {
          method: "DELETE",
          headers: {
            apiref: "/api/vacancy/DELETE"
          }
        });
        frontEndErrorFeedback().success(" vacancy deleted successfully");
        vacancies2.value = vacancies2.value.filter((v) => v.id !== vacancy.id);
      } catch (error) {
        frontEndErrorFeedback().err(error);
      } finally {
        loadingIds.value = loadingIds.value.filter((id) => id !== vacancy.id);
      }
    };
    const updateVacancy = (vacancy) => {
      any_open_modal.id = "updateVacancy";
      any_open_modal.AnythingTopass = vacancy;
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
          { label: "Doc id", key: "id", align: "center", classes: "selection-column trancate", sortable: true },
          { label: "company", key: "company", classes: "trancate" },
          { label: "position name", key: "position_name", classes: "trancate" },
          { label: "locations", key: "locations", classes: "trancate" },
          { label: "description", key: "description", align: "center", classes: "trancate" },
          { label: "salary", key: "salary", align: "center", classes: "trancate" },
          { label: "requirements", key: "requirements", align: "center", classes: "trancate" },
          { label: "deadline", key: "deadline", align: "center", classes: "trancate" },
          { label: "createdAt", key: "createdAt", align: "center", classes: "trancate" },
          { label: "createdBy", key: "createdBy", align: "center", classes: "trancate" },
          { label: "updatedBy", key: "createdBy", align: "center", classes: "trancate" },
          { label: "", key: "actions", align: "center", classes: "actions-column", sortable: false }
          // Added empty header for actions
        ],
        rows: unref(vacancies2)
      }, _attrs), {
        "cell-createdAt": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-dcdcfc63${_scopeId}>${ssrInterpolate(unref(format)(new Date(value), "MMM dd,yyyy"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(format)(new Date(value), "MMM dd,yyyy")), 1)
            ];
          }
        }),
        "cell-deadline": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-dcdcfc63${_scopeId}>${ssrInterpolate(unref(format)(new Date(value), "MMM dd,yyyy"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(format)(new Date(value), "MMM dd,yyyy")), 1)
            ];
          }
        }),
        "cell-actions": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="actions-container" data-v-dcdcfc63${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              onClick: ($event) => updateVacancy(row),
              color: "primary",
              "left-icon": unref(fr),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "update vacancy", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              loading: isLoading(row.id),
              onClick: ($event) => deleteVacancy(row),
              color: "danger",
              "left-icon": unref(Kn),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "delete vacancy", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "actions-container" }, [
                withDirectives(createVNode(_component_MazBtn, {
                  onClick: ($event) => updateVacancy(row),
                  color: "primary",
                  "left-icon": unref(fr),
                  size: "xs"
                }, null, 8, ["onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "update vacancy", color: "default" },
                    void 0,
                    { left: true }
                  ]
                ]),
                withDirectives(createVNode(_component_MazBtn, {
                  loading: isLoading(row.id),
                  onClick: ($event) => deleteVacancy(row),
                  color: "danger",
                  "left-icon": unref(Kn),
                  size: "xs"
                }, null, 8, ["loading", "onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "delete vacancy", color: "default" },
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
            _push2(`<div class="myTableHeader" data-v-dcdcfc63${_scopeId}><h4 data-v-dcdcfc63${_scopeId}>posted vacancies</h4>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              color: "primary",
              "left-icon": unref(Jr),
              size: "xs",
              onClick: ($event) => _ctx.$router.push({ name: "vacancyPost" })
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "Post New Vacancy", color: "default" }, void 0, { right: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", null, "posted vacancies"),
                withDirectives(createVNode(_component_MazBtn, {
                  color: "primary",
                  "left-icon": unref(Jr),
                  size: "xs",
                  onClick: ($event) => _ctx.$router.push({ name: "vacancyPost" })
                }, null, 8, ["left-icon", "onClick"]), [
                  [
                    _directive_tooltip,
                    { text: "Post New Vacancy", color: "default" },
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/vacancy/vacancies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vacancies = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dcdcfc63"]]);

export { vacancies as default };
//# sourceMappingURL=vacancies-DmHEUwKS.mjs.map
