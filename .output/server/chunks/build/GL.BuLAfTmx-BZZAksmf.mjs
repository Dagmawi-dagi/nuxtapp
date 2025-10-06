import { createElementBlock, openBlock, createElementVNode } from 'vue';

const r = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function o(c, e) {
  return openBlock(), createElementBlock("svg", r, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M513 0v171H0V0z"
    }, null, -1),
    createElementVNode("circle", {
      cx: "185.8",
      cy: "171.2",
      r: "117.8",
      fill: "#FFF"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M68 171c0-65.1 52.8-117.8 117.8-117.8 65.1 0 117.8 52.8 117.8 117.8"
    }, null, -1)
  ]));
}
const d = { render: o };

export { d as default, o as render };
//# sourceMappingURL=GL.BuLAfTmx-BZZAksmf.mjs.map
