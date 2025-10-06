import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAuthStore = defineStore("authStore", () => {
  const loggedInUser = ref(null);
  const users = ref(null);
  const page = ref(1);
  const perPage = ref(10);
  return {
    page,
    perPage,
    users,
    loggedInUser
  };
});

export { useAuthStore as u };
//# sourceMappingURL=user-CapvL0VR.mjs.map
