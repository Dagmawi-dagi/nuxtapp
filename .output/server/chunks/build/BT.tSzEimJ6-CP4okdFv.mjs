import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(i, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FF7415",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M513 0H0v342"
    }, null, -1),
    createElementVNode("path", {
      fill: "none",
      stroke: "#FFF",
      "stroke-miterlimit": "10",
      "stroke-width": "42",
      d: "M128.7 255.5s35 54 67.3 32.4c56.9-37.9-68.9-108.6-2.9-152.6 58.3-38.8 76.6 103.5 137.6 62.8 59-39.3-64.7-111.4-9.2-148.4 33.4-22.2 67.1 32.6 67.1 32.6"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=BT.tSzEimJ6-CP4okdFv.mjs.map
