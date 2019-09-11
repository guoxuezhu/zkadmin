import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
  },
  state: {
    bool: true
  },
  mutations: {
    increment (state, e) {
      state.bool = e
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
