import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, createElementVNode } from 'vue';
import { _ as _e } from './MazTableUi-DJE3g4qh.mjs';

const d = /* @__PURE__ */ defineComponent({
  __name: "MazLoadingBar",
  props: {
    color: { default: "primary" },
    height: { default: "0.125rem" }
  },
  setup(e) {
    const a = e, o = computed(() => ({
      alpha: `var(--maz-color-${a.color}-alpha-20)`,
      main: `var(--maz-color-${a.color})`
    }));
    return (l, r) => (openBlock(), createElementBlock(
      "div",
      {
        class: "m-loading-bar m-reset-css",
        style: normalizeStyle([{ "--loading-bar-height": l.height, "--loading-bar-color": o.value.alpha, "--loading-bar-main-color": o.value.main }])
      },
      r[0] || (r[0] = [
        createElementVNode(
          "div",
          null,
          null,
          -1
          /* HOISTED */
        )
      ]),
      4
      /* STYLE */
    ));
  }
}), f = /* @__PURE__ */ _e(d, [["__scopeId", "data-v-189c6085"]]);

export { f as default };
//# sourceMappingURL=MazLoadingBar.LkmX0AHd-VoXo2e12.mjs.map
