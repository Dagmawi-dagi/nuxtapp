import { createElementBlock, openBlock, createElementVNode } from 'vue';

const o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "23.94 0 342 342"
};
function r(c, e) {
  return openBlock(), createElementBlock("svg", o, e[0] || (e[0] = [
    createElementVNode("path", {
      fill: "#c60c30",
      d: "M0 0h513v342H0z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#FFF",
      d: "M190 0h-60v140H0v60h130v142h60V200h323v-60H190z"
    }, null, -1)
  ]));
}
const v = { render: r };

export { v as default, r as render };
//# sourceMappingURL=DK.CjVmbgef-CbRKz2F7.mjs.map
