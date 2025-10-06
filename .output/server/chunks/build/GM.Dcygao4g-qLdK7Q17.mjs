import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#cf0d19",
      d: "M0 0h513v100H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 121h513v100H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#1a7e25",
      d: "M0 242h513v100H0z"
    }, null, -1)
  ]));
}
const a = { render: r };

export { a as default, r as render };
//# sourceMappingURL=GM.Dcygao4g-qLdK7Q17.mjs.map
