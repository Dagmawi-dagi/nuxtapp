import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "spinner",
  __ssrInlineRender: true,
  props: {
    color: String,
    width: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "spinner",
        style: {
          width: __props.width,
          height: __props.width,
          borderTopColor: __props.color,
          borderBottomColor: __props.color,
          borderLeftColor: __props.color
        }
      }, _attrs))} data-v-7f51fe09></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Reusable/spinner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7f51fe09"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=spinner-Dj-DYkv6.mjs.map
