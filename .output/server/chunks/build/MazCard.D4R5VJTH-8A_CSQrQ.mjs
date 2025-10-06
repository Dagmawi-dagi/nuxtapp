import { defineComponent, defineAsyncComponent, useSlots, computed, ref, watch, createElementBlock, openBlock, normalizeClass, createBlock, createCommentVNode, resolveDynamicComponent, withModifiers, withCtx, renderSlot, createTextVNode, toDisplayString, unref, createVNode, mergeProps, createElementVNode, withDirectives, vShow } from 'vue';

const R = {
  key: 0,
  class: "m-card__gallery__wrapper"
}, G = { class: "maz-min-w-0 maz-flex-1" }, L = {
  key: 0,
  class: "m-card__title"
}, q = {
  key: 1,
  class: "m-card__subtitle"
}, F = {
  key: 2,
  class: "m-card__content"
}, J = {
  key: 2,
  class: "m-card__actions maz-flex maz-p-2"
}, K = /* @__PURE__ */ defineComponent({
  __name: "MazCard",
  props: {
    images: { default: void 0 },
    orientation: { default: "column" },
    href: { default: void 0 },
    to: { default: void 0 },
    hrefTarget: { default: "_self" },
    footerAlign: { default: "right" },
    galleryWidth: { default: 200 },
    galleryHeight: { default: 150 },
    zoom: { type: Boolean },
    elevation: { type: Boolean, default: true },
    radius: { type: Boolean, default: true },
    bordered: { type: Boolean },
    imagesShowCount: { default: 3 },
    noRemaining: { type: Boolean, default: true },
    scale: { type: Boolean, default: true },
    wrapperClass: { default: void 0 },
    noPadding: { type: Boolean },
    overflowHidden: { type: Boolean },
    collapsable: { type: Boolean },
    collapsible: { type: Boolean },
    collapseOpen: { type: Boolean },
    header: { default: void 0 },
    block: { type: Boolean }
  },
  setup(m) {
    const o = m, v = defineAsyncComponent(() => import('./MazBtn.BcPKpdoJ-BGzcSs_t.mjs')), g = defineAsyncComponent(() => import('./MazGallery.2XDJQmg_-B1rQ9XrY.mjs')), z = defineAsyncComponent(() => import('./MazTransitionExpand.DL0tmQvU-BN9aD3Dl.mjs')), S = defineAsyncComponent(() => import('./chevron-down.BkvtON3b-HUOkjF6G.mjs')), M = useSlots(), t = computed(() => o.collapsible || o.collapsable), l = ref(t.value ? o.collapseOpen : true), k = computed(() => o.href || o.to);
    watch(
      () => o.collapseOpen,
      (e) => {
        t.value && (l.value = e);
      }
    );
    const C = computed(() => ({
      is: o.href ? "a" : o.to ? "router-link" : "div",
      ...o.href && { href: o.href },
      ...o.to && { to: o.to },
      target: o.hrefTarget
    })), y = computed(() => ["column", "column-reverse"].includes(o.orientation)), b = computed(() => {
      const e = /* @__PURE__ */ new Set(["default", "title", "subtitle", "content"]);
      return Object.keys(M).some((d) => e.has(d));
    }), O = computed(() => b.value ? o.galleryWidth : "100%"), D = computed(
      () => o.footerAlign === "right" ? "maz-text-end" : "maz-text-start"
    );
    return (e, d) => (openBlock(), createElementBlock(
      "div",
      {
        class: normalizeClass(["m-card m-reset-css", [
          {
            "m-card--linked": k.value,
            "m-card--no-scale": !e.scale,
            "maz-elevation": e.elevation,
            "--block": e.block,
            "maz-overflow-hidden": e.overflowHidden || !l.value,
            "maz-rounded": e.radius,
            "maz-border maz-border-solid maz-border-color-light": e.bordered
          }
        ]])
      },
      [
        e.$slots.header || e.header || t.value ? (openBlock(), createBlock(resolveDynamicComponent(t.value ? "button" : "div"), {
          key: 0,
          class: normalizeClass(["m-card__header maz-border-b maz-border-solid", [
            l.value ? "maz-rounded-t maz-border-color-light" : "maz-border-transparent",
            { "--is-collapsible": t.value },
            { "maz-justify-end": (!e.$slots.header || !e.header) && t.value },
            { "maz-justify-between": e.$slots.header || e.header }
          ]]),
          tabindex: "-1",
          onClick: d[1] || (d[1] = withModifiers((V) => t.value ? l.value = !l.value : void 0, ["stop"]))
        }, {
          default: withCtx(() => [
            e.$slots.header || e.header ? renderSlot(e.$slots, "header", { key: 0 }, () => [
              createTextVNode(
                toDisplayString(e.header),
                1
                /* TEXT */
              )
            ], true) : createCommentVNode("v-if", true),
            t.value ? (openBlock(), createBlock(unref(v), {
              key: 1,
              color: "transparent",
              class: "maz-ml-2 maz-text-sm",
              size: "xs",
              onClick: d[0] || (d[0] = withModifiers((V) => l.value = !l.value, ["stop"]))
            }, {
              default: withCtx(() => [
                createVNode(unref(S), {
                  class: normalizeClass([{ "--is-open": l.value }, "m-card__collapse-icon maz-text-xl"])
                }, null, 8, ["class"])
              ]),
              _: 1
              /* STABLE */
            })) : createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["class"])) : createCommentVNode("v-if", true),
        (openBlock(), createBlock(resolveDynamicComponent(C.value.is), mergeProps(C.value, {
          class: ["m-card__wrapper", [`m-card__wrapper--${e.orientation}`, { "m-card__link": k.value }]]
        }), {
          default: withCtx(() => [
            e.images ? (openBlock(), createElementBlock("div", R, [
              createVNode(unref(g), {
                "no-radius": !e.radius,
                width: O.value,
                height: e.galleryHeight,
                "images-shown-count": e.imagesShowCount,
                images: e.images,
                "no-zoom": !e.zoom,
                "no-width": y.value,
                "no-height": !y.value && b.value,
                "no-remaining": e.noRemaining,
                class: "m-card__gallery maz-flex-1"
              }, null, 8, ["no-radius", "width", "height", "images-shown-count", "images", "no-zoom", "no-width", "no-height", "no-remaining"])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("div", G, [
              (openBlock(), createBlock(resolveDynamicComponent(t.value ? unref(z) : "div"), { class: "maz-h-full" }, {
                default: withCtx(() => [
                  withDirectives(createElementVNode(
                    "div",
                    {
                      class: normalizeClass([[e.wrapperClass, { "maz-p-4": !e.noPadding && !t.value }], "m-card__content__wrapper maz-h-full"])
                    },
                    [
                      renderSlot(e.$slots, "default", {}, () => [
                        e.$slots.title ? (openBlock(), createElementBlock("div", L, [
                          renderSlot(e.$slots, "title", {}, void 0, true)
                        ])) : createCommentVNode("v-if", true),
                        e.$slots.subtitle ? (openBlock(), createElementBlock("div", q, [
                          renderSlot(e.$slots, "subtitle", {}, void 0, true)
                        ])) : createCommentVNode("v-if", true),
                        e.$slots.content ? (openBlock(), createElementBlock("div", F, [
                          renderSlot(e.$slots, "content", {}, void 0, true)
                        ])) : createCommentVNode("v-if", true)
                      ], true)
                    ],
                    2
                    /* CLASS */
                  ), [
                    [vShow, l.value]
                  ])
                ]),
                _: 3
                /* FORWARDED */
              }))
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["class"])),
        e.$slots.footer ? (openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            class: normalizeClass(["m-card__footer maz-overflow-x-auto maz-p-3", [
              {
                "maz-border-t maz-border-color-light": y.value && b.value
              },
              D.value
            ]])
          },
          [
            renderSlot(e.$slots, "footer", {}, void 0, true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        e.$slots.actions ? (openBlock(), createElementBlock("div", J, [
          renderSlot(e.$slots, "actions", {}, void 0, true)
        ])) : createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    ));
  }
}), Q = (m, o) => {
  const v = m.__vccOpts || m;
  for (const [g, z] of o)
    v[g] = z;
  return v;
}, X = /* @__PURE__ */ Q(K, [["__scopeId", "data-v-493e914f"]]);

export { Q, X };
//# sourceMappingURL=MazCard.D4R5VJTH-8A_CSQrQ.mjs.map
