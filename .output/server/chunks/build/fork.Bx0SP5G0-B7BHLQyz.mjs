import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function l(c, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("circle", {
      cx: "6",
      cy: "6",
      r: "3",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, null, -1),
    createElementVNode("circle", {
      cx: "18",
      cy: "6",
      r: "3",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, null, -1),
    createElementVNode("circle", {
      cx: "12",
      cy: "18",
      r: "3",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, null, -1),
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-width": "2",
      d: "M6 9v1a2 2 0 0 0 2 2h4m6-3v1a2 2 0 0 1-2 2h-4m0 0v3"
    }, null, -1)
  ]));
}
const s = { render: l };

export { s as default, l as render };
//# sourceMappingURL=fork.Bx0SP5G0-B7BHLQyz.mjs.map
