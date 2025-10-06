import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#3d944f",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ef2b2d",
      d: "M0 0h513v171H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "m256 102.6 16.9 52h54.7l-44.2 32.2 16.8 52-44.2-32.1-44.2 32.1 16.8-52-44.2-32.2h54.7z"
    }, null, -1)
  ]));
}
const h = { render: r };

export { h as default, r as render };
//# sourceMappingURL=BF.BZMikFuT-C8YURTdY.mjs.map
