import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 85.337h512v341.326H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M256 256 0 90.691v44.242L155.826 256 0 377.067v44.242z"
    }, null, -1),
    createElementVNode("path", { d: "M0 90.691v330.618L189.217 256z" }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "m44.184 213.36 24.912 23.577 30.121-16.41-14.723 30.98 24.911 23.575-34.012-4.43L60.67 301.63l-6.296-33.716-34.012-4.43 30.119-16.408z"
    }, null, -1)
  ]));
}
const a = { render: r };

export { a as default, r as render };
//# sourceMappingURL=TL.BAwqFqDJ-CbIIuLY0.mjs.map
