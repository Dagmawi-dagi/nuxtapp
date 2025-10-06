import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function l(i, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M9.879 7.519c1.172-1.025 3.071-1.025 4.243 0 1.171 1.025 1.171 2.687 0 3.712q-.308.268-.67.442c-.746.361-1.452.999-1.452 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-9 5.25h.008v.008H12z"
    }, null, -1)
  ]));
}
const c = { render: l };

export { c as default, l as render };
//# sourceMappingURL=question-mark-circle.BI3Pj1lM-CUkVvnjz.mjs.map
