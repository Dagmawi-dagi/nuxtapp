import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "11.97 0 342 342"
};
function r(h, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#002b7f",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#f9e814",
      d: "M0 233.5h513v51H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#FFF" }, [
      createElementVNode("path", { d: "m168.7 86.5 12.9 39.8h41.8l-33.8 24.5 12.9 39.7-33.8-24.5-33.8 24.5 12.9-39.7-33.8-24.5h41.8zM85.4 32.5l7.8 23.9h25L97.9 71.1l7.8 23.8-20.3-14.7-20.3 14.7 7.8-23.8-20.3-14.7h25.1z" })
    ], -1)
  ]));
}
const f = { render: r };

export { f as default, r as render };
//# sourceMappingURL=CW.DZX9wIaE-DRfoDLtC.mjs.map
