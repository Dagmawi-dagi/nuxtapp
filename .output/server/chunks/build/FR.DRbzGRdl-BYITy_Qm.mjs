import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(d, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#00318A",
      d: "M0 0h171v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#D80027",
      d: "M342 0h171v342H342z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=FR.DRbzGRdl-BYITy_Qm.mjs.map
