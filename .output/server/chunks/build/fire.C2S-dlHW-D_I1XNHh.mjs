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
      d: "M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.3 8.3 0 0 0 9 9.601a8.98 8.98 0 0 1 3.361-6.867 8.2 8.2 0 0 0 3 2.48"
    }, null, -1),
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M12 18a3.75 3.75 0 0 0 .495-7.468 6 6 0 0 0-1.925 3.547 6 6 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18"
    }, null, -1)
  ]));
}
const d = { render: l };

export { d as default, l as render };
//# sourceMappingURL=fire.C2S-dlHW-D_I1XNHh.mjs.map
