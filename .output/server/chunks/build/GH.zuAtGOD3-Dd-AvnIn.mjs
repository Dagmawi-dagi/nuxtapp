import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 0h513v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#496E2D",
      d: "M0 228h513v114H0z"
    }, null, -1),
    createElementVNode("path", { d: "m255.9 113.8 14.1 43.4 40.4 3.2-37 26.9 19.5 40.3-37-26.9-37 26.9 14.1-43.5-36.9-26.9h45.7z" }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=GH.zuAtGOD3-Dd-AvnIn.mjs.map
