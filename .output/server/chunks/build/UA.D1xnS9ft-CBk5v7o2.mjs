import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 85.337h512V256H0z"
    }, null, -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=UA.D1xnS9ft-CBk5v7o2.mjs.map
