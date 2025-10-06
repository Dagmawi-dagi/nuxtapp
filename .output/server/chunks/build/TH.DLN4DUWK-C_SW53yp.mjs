import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 85.333 512 341.333"
};
function r(d, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.334h512V426.66H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#0052B4",
      d: "M0 194.056h512v123.882H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#D80027" }, [
      createElementVNode("path", { d: "M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z" })
    ], -1)
  ]));
}
const i = { render: r };

export { i as default, r as render };
//# sourceMappingURL=TH.DLN4DUWK-C_SW53yp.mjs.map
