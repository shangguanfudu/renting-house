import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity: '北京',
    user: {},
    commityName: {}
  },
  getters: {
  },
  mutations: {
    CITY (state, payload) {
      state.currentCity = payload
    },
    SETUSER (state, payload) {
      state.user = payload
    },
    COMMITY (state, payload) {
      state.commityName = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
