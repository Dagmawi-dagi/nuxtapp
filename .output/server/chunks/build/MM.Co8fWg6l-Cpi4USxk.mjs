import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 85.337h512v113.775H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 312.888h512v113.775H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M384 227.261h-97.783L256 134.265l-30.217 92.997H128l79.108 57.475-30.217 92.998L256 320.925l79.108 56.81-30.217-92.998z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=MM.Co8fWg6l-Cpi4USxk.mjs.map
