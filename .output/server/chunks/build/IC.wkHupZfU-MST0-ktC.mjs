import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "50 0 200 200"
};
function r(f, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#fc0",
      d: "M0 0h300v200H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0768a9",
      d: "M0 0h200v200H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#fff",
      d: "M0 0h100v200H0z"
    }, null, -1)
  ]));
}
const a = { render: r };

export { a as default, r as render };
//# sourceMappingURL=IC.wkHupZfU-MST0-ktC.mjs.map
