import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.33v341.332h512V85.33z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 85.333h512V426.67H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.333h512v113.775H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 312.884h512v113.775H0z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=RU.DOPKV_i9-QS_mbROH.mjs.map
