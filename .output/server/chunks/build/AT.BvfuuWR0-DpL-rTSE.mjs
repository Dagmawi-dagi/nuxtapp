import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 114h513v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 0h513v114H0zM0 228h513v114H0z"
    }, null, -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=AT.BvfuuWR0-DpL-rTSE.mjs.map
