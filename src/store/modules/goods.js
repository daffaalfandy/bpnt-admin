import axios from "axios";
import { API_LOCATION } from "../../../config/config";

const url = `${API_LOCATION}/goods`;

const state = {
  goods: [],
};

const getters = {
  allGoods: (state) => state.goods,
};

const actions = {
  async addGoods({ commit }, payload) {
    const response = await axios.post(`${url}`, payload);

    commit("addGoods", response.data);
  },

  async fetchGoods({ commit }, payload) {
    const response = await axios.get(
      `${url}?m=${payload.month}&y=${payload.year}`
    );

    commit("setGoods", response.data);
  },

  async deleteGoods({ commit }, payload) {
    await axios.delete(`${url}/${payload._id}`);

    commit("deleteGoods", payload);
  },
};

const mutations = {
  addGoods: (state, payload) => state.goods.unshift(payload),
  setGoods: (state, payload) => (state.goods = payload),
  deleteGoods: (state, payload) => {
    const index = state.goods.goods.findIndex(
      (good) => good._id == payload._id
    );
    state.goods.goods.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
