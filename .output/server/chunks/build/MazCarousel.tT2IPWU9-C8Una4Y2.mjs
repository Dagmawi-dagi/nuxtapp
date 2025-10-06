import { defineComponent, defineAsyncComponent, useSlots, ref, createElementBlock, openBlock, normalizeClass, createCommentVNode, createElementVNode, renderSlot, createVNode, unref, withCtx } from 'vue';

const W = { key: 0 }, x = {
  key: 1,
  class: "m-carousel__header__actions"
}, $ = /* @__PURE__ */ defineComponent({
  __name: "MazCarousel",
  props: {
    noScrollBtn: { type: Boolean },
    ariaLabelPreviousButton: { default: "Scroll to previous items" },
    ariaLabelNextButton: { default: "Scroll to next items" },
    hideScrollbar: { type: Boolean }
  },
  setup(l) {
    const u = l, o = defineAsyncComponent(() => import('./MazBtn.BE40HJng-BkQ1T_58.mjs')), d = defineAsyncComponent(() => import('./chevron-left.BqVOLRdC-Djc1b6Xp.mjs')), f = defineAsyncComponent(() => import('./chevron-right.CbjzEeHV-CySY4-RR.mjs')), h = useSlots(), b = ref(false), S = ref(false), m = ref();
    function L() {
      return !u.noScrollBtn || h.title;
    }
    function C() {
      return !!h.title;
    }
    function y() {
      const e = m.value;
      e == null || e.scrollTo(e.scrollLeft + e.clientWidth, 0);
    }
    function z() {
      const e = m.value;
      e == null || e.scrollTo(e.scrollLeft - e.clientWidth, 0);
    }
    function M(e) {
      const t = e.target;
      if (!t)
        return;
      b.value = t.scrollLeft >= 20;
      const g = t.scrollWidth - t.clientWidth;
      S.value = t.scrollLeft >= g - 20;
    }
    return (e, t) => (openBlock(), createElementBlock(
      "div",
      {
        class: normalizeClass(["m-carousel m-reset-css", {
          "--hide-scrollbar": e.hideScrollbar
        }])
      },
      [
        L() ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: normalizeClass(["m-carousel__header", { "--has-title": C() }])
          },
          [
            C() ? (openBlock(), createElementBlock("div", W, [
              renderSlot(e.$slots, "title", {}, void 0, true)
            ])) : createCommentVNode("v-if", true),
            e.noScrollBtn ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", x, [
              createVNode(unref(o), {
                color: "transparent",
                class: normalizeClass(["m-carousel__btn", { "--muted": !b.value }]),
                "no-elevation": "",
                fab: "",
                "aria-label": e.ariaLabelPreviousButton,
                onClick: z
              }, {
                default: withCtx(() => [
                  renderSlot(e.$slots, "previous-icon", {}, () => [
                    createVNode(unref(d), { class: "maz-text-lg" })
                  ], true)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["class", "aria-label"]),
              createVNode(unref(o), {
                color: "transparent",
                class: normalizeClass(["m-carousel__btn", { "--muted": S.value }]),
                fab: "",
                "no-elevation": "",
                "aria-label": e.ariaLabelNextButton,
                onClick: y
              }, {
                default: withCtx(() => [
                  renderSlot(e.$slots, "next-icon", {}, () => [
                    createVNode(unref(f), { class: "maz-text-lg" })
                  ], true)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["class", "aria-label"])
            ]))
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        createElementVNode(
          "div",
          {
            ref_key: "MazCarouselItems",
            ref: m,
            class: "m-carousel__items",
            onScroll: M
          },
          [
            renderSlot(e.$slots, "default", {}, void 0, true),
            t[0] || (t[0] = createElementVNode(
              "div",
              { class: "m-carousel__items__spacer" },
              null,
              -1
              /* HOISTED */
            ))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ],
      2
      /* CLASS */
    ));
  }
}), T = (l, u) => {
  const o = l.__vccOpts || l;
  for (const [d, f] of u)
    o[d] = f;
  return o;
}, E = /* @__PURE__ */ T($, [["__scopeId", "data-v-cccbba82"]]);

export { E, T };
//# sourceMappingURL=MazCarousel.tT2IPWU9-C8Una4Y2.mjs.map
