import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "124 0 496 496"
};
function r(f, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#3A7DCE",
      d: "M0 0h744v496H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#fff",
      d: "m120 125 90 63 54-14 23-81 61-36 92 14 105 55 6 90 34 12v92l-65 115-78 24-72-17 18-30-8-32-10 9-162-25-49-85 20-46-49-62z"
    }, null, -1)
  ]));
}
const s = { render: r };

export { s as default, r as render };
//# sourceMappingURL=AQ.Dc39pDt_-CkYlOgAJ.mjs.map
