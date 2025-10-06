import { _ as __nuxt_component_1 } from './newsletterSub-BSrDXx4g.mjs';
import { withAsyncContext, computed, unref, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { format } from 'date-fns';
import { S as SEO_KEYWORDS } from './SEOkeywords-Bk6HcTcC.mjs';
import { u as useSeoMeta, a as useHead } from './v3-CUaJKqJ4.mjs';
import { _ as _export_sfc, d as useUtilStore, o as useVacancyStore, f as frontEndErrorFeedback } from './server.mjs';
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
  __name: "vacancy",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { any_open_modal } = storeToRefs(useUtilStore());
    const { vacancies } = storeToRefs(useVacancyStore());
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/vacancy", {
        headers: {
          apiref: "/api/vacancy/GET"
        }
      }, "$Dc2oS-ySw9")), __temp = await __temp, __restore(), __temp);
      vacancies.value = (_a = data.value) == null ? void 0 : _a.data;
    } catch (err) {
      frontEndErrorFeedback().err(err);
      console.log(err);
    }
    const vacanciesSchema = computed(() => {
      var _a2, _b;
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Job Vacancies at DESTA ALCOHOL & LIQUOR FACTORY PLC",
        "description": "Current career opportunities and job openings at DESTA ALCOHOL & LIQUOR FACTORY PLC",
        "url": "https://www.destaalcohol.et/vacancy",
        "numberOfItems": ((_a2 = vacancies.value) == null ? void 0 : _a2.length) || 0,
        "itemListElement": ((_b = vacancies.value) == null ? void 0 : _b.map((vacancy2, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "JobPosting",
            "title": vacancy2.position_name,
            "description": vacancy2.description.replace(/<[^>]*>/g, "").substring(0, 200),
            "datePosted": vacancy2.createdAt,
            "validThrough": vacancy2.deadline,
            "employmentType": "FULL_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC",
              "sameAs": "https://www.destaalcohol.et/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.destaalcohol.et/pictures/desta-logo.png"
              }
            },
            "jobLocation": vacancy2.locations.map((location) => ({
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": location,
                "addressCountry": "ET"
              }
            })),
            "applicantLocationRequirements": {
              "@type": "Country",
              "name": "Ethiopia"
            },
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "ETB",
              "value": vacancy2.salary === "based in the company scale" ? "Competitive salary based on company scale" : vacancy2.salary
            }
          }
        }))) || []
      };
    });
    useSeoMeta({
      title: "Careers - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      description: "Join DESTA ALCOHOL & LIQUOR FACTORY PLC. Explore current job openings and career opportunities in Ethiopia's premier alcohol production company.",
      ogTitle: "Careers - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      ogDescription: "Join DESTA ALCOHOL & LIQUOR FACTORY PLC. Explore current job openings and career opportunities.",
      ogUrl: "https://www.destaalcohol.et/vacancy",
      ogImage: "https://www.destaalcohol.et/pictures/desta-logo.png",
      twitterCard: "summary_large_image",
      robots: "index, follow",
      keywords: SEO_KEYWORDS().getAllKeywords().join(", ")
    });
    useHead({
      script: [
        {
          key: "vacancies-list",
          type: "application/ld+json",
          children: JSON.stringify(vacanciesSchema.value)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.destaalcohol.et/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Careers",
                "item": "https://www.destaalcohol.et/vacancy"
              }
            ]
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NewsletterSub = __nuxt_component_1;
      _push(`<!--[--><div class="job-container" data-v-6f52ef24><h3 class="job-header" data-v-6f52ef24>Vacancy openings</h3><div class="job-details" data-v-6f52ef24>`);
      if (unref(vacancies).length === 0) {
        _push(`<h5 class="job-header" style="${ssrRenderStyle({ "border": "none" })}" data-v-6f52ef24>No posted vacancy for now!!!</h5>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(vacancies), (vac, i) => {
        var _a2;
        _push(`<div class="section" data-v-6f52ef24><details data-v-6f52ef24><summary data-v-6f52ef24><div class="job-discriptions" data-v-6f52ef24><h5 class="dis" data-v-6f52ef24>Position: <span class="value" data-v-6f52ef24>${ssrInterpolate(vac.position_name)}</span></h5><h5 class="dis" data-v-6f52ef24>company: <span class="value" data-v-6f52ef24>${ssrInterpolate(vac.company)}</span></h5><h5 class="dis" data-v-6f52ef24>location: <span class="value" data-v-6f52ef24>${ssrInterpolate(vac.locations.join(","))}</span></h5><h5 class="dis" data-v-6f52ef24>deadline: <span class="value" data-v-6f52ef24>${ssrInterpolate(unref(format)(new Date(vac.deadline), "MMMM dd,yyyy"))}</span></h5><h5 class="dis" data-v-6f52ef24>salary: <span class="value" data-v-6f52ef24>${ssrInterpolate(vac.salary)}</span></h5></div></summary><div class="content" data-v-6f52ef24><div class="job-discriptions" data-v-6f52ef24><h5 data-v-6f52ef24>Description </h5><p data-v-6f52ef24>${ssrInterpolate(vac.description)}</p></div><div class="quill-html-content" data-v-6f52ef24>${(_a2 = `${vac.requirements}`) != null ? _a2 : ""}</div></div><div class="apply-button" data-v-6f52ef24><button data-v-6f52ef24>To Apply, Click Here</button></div></details></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_NewsletterSub, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vacancy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vacancy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f52ef24"]]);

export { vacancy as default };
//# sourceMappingURL=vacancy-rv_7XP5x.mjs.map
