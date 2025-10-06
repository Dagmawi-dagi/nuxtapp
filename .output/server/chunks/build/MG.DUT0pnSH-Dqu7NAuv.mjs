import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#6DA544",
      d: "M512 426.666V85.329H0v341.337z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M512 85.331H0v170.666h512z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.334h181.793v341.337H0z"
    }, null, -1)
  ]));
}
const p = { render: r };

export { p as default, r as render };
//# sourceMappingURL=MG.DUT0pnSH-Dqu7NAuv.mjs.map
