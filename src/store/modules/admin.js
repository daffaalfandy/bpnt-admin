import axios from 'axios'
import {
    API_LOCATION
} from '../../../config/config';

const url = `${API_LOCATION}/admin`;

const state = {
    admin: []
}

const getters = {
    admin: (state) => state.admin
}

const actions = {
    async login({
        commit
    }, payload) {
        const response = await axios.post(url, payload)

        commit('loginAdmin', response.data)
    }
}

const mutations = {
    loginAdmin: (state, payload) => (state.admin = payload)
}

export default {
    state,
    getters,
    actions,
    mutations
}