import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 85.5 342 342"
};
function r(h, t) {
  return openBlock(), createElementBlock("svg", n, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 85.5h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#007b23" }, [
      createElementVNode("path", { d: "M0 85.5h171v342H0zM342 85.5h171v342H342zM304 311.995l-48-152.001-48 152.001h36v39.999h24v-39.999z" })
    ], -1)
  ]));
}
const d = { render: r };

export { d as default, r as render };
//# sourceMappingURL=NF.CGAF4Q-E-DRs1NIMY.mjs.map
