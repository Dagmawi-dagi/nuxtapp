import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(h, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M0 0h512v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M0 0h512v171H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 0h182v342H0z"
    }, null, -1),
    createElementVNode("path", { d: "m98.3 109.8 15.1 46.5h48.9L122.8 185l15.1 46.5-39.6-28.7-39.5 28.7L73.9 185l-39.6-28.7h48.9z" }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=GW.DcKeRVrF-DRHzJDOb.mjs.map
