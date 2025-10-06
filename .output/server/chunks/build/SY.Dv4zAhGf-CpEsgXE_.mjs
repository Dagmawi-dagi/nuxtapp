import { createElementBlock, openBlock, createElementVNode } from 'vue';

const f = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "150 0 600 600"
};
function o(r, e) {
  return openBlock(), createElementBlock("svg", f, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#0f0f0f",
      d: "M0 0h900v600H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#fff",
      d: "M0 0h900v400H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#047a3f",
      d: "M0 0h900v200H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ce1126",
      d: "m176.26 375 48.738-150 48.738 150-127.6-92.705h157.72M626.256 375l48.738-150 48.738 150-127.6-92.705h157.72M401.252 375l48.738-150 48.738 150-127.6-92.705h157.72"
    }, null, -1)
  ]));
}
const d = { render: o };

export { d as default, o as render };
//# sourceMappingURL=SY.Dv4zAhGf-CpEsgXE_.mjs.map
