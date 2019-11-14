import Vue from 'vue'
import App from './App'
import store from './store/store'
import axios from './axios/axios'
import http from './axios/http'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$http = http;
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
