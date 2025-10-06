import { defineComponent, computed, ref, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createElementVNode, mergeProps, createVNode, renderSlot, createCommentVNode, createTextVNode, toDisplayString } from 'vue';
import { o } from './useInstanceUniqId.BkOfxhk8-BqNXuiok.mjs';
import c from './check.C9Q_W85g-DvaQ-Ke2.mjs';
import { _ as _e } from './MazTableUi-DJE3g4qh.mjs';

const H = ["for", "aria-checked"], K = ["id", "checked", "disabled", "name"], P = { class: "m-checkbox__text" }, T = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "MazCheckbox",
  props: {
    style: { default: void 0 },
    class: { default: void 0 },
    modelValue: { default: void 0 },
    id: { default: void 0 },
    color: { default: "primary" },
    value: { type: [String, Number, Boolean], default: void 0 },
    name: { default: "m-checkbox" },
    size: { default: "md" },
    label: { default: void 0 },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean },
    success: { type: Boolean },
    warning: { type: Boolean },
    hint: {}
  },
  emits: ["update:model-value", "change", "blur", "focus"],
  setup(z, { emit: g }) {
    const o$1 = z, l = g, i = o({
      componentName: "MazCheckbox",
      providedId: o$1.id
    }), m = computed(
      () => typeof o$1.value != "boolean" && Array.isArray(o$1.modelValue) ? o$1.modelValue.includes(o$1.value) : typeof o$1.modelValue == "boolean" ? o$1.modelValue : false
    ), f = computed(() => {
      switch (o$1.size) {
        case "xl":
          return "2rem";
        case "lg":
          return "1.75rem";
        case "sm":
          return "1.25rem";
        case "xs":
          return "1rem";
        case "mini":
          return "0.75rem";
        default:
          return "1.5rem";
      }
    }), V = computed(() => {
      switch (o$1.size) {
        case "xl":
          return "maz-text-2xl";
        case "lg":
          return "maz-text-xl";
        case "sm":
          return "maz-text-base";
        case "xs":
          return "maz-text-sm";
        case "mini":
          return "maz-text-xs";
        default:
          return "maz-text-lg";
      }
    }), x = computed(() => o$1.color === "theme" ? "var(--maz-color-bg)" : `var(--maz-color-${o$1.color}-contrast)`), w = computed(() => o$1.color === "theme" ? "var(--maz-color-bg-theme)" : `var(--maz-color-${o$1.color})`), h = computed(() => o$1.error ? "var(--maz-color-danger)" : o$1.warning ? "var(--maz-color-warning)" : o$1.success ? "var(--maz-color-success)" : ["black", "transparent", "theme"].includes(o$1.color) ? "var(--maz-color-muted)" : `var(--maz-color-${o$1.color}-alpha)`);
    function C(e) {
      var _a;
      ["Space"].includes(e.code) && (e.preventDefault(), p((_a = o$1.value) != null ? _a : !o$1.modelValue));
    }
    function S(e) {
      return typeof e == "boolean" && (typeof o$1.modelValue == "boolean" || o$1.modelValue === void 0 || o$1.modelValue === null) ? !o$1.modelValue : Array.isArray(o$1.modelValue) && typeof e != "boolean" ? o$1.modelValue.includes(e) ? o$1.modelValue.filter((a) => a !== e) : [...o$1.modelValue, e] : [e];
    }
    function p(e) {
      const a = S(e);
      l("update:model-value", a), l("change", a);
    }
    const n = ref();
    function B(e) {
      var a;
      (a = n.value) == null || a.dispatchEvent(new Event("blur")), l("blur", e);
    }
    function I(e) {
      var a;
      (a = n.value) == null || a.dispatchEvent(new Event("focus")), l("focus", e);
    }
    return (e, a) => (openBlock(), createElementBlock("label", {
      for: unref(i),
      class: normalizeClass(["m-checkbox m-reset-css", [{ "--disabled": e.disabled, "--error": e.error, "--warning": e.warning, "--success": e.success }, o$1.class]]),
      tabindex: "0",
      style: normalizeStyle([e.style, { "--checkbox-selected-color": w.value, "--checkbox-box-shadow-color": h.value }]),
      role: "checkbox",
      "aria-checked": m.value,
      onKeydown: C,
      onBlur: B,
      onFocus: I
    }, [
      createElementVNode("input", mergeProps({
        id: unref(i),
        ref_key: "inputRef",
        ref: n,
        checked: m.value
      }, e.$attrs, {
        tabindex: "-1",
        disabled: e.disabled,
        name: e.name,
        type: "checkbox",
        onChange: a[0] || (a[0] = (s) => {
          var _a;
          var b;
          return p((_a = e.value) != null ? _a : (b = s == null ? void 0 : s.target) == null ? void 0 : b.checked);
        })
      }), null, 16, K),
      createElementVNode(
        "span",
        {
          style: normalizeStyle({ width: f.value, height: f.value })
        },
        [
          createVNode(unref(c), {
            class: normalizeClass(["check-icon", V.value]),
            style: normalizeStyle({ color: x.value })
          }, null, 8, ["class", "style"])
        ],
        4
        /* STYLE */
      ),
      createElementVNode("div", P, [
        renderSlot(e.$slots, "default", { value: e.value }, () => [
          createTextVNode(
            toDisplayString(e.label),
            1
            /* TEXT */
          )
        ], true),
        e.hint ? (openBlock(), createElementBlock(
          "span",
          {
            key: 0,
            class: normalizeClass(["m-checkbox__hint", {
              "--error": e.error,
              "--success": e.success,
              "--warning": e.warning
            }]),
            style: normalizeStyle({ boxShadow: `0 0 0 0.125rem ${h.value}` })
          },
          toDisplayString(e.hint),
          7
          /* TEXT, CLASS, STYLE */
        )) : createCommentVNode("v-if", true)
      ])
    ], 46, H));
  }
}), L = /* @__PURE__ */ _e(T, [["__scopeId", "data-v-66c21eaf"]]);

export { L as default };
//# sourceMappingURL=MazCheckbox.CYeDQcMp-vzWyrAa7.mjs.map
