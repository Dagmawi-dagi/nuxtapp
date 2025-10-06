import { defineComponent, ref, computed, onMounted, createElementBlock, createCommentVNode, watchEffect, openBlock, mergeProps, nextTick, inject } from 'vue';

function H(i, u) {
  const o = inject(i, u);
  if (!o)
    throw new TypeError(`[maz-ui](injectStrict) Could not resolve ${i.toString()}`);
  return o;
}
const I = ["innerHTML"], V = /* @__PURE__ */ defineComponent({
  __name: "MazIcon",
  props: {
    /** The source path of the SVG file - e.g: `/icons/home.svg` */
    src: { type: String, default: void 0 },
    /** The path of the folder where the SVG files are stored - e.g: `/icons` */
    path: { type: String, default: void 0 },
    /** The name of the SVG file - e.g: `home` */
    name: { type: String, default: void 0 },
    /** The size of the SVG file - e.g: `1em` */
    size: { type: String, default: void 0 },
    /** The title of the SVG file - e.g: `Home` */
    title: { type: String, default: void 0 },
    /** The function to transform the source of the SVG file - e.g: `(svg) => svg` */
    transformSource: {
      type: Function,
      default: (i) => i
    }
  },
  emits: ["loaded", "unloaded", "error"],
  setup(i, { emit: u }) {
    const o = i, d = u, a = {}, s = ref(), f = ref();
    function g() {
      try {
        return H("mazIconPath");
      } catch {
        return;
      }
    }
    const m = computed(() => {
      var _a;
      return (_a = o.path) != null ? _a : g();
    }), S = computed(() => o.src ? o.src : m.value ? `${m.value}/${o.name}.svg` : `/${o.name}.svg`);
    onMounted(() => {
      !o.name && !o.src && console.error('[maz-ui](MazIcon) you should provide "name" or "src" as prop');
    });
    function h(e, r) {
      const t = e.querySelectorAll("title");
      if (t.length > 0)
        t[0].textContent = r;
      else {
        const n = (void 0).createElementNS("http://www.w3.org/2000/svg", "title");
        n.textContent = r, e.append(n);
      }
    }
    function w(e) {
      return Object.keys(e).reduce((r, t) => (e[t] !== false && e[t] !== null && e[t] !== void 0 && (r[t] = e[t]), r), {});
    }
    function E(e) {
      const r = {}, t = e.attributes;
      if (!t)
        return r;
      for (let n = t.length - 1; n >= 0; n--)
        r[t[n].name] = t[n].value;
      return r;
    }
    function y(e) {
      e.cloneNode(true);
      const r = o.transformSource(e);
      return o.title && h(r, o.title), e.innerHTML;
    }
    async function z(e) {
      a[e] || (a[e] = M(e));
      try {
        s.value = await a[e], await nextTick(), d("loaded", f.value);
      } catch (r) {
        s.value && (s.value = void 0, d("unloaded")), delete a[e], d("error", r);
      }
    }
    function M(e) {
      return new Promise((r, t) => {
        const n = new (void 0)();
        n.open("GET", e, true), n.addEventListener("load", () => {
          if (n.status >= 200 && n.status < 400)
            try {
              let c = new DOMParser().parseFromString(n.responseText, "text/xml").querySelectorAll("svg")[0];
              c ? (c = o.transformSource(c), r(c)) : t(new Error('Loaded file is not valid SVG"'));
            } catch (l) {
              t(l);
            }
          else
            t(new Error("Error loading SVG"));
        }), n.addEventListener("error", (l) => t(l)), n.send();
      });
    }
    return watchEffect(() => z(S.value)), (e, r) => s.value ? (openBlock(), createElementBlock("svg", mergeProps({
      key: 0,
      ref_key: "svgElem",
      ref: f,
      class: "m-icon m-reset-css",
      width: "1em",
      height: "1em"
    }, {
      ...E(s.value),
      ...w(e.$attrs)
    }, {
      style: `font-size: ${i.size}`,
      innerHTML: y(s.value)
    }), null, 16, I)) : createCommentVNode("v-if", true);
  }
});

export { V as default };
//# sourceMappingURL=MazIcon.Cq1v4J3r-B5N5MhVq.mjs.map
