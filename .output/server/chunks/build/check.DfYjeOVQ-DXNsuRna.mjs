import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function l(i, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "m4.5 12.75 6 6 9-13.5"
    }, null, -1)
  ]));
}
const c = { render: l };

export { c as default, l as render };
//# sourceMappingURL=check.DfYjeOVQ-DXNsuRna.mjs.map
