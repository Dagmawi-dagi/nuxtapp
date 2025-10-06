import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 85.5 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", n, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.5h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#007b23" }, [
      createElementVNode("path", { d: "M0 85.5h171v342H0zM342 85.5h171v342H342z" })
    ], -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=NG.CxIJRtuh-BUOcZOWy.mjs.map
