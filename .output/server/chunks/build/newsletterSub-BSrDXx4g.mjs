import { _ as _export_sfc, g as __nuxt_component_0$2 } from './server.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "newsletterSub",
  __ssrInlineRender: true,
  setup(__props) {
    const showSuccMsg = ref(false);
    const errMsg = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "newsletter-container" }, _attrs))} data-v-b63d9524><div class="newsletter-content" data-v-b63d9524><svg xmlns="http://www.w3.org/2000/svg" class="newsletter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b63d9524><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" data-v-b63d9524></path></svg><h1 class="newsletter-title" data-v-b63d9524> Subscribe to our newsletter </h1><p class="newsletter-description" data-v-b63d9524> Stay up to date with out progress, announcements and exclusive discounts feel free to sign up with your email. </p></div><div class="newsletter-form-container" data-v-b63d9524>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<p class="newsletter-privacy" data-v-b63d9524> No spam ever, we are care about the protection of your data. </p>`);
      if (unref(showSuccMsg) && !unref(errMsg)) {
        _push(`<div class="message success-message" data-v-b63d9524><div class="message-icon success-icon" data-v-b63d9524><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b63d9524><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-v-b63d9524></path><polyline points="22 4 12 14.01 9 11.01" data-v-b63d9524></polyline></svg></div><div class="message-text success-text" data-v-b63d9524><h4 data-v-b63d9524>Subscription Successful!</h4><p data-v-b63d9524>Please check your email to confirm your subscription.</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errMsg) && !unref(showSuccMsg)) {
        _push(`<div class="message error-message" data-v-b63d9524><div class="message-icon error-icon" data-v-b63d9524><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b63d9524><circle cx="12" cy="12" r="10" data-v-b63d9524></circle><line x1="15" y1="9" x2="9" y2="15" data-v-b63d9524></line><line x1="9" y1="9" x2="15" y2="15" data-v-b63d9524></line></svg></div><div class="message-text error-text" data-v-b63d9524><p data-v-b63d9524>${ssrInterpolate(unref(errMsg))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/newsletterSub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b63d9524"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=newsletterSub-BSrDXx4g.mjs.map
