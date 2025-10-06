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
      d: "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
    }, null, -1)
  ]));
}
const d = { render: l };

export { d as default, l as render };
//# sourceMappingURL=cursor-arrow-ripple.xLXix2uM-UbRX2pFw.mjs.map
