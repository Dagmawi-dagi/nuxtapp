import { defineComponent, defineAsyncComponent, computed, createBlock, openBlock, resolveDynamicComponent, normalizeClass, normalizeStyle, withCtx, createElementVNode, renderSlot, createElementBlock, createCommentVNode, Fragment, unref, mergeProps, toDisplayString, createVNode } from 'vue';

const D = ["tabindex"], N = ["src", "alt", "loading"], R = { class: "m-avatar__initial" }, V = {
  key: 0,
  class: "m-avatar__caption"
}, q = /* @__PURE__ */ defineComponent({
  __name: "MazAvatar",
  props: {
    style: {},
    class: {},
    src: { default: void 0 },
    caption: { default: void 0 },
    href: { default: void 0 },
    to: { default: void 0 },
    alt: { default: "avatar image" },
    target: { default: "_self" },
    size: { default: void 0 },
    bordered: { type: Boolean },
    clickable: { type: Boolean },
    square: { type: Boolean },
    noElevation: { type: Boolean },
    showCaption: { type: Boolean },
    imageHeightFull: { type: Boolean },
    noLoader: { type: Boolean },
    buttonColor: { default: "info" },
    noClickableIcon: { type: Boolean },
    letterCount: { default: void 0 },
    roundedSize: { default: "full" },
    fallbackSrc: { default: void 0 },
    noPhoto: { type: Boolean },
    loading: { default: "intersecting" }
  },
  emits: ["click", "intersecting", "loading", "loaded", "error"],
  setup(n, { emit: s }) {
    const a = n, d = s, c = defineAsyncComponent(() => import('./MazLazyImg.BtE4rUvl-CszO8FnF.mjs')), C = defineAsyncComponent(() => import('./pencil.Z-mPplOz-7tmGNN8T.mjs')), z = computed(() => a.to ? "RouterLink" : a.href ? "a" : "div"), m = computed(() => !!a.to || !!a.href);
    function S(e, o = a.letterCount) {
      return e.split(" ").map((B) => B[0]).join("").slice(0, o);
    }
    const w = computed(() => a.src || !a.src && !a.caption);
    function $(e) {
      if (d("error", e.target), a.fallbackSrc && e.target instanceof HTMLImageElement) {
        const o = new URL(e.target.src), t = new URL(a.fallbackSrc);
        if (o.href === t.href)
          return;
        e.target.src = a.fallbackSrc;
      }
    }
    return (e, o) => (openBlock(), createBlock(resolveDynamicComponent(z.value), {
      style: normalizeStyle([{ fontSize: e.size }, e.style]),
      class: normalizeClass(["m-avatar m-reset-css", [
        {
          "--has-link": m.value
        },
        a.class
      ]]),
      href: e.href,
      to: e.to,
      target: m.value ? e.target : void 0
    }, {
      default: withCtx(() => {
        var _a;
        return [
          createElementVNode("div", {
            class: normalizeClass(["m-avatar__wrapper", [
              {
                "--has-shadow": !e.noElevation,
                "--bordered": e.bordered,
                "--clickable": e.clickable,
                "--has-initial": !e.src && e.caption
              },
              `--rounded-${e.square ? "none" : e.roundedSize}`
            ]]),
            tabindex: e.clickable ? 0 : -1
          }, [
            w.value ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                e.loading === "intersecting" ? (openBlock(), createBlock(unref(c), mergeProps({ key: 0 }, e.$attrs, {
                  class: "m-avatar__picture maz-w-full maz-max-w-full",
                  src: e.src,
                  alt: e.alt,
                  "no-photo": e.noPhoto,
                  "image-height-full": "",
                  "no-loader": e.noLoader,
                  "fallback-src": e.fallbackSrc,
                  onClick: o[0] || (o[0] = (t) => e.clickable ? e.$emit("click", t) : null),
                  onError: o[1] || (o[1] = (t) => e.$emit("error", t)),
                  onLoaded: o[2] || (o[2] = (t) => e.$emit("loaded", t)),
                  onLoading: o[3] || (o[3] = (t) => e.$emit("loading", t)),
                  onIntersecting: o[4] || (o[4] = (t) => e.$emit("intersecting", t))
                }), null, 16, ["src", "alt", "no-photo", "no-loader", "fallback-src"])) : (openBlock(), createElementBlock("img", {
                  key: 1,
                  class: "m-avatar__picture maz-w-full maz-max-w-full",
                  src: (_a = e.src) != null ? _a : e.fallbackSrc,
                  alt: e.alt,
                  loading: e.loading,
                  onError: $
                }, null, 40, N))
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true),
            e.caption && !e.src ? renderSlot(e.$slots, "round-text", { key: 1 }, () => [
              createElementVNode(
                "span",
                R,
                toDisplayString(S(e.caption)),
                1
                /* TEXT */
              )
            ], true) : createCommentVNode("v-if", true),
            e.clickable ? (openBlock(), createElementBlock(
              "button",
              {
                key: 2,
                type: "button",
                tabindex: "-1",
                class: "m-avatar__button",
                style: normalizeStyle({
                  backgroundColor: e.src ? `var(--maz-color-${e.buttonColor}-alpha)` : `var(--maz-color-${e.buttonColor})`
                }),
                onClick: o[5] || (o[5] = (t) => e.$emit("click", t))
              },
              [
                e.noClickableIcon ? createCommentVNode("v-if", true) : renderSlot(e.$slots, "icon", { key: 0 }, () => [
                  createVNode(unref(C), { class: "m-avatar__button__icon" })
                ], true)
              ],
              4
              /* STYLE */
            )) : createCommentVNode("v-if", true)
          ], 10, D),
          renderSlot(e.$slots, "caption", {}, () => [
            e.showCaption && e.caption ? (openBlock(), createElementBlock(
              "p",
              V,
              toDisplayString(e.caption),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ], true)
        ];
      }),
      _: 3
      /* FORWARDED */
    }, 8, ["style", "class", "href", "to", "target"]));
  }
}), F = (n, s) => {
  const a = n.__vccOpts || n;
  for (const [d, c] of s)
    a[d] = c;
  return a;
}, j = /* @__PURE__ */ F(q, [["__scopeId", "data-v-ff05e3ec"]]);

export { F, j };
//# sourceMappingURL=MazAvatar.CNx-fB-w-C9CQz91L.mjs.map
