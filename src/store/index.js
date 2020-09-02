import Vue from 'vue'
import Vuex from 'vuex'
import kpm from './modules/kpm'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    kpm
  }
})