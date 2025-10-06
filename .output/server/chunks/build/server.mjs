import { defineComponent, ref, shallowRef, getCurrentInstance, provide, cloneVNode, createElementBlock, hasInjectionContext, createVNode, Fragment, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount, Teleport, Transition, h, defineAsyncComponent, inject, unref, shallowReactive, Suspense, createApp, isVNode, withModifiers, toRef, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, effectScope, isReadonly, isRef, isShallow, isReactive, toRaw, mergeProps, resolveComponent, withCtx, getCurrentScope, createBlock, createCommentVNode, openBlock, createTextVNode, renderList, toDisplayString, useSlots, render, withKeys, createElementVNode, withDirectives, normalizeClass, vShow, useSSRContext } from 'vue';
import { e as createError$1, o as hasProtocol, p as isScriptProtocol, q as joinURL, d as destr, r as klona, v as withQuery, x as sanitizeStatusCode, y as parse, z as getRequestHeader, A as isEqual, B as getContext, f as setCookie, C as getCookie, D as deleteCookie, $ as $fetch$1, F as createHooks, G as executeAsync, H as toRouteMatcher, I as createRouter$1, J as defu } from '../_/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { defineStore, storeToRefs, createPinia, setActivePinia, shouldHydrate } from 'pinia';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { format } from 'date-fns';
import { DialogMessage, DialogToast } from 'v-dialogs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.17.4";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
const definePayloadPlugin = defineNuxtPlugin;
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const payloadPlugin = definePayloadPlugin(() => {
  definePayloadReducer(
    "skipHydrate",
    // We need to return something truthy to be treated as a match
    (data) => !shouldHydrate(data) && 1
  );
});
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const __nuxt_page_meta$o = {
  layout: "default",
  name: "blog"
};
const __nuxt_page_meta$n = {
  layout: "default",
  name: "home"
};
const __nuxt_page_meta$m = {
  layout: "default",
  name: "orderForm"
};
const __nuxt_page_meta$l = {
  layout: "default",
  name: "aboutUs"
};
const __nuxt_page_meta$k = {
  layout: "default",
  name: "Gallery"
};
const __nuxt_page_meta$j = {
  layout: "default",
  name: "404 page not found"
};
const __nuxt_page_meta$i = {
  layout: "default",
  name: "contactUs"
};
const __nuxt_page_meta$h = {
  layout: "clean",
  name: "Unsub"
};
const __nuxt_page_meta$g = {
  layout: "default",
  name: "sellingPrice"
};
const __nuxt_page_meta$f = {
  layout: "default",
  nav: false,
  footer: false,
  name: "ageVerification"
};
const __nuxt_page_meta$e = {
  layout: "default",
  name: "confirmSub"
};
const __nuxt_page_meta$d = {
  layout: "dashboard",
  name: "dashboard"
};
const __nuxt_page_meta$c = {
  layout: "clean",
  name: "auth"
};
const __nuxt_page_meta$b = {
  layout: "dashboard",
  name: "blogs"
};
const __nuxt_page_meta$a = {
  layout: "dashboard",
  name: "users"
};
const __nuxt_page_meta$9 = {
  layout: "dashboard",
  name: "userProfile"
};
const __nuxt_page_meta$8 = {
  layout: "dashboard",
  name: "postBlog"
};
const __nuxt_page_meta$7 = {
  layout: "dashboard",
  name: "newsletterSub"
};
const __nuxt_page_meta$6 = {
  layout: "dashboard",
  name: "createUser"
};
const __nuxt_page_meta$5 = {
  layout: "dashboard",
  name: "vacancies"
};
const __nuxt_page_meta$4 = {
  layout: "dashboard",
  name: "vacancyPost"
};
const __nuxt_page_meta$3 = {
  layout: "dashboard",
  name: "vacancy applications"
};
const __nuxt_page_meta$2 = {
  layout: "dashboard",
  name: "newsletters"
};
const __nuxt_page_meta$1 = {
  layout: "dashboard",
  name: "sendNewsletter"
};
const __nuxt_page_meta = {
  layout: "dashboard",
  name: "AddNewNewsletterSub"
};
const _routes = [
  {
    name: "blog",
    path: "/blog",
    meta: __nuxt_page_meta$o || {},
    component: () => import('./blog-BQ7lKCfW.mjs')
  },
  {
    name: "home",
    path: "/",
    meta: __nuxt_page_meta$n || {},
    component: () => import('./index-DgBhdfiC.mjs')
  },
  {
    name: "orderForm",
    path: "/order",
    meta: __nuxt_page_meta$m || {},
    component: () => import('./order-Bx11RacR.mjs')
  },
  {
    name: "aboutUs",
    path: "/aboutUs",
    meta: __nuxt_page_meta$l || {},
    component: () => import('./aboutUs-Bj5eoltw.mjs')
  },
  {
    name: "Gallery",
    path: "/Gallery",
    meta: __nuxt_page_meta$k || {},
    component: () => import('./Gallery-cR12yTKh.mjs')
  },
  {
    name: "vacancy",
    path: "/vacancy",
    component: () => import('./vacancy-rv_7XP5x.mjs')
  },
  {
    name: "404 page not found",
    path: "/:slug(.*)*",
    meta: __nuxt_page_meta$j || {},
    component: () => import('./_...slug_-C5yb33Q4.mjs')
  },
  {
    name: "contactUs",
    path: "/contactUs",
    meta: __nuxt_page_meta$i || {},
    component: () => import('./contactUs-uZNVbOuT.mjs')
  },
  {
    name: "Unsub",
    path: "/unsub/:id()",
    meta: __nuxt_page_meta$h || {},
    component: () => import('./_id_-C3jhVArD.mjs')
  },
  {
    name: "sellingPrice",
    path: "/sellingPrice",
    meta: __nuxt_page_meta$g || {},
    component: () => import('./sellingPrice-nz67abi4.mjs')
  },
  {
    name: "ageVerification",
    path: "/ageVerification",
    meta: __nuxt_page_meta$f || {},
    component: () => import('./ageVerification-jXQczzGi.mjs')
  },
  {
    name: "confirmSub",
    path: "/confirmSub/:id()",
    meta: __nuxt_page_meta$e || {},
    component: () => import('./_id_-DNt3RE6k.mjs')
  },
  {
    name: "dashboard",
    path: "/dashboard",
    meta: { ...__nuxt_page_meta$d || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-BUBfp6lC.mjs')
  },
  {
    name: "auth",
    path: "/dashboard/auth",
    meta: { ...__nuxt_page_meta$c || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-D1OXT84R.mjs')
  },
  {
    name: "blogs",
    path: "/dashboard/blog/blogs",
    meta: { ...__nuxt_page_meta$b || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./blogs-D0wZVJQz.mjs')
  },
  {
    name: "users",
    path: "/dashboard/user",
    meta: { ...__nuxt_page_meta$a || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DmOjtRRE.mjs')
  },
  {
    name: "userProfile",
    path: "/dashboard/user/profile",
    meta: { ...__nuxt_page_meta$9 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./profile-aL465hzv.mjs').then(function(n) {
      return n.p;
    })
  },
  {
    name: "postBlog",
    path: "/dashboard/blog/postBlog",
    meta: { ...__nuxt_page_meta$8 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./postBlog-C5A_zfkM.mjs')
  },
  {
    name: "newsletterSub",
    path: "/dashboard/newsletter/sub",
    meta: { ...__nuxt_page_meta$7 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./sub-k494tw0q.mjs')
  },
  {
    name: "createUser",
    path: "/dashboard/user/createUser",
    meta: { ...__nuxt_page_meta$6 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./createUser-1hPD4pS7.mjs')
  },
  {
    name: "vacancies",
    path: "/dashboard/vacancy/vacancies",
    meta: { ...__nuxt_page_meta$5 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./vacancies-DmHEUwKS.mjs')
  },
  {
    name: "vacancyPost",
    path: "/dashboard/vacancy/vacancyPost",
    meta: { ...__nuxt_page_meta$4 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./vacancyPost-BtYngzJb.mjs')
  },
  {
    name: "vacancy applications",
    path: "/dashboard/vacancy/applications",
    meta: { ...__nuxt_page_meta$3 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./applications-DDtfzqlU.mjs')
  },
  {
    name: "newsletters",
    path: "/dashboard/newsletter/newsletters",
    meta: { ...__nuxt_page_meta$2 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./newsletters-Ds-VEUj1.mjs')
  },
  {
    name: "sendNewsletter",
    path: "/dashboard/newsletter/sendNewsletter",
    meta: { ...__nuxt_page_meta$1 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./sendNewsletter-XFcmolTI.mjs')
  },
  {
    name: "AddNewNewsletterSub",
    path: "/dashboard/newsletter/AddNewNewsletterSub",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./AddNewNewsletterSub-CADBOf-l.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => {
    var _a;
    return (_a = children.default) == null ? void 0 : _a.call(children);
  } };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    let position = savedPosition || void 0;
    if (!position && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, "instant", position));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, "instant", position)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, scrollBehaviorType, position) {
  if (position) {
    return position;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: scrollBehaviorType
    };
  }
  return { left: 0, top: 0, behavior: scrollBehaviorType };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ?? (opts.filter = (key) => key === name);
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const route_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie("ageVerifiedDate");
  const ageVerifiedDate = Number(cookie.value || 0);
  if (!ageVerifiedDate && to.name !== "ageVerification") return navigateTo("/ageVerification");
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  route_45global,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-Vkj_5s23.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0$2 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      var _a;
      if (mounted.value) {
        const vnodes = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = toRaw(pinia.state.value);
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
var $t = Object.defineProperty;
var Vt = (s, e, t) => e in s ? $t(s, e, { enumerable: true, configurable: true, writable: true, value: t }) : s[e] = t;
var c = (s, e, t) => Vt(s, typeof e != "symbol" ? e + "" : e, t);
function mt(s, e, t) {
  const n = {
    maxAttempts: 20,
    interval: 100,
    ...t
  };
  let o = 0;
  function i() {
    const r = s();
    r != null ? n.expectedValue !== void 0 && r !== n.expectedValue ? o < n.maxAttempts ? (o++, setTimeout(i, n.interval)) : console.warn(n.errorMessage || `[maz-ui](checkAvailability) Nothing found after ${n.maxAttempts} attempts for ref ${r}`) : e(r) : o < n.maxAttempts ? (o++, setTimeout(i, n.interval)) : console.warn(n.errorMessage || `[maz-ui](checkAvailability) Nothing found or expected value after ${n.maxAttempts} attempts for ref ${r}`);
  }
  i();
}
ref("system");
ref("system");
const De = "__maz-click-outside__";
function Lt() {
  return (void 0).ontouchstart === null ? "touchstart" : "click";
}
async function kt(s, e) {
  try {
    Ct(s);
    const t = e.instance, n = e.value, o = typeof n == "function";
    if (!o)
      throw new Error("[maz-ui](vClickOutside) the callback should be a function");
    await nextTick(), s[De] = (r) => {
      if ((!s || r.target && !s.contains(r.target)) && n && o)
        return n.call(t, r);
    };
    const i = Lt();
    (void 0).addEventListener(i, s[De], { passive: true });
  } catch (t) {
    console.error("[maz-ui](vClickOutside)", t);
  }
}
function Ct(s) {
  try {
    const e = Lt();
    (void 0).removeEventListener(e, s[De], false), delete s[De];
  } catch (e) {
    console.error("[maz-ui](vClickOutside)", e);
  }
}
function Ss(s, e) {
  try {
    if (e.value === e.oldValue)
      return;
    kt(s, e);
  } catch (t) {
    console.error("[maz-ui](vClickOutside)", t);
  }
}
const xs = {
  mounted: kt,
  updated: Ss,
  unmounted: Ct
}, Os = {
  install: (s) => {
    s.directive("click-outside", xs);
  }
};
const Ue = {
  position: "top"
};
class St {
  constructor(e = {}) {
    c(this, "options");
    this.options = {
      ...Ue,
      ...e
    };
  }
  getPosition({ modifiers: e, value: t }) {
    return e.top ? "top" : e.bottom ? "bottom" : e.left ? "left" : e.right ? "right" : typeof t == "string" ? "top" : t.position ?? this.options.position;
  }
  getText({ value: e }) {
    return typeof e == "string" ? e : e.text;
  }
  getOpen({ value: e }) {
    return typeof e == "string" ? false : e.open ?? false;
  }
  getColor({ value: e }) {
    return typeof e == "string" ? "default" : e.color ?? "default";
  }
  getOffset({ value: e }) {
    return typeof e == "string" ? "1rem" : e.offset ?? "1rem";
  }
  create(e, t) {
    e.setAttribute("data-tooltip", this.getText(t));
    const n = this.getOffset(t);
    n && e.style.setProperty("--tooltip-offset", n), e.classList.add("m-tooltip");
    const o = this.getPosition(t);
    e.classList.add(`m-tooltip--${o}`), e.classList.add(`m-tooltip--${this.getColor(t)}`), this.getOpen(t) && e.classList.add("m-tooltip--open");
  }
  update(e, t) {
    this.remove(e, t), this.create(e, t);
  }
  remove(e, t) {
    e.removeAttribute("data-tooltip"), e.classList.remove("m-tooltip"), e.classList.remove("m-tooltip--top"), e.classList.remove("m-tooltip--bottom"), e.classList.remove("m-tooltip--left"), e.classList.remove("m-tooltip--right"), e.classList.remove("m-tooltip--open"), e.classList.remove(`m-tooltip--${this.getColor(t)}`);
  }
}
const Vs = {
  install: (s, e = Ue) => {
    const t = {
      ...Ue,
      ...e
    }, n = new St(t);
    s.directive("tooltip", {
      beforeMount: n.create.bind(n),
      updated: n.update.bind(n),
      unmounted: n.remove.bind(n)
    });
  }
};
function Ke(s, e) {
  let t = e == null ? void 0 : e.element;
  function n() {
    t && render(null, t);
  }
  const o = { ...e == null ? void 0 : e.props, ...e != null && e.addDestroyInProps ? { destroy: n } : {} }, i = createVNode(
    s,
    o,
    e == null ? void 0 : e.children
  );
  return e != null && e.app ? (i.appContext = e.app._context, t ? render(i, t) : "undefined" < "u") : (t = t ?? (void 0).body, render(i, t)), { vNode: i, destroy: n, el: t };
}
function Bs(s) {
  return new Promise((e) => setTimeout(e, s));
}
const Ns = ["onKeypress"], Fs = { class: "m-fullscreen-img-scroller" }, js = ["src", "alt"], qs = /* @__PURE__ */ defineComponent({
  __name: "MazFullscreenImg",
  props: {
    src: {},
    clickedElementBounds: { default: void 0 },
    offset: { default: void 0 },
    animation: { default: () => ({
      duration: 300,
      easing: "ease-in-out"
    }) },
    openInstanceClass: { default: "m-fullscreen-img-instance" },
    clickedElement: {},
    destroy: { type: Function, default: void 0 },
    alt: { default: void 0 },
    zoom: { type: Boolean, default: true }
  },
  emits: ["close", "previous", "next", "before-close"],
  setup(s, { emit: e }) {
    const t = s, n = e, o = defineAsyncComponent(() => import('./MazSpinner.Cx7mdOJ3-CJ_o-Ntp.mjs')), i = defineAsyncComponent(() => import('./x-mark.CnZwVvA7-AquCq2i_.mjs')), r = defineAsyncComponent(() => import('./chevron-left.BqVOLRdC-CFOBPROT.mjs')), a = ref(false), l = ref(false), u = ref(false), y = ref(false), T2 = ref(false), w2 = reactive({
      running: false,
      ended: false
    }), f2 = ref(t.clickedElement), k2 = computed(() => t.clickedElement.getBoundingClientRect()), z = ref(), m2 = ref(t.src), d = ref(t.alt), C2 = ref(), p = ref(), S2 = ref(true), D2 = computed(() => ({
      "--is-zoomed": T2.value,
      "--invisible": S2.value,
      "--absolute": !T2.value
    }));
    function L2() {
      var g2, E2;
      p.value && (z.value = ((g2 = p.value) == null ? void 0 : g2.naturalWidth) > ((E2 = p.value) == null ? void 0 : E2.naturalHeight)), a.value = true, l.value = false, u.value = true;
    }
    watch(
      u,
      (g2) => {
        g2 && x();
      },
      { immediate: true }
    );
    function P() {
      n("before-close"), M2();
    }
    function j2(g2) {
      g2.key === "Escape" && (g2.preventDefault(), P()), (g2.key === "ArrowLeft" || g2.key === "ArrowRight") && (g2.preventDefault(), fe(g2.key === "ArrowRight" ? "next" : "previous"));
    }
    function ne() {
      (void 0).documentElement.classList.add("--m-fullscreen-open");
    }
    function Q() {
      (void 0).documentElement.classList.remove("--m-fullscreen-open");
    }
    function de() {
      return [...(void 0).querySelectorAll(".m-fullscreen-img-instance")];
    }
    function $e(g2, E2) {
      return E2 < 0 ? g2.length - 1 : E2 >= g2.length ? 0 : E2;
    }
    function me(g2, E2) {
      g2.classList.remove(t.openInstanceClass), E2.classList.add(t.openInstanceClass);
      const I2 = E2.getAttribute("data-src"), $2 = E2.getAttribute("data-alt");
      d.value = $2, m2.value = I2 ?? m2.value;
    }
    function fe(g2) {
      S2.value = true;
      const E2 = (void 0).querySelector(
        `.m-fullscreen-img-instance.${t.openInstanceClass}`
      );
      if (E2) {
        const I2 = de(), $2 = I2.indexOf(E2), _2 = g2 === "next" ? $2 + 1 : $2 - 1, K = I2[$e(I2, _2)];
        f2.value = K, K && me(E2, K), n(g2), a.value = false, l.value = true, mt(() => a.value === true, () => {
          S2.value = false, T2.value ? he() : v();
        }, {
          expectedValue: true,
          interval: 100,
          maxAttempts: 50
        });
      }
    }
    function he() {
      const g2 = p.value;
      if (!g2) {
        console.error("[maz-ui](vFullscreenImg) ImgElement is not defined");
        return;
      }
      g2.style.removeProperty("max-width"), g2.style.removeProperty("max-height"), g2 == null || g2.style.removeProperty("top"), g2 == null || g2.style.removeProperty("left"), z.value ? (g2.style.height = "100vh", g2.style.removeProperty("width")) : (g2.style.width = "100vw", g2.style.removeProperty("height"));
    }
    function Ve() {
      T2.value ? (T2.value = !T2.value, v()) : (T2.value = !T2.value, he());
    }
    function oe(g2) {
      var I2;
      w2.running = true, S2.value = false;
      const E2 = (I2 = p.value) == null ? void 0 : I2.animate(g2, {
        duration: t.animation.duration,
        easing: t.animation.easing
      });
      if (!E2) {
        console.error("[maz-ui](vFullscreenImg) animation is not defined"), w2.running = false, w2.ended = true;
        return;
      }
      return E2;
    }
    function ke(g2 = t.offset ?? 0) {
      const E2 = f2.value.clientWidth || 1, I2 = f2.value.clientHeight || 1, $2 = (void 0).innerWidth, _2 = (void 0).innerHeight, K = Math.min(
        ($2 - 2 * g2) / E2,
        (_2 - 2 * g2) / I2
      ), He = ($2 - E2 * K) / 2, Be = (_2 - I2 * K) / 2;
      return {
        centerX: He,
        centerY: Be,
        width: E2,
        height: I2,
        scale: K
      };
    }
    function Ce({ trigger: g2 }) {
      const { width: E2, height: I2, scale: $2, centerX: _2, centerY: K } = ke(), { top: He, left: Be, width: Pt, height: Mt } = k2.value, Ye = [
        {
          top: `${He}px`,
          left: `${Be}px`,
          width: `${Pt}px`,
          height: `${Mt}px`,
          opacity: 0
        },
        {
          top: `${K}px`,
          left: `${_2}px`,
          width: `${E2 * $2}px`,
          height: `${I2 * $2}px`,
          opacity: 1
        }
      ];
      return {
        frames: g2 === "open" ? Ye : Ye.reverse()
      };
    }
    function v() {
      const { height: g2, width: E2, scale: I2 } = ke(), $2 = z.value ? {
        width: `${E2 * I2}px`,
        maxHeight: `${g2 * I2}px`
      } : {
        height: `${g2 * I2}px`,
        maxWidth: `${E2 * I2}px`
      };
      if (!p.value) {
        console.error("[maz-ui](vFullscreenImg) ImgElement is not defined");
        return;
      }
      z.value ? (p.value.style.removeProperty("height"), p.value.style.removeProperty("maxHeight")) : (p.value.style.removeProperty("width"), p.value.style.removeProperty("maxWidth")), Object.assign(p.value.style, $2);
    }
    function x() {
      const { frames: g2 } = Ce({
        trigger: "open"
      }), E2 = oe(g2);
      if (!E2) {
        console.error("[maz-ui](vFullscreenImg) open animation is not defined"), v();
        return;
      }
      E2.onfinish = () => {
        v(), w2.running = false, w2.ended = true;
      };
    }
    function M2() {
      const { frames: g2 } = Ce({
        trigger: "close"
      }), E2 = oe(g2);
      function I2() {
        var $2, _2;
        n("close"), ($2 = C2.value) == null || $2.remove(), (_2 = t.destroy) == null || _2.call(t), w2.running = false, w2.ended = true;
      }
      if (!E2) {
        console.error("[maz-ui](vFullscreenImg) close animation is not defined"), I2();
        return;
      }
      E2.onfinish = I2;
    }
    function ve() {
      T2.value || v();
    }
    return onMounted(() => {
      l.value = true, (void 0).addEventListener("keydown", j2), (void 0).addEventListener("resize", ve), ne(), y.value = de().length > 1;
    }), onBeforeUnmount(() => {
      (void 0).removeEventListener("keydown", j2), (void 0).removeEventListener("resize", ve), Q();
    }), (g2, E2) => (openBlock(), createElementBlock("div", {
      ref_key: "FullscreenImgElement",
      ref: C2,
      role: "button",
      class: "m-fullscreen-img m-reset-css",
      tabindex: "0",
      onClick: withModifiers(P, ["stop"]),
      onKeypress: withKeys(withModifiers(P, ["prevent"]), ["esc"])
    }, [
      u.value && y.value ? (openBlock(), createElementBlock("button", {
        key: 0,
        type: "button",
        class: "m-fullscreen-btn --next",
        onClick: E2[0] || (E2[0] = withModifiers((I2) => fe("next"), ["stop"]))
      }, [
        createVNode(unref(r), { class: "maz-rotate-180" })
      ])) : createCommentVNode("v-if", true),
      u.value && y.value ? (openBlock(), createElementBlock("button", {
        key: 1,
        type: "button",
        class: "m-fullscreen-btn --previous",
        onClick: E2[1] || (E2[1] = withModifiers((I2) => fe("previous"), ["stop"]))
      }, [
        createVNode(unref(r))
      ])) : createCommentVNode("v-if", true),
      createElementVNode("button", {
        type: "button",
        class: "m-fullscreen-btn --close",
        onClick: P
      }, [
        createVNode(unref(i))
      ]),
      createElementVNode("div", Fs, [
        createElementVNode("img", {
          ref_key: "ImgElement",
          ref: p,
          src: m2.value,
          alt: d.value ?? void 0,
          tabindex: "0",
          class: normalizeClass([D2.value]),
          onLoad: L2,
          onClick: E2[2] || (E2[2] = withModifiers((I2) => g2.zoom && Ve(), ["stop"]))
        }, null, 42, js),
        withDirectives(createVNode(
          unref(o),
          { class: "m-fullscreen-img-loader" },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vShow, l.value]
        ])
      ])
    ], 40, Ns));
  }
}), Me = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, o] of e)
    t[n] = o;
  return t;
}, Us = /* @__PURE__ */ Me(qs, [["__scopeId", "data-v-24a18baf"]]), tt = "m-fullscreen-is-open";
class Ws {
  constructor() {
    c(this, "options");
    c(this, "defaultOptions", {
      scaleOnHover: false,
      blurOnHover: false,
      disabled: false,
      zoom: true,
      offset: 80,
      animation: {
        duration: 300,
        easing: "ease-in-out"
      }
    });
    c(this, "mouseEnterListener");
    c(this, "mouseLeaveListener");
    c(this, "renderPreviewListener");
  }
  buildOptions(e, t) {
    const n = typeof t.value == "object" ? t.value : { src: t.value, alt: void 0 }, o = (n == null ? void 0 : n.src) ?? this.getImgSrc(e), i = (n == null ? void 0 : n.alt) ?? this.getImgAlt(e);
    return {
      ...this.defaultOptions,
      ...n,
      src: o,
      alt: i
    };
  }
  get allInstances() {
    return [...(void 0).querySelectorAll(".m-fullscreen-img-instance")];
  }
  getImgSrc(e) {
    var n;
    const t = ((n = this.options) == null ? void 0 : n.src) || e.getAttribute("src") || e.getAttribute("data-src");
    if (!t)
      throw new Error(
        '[maz-ui](fullscreen-img) src of image must be provided by `v-fullscreen=""`, `v-fullscreen="{ src: "" }"`, `src=""` or `data-src=""` atributes'
      );
    return t;
  }
  getImgAlt(e) {
    var t;
    return ((t = this.options) == null ? void 0 : t.alt) || e.getAttribute("alt") || e.getAttribute("data-alt");
  }
  create(e, t) {
    if (this.options = this.buildOptions(e, t), this.options.disabled)
      return;
    e.style.cursor = "move", (this.options.scaleOnHover || this.options.blurOnHover) && (e.style.transition = "all 200ms ease-in-out"), e.classList.add("m-fullscreen-img-instance"), e.setAttribute("data-src", this.getImgSrc(e));
    const n = this.getImgAlt(e);
    n && e.setAttribute("data-alt", n), this.mouseEnterListener = () => this.mouseEnter(e), this.mouseLeaveListener = () => this.mouseLeave(e), this.renderPreviewListener = () => this.renderPreview(e), e.addEventListener("mouseenter", this.mouseEnterListener), e.addEventListener("mouseleave", this.mouseLeaveListener), e.addEventListener("click", this.renderPreviewListener);
  }
  update(e, t) {
    this.options = this.buildOptions(e, t);
  }
  remove(e) {
    e.removeEventListener("mouseenter", this.mouseEnterListener), e.removeEventListener("mouseleave", this.mouseLeaveListener), e.removeEventListener("click", this.renderPreviewListener), e.classList.remove("m-fullscreen-img-instance"), e.style.cursor = "";
  }
  renderPreview(e) {
    return e.classList.add(tt), Ke(Us, {
      props: {
        ...this.options,
        openInstanceClass: tt,
        clickedElement: e,
        clickedElementBounds: e.getBoundingClientRect()
      },
      addDestroyInProps: true
    });
  }
  mouseLeave(e) {
    this.options.scaleOnHover && (e.style.transform = ""), this.options.blurOnHover && (e.style.filter = ""), e.style.zIndex = "";
  }
  mouseEnter(e) {
    e.style.zIndex = "1", this.options.scaleOnHover && (e.style.transform = "scale(1.04)"), this.options.blurOnHover && (e.style.filter = "blur(3px)");
  }
}
let Se;
const Rs = {
  mounted(s, e) {
    return Se = new Ws(), Se.create(s, e);
  },
  updated(s, e) {
    return Se.update(s, e);
  },
  unmounted(s) {
    return Se.remove(s);
  }
}, _s = {
  install(s) {
    s.directive("fullscreen-img", Rs);
  }
}, Ks = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", We = {
  baseClass: "m-lazy-img",
  loadedClass: "m-lazy-loaded",
  loadingClass: "m-lazy-loading",
  errorClass: "m-lazy-error",
  noPhotoClass: "m-lazy-no-photo",
  noPhoto: false,
  observerOnce: true,
  loadOnce: false,
  noUseErrorPhoto: false,
  observerOptions: {
    threshold: 0.1
  }
};
class xt {
  constructor(e = {}) {
    c(this, "observers", []);
    c(this, "defaultOptions", We);
    c(this, "options");
    c(this, "onImgLoadedCallback");
    c(this, "onImgErrorCallback");
    c(this, "hasImgLoaded", false);
    this.options = this.buildOptions(e), this.onImgLoadedCallback = this.imageIsLoaded.bind(this), this.onImgErrorCallback = this.imageHasError.bind(this);
  }
  async loadErrorPhoto() {
    const { default: e } = await import('./no-photography.BJX8HSus-BJX8HSus.mjs');
    return e;
  }
  buildOptions(e) {
    return {
      ...this.defaultOptions,
      ...e,
      observerOptions: {
        ...this.defaultOptions.observerOptions,
        ...e.observerOptions
      }
    };
  }
  removeClass(e, t) {
    e.classList.remove(t);
  }
  addClass(e, t) {
    e.classList.add(t);
  }
  removeAllStateClasses(e) {
    this.removeClass(e, this.options.loadedClass), this.removeClass(e, this.options.loadingClass), this.removeClass(e, this.options.errorClass), this.removeClass(e, this.options.noPhotoClass);
  }
  setBaseClass(e) {
    this.addClass(e, this.options.baseClass);
  }
  imageIsLoading(e) {
    var t, n;
    this.addClass(e, this.options.loadingClass), (n = (t = this.options).onLoading) == null || n.call(t, e);
  }
  imageHasNoPhoto(e) {
    this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.noPhotoClass), this.setDefaultPhoto(e);
  }
  imageIsLoaded(e) {
    var t, n;
    this.hasImgLoaded = true, this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.loadedClass), (n = (t = this.options).onLoaded) == null || n.call(t, e);
  }
  imageHasError(e) {
    var t, n;
    this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.errorClass), (n = (t = this.options).onError) == null || n.call(t, e), this.setDefaultPhoto(e);
  }
  getSrc(e) {
    return typeof e.value == "object" ? e.value.src : e.value;
  }
  getImageUrl(e, t) {
    const n = this.getImgElement(e).getAttribute("data-lazy-src");
    return n || this.getSrc(t);
  }
  async setPictureSourceUrls(e) {
    const t = e.querySelectorAll("source");
    if (t.length > 0)
      for await (const n of t) {
        const o = n.getAttribute("data-lazy-srcset");
        if (o)
          n.srcset = o;
        else
          return this.imageHasError(e);
      }
    else
      this.imageHasError(e);
  }
  hasBgImgMode(e) {
    return e.arg === "bg-image";
  }
  isPictureElement(e) {
    return e instanceof HTMLPictureElement;
  }
  getImgElement(e) {
    return this.isPictureElement(e) ? e.querySelector("img") : e;
  }
  async setDefaultPhoto(e) {
    if (this.options.noUseErrorPhoto)
      return;
    const t = this.options.fallbackSrc ?? this.options.errorPhoto;
    typeof t == "string" && this.addClass(e, this.options.noPhotoClass);
    const n = t ?? await this.loadErrorPhoto(), o = e.querySelectorAll("source");
    if (o.length > 0)
      for await (const i of o)
        i.srcset = n;
    else
      this.setImgSrc(e, n);
  }
  addEventListenerToImg(e) {
    const t = this.getImgElement(e);
    t.addEventListener("load", () => this.onImgLoadedCallback(e), {
      once: true
    }), t.addEventListener("error", (n) => this.onImgErrorCallback(e, n), { once: true });
  }
  async loadImage(e, t) {
    if (this.imageIsLoading(e), this.isPictureElement(e))
      this.addEventListenerToImg(e), await this.setPictureSourceUrls(e);
    else {
      const n = this.getImageUrl(e, t);
      if (!n)
        return this.imageHasError(e);
      this.hasBgImgMode(t) ? (e.style.backgroundImage = `url('${n}')`, this.imageIsLoaded(e)) : (this.addEventListenerToImg(e), this.setImgSrc(e, n));
    }
  }
  setImgSrc(e, t) {
    const n = this.getImgElement(e);
    n.src = t;
  }
  handleIntersectionObserver(e, t, n, o) {
    var i, r;
    this.observers.push(o);
    for (const a of n)
      if (a.isIntersecting) {
        if ((r = (i = this.options).onIntersecting) == null || r.call(i, a.target), this.options.observerOnce && o.unobserve(e), this.options.loadOnce && this.hasImgLoaded)
          return;
        this.loadImage(e, t);
      }
  }
  createObserver(e, t) {
    const n = (r, a) => {
      this.handleIntersectionObserver(e, t, r, a);
    }, o = this.options.observerOptions;
    new IntersectionObserver(n, o).observe(e);
  }
  async imageHandler(e, t, n) {
    if (n === "update")
      for await (const o of this.observers) o.unobserve(e);
    (void 0).IntersectionObserver ? this.createObserver(e, t) : this.loadImage(e, t);
  }
  async bindUpdateHandler(e, t, n) {
    if (this.options.noPhoto)
      return this.imageHasNoPhoto(e);
    await this.imageHandler(e, t, n);
  }
  async add(e, t) {
    if (this.hasBgImgMode(t) && this.isPictureElement(e))
      throw new Error(`[MazLazyImg] You can't use the "bg-image" mode with "<picture />" element`);
    setTimeout(() => this.setBaseClass(e), 0), e.getAttribute("src") || this.setImgSrc(e, Ks), await this.bindUpdateHandler(e, t, "bind");
  }
  async update(e, t) {
    t.value !== t.oldValue && (this.hasImgLoaded = false, this.removeAllStateClasses(e), await this.bindUpdateHandler(e, t, "update"));
  }
  remove(e, t) {
    this.hasImgLoaded = false, this.hasBgImgMode(t) && (e.style.backgroundImage = ""), this.removeAllStateClasses(e);
    for (const n of this.observers)
      n.unobserve(e);
    this.observers = [];
  }
}
const Ys = {
  install(s, e = {}) {
    const t = {
      ...We,
      ...e,
      observerOptions: {
        ...We.observerOptions,
        ...e.observerOptions
      }
    }, n = new xt(t);
    s.directive("lazy-img", {
      created: n.add.bind(n),
      updated: n.update.bind(n),
      unmounted: n.remove.bind(n)
    });
  }
}, Zs = `
.maz-zoom-img {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  z-index: 1050;
  background-color: hsla(238, 15%, 40%, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.maz-zoom-img,
.maz-zoom-img * {
  box-sizing: border-box;
}

.maz-zoom-img .maz-zoom-img__wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  min-height: 0;
  max-width: 100%;
  max-height: 100%;
  transition: all 300ms ease-in-out;
  opacity: 0;
  transform: scale(0.5);
}

.maz-zoom-img.maz-animate .maz-zoom-img__wrapper {
  opacity: 1;
  transform: scale(1);
}

.maz-zoom-img.maz-animate .maz-zoom-img__loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsla(238, 15%, 40%, 0.7);
  border-radius: 1rem;
  z-index: 2;
  min-width: 60px;
  min-height: 60px;
}
.maz-zoom-img.maz-animate .maz-zoom-img__loader[hidden] {
  display: none;
}

@-webkit-keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.maz-zoom-img.maz-animate .maz-zoom-img__loader__svg {
  animation: spin .6s linear infinite;
}

.maz-zoom-img img {
  max-width: 100%;
  max-height: 100%;
  min-width: 0;
  border-radius: 1rem;
}

.maz-zoom-img .maz-zoom-btn {
  margin: 0 auto;
  border: none;
  background-color: hsla(0, 0%, 7%, 0.5);
  box-shadow: 0 0 0.5rem 0 hsla(0, 0%, 0%, 0.2);
  height: 2.2rem;
  min-height: 2.2rem;
  width: 2.2rem;
  min-width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.2rem;
  cursor: pointer;
  flex: 0 0 auto;
  outline: none;
}

.maz-zoom-img .maz-zoom-btn svg {
  fill: white;
}

.maz-zoom-img .maz-zoom-btn.maz-zoom-btn--close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}

.maz-zoom-img .maz-zoom-btn.maz-zoom-btn--previous {
  position: absolute;
  left: 0.5rem;
  z-index: 1;
}

.maz-zoom-img .maz-zoom-btn.maz-zoom-btn--next {
  position: absolute;
  right: 0.5rem;
  z-index: 1;
}

.maz-zoom-img .maz-zoom-btn:hover {
  background-color: hsl(0, 0%, 0%);
}`, st = {
  close: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  next: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
  previous: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  spinner: '<svg width="40px" height="40px" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" x="0px" y="0px" viewBox="0 0 50 50" xml:space="preserve" class="maz-zoom-img__loader__svg" data-v-6d1cb50c=""><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"></path></svg>'
};
class Xs {
  constructor(e) {
    c(this, "options");
    c(this, "loader");
    c(this, "wrapper");
    c(this, "img");
    c(this, "keydownHandler");
    c(this, "onImgLoadedCallback");
    c(this, "buttonsAdded");
    c(this, "defaultOptions", {
      scale: true,
      blur: true,
      disabled: false
    });
    c(this, "mouseEnterListener");
    c(this, "mouseLeaveListener");
    c(this, "renderPreviewListener");
    if (!e.value)
      throw new Error(
        '[MazUI](zoom-img) Image path must be defined. Ex: `v-zoom-img="<PATH_TO_IMAGE>"`'
      );
    if (typeof e.value == "object" && !e.value.src)
      throw new Error("[maz-ui](zoom-img) src of image must be provided");
    this.buttonsAdded = false, this.options = this.buildOptions(e), this.keydownHandler = this.keydownLister.bind(this), this.loader = this.getLoader(), this.wrapper = (void 0).createElement("div"), this.wrapper.classList.add("maz-zoom-img__wrapper"), this.wrapper.prepend(this.loader), this.img = (void 0).createElement("img"), this.onImgLoadedCallback = this.onImgLoaded.bind(this), this.imgEventHandler(true);
  }
  buildOptions(e) {
    return {
      ...this.defaultOptions,
      ...typeof e.value == "object" ? e.value : { src: e.value }
    };
  }
  get allInstances() {
    return [...(void 0).querySelectorAll(".maz-zoom-img-instance")];
  }
  create(e) {
    this.options.disabled || (e.style.cursor = "pointer", setTimeout(() => e.classList.add("maz-zoom-img-instance")), e.setAttribute("data-zoom-src", this.options.src), this.options.alt && e.setAttribute("data-zoom-alt", this.options.alt), e.style.transition = "all 300ms ease-in-out", this.mouseEnterListener = () => this.mouseEnter(e), this.mouseLeaveListener = () => this.mouseLeave(e), this.renderPreviewListener = () => this.renderPreview(e, this.options), e.addEventListener("mouseenter", this.mouseEnterListener), e.addEventListener("mouseleave", this.mouseLeaveListener), e.addEventListener("click", this.renderPreviewListener));
  }
  update(e) {
    this.options = this.buildOptions(e);
  }
  remove(e) {
    this.imgEventHandler(false), e.removeEventListener("mouseenter", this.mouseEnterListener), e.removeEventListener("mouseleave", this.mouseLeaveListener), e.removeEventListener("click", this.renderPreviewListener), e.classList.remove("maz-zoom-img-instance"), e.removeAttribute("data-zoom-src"), e.removeAttribute("data-zoom-alt"), e.style.cursor = "";
  }
  renderPreview(e, t) {
    e.classList.add(
      "maz-is-open"
      /* OPEN */
    ), this.addStyle(Zs);
    const n = (void 0).createElement("div");
    n.classList.add("maz-zoom-img"), n.setAttribute("id", "MazImgPreviewFullsize"), n.addEventListener("click", (o) => {
      n.isEqualNode(o.target) && this.closePreview();
    }), typeof t == "object" && (this.img.setAttribute("src", t.src), t.alt && this.img.setAttribute("alt", t.alt), this.img.id = "MazImgElement"), this.wrapper.append(this.img), n.append(this.wrapper), (void 0).body.append(n), this.keyboardEventHandler(true), setTimeout(() => {
      n && n.classList.add("maz-animate");
    }, 100);
  }
  onImgLoaded() {
    this.wrapper.style.width = `${this.img.width}px`, this.wrapper.style.minWidth = "200px", this.loader.hidden = true;
    const e = this.getButton(), t = [], n = this.allInstances.length > 1;
    if (!this.buttonsAdded) {
      if (this.buttonsAdded = true, n) {
        const o = this.getButton("previous"), i = this.getButton("next");
        t.push(o, i);
      }
      this.wrapper.append(e), n && (this.wrapper.prepend(t[0]), this.wrapper.append(t[1]));
    }
  }
  getLoader() {
    const e = (void 0).createElement("div");
    return e.classList.add("maz-zoom-img__loader"), e.innerHTML = st.spinner, e;
  }
  mouseLeave(e) {
    this.options.scale && (e.style.transform = ""), this.options.blur && (e.style.filter = ""), e.style.zIndex = "";
  }
  mouseEnter(e) {
    e.style.zIndex = "1", this.options.scale && (e.style.transform = "scale(1.1)"), this.options.blur && (e.style.filter = "blur(2px)");
  }
  keydownLister(e) {
    e.preventDefault(), (e.key === "Escape" || e.key === " ") && this.closePreview(), (e.key === "ArrowLeft" || e.key === "ArrowRight") && this.nextPreviousImage(e.key === "ArrowRight");
  }
  getButton(e = "close") {
    const t = (void 0).createElement("button");
    t.innerHTML = st[e];
    const n = () => e === "close" ? this.closePreview() : this.allInstances ? this.nextPreviousImage(e === "next") : null;
    return t.addEventListener("click", () => {
      n();
    }), t.classList.add("maz-zoom-btn"), t.classList.add(`maz-zoom-btn--${e}`), t;
  }
  closePreview() {
    const e = (void 0).querySelector("#MazImgPreviewFullsize"), t = (void 0).querySelector("#MazPreviewStyle"), n = (void 0).querySelector(
      ".maz-zoom-img-instance.maz-is-open"
    );
    n && n.classList.remove(
      "maz-is-open"
      /* OPEN */
    ), e && e.classList.remove("maz-animate"), this.keyboardEventHandler(false), setTimeout(() => {
      e && e.remove(), t && t.remove();
    }, 300);
  }
  getNewInstanceIndex(e) {
    let t = e;
    return t < 0 ? t = this.allInstances.length - 1 : t >= this.allInstances.length && (t = 0), t;
  }
  nextPreviousImage(e) {
    const t = e, n = (void 0).querySelector(
      ".maz-zoom-img-instance.maz-is-open"
    );
    if (n) {
      const o = this.allInstances.indexOf(n), i = t ? o + 1 : o - 1, r = this.allInstances[this.getNewInstanceIndex(i)];
      r && this.useNextInstance(n, r);
    }
  }
  useNextInstance(e, t) {
    e.classList.remove(
      "maz-is-open"
      /* OPEN */
    ), t.classList.add(
      "maz-is-open"
      /* OPEN */
    );
    const n = t.getAttribute("data-zoom-src"), o = t.getAttribute("data-zoom-alt");
    this.wrapper.style.width = "", this.loader.hidden = false, n && this.img.setAttribute("src", n), o && this.img.setAttribute("alt", o);
  }
  addStyle(e) {
    const t = (void 0).createElement("style");
    t.id = "MazPreviewStyle", t.textContent = e, (void 0).head.append(t);
  }
  keyboardEventHandler(e) {
    if (e)
      return (void 0).addEventListener("keydown", this.keydownHandler);
    (void 0).removeEventListener("keydown", this.keydownHandler);
  }
  imgEventHandler(e) {
    if (e)
      return this.img.addEventListener("load", this.onImgLoadedCallback);
    this.img.removeEventListener("load", this.onImgLoadedCallback);
  }
}
let Oe;
const Gs = {
  created(s, e) {
    Oe = new Xs(e), Oe.create(s);
  },
  updated(s, e) {
    Oe.update(e);
  },
  unmounted(s) {
    Oe.remove(s);
  }
}, Qs = {
  install(s) {
    s.directive("zoom-img", Gs);
  }
};
const je = {
  delay: 100,
  observer: {
    root: void 0,
    rootMargin: "0px",
    threshold: 0.2
  },
  animation: {
    once: true,
    duration: 300,
    delay: 0
  }
};
class dn {
  constructor(e) {
    c(this, "options");
    this.options = {
      delay: (e == null ? void 0 : e.delay) ?? je.delay,
      observer: {
        ...je.observer,
        ...e == null ? void 0 : e.observer
      },
      animation: {
        ...je.animation,
        ...e == null ? void 0 : e.animation
      }
    };
  }
  // eslint-disable-next-line sonarjs/cognitive-complexity
  handleIntersect(e, t) {
    for (const n of e) {
      const i = n.target.getAttribute("data-maz-aos-children") === "true", r = n.target.getAttribute("data-maz-aos") ? [n.target] : [];
      if (i) {
        const a = [...(void 0).querySelectorAll("[data-maz-aos-anchor]")].map(
          (l) => l.getAttribute("data-maz-aos-anchor") === `#${n.target.id}` ? l : void 0
        );
        for (const l of a)
          l && r.push(l);
      }
      for (const a of r) {
        const l = a.getAttribute("data-maz-aos-once"), u = typeof l == "string" ? l === "true" : this.options.animation.once;
        if (typeof this.options.observer.threshold == "number" && n.intersectionRatio > this.options.observer.threshold) {
          const y = a.getAttribute("data-maz-aos-duration"), T2 = a.getAttribute("data-maz-aos-delay");
          if (y || (a.style.transitionDuration = `${this.options.animation.duration}ms`, setTimeout(() => {
            a.style.transitionDuration = "0";
          }, 1e3)), T2 || (a.style.transitionDelay = `${this.options.animation.delay}ms`, setTimeout(() => {
            a.style.transitionDelay = "0";
          }, 1e3)), a.classList.add("maz-aos-animate"), u) {
            const w2 = a.getAttribute("data-maz-aos-anchor");
            if (w2) {
              const f2 = (void 0).querySelector(w2);
              f2 && t.unobserve(f2);
            }
            t.unobserve(a);
          }
        } else
          a.classList.remove("maz-aos-animate");
      }
    }
  }
  async handleObserver() {
    await Bs(this.options.delay);
    const e = new IntersectionObserver(this.handleIntersect.bind(this), this.options.observer);
    for (const t of (void 0).querySelectorAll("[data-maz-aos]")) {
      const n = t.getAttribute("data-maz-aos-anchor");
      if (n) {
        const o = (void 0).querySelector(n);
        o ? (o.setAttribute("data-maz-aos-children", "true"), e.observe(o)) : console.warn(`[maz-ui](aos) no element found with selector "${n}"`);
      } else
        e.observe(t);
    }
  }
  runAnimations() {
    console.warn("[MazAos](runAnimations) should be executed on client side");
  }
}
let pe;
const ho = {
  install: (s, e) => {
    pe = new dn(e), s.provide("aos", pe);
  }
};
const ie = {
  cancelText: "Cancel",
  confirmText: "Confirm",
  cancelButton: {
    text: "Cancel",
    color: "danger"
  },
  confirmButton: {
    text: "Confirm",
    color: "success"
  }
};
ref(ie);
ref([]);
const ae = "";
function $n(s) {
  return s.filter((e, t, n) => t === n.indexOf(e));
}
function Vn(s) {
  return (e = ae) => typeof e == "function" ? s.findIndex((...t) => e(...t)) > -1 : s.includes(e);
}
const Hn = (s) => s.length > 0;
function Bn(s) {
  return (e = ae) => $n([...s, e]);
}
function Nn(s) {
  return (e = ae) => s.filter((t) => t !== e);
}
class Fn {
  constructor() {
    c(this, "_loaders", ref([]));
  }
  get loaders() {
    return computed(() => this._loaders.value);
  }
  stop(e = ae) {
    this._loaders.value = Nn(this._loaders.value)(e);
  }
  start(e = ae) {
    return this._loaders.value = Bn(this._loaders.value)(e), () => this.stop(e);
  }
  get anyLoading() {
    return computed(() => Hn(this._loaders.value));
  }
  isLoading(e = ae) {
    return computed(() => Vn(this._loaders.value)(e)).value;
  }
}
new Fn();
const wait_qbEBPhRO3Z08AJRhAS1nyzNq61MRWjY1h6Xo2WQpmFU = /* @__PURE__ */ defineNuxtPlugin(() => {
  const waitServer = {
    loaders: { value: [] },
    anyLoading: { value: false },
    isLoading: () => false,
    stop: () => {
    },
    start: () => {
    }
  };
  return {
    provide: {
      wait: waitServer
    }
  };
});
const dialog_fC5b4oxB_q9VCnlJOZq9DzG2YrUdGFmiPdIQAFWU9qA = /* @__PURE__ */ defineNuxtPlugin(({ vueApp, $config }) => {
  var _a;
  (_a = $config.public.mazUi) == null ? void 0 : _a.injectUseDialog;
  const toasterServer = {
    open: () => {
      return {
        promise: Promise.resolve(),
        destroy: () => {
        },
        close: () => {
        }
      };
    }
  };
  return {
    provide: {
      dialog: toasterServer
    }
  };
});
const toaster_4qzmmIBU_gDY_6b_hZHRXhVBpHMZleFpp2wvTu7lUho = /* @__PURE__ */ defineNuxtPlugin(({ vueApp, $config }) => {
  var _a;
  (_a = $config.public.mazUi) == null ? void 0 : _a.injectUseToast;
  const toasterServer = {
    show: () => {
    },
    success: () => {
    },
    error: () => {
    },
    warning: () => {
    },
    info: () => {
    },
    message: () => {
    }
  };
  return {
    provide: {
      toast: toasterServer
    }
  };
});
const v_tooltip_Buo9lA6nqfCcVYhu2NpOqMCOzlcXoYWtD5lCqujsPqY = /* @__PURE__ */ defineNuxtPlugin(({ vueApp, $config }) => {
  var _a;
  const installVTooltip = (_a = $config.public.mazUi) == null ? void 0 : _a.installVTooltip;
  const options = typeof installVTooltip === "object" ? installVTooltip : void 0;
  vueApp.use(Vs, options);
});
const v_fullscreen_img_HzJbMkzrcb1PwrUjz_rYtteP4vhPFE3dZnESgLdY24M = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(_s);
});
const v_click_outside_wyM72ME2BVOLoE9VfEf1KqnBYSQ5O8i70SyZX5MWccE = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Os);
});
const v_lazy_img_ij81URjWUC78c4C2rwc8Vs1sx4Rs9JkruY2UUfp8h4s = /* @__PURE__ */ defineNuxtPlugin(({ vueApp, $config }) => {
  var _a;
  const vLazyImgOptions = (_a = $config.public.mazUi) == null ? void 0 : _a.installVLazyImg;
  const options = typeof vLazyImgOptions === "object" ? vLazyImgOptions : void 0;
  vueApp.use(Ys, options);
});
const v_zoom_img_e4yn42wufN0rgriLo9w__bTrrAm7oEfCTbkD_cu4S9U = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Qs);
});
const aos_sOOu4OOthDlSRdoPFZwn9X7FS1QmTkzT3SvTTLqQtNI = /* @__PURE__ */ defineNuxtPlugin(({ $config, vueApp }) => {
  var _a;
  const aosOptions = (_a = $config.public.mazUi) == null ? void 0 : _a.injectAos;
  const options = typeof aosOptions === "object" ? { ...aosOptions, router: aosOptions.router ? useRouter() : void 0 } : {};
  vueApp.use(ho, options);
  return {
    provide: {
      aos: new dn(options)
    }
  };
});
const vueformPlugin_So1L8xODeblEvZf8pu_e4GIOmsIkauRYPHBLGgZfGmk = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
});
function m(e2, t2) {
  void 0 === t2 && (t2 = {});
  t2.insertAt;
}
m();
m();
m();
m();
m();
m();
const g = "vel", f = defineComponent({ name: "SvgIcon", props: { type: { type: String, default: "" } }, setup: (e2) => () => createVNode("svg", { class: `${g}-icon icon`, "aria-hidden": "true" }, [createVNode("use", { "xlink:href": `#icon-${e2.type}` }, null)]) }), w = () => {
};
const k = (e2) => {
  e2.preventDefault();
}, _ = Object.prototype.toString, D = (e2) => (t2) => _.call(t2).slice(8, -1) === e2;
const M = (e2) => !!e2 && D("Object")(e2), S = (e2) => !!e2 && D("String")(e2);
function L(e2) {
  return null != e2;
}
const C = defineComponent({ name: "Toolbar", props: { zoomIn: { type: Function, default: w }, zoomOut: { type: Function, default: w }, rotateLeft: { type: Function, default: w }, rotateRight: { type: Function, default: w }, resize: { type: Function, default: w }, rotateDisabled: { type: Boolean, default: false }, zoomDisabled: { type: Boolean, default: false } }, setup: (e2) => () => createVNode("div", { class: `${g}-toolbar` }, [!e2.zoomDisabled && createVNode(Fragment, null, [createVNode("div", { role: "button", "aria-label": "zoom in button", class: "toolbar-btn toolbar-btn__zoomin", onClick: e2.zoomIn }, [createVNode(f, { type: "zoomin" }, null)]), createVNode("div", { role: "button", "aria-label": "zoom out button", class: "toolbar-btn toolbar-btn__zoomout", onClick: e2.zoomOut }, [createVNode(f, { type: "zoomout" }, null)])]), createVNode("div", { role: "button", "aria-label": "resize image button", class: "toolbar-btn toolbar-btn__resize", onClick: e2.resize }, [createVNode(f, { type: "resize" }, null)]), !e2.rotateDisabled && createVNode(Fragment, null, [createVNode("div", { role: "button", "aria-label": "image rotate left button", class: "toolbar-btn toolbar-btn__rotate", onClick: e2.rotateLeft }, [createVNode(f, { type: "rotate-left" }, null)]), createVNode("div", { role: "button", "aria-label": "image rotate right button", class: "toolbar-btn toolbar-btn__rotate", onClick: e2.rotateRight }, [createVNode(f, { type: "rotate-right" }, null)])])]) }), Y = () => createVNode("div", { class: `${g}-loading` }, [createVNode("div", { class: "ring" }, null)]), B = () => createVNode("div", { class: `${g}-on-error` }, [createVNode("div", { class: "ring" }, null), createVNode(f, { type: "img-broken" }, null)]), X = (e2, o2) => {
  let { slots: l2 } = o2;
  return createVNode("div", { class: `${g}-img-title` }, [l2.default ? l2.default() : ""]);
}, E = defineComponent({ name: "DefaultIcons", setup: () => () => createVNode("svg", { "aria-hidden": true, style: "position: absolute; width: 0; height: 0; overflow: hidden; visibility: hidden;" }, [createVNode("symbol", { id: "icon-rotate-right", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M275.199914 450.496179v20.031994c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399a120.255962 120.255962 0 0 1-72.991978-24.895992c-21.503993-15.839995-35.359989-38.751988-41.567987-68.735979h60.831981c9.247997 23.007993 27.167992 34.495989 53.759983 34.49599 37.535988-0.384 56.863982-21.407993 57.983982-63.071981v-38.751988c-28.095991 8.863997-54.303983 13.119996-78.623975 12.735996a91.263971 91.263971 0 0 1-68.447979-27.711991c-18.847994-18.303994-28.095991-47.231985-27.711991-86.847973z m62.55998 24.863992c7.103998 24.799992 25.215992 37.343988 54.271983 37.663989 27.103992-0.288 44.703986-11.327996 52.831984-33.11999 3.135999-8.383997 2.655999-29.599991-1.28-38.559988-8.607997-19.615994-25.791992-29.695991-51.551984-30.20799-28.383991 0.576-46.303986 12.639996-53.759983 36.159988a58.719982 58.719982 0 0 0-0.512 28.063991z m390.335878 115.711964v-116.895963c-1.12-41.311987-20.447994-62.335981-57.983981-63.07198-37.727988 0.768-56.959982 21.791993-57.695982 63.07198v116.895963c0.768 41.663987 19.999994 62.68798 57.695982 63.071981 37.535988-0.384 56.863982-21.407993 57.983981-63.071981z m-174.815945 3.391999v-123.935961c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399-31.10399-0.384-57.887982-10.751997-80.319975-31.10399-23.935993-20.543994-36.127989-49.791984-36.479989-87.679973z m282.559912-479.07185A509.887841 509.887841 0 0 0 511.99984 0.00032C229.215928 0.00032 0 229.216248 0 512.00016s229.215928 511.99984 511.99984 511.99984 511.99984-229.215928 511.99984-511.99984c0-3.743999-0.032-7.455998-0.128-11.167997-1.631999-11.295996-8.159997-27.103992-31.87199-27.103991-27.487991 0-31.67999 21.247993-32.03199 32.06399l0.032 4.127999a30.62399 30.62399 0 0 0 0.16 2.079999H959.9997c0 247.423923-200.575937 447.99986-447.99986 447.99986S63.99998 759.424083 63.99998 512.00016 264.575917 64.0003 511.99984 64.0003a446.079861 446.079861 0 0 1 277.439913 96.22397l-94.91197 91.679971c-25.439992 24.607992-17.439995 44.991986 17.887994 45.599986l188.031942 3.295999a64.31998 64.31998 0 0 0 65.055979-62.84798l3.295999-188.127942C969.407697 15.040315 949.311703 5.792318 923.871711 30.368311l-87.999972 85.023973z", fill: "" }, null)]), createVNode("symbol", { id: "icon-rotate-left", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M275.199914 450.496179v20.031994c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399a120.255962 120.255962 0 0 1-72.991978-24.895992c-21.503993-15.839995-35.359989-38.751988-41.567987-68.735979h60.831981c9.247997 23.007993 27.167992 34.495989 53.759983 34.49599 37.535988-0.384 56.863982-21.407993 57.983982-63.071981v-38.751988c-28.095991 8.863997-54.303983 13.119996-78.623975 12.735996a91.263971 91.263971 0 0 1-68.447979-27.711991c-18.847994-18.303994-28.095991-47.231985-27.711991-86.847973z m62.55998 24.863992c7.103998 24.799992 25.215992 37.343988 54.271983 37.663989 27.103992-0.288 44.703986-11.327996 52.831984-33.11999 3.135999-8.383997 2.655999-29.599991-1.28-38.559988-8.607997-19.615994-25.791992-29.695991-51.551984-30.20799-28.383991 0.576-46.303986 12.639996-53.759983 36.159988a58.719982 58.719982 0 0 0-0.512 28.063991z m390.335878 115.711964v-116.895963c-1.12-41.311987-20.447994-62.335981-57.983981-63.07198-37.727988 0.768-56.959982 21.791993-57.695982 63.07198v116.895963c0.768 41.663987 19.999994 62.68798 57.695982 63.071981 37.535988-0.384 56.863982-21.407993 57.983981-63.071981z m-174.815945 3.391999v-123.935961c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399-31.10399-0.384-57.887982-10.751997-80.319975-31.10399-23.935993-20.543994-36.127989-49.791984-36.479989-87.679973zM188.159941 115.392284A509.887841 509.887841 0 0 1 511.99984 0.00032c282.783912 0 511.99984 229.215928 511.99984 511.99984s-229.215928 511.99984-511.99984 511.99984S0 794.784072 0 512.00016c0-3.743999 0.032-7.455998 0.128-11.167997 1.631999-11.295996 8.159997-27.103992 31.87199-27.103991 27.487991 0 31.67999 21.247993 32.03199 32.06399L63.99998 509.920161a30.62399 30.62399 0 0 1-0.16 2.079999H63.99998c0 247.423923 200.575937 447.99986 447.99986 447.99986s447.99986-200.575937 447.99986-447.99986S759.423763 64.0003 511.99984 64.0003a446.079861 446.079861 0 0 0-277.439913 96.22397l94.91197 91.679971c25.439992 24.607992 17.439995 44.991986-17.887994 45.599986L123.551961 300.800226a64.31998 64.31998 0 0 1-65.055979-62.84798l-3.295999-188.127942C54.591983 15.040315 74.687977 5.792318 100.127969 30.368311l87.999972 85.023973z", fill: "" }, null)]), createVNode("symbol", { id: "icon-resize", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M456.036919 791.8108 270.553461 791.8108 460.818829 601.572038l-39.593763-39.567157L231.314785 751.915162l0.873903-183.953615c0-15.465227-12.515035-27.981285-27.981285-27.981285s-27.981285 12.515035-27.981285 27.981285l0 251.829516c0 8.3072 3.415796 14.975063 8.826016 19.564591 5.082762 5.192256 12.132318 8.416693 19.947308 8.416693l251.036453 0c15.46625 0 27.981285-12.514012 27.981285-27.981285C484.018204 804.325835 471.504192 791.8108 456.036919 791.8108zM838.945819 184.644347c-5.082762-5.191232-12.132318-8.416693-19.947308-8.416693L567.961034 176.227654c-15.46625 0-27.981285 12.515035-27.981285 27.981285 0 15.46625 12.514012 27.981285 27.981285 27.981285l185.483458 0L563.206754 422.427962l39.567157 39.567157 189.910281-189.910281-0.873903 183.953615c0 15.46625 12.514012 27.981285 27.981285 27.981285s27.981285-12.514012 27.981285-27.981285L847.772858 204.208938C847.771835 195.902762 844.356039 189.234899 838.945819 184.644347zM847.771835 64.303538 176.227142 64.303538c-61.809741 0-111.924115 50.115398-111.924115 111.924115l0 671.544693c0 61.809741 50.114374 111.924115 111.924115 111.924115l671.544693 0c61.809741 0 111.924115-50.114374 111.924115-111.924115l0-671.544693C959.69595 114.418936 909.581576 64.303538 847.771835 64.303538zM903.733381 847.772346c0 30.878265-25.056676 55.962569-55.962569 55.962569L176.227142 903.734916c-30.90487 0-55.962569-25.084305-55.962569-55.962569l0-671.544693c0-30.9325 25.056676-55.962569 55.962569-55.962569l671.544693 0c30.90487 0 55.962569 25.03007 55.962569 55.962569L903.734404 847.772346z" }, null)]), createVNode("symbol", { id: "icon-img-broken", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m0 682.666667H213.333333v-195.413334l42.24 42.24 170.666667-170.666666 170.666667 170.666666 170.666666-170.24L810.666667 530.346667V810.666667z m0-401.493334l-43.093334-43.093333-170.666666 171.093333-170.666667-170.666666-170.666667 170.666666-42.24-42.666666V213.333333h597.333334v195.84z" }, null)]), createVNode("symbol", { id: "icon-prev", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M784.652701 955.6957 346.601985 517.644983c-2.822492-2.822492-2.822492-7.902977 0-11.289967l439.179713-439.179713c6.77398-6.77398 10.725469-16.370452 10.725469-25.966924L796.507166 36.692393c0-20.32194-16.370452-36.692393-36.692393-36.692393l-4.515987 0c-9.596472 0-19.192944 3.951488-25.966924 10.725469L250.072767 489.420066c-12.418964 12.418964-12.418964 32.740904 0 45.159868l477.565601 477.565601c7.338479 7.338479 17.499449 11.854465 28.224917 11.854465l0 0c22.015436 0 40.079383-18.063947 40.079383-40.079383l0 0C796.507166 973.759647 791.99118 963.598677 784.652701 955.6957z" }, null)]), createVNode("symbol", { id: "icon-next", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M246.121279 955.6957l438.050717-438.050717c2.822492-2.822492 2.822492-7.902977 0-11.289967L244.992282 67.175303c-6.77398-6.77398-10.725469-16.370452-10.725469-25.966924L234.266814 36.692393C234.266814 16.370452 250.637266 0 270.959206 0l4.515987 0c9.596472 0 19.192944 3.951488 25.966924 10.725469l478.694598 478.694598c12.418964 12.418964 12.418964 32.740904 0 45.159868l-477.565601 477.565601c-7.338479 7.338479-17.499449 11.854465-28.224917 11.854465l0 0c-22.015436 0-40.079383-18.063947-40.079383-40.079383l0 0C234.266814 973.759647 238.7828 963.598677 246.121279 955.6957z" }, null)]), createVNode("symbol", { id: "icon-zoomin", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M725.504 652.864c46.4-61.44 71.744-136.448 71.744-218.752C797.248 230.464 632.768 64 430.656 64S64 230.464 64 434.112C64 639.36 228.48 805.76 430.656 805.76c86.656 0 164.48-30.144 227.52-81.088L889.984 960 960 891.264l-234.496-238.4z m-294.848 67.456c-155.776 0-282.624-128.896-282.624-286.208s126.848-286.208 282.624-286.208 282.624 128.896 282.624 286.208-126.912 286.208-282.624 286.208z" }, null), createVNode("path", { d: "M235.712 369.92h390.72v127.104H235.712z" }, null), createVNode("path", { d: "M367.488 238.144h127.104v390.72H367.488z" }, null)]), createVNode("symbol", { id: "icon-close", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M570.24 512l259.2 259.2-58.88 58.24L512 570.24l-261.12 261.12-58.24-58.24L453.76 512 194.56 252.8l58.24-58.24L512 453.76l261.12-261.12 58.24 58.24z" }, null)]), createVNode("symbol", { id: "icon-zoomout", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M725.504 652.864c46.4-61.44 71.744-136.448 71.744-218.752C797.248 230.464 632.768 64 430.656 64S64 230.464 64 434.112C64 639.36 228.48 805.76 430.656 805.76c86.656 0 164.48-30.144 227.52-81.088L889.984 960 960 891.264l-234.496-238.4z m-294.848 67.456c-155.776 0-282.624-128.896-282.624-286.208s126.848-286.208 282.624-286.208 282.624 128.896 282.624 286.208-126.912 286.208-282.624 286.208z" }, null), createVNode("path", { d: "M235.712 369.92h390.72v127.104H235.712z" }, null)])]) }), T = global;
let $ = Date.now();
function I(e2) {
  const t2 = Date.now(), o2 = Math.max(0, 16 - (t2 - $)), l2 = setTimeout(e2, o2);
  return $ = t2 + o2, l2;
}
function O(e2) {
  return (T.requestAnimationFrame || I).call(T, e2);
}
function R(e2) {
  (T.cancelAnimationFrame || T.clearTimeout).call(T, e2);
}
function A(e2, t2) {
  const o2 = e2.clientX - t2.clientX, l2 = e2.clientY - t2.clientY;
  return Math.sqrt(o2 * o2 + l2 * l2);
}
function j(e2) {
  return "function" == typeof e2 || "[object Object]" === Object.prototype.toString.call(e2) && !isVNode(e2);
}
var H = defineComponent({ name: "VueEasyLightbox", props: { imgs: { type: [Array, String], default: () => "" }, visible: { type: Boolean, default: false }, index: { type: Number, default: 0 }, scrollDisabled: { type: Boolean, default: true }, escDisabled: { type: Boolean, default: false }, moveDisabled: { type: Boolean, default: false }, titleDisabled: { type: Boolean, default: false }, maskClosable: { type: Boolean, default: true }, teleport: { type: [String, Object], default: null }, swipeTolerance: { type: Number, default: 50 }, loop: { type: Boolean, default: false }, rtl: { type: Boolean, default: false }, zoomScale: { type: Number, default: 0.12 }, maxZoom: { type: Number, default: 3 }, minZoom: { type: Number, default: 0.1 }, rotateDisabled: { type: Boolean, default: false }, zoomDisabled: { type: Boolean, default: false }, pinchDisabled: { type: Boolean, default: false }, dblclickDisabled: { type: Boolean, default: false } }, emits: { hide: () => true, "on-error": (e2) => true, "on-prev": (e2, t2) => true, "on-next": (e2, t2) => true, "on-prev-click": (e2, t2) => true, "on-next-click": (e2, t2) => true, "on-index-change": (e2, t2) => true, "on-rotate": (e2) => true }, setup(e2, o2) {
  let { emit: p2, slots: v2 } = o2;
  const { imgRef: m2, imgState: h2, setImgSize: w2 } = (() => {
    const e3 = ref(), t2 = reactive({ width: 0, height: 0, maxScale: 1 });
    return { imgRef: e3, imgState: t2, setImgSize: () => {
      if (e3.value) {
        const { width: o3, height: l2, naturalWidth: n2 } = e3.value;
        t2.maxScale = n2 / o3, t2.width = o3, t2.height = l2;
      }
    } };
  })(), x2 = ref(e2.index);
  ref("");
  const T2 = reactive({ scale: 1, lastScale: 1, rotateDeg: 0, top: 0, left: 0, initX: 0, initY: 0, lastX: 0, lastY: 0, touches: [] }), $2 = reactive({ loadError: false, loading: false, dragging: false, gesturing: false, wheeling: false }), I2 = computed(() => {
    return t2 = e2.imgs, D("Array")(t2) ? e2.imgs.map((e3) => "string" == typeof e3 ? { src: e3 } : function(e4) {
      return M(e4) && S(e4.src);
    }(e3) ? e3 : void 0).filter(L) : S(e2.imgs) ? [{ src: e2.imgs }] : [];
    var t2;
  }), H2 = computed(() => I2.value[x2.value]), F2 = computed(() => {
    var _a;
    return (_a = I2.value[x2.value]) == null ? void 0 : _a.src;
  }), N2 = computed(() => {
    var _a;
    return (_a = I2.value[x2.value]) == null ? void 0 : _a.title;
  }), P = computed(() => {
    var _a;
    return (_a = I2.value[x2.value]) == null ? void 0 : _a.alt;
  }), V = computed(() => ({ cursor: $2.loadError ? "default" : e2.moveDisabled ? $2.dragging ? "grabbing" : "grab" : "move", top: `calc(50% + ${T2.top}px)`, left: `calc(50% + ${T2.left}px)`, transition: $2.dragging || $2.gesturing ? "none" : "", transform: `translate(-50%, -50%) scale(${T2.scale}) rotate(${T2.rotateDeg}deg)` })), Z = () => {
    p2("hide");
  }, q = () => {
    T2.scale = 1, T2.lastScale = 1, T2.rotateDeg = 0, T2.top = 0, T2.left = 0, $2.loadError = false, $2.dragging = false, $2.loading = true;
  }, U = (t2, o3) => {
    const l2 = x2.value;
    q(), x2.value = t2, I2.value[x2.value] === I2.value[t2] && nextTick(() => {
      $2.loading = false;
    }), e2.visible && l2 !== t2 && (o3 && o3(l2, t2), p2("on-index-change", l2, t2));
  }, W = () => {
    const t2 = x2.value, o3 = e2.loop ? (t2 + 1) % I2.value.length : t2 + 1;
    !e2.loop && o3 > I2.value.length - 1 || U(o3, (e3, t3) => {
      p2("on-next", e3, t3), p2("on-next-click", e3, t3);
    });
  }, G = () => {
    const t2 = x2.value;
    let o3 = t2 - 1;
    if (0 === t2) {
      if (!e2.loop) return;
      o3 = I2.value.length - 1;
    }
    U(o3, (e3, t3) => {
      p2("on-prev", e3, t3), p2("on-prev-click", e3, t3);
    });
  }, J = (e3) => {
    Math.abs(1 - e3) < 0.05 ? e3 = 1 : Math.abs(h2.maxScale - e3) < 0.05 && (e3 = h2.maxScale), T2.lastScale = T2.scale, T2.scale = e3;
  }, K = () => {
    const t2 = T2.scale + e2.zoomScale;
    t2 < h2.maxScale * e2.maxZoom && J(t2);
  }, Q = () => {
    const t2 = T2.scale - e2.zoomScale;
    t2 > e2.minZoom && J(t2);
  }, ee = () => {
    const e3 = T2.rotateDeg % 360;
    p2("on-rotate", Math.abs(e3 < 0 ? e3 + 360 : e3));
  }, te = () => {
    T2.rotateDeg -= 90, ee();
  }, oe = () => {
    T2.rotateDeg += 90, ee();
  }, le = () => {
    T2.scale = 1, T2.top = 0, T2.left = 0;
  }, ne = function() {
    let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    return !e2.moveDisabled && 0 === t2;
  }, { onMouseDown: ae2, onMouseMove: re, onMouseUp: ie2 } = /* @__PURE__ */ ((e3, t2, o3) => {
    let l2, n2 = false;
    return { onMouseDown: (o4) => {
      e3.initX = e3.lastX = o4.clientX, e3.initY = e3.lastY = o4.clientY, t2.dragging = true, n2 = false, o4.stopPropagation();
    }, onMouseUp: (e4) => {
      o3(e4.button) && R(l2), t2.dragging = false, n2 = false;
    }, onMouseMove: (a2) => {
      if (t2.dragging) if (o3(a2.button)) {
        if (n2) return;
        n2 = true, l2 = O(() => {
          const { top: t3, left: o4, lastY: l3, lastX: r2 } = e3;
          e3.top = t3 - l3 + a2.clientY, e3.left = o4 - r2 + a2.clientX, e3.lastX = a2.clientX, e3.lastY = a2.clientY, n2 = false;
        });
      } else e3.lastX = a2.clientX, e3.lastY = a2.clientY;
      a2.stopPropagation();
    } };
  })(T2, $2, ne), { onTouchStart: se, onTouchMove: ce, onTouchEnd: ue } = /* @__PURE__ */ ((e3, t2, o3, l2, n2) => {
    let a2, r2 = false;
    return { onTouchStart: (e4) => {
      const { touches: l3 } = e4;
      l3.length > 1 && n2() ? (o3.gesturing = true, t2.touches = l3) : (t2.initX = t2.lastX = l3[0].clientX, t2.initY = t2.lastY = l3[0].clientY, o3.dragging = true), e4.stopPropagation();
    }, onTouchMove: (i2) => {
      if (r2) return;
      const { touches: s2 } = i2, { lastX: c2, lastY: u2, left: d2, top: p3, scale: b2 } = t2;
      if (!o3.gesturing && o3.dragging) {
        if (!s2[0]) return;
        const { clientX: e4, clientY: o4 } = s2[0];
        l2() ? a2 = O(() => {
          t2.lastX = e4, t2.lastY = o4, t2.top = p3 - u2 + o4, t2.left = d2 - c2 + e4, r2 = false;
        }) : (t2.lastX = e4, t2.lastY = o4);
      } else o3.gesturing && t2.touches.length > 1 && s2.length > 1 && n2() && (a2 = O(() => {
        const o4 = (A(t2.touches[0], t2.touches[1]) - A(s2[0], s2[1])) / e3.width;
        t2.touches = s2;
        const l3 = b2 - 1.3 * o4;
        l3 > 0.5 && l3 < 1.5 * e3.maxScale && (t2.scale = l3), r2 = false;
      }));
    }, onTouchEnd: () => {
      R(a2), o3.dragging = false, o3.gesturing = false, r2 = false;
    } };
  })(h2, T2, $2, ne, () => !e2.pinchDisabled), de = () => {
    e2.dblclickDisabled || (T2.scale !== h2.maxScale ? (T2.lastScale = T2.scale, T2.scale = h2.maxScale) : T2.scale = T2.lastScale);
  }, pe2 = (t2) => {
    $2.loadError || $2.gesturing || $2.loading || $2.dragging || $2.wheeling || !e2.scrollDisabled || e2.zoomDisabled || ($2.wheeling = true, setTimeout(() => {
      $2.wheeling = false;
    }, 80), t2.deltaY < 0 ? K() : Q());
  }, ve = () => {
    e2.maskClosable && Z();
  }, me = () => {
    w2();
  }, ge = () => {
    $2.loading = false;
  }, fe = (e3) => {
    $2.loading = false, $2.loadError = true, p2("on-error", e3);
  };
  watch(() => e2.index, (e3) => {
    e3 < 0 || e3 >= I2.value.length || U(e3);
  }), watch(() => $2.dragging, (t2, o3) => {
    const l2 = !t2 && o3;
    if (!ne() && l2) {
      const t3 = T2.lastX - T2.initX, o4 = T2.lastY - T2.initY, l3 = e2.swipeTolerance;
      Math.abs(t3) > Math.abs(o4) && (t3 < -1 * l3 ? W() : t3 > l3 && G());
    }
  }), watch(() => e2.visible, (t2) => {
    if (t2) {
      q();
      const t3 = I2.value.length;
      if (0 === t3) return x2.value = 0, $2.loading = false, void nextTick(() => $2.loadError = true);
      x2.value = e2.index >= t3 ? t3 - 1 : e2.index < 0 ? 0 : e2.index, e2.scrollDisabled && we();
    } else e2.scrollDisabled && xe();
  });
  const we = () => {
  }, xe = () => {
  };
  onMounted(() => {
  }), onBeforeUnmount(() => {
    e2.scrollDisabled && xe();
  });
  const ye = () => $2.loading ? v2.loading ? v2.loading({ key: "loading" }) : createVNode(Y, { key: "img-loading" }, null) : $2.loadError ? v2.onerror ? v2.onerror({ key: "onerror" }) : createVNode(B, { key: "img-on-error" }, null) : createVNode("div", { class: `${g}-img-wrapper`, style: V.value, key: "img-wrapper" }, [createVNode("img", { alt: P.value, ref: m2, draggable: "false", class: `${g}-img`, src: F2.value, onMousedown: ae2, onMouseup: ie2, onMousemove: re, onTouchstart: se, onTouchmove: ce, onTouchend: ue, onLoad: me, onDblclick: de, onDragstart: (e3) => {
    e3.preventDefault();
  } }, null)]), ze = () => {
    if (v2["prev-btn"]) return v2["prev-btn"]({ prev: G });
    if (I2.value.length <= 1) return;
    const o3 = !e2.loop && x2.value <= 0;
    return createVNode("div", { role: "button", "aria-label": "previous image button", class: "btn__prev " + (o3 ? "disable" : ""), onClick: G }, [e2.rtl ? createVNode(f, { type: "next" }, null) : createVNode(f, { type: "prev" }, null)]);
  }, ke = () => {
    if (v2["next-btn"]) return v2["next-btn"]({ next: W });
    if (I2.value.length <= 1) return;
    const o3 = !e2.loop && x2.value >= I2.value.length - 1;
    return createVNode("div", { role: "button", "aria-label": "next image button", class: "btn__next " + (o3 ? "disable" : ""), onClick: W }, [e2.rtl ? createVNode(f, { type: "prev" }, null) : createVNode(f, { type: "next" }, null)]);
  }, _e = () => {
    if (!(e2.titleDisabled || $2.loading || $2.loadError)) return v2.title ? v2.title({ currentImg: H2.value }) : N2.value ? createVNode(X, null, { default: () => [N2.value] }) : void 0;
  }, De2 = () => {
    let o3;
    if (e2.visible) return createVNode("div", { onTouchmove: k, class: [`${g}-modal`, e2.rtl ? "is-rtl" : ""], onClick: withModifiers(ve, ["self"]), onWheel: pe2 }, [createVNode(E, null, null), createVNode(Transition, { name: `${g}-fade`, mode: "out-in" }, j(o3 = ye()) ? o3 : { default: () => [o3] }), createVNode("img", { style: "display:none;", src: F2.value, onError: fe, onLoad: ge }, null), createVNode("div", { class: `${g}-btns-wrapper` }, [ze(), ke(), _e(), v2["close-btn"] ? v2["close-btn"]({ close: Z }) : createVNode("div", { role: "button", "aria-label": "close image preview button", class: "btn__close", onClick: Z }, [createVNode(f, { type: "close" }, null)]), v2.toolbar ? v2.toolbar({ toolbarMethods: { zoomIn: K, zoomOut: Q, rotate: te, rotateLeft: te, rotateRight: oe, resize: le }, zoomIn: K, zoomOut: Q, rotate: te, rotateLeft: te, rotateRight: oe, resize: le }) : createVNode(C, { zoomIn: K, zoomOut: Q, resize: le, rotateLeft: te, rotateRight: oe, rotateDisabled: e2.rotateDisabled, zoomDisabled: e2.zoomDisabled }, null)])]);
  };
  return () => {
    let o3;
    if (e2.teleport) {
      let o4;
      return createVNode(Teleport, { to: e2.teleport }, { default: () => [createVNode(Transition, { name: `${g}-fade` }, j(o4 = De2()) ? o4 : { default: () => [o4] })] });
    }
    return createVNode(Transition, { name: `${g}-fade` }, j(o3 = De2()) ? o3 : { default: () => [o3] });
  };
} });
const N = Object.assign(H, { install: (e2) => {
  e2.component(H.name, H);
} });
const plugin_6ZhjavnMxFfYFG7tsyjoKHpgVIiZCdAzIuNWHwsY8yk = /* @__PURE__ */ defineNuxtPlugin((_nuxtApp) => {
  _nuxtApp.vueApp.use(N);
});
const plugins = [
  payloadPlugin,
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  wait_qbEBPhRO3Z08AJRhAS1nyzNq61MRWjY1h6Xo2WQpmFU,
  dialog_fC5b4oxB_q9VCnlJOZq9DzG2YrUdGFmiPdIQAFWU9qA,
  toaster_4qzmmIBU_gDY_6b_hZHRXhVBpHMZleFpp2wvTu7lUho,
  v_tooltip_Buo9lA6nqfCcVYhu2NpOqMCOzlcXoYWtD5lCqujsPqY,
  v_fullscreen_img_HzJbMkzrcb1PwrUjz_rYtteP4vhPFE3dZnESgLdY24M,
  v_click_outside_wyM72ME2BVOLoE9VfEf1KqnBYSQ5O8i70SyZX5MWccE,
  v_lazy_img_ij81URjWUC78c4C2rwc8Vs1sx4Rs9JkruY2UUfp8h4s,
  v_zoom_img_e4yn42wufN0rgriLo9w__bTrrAm7oEfCTbkD_cu4S9U,
  aos_sOOu4OOthDlSRdoPFZwn9X7FS1QmTkzT3SvTTLqQtNI,
  vueformPlugin_So1L8xODeblEvZf8pu_e4GIOmsIkauRYPHBLGgZfGmk,
  plugin_6ZhjavnMxFfYFG7tsyjoKHpgVIiZCdAzIuNWHwsY8yk
];
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = shallowRef(0);
  const isLoading = shallowRef(false);
  const error = shallowRef(false);
  const start = (opts2 = {}) => {
    error.value = false;
    set(0, opts2);
  };
  function set(at = 0, opts2 = {}) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish({ force: opts2.force });
    }
    progress.value = at < 0 ? 0 : at;
    opts2.force ? 0 : throttle;
    {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator || (nuxtApp._loadingIndicator = createLoadingIndicator(opts));
  return indicator;
}
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    hideDelay: {
      type: Number,
      default: 500
    },
    resetDelay: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      hideDelay: props.hideDelay,
      resetDelay: props.resetDelay,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  clean: defineAsyncComponent(() => import('./clean-B0wm8KzZ.mjs').then((m2) => m2.default || m2)),
  dashboard: defineAsyncComponent(() => import('./dashboard-DQfHJXqa.mjs').then((m2) => m2.default || m2)),
  default: defineAsyncComponent(() => import('./default-C0XVWfNh.mjs').then((m2) => m2.default || m2))
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? (route == null ? void 0 : route.meta.layout) ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (route == null ? void 0 : route.meta.layoutTransition) ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const useUtilStore = defineStore("utilStore", () => {
  const any_open_modal = ref({
    bool: false,
    id: "",
    AnythingTopass: null
    // use this passed data on the mounted modal
  });
  const global_vue_easy_lightbox = ref({
    display: false,
    imgs: [],
    imgIndex: 0
  });
  const sideBarOpen = ref(true);
  return {
    any_open_modal,
    global_vue_easy_lightbox,
    sideBarOpen
  };
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = {
  __name: "overlay",
  __ssrInlineRender: true,
  setup(__props) {
    const slots = useSlots();
    const { any_open_modal } = useUtilStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-70c07835>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (unref(slots).container) {
        _push(`<div class="container" data-v-70c07835>`);
        ssrRenderSlot(_ctx.$slots, "container", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overlay.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-70c07835"]]);
const _imports_0$1 = "" + __buildAssetsURL("desta-logo.CC3sxGNG.png");
const useLightBox = () => {
  const { global_vue_easy_lightbox } = storeToRefs(useUtilStore());
  const imgIndex = ref(0);
  const localVLBox = ref({
    display: false,
    singleImg: null,
    imgs: []
  });
  const show_local_vueEasyLightbox = (single_url, array_url, index) => {
    imgIndex.value = array_url ? index : 0;
    localVLBox.value.display = true;
    localVLBox.value.imgs = array_url ? [...array_url] : single_url;
  };
  const show_global_vueEasyLightbox = (single_url, array_url, index) => {
    global_vue_easy_lightbox.value.display = true;
    global_vue_easy_lightbox.value.imgIndex = array_url ? index : 0;
    global_vue_easy_lightbox.value.imgs = array_url ? [...array_url] : single_url;
  };
  const onhide = () => {
    localVLBox.value.display = false;
    global_vue_easy_lightbox.value.display = false;
  };
  return {
    imgIndex,
    localVLBox,
    onhide,
    show_local_vueEasyLightbox,
    show_global_vueEasyLightbox
    // setMethods,
  };
};
const _sfc_main$8 = {
  __name: "blogPost",
  __ssrInlineRender: true,
  props: {
    blogPost: Object
  },
  setup(__props) {
    const { show_global_vueEasyLightbox } = useLightBox();
    const showimg = (imgRef, isArr, index) => {
      let imges = imgRef;
      show_global_vueEasyLightbox(imges, null, 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Overlay, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="container" data-v-cb2ff0b1${_scopeId}><div class="header-image-container" data-v-cb2ff0b1${_scopeId}><div class="dots-pattern" data-v-cb2ff0b1${_scopeId}></div><img class="header-image"${ssrRenderAttr("src", `/blog/${(_a = __props.blogPost) == null ? void 0 : _a.coverImg}`)} alt="blog cover image" data-v-cb2ff0b1${_scopeId}><div class="cat" data-v-cb2ff0b1${_scopeId}><!--[-->`);
            ssrRenderList(__props.blogPost.category, (cat) => {
              _push2(`<span data-v-cb2ff0b1${_scopeId}>${ssrInterpolate(cat)}</span>`);
            });
            _push2(`<!--]--></div><img${ssrRenderAttr("src", _imports_0$1)} alt="logo" class="author-image" data-v-cb2ff0b1${_scopeId}></div><div class="content" data-v-cb2ff0b1${_scopeId}><div class="date" data-v-cb2ff0b1${_scopeId}>${ssrInterpolate(unref(format)(new Date(__props.blogPost.createdAt), "MMMM dd,yyyy"))}</div><h3 class="blog-title" data-v-cb2ff0b1${_scopeId}>${ssrInterpolate(__props.blogPost.title)}</h3><div class="blog-content" data-v-cb2ff0b1${_scopeId}><div class="quill-html-content" data-v-cb2ff0b1${_scopeId}>${`${__props.blogPost.content}` ?? ""}</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container" }, [
                createVNode("div", {
                  class: "header-image-container",
                  onClick: withModifiers(($event) => {
                    var _a2;
                    return showimg(`/blog/${(_a2 = __props.blogPost) == null ? void 0 : _a2.coverImg}`);
                  }, ["stop"])
                }, [
                  createVNode("div", { class: "dots-pattern" }),
                  createVNode("img", {
                    class: "header-image",
                    src: `/blog/${(_b = __props.blogPost) == null ? void 0 : _b.coverImg}`,
                    alt: "blog cover image"
                  }, null, 8, ["src"]),
                  createVNode("div", { class: "cat" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.blogPost.category, (cat) => {
                      return openBlock(), createBlock("span", null, toDisplayString(cat), 1);
                    }), 256))
                  ]),
                  createVNode("img", {
                    src: _imports_0$1,
                    alt: "logo",
                    class: "author-image"
                  })
                ], 8, ["onClick"]),
                createVNode("div", { class: "content" }, [
                  createVNode("div", { class: "date" }, toDisplayString(unref(format)(new Date(__props.blogPost.createdAt), "MMMM dd,yyyy")), 1),
                  createVNode("h3", { class: "blog-title" }, toDisplayString(__props.blogPost.title), 1),
                  createVNode("div", { class: "blog-content" }, [
                    createVNode("div", {
                      class: "quill-html-content",
                      innerHTML: `${__props.blogPost.content}`
                    }, null, 8, ["innerHTML"])
                  ])
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/blogPost.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-cb2ff0b1"]]);
const _imports_0 = "" + __buildAssetsURL("desta-logo.CC3sxGNG.png");
const _sfc_main$7 = {
  __name: "productShow",
  __ssrInlineRender: true,
  props: {
    productData: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Overlay, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="main-container" data-v-6a0fa7ca${_scopeId}><div class="image-container" data-v-6a0fa7ca${_scopeId}><div class="dots-pattern" data-v-6a0fa7ca${_scopeId}></div><img class="pro-img"${ssrRenderAttr("src", `/pictures/Products/${__props.productData.img}`)}${ssrRenderAttr("alt", `Desta ${__props.productData.img}`)} data-v-6a0fa7ca${_scopeId}></div><div class="content-container" data-v-6a0fa7ca${_scopeId}><h1 class="product-title" data-v-6a0fa7ca${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="logo" class="logo" data-v-6a0fa7ca${_scopeId}><span style="${ssrRenderStyle({ color: __props.productData.color, fontWeight: "bold", marginRight: "-10px" })}" data-v-6a0fa7ca${_scopeId}>${ssrInterpolate(__props.productData.name)}</span></h1><p class="product-description" data-v-6a0fa7ca${_scopeId}>${ssrInterpolate(__props.productData.description)}</p><div class="product-values" data-v-6a0fa7ca${_scopeId}><!--[-->`);
            ssrRenderList(__props.productData.values, (v, i) => {
              _push2(`<p data-v-6a0fa7ca${_scopeId}>• ${ssrInterpolate(v)}</p>`);
            });
            _push2(`<!--]--></div><h2 class="nutritional-title" data-v-6a0fa7ca${_scopeId}>sizes</h2><div class="product-values" style="${ssrRenderStyle({ "margin-bottom": "0" })}" data-v-6a0fa7ca${_scopeId}><!--[-->`);
            ssrRenderList(__props.productData.sizes, (size, i) => {
              _push2(`<p data-v-6a0fa7ca${_scopeId}>• ${ssrInterpolate(size)}</p>`);
            });
            _push2(`<!--]--></div><h2 class="nutritional-title" data-v-6a0fa7ca${_scopeId}>packaging</h2><div class="product-values" style="${ssrRenderStyle({ "margin-bottom": "0" })}" data-v-6a0fa7ca${_scopeId}><!--[-->`);
            ssrRenderList(__props.productData.packaging, (pac, i) => {
              _push2(`<p data-v-6a0fa7ca${_scopeId}>• ${ssrInterpolate(pac)}</p>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "main-container" }, [
                createVNode("div", { class: "image-container" }, [
                  createVNode("div", { class: "dots-pattern" }),
                  createVNode("img", {
                    class: "pro-img",
                    src: `/pictures/Products/${__props.productData.img}`,
                    alt: `Desta ${__props.productData.img}`
                  }, null, 8, ["src", "alt"])
                ]),
                createVNode("div", { class: "content-container" }, [
                  createVNode("h1", { class: "product-title" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "logo",
                      class: "logo"
                    }),
                    createVNode("span", {
                      style: { color: __props.productData.color, fontWeight: "bold", marginRight: "-10px" }
                    }, toDisplayString(__props.productData.name), 5)
                  ]),
                  createVNode("p", { class: "product-description" }, toDisplayString(__props.productData.description), 1),
                  createVNode("div", { class: "product-values" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.productData.values, (v, i) => {
                      return openBlock(), createBlock("p", { key: i }, "• " + toDisplayString(v), 1);
                    }), 128))
                  ]),
                  createVNode("h2", { class: "nutritional-title" }, "sizes"),
                  createVNode("div", {
                    class: "product-values",
                    style: { "margin-bottom": "0" }
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.productData.sizes, (size, i) => {
                      return openBlock(), createBlock("p", { key: i }, "• " + toDisplayString(size), 1);
                    }), 128))
                  ]),
                  createVNode("h2", { class: "nutritional-title" }, "packaging"),
                  createVNode("div", {
                    class: "product-values",
                    style: { "margin-bottom": "0" }
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.productData.packaging, (pac, i) => {
                      return openBlock(), createBlock("p", { key: i }, "• " + toDisplayString(pac), 1);
                    }), 128))
                  ])
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/productShow.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6a0fa7ca"]]);
const frontEndErrorFeedback = () => {
  const err = (err2, type) => {
    var _a, _b, _c, _d;
    if (type === "vueform" && ((_b = (_a = err2.response) == null ? void 0 : _a._data) == null ? void 0 : _b.message)) {
      const jsonStr = (_d = (_c = err2.response) == null ? void 0 : _c._data) == null ? void 0 : _d.message.replace(/^Error:\s*/, "");
      const extractErrorsAsArray = JSON.parse(jsonStr).map((err3) => ({
        [err3.path.join(".")]: err3.message
      }));
      for (let index = 0; index < extractErrorsAsArray.length; index++) {
        const errmsg = extractErrorsAsArray[index];
        setTimeout(() => {
          DialogToast(`${JSON.stringify(errmsg)}`, {
            messageType: "error",
            closeButton: true,
            placement: "top-right",
            duration: 1e4,
            customClass: "global_error"
          });
        }, 500);
      }
      return;
    }
    DialogToast(`${err2}`, {
      messageType: "error",
      closeButton: true,
      placement: "top-right",
      duration: 1e4,
      customClass: "global_error"
    });
  };
  const success = (msg) => {
    DialogMessage(`${msg}`, {
      messageType: "success",
      icon: true,
      placement: "top",
      duration: 5e3,
      customClass: "global_success",
      closeButton: true,
      pill: false
    });
  };
  return {
    err,
    success
  };
};
const _sfc_main$6 = {
  __name: "applyVacancy",
  __ssrInlineRender: true,
  props: { vacancy: Object },
  setup(__props) {
    const props = __props;
    async function applyVacancy(FD, form$) {
      const formData = new FormData();
      formData.append("vacancyId", props.vacancy.id);
      form$.data.uploaded_files.forEach((file) => {
        formData.append("uploaded_files", file);
      });
      formData.append("application_form", JSON.stringify({
        gender: form$.data.gender,
        workExperience: form$.data.workExperience,
        fullName: form$.data.fullName,
        phoneNumber: form$.data.phoneNumber,
        email: form$.data.email,
        skill: form$.data.skill,
        languages: form$.data.languages,
        workExperienceInformation: form$.data.workExperienceInformation
      }));
      try {
        await $fetch("/api/vacancy/apply", {
          method: "POST",
          headers: { apiref: "/api/vacancy/apply/POST" },
          body: formData
        });
        frontEndErrorFeedback().success("vacancy applied sussfully");
      } catch (error) {
        frontEndErrorFeedback().err(error);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      const _component_Vueform = resolveComponent("Vueform");
      const _component_StaticElement = resolveComponent("StaticElement");
      const _component_TextElement = resolveComponent("TextElement");
      const _component_PhoneElement = resolveComponent("PhoneElement");
      const _component_GroupElement = resolveComponent("GroupElement");
      const _component_RadiogroupElement = resolveComponent("RadiogroupElement");
      const _component_TagsElement = resolveComponent("TagsElement");
      const _component_ListElement = resolveComponent("ListElement");
      const _component_ObjectElement = resolveComponent("ObjectElement");
      const _component_TextareaElement = resolveComponent("TextareaElement");
      const _component_MultifileElement = resolveComponent("MultifileElement");
      const _component_ButtonElement = resolveComponent("ButtonElement");
      _push(ssrRenderComponent(_component_Overlay, _attrs, {
        container: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="summary" data-v-1b5204ba${_scopeId}><div class="job-discriptions" data-v-1b5204ba${_scopeId}><h5 class="dis" data-v-1b5204ba${_scopeId}>Position: <span class="value" data-v-1b5204ba${_scopeId}>${ssrInterpolate(__props.vacancy.position_name)}</span></h5><h5 class="dis" data-v-1b5204ba${_scopeId}>company: <span class="value" data-v-1b5204ba${_scopeId}>${ssrInterpolate(__props.vacancy.company)}</span></h5><h5 class="dis" data-v-1b5204ba${_scopeId}>location: <span class="value" data-v-1b5204ba${_scopeId}>${ssrInterpolate(__props.vacancy.locations.join(","))}</span></h5><h5 class="dis" data-v-1b5204ba${_scopeId}>deadline: <span class="value" data-v-1b5204ba${_scopeId}>${ssrInterpolate(unref(format)(new Date(__props.vacancy.deadline), "MMMM dd,yyyy"))}</span></h5><h5 class="dis" data-v-1b5204ba${_scopeId}>salary: <span class="value" data-v-1b5204ba${_scopeId}>${ssrInterpolate(__props.vacancy.salary)}</span></h5></div></div>`);
            _push2(ssrRenderComponent(_component_Vueform, { endpoint: applyVacancy }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "h3",
                    tag: "h3",
                    content: "personal information",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Full Name </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TextElement, {
                    name: "fullName",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> phoneNumber </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_PhoneElement, {
                    name: "phoneNumber",
                    "allow-incomplete": true,
                    unmask: true,
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Email </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TextElement, {
                    name: "email",
                    "input-type": "email",
                    rules: [
                      "nullable",
                      "email"
                    ],
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "workExperience",
                    tag: "p",
                    content: "<div> work experience </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TextElement, {
                    name: "workExperience",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p_1",
                    tag: "p",
                    content: "<div> gender </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_GroupElement, {
                    name: "container",
                    columns: {
                      container: 8
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_RadiogroupElement, {
                          name: "gender",
                          view: "tabs",
                          items: [
                            {
                              value: "male",
                              label: " male"
                            },
                            {
                              value: "female",
                              label: "female"
                            }
                          ],
                          columns: {
                            container: 8
                          },
                          rules: [
                            "required"
                          ]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_RadiogroupElement, {
                            name: "gender",
                            view: "tabs",
                            items: [
                              {
                                value: "male",
                                label: " male"
                              },
                              {
                                value: "female",
                                label: "female"
                              }
                            ],
                            columns: {
                              container: 8
                            },
                            rules: [
                              "required"
                            ]
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p_2",
                    tag: "p",
                    content: "<div> languages </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TagsElement, {
                    name: "languages",
                    "close-on-select": false,
                    search: true,
                    items: [
                      {
                        value: "Amharic",
                        label: "Amharic"
                      },
                      {
                        value: "Tigrigna",
                        label: "Tigrigna"
                      },
                      {
                        value: "English",
                        label: "English"
                      }
                    ],
                    "input-type": "search",
                    autocomplete: "off",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm",
                    create: true,
                    "add-option-on": [
                      "enter",
                      ","
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p_3",
                    tag: "p",
                    content: "<div> skill </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TagsElement, {
                    name: "skill",
                    "close-on-select": false,
                    search: true,
                    items: [
                      {
                        value: "basic computer skill",
                        label: "basic computer skill"
                      },
                      {
                        value: "microsoft word",
                        label: "microsoft word"
                      },
                      {
                        value: "microsoft excel",
                        label: "microsoft excel"
                      }
                    ],
                    "input-type": "search",
                    autocomplete: "off",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm",
                    create: true,
                    "add-option-on": [
                      "enter",
                      ","
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "h3_1",
                    tag: "h3",
                    content: "work Experience Information",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ListElement, {
                    name: "workExperienceInformation",
                    "add-text": "add other work experience"
                  }, {
                    default: withCtx(({ index }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ObjectElement, { name: index }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "p_4",
                                tag: "p",
                                content: "<div> position </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_TextElement, {
                                name: "position",
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "p_5",
                                tag: "p",
                                content: "<div> company/employer name </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_TextElement, {
                                name: "company/employerName",
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "p_6",
                                tag: "p",
                                content: "<div> Duties Description </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_TextareaElement, {
                                name: "dutiesDescription",
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "manager/HR Contact",
                                tag: "p",
                                content: "<div> manager/HR email or phone number </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_PhoneElement, {
                                name: "company/employerContact",
                                "allow-incomplete": true,
                                unmask: true,
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_StaticElement, {
                                  name: "p_4",
                                  tag: "p",
                                  content: "<div> position </div>",
                                  columns: {
                                    container: 6
                                  },
                                  size: "sm"
                                }),
                                createVNode(_component_TextElement, {
                                  name: "position",
                                  columns: {
                                    container: 6
                                  },
                                  rules: [
                                    "required"
                                  ],
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "p_5",
                                  tag: "p",
                                  content: "<div> company/employer name </div>",
                                  columns: {
                                    container: 6
                                  },
                                  size: "sm"
                                }),
                                createVNode(_component_TextElement, {
                                  name: "company/employerName",
                                  columns: {
                                    container: 6
                                  },
                                  rules: [
                                    "required"
                                  ],
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "p_6",
                                  tag: "p",
                                  content: "<div> Duties Description </div>",
                                  columns: {
                                    container: 6
                                  },
                                  size: "sm"
                                }),
                                createVNode(_component_TextareaElement, {
                                  name: "dutiesDescription",
                                  columns: {
                                    container: 6
                                  },
                                  rules: [
                                    "required"
                                  ],
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "manager/HR Contact",
                                  tag: "p",
                                  content: "<div> manager/HR email or phone number </div>",
                                  columns: {
                                    container: 6
                                  },
                                  size: "sm"
                                }),
                                createVNode(_component_PhoneElement, {
                                  name: "company/employerContact",
                                  "allow-incomplete": true,
                                  unmask: true,
                                  columns: {
                                    container: 6
                                  },
                                  rules: [
                                    "required"
                                  ],
                                  size: "sm"
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ObjectElement, { name: index }, {
                            default: withCtx(() => [
                              createVNode(_component_StaticElement, {
                                name: "p_4",
                                tag: "p",
                                content: "<div> position </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }),
                              createVNode(_component_TextElement, {
                                name: "position",
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "p_5",
                                tag: "p",
                                content: "<div> company/employer name </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }),
                              createVNode(_component_TextElement, {
                                name: "company/employerName",
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "p_6",
                                tag: "p",
                                content: "<div> Duties Description </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }),
                              createVNode(_component_TextareaElement, {
                                name: "dutiesDescription",
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "manager/HR Contact",
                                tag: "p",
                                content: "<div> manager/HR email or phone number </div>",
                                columns: {
                                  container: 6
                                },
                                size: "sm"
                              }),
                              createVNode(_component_PhoneElement, {
                                name: "company/employerContact",
                                "allow-incomplete": true,
                                unmask: true,
                                columns: {
                                  container: 6
                                },
                                rules: [
                                  "required"
                                ],
                                size: "sm"
                              })
                            ]),
                            _: 2
                          }, 1032, ["name"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "h3_2",
                    tag: "h3",
                    content: "File Attachments",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_MultifileElement, {
                    name: "uploaded_files",
                    drop: true,
                    rules: [
                      "required"
                    ],
                    "field-name": "uploaded_files",
                    urls: {},
                    size: "sm",
                    info: "uploaded_files",
                    accept: ".pdf",
                    clickable: false,
                    url: false,
                    "upload-temp-endpoint": false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ButtonElement, {
                    name: "submit",
                    "button-label": "apply",
                    submits: true,
                    full: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_StaticElement, {
                      name: "h3",
                      tag: "h3",
                      content: "personal information",
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: "<div> Full Name </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_TextElement, {
                      name: "fullName",
                      columns: {
                        container: 8
                      },
                      rules: [
                        "required"
                      ],
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: "<div> phoneNumber </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_PhoneElement, {
                      name: "phoneNumber",
                      "allow-incomplete": true,
                      unmask: true,
                      columns: {
                        container: 8
                      },
                      rules: [
                        "required"
                      ],
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: "<div> Email </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_TextElement, {
                      name: "email",
                      "input-type": "email",
                      rules: [
                        "nullable",
                        "email"
                      ],
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "workExperience",
                      tag: "p",
                      content: "<div> work experience </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_TextElement, {
                      name: "workExperience",
                      columns: {
                        container: 8
                      },
                      rules: [
                        "required"
                      ],
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p_1",
                      tag: "p",
                      content: "<div> gender </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_GroupElement, {
                      name: "container",
                      columns: {
                        container: 8
                      }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_RadiogroupElement, {
                          name: "gender",
                          view: "tabs",
                          items: [
                            {
                              value: "male",
                              label: " male"
                            },
                            {
                              value: "female",
                              label: "female"
                            }
                          ],
                          columns: {
                            container: 8
                          },
                          rules: [
                            "required"
                          ]
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p_2",
                      tag: "p",
                      content: "<div> languages </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_TagsElement, {
                      name: "languages",
                      "close-on-select": false,
                      search: true,
                      items: [
                        {
                          value: "Amharic",
                          label: "Amharic"
                        },
                        {
                          value: "Tigrigna",
                          label: "Tigrigna"
                        },
                        {
                          value: "English",
                          label: "English"
                        }
                      ],
                      "input-type": "search",
                      autocomplete: "off",
                      columns: {
                        container: 8
                      },
                      rules: [
                        "required"
                      ],
                      size: "sm",
                      create: true,
                      "add-option-on": [
                        "enter",
                        ","
                      ]
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p_3",
                      tag: "p",
                      content: "<div> skill </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_TagsElement, {
                      name: "skill",
                      "close-on-select": false,
                      search: true,
                      items: [
                        {
                          value: "basic computer skill",
                          label: "basic computer skill"
                        },
                        {
                          value: "microsoft word",
                          label: "microsoft word"
                        },
                        {
                          value: "microsoft excel",
                          label: "microsoft excel"
                        }
                      ],
                      "input-type": "search",
                      autocomplete: "off",
                      columns: {
                        container: 8
                      },
                      rules: [
                        "required"
                      ],
                      size: "sm",
                      create: true,
                      "add-option-on": [
                        "enter",
                        ","
                      ]
                    }),
                    createVNode(_component_StaticElement, {
                      name: "h3_1",
                      tag: "h3",
                      content: "work Experience Information",
                      size: "sm"
                    }),
                    createVNode(_component_ListElement, {
                      name: "workExperienceInformation",
                      "add-text": "add other work experience"
                    }, {
                      default: withCtx(({ index }) => [
                        createVNode(_component_ObjectElement, { name: index }, {
                          default: withCtx(() => [
                            createVNode(_component_StaticElement, {
                              name: "p_4",
                              tag: "p",
                              content: "<div> position </div>",
                              columns: {
                                container: 6
                              },
                              size: "sm"
                            }),
                            createVNode(_component_TextElement, {
                              name: "position",
                              columns: {
                                container: 6
                              },
                              rules: [
                                "required"
                              ],
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "p_5",
                              tag: "p",
                              content: "<div> company/employer name </div>",
                              columns: {
                                container: 6
                              },
                              size: "sm"
                            }),
                            createVNode(_component_TextElement, {
                              name: "company/employerName",
                              columns: {
                                container: 6
                              },
                              rules: [
                                "required"
                              ],
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "p_6",
                              tag: "p",
                              content: "<div> Duties Description </div>",
                              columns: {
                                container: 6
                              },
                              size: "sm"
                            }),
                            createVNode(_component_TextareaElement, {
                              name: "dutiesDescription",
                              columns: {
                                container: 6
                              },
                              rules: [
                                "required"
                              ],
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "manager/HR Contact",
                              tag: "p",
                              content: "<div> manager/HR email or phone number </div>",
                              columns: {
                                container: 6
                              },
                              size: "sm"
                            }),
                            createVNode(_component_PhoneElement, {
                              name: "company/employerContact",
                              "allow-incomplete": true,
                              unmask: true,
                              columns: {
                                container: 6
                              },
                              rules: [
                                "required"
                              ],
                              size: "sm"
                            })
                          ]),
                          _: 2
                        }, 1032, ["name"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_StaticElement, {
                      name: "h3_2",
                      tag: "h3",
                      content: "File Attachments",
                      size: "sm"
                    }),
                    createVNode(_component_MultifileElement, {
                      name: "uploaded_files",
                      drop: true,
                      rules: [
                        "required"
                      ],
                      "field-name": "uploaded_files",
                      urls: {},
                      size: "sm",
                      info: "uploaded_files",
                      accept: ".pdf",
                      clickable: false,
                      url: false,
                      "upload-temp-endpoint": false
                    }),
                    createVNode(_component_ButtonElement, {
                      name: "submit",
                      "button-label": "apply",
                      submits: true,
                      full: true
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "summary" }, [
                createVNode("div", { class: "job-discriptions" }, [
                  createVNode("h5", { class: "dis" }, [
                    createTextVNode("Position: "),
                    createVNode("span", { class: "value" }, toDisplayString(__props.vacancy.position_name), 1)
                  ]),
                  createVNode("h5", { class: "dis" }, [
                    createTextVNode("company: "),
                    createVNode("span", { class: "value" }, toDisplayString(__props.vacancy.company), 1)
                  ]),
                  createVNode("h5", { class: "dis" }, [
                    createTextVNode("location: "),
                    createVNode("span", { class: "value" }, toDisplayString(__props.vacancy.locations.join(",")), 1)
                  ]),
                  createVNode("h5", { class: "dis" }, [
                    createTextVNode("deadline: "),
                    createVNode("span", { class: "value" }, toDisplayString(unref(format)(new Date(__props.vacancy.deadline), "MMMM dd,yyyy")), 1)
                  ]),
                  createVNode("h5", { class: "dis" }, [
                    createTextVNode("salary: "),
                    createVNode("span", { class: "value" }, toDisplayString(__props.vacancy.salary), 1)
                  ])
                ])
              ]),
              createVNode(_component_Vueform, { endpoint: applyVacancy }, {
                default: withCtx(() => [
                  createVNode(_component_StaticElement, {
                    name: "h3",
                    tag: "h3",
                    content: "personal information",
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Full Name </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_TextElement, {
                    name: "fullName",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> phoneNumber </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_PhoneElement, {
                    name: "phoneNumber",
                    "allow-incomplete": true,
                    unmask: true,
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Email </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_TextElement, {
                    name: "email",
                    "input-type": "email",
                    rules: [
                      "nullable",
                      "email"
                    ],
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "workExperience",
                    tag: "p",
                    content: "<div> work experience </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_TextElement, {
                    name: "workExperience",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p_1",
                    tag: "p",
                    content: "<div> gender </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_GroupElement, {
                    name: "container",
                    columns: {
                      container: 8
                    }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_RadiogroupElement, {
                        name: "gender",
                        view: "tabs",
                        items: [
                          {
                            value: "male",
                            label: " male"
                          },
                          {
                            value: "female",
                            label: "female"
                          }
                        ],
                        columns: {
                          container: 8
                        },
                        rules: [
                          "required"
                        ]
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p_2",
                    tag: "p",
                    content: "<div> languages </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_TagsElement, {
                    name: "languages",
                    "close-on-select": false,
                    search: true,
                    items: [
                      {
                        value: "Amharic",
                        label: "Amharic"
                      },
                      {
                        value: "Tigrigna",
                        label: "Tigrigna"
                      },
                      {
                        value: "English",
                        label: "English"
                      }
                    ],
                    "input-type": "search",
                    autocomplete: "off",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm",
                    create: true,
                    "add-option-on": [
                      "enter",
                      ","
                    ]
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p_3",
                    tag: "p",
                    content: "<div> skill </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_TagsElement, {
                    name: "skill",
                    "close-on-select": false,
                    search: true,
                    items: [
                      {
                        value: "basic computer skill",
                        label: "basic computer skill"
                      },
                      {
                        value: "microsoft word",
                        label: "microsoft word"
                      },
                      {
                        value: "microsoft excel",
                        label: "microsoft excel"
                      }
                    ],
                    "input-type": "search",
                    autocomplete: "off",
                    columns: {
                      container: 8
                    },
                    rules: [
                      "required"
                    ],
                    size: "sm",
                    create: true,
                    "add-option-on": [
                      "enter",
                      ","
                    ]
                  }),
                  createVNode(_component_StaticElement, {
                    name: "h3_1",
                    tag: "h3",
                    content: "work Experience Information",
                    size: "sm"
                  }),
                  createVNode(_component_ListElement, {
                    name: "workExperienceInformation",
                    "add-text": "add other work experience"
                  }, {
                    default: withCtx(({ index }) => [
                      createVNode(_component_ObjectElement, { name: index }, {
                        default: withCtx(() => [
                          createVNode(_component_StaticElement, {
                            name: "p_4",
                            tag: "p",
                            content: "<div> position </div>",
                            columns: {
                              container: 6
                            },
                            size: "sm"
                          }),
                          createVNode(_component_TextElement, {
                            name: "position",
                            columns: {
                              container: 6
                            },
                            rules: [
                              "required"
                            ],
                            size: "sm"
                          }),
                          createVNode(_component_StaticElement, {
                            name: "p_5",
                            tag: "p",
                            content: "<div> company/employer name </div>",
                            columns: {
                              container: 6
                            },
                            size: "sm"
                          }),
                          createVNode(_component_TextElement, {
                            name: "company/employerName",
                            columns: {
                              container: 6
                            },
                            rules: [
                              "required"
                            ],
                            size: "sm"
                          }),
                          createVNode(_component_StaticElement, {
                            name: "p_6",
                            tag: "p",
                            content: "<div> Duties Description </div>",
                            columns: {
                              container: 6
                            },
                            size: "sm"
                          }),
                          createVNode(_component_TextareaElement, {
                            name: "dutiesDescription",
                            columns: {
                              container: 6
                            },
                            rules: [
                              "required"
                            ],
                            size: "sm"
                          }),
                          createVNode(_component_StaticElement, {
                            name: "manager/HR Contact",
                            tag: "p",
                            content: "<div> manager/HR email or phone number </div>",
                            columns: {
                              container: 6
                            },
                            size: "sm"
                          }),
                          createVNode(_component_PhoneElement, {
                            name: "company/employerContact",
                            "allow-incomplete": true,
                            unmask: true,
                            columns: {
                              container: 6
                            },
                            rules: [
                              "required"
                            ],
                            size: "sm"
                          })
                        ]),
                        _: 2
                      }, 1032, ["name"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_StaticElement, {
                    name: "h3_2",
                    tag: "h3",
                    content: "File Attachments",
                    size: "sm"
                  }),
                  createVNode(_component_MultifileElement, {
                    name: "uploaded_files",
                    drop: true,
                    rules: [
                      "required"
                    ],
                    "field-name": "uploaded_files",
                    urls: {},
                    size: "sm",
                    info: "uploaded_files",
                    accept: ".pdf",
                    clickable: false,
                    url: false,
                    "upload-temp-endpoint": false
                  }),
                  createVNode(_component_ButtonElement, {
                    name: "submit",
                    "button-label": "apply",
                    submits: true,
                    full: true
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/applyVacancy.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-1b5204ba"]]);
const useVacancyStore = defineStore("vacancyStore", () => {
  const page = ref(1);
  const perPage = ref(10);
  const vacancies = ref([]);
  const applications = ref([]);
  return {
    page,
    perPage,
    vacancies,
    applications
  };
});
const _sfc_main$5 = {
  __name: "updateVacancy",
  __ssrInlineRender: true,
  setup(__props) {
    const { any_open_modal } = useUtilStore();
    const { vacancies } = storeToRefs(useVacancyStore());
    let vacancy = ref(any_open_modal.AnythingTopass);
    const updateVacancy = async (FormD, form$) => {
      console.log(vacancy);
      try {
        const { data } = await $fetch(`/api/vacancy/${vacancy.value.id}`, {
          method: "PATCH",
          headers: {
            apiref: "/api/vacancy/[id]/PATCH"
          },
          body: form$.data
        });
        const index = vacancies.value.findIndex((v) => v.id === vacancy.value.id);
        if (index !== -1) {
          const updatedVacancies = [...vacancies.value];
          updatedVacancies[index] = data[0];
          vacancies.value = updatedVacancies;
        }
        frontEndErrorFeedback().success("vacancy updated successfully");
      } catch (error) {
        frontEndErrorFeedback().err(error, "vueForm");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_Vueform = resolveComponent("Vueform");
      const _component_StaticElement = resolveComponent("StaticElement");
      const _component_TextElement = resolveComponent("TextElement");
      const _component_TagsElement = resolveComponent("TagsElement");
      const _component_TextareaElement = resolveComponent("TextareaElement");
      const _component_EditorElement = resolveComponent("EditorElement");
      const _component_DateElement = resolveComponent("DateElement");
      const _component_ButtonElement = resolveComponent("ButtonElement");
      _push(ssrRenderComponent(_component_Overlay, _attrs, {
        container: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Vueform, {
                    endpoint: updateVacancy,
                    default: unref(vacancy)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_StaticElement, {
                        name: "h3",
                        tag: "h3",
                        content: "Update Vacancy",
                        style: { "color": "#1492E6" },
                        bottom: "2",
                        align: "center"
                      }),
                      createVNode(_component_StaticElement, {
                        name: "p",
                        tag: "p",
                        content: "<div>position name</div>",
                        columns: {
                          container: 2
                        }
                      }),
                      createVNode(_component_TextElement, {
                        name: "position_name",
                        columns: {
                          container: 10
                        },
                        rules: [
                          "required"
                        ]
                      }),
                      createVNode(_component_StaticElement, {
                        name: "p_1",
                        tag: "p",
                        content: "<div>company</div>",
                        columns: {
                          container: 2
                        }
                      }),
                      createVNode(_component_TextElement, {
                        name: "company",
                        columns: {
                          container: 10
                        },
                        rules: [
                          "required"
                        ]
                      }),
                      createVNode(_component_StaticElement, {
                        name: "p_3",
                        tag: "p",
                        content: "<div>salary</div>",
                        columns: {
                          container: 2
                        }
                      }),
                      createVNode(_component_TextElement, {
                        name: "salary",
                        columns: {
                          container: 10
                        }
                      }),
                      createVNode(_component_StaticElement, {
                        name: "p_2",
                        tag: "p",
                        content: "<div>location</div>",
                        columns: {
                          container: 2
                        }
                      }),
                      createVNode(_component_TagsElement, {
                        name: "locations",
                        "close-on-select": false,
                        search: true,
                        items: [
                          {
                            value: "mekelle",
                            label: "mekelle"
                          },
                          {
                            value: "quiha",
                            label: "quiha"
                          },
                          {
                            value: "ayder",
                            label: "ayder"
                          },
                          ...unref(vacancy).locations
                        ],
                        "input-type": "search",
                        autocomplete: "off",
                        columns: {
                          container: 10
                        },
                        create: true,
                        "add-option-on": [
                          "enter",
                          ","
                        ],
                        rules: [
                          "required"
                        ]
                      }, null, 8, ["items"]),
                      createVNode(_component_TextareaElement, {
                        name: "description",
                        label: "description"
                      }),
                      createVNode(_component_EditorElement, {
                        name: "requirements",
                        label: "requirements",
                        rules: [
                          "required"
                        ]
                      }),
                      createVNode(_component_DateElement, {
                        name: "deadline",
                        label: "deadline",
                        size: "sm",
                        columns: {
                          container: 4
                        },
                        rules: [
                          "required"
                        ]
                      }),
                      createVNode(_component_ButtonElement, {
                        name: "post",
                        "button-label": "update Vacancy",
                        submits: true,
                        align: "center",
                        size: "sm",
                        columns: {
                          container: 10
                        }
                      })
                    ]),
                    _: 1
                  }, 8, ["default"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/modal/updateVacancy.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "viewVacancyApplication",
  __ssrInlineRender: true,
  setup(__props) {
    const { any_open_modal } = useUtilStore();
    const application = any_open_modal.AnythingTopass;
    const header = `vacancy Application for: ${application.vacancyId}`;
    const isDownloading = ref(false);
    const downloadFile = (file) => {
      if (isDownloading.value) return;
      isDownloading.value = true;
      try {
        const link = (void 0).createElement("a");
        link.href = `/vacancyApplicationFiles/${file}`;
        link.target = "_blank";
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
      } catch (error) {
        console.error("Download error:", error);
        alert("Download failed. Please try again.");
      } finally {
        isDownloading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      const _component_Vueform = resolveComponent("Vueform");
      const _component_StaticElement = resolveComponent("StaticElement");
      const _component_ListElement = resolveComponent("ListElement");
      const _component_ObjectElement = resolveComponent("ObjectElement");
      const _component_ButtonElement = resolveComponent("ButtonElement");
      _push(ssrRenderComponent(_component_Overlay, _attrs, {
        container: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Vueform, null, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "h3",
                    tag: "h3",
                    content: header,
                    size: "sm",
                    style: { "color": "#1492E6" },
                    bottom: "2",
                    align: "center"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Full Name </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.fullName,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> phoneNumber </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.phoneNumber,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Email </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.email,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "workExperience",
                    tag: "p",
                    content: "<div> work experience </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.workExperience,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p_1",
                    tag: "p",
                    content: "<div> gender </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.gender,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p_2",
                    tag: "p",
                    content: "<div> languages </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.languages,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p_3",
                    tag: "p",
                    content: "<div> skill </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.skill,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "h3_1",
                    tag: "h3",
                    content: "Work Experience Information",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ListElement, {
                    default: unref(application).application_form.workExperienceInformation,
                    name: "workExperienceInformation",
                    controls: { add: false, remove: false },
                    submit: false
                  }, {
                    default: withCtx(({ index }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ObjectElement, { name: index }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "label_position",
                                tag: "p",
                                content: "<div> Position </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "position",
                                tag: "p",
                                content: (_b = (_a = unref(application).application_form.workExperienceInformation) == null ? void 0 : _a[index]) == null ? void 0 : _b.position,
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "label_company",
                                tag: "p",
                                content: "<div> Company/Employer Name </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "company",
                                tag: "p",
                                content: (_d = (_c = unref(application).application_form.workExperienceInformation) == null ? void 0 : _c[index]) == null ? void 0 : _d["company/employerName"],
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "label_duties",
                                tag: "p",
                                content: "<div> Duties Description </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "duties",
                                tag: "p",
                                content: (_f = (_e = unref(application).application_form.workExperienceInformation) == null ? void 0 : _e[index]) == null ? void 0 : _f.dutiesDescription,
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "label_contact",
                                tag: "p",
                                content: "<div> Manager/HR Contact </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "contact",
                                tag: "p",
                                content: (_h = (_g = unref(application).application_form.workExperienceInformation) == null ? void 0 : _g[index]) == null ? void 0 : _h["company/employerContact"],
                                columns: { container: 6 },
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_StaticElement, {
                                  name: "label_position",
                                  tag: "p",
                                  content: "<div> Position </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "position",
                                  tag: "p",
                                  content: (_j = (_i = unref(application).application_form.workExperienceInformation) == null ? void 0 : _i[index]) == null ? void 0 : _j.position,
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"]),
                                createVNode(_component_StaticElement, {
                                  name: "label_company",
                                  tag: "p",
                                  content: "<div> Company/Employer Name </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "company",
                                  tag: "p",
                                  content: (_l = (_k = unref(application).application_form.workExperienceInformation) == null ? void 0 : _k[index]) == null ? void 0 : _l["company/employerName"],
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"]),
                                createVNode(_component_StaticElement, {
                                  name: "label_duties",
                                  tag: "p",
                                  content: "<div> Duties Description </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "duties",
                                  tag: "p",
                                  content: (_n = (_m = unref(application).application_form.workExperienceInformation) == null ? void 0 : _m[index]) == null ? void 0 : _n.dutiesDescription,
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"]),
                                createVNode(_component_StaticElement, {
                                  name: "label_contact",
                                  tag: "p",
                                  content: "<div> Manager/HR Contact </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "contact",
                                  tag: "p",
                                  content: (_p = (_o = unref(application).application_form.workExperienceInformation) == null ? void 0 : _o[index]) == null ? void 0 : _p["company/employerContact"],
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (index < unref(application).application_form.workExperienceInformation.length - 1) {
                          _push4(ssrRenderComponent(_component_StaticElement, {
                            name: "divider",
                            tag: "hr",
                            style: { "background-color": "#ccc" }
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_ObjectElement, { name: index }, {
                            default: withCtx(() => {
                              var _a, _b, _c, _d, _e, _f, _g, _h;
                              return [
                                createVNode(_component_StaticElement, {
                                  name: "label_position",
                                  tag: "p",
                                  content: "<div> Position </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "position",
                                  tag: "p",
                                  content: (_b = (_a = unref(application).application_form.workExperienceInformation) == null ? void 0 : _a[index]) == null ? void 0 : _b.position,
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"]),
                                createVNode(_component_StaticElement, {
                                  name: "label_company",
                                  tag: "p",
                                  content: "<div> Company/Employer Name </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "company",
                                  tag: "p",
                                  content: (_d = (_c = unref(application).application_form.workExperienceInformation) == null ? void 0 : _c[index]) == null ? void 0 : _d["company/employerName"],
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"]),
                                createVNode(_component_StaticElement, {
                                  name: "label_duties",
                                  tag: "p",
                                  content: "<div> Duties Description </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "duties",
                                  tag: "p",
                                  content: (_f = (_e = unref(application).application_form.workExperienceInformation) == null ? void 0 : _e[index]) == null ? void 0 : _f.dutiesDescription,
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"]),
                                createVNode(_component_StaticElement, {
                                  name: "label_contact",
                                  tag: "p",
                                  content: "<div> Manager/HR Contact </div>",
                                  columns: { container: 6 },
                                  size: "sm"
                                }),
                                createVNode(_component_StaticElement, {
                                  name: "contact",
                                  tag: "p",
                                  content: (_h = (_g = unref(application).application_form.workExperienceInformation) == null ? void 0 : _g[index]) == null ? void 0 : _h["company/employerContact"],
                                  columns: { container: 6 },
                                  size: "sm"
                                }, null, 8, ["content"])
                              ];
                            }),
                            _: 2
                          }, 1032, ["name"]),
                          index < unref(application).application_form.workExperienceInformation.length - 1 ? (openBlock(), createBlock(_component_StaticElement, {
                            key: 0,
                            name: "divider",
                            tag: "hr",
                            style: { "background-color": "#ccc" }
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_StaticElement, {
                    name: "h3_1",
                    tag: "h3",
                    content: "File Attachments",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ListElement, {
                    default: unref(application).uploaded_files,
                    name: "File Attachments",
                    controls: { add: false, remove: false },
                    submit: false
                  }, {
                    default: withCtx(({ index }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ObjectElement, { name: index }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_StaticElement, {
                                name: "position",
                                tag: "p",
                                content: `
                                <span style=" display: flex;">
                                    <span style="width: 1.5rem; margin-right: 5px; ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </span>
                                    ${unref(application).uploaded_files[index]}
                                </span>`,
                                columns: { container: 9 },
                                size: "sm",
                                "allow-html": true
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ButtonElement, {
                                loading: unref(isDownloading),
                                name: "download",
                                submits: false,
                                columns: {
                                  container: 3
                                },
                                full: true,
                                onClick: ($event) => downloadFile(unref(application).uploaded_files[index])
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span style="${ssrRenderStyle({ "width": "1.5rem", "margin-right": "5px" })}"${_scopeId5}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"${_scopeId5}><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"${_scopeId5}></path></svg></span> Download `);
                                  } else {
                                    return [
                                      createVNode("span", { style: { "width": "1.5rem", "margin-right": "5px" } }, [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          "stroke-width": "1.5",
                                          stroke: "currentColor",
                                          class: "size-6"
                                        }, [
                                          createVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                          })
                                        ]))
                                      ]),
                                      createTextVNode(" Download ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_StaticElement, {
                                  name: "position",
                                  tag: "p",
                                  content: `
                                <span style=" display: flex;">
                                    <span style="width: 1.5rem; margin-right: 5px; ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </span>
                                    ${unref(application).uploaded_files[index]}
                                </span>`,
                                  columns: { container: 9 },
                                  size: "sm",
                                  "allow-html": true
                                }, null, 8, ["content"]),
                                createVNode(_component_ButtonElement, {
                                  loading: unref(isDownloading),
                                  name: "download",
                                  submits: false,
                                  columns: {
                                    container: 3
                                  },
                                  full: true,
                                  onClick: ($event) => downloadFile(unref(application).uploaded_files[index])
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { style: { "width": "1.5rem", "margin-right": "5px" } }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        "stroke-width": "1.5",
                                        stroke: "currentColor",
                                        class: "size-6"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        })
                                      ]))
                                    ]),
                                    createTextVNode(" Download ")
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "onClick"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ObjectElement, { name: index }, {
                            default: withCtx(() => [
                              createVNode(_component_StaticElement, {
                                name: "position",
                                tag: "p",
                                content: `
                                <span style=" display: flex;">
                                    <span style="width: 1.5rem; margin-right: 5px; ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </span>
                                    ${unref(application).uploaded_files[index]}
                                </span>`,
                                columns: { container: 9 },
                                size: "sm",
                                "allow-html": true
                              }, null, 8, ["content"]),
                              createVNode(_component_ButtonElement, {
                                loading: unref(isDownloading),
                                name: "download",
                                submits: false,
                                columns: {
                                  container: 3
                                },
                                full: true,
                                onClick: ($event) => downloadFile(unref(application).uploaded_files[index])
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { style: { "width": "1.5rem", "margin-right": "5px" } }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "1.5",
                                      stroke: "currentColor",
                                      class: "size-6"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                      })
                                    ]))
                                  ]),
                                  createTextVNode(" Download ")
                                ]),
                                _: 2
                              }, 1032, ["loading", "onClick"])
                            ]),
                            _: 2
                          }, 1032, ["name"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_StaticElement, {
                      name: "h3",
                      tag: "h3",
                      content: header,
                      size: "sm",
                      style: { "color": "#1492E6" },
                      bottom: "2",
                      align: "center"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: "<div> Full Name </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.fullName,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: "<div> phoneNumber </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.phoneNumber,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: "<div> Email </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.email,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "workExperience",
                      tag: "p",
                      content: "<div> work experience </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.workExperience,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "p_1",
                      tag: "p",
                      content: "<div> gender </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.gender,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "p_2",
                      tag: "p",
                      content: "<div> languages </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.languages,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "p_3",
                      tag: "p",
                      content: "<div> skill </div>",
                      columns: {
                        container: 4
                      },
                      size: "sm"
                    }),
                    createVNode(_component_StaticElement, {
                      name: "p",
                      tag: "p",
                      content: unref(application).application_form.skill,
                      columns: {
                        container: 8
                      },
                      size: "sm"
                    }, null, 8, ["content"]),
                    createVNode(_component_StaticElement, {
                      name: "h3_1",
                      tag: "h3",
                      content: "Work Experience Information",
                      size: "sm"
                    }),
                    createVNode(_component_ListElement, {
                      default: unref(application).application_form.workExperienceInformation,
                      name: "workExperienceInformation",
                      controls: { add: false, remove: false },
                      submit: false
                    }, {
                      default: withCtx(({ index }) => [
                        createVNode(_component_ObjectElement, { name: index }, {
                          default: withCtx(() => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            return [
                              createVNode(_component_StaticElement, {
                                name: "label_position",
                                tag: "p",
                                content: "<div> Position </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "position",
                                tag: "p",
                                content: (_b = (_a = unref(application).application_form.workExperienceInformation) == null ? void 0 : _a[index]) == null ? void 0 : _b.position,
                                columns: { container: 6 },
                                size: "sm"
                              }, null, 8, ["content"]),
                              createVNode(_component_StaticElement, {
                                name: "label_company",
                                tag: "p",
                                content: "<div> Company/Employer Name </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "company",
                                tag: "p",
                                content: (_d = (_c = unref(application).application_form.workExperienceInformation) == null ? void 0 : _c[index]) == null ? void 0 : _d["company/employerName"],
                                columns: { container: 6 },
                                size: "sm"
                              }, null, 8, ["content"]),
                              createVNode(_component_StaticElement, {
                                name: "label_duties",
                                tag: "p",
                                content: "<div> Duties Description </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "duties",
                                tag: "p",
                                content: (_f = (_e = unref(application).application_form.workExperienceInformation) == null ? void 0 : _e[index]) == null ? void 0 : _f.dutiesDescription,
                                columns: { container: 6 },
                                size: "sm"
                              }, null, 8, ["content"]),
                              createVNode(_component_StaticElement, {
                                name: "label_contact",
                                tag: "p",
                                content: "<div> Manager/HR Contact </div>",
                                columns: { container: 6 },
                                size: "sm"
                              }),
                              createVNode(_component_StaticElement, {
                                name: "contact",
                                tag: "p",
                                content: (_h = (_g = unref(application).application_form.workExperienceInformation) == null ? void 0 : _g[index]) == null ? void 0 : _h["company/employerContact"],
                                columns: { container: 6 },
                                size: "sm"
                              }, null, 8, ["content"])
                            ];
                          }),
                          _: 2
                        }, 1032, ["name"]),
                        index < unref(application).application_form.workExperienceInformation.length - 1 ? (openBlock(), createBlock(_component_StaticElement, {
                          key: 0,
                          name: "divider",
                          tag: "hr",
                          style: { "background-color": "#ccc" }
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["default"]),
                    createVNode(_component_StaticElement, {
                      name: "h3_1",
                      tag: "h3",
                      content: "File Attachments",
                      size: "sm"
                    }),
                    createVNode(_component_ListElement, {
                      default: unref(application).uploaded_files,
                      name: "File Attachments",
                      controls: { add: false, remove: false },
                      submit: false
                    }, {
                      default: withCtx(({ index }) => [
                        createVNode(_component_ObjectElement, { name: index }, {
                          default: withCtx(() => [
                            createVNode(_component_StaticElement, {
                              name: "position",
                              tag: "p",
                              content: `
                                <span style=" display: flex;">
                                    <span style="width: 1.5rem; margin-right: 5px; ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </span>
                                    ${unref(application).uploaded_files[index]}
                                </span>`,
                              columns: { container: 9 },
                              size: "sm",
                              "allow-html": true
                            }, null, 8, ["content"]),
                            createVNode(_component_ButtonElement, {
                              loading: unref(isDownloading),
                              name: "download",
                              submits: false,
                              columns: {
                                container: 3
                              },
                              full: true,
                              onClick: ($event) => downloadFile(unref(application).uploaded_files[index])
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { style: { "width": "1.5rem", "margin-right": "5px" } }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "1.5",
                                    stroke: "currentColor",
                                    class: "size-6"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    })
                                  ]))
                                ]),
                                createTextVNode(" Download ")
                              ]),
                              _: 2
                            }, 1032, ["loading", "onClick"])
                          ]),
                          _: 2
                        }, 1032, ["name"])
                      ]),
                      _: 1
                    }, 8, ["default"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Vueform, null, {
                default: withCtx(() => [
                  createVNode(_component_StaticElement, {
                    name: "h3",
                    tag: "h3",
                    content: header,
                    size: "sm",
                    style: { "color": "#1492E6" },
                    bottom: "2",
                    align: "center"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Full Name </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.fullName,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> phoneNumber </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.phoneNumber,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: "<div> Email </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.email,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "workExperience",
                    tag: "p",
                    content: "<div> work experience </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.workExperience,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "p_1",
                    tag: "p",
                    content: "<div> gender </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.gender,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "p_2",
                    tag: "p",
                    content: "<div> languages </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.languages,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "p_3",
                    tag: "p",
                    content: "<div> skill </div>",
                    columns: {
                      container: 4
                    },
                    size: "sm"
                  }),
                  createVNode(_component_StaticElement, {
                    name: "p",
                    tag: "p",
                    content: unref(application).application_form.skill,
                    columns: {
                      container: 8
                    },
                    size: "sm"
                  }, null, 8, ["content"]),
                  createVNode(_component_StaticElement, {
                    name: "h3_1",
                    tag: "h3",
                    content: "Work Experience Information",
                    size: "sm"
                  }),
                  createVNode(_component_ListElement, {
                    default: unref(application).application_form.workExperienceInformation,
                    name: "workExperienceInformation",
                    controls: { add: false, remove: false },
                    submit: false
                  }, {
                    default: withCtx(({ index }) => [
                      createVNode(_component_ObjectElement, { name: index }, {
                        default: withCtx(() => {
                          var _a, _b, _c, _d, _e, _f, _g, _h;
                          return [
                            createVNode(_component_StaticElement, {
                              name: "label_position",
                              tag: "p",
                              content: "<div> Position </div>",
                              columns: { container: 6 },
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "position",
                              tag: "p",
                              content: (_b = (_a = unref(application).application_form.workExperienceInformation) == null ? void 0 : _a[index]) == null ? void 0 : _b.position,
                              columns: { container: 6 },
                              size: "sm"
                            }, null, 8, ["content"]),
                            createVNode(_component_StaticElement, {
                              name: "label_company",
                              tag: "p",
                              content: "<div> Company/Employer Name </div>",
                              columns: { container: 6 },
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "company",
                              tag: "p",
                              content: (_d = (_c = unref(application).application_form.workExperienceInformation) == null ? void 0 : _c[index]) == null ? void 0 : _d["company/employerName"],
                              columns: { container: 6 },
                              size: "sm"
                            }, null, 8, ["content"]),
                            createVNode(_component_StaticElement, {
                              name: "label_duties",
                              tag: "p",
                              content: "<div> Duties Description </div>",
                              columns: { container: 6 },
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "duties",
                              tag: "p",
                              content: (_f = (_e = unref(application).application_form.workExperienceInformation) == null ? void 0 : _e[index]) == null ? void 0 : _f.dutiesDescription,
                              columns: { container: 6 },
                              size: "sm"
                            }, null, 8, ["content"]),
                            createVNode(_component_StaticElement, {
                              name: "label_contact",
                              tag: "p",
                              content: "<div> Manager/HR Contact </div>",
                              columns: { container: 6 },
                              size: "sm"
                            }),
                            createVNode(_component_StaticElement, {
                              name: "contact",
                              tag: "p",
                              content: (_h = (_g = unref(application).application_form.workExperienceInformation) == null ? void 0 : _g[index]) == null ? void 0 : _h["company/employerContact"],
                              columns: { container: 6 },
                              size: "sm"
                            }, null, 8, ["content"])
                          ];
                        }),
                        _: 2
                      }, 1032, ["name"]),
                      index < unref(application).application_form.workExperienceInformation.length - 1 ? (openBlock(), createBlock(_component_StaticElement, {
                        key: 0,
                        name: "divider",
                        tag: "hr",
                        style: { "background-color": "#ccc" }
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["default"]),
                  createVNode(_component_StaticElement, {
                    name: "h3_1",
                    tag: "h3",
                    content: "File Attachments",
                    size: "sm"
                  }),
                  createVNode(_component_ListElement, {
                    default: unref(application).uploaded_files,
                    name: "File Attachments",
                    controls: { add: false, remove: false },
                    submit: false
                  }, {
                    default: withCtx(({ index }) => [
                      createVNode(_component_ObjectElement, { name: index }, {
                        default: withCtx(() => [
                          createVNode(_component_StaticElement, {
                            name: "position",
                            tag: "p",
                            content: `
                                <span style=" display: flex;">
                                    <span style="width: 1.5rem; margin-right: 5px; ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </span>
                                    ${unref(application).uploaded_files[index]}
                                </span>`,
                            columns: { container: 9 },
                            size: "sm",
                            "allow-html": true
                          }, null, 8, ["content"]),
                          createVNode(_component_ButtonElement, {
                            loading: unref(isDownloading),
                            name: "download",
                            submits: false,
                            columns: {
                              container: 3
                            },
                            full: true,
                            onClick: ($event) => downloadFile(unref(application).uploaded_files[index])
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { style: { "width": "1.5rem", "margin-right": "5px" } }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor",
                                  class: "size-6"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                  })
                                ]))
                              ]),
                              createTextVNode(" Download ")
                            ]),
                            _: 2
                          }, 1032, ["loading", "onClick"])
                        ]),
                        _: 2
                      }, 1032, ["name"])
                    ]),
                    _: 1
                  }, 8, ["default"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/modal/viewVacancyApplication.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useBlogStore = defineStore("blogStore", () => {
  const page = ref(1);
  const perPage = ref(10);
  const blogPosts = ref([]);
  return {
    page,
    perPage,
    blogPosts
  };
});
const _sfc_main$3 = {
  __name: "updateBlog",
  __ssrInlineRender: true,
  setup(__props) {
    const { any_open_modal } = useUtilStore();
    const { blogPosts } = storeToRefs(useBlogStore());
    const blogPost = any_open_modal.AnythingTopass;
    const updateBlog = async (FormD, form$) => {
      function extractFirstWords(html, wordCount = 20) {
        let tempElement = (void 0).createElement("div");
        tempElement.innerHTML = html;
        let text = tempElement.textContent || tempElement.innerText || "";
        let words = text.trim().split(/\s+/).slice(0, wordCount);
        return words.join(" ");
      }
      if (form$.data.content) FormD.append("content_short", extractFirstWords(form$.data.content));
      try {
        const { data } = await $fetch(`/api/blog/${blogPost.id}`, {
          method: "PATCH",
          headers: {
            apiref: "/api/blog/[id]/PATCH"
          },
          body: FormD
        });
        const index = blogPosts.value.findIndex((v) => v.id === blogPost.id);
        if (index !== -1) {
          const updatedblogPosts = [...blogPosts.value];
          updatedblogPosts[index] = data[0];
          blogPosts.value = updatedblogPosts;
        }
        frontEndErrorFeedback().success("blog updated successfully");
      } catch (error) {
        frontEndErrorFeedback().err(error, "vueForm");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_Vueform = resolveComponent("Vueform");
      const _component_StaticElement = resolveComponent("StaticElement");
      const _component_TextElement = resolveComponent("TextElement");
      const _component_EditorElement = resolveComponent("EditorElement");
      const _component_TagsElement = resolveComponent("TagsElement");
      const _component_FileElement = resolveComponent("FileElement");
      const _component_ButtonElement = resolveComponent("ButtonElement");
      _push(ssrRenderComponent(_component_Overlay, _attrs, {
        container: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Vueform, {
                    endpoint: updateBlog,
                    default: unref(blogPost)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_StaticElement, {
                        name: "h3",
                        tag: "h3",
                        content: "Update Blog Post",
                        style: { "color": "#1492E6" },
                        bottom: "2"
                      }),
                      createVNode(_component_TextElement, {
                        name: "title",
                        label: "title",
                        info: "blog title"
                      }),
                      createVNode(_component_EditorElement, {
                        name: "content",
                        label: "content",
                        info: "blog content"
                      }),
                      createVNode(_component_TagsElement, {
                        name: "category",
                        "close-on-select": false,
                        search: true,
                        items: [
                          {
                            value: "news",
                            label: "news"
                          },
                          {
                            value: "info",
                            label: "info"
                          },
                          {
                            value: "social",
                            label: "social"
                          },
                          {
                            value: "event",
                            label: "event"
                          }
                        ],
                        label: "category",
                        "input-type": "search",
                        autocomplete: "off",
                        info: "blog category",
                        create: false
                      }),
                      createVNode(_component_FileElement, {
                        name: "coverImg",
                        label: "coverImg",
                        "preview-url": `/blog/`,
                        urls: {},
                        info: "blog cover Img",
                        drop: true,
                        accept: "image/*",
                        view: "image",
                        clickable: true,
                        url: `/blog/`,
                        "upload-temp-endpoint": false
                      }),
                      createVNode(_component_ButtonElement, {
                        name: "post",
                        "button-label": "Update Blog Post",
                        submits: true,
                        size: "sm",
                        columns: {
                          container: 12
                        }
                      })
                    ]),
                    _: 1
                  }, 8, ["default"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/modal/updateBlog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const { global_vue_easy_lightbox, any_open_modal } = useUtilStore();
    const { onhide } = useLightBox();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0$1;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_2;
      const _component_ModalBlogPost = __nuxt_component_3;
      const _component_ModalProductShow = __nuxt_component_4;
      const _component_ModalApplyVacancy = __nuxt_component_5;
      const _component_DashboardModalUpdateVacancy = _sfc_main$5;
      const _component_DashboardModalViewVacancyApplication = _sfc_main$4;
      const _component_DashboardModalUpdateBlog = _sfc_main$3;
      const _component_VueEasyLightbox = resolveComponent("VueEasyLightbox");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(any_open_modal).bool && unref(any_open_modal).id === "blogModal") {
        _push(ssrRenderComponent(_component_ModalBlogPost, {
          "blog-post": unref(any_open_modal).AnythingTopass
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(any_open_modal).bool && unref(any_open_modal).id === "productModal") {
        _push(ssrRenderComponent(_component_ModalProductShow, {
          "product-data": unref(any_open_modal).AnythingTopass
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(any_open_modal).bool && unref(any_open_modal).id === "applyVacancyModal") {
        _push(ssrRenderComponent(_component_ModalApplyVacancy, {
          vacancy: unref(any_open_modal).AnythingTopass
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(any_open_modal).bool && unref(any_open_modal).id === "updateVacancy") {
        _push(ssrRenderComponent(_component_DashboardModalUpdateVacancy, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(any_open_modal).bool && unref(any_open_modal).id === "ViewVacancyApplication") {
        _push(ssrRenderComponent(_component_DashboardModalViewVacancyApplication, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(any_open_modal).bool && unref(any_open_modal).id === "updateBlog") {
        _push(ssrRenderComponent(_component_DashboardModalUpdateBlog, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_VueEasyLightbox, {
        index: unref(global_vue_easy_lightbox).imgIndex,
        onHide: unref(onhide),
        maxZoom: 4,
        "scroll-disabled": false,
        loop: true,
        visible: unref(global_vue_easy_lightbox).display,
        imgs: unref(global_vue_easy_lightbox).imgs
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BMROTPP0.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-B33njbPx.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a = nuxt.payload).error || (_a.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { Me as M, _export_sfc as _, useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, useUtilStore as d, entry$1 as default, useBlogStore as e, frontEndErrorFeedback as f, __nuxt_component_0$2 as g, asyncDataDefaults as h, createError as i, fetchDefaults as j, useRequestFetch as k, _imports_0 as l, useLightBox as m, navigateTo as n, useVacancyStore as o, defineNuxtRouteMiddleware as p, useCookie as q, resolveRouteObject as r, tryUseNuxtApp as t, useRouter as u };
//# sourceMappingURL=server.mjs.map
