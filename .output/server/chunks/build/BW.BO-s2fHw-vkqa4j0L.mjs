import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#6da9d2" }, [
      createElementVNode("path", { d: "M0 238h513v104H0zM0 0h513v104H0z" })
    ], -1),
    createElementVNode("path", { d: "M0 125.5h513v89.656H0z" }, null, -1)
  ]));
}
const a = { render: r };

export { a as default, r as render };
//# sourceMappingURL=BW.BO-s2fHw-vkqa4j0L.mjs.map
