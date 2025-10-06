import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", { d: "M0 85.337h512v113.775H0z" }, null, -1),
    createElementVNode("path", {
      fill: "#268024",
      d: "M0 312.888h512v113.775H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#e4312b",
      d: "M256 256.006 0 426.668V85.331z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=PS.2NPvdPj_-XeiJ0_Bj.mjs.map
