import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#C31B28",
      d: "M256 0h256.5v342H256z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ACABB1",
      stroke: "#C31B28",
      "stroke-width": "2",
      d: "M101.2 68.2V33H66v35.2H30.8v35.2H66v35.2h35.2v-35.2h35.2V68.2z"
    }, null, -1)
  ]));
}
const s = { render: r };

export { s as default, r as render };
//# sourceMappingURL=MT.CLw8iSsT-DfY32gbY.mjs.map
