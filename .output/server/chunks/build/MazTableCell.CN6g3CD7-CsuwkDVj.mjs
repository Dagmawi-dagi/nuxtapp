import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { n } from './inject-strict.DEDSuzCz-DcVeNZMW.mjs';
import { _ as _e, X as Xe } from './MazTableUi-DJE3g4qh.mjs';

const i = /* @__PURE__ */ defineComponent({
  __name: "MazTableCell",
  setup(p) {
    const { size: e } = n(Xe);
    return (t, f) => (openBlock(), createElementBlock(
      "td",
      {
        class: normalizeClass(["m-table-cell m-reset-css", [`--${unref(e)}`]])
      },
      [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    ));
  }
}), z = /* @__PURE__ */ _e(i, [["__scopeId", "data-v-f338a7b0"]]);

export { z as default };
//# sourceMappingURL=MazTableCell.CN6g3CD7-CsuwkDVj.mjs.map
