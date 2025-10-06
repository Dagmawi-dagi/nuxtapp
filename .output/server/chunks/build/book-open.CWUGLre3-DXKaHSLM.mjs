import { createElementBlock, openBlock, createElementVNode } from 'vue';

const r = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function l(c, e) {
  return openBlock(), createElementBlock("svg", r, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M12 6.042A8.97 8.97 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A9 9 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.97 8.97 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A9 9 0 0 0 18 18a8.97 8.97 0 0 0-6 2.292m0-14.25v14.25"
    }, null, -1)
  ]));
}
const s = { render: l };

export { s as default, l as render };
//# sourceMappingURL=book-open.CWUGLre3-DXKaHSLM.mjs.map
