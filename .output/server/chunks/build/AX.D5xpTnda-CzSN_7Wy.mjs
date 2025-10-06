import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "39.33 0 342 342"
};
function r(h, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M513 210.9H202.2V342h-79.8V210.9H0v-79.8h122.4V0h79.8v131.1H513v61.2z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M513 149.7v42.6H183.7V342H141V192.3H0v-42.6h141V0h42.7v149.7z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=AX.D5xpTnda-CzSN_7Wy.mjs.map
