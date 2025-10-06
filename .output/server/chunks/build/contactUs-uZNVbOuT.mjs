import { _ as __nuxt_component_0 } from './spinner-Dj-DYkv6.mjs';
import { _ as __nuxt_component_1 } from './newsletterSub-BSrDXx4g.mjs';
import { ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { d as address } from './site_info_ref-wKcuzL81.mjs';
import { S as SEO_KEYWORDS } from './SEOkeywords-Bk6HcTcC.mjs';
import { u as useSeoMeta, a as useHead } from './v3-CUaJKqJ4.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "contactUs",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Contact Us - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      description: "Get in touch with DESTA ALCOHOL & LIQUOR FACTORY PLC. Contact us via phone, email, or our contact form for inquiries, orders, and customer support. We're here to help!",
      ogTitle: "Contact Us - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      ogDescription: "Get in touch with DESTA ALCOHOL & LIQUOR FACTORY PLC. Contact us via phone, email, or our contact form for inquiries, orders, and customer support.",
      ogUrl: "https://www.destaalcohol.et/contactUs",
      ogImage: "https://www.destaalcohol.com/pictures/desta-logo.png",
      twitterCard: "summary_large_image",
      robots: "index, follow",
      keywords: SEO_KEYWORDS().getAllKeywords().join(", ")
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          key: "contact-org",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us - DESTA ALCOHOL & LIQUOR FACTORY PLC",
            "description": "Contact page for DESTA ALCOHOL & LIQUOR FACTORY PLC - Premium Alcohol & Liquor producer in Ethiopia",
            "url": "https://www.destaalcohol.et/contactUs",
            "mainEntity": {
              "@type": "Organization",
              "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
              "telephone": [
                "+251 914300007",
                "+251 914705089",
                "+251 914314811"
              ],
              "email": "destaalcohol@gmail.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+251 914300007",
                "email": "destaalcohol@gmail.com",
                "availableLanguage": ["English", "Amharic"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Ethiopia"
              }
            }
          })
        }
      ]
    });
    const isSubmitting = ref(false);
    const form = reactive({
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: ""
    });
    const errors = reactive({
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ReusableSpinner = __nuxt_component_0;
      const _component_NewsletterSub = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-container" }, _attrs))} data-v-e5c7ffea><h3 class="title" style="${ssrRenderStyle({ "color": "#0072b8" })}" data-v-e5c7ffea>Contact Us</h3><div class="contact-content" data-v-e5c7ffea><div class="contact-info" data-v-e5c7ffea><h4 class="info-title" data-v-e5c7ffea>Have Questions?</h4><h5 class="info-subtitle" data-v-e5c7ffea>Get in Touch!</h5><p style="${ssrRenderStyle({ "margin": "10px 0 20px" })}" data-v-e5c7ffea> We&#39;re here to help and answer any questions you might have. We look forward to hearing from you. Feel free to reach out to us using any of the following contact methods. </p><div class="contact-details" data-v-e5c7ffea><div class="contact-item" data-v-e5c7ffea><svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-e5c7ffea><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-e5c7ffea></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" data-v-e5c7ffea></path></svg><span data-v-e5c7ffea>Quha, Mekelle, Tigray</span></div><div class="contact-item" data-v-e5c7ffea><svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-e5c7ffea><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" data-v-e5c7ffea></path></svg><span data-v-e5c7ffea>${ssrInterpolate(unref(address)[1].phoneNumber)}</span></div><div class="contact-item" data-v-e5c7ffea><svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-e5c7ffea><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" data-v-e5c7ffea></path></svg><span data-v-e5c7ffea>${ssrInterpolate(unref(address)[2].phoneNumber)}</span></div><div class="contact-item" data-v-e5c7ffea><svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-e5c7ffea><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" data-v-e5c7ffea></path></svg><span data-v-e5c7ffea>${ssrInterpolate(unref(address)[3].phoneNumber)}</span></div><div class="contact-item" data-v-e5c7ffea><svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-e5c7ffea><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" data-v-e5c7ffea></path></svg><span data-v-e5c7ffea>${ssrInterpolate(unref(address)[1].email)}</span></div></div></div><form class="contact-form" data-v-e5c7ffea><div class="form-grid" data-v-e5c7ffea><div class="form-group" data-v-e5c7ffea><input${ssrRenderAttr("value", unref(form).fullName)} type="text" placeholder="Name" class="${ssrRenderClass({ "error": unref(errors).fullName })}" data-v-e5c7ffea>`);
      if (unref(errors).fullName) {
        _push(`<span class="error-message" data-v-e5c7ffea>${ssrInterpolate(unref(errors).fullName)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-e5c7ffea><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Email Address" class="${ssrRenderClass({ "error": unref(errors).email })}" data-v-e5c7ffea>`);
      if (unref(errors).email) {
        _push(`<span class="error-message" data-v-e5c7ffea>${ssrInterpolate(unref(errors).email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-e5c7ffea><input${ssrRenderAttr("value", unref(form).phoneNumber)} type="tel" placeholder="phoneNumber" class="${ssrRenderClass({ "error": unref(errors).phoneNumber })}" data-v-e5c7ffea>`);
      if (unref(errors).phoneNumber) {
        _push(`<span class="error-message" data-v-e5c7ffea>${ssrInterpolate(unref(errors).phoneNumber)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-e5c7ffea><input${ssrRenderAttr("value", unref(form).subject)} type="text" placeholder="Subject" class="${ssrRenderClass({ "error": unref(errors).subject })}" data-v-e5c7ffea>`);
      if (unref(errors).subject) {
        _push(`<span class="error-message" data-v-e5c7ffea>${ssrInterpolate(unref(errors).subject)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-group message-group" data-v-e5c7ffea><textarea placeholder="How Can We Help You? Feel Free to Get in Touch!" rows="4" class="${ssrRenderClass({ "error": unref(errors).message })}" data-v-e5c7ffea>${ssrInterpolate(unref(form).message)}</textarea>`);
      if (unref(errors).message) {
        _push(`<span class="error-message" data-v-e5c7ffea>${ssrInterpolate(unref(errors).message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="submit-button"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} data-v-e5c7ffea><div class="dots-pattern" data-v-e5c7ffea></div>`);
      if (!unref(isSubmitting)) {
        _push(`<svg class="button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-e5c7ffea><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" data-v-e5c7ffea></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isSubmitting)) {
        _push(ssrRenderComponent(_component_ReusableSpinner, {
          color: "#fff",
          width: "1rem",
          style: { "margin": "auto" }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(isSubmitting)) {
        _push(`<span data-v-e5c7ffea>Get in Touch</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></form></div>`);
      _push(ssrRenderComponent(_component_NewsletterSub, { style: { "margin-top": "4rem" } }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contactUs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contactUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5c7ffea"]]);

export { contactUs as default };
//# sourceMappingURL=contactUs-uZNVbOuT.mjs.map
