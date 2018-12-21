/**
 * Importing Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * Installing Vuex
 */
Vue.use(Vuex)

/**
 * Exporting Vuex
 */
export default new Vuex.Store({
  state: {
    privKey: null,
    keypair: null,
    address: null
  },
  mutations: {
    setPrivKey(state, privKey) {
      state.privKey = privKey
    },
    setKeypair(state, keypair) {
      state.keypair = keypair
    },
    setAddress(state, address) {
      state.address = address
    }
  }
})
