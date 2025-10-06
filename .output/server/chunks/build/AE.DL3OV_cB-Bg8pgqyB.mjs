import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "51.3 0 342 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#009e49",
      d: "M0 0h513v114H0z"
    }, null, -1),
    createElementVNode("path", { d: "M0 228h513v114H0z" }, null, -1),
    createElementVNode("path", {
      fill: "#ce1126",
      d: "M0 0h171v342H0z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=AE.DL3OV_cB-Bg8pgqyB.mjs.map
