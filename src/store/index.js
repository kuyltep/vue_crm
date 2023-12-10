import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";

export default createStore({
  state() {
    return {
      error: null,
    };
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: {
    auth,
    info,
  },
});
