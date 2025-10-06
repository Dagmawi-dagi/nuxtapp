import { defineComponent, defineAsyncComponent, computed, withDirectives, createElementBlock, openBlock, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, renderSlot, Fragment, renderList, mergeProps, createVNode, unref } from 'vue';
import { F } from './MazAvatar.CNx-fB-w-C9CQz91L.mjs';

var v = Object.defineProperty;
var f = (a, e, s) => e in a ? v(a, e, { enumerable: true, configurable: true, writable: true, value: s }) : a[e] = s;
var n = (a, e, s) => f(a, typeof e != "symbol" ? e + "" : e, s);
const H = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", w = {
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
class U {
  constructor(e = {}) {
    n(this, "observers", []);
    n(this, "defaultOptions", w);
    n(this, "options");
    n(this, "onImgLoadedCallback");
    n(this, "onImgErrorCallback");
    n(this, "hasImgLoaded", false);
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
  removeClass(e, s) {
    e.classList.remove(s);
  }
  addClass(e, s) {
    e.classList.add(s);
  }
  removeAllStateClasses(e) {
    this.removeClass(e, this.options.loadedClass), this.removeClass(e, this.options.loadingClass), this.removeClass(e, this.options.errorClass), this.removeClass(e, this.options.noPhotoClass);
  }
  setBaseClass(e) {
    this.addClass(e, this.options.baseClass);
  }
  imageIsLoading(e) {
    var s, t;
    this.addClass(e, this.options.loadingClass), (t = (s = this.options).onLoading) == null || t.call(s, e);
  }
  imageHasNoPhoto(e) {
    this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.noPhotoClass), this.setDefaultPhoto(e);
  }
  imageIsLoaded(e) {
    var s, t;
    this.hasImgLoaded = true, this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.loadedClass), (t = (s = this.options).onLoaded) == null || t.call(s, e);
  }
  imageHasError(e) {
    var s, t;
    this.removeClass(e, this.options.loadingClass), this.addClass(e, this.options.errorClass), (t = (s = this.options).onError) == null || t.call(s, e), this.setDefaultPhoto(e);
  }
  getSrc(e) {
    return typeof e.value == "object" ? e.value.src : e.value;
  }
  getImageUrl(e, s) {
    const t = this.getImgElement(e).getAttribute("data-lazy-src");
    return t || this.getSrc(s);
  }
  async setPictureSourceUrls(e) {
    const s = e.querySelectorAll("source");
    if (s.length > 0)
      for await (const t of s) {
        const r = t.getAttribute("data-lazy-srcset");
        if (r)
          t.srcset = r;
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
    const s = (_a = this.options.fallbackSrc) != null ? _a : this.options.errorPhoto;
    typeof s == "string" && this.addClass(e, this.options.noPhotoClass);
    const t = s != null ? s : await this.loadErrorPhoto(), r = e.querySelectorAll("source");
    if (r.length > 0)
      for await (const o of r)
        o.srcset = t;
    else
      this.setImgSrc(e, t);
  }
  addEventListenerToImg(e) {
    const s = this.getImgElement(e);
    s.addEventListener("load", () => this.onImgLoadedCallback(e), {
      once: true
    }), s.addEventListener("error", (t) => this.onImgErrorCallback(e, t), { once: true });
  }
  async loadImage(e, s) {
    if (this.imageIsLoading(e), this.isPictureElement(e))
      this.addEventListenerToImg(e), await this.setPictureSourceUrls(e);
    else {
      const t = this.getImageUrl(e, s);
      if (!t)
        return this.imageHasError(e);
      this.hasBgImgMode(s) ? (e.style.backgroundImage = `url('${t}')`, this.imageIsLoaded(e)) : (this.addEventListenerToImg(e), this.setImgSrc(e, t));
    }
  }
  setImgSrc(e, s) {
    const t = this.getImgElement(e);
    t.src = s;
  }
  handleIntersectionObserver(e, s, t, r) {
    var o, l;
    this.observers.push(r);
    for (const i of t)
      if (i.isIntersecting) {
        if ((l = (o = this.options).onIntersecting) == null || l.call(o, i.target), this.options.observerOnce && r.unobserve(e), this.options.loadOnce && this.hasImgLoaded)
          return;
        this.loadImage(e, s);
      }
  }
  createObserver(e, s) {
    const t = (l, i) => {
      this.handleIntersectionObserver(e, s, l, i);
    }, r = this.options.observerOptions;
    new IntersectionObserver(t, r).observe(e);
  }
  async imageHandler(e, s, t) {
    if (t === "update")
      for await (const r of this.observers) r.unobserve(e);
    (void 0).IntersectionObserver ? this.createObserver(e, s) : this.loadImage(e, s);
  }
  async bindUpdateHandler(e, s, t) {
    if (this.options.noPhoto)
      return this.imageHasNoPhoto(e);
    await this.imageHandler(e, s, t);
  }
  async add(e, s) {
    if (this.hasBgImgMode(s) && this.isPictureElement(e))
      throw new Error(`[MazLazyImg] You can't use the "bg-image" mode with "<picture />" element`);
    setTimeout(() => this.setBaseClass(e), 0), e.getAttribute("src") || this.setImgSrc(e, H), await this.bindUpdateHandler(e, s, "bind");
  }
  async update(e, s) {
    s.value !== s.oldValue && (this.hasImgLoaded = false, this.removeAllStateClasses(e), await this.bindUpdateHandler(e, s, "update"));
  }
  remove(e, s) {
    this.hasImgLoaded = false, this.hasBgImgMode(s) && (e.style.backgroundImage = ""), this.removeAllStateClasses(e);
    for (const t of this.observers)
      t.unobserve(e);
    this.observers = [];
  }
}
let h;
const M = {
  created(a, e) {
    const s = typeof e.value == "object" ? e.value : {};
    h = new U(s), h.add(a, e);
  },
  updated(a, e) {
    h.update(a, e);
  },
  unmounted(a, e) {
    h.remove(a, e);
  }
}, T = ["data-lazy-srcset", "media"], D = ["alt"], $ = {
  key: 0,
  class: "m-lazy-img-component-loader"
}, N = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "MazLazyImg",
  props: {
    style: { default: void 0 },
    class: { default: void 0 },
    image: { default: void 0 },
    src: { default: void 0 },
    alt: { default: void 0 },
    noPhoto: { type: Boolean },
    noLoader: { type: Boolean },
    noObserverOnce: { type: Boolean },
    loadOnce: { type: Boolean },
    imageHeightFull: { type: Boolean },
    observerOptions: { default: void 0 },
    fallbackSrc: { default: void 0 },
    imgClass: {},
    block: { type: Boolean }
  },
  emits: ["intersecting", "loading", "loaded", "error"],
  setup(a) {
    const e = a, s = defineAsyncComponent(() => import('./MazSpinner.J9PGgQcA-BSyd-pip.mjs')), t = computed(() => e.image || e.src), r = computed(() => {
      var o;
      return typeof t.value == "string" ? [{ srcset: t.value }] : (o = t.value) == null ? void 0 : o.sources;
    });
    return (o, l) => withDirectives((openBlock(), createElementBlock(
      "picture",
      {
        class: normalizeClass(["m-lazy-img-component m-reset-css", [{ "--use-loader": !o.noLoader, "--height-full": o.imageHeightFull, "--block": o.block }, e.class]]),
        style: normalizeStyle(o.style)
      },
      [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(r.value, ({ srcset: i, media: u }, p) => (openBlock(), createElementBlock("source", {
            key: p,
            "data-lazy-srcset": i,
            media: u
          }, null, 8, T))),
          128
          /* KEYED_FRAGMENT */
        )),
        createElementVNode("img", mergeProps(o.$attrs, {
          src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          loading: "lazy",
          alt: o.alt,
          class: o.imgClass
        }), null, 16, D),
        o.noLoader ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", $, [
          createVNode(unref(s), { size: "2em" })
        ])),
        renderSlot(o.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    )), [
      [unref(M), {
        noPhoto: o.noPhoto,
        loadOnce: o.loadOnce,
        observerOptions: o.observerOptions,
        fallbackSrc: o.fallbackSrc,
        observerOnce: !o.noObserverOnce,
        onIntersecting: (i) => o.$emit("intersecting", i),
        onLoading: (i) => o.$emit("loading", i),
        onLoaded: (i) => o.$emit("loaded", i),
        onError: (i) => o.$emit("error", i)
      }]
    ]);
  }
}), q = /* @__PURE__ */ F(N, [["__scopeId", "data-v-16d47574"]]);

export { q as default };
//# sourceMappingURL=MazLazyImg.BtE4rUvl-CszO8FnF.mjs.map
