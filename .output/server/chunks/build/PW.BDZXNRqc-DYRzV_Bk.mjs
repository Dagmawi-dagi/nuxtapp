import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function o(c, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 85.331h512v341.337H0z"
    }, null, -1),
    createElementVNode("circle", {
      cx: "218.902",
      cy: "255.994",
      r: "74.207",
      fill: "#FFDA44"
    }, null, -1)
  ]));
}
const s = { render: o };

export { s as default, o as render };
//# sourceMappingURL=PW.BDZXNRqc-DYRzV_Bk.mjs.map
