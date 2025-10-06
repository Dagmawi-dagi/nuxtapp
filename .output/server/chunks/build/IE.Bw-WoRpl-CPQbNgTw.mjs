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
      fill: "#6DA544",
      d: "M0 0h171v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FF9811",
      d: "M342 0h171v342H342z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=IE.Bw-WoRpl-CPQbNgTw.mjs.map
