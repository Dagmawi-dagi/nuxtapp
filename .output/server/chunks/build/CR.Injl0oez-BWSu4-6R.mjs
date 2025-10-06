import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 114h513v114H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 285h513v57H0zM0 0h513v57H0z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=CR.Injl0oez-BWSu4-6R.mjs.map
