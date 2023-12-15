import firebase from "firebase/compat/app";

export default {
  state() {
    return {
      info: {},
    };
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref("/users/" + uid + "/info")
          .once("value", (info) => commit("setInfo", info.val()));
      } catch (error) {
        console.log(error);
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const dataToUpdate = { ...getters.info, ...toUpdate };
        firebase.database().ref(`/users/${uid}/info`).update(dataToUpdate);
        commit("setInfo", dataToUpdate);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
