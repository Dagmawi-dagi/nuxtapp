import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#12ad2b",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#6ab2e7",
      d: "M513 0v166.7L0 170.8V0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M256 170.7 0 342V0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#d7141a",
      d: "m89.8 92.5 17 52.4H162l-44.6 32.5 17 52.4-44.6-32.4-44.6 32.4 17-52.4-44.6-32.5h55.2z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=DJ.DVaF8Ebt-ClIknhlY.mjs.map
