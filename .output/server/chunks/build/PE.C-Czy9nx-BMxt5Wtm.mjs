import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", n, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.331h512v341.326H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#D80027" }, [
      createElementVNode("path", { d: "M0 85.331h170.663v341.337H0zM341.337 85.331H512v341.337H341.337z" })
    ], -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=PE.C-Czy9nx-BMxt5Wtm.mjs.map
