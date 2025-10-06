import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { n } from './inject-strict.DEDSuzCz-DcVeNZMW.mjs';
import { _ as _e, X as Xe } from './MazTableUi-DJE3g4qh.mjs';

const u = /* @__PURE__ */ defineComponent({
  __name: "MazTableRow",
  props: {
    noHoverable: { type: Boolean }
  },
  setup(_) {
    const { hoverable: a, backgroundEven: r, backgroundOdd: t } = n(Xe);
    return (o, f) => (openBlock(), createElementBlock(
      "tr",
      {
        class: normalizeClass(["m-table-row m-reset-css", {
          "--hoverable": unref(a) && !o.noHoverable,
          "--background-odd": unref(t),
          "--background-even": unref(r)
        }])
      },
      [
        renderSlot(o.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    ));
  }
}), g = /* @__PURE__ */ _e(u, [["__scopeId", "data-v-c9f9a9c5"]]);

export { g as default };
//# sourceMappingURL=MazTableRow.BjoUmiPj-CiZ35XXN.mjs.map
