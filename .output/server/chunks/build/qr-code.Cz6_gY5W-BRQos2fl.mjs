import { createElementBlock, openBlock, createElementVNode } from 'vue';

const h = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function n(c, e) {
  return openBlock(), createElementBlock("svg", h, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375z"
    }, null, -1),
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M6.75 6.75h.75v.75h-.75zM6.75 16.5h.75v.75h-.75zM16.5 6.75h.75v.75h-.75zM13.5 13.5h.75v.75h-.75zM13.5 19.5h.75v.75h-.75zM19.5 13.5h.75v.75h-.75zM19.5 19.5h.75v.75h-.75zM16.5 16.5h.75v.75h-.75z"
    }, null, -1)
  ]));
}
const d = { render: n };

export { d as default, n as render };
//# sourceMappingURL=qr-code.Cz6_gY5W-BRQos2fl.mjs.map
