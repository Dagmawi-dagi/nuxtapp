import { defineComponent, defineAsyncComponent, onBeforeMount, computed, createElementBlock, createCommentVNode, openBlock, normalizeStyle, normalizeClass, createElementVNode, Fragment, renderList, withDirectives, unref, toDisplayString, createVNode, render, ref, reactive, watch, onMounted, onBeforeUnmount, withKeys, withModifiers, vShow } from 'vue';
import { Q } from './MazCard.D4R5VJTH-8A_CSQrQ.mjs';

var Ae = Object.defineProperty;
var Ie = (o, e, t) => e in o ? Ae(o, e, { enumerable: true, configurable: true, writable: true, value: t }) : o[e] = t;
var g = (o, e, t) => Ie(o, typeof e != "symbol" ? e + "" : e, t);
function Oe(o, e) {
  let t = e == null ? void 0 : e.element;
  function s() {
    t && render(null, t);
  }
  const a = { ...e == null ? void 0 : e.props, destroy: s }, l = createVNode(
    o,
    a,
    e == null ? void 0 : e.children
  );
  return e != null && e.app ? (l.appContext = e.app._context, t ? render(l, t) : "undefined" < "u") : (t = t != null ? t : (void 0).body, render(l, t)), { vNode: l, destroy: s, el: t };
}
function Se(o, e, t) {
  const s = {
    maxAttempts: 20,
    interval: 100,
    ...t
  };
  let a = 0;
  function l() {
    const u = o();
    u != null ? s.expectedValue !== void 0 && u !== s.expectedValue ? a < s.maxAttempts ? (a++, setTimeout(l, s.interval)) : console.warn(s.errorMessage || `[maz-ui](checkAvailability) Nothing found after ${s.maxAttempts} attempts for ref ${u}`) : e(u) : a < s.maxAttempts ? (a++, setTimeout(l, s.interval)) : console.warn(s.errorMessage || `[maz-ui](checkAvailability) Nothing found or expected value after ${s.maxAttempts} attempts for ref ${u}`);
  }
  l();
}
const He = ["onKeypress"], $e = { class: "m-fullscreen-img-scroller" }, Be = ["src", "alt"], Me = /* @__PURE__ */ defineComponent({
  __name: "MazFullscreenImg",
  props: {
    src: {},
    clickedElementBounds: { default: void 0 },
    offset: { default: void 0 },
    animation: { default: () => ({
      duration: 300,
      easing: "ease-in-out"
    }) },
    openInstanceClass: { default: "m-fullscreen-img-instance" },
    clickedElement: {},
    destroy: { type: Function, default: void 0 },
    alt: { default: void 0 },
    zoom: { type: Boolean, default: true }
  },
  emits: ["close", "previous", "next", "before-close"],
  setup(o, { emit: e }) {
    const t = o, s = e, a = defineAsyncComponent(() => import('./MazSpinner.DsiBNRdi-D4f8YQk1.mjs')), l = defineAsyncComponent(() => import('./x-mark.CnZwVvA7-DafIqNI_.mjs')), u = defineAsyncComponent(() => import('./chevron-left.BqVOLRdC-Djc1b6Xp.mjs')), y = ref(false), x = ref(false), L = ref(false), h = ref(false), m = ref(false), c = reactive({
      running: false,
      ended: false
    }), d = ref(t.clickedElement), le = computed(() => t.clickedElement.getBoundingClientRect()), H = ref(), D = ref(t.src), q = ref(t.alt), j = ref(), v = ref(), $ = ref(true), ce = computed(() => ({
      "--is-zoomed": m.value,
      "--invisible": $.value,
      "--absolute": !m.value
    }));
    function ue() {
      var n, r;
      v.value && (H.value = ((n = v.value) == null ? void 0 : n.naturalWidth) > ((r = v.value) == null ? void 0 : r.naturalHeight)), y.value = true, x.value = false, L.value = true;
    }
    watch(
      L,
      (n) => {
        n && ge();
      },
      { immediate: true }
    );
    function B() {
      s("before-close"), pe();
    }
    function G(n) {
      n.key === "Escape" && (n.preventDefault(), B()), (n.key === "ArrowLeft" || n.key === "ArrowRight") && (n.preventDefault(), U(n.key === "ArrowRight" ? "next" : "previous"));
    }
    function me() {
      (void 0).documentElement.classList.add("--m-fullscreen-open");
    }
    function de() {
      (void 0).documentElement.classList.remove("--m-fullscreen-open");
    }
    function Y() {
      return [...(void 0).querySelectorAll(".m-fullscreen-img-instance")];
    }
    function he(n, r) {
      return r < 0 ? n.length - 1 : r >= n.length ? 0 : r;
    }
    function fe(n, r) {
      n.classList.remove(t.openInstanceClass), r.classList.add(t.openInstanceClass);
      const i = r.getAttribute("data-src"), f = r.getAttribute("data-alt");
      q.value = f, D.value = i != null ? i : D.value;
    }
    function U(n) {
      $.value = true;
      const r = (void 0).querySelector(
        `.m-fullscreen-img-instance.${t.openInstanceClass}`
      );
      if (r) {
        const i = Y(), f = i.indexOf(r), I = n === "next" ? f + 1 : f - 1, E = i[he(i, I)];
        d.value = E, E && fe(r, E), s(n), y.value = false, x.value = true, Se(() => y.value === true, () => {
          $.value = false, m.value ? K() : P();
        }, {
          expectedValue: true,
          interval: 100,
          maxAttempts: 50
        });
      }
    }
    function K() {
      const n = v.value;
      if (!n) {
        console.error("[maz-ui](vFullscreenImg) ImgElement is not defined");
        return;
      }
      n.style.removeProperty("max-width"), n.style.removeProperty("max-height"), n == null || n.style.removeProperty("top"), n == null || n.style.removeProperty("left"), H.value ? (n.style.height = "100vh", n.style.removeProperty("width")) : (n.style.width = "100vw", n.style.removeProperty("height"));
    }
    function ve() {
      m.value ? (m.value = !m.value, P()) : (m.value = !m.value, K());
    }
    function X(n) {
      var i;
      c.running = true, $.value = false;
      const r = (i = v.value) == null ? void 0 : i.animate(n, {
        duration: t.animation.duration,
        easing: t.animation.easing
      });
      if (!r) {
        console.error("[maz-ui](vFullscreenImg) animation is not defined"), c.running = false, c.ended = true;
        return;
      }
      return r;
    }
    function Q2(n = ((_a) => (_a = t.offset) != null ? _a : 0)()) {
      const r = d.value.clientWidth || 1, i = d.value.clientHeight || 1, f = (void 0).innerWidth, I = (void 0).innerHeight, E = Math.min(
        (f - 2 * n) / r,
        (I - 2 * n) / i
      ), W = (f - r * E) / 2, Z = (I - i * E) / 2;
      return {
        centerX: W,
        centerY: Z,
        width: r,
        height: i,
        scale: E
      };
    }
    function J({ trigger: n }) {
      const { width: r, height: i, scale: f, centerX: I, centerY: E } = Q2(), { top: W, left: Z, width: ye, height: be } = le.value, te = [
        {
          top: `${W}px`,
          left: `${Z}px`,
          width: `${ye}px`,
          height: `${be}px`,
          opacity: 0
        },
        {
          top: `${E}px`,
          left: `${I}px`,
          width: `${r * f}px`,
          height: `${i * f}px`,
          opacity: 1
        }
      ];
      return {
        frames: n === "open" ? te : te.reverse()
      };
    }
    function P() {
      const { height: n, width: r, scale: i } = Q2(), f = H.value ? {
        width: `${r * i}px`,
        maxHeight: `${n * i}px`
      } : {
        height: `${n * i}px`,
        maxWidth: `${r * i}px`
      };
      if (!v.value) {
        console.error("[maz-ui](vFullscreenImg) ImgElement is not defined");
        return;
      }
      H.value ? (v.value.style.removeProperty("height"), v.value.style.removeProperty("maxHeight")) : (v.value.style.removeProperty("width"), v.value.style.removeProperty("maxWidth")), Object.assign(v.value.style, f);
    }
    function ge() {
      const { frames: n } = J({
        trigger: "open"
      }), r = X(n);
      if (!r) {
        console.error("[maz-ui](vFullscreenImg) open animation is not defined"), P();
        return;
      }
      r.onfinish = () => {
        P(), c.running = false, c.ended = true;
      };
    }
    function pe() {
      const { frames: n } = J({
        trigger: "close"
      }), r = X(n);
      function i() {
        var f, I;
        s("close"), (f = j.value) == null || f.remove(), (I = t.destroy) == null || I.call(t), c.running = false, c.ended = true;
      }
      if (!r) {
        console.error("[maz-ui](vFullscreenImg) close animation is not defined"), i();
        return;
      }
      r.onfinish = i;
    }
    function ee() {
      m.value || P();
    }
    return onMounted(() => {
      x.value = true, (void 0).addEventListener("keydown", G), (void 0).addEventListener("resize", ee), me(), h.value = Y().length > 1;
    }), onBeforeUnmount(() => {
      (void 0).removeEventListener("keydown", G), (void 0).removeEventListener("resize", ee), de();
    }), (n, r) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        ref_key: "FullscreenImgElement",
        ref: j,
        role: "button",
        class: "m-fullscreen-img m-reset-css",
        tabindex: "0",
        onClick: withModifiers(B, ["stop"]),
        onKeypress: withKeys(withModifiers(B, ["prevent"]), ["esc"])
      }, [
        L.value && h.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "m-fullscreen-btn --next",
          onClick: r[0] || (r[0] = withModifiers((i) => U("next"), ["stop"]))
        }, [
          createVNode(unref(u), { class: "maz-rotate-180" })
        ])) : createCommentVNode("v-if", true),
        L.value && h.value ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: "m-fullscreen-btn --previous",
          onClick: r[1] || (r[1] = withModifiers((i) => U("previous"), ["stop"]))
        }, [
          createVNode(unref(u))
        ])) : createCommentVNode("v-if", true),
        createElementVNode("button", {
          type: "button",
          class: "m-fullscreen-btn --close",
          onClick: B
        }, [
          createVNode(unref(l))
        ]),
        createElementVNode("div", $e, [
          createElementVNode("img", {
            ref_key: "ImgElement",
            ref: v,
            src: D.value,
            alt: (_a = q.value) != null ? _a : void 0,
            tabindex: "0",
            class: normalizeClass([ce.value]),
            onLoad: ue,
            onClick: r[2] || (r[2] = withModifiers((i) => n.zoom && ve(), ["stop"]))
          }, null, 42, Be),
          withDirectives(createVNode(
            unref(a),
            { class: "m-fullscreen-img-loader" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vShow, x.value]
          ])
        ])
      ], 40, He);
    };
  }
}), _e = /* @__PURE__ */ Q(Me, [["__scopeId", "data-v-24a18baf"]]), re = "m-fullscreen-is-open";
class Fe {
  constructor() {
    g(this, "options");
    g(this, "defaultOptions", {
      scaleOnHover: false,
      blurOnHover: false,
      disabled: false,
      zoom: true,
      offset: 80,
      animation: {
        duration: 300,
        easing: "ease-in-out"
      }
    });
    g(this, "mouseEnterListener");
    g(this, "mouseLeaveListener");
    g(this, "renderPreviewListener");
  }
  buildOptions(e, t) {
    var _a, _b;
    const s = typeof t.value == "object" ? t.value : { src: t.value, alt: void 0 }, a = (_a = s == null ? void 0 : s.src) != null ? _a : this.getImgSrc(e), l = (_b = s == null ? void 0 : s.alt) != null ? _b : this.getImgAlt(e);
    return {
      ...this.defaultOptions,
      ...s,
      src: a,
      alt: l
    };
  }
  get allInstances() {
    return [...(void 0).querySelectorAll(".m-fullscreen-img-instance")];
  }
  getImgSrc(e) {
    var s;
    const t = ((s = this.options) == null ? void 0 : s.src) || e.getAttribute("src") || e.getAttribute("data-src");
    if (!t)
      throw new Error(
        '[maz-ui](fullscreen-img) src of image must be provided by `v-fullscreen=""`, `v-fullscreen="{ src: "" }"`, `src=""` or `data-src=""` atributes'
      );
    return t;
  }
  getImgAlt(e) {
    var t;
    return ((t = this.options) == null ? void 0 : t.alt) || e.getAttribute("alt") || e.getAttribute("data-alt");
  }
  create(e, t) {
    if (this.options = this.buildOptions(e, t), this.options.disabled)
      return;
    e.style.cursor = "move", (this.options.scaleOnHover || this.options.blurOnHover) && (e.style.transition = "all 200ms ease-in-out"), e.classList.add("m-fullscreen-img-instance"), e.setAttribute("data-src", this.getImgSrc(e));
    const s = this.getImgAlt(e);
    s && e.setAttribute("data-alt", s), this.mouseEnterListener = () => this.mouseEnter(e), this.mouseLeaveListener = () => this.mouseLeave(e), this.renderPreviewListener = () => this.renderPreview(e), e.addEventListener("mouseenter", this.mouseEnterListener), e.addEventListener("mouseleave", this.mouseLeaveListener), e.addEventListener("click", this.renderPreviewListener);
  }
  update(e, t) {
    this.options = this.buildOptions(e, t);
  }
  remove(e) {
    e.removeEventListener("mouseenter", this.mouseEnterListener), e.removeEventListener("mouseleave", this.mouseLeaveListener), e.removeEventListener("click", this.renderPreviewListener), e.classList.remove("m-fullscreen-img-instance"), e.style.cursor = "";
  }
  renderPreview(e) {
    return e.classList.add(re), Oe(_e, {
      props: {
        ...this.options,
        openInstanceClass: re,
        clickedElement: e,
        clickedElementBounds: e.getBoundingClientRect()
      }
    });
  }
  mouseLeave(e) {
    this.options.scaleOnHover && (e.style.transform = ""), this.options.blurOnHover && (e.style.filter = ""), e.style.zIndex = "";
  }
  mouseEnter(e) {
    e.style.zIndex = "1", this.options.scaleOnHover && (e.style.transform = "scale(1.04)"), this.options.blurOnHover && (e.style.filter = "blur(3px)");
  }
}
let _;
const V = {
  mounted(o, e) {
    return _ = new Fe(), _.create(o, e);
  },
  updated(o, e) {
    return _.update(o, e);
  },
  unmounted(o) {
    return _.remove(o);
  }
}, Ne = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", Re = {
  baseClass: "m-lazy-img",
  loadedClass: "m-lazy-loaded",
  loadingClass: "m-lazy-loading",
  errorClass: "m-lazy-error",
  noPhotoClass: "m-lazy-no-photo",
  noPhoto: false,
  observerOnce: true,
  loadOnce: false,
  noUseErrorPhoto: false,
  observerOptions: {
    threshold: 0.1
  }
};
class Te {
  constructor(e = {}) {
    g(this, "observers", []);
    g(this, "defaultOptions", Re);
    g(this, "options");
    g(this, "onImgLoadedCallback");
    g(this, "onImgErrorCallback");
    g(this, "hasImgLoaded", false);
    this.options = this.buildOptions(e), this.onImgLoadedCallback = this.imageIsLoaded.bind(this), this.onImgErrorCallback = this.imageHasError.bind(this);
  }
  async loadErrorPhoto() {
    const { default: e } = await import('./no-photography.BJX8HSus-D1rxvfXG.mjs');
    return e;
  }
  buildOptions(e) {
    return {
      ...this.defaultOptions,
      ...e,
      observerOptions: {
        ...this.defaultOptions.observerOptions,
        ...e.observerOptions
      }
    };
  }
  removeClass(e, t) {
    e.classList.remove(t);
  }
  addClass(e, t) {
    e.classList.add(t);
  }
  removeAllStateClasses(e) {
    this.removeClass(e, this.options.loadedClass), this.removeClass(e, this.options.loadingClass), this.removeClass(e, this.options.errorClass), this.removeClass(e, this.options.noPhotoClass);
  }
  setBaseClass(e) {
    this.addClass(e, this.options.baseClass);
  }
  imageIsLoading(e) {
    var t, s;
    this.addClass(e, this.options.loadingClass), (s = (t = this.options).onLoading) == null || s.call(t, e);
  }
  imageHasNoPhoto(e) {
    this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.noPhotoClass), this.setDefaultPhoto(e);
  }
  imageIsLoaded(e) {
    var t, s;
    this.hasImgLoaded = true, this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.loadedClass), (s = (t = this.options).onLoaded) == null || s.call(t, e);
  }
  imageHasError(e) {
    var t, s;
    this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.errorClass), (s = (t = this.options).onError) == null || s.call(t, e), this.setDefaultPhoto(e);
  }
  getSrc(e) {
    return typeof e.value == "object" ? e.value.src : e.value;
  }
  getImageUrl(e, t) {
    const s = this.getImgElement(e).getAttribute("data-lazy-src");
    return s || this.getSrc(t);
  }
  async setPictureSourceUrls(e) {
    const t = e.querySelectorAll("source");
    if (t.length > 0)
      for await (const s of t) {
        const a = s.getAttribute("data-lazy-srcset");
        if (a)
          s.srcset = a;
        else
          return this.imageHasError(e);
      }
    else
      this.imageHasError(e);
  }
  hasBgImgMode(e) {
    return e.arg === "bg-image";
  }
  isPictureElement(e) {
    return e instanceof HTMLPictureElement;
  }
  getImgElement(e) {
    return this.isPictureElement(e) ? e.querySelector("img") : e;
  }
  async setDefaultPhoto(e) {
    var _a;
    if (this.options.noUseErrorPhoto)
      return;
    const t = (_a = this.options.fallbackSrc) != null ? _a : this.options.errorPhoto;
    typeof t == "string" && this.addClass(e, this.options.noPhotoClass);
    const s = t != null ? t : await this.loadErrorPhoto(), a = e.querySelectorAll("source");
    if (a.length > 0)
      for await (const l of a)
        l.srcset = s;
    else
      this.setImgSrc(e, s);
  }
  addEventListenerToImg(e) {
    const t = this.getImgElement(e);
    t.addEventListener("load", () => this.onImgLoadedCallback(e), {
      once: true
    }), t.addEventListener("error", (s) => this.onImgErrorCallback(e, s), { once: true });
  }
  async loadImage(e, t) {
    if (this.imageIsLoading(e), this.isPictureElement(e))
      this.addEventListenerToImg(e), await this.setPictureSourceUrls(e);
    else {
      const s = this.getImageUrl(e, t);
      if (!s)
        return this.imageHasError(e);
      this.hasBgImgMode(t) ? (e.style.backgroundImage = `url('${s}')`, this.imageIsLoaded(e)) : (this.addEventListenerToImg(e), this.setImgSrc(e, s));
    }
  }
  setImgSrc(e, t) {
    const s = this.getImgElement(e);
    s.src = t;
  }
  handleIntersectionObserver(e, t, s, a) {
    var l, u;
    this.observers.push(a);
    for (const y of s)
      if (y.isIntersecting) {
        if ((u = (l = this.options).onIntersecting) == null || u.call(l, y.target), this.options.observerOnce && a.unobserve(e), this.options.loadOnce && this.hasImgLoaded)
          return;
        this.loadImage(e, t);
      }
  }
  createObserver(e, t) {
    const s = (u, y) => {
      this.handleIntersectionObserver(e, t, u, y);
    }, a = this.options.observerOptions;
    new IntersectionObserver(s, a).observe(e);
  }
  async imageHandler(e, t, s) {
    if (s === "update")
      for await (const a of this.observers) a.unobserve(e);
    (void 0).IntersectionObserver ? this.createObserver(e, t) : this.loadImage(e, t);
  }
  async bindUpdateHandler(e, t, s) {
    if (this.options.noPhoto)
      return this.imageHasNoPhoto(e);
    await this.imageHandler(e, t, s);
  }
  async add(e, t) {
    if (this.hasBgImgMode(t) && this.isPictureElement(e))
      throw new Error(`[MazLazyImg] You can't use the "bg-image" mode with "<picture />" element`);
    setTimeout(() => this.setBaseClass(e), 0), e.getAttribute("src") || this.setImgSrc(e, Ne), await this.bindUpdateHandler(e, t, "bind");
  }
  async update(e, t) {
    t.value !== t.oldValue && (this.hasImgLoaded = false, this.removeAllStateClasses(e), await this.bindUpdateHandler(e, t, "update"));
  }
  remove(e, t) {
    this.hasImgLoaded = false, this.hasBgImgMode(t) && (e.style.backgroundImage = ""), this.removeAllStateClasses(e);
    for (const s of this.observers)
      s.unobserve(e);
    this.observers = [];
  }
}
let F;
const De = {
  created(o, e) {
    const t = typeof e.value == "object" ? e.value : {};
    F = new Te(t), F.add(o, e);
  },
  updated(o, e) {
    F.update(o, e);
  },
  unmounted(o, e) {
    F.remove(o, e);
  }
}, Ue = { class: "m-gallery__wrapper maz-flex maz-flex-1" }, We = ["alt"], Ze = {
  key: 0,
  class: "m-gallery__remaining-layer maz-flex maz-bg-overlay maz-flex-center"
}, Ve = { class: "maz-text-2xl maz-text-white" }, qe = /* @__PURE__ */ defineComponent({
  __name: "MazGallery",
  props: {
    /**
     *  Array of string or object: `['https://via.placeholder.com/500', 'https://via.placeholder.com/600']` or `[{ slug: 'https://via.placeholder.com/500', alt: 'image descripton' }, { slug: 'https://via.placeholder.com/600', alt: 'image descripton' }]`
     */
    images: {
      type: Array,
      default: () => []
    },
    /** Images count shown (max: 5) */
    imagesShownCount: { type: Number, default: 5 },
    /** Remove transparent layer with the remain count (ex: +2) */
    noRemaining: { type: Boolean, default: false },
    /** Height of gallery */
    height: { type: [Number, String], default: 150 },
    /** Remove default height - useful to set height with css */
    noHeight: { type: Boolean, default: false },
    /** Width of gallery */
    width: { type: [Number, String], default: "100%" },
    /** Remove default width */
    noWidth: { type: Boolean, default: false },
    /** Disable the border radius of the gallery */
    noRadius: { type: Boolean, default: false },
    /** Disable full size display when clicking on image */
    noZoom: { type: Boolean, default: false },
    /** Layer with photography icon when no images is provided */
    hasEmptyLayer: { type: Boolean, default: true },
    /** Lazy load image - if false, images are directly loaded */
    lazy: { type: Boolean, default: true },
    /** Disable blur effect on image hover */
    blur: { type: Boolean, default: true },
    /** Disable scale animation effect on image hover */
    scale: { type: Boolean, default: true },
    /** Choose color of borders between images - Should be a CSS color or CSS variable - Ex: `#000` or `var(--maz-color-bg-light)` */
    separatorColor: { type: String, default: "transparent" }
  },
  setup(o) {
    const e = o, t = defineAsyncComponent(() => import('./no-photography.PGT8fxs_-ncq3B5tv.mjs'));
    onBeforeMount(() => {
      e.imagesShownCount > 5 && console.warn('[MazUI](m-gallery) The maximum of "images-shown-count" is 5');
    });
    const s = computed(() => {
      const h = e.noWidth, m = e.width, c = e.noHeight, d = e.height;
      return {
        ...h ? {} : {
          flex: `0 0 ${typeof m}` == "number" ? `${m}px` : m,
          width: typeof m == "number" ? `${m}px` : m
        },
        ...c ? {} : {
          height: typeof d == "number" ? `${d}px` : `${d}`,
          minHeight: typeof d == "number" ? `${d}px` : `${d}`
        }
      };
    }), a = computed(() => e.imagesShownCount <= 5 ? e.imagesShownCount : 5), l = computed(() => e.images.length - (e.images.length < a.value ? e.images.length : a.value)), u = computed(() => e.images.map(
      (h) => {
        var _a;
        return typeof h == "object" ? { ...h, thumbnail: (_a = h.thumbnail) != null ? _a : h.src } : { src: h, thumbnail: h, alt: void 0 };
      }
    )), y = computed(() => u.value.slice(0, a.value)), x = computed(() => u.value.slice(a.value, e.images.length));
    function L(h) {
      return e.noRemaining ? false : (l.value && h + 1) === y.value.length;
    }
    return (h, m) => o.images.length > 0 || o.hasEmptyLayer ? (openBlock(), createElementBlock(
      "div",
      {
        key: 0,
        class: normalizeClass(["m-gallery m-reset-css", { "maz-rounded": !o.noRadius }]),
        style: normalizeStyle([s.value, { "--gallery-separator-color": o.separatorColor }])
      },
      [
        createElementVNode("section", Ue, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(y.value, (c, d) => (openBlock(), createElementBlock(
              "figure",
              {
                key: d,
                class: normalizeClass(["m-gallery__item !maz-my-0 maz-flex maz-flex-center", [`m-gallery__item--${d + 1}`]])
              },
              [
                withDirectives(createElementVNode("img", {
                  class: "m-gallery__item__image maz-flex-1",
                  src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                  alt: c.alt,
                  loading: "lazy"
                }, null, 8, We), [
                  [unref(De), { src: c.thumbnail, disabled: !o.lazy }, "bg-image"],
                  [unref(V), {
                    src: c.src,
                    alt: c.alt,
                    disabled: o.noZoom || L(d),
                    blurOnHover: o.blur,
                    scaleOnHover: o.scale
                  }]
                ]),
                L(d) ? withDirectives((openBlock(), createElementBlock("div", Ze, [
                  createElementVNode(
                    "span",
                    Ve,
                    "+" + toDisplayString(l.value),
                    1
                    /* TEXT */
                  )
                ])), [
                  [unref(V), {
                    src: c.src,
                    alt: c.alt,
                    disabled: o.noZoom,
                    blurOnHover: false,
                    scaleOnHover: o.scale
                  }]
                ]) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          o.hasEmptyLayer && o.images.length === 0 ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(["empty-layer maz-flex maz-w-full maz-bg-color-light maz-text-normal maz-flex-center", { "maz-rounded-xl": !o.noRadius }]),
              style: normalizeStyle([s.value])
            },
            [
              createVNode(unref(t), { class: "maz-h-8 maz-w-8" })
            ],
            6
            /* CLASS, STYLE */
          )) : createCommentVNode("v-if", true)
        ]),
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(x.value, (c, d) => withDirectives((openBlock(), createElementBlock("div", {
            key: d,
            class: "m-gallery__hidden"
          })), [
            [unref(V), { src: c.src, disabled: o.noZoom }]
          ])),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    )) : createCommentVNode("v-if", true);
  }
}), Ke = /* @__PURE__ */ Q(qe, [["__scopeId", "data-v-a92296a0"]]);

export { Ke as default };
//# sourceMappingURL=MazGallery.2XDJQmg_-B1rQ9XrY.mjs.map
