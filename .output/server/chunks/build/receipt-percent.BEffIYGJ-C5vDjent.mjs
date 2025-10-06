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
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.5 48.5 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185M9.75 9h.008v.008H9.75zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0m4.125 4.5h.008v.008h-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0"
    }, null, -1)
  ]));
}
const m = { render: l };

export { m as default, l as render };
//# sourceMappingURL=receipt-percent.BEffIYGJ-C5vDjent.mjs.map
