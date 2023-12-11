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

        // const info = await firebase
        //   .database()
        //   .ref(`/users/${uid}/info`)
        //   .once("value", (info) => console.log(info.val()));
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
