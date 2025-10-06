import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(v, t) {
  return openBlock(), createElementBlock("svg", o, t[0] || (t[0] = [
    createElementVNode("path", {
      fill: "#ffc726",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("g", { fill: "#00267f" }, [
      createElementVNode("path", { d: "M0 0h171v342H0zM342 0h171v342H342z" })
    ], -1),
    createElementVNode("path", { d: "m325.74 101.02-31.97 12.4c-.68 1.35-5.79 7.54-8.18 53.06h-17.05v-60.42L256 78.68l-12.54 27v60.8H226.4c-2.39-45.53-7.8-52.48-8.47-53.84l-31.68-11.63c.15.31 15.4 31.34 15.4 78.01v12.54h41.81v71.07h25.08v-71.07h41.81v-12.54c0-24.13 4.17-44.02 7.68-56.46 3.82-13.57 7.7-21.49 7.74-21.57z" }, null, -1)
  ]));
}
const h = { render: r };

export { h as default, r as render };
//# sourceMappingURL=BB.Ctz2WaY4-D8f2_33S.mjs.map
