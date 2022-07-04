import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getCityValue } from '@/api/area'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity: '北京',
    cityValue: 'AREA|88cff55c-aaa4-e2e0',
    user: {},
    commityName: {}
  },
  getters: {
  },
  mutations: {
    async CITY (state, payload) {
      state.currentCity = payload
      const { data: res } = await getCityValue(payload)
      // console.log(res)
      this.commit('CITYVALUE', res.body.value)
    },
    CITYVALUE (state, payload) {
      state.cityValue = payload
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
