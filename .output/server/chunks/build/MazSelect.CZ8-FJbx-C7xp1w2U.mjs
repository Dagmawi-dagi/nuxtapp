import { defineComponent, defineAsyncComponent, ref, computed, onBeforeMount, nextTick, withDirectives, createElementBlock, openBlock, normalizeStyle, normalizeClass, createVNode, mergeProps, unref, withModifiers, withCtx, createElementVNode, Transition, createCommentVNode, createBlock, renderSlot, Fragment, renderList, toDisplayString } from 'vue';
import { o } from './useInstanceUniqId.BkOfxhk8-BqNXuiok.mjs';
import pe$1 from './MazInput.CwPPyy_i-JM6tqVKM.mjs';
import { _ as _e } from './MazTableUi-DJE3g4qh.mjs';

const Oe = {
  removeAccents: true,
  caseSensitive: false,
  replaceSpaces: true,
  removeSpecialCharacters: false,
  trim: true,
  normalizeSpaces: true,
  removeNumbers: false,
  customNormalizationForms: ["NFC", "NFKD"]
};
function x(u, r) {
  const i = { ...Oe, ...r }, t = {
    \u00C0: "A",
    \u00C1: "A",
    \u00C2: "A",
    \u00C3: "A",
    \u00C4: "A",
    \u00C5: "A",
    \u00E0: "a",
    \u00E1: "a",
    \u00E2: "a",
    \u00E3: "a",
    \u00E4: "a",
    \u00E5: "a",
    \u00C8: "E",
    \u00C9: "E",
    \u00CA: "E",
    \u00CB: "E",
    \u00E8: "e",
    \u00E9: "e",
    \u00EA: "e",
    \u00EB: "e",
    \u00CE: "I",
    \u00CF: "I",
    \u00ED: "I",
    \u00EE: "i",
    \u00EF: "i",
    \u00D4: "O",
    \u00D5: "O",
    \u00D6: "O",
    \u00D8: "O",
    \u00F4: "o",
    \u00F5: "o",
    \u00F6: "o",
    \u00F8: "o",
    \u00D9: "U",
    \u00DA: "U",
    \u00DB: "U",
    \u00DC: "U",
    \u00F9: "u",
    \u00FA: "u",
    \u00FB: "u",
    \u00FC: "u",
    \u00C7: "C",
    \u00E7: "c",
    \u00FF: "y",
    \u00D1: "N",
    \u00F1: "n",
    \u00F3: "o"
  };
  let n = u.toString();
  if (i.trim && (n = n.trim()), i.normalizeSpaces && (n = n.replaceAll(/\s+/g, " ")), i.replaceSpaces && (n = n.replaceAll(" ", "-")), i.removeNumbers && (n = n.replaceAll(/\d/g, "")), i.removeAccents && (n = n.replaceAll(/[ÀÁÂÃÄÅÇÈÉÊËÎÏÑÔÕÖØÙÚÛÜàáâãäåçèéêëíîïñóôõöøùúûüÿ]/g, (s) => t[s] || s), n = n.replaceAll(/[\u0300-\u036F]/g, "")), i.caseSensitive === false && (n = n.toLowerCase()), i.removeSpecialCharacters && (n = n.replaceAll(/[^\dA-Z-]/gi, "")), i.trim && (n = n.trim()), i.customNormalizationForms)
    for (const s of i.customNormalizationForms)
      n = n.normalize(s);
  return n;
}
function xe(u, r) {
  const i = u.length, t = r.length, n = [];
  for (let s = 0; s <= i; s++)
    n[s] = [s];
  for (let s = 0; s <= t; s++)
    n[0][s] = s;
  for (let s = 1; s <= i; s++)
    for (let m = 1; m <= t; m++) {
      const z = u[s - 1] === r[m - 1] ? 0 : 1;
      n[s][m] = Math.min(
        n[s - 1][m] + 1,
        n[s][m - 1] + 1,
        n[s - 1][m - 1] + z
      );
    }
  return n[i][t];
}
function de(u, r) {
  const i = xe(u, r), t = Math.max(u.length, r.length);
  return 1 - i / t;
}
function Be(u, r, i = 0.75) {
  return de(u, r) >= i;
}
function Z(u, r, i = 0.75) {
  const t = computed(
    () => x(typeof u == "string" ? u : u.value)
  ), n = computed(
    () => x(typeof r == "string" ? r : r.value)
  ), s = computed(() => typeof i == "number" ? i : i.value), m = computed(() => de(t.value, n.value));
  return {
    isMatching: computed(
      () => Be(t.value, n.value, s.value)
    ),
    score: m
  };
}
function pe(u, r, i) {
  var _a;
  var m, z;
  u.stopPropagation();
  const t = typeof i.value == "function" ? i.value : i.value.handler, n = typeof i.value == "object" ? i.value.exclude : void 0;
  let s = false;
  if (n && n.length > 0) {
    for (const E of n)
      if (!s && u.target instanceof HTMLElement) {
        const h = (m = (void 0).querySelector(E)) == null ? void 0 : m.getAttribute("id");
        s = (_a = u.target.getAttribute("id") === h || ((z = (void 0).querySelector(E)) == null ? void 0 : z.contains(u.target))) != null ? _a : false;
      }
  }
  !r.contains(u.target) && !s && (t == null || t(u));
}
function fe() {
  return (void 0).ontouchstart === null ? "touchstart" : "click";
}
function De(u, r) {
  const i = fe();
  (void 0).removeEventListener(i, (t) => pe(t, u, r));
}
function He(u, r) {
  if (typeof r.value != "function" && typeof r.value == "object" && typeof r.value.handler != "function") {
    console.error("[maz-ui](vClosable) v-closable directive requires a handler function");
    return;
  }
  const i = fe();
  (void 0).addEventListener(i, (t) => pe(t, u, r));
}
const Fe = {
  mounted: He,
  unmounted: De
};
let R = null;
function Pe(u, r) {
  R && clearTimeout(R), R = setTimeout(u, r);
}
const Ue = ["aria-label"], We = { class: "m-select-list__no-results" }, qe = {
  key: 2,
  class: "m-select-list__scroll-wrapper",
  tabindex: "-1"
}, je = { class: "m-select-list-optgroup" }, Qe = ["onClick"], Ge = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "MazSelect",
  props: {
    style: { default: void 0 },
    class: { default: void 0 },
    id: { default: void 0 },
    modelValue: { default: void 0 },
    options: { default: void 0 },
    optionValueKey: { default: "value" },
    optionLabelKey: { default: "label" },
    optionInputValueKey: { default: "label" },
    listPosition: { default: "bottom left" },
    itemHeight: { default: void 0 },
    maxListHeight: { default: 240 },
    maxListWidth: { default: void 0 },
    minListHeight: { default: void 0 },
    minListWidth: { default: void 0 },
    size: { default: "md" },
    color: { default: "primary" },
    search: { type: Boolean },
    searchPlaceholder: { default: "Search in options" },
    searchFunction: {},
    searchThreshold: { default: 0.75 },
    open: { type: Boolean },
    multiple: { type: Boolean, default: void 0 },
    required: { type: Boolean },
    disabled: { type: Boolean },
    block: { type: Boolean },
    excludeSelectors: { default: void 0 },
    autocomplete: { default: "off" }
  },
  emits: ["close", "open", "blur", "focus", "change", "input", "update:model-value", "selected-option"],
  setup(u, { expose: r, emit: i }) {
    const t = u, n = i, s = defineAsyncComponent(() => import('./MazCheckbox.CYeDQcMp-vzWyrAa7.mjs')), m = defineAsyncComponent(() => import('./magnifying-glass.-nBiyXot-CaS_-801.mjs')), z = defineAsyncComponent(() => import('./chevron-down.BkvtON3b-HUOkjF6G.mjs')), E = defineAsyncComponent(() => import('./no-symbol.CIgKzsrB-DOiYCfzl.mjs'));
    r({
      /** Method to open the option list */
      openList: C,
      /** Method to close the option list */
      closeList: A
    });
    const h = ref(false), d = ref(), B = computed(
      () => ["black", "transparent", "white"].includes(t.color)
    ), me = computed(
      () => B.value ? "var(--maz-color-black)" : `var(--maz-color-${t.color}-800)`
    ), ve = computed(
      () => B.value ? "var(--maz-color-muted)" : `var(--maz-color-${t.color}-100)`
    ), ye = computed(
      () => B.value ? "var(--maz-color-muted)" : `var(--maz-color-${t.color}-200)`
    ), b = computed(() => h.value || t.open), he = o({
      componentName: "MazSelect",
      providedId: t.id
    });
    function J(e) {
      return {
        [t.optionValueKey]: e,
        [t.optionLabelKey]: e,
        [t.optionInputValueKey]: e
      };
    }
    function X(e) {
      return {
        ...e,
        [t.optionValueKey]: e[t.optionValueKey],
        [t.optionLabelKey]: e[t.optionLabelKey],
        [t.optionInputValueKey]: e[t.optionInputValueKey]
      };
    }
    function Y(e) {
      const o2 = [];
      if (!(e != null && e.length))
        return [];
      for (const l of e)
        typeof l == "string" || typeof l == "number" || typeof l == "boolean" ? o2.push(J(l)) : typeof l == "object" && "options" in l && Array.isArray(l.options) ? o2.push(
          { label: l.label, isOptGroup: true },
          ...l.options.map(
            (a) => typeof a == "string" || typeof a == "number" || typeof a == "boolean" ? J(a) : X(a)
          )
        ) : o2.push(X(l));
      return o2;
    }
    const w = computed(() => {
      var _a;
      return Y((_a = t.options) != null ? _a : []);
    }), T = computed(
      () => {
        var _a;
        var e;
        return (_a = (e = w.value) == null ? void 0 : e.filter((o2) => t.multiple ? Array.isArray(t.modelValue) ? t.modelValue.includes(o2[t.optionValueKey]) && !k(o2[t.optionValueKey]) : false : t.modelValue === o2[t.optionValueKey] && !k(o2[t.optionValueKey]))) != null ? _a : [];
      }
    );
    onBeforeMount(() => {
      var e;
      (e = t.options) != null && e.length || console.warn("[maz-ui](MazSelect) you must provide options"), U();
    });
    const _ = ref(), D = ref(), ee = ref(), te = ref();
    function k(e) {
      return e == null;
    }
    function H(e) {
      var _a;
      var l;
      return ((_a = (l = T.value) == null ? void 0 : l.some(
        (a) => a[t.optionValueKey] === e[t.optionValueKey]
      )) != null ? _a : false) && !k(e[t.optionValueKey]);
    }
    const be = computed(() => {
      var o2;
      if (t.multiple && t.modelValue && Array.isArray(t.modelValue))
        return t.modelValue.map(
          (l) => {
            var a, c;
            return (c = (a = w.value) == null ? void 0 : a.find((p) => p[t.optionValueKey] === l)) == null ? void 0 : c[t.optionInputValueKey];
          }
        ).join(", ");
      const e = (o2 = w.value) == null ? void 0 : o2.find(
        (l) => l[t.optionValueKey] === t.modelValue
      );
      return k(t.modelValue) || e == null ? void 0 : e[t.optionInputValueKey];
    }), ge = computed(
      () => t.listPosition.includes("bottom") ? "maz-slide" : "maz-slideinvert"
    ), K = ref(""), S = ref("");
    function F(e, o2) {
      return o2 && e && x(e).includes(x(o2));
    }
    function oe(e) {
      var o2;
      return e ? (o2 = w.value) == null ? void 0 : o2.filter((l) => {
        const a = l[t.optionLabelKey], c = l[t.optionValueKey], p = l[t.optionInputValueKey], v = t.searchThreshold;
        return F(a, e) || F(p, e) || F(c, e) || typeof a == "string" && Z(a, e, v).isMatching.value || typeof p == "string" && Z(p, e, v).isMatching.value || typeof c == "string" && Z(c, e, v).isMatching.value;
      }) : w.value;
    }
    const y = computed(() => {
      var _a, _b;
      return t.searchFunction && t.search && K.value ? Y((_b = t.searchFunction(K.value, (_a = t.options) != null ? _a : [])) != null ? _b : []) : oe(K.value);
    });
    async function A(e) {
      var l, a;
      if (!b.value)
        return;
      if (e && ("relatedTarget" in e && ((l = _.value) != null && l.contains(e.relatedTarget)) || e.type === "keydown"))
        return e.preventDefault();
      const o2 = e && "relatedTarget" in e && e.relatedTarget instanceof HTMLElement && e.relatedTarget.getAttribute("id");
      if ((a = t.excludeSelectors) != null && a.includes(`#${o2}`))
        return e == null ? void 0 : e.preventDefault();
      await nextTick(), h.value = false, d.value = 0, n("close", e);
    }
    async function C(e) {
      t.disabled || b.value || (e == null || e.preventDefault(), h.value = true, await P(), n("focus", e), n("open", h.value));
    }
    function le() {
      var e, o2;
      (o2 = ((e = D.value) == null ? void 0 : e.$el).querySelector("input")) == null || o2.focus();
    }
    function Ve() {
      var e, o2;
      (o2 = ((e = D.value) == null ? void 0 : e.$el).querySelector("input")) == null || o2.dispatchEvent(new Event("input"));
    }
    function ze(e) {
      h.value ? A(e) : le();
    }
    function Ke(e) {
      var o2, l;
      K.value = e, (l = ((o2 = ee.value) == null ? void 0 : o2.$el).querySelector("input")) == null || l.focus();
    }
    function ke(e) {
      var l;
      e === "Backspace" && S.value.length > 0 ? S.value = S.value.slice(0, -1) : S.value += e;
      const o2 = oe(S.value);
      o2 != null && o2.length && (d.value = (l = y.value) == null ? void 0 : l.findIndex(
        (a) => a[t.optionValueKey] === o2[0][t.optionValueKey]
      ), typeof d.value == "number" && d.value >= 0 && P(d.value)), Pe(() => {
        S.value = "";
      }, 1e3);
    }
    function Se(e) {
      const o2 = e.key;
      /^[\dA-Za-z\u0400-\u04FF]$/.test(o2) ? (e.preventDefault(), C(e), t.search ? Ke(o2) : ke(o2)) : ae(e);
    }
    function ae(e, o2 = true) {
      const l = e.code, a = ["ArrowUp", "ArrowDown"].includes(l), c = (o2 ? ["Enter", "Space"] : ["Enter"]).includes(l), p = l === "Escape" && b.value;
      a ? Ae(e, d.value) : c ? Ie(e, d.value) : p && A(e);
    }
    function Ae(e, o2) {
      var c;
      e.preventDefault();
      const l = e.code;
      b.value || C(e);
      const a = (c = y.value) == null ? void 0 : c.length;
      a && (typeof o2 == "number" ? o2 === a - 1 && l === "ArrowDown" ? d.value = 0 : o2 === 0 && l === "ArrowUp" ? d.value = a - 1 : d.value = l === "ArrowDown" ? o2 + 1 : o2 - 1 : d.value = l === "ArrowDown" ? 0 : a - 1, P(d.value));
    }
    function Ie(e, o2) {
      var _a;
      var a, c, p;
      if (!b.value)
        return;
      e.preventDefault();
      const l = o2 ? (_a = (a = y.value) == null ? void 0 : a[o2]) != null ? _a : (c = y.value) == null ? void 0 : c[0] : (p = y.value) == null ? void 0 : p[0];
      k(l) || ne(l);
    }
    async function P(e) {
      var l, a;
      await nextTick(), typeof e != "number" && U();
      const o2 = e != null ? e : d.value;
      if (typeof o2 == "number" && o2 >= 0) {
        const c = (l = te.value) == null ? void 0 : l.querySelectorAll(".m-select-list-item");
        (a = c == null ? void 0 : c[o2]) == null || a.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "start"
        });
      }
    }
    function U(e) {
      var l;
      const o2 = (l = y.value) == null ? void 0 : l.findIndex((a) => {
        var c, p;
        return t.multiple && Array.isArray(t.modelValue) ? e ? e[t.optionValueKey] === a[t.optionValueKey] : [...t.modelValue].reverse()[0] === a[t.optionValueKey] : ((p = (c = T.value) == null ? void 0 : c[0]) == null ? void 0 : p[t.optionValueKey]) === a[t.optionValueKey];
      });
      d.value = o2 && o2 >= 0 ? o2 : 0;
    }
    function ne(e, o2 = true) {
      var p;
      o2 && !t.multiple && nextTick(() => A()), K.value = "";
      const l = (p = T.value) == null ? void 0 : p.some(
        (v) => v[t.optionValueKey] === e[t.optionValueKey]
      );
      let a = T.value;
      l && t.multiple ? a = a == null ? void 0 : a.filter(
        (v) => v[t.optionValueKey] !== e[t.optionValueKey]
      ) : t.multiple ? a.push(e) : a = [e];
      const c = a.map((v) => v[t.optionValueKey]);
      n("update:model-value", t.multiple ? c : c[0]), n("selected-option", e), Ve(), U(e), le();
    }
    return (e, o2) => withDirectives((openBlock(), createElementBlock(
      "div",
      {
        ref_key: "mazSelectElement",
        ref: _,
        class: normalizeClass(["m-select m-reset-css", [
          { "--is-open": b.value, "--disabled": e.disabled, "--block": e.block },
          t.class,
          `--${e.size}`
        ]]),
        style: normalizeStyle([e.style, { "--keyboard-selected-bg-color": ye.value, "--selected-bg-color": ve.value, "--selected-text-color": me.value }])
      },
      [
        createVNode(pe$1, mergeProps({
          id: unref(he),
          ref_key: "mazInputComponent",
          ref: D,
          class: "m-select-input"
        }, e.$attrs, {
          required: e.required,
          "border-active": h.value,
          color: e.color,
          "model-value": be.value,
          size: e.size,
          block: "",
          autocomplete: e.autocomplete,
          disabled: e.disabled,
          onFocus: withModifiers(C, ["prevent", "stop"]),
          onBlur: withModifiers(A, ["prevent", "stop"]),
          onClick: withModifiers(C, ["prevent", "stop"]),
          onChange: o2[0] || (o2[0] = (l) => n("change", l)),
          onInput: o2[1] || (o2[1] = (l) => n("input", l)),
          onKeydown: Se
        }), {
          "right-icon": withCtx(() => [
            createElementVNode("button", {
              tabindex: "-1",
              type: "button",
              class: "m-select-input__toggle-button maz-custom",
              "aria-label": `${b.value ? "collapse" : "expand"} list of options`,
              onClick: withModifiers(ze, ["stop"])
            }, [
              createVNode(unref(z), { class: "m-select-chevron maz-text-xl" })
            ], 8, Ue)
          ]),
          _: 1
          /* STABLE */
        }, 16, ["id", "required", "border-active", "color", "model-value", "size", "autocomplete", "disabled"]),
        createVNode(Transition, { name: ge.value }, {
          default: withCtx(() => [
            b.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                ref_key: "optionListElement",
                ref: te,
                class: normalizeClass(["m-select-list", {
                  "--top": e.listPosition.includes("top"),
                  "--left": e.listPosition.includes("left"),
                  "--right": e.listPosition.includes("right"),
                  "--bottom": e.listPosition.includes("bottom")
                }]),
                style: normalizeStyle({
                  maxHeight: `${e.maxListHeight}px`,
                  maxWidth: `${e.maxListWidth}px`,
                  minHeight: `${e.minListHeight}px`,
                  minWidth: `${e.minListWidth}px`
                })
              },
              [
                e.search ? (openBlock(), createBlock(pe$1, {
                  key: 0,
                  ref_key: "searchInputComponent",
                  ref: ee,
                  modelValue: K.value,
                  "onUpdate:modelValue": [
                    o2[2] || (o2[2] = (l) => K.value = l),
                    o2[4] || (o2[4] = (l) => d.value = 0)
                  ],
                  size: "sm",
                  color: e.color,
                  placeholder: e.searchPlaceholder,
                  name: "search",
                  inputmode: "search",
                  block: "",
                  autocomplete: "off",
                  tabindex: "-1",
                  class: "m-select-list__search-input maz-flex-none",
                  "left-icon": unref(m),
                  onKeydown: o2[3] || (o2[3] = (l) => ae(l, false))
                }, null, 8, ["modelValue", "color", "placeholder", "left-icon"])) : createCommentVNode("v-if", true),
                !y.value || y.value.length <= 0 ? renderSlot(e.$slots, "no-results", { key: 1 }, () => [
                  createElementVNode("span", We, [
                    createVNode(unref(E), { class: "maz-h-6 maz-w-6 maz-text-normal" })
                  ])
                ], true) : (openBlock(), createElementBlock("div", qe, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(y.value, (l, a) => (openBlock(), createElementBlock(
                      Fragment,
                      { key: a },
                      [
                        l.label && l.isOptGroup ? renderSlot(e.$slots, "optgroup", {
                          key: 0,
                          label: l.label
                        }, () => [
                          createElementVNode(
                            "span",
                            je,
                            toDisplayString(l.label),
                            1
                            /* TEXT */
                          )
                        ], true) : (openBlock(), createElementBlock("button", {
                          key: 1,
                          tabindex: "-1",
                          type: "button",
                          class: normalizeClass(["m-select-list-item maz-custom maz-flex-none", [
                            {
                              "--is-keyboard-selected": d.value === a,
                              "--is-selected": H(l),
                              "--is-none-value": k(l[e.optionValueKey])
                            }
                          ]]),
                          style: normalizeStyle(e.itemHeight ? { height: `${e.itemHeight}px` } : void 0),
                          onClick: withModifiers((c) => ne(l), ["prevent", "stop"])
                        }, [
                          e.multiple ? (openBlock(), createBlock(unref(s), {
                            key: 0,
                            tabindex: "-1",
                            "model-value": H(l),
                            size: "sm",
                            color: e.color
                          }, null, 8, ["model-value", "color"])) : createCommentVNode("v-if", true),
                          renderSlot(e.$slots, "default", {
                            option: l,
                            isSelected: H(l)
                          }, () => [
                            createElementVNode(
                              "span",
                              null,
                              toDisplayString(l[e.optionLabelKey]),
                              1
                              /* TEXT */
                            )
                          ], true)
                        ], 14, Qe))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]))
              ],
              6
              /* CLASS, STYLE */
            )) : createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ],
      6
      /* CLASS, STYLE */
    )), [
      [unref(Fe), {
        exclude: e.excludeSelectors,
        handler: A
      }]
    ]);
  }
}), Ye = /* @__PURE__ */ _e(Ge, [["__scopeId", "data-v-98157b75"]]);

export { Ye as default };
//# sourceMappingURL=MazSelect.CZ8-FJbx-C7xp1w2U.mjs.map
