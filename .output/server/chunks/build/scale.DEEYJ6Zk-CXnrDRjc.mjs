import { createElementBlock, openBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
};
function c(l, e) {
  return openBlock(), createElementBlock("svg", n, e[0] || (e[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.4 48.4 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0q1.515.215 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a6 6 0 0 1-2.031.352 6 6 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202zm-16.5.52q1.485-.305 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a6 6 0 0 1-2.031.352 6 6 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202z"
    }, null, -1)
  ]));
}
const s = { render: c };

export { s as default, c as render };
//# sourceMappingURL=scale.DEEYJ6Zk-CXnrDRjc.mjs.map
