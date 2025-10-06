import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#751A46",
      d: "M0 0h512v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0v342h150.3l37.7-19.6-37.7-18.9 37.7-19-37.7-18.9 37.7-19-37.7-19 37.7-18.9-37.7-19 37.7-19-37.7-18.9 37.7-19-37.7-18.9 37.7-19-37.7-19L188 57l-37.7-19L188 19.1 150.3 0z"
    }, null, -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=QA.BsUd6csT-CsvKZnwx.mjs.map
