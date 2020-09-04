import axios from 'axios'
import {
    API_LOCATION
} from '../../../config/config';

const url = `${API_LOCATION}/kpm`;

const state = {
    kpm: [],
    allKpm: []
}

const getters = {
    getKpm: (state) => state.kpm,
    allKpm: (state) => state.allKpm
}

const actions = {
    async addKpm({
        commit
    }, payload) {
        const response = await axios.post(`${url}`, payload);

        commit('addKpm', response.data)
    },

    async fetchOneKpm({
        commit
    }, payload) {
        const response = await axios.get(`${url}/${payload.kks}`, {
            useCredentails: true
        });

        commit('setKpm', response.data)
    },

    async fetchKpm({
        commit
    }) {
        const response = await axios.get(url)

        commit('allKpm', response.data)
    }
}

const mutations = {
    addKpm: (state, payload) => (state.kpm = payload),
    setKpm: (state, payload) => (state.kpm = payload),
    allKpm: (state, payload) => (state.allKpm = payload)
}

export default {
    state,
    getters,
    actions,
    mutations
}