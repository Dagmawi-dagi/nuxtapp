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
      d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0m0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0m0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0m0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const m = { render: l };

export { m as default, l as render };
//# sourceMappingURL=ellipsis-horizontal-circle.BFOXQi09-CTDaeIGM.mjs.map
