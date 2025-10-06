import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(s, t) {
  return openBlock(), createElementBlock("svg", n, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#A2001D" }, [
      createElementVNode("path", {
        d: "M0 0h513v127.6H0zM0 214.4h513V342H0z",
        class: "st1"
      })
    ], -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=LV.Cs6oflx8-Wtd5UJkP.mjs.map
