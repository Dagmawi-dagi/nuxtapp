import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M196 0h317v171H196z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0037A1",
      d: "M0 0h196v171H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M98 24.5 113.1 71H162l-39.6 28.7 15.2 46.5L98 117.5l-39.6 28.7 15.2-46.5L34 71h48.9z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=CL.i0X4KDB--CG2dZDEE.mjs.map
