import { defineComponent, useCssVars, createBlock, openBlock, TransitionGroup, withCtx, renderSlot, nextTick } from 'vue';
import { Q } from './MazCard.D4R5VJTH-8A_CSQrQ.mjs';

const l = /* @__PURE__ */ defineComponent({
  __name: "MazTransitionExpand",
  props: {
    animationDuration: { default: "300ms" }
  },
  setup(x) {
    useCssVars((t) => ({
      "6402c434": t.animationDuration
    }));
    function n(t) {
      const i = getComputedStyle(t).width;
      t.style.width = i, t.style.position = "absolute", t.style.visibility = "hidden", t.style.height = "auto", t.style.top = "bottom";
      const o = getComputedStyle(t).height;
      t.style.width = "", t.style.position = "", t.style.visibility = "", t.style.height = "0px", getComputedStyle(t).height, nextTick(() => {
        t.style.height = o;
      });
    }
    function a(t) {
      t.style.height = "auto";
    }
    function r(t) {
      const i = getComputedStyle(t).height;
      t.style.height = i, getComputedStyle(t).height, nextTick(() => {
        t.style.height = "0px";
      });
    }
    return (t, i) => (openBlock(), createBlock(TransitionGroup, {
      class: "m-transition-expand m-reset-css",
      name: "maz-expand",
      tag: "div",
      onEnter: i[0] || (i[0] = (o) => n(o)),
      onAfterEnter: i[1] || (i[1] = (o) => a(o)),
      onLeave: i[2] || (i[2] = (o) => r(o))
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }));
  }
}), v = /* @__PURE__ */ Q(l, [["__scopeId", "data-v-fbd5f8a0"]]);

export { v as default };
//# sourceMappingURL=MazTransitionExpand.DL0tmQvU-BN9aD3Dl.mjs.map
