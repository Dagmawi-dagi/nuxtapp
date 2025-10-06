import { defineComponent, createElementBlock, openBlock, normalizeClass, createElementVNode } from 'vue';
import { _ as _e } from './MazTableUi-DJE3g4qh.mjs';

const i = ["width", "height"], l = /* @__PURE__ */ defineComponent({
  __name: "MazSpinner",
  props: {
    size: { default: "2em" },
    color: { default: "theme" }
  },
  setup(m) {
    return (e, s) => (openBlock(), createElementBlock("svg", {
      width: e.size,
      height: e.size,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      viewBox: "0 0 50 50",
      "xml:space": "preserve",
      class: normalizeClass(["m-spinner m-reset-css", `m-spinner--${e.color}`]),
      style: { "enable-background": "new 0 0 50 50" }
    }, s[0] || (s[0] = [
      createElementVNode(
        "path",
        { d: "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" },
        null,
        -1
        /* HOISTED */
      )
    ]), 10, i));
  }
}), h = /* @__PURE__ */ _e(l, [["__scopeId", "data-v-52831d3b"]]);

export { h as default };
//# sourceMappingURL=MazSpinner.B2KPFXAm-7jrdKlf0.mjs.map
