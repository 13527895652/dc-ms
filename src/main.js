import Vue from 'vue'
import App from './App'
import axios from './axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
