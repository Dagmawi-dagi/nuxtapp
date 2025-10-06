import { computed, useId } from 'vue';

function o({
  componentName: e,
  providedId: n
}) {
  return computed(() => n != null ? n : `${e}-${useId().replace(/:/g, "")}`);
}

export { o };
//# sourceMappingURL=useInstanceUniqId.BkOfxhk8-BqNXuiok.mjs.map
