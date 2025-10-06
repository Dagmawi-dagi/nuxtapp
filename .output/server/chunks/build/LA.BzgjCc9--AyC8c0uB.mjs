import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function o(c, l) {
  return openBlock(), createElementBlock("svg", n, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#D80027" }, [
      createElementVNode("path", { d: "M0 .1h513v90.7H0zM0 251.3h513V342H0z" })
    ], -1),
    createElementVNode("circle", {
      cx: "256.5",
      cy: "171",
      r: "65.9",
      fill: "#FFF"
    }, null, -1)
  ]));
}
const d = { render: o };

export { d as default, o as render };
//# sourceMappingURL=LA.BzgjCc9--AyC8c0uB.mjs.map
