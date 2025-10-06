import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 90 60"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FDEB01",
      d: "m0 0 90 60H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#58A846",
      d: "M90 0v60L0 0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ED3D24",
      d: "m50.7 33.3 9.3-6.7H48.5L45 15.7l-3.5 10.9H30l9.3 6.7-3.6 11 9.3-6.7 9.3 6.7z"
    }, null, -1)
  ]));
}
const m = { render: r };

export { m as default, r as render };
//# sourceMappingURL=GF.BtTUEvWF-DdNncFaB.mjs.map
