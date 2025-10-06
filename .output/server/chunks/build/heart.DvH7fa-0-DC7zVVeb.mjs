import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function l(s, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.936 0-3.598 1.126-4.313 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.098 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12"
    }, null, -1)
  ]));
}
const c = { render: l };

export { c as default, l as render };
//# sourceMappingURL=heart.DvH7fa-0-DC7zVVeb.mjs.map
