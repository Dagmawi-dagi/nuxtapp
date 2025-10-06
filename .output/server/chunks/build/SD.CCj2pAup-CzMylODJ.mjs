import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 85.337h512v113.775H0z"
    }, null, -1),
    createElementVNode("path", { d: "M0 312.888h512v113.775H0z" }, null, -1),
    createElementVNode("path", {
      fill: "#496E2D",
      d: "M0 426.668V85.331l256 170.675z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=SD.CCj2pAup-CzMylODJ.mjs.map
