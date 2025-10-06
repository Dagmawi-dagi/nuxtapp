import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.333 85.333 341.333 341.333"
};
function r(d, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 85.331h512v341.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "m256 157.273 22.663 69.748H352l-59.332 43.106 22.664 69.749L256 296.769l-59.332 43.107 22.664-69.749L160 227.021h73.337z"
    }, null, -1)
  ]));
}
const c = { render: r };

export { c as default, r as render };
//# sourceMappingURL=SO.BcADMSh6-B-hXGkmC.mjs.map
