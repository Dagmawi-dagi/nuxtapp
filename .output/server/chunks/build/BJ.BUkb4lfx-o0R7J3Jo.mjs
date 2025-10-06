import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "58.14 85.333 342 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#008751",
      d: "M0 85.333h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#fcd116",
      d: "M196.666 85.333H513v171H196.666z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#e8112d",
      d: "M196.666 256H513v171H196.666z"
    }, null, -1)
  ]));
}
const f = { render: r };

export { f as default, r as render };
//# sourceMappingURL=BJ.BUkb4lfx-o0R7J3Jo.mjs.map
