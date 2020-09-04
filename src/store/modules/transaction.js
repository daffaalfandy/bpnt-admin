const state = {
    datepick: {}
}

const getters = {
    datepick: (state) => state.datepick
}

const actions = {
    async changeDatepick({
        commit
    }, payload) {
        commit('changeDatepick', payload)
    }
}

const mutations = {
    changeDatepick: (state, payload) => state.datepick = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}