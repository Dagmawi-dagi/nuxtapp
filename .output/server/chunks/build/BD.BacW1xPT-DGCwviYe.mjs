import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "49.59 85.333 342 342"
};
function o(c, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#2d6e41",
      d: "M0 85.331h513v342H0z"
    }, null, -1),
    createElementVNode("circle", {
      cx: "218.902",
      cy: "256.5",
      r: "115",
      fill: "#F40B32"
    }, null, -1)
  ]));
}
const i = { render: o };

export { i as default, o as render };
//# sourceMappingURL=BD.BacW1xPT-DGCwviYe.mjs.map
