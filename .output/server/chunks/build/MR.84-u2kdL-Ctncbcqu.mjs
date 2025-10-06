import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 100 513 342"
};
function c(r, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#006233",
      d: "M0 100h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#cd2a3e",
      d: "M0 100h513v46H0zM0 396h513v46H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ffc400",
      d: "M256 298.851c-45.956 0-84.348-32.298-93.767-75.429A96.3 96.3 0 0 0 160 243.994c0 53.02 42.979 96 96 96s96-42.98 96-96c0-7.066-.785-13.942-2.233-20.572-9.419 43.131-47.811 75.429-93.767 75.429"
    }, null, -1),
    createElementVNode("path", {
      fill: "#ffc400",
      d: "m255.999 171.994 8.935 27.502h28.918l-23.394 16.996 8.936 27.503-23.395-16.998-23.394 16.998 8.937-27.503-23.394-16.996h28.915z"
    }, null, -1)
  ]));
}
const d = { render: c };

export { d as default, c as render };
//# sourceMappingURL=MR.84-u2kdL-Ctncbcqu.mjs.map
