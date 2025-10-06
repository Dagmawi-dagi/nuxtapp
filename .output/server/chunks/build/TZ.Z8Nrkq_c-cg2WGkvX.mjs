import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M0 426.663V85.337h512"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M512 152.222V85.337H411.67L0 359.778v66.885h100.33z"
    }, null, -1),
    createElementVNode("path", { d: "M512 85.337v40.125L60.193 426.663H0v-40.125L451.807 85.337z" }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=TZ.Z8Nrkq_c-cg2WGkvX.mjs.map
