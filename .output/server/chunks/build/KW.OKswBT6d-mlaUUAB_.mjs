import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M0 0h513v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 228h513v114H0z"
    }, null, -1),
    createElementVNode("path", { d: "M167 227.6 0 341.3V0l167 113.8z" }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=KW.OKswBT6d-mlaUUAB_.mjs.map
