import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 513 342"
};
function n(r, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#FFF",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#2E52B2" }, [
      createElementVNode("path", { d: "M340.6 122.4h-56.1l-28-48.6-28 48.6h-56.1l28 48.6-28 48.6h56.1l28 48.6 28-48.6h56.1l-28-48.6zM293.2 171 276 204.2h-38.9L219.8 171l17.2-33.2h38.9zm-36.7-71.8 11.9 23.3h-23.9zm-58.3 38.6h23.9l-10.8 21zm0 66.4 13-22.1 11.9 22.1zm58.3 37.5-11.9-22.1h23.9zm59.4-37.5h-25l11.9-22.1zm-26.1-66.4h26.1l-13 22.1zM0 21.3h512V64H0zM0 277.3h512V320H0z" })
    ], -1)
  ]));
}
const z = { render: n };

export { z as default, n as render };
//# sourceMappingURL=IL.BP__CiLC-C6MuSc3t.mjs.map
