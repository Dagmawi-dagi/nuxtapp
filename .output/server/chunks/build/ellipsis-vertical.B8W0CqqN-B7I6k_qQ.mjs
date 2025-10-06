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
      d: "M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5M12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5"
    }, null, -1)
  ]));
}
const d = { render: l };

export { d as default, l as render };
//# sourceMappingURL=ellipsis-vertical.B8W0CqqN-B7I6k_qQ.mjs.map
