import axios from 'axios'
import {
    API_LOCATION
} from '../../../config/config';

const url = `${API_LOCATION}/admin`;

const state = {
    admin: [],
    admins: []
}

const getters = {
    admin: (state) => state.admin,
    admins: (state) => state.admins
}

const actions = {
    async login({
        commit
    }, payload) {
        const response = await axios.post(url, payload)

        commit('loginAdmin', response.data)
    },

    async fetchAdmins({
        commit
    }) {
        const response = await axios.get(url)

        commit('fetchAdmins', response.data)
    },

    async registerAdmin({
        commit
    }, payload) {
        const response = await axios.post(`${url}/register`, payload)

        commit('addAdmin', response.data)
    },

    async editAdmin({
        commit
    }, payload) {
        const response = await axios.put(`${url}/update/${payload._id}`, payload)

        commit('updateAdmin', response.data)
    },

    async deleteAdmin({
        commit
    }, payload) {
        await axios.delete(`${url}/delete/${payload._id}`);

        commit('deleteAdmin', payload)
    }
}

const mutations = {
    loginAdmin: (state, payload) => {
        state.admin = payload.admin
    },
    logoutAdmin: (state) => state.admin = [],
    fetchAdmins: (state, payload) => state.admins = payload.admins,
    addAdmin: (state, payload) => state.admins.unshift(payload.admin),
    updateAdmin: (state, payload) => {
        const index = state.admins.findIndex((admin) => admin._id == payload.admin._id);

        state.admins.splice(index, 1, payload.admin)
    },
    deleteAdmin: (state, payload) => {
        const index = state.admins.findIndex((admin) => admin._id == payload._id);

        state.admins.splice(index, 1)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}