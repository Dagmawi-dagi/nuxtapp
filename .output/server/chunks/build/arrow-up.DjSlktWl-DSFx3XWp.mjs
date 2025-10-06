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
    createElementVNode(
      "path",
      {
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "1.5",
        d: "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
      },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const d = { render: l };

export { d as default, l as render };
//# sourceMappingURL=arrow-up.DjSlktWl-DSFx3XWp.mjs.map
