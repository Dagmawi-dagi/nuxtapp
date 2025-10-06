import { inject } from 'vue';

function n(t, o) {
  const r = inject(t, o);
  if (!r)
    throw new TypeError(`[maz-ui](injectStrict) Could not resolve ${t.toString()}`);
  return r;
}

export { n };
//# sourceMappingURL=inject-strict.DEDSuzCz-DcVeNZMW.mjs.map
