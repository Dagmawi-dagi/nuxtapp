import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", n, t[0] || (t[0] = [
    createElementVNode("g", { fill: "#FFF" }, [
      createElementVNode("path", { d: "M0 85.337h512v341.326H0z" }),
      createElementVNode("path", { d: "M0 85.337h512V256H0z" })
    ], -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 256h512v170.663H0z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=PL.DxSiI5bD-CNR45JDU.mjs.map
