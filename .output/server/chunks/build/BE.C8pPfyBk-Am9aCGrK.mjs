import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#fdda25",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", { d: "M0 0h171v342H0z" }, null, -1),
    createElementVNode("path", {
      fill: "#ef3340",
      d: "M342 0h171v342H342z"
    }, null, -1)
  ]));
}
const f = { render: r };

export { f as default, r as render };
//# sourceMappingURL=BE.C8pPfyBk-Am9aCGrK.mjs.map
