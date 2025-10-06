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
      d: "M4.499 8.248h15m-15 7.501h15"
    }, null, -1)
  ]));
}
const d = { render: l };

export { d as default, l as render };
//# sourceMappingURL=equals.Y4339RW6-CKookNbc.mjs.map
