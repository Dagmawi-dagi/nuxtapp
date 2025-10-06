import { createElementBlock, openBlock, createElementVNode } from 'vue';

const r = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 342"
};
function o(c, e) {
  return openBlock(), createElementBlock("svg", r, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#272727",
      d: "M0 0h512v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#e40112",
      d: "M0 114h512v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#07893f",
      d: "M0 228h512v114H0z"
    }, null, -1),
    createElementVNode("circle", {
      cx: "256",
      cy: "125",
      r: "95",
      fill: "#e40112"
    }, null, -1)
  ]));
}
const d = { render: o };

export { d as default, o as render };
//# sourceMappingURL=MW.BR-mJeJ9-DnXNxDJa.mjs.map
