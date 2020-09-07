import axios from "axios";
import {
    API_LOCATION
} from "../../../config/config";

const url = `${API_LOCATION}/transaction`;

const state = {
    datepick: {},
    cart: [],
    transaction: []
};

const getters = {
    datepick: (state) => state.datepick,
    cart: (state) => state.cart,
    transaction: (state) => state.transaction
};

const actions = {
    async changeDatepick({
        commit
    }, payload) {
        commit("changeDatepick", payload);
    },

    async newTransaction({
            commit, // eslint-disable-line no-unused-vars
        },
        payload
    ) {
        await axios.post(url, payload);
    },

    async getTransaction({
        commit
    }, payload) {
        const response = await axios.get(`${url}/kks/${payload.kks}`)

        commit('addTransaction', response.data)
    },

    async getTransactionBasedOnDate({
        commit
    }, payload) {
        const response = await axios.get(`${url}/all?d=${payload.date}&m=${payload.month}&y=${payload.year}`) // eslint-disable-line no-unused-vars

        commit('addTransaction', response.data)
    },

    async getTransactionBasedOnMonth({
        commit
    }, payload) {
        const response = await axios.get(`${url}/all?m=${payload.datepick.month}&y=${payload.datepick.year}`) // eslint-disable-line no-unused-vars

        commit('addTransaction', response.data)
    }
};

const mutations = {
    changeDatepick: (state, payload) => (state.datepick = payload),
    updateCart: (state, payload) => state.cart.push(payload),
    emptyCart: (state) => (state.cart = []),
    addTransaction: (state, payload) => (state.transaction = payload)
};

export default {
    state,
    getters,
    actions,
    mutations,
};