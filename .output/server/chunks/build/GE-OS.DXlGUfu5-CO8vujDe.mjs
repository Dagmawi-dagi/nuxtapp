import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 450 300"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h450v300H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "red",
      d: "M0 100h450v200H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDF00",
      d: "M0 200h450v100H0z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=GE-OS.DXlGUfu5-CO8vujDe.mjs.map
