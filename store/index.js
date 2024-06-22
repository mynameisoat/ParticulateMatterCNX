export const state = () => ({
  items: [],
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
};

export const actions = {
  async fetchItems({ commit }) {
    try {
      const response = await this.$axios.get("http://localhost:4000/Chom-Thong");
      commit("setItems", response.result);
    } catch (error) {
      console.error(errordata-Chom-Thong);
    }
  },
};

export const getters = {
  getItems(state) {
    return state.items;
  },
};
