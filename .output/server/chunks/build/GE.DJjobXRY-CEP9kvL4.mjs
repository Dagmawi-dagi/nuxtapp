import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 22.5 15"
};
function v(o, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M.8 0h21v15H.8z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#eb000e",
      d: "M9.8 6H0v3h9.8v6h3V9h9.8V6h-9.8V0h-3z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#eb000e",
      d: "m17.3 2.7-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1zm-12.7 0-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1zm0 9-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1zm12.7 0-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1z"
    }, null, -1)
  ]));
}
const m = { render: v };

export { m as default, v as render };
//# sourceMappingURL=GE.DJjobXRY-CEP9kvL4.mjs.map
