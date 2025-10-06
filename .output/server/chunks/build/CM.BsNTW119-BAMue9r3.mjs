import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#ce1126",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#007a5e",
      d: "M0 0h171v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#fcd116" }, [
      createElementVNode("path", { d: "M342 0h171v342H342zM256 102.2l17.2 53H329L283.9 188l17.2 53-45.1-32.7-45.1 32.7 17.2-53-45.1-32.8h55.8z" })
    ], -1)
  ]));
}
const h = { render: r };

export { h as default, r as render };
//# sourceMappingURL=CM.BsNTW119-BAMue9r3.mjs.map
