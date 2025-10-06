import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function r(m, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M6.75 2.995v2.25m10.5-2.252v2.25m-14.252 13.5V7.493a2.25 2.25 0 0 1 2.25-2.251h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12zm-.001 4.5h.006v.006h-.006zm-2.25.001h.005v.006H9.75zm-2.25 0h.005v.005h-.006zm6.75-2.247h.005v.005h-.005zm0 2.247h.006v.006h-.006zm2.25-2.248h.006V15H16.5z"
    }, null, -1)
  ]));
}
const l = { render: r };

export { l as default, r as render };
//# sourceMappingURL=calendar-date-range.Dy5vs7S_-D2iryGH7.mjs.map
