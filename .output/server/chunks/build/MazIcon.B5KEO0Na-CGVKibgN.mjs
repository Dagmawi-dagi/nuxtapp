import { defineComponent, ref, computed, onMounted, createElementBlock, createCommentVNode, watchEffect, openBlock, mergeProps, nextTick } from 'vue';
import { n } from './inject-strict.DEDSuzCz-DcVeNZMW.mjs';

const H = ["innerHTML"], V = /* @__PURE__ */ defineComponent({
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
  setup(i, { emit: p }) {
    const o = i, c = p, a = {}, s = ref(), d = ref();
    function g() {
      try {
        return n("mazIconPath");
      } catch {
        return;
      }
    }
    const f = computed(() => {
      var _a;
      return (_a = o.path) != null ? _a : g();
    }), S = computed(() => o.src ? o.src : f.value ? `${f.value}/${o.name}.svg` : `/${o.name}.svg`);
    onMounted(() => {
      !o.name && !o.src && console.error('[maz-ui](MazIcon) you should provide "name" or "src" as prop');
    });
    function h(e, r) {
      const t = e.querySelectorAll("title");
      if (t.length > 0)
        t[0].textContent = r;
      else {
        const n2 = (void 0).createElementNS("http://www.w3.org/2000/svg", "title");
        n2.textContent = r, e.append(n2);
      }
    }
    function w(e) {
      return Object.keys(e).reduce((r, t) => (e[t] !== false && e[t] !== null && e[t] !== void 0 && (r[t] = e[t]), r), {});
    }
    function y(e) {
      const r = {}, t = e.attributes;
      if (!t)
        return r;
      for (let n2 = t.length - 1; n2 >= 0; n2--)
        r[t[n2].name] = t[n2].value;
      return r;
    }
    function E(e) {
      e.cloneNode(true);
      const r = o.transformSource(e);
      return o.title && h(r, o.title), e.innerHTML;
    }
    async function M(e) {
      a[e] || (a[e] = z(e));
      try {
        s.value = await a[e], await nextTick(), c("loaded", d.value);
      } catch (r) {
        s.value && (s.value = void 0, c("unloaded")), delete a[e], c("error", r);
      }
    }
    function z(e) {
      return new Promise((r, t) => {
        const n2 = new (void 0)();
        n2.open("GET", e, true), n2.addEventListener("load", () => {
          if (n2.status >= 200 && n2.status < 400)
            try {
              let u = new DOMParser().parseFromString(n2.responseText, "text/xml").querySelectorAll("svg")[0];
              u ? (u = o.transformSource(u), r(u)) : t(new Error('Loaded file is not valid SVG"'));
            } catch (l) {
              t(l);
            }
          else
            t(new Error("Error loading SVG"));
        }), n2.addEventListener("error", (l) => t(l)), n2.send();
      });
    }
    return watchEffect(() => M(S.value)), (e, r) => s.value ? (openBlock(), createElementBlock("svg", mergeProps({
      key: 0,
      ref_key: "svgElem",
      ref: d,
      class: "m-icon m-reset-css",
      width: "1em",
      height: "1em"
    }, {
      ...y(s.value),
      ...w(e.$attrs)
    }, {
      style: `font-size: ${i.size}`,
      innerHTML: E(s.value)
    }), null, 16, H)) : createCommentVNode("v-if", true);
  }
});

export { V as default };
//# sourceMappingURL=MazIcon.B5KEO0Na-CGVKibgN.mjs.map
