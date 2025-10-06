import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "37.62 0 342 342"
};
function r(h, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0F61A5",
      d: "M513 214.5H206.2V342h-87.8V214.5H0v-87.7h118.4V0h87.8v126.8H513V192z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#E50E3D",
      d: "M513 149.3V192H183.7v150H141V192H0v-42.7h141V0h42.7v149.3z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=FO.DuO3n-Nm-AsR-mz2u.mjs.map
