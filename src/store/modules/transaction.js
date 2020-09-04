import axios from "axios";
import {
    API_LOCATION
} from "../../../config/config";

const url = `${API_LOCATION}/transaction`;

const state = {
    datepick: {},
    cart: [],
};

const getters = {
    datepick: (state) => state.datepick,
    cart: (state) => state.cart,
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
};

const mutations = {
    changeDatepick: (state, payload) => (state.datepick = payload),
    updateCart: (state, payload) => state.cart.push(payload),
    emptyCart: (state) => (state.cart = []),
};

export default {
    state,
    getters,
    actions,
    mutations,
};