import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(c, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#ffc72c",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#00778b" }, [
      createElementVNode("path", { d: "M0 0h513v114H0zM0 228h513v114H0z" })
    ], -1),
    createElementVNode("path", { d: "M256 171 0 342V0z" }, null, -1)
  ]));
}
const f = { render: r };

export { f as default, r as render };
//# sourceMappingURL=BS.BWUyajBH-CwfWOBg8.mjs.map
