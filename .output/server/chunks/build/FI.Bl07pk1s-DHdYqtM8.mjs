import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#2E52B2",
      d: "M513 129.3V212H203.7v130H121V212H0v-82.7h121V0h82.7v129.3z"
    }, null, -1)
  ]));
}
const v = { render: r };

export { v as default, r as render };
//# sourceMappingURL=FI.Bl07pk1s-DHdYqtM8.mjs.map
