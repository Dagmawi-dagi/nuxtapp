import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "37.547 85.333 341.333 341.333"
};
function r(v, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 85.334h512v341.337H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M512 295.883H202.195v130.783h-79.76V295.883H0v-79.772h122.435V85.329h79.76v130.782H512v61.218z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#2E52B2",
      d: "M512 234.666v42.663H183.652v149.337h-42.674V277.329H0v-42.663h140.978V85.329h42.674v149.337z"
    }, null, -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=NO.D51PWO9_-DjXQaIFw.mjs.map
