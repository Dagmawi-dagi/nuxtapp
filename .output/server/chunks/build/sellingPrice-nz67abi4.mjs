import { u as useResizableColumns, e as el } from './MazTableUi-DJE3g4qh.mjs';
import { computed, ref, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { F as FactorySellingPrice, A as AgentsSellingPrice } from './site_info_ref-wKcuzL81.mjs';
import { S as SEO_KEYWORDS } from './SEOkeywords-Bk6HcTcC.mjs';
import { u as useSeoMeta, a as useHead } from './v3-CUaJKqJ4.mjs';
import { u as useBreakPoint } from './breakPoint-CvswuINl.mjs';
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
  __name: "sellingPrice",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Factory Selling Prices - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      description: "Check the official factory selling prices for DESTA ALCOHOL & LIQUOR FACTORY PLC products in Ethiopia. View vodka, gin, ouzo, zebib, superment, lemon, coffee, apple, annanas, denatured alcohol, and sanitizer prices with and without tax.",
      ogTitle: "Factory Selling Prices - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      ogDescription: "Official factory price list for DESTA ALCOHOL & LIQUOR FACTORY PLC \u2013 Vodka, Gin, Ouzo, Zebib, Superment, Lemon, Coffee, Apple, Annanas, Denatured Alcohol, and Sanitizer. Prices include Excise Tax & VAT.",
      ogUrl: "https://www.destaalcohol.et/sellingPrice",
      ogImage: "https://www.destaalcohol.com/pictures/desta-logo.png",
      twitterCard: "summary_large_image",
      robots: "index, follow",
      keywords: SEO_KEYWORDS().getAllKeywords().join(", ")
    });
    const sellingPriceSchema = computed(() => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Factory Selling Prices - DESTA ALCOHOL & LIQUOR FACTORY PLC",
      "description": "Official factory alcohol & liquor selling prices including excise tax and VAT in Ethiopia.",
      "url": "https://www.destaalcohol.et/sellingPrice",
      "numberOfItems": FactorySellingPrice.length,
      "itemListElement": FactorySellingPrice.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": item.item,
          "brand": {
            "@type": "Brand",
            "name": "DESTA ALCOHOL & LIQUOR FACTORY PLC"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "ETB",
            "price": item["Total price with Excise tax & VAT"],
            "url": "https://www.destaalcohol.et/sellingPrice",
            "availability": "https://schema.org/InStock",
            "eligibleRegion": {
              "@type": "Country",
              "name": "Ethiopia"
            }
          }
        }
      }))
    }));
    useHead({
      script: [
        {
          key: "selling-price-schema",
          type: "application/ld+json",
          children: JSON.stringify(sellingPriceSchema.value)
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
                "name": "Factory Selling Prices",
                "item": "https://www.destaalcohol.et/sellingPrice"
              }
            ]
          })
        }
      ]
    });
    const { mobilePhone } = useBreakPoint();
    const tableRef = ref(null);
    useResizableColumns(tableRef, {
      skipClasses: ["actions-column", "selection-column"],
      minWidth: 70
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MazTable = el;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_MazTable, {
        ref_key: "tableRef",
        ref: tableRef,
        style: { width: unref(mobilePhone) ? "95%" : "80%" },
        class: "MyMazTable",
        size: "sm",
        "input-size": "sm",
        "no-search-by": true,
        search: "",
        color: "primary",
        sortable: "",
        selectable: false,
        scrollable: "",
        hoverable: "",
        "background-even": "",
        "selected-key": "id",
        headers: [
          { label: "No", key: "id", align: "center", classes: "selection-column trancate", sortable: false },
          { label: "item", key: "item", classes: "trancate" },
          { label: "Price before any tax name", key: "Price before any tax", classes: "trancate" },
          { label: "Excise tax", key: "Excise tax", classes: "trancate" },
          { label: "VAT", key: "VAT", align: "center", classes: "trancate" },
          { label: "Excise tax+VAT", key: "Excise tax+VAT", align: "center", classes: "trancate" },
          { label: "Total price with Excise tax & VAT", key: "Total price with Excise tax & VAT", align: "center", classes: "trancate" }
        ],
        rows: unref(FactorySellingPrice)
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="myTableHeader" data-v-f51e6566${_scopeId}><h4 style="${ssrRenderStyle({ "font-weight": "normal" })}" data-v-f51e6566${_scopeId}>Factory Selling Price</h4></div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", { style: { "font-weight": "normal" } }, "Factory Selling Price")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_MazTable, {
        ref_key: "tableRef",
        ref: tableRef,
        style: { width: unref(mobilePhone) ? "95%" : "80%" },
        class: "MyMazTable",
        size: "sm",
        "input-size": "sm",
        "no-search-by": true,
        search: "",
        color: "primary",
        sortable: "",
        selectable: false,
        scrollable: "",
        hoverable: "",
        "background-even": "",
        "selected-key": "id",
        headers: [
          { label: "No", key: "id", align: "center", classes: "selection-column trancate", sortable: false },
          { label: "item", key: "item", classes: "trancate" },
          { label: "Price before any tax name", key: "Price before any tax", classes: "trancate" },
          { label: "Excise tax", key: "Excise tax", classes: "trancate" },
          { label: "VAT", key: "VAT", align: "center", classes: "trancate" },
          { label: "Excise tax+VAT", key: "Excise tax+VAT", align: "center", classes: "trancate" },
          { label: "Total price with Excise tax & VAT", key: "Total price with Excise tax & VAT", align: "center", classes: "trancate" }
        ],
        rows: unref(AgentsSellingPrice)
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="myTableHeader" data-v-f51e6566${_scopeId}><h4 style="${ssrRenderStyle({ "font-weight": "normal" })}" data-v-f51e6566${_scopeId}>Agents Selling Price</h4></div>`);
          } else {
            return [
              createVNode("div", { class: "myTableHeader" }, [
                createVNode("h4", { style: { "font-weight": "normal" } }, "Agents Selling Price")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sellingPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sellingPrice = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f51e6566"]]);

export { sellingPrice as default };
//# sourceMappingURL=sellingPrice-nz67abi4.mjs.map
