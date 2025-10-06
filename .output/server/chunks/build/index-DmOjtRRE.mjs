import { u as useResizableColumns, e as el } from './MazTableUi-DJE3g4qh.mjs';
import { j } from './MazAvatar.CNx-fB-w-C9CQz91L.mjs';
import { P } from './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import { withAsyncContext, ref, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { J as Jr, f as fr, K as Kn } from './index-BKZP97f2.mjs';
import { _ as _export_sfc, f as frontEndErrorFeedback } from './server.mjs';
import { u as useFetch } from './fetch-BwaowXL0.mjs';
import { storeToRefs } from 'pinia';
import { u as useAuthStore } from './user-CapvL0VR.mjs';
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
import 'date-fns';
import 'v-dialogs';
import '@vue/shared';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { users, page, perPage } = storeToRefs(useAuthStore());
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user", {
        method: "get",
        headers: {
          apiref: "/api/user/GET"
        }
      }, "$YXWyh0xKcx")), __temp = await __temp, __restore(), __temp);
      users.value = (_a = data.value) == null ? void 0 : _a.data;
    } catch (err) {
      console.log(err);
      frontEndErrorFeedback().err(err);
    }
    const selectedIds = ref();
    const searchQuery = ref();
    const loadingIds = ref([]);
    const isLoading = (id) => loadingIds.value.includes(id);
    const deleteUser = async (user) => {
      if (!(user == null ? void 0 : user.id)) return;
      loadingIds.value.push(user.id);
      try {
        await $fetch(`/api/user/${user.id}`, {
          method: "DELETE",
          headers: {
            apiref: "/api/user/[id]/DELETE"
          }
        });
        frontEndErrorFeedback().success(" user deleted successfully");
        users.value = users.value.filter((u) => u.id !== user.id);
      } catch (error) {
        frontEndErrorFeedback().err(error);
      } finally {
        loadingIds.value = loadingIds.value.filter((id) => id !== user.id);
      }
    };
    const updateUser = (user) => {
      any_open_modal.id = "updateUser";
      any_open_modal.AnythingTopass = user;
      any_open_modal.bool = true;
    };
    const tableRef = ref(null);
    useResizableColumns(tableRef, {
      skipClasses: ["actions-column", "selection-column"],
      minWidth: 70
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MazTable = el;
      const _component_MazAvatar = j;
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
          { label: "userName", key: "userName", classes: "trancate" },
          { label: "email", key: "email", align: "center", classes: "trancate" },
          { label: "phoneNumber", key: "phoneNumber", classes: "trancate" },
          { label: "lastLoggedIn", key: "lastLoggedIn", align: "center", classes: "maz-font-bold trancate" },
          { label: "role", key: "role", align: "center", classes: "maz-font-bold trancate" },
          { label: "createdAt", key: "createdAt", align: "center", classes: "maz-font-bold trancate" },
          { label: "", key: "actions", align: "center", classes: "actions-column", sortable: false }
          // Added empty header for actions
        ],
        rows: unref(users)
      }, _attrs), {
        "cell-userName": withCtx(({ row, value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="maz-flex maz-items-center maz-gap-2" data-v-8a9df68b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MazAvatar, {
              src: `/users/${row.avatar}`,
              size: "0.5rem"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-8a9df68b${_scopeId}>${ssrInterpolate(value)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "maz-flex maz-items-center maz-gap-2" }, [
                createVNode(_component_MazAvatar, {
                  src: `/users/${row.avatar}`,
                  size: "0.5rem"
                }, null, 8, ["src"]),
                createVNode("span", null, toDisplayString(value), 1)
              ])
            ];
          }
        }),
        "cell-actions": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="actions-container" data-v-8a9df68b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              onClick: ($event) => updateUser(row),
              color: "primary",
              "left-icon": unref(fr),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "update user", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              loading: isLoading(row.id),
              onClick: ($event) => deleteUser(row),
              color: "danger",
              "left-icon": unref(Kn),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "delete user", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "actions-container" }, [
                withDirectives(createVNode(_component_MazBtn, {
                  onClick: ($event) => updateUser(row),
                  color: "primary",
                  "left-icon": unref(fr),
                  size: "xs"
                }, null, 8, ["onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "update user", color: "default" },
                    void 0,
                    { left: true }
                  ]
                ]),
                withDirectives(createVNode(_component_MazBtn, {
                  loading: isLoading(row.id),
                  onClick: ($event) => deleteUser(row),
                  color: "danger",
                  "left-icon": unref(Kn),
                  size: "xs"
                }, null, 8, ["loading", "onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "delete user", color: "default" },
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
            _push2(`<div class="myTableHeader" data-v-8a9df68b${_scopeId}><h4 data-v-8a9df68b${_scopeId}>Users</h4>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              color: "primary",
              "left-icon": unref(Jr),
              size: "xs",
              onClick: ($event) => _ctx.$router.push({ name: "createUser" })
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "create new user", color: "default" }, void 0, { right: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", null, "Users"),
                withDirectives(createVNode(_component_MazBtn, {
                  color: "primary",
                  "left-icon": unref(Jr),
                  size: "xs",
                  onClick: ($event) => _ctx.$router.push({ name: "createUser" })
                }, null, 8, ["left-icon", "onClick"]), [
                  [
                    _directive_tooltip,
                    { text: "create new user", color: "default" },
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8a9df68b"]]);

export { index as default };
//# sourceMappingURL=index-DmOjtRRE.mjs.map
