import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 85.331h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 85.331h170.663v341.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M341.337 85.331H512v341.337H341.337z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=RO.BpG_vDVp-BJp-8oZ7.mjs.map
