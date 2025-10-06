import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function o(c, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h512v342H0z"
    }, null, -1),
    createElementVNode("circle", {
      cx: "256.5",
      cy: "171",
      r: "96",
      fill: "#D80027"
    }, null, -1)
  ]));
}
const s = { render: o };

export { s as default, o as render };
//# sourceMappingURL=JP.MM3odhvP-B-c_cUg3.mjs.map
