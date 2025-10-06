import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function n(c, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h512v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 0h512v114H0zM0 228h512v114H0z"
    }, null, -1),
    createElementVNode("circle", {
      cx: "256.5",
      cy: "171",
      r: "40",
      fill: "#FFDA44",
      stroke: "#d6ab00",
      "stroke-width": "5"
    }, null, -1)
  ]));
}
const i = { render: n };

export { i as default, n as render };
//# sourceMappingURL=AR.EjmIUk57-Btj82z1E.mjs.map
