import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 513 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#da1a35",
      d: "M0 85.331h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#009543",
      d: "M443.726 85.331 102.4 426.657H0V85.331z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#fbde4a",
      d: "M500.124 85.331 158.798 426.657H11.876L353.202 85.331z"
    }, null, -1)
  ]));
}
const f = { render: r };

export { f as default, r as render };
//# sourceMappingURL=CG.C-q68dvF-DNbf_hjj.mjs.map
