import { createElementBlock, openBlock, createStaticVNode } from 'vue';

const l = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "9 0 100 100"
};
function a(p, t) {
  return openBlock(), createElementBlock("svg", l, t[0] || (t[0] = [
    createStaticVNode('<path fill="#D80B30" d="M0 0h150v100H0z"></path><path fill="#00318A" d="M0 0h20v44.33H0z"></path><path fill="#FFF" d="M20 0h20v44.33H20z"></path><path fill="none" stroke="#FFF" stroke-width="3" d="M0 44.33h62.75V0"></path><path fill="#FFF" d="M108.08 43.29 87.96 23.17h40.25zm-6.7 6.71L81.25 29.88v40.25zm6.7 6.71L87.96 76.83h40.25zm6.71-6.71 20.13-20.13v40.25z"></path>', 5)
  ]));
}
const n = { render: a };

export { n as default, a as render };
//# sourceMappingURL=WF.BEL1BhZX-BravBKvf.mjs.map
