/**
 * Importing QR Code Reader CSS
 */
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'

/**
 * Importing aepp-components:
 *
 * - Global CSS: Global rules and resets
 */
import '@aeternity/aepp-components/dist/aepp.global.css'

/**
 * Importing list of aepp-components CSS
 */
import '@aeternity/aepp-components/dist/ae-button/ae-button.css'
import '@aeternity/aepp-components/dist/ae-icon/ae-icon.css'
import '@aeternity/aepp-components/dist/ae-input/ae-input.css'
import '@aeternity/aepp-components/dist/ae-toolbar/ae-toolbar.css'

/**
 * Vue Related packages
 */
import Vue from 'vue'

/**
 * Importing Root View
 */
import View from './view'

/**
 * Importing Internal Tools
 */
import router from './router'
import store from './store'

/**
 * Vue Properties
 * @type {boolean}
 */
Vue.config.productionTip = true

/**
 * Exporting $vm instance
 */
export default new Vue({
  router,
  store,
  render: h => h(View),
}).$mount('#view')
