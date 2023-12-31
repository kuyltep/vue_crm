import firebase from "firebase/compat/app";
export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({
            title,
            limit,
          });
        return { title, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateCategory({ dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({
            title,
            limit,
          });
      } catch (error) {}
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (error) {}
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};
        return {
          ...category,
          id,
        };
      } catch (error) {}
    },
  },
};
