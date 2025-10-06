import { u as useResizableColumns, e as el } from './MazTableUi-DJE3g4qh.mjs';
import { P } from './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import { withAsyncContext, ref, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { format } from 'date-fns';
import { J as Jr, q as qa, f as fr, K as Kn } from './index-BKZP97f2.mjs';
import { _ as _export_sfc, e as useBlogStore, d as useUtilStore, f as frontEndErrorFeedback } from './server.mjs';
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
  __name: "blogs",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { blogPosts, page, perPage } = storeToRefs(useBlogStore());
    const { any_open_modal } = useUtilStore();
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/blog", {
        method: "get",
        headers: {
          apiref: "/api/blog/GET"
        }
      }, "$31_ld4zHNg")), __temp = await __temp, __restore(), __temp);
      blogPosts.value = (_a = data.value) == null ? void 0 : _a.data;
    } catch (error) {
      console.log(error);
    }
    const selectedIds = ref();
    const searchQuery = ref();
    const loadingIds = ref([]);
    const isLoading = (id) => loadingIds.value.includes(id);
    const deleteBlog = async (blog) => {
      if (!(blog == null ? void 0 : blog.id)) return;
      loadingIds.value.push(blog.id);
      try {
        await $fetch(`/api/blog/${blog.id}`, {
          method: "DELETE",
          headers: {
            apiref: "/api/blog/[id]/DELETE"
          }
        });
        frontEndErrorFeedback().success(" blog deleted successfully");
        blogPosts.value = blogPosts.value.filter((v) => v.id !== blog.id);
      } catch (error) {
        frontEndErrorFeedback().err(error);
      } finally {
        loadingIds.value = loadingIds.value.filter((id) => id !== blog.id);
      }
    };
    const updateBlog = (blog) => {
      any_open_modal.id = "updateBlog";
      any_open_modal.AnythingTopass = blog;
      any_open_modal.bool = true;
    };
    const openBlogPostModal = (post) => {
      any_open_modal.bool = true;
      any_open_modal.id = "blogModal";
      any_open_modal.AnythingTopass = post;
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
          { label: "Doc id", key: "id", align: "center", width: "100px", sortable: true, classes: "selection-column trancate" },
          { label: "title", key: "title", classes: "trancate" },
          { label: "category", key: "category", align: "center", classes: "trancate" },
          { label: "content", key: "content", classes: "trancate" },
          { label: "createdBy", key: "createdBy", align: "center", classes: "trancate" },
          { label: "createdAt", key: "createdAt", align: "center", classes: "trancate" },
          { label: "updatedBy", key: "createdBy", align: "center", classes: "trancate" },
          { label: "", key: "actions", align: "center", classes: "actions-column", sortable: false }
          // Added empty header for actions
        ],
        rows: unref(blogPosts)
      }, _attrs), {
        "cell-id": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="maz-text-base" data-v-f1e4eff8${_scopeId}>${ssrInterpolate(value)}</span>`);
          } else {
            return [
              createVNode("span", { class: "maz-text-base" }, toDisplayString(value), 1)
            ];
          }
        }),
        "cell-createdAt": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-f1e4eff8${_scopeId}>${ssrInterpolate(unref(format)(new Date(value), "MMM dd,yyyy"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(format)(new Date(value), "MMM dd,yyyy")), 1)
            ];
          }
        }),
        "cell-actions": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="actions-container" data-v-f1e4eff8${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              onClick: ($event) => openBlogPostModal(row),
              color: "info",
              "left-icon": unref(qa),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "view blog post", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              onClick: ($event) => updateBlog(row),
              color: "primary",
              "left-icon": unref(fr),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "update blog post", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              loading: isLoading(row.id),
              onClick: ($event) => deleteBlog(row),
              color: "danger",
              "left-icon": unref(Kn),
              size: "xs"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "delete blog post", color: "default" }, void 0, { left: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "actions-container" }, [
                withDirectives(createVNode(_component_MazBtn, {
                  onClick: ($event) => openBlogPostModal(row),
                  color: "info",
                  "left-icon": unref(qa),
                  size: "xs"
                }, null, 8, ["onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "view blog post", color: "default" },
                    void 0,
                    { left: true }
                  ]
                ]),
                withDirectives(createVNode(_component_MazBtn, {
                  onClick: ($event) => updateBlog(row),
                  color: "primary",
                  "left-icon": unref(fr),
                  size: "xs"
                }, null, 8, ["onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "update blog post", color: "default" },
                    void 0,
                    { left: true }
                  ]
                ]),
                withDirectives(createVNode(_component_MazBtn, {
                  loading: isLoading(row.id),
                  onClick: ($event) => deleteBlog(row),
                  color: "danger",
                  "left-icon": unref(Kn),
                  size: "xs"
                }, null, 8, ["loading", "onClick", "left-icon"]), [
                  [
                    _directive_tooltip,
                    { text: "delete blog post", color: "default" },
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
            _push2(`<div class="myTableHeader" data-v-f1e4eff8${_scopeId}><h4 data-v-f1e4eff8${_scopeId}>posted blogs</h4>`);
            _push2(ssrRenderComponent(_component_MazBtn, mergeProps({
              color: "primary",
              "left-icon": unref(Jr),
              size: "xs",
              onClick: ($event) => _ctx.$router.push({ name: "postBlog" })
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "Post New Blog", color: "default" }, void 0, { right: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", null, "posted blogs"),
                withDirectives(createVNode(_component_MazBtn, {
                  color: "primary",
                  "left-icon": unref(Jr),
                  size: "xs",
                  onClick: ($event) => _ctx.$router.push({ name: "postBlog" })
                }, null, 8, ["left-icon", "onClick"]), [
                  [
                    _directive_tooltip,
                    { text: "Post New Blog", color: "default" },
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/blog/blogs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blogs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f1e4eff8"]]);

export { blogs as default };
//# sourceMappingURL=blogs-D0wZVJQz.mjs.map
