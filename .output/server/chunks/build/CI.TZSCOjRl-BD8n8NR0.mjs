import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#009e60",
      d: "M342 0h171v342H342z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#f77f00",
      d: "M0 0h171v342H0z"
    }, null, -1)
  ]));
}
const h = { render: r };

export { h as default, r as render };
//# sourceMappingURL=CI.TZSCOjRl-BD8n8NR0.mjs.map
