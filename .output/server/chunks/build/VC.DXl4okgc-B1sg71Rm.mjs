import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 85.331h512v341.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 85.331h170.663v341.337H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#6DA544" }, [
      createElementVNode("path", { d: "M341.337 85.331H512v341.337H341.337zM214.261 283.82l-33.393-50.086 33.392-50.087 33.392 50.087zM297.739 283.82l-33.391-50.086 33.391-50.087 33.393 50.087zM256 350.603l-33.391-50.087L256 250.429l33.391 50.087z" })
    ], -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=VC.DXl4okgc-B1sg71Rm.mjs.map
