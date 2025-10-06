import { ref, nextTick, defineComponent, useCssVars, defineAsyncComponent, computed, toRefs, provide, watch, useSlots, onBeforeMount, createElementBlock, openBlock, normalizeClass, createCommentVNode, createElementVNode, renderSlot, toDisplayString, createBlock, createVNode, unref, normalizeStyle, createTextVNode, withCtx, Fragment, renderList } from 'vue';

const Ee = {
  key: 0,
  class: "m-table-header"
}, Re = {
  key: 0,
  class: "m-table-spacer"
}, Ke = { class: "m-table-header-title" }, De = {
  key: 1,
  class: "m-table-header-search"
}, Fe = { key: 0 }, He = { key: 1 }, Ue = {
  key: 0,
  class: "m-table-sort-icon-wrapper"
}, Qe = { class: "maz-text-center maz-text-muted" }, qe = {
  key: 1,
  class: "m-table-footer"
}, Ye = {
  key: 0,
  class: "m-table-footer-pagination"
}, je = { class: "m-table-footer-pagination-items-per-page" }, Ge = { class: "maz-hidden maz-text-sm tab-s:maz-block" }, Je = {
  key: 0,
  class: "maz-whitespace-nowrap maz-text-sm"
}, We = { class: "m-table-footer-pagination-buttons" }, Xe = "maz-table", Ze = /* @__PURE__ */ defineComponent({
  __name: "MazTable",
  props: {
    tableClass: { default: void 0 },
    tableStyle: { type: [Boolean, null, String, Object, Array], default: void 0 },
    modelValue: { default: void 0 },
    size: { default: "md" },
    inputSize: {},
    title: { default: void 0 },
    headers: { default: void 0 },
    sortable: { type: Boolean },
    headersAlign: { default: "left" },
    rows: { default: void 0 },
    hoverable: { type: Boolean },
    search: { type: Boolean },
    noSearchInRow: { type: Boolean },
    searchPlaceholder: { default: "Search" },
    noSearchBy: { type: Boolean },
    searchByPlaceholder: { default: "Search by" },
    searchByAllLabel: { default: "All" },
    searchQuery: { default: void 0 },
    backgroundOdd: { type: Boolean },
    backgroundEven: { type: Boolean },
    elevation: { type: Boolean },
    divider: { type: Boolean },
    caption: { default: void 0 },
    captionSide: { default: "bottom" },
    pagination: { type: Boolean },
    page: { default: 1 },
    pageSize: { default: 20 },
    totalPages: { default: void 0 },
    paginationAllLabel: { default: "All" },
    noPaginateRows: { type: Boolean },
    totalItems: { default: void 0 },
    loading: { type: Boolean },
    selectable: { type: Boolean },
    selectedKey: { default: void 0 },
    tableLayout: { default: void 0 },
    color: { default: "primary" },
    translations: {},
    roundedSize: { default: "lg" },
    scrollable: { type: Boolean, default: false }
  },
  emits: ["update:model-value", "update:search-query", "update:page", "update:page-size"],
  setup(N, { emit: K }) {
    useCssVars((e) => ({
      "08a80db6": e.tableLayout,
      df8ff50a: e.captionSide
    }));
    const a = N, $ = K, D = defineAsyncComponent(() => import('./arrow-up.DjSlktWl-DSFx3XWp.mjs')), W = defineAsyncComponent(() => import('./chevron-double-left.D4-NpyrF-BF3fo83y.mjs')), X = defineAsyncComponent(() => import('./chevron-left.BqVOLRdC-Djc1b6Xp.mjs')), se = defineAsyncComponent(() => import('./magnifying-glass.-nBiyXot-CaS_-801.mjs')), T = defineAsyncComponent(() => import('./MazBtn.B6UiTgcv-CXo-zBg1.mjs')), Z = defineAsyncComponent(() => import('./MazCheckbox.CYeDQcMp-vzWyrAa7.mjs')), ne = defineAsyncComponent(() => import('./MazInput.CwPPyy_i-JM6tqVKM.mjs')), ue = defineAsyncComponent(() => import('./MazLoadingBar.LkmX0AHd-VoXo2e12.mjs')), _ = defineAsyncComponent(() => import('./MazSelect.CZ8-FJbx-C7xp1w2U.mjs')), w = defineAsyncComponent(() => import('./MazTableCell.CN6g3CD7-CsuwkDVj.mjs')), F = defineAsyncComponent(() => import('./MazTableRow.BjoUmiPj-CiZ35XXN.mjs')), H = defineAsyncComponent(() => import('./MazTableTitle.Dh-2buat-BfTJU4ld.mjs')), re = {
      noResults: "No results",
      actionHeader: "Actions",
      searchByAllLabel: "All",
      searchByPlaceholder: "Search by",
      searchPlaceholder: "Search",
      paginationAllLabel: "All",
      paginationRowsPerPage: "Rows per page",
      paginationOf: "of"
    }, C = computed(() => {
      const { translations: e, searchByAllLabel: t, searchByPlaceholder: l, searchPlaceholder: n, paginationAllLabel: u } = a;
      return {
        ...re,
        ...e,
        searchByAllLabel: t,
        searchByPlaceholder: l,
        searchPlaceholder: n,
        paginationAllLabel: u
      };
    }), ie = computed(
      () => a.divider && !a.backgroundEven && !a.backgroundOdd
    ), { size: m, hoverable: de, backgroundEven: ce, backgroundOdd: ve } = toRefs(a);
    provide(Xe, {
      size: m,
      hoverable: de,
      backgroundEven: ce,
      backgroundOdd: ve
    });
    const U = ref(le()), Q = computed(() => a.selectable || !!a.selectedKey), L = ref(a.page);
    watch(
      () => a.page,
      (e) => {
        L.value = e;
      }
    );
    const b = computed({
      get: () => L.value,
      set: (e) => {
        L.value = e, $("update:page", e);
      }
    }), pe = computed(() => [
      { label: C.value.paginationAllLabel, value: Number.POSITIVE_INFINITY },
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 50, value: 50 },
      { label: 100, value: 100 },
      { label: 200, value: 200 }
    ]), q = ref(a.pageSize);
    watch(
      () => a.pageSize,
      (e) => {
        q.value = e;
      }
    );
    const B = computed({
      get: () => q.value,
      set: (e) => {
        q.value = e, $("update:page-size", e);
      }
    }), I = computed(() => {
      var _a;
      var e;
      return ((_a = a.totalPages) != null ? _a : B.value === Number.POSITIVE_INFINITY || !((e = a.rows) != null && e.length)) ? 1 : Math.ceil(a.rows.length / B.value);
    });
    function fe() {
      b.value = 1;
    }
    function me() {
      b.value = I.value;
    }
    function be() {
      b.value = b.value - 1;
    }
    function ge() {
      b.value = b.value + 1;
    }
    const x = computed(() => {
      if (!a.pagination || a.noPaginateRows || B.value === Number.POSITIVE_INFINITY)
        return U.value;
      const e = (L.value - 1) * B.value, t = e + B.value;
      return U.value.slice(e, t);
    });
    watch(
      () => [a.rows, a.modelValue],
      () => {
        U.value = le();
      }
    );
    const A = ref(), z = ref(), V = ref(Ce()), O = ref(), ye = computed(() => [
      { label: a.searchByAllLabel, value: null },
      ...V.value.map((e) => ({
        label: e.label,
        value: e.key
      }))
    ]), Y = ref(a.searchQuery);
    watch(
      () => a.searchQuery,
      (e) => {
        Y.value = e;
      }
    );
    const E = computed({
      get: () => Y.value,
      set: (e) => {
        Y.value = e, $("update:search-query", e);
      }
    });
    function ze(e) {
      return [...e].sort((t, l) => {
        if (A.value === void 0 || z.value === void 0)
          return 0;
        const n = t[V.value[A.value].key], u = l[V.value[A.value].key];
        return typeof n == "string" && typeof u == "string" ? z.value === "ASC" ? n.localeCompare(u) : u.localeCompare(n) : z.value === "ASC" ? n - u : u - n;
      });
    }
    function he(e) {
      if (a.noSearchInRow || typeof E.value != "string")
        return x.value;
      const t = E.value.toLowerCase();
      return [...e].filter((l) => O.value ? String(l[O.value]).toLowerCase().includes(t) : Object.values(l).some((n) => typeof n == "string" || typeof n == "number" || typeof n == "boolean" ? String(n).toLowerCase().includes(t) : false));
    }
    const P = computed(() => {
      const e = he(x.value);
      return ze(e);
    }), Se = useSlots(), ee = computed(() => a.search || !!a.title || !!Se.title), ke = computed(() => a.pagination);
    function Ce() {
      var _a;
      var e;
      return (_a = (e = a.headers) == null ? void 0 : e.map(
        (t) => typeof t == "string" ? { label: t, align: a.headersAlign } : { align: a.headersAlign, thHeaders: t.headers, ...t }
      )) != null ? _a : [];
    }
    function le() {
      var _a;
      var e;
      return (_a = (e = a.rows) == null ? void 0 : e.map((t) => {
        var l;
        return {
          selected: (l = a.modelValue) == null ? void 0 : l.includes(a.selectedKey ? t[a.selectedKey] : t),
          ...t
        };
      })) != null ? _a : [];
    }
    function Be(e) {
      if (e === A.value) {
        const t = z.value === "DESC" ? "ASC" : void 0;
        z.value = z.value === void 0 ? "DESC" : t;
      } else
        z.value = "DESC";
      A.value = z.value === void 0 ? void 0 : e;
    }
    const ae = computed({
      get: () => {
        var _a;
        return (_a = P.value.every((e) => e.selected)) != null ? _a : false;
      },
      set: Ve
    });
    function Ve(e) {
      for (const t of P.value)
        t.selected = e;
      j();
    }
    function Pe(e, t) {
      P.value[t].selected = e, j();
    }
    function j(e) {
      e = e != null ? e : te();
      const t = e != null && e.length ? e : void 0;
      $("update:model-value", t);
    }
    function te() {
      return P.value.filter((e) => e.selected).map((e) => a.selectedKey ? e[a.selectedKey] : e);
    }
    return onBeforeMount(() => {
      const e = te();
      e != null && e.length && j(e);
    }), (e, t) => {
      var _a, _b, _c, _d, _e2, _f, _g;
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(["m-table m-reset-css", { "--has-header": ee.value }])
        },
        [
          ee.value ? (openBlock(), createElementBlock("div", Ee, [
            e.title || e.$slots.title ? (openBlock(), createElementBlock("div", Re, [
              renderSlot(e.$slots, "title", {}, () => [
                createElementVNode(
                  "span",
                  Ke,
                  toDisplayString(e.title),
                  1
                  /* TEXT */
                )
              ], true)
            ])) : createCommentVNode("v-if", true),
            e.search ? (openBlock(), createElementBlock("div", De, [
              e.noSearchBy ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(_), {
                key: 0,
                modelValue: O.value,
                "onUpdate:modelValue": t[0] || (t[0] = (l) => O.value = l),
                "rounded-size": e.roundedSize,
                color: e.color,
                style: { width: "8rem" },
                placeholder: C.value.searchByPlaceholder,
                size: (_a = e.inputSize) != null ? _a : unref(m),
                options: ye.value
              }, null, 8, ["modelValue", "rounded-size", "color", "placeholder", "size", "options"])),
              createVNode(unref(ne), {
                modelValue: E.value,
                "onUpdate:modelValue": t[1] || (t[1] = (l) => E.value = l),
                size: (_b = e.inputSize) != null ? _b : unref(m),
                "rounded-size": e.roundedSize,
                color: e.color,
                debounce: 300,
                placeholder: C.value.searchPlaceholder,
                "left-icon": unref(se)
              }, null, 8, ["modelValue", "size", "rounded-size", "color", "placeholder", "left-icon"])
            ])) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(["m-table-wrapper", [`--rounded-${e.roundedSize}`, {
                "--scrollable": e.scrollable
              }]])
            },
            [
              createElementVNode(
                "table",
                {
                  class: normalizeClass([{ "--elevation": e.elevation, "--has-layout": e.tableLayout }, e.tableClass]),
                  style: normalizeStyle(e.tableStyle)
                },
                [
                  e.caption || e.$slots.caption ? (openBlock(), createElementBlock("caption", Fe, [
                    renderSlot(e.$slots, "caption", {}, () => [
                      createTextVNode(
                        toDisplayString(e.caption),
                        1
                        /* TEXT */
                      )
                    ], true)
                  ])) : createCommentVNode("v-if", true),
                  V.value ? (openBlock(), createElementBlock("thead", He, [
                    renderSlot(e.$slots, "thead", {}, () => [
                      createVNode(unref(F), { "no-hoverable": "" }, {
                        default: withCtx(() => [
                          Q.value ? (openBlock(), createBlock(unref(H), {
                            key: 0,
                            align: "left",
                            class: normalizeClass([`--${unref(m)}`, "m-table-select-column"])
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Z), {
                                modelValue: ae.value,
                                "onUpdate:modelValue": t[2] || (t[2] = (l) => ae.value = l),
                                size: "sm"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class"])) : createCommentVNode("v-if", true),
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(V.value, (l, n) => {
                              var _a2;
                              return openBlock(), createBlock(unref(H), {
                                key: n,
                                scope: l.scope,
                                align: l.align,
                                rowspan: l.rowspan,
                                colspan: l.colspan,
                                headers: l.thHeaders,
                                style: normalizeStyle({ width: l.width, textAlign: l.align }),
                                class: normalizeClass(["maz-group", [
                                  { "--hidden": l.hidden, "--sortable": (_a2 = l.sortable) != null ? _a2 : e.sortable },
                                  l.classes,
                                  `--${unref(m)}`
                                ]]),
                                onClick: (u) => {
                                  var _a3;
                                  return ((_a3 = l.sortable) != null ? _a3 : e.sortable) && Be(n);
                                }
                              }, {
                                default: withCtx(() => [
                                  createElementVNode(
                                    "span",
                                    {
                                      class: normalizeClass({ "maz-sr-only": l.srOnly })
                                    },
                                    [
                                      renderSlot(e.$slots, "header", {
                                        header: l,
                                        label: l.label
                                      }, () => {
                                        var _a3;
                                        return [
                                          renderSlot(e.$slots, `header-label-${l.key}`, {
                                            header: l,
                                            label: l.label
                                          }, () => [
                                            createTextVNode(
                                              toDisplayString(l.label),
                                              1
                                              /* TEXT */
                                            )
                                          ], true),
                                          ((_a3 = l.sortable) != null ? _a3 : e.sortable) ? (openBlock(), createElementBlock("div", Ue, [
                                            createVNode(unref(D), {
                                              class: normalizeClass(["m-table-sort-icon maz-hidden group-hover:maz-block", {
                                                "--sorted": n === A.value,
                                                "--up": z.value === "DESC",
                                                "--down": z.value === "ASC"
                                              }])
                                            }, null, 8, ["class"])
                                          ])) : createCommentVNode("v-if", true)
                                        ];
                                      }, true)
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["scope", "align", "rowspan", "colspan", "headers", "style", "class", "onClick"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          e.$slots.actions ? (openBlock(), createBlock(unref(H), {
                            key: 1,
                            align: "left",
                            class: normalizeClass(`--${unref(m)}`)
                          }, {
                            default: withCtx(() => [
                              renderSlot(e.$slots, "actions-header", {}, () => [
                                createTextVNode(
                                  toDisplayString(C.value.actionHeader),
                                  1
                                  /* TEXT */
                                )
                              ], true)
                            ]),
                            _: 3
                            /* FORWARDED */
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ]),
                        _: 3
                        /* FORWARDED */
                      })
                    ], true)
                  ])) : createCommentVNode("v-if", true),
                  e.loading ? (openBlock(), createBlock(unref(ue), {
                    key: 2,
                    color: e.color,
                    class: "!maz-absolute"
                  }, null, 8, ["color"])) : createCommentVNode("v-if", true),
                  createElementVNode(
                    "tbody",
                    {
                      class: normalizeClass({ "--divider": ie.value })
                    },
                    [
                      renderSlot(e.$slots, "default", {}, () => [
                        P.value.length > 0 ? (openBlock(true), createElementBlock(
                          Fragment,
                          { key: 0 },
                          renderList(P.value, (l, n) => (openBlock(), createBlock(unref(F), {
                            key: n,
                            class: normalizeClass(l.classes),
                            onClick: (u) => l.action && l.action(l)
                          }, {
                            default: withCtx(() => [
                              Q.value ? (openBlock(), createBlock(
                                unref(w),
                                {
                                  key: 0,
                                  class: "m-table-select-column"
                                },
                                {
                                  default: withCtx(() => [
                                    renderSlot(e.$slots, "select", {
                                      row: l,
                                      selected: l.selected
                                    }, () => [
                                      createVNode(unref(Z), {
                                        size: "sm",
                                        "model-value": l.selected,
                                        "onUpdate:modelValue": (u) => Pe(u, n)
                                      }, null, 8, ["model-value", "onUpdate:modelValue"])
                                    ], true)
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              )) : createCommentVNode("v-if", true),
                              (openBlock(true), createElementBlock(
                                Fragment,
                                null,
                                renderList(V.value, ({ key: u, align: $e, classes: Ae }, Ie) => (openBlock(), createBlock(unref(w), {
                                  key: Ie,
                                  align: $e,
                                  class: normalizeClass(Ae)
                                }, {
                                  default: withCtx(() => [
                                    u ? renderSlot(e.$slots, "cell", {
                                      key: 0,
                                      row: l,
                                      value: l[u]
                                    }, () => [
                                      renderSlot(e.$slots, `cell-${u}`, {
                                        row: l,
                                        value: l[u]
                                      }, () => [
                                        createTextVNode(
                                          toDisplayString(l[u]),
                                          1
                                          /* TEXT */
                                        )
                                      ], true)
                                    ], true) : createCommentVNode("v-if", true)
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                }, 1032, ["align", "class"]))),
                                128
                                /* KEYED_FRAGMENT */
                              )),
                              e.$slots.actions ? (openBlock(), createBlock(
                                unref(w),
                                { key: 1 },
                                {
                                  default: withCtx(() => [
                                    renderSlot(e.$slots, "actions", { row: l }, void 0, true)
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              )) : createCommentVNode("v-if", true)
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["class", "onClick"]))),
                          128
                          /* KEYED_FRAGMENT */
                        )) : (openBlock(), createBlock(unref(F), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(w), {
                              colspan: V.value.length + (Q.value ? 1 : 0) + (e.$slots.actions ? 1 : 0)
                            }, {
                              default: withCtx(() => [
                                renderSlot(e.$slots, "no-results", {}, () => [
                                  createElementVNode("p", Qe, [
                                    renderSlot(e.$slots, "no-results-text", {}, () => [
                                      createTextVNode(
                                        toDisplayString(C.value.noResults),
                                        1
                                        /* TEXT */
                                      )
                                    ], true)
                                  ])
                                ], true)
                              ]),
                              _: 3
                              /* FORWARDED */
                            }, 8, ["colspan"])
                          ]),
                          _: 3
                          /* FORWARDED */
                        }))
                      ], true)
                    ],
                    2
                    /* CLASS */
                  )
                ],
                6
                /* CLASS, STYLE */
              )
            ],
            2
            /* CLASS */
          ),
          ke.value ? (openBlock(), createElementBlock("div", qe, [
            t[4] || (t[4] = createElementVNode(
              "div",
              { class: "m-table-spacer" },
              null,
              -1
              /* HOISTED */
            )),
            e.pagination ? (openBlock(), createElementBlock("div", Ye, [
              createElementVNode("div", je, [
                createElementVNode(
                  "span",
                  Ge,
                  toDisplayString(C.value.paginationRowsPerPage),
                  1
                  /* TEXT */
                ),
                createVNode(unref(_), {
                  modelValue: B.value,
                  "onUpdate:modelValue": t[3] || (t[3] = (l) => B.value = l),
                  options: pe.value,
                  "rounded-size": e.roundedSize,
                  size: (_c = e.inputSize) != null ? _c : unref(m),
                  color: e.color,
                  "list-position": "top",
                  style: { width: "5rem" }
                }, null, 8, ["modelValue", "options", "rounded-size", "size", "color"])
              ]),
              I.value ? (openBlock(), createElementBlock(
                "span",
                Je,
                toDisplayString(b.value) + " - " + toDisplayString(P.value.length) + " " + toDisplayString(C.value.paginationOf) + " " + toDisplayString(I.value),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              createElementVNode("div", We, [
                createVNode(unref(T), {
                  disabled: b.value === 1,
                  size: (_d = e.inputSize) != null ? _d : unref(m),
                  color: "transparent",
                  "rounded-size": e.roundedSize,
                  "no-elevation": "",
                  onClick: fe
                }, {
                  default: withCtx(() => [
                    createVNode(unref(W), { class: "maz-text-base" })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "size", "rounded-size"]),
                createVNode(unref(T), {
                  disabled: b.value === 1,
                  size: (_e2 = e.inputSize) != null ? _e2 : unref(m),
                  color: "transparent",
                  "rounded-size": e.roundedSize,
                  "no-elevation": "",
                  onClick: be
                }, {
                  default: withCtx(() => [
                    createVNode(unref(X), { class: "maz-text-base" })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "size", "rounded-size"]),
                createVNode(unref(T), {
                  disabled: b.value === I.value,
                  size: (_f = e.inputSize) != null ? _f : unref(m),
                  color: "transparent",
                  "rounded-size": e.roundedSize,
                  "no-elevation": "",
                  onClick: ge
                }, {
                  default: withCtx(() => [
                    createVNode(unref(X), { class: "maz-rotate-180 maz-text-base" })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "size", "rounded-size"]),
                createVNode(unref(T), {
                  disabled: b.value === I.value,
                  size: (_g = e.inputSize) != null ? _g : unref(m),
                  color: "transparent",
                  "rounded-size": e.roundedSize,
                  "no-elevation": "",
                  onClick: me
                }, {
                  default: withCtx(() => [
                    createVNode(unref(W), { class: "maz-rotate-180 maz-text-base" })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "size", "rounded-size"])
              ])
            ])) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
}), _e = (N, K) => {
  const a = N.__vccOpts || N;
  for (const [$, D] of K)
    a[$] = D;
  return a;
}, el = /* @__PURE__ */ _e(Ze, [["__scopeId", "data-v-fc9c2ba6"]]);
function useResizableColumns(tableRef, options = {}) {
  const {
    skipClasses = ["actions-column"],
    minWidth = 50,
    initDelay = 100
  } = options;
  const isResizing = ref(false);
  const currentResizeHeader = ref(null);
  const startX = ref(0);
  const startWidth = ref(0);
  const initResizableColumns = () => {
    nextTick(() => {
      var _a;
      const tableEl = ((_a = tableRef.value) == null ? void 0 : _a.$el) || tableRef.value;
      if (!tableEl) return;
      const headers = tableEl.querySelectorAll("thead th");
      if (!headers.length) return;
      headers.forEach((header) => {
        const shouldSkip = skipClasses.some(
          (skipClass) => header.classList.contains(skipClass)
        );
        if (header.querySelector(".resize-handle") || shouldSkip) return;
        const handle = (void 0).createElement("div");
        handle.className = "resize-handle";
        header.style.position = "relative";
        header.appendChild(handle);
        handle.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          e.preventDefault();
          isResizing.value = true;
          currentResizeHeader.value = header;
          startX.value = e.clientX;
          startWidth.value = header.offsetWidth;
          (void 0).addEventListener("mousemove", resizeColumn);
          (void 0).addEventListener("mouseup", stopResize);
          (void 0).body.classList.add("resizing-column");
        });
      });
    });
  };
  const resizeColumn = (e) => {
    var _a;
    if (!isResizing.value || !currentResizeHeader.value) return;
    e.preventDefault();
    const width = startWidth.value + (e.clientX - startX.value);
    if (width > minWidth) {
      currentResizeHeader.value.style.width = `${width}px`;
      currentResizeHeader.value.style.minWidth = `${width}px`;
      const colIndex = Array.from(currentResizeHeader.value.parentNode.children).indexOf(currentResizeHeader.value);
      const tableEl = ((_a = tableRef.value) == null ? void 0 : _a.$el) || tableRef.value;
      if (tableEl) {
        const rows = tableEl.querySelectorAll("tbody tr");
        rows.forEach((row) => {
          const cell = row.children[colIndex];
          if (cell) {
            cell.style.width = `${width}px`;
            cell.style.minWidth = `${width}px`;
          }
        });
      }
    }
  };
  const stopResize = (e) => {
    if (isResizing.value) {
      e == null ? void 0 : e.stopPropagation();
    }
    isResizing.value = false;
    currentResizeHeader.value = null;
    (void 0).body.classList.remove("resizing-column");
    (void 0).removeEventListener("mousemove", resizeColumn);
    (void 0).removeEventListener("mouseup", stopResize);
  };
  const init = (delay = initDelay) => {
    setTimeout(() => {
      initResizableColumns();
    }, delay);
  };
  return {
    isResizing,
    currentResizeHeader,
    initResizableColumns,
    stopResize,
    init
  };
}

export { Xe as X, _e as _, el as e, useResizableColumns as u };
//# sourceMappingURL=MazTableUi-DJE3g4qh.mjs.map
