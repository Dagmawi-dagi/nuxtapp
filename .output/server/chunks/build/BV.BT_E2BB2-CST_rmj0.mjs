import { createElementBlock, openBlock, createStaticVNode } from 'vue';

const l = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 33.333 1100 733.333"
};
function a(p, t) {
  return openBlock(), createElementBlock("svg", l, t[0] || (t[0] = [
    createStaticVNode('<path fill="#ef2b2d" d="M0 0h1100v800H0z"></path><path fill="#fff" d="M300 0h200v800H300z"></path><path fill="#fff" d="M0 300h1100v200H0z"></path><path fill="#002868" d="M350 0h100v800H350z"></path><path fill="#002868" d="M0 350h1100v100H0z"></path>', 5)
  ]));
}
const r = { render: a };

export { r as default, a as render };
//# sourceMappingURL=BV.BT_E2BB2-CST_rmj0.mjs.map
