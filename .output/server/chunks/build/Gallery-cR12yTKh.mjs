import { E } from './MazCarousel.tT2IPWU9-C8Una4Y2.mjs';
import { _ as __nuxt_component_1 } from './newsletterSub-BSrDXx4g.mjs';
import { mergeProps, unref, withCtx, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { G as Gallery$1 } from './site_info_ref-wKcuzL81.mjs';
import { S as SEO_KEYWORDS } from './SEOkeywords-Bk6HcTcC.mjs';
import { u as useSeoMeta, a as useHead } from './v3-CUaJKqJ4.mjs';
import { _ as _export_sfc, m as useLightBox } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'sequelize';
import 'zod';
import 'bcryptjs';
import 'crypto';
import 'nodemailer';
import 'html-to-text';
import 'fs';
import 'path';
import 'url';
import 'node:fs/promises';
import 'node:url';
import 'jsonwebtoken';
import 'util';
import 'fs/promises';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'date-fns';
import 'v-dialogs';

const _sfc_main = {
  __name: "Gallery",
  __ssrInlineRender: true,
  setup(__props) {
    const galleryTitles = Gallery$1.map((g) => g.title).join(", ");
    const galleryDescriptions = Gallery$1.map((g) => g.p.join(" ")).join(" ").slice(0, 300) + "...";
    Gallery$1.flatMap((g) => g.images);
    useSeoMeta({
      title: "Gallery - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      description: galleryDescriptions || "Explore the DESTA ALCOHOL & LIQUOR FACTORY PLC gallery showcasing our community, staff, compound, certifications, and achievements.",
      ogTitle: "Gallery - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      ogDescription: galleryDescriptions || "Explore the DESTA ALCOHOL & LIQUOR FACTORY PLC gallery showcasing our community, staff, compound, certifications, and achievements.",
      ogUrl: "https://www.destaalcohol.et/gallery",
      ogImage: "https://www.destaalcohol.et/pictures/desta-logo.png",
      twitterCard: "summary_large_image",
      robots: "index, follow",
      keywords: SEO_KEYWORDS().getAllKeywords().join(", ")
    });
    useHead({
      script: [
        {
          key: "gallery-schema",
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Gallery - DESTA ALCOHOL & LIQUOR FACTORY PLC",
            "url": "https://www.destaalcohol.et/gallery",
            "about": galleryTitles,
            "hasPart": Gallery$1.map((item, idx) => ({
              "@type": "ImageGallery",
              "name": item.title,
              "description": item.p.join(" "),
              "associatedMedia": item.images.map((img) => ({
                "@type": "ImageObject",
                "url": `https://www.destaalcohol.et/pictures/Gallery/${img}`,
                "contentUrl": `https://www.destaalcohol.et/pictures/Gallery/${img}`,
                "caption": item.title
              }))
            }))
          })
        }
      ]
    });
    const { show_global_vueEasyLightbox } = useLightBox();
    const showimg = (imgRef, isArr, index) => {
      let images;
      images = imgRef.map((i) => `/pictures/Gallery/${i}`);
      show_global_vueEasyLightbox(null, images, index);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MazCarousel = E;
      const _component_NewsletterSub = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-42520eea><h3 style="${ssrRenderStyle({ "text-align": "center", "font-weight": "500", "margin": "2rem 0 3rem", "color": "#0072b8" })}" data-v-42520eea>OUR GALLERY</h3><div class="Gallery-grid" data-v-42520eea><!--[-->`);
      ssrRenderList(unref(Gallery$1), (Galle, i) => {
        _push(`<article class="Gallery-item" data-v-42520eea><div class="Gallery-image" data-v-42520eea><img${ssrRenderAttr("src", `/pictures/Gallery/${Galle.images[0]}`)} alt="Gallery image" style="${ssrRenderStyle({ "width": "100%", "object-fit": "cover", "cursor": "pointer" })}" data-v-42520eea>`);
        if (Galle.images.length > 1) {
          _push(ssrRenderComponent(_component_MazCarousel, {
            class: "MazCarouselContainer",
            hideScrollbar: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(Galle.images, (img) => {
                  _push2(`<img class="tambnail-image"${ssrRenderAttr("src", `/pictures/Gallery/${img}`)} alt="Gallery image" data-v-42520eea${_scopeId}>`);
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(Galle.images, (img) => {
                    return openBlock(), createBlock("img", {
                      class: "tambnail-image",
                      src: `/pictures/Gallery/${img}`,
                      onClick: ($event) => showimg(Galle.images, true, i),
                      alt: "Gallery image"
                    }, null, 8, ["src", "onClick"]);
                  }), 256))
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="Gallery-content" data-v-42520eea><h2 class="Gallery-title" data-v-42520eea>${ssrInterpolate(Galle.title)}</h2><!--[-->`);
        ssrRenderList(Galle.p, (p, i2) => {
          _push(`<p class="Gallery-text" data-v-42520eea>${ssrInterpolate(p)}</p>`);
        });
        _push(`<!--]--></div></article>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NewsletterSub, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Gallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42520eea"]]);

export { Gallery as default };
//# sourceMappingURL=Gallery-cR12yTKh.mjs.map
