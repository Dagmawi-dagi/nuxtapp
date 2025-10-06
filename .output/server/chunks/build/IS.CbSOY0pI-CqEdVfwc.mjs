import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(v, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M513 210.6H202.2v130.7h-79.8V210.6H0v-79.8h122.4V0h79.8v130.8H513v18.5l-1 42.7z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M513 149.3V192H183.7v149.3H141V192H0v-42.7h141V0h42.7v149.3z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=IS.CbSOY0pI-CqEdVfwc.mjs.map
