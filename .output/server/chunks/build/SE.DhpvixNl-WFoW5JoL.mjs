import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "30.72 85.333 341.333 341.333"
};
function r(h, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 85.333h512V426.67H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M192 85.33h-64v138.666H0v64h128v138.666h64V287.996h320v-64H192z"
    }, null, -1)
  ]));
}
const s = { render: r };

export { s as default, r as render };
//# sourceMappingURL=SE.DhpvixNl-WFoW5JoL.mjs.map
