import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#d52b1e",
      d: "M0 0h513v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#f9e300",
      d: "M0 114h513v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#007934",
      d: "M0 228h513v114H0z"
    }, null, -1)
  ]));
}
const h = { render: r };

export { h as default, r as render };
//# sourceMappingURL=BO.B_zu8U3s-qnBYBTzi.mjs.map
