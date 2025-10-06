import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.333 85.333 341.333 341.333"
};
function r(c, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.333h512v341.333H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#c70000",
      d: "M0 85.333h512V256H0z"
    }, null, -1)
  ]));
}
const s = { render: r };

export { s as default, r as render };
//# sourceMappingURL=MC.rASBCawX-BdNTzjRQ.mjs.map
