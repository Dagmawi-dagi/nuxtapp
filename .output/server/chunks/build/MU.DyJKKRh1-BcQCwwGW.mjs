import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.333 85.333 341.333 341.333"
};
function r(a, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#f7ce00",
      d: "M0 85.331h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#e32737",
      d: "M0 85.331h512v85.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#191f6a",
      d: "M0 170.657h512v85.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#00a04e",
      d: "M0 341.331h512v85.337H0z"
    }, null, -1)
  ]));
}
const f = { render: r };

export { f as default, r as render };
//# sourceMappingURL=MU.DyJKKRh1-BcQCwwGW.mjs.map
