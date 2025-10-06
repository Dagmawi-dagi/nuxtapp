import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(h, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", { d: "M215.9 171 0 314.6V26.8zM513 26.8v287.8L296.1 171z" }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M513 26.8 296.1 171 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4L215.9 171 0 26.8V0h40.1L256 143.9 471.9 0H513z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M513 26.8 296.1 171 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4L215.9 171 0 26.8V0h40.1L256 143.9 471.9 0H513z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=JM.Cf65m7ml-gBf2Jy74.mjs.map
