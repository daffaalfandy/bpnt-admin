import axios from "axios";
import {
  API_LOCATION
} from "../../../config/config";

const url = `${API_LOCATION}/goods`;

const state = {
  goods: [],
  goodsTransaction: [],
  monthYear: {}
};

const getters = {
  allGoods: (state) => state.goods,
  goodsTransaction: (state) => state.goodsTransaction,
  monthYear: (state) => state.monthYear
};

const actions = {
  async addGoods({
    commit // eslint-disable-line no-unused-vars
  }, payload) {
    await axios.post(`${url}`, payload);
  },

  async fetchGoods({
    commit
  }, payload) {
    const response = await axios.get(
      `${url}?m=${payload.month}&y=${payload.year}`
    );

    commit("setGoods", response.data);
  },

  async fetchGoodsTransaction({
    commit
  }, payload) {
    const response = await axios.get(
      `${url}/transaction?m=${payload.month}&y=${payload.year}`
    );

    commit("setGoodsTransaction", response.data)
  },

  async deleteGoods({
    commit
  }, payload) {
    await axios.delete(`${url}/${payload._id}`);

    commit("deleteGoods", payload);
  },

  async updateGood({
    commit // eslint-disable-line no-unused-vars
  }, payload) {
    await axios.put(`${url}/${payload._id}`, payload);
  },
};

const mutations = {
  setGoods: (state, payload) => (state.goods = payload),
  deleteGoods: (state, payload) => {
    const index = state.goods.goods.findIndex(
      (good) => good._id == payload._id
    );
    state.goods.goods.splice(index, 1);
  },
  setGoodsTransaction: (state, payload) => (state.goodsTransaction = payload),
  setMonthYear: (state, payload) => state.monthYear = payload
};

export default {
  state,
  getters,
  actions,
  mutations,
};