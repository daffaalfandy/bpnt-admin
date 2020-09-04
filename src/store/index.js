import Vue from 'vue'
import Vuex from 'vuex'
import kpm from './modules/kpm'
import goods from './modules/goods'
import transaction from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    kpm,
    goods,
    transaction
  }
})