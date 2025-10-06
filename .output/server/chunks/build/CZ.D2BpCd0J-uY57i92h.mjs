import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#11457e",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#d7141a",
      d: "M513 171v171H0l256.5-171z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M513 0v171H256.5L0 0z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=CZ.D2BpCd0J-uY57i92h.mjs.map
