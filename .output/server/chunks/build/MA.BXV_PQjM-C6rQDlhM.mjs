import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "85.5 0 342 342"
};
function r(m, l) {
  return openBlock(), createElementBlock("svg", o, l[0] || (l[0] = [
    createElementVNode("path", {
      fill: "#D80027",
      d: "M0 .3V342h513V.3z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#20661B",
      d: "M359.8 148.9h-73.3l-22.7-69.7-22.7 69.7h-73.3l59.3 43.1-22.7 69.7 59.3-43.1 59.3 43.1-22.5-69.7zm-116.1 37.7 7.7-23.6h24.8l7.7 23.6-20.1 14.6zm27.9-37.7H256l7.8-24zm24.3 29-4.8-14.9h25.3zM236.6 163l-4.8 14.9-20.5-14.9zm-5.3 61.8 7.8-24 12.6 9.2zm44.5-14.9 12.6-9.2 7.8 24z"
    }, null, -1)
  ]));
}
const z = { render: r };

export { z as default, r as render };
//# sourceMappingURL=MA.BXV_PQjM-C6rQDlhM.mjs.map
