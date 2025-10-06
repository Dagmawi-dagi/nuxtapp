import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(s, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 0h513v114H0z"
    }, null, -1),
    createElementVNode("path", { d: "M0 228h513v114H0z" }, null, -1),
    createElementVNode("path", {
      fill: "#C09300",
      d: "M220.3 204.4s0-58.4 4.5-64.7c3.1-4.3 16.8 5.2 22.7 4.5 0 0 4.2-7.5 4.5-12 .3-4.6-1.1-7.6-4.9-6.2 0 0-1.2-2.1.5-3.3 1.6-1.2 5.6.1 5.6.1s-.5-1 1.6-.9c2.9.2 7.2 1.4 7.4 5.6.2 3.1.3 7.7.4 8.7.7 6.8 2.7 8.7 2.7 8.7s18.4-9.2 22-5.2c3.3 3.8 4.5 64.7 4.5 64.7l-18.1-16.8 12.1 29.5s-14.4 2.4-28.9 2.4-31.1-4.2-31.1-4.2l13.8-28.2z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=EG.6iJqiIWN-DQHS-XdE.mjs.map
