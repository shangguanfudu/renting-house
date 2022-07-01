import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/theme.less'
import '@/styles/index.less'
import MyHeader from '@/components/MyHeader.vue'
import MySearch from '@/components/MySearch.vue'
import MyHouse from '@/components/MyHouse.vue'

Vue.component('MyHeader', MyHeader)
Vue.component('MySearch', MySearch)
Vue.component('MyHouse', MyHouse)
Vue.use(Lazyload)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
