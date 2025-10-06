import { useSSRContext, ref, resolveComponent, resolveDirective, defineComponent, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, mergeProps, createTextVNode, computed, createElementBlock, provide, renderSlot, watch, normalizeClass, inject, defineAsyncComponent, onBeforeMount, onMounted, createElementVNode, normalizeStyle, Fragment, renderList, toDisplayString, Transition, withDirectives, vShow } from 'vue';
import { g as __nuxt_component_0$2, f as frontEndErrorFeedback, u as useRouter } from './server.mjs';
import { P } from './MazBtn.CQ7scMZT-BtqFd9DC.mjs';
import { ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
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
import 'pinia';
import 'vue-router';
import 'date-fns';
import 'v-dialogs';

const v$1 = { class: "m-tabs m-reset-css" }, T = /* @__PURE__ */ defineComponent({
  __name: "MazTabs",
  props: {
    modelValue: {}
  },
  emits: ["update:model-value"],
  setup(o, { emit: s }) {
    const l = o, r = s, t = ref(1), a = computed({
      get: () => {
        var _a;
        return (_a = l.modelValue) != null ? _a : t.value;
      },
      set: (e) => {
        t.value = e, r("update:model-value", e);
      }
    });
    function u(e) {
      return a.value = e, e;
    }
    return provide("maz-tabs", {
      currentTab: a,
      updateCurrentTab: u
    }), (e, _) => (openBlock(), createElementBlock("div", v$1, [
      renderSlot(e.$slots, "default")
    ]));
  }
});
function F(n) {
  return new Promise((o) => setTimeout(o, n));
}
function G(n, o) {
  const l = inject(n, o);
  if (!l)
    throw new TypeError(`[maz-ui](injectStrict) Could not resolve ${n.toString()}`);
  return l;
}
const J = ["disabled", "onClick"], K = /* @__PURE__ */ defineComponent({
  __name: "MazTabsBar",
  props: {
    items: {},
    persistent: { type: Boolean },
    queryParam: { default: "tab" },
    block: { type: Boolean },
    noElevation: { type: Boolean },
    autoScroll: { type: Boolean, default: true }
  },
  setup(n) {
    const o = n, l = defineAsyncComponent(() => import('./MazBadge.AdlIDWRs-CFG47w_q.mjs')), { currentTab: r, updateCurrentTab: c } = G("maz-tabs");
    function L(e) {
      c(e + 1), o.persistent && $(e + 1);
    }
    const g = ref(), m = ref([]);
    function y2(e) {
      return r.value === e + 1;
    }
    function T2({
      mazBtn: e,
      index: t
    }) {
      m.value[t] = e && "$el" in e ? e.$el : e;
    }
    const i = computed(
      () => o.items.map((e) => {
        var _a;
        return {
          label: typeof e == "string" ? e : e.label,
          disabled: typeof e == "string" ? false : (_a = e.disabled) != null ? _a : false,
          badge: typeof e == "string" ? void 0 : e.badge
        };
      })
    ), h2 = ref(), b = ref(false);
    async function _() {
      var _a, _b, _c;
      if (!o.autoScroll)
        return;
      await F(150);
      const e = g.value, t = m.value[r.value - 1];
      if (!e || !t)
        return;
      const a = 50;
      if (t.offsetLeft - a < e.scrollLeft || t.offsetLeft + t.offsetWidth > e.scrollLeft + e.clientWidth) {
        const A = (void 0).getComputedStyle(e, "padding-left").paddingLeft, E = Number(A.slice(0, -2));
        e.scrollTo({
          left: t.offsetLeft - E - a,
          behavior: b.value ? "smooth" : "instant"
        });
      }
      if (typeof r.value != "number")
        return;
      const s = (_a = t == null ? void 0 : t.offsetWidth) != null ? _a : 0, u = (_b = t == null ? void 0 : t.offsetHeight) != null ? _b : 0, M2 = (_c = t == null ? void 0 : t.offsetLeft) != null ? _c : 0;
      h2.value = {
        transform: `translateX(${M2}px)`,
        width: `${s}px`,
        height: `${u}px`
      }, b.value = true;
    }
    function C(e, t) {
      return t ? {} : r.value === e + 1 ? "color: var(--maz-color-text)" : "color: var(--maz-color-muted)";
    }
    onBeforeMount(() => {
      (r.value < 1 || r.value > i.value.length) && console.error(
        `[maz-ui](MazTabsBar) The model-value should be between 1 and ${i.value.length}`
      );
    }), onMounted(() => {
      (o.persistent || r.value) && _();
    }), watch(
      () => [r.value, i.value],
      () => {
        _();
      }
    );
    function P2() {
      const e = new URL((void 0).location.href);
      return Number(e.searchParams.get(o.queryParam));
    }
    function $(e) {
      const t = new URL((void 0).location.href);
      t.searchParams.set(o.queryParam, String(e)), (void 0).history.replaceState({}, (void 0).title, t.toString());
    }
    return onMounted(() => {
      o.persistent && c(P2() || r.value || 1);
    }), (e, t) => (openBlock(), createElementBlock(
      "div",
      {
        ref_key: "tabsBarRef",
        ref: g,
        class: normalizeClass(["m-tabs-bar m-reset-css", {
          "--block": e.block,
          "--elevation": !e.noElevation
        }])
      },
      [
        createElementVNode(
          "div",
          {
            class: normalizeClass(["m-tabs-bar__indicator", { "--animated": b.value }]),
            style: normalizeStyle([h2.value])
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(i.value, (a, s) => (openBlock(), createElementBlock("button", {
            key: s,
            ref_for: true,
            ref: (u) => T2({ mazBtn: u, index: s }),
            class: normalizeClass([{ "--active": y2(s), "--disabled": a.disabled }, "m-tabs-bar__item"]),
            disabled: a.disabled,
            style: normalizeStyle(C(s, a.disabled)),
            onClick: (u) => a.disabled ? void 0 : L(s)
          }, [
            renderSlot(e.$slots, "item", {
              item: a,
              active: y2(s),
              index: s
            }, () => {
              var _a;
              return [
                createTextVNode(
                  toDisplayString(a.label) + " ",
                  1
                  /* TEXT */
                ),
                a.badge ? (openBlock(), createBlock(unref(l), {
                  key: 0,
                  color: a.badge.color,
                  pastel: a.badge.pastel,
                  outline: a.badge.outline,
                  "rounded-size": a.badge.roundedSize,
                  size: (_a = a.badge.size) != null ? _a : "0.7rem",
                  class: "m-tabs-bar__item__badge"
                }, {
                  default: withCtx(() => [
                    renderSlot(e.$slots, "badge-content", {
                      content: a.badge.content
                    }, () => [
                      createTextVNode(
                        toDisplayString(a.badge.content),
                        1
                        /* TEXT */
                      )
                    ], true)
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["color", "pastel", "outline", "rounded-size", "size"])) : createCommentVNode("v-if", true)
              ];
            }, true)
          ], 14, J))),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    ));
  }
}), Y = (n, o) => {
  const l = n.__vccOpts || n;
  for (const [r, c] of o)
    l[r] = c;
  return l;
}, x = /* @__PURE__ */ Y(K, [["__scopeId", "data-v-004686b3"]]);
function v(n, e) {
  let t;
  return function(...o) {
    clearTimeout(t), t = setTimeout(() => {
      n.apply(this, o);
    }, e);
  };
}
function p(n, e) {
  const t = inject(n, e);
  if (!t)
    throw new TypeError(`[maz-ui](injectStrict) Could not resolve ${n.toString()}`);
  return t;
}
const h = /* @__PURE__ */ defineComponent({
  __name: "MazTabsContent",
  setup(n) {
    const e = ref(false), { currentTab: t } = p("maz-tabs"), o = v(() => {
      e.value = false;
    }, 700);
    function r() {
      e.value = true, o();
    }
    return watch(
      () => t.value,
      () => r(),
      { immediate: true }
    ), (a, w) => (openBlock(), createElementBlock(
      "div",
      {
        class: normalizeClass(["m-tabs-content m-reset-css maz-relative", { "maz-overflow-hidden": e.value }])
      },
      [
        renderSlot(a.$slots, "default")
      ],
      2
      /* CLASS */
    ));
  }
});
function I(e, n) {
  const t = inject(e, n);
  if (!t)
    throw new TypeError(`[maz-ui](injectStrict) Could not resolve ${e.toString()}`);
  return t;
}
const y = /* @__PURE__ */ defineComponent({
  __name: "MazTabsContentItem",
  props: {
    tab: { type: Number, required: true }
  },
  setup(e) {
    const n = e, t = ref("maz-tab-transition"), o = ref(), { currentTab: r } = I("maz-tabs");
    watch(
      () => r.value,
      (a, s) => {
        if (typeof a == "number" && typeof s == "number") {
          const b = s < a;
          t.value = b ? "maz-tab-transition" : "maz-tab-reverse-transition";
        }
      },
      { immediate: true }
    );
    const m = computed(() => n.tab - 1), u = computed(() => r.value - 1 === m.value);
    return (a, s) => (openBlock(), createBlock(Transition, {
      name: t.value,
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode(
          "div",
          {
            ref_key: "MazTabsContentItem",
            ref: o,
            class: "m-tabs-content-item m-reset-css"
          },
          [
            renderSlot(a.$slots, "default", {}, void 0, true)
          ],
          512
          /* NEED_PATCH */
        ), [
          [vShow, u.value]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]));
  }
}), S = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, r] of n)
    t[o] = r;
  return t;
}, M = /* @__PURE__ */ S(y, [["__scopeId", "data-v-89ecbfa6"]]);
const _sfc_main = {
  setup(__props) {
    const tabs = ref(["Account", "PhoneNumber", "email", "Password"]);
    const activetab = ref(1);
    const loggedInUser = useAuthStore().loggedInUser;
    const updateAccount = async (FormD, form$) => {
      try {
        const obj = Object.fromEntries(FormD.entries());
        const filteredObj = Object.fromEntries(
          Object.entries(obj).filter(([_, value]) => value !== "" && value != null)
        );
        const cleanFormData = new FormData();
        Object.entries(filteredObj).forEach(([key, value]) => {
          cleanFormData.append(key, value);
        });
        const { data } = await $fetch("/api/user/me", {
          method: "PATCH",
          body: cleanFormData,
          headers: {
            apiref: "/api/user/me/PATCH"
          }
        });
        useAuthStore().loggedInUser = data;
        frontEndErrorFeedback().success("profile updated successefully");
      } catch (error) {
        frontEndErrorFeedback().err(error);
      }
    };
    const updatePhoneNumber = async (FormD, form$) => {
      try {
        const { data } = await $fetch("/api/user/updatePhoneNumber", {
          method: "PATCH",
          body: form$.data,
          headers: {
            apiref: "/api/user/updatePhoneNumber/PATCH"
          }
        });
        useAuthStore().loggedInUser = data;
        frontEndErrorFeedback().success("PhoneNumber updated successefully");
      } catch (error) {
        frontEndErrorFeedback().err(error);
      }
    };
    const updateEmail = async (FormD, form$) => {
      try {
        const { data } = await $fetch("/api/user/updateEmail", {
          method: "PATCH",
          body: form$.data,
          headers: {
            apiref: "/api/user/updateEmail/PATCH"
          }
        });
        useAuthStore().loggedInUser = data;
        frontEndErrorFeedback().success("Email updated successefully");
      } catch (error) {
        frontEndErrorFeedback().err(error);
      }
    };
    const updatePassword = async (FormD, form$) => {
      try {
        const { data } = await $fetch("/api/user/updatePassword", {
          method: "PATCH",
          body: form$.data,
          headers: {
            apiref: "/api/user/updatePassword/PATCH"
          }
        });
        useAuthStore().loggedInUser = data;
        frontEndErrorFeedback().success("password updated successefully");
      } catch (error) {
        frontEndErrorFeedback().err(error);
      }
    };
    const logout = async () => {
      try {
        await $fetch("/api/user/logOut", {
          method: "POST",
          headers: {
            apiref: "/api/user/logOut/POST"
          }
        });
        useAuthStore().loggedInUser = null;
        useRouter().push({ name: "auth" });
      } catch (error) {
        frontEndErrorFeedback().err(error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MazTabs = T;
      const _component_MazTabsBar = x;
      const _component_MazTabsContent = h;
      const _component_MazTabsContentItem = M;
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_Vueform = resolveComponent("Vueform");
      const _component_TextElement = resolveComponent("TextElement");
      const _component_FileElement = resolveComponent("FileElement");
      const _component_ButtonElement = resolveComponent("ButtonElement");
      const _component_PhoneElement = resolveComponent("PhoneElement");
      const _component_MazBtn = P;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[--><div class="container" data-v-22e19b1d>`);
      _push(ssrRenderComponent(_component_MazTabs, {
        class: "tabs-container",
        "onUpdate:modelValue": ($event) => activetab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_MazTabsBar, {
              items: unref(tabs),
              class: "tabs_bar"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MazTabsContent, { class: "tabs-content-container" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_MazTabsContentItem, {
                    tab: 1,
                    class: "maz-py-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(activetab) == 1) {
                          _push4(ssrRenderComponent(_component_ClientOnly, null, {}, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(activetab) == 1 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_Vueform, { endpoint: updateAccount }, {
                                default: withCtx(() => [
                                  createVNode(_component_TextElement, {
                                    label: "userName",
                                    name: "userName",
                                    columns: {
                                      container: 8
                                    },
                                    rules: [
                                      "nullable"
                                    ],
                                    "field-name": "userName",
                                    default: unref(loggedInUser).userName
                                  }, null, 8, ["default"]),
                                  createVNode(_component_FileElement, {
                                    name: "avatar",
                                    label: "profile picture",
                                    accept: "image/*",
                                    view: "image",
                                    rules: [
                                      "nullable",
                                      "mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff"
                                    ],
                                    drop: true,
                                    columns: {
                                      container: 8
                                    },
                                    urls: {},
                                    "upload-temp-endpoint": false
                                  }),
                                  createVNode(_component_ButtonElement, {
                                    name: "submit",
                                    "button-label": "update my account info",
                                    submits: true,
                                    columns: {
                                      container: 8
                                    },
                                    align: "center",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_MazTabsContentItem, {
                    tab: 2,
                    class: "maz-py-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(activetab) == 2) {
                          _push4(ssrRenderComponent(_component_ClientOnly, null, {}, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(activetab) == 2 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_Vueform, { endpoint: updatePhoneNumber }, {
                                default: withCtx(() => [
                                  createVNode(_component_PhoneElement, {
                                    name: "newPhoneNumber",
                                    label: "phoneNumber",
                                    "allow-incomplete": true,
                                    unmask: true,
                                    rules: [
                                      "required"
                                    ],
                                    columns: {
                                      container: 8
                                    },
                                    default: unref(loggedInUser).phoneNumber
                                  }, null, 8, ["default"]),
                                  createVNode(_component_TextElement, {
                                    name: "userPassword",
                                    "input-type": "password",
                                    label: "userPassword",
                                    columns: {
                                      container: 8
                                    },
                                    rules: [
                                      "required"
                                    ]
                                  }),
                                  createVNode(_component_ButtonElement, {
                                    name: "submit",
                                    "button-label": "update phoneNumber",
                                    submits: true,
                                    columns: {
                                      container: 8
                                    },
                                    align: "center",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_MazTabsContentItem, {
                    tab: 3,
                    class: "maz-py-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(activetab) == 3) {
                          _push4(ssrRenderComponent(_component_ClientOnly, null, {}, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(activetab) == 3 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_Vueform, { endpoint: updateEmail }, {
                                default: withCtx(() => [
                                  createVNode(_component_TextElement, {
                                    name: "email",
                                    "input-type": "email",
                                    rules: [
                                      "required",
                                      "email"
                                    ],
                                    label: "Email",
                                    columns: {
                                      container: 8
                                    },
                                    default: unref(loggedInUser).email
                                  }, null, 8, ["default"]),
                                  createVNode(_component_TextElement, {
                                    name: "userPassword",
                                    "input-type": "password",
                                    label: "userPassword",
                                    columns: {
                                      container: 8
                                    },
                                    rules: [
                                      "required"
                                    ]
                                  }),
                                  createVNode(_component_ButtonElement, {
                                    name: "submit",
                                    "button-label": "update Account Email",
                                    submits: true,
                                    columns: {
                                      container: 8
                                    },
                                    align: "center",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_MazTabsContentItem, {
                    tab: 4,
                    class: "maz-py-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(activetab) == 4) {
                          _push4(ssrRenderComponent(_component_ClientOnly, null, {}, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(activetab) == 4 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_Vueform, { endpoint: updatePassword }, {
                                default: withCtx(() => [
                                  createVNode(_component_TextElement, {
                                    name: "userPassword",
                                    "input-type": "password",
                                    label: "current userPassword",
                                    columns: {
                                      container: 8
                                    },
                                    rules: [
                                      "required"
                                    ]
                                  }),
                                  createVNode(_component_TextElement, {
                                    name: "newPassword",
                                    "input-type": "password",
                                    label: "newPassword",
                                    columns: {
                                      container: 8
                                    },
                                    rules: [
                                      "required"
                                    ]
                                  }),
                                  createVNode(_component_ButtonElement, {
                                    name: "submit",
                                    "button-label": "update Account password",
                                    submits: true,
                                    columns: {
                                      container: 8
                                    },
                                    align: "center",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_MazTabsContentItem, {
                      tab: 1,
                      class: "maz-py-4"
                    }, {
                      default: withCtx(() => [
                        unref(activetab) == 1 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_Vueform, { endpoint: updateAccount }, {
                              default: withCtx(() => [
                                createVNode(_component_TextElement, {
                                  label: "userName",
                                  name: "userName",
                                  columns: {
                                    container: 8
                                  },
                                  rules: [
                                    "nullable"
                                  ],
                                  "field-name": "userName",
                                  default: unref(loggedInUser).userName
                                }, null, 8, ["default"]),
                                createVNode(_component_FileElement, {
                                  name: "avatar",
                                  label: "profile picture",
                                  accept: "image/*",
                                  view: "image",
                                  rules: [
                                    "nullable",
                                    "mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff"
                                  ],
                                  drop: true,
                                  columns: {
                                    container: 8
                                  },
                                  urls: {},
                                  "upload-temp-endpoint": false
                                }),
                                createVNode(_component_ButtonElement, {
                                  name: "submit",
                                  "button-label": "update my account info",
                                  submits: true,
                                  columns: {
                                    container: 8
                                  },
                                  align: "center",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_MazTabsContentItem, {
                      tab: 2,
                      class: "maz-py-4"
                    }, {
                      default: withCtx(() => [
                        unref(activetab) == 2 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_Vueform, { endpoint: updatePhoneNumber }, {
                              default: withCtx(() => [
                                createVNode(_component_PhoneElement, {
                                  name: "newPhoneNumber",
                                  label: "phoneNumber",
                                  "allow-incomplete": true,
                                  unmask: true,
                                  rules: [
                                    "required"
                                  ],
                                  columns: {
                                    container: 8
                                  },
                                  default: unref(loggedInUser).phoneNumber
                                }, null, 8, ["default"]),
                                createVNode(_component_TextElement, {
                                  name: "userPassword",
                                  "input-type": "password",
                                  label: "userPassword",
                                  columns: {
                                    container: 8
                                  },
                                  rules: [
                                    "required"
                                  ]
                                }),
                                createVNode(_component_ButtonElement, {
                                  name: "submit",
                                  "button-label": "update phoneNumber",
                                  submits: true,
                                  columns: {
                                    container: 8
                                  },
                                  align: "center",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_MazTabsContentItem, {
                      tab: 3,
                      class: "maz-py-4"
                    }, {
                      default: withCtx(() => [
                        unref(activetab) == 3 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_Vueform, { endpoint: updateEmail }, {
                              default: withCtx(() => [
                                createVNode(_component_TextElement, {
                                  name: "email",
                                  "input-type": "email",
                                  rules: [
                                    "required",
                                    "email"
                                  ],
                                  label: "Email",
                                  columns: {
                                    container: 8
                                  },
                                  default: unref(loggedInUser).email
                                }, null, 8, ["default"]),
                                createVNode(_component_TextElement, {
                                  name: "userPassword",
                                  "input-type": "password",
                                  label: "userPassword",
                                  columns: {
                                    container: 8
                                  },
                                  rules: [
                                    "required"
                                  ]
                                }),
                                createVNode(_component_ButtonElement, {
                                  name: "submit",
                                  "button-label": "update Account Email",
                                  submits: true,
                                  columns: {
                                    container: 8
                                  },
                                  align: "center",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_MazTabsContentItem, {
                      tab: 4,
                      class: "maz-py-4"
                    }, {
                      default: withCtx(() => [
                        unref(activetab) == 4 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_Vueform, { endpoint: updatePassword }, {
                              default: withCtx(() => [
                                createVNode(_component_TextElement, {
                                  name: "userPassword",
                                  "input-type": "password",
                                  label: "current userPassword",
                                  columns: {
                                    container: 8
                                  },
                                  rules: [
                                    "required"
                                  ]
                                }),
                                createVNode(_component_TextElement, {
                                  name: "newPassword",
                                  "input-type": "password",
                                  label: "newPassword",
                                  columns: {
                                    container: 8
                                  },
                                  rules: [
                                    "required"
                                  ]
                                }),
                                createVNode(_component_ButtonElement, {
                                  name: "submit",
                                  "button-label": "update Account password",
                                  submits: true,
                                  columns: {
                                    container: 8
                                  },
                                  align: "center",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_MazTabsBar, {
                items: unref(tabs),
                class: "tabs_bar"
              }, null, 8, ["items"]),
              createVNode(_component_MazTabsContent, { class: "tabs-content-container" }, {
                default: withCtx(() => [
                  createVNode(_component_MazTabsContentItem, {
                    tab: 1,
                    class: "maz-py-4"
                  }, {
                    default: withCtx(() => [
                      unref(activetab) == 1 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_Vueform, { endpoint: updateAccount }, {
                            default: withCtx(() => [
                              createVNode(_component_TextElement, {
                                label: "userName",
                                name: "userName",
                                columns: {
                                  container: 8
                                },
                                rules: [
                                  "nullable"
                                ],
                                "field-name": "userName",
                                default: unref(loggedInUser).userName
                              }, null, 8, ["default"]),
                              createVNode(_component_FileElement, {
                                name: "avatar",
                                label: "profile picture",
                                accept: "image/*",
                                view: "image",
                                rules: [
                                  "nullable",
                                  "mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff"
                                ],
                                drop: true,
                                columns: {
                                  container: 8
                                },
                                urls: {},
                                "upload-temp-endpoint": false
                              }),
                              createVNode(_component_ButtonElement, {
                                name: "submit",
                                "button-label": "update my account info",
                                submits: true,
                                columns: {
                                  container: 8
                                },
                                align: "center",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_MazTabsContentItem, {
                    tab: 2,
                    class: "maz-py-4"
                  }, {
                    default: withCtx(() => [
                      unref(activetab) == 2 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_Vueform, { endpoint: updatePhoneNumber }, {
                            default: withCtx(() => [
                              createVNode(_component_PhoneElement, {
                                name: "newPhoneNumber",
                                label: "phoneNumber",
                                "allow-incomplete": true,
                                unmask: true,
                                rules: [
                                  "required"
                                ],
                                columns: {
                                  container: 8
                                },
                                default: unref(loggedInUser).phoneNumber
                              }, null, 8, ["default"]),
                              createVNode(_component_TextElement, {
                                name: "userPassword",
                                "input-type": "password",
                                label: "userPassword",
                                columns: {
                                  container: 8
                                },
                                rules: [
                                  "required"
                                ]
                              }),
                              createVNode(_component_ButtonElement, {
                                name: "submit",
                                "button-label": "update phoneNumber",
                                submits: true,
                                columns: {
                                  container: 8
                                },
                                align: "center",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_MazTabsContentItem, {
                    tab: 3,
                    class: "maz-py-4"
                  }, {
                    default: withCtx(() => [
                      unref(activetab) == 3 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_Vueform, { endpoint: updateEmail }, {
                            default: withCtx(() => [
                              createVNode(_component_TextElement, {
                                name: "email",
                                "input-type": "email",
                                rules: [
                                  "required",
                                  "email"
                                ],
                                label: "Email",
                                columns: {
                                  container: 8
                                },
                                default: unref(loggedInUser).email
                              }, null, 8, ["default"]),
                              createVNode(_component_TextElement, {
                                name: "userPassword",
                                "input-type": "password",
                                label: "userPassword",
                                columns: {
                                  container: 8
                                },
                                rules: [
                                  "required"
                                ]
                              }),
                              createVNode(_component_ButtonElement, {
                                name: "submit",
                                "button-label": "update Account Email",
                                submits: true,
                                columns: {
                                  container: 8
                                },
                                align: "center",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_MazTabsContentItem, {
                    tab: 4,
                    class: "maz-py-4"
                  }, {
                    default: withCtx(() => [
                      unref(activetab) == 4 ? (openBlock(), createBlock(_component_ClientOnly, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_Vueform, { endpoint: updatePassword }, {
                            default: withCtx(() => [
                              createVNode(_component_TextElement, {
                                name: "userPassword",
                                "input-type": "password",
                                label: "current userPassword",
                                columns: {
                                  container: 8
                                },
                                rules: [
                                  "required"
                                ]
                              }),
                              createVNode(_component_TextElement, {
                                name: "newPassword",
                                "input-type": "password",
                                label: "newPassword",
                                columns: {
                                  container: 8
                                },
                                rules: [
                                  "required"
                                ]
                              }),
                              createVNode(_component_ButtonElement, {
                                name: "submit",
                                "button-label": "update Account password",
                                submits: true,
                                columns: {
                                  container: 8
                                },
                                align: "center",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_MazBtn, mergeProps({
        style: { "position": "absolute", "top": "2rem", "right": "2rem" },
        onClick: logout,
        "rounded-size": "full",
        color: "info",
        size: "xs"
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, { text: "create new user", color: "default" }, void 0, { left: true })), {
        "left-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logout-icon" data-v-22e19b1d${_scopeId}><path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-22e19b1d${_scopeId}></path><path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-22e19b1d${_scopeId}></path><path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-22e19b1d${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                class: "logout-icon"
              }, [
                createVNode("path", {
                  d: "M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }),
                createVNode("path", {
                  d: "M16 17L21 12L16 7",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }),
                createVNode("path", {
                  d: "M21 12H9",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` logout `);
          } else {
            return [
              createTextVNode(" logout ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/user/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { Y };
//# sourceMappingURL=profile-aL465hzv.mjs.map
