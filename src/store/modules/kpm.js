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

        if (payload.fetchAll) {
            commit('onKpmAdded', response.data)
        } else {
            commit('addKpm', response.data)
        }
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
    },

    async updateOneKpm({
        commit
    }, payload) {
        const response = await axios.put(`${url}/${payload._id}`, payload)

        commit('onKpmUpdate', response.data)
    },

    async deleteOneKpm({
        commit
    }, payload) {
        await axios.delete(`${url}/${payload._id}`);

        commit('onDeleteKpm', payload)
    }
}

const mutations = {
    addKpm: (state, payload) => (state.kpm = payload),
    setKpm: (state, payload) => (state.kpm = payload),
    allKpm: (state, payload) => (state.allKpm = payload),
    onDeleteKpm: (state, payload) => {
        const index = state.allKpm.allKpm.findIndex(
            (kpm) => kpm._id == payload._id
        );
        state.allKpm.allKpm.splice(index, 1);
    },
    onKpmAdded: (state, payload) => (state.allKpm.allKpm.unshift(payload.kpm)),
    onKpmUpdate: (state, payload) => {
        state.kpm = payload.kpm
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}