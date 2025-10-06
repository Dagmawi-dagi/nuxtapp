import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.333 85.333 341.333 341.333"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M0 85.337h512v113.775H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 312.888h512v113.775H0z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=SL.ziuksPW9-DQldJWAa.mjs.map
