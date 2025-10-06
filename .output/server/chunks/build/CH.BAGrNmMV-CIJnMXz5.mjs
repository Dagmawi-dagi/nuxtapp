import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 85.333 342 342"
};
function r(h, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "red",
      d: "M0 85.337h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M356.174 222.609h-66.783v-66.783h-66.782v66.783h-66.783v66.782h66.783v66.783h66.782v-66.783h66.783z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=CH.BAGrNmMV-CIJnMXz5.mjs.map
