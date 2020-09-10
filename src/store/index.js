import Vue from 'vue'
import Vuex from 'vuex'
import kpm from './modules/kpm'
import goods from './modules/goods'
import transaction from './modules/transaction'
import admin from './modules/admin'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    kpm,
    goods,
    transaction,
    admin
  },
  plugins: [
    createPersistedState({
      paths: ['admin.admin']
    })
  ]
})