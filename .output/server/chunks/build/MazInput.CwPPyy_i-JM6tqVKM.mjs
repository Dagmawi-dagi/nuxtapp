import { defineComponent, defineAsyncComponent, ref, onMounted, computed, useSlots, createElementBlock, openBlock, normalizeStyle, normalizeClass, createCommentVNode, createElementVNode, unref, toDisplayString, renderSlot, createBlock, resolveDynamicComponent, withDirectives, mergeProps, toHandlers, vModelDynamic, withModifiers, withCtx, createVNode } from 'vue';
import { o } from './useInstanceUniqId.BkOfxhk8-BqNXuiok.mjs';
import { _ as _e } from './MazTableUi-DJE3g4qh.mjs';

function le(b, y) {
  let t;
  return function(...n) {
    clearTimeout(t), t = setTimeout(() => {
      b.apply(this, n);
    }, y);
  };
}
const ne = ["for"], re = {
  key: 0,
  class: "m-input-wrapper-left"
}, se = ["id", "name", "placeholder", "aria-label", "type", "inputmode", "disabled", "readonly", "autocomplete", "required"], ie = {
  key: 1,
  class: "m-input-wrapper-right"
}, ue = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "MazInput",
  props: {
    style: { default: void 0 },
    class: { default: void 0 },
    modelValue: { default: void 0 },
    placeholder: { default: void 0 },
    label: { default: void 0 },
    topLabel: {},
    assistiveText: {},
    name: { default: void 0 },
    color: { default: "primary" },
    type: { default: "text" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    id: { default: void 0 },
    error: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
    hint: { default: void 0 },
    inputClasses: { default: void 0 },
    noBorder: { type: Boolean, default: false },
    noRadius: { type: Boolean, default: false },
    inputmode: { default: "text" },
    size: { default: "md" },
    debounce: { type: [Boolean, Number], default: false },
    debounceDelay: { default: 500 },
    validButton: { type: Boolean, default: false },
    validButtonLoading: { type: Boolean, default: false },
    autoFocus: { type: Boolean, default: false },
    borderActive: { type: Boolean, default: false },
    leftIcon: { type: [String, Function, Object], default: void 0 },
    rightIcon: { type: [String, Function, Object], default: void 0 },
    roundedSize: { default: void 0 },
    block: { type: Boolean },
    autocomplete: {}
  },
  emits: ["update:model-value", "focus", "blur", "click", "change", "input"],
  setup(b, { emit: y }) {
    var _a;
    const t = b, n = y, w = defineAsyncComponent(() => import('./MazBtn.B6UiTgcv-CXo-zBg1.mjs')), B = defineAsyncComponent(() => import('./MazIcon.B5KEO0Na-CGVKibgN.mjs')), T = defineAsyncComponent(() => import('./eye-slash.BoO00xzs-DjLrdpHL.mjs')), D = defineAsyncComponent(() => import('./eye.f8zAUc30-CYq6rKlk.mjs')), E = defineAsyncComponent(() => import('./check.C9Q_W85g-DvaQ-Ke2.mjs')), p = ref(false), d = ref(false), $ = ref(), C = o({
      componentName: "MazInput",
      providedId: t.id
    });
    onMounted(() => {
      var e;
      t.autoFocus && ((e = $.value) == null || e.focus());
    });
    const S = computed(() => t.type === "password"), q = computed(() => p.value ? "text" : t.type), A = computed(() => {
      if (!t.noBorder) {
        if (t.error)
          return "maz-border-danger";
        if (t.success)
          return "maz-border-success";
        if (t.warning)
          return "maz-border-warning";
        if (d.value || t.borderActive) {
          if (t.color === "black")
            return "maz-border-black";
          if (t.color === "danger")
            return "maz-border-danger";
          if (t.color === "info")
            return "maz-border-info";
          if (t.color === "primary")
            return "maz-border-primary";
          if (t.color === "secondary")
            return "maz-border-secondary";
          if (t.color === "success")
            return "maz-border-success";
          if (t.color === "warning")
            return "maz-border-warning";
          if (t.color === "white")
            return "maz-border-white";
        }
        return "--default-border";
      }
    }), z = useSlots(), F = computed(() => c.value !== void 0 && c.value !== ""), N = le(
      (e) => {
        n("update:model-value", e);
      },
      typeof t.debounce == "number" ? t.debounce : (_a = t.debounceDelay) != null ? _a : 500
    );
    function P(e) {
      if (t.debounce)
        return N(e);
      n("update:model-value", e);
    }
    const c = computed({
      get: () => t.modelValue,
      set: (e) => P(e)
    }), O = computed(() => (!!t.label || !!t.hint) && (d.value || !!F.value || !!t.placeholder || ["date", "month", "week"].includes(t.type))), R = computed(() => !!t.label || !!t.hint);
    function U() {
      return !!z["right-icon"] || S.value || !!z["valid-button"] || t.validButton || !!t.rightIcon;
    }
    function j() {
      return !!z["left-icon"] || !!t.leftIcon;
    }
    function H(e) {
      n("focus", e), d.value = true;
    }
    function G(e) {
      n("blur", e), d.value = false;
    }
    function J(e) {
      return n("change", e);
    }
    function K(e) {
      return n("input", e);
    }
    return (e, i) => (openBlock(), createElementBlock(
      "div",
      {
        class: normalizeClass(["m-input", [
          {
            "--is-focused": d.value || e.borderActive,
            "--should-up": O.value,
            "--has-label": R.value,
            "--is-disabled": e.disabled,
            "--is-readonly": e.readonly,
            "--has-z-2": e.error || e.warning || e.success,
            "--has-state": e.error || e.warning || e.success,
            "--block": e.block
          },
          t.class,
          `--${e.color}`
        ]]),
        style: normalizeStyle(e.style)
      },
      [
        e.topLabel ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: unref(C),
          class: "m-input-top-label"
        }, toDisplayString(e.topLabel), 9, ne)) : createCommentVNode("v-if", true),
        createElementVNode(
          "div",
          {
            class: normalizeClass(["m-input-wrapper m-reset-css", [
              e.inputClasses,
              A.value,
              e.roundedSize ? `--rounded-${e.roundedSize}` : { "maz-rounded": !e.noRadius },
              { "--block": e.block }
            ]])
          },
          [
            j() ? (openBlock(), createElementBlock("div", re, [
              e.$slots["left-icon"] || e.leftIcon ? renderSlot(e.$slots, "left-icon", { key: 0 }, () => [
                typeof e.leftIcon == "string" ? (openBlock(), createBlock(unref(B), {
                  key: 0,
                  name: e.leftIcon,
                  class: "maz-text-xl maz-text-muted"
                }, null, 8, ["name"])) : e.leftIcon ? (openBlock(), createBlock(resolveDynamicComponent(e.leftIcon), {
                  key: 1,
                  class: "maz-text-xl maz-text-muted"
                })) : createCommentVNode("v-if", true)
              ], true) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true),
            createElementVNode(
              "div",
              {
                class: normalizeClass(["m-input-wrapper-input", [`--${e.size}`, { "--top-label": !!e.topLabel }]])
              },
              [
                withDirectives(createElementVNode("input", mergeProps({ id: unref(C) }, e.$attrs, {
                  ref_key: "input",
                  ref: $,
                  "onUpdate:modelValue": i[0] || (i[0] = (v) => c.value = v),
                  name: e.name,
                  placeholder: e.placeholder,
                  "aria-label": e.label || e.placeholder,
                  type: q.value,
                  inputmode: e.inputmode,
                  disabled: e.disabled,
                  readonly: e.readonly,
                  autocomplete: e.autocomplete,
                  required: e.required,
                  class: "m-input-input"
                }, toHandlers({
                  blur: G,
                  focus: H,
                  change: J,
                  input: K
                }, true), {
                  onClick: i[1] || (i[1] = (v) => e.$emit("click", v))
                }), null, 16, se), [
                  [vModelDynamic, c.value]
                ]),
                e.label || e.hint ? (openBlock(), createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: normalizeClass(["m-input-label", [
                      {
                        "maz-text-danger-600": e.error,
                        "maz-text-success-600": e.success,
                        "maz-text-warning-600": e.warning
                      }
                    ]])
                  },
                  toDisplayString(e.hint || e.label),
                  3
                  /* TEXT, CLASS */
                )) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            U() ? (openBlock(), createElementBlock("div", ie, [
              e.$slots["right-icon"] || e.rightIcon ? renderSlot(e.$slots, "right-icon", { key: 0 }, () => [
                typeof e.rightIcon == "string" ? (openBlock(), createBlock(unref(B), {
                  key: 0,
                  name: e.rightIcon,
                  class: "maz-text-xl maz-text-muted"
                }, null, 8, ["name"])) : e.rightIcon ? (openBlock(), createBlock(resolveDynamicComponent(e.rightIcon), {
                  key: 1,
                  class: "maz-text-xl maz-text-muted"
                })) : createCommentVNode("v-if", true)
              ], true) : createCommentVNode("v-if", true),
              S.value ? (openBlock(), createBlock(unref(w), {
                key: 1,
                color: "transparent",
                tabindex: "-1",
                size: "mini",
                onClick: i[2] || (i[2] = withModifiers((v) => p.value = !p.value, ["stop"]))
              }, {
                default: withCtx(() => [
                  p.value ? (openBlock(), createBlock(unref(T), {
                    key: 0,
                    class: "maz-text-xl maz-text-muted"
                  })) : (openBlock(), createBlock(unref(D), {
                    key: 1,
                    class: "maz-text-xl maz-text-muted"
                  }))
                ]),
                _: 1
                /* STABLE */
              })) : createCommentVNode("v-if", true),
              e.$slots["valid-button"] || e.validButton ? renderSlot(e.$slots, "valid-button", { key: 2 }, () => [
                createVNode(unref(w), {
                  color: "transparent",
                  disabled: e.disabled,
                  tabindex: "-1",
                  loading: e.validButtonLoading,
                  class: "m-input-valid-button",
                  size: "mini",
                  type: "submit"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(E), { class: "maz-text-2xl maz-text-normal" })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "loading"])
              ], true) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        ),
        e.assistiveText ? (openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            class: normalizeClass(["m-input-bottom-text", [
              {
                "maz-text-danger-600": e.error,
                "maz-text-success-600": e.success,
                "maz-text-warning-600": e.warning,
                "maz-text-muted": !e.error && !e.success && !e.warning
              }
            ]])
          },
          toDisplayString(e.assistiveText),
          3
          /* TEXT, CLASS */
        )) : createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), pe = /* @__PURE__ */ _e(ue, [["__scopeId", "data-v-8def99c5"]]);

export { pe as default };
//# sourceMappingURL=MazInput.CwPPyy_i-JM6tqVKM.mjs.map
