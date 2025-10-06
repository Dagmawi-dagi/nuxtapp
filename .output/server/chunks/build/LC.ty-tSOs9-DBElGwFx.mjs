import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#55B2FF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#F3F3F3",
      d: "M148.5 298.1h216l-108-254.2z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#333",
      d: "m186 272.7 70.5-160.3L327 272.7z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFDA44",
      d: "M148.5 298.1h216l-108-101.7z"
    }, null, -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=LC.ty-tSOs9-DBElGwFx.mjs.map
