import { defineComponent, defineAsyncComponent, useAttrs, computed, createBlock, openBlock, resolveDynamicComponent, normalizeStyle, normalizeClass, withCtx, renderSlot, createElementBlock, createCommentVNode, unref, createVNode } from 'vue';
import { T } from './MazCarousel.tT2IPWU9-C8Una4Y2.mjs';

const O = {
  key: 0,
  class: "m-btn-loader-container"
}, A = /* @__PURE__ */ defineComponent({
  __name: "MazBtn",
  props: {
    variant: { default: "button" },
    size: { default: "md" },
    color: { default: "primary" },
    type: { default: "button" },
    rounded: { type: Boolean },
    roundedSize: { default: "lg" },
    noRounded: { type: Boolean },
    outline: { type: Boolean },
    pastel: { type: Boolean },
    block: { type: Boolean },
    noUnderline: { type: Boolean },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    fab: { type: Boolean },
    icon: { type: [String, Function, Object], default: void 0 },
    leftIcon: { type: [String, Function, Object], default: void 0 },
    rightIcon: { type: [String, Function, Object], default: void 0 },
    noPadding: { type: Boolean },
    noElevation: { type: Boolean },
    justify: { default: "center" }
  },
  setup(y) {
    const n = y, v = defineAsyncComponent(() => import('./MazSpinner.CXGURuw3-D4Cxh_OF.mjs')), c = defineAsyncComponent(() => import('./MazIcon.Cq1v4J3r-B5N5MhVq.mjs')), { href: b, to: z } = useAttrs(), f = computed(() => b ? "a" : z ? "router-link" : "button"), g = computed(() => n.pastel ? `--${n.color}-pastel` : n.outline ? `--${n.color}-outline` : `--${n.color}`), p = computed(
      () => (n.loading || n.disabled) && f.value === "button"
    ), B = computed(() => p.value ? "--cursor-default" : "--cursor-pointer"), k = computed(() => `--is-${n.variant}`), I = computed(() => n.loading && n.variant === "button"), h = computed(() => f.value === "button" ? n.type : void 0), s = computed(() => n.size === "xl" ? "maz-text-3xl" : n.size === "lg" ? "maz-text-2xl" : n.size === "md" ? "maz-text-xl" : n.size === "sm" ? "maz-text-lg" : n.size === "xs" ? "maz-text-base" : n.size === "mini" ? "maz-text-sm" : "maz-text-xl");
    return (e, D) => (openBlock(), createBlock(resolveDynamicComponent(f.value), {
      disabled: p.value || void 0,
      class: normalizeClass(["m-btn m-reset-css", [
        `--${e.size}`,
        !e.fab && !e.rounded && e.roundedSize && `--rounded-${e.roundedSize}`,
        g.value,
        B.value,
        k.value,
        {
          "--block": e.block,
          "--no-underline": e.noUnderline,
          "--fab": e.fab,
          "--loading": e.loading,
          "--disabled": p.value,
          "--rounded": e.rounded,
          "--no-rounded": e.noRounded,
          "--no-padding": e.noPadding,
          "--no-elevation": e.noElevation
        }
      ]]),
      style: normalizeStyle([`--justify: ${e.justify}`]),
      type: h.value
    }, {
      default: withCtx(() => [
        renderSlot(e.$slots, "left-icon", {}, () => [
          typeof e.leftIcon == "string" ? (openBlock(), createBlock(unref(c), {
            key: 0,
            name: e.leftIcon,
            class: normalizeClass([s.value])
          }, null, 8, ["name", "class"])) : e.leftIcon ? (openBlock(), createBlock(resolveDynamicComponent(e.leftIcon), {
            key: 1,
            class: normalizeClass([s.value])
          }, null, 8, ["class"])) : createCommentVNode("v-if", true)
        ], true),
        renderSlot(e.$slots, "icon", {}, () => [
          typeof e.icon == "string" ? (openBlock(), createBlock(unref(c), {
            key: 0,
            name: e.icon,
            class: normalizeClass([s.value])
          }, null, 8, ["name", "class"])) : e.icon ? (openBlock(), createBlock(resolveDynamicComponent(e.icon), {
            key: 1,
            class: normalizeClass([s.value])
          }, null, 8, ["class"])) : createCommentVNode("v-if", true)
        ], true),
        renderSlot(e.$slots, "default", {}, void 0, true),
        renderSlot(e.$slots, "right-icon", {}, () => [
          typeof e.rightIcon == "string" ? (openBlock(), createBlock(unref(c), {
            key: 0,
            name: e.rightIcon,
            class: normalizeClass([s.value])
          }, null, 8, ["name", "class"])) : e.rightIcon ? (openBlock(), createBlock(resolveDynamicComponent(e.rightIcon), {
            key: 1,
            class: normalizeClass([s.value])
          }, null, 8, ["class"])) : createCommentVNode("v-if", true)
        ], true),
        I.value ? (openBlock(), createElementBlock("div", O, [
          createVNode(unref(v), {
            size: "2em",
            color: e.color
          }, null, 8, ["color"])
        ])) : createCommentVNode("v-if", true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["disabled", "class", "style", "type"]));
  }
}), R = /* @__PURE__ */ T(A, [["__scopeId", "data-v-6b881156"]]);

export { R as default };
//# sourceMappingURL=MazBtn.BE40HJng-BkQ1T_58.mjs.map
