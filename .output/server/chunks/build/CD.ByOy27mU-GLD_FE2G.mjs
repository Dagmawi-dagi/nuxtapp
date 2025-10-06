import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M513 66.9V0H411.7L0 274.4V342h100.3z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M513 0v40.1L60.2 342H0v-40.8L451.8 0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "m93.6 31.2 16.3 50.4H163l-42.9 31.2 16.4 50.5-42.9-31.2-43 31.2L67 112.8 24.1 81.6h53.1z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=CD.ByOy27mU-GLD_FE2G.mjs.map
