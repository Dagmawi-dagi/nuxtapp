import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(h, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M342 0h171v342H342z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 0h171v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#AF7F59",
      d: "M206.2 129.1h33.2L256 79.3l16.6 49.8h33.2v99.6L256 262l-49.8-33.2zm33.2 33.3v49.8h33.2v-49.8z"
    }, null, -1)
  ]));
}
const v = { render: r };

export { v as default, r as render };
//# sourceMappingURL=MD.R_X9Mbkc-BOHGE6to.mjs.map
