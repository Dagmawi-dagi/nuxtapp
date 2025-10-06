import { c as buildAssetsURL } from '../routes/renderer.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = "" + buildAssetsURL("harbel.rn9fIdyA.jpg");
const _imports_1 = "" + buildAssetsURL("spa.BPhW0fAX.png");
const _imports_2 = "" + buildAssetsURL("et sucar.CcdIKNQV.png");
const _imports_3 = "" + buildAssetsURL("lion bank.Dc6JNwxT.png");
const _imports_4 = "" + buildAssetsURL("Awash Bank.D3DVzfGe.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "partners" }, _attrs))} data-v-8957353d><div class="container" data-v-8957353d><div class="partners__grid" data-v-8957353d><div class="partners__item" data-v-8957353d><img${ssrRenderAttr("src", _imports_0)} alt="Partner 1" class="partners__logo" data-v-8957353d></div><div class="partners__item" data-v-8957353d><img${ssrRenderAttr("src", _imports_1)} alt="Partner 1" class="partners__logo" data-v-8957353d></div><div class="partners__item" data-v-8957353d><img${ssrRenderAttr("src", _imports_2)} alt="Partner 1" class="partners__logo" data-v-8957353d></div><div class="partners__item" data-v-8957353d><img${ssrRenderAttr("src", _imports_3)} alt="Partner 1" class="partners__logo" data-v-8957353d></div><div class="partners__item" data-v-8957353d><img${ssrRenderAttr("src", _imports_4)} alt="Partner 1" class="partners__logo" data-v-8957353d></div></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ourPartners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8957353d"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=ourPartners-CdccSY0N.mjs.map
