// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import store from './store'
import WeVue from 'we-vue'
import Es6Promise from 'es6-promise'
import 'babel-polyfill'
import 'we-vue/lib/style.css'
import 'lib-flexible/flexible'
import animate from 'animate.css'
import vueLoading from 'vue-loading-template'
import { InfiniteScroll } from 'we-vue'
Vue.use(InfiniteScroll)
Vue.use(WeVue)
Vue.use(vuex)
Vue.use(animate)
Vue.use(vueLoading)
Vue.config.productionTip = false
require('es6-promise').polyfill()
Es6Promise.polyfill()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
