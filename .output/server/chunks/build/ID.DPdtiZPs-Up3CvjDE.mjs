import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#E00",
      d: "M0 0h513v171H0z"
    }, null, -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=ID.DPdtiZPs-Up3CvjDE.mjs.map
