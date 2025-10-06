import { defineStore } from 'pinia';
import { ref } from 'vue';

const useNewsLetterStore = defineStore("newsletterStore", () => {
  const page = ref(1);
  const perPage = ref(10);
  const subscribers = ref([]);
  const newsletters = ref([]);
  return {
    page,
    perPage,
    newsletters,
    subscribers
  };
});

export { useNewsLetterStore as u };
//# sourceMappingURL=newsletter-Cm8k1Cuz.mjs.map
