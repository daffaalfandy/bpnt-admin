import axios from 'axios'
import {
    API_LOCATION
} from '../../../config/config';

const url = `${API_LOCATION}/kpm`;

const state = {
    kpm: []
}

const getters = {
    getKpm: (state) => state.kpm
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
    }
}

const mutations = {
    addKpm: (state, payload) => (state.kpm = payload),
    setKpm: (state, payload) => (state.kpm = payload)
}

export default {
    state,
    getters,
    actions,
    mutations
}