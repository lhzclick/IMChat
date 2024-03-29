import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		num: '1'
	},
	mutations: {
		changeNum(state, num) {
			state.num ++
		}
	},
	actions: {},
	getters: {}
})
