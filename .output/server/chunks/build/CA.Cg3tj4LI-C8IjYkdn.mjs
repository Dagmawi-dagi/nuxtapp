import { createElementBlock, openBlock, createElementVNode } from 'vue';

const r = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function n(h, l) {
  return openBlock(), createElementBlock("svg", r, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "red" }, [
      createElementVNode("path", { d: "M0 0h142v342H0zM371 0h142v342H371zM306.5 206l50.4-25.2-25.2-12.6V143l-50.4 25.2 25.2-50.4h-25.2L256.1 80l-25.2 37.8h-25.2l25.2 50.4-50.4-25.2v25.2l-25.2 12.6 50.4 25.2-12.6 25.2h50.4V269h25.2v-37.8h50.4z" })
    ], -1)
  ]));
}
const v = { render: n };

export { v as default, n as render };
//# sourceMappingURL=CA.Cg3tj4LI-C8IjYkdn.mjs.map
