import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { n } from './inject-strict.DEDSuzCz-DcVeNZMW.mjs';
import { _ as _e } from './MazTableUi-DJE3g4qh.mjs';

const m = /* @__PURE__ */ defineComponent({
  __name: "MazTableTitle",
  setup(_) {
    const { size: e } = n("maz-table");
    return (t, f) => (openBlock(), createElementBlock(
      "th",
      {
        class: normalizeClass(["m-table-title m-reset-css", [`--${unref(e)}`]])
      },
      [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    ));
  }
}), b = /* @__PURE__ */ _e(m, [["__scopeId", "data-v-253f46bf"]]);

export { b as default };
//# sourceMappingURL=MazTableTitle.Dh-2buat-BfTJU4ld.mjs.map
