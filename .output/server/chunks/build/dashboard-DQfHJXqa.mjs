import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, d as useUtilStore, l as _imports_0, g as __nuxt_component_0$2 } from './server.mjs';
import { computed, unref, ref, watch, mergeProps, useSSRContext } from 'vue';
import { j } from './MazAvatar.CNx-fB-w-C9CQz91L.mjs';
import { storeToRefs } from 'pinia';
import { u as useAuthStore } from './user-CapvL0VR.mjs';
import { u as useBreakPoint } from './breakPoint-CvswuINl.mjs';
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

const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<nav${ssrRenderAttrs(_attrs)} data-v-27f0e780><div class="container" data-v-27f0e780><img${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-27f0e780></div></nav>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/topnav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-27f0e780"]]);
const _sfc_main$2 = {
  __name: "accordion_",
  __ssrInlineRender: true,
  props: {
    id: String,
    // will use the when creating many comps via v-for
    items: Array,
    // array of objects 
    item_ref: String,
    // since the acc items will be array of objects we need to know what is the acc item key from the passed araay of objects  
    sub_ref: String,
    // to ref the item's itemsub(Array) key if we have subitem inside the obj (wwhich creates deeply nested acc as we need)
    accordion_open: Boolean,
    head: String,
    toggler_icon: Boolean,
    // if true we will use ^ else +
    border: Boolean
    // left dide border
  },
  emits: ["accActive", "handleAccChoice"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const deep_active_acc = ref("");
    const deep_acc_id = ref(`${props.id + Math.ceil(Math.random() + Date.now())}`);
    let AccContentMaxHeight = ref(null);
    watch(() => props.accordion_open, (val) => {
      if (!val) deep_active_acc.value = "";
    });
    watch(deep_active_acc, () => {
      var _a, _b;
      AccContentMaxHeight.value = AccContentMaxHeight.value + ((_a = (void 0).querySelector(`#_${props.id} .accoordion-header+.accoordion-content`)) == null ? void 0 : _a.scrollHeight) + ((_b = (void 0).querySelector(`#_${deep_acc_id.value}.deep_acc .accoordion-header+.accoordion-content`)) == null ? void 0 : _b.scrollHeight);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "accordion-Container",
        id: `_${__props.id}`
      }, _attrs))} data-v-8f40358f><div class="accoordion-header"${ssrRenderAttr("icon", __props.toggler_icon)} data-v-8f40358f>${ssrInterpolate(__props.head)} `);
      if (__props.toggler_icon) {
        _push(`<span class="AccTogglerIcon" data-v-8f40358f>`);
        if (!__props.accordion_open) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" data-v-8f40358f><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" data-v-8f40358f></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.accordion_open) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" data-v-8f40358f><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" data-v-8f40358f></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="accoordion-content" style="${ssrRenderStyle({
        borderLeft: __props.border ? "1px solid var(--dark-red)" : "none",
        maxHeight: __props.accordion_open ? `${unref(AccContentMaxHeight)}px` : "0px",
        transition: "max-height  0.3s ease-out"
      })}" data-v-8f40358f><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<!--[-->`);
        if (!item[`${__props.sub_ref}`]) {
          _push(`<span class="accoordion-item" data-v-8f40358f>${ssrInterpolate(item[__props.item_ref])}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item[__props.sub_ref]) {
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Reusable/Accordion/accordion_.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8f40358f"]]);
const _sfc_main$1 = {
  __name: "aside",
  __ssrInlineRender: true,
  setup(__props) {
    const { sideBarOpen } = storeToRefs(useUtilStore());
    const { loggedInUser } = storeToRefs(useAuthStore());
    const { tablet, mobilePhone } = useBreakPoint();
    const active_acc = ref();
    const sideBarNavs = ref([
      {
        "role": "admin",
        "routes": [
          {
            "name": "users",
            "route_name": "users"
          }
        ]
      },
      {
        "role": "general",
        "routes": [
          {
            "name": "vacancy",
            "sub_routes": [
              {
                "name": "posted vacancies",
                "route_name": "vacancies"
              },
              {
                "name": "vacancy applications",
                "route_name": "vacancy applications"
              }
            ]
          },
          {
            "name": "blog",
            "route_name": "blogs"
          },
          {
            "name": "newsletter",
            "sub_routes": [
              {
                "name": "subscriptions",
                "route_name": "newsletterSub"
              },
              {
                "name": "letters",
                "route_name": "newsletters"
              }
            ]
          }
        ]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_MazAvatar = j;
      const _component_ReusableAccordion = __nuxt_component_1$1;
      _push(`<!--[--><div class="${ssrRenderClass([{ position: unref(tablet) || unref(mobilePhone), open: unref(sideBarOpen), close: !unref(sideBarOpen) }, "container"])}" data-v-b91d7198><div class="userContainer" data-v-b91d7198>`);
      _push(ssrRenderComponent(_component_MazAvatar, {
        src: `/users/${(_a = unref(loggedInUser)) == null ? void 0 : _a.avatar}`,
        caption: (_b = unref(loggedInUser)) == null ? void 0 : _b.userName,
        size: ".8rem",
        clickable: "",
        loading: "eager",
        onClick: ($event) => _ctx.$router.push({ name: "userProfile" })
      }, null, _parent));
      _push(`<img${ssrRenderAttr("src", "")} alt="" data-v-b91d7198><div class="user" data-v-b91d7198><span data-v-b91d7198>${ssrInterpolate((_c = unref(loggedInUser)) == null ? void 0 : _c.email)}</span><span data-v-b91d7198>${ssrInterpolate((_d = unref(loggedInUser)) == null ? void 0 : _d.userName)}</span></div></div><br data-v-b91d7198><br data-v-b91d7198><!--[-->`);
      ssrRenderList(unref(sideBarNavs), (obj, i) => {
        _push(ssrRenderComponent(_component_ReusableAccordion, {
          key: i,
          id: `${i}`,
          items: obj.routes,
          head: obj.role,
          accordion_open: unref(active_acc) === obj.role,
          border: true,
          toggler_icon: false,
          sub_ref: "sub_routes",
          item_ref: "name",
          onAccActive: ($event) => unref(active_acc) === obj.role ? active_acc.value = "" : active_acc.value = $event,
          onHandleAccChoice: ($event) => _ctx.$router.push({ name: $event.route_name })
        }, null, _parent));
      });
      _push(`<!--]--></div><span class="sideNavToggler" data-v-b91d7198><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" data-v-b91d7198><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-b91d7198></path></svg></span><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/aside.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b91d7198"]]);
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { desktop, laptop, mobilePhone, tablet } = useBreakPoint();
    const { sideBarOpen } = storeToRefs(useUtilStore());
    const expand = computed(() => {
      if ((desktop.value || laptop.value) && !sideBarOpen.value) return true;
      if (mobilePhone.value || tablet.value) return true;
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardTopnav = __nuxt_component_0;
      const _component_DashboardAside = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_DashboardTopnav, null, null, _parent));
      _push(`<div class="main" data-v-854552de>`);
      _push(ssrRenderComponent(_component_DashboardAside, null, null, _parent));
      _push(`<div class="${ssrRenderClass([{ expand: unref(expand) }, "router-view"])}" data-v-854552de>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-854552de"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-DQfHJXqa.mjs.map
