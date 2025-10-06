import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 900 600"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#231f1e",
      d: "M0 0h900v600H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#00a650",
      d: "M0 0h900v300H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ef1923",
      d: "m0 0 450 300L0 600z"
    }, null, -1)
  ]));
}
const a = { render: r };

export { a as default, r as render };
//# sourceMappingURL=MQ.CmYzaN0A-KSWprteS.mjs.map
