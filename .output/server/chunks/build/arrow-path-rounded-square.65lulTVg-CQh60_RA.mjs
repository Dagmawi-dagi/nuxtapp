import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function l(d, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M19.5 12q0-1.848-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 49 49 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7q-.025.33-.046.662M19.5 12l3-3m-3 3-3-3m-12 3q0 1.848.138 3.662a4.006 4.006 0 0 0 3.7 3.7 49 49 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7q.025-.33.046-.662M4.5 12l3 3m-3-3-3 3"
    }, null, -1)
  ]));
}
const s = { render: l };

export { s as default, l as render };
//# sourceMappingURL=arrow-path-rounded-square.65lulTVg-CQh60_RA.mjs.map
