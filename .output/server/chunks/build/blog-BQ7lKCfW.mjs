import { X } from './MazCard.D4R5VJTH-8A_CSQrQ.mjs';
import { _ as __nuxt_component_1 } from './newsletterSub-BSrDXx4g.mjs';
import { ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, withModifiers, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { format } from 'date-fns';
import { u as useBreakPoint } from './breakPoint-CvswuINl.mjs';
import { u as useSeoMeta, a as useHead } from './v3-CUaJKqJ4.mjs';
import { _ as _export_sfc, d as useUtilStore, e as useBlogStore, f as frontEndErrorFeedback } from './server.mjs';
import { u as useFetch } from './fetch-BwaowXL0.mjs';
import { storeToRefs } from 'pinia';
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
import 'vue-router';
import 'v-dialogs';
import '@vue/shared';

const _sfc_main = {
  __name: "blog",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { mobilePhone, tablet } = useBreakPoint();
    const { any_open_modal } = storeToRefs(useUtilStore());
    const { blogPosts, page, perPage } = storeToRefs(useBlogStore());
    const catagoriesCount = ref({
      info: 0,
      event: 0,
      social: 0,
      news: 0
    });
    const totalBlogCount = ref();
    const searcq = ref("");
    const recentPosts = ref([]);
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/blog", {
        headers: {
          apiref: "/api/blog/GET"
        }
      }, "$UZhutX5Xx5")), __temp = await __temp, __restore(), __temp);
      blogPosts.value = (_a = data.value) == null ? void 0 : _a.data;
      recentPosts.value = (_b = data.value) == null ? void 0 : _b.data.slice(0, 3);
      totalBlogCount.value = (_c = blogPosts.value) == null ? void 0 : _c.length;
      Object.keys(catagoriesCount.value).forEach((key) => catagoriesCount.value[key] = 0);
      (_d = blogPosts.value) == null ? void 0 : _d.forEach((post) => {
        post.category.forEach((cat) => {
          if (catagoriesCount.value[cat] !== void 0) {
            catagoriesCount.value[cat] += 1;
          } else {
            catagoriesCount.value[cat] = 1;
          }
        });
      });
    } catch (err) {
      frontEndErrorFeedback().err(err);
      console.log(err);
    }
    const blogMetaDescription = computed(() => {
      var _a2;
      if (blogPosts.value && blogPosts.value.length > 0) {
        const categories = [...new Set(blogPosts.value.flatMap((post) => post.category))].join(", ");
        return `Read our latest articles on ${categories}. ${(_a2 = blogPosts.value[0].content_short) == null ? void 0 : _a2.substring(0, 120)}...`;
      }
      return "Explore the latest news, articles, and updates from DESTA ALCOHOL & LIQUOR FACTORY PLC.";
    });
    useSeoMeta({
      title: "Blog - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      description: blogMetaDescription,
      ogTitle: "Blog - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      ogDescription: blogMetaDescription,
      ogUrl: "https://www.destaalcohol.et/blog",
      ogImage: "https://www.destaalcohol.com/pictures/desta-logo.png",
      twitterCard: "summary_large_image",
      robots: "index, follow",
      keywords: computed(() => {
        if (blogPosts.value && blogPosts.value.length > 0) {
          const allCategories = blogPosts.value.flatMap((post) => post.category);
          const uniqueCategories = [...new Set(allCategories)];
          return `desta alcohol blog, ${uniqueCategories.join(", ")}, ethiopia liquor news, premium drinks`;
        }
        return "alcohol blog, liquor news, DESTA updates, premium drinks";
      })
    });
    const blogSchema = computed(() => {
      var _a2;
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC Blog",
        "description": "Latest news and articles about premium alcohol products from DESTA ALCOHOL & LIQUOR FACTORY PLC",
        "url": "https://www.destaalcohol.et/blog",
        "publisher": {
          "@type": "Organization",
          "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.destaalcohol.com/pictures/desta-logo.png"
          }
        },
        "blogPost": ((_a2 = blogPosts.value) == null ? void 0 : _a2.map((post) => {
          var _a3, _b2;
          return {
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.content_short,
            "author": {
              "@type": "Organization",
              "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC"
            },
            "publisher": {
              "@type": "Organization",
              "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.destaalcohol.com/pictures/desta-logo.png"
              }
            },
            "datePublished": post.createdAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.destaalcohol.et/blog#post-${post.id}`
            },
            "image": post.coverImg ? `https://www.destaalcohol.et/${post.coverImg}` : "https://www.destaalcohol.com/pictures/desta-logo.png",
            "keywords": (_a3 = post.category) == null ? void 0 : _a3.join(", "),
            "articleSection": ((_b2 = post.category) == null ? void 0 : _b2[0]) || "News"
          };
        })) || []
      };
    });
    useHead({
      script: [
        {
          key: "blog-org",
          type: "application/ld+json",
          children: JSON.stringify(blogSchema.value)
        }
      ]
    });
    const openBlogPostModal = (post) => {
      any_open_modal.value.bool = true;
      any_open_modal.value.id = "blogModal";
      any_open_modal.value.AnythingTopass = post;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MazCard = X;
      const _component_NewsletterSub = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "main-container",
        id: "blog-main-container"
      }, _attrs))} data-v-0323fff2><div class="chat" data-v-0323fff2><div class="chat-icon" data-v-0323fff2><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-0323fff2><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-v-0323fff2></path></svg></div><button class="chat_btn" data-v-0323fff2> Contact Us</button></div><div class="container" data-v-0323fff2><main class="main-content" data-v-0323fff2><!--[-->`);
      ssrRenderList(unref(blogPosts), (blogPost, i) => {
        _push(ssrRenderComponent(_component_MazCard, {
          key: i,
          images: [{ src: `blog/${blogPost.coverImg}`, alt: "blog post cover image" }],
          zoom: "",
          orientation: unref(mobilePhone) ? "column" : "row",
          galleryWidth: unref(tablet) ? "250px" : "300px",
          galleryHeight: "250px",
          class: "blogcard"
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="blog-card-date" data-v-0323fff2${_scopeId}>${ssrInterpolate(unref(format)(blogPost.createdAt, "MMM dd,yyyy"))}</span><h3 style="${ssrRenderStyle({ "margin": "0", "margin-bottom": "20px", "font-weight": "500" })}" data-v-0323fff2${_scopeId}>${ssrInterpolate(blogPost.title)}</h3>`);
            } else {
              return [
                createVNode("span", { class: "blog-card-date" }, toDisplayString(unref(format)(blogPost.createdAt, "MMM dd,yyyy")), 1),
                createVNode("h3", { style: { "margin": "0", "margin-bottom": "20px", "font-weight": "500" } }, toDisplayString(blogPost.title), 1)
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2;
            if (_push2) {
              _push2(`<div class="maz-text-muted" data-v-0323fff2${_scopeId}><div class="quill-html-content" data-v-0323fff2${_scopeId}>${(_a2 = `${blogPost.content_short}`) != null ? _a2 : ""}</div><button class="card__link" data-v-0323fff2${_scopeId}>ReadMore <span class="arrow" data-v-0323fff2${_scopeId}>\u2192</span></button></div>`);
            } else {
              return [
                createVNode("div", { class: "maz-text-muted" }, [
                  createVNode("div", {
                    class: "quill-html-content",
                    innerHTML: `${blogPost.content_short}`
                  }, null, 8, ["innerHTML"]),
                  createVNode("button", {
                    class: "card__link",
                    onClick: withModifiers(($event) => openBlogPostModal(blogPost), ["stop"])
                  }, [
                    createTextVNode("ReadMore "),
                    createVNode("span", { class: "arrow" }, "\u2192")
                  ], 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></main><aside class="sidebar" data-v-0323fff2><div class="search-box" data-v-0323fff2><input type="search" placeholder="Search..."${ssrRenderAttr("value", unref(searcq))} data-v-0323fff2></div><div class="widget Categories" data-v-0323fff2><h3 style="${ssrRenderStyle({ "font-weight": "500" })}" data-v-0323fff2>Categories</h3><ul class="categories-list" data-v-0323fff2><li data-v-0323fff2>News (${ssrInterpolate(unref(catagoriesCount).news)}) </li><li data-v-0323fff2>info (${ssrInterpolate(unref(catagoriesCount).info)}) </li><li data-v-0323fff2>event (${ssrInterpolate(unref(catagoriesCount).event)}) </li><li data-v-0323fff2>social (${ssrInterpolate(unref(catagoriesCount).social)}) </li></ul></div><div class="widget" data-v-0323fff2><h3 data-v-0323fff2>Recent Posts</h3><div class="recent-posts" data-v-0323fff2><!--[-->`);
      ssrRenderList(unref(recentPosts), (blogPost, i) => {
        _push(ssrRenderComponent(_component_MazCard, {
          key: i,
          onClick: ($event) => openBlogPostModal(blogPost),
          images: [{ src: `blog/${blogPost.coverImg}`, alt: "blog post cover image" }],
          orientation: "row",
          galleryWidth: "100px",
          class: "blogcard recent"
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="blog-card-date" style="${ssrRenderStyle({ "display": "block" })}" data-v-0323fff2${_scopeId}>${ssrInterpolate(unref(format)(blogPost.createdAt, "MMM dd,yyyy"))}</span><h3 style="${ssrRenderStyle({ "margin": "0", "margin-bottom": "20px", "font-weight": "500", "font-size": "12px" })}" data-v-0323fff2${_scopeId}>${ssrInterpolate(blogPost.title)}</h3>`);
            } else {
              return [
                createVNode("span", {
                  class: "blog-card-date",
                  style: { "display": "block" }
                }, toDisplayString(unref(format)(blogPost.createdAt, "MMM dd,yyyy")), 1),
                createVNode("h3", { style: { "margin": "0", "margin-bottom": "20px", "font-weight": "500", "font-size": "12px" } }, toDisplayString(blogPost.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></aside></div>`);
      _push(ssrRenderComponent(_component_NewsletterSub, { style: { "margin-top": "4rem" } }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0323fff2"]]);

export { blog as default };
//# sourceMappingURL=blog-BQ7lKCfW.mjs.map
