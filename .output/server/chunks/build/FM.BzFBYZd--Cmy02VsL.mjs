import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function r(v, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#338AF3",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#FFF" }, [
      createElementVNode("path", { d: "m256 37.9 10.1 31.2H299l-26.6 19.3 10.2 31.2-26.6-19.3-26.6 19.3 10.2-31.2L213 69.1h32.9zM123.2 170.7l31.2-10.2v-32.8l19.3 26.6 31.2-10.2-19.3 26.6 19.3 26.5-31.2-10.1-19.3 26.5v-32.8zM256 303.5l-10.1-31.2H213l26.6-19.3-10.2-31.3L256 241l26.6-19.3-10.2 31.3 26.6 19.3h-32.9zM388.8 170.7l-31.2 10.1v32.8l-19.3-26.5-31.2 10.1 19.3-26.5-19.3-26.6 31.2 10.2 19.3-26.6v32.8z" })
    ], -1)
  ]));
}
const s = { render: r };

export { s as default, r as render };
//# sourceMappingURL=FM.BzFBYZd--Cmy02VsL.mjs.map
