import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(h, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 85.331h512v341.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.331h256v170.663H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M141.357 157.303V130.59h-26.714v26.713H87.93v26.713h26.713v26.713h26.714v-26.713h26.713v-26.713z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=TO.BthZZQna-CO51guFa.mjs.map
